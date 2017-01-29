function BezierPoint(x, y) {
  this._x = x;
  this._y = y;
  this._state = 0;
}

BezierPoint.State = {
  SELECTED: 1,
  MOUSE_OVER: 2,
  MOUSE_DRAG: 4
}

BezierPoint.prototype.handleMouseMove = function(cursor) {
  if (this.isNearby(cursor)) {
    this._state |= BezierPoint.State.MOUSE_OVER;
  } else {
    this._state &= ~BezierPoint.State.MOUSE_OVER;
  }
}

BezierPoint.prototype.moveTo = function(point) {
  this._x = point._x;
  this._y = point._y;
}

BezierPoint.prototype.moveBy = function(point) {
  this._x += point._x;
  this._y += point._y;
}

BezierPoint.prototype.minus = function(other) {
  var x = this._x - other._x;
  var y = this._y - other._y;
  return new BezierPoint(x, y);
}

BezierPoint.prototype.distance = function(other) {
  return Math.sqrt((this._x - other._x) * (this._x - other._x) +
    (this._y - other._y) * (this._y - other._y));
}

// Used for handling clicks
BezierPoint.prototype.isNearby = function(other) {
  return this.distance(other) < 5;
}

BezierPoint.prototype.midPoint = function(other) {
  var x = (this._x - other._x) * 0.5 + other._x;
  var y = (this._y - other._y) * 0.5 + other._y;
  return new BezierPoint(x, y);
}

BezierPoint.prototype.circle = function(ctx, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(this._x, this._y, 5, 0, 2*Math.PI);
  if (this._state == 0) {
    ctx.stroke();
  } else {
    // TODO: different fill styles
    ctx.fill();
  }
}