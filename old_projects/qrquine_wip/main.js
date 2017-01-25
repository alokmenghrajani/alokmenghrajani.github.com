/**
 * The goal of this program is to make sure that each version of the
 * minimized qrcode reader works.
 *
 * It works by using node.js to generate a qrcode for the string
 * "hello world".
 *
 * I'm using a stub canvas element, so that the code in the
 * the minimized file is just a header+footer away from the final code +
 * replacing "hello world" with location.href (same length).
 */
var _fs = require("fs");
function _read(_f){
  _f = _fs.readFileSync(_f).toString()
  while (_r=/##(.*?)##/.exec(_f)) {
    _f = _f.replace(_r[0], _STUB[_r[1]]);
  }
  return _f;
};
function _include(_f){eval.apply(this,[_read(_f)])};

_include("fake_canvas.js");

function _compute_size(_filename) {
  var _f = _read(_filename);
  var _r = "data:text/html,<body><canvas id=q><script>";
  _r = _r + _f;
  _r = _r + "</script>";
  return _r.length;
}

function _make(_filename) {
  var C = new FakeCanvas();
  var _f = _read(_filename);
  eval(_f);
  return C;
}

var _versions = [
  /* Incrementally reduce the size of the code. Smaller
     code == more likely to be scannable by older phones. The first code reduction are rough, the focus
     is on removing useless code and algorithmic level work. Once we are done with the easy gains, we
     start to get rid of variable names (could be automated) and start doing crazy stuff.

     The disadvantage of doing the crazy stuff last is that we don't know for sure if an algorithmic change
     is going to pay off. This is where intuition and experience with js golf comes into play.

     Here is the QR code type => size mapping. 

     ...
     21: 932
     22: 1006
     23: 1094
     24: 1174
     25: 1276
     26: 1370
     27: 1468
     28: 1531
     29: 1631
     30: 1735
     31: 1843
     32: 1955
     33: 2071
     ...
  */
  "v01.js", /* When generating a QR code, the spec says to actually generate 8 codes and pick the
               best one. We know ahead of time which one this will be, so simplify the code.
               Also remove some white space and createMovieClip() => 23269 bytes. */
  "v02.js", /* Get rid of the giant tables of values => 17164 bytes. */
  "v03.js", /* Inline functions => 11952 bytes. */
  "v04.js", /* Rewrite the polynomial math (log/exp tables) => 11417 bytes */
  "v05.js", /* replace QR8bitByte with an array => 11098 bytes*/
  "v06.js", /* replace QRBitBuffer with an array => 10506 bytes */
  "v07.js", /* convert QRCode object into a function which sets the pixels => 9537 bytes */
  "v08.js", /* inline most functions => 8899 bytes */
  "v09.js", /* getRSBlocks -> array => 8233 bytes */
  "v10.js", /* rewrite the for loops in setupPositionProbePattern. I checked that it's better to
               have a function than trying to juggle an array with [0,0,N-2,0] => 7989 bytes */
  "v11.js", /* continue inlining functions => 7745 bytes */
  "v12.js", /* Galois Field math is usually implemented using logarithms and lookup tables. It's shorter
               to just implement long division. => 6982 bytes */
  "v13.js", /* Replace QRPolynomial with arrays. => 6464 bytes */
  "v14.js", /* Get rid of rsBlocks => 6271 bytes */
  "v15.js", /* Replace QRBitBuffer with an array of 4 bits => 5774 bytes */
  "v16.js", /* Draw pixels directly => 5321 bytes */
  "v17.js", /* Replace two dimensional modules with single dimension. Lots of small optimizations. => 4547 bytes */
  "v18.js", /* A bunch of micro optimizations => 4519 bytes */
  "v19.js", /* More micro optimizations => 4494 bytes */
  "v20.js", /* Tons of micro optimizations => 3702 bytes */
  "v21.js", /* More micro optimizations => 3403 bytes */
  "v22.js", /* Tons of micro optimizations => 3368 bytes */
  "v23.js", /* Final micro optimizations => ... bytes */
  "v24.js", /* save space in for loops => ... bytes */
  "v25.js", /* Remove white space & comments => ... bytes */

  /* at this point, I don't know if it's going to be better to set pixels directly,
               use a one dimension array or a two dimension array. I'm going to be with one dimension for now,
               but this might be the wrong choice.
               get rid of modules array => ... bytes */
];

var unescape_location_href_ = "data:text/html,<body style=padding:9><canvas id=C><script>function P(r,c,v){I[A*r+c]=v;return!(v&&C.getContext('2d').fillRect(c*3,r*3,3,3))}function S(i,j){for(r=O;r<8;r++)for(c=O;c<8;c++)j+c>O&&j+c<A&&P(i+r,j+c,0<r&&(r<7&&!(c%6))||((c+1)%8&&!(r%6)||1<r&&(r<5&&(1<c&&c<5))))}function N(a,b){if(a[L]<b[L])return a;o=a[0]/b[0];for(i=0;i<b[L];a[i++]^=z){m=b[i];n=o;for(z=0;m;n>255&&(n^=285))m&1&&(z^=n),n<<=1,m>>=1;}a.shift();return N(a,b)}C.height=C.width=(A=133)*3;I=[];X=O=-1;L='length';S(0,0);S(A-7,0);S(i=0,A-7);for(B=[6,30,54,78,102,126];i<6;i++)for(j=0;j<6;j++)if(!I[A*B[i]+B[j]])for(r=-2;r<3;r++)for(c=-2;c<3;c++)P(B[i]+r,B[j]+c,r&&!(r%2)||c&&!(c%2)||!r&&!c);for(i=8;i<A-8;P(6,i++,j))j=!(i%2),P(i,6,j);for(i=0;i<15;i++)j=29427>>i&1,i<6&&P(i,8,j)||i<8&&P(i+1,8,j)||P(118+i,8,j),i<8&&P(8,A-i-1,j)||i<9&&P(8,15-i,j)||P(8,14-i,j);P(A-8,8,1);for(i=0;i<18;P(i%3+A-11,i++/3|0,k))k=119615>>i&1,P(i/3|0,i%3+A-11,k);for(D=[4,i=0,6,0,6];i<1542;D=D.concat([j>>4,j&15]))j=unescape(location.href).charCodeAt(i++);D.push(r=0);for(E=3262;D[L]<E;D=D.concat([1,1]))D=D.concat([14,12]);F=[];for(Z=k=r=0;r<14;r++){i=116+(r>6);l=[];for(j=0;j<i;F[r+j*14-(j>115?7:0)]=l[j++])l[j]=(D[k++]<<4)|D[k++];l=l.concat(new Array(30));for(j=0;j<30;j++)F[r+j*14+1631]=N(l,[1,212,246,77,73,195,192,75,98,5,70,103,177,22,217,138,51,181,246,72,25,18,46,228,74,216,195,11,106,130,150])[j]}Y=7;for(x=i=A-1;i>0;i-=2){for(i==6&&i--;x>O&&x<A;x+=X)for(j=0;j<2;j++)if(I[A*x+i-j]==B[9])k=Z<F[L]&&F[Z]>>Y&1,P(x,i-j,x%2?k:!k),--Y<0&&(Z++,Y=7);x-=X;X=-X}console.log('-- Alok')</script>";
var _STUB = [];
var _reference = _make("reference.js"); // 29070 bytes
_STUB['rsBlocks.offset2'] = _STUB['rsBlocks.offset']-1;
_STUB['uridecoded.length'] = unescape_location_href_.length; // data isn't uriencoded in here
_STUB['array_encoded_length'] = JSON.stringify([4,(unescape_location_href_.length>>12)&15, (unescape_location_href_.length>>8)&15, (unescape_location_href_.length>>4)&15, unescape_location_href_.length&15]);
_STUB['totalDataCount2'] = _STUB['totalDataCount'] * 2;
_STUB['array_encoded_length_with_i'] = _STUB['array_encoded_length'].replace('0', 'i=0');
_STUB['count2'] = _STUB['count']-15;
_STUB['rsBlocks.value2'] = _STUB['rsBlocks.value']-1;

console.log(unescape_location_href_.length);
console.log(_STUB['typeNumber']);
console.log(_read("v25.js"));

for (var _i=0; _i<_versions.length; _i++) {
  console.log(_versions[_i] + ": " + _compute_size(_versions[_i]) + " bytes");
  var _r = _make(_versions[_i]);
  _r.assertSame(_reference);
}