// Variables
// abcdefghijklmnopqrstuvwxyz -> temporary
// ......GH.JK.....QR.TUVW... -> reserved

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
        j+c>O&&j+c<A&&
          P(i+r,j+c,0<r&&(r<7&&!(c%6))||((c+1)%8&&!(r%6)||1<r&&(r<5&&(1<c&&c<5))))
}

// poly_mult(a, b)
function M(a,b){
  for(z=0;b;a>255&&(a^=285)){
    b&1&&(z^=a);
    a<<=1;
    b>>=1
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
  return N(a,b)
}

// A=size of QR code
// C=canvas id
C.height=C.width=(A=##count##)*3;

// I=QR code data
// TODO: it might be possible to get rid of this
I=[];

// O=minus one (handy to have, saves a byte each time)
X=O=-1;

// L="length", useful in a bunch of places
L='length';

// Setup probe patterns
S(0,0);
S(A-7,0);
S(i=0,A-7);

// Position for smaller probes
for(B=##pos##;i<6;i++)
  for(j=0;j<6;j++)
    if(!I[A*B[i]+B[j]])
      for(r=-2;r<3;r++)
        for(c=-2;c<3;c++)
          P(B[i]+r,B[j]+c,r&&!(r%2)||c&&!(c%2)||!r&&!c);

// Timing elements?
for(i=8;i<A-8;i++){
  j=!(i%2);
  P(i,6,j);
  P(6,i,j)
}

// vertical & horizontal   
for(i=0;i<15;i++){
  j=##BCHTypeInfo##>>i&1;
  i<6&&P(i,8,j)||i<8&&P(i+1,8,j)||P(##count2##+i,8,j);
  i<8&&P(8,A-i-1,j)||i<9&&P(8,15-i,j)||P(8,14-i,j)
}

// fixed module
P(A-8,8,1);

for(i=0;i<18;i++){
  k=##BCHTypeNumber##>>i&1;
  P(i/3|0,i%3+A-11,k);
  P(i%3+A-11,i/3|0,k)
}

// D = array of half bytes
for(D=##array_encoded_length_with_i##;i<##uridecoded.length##;i++){
  j=unescape_location_href_.charCodeAt(i);
  D=D.concat([j>>4,j&15])
}

D.push(r=0);

// E = totalDataCount * 2
// assumption: location_href.length is even
for(E=##totalDataCount2##;D[L]<E;D=D.concat([1,1]))
  D=D.concat([14,12]);

// Compute the reed-solomon codes
// F = array with final data
F=[];
for(Z=k=r=0;r<##rsBlocks.count##;r++){
  i=##rsBlocks.value##+(r>##rsBlocks.offset2##);
  l=[];
  for(j=0;j<i;j++){
    l[j]=(D[k++]<<4)|D[k++];
    F[r+j*##rsBlocks.count##-(j==##rsBlocks.value##?##rsBlocks.offset##:0)]=l[j]
  }

  // it might be shorter to compute this?
  l=l.concat(new Array(30));
  for(j=0;j<30;j++)
    F[r+j*##rsBlocks.count##+##totalDataCount##]=N(l,[1,212,246,77,73,195,192,75,98,5,70,103,177,22,217,138,51,181,246,72,25,18,46,228,74,216,195,11,106,130,150])[j]
}

// Lay the bytes out in the image
// Z = temp variable with early init
// Y = temp variable with early init
// X = temp variable with early init
Y=7; // Maually insert Y=7 if possible
for(x=i=A-1;i>0;i-=2){
  for(i==6&&i--;x>O&&x<A;){
    for(j=0;j<2;j++){
      if(I[A*x+i-j]==B[9]){
        k=Z<F[L]&&F[Z]>>Y&1;
        P(x,i-j,x%2?k:!k);
        if(--Y<0){
          Z++;
          Y=7
        }
      }
    }
    x+=X
  }
  x-=X;
  X=-X
}
console.log('-- Alok')