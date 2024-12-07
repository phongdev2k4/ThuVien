import {
  ArgumentException_default,
  AztecReader_default,
  BarcodeFormat_default,
  BinaryBitmap_default,
  ChecksumException_default,
  DataMatrixReader_default,
  DecodeHintType_default,
  EncodeHintType_default,
  Encoder_default,
  ErrorCorrectionLevel_default,
  FormatException_default,
  HybridBinarizer_default,
  IllegalArgumentException_default,
  IllegalStateException_default,
  InvertedLuminanceSource_default,
  LuminanceSource_default,
  MultiFormatOneDReader_default,
  MultiFormatReader_default,
  NotFoundException_default,
  PDF417Reader_default,
  QRCodeReader_default
} from "./chunk-5CNDR2Y2.js";
import "./chunk-WDMUDEB6.js";

// node_modules/@zxing/browser/esm/common/HTMLCanvasElementLuminanceSource.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var HTMLCanvasElementLuminanceSource = (
  /** @class */
  function(_super) {
    __extends(HTMLCanvasElementLuminanceSource2, _super);
    function HTMLCanvasElementLuminanceSource2(canvas) {
      var _this = _super.call(this, canvas.width, canvas.height) || this;
      _this.canvas = canvas;
      _this.tempCanvasElement = null;
      _this.buffer = HTMLCanvasElementLuminanceSource2.makeBufferFromCanvasImageData(canvas);
      return _this;
    }
    HTMLCanvasElementLuminanceSource2.makeBufferFromCanvasImageData = function(canvas) {
      var canvasCtx;
      try {
        canvasCtx = canvas.getContext("2d", {
          willReadFrequently: true
        });
      } catch (e) {
        canvasCtx = canvas.getContext("2d");
      }
      if (!canvasCtx) {
        throw new Error("Couldn't get canvas context.");
      }
      var imageData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);
      return HTMLCanvasElementLuminanceSource2.toGrayscaleBuffer(imageData.data, canvas.width, canvas.height);
    };
    HTMLCanvasElementLuminanceSource2.toGrayscaleBuffer = function(imageBuffer, width, height) {
      var grayscaleBuffer = new Uint8ClampedArray(width * height);
      for (var i = 0, j = 0, length_1 = imageBuffer.length; i < length_1; i += 4, j++) {
        var gray = void 0;
        var alpha = imageBuffer[i + 3];
        if (alpha === 0) {
          gray = 255;
        } else {
          var pixelR = imageBuffer[i];
          var pixelG = imageBuffer[i + 1];
          var pixelB = imageBuffer[i + 2];
          gray = 306 * pixelR + 601 * pixelG + 117 * pixelB + 512 >> 10;
        }
        grayscaleBuffer[j] = gray;
      }
      return grayscaleBuffer;
    };
    HTMLCanvasElementLuminanceSource2.prototype.getRow = function(y, row) {
      if (y < 0 || y >= this.getHeight()) {
        throw new IllegalArgumentException_default("Requested row is outside the image: " + y);
      }
      var width = this.getWidth();
      var start = y * width;
      if (row === null) {
        row = this.buffer.slice(start, start + width);
      } else {
        if (row.length < width) {
          row = new Uint8ClampedArray(width);
        }
        row.set(this.buffer.slice(start, start + width));
      }
      return row;
    };
    HTMLCanvasElementLuminanceSource2.prototype.getMatrix = function() {
      return this.buffer;
    };
    HTMLCanvasElementLuminanceSource2.prototype.isCropSupported = function() {
      return true;
    };
    HTMLCanvasElementLuminanceSource2.prototype.crop = function(left, top, width, height) {
      _super.prototype.crop.call(this, left, top, width, height);
      return this;
    };
    HTMLCanvasElementLuminanceSource2.prototype.isRotateSupported = function() {
      return true;
    };
    HTMLCanvasElementLuminanceSource2.prototype.rotateCounterClockwise = function() {
      this.rotate(-90);
      return this;
    };
    HTMLCanvasElementLuminanceSource2.prototype.rotateCounterClockwise45 = function() {
      this.rotate(-45);
      return this;
    };
    HTMLCanvasElementLuminanceSource2.prototype.invert = function() {
      return new InvertedLuminanceSource_default(this);
    };
    HTMLCanvasElementLuminanceSource2.prototype.getTempCanvasElement = function() {
      if (null === this.tempCanvasElement) {
        var tempCanvasElement = this.canvas.ownerDocument.createElement("canvas");
        tempCanvasElement.width = this.canvas.width;
        tempCanvasElement.height = this.canvas.height;
        this.tempCanvasElement = tempCanvasElement;
      }
      return this.tempCanvasElement;
    };
    HTMLCanvasElementLuminanceSource2.prototype.rotate = function(angle) {
      var tempCanvasElement = this.getTempCanvasElement();
      if (!tempCanvasElement) {
        throw new Error("Could not create a Canvas element.");
      }
      var angleRadians = angle * HTMLCanvasElementLuminanceSource2.DEGREE_TO_RADIANS;
      var width = this.canvas.width;
      var height = this.canvas.height;
      var newWidth = Math.ceil(Math.abs(Math.cos(angleRadians)) * width + Math.abs(Math.sin(angleRadians)) * height);
      var newHeight = Math.ceil(Math.abs(Math.sin(angleRadians)) * width + Math.abs(Math.cos(angleRadians)) * height);
      tempCanvasElement.width = newWidth;
      tempCanvasElement.height = newHeight;
      var tempContext = tempCanvasElement.getContext("2d");
      if (!tempContext) {
        throw new Error("Could not create a Canvas Context element.");
      }
      tempContext.translate(newWidth / 2, newHeight / 2);
      tempContext.rotate(angleRadians);
      tempContext.drawImage(this.canvas, width / -2, height / -2);
      this.buffer = HTMLCanvasElementLuminanceSource2.makeBufferFromCanvasImageData(tempCanvasElement);
      return this;
    };
    HTMLCanvasElementLuminanceSource2.DEGREE_TO_RADIANS = Math.PI / 180;
    return HTMLCanvasElementLuminanceSource2;
  }(LuminanceSource_default)
);

// node_modules/@zxing/browser/esm/common/navigator-utils.js
function hasNavigator() {
  return typeof navigator !== "undefined";
}
function isMediaDevicesSupported() {
  return hasNavigator() && !!navigator.mediaDevices;
}
function canEnumerateDevices() {
  return !!(isMediaDevicesSupported() && navigator.mediaDevices.enumerateDevices);
}

// node_modules/@zxing/browser/esm/readers/BrowserCodeReader.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = function(thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  }, f, y, t, g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __values = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var defaultOptions = {
  delayBetweenScanAttempts: 500,
  delayBetweenScanSuccess: 500,
  tryPlayVideoTimeout: 5e3
};
var BrowserCodeReader = (
  /** @class */
  function() {
    function BrowserCodeReader2(reader, hints, options) {
      if (hints === void 0) {
        hints = /* @__PURE__ */ new Map();
      }
      if (options === void 0) {
        options = {};
      }
      this.reader = reader;
      this.hints = hints;
      this.options = __assign(__assign({}, defaultOptions), options);
    }
    Object.defineProperty(BrowserCodeReader2.prototype, "possibleFormats", {
      /**
       * Allows to change the possible formats the decoder should
       * search for while scanning some image. Useful for changing
       * the possible formats during BrowserCodeReader::scan.
       */
      set: function(formats) {
        this.hints.set(DecodeHintType_default.POSSIBLE_FORMATS, formats);
      },
      enumerable: false,
      configurable: true
    });
    BrowserCodeReader2.addVideoSource = function(videoElement, stream) {
      try {
        videoElement.srcObject = stream;
      } catch (err) {
        console.error("got interrupted by new loading request");
      }
    };
    BrowserCodeReader2.mediaStreamSetTorch = function(track, onOff) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, track.applyConstraints({
                advanced: [{
                  fillLightMode: onOff ? "flash" : "off",
                  torch: onOff ? true : false
                }]
              })];
            case 1:
              _a.sent();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    BrowserCodeReader2.mediaStreamIsTorchCompatible = function(params) {
      var e_1, _a;
      var tracks = params.getVideoTracks();
      try {
        for (var tracks_1 = __values(tracks), tracks_1_1 = tracks_1.next(); !tracks_1_1.done; tracks_1_1 = tracks_1.next()) {
          var track = tracks_1_1.value;
          if (BrowserCodeReader2.mediaStreamIsTorchCompatibleTrack(track)) {
            return true;
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (tracks_1_1 && !tracks_1_1.done && (_a = tracks_1.return)) _a.call(tracks_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return false;
    };
    BrowserCodeReader2.mediaStreamIsTorchCompatibleTrack = function(track) {
      try {
        var capabilities = track.getCapabilities();
        return "torch" in capabilities;
      } catch (err) {
        console.error(err);
        console.warn("Your browser may be not fully compatible with WebRTC and/or ImageCapture specs. Torch will not be available.");
        return false;
      }
    };
    BrowserCodeReader2.isVideoPlaying = function(video) {
      return video.currentTime > 0 && !video.paused && video.readyState > 2;
    };
    BrowserCodeReader2.getMediaElement = function(mediaElementId, type) {
      var mediaElement = document.getElementById(mediaElementId);
      if (!mediaElement) {
        throw new ArgumentException_default("element with id '".concat(mediaElementId, "' not found"));
      }
      if (mediaElement.nodeName.toLowerCase() !== type.toLowerCase()) {
        throw new ArgumentException_default("element with id '".concat(mediaElementId, "' must be an ").concat(type, " element"));
      }
      return mediaElement;
    };
    BrowserCodeReader2.createVideoElement = function(videoThingy) {
      if (videoThingy instanceof HTMLVideoElement) {
        return videoThingy;
      }
      if (typeof videoThingy === "string") {
        return BrowserCodeReader2.getMediaElement(videoThingy, "video");
      }
      if (!videoThingy && typeof document !== "undefined") {
        var videoElement = document.createElement("video");
        videoElement.width = 200;
        videoElement.height = 200;
        return videoElement;
      }
      throw new Error("Couldn't get videoElement from videoSource!");
    };
    BrowserCodeReader2.prepareImageElement = function(imageSource) {
      if (imageSource instanceof HTMLImageElement) {
        return imageSource;
      }
      if (typeof imageSource === "string") {
        return BrowserCodeReader2.getMediaElement(imageSource, "img");
      }
      if (typeof imageSource === "undefined") {
        var imageElement = document.createElement("img");
        imageElement.width = 200;
        imageElement.height = 200;
        return imageElement;
      }
      throw new Error("Couldn't get imageElement from imageSource!");
    };
    BrowserCodeReader2.prepareVideoElement = function(videoElem) {
      var videoElement = BrowserCodeReader2.createVideoElement(videoElem);
      videoElement.setAttribute("autoplay", "true");
      videoElement.setAttribute("muted", "true");
      videoElement.setAttribute("playsinline", "true");
      return videoElement;
    };
    BrowserCodeReader2.isImageLoaded = function(img) {
      if (!img.complete) {
        return false;
      }
      if (img.naturalWidth === 0) {
        return false;
      }
      return true;
    };
    BrowserCodeReader2.createBinaryBitmapFromCanvas = function(canvas) {
      var luminanceSource = new HTMLCanvasElementLuminanceSource(canvas);
      var hybridBinarizer = new HybridBinarizer_default(luminanceSource);
      return new BinaryBitmap_default(hybridBinarizer);
    };
    BrowserCodeReader2.drawImageOnCanvas = function(canvasElementContext, srcElement) {
      canvasElementContext.drawImage(srcElement, 0, 0);
    };
    BrowserCodeReader2.getMediaElementDimensions = function(mediaElement) {
      if (mediaElement instanceof HTMLVideoElement) {
        return {
          height: mediaElement.videoHeight,
          width: mediaElement.videoWidth
        };
      }
      if (mediaElement instanceof HTMLImageElement) {
        return {
          height: mediaElement.naturalHeight || mediaElement.height,
          width: mediaElement.naturalWidth || mediaElement.width
        };
      }
      throw new Error("Couldn't find the Source's dimensions!");
    };
    BrowserCodeReader2.createCaptureCanvas = function(mediaElement) {
      if (!mediaElement) {
        throw new ArgumentException_default("Cannot create a capture canvas without a media element.");
      }
      if (typeof document === "undefined") {
        throw new Error(`The page "Document" is undefined, make sure you're running in a browser.`);
      }
      var canvasElement = document.createElement("canvas");
      var _a = BrowserCodeReader2.getMediaElementDimensions(mediaElement), width = _a.width, height = _a.height;
      canvasElement.style.width = width + "px";
      canvasElement.style.height = height + "px";
      canvasElement.width = width;
      canvasElement.height = height;
      return canvasElement;
    };
    BrowserCodeReader2.tryPlayVideo = function(videoElement) {
      return __awaiter(this, void 0, void 0, function() {
        var error_1;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (videoElement === null || videoElement === void 0 ? void 0 : videoElement.ended) {
                console.error("Trying to play video that has ended.");
                return [2, false];
              }
              if (BrowserCodeReader2.isVideoPlaying(videoElement)) {
                console.warn("Trying to play video that is already playing.");
                return [2, true];
              }
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              return [4, videoElement.play()];
            case 2:
              _a.sent();
              return [2, true];
            case 3:
              error_1 = _a.sent();
              console.warn("It was not possible to play the video.", error_1);
              return [2, false];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    BrowserCodeReader2.createCanvasFromMediaElement = function(mediaElement) {
      var canvas = BrowserCodeReader2.createCaptureCanvas(mediaElement);
      var ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Couldn't find Canvas 2D Context.");
      }
      BrowserCodeReader2.drawImageOnCanvas(ctx, mediaElement);
      return canvas;
    };
    BrowserCodeReader2.createBinaryBitmapFromMediaElem = function(mediaElement) {
      var canvas = BrowserCodeReader2.createCanvasFromMediaElement(mediaElement);
      return BrowserCodeReader2.createBinaryBitmapFromCanvas(canvas);
    };
    BrowserCodeReader2.destroyImageElement = function(imageElement) {
      imageElement.src = "";
      imageElement.removeAttribute("src");
      imageElement = void 0;
    };
    BrowserCodeReader2.listVideoInputDevices = function() {
      return __awaiter(this, void 0, void 0, function() {
        var devices, videoDevices, devices_1, devices_1_1, device, kind, deviceId, label, groupId, videoDevice;
        var e_2, _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if (!hasNavigator()) {
                throw new Error("Can't enumerate devices, navigator is not present.");
              }
              if (!canEnumerateDevices()) {
                throw new Error("Can't enumerate devices, method not supported.");
              }
              return [4, navigator.mediaDevices.enumerateDevices()];
            case 1:
              devices = _b.sent();
              videoDevices = [];
              try {
                for (devices_1 = __values(devices), devices_1_1 = devices_1.next(); !devices_1_1.done; devices_1_1 = devices_1.next()) {
                  device = devices_1_1.value;
                  kind = device.kind === "video" ? "videoinput" : device.kind;
                  if (kind !== "videoinput") {
                    continue;
                  }
                  deviceId = device.deviceId || device.id;
                  label = device.label || "Video device ".concat(videoDevices.length + 1);
                  groupId = device.groupId;
                  videoDevice = {
                    deviceId,
                    label,
                    kind,
                    groupId
                  };
                  videoDevices.push(videoDevice);
                }
              } catch (e_2_1) {
                e_2 = {
                  error: e_2_1
                };
              } finally {
                try {
                  if (devices_1_1 && !devices_1_1.done && (_a = devices_1.return)) _a.call(devices_1);
                } finally {
                  if (e_2) throw e_2.error;
                }
              }
              return [2, videoDevices];
          }
        });
      });
    };
    BrowserCodeReader2.findDeviceById = function(deviceId) {
      return __awaiter(this, void 0, void 0, function() {
        var devices;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, BrowserCodeReader2.listVideoInputDevices()];
            case 1:
              devices = _a.sent();
              if (!devices) {
                return [
                  2
                  /*return*/
                ];
              }
              return [2, devices.find(function(x) {
                return x.deviceId === deviceId;
              })];
          }
        });
      });
    };
    BrowserCodeReader2.cleanVideoSource = function(videoElement) {
      if (!videoElement) {
        return;
      }
      try {
        videoElement.srcObject = null;
      } catch (err) {
        videoElement.src = "";
      }
      if (videoElement) {
        videoElement.removeAttribute("src");
      }
    };
    BrowserCodeReader2.releaseAllStreams = function() {
      if (BrowserCodeReader2.streamTracker.length !== 0) {
        BrowserCodeReader2.streamTracker.forEach(function(mediaStream) {
          mediaStream.getTracks().forEach(function(track) {
            return track.stop();
          });
        });
      }
      BrowserCodeReader2.streamTracker = [];
    };
    BrowserCodeReader2.playVideoOnLoadAsync = function(element, timeout) {
      return __awaiter(this, void 0, void 0, function() {
        var isPlaying;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, BrowserCodeReader2.tryPlayVideo(element)];
            case 1:
              isPlaying = _a.sent();
              if (isPlaying) {
                return [2, true];
              }
              return [2, new Promise(function(resolve, reject) {
                var timeoutId = setTimeout(function() {
                  if (BrowserCodeReader2.isVideoPlaying(element)) {
                    return;
                  }
                  reject(false);
                  element.removeEventListener("canplay", videoCanPlayListener);
                }, timeout);
                var videoCanPlayListener = function() {
                  BrowserCodeReader2.tryPlayVideo(element).then(function(hasPlayed) {
                    clearTimeout(timeoutId);
                    element.removeEventListener("canplay", videoCanPlayListener);
                    resolve(hasPlayed);
                  });
                };
                element.addEventListener("canplay", videoCanPlayListener);
              })];
          }
        });
      });
    };
    BrowserCodeReader2.attachStreamToVideo = function(stream, preview, previewPlayTimeout) {
      if (previewPlayTimeout === void 0) {
        previewPlayTimeout = 5e3;
      }
      return __awaiter(this, void 0, void 0, function() {
        var videoElement;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              videoElement = BrowserCodeReader2.prepareVideoElement(preview);
              BrowserCodeReader2.addVideoSource(videoElement, stream);
              return [4, BrowserCodeReader2.playVideoOnLoadAsync(videoElement, previewPlayTimeout)];
            case 1:
              _a.sent();
              return [2, videoElement];
          }
        });
      });
    };
    BrowserCodeReader2._waitImageLoad = function(element) {
      return new Promise(function(resolve, reject) {
        var timeout = 1e4;
        var timeoutId = setTimeout(function() {
          if (BrowserCodeReader2.isImageLoaded(element)) {
            return;
          }
          element.removeEventListener("load", imageLoadedListener);
          reject();
        }, timeout);
        var imageLoadedListener = function() {
          clearTimeout(timeoutId);
          element.removeEventListener("load", imageLoadedListener);
          resolve();
        };
        element.addEventListener("load", imageLoadedListener);
      });
    };
    BrowserCodeReader2.checkCallbackFnOrThrow = function(callbackFn) {
      if (!callbackFn) {
        throw new ArgumentException_default("`callbackFn` is a required parameter, you cannot capture results without it.");
      }
    };
    BrowserCodeReader2.disposeMediaStream = function(stream) {
      stream.getVideoTracks().forEach(function(x) {
        return x.stop();
      });
      stream = void 0;
    };
    BrowserCodeReader2.prototype.decode = function(element) {
      var canvas = BrowserCodeReader2.createCanvasFromMediaElement(element);
      return this.decodeFromCanvas(canvas);
    };
    BrowserCodeReader2.prototype.decodeBitmap = function(binaryBitmap) {
      return this.reader.decode(binaryBitmap, this.hints);
    };
    BrowserCodeReader2.prototype.decodeFromCanvas = function(canvas) {
      var binaryBitmap = BrowserCodeReader2.createBinaryBitmapFromCanvas(canvas);
      return this.decodeBitmap(binaryBitmap);
    };
    BrowserCodeReader2.prototype.decodeFromImageElement = function(source) {
      return __awaiter(this, void 0, void 0, function() {
        var element;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!source) {
                throw new ArgumentException_default("An image element must be provided.");
              }
              element = BrowserCodeReader2.prepareImageElement(source);
              return [4, this._decodeOnLoadImage(element)];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeFromImageUrl = function(url) {
      return __awaiter(this, void 0, void 0, function() {
        var element;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!url) {
                throw new ArgumentException_default("An URL must be provided.");
              }
              element = BrowserCodeReader2.prepareImageElement();
              element.src = url;
              _a.label = 1;
            case 1:
              _a.trys.push([1, , 3, 4]);
              return [4, this.decodeFromImageElement(element)];
            case 2:
              return [2, _a.sent()];
            case 3:
              BrowserCodeReader2.destroyImageElement(element);
              return [
                7
                /*endfinally*/
              ];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeFromConstraints = function(constraints, previewElem, callbackFn) {
      return __awaiter(this, void 0, void 0, function() {
        var stream, error_2;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              BrowserCodeReader2.checkCallbackFnOrThrow(callbackFn);
              return [4, this.getUserMedia(constraints)];
            case 1:
              stream = _a.sent();
              _a.label = 2;
            case 2:
              _a.trys.push([2, 4, , 5]);
              return [4, this.decodeFromStream(stream, previewElem, callbackFn)];
            case 3:
              return [2, _a.sent()];
            case 4:
              error_2 = _a.sent();
              BrowserCodeReader2.disposeMediaStream(stream);
              throw error_2;
            case 5:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeFromStream = function(stream, preview, callbackFn) {
      return __awaiter(this, void 0, void 0, function() {
        var timeout, video, finalizeCallback, originalControls, videoTracks, controls, isTorchAvailable, torchTrack_1, switchTorch_1;
        var _this = this;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              BrowserCodeReader2.checkCallbackFnOrThrow(callbackFn);
              timeout = this.options.tryPlayVideoTimeout;
              return [4, BrowserCodeReader2.attachStreamToVideo(stream, preview, timeout)];
            case 1:
              video = _a.sent();
              finalizeCallback = function() {
                BrowserCodeReader2.disposeMediaStream(stream);
                BrowserCodeReader2.cleanVideoSource(video);
              };
              originalControls = this.scan(video, callbackFn, finalizeCallback);
              videoTracks = stream.getVideoTracks();
              controls = __assign(__assign({}, originalControls), {
                stop: function() {
                  originalControls.stop();
                },
                streamVideoConstraintsApply: function(constraints, trackFilter) {
                  return __awaiter(this, void 0, void 0, function() {
                    var tracks, tracks_2, tracks_2_1, track, e_3_1;
                    var e_3, _a2;
                    return __generator(this, function(_b) {
                      switch (_b.label) {
                        case 0:
                          tracks = trackFilter ? videoTracks.filter(trackFilter) : videoTracks;
                          _b.label = 1;
                        case 1:
                          _b.trys.push([1, 6, 7, 8]);
                          tracks_2 = __values(tracks), tracks_2_1 = tracks_2.next();
                          _b.label = 2;
                        case 2:
                          if (!!tracks_2_1.done) return [3, 5];
                          track = tracks_2_1.value;
                          return [4, track.applyConstraints(constraints)];
                        case 3:
                          _b.sent();
                          _b.label = 4;
                        case 4:
                          tracks_2_1 = tracks_2.next();
                          return [3, 2];
                        case 5:
                          return [3, 8];
                        case 6:
                          e_3_1 = _b.sent();
                          e_3 = {
                            error: e_3_1
                          };
                          return [3, 8];
                        case 7:
                          try {
                            if (tracks_2_1 && !tracks_2_1.done && (_a2 = tracks_2.return)) _a2.call(tracks_2);
                          } finally {
                            if (e_3) throw e_3.error;
                          }
                          return [
                            7
                            /*endfinally*/
                          ];
                        case 8:
                          return [
                            2
                            /*return*/
                          ];
                      }
                    });
                  });
                },
                streamVideoConstraintsGet: function(trackFilter) {
                  return videoTracks.find(trackFilter).getConstraints();
                },
                streamVideoSettingsGet: function(trackFilter) {
                  return videoTracks.find(trackFilter).getSettings();
                },
                streamVideoCapabilitiesGet: function(trackFilter) {
                  return videoTracks.find(trackFilter).getCapabilities();
                }
              });
              isTorchAvailable = BrowserCodeReader2.mediaStreamIsTorchCompatible(stream);
              if (isTorchAvailable) {
                torchTrack_1 = videoTracks === null || videoTracks === void 0 ? void 0 : videoTracks.find(function(t) {
                  return BrowserCodeReader2.mediaStreamIsTorchCompatibleTrack(t);
                });
                switchTorch_1 = function(onOff) {
                  return __awaiter(_this, void 0, void 0, function() {
                    return __generator(this, function(_a2) {
                      switch (_a2.label) {
                        case 0:
                          return [4, BrowserCodeReader2.mediaStreamSetTorch(torchTrack_1, onOff)];
                        case 1:
                          _a2.sent();
                          return [
                            2
                            /*return*/
                          ];
                      }
                    });
                  });
                };
                controls.switchTorch = switchTorch_1;
                controls.stop = function() {
                  return __awaiter(_this, void 0, void 0, function() {
                    return __generator(this, function(_a2) {
                      switch (_a2.label) {
                        case 0:
                          originalControls.stop();
                          return [4, switchTorch_1(false)];
                        case 1:
                          _a2.sent();
                          return [
                            2
                            /*return*/
                          ];
                      }
                    });
                  });
                };
              }
              return [2, controls];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeFromVideoDevice = function(deviceId, previewElem, callbackFn) {
      return __awaiter(this, void 0, void 0, function() {
        var videoConstraints, constraints;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              BrowserCodeReader2.checkCallbackFnOrThrow(callbackFn);
              if (!deviceId) {
                videoConstraints = {
                  facingMode: "environment"
                };
              } else {
                videoConstraints = {
                  deviceId: {
                    exact: deviceId
                  }
                };
              }
              constraints = {
                video: videoConstraints
              };
              return [4, this.decodeFromConstraints(constraints, previewElem, callbackFn)];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeFromVideoElement = function(source, callbackFn) {
      return __awaiter(this, void 0, void 0, function() {
        var element, timeout;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              BrowserCodeReader2.checkCallbackFnOrThrow(callbackFn);
              if (!source) {
                throw new ArgumentException_default("A video element must be provided.");
              }
              element = BrowserCodeReader2.prepareVideoElement(source);
              timeout = this.options.tryPlayVideoTimeout;
              return [4, BrowserCodeReader2.playVideoOnLoadAsync(element, timeout)];
            case 1:
              _a.sent();
              return [2, this.scan(element, callbackFn)];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeFromVideoUrl = function(url, callbackFn) {
      return __awaiter(this, void 0, void 0, function() {
        var element, finalizeCallback, timeout, controls;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              BrowserCodeReader2.checkCallbackFnOrThrow(callbackFn);
              if (!url) {
                throw new ArgumentException_default("An URL must be provided.");
              }
              element = BrowserCodeReader2.prepareVideoElement();
              element.src = url;
              finalizeCallback = function() {
                BrowserCodeReader2.cleanVideoSource(element);
              };
              timeout = this.options.tryPlayVideoTimeout;
              return [4, BrowserCodeReader2.playVideoOnLoadAsync(element, timeout)];
            case 1:
              _a.sent();
              controls = this.scan(element, callbackFn, finalizeCallback);
              return [2, controls];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeOnceFromConstraints = function(constraints, videoSource) {
      return __awaiter(this, void 0, void 0, function() {
        var stream;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.getUserMedia(constraints)];
            case 1:
              stream = _a.sent();
              return [4, this.decodeOnceFromStream(stream, videoSource)];
            case 2:
              return [2, _a.sent()];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeOnceFromStream = function(stream, preview) {
      return __awaiter(this, void 0, void 0, function() {
        var receivedPreview, video, result;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              receivedPreview = Boolean(preview);
              return [4, BrowserCodeReader2.attachStreamToVideo(stream, preview)];
            case 1:
              video = _a.sent();
              _a.label = 2;
            case 2:
              _a.trys.push([2, , 4, 5]);
              return [4, this.scanOneResult(video)];
            case 3:
              result = _a.sent();
              return [2, result];
            case 4:
              if (!receivedPreview) {
                BrowserCodeReader2.cleanVideoSource(video);
              }
              return [
                7
                /*endfinally*/
              ];
            case 5:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeOnceFromVideoDevice = function(deviceId, videoSource) {
      return __awaiter(this, void 0, void 0, function() {
        var videoConstraints, constraints;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!deviceId) {
                videoConstraints = {
                  facingMode: "environment"
                };
              } else {
                videoConstraints = {
                  deviceId: {
                    exact: deviceId
                  }
                };
              }
              constraints = {
                video: videoConstraints
              };
              return [4, this.decodeOnceFromConstraints(constraints, videoSource)];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeOnceFromVideoElement = function(source) {
      return __awaiter(this, void 0, void 0, function() {
        var element, timeout;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!source) {
                throw new ArgumentException_default("A video element must be provided.");
              }
              element = BrowserCodeReader2.prepareVideoElement(source);
              timeout = this.options.tryPlayVideoTimeout;
              return [4, BrowserCodeReader2.playVideoOnLoadAsync(element, timeout)];
            case 1:
              _a.sent();
              return [4, this.scanOneResult(element)];
            case 2:
              return [2, _a.sent()];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.decodeOnceFromVideoUrl = function(url) {
      return __awaiter(this, void 0, void 0, function() {
        var element, task;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!url) {
                throw new ArgumentException_default("An URL must be provided.");
              }
              element = BrowserCodeReader2.prepareVideoElement();
              element.src = url;
              task = this.decodeOnceFromVideoElement(element);
              _a.label = 1;
            case 1:
              _a.trys.push([1, , 3, 4]);
              return [4, task];
            case 2:
              return [2, _a.sent()];
            case 3:
              BrowserCodeReader2.cleanVideoSource(element);
              return [
                7
                /*endfinally*/
              ];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.scanOneResult = function(element, retryIfNotFound, retryIfChecksumError, retryIfFormatError) {
      var _this = this;
      if (retryIfNotFound === void 0) {
        retryIfNotFound = true;
      }
      if (retryIfChecksumError === void 0) {
        retryIfChecksumError = true;
      }
      if (retryIfFormatError === void 0) {
        retryIfFormatError = true;
      }
      return new Promise(function(resolve, reject) {
        _this.scan(element, function(result, error, controls) {
          if (result) {
            resolve(result);
            controls.stop();
            return;
          }
          if (error) {
            if (error instanceof NotFoundException_default && retryIfNotFound) {
              return;
            }
            if (error instanceof ChecksumException_default && retryIfChecksumError) {
              return;
            }
            if (error instanceof FormatException_default && retryIfFormatError) {
              return;
            }
            controls.stop();
            reject(error);
          }
        });
      });
    };
    BrowserCodeReader2.prototype.scan = function(element, callbackFn, finalizeCallback) {
      var _this = this;
      BrowserCodeReader2.checkCallbackFnOrThrow(callbackFn);
      var captureCanvas = BrowserCodeReader2.createCaptureCanvas(element);
      var captureCanvasContext;
      try {
        captureCanvasContext = captureCanvas.getContext("2d", {
          willReadFrequently: true
        });
      } catch (e) {
        captureCanvasContext = captureCanvas.getContext("2d");
      }
      if (!captureCanvasContext) {
        throw new Error("Couldn't create canvas for visual element scan.");
      }
      var disposeCanvas = function() {
        captureCanvasContext = void 0;
        captureCanvas = void 0;
      };
      var stopScan = false;
      var lastTimeoutId;
      var stop = function() {
        stopScan = true;
        clearTimeout(lastTimeoutId);
        disposeCanvas();
        if (finalizeCallback) {
          finalizeCallback();
        }
      };
      var controls = {
        stop
      };
      var loop = function() {
        if (stopScan) {
          return;
        }
        try {
          BrowserCodeReader2.drawImageOnCanvas(captureCanvasContext, element);
          var result = _this.decodeFromCanvas(captureCanvas);
          callbackFn(result, void 0, controls);
          lastTimeoutId = setTimeout(loop, _this.options.delayBetweenScanSuccess);
        } catch (error) {
          callbackFn(void 0, error, controls);
          var isChecksumError = error instanceof ChecksumException_default;
          var isFormatError = error instanceof FormatException_default;
          var isNotFound = error instanceof NotFoundException_default;
          if (isChecksumError || isFormatError || isNotFound) {
            lastTimeoutId = setTimeout(loop, _this.options.delayBetweenScanAttempts);
            return;
          }
          disposeCanvas();
          if (finalizeCallback) {
            finalizeCallback(error);
          }
        }
      };
      loop();
      return controls;
    };
    BrowserCodeReader2.prototype._decodeOnLoadImage = function(element) {
      return __awaiter(this, void 0, void 0, function() {
        var isImageLoaded;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              isImageLoaded = BrowserCodeReader2.isImageLoaded(element);
              if (!!isImageLoaded) return [3, 2];
              return [4, BrowserCodeReader2._waitImageLoad(element)];
            case 1:
              _a.sent();
              _a.label = 2;
            case 2:
              return [2, this.decode(element)];
          }
        });
      });
    };
    BrowserCodeReader2.prototype.getUserMedia = function(constraints) {
      return __awaiter(this, void 0, void 0, function() {
        var stream;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, navigator.mediaDevices.getUserMedia(constraints)];
            case 1:
              stream = _a.sent();
              BrowserCodeReader2.streamTracker.push(stream);
              return [2, stream];
          }
        });
      });
    };
    BrowserCodeReader2.streamTracker = [];
    return BrowserCodeReader2;
  }()
);

// node_modules/@zxing/browser/esm/readers/BrowserAztecCodeReader.js
var __extends2 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var BrowserAztecCodeReader = (
  /** @class */
  function(_super) {
    __extends2(BrowserAztecCodeReader2, _super);
    function BrowserAztecCodeReader2(hints, options) {
      return _super.call(this, new AztecReader_default(), hints, options) || this;
    }
    return BrowserAztecCodeReader2;
  }(BrowserCodeReader)
);

// node_modules/@zxing/browser/esm/readers/BrowserMultiFormatOneDReader.js
var __extends3 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var BrowserMultiFormatOneDReader = (
  /** @class */
  function(_super) {
    __extends3(BrowserMultiFormatOneDReader2, _super);
    function BrowserMultiFormatOneDReader2(hints, options) {
      return _super.call(this, new MultiFormatOneDReader_default(hints), hints, options) || this;
    }
    return BrowserMultiFormatOneDReader2;
  }(BrowserCodeReader)
);

// node_modules/@zxing/browser/esm/readers/BrowserDatamatrixCodeReader.js
var __extends4 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var BrowserDatamatrixCodeReader = (
  /** @class */
  function(_super) {
    __extends4(BrowserDatamatrixCodeReader2, _super);
    function BrowserDatamatrixCodeReader2(hints, options) {
      return _super.call(this, new DataMatrixReader_default(), hints, options) || this;
    }
    return BrowserDatamatrixCodeReader2;
  }(BrowserCodeReader)
);

// node_modules/@zxing/browser/esm/readers/BrowserMultiFormatReader.js
var __extends5 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var BrowserMultiFormatReader = (
  /** @class */
  function(_super) {
    __extends5(BrowserMultiFormatReader2, _super);
    function BrowserMultiFormatReader2(hints, options) {
      var _this = this;
      var reader = new MultiFormatReader_default();
      reader.setHints(hints);
      _this = _super.call(this, reader, hints, options) || this;
      _this.reader = reader;
      return _this;
    }
    Object.defineProperty(BrowserMultiFormatReader2.prototype, "possibleFormats", {
      set: function(formats) {
        this.hints.set(DecodeHintType_default.POSSIBLE_FORMATS, formats);
        this.reader.setHints(this.hints);
      },
      enumerable: false,
      configurable: true
    });
    BrowserMultiFormatReader2.prototype.decodeBitmap = function(binaryBitmap) {
      return this.reader.decodeWithState(binaryBitmap);
    };
    BrowserMultiFormatReader2.prototype.setHints = function(hints) {
      this.hints = hints;
      this.reader.setHints(this.hints);
    };
    return BrowserMultiFormatReader2;
  }(BrowserCodeReader)
);

// node_modules/@zxing/browser/esm/readers/BrowserPDF417Reader.js
var __extends6 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var BrowserPDF417Reader = (
  /** @class */
  function(_super) {
    __extends6(BrowserPDF417Reader2, _super);
    function BrowserPDF417Reader2(hints, options) {
      return _super.call(this, new PDF417Reader_default(), hints, options) || this;
    }
    return BrowserPDF417Reader2;
  }(BrowserCodeReader)
);

// node_modules/@zxing/browser/esm/readers/BrowserQRCodeReader.js
var __extends7 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var BrowserQRCodeReader = (
  /** @class */
  function(_super) {
    __extends7(BrowserQRCodeReader2, _super);
    function BrowserQRCodeReader2(hints, options) {
      return _super.call(this, new QRCodeReader_default(), hints, options) || this;
    }
    return BrowserQRCodeReader2;
  }(BrowserCodeReader)
);

// node_modules/@zxing/browser/esm/writers/BrowserCodeSvgWriter.js
var svgNs = "http://www.w3.org/2000/svg";
var BrowserCodeSvgWriter = (
  /** @class */
  function() {
    function BrowserCodeSvgWriter2(containerElement) {
      if (typeof containerElement === "string") {
        var container = document.getElementById(containerElement);
        if (!container) {
          throw new Error("Could not find a Container element with '".concat(containerElement, "'."));
        }
        this.containerElement = container;
      } else {
        this.containerElement = containerElement;
      }
    }
    BrowserCodeSvgWriter2.prototype.write = function(contents, width, height, hints) {
      if (contents.length === 0) {
        throw new IllegalArgumentException_default("Found empty contents");
      }
      if (width < 0 || height < 0) {
        throw new IllegalArgumentException_default("Requested dimensions are too small: " + width + "x" + height);
      }
      var quietZone = hints && hints.get(EncodeHintType_default.MARGIN) !== void 0 ? Number.parseInt(hints.get(EncodeHintType_default.MARGIN).toString(), 10) : BrowserCodeSvgWriter2.QUIET_ZONE_SIZE;
      var code = this.encode(hints, contents);
      return this.renderResult(code, width, height, quietZone);
    };
    BrowserCodeSvgWriter2.prototype.createSVGElement = function(w, h) {
      var el = document.createElementNS(BrowserCodeSvgWriter2.SVG_NS, "svg");
      el.setAttributeNS(svgNs, "width", h.toString());
      el.setAttributeNS(svgNs, "height", w.toString());
      return el;
    };
    BrowserCodeSvgWriter2.prototype.createSvgPathPlaceholderElement = function(w, h) {
      var el = document.createElementNS(BrowserCodeSvgWriter2.SVG_NS, "path");
      el.setAttributeNS(svgNs, "d", "M0 0h".concat(w, "v").concat(h, "H0z"));
      el.setAttributeNS(svgNs, "fill", "none");
      return el;
    };
    BrowserCodeSvgWriter2.prototype.createSvgRectElement = function(x, y, w, h) {
      var el = document.createElementNS(BrowserCodeSvgWriter2.SVG_NS, "rect");
      el.setAttributeNS(svgNs, "x", x.toString());
      el.setAttributeNS(svgNs, "y", y.toString());
      el.setAttributeNS(svgNs, "height", w.toString());
      el.setAttributeNS(svgNs, "width", h.toString());
      el.setAttributeNS(svgNs, "fill", "#000000");
      return el;
    };
    BrowserCodeSvgWriter2.prototype.encode = function(hints, contents) {
      var errorCorrectionLevel = ErrorCorrectionLevel_default.L;
      if (hints && hints.get(EncodeHintType_default.ERROR_CORRECTION) !== void 0) {
        var correctionStr = hints.get(EncodeHintType_default.ERROR_CORRECTION).toString();
        errorCorrectionLevel = ErrorCorrectionLevel_default.fromString(correctionStr);
      }
      var code = Encoder_default.encode(contents, errorCorrectionLevel, hints);
      return code;
    };
    BrowserCodeSvgWriter2.prototype.renderResult = function(code, width, height, quietZone) {
      var input = code.getMatrix();
      if (input === null) {
        throw new IllegalStateException_default();
      }
      var inputWidth = input.getWidth();
      var inputHeight = input.getHeight();
      var qrWidth = inputWidth + quietZone * 2;
      var qrHeight = inputHeight + quietZone * 2;
      var outputWidth = Math.max(width, qrWidth);
      var outputHeight = Math.max(height, qrHeight);
      var multiple = Math.min(Math.floor(outputWidth / qrWidth), Math.floor(outputHeight / qrHeight));
      var leftPadding = Math.floor((outputWidth - inputWidth * multiple) / 2);
      var topPadding = Math.floor((outputHeight - inputHeight * multiple) / 2);
      var svgElement = this.createSVGElement(outputWidth, outputHeight);
      var placeholder = this.createSvgPathPlaceholderElement(width, height);
      svgElement.appendChild(placeholder);
      this.containerElement.appendChild(svgElement);
      for (var inputY = 0, outputY = topPadding; inputY < inputHeight; inputY++, outputY += multiple) {
        for (var inputX = 0, outputX = leftPadding; inputX < inputWidth; inputX++, outputX += multiple) {
          if (input.get(inputX, inputY) === 1) {
            var svgRectElement = this.createSvgRectElement(outputX, outputY, multiple, multiple);
            svgElement.appendChild(svgRectElement);
          }
        }
      }
      return svgElement;
    };
    BrowserCodeSvgWriter2.QUIET_ZONE_SIZE = 4;
    BrowserCodeSvgWriter2.SVG_NS = "http://www.w3.org/2000/svg";
    return BrowserCodeSvgWriter2;
  }()
);

// node_modules/@zxing/browser/esm/writers/BrowserQRCodeSvgWriter.js
var svgNs2 = "http://www.w3.org/2000/svg";
var BrowserQRCodeSvgWriter = (
  /** @class */
  function() {
    function BrowserQRCodeSvgWriter2() {
    }
    BrowserQRCodeSvgWriter2.prototype.write = function(contents, width, height, hints) {
      if (contents.length === 0) {
        throw new IllegalArgumentException_default("Found empty contents");
      }
      if (width < 0 || height < 0) {
        throw new IllegalArgumentException_default("Requested dimensions are too small: " + width + "x" + height);
      }
      var errorCorrectionLevel = ErrorCorrectionLevel_default.L;
      var quietZone = BrowserQRCodeSvgWriter2.QUIET_ZONE_SIZE;
      if (hints) {
        if (void 0 !== hints.get(EncodeHintType_default.ERROR_CORRECTION)) {
          var correctionStr = hints.get(EncodeHintType_default.ERROR_CORRECTION).toString();
          errorCorrectionLevel = ErrorCorrectionLevel_default.fromString(correctionStr);
        }
        if (void 0 !== hints.get(EncodeHintType_default.MARGIN)) {
          quietZone = Number.parseInt(hints.get(EncodeHintType_default.MARGIN).toString(), 10);
        }
      }
      var code = Encoder_default.encode(contents, errorCorrectionLevel, hints);
      return this.renderResult(code, width, height, quietZone);
    };
    BrowserQRCodeSvgWriter2.prototype.writeToDom = function(containerElement, contents, width, height, hints) {
      if (typeof containerElement === "string") {
        var targetEl = document.querySelector(containerElement);
        if (!targetEl) {
          throw new Error("Could no find the target HTML element.");
        }
        containerElement = targetEl;
      }
      var svgElement = this.write(contents, width, height, hints);
      if (containerElement instanceof HTMLElement) {
        containerElement.appendChild(svgElement);
      }
    };
    BrowserQRCodeSvgWriter2.prototype.renderResult = function(code, width, height, quietZone) {
      var input = code.getMatrix();
      if (input === null) {
        throw new IllegalStateException_default();
      }
      var inputWidth = input.getWidth();
      var inputHeight = input.getHeight();
      var qrWidth = inputWidth + quietZone * 2;
      var qrHeight = inputHeight + quietZone * 2;
      var outputWidth = Math.max(width, qrWidth);
      var outputHeight = Math.max(height, qrHeight);
      var multiple = Math.min(Math.floor(outputWidth / qrWidth), Math.floor(outputHeight / qrHeight));
      var leftPadding = Math.floor((outputWidth - inputWidth * multiple) / 2);
      var topPadding = Math.floor((outputHeight - inputHeight * multiple) / 2);
      var svgElement = this.createSVGElement(outputWidth, outputHeight);
      for (var inputY = 0, outputY = topPadding; inputY < inputHeight; inputY++, outputY += multiple) {
        for (var inputX = 0, outputX = leftPadding; inputX < inputWidth; inputX++, outputX += multiple) {
          if (input.get(inputX, inputY) === 1) {
            var svgRectElement = this.createSvgRectElement(outputX, outputY, multiple, multiple);
            svgElement.appendChild(svgRectElement);
          }
        }
      }
      return svgElement;
    };
    BrowserQRCodeSvgWriter2.prototype.createSVGElement = function(w, h) {
      var svgElement = document.createElementNS(svgNs2, "svg");
      var width = w.toString();
      var height = h.toString();
      svgElement.setAttribute("height", height);
      svgElement.setAttribute("width", width);
      svgElement.setAttribute("viewBox", "0 0 " + width + " " + height);
      return svgElement;
    };
    BrowserQRCodeSvgWriter2.prototype.createSvgRectElement = function(x, y, w, h) {
      var rect = document.createElementNS(svgNs2, "rect");
      rect.setAttribute("x", x.toString());
      rect.setAttribute("y", y.toString());
      rect.setAttribute("height", w.toString());
      rect.setAttribute("width", h.toString());
      rect.setAttribute("fill", "#000000");
      return rect;
    };
    BrowserQRCodeSvgWriter2.QUIET_ZONE_SIZE = 4;
    return BrowserQRCodeSvgWriter2;
  }()
);
export {
  BarcodeFormat_default as BarcodeFormat,
  BrowserAztecCodeReader,
  BrowserCodeReader,
  BrowserCodeSvgWriter,
  BrowserDatamatrixCodeReader,
  BrowserMultiFormatOneDReader,
  BrowserMultiFormatReader,
  BrowserPDF417Reader,
  BrowserQRCodeReader,
  BrowserQRCodeSvgWriter,
  HTMLCanvasElementLuminanceSource
};
//# sourceMappingURL=@zxing_browser.js.map
