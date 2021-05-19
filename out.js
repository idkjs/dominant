var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/png.js/PNG.js
var require_PNG = __commonJS({
  "node_modules/png.js/PNG.js"(exports, module2) {
    "use strict";
    var PNG = function() {
      this.width = 0;
      this.height = 0;
      this.bitDepth = 0;
      this.colorType = 0;
      this.compressionMethod = 0;
      this.filterMethod = 0;
      this.interlaceMethod = 0;
      this.colors = 0;
      this.alpha = false;
      this.pixelBits = 0;
      this.palette = null;
      this.pixels = null;
    };
    PNG.prototype.getWidth = function() {
      return this.width;
    };
    PNG.prototype.setWidth = function(width) {
      this.width = width;
    };
    PNG.prototype.getHeight = function() {
      return this.height;
    };
    PNG.prototype.setHeight = function(height) {
      this.height = height;
    };
    PNG.prototype.getBitDepth = function() {
      return this.bitDepth;
    };
    PNG.prototype.setBitDepth = function(bitDepth) {
      if ([2, 4, 8, 16].indexOf(bitDepth) === -1) {
        throw new Error("invalid bith depth " + bitDepth);
      }
      this.bitDepth = bitDepth;
    };
    PNG.prototype.getColorType = function() {
      return this.colorType;
    };
    PNG.prototype.setColorType = function(colorType) {
      var colors = 0, alpha = false;
      switch (colorType) {
        case 0:
          colors = 1;
          break;
        case 2:
          colors = 3;
          break;
        case 3:
          colors = 1;
          break;
        case 4:
          colors = 2;
          alpha = true;
          break;
        case 6:
          colors = 4;
          alpha = true;
          break;
        default:
          throw new Error("invalid color type");
      }
      this.colors = colors;
      this.alpha = alpha;
      this.colorType = colorType;
    };
    PNG.prototype.getCompressionMethod = function() {
      return this.compressionMethod;
    };
    PNG.prototype.setCompressionMethod = function(compressionMethod) {
      if (compressionMethod !== 0) {
        throw new Error("invalid compression method " + compressionMethod);
      }
      this.compressionMethod = compressionMethod;
    };
    PNG.prototype.getFilterMethod = function() {
      return this.filterMethod;
    };
    PNG.prototype.setFilterMethod = function(filterMethod) {
      if (filterMethod !== 0) {
        throw new Error("invalid filter method " + filterMethod);
      }
      this.filterMethod = filterMethod;
    };
    PNG.prototype.getInterlaceMethod = function() {
      return this.interlaceMethod;
    };
    PNG.prototype.setInterlaceMethod = function(interlaceMethod) {
      if (interlaceMethod !== 0 && interlaceMethod !== 1) {
        throw new Error("invalid interlace method " + interlaceMethod);
      }
      this.interlaceMethod = interlaceMethod;
    };
    PNG.prototype.setPalette = function(palette) {
      if (palette.length % 3 !== 0) {
        throw new Error("incorrect PLTE chunk length");
      }
      if (palette.length > Math.pow(2, this.bitDepth) * 3) {
        throw new Error("palette has more colors than 2^bitdepth");
      }
      this.palette = palette;
    };
    PNG.prototype.getPalette = function() {
      return this.palette;
    };
    PNG.prototype.getPixel = function(x, y) {
      if (!this.pixels)
        throw new Error("pixel data is empty");
      if (x >= this.width || y >= this.height) {
        throw new Error("x,y position out of bound");
      }
      var i = this.colors * this.bitDepth / 8 * (y * this.width + x);
      var pixels = this.pixels;
      switch (this.colorType) {
        case 0:
          return [pixels[i], pixels[i], pixels[i], 255];
        case 2:
          return [pixels[i], pixels[i + 1], pixels[i + 2], 255];
        case 3:
          return [
            this.palette[pixels[i] * 3 + 0],
            this.palette[pixels[i] * 3 + 1],
            this.palette[pixels[i] * 3 + 2],
            255
          ];
        case 4:
          return [pixels[i], pixels[i], pixels[i], pixels[i + 1]];
        case 6:
          return [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
      }
    };
    module2.exports = PNG;
  }
});

// node_modules/png.js/stream.js
var require_stream = __commonJS({
  "node_modules/png.js/stream.js"(exports) {
    "use strict";
    var Stream = function StreamClosure() {
      function Stream2(arrayBuffer, start, length3, dict) {
        this.bytes = new Uint8Array(arrayBuffer);
        this.start = start || 0;
        this.pos = this.start;
        this.end = start + length3 || this.bytes.length;
        this.dict = dict;
      }
      Stream2.prototype = {
        get length() {
          return this.end - this.start;
        },
        getByte: function Stream_getByte() {
          if (this.pos >= this.end)
            return null;
          return this.bytes[this.pos++];
        },
        getBytes: function Stream_getBytes(length3) {
          var bytes = this.bytes;
          var pos = this.pos;
          var strEnd = this.end;
          if (!length3)
            return bytes.subarray(pos, strEnd);
          var end = pos + length3;
          if (end > strEnd)
            end = strEnd;
          this.pos = end;
          return bytes.subarray(pos, end);
        },
        lookChar: function Stream_lookChar() {
          if (this.pos >= this.end)
            return null;
          return String.fromCharCode(this.bytes[this.pos]);
        },
        getChar: function Stream_getChar() {
          if (this.pos >= this.end)
            return null;
          return String.fromCharCode(this.bytes[this.pos++]);
        },
        skip: function Stream_skip(n) {
          if (!n)
            n = 1;
          this.pos += n;
        },
        reset: function Stream_reset() {
          this.pos = this.start;
        },
        moveStart: function Stream_moveStart() {
          this.start = this.pos;
        },
        makeSubStream: function Stream_makeSubStream(start, length3, dict) {
          return new Stream2(this.bytes.buffer, start, length3, dict);
        },
        isStream: true
      };
      return Stream2;
    }();
    var DecodeStream = function DecodeStreamClosure() {
      function DecodeStream2() {
        this.pos = 0;
        this.bufferLength = 0;
        this.eof = false;
        this.buffer = null;
      }
      DecodeStream2.prototype = {
        ensureBuffer: function DecodeStream_ensureBuffer(requested) {
          var buffer = this.buffer;
          var current = buffer ? buffer.byteLength : 0;
          if (requested < current)
            return buffer;
          var size = 512;
          while (size < requested)
            size <<= 1;
          var buffer2 = new Uint8Array(size);
          for (var i = 0; i < current; ++i)
            buffer2[i] = buffer[i];
          return this.buffer = buffer2;
        },
        getByte: function DecodeStream_getByte() {
          var pos = this.pos;
          while (this.bufferLength <= pos) {
            if (this.eof)
              return null;
            this.readBlock();
          }
          return this.buffer[this.pos++];
        },
        getBytes: function DecodeStream_getBytes(length3) {
          var end, pos = this.pos;
          if (length3) {
            this.ensureBuffer(pos + length3);
            end = pos + length3;
            while (!this.eof && this.bufferLength < end)
              this.readBlock();
            var bufEnd = this.bufferLength;
            if (end > bufEnd)
              end = bufEnd;
          } else {
            while (!this.eof)
              this.readBlock();
            end = this.bufferLength;
            if (!end)
              this.buffer = new Uint8Array(0);
          }
          this.pos = end;
          return this.buffer.subarray(pos, end);
        },
        lookChar: function DecodeStream_lookChar() {
          var pos = this.pos;
          while (this.bufferLength <= pos) {
            if (this.eof)
              return null;
            this.readBlock();
          }
          return String.fromCharCode(this.buffer[this.pos]);
        },
        getChar: function DecodeStream_getChar() {
          var pos = this.pos;
          while (this.bufferLength <= pos) {
            if (this.eof)
              return null;
            this.readBlock();
          }
          return String.fromCharCode(this.buffer[this.pos++]);
        },
        makeSubStream: function DecodeStream_makeSubStream(start, length3, dict) {
          var end = start + length3;
          while (this.bufferLength <= end && !this.eof)
            this.readBlock();
          return new Stream(this.buffer, start, length3, dict);
        },
        skip: function DecodeStream_skip(n) {
          if (!n)
            n = 1;
          this.pos += n;
        },
        reset: function DecodeStream_reset() {
          this.pos = 0;
        }
      };
      return DecodeStream2;
    }();
    var FlateStream = function FlateStreamClosure() {
      var codeLenCodeMap = new Uint32Array([
        16,
        17,
        18,
        0,
        8,
        7,
        9,
        6,
        10,
        5,
        11,
        4,
        12,
        3,
        13,
        2,
        14,
        1,
        15
      ]);
      var lengthDecode = new Uint32Array([
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        65547,
        65549,
        65551,
        65553,
        131091,
        131095,
        131099,
        131103,
        196643,
        196651,
        196659,
        196667,
        262211,
        262227,
        262243,
        262259,
        327811,
        327843,
        327875,
        327907,
        258,
        258,
        258
      ]);
      var distDecode = new Uint32Array([
        1,
        2,
        3,
        4,
        65541,
        65543,
        131081,
        131085,
        196625,
        196633,
        262177,
        262193,
        327745,
        327777,
        393345,
        393409,
        459009,
        459137,
        524801,
        525057,
        590849,
        591361,
        657409,
        658433,
        724993,
        727041,
        794625,
        798721,
        868353,
        876545
      ]);
      var fixedLitCodeTab = [new Uint32Array([
        459008,
        524368,
        524304,
        524568,
        459024,
        524400,
        524336,
        590016,
        459016,
        524384,
        524320,
        589984,
        524288,
        524416,
        524352,
        590048,
        459012,
        524376,
        524312,
        589968,
        459028,
        524408,
        524344,
        590032,
        459020,
        524392,
        524328,
        59e4,
        524296,
        524424,
        524360,
        590064,
        459010,
        524372,
        524308,
        524572,
        459026,
        524404,
        524340,
        590024,
        459018,
        524388,
        524324,
        589992,
        524292,
        524420,
        524356,
        590056,
        459014,
        524380,
        524316,
        589976,
        459030,
        524412,
        524348,
        590040,
        459022,
        524396,
        524332,
        590008,
        524300,
        524428,
        524364,
        590072,
        459009,
        524370,
        524306,
        524570,
        459025,
        524402,
        524338,
        590020,
        459017,
        524386,
        524322,
        589988,
        524290,
        524418,
        524354,
        590052,
        459013,
        524378,
        524314,
        589972,
        459029,
        524410,
        524346,
        590036,
        459021,
        524394,
        524330,
        590004,
        524298,
        524426,
        524362,
        590068,
        459011,
        524374,
        524310,
        524574,
        459027,
        524406,
        524342,
        590028,
        459019,
        524390,
        524326,
        589996,
        524294,
        524422,
        524358,
        590060,
        459015,
        524382,
        524318,
        589980,
        459031,
        524414,
        524350,
        590044,
        459023,
        524398,
        524334,
        590012,
        524302,
        524430,
        524366,
        590076,
        459008,
        524369,
        524305,
        524569,
        459024,
        524401,
        524337,
        590018,
        459016,
        524385,
        524321,
        589986,
        524289,
        524417,
        524353,
        590050,
        459012,
        524377,
        524313,
        589970,
        459028,
        524409,
        524345,
        590034,
        459020,
        524393,
        524329,
        590002,
        524297,
        524425,
        524361,
        590066,
        459010,
        524373,
        524309,
        524573,
        459026,
        524405,
        524341,
        590026,
        459018,
        524389,
        524325,
        589994,
        524293,
        524421,
        524357,
        590058,
        459014,
        524381,
        524317,
        589978,
        459030,
        524413,
        524349,
        590042,
        459022,
        524397,
        524333,
        590010,
        524301,
        524429,
        524365,
        590074,
        459009,
        524371,
        524307,
        524571,
        459025,
        524403,
        524339,
        590022,
        459017,
        524387,
        524323,
        589990,
        524291,
        524419,
        524355,
        590054,
        459013,
        524379,
        524315,
        589974,
        459029,
        524411,
        524347,
        590038,
        459021,
        524395,
        524331,
        590006,
        524299,
        524427,
        524363,
        590070,
        459011,
        524375,
        524311,
        524575,
        459027,
        524407,
        524343,
        590030,
        459019,
        524391,
        524327,
        589998,
        524295,
        524423,
        524359,
        590062,
        459015,
        524383,
        524319,
        589982,
        459031,
        524415,
        524351,
        590046,
        459023,
        524399,
        524335,
        590014,
        524303,
        524431,
        524367,
        590078,
        459008,
        524368,
        524304,
        524568,
        459024,
        524400,
        524336,
        590017,
        459016,
        524384,
        524320,
        589985,
        524288,
        524416,
        524352,
        590049,
        459012,
        524376,
        524312,
        589969,
        459028,
        524408,
        524344,
        590033,
        459020,
        524392,
        524328,
        590001,
        524296,
        524424,
        524360,
        590065,
        459010,
        524372,
        524308,
        524572,
        459026,
        524404,
        524340,
        590025,
        459018,
        524388,
        524324,
        589993,
        524292,
        524420,
        524356,
        590057,
        459014,
        524380,
        524316,
        589977,
        459030,
        524412,
        524348,
        590041,
        459022,
        524396,
        524332,
        590009,
        524300,
        524428,
        524364,
        590073,
        459009,
        524370,
        524306,
        524570,
        459025,
        524402,
        524338,
        590021,
        459017,
        524386,
        524322,
        589989,
        524290,
        524418,
        524354,
        590053,
        459013,
        524378,
        524314,
        589973,
        459029,
        524410,
        524346,
        590037,
        459021,
        524394,
        524330,
        590005,
        524298,
        524426,
        524362,
        590069,
        459011,
        524374,
        524310,
        524574,
        459027,
        524406,
        524342,
        590029,
        459019,
        524390,
        524326,
        589997,
        524294,
        524422,
        524358,
        590061,
        459015,
        524382,
        524318,
        589981,
        459031,
        524414,
        524350,
        590045,
        459023,
        524398,
        524334,
        590013,
        524302,
        524430,
        524366,
        590077,
        459008,
        524369,
        524305,
        524569,
        459024,
        524401,
        524337,
        590019,
        459016,
        524385,
        524321,
        589987,
        524289,
        524417,
        524353,
        590051,
        459012,
        524377,
        524313,
        589971,
        459028,
        524409,
        524345,
        590035,
        459020,
        524393,
        524329,
        590003,
        524297,
        524425,
        524361,
        590067,
        459010,
        524373,
        524309,
        524573,
        459026,
        524405,
        524341,
        590027,
        459018,
        524389,
        524325,
        589995,
        524293,
        524421,
        524357,
        590059,
        459014,
        524381,
        524317,
        589979,
        459030,
        524413,
        524349,
        590043,
        459022,
        524397,
        524333,
        590011,
        524301,
        524429,
        524365,
        590075,
        459009,
        524371,
        524307,
        524571,
        459025,
        524403,
        524339,
        590023,
        459017,
        524387,
        524323,
        589991,
        524291,
        524419,
        524355,
        590055,
        459013,
        524379,
        524315,
        589975,
        459029,
        524411,
        524347,
        590039,
        459021,
        524395,
        524331,
        590007,
        524299,
        524427,
        524363,
        590071,
        459011,
        524375,
        524311,
        524575,
        459027,
        524407,
        524343,
        590031,
        459019,
        524391,
        524327,
        589999,
        524295,
        524423,
        524359,
        590063,
        459015,
        524383,
        524319,
        589983,
        459031,
        524415,
        524351,
        590047,
        459023,
        524399,
        524335,
        590015,
        524303,
        524431,
        524367,
        590079
      ]), 9];
      var fixedDistCodeTab = [new Uint32Array([
        327680,
        327696,
        327688,
        327704,
        327684,
        327700,
        327692,
        327708,
        327682,
        327698,
        327690,
        327706,
        327686,
        327702,
        327694,
        0,
        327681,
        327697,
        327689,
        327705,
        327685,
        327701,
        327693,
        327709,
        327683,
        327699,
        327691,
        327707,
        327687,
        327703,
        327695,
        0
      ]), 5];
      function FlateStream2(stream) {
        var bytes = stream.getBytes();
        var bytesPos = 0;
        this.dict = stream.dict;
        var cmf = bytes[bytesPos++];
        var flg = bytes[bytesPos++];
        if (cmf == -1 || flg == -1)
          error("Invalid header in flate stream: " + cmf + ", " + flg);
        if ((cmf & 15) != 8)
          error("Unknown compression method in flate stream: " + cmf + ", " + flg);
        if (((cmf << 8) + flg) % 31 != 0)
          error("Bad FCHECK in flate stream: " + cmf + ", " + flg);
        if (flg & 32)
          error("FDICT bit set in flate stream: " + cmf + ", " + flg);
        this.bytes = bytes;
        this.bytesPos = bytesPos;
        this.codeSize = 0;
        this.codeBuf = 0;
        DecodeStream.call(this);
      }
      FlateStream2.prototype = Object.create(DecodeStream.prototype);
      FlateStream2.prototype.getBits = function FlateStream_getBits(bits) {
        var codeSize = this.codeSize;
        var codeBuf = this.codeBuf;
        var bytes = this.bytes;
        var bytesPos = this.bytesPos;
        var b;
        while (codeSize < bits) {
          if (typeof (b = bytes[bytesPos++]) == "undefined")
            error("Bad encoding in flate stream");
          codeBuf |= b << codeSize;
          codeSize += 8;
        }
        b = codeBuf & (1 << bits) - 1;
        this.codeBuf = codeBuf >> bits;
        this.codeSize = codeSize -= bits;
        this.bytesPos = bytesPos;
        return b;
      };
      FlateStream2.prototype.getCode = function FlateStream_getCode(table) {
        var codes = table[0];
        var maxLen = table[1];
        var codeSize = this.codeSize;
        var codeBuf = this.codeBuf;
        var bytes = this.bytes;
        var bytesPos = this.bytesPos;
        while (codeSize < maxLen) {
          var b;
          if (typeof (b = bytes[bytesPos++]) == "undefined")
            error("Bad encoding in flate stream");
          codeBuf |= b << codeSize;
          codeSize += 8;
        }
        var code = codes[codeBuf & (1 << maxLen) - 1];
        var codeLen = code >> 16;
        var codeVal = code & 65535;
        if (codeSize == 0 || codeSize < codeLen || codeLen == 0)
          error("Bad encoding in flate stream");
        this.codeBuf = codeBuf >> codeLen;
        this.codeSize = codeSize - codeLen;
        this.bytesPos = bytesPos;
        return codeVal;
      };
      FlateStream2.prototype.generateHuffmanTable = function flateStreamGenerateHuffmanTable(lengths) {
        var n = lengths.length;
        var maxLen = 0;
        for (var i = 0; i < n; ++i) {
          if (lengths[i] > maxLen)
            maxLen = lengths[i];
        }
        var size = 1 << maxLen;
        var codes = new Uint32Array(size);
        for (var len = 1, code = 0, skip = 2; len <= maxLen; ++len, code <<= 1, skip <<= 1) {
          for (var val = 0; val < n; ++val) {
            if (lengths[val] == len) {
              var code2 = 0;
              var t = code;
              for (var i = 0; i < len; ++i) {
                code2 = code2 << 1 | t & 1;
                t >>= 1;
              }
              for (var i = code2; i < size; i += skip)
                codes[i] = len << 16 | val;
              ++code;
            }
          }
        }
        return [codes, maxLen];
      };
      FlateStream2.prototype.readBlock = function FlateStream_readBlock() {
        var hdr = this.getBits(3);
        if (hdr & 1)
          this.eof = true;
        hdr >>= 1;
        if (hdr == 0) {
          var bytes = this.bytes;
          var bytesPos = this.bytesPos;
          var b;
          if (typeof (b = bytes[bytesPos++]) == "undefined")
            error("Bad block header in flate stream");
          var blockLen = b;
          if (typeof (b = bytes[bytesPos++]) == "undefined")
            error("Bad block header in flate stream");
          blockLen |= b << 8;
          if (typeof (b = bytes[bytesPos++]) == "undefined")
            error("Bad block header in flate stream");
          var check = b;
          if (typeof (b = bytes[bytesPos++]) == "undefined")
            error("Bad block header in flate stream");
          check |= b << 8;
          if (check != (~blockLen & 65535))
            error("Bad uncompressed block length in flate stream");
          this.codeBuf = 0;
          this.codeSize = 0;
          var bufferLength = this.bufferLength;
          var buffer = this.ensureBuffer(bufferLength + blockLen);
          var end = bufferLength + blockLen;
          this.bufferLength = end;
          for (var n = bufferLength; n < end; ++n) {
            if (typeof (b = bytes[bytesPos++]) == "undefined") {
              this.eof = true;
              break;
            }
            buffer[n] = b;
          }
          this.bytesPos = bytesPos;
          return;
        }
        var litCodeTable;
        var distCodeTable;
        if (hdr == 1) {
          litCodeTable = fixedLitCodeTab;
          distCodeTable = fixedDistCodeTab;
        } else if (hdr == 2) {
          var numLitCodes = this.getBits(5) + 257;
          var numDistCodes = this.getBits(5) + 1;
          var numCodeLenCodes = this.getBits(4) + 4;
          var codeLenCodeLengths = new Uint8Array(codeLenCodeMap.length);
          for (var i = 0; i < numCodeLenCodes; ++i)
            codeLenCodeLengths[codeLenCodeMap[i]] = this.getBits(3);
          var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);
          var len = 0;
          var i = 0;
          var codes = numLitCodes + numDistCodes;
          var codeLengths = new Uint8Array(codes);
          while (i < codes) {
            var code = this.getCode(codeLenCodeTab);
            if (code == 16) {
              var bitsLength = 2, bitsOffset = 3, what = len;
            } else if (code == 17) {
              var bitsLength = 3, bitsOffset = 3, what = len = 0;
            } else if (code == 18) {
              var bitsLength = 7, bitsOffset = 11, what = len = 0;
            } else {
              codeLengths[i++] = len = code;
              continue;
            }
            var repeatLength = this.getBits(bitsLength) + bitsOffset;
            while (repeatLength-- > 0)
              codeLengths[i++] = what;
          }
          litCodeTable = this.generateHuffmanTable(codeLengths.subarray(0, numLitCodes));
          distCodeTable = this.generateHuffmanTable(codeLengths.subarray(numLitCodes, codes));
        } else {
          error("Unknown block type in flate stream");
        }
        var buffer = this.buffer;
        var limit = buffer ? buffer.length : 0;
        var pos = this.bufferLength;
        while (true) {
          var code1 = this.getCode(litCodeTable);
          if (code1 < 256) {
            if (pos + 1 >= limit) {
              buffer = this.ensureBuffer(pos + 1);
              limit = buffer.length;
            }
            buffer[pos++] = code1;
            continue;
          }
          if (code1 == 256) {
            this.bufferLength = pos;
            return;
          }
          code1 -= 257;
          code1 = lengthDecode[code1];
          var code2 = code1 >> 16;
          if (code2 > 0)
            code2 = this.getBits(code2);
          var len = (code1 & 65535) + code2;
          code1 = this.getCode(distCodeTable);
          code1 = distDecode[code1];
          code2 = code1 >> 16;
          if (code2 > 0)
            code2 = this.getBits(code2);
          var dist = (code1 & 65535) + code2;
          if (pos + len >= limit) {
            buffer = this.ensureBuffer(pos + len);
            limit = buffer.length;
          }
          for (var k = 0; k < len; ++k, ++pos)
            buffer[pos] = buffer[pos - dist];
        }
      };
      return FlateStream2;
    }();
    exports.Stream = Stream;
    exports.FlateStream = FlateStream;
  }
});

// node_modules/png.js/PNGReader.js
var require_PNGReader = __commonJS({
  "node_modules/png.js/PNGReader.js"(exports, module2) {
    "use strict";
    var PNG = require_PNG();
    var isNode = typeof process !== "undefined" && !process.browser;
    var inflate = function() {
      if (isNode) {
        var zlib = require("zlib");
        return function(data, callback) {
          return zlib.inflate(new Buffer(data), callback);
        };
      } else {
        var stream = require_stream();
        return function(data, callback) {
          data = new stream.FlateStream(new stream.Stream(data));
          callback(null, data.getBytes());
        };
      }
    }();
    var ByteBuffer = isNode ? Buffer : function() {
      if (typeof ArrayBuffer == "function") {
        return function(length3) {
          return new Uint8Array(new ArrayBuffer(length3));
        };
      } else {
        return function(length3) {
          return new Array(length3);
        };
      }
    }();
    var slice = Array.prototype.slice;
    var toString = Object.prototype.toString;
    function equalBytes(a, b) {
      if (a.length != b.length)
        return false;
      for (var l = a.length; l--; )
        if (a[l] != b[l])
          return false;
      return true;
    }
    function readUInt32(buffer, offset) {
      return (buffer[offset] << 24) + (buffer[offset + 1] << 16) + (buffer[offset + 2] << 8) + (buffer[offset + 3] << 0);
    }
    function readUInt8(buffer, offset) {
      return buffer[offset] << 0;
    }
    function bufferToString(buffer) {
      var str = "";
      for (var i = 0; i < buffer.length; i++) {
        str += String.fromCharCode(buffer[i]);
      }
      return str;
    }
    var PNGReader = function(bytes) {
      if (typeof bytes == "string") {
        var bts = bytes;
        bytes = new Array(bts.length);
        for (var i = 0, l = bts.length; i < l; i++) {
          bytes[i] = bts[i].charCodeAt(0);
        }
      } else {
        var type = toString.call(bytes).slice(8, -1);
        if (type == "ArrayBuffer")
          bytes = new Uint8Array(bytes);
      }
      this.i = 0;
      this.bytes = bytes;
      this.png = new PNG();
      this.dataChunks = [];
    };
    PNGReader.prototype.readBytes = function(length3) {
      var end = this.i + length3;
      if (end > this.bytes.length) {
        throw new Error("Unexpectedly reached end of file");
      }
      var bytes = slice.call(this.bytes, this.i, end);
      this.i = end;
      return bytes;
    };
    PNGReader.prototype.decodeHeader = function() {
      if (this.i !== 0) {
        throw new Error("file pointer should be at 0 to read the header");
      }
      var header = this.readBytes(8);
      if (!equalBytes(header, [137, 80, 78, 71, 13, 10, 26, 10])) {
        throw new Error("invalid PNGReader file (bad signature)");
      }
      this.header = header;
    };
    PNGReader.prototype.decodeChunk = function() {
      var length3 = readUInt32(this.readBytes(4), 0);
      if (length3 < 0) {
        throw new Error("Bad chunk length " + (4294967295 & length3));
      }
      var type = bufferToString(this.readBytes(4));
      var chunk = this.readBytes(length3);
      var crc = this.readBytes(4);
      switch (type) {
        case "IHDR":
          this.decodeIHDR(chunk);
          break;
        case "PLTE":
          this.decodePLTE(chunk);
          break;
        case "IDAT":
          this.decodeIDAT(chunk);
          break;
        case "IEND":
          this.decodeIEND(chunk);
          break;
      }
      return type;
    };
    PNGReader.prototype.decodeIHDR = function(chunk) {
      var png = this.png;
      png.setWidth(readUInt32(chunk, 0));
      png.setHeight(readUInt32(chunk, 4));
      png.setBitDepth(readUInt8(chunk, 8));
      png.setColorType(readUInt8(chunk, 9));
      png.setCompressionMethod(readUInt8(chunk, 10));
      png.setFilterMethod(readUInt8(chunk, 11));
      png.setInterlaceMethod(readUInt8(chunk, 12));
    };
    PNGReader.prototype.decodePLTE = function(chunk) {
      this.png.setPalette(chunk);
    };
    PNGReader.prototype.decodeIDAT = function(chunk) {
      this.dataChunks.push(chunk);
    };
    PNGReader.prototype.decodeIEND = function() {
    };
    PNGReader.prototype.decodePixels = function(callback) {
      var png = this.png;
      var reader = this;
      var length3 = 0;
      var i, j, k, l;
      for (l = this.dataChunks.length; l--; )
        length3 += this.dataChunks[l].length;
      var data = new ByteBuffer(length3);
      for (i = 0, k = 0, l = this.dataChunks.length; i < l; i++) {
        var chunk = this.dataChunks[i];
        for (j = 0; j < chunk.length; j++)
          data[k++] = chunk[j];
      }
      inflate(data, function(err, data2) {
        if (err)
          return callback(err);
        try {
          if (png.getInterlaceMethod() === 0) {
            reader.interlaceNone(data2);
          } else {
            reader.interlaceAdam7(data2);
          }
        } catch (e) {
          return callback(e);
        }
        callback();
      });
    };
    PNGReader.prototype.interlaceNone = function(data) {
      var png = this.png;
      var bpp = Math.max(1, png.colors * png.bitDepth / 8);
      var cpr = bpp * png.width;
      var pixels = new ByteBuffer(bpp * png.width * png.height);
      var scanline;
      var offset = 0;
      for (var i = 0; i < data.length; i += cpr + 1) {
        scanline = slice.call(data, i + 1, i + cpr + 1);
        switch (readUInt8(data, i)) {
          case 0:
            this.unFilterNone(scanline, pixels, bpp, offset, cpr);
            break;
          case 1:
            this.unFilterSub(scanline, pixels, bpp, offset, cpr);
            break;
          case 2:
            this.unFilterUp(scanline, pixels, bpp, offset, cpr);
            break;
          case 3:
            this.unFilterAverage(scanline, pixels, bpp, offset, cpr);
            break;
          case 4:
            this.unFilterPaeth(scanline, pixels, bpp, offset, cpr);
            break;
          default:
            throw new Error("unkown filtered scanline");
        }
        offset += cpr;
      }
      png.pixels = pixels;
    };
    PNGReader.prototype.interlaceAdam7 = function(data) {
      throw new Error("Adam7 interlacing is not implemented yet");
    };
    PNGReader.prototype.unFilterNone = function(scanline, pixels, bpp, of, length3) {
      for (var i = 0, to = length3; i < to; i++) {
        pixels[of + i] = scanline[i];
      }
    };
    PNGReader.prototype.unFilterSub = function(scanline, pixels, bpp, of, length3) {
      var i = 0;
      for (; i < bpp; i++)
        pixels[of + i] = scanline[i];
      for (; i < length3; i++) {
        pixels[of + i] = scanline[i] + pixels[of + i - bpp] & 255;
      }
    };
    PNGReader.prototype.unFilterUp = function(scanline, pixels, bpp, of, length3) {
      var i = 0, byte, prev;
      if (of - length3 < 0)
        for (; i < length3; i++) {
          pixels[of + i] = scanline[i];
        }
      else
        for (; i < length3; i++) {
          byte = scanline[i];
          prev = pixels[of + i - length3];
          pixels[of + i] = byte + prev & 255;
        }
    };
    PNGReader.prototype.unFilterAverage = function(scanline, pixels, bpp, of, length3) {
      var i = 0, byte, prev, prior;
      if (of - length3 < 0) {
        for (; i < bpp; i++) {
          pixels[of + i] = scanline[i];
        }
        for (; i < length3; i++) {
          pixels[of + i] = scanline[i] + (pixels[of + i - bpp] >> 1) & 255;
        }
      } else {
        for (; i < bpp; i++) {
          pixels[of + i] = scanline[i] + (pixels[of - length3 + i] >> 1) & 255;
        }
        for (; i < length3; i++) {
          byte = scanline[i];
          prev = pixels[of + i - bpp];
          prior = pixels[of + i - length3];
          pixels[of + i] = byte + (prev + prior >> 1) & 255;
        }
      }
    };
    PNGReader.prototype.unFilterPaeth = function(scanline, pixels, bpp, of, length3) {
      var i = 0, raw, a, b, c, p, pa, pb, pc, pr;
      if (of - length3 < 0) {
        for (; i < bpp; i++) {
          pixels[of + i] = scanline[i];
        }
        for (; i < length3; i++) {
          pixels[of + i] = scanline[i] + pixels[of + i - bpp] & 255;
        }
      } else {
        for (; i < bpp; i++) {
          pixels[of + i] = scanline[i] + pixels[of + i - length3] & 255;
        }
        for (; i < length3; i++) {
          raw = scanline[i];
          a = pixels[of + i - bpp];
          b = pixels[of + i - length3];
          c = pixels[of + i - length3 - bpp];
          p = a + b - c;
          pa = Math.abs(p - a);
          pb = Math.abs(p - b);
          pc = Math.abs(p - c);
          if (pa <= pb && pa <= pc)
            pr = a;
          else if (pb <= pc)
            pr = b;
          else
            pr = c;
          pixels[of + i] = raw + pr & 255;
        }
      }
    };
    PNGReader.prototype.parse = function(options, callback) {
      if (typeof options == "function")
        callback = options;
      if (typeof options != "object")
        options = {};
      try {
        this.decodeHeader();
        while (this.i < this.bytes.length) {
          var type = this.decodeChunk();
          if (type == "IHDR" && options.data === false || type == "IEND")
            break;
        }
        var png = this.png;
        this.decodePixels(function(err) {
          callback(err, png);
        });
      } catch (e) {
        callback(e);
      }
    };
    module2.exports = PNGReader;
  }
});

// node_modules/ansi-256-colors/index.js
var require_ansi_256_colors = __commonJS({
  "node_modules/ansi-256-colors/index.js"(exports, module2) {
    (function() {
      "use strict";
      var fgcodes = Array.apply(null, new Array(256)).map(function(_, i) {
        return "[38;5;" + i + "m";
      });
      var bgcodes = Array.apply(null, new Array(256)).map(function(_, i) {
        return "[48;5;" + i + "m";
      });
      var fg = module2.exports.fg = {
        codes: fgcodes,
        standard: fgcodes.slice(0, 8),
        bright: fgcodes.slice(8, 16),
        rgb: fgcodes.slice(16, 232),
        grayscale: fgcodes.slice(232, 256),
        getRgb: function(r, g, b) {
          return fg.rgb[36 * r + 6 * g + b];
        }
      };
      var bg = module2.exports.bg = {
        codes: bgcodes,
        standard: bgcodes.slice(0, 8),
        bright: bgcodes.slice(8, 16),
        rgb: bgcodes.slice(16, 232),
        grayscale: bgcodes.slice(232, 256),
        getRgb: function(r, g, b) {
          return bg.rgb[36 * r + 6 * g + b];
        }
      };
      var reset = module2.exports.reset = "[0m";
    })();
  }
});

// node_modules/console-png/index.js
var require_console_png = __commonJS({
  "node_modules/console-png/index.js"(exports, module2) {
    "use strict";
    var PNGReader = require_PNGReader();
    var colors = require_ansi_256_colors();
    var CHAR_HALF_BLOCK = String.fromCharCode(9604);
    function printDouble(buffer, done) {
      var reader = new PNGReader(buffer);
      reader.parse(function(err, png) {
        if (err)
          return done(err);
        var s = "";
        for (var y = 0; y < png.getHeight() - 1; y += 2) {
          if (s)
            s += colors.reset + "\n";
          for (var x = 0; x < png.getWidth(); x++) {
            var p1 = png.getPixel(x, y);
            var p2 = png.getPixel(x, y + 1);
            var r1 = Math.round(p1[0] / 255 * 5);
            var g1 = Math.round(p1[1] / 255 * 5);
            var b1 = Math.round(p1[2] / 255 * 5);
            var r2 = Math.round(p2[0] / 255 * 5);
            var g2 = Math.round(p2[1] / 255 * 5);
            var b2 = Math.round(p2[2] / 255 * 5);
            if (p1[3] === 0) {
              s += colors.reset + " ";
            } else {
              s += colors.bg.getRgb(r1, g1, b1) + colors.fg.getRgb(r2, g2, b2) + CHAR_HALF_BLOCK;
            }
          }
        }
        s += colors.reset;
        done(null, s);
      });
    }
    var exports = module2.exports = printDouble;
    exports.attachTo = function(console2) {
      var fs = require("fs");
      function printBuffer(buffer) {
        printDouble(buffer, function(err2, string) {
          if (err2)
            throw err2;
          console2.log(string);
        });
      }
      console2.png = function(filename) {
        if (typeof filename === "string") {
          fs.readFile(filename, function(err1, buffer) {
            if (err1)
              throw err1;
            printBuffer(buffer);
          });
        } else {
          printBuffer(filename);
        }
      };
    };
  }
});

// node_modules/stream-to/index.js
var require_stream_to = __commonJS({
  "node_modules/stream-to/index.js"(exports) {
    exports.array = toArray;
    exports.buffer = toBuffer;
    function toArray(stream, callback) {
      var arr = [];
      stream.on("data", onData);
      stream.once("end", onEnd);
      stream.once("error", callback);
      stream.once("error", cleanup);
      stream.once("close", cleanup);
      function onData(doc) {
        arr.push(doc);
      }
      function onEnd() {
        callback(null, arr);
        cleanup();
      }
      function cleanup() {
        arr = null;
        stream.removeListener("data", onData);
        stream.removeListener("end", onEnd);
        stream.removeListener("error", callback);
        stream.removeListener("error", cleanup);
        stream.removeListener("close", cleanup);
      }
      return stream;
    }
    function toBuffer(stream, callback) {
      toArray(stream, function(err, arr) {
        if (err || !arr)
          callback(err);
        else
          callback(null, Buffer.concat(arr));
      });
      return stream;
    }
  }
});

// node_modules/stream-to-buffer/index.js
var require_stream_to_buffer = __commonJS({
  "node_modules/stream-to-buffer/index.js"(exports, module2) {
    module2.exports = require_stream_to().buffer;
  }
});

// node_modules/node-fetch/lib/index.js
var require_lib = __commonJS({
  "node_modules/node-fetch/lib/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var Stream = _interopDefault(require("stream"));
    var http = _interopDefault(require("http"));
    var Url = _interopDefault(require("url"));
    var https = _interopDefault(require("https"));
    var zlib = _interopDefault(require("zlib"));
    var Readable = Stream.Readable;
    var BUFFER = Symbol("buffer");
    var TYPE = Symbol("type");
    var Blob = class {
      constructor() {
        this[TYPE] = "";
        const blobParts = arguments[0];
        const options = arguments[1];
        const buffers = [];
        let size = 0;
        if (blobParts) {
          const a = blobParts;
          const length3 = Number(a.length);
          for (let i = 0; i < length3; i++) {
            const element = a[i];
            let buffer;
            if (element instanceof Buffer) {
              buffer = element;
            } else if (ArrayBuffer.isView(element)) {
              buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
            } else if (element instanceof ArrayBuffer) {
              buffer = Buffer.from(element);
            } else if (element instanceof Blob) {
              buffer = element[BUFFER];
            } else {
              buffer = Buffer.from(typeof element === "string" ? element : String(element));
            }
            size += buffer.length;
            buffers.push(buffer);
          }
        }
        this[BUFFER] = Buffer.concat(buffers);
        let type = options && options.type !== void 0 && String(options.type).toLowerCase();
        if (type && !/[^\u0020-\u007E]/.test(type)) {
          this[TYPE] = type;
        }
      }
      get size() {
        return this[BUFFER].length;
      }
      get type() {
        return this[TYPE];
      }
      text() {
        return Promise.resolve(this[BUFFER].toString());
      }
      arrayBuffer() {
        const buf = this[BUFFER];
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        return Promise.resolve(ab);
      }
      stream() {
        const readable = new Readable();
        readable._read = function() {
        };
        readable.push(this[BUFFER]);
        readable.push(null);
        return readable;
      }
      toString() {
        return "[object Blob]";
      }
      slice() {
        const size = this.size;
        const start = arguments[0];
        const end = arguments[1];
        let relativeStart, relativeEnd;
        if (start === void 0) {
          relativeStart = 0;
        } else if (start < 0) {
          relativeStart = Math.max(size + start, 0);
        } else {
          relativeStart = Math.min(start, size);
        }
        if (end === void 0) {
          relativeEnd = size;
        } else if (end < 0) {
          relativeEnd = Math.max(size + end, 0);
        } else {
          relativeEnd = Math.min(end, size);
        }
        const span = Math.max(relativeEnd - relativeStart, 0);
        const buffer = this[BUFFER];
        const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
        const blob = new Blob([], { type: arguments[2] });
        blob[BUFFER] = slicedBuffer;
        return blob;
      }
    };
    Object.defineProperties(Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
      value: "Blob",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function FetchError(message, type, systemError) {
      Error.call(this, message);
      this.message = message;
      this.type = type;
      if (systemError) {
        this.code = this.errno = systemError.code;
      }
      Error.captureStackTrace(this, this.constructor);
    }
    FetchError.prototype = Object.create(Error.prototype);
    FetchError.prototype.constructor = FetchError;
    FetchError.prototype.name = "FetchError";
    var convert;
    try {
      convert = require("encoding").convert;
    } catch (e) {
    }
    var INTERNALS = Symbol("Body internals");
    var PassThrough = Stream.PassThrough;
    function Body(body2) {
      var _this = this;
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
      let size = _ref$size === void 0 ? 0 : _ref$size;
      var _ref$timeout = _ref.timeout;
      let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
      if (body2 == null) {
        body2 = null;
      } else if (isURLSearchParams(body2)) {
        body2 = Buffer.from(body2.toString());
      } else if (isBlob(body2))
        ;
      else if (Buffer.isBuffer(body2))
        ;
      else if (Object.prototype.toString.call(body2) === "[object ArrayBuffer]") {
        body2 = Buffer.from(body2);
      } else if (ArrayBuffer.isView(body2)) {
        body2 = Buffer.from(body2.buffer, body2.byteOffset, body2.byteLength);
      } else if (body2 instanceof Stream)
        ;
      else {
        body2 = Buffer.from(String(body2));
      }
      this[INTERNALS] = {
        body: body2,
        disturbed: false,
        error: null
      };
      this.size = size;
      this.timeout = timeout;
      if (body2 instanceof Stream) {
        body2.on("error", function(err) {
          const error2 = err.name === "AbortError" ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
          _this[INTERNALS].error = error2;
        });
      }
    }
    Body.prototype = {
      get body() {
        return this[INTERNALS].body;
      },
      get bodyUsed() {
        return this[INTERNALS].disturbed;
      },
      arrayBuffer() {
        return consumeBody.call(this).then(function(buf) {
          return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        });
      },
      blob() {
        let ct = this.headers && this.headers.get("content-type") || "";
        return consumeBody.call(this).then(function(buf) {
          return Object.assign(new Blob([], {
            type: ct.toLowerCase()
          }), {
            [BUFFER]: buf
          });
        });
      },
      json() {
        var _this2 = this;
        return consumeBody.call(this).then(function(buffer) {
          try {
            return JSON.parse(buffer.toString());
          } catch (err) {
            return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
          }
        });
      },
      text() {
        return consumeBody.call(this).then(function(buffer) {
          return buffer.toString();
        });
      },
      buffer() {
        return consumeBody.call(this);
      },
      textConverted() {
        var _this3 = this;
        return consumeBody.call(this).then(function(buffer) {
          return convertBody(buffer, _this3.headers);
        });
      }
    };
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    Body.mixIn = function(proto) {
      for (const name of Object.getOwnPropertyNames(Body.prototype)) {
        if (!(name in proto)) {
          const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
          Object.defineProperty(proto, name, desc);
        }
      }
    };
    function consumeBody() {
      var _this4 = this;
      if (this[INTERNALS].disturbed) {
        return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
      }
      this[INTERNALS].disturbed = true;
      if (this[INTERNALS].error) {
        return Body.Promise.reject(this[INTERNALS].error);
      }
      let body2 = this.body;
      if (body2 === null) {
        return Body.Promise.resolve(Buffer.alloc(0));
      }
      if (isBlob(body2)) {
        body2 = body2.stream();
      }
      if (Buffer.isBuffer(body2)) {
        return Body.Promise.resolve(body2);
      }
      if (!(body2 instanceof Stream)) {
        return Body.Promise.resolve(Buffer.alloc(0));
      }
      let accum = [];
      let accumBytes = 0;
      let abort = false;
      return new Body.Promise(function(resolve3, reject2) {
        let resTimeout;
        if (_this4.timeout) {
          resTimeout = setTimeout(function() {
            abort = true;
            reject2(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
          }, _this4.timeout);
        }
        body2.on("error", function(err) {
          if (err.name === "AbortError") {
            abort = true;
            reject2(err);
          } else {
            reject2(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
          }
        });
        body2.on("data", function(chunk) {
          if (abort || chunk === null) {
            return;
          }
          if (_this4.size && accumBytes + chunk.length > _this4.size) {
            abort = true;
            reject2(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
            return;
          }
          accumBytes += chunk.length;
          accum.push(chunk);
        });
        body2.on("end", function() {
          if (abort) {
            return;
          }
          clearTimeout(resTimeout);
          try {
            resolve3(Buffer.concat(accum, accumBytes));
          } catch (err) {
            reject2(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
          }
        });
      });
    }
    function convertBody(buffer, headers) {
      if (typeof convert !== "function") {
        throw new Error("The package `encoding` must be installed to use the textConverted() function");
      }
      const ct = headers.get("content-type");
      let charset = "utf-8";
      let res, str;
      if (ct) {
        res = /charset=([^;]*)/i.exec(ct);
      }
      str = buffer.slice(0, 1024).toString();
      if (!res && str) {
        res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
      }
      if (!res && str) {
        res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
        if (!res) {
          res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
          if (res) {
            res.pop();
          }
        }
        if (res) {
          res = /charset=(.*)/i.exec(res.pop());
        }
      }
      if (!res && str) {
        res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
      }
      if (res) {
        charset = res.pop();
        if (charset === "gb2312" || charset === "gbk") {
          charset = "gb18030";
        }
      }
      return convert(buffer, "UTF-8", charset).toString();
    }
    function isURLSearchParams(obj) {
      if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
        return false;
      }
      return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
    }
    function isBlob(obj) {
      return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
    }
    function clone(instance) {
      let p1, p2;
      let body2 = instance.body;
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body2 instanceof Stream && typeof body2.getBoundary !== "function") {
        p1 = new PassThrough();
        p2 = new PassThrough();
        body2.pipe(p1);
        body2.pipe(p2);
        instance[INTERNALS].body = p1;
        body2 = p2;
      }
      return body2;
    }
    function extractContentType(body2) {
      if (body2 === null) {
        return null;
      } else if (typeof body2 === "string") {
        return "text/plain;charset=UTF-8";
      } else if (isURLSearchParams(body2)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      } else if (isBlob(body2)) {
        return body2.type || null;
      } else if (Buffer.isBuffer(body2)) {
        return null;
      } else if (Object.prototype.toString.call(body2) === "[object ArrayBuffer]") {
        return null;
      } else if (ArrayBuffer.isView(body2)) {
        return null;
      } else if (typeof body2.getBoundary === "function") {
        return `multipart/form-data;boundary=${body2.getBoundary()}`;
      } else if (body2 instanceof Stream) {
        return null;
      } else {
        return "text/plain;charset=UTF-8";
      }
    }
    function getTotalBytes(instance) {
      const body2 = instance.body;
      if (body2 === null) {
        return 0;
      } else if (isBlob(body2)) {
        return body2.size;
      } else if (Buffer.isBuffer(body2)) {
        return body2.length;
      } else if (body2 && typeof body2.getLengthSync === "function") {
        if (body2._lengthRetrievers && body2._lengthRetrievers.length == 0 || body2.hasKnownLength && body2.hasKnownLength()) {
          return body2.getLengthSync();
        }
        return null;
      } else {
        return null;
      }
    }
    function writeToStream(dest, instance) {
      const body2 = instance.body;
      if (body2 === null) {
        dest.end();
      } else if (isBlob(body2)) {
        body2.stream().pipe(dest);
      } else if (Buffer.isBuffer(body2)) {
        dest.write(body2);
        dest.end();
      } else {
        body2.pipe(dest);
      }
    }
    Body.Promise = global.Promise;
    var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
    var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
    function validateName(name) {
      name = `${name}`;
      if (invalidTokenRegex.test(name) || name === "") {
        throw new TypeError(`${name} is not a legal HTTP header name`);
      }
    }
    function validateValue(value) {
      value = `${value}`;
      if (invalidHeaderCharRegex.test(value)) {
        throw new TypeError(`${value} is not a legal HTTP header value`);
      }
    }
    function find5(map7, name) {
      name = name.toLowerCase();
      for (const key in map7) {
        if (key.toLowerCase() === name) {
          return key;
        }
      }
      return void 0;
    }
    var MAP = Symbol("map");
    var Headers = class {
      constructor() {
        let init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        this[MAP] = Object.create(null);
        if (init instanceof Headers) {
          const rawHeaders = init.raw();
          const headerNames = Object.keys(rawHeaders);
          for (const headerName of headerNames) {
            for (const value of rawHeaders[headerName]) {
              this.append(headerName, value);
            }
          }
          return;
        }
        if (init == null)
          ;
        else if (typeof init === "object") {
          const method = init[Symbol.iterator];
          if (method != null) {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            const pairs = [];
            for (const pair of init) {
              if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
                throw new TypeError("Each header pair must be iterable");
              }
              pairs.push(Array.from(pair));
            }
            for (const pair of pairs) {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              this.append(pair[0], pair[1]);
            }
          } else {
            for (const key of Object.keys(init)) {
              const value = init[key];
              this.append(key, value);
            }
          }
        } else {
          throw new TypeError("Provided initializer must be an object");
        }
      }
      get(name) {
        name = `${name}`;
        validateName(name);
        const key = find5(this[MAP], name);
        if (key === void 0) {
          return null;
        }
        return this[MAP][key].join(", ");
      }
      forEach(callback) {
        let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
        let pairs = getHeaders(this);
        let i = 0;
        while (i < pairs.length) {
          var _pairs$i = pairs[i];
          const name = _pairs$i[0], value = _pairs$i[1];
          callback.call(thisArg, value, name, this);
          pairs = getHeaders(this);
          i++;
        }
      }
      set(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find5(this[MAP], name);
        this[MAP][key !== void 0 ? key : name] = [value];
      }
      append(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find5(this[MAP], name);
        if (key !== void 0) {
          this[MAP][key].push(value);
        } else {
          this[MAP][name] = [value];
        }
      }
      has(name) {
        name = `${name}`;
        validateName(name);
        return find5(this[MAP], name) !== void 0;
      }
      delete(name) {
        name = `${name}`;
        validateName(name);
        const key = find5(this[MAP], name);
        if (key !== void 0) {
          delete this[MAP][key];
        }
      }
      raw() {
        return this[MAP];
      }
      keys() {
        return createHeadersIterator(this, "key");
      }
      values() {
        return createHeadersIterator(this, "value");
      }
      [Symbol.iterator]() {
        return createHeadersIterator(this, "key+value");
      }
    };
    Headers.prototype.entries = Headers.prototype[Symbol.iterator];
    Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
      value: "Headers",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Headers.prototype, {
      get: { enumerable: true },
      forEach: { enumerable: true },
      set: { enumerable: true },
      append: { enumerable: true },
      has: { enumerable: true },
      delete: { enumerable: true },
      keys: { enumerable: true },
      values: { enumerable: true },
      entries: { enumerable: true }
    });
    function getHeaders(headers) {
      let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
      const keys = Object.keys(headers[MAP]).sort();
      return keys.map(kind === "key" ? function(k) {
        return k.toLowerCase();
      } : kind === "value" ? function(k) {
        return headers[MAP][k].join(", ");
      } : function(k) {
        return [k.toLowerCase(), headers[MAP][k].join(", ")];
      });
    }
    var INTERNAL = Symbol("internal");
    function createHeadersIterator(target, kind) {
      const iterator = Object.create(HeadersIteratorPrototype);
      iterator[INTERNAL] = {
        target,
        kind,
        index: 0
      };
      return iterator;
    }
    var HeadersIteratorPrototype = Object.setPrototypeOf({
      next() {
        if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
          throw new TypeError("Value of `this` is not a HeadersIterator");
        }
        var _INTERNAL = this[INTERNAL];
        const target = _INTERNAL.target, kind = _INTERNAL.kind, index = _INTERNAL.index;
        const values = getHeaders(target, kind);
        const len = values.length;
        if (index >= len) {
          return {
            value: void 0,
            done: true
          };
        }
        this[INTERNAL].index = index + 1;
        return {
          value: values[index],
          done: false
        };
      }
    }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
    Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
      value: "HeadersIterator",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function exportNodeCompatibleHeaders(headers) {
      const obj = Object.assign({ __proto__: null }, headers[MAP]);
      const hostHeaderKey = find5(headers[MAP], "Host");
      if (hostHeaderKey !== void 0) {
        obj[hostHeaderKey] = obj[hostHeaderKey][0];
      }
      return obj;
    }
    function createHeadersLenient(obj) {
      const headers = new Headers();
      for (const name of Object.keys(obj)) {
        if (invalidTokenRegex.test(name)) {
          continue;
        }
        if (Array.isArray(obj[name])) {
          for (const val of obj[name]) {
            if (invalidHeaderCharRegex.test(val)) {
              continue;
            }
            if (headers[MAP][name] === void 0) {
              headers[MAP][name] = [val];
            } else {
              headers[MAP][name].push(val);
            }
          }
        } else if (!invalidHeaderCharRegex.test(obj[name])) {
          headers[MAP][name] = [obj[name]];
        }
      }
      return headers;
    }
    var INTERNALS$1 = Symbol("Response internals");
    var STATUS_CODES = http.STATUS_CODES;
    var Response = class {
      constructor() {
        let body2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        Body.call(this, body2, opts);
        const status = opts.status || 200;
        const headers = new Headers(opts.headers);
        if (body2 != null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body2);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          url: opts.url,
          status,
          statusText: opts.statusText || STATUS_CODES[status],
          headers,
          counter: opts.counter
        };
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      clone() {
        return new Response(clone(this), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected
        });
      }
    };
    Body.mixIn(Response.prototype);
    Object.defineProperties(Response.prototype, {
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    Object.defineProperty(Response.prototype, Symbol.toStringTag, {
      value: "Response",
      writable: false,
      enumerable: false,
      configurable: true
    });
    var INTERNALS$2 = Symbol("Request internals");
    var parse_url = Url.parse;
    var format_url = Url.format;
    var streamDestructionSupported = "destroy" in Stream.Readable.prototype;
    function isRequest(input) {
      return typeof input === "object" && typeof input[INTERNALS$2] === "object";
    }
    function isAbortSignal(signal) {
      const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
      return !!(proto && proto.constructor.name === "AbortSignal");
    }
    var Request2 = class {
      constructor(input) {
        let init = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        let parsedURL;
        if (!isRequest(input)) {
          if (input && input.href) {
            parsedURL = parse_url(input.href);
          } else {
            parsedURL = parse_url(`${input}`);
          }
          input = {};
        } else {
          parsedURL = parse_url(input.url);
        }
        let method = init.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        Body.call(this, inputBody, {
          timeout: init.timeout || input.timeout || 0,
          size: init.size || input.size || 0
        });
        const headers = new Headers(init.headers || input.headers || {});
        if (inputBody != null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init)
          signal = init.signal;
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal");
        }
        this[INTERNALS$2] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal
        };
        this.follow = init.follow !== void 0 ? init.follow : input.follow !== void 0 ? input.follow : 20;
        this.compress = init.compress !== void 0 ? init.compress : input.compress !== void 0 ? input.compress : true;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
      }
      get method() {
        return this[INTERNALS$2].method;
      }
      get url() {
        return format_url(this[INTERNALS$2].parsedURL);
      }
      get headers() {
        return this[INTERNALS$2].headers;
      }
      get redirect() {
        return this[INTERNALS$2].redirect;
      }
      get signal() {
        return this[INTERNALS$2].signal;
      }
      clone() {
        return new Request2(this);
      }
    };
    Body.mixIn(Request2.prototype);
    Object.defineProperty(Request2.prototype, Symbol.toStringTag, {
      value: "Request",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true }
    });
    function getNodeRequestOptions(request) {
      const parsedURL = request[INTERNALS$2].parsedURL;
      const headers = new Headers(request[INTERNALS$2].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      if (!parsedURL.protocol || !parsedURL.hostname) {
        throw new TypeError("Only absolute URLs are supported");
      }
      if (!/^https?:$/.test(parsedURL.protocol)) {
        throw new TypeError("Only HTTP(S) protocols are supported");
      }
      if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
        throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
      }
      let contentLengthValue = null;
      if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body != null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number") {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate");
      }
      let agent = request.agent;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      return Object.assign({}, parsedURL, {
        method: request.method,
        headers: exportNodeCompatibleHeaders(headers),
        agent
      });
    }
    function AbortError(message) {
      Error.call(this, message);
      this.type = "aborted";
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
    AbortError.prototype = Object.create(Error.prototype);
    AbortError.prototype.constructor = AbortError;
    AbortError.prototype.name = "AbortError";
    var PassThrough$1 = Stream.PassThrough;
    var resolve_url = Url.resolve;
    function fetch2(url, opts) {
      if (!fetch2.Promise) {
        throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
      }
      Body.Promise = fetch2.Promise;
      return new fetch2.Promise(function(resolve3, reject2) {
        const request = new Request2(url, opts);
        const options = getNodeRequestOptions(request);
        const send = (options.protocol === "https:" ? https : http).request;
        const signal = request.signal;
        let response = null;
        const abort = function abort2() {
          let error2 = new AbortError("The user aborted a request.");
          reject2(error2);
          if (request.body && request.body instanceof Stream.Readable) {
            request.body.destroy(error2);
          }
          if (!response || !response.body)
            return;
          response.body.emit("error", error2);
        };
        if (signal && signal.aborted) {
          abort();
          return;
        }
        const abortAndFinalize = function abortAndFinalize2() {
          abort();
          finalize();
        };
        const req = send(options);
        let reqTimeout;
        if (signal) {
          signal.addEventListener("abort", abortAndFinalize);
        }
        function finalize() {
          req.abort();
          if (signal)
            signal.removeEventListener("abort", abortAndFinalize);
          clearTimeout(reqTimeout);
        }
        if (request.timeout) {
          req.once("socket", function(socket) {
            reqTimeout = setTimeout(function() {
              reject2(new FetchError(`network timeout at: ${request.url}`, "request-timeout"));
              finalize();
            }, request.timeout);
          });
        }
        req.on("error", function(err) {
          reject2(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
          finalize();
        });
        req.on("response", function(res) {
          clearTimeout(reqTimeout);
          const headers = createHeadersLenient(res.headers);
          if (fetch2.isRedirect(res.statusCode)) {
            const location = headers.get("Location");
            const locationURL = location === null ? null : resolve_url(request.url, location);
            switch (request.redirect) {
              case "error":
                reject2(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
                finalize();
                return;
              case "manual":
                if (locationURL !== null) {
                  try {
                    headers.set("Location", locationURL);
                  } catch (err) {
                    reject2(err);
                  }
                }
                break;
              case "follow":
                if (locationURL === null) {
                  break;
                }
                if (request.counter >= request.follow) {
                  reject2(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
                  finalize();
                  return;
                }
                const requestOpts = {
                  headers: new Headers(request.headers),
                  follow: request.follow,
                  counter: request.counter + 1,
                  agent: request.agent,
                  compress: request.compress,
                  method: request.method,
                  body: request.body,
                  signal: request.signal,
                  timeout: request.timeout,
                  size: request.size
                };
                if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
                  reject2(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
                  finalize();
                  return;
                }
                if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
                  requestOpts.method = "GET";
                  requestOpts.body = void 0;
                  requestOpts.headers.delete("content-length");
                }
                resolve3(fetch2(new Request2(locationURL, requestOpts)));
                finalize();
                return;
            }
          }
          res.once("end", function() {
            if (signal)
              signal.removeEventListener("abort", abortAndFinalize);
          });
          let body2 = res.pipe(new PassThrough$1());
          const response_options = {
            url: request.url,
            status: res.statusCode,
            statusText: res.statusMessage,
            headers,
            size: request.size,
            timeout: request.timeout,
            counter: request.counter
          };
          const codings = headers.get("Content-Encoding");
          if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
            response = new Response(body2, response_options);
            resolve3(response);
            return;
          }
          const zlibOptions = {
            flush: zlib.Z_SYNC_FLUSH,
            finishFlush: zlib.Z_SYNC_FLUSH
          };
          if (codings == "gzip" || codings == "x-gzip") {
            body2 = body2.pipe(zlib.createGunzip(zlibOptions));
            response = new Response(body2, response_options);
            resolve3(response);
            return;
          }
          if (codings == "deflate" || codings == "x-deflate") {
            const raw = res.pipe(new PassThrough$1());
            raw.once("data", function(chunk) {
              if ((chunk[0] & 15) === 8) {
                body2 = body2.pipe(zlib.createInflate());
              } else {
                body2 = body2.pipe(zlib.createInflateRaw());
              }
              response = new Response(body2, response_options);
              resolve3(response);
            });
            return;
          }
          if (codings == "br" && typeof zlib.createBrotliDecompress === "function") {
            body2 = body2.pipe(zlib.createBrotliDecompress());
            response = new Response(body2, response_options);
            resolve3(response);
            return;
          }
          response = new Response(body2, response_options);
          resolve3(response);
        });
        writeToStream(req, request);
      });
    }
    fetch2.isRedirect = function(code) {
      return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
    };
    fetch2.Promise = global.Promise;
    module2.exports = exports = fetch2;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = exports;
    exports.Headers = Headers;
    exports.Request = Request2;
    exports.Response = Response;
    exports.FetchError = FetchError;
  }
});

// node_modules/isomorphic-fetch/fetch-npm-node.js
var require_fetch_npm_node = __commonJS({
  "node_modules/isomorphic-fetch/fetch-npm-node.js"(exports, module2) {
    "use strict";
    var realFetch = require_lib();
    module2.exports = function(url, options) {
      if (/^\/\//.test(url)) {
        url = "https:" + url;
      }
      return realFetch.call(this, url, options);
    };
    if (!global.fetch) {
      global.fetch = module2.exports;
      global.Response = realFetch.Response;
      global.Headers = realFetch.Headers;
      global.Request = realFetch.Request;
    }
  }
});

// src/Demo.bs.js
__markAsModule(exports);
__export(exports, {
  dominantColors: () => dominantColors
});

// node_modules/bs-platform/lib/es6/caml_array.js
function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while (j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }
  ;
  return result;
}
function set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "index out of bounds",
      Error: new Error()
    };
  }
  xs[index] = newval;
}
function get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "index out of bounds",
      Error: new Error()
    };
  }
  return xs[index];
}
function caml_make_vect(len, init) {
  var b = new Array(len);
  for (var i = 0; i < len; ++i) {
    b[i] = init;
  }
  return b;
}

// node_modules/bs-platform/lib/es6/curry.js
function app(_f, _args) {
  while (true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    }
    if (d >= 0) {
      return function(f2, args2) {
        return function(x) {
          return app(f2, args2.concat([x]));
        };
      }(f, args);
    }
    _args = caml_array_sub(args, arity, -d | 0);
    _f = f.apply(null, caml_array_sub(args, 0, arity));
    continue;
  }
  ;
}
function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    switch (arity) {
      case 1:
        return o(a0);
      case 2:
        return function(param) {
          return o(a0, param);
        };
      case 3:
        return function(param, param$1) {
          return o(a0, param, param$1);
        };
      case 4:
        return function(param, param$1, param$2) {
          return o(a0, param, param$1, param$2);
        };
      case 5:
        return function(param, param$1, param$2, param$3) {
          return o(a0, param, param$1, param$2, param$3);
        };
      case 6:
        return function(param, param$1, param$2, param$3, param$4) {
          return o(a0, param, param$1, param$2, param$3, param$4);
        };
      case 7:
        return function(param, param$1, param$2, param$3, param$4, param$5) {
          return o(a0, param, param$1, param$2, param$3, param$4, param$5);
        };
      default:
        return app(o, [a0]);
    }
  }
}
function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return function(a0) {
      return _1(o, a0);
    };
  }
}
function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1]);
      case 2:
        return o(a0, a1);
      case 3:
        return function(param) {
          return o(a0, a1, param);
        };
      case 4:
        return function(param, param$1) {
          return o(a0, a1, param, param$1);
        };
      case 5:
        return function(param, param$1, param$2) {
          return o(a0, a1, param, param$1, param$2);
        };
      case 6:
        return function(param, param$1, param$2, param$3) {
          return o(a0, a1, param, param$1, param$2, param$3);
        };
      case 7:
        return function(param, param$1, param$2, param$3, param$4) {
          return o(a0, a1, param, param$1, param$2, param$3, param$4);
        };
      default:
        return app(o, [
          a0,
          a1
        ]);
    }
  }
}

// node_modules/@glennsl/rebase/lib/es6/src/Rebase__Fn.bs.js
var Rebase_Fn_bs_exports = {};
__export(Rebase_Fn_bs_exports, {
  $$const: () => $$const,
  $great$great: () => $great$great,
  $less$less: () => $less$less,
  curry: () => curry,
  flip: () => flip,
  id: () => id,
  tap: () => tap,
  uncurry: () => uncurry
});
function id(x) {
  return x;
}
function $$const(x, param) {
  return x;
}
function flip(f, a, b) {
  return _2(f, b, a);
}
function curry(f, a, b) {
  return _1(f, [
    a,
    b
  ]);
}
function uncurry(f, param) {
  return _2(f, param[0], param[1]);
}
function $less$less(f, g, x) {
  return _1(f, _1(g, x));
}
function $great$great(f, g, x) {
  return _1(g, _1(f, x));
}
function tap(f, x) {
  _1(f, x);
  return x;
}

// node_modules/bs-platform/lib/es6/caml_option.js
function some(x) {
  if (x === void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: 0
    };
  } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
    };
  } else {
    return x;
  }
}
function valFromOption(x) {
  if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
    return x;
  }
  var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
  if (depth === 0) {
    return;
  } else {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
    };
  }
}

// node_modules/bs-platform/lib/es6/caml_int32.js
function div(x, y) {
  if (y === 0) {
    throw {
      RE_EXN_ID: "Division_by_zero",
      Error: new Error()
    };
  }
  return x / y | 0;
}

// node_modules/bs-platform/lib/es6/caml_exceptions.js
var id2 = {
  contents: 0
};
function create(str) {
  id2.contents = id2.contents + 1 | 0;
  return str + ("/" + id2.contents);
}
function caml_is_extension(e) {
  if (e == null) {
    return false;
  } else {
    return typeof e.RE_EXN_ID === "string";
  }
}

// node_modules/@glennsl/rebase/lib/es6/src/Rebase__Types.bs.js
var InvalidArgument = /* @__PURE__ */ create("Rebase__Types.InvalidArgument");

// node_modules/@glennsl/rebase/lib/es6/src/Rebase__List.bs.js
function from(x) {
  return {
    hd: x,
    tl: 0
  };
}
function fromArray(arr) {
  var _acc = 0;
  var _i = arr.length - 1 | 0;
  while (true) {
    var i = _i;
    var acc = _acc;
    if (i === -1) {
      return acc;
    }
    _i = i - 1 | 0;
    _acc = {
      hd: arr[i],
      tl: acc
    };
    continue;
  }
  ;
}
function fromSeq(seq) {
  var match = _1(seq, void 0);
  if (match) {
    return {
      hd: match._0,
      tl: fromSeq(match._1)
    };
  } else {
    return 0;
  }
}
function range(stepOpt, start, finish) {
  var step = stepOpt !== void 0 ? stepOpt : 1;
  if (step === 0) {
    throw {
      RE_EXN_ID: InvalidArgument,
      _1: "List.range: ~step=0 would cause infinite loop",
      Error: new Error()
    };
  }
  if (step < 0 && start < finish) {
    return 0;
  }
  if (step > 0 && start > finish) {
    return 0;
  }
  var last = Math.imul(div(finish - start | 0, step), step) + start | 0;
  var _acc = 0;
  var _n = last;
  while (true) {
    var n = _n;
    var acc = _acc;
    if (n === start) {
      return {
        hd: n,
        tl: acc
      };
    }
    _n = n - step | 0;
    _acc = {
      hd: n,
      tl: acc
    };
    continue;
  }
  ;
}
function isEmpty(param) {
  if (param) {
    return false;
  } else {
    return true;
  }
}
function head(param) {
  if (param) {
    return some(param.hd);
  }
}
function tail(param) {
  if (param) {
    return param.tl;
  }
}
function reverseAndAppend(_acc, _param) {
  while (true) {
    var param = _param;
    var acc = _acc;
    if (!param) {
      return acc;
    }
    _param = param.tl;
    _acc = {
      hd: param.hd,
      tl: acc
    };
    continue;
  }
  ;
}
function reverse(self2) {
  return reverseAndAppend(0, self2);
}
function filter(predicate, _param) {
  while (true) {
    var param = _param;
    if (!param) {
      return 0;
    }
    var xs = param.tl;
    var x = param.hd;
    if (_1(predicate, x)) {
      return {
        hd: x,
        tl: filter(predicate, xs)
      };
    }
    _param = xs;
    continue;
  }
  ;
}
function filterMap(f, _param) {
  while (true) {
    var param = _param;
    if (!param) {
      return 0;
    }
    var xs = param.tl;
    var x = _1(f, param.hd);
    if (x !== void 0) {
      return {
        hd: valFromOption(x),
        tl: filterMap(f, xs)
      };
    }
    _param = xs;
    continue;
  }
  ;
}
function exists(predicate, _param) {
  while (true) {
    var param = _param;
    if (!param) {
      return false;
    }
    if (_1(predicate, param.hd)) {
      return true;
    }
    _param = param.tl;
    continue;
  }
  ;
}
function forEach(f, _param) {
  while (true) {
    var param = _param;
    if (!param) {
      return;
    }
    _1(f, param.hd);
    _param = param.tl;
    continue;
  }
  ;
}
function find(predicate, _param) {
  while (true) {
    var param = _param;
    if (!param) {
      return;
    }
    var x = param.hd;
    if (_1(predicate, x)) {
      return some(x);
    }
    _param = param.tl;
    continue;
  }
  ;
}
function forAll(predicate, _param) {
  while (true) {
    var param = _param;
    if (!param) {
      return true;
    }
    if (!_1(predicate, param.hd)) {
      return false;
    }
    _param = param.tl;
    continue;
  }
  ;
}
function flatMap(f, self2) {
  var aux = function(_inner, _outer) {
    while (true) {
      var outer = _outer;
      var inner = _inner;
      if (inner) {
        return {
          hd: inner.hd,
          tl: aux(inner.tl, outer)
        };
      }
      if (!outer) {
        return 0;
      }
      _outer = outer.tl;
      _inner = _1(f, outer.hd);
      continue;
    }
    ;
  };
  return aux(0, self2);
}
function map(f, param) {
  if (param) {
    return {
      hd: _1(f, param.hd),
      tl: map(f, param.tl)
    };
  } else {
    return 0;
  }
}
function product(f, xs, ys) {
  return flatMap(function(x) {
    return map(function(y) {
      return _2(f, x, y);
    }, ys);
  }, xs);
}
function apply(fs, xs) {
  return product(function(f, x) {
    return _1(f, x);
  }, fs, xs);
}
function reduce(f, _acc, _param) {
  while (true) {
    var param = _param;
    var acc = _acc;
    if (!param) {
      return acc;
    }
    _param = param.tl;
    _acc = _2(f, acc, param.hd);
    continue;
  }
  ;
}
function reduceRight(f, acc, param) {
  if (param) {
    return _2(f, reduceRight(f, acc, param.tl), param.hd);
  } else {
    return acc;
  }
}
function length(self2) {
  var _acc = 0;
  var _param = self2;
  while (true) {
    var param = _param;
    var acc = _acc;
    if (!param) {
      return acc;
    }
    _param = param.tl;
    _acc = acc + 1 | 0;
    continue;
  }
  ;
}
function zip(ys, xs) {
  if (xs && ys) {
    return {
      hd: [
        xs.hd,
        ys.hd
      ],
      tl: zip(ys.tl, xs.tl)
    };
  } else {
    return 0;
  }
}
function concat(ys, xs) {
  if (xs) {
    return {
      hd: xs.hd,
      tl: concat(ys, xs.tl)
    };
  } else if (ys) {
    return {
      hd: ys.hd,
      tl: concat(ys.tl, 0)
    };
  } else {
    return 0;
  }
}

// node_modules/bs-platform/lib/es6/caml_js_exceptions.js
var $$Error = /* @__PURE__ */ create("Caml_js_exceptions.Error");
function internalToOCamlException(e) {
  if (caml_is_extension(e)) {
    return e;
  } else {
    return {
      RE_EXN_ID: $$Error,
      _1: e
    };
  }
}

// node_modules/bs-platform/lib/es6/pervasives.js
function failwith(s) {
  throw {
    RE_EXN_ID: "Failure",
    _1: s,
    Error: new Error()
  };
}

// node_modules/@glennsl/rebase/lib/es6/src/Rebase__Option.bs.js
function from2(x) {
  return some(x);
}
function some2(x) {
  return some(x);
}
function fromResult(v) {
  if (v.TAG === 0) {
    return some(v._0);
  }
}
function isSome(param) {
  return param !== void 0;
}
function isNone(param) {
  return param === void 0;
}
function or_2(other2, self2) {
  if (self2 !== void 0) {
    return self2;
  } else {
    return other2;
  }
}
function getOr(other2, v) {
  if (v !== void 0) {
    return valFromOption(v);
  } else {
    return other2;
  }
}
function getOrRaise(v) {
  if (v !== void 0) {
    return valFromOption(v);
  }
  throw {
    RE_EXN_ID: InvalidArgument,
    _1: "getOrRaise called on None",
    Error: new Error()
  };
}
function map2(f, v) {
  if (v !== void 0) {
    return some(_1(f, valFromOption(v)));
  }
}
function mapOr(f, other2, v) {
  if (v !== void 0) {
    return _1(f, valFromOption(v));
  } else {
    return other2;
  }
}
function mapOrElse(f, g, v) {
  if (v !== void 0) {
    return _1(f, valFromOption(v));
  } else {
    return _1(g, void 0);
  }
}
function exists2(predicate, v) {
  if (v !== void 0) {
    return _1(predicate, valFromOption(v));
  } else {
    return false;
  }
}
function forAll2(predicate, v) {
  if (v !== void 0) {
    return _1(predicate, valFromOption(v));
  } else {
    return true;
  }
}
function filter2(predicate, self2) {
  if (self2 !== void 0 && _1(predicate, valFromOption(self2))) {
    return self2;
  }
}
function forEach2(f, x) {
  if (x !== void 0) {
    return _1(f, valFromOption(x));
  }
}
function find2(predicate, x) {
  if (x === void 0) {
    return;
  }
  var x$1 = valFromOption(x);
  if (_1(predicate, x$1)) {
    return some(x$1);
  }
}
function andThen(f, x) {
  if (x !== void 0) {
    return _1(f, valFromOption(x));
  }
}
function flatten(a) {
  if (a !== void 0) {
    return valFromOption(a);
  }
}
function apply2(f, a) {
  if (f !== void 0) {
    return map2(f, a);
  }
}
function reduce2(f, acc, x) {
  if (x !== void 0) {
    return _2(f, acc, valFromOption(x));
  } else {
    return acc;
  }
}
function reduceRight2(f, acc, x) {
  if (x !== void 0) {
    return _2(f, acc, valFromOption(x));
  } else {
    return acc;
  }
}
var flatMap2 = andThen;

// node_modules/@glennsl/rebase/lib/es6/src/Rebase__String.bs.js
function isEmpty2(s) {
  return s.trim().length === 0;
}
function join(x) {
  if (x) {
    return x.hd + join(x.tl);
  } else {
    return "";
  }
}
function joinWith(sep, x) {
  if (!x) {
    return "";
  }
  var ss = x.tl;
  var s = x.hd;
  if (ss) {
    return s + (sep + joinWith(sep, ss));
  } else {
    return s;
  }
}

// node_modules/@glennsl/rebase/lib/es6/src/Rebase.bs.js
var Fn = Rebase_Fn_bs_exports;
var List2 = {
  map,
  apply,
  from,
  reduce,
  reduceRight,
  flatMap,
  forAll,
  find,
  forEach,
  exists,
  filter,
  concat,
  fromArray,
  fromSeq,
  range,
  isEmpty,
  head,
  tail,
  filterMap,
  length,
  reverse,
  zip
};
var $$Option = {
  map: map2,
  apply: apply2,
  from: from2,
  reduce: reduce2,
  reduceRight: reduceRight2,
  flatMap: flatMap2,
  forAll: forAll2,
  find: find2,
  forEach: forEach2,
  exists: exists2,
  filter: filter2,
  some: some2,
  fromResult,
  isSome,
  isNone,
  or_: or_2,
  getOr,
  getOrRaise,
  mapOr,
  mapOrElse,
  flatten
};
function String_concat(prim, prim$1) {
  return prim$1.concat(prim);
}
function String_length(prim) {
  return prim.length;
}
function String_includes(prim, prim$1) {
  return prim$1.includes(prim);
}
function String_startsWith(prim, prim$1) {
  return prim$1.startsWith(prim);
}
function String_endsWith(prim, prim$1) {
  return prim$1.endsWith(prim);
}
function String_padStart(prim, prim$1, prim$2) {
  return prim$2.padStart(prim, prim$1);
}
function String_padEnd(prim, prim$1, prim$2) {
  return prim$2.padEnd(prim, prim$1);
}
function String_trim(prim) {
  return prim.trim();
}
function String_sub(prim, prim$1, prim$2) {
  return prim$2.substr(prim, prim$1);
}
var $$String = {
  concat: String_concat,
  length: String_length,
  includes: String_includes,
  startsWith: String_startsWith,
  endsWith: String_endsWith,
  isEmpty: isEmpty2,
  padStart: String_padStart,
  padEnd: String_padEnd,
  trim: String_trim,
  sub: String_sub,
  join,
  joinWith
};

// node_modules/refetch/lib/es6/src/Resync.bs.js
function _dispatch(f, value) {
  return _1(f, value);
}
function _complete(promise, value) {
  promise.value = value;
  return List2.forEach(function(f) {
    return _1(f, value);
  }, promise.callbacks);
}
function make2(param) {
  return {
    value: void 0,
    callbacks: 0
  };
}
function from6(value) {
  return {
    value: {
      TAG: 0,
      _0: value
    },
    callbacks: 0
  };
}
function resolve2(promise, value) {
  return _complete(promise, {
    TAG: 0,
    _0: value
  });
}
function reject(promise, exn) {
  return _complete(promise, {
    TAG: 1,
    _0: exn
  });
}
function whenCompleted(f, future) {
  future.callbacks = {
    hd: f,
    tl: future.callbacks
  };
  return $$Option.forEach(__1(f), future.value);
}
function whenResolved(f, future) {
  return whenCompleted(function(value) {
    if (value.TAG === 0) {
      return _1(f, value._0);
    }
  }, future);
}
function map5(f, future) {
  var promise = {
    value: void 0,
    callbacks: 0
  };
  whenCompleted(function(value) {
    if (value.TAG !== 0) {
      return _complete(promise, {
        TAG: 1,
        _0: value._0
      });
    }
    var value$1 = _1(f, value._0);
    return _complete(promise, {
      TAG: 0,
      _0: value$1
    });
  }, future);
  return promise;
}
function flatMap6(f, future) {
  var promise = {
    value: void 0,
    callbacks: 0
  };
  whenCompleted(function(value) {
    if (value.TAG === 0) {
      return whenCompleted(function(value2) {
        if (value2.TAG === 0) {
          return _complete(promise, {
            TAG: 0,
            _0: value2._0
          });
        } else {
          return _complete(promise, {
            TAG: 1,
            _0: value2._0
          });
        }
      }, _1(f, value._0));
    } else {
      return _complete(promise, {
        TAG: 1,
        _0: value._0
      });
    }
  }, future);
  return promise;
}
function fromJSPromise(jsPromise) {
  var promise = {
    value: void 0,
    callbacks: 0
  };
  jsPromise.then(function(v) {
    return Promise.resolve(_complete(promise, {
      TAG: 0,
      _0: v
    }));
  }).catch(function(e) {
    return Promise.resolve(_complete(promise, {
      TAG: 1,
      _0: e
    }));
  });
  return promise;
}
var Future = {
  _dispatch,
  _complete,
  make: make2,
  from: from6,
  resolve: resolve2,
  reject,
  whenCompleted,
  whenResolved,
  map: map5,
  flatMap: flatMap6,
  fromJSPromise
};

// node_modules/bs-fetch/lib/es6/src/Fetch.bs.js
function other(m) {
  return m;
}
var Method = {
  get: "GET",
  head: "HEAD",
  post: "POST",
  put: "PUT",
  $$delete: "DELETE",
  connect: "CONNECT",
  options: "OPTIONS",
  trace: "TRACE",
  patch: "PATCH",
  other
};
var RequestInit = {
  make: function(prim, prim$1, prim$2, prim$3, prim$4, prim$5, prim$6, prim$7, prim$8, prim$9, prim$10, prim$11) {
    var tmp = {};
    if (prim !== void 0) {
      tmp.method = valFromOption(prim);
    }
    if (prim$1 !== void 0) {
      tmp.headers = valFromOption(prim$1);
    }
    if (prim$2 !== void 0) {
      tmp.body = valFromOption(prim$2);
    }
    if (prim$3 !== void 0) {
      tmp.referrer = valFromOption(prim$3);
    }
    if (prim$4 !== void 0) {
      tmp.referrerPolicy = valFromOption(prim$4);
    }
    if (prim$5 !== void 0) {
      tmp.mode = valFromOption(prim$5);
    }
    if (prim$6 !== void 0) {
      tmp.credentials = valFromOption(prim$6);
    }
    if (prim$7 !== void 0) {
      tmp.cache = valFromOption(prim$7);
    }
    if (prim$8 !== void 0) {
      tmp.redirect = valFromOption(prim$8);
    }
    if (prim$9 !== void 0) {
      tmp.integrity = valFromOption(prim$9);
    }
    if (prim$10 !== void 0) {
      tmp.keepalive = valFromOption(prim$10);
    }
    return tmp;
  }
};

// node_modules/bs-platform/lib/es6/js_dict.js
function fromList3(entries) {
  var dict = {};
  var _param = entries;
  while (true) {
    var param = _param;
    if (!param) {
      return dict;
    }
    var match = param.hd;
    dict[match[0]] = match[1];
    _param = param.tl;
    continue;
  }
  ;
}

// node_modules/refetch/lib/es6/src/Refetch__Utils.bs.js
var btoa = function() {
  if (btoa)
    return btoa;
  var Buffer2 = Buffer2 || require("buffer").Buffer;
  return function(str) {
    return new Buffer2(str).toString("base64");
  };
}();

// node_modules/refetch/lib/es6/src/Refetch__Headers.bs.js
function _pairifyHeader(h) {
  if (typeof h === "string") {
    return failwith("TODO");
  }
  var variant = h.NAME;
  if (variant === "ContentDisposition") {
    var match = h.VAL;
    var typ = match[0];
    var typ$1 = typeof typ === "string" ? typ === "Attachment" ? "attachment" : "inline" : typ.VAL;
    var value = List2.reduce(function(acc, p) {
      return "" + acc + "; " + p;
    }, typ$1, List2.map(function(param) {
      if (param.NAME === "Filename") {
        return 'filename="' + param.VAL + '"';
      }
      var match2 = param.VAL;
      return "" + match2[0] + '="' + match2[1] + '"';
    }, match[1]));
    return [
      "Content-Disposition",
      value
    ];
  }
  if (variant === "Raw") {
    var match$1 = h.VAL;
    return [
      match$1[0],
      match$1[1]
    ];
  }
  if (variant === "ContentType") {
    return [
      "Content-Type",
      h.VAL
    ];
  }
  if (variant !== "Authorization") {
    if (variant === "ContentLength") {
      return [
        "Content-Length",
        String(h.VAL)
      ];
    } else {
      return failwith("TODO");
    }
  }
  var scheme = h.VAL;
  var value$1;
  if (scheme.NAME === "Bearer") {
    value$1 = "Bearer " + scheme.VAL;
  } else {
    var match$2 = scheme.VAL;
    var encoded = _1(btoa, "" + match$2[0] + ":" + match$2[1]);
    value$1 = "Basic " + encoded;
  }
  return [
    "Authorization",
    value$1
  ];
}
function _stringifyPair(param) {
  return "" + param[0] + ": " + param[1];
}
function _stringifyHeader(header) {
  return _stringifyPair(_pairifyHeader(header));
}
function _encode(headers) {
  return fromList3(List2.map(_pairifyHeader, headers));
}

// node_modules/refetch/lib/es6/src/Refetch__Request.bs.js
function make3(method_, queryParamsOpt, headersOpt, body2, url) {
  var queryParams = queryParamsOpt !== void 0 ? queryParamsOpt : 0;
  var headers = headersOpt !== void 0 ? headersOpt : 0;
  return {
    url,
    method: method_,
    queryParams,
    headers,
    body: body2
  };
}
function _encodeMethod(param) {
  if (typeof param === "string") {
    if (param === "GET") {
      return Method.get;
    } else if (param === "PUT") {
      return Method.put;
    } else if (param === "TRACE") {
      return Method.trace;
    } else if (param === "CONNECT") {
      return Method.connect;
    } else if (param === "DELETE") {
      return Method.$$delete;
    } else if (param === "HEAD") {
      return Method.head;
    } else if (param === "POST") {
      return Method.post;
    } else if (param === "PATCH") {
      return Method.patch;
    } else {
      return Method.options;
    }
  } else {
    return Method.other(param.VAL);
  }
}
function _buildUrl(url, params) {
  var encodeParam = function(param) {
    return encodeURIComponent(param[0]) + ("=" + encodeURIComponent(param[1]));
  };
  var params$1 = $$String.joinWith("&", List2.map(encodeParam, params));
  if (params$1 === "") {
    return url;
  } else {
    return "" + url + "?" + params$1;
  }
}
function _stringifyPayload(param) {
  var variant = param.NAME;
  if (variant === "String") {
    return param.VAL;
  }
  if (variant === "Form") {
    return $$String.joinWith("&", List2.map(function(param2) {
      return "" + param2[0] + "=" + param2[1];
    }, param.VAL));
  }
  if (variant === "Json") {
    return JSON.stringify(param.VAL);
  }
  var match = param.VAL;
  var boundary = match[0];
  return List2.reduce(function(acc, p) {
    return "\n" + (acc + p);
  }, "--" + boundary + "\n", List2.map(function(param2) {
    var headers = List2.reduce(function(acc, h) {
      return acc + (h + "\n");
    }, "", List2.map(_stringifyHeader, param2[0]));
    var payload2 = _stringifyPayload(param2[1]);
    return "" + headers + "\n" + payload2 + "\n--" + boundary + "\n";
  }, match[1]));
}
function _toFetchRequest(request) {
  return new Request(_buildUrl(request.url, request.queryParams), RequestInit.make(_encodeMethod(request.method), some(_encode(List2.reverse(request.headers))), $$Option.map(_2(Fn.$great$great, _stringifyPayload, function(prim) {
    return prim;
  }), request.body), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0));
}

// node_modules/refetch/lib/es6/src/Refetch__Status.bs.js
function codeFromInt(param) {
  if (param >= 227) {
    switch (param) {
      case 400:
        return "BadRequest";
      case 401:
        return "Unauthorized";
      case 402:
        return "PaymentRequired";
      case 403:
        return "Forbidden";
      case 404:
        return "NotFound";
      case 405:
        return "MethodNotAllowed";
      case 406:
        return "NotAcceptable";
      case 407:
        return "ProxyAuthenticationRequired";
      case 408:
        return "RequestTimeout";
      case 409:
        return "Conflict";
      case 410:
        return "Gone";
      case 411:
        return "LengthRequired";
      case 412:
        return "PreconditionFailed";
      case 413:
        return "PayloadTooLarge";
      case 414:
        return "UriTooLong";
      case 415:
        return "UnsupportedMediaType";
      case 416:
        return "RangeNotSatisfiable";
      case 417:
        return "ExpectationFailed";
      case 418:
        return "ImATeapot";
      case 421:
        return "MisdirectedRequest";
      case 422:
        return "UnprocessableEntity";
      case 423:
        return "Locked";
      case 424:
        return "FailedDependency";
      case 426:
        return "UpgradeRequired";
      case 428:
        return "PreconditionRequired";
      case 429:
        return "TooManyRequests";
      case 431:
        return "RequestHeaderFieldsTooLarge";
      case 451:
        return "UnavailableForLegalReasons";
      case 500:
        return "InternalServerError";
      case 501:
        return "NotImplemented";
      case 502:
        return "BadGateway";
      case 503:
        return "ServiceUnavailable";
      case 504:
        return "GatewayTimeout";
      case 505:
        return "HttpVersionNotSupported";
      case 506:
        return "VariantAlsoNegotiates";
      case 507:
        return "InsufficientStorage";
      case 508:
        return "LoopDetected";
      case 419:
      case 420:
      case 425:
      case 427:
      case 430:
      case 432:
      case 433:
      case 434:
      case 435:
      case 436:
      case 437:
      case 438:
      case 439:
      case 440:
      case 441:
      case 442:
      case 443:
      case 444:
      case 445:
      case 446:
      case 447:
      case 448:
      case 449:
      case 450:
      case 452:
      case 453:
      case 454:
      case 455:
      case 456:
      case 457:
      case 458:
      case 459:
      case 460:
      case 461:
      case 462:
      case 463:
      case 464:
      case 465:
      case 466:
      case 467:
      case 468:
      case 469:
      case 470:
      case 471:
      case 472:
      case 473:
      case 474:
      case 475:
      case 476:
      case 477:
      case 478:
      case 479:
      case 480:
      case 481:
      case 482:
      case 483:
      case 484:
      case 485:
      case 486:
      case 487:
      case 488:
      case 489:
      case 490:
      case 491:
      case 492:
      case 493:
      case 494:
      case 495:
      case 496:
      case 497:
      case 498:
      case 499:
      case 509:
        return failwith("TODO: exception or option?");
      case 510:
        return "NotExtended";
      case 511:
        return "NetworkAuthenticationRequired";
      default:
        return failwith("TODO: exception or option?");
    }
  } else {
    if (param < 200) {
      return failwith("TODO: exception or option?");
    }
    switch (param) {
      case 200:
        return "OK";
      case 201:
        return "Created";
      case 202:
        return "Accepted";
      case 203:
        return "NonAuthoritativeInformation";
      case 204:
        return "NoContent";
      case 205:
        return "ResetContent";
      case 206:
        return "PartialContent";
      case 207:
        return "MultiStatus";
      case 208:
        return "AlreadyReported";
      case 209:
      case 210:
      case 211:
      case 212:
      case 213:
      case 214:
      case 215:
      case 216:
      case 217:
      case 218:
      case 219:
      case 220:
      case 221:
      case 222:
      case 223:
      case 224:
      case 225:
        return failwith("TODO: exception or option?");
      case 226:
        return "IMUsed";
    }
  }
}

// node_modules/refetch/lib/es6/src/Refetch__Response.bs.js
function _getStatus(response) {
  return {
    code: codeFromInt(response.status),
    reason: response.statusText
  };
}
function _make(res) {
  var status = _getStatus(res);
  var match = status.code;
  if (match === "IMUsed" || match === "Accepted" || match === "OK" || match === "NoContent" || match === "NonAuthoritativeInformation" || match === "Created" || match === "MultiStatus" || match === "ResetContent" || match === "AlreadyReported" || match === "PartialContent") {
    return {
      TAG: 0,
      _0: status,
      _1: res
    };
  } else {
    return {
      TAG: 1,
      _0: status,
      _1: res
    };
  }
}
function body(prim) {
  return prim.body;
}
var text = _2(Fn.$great$great, function(prim) {
  return prim.text();
}, Future.fromJSPromise);
var json2 = _2(Fn.$great$great, function(prim) {
  return prim.json();
}, Future.fromJSPromise);

// node_modules/refetch/lib/es6/src/Refetch.bs.js
function $$fetch$1(request) {
  return Future.fromJSPromise(fetch(_toFetchRequest(request)).then(function(res) {
    return Promise.resolve(_make(res));
  }));
}
function get4(url) {
  return $$fetch$1(make3("GET", void 0, void 0, void 0, url));
}

// src/Demo.bs.js
var ConsolePng = __toModule(require_console_png());
var StreamToBuffer = __toModule(require_stream_to_buffer());

// node_modules/bs-platform/lib/es6/array.js
function copy(a) {
  var l = a.length;
  if (l === 0) {
    return [];
  } else {
    return caml_array_sub(a, 0, l);
  }
}
function append(a1, a2) {
  var l1 = a1.length;
  if (l1 === 0) {
    return copy(a2);
  } else if (a2.length === 0) {
    return caml_array_sub(a1, 0, l1);
  } else {
    return a1.concat(a2);
  }
}
function sub(a, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (a.length - len | 0)) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "Array.sub",
      Error: new Error()
    };
  }
  return caml_array_sub(a, ofs, len);
}
function map6(f, a) {
  var l = a.length;
  if (l === 0) {
    return [];
  }
  var r = caml_make_vect(l, _1(f, a[0]));
  for (var i = 1; i < l; ++i) {
    r[i] = _1(f, a[i]);
  }
  return r;
}
function fold_left(f, x, a) {
  var r = x;
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = _2(f, r, a[i]);
  }
  return r;
}
var Bottom = /* @__PURE__ */ create("Array.Bottom");
function sort(cmp, a) {
  var maxson = function(l2, i2) {
    var i31 = ((i2 + i2 | 0) + i2 | 0) + 1 | 0;
    var x = i31;
    if ((i31 + 2 | 0) < l2) {
      if (_2(cmp, get(a, i31), get(a, i31 + 1 | 0)) < 0) {
        x = i31 + 1 | 0;
      }
      if (_2(cmp, get(a, x), get(a, i31 + 2 | 0)) < 0) {
        x = i31 + 2 | 0;
      }
      return x;
    }
    if ((i31 + 1 | 0) < l2 && _2(cmp, get(a, i31), get(a, i31 + 1 | 0)) < 0) {
      return i31 + 1 | 0;
    }
    if (i31 < l2) {
      return i31;
    }
    throw {
      RE_EXN_ID: Bottom,
      _1: i2,
      Error: new Error()
    };
  };
  var trickle = function(l2, i2, e2) {
    try {
      var _i = i2;
      while (true) {
        var i$12 = _i;
        var j = maxson(l2, i$12);
        if (_2(cmp, get(a, j), e2) <= 0) {
          return set(a, i$12, e2);
        }
        set(a, i$12, get(a, j));
        _i = j;
        continue;
      }
      ;
    } catch (raw_i) {
      var i$2 = internalToOCamlException(raw_i);
      if (i$2.RE_EXN_ID === Bottom) {
        return set(a, i$2._1, e2);
      }
      throw i$2;
    }
  };
  var bubble = function(l2, i2) {
    try {
      var _i = i2;
      while (true) {
        var i$12 = _i;
        var j = maxson(l2, i$12);
        set(a, i$12, get(a, j));
        _i = j;
        continue;
      }
      ;
    } catch (raw_i) {
      var i$2 = internalToOCamlException(raw_i);
      if (i$2.RE_EXN_ID === Bottom) {
        return i$2._1;
      }
      throw i$2;
    }
  };
  var trickleup = function(_i, e2) {
    while (true) {
      var i2 = _i;
      var father = (i2 - 1 | 0) / 3 | 0;
      if (i2 === father) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "array.ml",
            238,
            4
          ],
          Error: new Error()
        };
      }
      if (_2(cmp, get(a, father), e2) >= 0) {
        return set(a, i2, e2);
      }
      set(a, i2, get(a, father));
      if (father <= 0) {
        return set(a, 0, e2);
      }
      _i = father;
      continue;
    }
    ;
  };
  var l = a.length;
  for (var i = ((l + 1 | 0) / 3 | 0) - 1 | 0; i >= 0; --i) {
    trickle(l, i, get(a, i));
  }
  for (var i$1 = l - 1 | 0; i$1 >= 2; --i$1) {
    var e = get(a, i$1);
    set(a, i$1, get(a, 0));
    trickleup(bubble(i$1, 0), e);
  }
  if (l <= 1) {
    return;
  }
  var e$1 = get(a, 1);
  set(a, 1, get(a, 0));
  return set(a, 0, e$1);
}

// src/Webapi.bs.js
function onLoad(callback) {
  return function() {
    var img = this;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.setAttribute("width", img.width.toString());
    canvas.setAttribute("height", img.height.toString());
    context.drawImage(img, 0, 0);
    return _1(callback, context.getImageData(0, 0, 0, 0));
  };
}
function imageDataOfUrl(url) {
  var img = new window.Image();
  return new Promise(function(resolve3, param) {
    img.onload = onLoad(function(result) {
      return resolve3(result);
    });
    img.src = url;
  });
}

// src/Dominant.bs.js
function reduceRange(color, range4) {
  return {
    min: color < range4.min ? color : range4.min,
    max: color > range4.max ? color : range4.max
  };
}
function reduceColorRange(pixel, ranges, param) {
  if (ranges !== void 0) {
    return {
      red: reduceRange(pixel.red, ranges.red),
      green: reduceRange(pixel.green, ranges.green),
      blue: reduceRange(pixel.blue, ranges.blue)
    };
  } else {
    return {
      red: {
        min: pixel.red,
        max: pixel.red
      },
      green: {
        min: pixel.green,
        max: pixel.green
      },
      blue: {
        min: pixel.blue,
        max: pixel.blue
      }
    };
  }
}
function ofFloatArray(colorArray) {
  var _position = 0;
  var _acc = [];
  while (true) {
    var acc = _acc;
    var position = _position;
    if ((position + 3 | 0) >= colorArray.length) {
      return acc;
    }
    _acc = append(acc, [(get(colorArray, position + 3 | 0), {
      red: get(colorArray, position + 0 | 0),
      green: get(colorArray, position + 1 | 0),
      blue: get(colorArray, position + 2 | 0)
    })]);
    _position = position + 4 | 0;
    continue;
  }
  ;
}
function getRange(pixelArray) {
  return fold_left(function(ranges, pixel) {
    return reduceColorRange(pixel, ranges, void 0);
  }, void 0, pixelArray);
}
function sortPixelList(pixelArray, colorRange) {
  var deltaRed = colorRange.red.max - colorRange.red.min;
  var deltaGreen = colorRange.green.max - colorRange.green.min;
  var deltaBlue = colorRange.blue.max - colorRange.blue.min;
  if (deltaRed > deltaGreen && deltaRed > deltaBlue) {
    var sortFn = function(l, r) {
      return l.red - r.red | 0;
    };
    return sort(sortFn, pixelArray);
  }
  if (deltaGreen > deltaBlue && deltaGreen > deltaRed) {
    var sortFn$1 = function(l, r) {
      return l.green - r.green | 0;
    };
    return sort(sortFn$1, pixelArray);
  }
  var sortFn$2 = function(l, r) {
    return l.blue - r.blue | 0;
  };
  return sort(sortFn$2, pixelArray);
}
function colorAverage(pixelArray) {
  var squaredPixelArray = map6(function(c) {
    return {
      red: c.red * c.red,
      green: c.green * c.green,
      blue: c.blue * c.blue
    };
  }, pixelArray);
  var squaredPixelsSum = fold_left(function(v, a) {
    return {
      red: v.red + a.red,
      green: v.green + a.green,
      blue: v.blue + a.blue
    };
  }, {
    red: 0,
    green: 0,
    blue: 0
  }, squaredPixelArray);
  return {
    red: Math.sqrt(squaredPixelsSum.red / pixelArray.length),
    green: Math.sqrt(squaredPixelsSum.green / pixelArray.length),
    blue: Math.sqrt(squaredPixelsSum.blue / pixelArray.length)
  };
}
function clusterize(pixelArray, square) {
  var _clusters = [pixelArray];
  var _square = square;
  while (true) {
    var square$1 = _square;
    var clusters = _clusters;
    if (square$1 === 0) {
      return clusters;
    }
    _square = square$1 - 1 | 0;
    _clusters = fold_left(append, [], map6(function(cluster) {
      var range4 = getRange(cluster);
      if (range4 !== void 0) {
        sortPixelList(cluster, range4);
        return [
          sub(cluster, 0, cluster.length >> 1),
          sub(cluster, cluster.length >> 1, cluster.length >> 1)
        ];
      } else {
        return [cluster];
      }
    }, clusters));
    continue;
  }
  ;
}
function paletteOfPixelArray(pixelArray, squareOpt, param) {
  var square = squareOpt !== void 0 ? squareOpt : 4;
  return map6(colorAverage, clusterize(pixelArray, square));
}
function ofImageData(imageData, square, param) {
  return paletteOfPixelArray(ofFloatArray(imageData.data), square, void 0);
}
function ofUrl(url, square, param) {
  return imageDataOfUrl(url).then(function(imageData) {
    return Promise.resolve(ofImageData(imageData, square, void 0));
  });
}

// src/Demo.bs.js
function dominantColors(param, param$1) {
  return ofUrl("http://httpbin.org/image/png", param, param$1);
}
console.log(dominantColors);
require_fetch_npm_node();
Future.whenCompleted(function(stream) {
  if (stream.TAG === 0) {
    StreamToBuffer(stream._0, function(param, buffer) {
      ConsolePng(buffer, function(param2, string) {
        console.log(string);
      });
    });
    return;
  }
  console.log(stream._0);
}, Future.map(function(param) {
  if (param.TAG === 0) {
    return body(param._1);
  } else {
    return failwith(param._0.reason);
  }
}, get4("http://httpbin.org/image/png")));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dominantColors
});
