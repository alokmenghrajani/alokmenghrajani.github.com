import * as THREE from 'three';

// Map note number (1..18) to a frequency (Hz).
// 1 is the HIGHEST pitch (rightmost tooth, shortest physical tooth), 18 is
// the LOWEST (leftmost, longest tooth). A real music-box comb is high-pitched
// (the reference recording's notes ranged from D5 ≈ 587 Hz up to ~A#6/D7),
// so we use A natural minor running from index 1 = E7 (top) down to A4
// (bottom) — 2.5 octaves of bright, bell-like pitches.
export const NOTE_NAMES = ['E7','D7','C7','B6','A6','G6','F6','E6','D6','C6','B5','A5','G5','F5','E5','D5','C5','A4'];

// Reverse lookup: note name → tooth number (1..18).
export const NOTE_TO_TOOTH = Object.fromEntries(NOTE_NAMES.map((n, i) => [n, i + 1]));

function midiFromName(name) {
  const m = name.match(/^([A-G])(#?)(\d)$/);
  const base = { C:0, D:2, E:4, F:5, G:7, A:9, B:11 }[m[1]];
  const acc = m[2] === '#' ? 1 : 0;
  const oct = parseInt(m[3], 10);
  return 12 + oct * 12 + base + acc;
}

function freq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export const NOTE_FREQS = NOTE_NAMES.map(n => freq(midiFromName(n)));

function buildMusicBoxWave(ctx) {
  // Real music-box teeth are stiff bars whose dominant partial is the
  // fundamental, with a couple of bright upper partials that give the
  // characteristic "tinkle." The fundamental needs to be strong enough that
  // the perceived pitch matches the note we're playing.
  const real = new Float32Array([
    0,
    1.00, // f1 fundamental (strong — pitch reference)
    0.45, // f2
    0.30, // f3
    0.55, // f4 (slight bell-mode emphasis)
    0.18, // f5
    0.28, // f6
    0.10, // f7
    0.15, // f8
    0.05,
    0.06,
    0.03,
    0.04,
  ]);
  const imag = new Float32Array(real.length);
  return ctx.createPeriodicWave(real, imag, { disableNormalization: false });
}

// Build a Blob URL for a short silent WAV. Playing this through a looping
// HTMLAudioElement on iOS moves Web Audio output onto the media channel,
// which (unlike the default ringer channel) is NOT silenced by the phone's
// hardware mute switch.
function makeSilentWavUrl() {
  const sampleRate = 8000;
  const numSamples = sampleRate >> 1; // ~0.5s
  const dataSize = numSamples;        // 8-bit mono
  const buf = new ArrayBuffer(44 + dataSize);
  const dv = new DataView(buf);
  const str = (off, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(off + i, s.charCodeAt(i)); };
  str(0, 'RIFF');
  dv.setUint32(4, 36 + dataSize, true);
  str(8, 'WAVE');
  str(12, 'fmt ');
  dv.setUint32(16, 16, true);
  dv.setUint16(20, 1, true);          // PCM
  dv.setUint16(22, 1, true);          // mono
  dv.setUint32(24, sampleRate, true);
  dv.setUint32(28, sampleRate, true); // byte rate
  dv.setUint16(32, 1, true);          // block align
  dv.setUint16(34, 8, true);          // bits per sample
  str(36, 'data');
  dv.setUint32(40, dataSize, true);
  for (let i = 0; i < dataSize; i++) dv.setUint8(44 + i, 128); // 8-bit silence
  return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
}

function buildNoiseBuffer(ctx) {
  const len = Math.floor(ctx.sampleRate * 0.1);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.012));
  }
  return buf;
}

export class PianoAudio {
  constructor(listener) {
    this.listener = listener;
    this.ctx = listener.context;
    this.wave = buildMusicBoxWave(this.ctx);
    this.noiseBuf = buildNoiseBuffer(this.ctx);

    // Silent looping <audio> element — used to bypass the iOS mute switch.
    this._silentEl = new Audio();
    this._silentEl.src = makeSilentWavUrl();
    this._silentEl.loop = true;
    this._silentEl.preload = 'auto';
    this._silentEl.setAttribute('playsinline', '');
    this._unlocked = false;
  }

  // Returns a THREE.PositionalAudio whose internal panner can be used
  // as the destination of dynamically-built oscillator chains.
  createPositionalAt(parent) {
    const pa = new THREE.PositionalAudio(this.listener);
    pa.setRefDistance(1.0);
    pa.setRolloffFactor(1.2);
    pa.setMaxDistance(40);
    pa.setDistanceModel('inverse');
    // Make sure the internal gain is unity; we mix at the per-note envelope.
    pa.gain.gain.value = 0.5;
    parent.add(pa);
    return pa;
  }

  // Play note `n` (1..18) through `pa` (THREE.PositionalAudio).
  // Connects a small synth graph into pa.panner so positional audio applies.
  pluck(n, pa, velocity = 1.0) {
    if (n < 1 || n > 18) return;
    const ctx = this.ctx;
    const f = NOTE_FREQS[n - 1];
    const now = ctx.currentTime;

    // Per-note envelope
    const env = ctx.createGain();
    env.gain.value = 0;
    env.connect(pa.panner);

    // Main music-box-tone oscillator (custom wave with bell-like spectrum).
    const osc = ctx.createOscillator();
    osc.setPeriodicWave(this.wave);
    osc.frequency.value = f;
    osc.connect(env);

    // A second sine at an inharmonic ratio (~2.76×) — real metal bars have
    // bending modes off the harmonic series, giving the tinkly sparkle.
    const oscIH = ctx.createOscillator();
    oscIH.type = 'sine';
    oscIH.frequency.value = f * 2.76;
    const oscIHGain = ctx.createGain();
    oscIHGain.gain.value = 0;
    oscIH.connect(oscIHGain).connect(env);

    // Pin "tick" — short filtered noise burst at the moment of pluck.
    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuf;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = Math.min(9000, f * 3);
    noiseFilter.Q.value = 1.5;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0;
    noise.connect(noiseFilter).connect(noiseGain).connect(env);

    // Decay: short and clear. ~1.2s for top notes, up to ~2.5s for bottom.
    const decay = Math.min(2.5, 0.9 + 350 / f);
    const ihDecay = decay * 0.5;
    const peak = 0.55 * velocity;

    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(peak, now + 0.003);
    env.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    oscIHGain.gain.setValueAtTime(0, now);
    oscIHGain.gain.linearRampToValueAtTime(0.20 * velocity, now + 0.003);
    oscIHGain.gain.exponentialRampToValueAtTime(0.0001, now + ihDecay);

    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.25 * velocity, now + 0.001);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.start(now);
    oscIH.start(now);
    noise.start(now);
    osc.stop(now + decay + 0.05);
    oscIH.stop(now + ihDecay + 0.05);
    noise.stop(now + 0.08);
  }

  // Fully unlock audio for iOS Safari. MUST be called from within a user
  // gesture handler (click/touch). iOS needs three things:
  //   1. the AudioContext resumed (it starts 'suspended', and can also enter
  //      an 'interrupted' state after phone calls / app switches),
  //   2. a real AudioBufferSourceNode .start()-ed inside the gesture, and
  //   3. a media element playing, so output routes around the mute switch.
  unlock() {
    const ctx = this.ctx;
    if (ctx.state !== 'running' && ctx.resume) {
      ctx.resume().catch(() => {});
    }
    // Play one sample of silence through the destination — the in-gesture
    // source start is what actually flips iOS audio on.
    try {
      const src = ctx.createBufferSource();
      src.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
      src.connect(ctx.destination);
      src.start(0);
    } catch (e) { /* ignore */ }
    // Start the silent loop so Web Audio rides the media channel.
    const p = this._silentEl.play();
    if (p && p.catch) p.catch(() => {});
    this._unlocked = true;
  }

  // Lightweight resume — safe to call on visibilitychange / pointer events.
  resume() {
    const ctx = this.ctx;
    if (ctx.state !== 'running' && ctx.resume) {
      return ctx.resume().catch(() => {});
    }
    if (this._unlocked && this._silentEl.paused) {
      const p = this._silentEl.play();
      if (p && p.catch) p.catch(() => {});
    }
    return Promise.resolve();
  }
}
