function FakeCanvas() {
  this.width = 0;
  this.height = 0;
  this.context = new FakeContext();
}

FakeCanvas.assert = function(cond, msg) {
  if (!cond) {
    throw msg;
  }  
}

FakeCanvas.prototype.getContext = function(type) {
  FakeCanvas.assert(type === '2d', '');
  return this.context;
}

FakeCanvas.prototype.assertSame = function(otherCanvas) {
  FakeCanvas.assert(this.width === otherCanvas.width, "this.width ("+this.width+") !== otherCanvas.width ("+otherCanvas.width+")");
  FakeCanvas.assert(this.height === otherCanvas.height, "this.height ("+this.height+") !== otherCanvas.height ("+otherCanvas.height+")");

  var ctx1 = this.getContext('2d');
  var ctx2 = otherCanvas.getContext('2d');
  for (var row = 0; row < this.width; row++) {
    for (var col = 0; col < this.height; col++) {
      var c1 = ctx1.getPixel(row, col);
      var c2 = ctx2.getPixel(row, col);
      FakeCanvas.assert(c1 == c2, "c1 ("+c1+") != c2 ("+c2+")");
    }
  }
}

function FakeContext() {
  this.pixels = [];
  this.fillStyle = "#000000";
}

FakeContext.prototype.fillRect = function(x, y, w, h) {
  for (var i=x; i<x+w; i++) {
    for (var j=y; j<y+h; j++) {
      this.setPixel(i, j);
    }
  }
}

FakeContext.prototype.setPixel = function(x, y) {
  if (typeof this.pixels[x] === "undefined") {
    this.pixels[x] = [];
  }
  this.pixels[x][y] = this.fillStyle;
}

FakeContext.prototype.getPixel = function(x, y) {
  if (this.pixels[x] == undefined) {
    return "#ffffff";
  }
  if (this.pixels[x][y] == undefined) {
    return "#ffffff";
  }
  return this.pixels[x][y];
}