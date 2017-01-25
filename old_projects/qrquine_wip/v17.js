// Variables
// abcdefghijklmnopqrstuvwxyz -> temporary
// ....EFGH.JKLMN..QRSTUVWXYZ -> reserved

// setPixel(row, col, value).
// row & col must be within bounds.
function P(r,c,v){
  I[A*r+c]=v;
  v&&C.getContext('2d').fillRect(c*3,r*3,3,3);
}
// setupPositionProbePattern(row, col)
function S(i,j){
  for (r=O;r<8;r++){
    for (c=O;c<8;c++){
      (i+r>O)&&(i+r<A)&&
        (j+c>O)&&(j+c<A)&&
          P(i+r,j+c,0<r&&(r<7&&!(c%6))||((c+1)%8&&!(r%6)||1<r&&(r<5&&(1<c&&c<5))))
    }   
  }
}
// A=size of QR code
A=##count##;

// C=canvas id
C.height=C.width=A*3;

// I=QR code data
// TODO: it might be possible to get rid of this
I=[];

// O == minus one (handy to have, saves a byte each time)
O=-1;

// Setup probe patterns
S(0,0);
S(A-7,0);
S(0,A-7);

// Position for smaller probes
B=##pos##;
for(i=0;i<6;i++){
  for(j=0;j<6;j++){
    k=B[i];
    l=B[j];
    if(I[A*k+l]){continue}
    for(r=-2;r<3;r++){
      for(c=-2;c<3;c++){
        P(k+r,l+c,r==-2||r==2||c==-2||c==2||!r&&!c)
      }
    }
  }
}

// Timing elements?
for(r=8;r<A-8;r++){
  if(I[A*r+6]!=B[9]){
    continue
  }
  P(r,6,!(r%2))
}
for(c=8;c<A-8;c++){
  if(I[A*6+c]!=B[9]){
    continue
  }
  P(6,c,!(c%2))
}

// vertical & horizontal   
for(i=0;i<15;i++){
  j=##BCHTypeInfo##>>i&1;
  if(i<6) {
    P(i,8,j)
    P(8,A-i-1,j)
  }else if(i<8){
    P(i+1,8,j)
    P(8,A-i-1,j)
  }else if(i<9){
    P(A-15+i,8,j)
    P(8,15-i,j)    
  }else{
    P(A-15+i,8,j)
    P(8,15-i-1,j)    
  }
}
// fixed module
P(A-8,8,1);

for (i=0;i<18;i++) {
  k=##BCHTypeNumber##>>i&1;
  P(i/3|0,i%3+A-11,k)
  P(i%3+A-11,i/3|0,k)
}

D = [4, (unescape_location_href_.length>>12)&15, (unescape_location_href_.length>>8)&15, (unescape_location_href_.length>>4)&15, unescape_location_href_.length&15]
for (var j=0; j<unescape_location_href_.length; j++) {
  var c = unescape_location_href_.charCodeAt(j)
  D = D.concat([c>>4, c&15])
}

// calc num max data.
var totalDataCount = ##totalDataCount##;
// end code
D.push(0);
while(1){
  if (D.length >= totalDataCount*2)break
  D=D.concat([0xec>>4, 0xec&15])
  if (D.length >= totalDataCount*2)break
  D=D.concat([0x11>>4, 0x11&15])
}

function poly_mult(a, b) {
  var z=0
  for (;b;) {
    if (b&1) 
      z^=a
    a<<=1
    b>>=1
    if (a>255)
      a^=285
  }
  return z
}

function long_div(a, b) {
  if (a.length < b.length) {
    return a;
  }
  var n = a[0] / b[0];
  for (var i=0; i<b.length; i++) {
    var t1 = a[i] ^ poly_mult(n, b[i]);
    a[i] = t1;
  }
  a.shift();
  return long_div(a, b);
}

var offset = 0;
var maxDcCount = 0;
var maxEcCount = 0;
var dcdata = new Array(##rsBlocks.count##);
var ecdata = new Array(##rsBlocks.count##);
for (var r = 0; r < ##rsBlocks.count##; r++) {
  var dcCount = ##rsBlocks.value##+(r>##rsBlocks.offset2##)
  var ecCount = 30
  maxDcCount = Math.max(maxDcCount, dcCount);
  maxEcCount = Math.max(maxEcCount, ecCount);
  dcdata[r] = new Array(dcCount);
  for (var i = 0; i < dcdata[r].length; i++) {
    var k = (i+offset)*2
    dcdata[r][i] = (D[k]<<4) | D[k+1]
  }
  offset += dcCount;
  // it might be shorter to compute this?
  var rsPoly = [1, 212, 246, 77, 73, 195, 192, 75, 98, 5, 70, 103, 177, 22, 217, 138, 51, 181, 246, 72, 25, 18, 46, 228, 74, 216, 195, 11, 106, 130, 150]
  ecdata[r] = new Array(rsPoly.length - 1);
  var rawPoly = dcdata[r].concat(ecdata[r])
  var modPoly = long_div(rawPoly, rsPoly);
  
  for (var i = 0; i < ecdata[r].length; i++) {
    var modIndex = i + modPoly.length - ecdata[r].length;
    ecdata[r][i] = (modIndex >= 0)? modPoly[modIndex] : 0;
  }
}
var totalCodeCount = ##totalCodeCount##;
var data = new Array(totalCodeCount);
var index = 0;
for (var i = 0; i < maxDcCount; i++) {
  for (var r = 0; r < ##rsBlocks.count##; r++) {
    if (i < dcdata[r].length) {
      data[index++] = dcdata[r][i];
    }
  }
}
for (var i = 0; i < maxEcCount; i++) {
  for (var r = 0; r < ##rsBlocks.count##; r++) {
    if (i < ecdata[r].length) {
      data[index++] = ecdata[r][i];
    }
  }
}

var inc = -1;
var row = A - 1;
var bitIndex = 7;
var byteIndex = 0;    
for (var col = A - 1; col > 0; col -= 2) {  
  if (col == 6) col--;  
  while (true) {  
    for (var c = 0; c < 2; c++) {
      if (I[A*row+col - c] == B[9]) {
        var dark = false;
        if (byteIndex < data.length) {
          dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
        }
        var mask = (row % 2 == 0)
        if (mask) {
          dark = !dark;
        }
        P(row,col - c, dark)
        bitIndex--;
        if (bitIndex == -1) {
          byteIndex++;
          bitIndex = 7;
        }
      }
    }
    row += inc;
    if (row < 0 || A <= row) {
      row -= inc;
      inc = -inc;
      break;
    }
  }
}
