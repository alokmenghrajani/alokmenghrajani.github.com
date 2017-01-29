// TODO: there are three different kinds of nodes:
// symmetric, smooth and corner node.
function BezierNode(position, control) {
  this.position = position;
  this.control = control;
}

BezierNode.prototype.handleMouseMove = function(point, button) {
  if (!button) {
    return;
  }
  var delta = point.minus(this.position)
  this.position.moveBy(delta);
  this.control.moveBy(delta);
  this.mouseOver = true;
}

BezierNode.prototype.render = function(ctx) {
  // circle to mark node (TODO: use a different shape for different types of
  // nodes)
  this.position.circle(ctx, 'black');
  this.control.circle(ctx, 'blue');

  ctx.beginPath();
  ctx.moveTo(this.position._x, this.position._y);
  ctx.lineTo(this.control._x, this.control._y);
  ctx.stroke();
}
