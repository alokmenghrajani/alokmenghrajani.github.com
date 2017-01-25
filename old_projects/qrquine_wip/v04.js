function QR8bitByte(data) {
  this.data = data;
}

QR8bitByte.prototype = {
  getLength : function(buffer) {
    return this.data.length;
  },
  write : function(buffer) {
    for (var i = 0; i < this.data.length; i++) {
      buffer.put(this.data.charCodeAt(i), 8);
    }
  }
}

function QRCode(data) {
  this.modules = null;
  this.moduleCount = 0;
  this.dataCache = null;
  this.dataList = new Array();

  var newData = new QR8bitByte(data);
  this.dataList.push(newData);
  this.dataCache = null;

  this.moduleCount = ##count##;
  this.modules = new Array(this.moduleCount);
  for (var row = 0; row < this.moduleCount; row++) {
    this.modules[row] = new Array(this.moduleCount);
    for (var col = 0; col < this.moduleCount; col++) {
      this.modules[row][col] = null;//(col + row) % 3;
    }
  }
  this.setupPositionProbePattern(0, 0);
  this.setupPositionProbePattern(this.moduleCount - 7, 0);
  this.setupPositionProbePattern(0, this.moduleCount - 7);
  this.setupPositionAdjustPattern();
  this.setupTimingPattern();
  this.setupTypeInfo();
  this.setupTypeNumber(false);
  if (this.dataCache == null) {
    this.dataCache = QRCode.createData(this.dataList);
  }
  this.mapData(this.dataCache);
}

QRCode.prototype = {
  isDark : function(row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(row + "," + col);
    }
    return this.modules[row][col];
  },
  setupPositionProbePattern : function(row, col)  {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;
      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;
        if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
            || (0 <= c && c <= 6 && (r == 0 || r == 6) )
            || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }   
    }   
  },
  setupTimingPattern : function() {
    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = (r % 2 == 0);
    }
    for (var c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] != null) {
        continue;
      }
      this.modules[6][c] = (c % 2 == 0);
    }
  },
  setupPositionAdjustPattern : function() {
    var pos = ##pos##;
    for (var i = 0; i < pos.length; i++) {    
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];
        if (this.modules[row][col] != null) {
          continue;
        }
        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 
                || (r == 0 && c == 0) ) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  setupTypeNumber : function(test) {
    var bits = ##BCHTypeNumber##;
    for (var i = 0; i < 18; i++) {
      var mod = (!test && ( (bits >> i) & 1) == 1);
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
    }
    for (var i = 0; i < 18; i++) {
      var mod = (!test && ( (bits >> i) & 1) == 1);
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  setupTypeInfo : function() {  
    var bits = ##BCHTypeInfo##;
    // vertical   
    for (var i = 0; i < 15; i++) {
      var mod = ( (bits >> i) & 1) == 1;
      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
    }
    // horizontal
    for (var i = 0; i < 15; i++) {
      var mod = ( (bits >> i) & 1) == 1;
      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }
    // fixed module
    this.modules[this.moduleCount - 8][8] = true;  
  },
  mapData : function(data) {    
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;    
    for (var col = this.moduleCount - 1; col > 0; col -= 2) {  
      if (col == 6) col--;  
      while (true) {  
        for (var c = 0; c < 2; c++) {
          if (this.modules[row][col - c] == null) {
            var dark = false;
            if (byteIndex < data.length) {
              dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
            }
            var mask = QRUtil.getMask(2, row, col - c);
            if (mask) {
              dark = !dark;
            }
            this.modules[row][col - c] = dark;
            bitIndex--;
            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
}
QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;
QRCode.createData = function(dataList) {
  var rsBlocks = QRRSBlock.getRSBlocks();
  var buffer = new QRBitBuffer();
  for (var i = 0; i < dataList.length; i++) {
    var data = dataList[i];
    buffer.put(4, 4);
    buffer.put(data.getLength(), 16);
    data.write(buffer);
  }
  // calc num max data.
  var totalDataCount = 0;
  for (var i = 0; i < rsBlocks.length; i++) {
    totalDataCount += rsBlocks[i].dataCount;
  }
  if (buffer.getLengthInBits() > totalDataCount * 8) {
    throw new Error("code length overflow. ("
      + buffer.getLengthInBits()
      + ">"
      +  totalDataCount * 8
      + ")");
  }
  // end code
  if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
    buffer.put(0, 4);
  }
  // padding
  while (buffer.getLengthInBits() % 8 != 0) {
    buffer.putBit(false);
  }
  // padding
  while (true) {
    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }
    buffer.put(QRCode.PAD0, 8);
    
    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }
    buffer.put(QRCode.PAD1, 8);
  }
  return QRCode.createBytes(buffer, rsBlocks);
}

QRCode.createBytes = function(buffer, rsBlocks) {
  var offset = 0;
  var maxDcCount = 0;
  var maxEcCount = 0;
  var dcdata = new Array(rsBlocks.length);
  var ecdata = new Array(rsBlocks.length);
  for (var r = 0; r < rsBlocks.length; r++) {
    var dcCount = rsBlocks[r].dataCount;
    var ecCount = rsBlocks[r].totalCount - dcCount;
    maxDcCount = Math.max(maxDcCount, dcCount);
    maxEcCount = Math.max(maxEcCount, ecCount);
    dcdata[r] = new Array(dcCount);
    for (var i = 0; i < dcdata[r].length; i++) {
      dcdata[r][i] = 0xff & buffer.buffer[i + offset];
    }
    offset += dcCount;
    var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
    var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
    var modPoly = rawPoly.mod(rsPoly);
    ecdata[r] = new Array(rsPoly.getLength() - 1);
    for (var i = 0; i < ecdata[r].length; i++) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
      ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
    }
  }
  var totalCodeCount = 0;
  for (var i = 0; i < rsBlocks.length; i++) {
    totalCodeCount += rsBlocks[i].totalCount;
  }
  var data = new Array(totalCodeCount);
  var index = 0;
  for (var i = 0; i < maxDcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < dcdata[r].length) {
        data[index++] = dcdata[r][i];
      }
    }
  }
  for (var i = 0; i < maxEcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < ecdata[r].length) {
        data[index++] = ecdata[r][i];
      }
    }
  }
  return data;
}

var QRUtil = {
  getMask : function(maskPattern, i, j) {
    return i % 2 == 0;
  },
  getErrorCorrectPolynomial : function(errorCorrectLength) {
    var a = new QRPolynomial([1], 0);
    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
    }
    return a;
  }
}

ltable=[]
etable=[n=i=1]
for(;i<256;i++) {
n*=2
if(n>255)n^=285
etable[i]=n
ltable[n]=i%255
}

var QRMath = {
  glog : function(n) {
    return ltable[n];
  },
  gexp : function(n) {
    return etable[n%255];
  }
}

function QRPolynomial(num, shift) {
  var offset = 0;
  while (offset < num.length && num[offset] == 0) {
    offset++;
  }
  this.num = new Array(num.length - offset + shift);
  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}

QRPolynomial.prototype = {
  get : function(index) {
    return this.num[index];
  },
  getLength : function() {
    return this.num.length;
  },
  multiply : function(e) {  
    var num = new Array(this.getLength() + e.getLength() - 1);
    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );
      }
    }
    return new QRPolynomial(num, 0);
  },  
  mod : function(e) {
    if (this.getLength() - e.getLength() < 0) {
      return this;
    }
    var ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );
    var num = new Array(this.getLength() );
    for (var i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i);
    }
    for (var i = 0; i < e.getLength(); i++) {
      num[i] ^= QRMath.gexp(QRMath.glog(e.get(i) ) + ratio);
    }
    // recursive call
    return new QRPolynomial(num, 0).mod(e);
  }
}

function QRRSBlock(totalCount, dataCount) {
  this.totalCount = totalCount;
  this.dataCount  = dataCount;
}

QRRSBlock.getRSBlocks = function() {
  var rsBlock = ##rsBlock##;
  var length = rsBlock.length / 3;
  var list = new Array();
  for (var i = 0; i < length; i++) {
    var count = rsBlock[i * 3 + 0];
    var totalCount = rsBlock[i * 3 + 1];
    var dataCount  = rsBlock[i * 3 + 2];
    for (var j = 0; j < count; j++) {
      list.push(new QRRSBlock(totalCount, dataCount) ); 
    }
  }
  return list;
}

function QRBitBuffer() {
  this.buffer = new Array();
  this.length = 0;
}

QRBitBuffer.prototype = {
  get : function(index) {
    var bufIndex = Math.floor(index / 8);
    return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
  },
  put : function(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
    }
  },
  getLengthInBits : function() {
    return this.length;
  },
  putBit : function(bit) {
    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
    }
    this.length++;
  }
}

var qrcode = new QRCode(unescape_location_href_);
C.width = ##count##*3;
C.height = ##count##*3;
var ctx= C.getContext('2d');
// draw in the canvas
for( var row = 0; row < ##count##; row++ ){
  for( var col = 0; col < ##count##; col++ ){
    ctx.fillStyle = qrcode.isDark(row, col) ? "#000000" : "#ffffff";
    var w = (Math.ceil((col+1)*3) - Math.floor(col*3));
    var h = (Math.ceil((row+1)*3) - Math.floor(row*3));
    ctx.fillRect(Math.round(col*3),Math.round(row*3), w, h);
  }
}