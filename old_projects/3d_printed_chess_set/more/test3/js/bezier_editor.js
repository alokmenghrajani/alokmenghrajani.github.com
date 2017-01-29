function BezierEditor(canvas) {
  this.ctx = canvas.getContext('2d');
  canvas.addEventListener('mousedown', e => this.handleMouseDown(e));
  canvas.addEventListener('mouseup', e => this.handleMouseUp(e));
  canvas.addEventListener('mousemove', e => this.handleMouseMove(e));

  // Array of BezierNode for the current curve.
  this.nodes = [];
  // List of nodes which have been selected.
  this.selectedNodes = [];
  this.selectedControl = null;
}

BezierEditor.prototype.setNodes = function(nodes) {
  this.nodes = nodes;
}

BezierEditor.prototype.render = function() {
  this.ctx.clearRect(0, 0, canvas.scrollWidth, canvas.scrollHeight);
  this.nodes.forEach(n => n.render(this.ctx))
  for (var i=0; i<this.nodes.length-1; i++) {
    this.drawBezierCurve(this.nodes[i].position,
      this.nodes[i].control,
      this.nodes[i+1].control,
      this.nodes[i+1].position);
  }
}

BezierEditor.prototype.drawBezierCurve = function(p0, c0, c1, p1) {
  // if p0-c0 + c0-c1 + c1-p1 is roughly
  // equal to p0-p1, then we are done.
  var d1 = p0.distance(c0) + c0.distance(c1) + c1.distance(p1);
  var d2 = p0.distance(p1);
  if (1 - d2/d1 <= 1/1024) {
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.moveTo(p0._x, p0._y);
    this.ctx.lineTo(p1._x, p1._y);
    this.ctx.stroke();
    return;
  }

  // recurively draw both halves
  var p2 = p0.midPoint(c0);
  var p3 = c0.midPoint(c1);
  var p4 = c1.midPoint(p1);
  var x = p2.midPoint(p3);
  var y = p3.midPoint(p4);
  var p = x.midPoint(y);

  this.drawBezierCurve(p0, p2, x, p);
  this.drawBezierCurve(p, y, p4, p1);
}

// you can either move one or more nodes or move the control
// point of a given node.
BezierEditor.prototype.handleMouseDown = function(e) {
  console.log("handling mouse down");
  // TODO: handle multiple selection

  var cursor = new BezierPoint(e.offsetX, e.offsetY);
  this.nodes.forEach(n => {
    if (n.position.isNearby(cursor)) {
      this.selectedNodes.push(n);
    }
    if (n.control.isNearby(cursor)) {
      this.selectedControl = n.control;
    }
  });
}

BezierEditor.prototype.handleMouseUp = function(e) {
  console.log("handling mouse up");
  if (!e.metaKey) {
    this.selectedNodes = [];
  }
  this.selectedControl = null;
}

BezierEditor.prototype.handleMouseMove = function(e) {
  var cursor = new BezierPoint(e.offsetX, e.offsetY);
  this.nodes.forEach(n => n.position.handleMouseMove(cursor, e.buttons))
  this.selectedNodes.forEach(n => n.handleMouseMove(cursor, e.buttons));

  if (this.selectedControl) {
    this.selectedControl.moveTo(cursor);
  }
  this.render();
}

