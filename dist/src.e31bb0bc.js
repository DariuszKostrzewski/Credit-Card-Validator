// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"issuers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.issuers = void 0;
var issuers = [{
  id: "MasterCard",
  prefix: ["51", "52", "53", "54", "55"],
  numLength: [16]
}, {
  id: "Visa",
  prefix: ["4"],
  numLength: [13, 16]
}, {
  id: "American Express",
  prefix: ["34", "37"],
  numLength: [15]
}];
exports.issuers = issuers;
},{}],"pretest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pretest;

var _issuers = require("./issuers.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function pretest(number) {
  var output = "";

  try {
    var isNumber = digitsTest(number); //string in, string out

    var isLength = lengthTest(isNumber); //string in, string out

    var issuerName = issuerTest(isLength); //string/arr in, string out

    if (issuerName === "") {
      throw new Error("Sorry, the card provider is unknown.");
    } else {
      output = isNumber;
    }
  } catch (e) {
    output = "".concat(e.message); // ${e.stack}`;
  }

  return output;
} //instant digits test


function digitsTest(str) {
  var arrNumber = Array.from(str);
  var digits = "";
  arrNumber.forEach(function (element) {
    if (isNaN(element)) {
      throw new Error("Whoops! '".concat(element, "' is not a number!"));
    } else {
      return digits += element;
    }
  });
  return digits;
} //instant length test


function lengthTest(str) {
  var regex = /\S*\d+/g;

  if (str.match(regex)) {
    var pretested = str.match(regex).join("");
    var strLength = pretested.length;

    if (strLength < 13) {
      throw new Error("Whoops! The number entered: ".concat(pretested, " is too short!"));
    }

    if (strLength == 14) {
      throw new Error("Whoops! The number entered: ".concat(pretested, " is invalid!"));
    }

    if (strLength > 16) {
      throw new Error("Whoops! The number entered: ".concat(pretested, " is too long!"));
    }
  } else {
    return str;
  }

  return str;
} //specifying issuer, function compares/testing entry data with data stored in module issuers.js


function issuerTest(arr) {
  var issuer = "";
  var numLength = arr.length;

  var _arr2 = _slicedToArray(arr, 2),
      firstDigit = _arr2[0],
      secondDigit = _arr2[1];

  var prefixShort = firstDigit;
  var prefixLong = "".concat(firstDigit).concat(secondDigit);

  _issuers.issuers.forEach(function (el) {
    if (el.prefix.includes(prefixShort) && el.numLength.includes(numLength)) {
      return issuer = el.id;
    }

    if (el.prefix.includes(prefixLong) && el.numLength.includes(numLength)) {
      return issuer = el.id;
    }
  });

  return issuer;
}
},{"./issuers.js":"issuers.js"}],"luhn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = luhn;

var _pretest = _interopRequireDefault(require("./pretest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function luhn(str) {
  var lastDigit = str.slice(-1);
  console.log("".concat(str, " entry"));
  var output = "";

  try {
    var verified = luhnAlg(str);
    console.log("".concat(verified, " after luhn"));

    if (verified !== +lastDigit) {
      throw new Error("The Credit Card number is NOT valid");
    } else {
      return output = "The Credit Card number is valid";
    }
  } catch (e) {
    return e;
  }

  return output;
}

function luhnAlg(str) {
  var numToVerify = str.split("");
  numToVerify.splice(-1);
  var reversed = numToVerify.reverse();
  console.log(reversed);
  var message = "";
  var sum = 0;

  for (var i = 0; i <= reversed.length; i++) {
    var digit = +reversed[i];
    console.log("".concat(i, " index ").concat(reversed[i]));

    if (i % 2 == 0) {
      digit *= 2;
      console.log(digit);

      if (digit > 9) {
        console.log("".concat(digit, " > 9"));
        digit -= 9;
      }
    }

    sum += digit;
    console.log("".concat(i, ":index - cyfra: ").concat(digit, " >> suma ").concat(sum));
  }

  var checkSum = sum % 10;
  console.log("".concat(sum, " suma"));
  console.log("".concat(checkSum, " kontr"));
  return checkSum;
}
},{"./pretest.js":"pretest.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _pretest = _interopRequireDefault(require("./pretest.js"));

var _luhn = _interopRequireDefault(require("./luhn.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "./styles/main.scss";
//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;
var inputNum = document.getElementById("ccnumber");
var outputMsg = document.getElementById("result-msg");
var btn = document.getElementsByClassName("check-btn")[0]; //let hidden = false;

inputNum.oninput = handleInput;

function handleInput() {
  var message = !!(0, _pretest.default)(inputNum.value);
  console.log(message);
  outputMsg.textContent = (0, _pretest.default)(inputNum.value);

  if (message) {
    btn.style.display = "inline-block";
  }
}

console.log(inputNum.value); //?

btn.addEventListener("click", function () {
  //outputMsg.textContent = luhn(inputNum.value);
  document.getElementById("checked").innerText = (0, _luhn.default)(inputNum.value);
}); // function displayVerified(passed) {
//   if (passed === true) {
//     const validNum = luhn(number);
//   }
// }
},{"./pretest.js":"pretest.js","./luhn.js":"luhn.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57770" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map