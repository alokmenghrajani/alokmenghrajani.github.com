/*CSG.V = function(v) {
  if (v instanceof CSG.Vector) {
    return v;
  } else {
    return new CSG.Vector(v);
  }
};*/

CSG.Vector.prototype.isSame = function(other) {
  var r =
    (Math.abs(this.x - other.x) < 0.001) &&
    (Math.abs(this.y - other.y) < 0.001) &&
    (Math.abs(this.z - other.z) < 0.001);
  return r;
};

CSG.Polygon.prototype.translate = function(offset) {
  var new_vertices = [];
  for (var i=0; i<this.vertices.length; i++) {
    new_vertices.push(new CSG.Vertex(this.vertices[i].pos.plus(offset), this.vertices[i].normal));
  }
  return new CSG.Polygon(new_vertices, this.shared);
}

/**
 * A Path is defined as a SVG path element. The path can be converted to points,
 * but it is more reliable (due to various race conditions) to cache the result.
 *
 * A better longer term plan would be to manually render the SVG path.
 */
function Path(svg, cached_points) {
  var rootSvg = document.getElementsByTagName('svg')[0];
  this.p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  this.p.setAttribute('style', "fill:none;stroke:#000000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1");
  this.p.setAttribute('d', svg);
  rootSvg.appendChild(this.p);

  // We'll assume all paths are open by default
  this.openPath = true;

  if (cached_points) {
    this.points = JSON.parse(JSON.stringify(cached_points));
  } else {
    // TODO: run scan
    debugger;
  }
}

Path.prototype.scan = function() {
  PathToPoints(this.p, 100, function(points) {
    console.log(JSON.stringify(points));
  });
}

/**
 * Releases the DOM node when the Path is no longer needed.
 */
Path.prototype.free = function() {
  // TODO: do I need to ensure scan is finished?
  if (this.p) {
    this.p.parentNode.removeChild(this.p);
    this.p = null;
  }
}

/**
 * Centers current path by moving every point by (min-max)/2
 */
Path.prototype.center = function() {
  var bounds = this.getBounds();
  this.move(-bounds.center_x, -bounds.center_y);
}

/**
 * Moves path by dx, dy
 */
Path.prototype.move = function(dx, dy) {
  for (var i=0; i<this.points.length; i++) {
    this.points[i].x += dx;
    this.points[i].y += dy;
  }
}

/**
 * Resizes path
 */
Path.prototype.resize = function(factorX, factorY) {
  if (factorY == undefined) {
    factorY = factorX;
  }
  for (var i=0; i<this.points.length; i++) {
    this.points[i].x *= factorX;
    this.points[i].y *= factorY;
  }
}

/**
 * Returns info about the current path:
 * min/max, width/height, center
 */
Path.prototype.getBounds = function() {
  var p = this.points;
  var min_x = p[0].x;
  var max_x = p[0].x;
  var min_y = p[0].y;
  var max_y = p[0].y;
  for (var i=1; i<p.length; i++) {
    min_x = Math.min(min_x, p[i].x);
    max_x = Math.max(max_x, p[i].x);
    min_y = Math.min(min_y, p[i].y);
    max_y = Math.max(max_y, p[i].y);
  }
  var r = {min_x: min_x, max_x: max_x, min_y: min_y, max_y: max_y};
  r.size_x = max_x - min_x;
  r.size_y = max_y - min_y;
  r.center_x = (min_x + max_x) / 2;
  r.center_y = (min_y + max_y) / 2;
  return r;
}

/**
 * Given an open path, creates a closed path by adding the first point
 * as the last point.
 */
Path.prototype.close = function() {
  if (this.openPath) {
    this.points.push({x: this.points[0].x, y: this.points[0].y});
    this.openPath = false;
  }
}

/**
 * Helper function
 */
function Triangle(p0, p1, p2) {
  var vec0 = new CSG.Vector(p0);
  var vec1 = new CSG.Vector(p1);
  var vec2 = new CSG.Vector(p2);
  var normal = CSG.Plane.fromPoints(vec0, vec2, vec1).normal;

  return new CSG.Polygon([
    new CSG.Vertex(vec0, normal),
    new CSG.Vertex(vec1, normal),
    new CSG.Vertex(vec2, normal)]);
}
/*
Triangle.prototype.move = function(dx, dy, dz) {
  var dv = new CSG.Vector3D(dx, dy, dz);
  var vec0 = this.vertices[0].pos.plus(dv);
  var vec1 = this.vertices[1].pos.plus(dv);
  var vec2 = this.vertices[2].pos.plus(dv);
  return new Triangle(vec0, vec1, vec2);
}

Triangle.prototype.clone = function() {
  var vertices = this.vertices.map(function(v) { return v.clone(); });
  return new Triangle(vertices[0].pos, vertices[1].pos, vertices[2].pos);
};

Triangle.prototype.flip = function() {
  this.vertices.reverse().map(function(v) { v.flip(); });
  this.plane.flip();
};
*/

// TODO: we don't need to re-compute the normal for each triangle.
// Hack to generate normals in right direction.

CSG.prototype.toTriangles = function() {
//  this.fixTJunctions();
  return;

  var p = this.polygons;
  this.polygons = [];
  for (var i=0; i<p.length; i++) {
    var t = polygonToTriangles(p[i]);
    for (var j=0; j<t.length; j++) {
      this.polygons.push(t[j]);
    }
  }
}

function polygonToTriangles(polygon) {
  var r = [];
  if (polygon.vertices.length == 3) {
    r.push(polygon);
  } else {
    for (var i=0; i<polygon.vertices.length-2; i++) {
      var p = new CSG.Polygon([polygon.vertices[0], polygon.vertices[i+1], polygon.vertices[i+2]], polygon.shared, polygon.plane);
      r.push(p);
    }
  }
  return r;
}

function Solid() {
  this.polygons = [];
}

/**
 * TODO: use CSG.Vertex in caller?
 */
Solid.prototype.add = function(p0, p1, p2) {
  this.polygons.push(Triangle(p0, p1, p2));
}

/**
 * TODO: implement
 */
Solid.prototype.rotate = function() {
  var rotateVector = function(vector) {
    return new CSG.Vector(vector.y, vector.z, vector.x);
  }
  var triangles = [];
  for (var i=0; i<this.polygons.length; i++) {
    var t = this.polygons[i];
    triangles.push(Triangle(
      rotateVector(t.vertices[0].pos),
      rotateVector(t.vertices[1].pos),
      rotateVector(t.vertices[2].pos)
    ));
  }
  this.polygons = triangles;
}

Solid.prototype.move = function(dx, dy, dz) {
  for (var i=0; i<this.polygons.length; i++) {
    this.polygons[i] = this.polygons[i].translate({x: dx, y: dy, z: dz});
  }
}

/**
 * TODO: rethink this API.
 */
Solid.prototype.toCSG = function() {
  return CSG.fromPolygons(this.polygons);
}

/**
 * A piece is built using various transformations on paths.
 *
 * For each piece, we maintain a set of polygons and also webGl buffers.
 * // TODO: maybe polygons -> webgl should be handled somewhere else?
 */
function Piece() {
  this.name = 'unknown';
  this.paths = [];
  this.solids = [];
  this.glBuffer = null;
  this.glNormals = null;

  if (Piece.current) {
    Piece.current.free();
  }
  Piece.current = this;
}
Piece.current = null;

/**
 * Releases the Paths, which in turn will release dom nodes.
 */
Piece.prototype.free = function() {
  for (var i=0; i<this.paths.length; i++) {
    this.paths[i].free();
  }
}

/**
 * Given a SVG and points, creates a Path and adds it to the piece.
 *
 * TODO: it might lead to a cleaner API if everypath gets a name?
 */
Piece.prototype.loadPath = function(svg, points) {
  var path = new Path(svg, points)
  this.paths.push(path);
  return path;
}

Piece.prototype.loadKnight = function() {
  this.name = "knight";
  var p = PieceData['knight'];
  var basePath = this.loadPath(p.base_svg, p.base_points);
  var profilePath = this.loadPath(p.profile_svg, p.profile_points);

  // Center the base
  basePath.center();
  var boundsBase = basePath.getBounds();

  // Center the profile, and then move it away so the top closes.
  profilePath.center();
  var bounds = profilePath.getBounds();
  profilePath.move(-bounds.min_x, 0);
  profilePath.resize(1/520, -1/520);
  bounds = profilePath.getBounds();

  // Resize base so that things match up.
  basePath.resize(
    bounds.max_x / boundsBase.size_x * 2,
    bounds.max_x / boundsBase.size_y * 2
  );
  basePath.close();

  // Build the main body of the piece
  var body = buildSolid2(basePath, profilePath);
  body = body.toCSG();

  this.solids.push(body);

  this.finishLoad();
}

/**
 * Loads the Queen
 *
 * - profile + base gives most of the shape.
 * - we then remove some material (using 4 subtraction pieces)
 */
Piece.prototype.loadQueen = function() {
  this.name = "queen";
  var p = PieceData['queen'];
  var basePath = this.loadPath(p.base_svg, p.base_points);
  var profilePath = this.loadPath(p.profile_svg, p.profile_points);

  // Center the base
  basePath.center();
  var boundsBase = basePath.getBounds();

  // Center the profile, and then move it away so the top closes.
  profilePath.center();
  var bounds = profilePath.getBounds();
  profilePath.move(-bounds.min_x, 0);
  profilePath.resize(1/120, -1/120);
  bounds = profilePath.getBounds();

  // Resize base so that things match up.
  basePath.resize(
    bounds.max_x / boundsBase.size_x * 2,
    bounds.max_x / boundsBase.size_y * 2
  );
  basePath.close();

  // Build the main body of the piece
  var body = buildSolid(basePath, profilePath);
  body = body.toCSG();

  // Build the crown
/*  basePath.resize(1/8);
  var crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.rotate();
  crown.move(0, -bounds.max_x/8 + bounds.max_x/2 * 0.7, bounds.size_y/2 - bounds.max_x/4 * 2.5);
  crown = crown.toCSG();
  body = body.subtract(crown);

  crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.rotate();
  crown.move(0, -bounds.max_x/8 - bounds.max_x/2 * 0.7, bounds.size_y/2 - bounds.max_x/4 * 2.5);
  crown = crown.toCSG();
  body = body.subtract(crown);

  crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.rotate();
  crown.rotate();
  crown.move(-bounds.max_x/8 + bounds.max_x/2 * 0.7, 0, bounds.size_y/2 - bounds.max_x/4 * 2.5);
  crown = crown.toCSG();
  body = body.subtract(crown);

  crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.rotate();
  crown.rotate();
  crown.move(-bounds.max_x/8 - bounds.max_x/2 * 0.7, 0, bounds.size_y/2 - bounds.max_x/4 * 2.5);
  crown = crown.toCSG();
  body = body.subtract(crown);
*/
  var sphere = CSG.sphere({ center: [0.25, 0.25, .6], radius: 0.25, slices: 8, stacks: 8 });
  body = body.subtract(sphere);

  sphere = CSG.sphere({ center: [0.25, -0.25, .6], radius: 0.25, slices: 8, stacks: 8 });
  body = body.subtract(sphere);

  sphere = CSG.sphere({ center: [-.25, -0.25, .6], radius: 0.25, slices: 8, stacks: 8 });
  body = body.subtract(sphere);

  sphere = CSG.sphere({ center: [-0.25, 0.25, .6], radius: 0.25, slices: 8, stacks: 8 });
  body = body.subtract(sphere);

  basePath.resize(1/2);
  var crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.move(0, 0, -bounds.size_y/2);
  crown = crown.toCSG();
  body = body.subtract(crown);

  this.solids.push(body);

  this.finishLoad();
};

/**
 * Loads the bishop
 *
 * - profile + base gives most of the shape.
 * - we then remove some material (using 1 subtraction piece)
 */
Piece.prototype.loadBishop = function() {
  this.name = "bishop";
  var p = PieceData['bishop'];
  var basePath = this.loadPath(p.base_svg, p.base_points);
  var profilePath = this.loadPath(p.profile_svg, p.profile_points);

  // Center the base
  basePath.center();
  var boundsBase = basePath.getBounds();

  // Center the profile, and then move it away so the top closes.
  profilePath.center();
  var bounds = profilePath.getBounds();
  profilePath.move(-bounds.min_x, 0);
  profilePath.resize(1/120, -1/120);
  bounds = profilePath.getBounds();

  // Resize base so that things match up.
  basePath.resize(
    bounds.max_x / boundsBase.size_x * 2,
    bounds.max_x / boundsBase.size_y * 2
  );
  basePath.close();

  // Build the main body of the piece
  var body = buildSolid(basePath, profilePath);
  body = body.toCSG();

  basePath.resize(1/2);
  var crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.move(0, 0, -bounds.size_y/2);
  crown = crown.toCSG();
  body = body.subtract(crown);

  // Build the subtraction piece
  basePath.resize(4/5);
  var crown = extrudeSolid(basePath, bounds.max_x/8);
  crown.rotate();
  crown.move(0, bounds.max_x/8, bounds.size_y/2 - bounds.max_x/4 * 2);
  crown = crown.toCSG();
  body = body.subtract(crown);

  this.solids.push(body);

  this.finishLoad();
};

/**
 * Loads the rook
 *
 * - profile + base gives most of the shape
 * - we then remove some material (using 3 subtraction pieces).
 */
Piece.prototype.loadRook = function() {
  this.name = "rook";
  var p = PieceData['rook'];
  var basePath = this.loadPath(p.base_svg, p.base_points);
  var profilePath = this.loadPath(p.profile_svg, p.profile_points);

  // Center the base
  basePath.center();
  var boundsBase = basePath.getBounds();

  // Center the profile, and then move it away so the top closes.
  profilePath.center();
  var bounds = profilePath.getBounds();
  profilePath.move(-bounds.min_x, 0);
  profilePath.resize(1/120, -1/120);
  bounds = profilePath.getBounds();

  // Resize base so that things match up.
  basePath.resize(
    bounds.max_x / boundsBase.size_x * 2,
    bounds.max_x / boundsBase.size_y * 2
  );
  basePath.close();

  // Build the main body of the piece
  var body = buildSolid(basePath, profilePath);
  body = body.toCSG();

  basePath.resize(1/2);
  var crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.move(0, 0, -bounds.size_y/2);
  crown = crown.toCSG();
  body = body.subtract(crown);

  // Build the first subtraction piece
  basePath.resize(4/5);
  var crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.move(0, 0, bounds.size_y/2 - bounds.max_x/4 * 0.9);
  crown = crown.toCSG();
//  body = body.subtract(crown);

  // Build the second subtraction piece
  basePath.resize(2);
  crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.rotate();
  crown.move(0, -bounds.max_x/8, bounds.size_y/2 + bounds.max_x/4 * 2.5);
  crown = crown.toCSG();
//  body = body.subtract(crown);

  crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.rotate();
  crown.rotate();
  crown.move(-bounds.max_x/8, 0, bounds.size_y/2 + bounds.max_x/4 * 2.5);
  crown = crown.toCSG();
//  body = body.subtract(crown);

  this.solids.push(body);

  this.finishLoad();
};


/**
 * Loads the Pawn:
 *
 * - profile + base gives the entire piece.
 */
Piece.prototype.loadPawn = function() {
  this.name = "pawn";
  var p = PieceData['pawn'];
  var basePath = this.loadPath(p.base_svg, p.base_points);
  var profilePath = this.loadPath(p.profile_svg, p.profile_points);

  // Center the base
  basePath.center();
  var boundsBase = basePath.getBounds();

  // Center the profile, and then move it away so the top closes.
  profilePath.center();
  var bounds = profilePath.getBounds();
  profilePath.move(-bounds.min_x, 0);
  profilePath.resize(1/120, -1/120);
  bounds = profilePath.getBounds();

  // Resize base so that things match up.
  basePath.resize(
    bounds.max_x / boundsBase.size_x * 2,
    bounds.max_x / boundsBase.size_y * 2
  );
  basePath.close();

  // Build the main body of the piece
  var body = buildSolid(basePath, profilePath);
  body = body.toCSG();

  basePath.resize(1/2);
  var crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.move(0, 0, -bounds.size_y/2);
  crown = crown.toCSG();
  body = body.subtract(crown);

  this.solids.push(body);

  this.finishLoad();
};

/**
 * Loads the King:
 *
 * - profile + base gives most of the shape
 * - base, rotated and extruded makes the crown.
 */
Piece.prototype.loadKing = function() {
  this.name = "king";
  var p = PieceData['king'];
  var basePath = this.loadPath(p.base_svg, p.base_points);
  var profilePath = this.loadPath(p.profile_svg, p.profile_points);

  // Center the base
  basePath.center();
  var boundsBase = basePath.getBounds();

  // Center the profile, and then move it away so the top closes.
  profilePath.center();
  var bounds = profilePath.getBounds();
  profilePath.move(-bounds.min_x, 0);
  profilePath.resize(1/120, -1/120);
  bounds = profilePath.getBounds();

  // Resize base so that things match up.
  basePath.resize(
    bounds.max_x / boundsBase.size_x * 2,
    bounds.max_x / boundsBase.size_y * 2
  );
  basePath.close();

  // Build the main body of the piece
  var body = buildSolid(basePath, profilePath);
  body = body.toCSG();

  basePath.resize(1/2);
  var crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.move(0, 0, -bounds.size_y/2);
  crown = crown.toCSG();
  body = body.subtract(crown);
  this.solids.push(body);

  // Build the crown
  basePath.resize(1/2);
  var crown = extrudeSolid(basePath, bounds.max_x/4);
  crown.rotate();
  crown.move(0, -bounds.max_x/8, bounds.size_y/2 + bounds.max_x/4 * 0.9);
  crown = crown.toCSG();

  basePath.resize(1/2);
  var crown_inside = extrudeSolid(basePath, bounds.max_x/4);
  crown_inside.rotate();
  crown_inside.move(0, -bounds.max_x/8, bounds.size_y/2 + bounds.max_x/4 * 0.9);
  crown_inside = crown_inside.toCSG();

  // Use CSG to compute crown - crown_inside
  csg = crown.subtract(crown_inside);
  this.solids.push(csg);

  this.finishLoad();
};

Piece.prototype.finishLoad = function() {
  // Merge all the solids
  if (this.solids.length >= 1) {
    var triangles = [];
    var normals = [];
    for (var i=0; i<this.solids.length; i++) {
      this.solids[i].toTriangles();
      for (var j=0; j<this.solids[i].polygons.length; j++) {
        var triangle = this.solids[i].polygons[j];

        triangles.push(triangle.vertices[0].pos.x);
        triangles.push(triangle.vertices[0].pos.y);
        triangles.push(triangle.vertices[0].pos.z);
        normals.push(triangle.plane.normal.x);
        normals.push(triangle.plane.normal.y);
        normals.push(triangle.plane.normal.z);

        triangles.push(triangle.vertices[1].pos.x);
        triangles.push(triangle.vertices[1].pos.y);
        triangles.push(triangle.vertices[1].pos.z);
        normals.push(triangle.plane.normal.x);
        normals.push(triangle.plane.normal.y);
        normals.push(triangle.plane.normal.z);

        triangles.push(triangle.vertices[2].pos.x);
        triangles.push(triangle.vertices[2].pos.y);
        triangles.push(triangle.vertices[2].pos.z);
        normals.push(triangle.plane.normal.x);
        normals.push(triangle.plane.normal.y);
        normals.push(triangle.plane.normal.z);
      }
    }

    var fullBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fullBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangles), gl.STATIC_DRAW);
    fullBuffer.itemSize = 3;
    fullBuffer.numItems = triangles.length/3;
    this.glBuffer = fullBuffer;

    var normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    normalsBuffer.itemSize = 3;
    normalsBuffer.numItems = normals.length/3;
    this.glNormals = normalsBuffer;
  }
};

Piece.prototype.saveStl = function() {
  // We need to merge everything
  if (this.solids < 1) {
    throw new Error("empty solid");
  }
  var finalSolid = this.solids[0];
  for (var i=1; i<this.solids.length; i++) {
    finalSolid = finalSolid.union(this.solids[i]);
  }
  // Convert finalSolid into triangles
  var triangles = [];
  for (var i=0; i<finalSolid.polygons.length; i++) {
    var polygon = finalSolid.polygons[i];
    var t = polygonToTriangles(polygon.vertices, polygon.plane.normal);
    for (var j=0; j<t.length; j++) {
      var triangle = t[j];
      if (!triangle instanceof Triangle) {
        debugger;
      }
      triangles.push(triangle);
    }
  }

  var r = "";
  r += "solid " + this.name + "\n";
  for (var i=0; i<triangles.length; i++) {
    var n = triangles[i].plane.normal;
    var p0 = triangles[i].vertices[0].pos.times(50 * 0.8);
    var p1 = triangles[i].vertices[1].pos.times(50 * 0.8);
    var p2 = triangles[i].vertices[2].pos.times(50 * 0.8);

    r += "facet normal " + n.x + " " + n.y + " " + n.z + "\n";
//    r += "facet normal 0 0 0\n";
    r += "outer loop\n";
    r += "vertex " + p0.x + " " + p0.y + " " + p0.z + "\n";
    r += "vertex " + p1.x + " " + p1.y + " " + p1.z + "\n";
    r += "vertex " + p2.x + " " + p2.y + " " + p2.z + "\n";
    r += "endloop\n";
    r += "endfacet\n";
  }
  r += "endsolid\n";

  window.webkitRequestFileSystem(TEMPORARY, 100*1024*1024, function(fs) {
    fs.root.getFile(this.name+Math.random()+'.stl', {create: true}, function(fileEntry) {
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function(e) {
          console.log('Write completed.');
          console.log(e);
          console.log(fileEntry.toURL());
        };
        // Create a new Blob and write it to log.txt.
        var blob = new Blob([r], {type: 'text/plain'});
        fileWriter.write(blob);
      }, console.error.bind(console));
    }, console.error.bind(console));
  }, console.error.bind(console));
}

/**
 * Builds a solid by extruding path1 by length
 */
extrudeSolid = function(path1, length) {
  var p = {points: []};
  p.points.push({x:1, y: 0});
  p.points.push({x:1, y: length});
  return buildSolid(path1, p);
};

/**
 * Builds a solid by moving path1 along path2.
 *
 * path1 is centered around path2 and is angled to follow path2.
 *
 * for path2: we need to compute the angle of the current point
 * for path1: we need a way to rotate the points
 */
buildSolid2 = function(path1, path2) {
  var r = new Solid();

  // Add an extra point to close path1
  var pieceVertices = [];

  var base_path = path1.points;
  var profile_path = path2.points;

  var transforms2 = function(i, j) {
    var x = base_path[j].x + (profile_path[i].x - profile_path[0].x);
    var y = base_path[j].y + (profile_path[i].x - profile_path[0].x);
    var z = profile_path[i].y * 5;

    var a = Math.atan2(z, x);
    var l = Math.sqrt(x * x + z * z);
    a += i/(profile_path.length-1) * (-Math.PI/4);
    x = l * Math.cos(a);
    z = l * Math.sin(a);
    return {x: x, y: y, z: z};
  }

  // Create vertices by "cloning" base path
  for (var i=0; i<profile_path.length-1; i++) {
    for (var j=0; j<base_path.length-1; j++) {
      // TODO: can we use a CSG.Polygon with 4 points? Are
      // the 4 points always co-planar?

      // Render as triangles, by computing 4 points.
      // Triangles are P0-P1-P2 and P2-P1-P4
      var p0 = transforms2(i, j);
      var p1 = transforms2(i, j+1);
      var p2 = transforms2(i+1, j);
      var p3 = transforms2(i+1, j+1);

      // build triangle P0-P1-P2
      r.add(p0, p1, p2);

      // build triangle P2-P1-P3
      r.add(p2, p1, p3);
    }
  }

  return r;
}

/**
 * Builds a solid by moving path1 along path2.
 *
 * path1's y value is based on path2.y.
 */
buildSolid = function(path1, path2) {
  var r = new Solid();

  // Add an extra point to close path1
  var pieceVertices = [];

  var base_path = path1.points;
  var profile_path = path2.points;

  var transforms = {
    x: function(i, j){return base_path[j].x * (profile_path[i].x / profile_path[0].x)},
    y: function(i, j){return base_path[j].y * (profile_path[i].x / profile_path[0].x)},
    z: function(i, j){return profile_path[i].y},
  }

  // Create vertices by "cloning" base path
  for (var i=0; i<profile_path.length-1; i++) {
    for (var j=0; j<base_path.length-1; j++) {
      // TODO: can we use a CSG.Polygon with 4 points? Are
      // the 4 points always co-planar?

      // Render as triangles, by computing 4 points.
      // Triangles are P0-P1-P2 and P2-P1-P4
      var p0 = {
        x: transforms.x(i, j),
        y: transforms.y(i, j),
        z: transforms.z(i, j)
      }

      var p1 = {
        x: transforms.x(i, j+1),
        y: transforms.y(i, j+1),
        z: transforms.z(i, j+1)
      }

      var p2 = {
        x: transforms.x(i+1, j),
        y: transforms.y(i+1, j),
        z: transforms.z(i+1, j)
      }

      var p3 = {
        x: transforms.x(i+1, j+1),
        y: transforms.y(i+1, j+1),
        z: transforms.z(i+1, j+1)
      }

      // build triangle P0-P1-P2
      r.add(p0, p1, p2);

      // build triangle P2-P1-P3
      r.add(p2, p1, p3);
    }
  }

  // Put bottom cap
  for (var j=0; j<base_path.length-1; j++) {
    var p0 = {
      x: transforms.x(0, j),
      y: transforms.y(0, j),
      z: transforms.z(0, j)
    }

    var p1 = {
      x: transforms.x(0, j+1),
      y: transforms.y(0, j+1),
      z: transforms.z(0, j+1)
    }

    var p2 = {
      x: 0,
      z: transforms.z(0, 0),
      y: 0
    }
    r.add(p2, p1, p0);
  }

  // And top cap
  for (var j=0; j<base_path.length-1; j++) {
    var p0 = {
      x: base_path[j].x * (profile_path[profile_path.length-1].x / profile_path[0].x),
      z: profile_path[profile_path.length-1].y,
      y: base_path[j].y * (profile_path[profile_path.length-1].x / profile_path[0].x)
    }

    var p1 = {
      x: base_path[j+1].x * (profile_path[profile_path.length-1].x / profile_path[0].x),
      z: profile_path[profile_path.length-1].y,
      y: base_path[j+1].y * (profile_path[profile_path.length-1].x / profile_path[0].x)
    }

    var p2 = {
      x: 0,
      z: profile_path[profile_path.length-1].y,
      y: 0
    }
    r.add(p2, p0, p1);
  }
  return r;
}

// Lots more webgl boiler plate.

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

  shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
  gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

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

function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

  mat4.identity(mvMatrix);

  // Setup camera
  mat4.translate(mvMatrix, [0, 0.0, -2.0]);
  mat4.rotate(mvMatrix, -1.13, [1, 0, 0]);

  // Mouse induced rotation
  var newRotationMatrix = mat4.create();
  mat4.identity(newRotationMatrix);
  mat4.rotate(pos, lastMouseDX * 0.002, [0, 0, 1]);
  mat4.rotate(newRotationMatrix, lastMouseDY * 0.002, [1, 0, 0]);
  mat4.multiply(newRotationMatrix, pos, pos);
  mat4.multiply(mvMatrix, pos);

  // render Piece.current
  if (Piece.current && Piece.current.glBuffer) {
    var glBuffer = Piece.current.glNormals;
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, glBuffer.itemSize, gl.FLOAT, false, 0, 0);

    glBuffer = Piece.current.glBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, glBuffer.itemSize, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, glBuffer.numItems);
//    gl.drawArrays(gl.LINE_LOOP, 0, glBuffer.numItems);
  }
}

function tick() {
  // come back here for the next frame
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

function webGLStart() {
  var canvas = document.getElementById("canvas");
  initGL(canvas);
  initShaders();

  // Handle mouse movements
  canvas.onmousedown = handleMouseDown;
  document.onmouseup = handleMouseUp;
  document.onmousemove = handleMouseMove;

  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // load the default piece
  var piece = new Piece();
//  piece.loadPawn();
//  piece.loadKing();
  piece.loadRook();
//  piece.loadBishop();
//  piece.loadQueen();
//  piece.loadKnight();

  tick();
}
