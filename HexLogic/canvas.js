
var neighbors = [
 [ [+1, +1], [+1,  0], [ 0, -1],
   [-1,  0], [-1, +1], [ 0, +1] ],
 [ [+1,  0], [+1, -1], [ 0, -1],
   [-1, -1], [-1,  0], [ 0, +1] ]
];

var size = 15;
var map;

var canvas = document.getElementById('canvas')

var xs;
var ys

configureMap();

var xo = 0;
var yo = 0;

var xpo = size;
var ypo = size;

canvas.addEventListener('click', onClick, false);
var g = canvas.getContext('2d');
drawAll();

window.setInterval(function() {
  for (var i=0; i<map.length; i++) {
    for (var j=0; j<map[i].length; j++) {
      updateHex(map[i][j]);
    }
  }
  for (var i=0; i<map.length; i++) {
    for (var j=0; j<map[i].length; j++) {
      map[i][j].oldstate = map[i][j].state;
    }
  }
  repaint();
}, 100);

function configureMap() {
  var ox = xs;
  var oy = ys;

  xs = Math.floor(canvas.width/size/3*2);
  ys = Math.floor(canvas.height/size/Math.sqrt(3))-1;

  if (map === undefined) {
    map = new Array(xs);

    for (var i=0; i<map.length; i++) {
      map[i] = new Array(ys);
    }

    for (i=0; i<xs; i++) {
      for (var j=0; j<ys; j++) {
        map[i][j] = { state:0, type:0, x:i, y:j, repaint:false, oldstate:0};
      }
    }
  } else {
    for (var i=ox; i<xs; i++) {
      map.push(new Array(ys));
    }

    for (i=ox; i<xs; i++) {
      for (var j=oy; j<ys; j++) {
        map[i].push({ state:0, type:0, x:i, y:j, repaint:false});
      }
    }
  }
}

function drawAll() {
  for (var i=-xo; i<map.length-xo; i++) {
    for (var j=-yo; j<map[i+xo].length-yo; j++) {
      drawHex(map[i+xo][j+yo], xpo + i*size*3/2, ypo + j*size*Math.sqrt(3) + (i%2==0?Math.sqrt(3)/2*size:0));
    }
  }
}

function repaint() {
  for (var i=-xo; i<map.length-xo; i++) {
    for (var j=-yo; j<map[i+xo].length-yo; j++) {
      var hex = map[i+xo][j+yo];
      if (hex.repaint)
        drawHex(hex, xpo + i*size*3/2, ypo + j*size*Math.sqrt(3) + (i%2==0?Math.sqrt(3)/2*size:0));
      hex.repaint = false;
    }
  }
}

function updateHex(hex) {
  var preState = hex.state;
  switch(hex.type) {
    case 3:
      hex.state = 1;
      break;
    case 0:
      hex.state = 0;
      break;
    case 2:
      if (getNeighbor(hex, 1).oldstate == 1 || getNeighbor(hex, 3).oldstate == 1 || getNeighbor(hex, 5).oldstate == 1)
        hex.state = 1;
      else
        hex.state = 0;
      break;
    case 1:
      if ((getNeighbor(hex, 1).oldstate + getNeighbor(hex, 3).oldstate + getNeighbor(hex, 5).oldstate) % 2 == 1)
        hex.state = 1;
      else
        hex.state = 0;
      break;
  }
  if (hex.state != preState)
    hex.repaint = true;
}

function getNeighbor(hex, d) {
  var n = neighbors[(hex.x&1)][d];

  var nx = hex.x+n[0];
  var ny = hex.y+n[1]

  if (nx<0 || nx>=xs || ny<0 || ny>=ys)
    return { state:0, type:0, x:nx, y:ny};

  var newHex = map[nx][ny];

  return newHex;
}

function onClick(e) {
  var pp = getPosition(e.currentTarget);
  var xp = e.clientX - pp.x - xpo;
  var yp = e.clientY - pp.y - ypo;

  var hx = 2/3 * xp / size;
  var hy = Math.sqrt(3)/3 * yp / size + (Math.round(hx)%2)*Math.sqrt(3)/3;

  var h = map[Math.round(hx)][Math.floor(hy)];
  h.type++;
  if (h.type>3)
    h.type=0;

  h.repaint = true;

  repaint();
}

function drawHex(hex, xp, yp) {
  g.beginPath();
  var i;
  for (i=0; i<=6; i++) {
    var angle = 2 * Math.PI / 6 * i;
    x = xp + size * Math.cos(angle);
    y = yp + size * Math.sin(angle);
    if (i === 0)
      g.moveTo(x,y);
    else
      g.lineTo(x,y);
  }
  g.stroke();

  if (hex.type === 0)
    g.fillStyle='#AAAAAA';
  else if (hex.state==0)
    g.fillStyle='#FFFFFF';
  else
    g.fillStyle='#FFFF00';
  g.fill();

  g.beginPath();
  switch(hex.type) {
    case 0: // Blank
      break;
    case 1: // XOR
      g.moveTo(xp - size/4, yp - size/4);
      g.lineTo(xp + size/4, yp + size/4);
      g.moveTo(xp - size/4, yp + size/4);
      g.lineTo(xp + size/4, yp - size/4);
      break;
    case 2: // OR
      g.arc(xp, yp, size/4, 0, 2*Math.PI);
      break;
    case 3: // Power
      g.moveTo(xp - size/4, yp);
      g.lineTo(xp + size/4, yp);
      g.moveTo(xp, yp + size/4);
      g.lineTo(xp, yp - size/4);
      break;
  }
  g.stroke();
}

function getPosition(e) {
  var xp = 0;
  var yp = 0;

  while (e) {
    xp += (e.offsetLeft - e.scrollLeft + e.clientLeft);
    yp += (e.offsetTop - e.scrollTop + e.clientTop);
    e = e.offsetParent;
  }
  return { x: xp, y: yp };
}
