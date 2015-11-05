/**
 * polyfold.js
 *
 * A piece of code to handle folding polygons (think Origami).
 *
 * Right now this code is pretty rough. It assumes that mat4 and mvMatrix exist
 * in global space.
 *
 * I plan to improve this piece of code in two ways:
 * 1. computing the transformation matrix given a rotation edge. It would make
 *    building solids much easier!
 * 2. spliting polygons into sub-polygons on the fold. It would allow me to do things
 *    like simulate a sheet of paper getting folded into a paper plane.
 */

function Polyfold(vertices, color) {
  Polyfold.root.push(this);
  this.children = [];
  this.drawStyle = gl.TRIANGLE_FAN;

  this.vertexPositionBuffer = gl.createBuffer();
  this.vertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  var vertices_3d = [];
  var colors = [];
  var n_vertices = vertices.length / 2;
  for (var i=0; i<n_vertices; i++) {
    vertices_3d.push(vertices[i*2], vertices[i*2+1], 0.0);
    colors = colors.concat(color);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_3d), gl.STATIC_DRAW);
  this.vertexPositionBuffer.itemSize = 3;
  this.vertexPositionBuffer.numItems = n_vertices;
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  this.vertexColorBuffer.itemSize = 4;
  this.vertexColorBuffer.numItems = n_vertices;
}

Polyfold.root = [];
Polyfold.mvMatrixStack = [];

Polyfold.pushMatrix = function() {
  var copy = mat4.create();
  mat4.set(mvMatrix, copy);
  Polyfold.mvMatrixStack.push(copy);
}

Polyfold.popMatrix = function() {
  if (Polyfold.mvMatrixStack.length == 0) {
    throw "Invalid popMatrix!";
  }
  mvMatrix = Polyfold.mvMatrixStack.pop();
}

Polyfold.prototype.addTo = function(parent) {
  parent.children.push(this);
  // remove this from Polyfold.root
  for (var i=0; i<Polyfold.root.length; i++) {
    if (Polyfold.root[i] == this) {
      Polyfold.root.splice(i, 1);
      return;
    }
  }
  throw "this not found in Polyfold.root!";
}

Polyfold.render = function() {
  for (var i=0; i<Polyfold.root.length; i++) {
    Polyfold.root[i].render();
  }
}

Polyfold.prototype.render = function() {
  Polyfold.pushMatrix();

  if (this.hasOwnProperty('preRender')) {
    this['preRender']();
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
  setMatrixUniforms();
  gl.drawArrays(this.drawStyle, 0, this.vertexPositionBuffer.numItems);

  for (var i=0; i<this.children.length; i++) {
    this.children[i].render();
  }

  Polyfold.popMatrix();
}
