/**
 * Converts a path into an array of points.
 *
 * Uses animateMotion and setInterval to "steal" the points from the path.
 * It's very hacky and I have no idea how well it works.
 *
 * @param SVGPathElement  path to convert
 * @param int             approximate number of points to read
 * @param callback        gets called once the data is ready
 */
function PathToPoints(path, resolution, onDone) {
  var ctx = {};
  ctx.resolution = resolution;
  ctx.onDone = onDone;
  ctx.points = [];
  ctx.interval = null;

  // Walk up nodes until we find the root svg node
  var svg = path;
  while (!(svg instanceof SVGSVGElement)) {
    svg = svg.parentElement;
  }

  // Create a rect, which will be used to trace the path
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  ctx.rect = rect;
  rect.setAttribute("width", "2");
  rect.setAttribute("height", "2");  
  svg.appendChild(rect);

  var motion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
  motion.setAttribute("path", path.getAttribute("d"));
  motion.setAttribute("begin", "indefinite");
  motion.setAttribute("dur", "2"); // TODO: set this to some larger value, e.g. 10 seconds?
  motion.setAttribute("repeatCount", "1");
  motion.onbegin = PathToPoints.beginRecording.bind(this, ctx);
  motion.onend = PathToPoints.stopRecording.bind(this, ctx);

  // Add rect
  rect.appendChild(motion);
  motion.beginElement();
};

PathToPoints.beginRecording = function(ctx) {
  var m = ctx.rect.getScreenCTM();
  ctx.points.push({x: m.e, y: m.f});
  ctx.interval = setInterval(PathToPoints.recordPosition.bind(this, ctx), 1000*3/ctx.resolution);
};

PathToPoints.stopRecording = function(ctx) {
  clearInterval(ctx.interval);

  // Remove the rect
  ctx.rect.remove();

  // TODO: I sometimes get outliers (probably first or last point). Find a way
  // to remove outliers (using some stats or maybe running the scan multiple
  // times)?

  ctx.onDone(ctx.points);
}

PathToPoints.recordPosition = function(ctx) {
  var m = ctx.rect.getScreenCTM();
  ctx.points.push({x: m.e, y: m.f});
};

function rotate(point, angle) {
  return {x: Math.sin(angle) * point, y: Math.cos(angle) * point};
}

function getBounds(points) {
  var min_x = points[0].x;
  var max_x = points[0].x;
  var min_y = points[0].y;
  var max_y = points[0].y;
  for (var i=1; i<points.length; i++) {
    min_x = Math.min(min_x, points[i].x);
    max_x = Math.max(max_x, points[i].x);
    min_y = Math.min(min_y, points[i].y);
    max_y = Math.max(max_y, points[i].y);
  }
  return {min_x: min_x, max_x: max_x, min_y: min_y, max_y: max_y};
}

/**
 * Creates various instances of closed_path:
 * - the vertical position is based on open_path's y coordinate.
 * - the scale is based on open_path's x coordinate.
 */ 
function PointsTo3D(profile_path, base_path) {
  // Hack to prevent mutation
  profile_path = JSON.parse(JSON.stringify(profile_path));
  base_path = JSON.parse(JSON.stringify(base_path));

  var pieceVertices = [];

  // We need to move + resize open_path to fit inside [0, -0.5]-[1, 0.5]
  var bounds1 = getBounds(profile_path);
  var factor = 120; //Math.max(bounds1.max_x - bounds1.min_x, bounds1.max_y - bounds1.min_y);

  for (var i=0; i<profile_path.length; i++) {
    profile_path[i].x = (profile_path[i].x - bounds1.min_x) / factor;
    profile_path[i].y = -(profile_path[i].y - bounds1.min_y - (bounds1.max_y - bounds1.min_y)/2) / factor;
  }

  // Resize based_path by the same factor. Center it.
  var bounds2 = getBounds(base_path);
  for (var i=0; i<base_path.length; i++) {
    base_path[i].x = (base_path[i].x - (bounds2.max_x + bounds2.min_x)/2) / factor;
    base_path[i].y = (base_path[i].y - (bounds2.max_y + bounds2.min_y)/2) / factor;
  }
  // We add an extra point, to close the path
  base_path[base_path.length] = base_path[0];

  // Create vertices by "cloning" base path
  for (var i=0; i<profile_path.length; i++) {
    for (var j=0; j<base_path.length-1; j++) {
      // For now, vertices will be rendered as lines, so we need to compute two
      // points. Once we switch to triangles, we'll have to compute 4 points.

      var p0 = {
        x: base_path[j].x * (profile_path[i].x / profile_path[0].x),
        z: profile_path[i].y,
        y: base_path[j].y * (profile_path[i].x / profile_path[0].x)
      }

      var p1 = {
        x: base_path[j+1].x * (profile_path[i].x / profile_path[0].x),
        z: profile_path[i].y,
        y: base_path[j+1].y * (profile_path[i].x / profile_path[0].x)
      }

      // build line P0-P1
      pieceVertices.push(p0.x, p0.y, p0.z);
      pieceVertices.push(p1.x, p1.y, p1.z);
    }
  }

  var pieceBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pieceBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pieceVertices), gl.STATIC_DRAW);
  pieceBuffer.itemSize = 3;
  pieceBuffer.numItems = pieceVertices.length/3;

  return pieceBuffer;
}

var gl;
function initGL(canvas) {
  try {
    gl = canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {
  }
  if (!gl) {
    alert("Could not initialise WebGL, sorry :-(");
  }
}

// Lots more webgl boiler plate.

function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }

  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }

  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
      return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

var shaderProgram;

function initShaders() {
  var fragmentShader = getShader(gl, "shader-fs");
  var vertexShader = getShader(gl, "shader-vs");

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
  }

  gl.useProgram(shaderProgram);

  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}

// Keeps track of the mouse related angle
var pos = mat4.create();
mat4.identity(pos);

function tick() {
  // make sure we come back here for the next frame
  requestAnimFrame(tick);

  // draw everything
  drawScene();
}

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var lastMouseDX = 10;
var lastMouseDY = 0;
var lastMouseDownX = null;
var lastMouseDownY = null;

function handleMouseDown(event) {
  mouseDown = true;
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
  lastMouseDownX = event.clientX;
  lastMouseDownY = event.clientY;
}

function handleMouseUp(event) {
  mouseDown = false;
  var newX = event.clientX;
  var newY = event.clientY;

  if (((newX - lastMouseDownX)*(newX - lastMouseDownX)
       + (newY - lastMouseDownY)*(newY - lastMouseDownY)) < 10) {
    // the mouse was released close to where it went down, so we'll
    // stop rotating things
    lastMouseDX = 0;
    lastMouseDY = 0;
  }
}

function handleMouseMove(event) {
  if (!mouseDown) {
    return;
  }
  var newX = event.clientX;
  var newY = event.clientY;

  lastMouseDX = newX - lastMouseX;
  lastMouseDY = newY - lastMouseY;
  lastMouseX = newX;
  lastMouseY = newY;
}

