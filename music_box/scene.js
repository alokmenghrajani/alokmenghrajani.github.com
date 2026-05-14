import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { NOTE_TO_TOOTH } from './audio.js';

// ---------- Constants ----------
const DRUM_ROTATION_PERIOD_SEC = 30;            // drum makes one revolution in 30s
const SONG_DURATION_SEC = 27;                   // 27s of music + 3s silence
const CRANK_TO_DRUM_RATIO = 32;                 // hand crank turns 32x per drum rev
const TOOTH_MAX_TILT_DEG = 5;                   // how far the tooth rotates when plucked

// Each tooth carries a small "tilt" controller whose tip animates with a
// damped spring (elastic return).
class ToothAnim {
  constructor(group) {
    this.group = group;
    this.angle = 0;        // current tilt angle (radians)
    this.velocity = 0;     // angular velocity (rad/s)
  }
  pluck() {
    // Positive rotation about the tooth's local X tilts its tip upward in
    // world Z — the direction the pin pushes it from below.
    this.angle = THREE.MathUtils.degToRad(TOOTH_MAX_TILT_DEG);
    this.velocity = 0;
  }
  update(dt) {
    const stiffness = 220;
    const damping = 9;
    const accel = -stiffness * this.angle - damping * this.velocity;
    this.velocity += accel * dt;
    this.angle += this.velocity * dt;
    this.group.rotation.x = this.angle;
  }
}

function applyMaterials(model) {
  // Dialing roughness up for the smaller blue parts so they read as blue
  // rather than mirror-reflecting the brass drum.
  const palette = {
    handle:  { color: 0x4A4A4A, metalness: 1.0, roughness: 0.40 }, // dark gray metallic
    support: { color: 0xC8C8C8, metalness: 1.0, roughness: 0.45 }, // light gray metallic
    comb:    { color: 0x2A6FD6, metalness: 0.9, roughness: 0.55 }, // blue metallic
    tooth:   { color: 0x2A6FD6, metalness: 0.9, roughness: 0.55 }, // blue metallic
    drum:    { color: 0xCE9447, metalness: 1.0, roughness: 0.32 }, // brass metallic
    note:    { color: 0xCE9447, metalness: 1.0, roughness: 0.32 }, // brass pins
  };
  model.traverse(obj => {
    if (!obj.isMesh) return;
    let p;
    const n = obj.name;
    if (n === 'Handle') p = palette.handle;
    else if (n === 'Support') p = palette.support;
    else if (n === 'Comb') p = palette.comb;
    else if (n.startsWith('Tooth')) p = palette.tooth;
    else if (n === 'Drum') p = palette.drum;
    else if (n === 'Sample_note' || n === 'Sample note' || n === 'Sample.note' || n === 'Samplenote') p = palette.note;
    else p = palette.support;
    obj.material = new THREE.MeshStandardMaterial(p);
    obj.castShadow = true;
    obj.receiveShadow = true;
  });
}

// Attach a thin black line for every sharp edge of the mesh's geometry. The
// LineSegments shares the parent's transform, and three.js draws lines at a
// fixed 1-pixel screen width so every edge looks the same thickness no matter
// how the mesh is scaled.
//
// `thresholdAngle` (degrees) controls which edges count as "sharp"; the
// default of 40 lets cone facets read but hides interior triangulation lines
// on otherwise-flat box faces.
function addEdgeLines(mesh, thresholdAngle = 40) {
  const edges = new THREE.EdgesGeometry(mesh.geometry, thresholdAngle);
  const lines = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
  );
  lines.renderOrder = 1;
  mesh.add(lines);
  return lines;
}

// Compute the start time of each event. Rhythm is data-driven: each event
// carries a `dur` weight (a quarter note = 1, a half note = 2, etc.) read
// from the tune file. The weights are normalized so the whole song still
// fits in `totalDur` seconds. This keeps the timing faithful to whatever
// tune is loaded rather than imposing a fixed rhythmic template.
function computeEventTimes(events, totalDur) {
  const sum = events.reduce((s, e) => s + (e.dur || 1), 0);
  const scale = totalDur / sum;
  const times = new Float64Array(events.length);
  let t = 0;
  for (let i = 0; i < events.length; i++) {
    times[i] = t;
    t += (events[i].dur || 1) * scale;
  }
  return times;
}

// ---------- Parse tune.txt ----------
// Each non-blank, non-comment line is one event; "+" joins chord members.
// Tokens may be either tooth numbers (1..18) or note names (e.g. "E5", "A4")
// which are looked up via NOTE_TO_TOOTH. An optional "*N" suffix sets the
// event's duration in beats (default 1) — e.g. "G6 *2" is a half note.
// Trailing "#" comments on a line are stripped before tokenizing.
// Returns an array of { teeth: number[], dur: number }.
export function parseNotes(text) {
  const events = [];
  for (let raw of text.split('\n')) {
    const hashIdx = raw.indexOf('#');
    let line = (hashIdx >= 0 ? raw.slice(0, hashIdx) : raw).trim();
    if (!line) continue;
    if (/^teeth/i.test(line)) continue;

    // Optional duration suffix, "*N", anywhere up to the end of the line.
    let dur = 1;
    const durMatch = line.match(/\*\s*([\d.]+)\s*$/);
    if (durMatch) {
      dur = parseFloat(durMatch[1]) || 1;
      line = line.slice(0, durMatch.index).trim();
    }

    const tokens = line.split(/\s*\+\s*/);
    const teethThisEvent = [];
    for (const tok of tokens) {
      const t = tok.trim();
      if (!t) continue;
      let n;
      if (/^\d+$/.test(t)) {
        n = parseInt(t, 10);
      } else if (NOTE_TO_TOOTH[t] !== undefined) {
        n = NOTE_TO_TOOTH[t];
      } else {
        continue;
      }
      if (n >= 1 && n <= 18) teethThisEvent.push(n);
    }
    if (teethThisEvent.length) events.push({ teeth: teethThisEvent, dur });
  }
  return events;
}

// ---------- Scene ----------
export class MusicBoxScene {
  constructor(canvas, piano, listener) {
    this.canvas = canvas;
    this.piano = piano;
    this.listener = listener;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x6CB1E8); // blue sky

    // Fog adds depth and helps the sky read as sky.
    this.scene.fog = new THREE.Fog(0x9CCBEF, 30, 120);

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
    this.camera.position.set(7.36, -6.93, 5.46);
    this.camera.up.set(0, 0, 1); // blender uses Z up
    this.camera.lookAt(0, 0, 1);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // Environment for PBR reflections — without this, metallic materials
    // (which derive most of their color from reflections) appear black.
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 1.0;

    this._setupLights();
    this._setupGround();

    // Listener attached to the camera (set automatically when adding listener).
    this.camera.add(listener);
    this.scene.add(this.camera);

    // Animation state. The crank starts paused — we kick it on once the user
    // presses Start. `crankSpeed` smoothly ramps between 0 and 1 to simulate
    // physical inertia when the user pauses or resumes the crank.
    this.crankPaused = true;
    this.crankSpeed = 0;         // 0 = stopped, 1 = full speed
    this.crankSpinUpTime = 0.45; // seconds to ramp from one state to the other
    this.songElapsed = 0;        // seconds since song started
    this.events = [];            // parsed tune events
    this.eventDueIdx = 0;        // next event index to be evaluated
    this.toothAnims = [];        // 18 ToothAnim instances, index 0..17 -> tooth 1..18
    this.toothObjects = [];      // 18 tooth meshes (original)
    this.toothPositional = [];   // 18 PositionalAudio nodes
    this.drum = null;
    this.handle = null;
    this.driveAngle = 0;         // base drum rotation angle (radians)

    // Camera state (orbit + offset)
    this.cam = {
      orbitAzimuth: 0,           // radians around world Z, 0 = +X
      orbitElevation: THREE.MathUtils.degToRad(35), // 0..85 deg
      orbitRadius: 8,
      offsetForward: 0,          // user offset: how far closer/away
      offsetLateral: 0,          // user offset: lateral relative to orbit
      target: new THREE.Vector3(0, 0, 1),
    };
    this.defaultCam = JSON.parse(JSON.stringify({
      orbitAzimuth: this.cam.orbitAzimuth,
      orbitElevation: this.cam.orbitElevation,
      orbitRadius: this.cam.orbitRadius,
      offsetForward: this.cam.offsetForward,
      offsetLateral: this.cam.offsetLateral,
    }));

    this.introActive = false;
    this.introCurve = null;
    this.introDuration = 10;
    this.introTime = 0;
    this.onIntroEnd = null;

    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  _setupLights() {
    const hemi = new THREE.HemisphereLight(0xC9E2FF, 0x4A6B2E, 0.55);
    this.scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xFFF2D7, 1.6);
    sun.position.set(8, -10, 14);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    const s = 8;
    sun.shadow.camera.left = -s;
    sun.shadow.camera.right = s;
    sun.shadow.camera.top = s;
    sun.shadow.camera.bottom = -s;
    sun.shadow.bias = -0.0005;
    this.scene.add(sun);

    const fill = new THREE.DirectionalLight(0x88AAFF, 0.3);
    fill.position.set(-6, 5, 3);
    this.scene.add(fill);
  }

  _setupGround() {
    const geom = new THREE.PlaneGeometry(200, 200);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x4F8A36, // green grass
      roughness: 0.95,
      metalness: 0.0,
    });
    const ground = new THREE.Mesh(geom, mat);
    ground.rotation.x = 0; // already in XY since we use Z-up: plane is XY by default
    ground.position.z = 0;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  async load(glbUrl, sceneDataUrl, notesText) {
    const [gltf, sceneData] = await Promise.all([
      new Promise((res, rej) => new GLTFLoader().load(glbUrl, res, undefined, rej)),
      fetch(sceneDataUrl).then(r => r.json()),
    ]);

    this.sceneData = sceneData;
    this.events = parseNotes(notesText);

    const root = gltf.scene;
    // Some glTF exporters set Y-up; Blender's exporter with export_yup=True does that.
    // We want Z-up to match Blender source. Rotate the root to bring Z up.
    root.rotation.x = Math.PI / 2;
    this.scene.add(root);

    // Collect named nodes
    const byName = {};
    root.traverse(o => { if (o.name) byName[o.name] = o; });
    this.byName = byName;

    // The gltf exporter typically sanitizes names — "Sample note" becomes "Sample_note".
    // We look up flexibly.
    const sampleNote = byName['Sample_note'] || byName['Sample note'] || byName['Samplenote'];

    applyMaterials(root);

    // Outline every sharp edge of the main pieces with a black 1-pixel line.
    ['Handle', 'Support', 'Comb', 'Drum'].forEach(name => {
      const m = byName[name];
      if (m && m.isMesh) addEdgeLines(m);
    });

    // Set up the drum: re-parent the handle and notes to spin appropriately.
    this.drum = byName['Drum'];
    this.handle = byName['Handle'];

    if (!this.drum || !this.handle) {
      console.warn('Missing drum or handle in GLB');
    }

    // Build a list of teeth Tooth.001..Tooth.018 by parsing names like "Tooth001" or "Tooth_001"
    const teethByNum = new Map();
    root.traverse(o => {
      const m = o.name && o.name.match(/^Tooth[._]?(\d+)$/);
      if (m && o.isMesh) {
        teethByNum.set(parseInt(m[1], 10), o);
      }
    });

    // Wrap each tooth in a pivot group at its origin position so the tooth
    // tilts around its base.
    for (let i = 1; i <= 18; i++) {
      const tooth = teethByNum.get(i);
      if (!tooth) {
        console.warn(`Missing Tooth.${String(i).padStart(3,'0')}`);
        continue;
      }
      addEdgeLines(tooth);
      // The tooth's origin in blender is at its base (model local y=0); the
      // tooth extends in +Y. We can simply rotate the existing object around
      // its X axis at its origin and the geometry will tilt correctly.
      this.toothObjects[i - 1] = tooth;
      this.toothAnims[i - 1] = new ToothAnim(tooth);

      // Attach a PositionalAudio to the tooth so the sound emits from the
      // tooth's world position. The listener tracks the camera.
      const pa = this.piano.createPositionalAt(tooth);
      this.toothPositional[i - 1] = pa;
    }

    // Build the notes on the drum. The "sample note" provides the geometry
    // and the radial offset from drum center; we duplicate it and place each
    // copy at the tooth-aligned X position with the angle around the drum axis
    // chosen so that it triggers at the right moment in the song.
    this._buildNotes(sampleNote);

    // Build the intro curve as a Catmull-Rom for smooth playback.
    // The curve in blender starts at the far point and ends near the model.
    // We reverse it so the intro camera flies INTO the scene rather than out.
    const pts = sceneData.intro_curve.map(p => new THREE.Vector3(p[0], p[1], p[2]));
    pts.reverse();
    this.introCurve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.2);

    return this;
  }

  _buildNotes(sampleNote) {
    if (!sampleNote) {
      console.warn('No sample note found in GLB');
      return;
    }

    // After GLTF Y-up conversion, the drum's cylinder axis is its local Y
    // axis (longest mesh extent in three.js). The sample note's cone mesh
    // extends in its own mesh +Y direction, which (with no rotation on the
    // sample note) maps to world +Z — so the sample pin pokes up out of the
    // top of the drum.
    //
    // For each event in the song we clone the cone, place its object origin
    // on the drum's long axis (drum-local Y) at the tooth's axial position,
    // and rotate the clone so its cone direction points outward at a chosen
    // angle around the cylinder. The angle is picked so the pin passes the
    // comb at the event's moment in the song.

    sampleNote.updateWorldMatrix(true, true);
    this.drum.updateWorldMatrix(true, true);

    const noteGeom = sampleNote.geometry;
    const noteMat = sampleNote.material;

    // Compensate for the drum's scale so the cloned pins keep the original
    // world size after being parented to the drum.
    const drumScale = this.drum.scale.x; // uniform
    const baseScale = sampleNote.scale.clone().multiplyScalar(1 / drumScale);

    // The cone in the sample note's mesh is offset from the mesh origin (the
    // mesh was authored so the object origin sits at the drum's center while
    // the cone shape itself is positioned out at the drum's surface). We
    // measure that offset from the geometry's bounding box and subtract it
    // back out when placing each clone, so the cone ends up exactly at the
    // desired drum-local position regardless of where the mesh origin is.
    noteGeom.computeBoundingBox();
    const coneOffsetMeshLocal = noteGeom.boundingBox.getCenter(new THREE.Vector3());

    // Each tooth's position along the drum's cylinder axis (drum-local Y).
    const drumWorldInv = new THREE.Matrix4().copy(this.drum.matrixWorld).invert();
    const toothAxialY = [];
    for (let i = 0; i < 18; i++) {
      const t = this.toothObjects[i];
      if (!t) { toothAxialY.push(0); continue; }
      const v = new THREE.Vector3();
      t.getWorldPosition(v);
      v.applyMatrix4(drumWorldInv);
      toothAxialY.push(v.y);
    }

    // Timing
    const totalLoop = DRUM_ROTATION_PERIOD_SEC;
    const songDuration = SONG_DURATION_SEC;
    const N = this.events.length;

    // Contact angle in drum-local XZ plane. Per the model, a pin triggers
    // its tooth 90° further around than the bare -Y world direction would
    // suggest — the cone needs to sweep up past the teeth before plucking.
    const contactAngle = Math.PI;
    const meshAxis = new THREE.Vector3(0, 1, 0); // cone extends in mesh +Y

    // Sample note's cone center in drum-local (we copy its position so that
    // event 0 with toothNum matching the sample note would align exactly).
    const sampleNoteRadial = 0.095; // drum-local radial distance to the cone center

    // Per-event timings come from each event's `dur` weight in the tune file.
    this.eventTimes = computeEventTimes(this.events, songDuration);

    for (let i = 0; i < N; i++) {
      const t = this.eventTimes[i];
      const event = this.events[i];
      const drumAngleAtT = (t / totalLoop) * Math.PI * 2;
      // The drum spins in the negative-Y direction so the spin advances a
      // resting angle a by +drumAngleAtT. To trigger at time t_i the note's
      // resting angle must be contactAngle - drumAngleAtT.
      const a = contactAngle - drumAngleAtT;
      const radialDir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
      const quaternion = new THREE.Quaternion().setFromUnitVectors(meshAxis, radialDir);

      for (const toothNum of event.teeth) {
        if (toothNum < 1 || toothNum > 18) continue;
        const axialY = toothAxialY[toothNum - 1];

        const note = new THREE.Mesh(noteGeom, noteMat.clone());
        note.castShadow = true;
        note.receiveShadow = true;
        note.scale.copy(baseScale);
        note.quaternion.copy(quaternion);

        // Desired cone center in drum-local: at the drum's surface radial,
        // at the target tooth's axial Y, at the chosen angle a.
        const desiredConeCenter = new THREE.Vector3(
          sampleNoteRadial * Math.cos(a),
          axialY,
          sampleNoteRadial * Math.sin(a)
        );
        // The mesh's cone-center vertex moves through scale+rotation; we
        // subtract that offset so the note's position lines the cone up at
        // the desired drum-local point.
        const meshOffsetTransformed = coneOffsetMeshLocal.clone()
          .multiply(baseScale)
          .applyQuaternion(quaternion);
        note.position.copy(desiredConeCenter).sub(meshOffsetTransformed);

        addEdgeLines(note, 1); // small threshold so the cone edges show
        this.drum.add(note);
      }
    }

    sampleNote.visible = false;
  }

  // ---------- Camera ----------
  _orbitTargetPosition() {
    const t = this.cam.target;
    const az = this.cam.orbitAzimuth;
    const el = this.cam.orbitElevation;
    const r = this.cam.orbitRadius;
    // Orbit position around the target.
    const x = t.x + r * Math.cos(el) * Math.cos(az);
    const y = t.y + r * Math.cos(el) * Math.sin(az);
    const z = t.z + r * Math.sin(el);

    // Forward = direction from camera to target on the horizontal plane.
    // Camera right (for an up = +Z scene) is forward × up = (fwd.y, -fwd.x, 0).
    const fwd = new THREE.Vector3(t.x - x, t.y - y, 0).normalize();
    const right = new THREE.Vector3(fwd.y, -fwd.x, 0);
    return {
      pos: new THREE.Vector3(x, y, z),
      fwd, right,
    };
  }

  _applyCameraFromState() {
    const { pos, fwd, right } = this._orbitTargetPosition();
    // Forward offset (joystick up/down) is a true zoom: slide the camera
    // along the line from the orbit position to the target so the viewing
    // angle stays the same and the model just gets larger/smaller.
    const toTarget = this.cam.target.clone().sub(pos).normalize();
    pos.addScaledVector(toTarget, this.cam.offsetForward);

    // Align camera with target first.
    this.camera.position.copy(pos);
    this.camera.up.set(0, 0, 1);
    this.camera.lookAt(this.cam.target);

    // Lateral offset is applied AFTER the lookAt so the camera's orientation
    // stays as it was — moving the camera sideways without re-aiming, which
    // means the model slides across the frame rather than staying centered.
    if (this.cam.offsetLateral !== 0) {
      this.camera.position.addScaledVector(right, this.cam.offsetLateral);
    }
  }

  resetCamera() {
    Object.assign(this.cam, this.defaultCam);
    this._applyCameraFromState();
  }

  // ---------- Intro ----------
  startIntro(onEnd) {
    this.onIntroEnd = onEnd;
    this.introTime = 0;
    this.introActive = true;
    // Initialize default camera state (orbit) based on the curve end point
    const endPt = this.introCurve.getPoint(1.0);
    const target = new THREE.Vector3(0, 0, 1);
    const offset = endPt.clone().sub(target);
    const radius = Math.hypot(offset.x, offset.y, offset.z);
    const azimuth = Math.atan2(offset.y, offset.x);
    const elevation = Math.asin(Math.max(0, Math.min(0.999, offset.z / radius)));
    this.cam.orbitAzimuth = azimuth;
    this.cam.orbitElevation = elevation;
    this.cam.orbitRadius = radius;
    this.cam.target.set(0, 0, 1);
    Object.assign(this.defaultCam, {
      orbitAzimuth: azimuth,
      orbitElevation: elevation,
      orbitRadius: radius,
      offsetForward: 0,
      offsetLateral: 0,
    });
  }

  // ---------- Animation control ----------
  setPaused(p) { this.crankPaused = p; }
  isPaused() { return this.crankPaused; }
  skipIntro() {
    if (!this.introActive) return;
    this.introActive = false;
    this._applyCameraFromState();
    if (this.onIntroEnd) this.onIntroEnd();
  }

  // ---------- Update / render ----------
  applyCameraInput(orbitInput, offsetInput, dt) {
    // orbitInput.x = -1..1 (left = -1) -> azimuth velocity
    // orbitInput.y = -1..1 (up = -1)   -> elevation velocity
    const azSpeed = 1.6; // rad/sec at full stick
    const elSpeed = 1.0;
    this.cam.orbitAzimuth -= orbitInput.x * azSpeed * dt;
    this.cam.orbitElevation -= orbitInput.y * elSpeed * dt;
    const maxEl = THREE.MathUtils.degToRad(85);
    const minEl = THREE.MathUtils.degToRad(0);
    if (this.cam.orbitElevation > maxEl) this.cam.orbitElevation = maxEl;
    if (this.cam.orbitElevation < minEl) this.cam.orbitElevation = minEl;

    // offsetInput.x -> lateral, offsetInput.y -> forward/closer
    const latSpeed = 3.0;
    const fwdSpeed = 3.0;
    this.cam.offsetLateral += offsetInput.x * latSpeed * dt;
    this.cam.offsetForward -= offsetInput.y * fwdSpeed * dt; // up = closer
    // Clamp offsets so the user can't run the camera into the model or back forever.
    this.cam.offsetLateral = THREE.MathUtils.clamp(this.cam.offsetLateral, -6, 6);
    this.cam.offsetForward = THREE.MathUtils.clamp(this.cam.offsetForward, -6, 6);
  }

  update(dt) {
    // Intro plays its own camera path
    if (this.introActive) {
      this.introTime += dt;
      const t = Math.min(1, this.introTime / this.introDuration);
      // Ease in-out
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const p = this.introCurve.getPoint(e);
      this.camera.position.copy(p);
      this.camera.up.set(0, 0, 1);
      this.camera.lookAt(0, 0, 1);
      if (t >= 1) {
        this.introActive = false;
        this._applyCameraFromState();
        if (this.onIntroEnd) this.onIntroEnd();
      }
    } else {
      this._applyCameraFromState();
    }

    // Crank + drum rotation. crankSpeed eases toward 0 (paused) or 1
    // (running) over `crankSpinUpTime`, giving the drum some inertia so
    // pausing/resuming doesn't feel instantaneous.
    const targetSpeed = this.crankPaused ? 0 : 1;
    const speedDelta = (targetSpeed - this.crankSpeed) * Math.min(1, dt / this.crankSpinUpTime);
    this.crankSpeed += speedDelta;
    const effectiveDt = dt * this.crankSpeed;
    if (effectiveDt > 0) {
      const drumAngVel = (2 * Math.PI) / DRUM_ROTATION_PERIOD_SEC;
      this.driveAngle += drumAngVel * effectiveDt;
      this.songElapsed += effectiveDt;
    }

    if (this.drum) {
      // After Blender's GLTF y-up conversion, the drum's mesh cylinder is
      // along its local Y axis. The cylinder axis in world is +X, but we
      // spin in the negative direction so the pins sweep UP from the bottom
      // and hit the teeth from below (the natural music-box motion).
      const baseQuat = this._drumBaseQuat ?? (this._drumBaseQuat = this.drum.quaternion.clone());
      const spin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -this.driveAngle);
      this.drum.quaternion.copy(baseQuat).multiply(spin);
    }

    if (this.handle) {
      // The handle's rod is along its local Z axis (longest mesh extent in
      // three.js after the GLTF y-up conversion). Spinning around local Z
      // turns the crank around its own shaft.
      const baseQuat = this._handleBaseQuat ?? (this._handleBaseQuat = this.handle.quaternion.clone());
      const angle = this.driveAngle * CRANK_TO_DRUM_RATIO;
      const spin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
      this.handle.quaternion.copy(baseQuat).multiply(spin);
    }

    // Tooth animations
    for (const ta of this.toothAnims) {
      if (ta) ta.update(dt);
    }

    // Schedule events: check which notes should have played this frame.
    // We gate on crankSpeed rather than crankPaused so events still fire as
    // the drum coasts down to a stop.
    if (this.crankSpeed > 0.0001) {
      // Loop the song every 17s (1 drum rev).
      const loopT = this.songElapsed % DRUM_ROTATION_PERIOD_SEC;
      // Reset event index when loop wraps.
      if (loopT < this._lastLoopT) {
        this.eventDueIdx = 0;
      }
      this._lastLoopT = loopT;
      const N = this.events.length;
      while (this.eventDueIdx < N) {
        const due = this.eventTimes ? this.eventTimes[this.eventDueIdx] : 0;
        if (loopT >= due) {
          const ev = this.events[this.eventDueIdx];
          for (const toothNum of ev.teeth) {
            const idx = toothNum - 1;
            if (idx < 0 || idx >= 18) continue;
            const anim = this.toothAnims[idx];
            const pa = this.toothPositional[idx];
            if (anim) anim.pluck();
            if (pa) this.piano.pluck(toothNum, pa, 1.0);
          }
          this.eventDueIdx++;
        } else {
          break;
        }
      }
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  _onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}
