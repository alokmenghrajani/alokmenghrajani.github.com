// Variables
// abcdefghijklmnopqrstuvwxyz -> temporary
// ......GH.JK.....QRSTUVWXYZ -> reserved

// setPixel(row, col, value)
// row & col must be within bounds.
function P(r,c,v){
  I[A*r+c]=v;
  // the return saves a ton of bytes in "vertical & horizontal"
  return!(v&&C.getContext('2d').fillRect(c*3,r*3,3,3))
}

// setupPositionProbePattern(row, col)
function S(i,j){
  for(r=O;r<8;r++)
    for(c=O;c<8;c++)
      // we can go over in two directions, but not all four
      // single dimension array costs 18 bytes
        (j+c>O)&&(j+c<A)&&
          P(i+r,j+c,0<r&&(r<7&&!(c%6))||((c+1)%8&&!(r%6)||1<r&&(r<5&&(1<c&&c<5))))
}

// poly_mult(a, b)
function M(a,b){
  for(z=0;b;){
    if(b&1) 
      z^=a;
    a<<=1;
    b>>=1;
    if(a>255)
      a^=285
  }
  return z
}

// long_div(a, b)
function N(a,b){
  if(a[L]<b[L])
    return a;
  n=a[0]/b[0];
  for(i=0;i<b[L];i++)
    a[i]=a[i]^M(n,b[i]);
  a.shift();
  return N(a, b);
}

// A=size of QR code
A=##count##;

// C=canvas id
C.height=C.width=A*3;

// I=QR code data
// TODO: it might be possible to get rid of this
I=[];

// O=minus one (handy to have, saves a byte each time)
O=-1;

// L="length", useful in a bunch of places
L="length";

// Setup probe patterns
S(0,0);
S(A-7,0);
S(0,A-7);

// Position for smaller probes
B=##pos##;
for(i=0;i<6;i++)
  for(j=0;j<6;j++)
    if(!I[A*B[i]+B[j]])
      for(r=-2;r<3;r++)
        for(c=-2;c<3;c++)
          P(B[i]+r,B[j]+c,r&&!(r%2)||c&&!(c%2)||!r&&!c)

// Timing elements?
for(i=8;i<A-8;i++){
  j=!i%2;
  P(i,6,!(i%2));
  P(6,i,!(i%2))
}

// vertical & horizontal   
for(i=0;i<15;i++){
  j=##BCHTypeInfo##>>i&1;
  i<6&&P(i,8,j)||i<8&&P(i+1,8,j)||P(A-15+i,8,j);
  i<8&&P(8,A-i-1,j)||i<9&&P(8,15-i,j)||P(8,15-i-1,j)
}

// fixed module
P(A-8,8,1);

for(i=0;i<18;i++) {
  k=##BCHTypeNumber##>>i&1;
  P(i/3|0,i%3+A-11,k)
  P(i%3+A-11,i/3|0,k)
}

// D = array of half bytes
D=##array_encoded_length##;
for(i=0;i<##uridecoded.length##;i++){
  j=unescape_location_href_.charCodeAt(i);
  D=D.concat([j>>4,j&15])
}

D.push(0);

// E = totalDataCount * 2
// assumption: location_href.length is even
for(E=##totalDataCount2##;D[L]<E;D=D.concat([0x11>>4, 0x11&15]))
  D=D.concat([0xec>>4, 0xec&15])

// Compute the reed-solomon codes
// F = array with final data
F=[];
k=0;
for(r=0;r<##rsBlocks.count##;r++){
  i=##rsBlocks.value##+(r>##rsBlocks.offset2##);
  l=[];
  for(j=0;j<i;j++){
    l[j]=(D[k++]<<4)|D[k++];
    if(j==##rsBlocks.value##){
      F[r-##rsBlocks.offset##+j*##rsBlocks.count##]=l[j];
    }else{
      F[r+j*##rsBlocks.count##]=l[j];
    }
  }

  // it might be shorter to compute this?
  l=l.concat(new Array(30));
  for(j=0;j<30;j++)
    F[r+j*##rsBlocks.count##+##totalDataCount##]=N(l,[1,212,246,77,73,195,192,75,98,5,70,103,177,22,217,138,51,181,246,72,25,18,46,228,74,216,195,11,106,130,150])[j]
}

// Lay the bytes out in the image
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
        if (byteIndex < F[L]) {
          dark = ( ( (F[byteIndex] >>> bitIndex) & 1) == 1);
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
