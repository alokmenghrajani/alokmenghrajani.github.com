function QR8bitByte(data) {
  this.mode = QRMode.MODE_8BIT_BYTE;
  this.data = data;
}

QR8bitByte.prototype = {
  getLength : function(buffer) {
    return this.data.length;
  },
  write : function(buffer) {
    for (var i = 0; i < this.data.length; i++) {
      // not JIS ...
      buffer.put(this.data.charCodeAt(i), 8);
    }
  }
}

function QRCode(typeNumber, errorCorrectLevel) {
  this.typeNumber = typeNumber;
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null;
  this.moduleCount = 0;
  this.dataCache = null;
  this.dataList = new Array();
}

QRCode.prototype = {
  addData : function(data) {
    var newData = new QR8bitByte(data);
    this.dataList.push(newData);
    this.dataCache = null;
  },
  isDark : function(row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(row + "," + col);
    }
    return this.modules[row][col];
  },
  getModuleCount : function() {
    return this.moduleCount;
  },
  make : function() {
    // Calculate automatically typeNumber if provided is < 1
    if (this.typeNumber < 1 ){
      var typeNumber = 1;
      for (typeNumber = 1; typeNumber < 40; typeNumber++) {
        var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

        var buffer = new QRBitBuffer();
        var totalDataCount = 0;
        for (var i = 0; i < rsBlocks.length; i++) {
          totalDataCount += rsBlocks[i].dataCount;
        }

        for (var i = 0; i < this.dataList.length; i++) {
          var data = this.dataList[i];
          buffer.put(data.mode, 4);
          buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
          data.write(buffer);
        }
        if (buffer.getLengthInBits() <= totalDataCount * 8)
          break;
      }
      this.typeNumber = typeNumber;
    }
    this.makeImpl(false, 1);
  },
  makeImpl : function(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
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
    this.setupTypeInfo(test, maskPattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test);
    }
    if (this.dataCache == null) {
      this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
    }
    this.mapData(this.dataCache, maskPattern);
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
    var pos = QRUtil.getPatternPosition(this.typeNumber);
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
    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
    for (var i = 0; i < 18; i++) {
      var mod = (!test && ( (bits >> i) & 1) == 1);
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
    }
    for (var i = 0; i < 18; i++) {
      var mod = (!test && ( (bits >> i) & 1) == 1);
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  setupTypeInfo : function(test, maskPattern) {  
    var data = (this.errorCorrectLevel << 3) | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);
    // vertical   
    for (var i = 0; i < 15; i++) {
      var mod = (!test && ( (bits >> i) & 1) == 1);
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
      var mod = (!test && ( (bits >> i) & 1) == 1);
      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }
    // fixed module
    this.modules[this.moduleCount - 8][8] = (!test);  
  },
  mapData : function(data, maskPattern) {    
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
            var mask = QRUtil.getMask(maskPattern, row, col - c);
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
QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
  var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
  var buffer = new QRBitBuffer();
  for (var i = 0; i < dataList.length; i++) {
    var data = dataList[i];
    buffer.put(data.mode, 4);
    buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
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

var QRMode = {
  MODE_NUMBER :   1 << 0,
  MODE_ALPHA_NUM :  1 << 1,
  MODE_8BIT_BYTE :  1 << 2,
  MODE_KANJI :    1 << 3
}

var QRErrorCorrectLevel = {
  L : 1,
  M : 0,
  Q : 3,
  H : 2
}

var QRMaskPattern = {
  PATTERN000 : 0,
  PATTERN001 : 1,
  PATTERN010 : 2,
  PATTERN011 : 3,
  PATTERN100 : 4,
  PATTERN101 : 5,
  PATTERN110 : 6,
  PATTERN111 : 7
}

var QRUtil = {
    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)  | (1 << 4) | (1 << 1),
    getBCHTypeInfo : function(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) );  
      }
      return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },
    getBCHTypeNumber : function(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) );  
      }
      return (data << 12) | d;
    },
    getBCHDigit : function(data) {
      var digit = 0;
      while (data != 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    },
    getPatternPosition : function(typeNumber) {
      return ##pos##
    },
    getMask : function(maskPattern, i, j) {
      switch (maskPattern) {
      case QRMaskPattern.PATTERN000 : return (i + j) % 2 == 0;
      case QRMaskPattern.PATTERN001 : return i % 2 == 0;
      case QRMaskPattern.PATTERN010 : return j % 3 == 0;
      case QRMaskPattern.PATTERN011 : return (i + j) % 3 == 0;
      case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
      case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 == 0;
      case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
      case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;
      default :
        throw new Error("bad maskPattern:" + maskPattern);
      }
    },
    getErrorCorrectPolynomial : function(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
      }
      return a;
    },
    getLengthInBits : function(mode, type) {
      if (1 <= type && type < 10) {
        // 1 - 9
        switch(mode) {
        case QRMode.MODE_NUMBER   : return 10;
        case QRMode.MODE_ALPHA_NUM  : return 9;
        case QRMode.MODE_8BIT_BYTE  : return 8;
        case QRMode.MODE_KANJI    : return 8;
        default :
          throw new Error("mode:" + mode);
        }
      } else if (type < 27) {
        // 10 - 26
        switch(mode) {
        case QRMode.MODE_NUMBER   : return 12;
        case QRMode.MODE_ALPHA_NUM  : return 11;
        case QRMode.MODE_8BIT_BYTE  : return 16;
        case QRMode.MODE_KANJI    : return 10;
        default :
          throw new Error("mode:" + mode);
        }
      } else if (type < 41) {
        // 27 - 40
        switch(mode) {
        case QRMode.MODE_NUMBER   : return 14;
        case QRMode.MODE_ALPHA_NUM  : return 13;
        case QRMode.MODE_8BIT_BYTE  : return 16;
        case QRMode.MODE_KANJI    : return 12;
        default :
          throw new Error("mode:" + mode);
        }
      } else {
        throw new Error("type:" + type);
      }
    }
}

var QRMath = {
  glog : function(n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }
    return QRMath.LOG_TABLE[n];
  },
  gexp : function(n) {
    while (n < 0) {
      n += 255;
    }
    while (n >= 256) {
      n -= 255;
    }
    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE : new Array(256),
  LOG_TABLE : new Array(256)
} 
for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
    ^ QRMath.EXP_TABLE[i - 5]
    ^ QRMath.EXP_TABLE[i - 6]
    ^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

function QRPolynomial(num, shift) {
  if (num.length == undefined) {
    throw new Error(num.length + "/" + shift);
  }
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

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
  var rsBlock = ##rsBlock##;
  if (rsBlock == undefined) {
    throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
  }
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

var qrcode = new QRCode(##typeNumber##, QRErrorCorrectLevel.L);
qrcode.addData(unescape_location_href_);
qrcode.make();
var count = qrcode.getModuleCount();
C.width = count*3;
C.height = count*3;
var ctx= C.getContext('2d');
// draw in the canvas
for( var row = 0; row < count; row++ ){
  for( var col = 0; col < count; col++ ){
    ctx.fillStyle = qrcode.isDark(row, col) ? "#000000" : "#ffffff";
    var w = (Math.ceil((col+1)*3) - Math.floor(col*3));
    var h = (Math.ceil((row+1)*3) - Math.floor(row*3));
    ctx.fillRect(Math.round(col*3),Math.round(row*3), w, h);
  }
}