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
  motion.setAttribute("dur", "3"); // TODO: set this to some larger value, e.g. 10 seconds?
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
