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
})({"../src/util/isNode.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNode = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isNode = function () {
  return _typeof(window['process']) === 'object' && String(window['process']) === '[object process]' && !window['process']["browser"];
}();

exports.isNode = isNode;
},{}],"../src/util/browser.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browser = void 0;

var _isNode = require("./isNode");

var browser;
exports.browser = browser;

if (!_isNode.isNode) {
  var ua = navigator.userAgent.toLowerCase(),
      doc = document.documentElement,
      ie = 'ActiveXObject' in window,
      webkit = ua.indexOf('webkit') !== -1,
      phantomjs = ua.indexOf('phantom') !== -1,
      android23 = ua.search('android [23]') !== -1,
      chrome = ua.indexOf('chrome') !== -1,
      gecko = ua.indexOf('gecko') !== -1 && !webkit && !window['opera'] && !ie,
      mobile = typeof orientation !== 'undefined' || ua.indexOf('mobile') !== -1,
      msPointer = !window.PointerEvent && window['MSPointerEvent'],
      pointer = window.PointerEvent && navigator['pointerEnabled'] || msPointer,
      ie3d = ie && 'transition' in doc.style,
      webkit3d = 'WebKitCSSMatrix' in window && 'm11' in new window.WebKitCSSMatrix() && !android23,
      gecko3d = 'MozPerspective' in doc.style,
      opera12 = 'OTransition' in doc.style,
      any3d = (ie3d || webkit3d || gecko3d) && !opera12 && !phantomjs;
  var chromeVersion = '0';

  if (chrome) {
    chromeVersion = ua.match(/chrome\/([\d.]+)/)[1];
  }

  var touch = !phantomjs && (pointer || 'ontouchstart' in window || window['DocumentTouch'] && document instanceof window['DocumentTouch']);
  var webgl;

  try {
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    webgl = gl && gl instanceof WebGLRenderingContext;
  } catch (err) {
    webgl = false;
  }

  var devicePixelRatio = window.devicePixelRatio || window.screen['deviceXDPI'] / window.screen['logicalXDPI'];
  exports.browser = browser = {
    ie: ie,
    ielt9: ie && !document.addEventListener,
    edge: 'msLaunchUri' in navigator && !('documentMode' in document),
    webkit: webkit,
    gecko: gecko,
    android: ua.indexOf('android') !== -1,
    android23: android23,
    chrome: chrome,
    chromeVersion: chromeVersion,
    safari: !chrome && ua.indexOf('safari') !== -1,
    phantomjs: phantomjs,
    ie3d: ie3d,
    webkit3d: webkit3d,
    gecko3d: gecko3d,
    opera12: opera12,
    any3d: any3d,
    mobile: mobile,
    mobileWebkit: mobile && webkit,
    mobileWebkit3d: mobile && webkit3d,
    mobileOpera: mobile && window['opera'],
    mobileGecko: mobile && gecko,
    touch: !!touch,
    msPointer: !!msPointer,
    pointer: !!pointer,
    retina: devicePixelRatio > 1,
    devicePixelRatio: devicePixelRatio,
    language: navigator['browserLanguage'] ? navigator['browserLanguage'] : navigator.language,
    ie9: ie && document['documentMode'] === 9,
    ie10: ie && document['documentMode'] === 10,
    webgl: webgl
  };
}
},{"./isNode":"../src/util/isNode.ts"}],"../src/util/isString.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = void 0;

var isString = function isString(str) {
  return typeof str == 'string' && str.constructor == String;
};

exports.isString = isString;
},{}],"../src/core/EventEmitter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventEmitter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function EventEmitter() {
  var _this = this;

  _classCallCheck(this, EventEmitter);

  this.maxListener = 8;
  this.listeners = new Map();

  this.on = function (name, listener) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var ctx = context || _this,
        listeners = _this.listeners;
    if (listeners.get(name) && Array.from(listeners.get(name).values()).length >= _this.maxListener) throw new Error("EventEmitter \u9519\u8BEF: \u5BF9\u8C61\u6CE8\u518C\u65F6\u95F4\u8D85\u8FC7\u6700\u5927\u9650\u5236 ".concat(_this.maxListener));

    if (listeners.get(name) instanceof Map) {
      if (listeners.get(name).get(ctx) && listeners.get(name).get(ctx).indexOf(listener) === -1) listeners.get(name).get(ctx).push(listener);else if (!listeners.get(name).get(ctx)) listeners.get(name).set(ctx, [listener]);
    } else listeners.set(name, new Map().set(ctx, [listener]));
  };

  this.emit = function (name) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var listeners = _this.listeners,
        arr = listeners.get(name);
    arr === null || arr === void 0 ? void 0 : arr.forEach(function (v, ctx) {
      v === null || v === void 0 ? void 0 : v.forEach(function (cb) {
        return cb.call.apply(cb, [ctx].concat(args));
      });
    });
  };

  this.off = function (name, listener) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var ctx = context || _this,
        listeners = _this.listeners;
    var arr = listeners.has(name) && listeners.get(name).has(ctx) ? listeners.get(name).get(ctx) : [];
    var i = arr.indexOf(listener);
    if (i >= 0) arr.splice(i, 1);
  };

  this.removeAllListener = function (name) {
    _this.listeners.delete(name);
  };

  this.once = function (name, listener) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    var fn = function fn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      listener.apply(_this, args);

      _this.off(name, fn, context);
    };

    _this.on(name, fn, context);
  };
};

exports.EventEmitter = EventEmitter;
},{}],"../node_modules/kiwi.matrix/dist/bundle.js":[function(require,module,exports) {
var t=Math.PI/180,u=function(){};function o(t,u){for(var o=0;o<u.length;o++){var i=u[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function i(t,u,i){return u&&o(t.prototype,u),i&&o(t,i),t}u.EPSILON=1e-6,u.ARRAY_TYPE=Array,u.RANDOM=Math.random,u.ENABLE_SIMD=!0,u.toRadian=function(u){return u*t},u.toDegree=function(u){return u/t},u.equals=function(t,o){return Math.abs(t-o)<=u.EPSILON*Math.max(1,Math.abs(t),Math.abs(o))};var s=function(){function t(){this._out=new Array(9),this._out[0]=1,this._out[1]=0,this._out[2]=0,this._out[3]=0,this._out[4]=1,this._out[5]=0,this._out[6]=0,this._out[7]=0,this._out[8]=1}var o=t.prototype;return o.set=function(t,u,o,i,s,h,_,a,n){return this._out[0]=t,this._out[1]=u,this._out[2]=o,this._out[3]=i,this._out[4]=s,this._out[5]=h,this._out[6]=_,this._out[7]=a,this._out[8]=n,this},o.clone=function(){return(new t).set(this._out[0],this._out[1],this._out[2],this._out[3],this._out[4],this._out[5],this._out[6],this._out[7],this._out[8])},t.fromMat4=function(u){var o=new t;return o.set(u.value[0],u.value[1],u.value[2],u.value[4],u.value[5],u.value[6],u.value[8],u.value[9],u.value[10]),o},o.identity=function(){return this._out[0]=1,this._out[1]=0,this._out[2]=0,this._out[3]=0,this._out[4]=1,this._out[5]=0,this._out[6]=0,this._out[7]=0,this._out[8]=1,this},o.invert=function(){var t=this._out,u=t[0],o=t[1],i=t[2],s=t[3],h=t[4],_=t[5],a=t[6],n=t[7],e=t[8],r=e*h-_*n,l=-e*s+_*a,v=n*s-h*a,M=u*r+o*l+i*v;return M?(this._out[0]=r*(M=1/M),this._out[1]=(-e*o+i*n)*M,this._out[2]=(_*o-i*h)*M,this._out[3]=l*M,this._out[4]=(e*u-i*a)*M,this._out[5]=(-_*u+i*s)*M,this._out[6]=v*M,this._out[7]=(-n*u+o*a)*M,this._out[8]=(h*u-o*s)*M,this):null},o.adjoint=function(){var t=this._out,u=t[0],o=t[1],i=t[2],s=t[3],h=t[4],_=t[5],a=t[6],n=t[7],e=t[8];return this._out[0]=h*e-_*n,this._out[1]=i*n-o*e,this._out[2]=o*_-i*h,this._out[3]=_*a-s*e,this._out[4]=u*e-i*a,this._out[5]=i*s-u*_,this._out[6]=s*n-h*a,this._out[7]=o*a-u*n,this._out[8]=u*h-o*s,this},o.determinant=function(){var t=this._out,u=t[3],o=t[4],i=t[5],s=t[6],h=t[7],_=t[8];return t[0]*(_*o-i*h)+t[1]*(-_*u+i*s)+t[2]*(h*u-o*s)},o.multiply=function(t){var u=this._out,o=u[0],i=u[1],s=u[2],h=u[3],_=u[4],a=u[5],n=u[6],e=u[7],r=u[8],l=t.value,v=l[0],M=l[1],c=l[2],f=l[3],b=l[4],m=l[5],w=l[6],x=l[7],p=l[8];return this._out[0]=v*o+M*h+c*n,this._out[1]=v*i+M*_+c*e,this._out[2]=v*s+M*a+c*r,this._out[3]=f*o+b*h+m*n,this._out[4]=f*i+b*_+m*e,this._out[5]=f*s+b*a+m*r,this._out[6]=w*o+x*h+p*n,this._out[7]=w*i+x*_+p*e,this._out[8]=w*s+x*a+p*r,this},o.translate=function(t){var u=this.value,o=u[0],i=u[1],s=u[2],h=u[3],_=u[4],a=u[5],n=u[6],e=u[7],r=u[8],l=t.value,v=l[0],M=l[1];return this._out[0]=o,this._out[1]=i,this._out[2]=s,this._out[3]=h,this._out[4]=_,this._out[5]=a,this._out[6]=v*o+M*h+n,this._out[7]=v*i+M*_+e,this._out[8]=v*s+M*a+r,this},o.rotate=function(t){var u=this._out,o=u[0],i=u[1],s=u[2],h=u[3],_=u[4],a=u[5],n=u[6],e=u[7],r=u[8],l=Math.sin(t),v=Math.cos(t);return this._out[0]=v*o+l*h,this._out[1]=v*i+l*_,this._out[2]=v*s+l*a,this._out[3]=v*h-l*o,this._out[4]=v*_-l*i,this._out[5]=v*a-l*s,this._out[6]=n,this._out[7]=e,this._out[8]=r,this},o.scale=function(t){var u=t.value,o=u[0],i=u[1];return this._out[0]=o*this._out[0],this._out[1]=o*this._out[1],this._out[2]=o*this._out[2],this._out[3]=i*this._out[3],this._out[4]=i*this._out[4],this._out[5]=i*this._out[5],this},o.fromQuat=function(u){var o=u.value,i=o[0],s=o[1],h=o[2],_=o[3],a=i+i,n=s+s,e=h+h,r=i*a,l=s*a,v=s*n,M=h*a,c=h*n,f=h*e,b=_*a,m=_*n,w=_*e;return(new t).set(1-v-f,l+w,M-m,l-w,1-r-f,c+b,M+m,c-b,1-r-v)},o.normalFromMat4=function(u){var o=u.value,i=o[0],s=o[1],h=o[2],_=o[3],a=o[4],n=o[5],e=o[6],r=o[7],l=o[8],v=o[9],M=o[10],c=o[11],f=o[12],b=o[13],m=o[14],w=o[15],x=i*n-s*a,p=i*e-h*a,y=i*r-_*a,d=s*e-h*n,P=s*r-_*n,S=h*r-_*e,I=l*b-v*f,O=l*m-M*f,N=l*w-c*f,E=v*m-M*b,L=v*w-c*b,g=M*w-c*m,q=x*g-p*L+y*E+d*N-P*O+S*I;if(!q)throw new Error("行列式计算失败");var z=(n*g-e*L+r*E)*(q=1/q),A=(e*N-a*g-r*O)*q,k=(a*L-n*N+r*I)*q,R=(h*L-s*g-_*E)*q,D=(i*g-h*N+_*O)*q,T=(s*N-i*L-_*I)*q,F=(b*S-m*P+w*d)*q,Q=(m*y-f*S-w*p)*q,V=(f*P-b*y+w*x)*q;return(new t).set(z,A,k,R,D,T,F,Q,V)},o.toString=function(){return"mat3("+this._out[0]+", "+this._out[1]+", "+this._out[2]+", "+this._out[3]+", "+this._out[4]+", "+this._out[5]+", "+this._out[6]+", "+this._out[7]+", "+this._out[8]+")"},o.frob=function(){return Math.sqrt(Math.pow(this._out[0],2)+Math.pow(this._out[1],2)+Math.pow(this._out[2],2)+Math.pow(this._out[3],2)+Math.pow(this._out[4],2)+Math.pow(this._out[5],2)+Math.pow(this._out[6],2)+Math.pow(this._out[7],2)+Math.pow(this._out[8],2))},o.add=function(t){return this._out[0]+=t.value[0],this._out[1]+=t.value[1],this._out[2]+=t.value[2],this._out[3]+=t.value[3],this._out[4]+=t.value[4],this._out[5]+=t.value[5],this._out[6]+=t.value[6],this._out[7]+=t.value[7],this._out[8]+=t.value[8],this},o.sub=function(t){return this._out[0]-=t.value[0],this._out[1]-=t.value[1],this._out[2]-=t.value[2],this._out[3]-=t.value[3],this._out[4]-=t.value[4],this._out[5]-=t.value[5],this._out[6]-=t.value[6],this._out[7]-=t.value[7],this._out[8]-=t.value[8],this},o.equals=function(t){var o=this._out,i=o[0],s=o[1],h=o[2],_=o[3],a=o[4],n=o[5],e=o[6],r=o[7],l=o[8],v=t.value,M=v[0],c=v[1],f=v[2],b=v[3],m=v[4],w=v[5],x=v[6],p=v[7],y=v[8];return Math.abs(i-M)<=u.EPSILON*Math.max(1,Math.abs(i),Math.abs(M))&&Math.abs(s-c)<=u.EPSILON*Math.max(1,Math.abs(s),Math.abs(c))&&Math.abs(h-f)<=u.EPSILON*Math.max(1,Math.abs(h),Math.abs(f))&&Math.abs(_-b)<=u.EPSILON*Math.max(1,Math.abs(_),Math.abs(b))&&Math.abs(a-m)<=u.EPSILON*Math.max(1,Math.abs(a),Math.abs(m))&&Math.abs(n-w)<=u.EPSILON*Math.max(1,Math.abs(n),Math.abs(w))&&Math.abs(e-x)<=u.EPSILON*Math.max(1,Math.abs(e),Math.abs(x))&&Math.abs(r-p)<=u.EPSILON*Math.max(1,Math.abs(r),Math.abs(p))&&Math.abs(l-y)<=u.EPSILON*Math.max(1,Math.abs(l),Math.abs(y))},i(t,[{key:"value",get:function(){return this._out}}]),t}(),h=function(){function t(){this._out=new Array(3),this._out[0]=0,this._out[1]=0,this._out[2]=0}var o=t.prototype;return o.set=function(t,u,o){return this._out[0]=t,this._out[1]=u,this._out[2]=o,this},o.clone=function(){var u=new t;return u.set(this._out[0],this._out[1],this._out[2]),u},o.add=function(t){return this._out[0]+=t._out[0],this._out[1]+=t._out[1],this._out[2]+=t._out[2],this},o.sub=function(t){return this._out[0]-=t._out[0],this._out[1]-=t._out[1],this._out[2]-=t._out[2],this},o.multiply=function(t){return this._out[0]*=t._out[0],this._out[1]*=t._out[1],this._out[2]*=t._out[2],this},o.divide=function(t){return this._out[0]/=t._out[0],this._out[1]/=t._out[1],this._out[2]/=t._out[2],this},o.ceil=function(){return this._out[0]=Math.ceil(this._out[0]),this._out[1]=Math.ceil(this._out[1]),this._out[2]=Math.ceil(this._out[2]),this},o.floor=function(){return this._out[0]=Math.floor(this._out[0]),this._out[1]=Math.floor(this._out[1]),this._out[2]=Math.floor(this._out[2]),this},o.round=function(){return this._out[0]=Math.round(this._out[0]),this._out[1]=Math.round(this._out[1]),this._out[2]=Math.round(this._out[2]),this},o.min=function(t){return this._out[0]=Math.min(this._out[0],t._out[0]),this._out[1]=Math.min(this._out[1],t._out[1]),this._out[2]=Math.min(this._out[2],t._out[2]),this},o.max=function(t){return this._out[0]=Math.max(this._out[0],t._out[0]),this._out[1]=Math.max(this._out[1],t._out[1]),this._out[2]=Math.max(this._out[2],t._out[2]),this},o.scale=function(t){return this._out[0]*=t,this._out[1]*=t,this._out[2]*=t,this},o.distance=function(t){var u=this._out,o=t._out,i=u[0]-o[0],s=u[1]-o[1],h=u[2]-o[2];return Math.sqrt(i*i+s*s+h*h)},o.len=function(){return this.distance(new t)},o.negate=function(){return this._out[0]=-this._out[0],this._out[1]=-this._out[1],this._out[2]=-this._out[2],this},o.inverse=function(){return this._out[0]=1/this._out[0],this._out[1]=1/this._out[1],this._out[2]=1/this._out[2],this},o.normalize=function(){var t=this.len();return t>0&&(this._out[0]/=t,this._out[1]/=t,this._out[2]/=t),this},o.dot=function(t){var u=this._out,o=t._out;return u[0]*o[0]+u[1]*o[1]+u[2]*o[2]},o.cross=function(t){var u=this._out,o=u[0],i=u[1],s=u[2],h=t.value,_=h[0],a=h[1],n=h[2];return this._out[0]=i*n-s*a,this._out[1]=s*_-o*n,this._out[2]=o*a-i*_,this},o.lerp=function(t,u){var o=this._out,i=o[0],s=o[1],h=o[2],_=t._out,a=_[1],n=_[2];return this._out[0]=i+u*(_[0]-i),this._out[1]=s+u*(a-s),this._out[2]=h+u*(n-h),this},o.hermite=function(t,u,o,i){var s=i*i,h=s*(2*i-3)+1,_=s*(i-2)+i,a=s*(i-1),n=s*(3-2*i);return this._out[0]=this._out[0]*h+t._out[0]*_+u._out[0]*a+o._out[0]*n,this._out[1]=this._out[1]*h+t._out[1]*_+u._out[1]*a+o._out[1]*n,this._out[2]=this._out[2]*h+t._out[2]*_+u._out[2]*a+o._out[2]*n,this},o.bezier=function(t,u,o,i){var s=1-i,h=s*s,_=i*i,a=h*s,n=3*i*h,e=3*_*s,r=_*i;return this._out[0]=this._out[0]*a+t._out[0]*n+u._out[0]*e+o._out[0]*r,this._out[1]=this._out[1]*a+t._out[1]*n+u._out[1]*e+o._out[1]*r,this._out[2]=this._out[2]*a+t._out[2]*n+u._out[2]*e+o._out[2]*r,this},o.transformMat4=function(t){var u=this._out,o=u[0],i=u[1],s=u[2],h=t.value[3]*o+t.value[7]*i+t.value[11]*s+t.value[15]||1;return this._out[0]=(t.value[0]*o+t.value[4]*i+t.value[8]*s+t.value[12])/h,this._out[1]=(t.value[1]*o+t.value[5]*i+t.value[9]*s+t.value[13])/h,this._out[2]=(t.value[2]*o+t.value[6]*i+t.value[10]*s+t.value[14])/h,this},o.transformMat3=function(t){var u=this._out,o=u[0],i=u[1],s=u[2];return this._out[0]=o*t._out[0]+i*t._out[3]+s*t._out[6],this._out[1]=o*t._out[1]+i*t._out[4]+s*t._out[7],this._out[2]=o*t._out[2]+i*t._out[5]+s*t._out[8],this},o.toString=function(){return"vec3("+this._out[0]+", "+this._out[1]+", "+this._out[2]+")"},o.transformQuat=function(t){var u=this._out,o=u[0],i=u[1],s=u[2],h=t.value,_=h[0],a=h[1],n=h[2],e=h[3],r=e*o+a*s-n*i,l=e*i+n*o-_*s,v=e*s+_*i-a*o,M=-_*o-a*i-n*s;return this._out[0]=r*e+M*-_+l*-n-v*-a,this._out[1]=l*e+M*-a+v*-_-r*-n,this._out[2]=v*e+M*-n+r*-a-l*-_,this},o.rotateX=function(t,u){var o=[],i=[];return o[0]=this._out[0]-t._out[0],o[1]=this._out[1]-t._out[1],o[2]=this._out[2]-t._out[2],i[0]=o[0],i[1]=o[1]*Math.cos(u)-o[2]*Math.sin(u),i[2]=o[1]*Math.sin(u)+o[2]*Math.cos(u),this._out[0]=i[0]+t.value[0],this._out[1]=i[1]+t.value[1],this._out[2]=i[2]+t.value[2],this},o.rotateY=function(t,u){var o=[],i=[];return o[0]=this._out[0]-t._out[0],o[1]=this._out[1]-t._out[1],o[2]=this._out[2]-t._out[2],i[0]=o[2]*Math.sin(u)+o[0]*Math.cos(u),i[1]=o[1],i[2]=o[2]*Math.cos(u)-o[0]*Math.sin(u),this._out[0]=i[0]+t.value[0],this._out[1]=i[1]+t.value[1],this._out[2]=i[2]+t.value[2],this},o.rotateZ=function(t,u){var o=[],i=[];return o[0]=this._out[0]-t._out[0],o[1]=this._out[1]-t._out[1],o[2]=this._out[2]-t._out[2],i[0]=o[0]*Math.cos(u)-o[1]*Math.sin(u),i[1]=o[0]*Math.sin(u)+o[1]*Math.cos(u),i[2]=o[2],this._out[0]=i[0]+t.value[0],this._out[1]=i[1]+t.value[1],this._out[2]=i[2]+t.value[2],this},o.angle=function(t){var u=this.clone().normalize(),o=t.clone().normalize(),i=u.clone().dot(o);return i>1?0:i<-1?Math.PI:Math.acos(i)},o.applyQuat=function(t){var u=this.x,o=this.y,i=this.z,s=t.x,h=t.y,_=t.z,a=t.w,n=a*u+h*i-_*o,e=a*o+_*u-s*i,r=a*i+s*o-h*u,l=-s*u-h*o-_*i;return this._out[0]=n*a+l*-s+e*-_-r*-h,this._out[1]=e*a+l*-h+r*-s-n*-_,this._out[2]=r*a+l*-_+n*-h-e*-s,this},o.equals=function(t){var o=this._out,i=o[0],s=o[1],h=o[2],_=t._out,a=_[0],n=_[1],e=_[2];return Math.abs(i-a)<=u.EPSILON*Math.max(1,Math.abs(i),Math.abs(a))&&Math.abs(s-n)<=u.EPSILON*Math.max(1,Math.abs(s),Math.abs(n))&&Math.abs(h-e)<=u.EPSILON*Math.max(1,Math.abs(h),Math.abs(e))},o.applyMatrix4=function(t){var u=this.x,o=this.y,i=this.z,s=1/(t.value[3]*u+t.value[7]*o+t.value[11]*i+t.value[15]);return this.set((t.value[0]*u+t.value[4]*o+t.value[8]*i+t.value[12])*s,(t.value[1]*u+t.value[5]*o+t.value[9]*i+t.value[13])*s,(t.value[2]*u+t.value[6]*o+t.value[10]*i+t.value[14])*s),this},i(t,[{key:"x",get:function(){return this._out[0]}},{key:"y",get:function(){return this._out[1]}},{key:"z",get:function(){return this._out[2]}},{key:"value",get:function(){return this._out}}]),t}(),_=function(){function t(){this._out=new Array(4),this._out[0]=0,this._out[1]=0,this._out[2]=0,this._out[3]=1}t.fromMat3=function(u){var o,i=new t,s=u.value[0]+u.value[4]+u.value[8];if(s>0)o=Math.sqrt(s+1),i._out[3]=.5*o,i._out[0]=(u._out[5]-u._out[7])*(o=.5/o),i._out[1]=(u._out[6]-u._out[2])*o,i._out[2]=(u._out[1]-u._out[3])*o;else{var h=0;u.value[4]>u.value[0]&&(h=1),u.value[8]>u.value[3*h+h]&&(h=2);var _=(h+1)%3,a=(h+2)%3;o=Math.sqrt(u._out[3*h+h]-u._out[3*_+_]-u._out[3*a+a]+1),i._out[h]=.5*o,i._out[3]=(u._out[3*_+a]-u._out[3*a+_])*(o=.5/o),i._out[_]=(u._out[3*_+h]+u._out[3*h+_])*o,i._out[a]=(u._out[3*a+h]+u._out[3*h+a])*o}return i};var o=t.prototype;return o.set=function(t,u,o,i){return this._out[0]=t,this._out[1]=u,this._out[2]=o,this._out[3]=i,this},o.clone=function(){var u=new t;return u.set(u._out[0],u._out[1],u._out[2],u._out[3]),u},o.identity=function(){return this._out[0]=0,this._out[1]=0,this._out[2]=0,this._out[3]=1,this},o.rotationTo=function(t,u){this._r1=this._r1||new h,this._r2=this._r2||(new h).set(1,0,0),this._r3=this._r3||(new h).set(0,1,0);var o=t.dot(u);return o<-.999999?(this._r1=this._r3.clone().cross(t),this._r1.len()<1e-6&&(this._r1=this._r3.clone().cross(t)),this._r3.normalize(),this.setAxisAngle(this._r1,Math.PI),this):o>.999999?(this._out[0]=0,this._out[1]=0,this._out[2]=0,this._out[3]=1,this):(this._r1=t.clone().cross(u),this._out[0]=this._r1.value[0],this._out[1]=this._r1.value[1],this._out[2]=this._r1.value[2],this._out[3]=1+o,this.normalize())},o.setAxes=function(u,o,i){var h=(new s).set(o.value[0],i.value[0],-u.value[0],o.value[1],i.value[1],-u.value[1],o.value[2],i.value[2],-u.value[2]);return t.fromMat3(h)},o.setAxisAngle=function(t,u){u*=.5;var o=Math.sin(u);return this._out[0]=o*t.value[0],this._out[1]=o*t.value[1],this._out[2]=o*t.value[2],this._out[3]=Math.cos(u),this},o.setFromUnitVectors=function(t,o){var i,s,h,_,a=t.clone().dot(o)+1;return a<u.EPSILON?(a=0,Math.abs(t.x)>Math.abs(t.z)?(i=-t.y,s=t.x,h=0,_=a):(i=0,s=-t.z,h=t.y,_=a)):(i=t.y*o.z-t.z*o.y,s=t.z*o.x-t.x*o.z,h=t.x*o.y-t.y*o.x,_=a),this.set(i,s,h,_).normalize()},o.setFromRotationMatrix=function(t){var u,o,i,s,h,_=t.value,a=_[0],n=_[4],e=_[8],r=_[1],l=_[5],v=_[9],M=_[2],c=_[6],f=_[10],b=a+l+f;return b>0?(o=.25/(u=.5/Math.sqrt(b+1)),i=(c-v)*u,s=(e-M)*u,h=(r-n)*u):a>l&&a>f?(o=(c-v)/(u=2*Math.sqrt(1+a-l-f)),i=.25*u,s=(n+r)/u,h=(e+M)/u):l>f?(o=(e-M)/(u=2*Math.sqrt(1+l-a-f)),i=(n+r)/u,s=.25*u,h=(v+c)/u):(o=(r-n)/(u=2*Math.sqrt(1+f-a-l)),i=(e+M)/u,s=(v+c)/u,h=.25*u),this.set(i,s,h,o)},o.getAxisAngle=function(){var t=2*Math.acos(this._out[3]),u=Math.sin(t/2),o=new h;return 0===u?o.set(1,0,0):o.set(this._out[0]/u,this._out[1]/u,this._out[2]/u),[o,t]},o.add=function(t){return this._out[0]+=t._out[0],this._out[1]+=t._out[1],this._out[2]+=t._out[2],this._out[3]+=t._out[3],this},o.multiply=function(t){var u=this.value,o=u[0],i=u[1],s=u[2],h=u[3],_=t.value,a=_[0],n=_[1],e=_[2],r=_[3];return this._out[0]=o*r+h*a+i*e-s*n,this._out[1]=i*r+h*n+s*a-o*e,this._out[2]=s*r+h*e+o*n-i*a,this._out[3]=h*r-o*a-i*n-s*e,this},o.scale=function(t){return this._out[0]*=t,this._out[1]*=t,this._out[2]*=t,this._out[3]*=t,this},o.rotateX=function(t){t*=.5;var u=this.value,o=u[0],i=u[1],s=u[2],h=u[3],_=Math.sin(t),a=Math.cos(t);return this._out[0]=o*a+h*_,this._out[1]=i*a+s*_,this._out[2]=s*a-i*_,this._out[3]=h*a-o*_,this},o.rotateY=function(t){t*=.5;var u=this._out,o=u[0],i=u[1],s=u[2],h=u[3],_=Math.sin(t),a=Math.cos(t);return this._out[0]=o*a-s*_,this._out[1]=i*a+h*_,this._out[2]=s*a+o*_,this._out[3]=h*a-i*_,this},o.rotateZ=function(t){t*=.5;var u=this._out,o=u[0],i=u[1],s=u[2],h=u[3],_=Math.sin(t),a=Math.cos(t);return this._out[0]=o*a+i*_,this._out[1]=i*a-o*_,this._out[2]=s*a+h*_,this._out[3]=h*a-s*_,this},o.calculateW=function(){var t=this._out,u=t[0],o=t[1],i=t[2];return this._out[3]=Math.sqrt(Math.abs(1-u*u-o*o-i*i)),this},o.dot=function(t){var u=this._out,o=t.value;return u[0]*o[0]+u[1]*o[1]+u[2]*o[2]+u[3]*o[3]},o.lerp=function(t,u){var o=this._out,i=o[0],s=o[1],h=o[2],_=o[3];return this._out[0]=i+u*(t.value[0]-i),this._out[1]=s+u*(t.value[1]-s),this._out[2]=h+u*(t.value[2]-h),this._out[3]=_+u*(t.value[3]-_),this},o.slerp=function(t,u,o){var i,s,h,_,a,n=t.value,e=n[0],r=n[1],l=n[2],v=n[3],M=u.value,c=M[0],f=M[1],b=M[2],m=M[3];return(s=e*c+r*f+l*b+v*m)<0&&(s=-s,c=-c,f=-f,b=-b,m=-m),1-s>1e-6?(i=Math.acos(s),h=Math.sin(i),_=Math.sin((1-o)*i)/h,a=Math.sin(o*i)/h):(_=1-o,a=o),this._out[0]=_*e+a*c,this._out[1]=_*r+a*f,this._out[2]=_*l+a*b,this._out[3]=_*v+a*m,this},o.sqlerp=function(u,o,i,s,h){return this._s1=this._s1||new t,this._s2=this._s2||new t,this._s1=this._s1.clone().slerp(u,s,h),this._s2=this._s2.clone().slerp(o,i,h),(new t).slerp(this._s1,this._s2,2*h*(1-h))},o.invert=function(){var t=this._out,u=t[0],o=t[1],i=t[2],s=t[3],h=u*u+o*o+i*i+s*s,_=h?1/h:0;return this._out[0]=-u*_,this._out[1]=-o*_,this._out[2]=-i*_,this._out[3]=s*_,this},o.conjugate=function(){return this._out[0]=-this._out[0],this._out[1]=-this._out[1],this._out[2]=-this._out[2],this},o.len=function(){var t=this._out,u=t[0],o=t[1],i=t[2],s=t[3];return Math.sqrt(u*u+o*o+i*i+s*s)},o.normalize=function(){var t=this.len();return t>0&&(this._out[0]/=t,this._out[0]/=t,this._out[0]/=t,this._out[0]/=t),this},o.toString=function(){return"quat("+this._out[0]+", "+this._out[1]+", "+this._out[2]+", "+this._out[3]+")"},o.equals=function(t){var o=this._out,i=o[0],s=o[1],h=o[2],_=o[3],a=t._out,n=a[0],e=a[1],r=a[2],l=a[3];return Math.abs(i-n)<=u.EPSILON*Math.max(1,Math.abs(i),Math.abs(n))&&Math.abs(s-e)<=u.EPSILON*Math.max(1,Math.abs(s),Math.abs(e))&&Math.abs(h-r)<=u.EPSILON*Math.max(1,Math.abs(h),Math.abs(r))&&Math.abs(_-l)<=u.EPSILON*Math.max(1,Math.abs(_),Math.abs(l))},i(t,[{key:"x",get:function(){return this._out[0]}},{key:"y",get:function(){return this._out[1]}},{key:"z",get:function(){return this._out[2]}},{key:"w",get:function(){return this._out[3]}},{key:"value",get:function(){return this._out}}]),t}(),a=function(){function t(){this._out=new Array(16),this._out[0]=1,this._out[1]=0,this._out[2]=0,this._out[3]=0,this._out[4]=0,this._out[5]=1,this._out[6]=0,this._out[7]=0,this._out[8]=0,this._out[9]=0,this._out[10]=1,this._out[11]=0,this._out[12]=0,this._out[13]=0,this._out[14]=0,this._out[15]=1}var o=t.prototype;return o.set=function(t,u,o,i,s,h,_,a,n,e,r,l,v,M,c,f){return this._out[0]=t,this._out[1]=u,this._out[2]=o,this._out[3]=i,this._out[4]=s,this._out[5]=h,this._out[6]=_,this._out[7]=a,this._out[8]=n,this._out[9]=e,this._out[10]=r,this._out[11]=l,this._out[12]=v,this._out[13]=M,this._out[14]=c,this._out[15]=f,this},o.clone=function(){var u=new t;return u.set(this._out[0],this._out[1],this._out[2],this._out[3],this._out[4],this._out[5],this._out[6],this._out[7],this._out[8],this._out[9],this._out[10],this._out[11],this._out[12],this._out[13],this._out[14],this._out[15]),u},o.identity=function(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this},o.inverseTransformation=function(){var t=this._out[0],u=this._out[1],o=this._out[2],i=this._out[4],s=this._out[5],h=this._out[6],_=this._out[8],a=this._out[9],n=this._out[10],e=this._out[12],r=this._out[13],l=this._out[14],v=-t*e-u*r-o*l,M=-i*e-s*r-h*l,c=-_*e-a*r-n*l;return this._out[0]=t,this._out[1]=i,this._out[2]=_,this._out[3]=0,this._out[4]=u,this._out[5]=s,this._out[6]=a,this._out[7]=0,this._out[8]=o,this._out[9]=h,this._out[10]=n,this._out[11]=0,this._out[12]=v,this._out[13]=M,this._out[14]=c,this._out[15]=1,this},o.invert=function(){var t=this._out,u=t[0],o=t[1],i=t[2],s=t[3],h=t[4],_=t[5],a=t[6],n=t[7],e=t[8],r=t[9],l=t[10],v=t[11],M=t[12],c=t[13],f=t[14],b=t[15],m=u*_-o*h,w=u*a-i*h,x=u*n-s*h,p=o*a-i*_,y=o*n-s*_,d=i*n-s*a,P=e*c-r*M,S=e*f-l*M,I=e*b-v*M,O=r*f-l*c,N=r*b-v*c,E=l*b-v*f,L=m*E-w*N+x*O+p*I-y*S+d*P;return L?(this._out=[(_*E-a*N+n*O)*(L=1/L),(i*N-o*E-s*O)*L,(c*d-f*y+b*p)*L,(l*y-r*d-v*p)*L,(a*I-h*E-n*S)*L,(u*E-i*I+s*S)*L,(f*x-M*d-b*w)*L,(e*d-l*x+v*w)*L,(h*N-_*I+n*P)*L,(o*I-u*N-s*P)*L,(M*y-c*x+b*m)*L,(r*x-e*y-v*m)*L,(_*S-h*O-a*P)*L,(u*O-o*S+i*P)*L,(c*w-M*p-f*m)*L,(e*p-r*w+l*m)*L],this):null},o.transpose=function(){var t=this._out[1],u=this._out[2],o=this._out[3],i=this._out[6],s=this._out[7],h=this._out[11];return this._out[1]=this._out[4],this._out[2]=this._out[8],this._out[3]=this._out[12],this._out[4]=t,this._out[6]=this._out[9],this._out[7]=this._out[13],this._out[8]=u,this._out[9]=i,this._out[11]=this._out[14],this._out[12]=o,this._out[13]=s,this._out[14]=h,this},o.adjoint=function(){var t=this._out,u=t[0],o=t[1],i=t[2],s=t[3],h=t[4],_=t[5],a=t[6],n=t[7],e=t[8],r=t[9],l=t[10],v=t[11],M=t[12],c=t[13],f=t[14],b=t[15];return this._out[0]=_*(l*b-v*f)-r*(a*b-n*f)+c*(a*v-n*l),this._out[1]=-(o*(l*b-v*f)-r*(i*b-s*f)+c*(i*v-s*l)),this._out[2]=o*(a*b-n*f)-_*(i*b-s*f)+c*(i*n-s*a),this._out[3]=-(o*(a*v-n*l)-_*(i*v-s*l)+r*(i*n-s*a)),this._out[4]=-(h*(l*b-v*f)-e*(a*b-n*f)+M*(a*v-n*l)),this._out[5]=u*(l*b-v*f)-e*(i*b-s*f)+M*(i*v-s*l),this._out[6]=-(u*(a*b-n*f)-h*(i*b-s*f)+M*(i*n-s*a)),this._out[7]=u*(a*v-n*l)-h*(i*v-s*l)+e*(i*n-s*a),this._out[8]=h*(r*b-v*c)-e*(_*b-n*c)+M*(_*v-n*r),this._out[9]=-(u*(r*b-v*c)-e*(o*b-s*c)+M*(o*v-s*r)),this._out[10]=u*(_*b-n*c)-h*(o*b-s*c)+M*(o*n-s*_),this._out[11]=-(u*(_*v-n*r)-h*(o*v-s*r)+e*(o*n-s*_)),this._out[12]=-(h*(r*f-l*c)-e*(_*f-a*c)+M*(_*l-a*r)),this._out[13]=u*(r*f-l*c)-e*(o*f-i*c)+M*(o*l-i*r),this._out[14]=-(u*(_*f-a*c)-h*(o*f-i*c)+M*(o*a-i*_)),this._out[15]=u*(_*l-a*r)-h*(o*l-i*r)+e*(o*a-i*_),this},o.determinant=function(){var t=this._out,u=t[0],o=t[1],i=t[2],s=t[3],h=t[4],_=t[5],a=t[6],n=t[7],e=t[8],r=t[9],l=t[10],v=t[11],M=t[12],c=t[13],f=t[14],b=t[15];return(u*_-o*h)*(l*b-v*f)-(u*a-i*h)*(r*b-v*c)+(u*n-s*h)*(r*f-l*c)+(o*a-i*_)*(e*b-v*M)-(o*n-s*_)*(e*f-l*M)+(i*n-s*a)*(e*c-r*M)},o.decompose=function(){var t=(new h).set(this._out[0],this._out[1],this._out[2]).len(),u=(new h).set(this._out[4],this._out[5],this._out[6]).len(),o=(new h).set(this._out[8],this._out[9],this._out[10]).len();this.determinant()<0&&(t=-t);var i=(new h).set(this._out[12],this._out[13],this._out[14]),s=1/t,a=1/u,n=1/o,e=this.clone();return e._out[0]*=s,e._out[1]*=s,e._out[2]*=s,e._out[4]*=a,e._out[5]*=a,e._out[6]*=a,e._out[8]*=n,e._out[9]*=n,e._out[10]*=n,{position:i,quaternion:(new _).setFromRotationMatrix(this),scale:(new h).set(t,u,o)}},o.multiply=function(t){var u=this._out,o=u[0],i=u[1],s=u[2],h=u[3],_=u[4],a=u[5],n=u[6],e=u[7],r=u[8],l=u[9],v=u[10],M=u[11],c=u[12],f=u[13],b=u[14],m=u[15],w=t.value[0],x=t.value[1],p=t.value[2],y=t.value[3];return this._out[0]=w*o+x*_+p*r+y*c,this._out[1]=w*i+x*a+p*l+y*f,this._out[2]=w*s+x*n+p*v+y*b,this._out[3]=w*h+x*e+p*M+y*m,this._out[4]=(w=t.value[4])*o+(x=t.value[5])*_+(p=t.value[6])*r+(y=t.value[7])*c,this._out[5]=w*i+x*a+p*l+y*f,this._out[6]=w*s+x*n+p*v+y*b,this._out[7]=w*h+x*e+p*M+y*m,this._out[8]=(w=t.value[8])*o+(x=t.value[9])*_+(p=t.value[10])*r+(y=t.value[11])*c,this._out[9]=w*i+x*a+p*l+y*f,this._out[10]=w*s+x*n+p*v+y*b,this._out[11]=w*h+x*e+p*M+y*m,this._out[12]=(w=t.value[12])*o+(x=t.value[13])*_+(p=t.value[14])*r+(y=t.value[15])*c,this._out[13]=w*i+x*a+p*l+y*f,this._out[14]=w*s+x*n+p*v+y*b,this._out[15]=w*h+x*e+p*M+y*m,this},o.add=function(t){return this._out[0]+=t.value[0],this._out[1]+=t.value[1],this._out[2]+=t.value[2],this._out[3]+=t.value[3],this._out[4]+=t.value[4],this._out[5]+=t.value[5],this._out[6]+=t.value[6],this._out[7]+=t.value[7],this._out[8]+=t.value[8],this._out[9]+=t.value[9],this._out[10]+=t.value[10],this._out[11]+=t.value[11],this._out[12]+=t.value[12],this._out[13]+=t.value[13],this._out[14]+=t.value[14],this._out[15]+=t.value[15],this},o.translate=function(t){var u=t.value,o=u[0],i=u[1],s=u[2],h=this._out,_=h[1],a=h[2],n=h[3],e=h[5],r=h[6],l=h[7],v=h[9],M=h[10],c=h[11],f=h[13],b=h[14],m=h[15];return this._out[12]=h[0]*o+h[4]*i+h[8]*s+h[12],this._out[13]=_*o+e*i+v*s+f,this._out[14]=a*o+r*i+M*s+b,this._out[15]=n*o+l*i+c*s+m,this},o.scale=function(t){var u=t.value,o=u[0],i=u[1],s=u[2];return this._out[0]*=o,this._out[1]*=o,this._out[2]*=o,this._out[3]*=o,this._out[4]*=i,this._out[5]*=i,this._out[6]*=i,this._out[7]*=i,this._out[8]*=s,this._out[9]*=s,this._out[10]*=s,this._out[11]*=s,this},o.rotate=function(t,o){var i=this.value,s=i[0],h=i[1],_=i[2],a=i[3],n=i[4],e=i[5],r=i[6],l=i[7],v=i[8],M=i[9],c=i[10],f=i[11],b=o.value,m=b[0],w=b[1],x=b[2],p=o.len();if(Math.abs(p)<u.EPSILON)throw new Error("旋转角度过小");var y=1/p;m*=y,w*=y,x*=y;var d=Math.sin(t),P=Math.cos(t),S=1-P,I=m*m*S+P,O=w*m*S+x*d,N=x*m*S-w*d,E=m*w*S-x*d,L=w*w*S+P,g=x*w*S+m*d,q=m*x*S+w*d,z=w*x*S-m*d,A=x*x*S+P;return this._out[0]=s*I+n*O+v*N,this._out[1]=h*I+e*O+M*N,this._out[2]=_*I+r*O+c*N,this._out[3]=a*I+l*O+f*N,this._out[4]=s*E+n*L+v*g,this._out[5]=h*E+e*L+M*g,this._out[6]=_*E+r*L+c*g,this._out[7]=a*E+l*L+f*g,this._out[8]=s*q+n*z+v*A,this._out[9]=h*q+e*z+M*A,this._out[10]=_*q+r*z+c*A,this._out[11]=a*q+l*z+f*A,this},o.rotateX=function(t){var u=Math.sin(t),o=Math.cos(t),i=this._out[4],s=this._out[5],h=this._out[6],_=this._out[7],a=this._out[8],n=this._out[9],e=this._out[10],r=this._out[11];return this._out[4]=i*o+a*u,this._out[5]=s*o+n*u,this._out[6]=h*o+e*u,this._out[7]=_*o+r*u,this._out[8]=a*o-i*u,this._out[9]=n*o-s*u,this._out[10]=e*o-h*u,this._out[11]=r*o-_*u,this},o.rotateY=function(t){var u=Math.sin(t),o=Math.cos(t),i=this._out[0],s=this._out[1],h=this._out[2],_=this._out[3],a=this._out[8],n=this._out[9],e=this._out[10],r=this._out[11];return this._out[0]=i*o-a*u,this._out[1]=s*o-n*u,this._out[2]=h*o-e*u,this._out[3]=_*o-r*u,this._out[8]=i*u+a*o,this._out[9]=s*u+n*o,this._out[10]=h*u+e*o,this._out[11]=_*u+r*o,this},o.rotateZ=function(t){var u=Math.sin(t),o=Math.cos(t),i=this._out[0],s=this._out[1],h=this._out[2],_=this._out[3],a=this._out[4],n=this._out[5],e=this._out[6],r=this._out[7];return this._out[0]=i*o+a*u,this._out[1]=s*o+n*u,this._out[2]=h*o+e*u,this._out[3]=_*o+r*u,this._out[4]=a*o-i*u,this._out[5]=n*o-s*u,this._out[6]=e*o-h*u,this._out[7]=r*o-_*u,this},t.fromVec3Translation=function(u){var o=u.value,i=o[0],s=o[1],h=o[2],_=new t;return _.set(1,0,0,0,0,1,0,0,0,0,1,0,i,s,h,1),_},t.fromMat3Translation=function(u,o){return(new t).set(u._out[0],u._out[3],u._out[6],o.x,u._out[1],u._out[4],u._out[7],o.y,u._out[2],u._out[5],u._out[8],o.z,0,0,0,1)},t.fromScaling=function(u){var o=u.value,i=o[0],s=o[1],h=o[2],_=new t;return _.set(i,0,0,0,0,s,0,0,0,0,h,0,0,0,0,1),_},t.fromRotation=function(o,i){var s,h,_,a=i.value,n=a[0],e=a[1],r=a[2],l=i.len(),v=new t;if(l<u.EPSILON)throw new Error("构造错误");return n*=l=1/l,e*=l,r*=l,s=Math.sin(o),h=Math.cos(o),v.set(n*n*(_=1-h)+h,e*n*_+r*s,r*n*_-e*s,0,n*e*_-r*s,e*e*_+h,r*e*_+n*s,0,n*r*_+e*s,e*r*_-n*s,r*r*_+h,0,0,0,0,1),v},t.fromXRotation=function(u){var o=new t,i=Math.sin(u),s=Math.cos(u);return o.set(1,0,0,0,0,s,i,0,0,-i,s,0,0,0,0,1),o},t.fromYRotation=function(u){var o=new t,i=Math.sin(u),s=Math.cos(u);return o.set(s,0,-i,0,0,1,0,0,i,0,s,0,0,0,0,1),o},t.fromZRotation=function(u){var o=new t,i=Math.sin(u),s=Math.cos(u);return o.set(s,i,0,0,-i,s,0,0,0,0,1,0,0,0,0,1),o},o.getTranslation=function(){var t=new h;return t.set(this._out[12],this._out[13],this._out[14]),t},o.setTranslation=function(t){return this._out[12]=t.x,this._out[13]=t.y,this._out[14]=t.z,this},t.fromRotationTranslation=function(u,o){var i=new t,s=u.value,h=s[0],_=s[1],a=s[2],n=s[3],e=o.value,r=h+h,l=_+_,v=a+a,M=h*r,c=h*l,f=h*v,b=_*l,m=_*v,w=a*v,x=n*r,p=n*l,y=n*v;return i.set(1-(b+w),c+y,f-p,0,c-y,1-(M+w),m+x,0,f+p,m-x,1-(M+b),0,e[0],e[1],e[2],1),i},o.getScaling=function(){var t=this._out[0],u=this._out[1],o=this._out[2],i=this._out[4],s=this._out[5],_=this._out[6],a=this._out[8],n=this._out[9],e=this._out[10],r=Math.sqrt(t*t+u*u+o*o),l=Math.sqrt(i*i+s*s+_*_),v=Math.sqrt(a*a+n*n+e*e);return(new h).set(r,l,v)},o.getRotation=function(){var t,u,o,i,s=0,h=new _,a=this._out[0]+this._out[5]+this._out[10];return a>0?(i=.25*(s=2*Math.sqrt(a+1)),t=(this._out[6]-this._out[9])/s,u=(this._out[8]-this._out[2])/s,o=(this._out[1]-this._out[4])/s):this._out[0]>this._out[5]&&this._out[0]>this._out[10]?(s=2*Math.sqrt(1+this._out[0]-this._out[5]-this._out[10]),i=(this._out[6]-this._out[9])/s,t=.25*s,u=(this._out[1]+this._out[4])/s,o=(this._out[8]+this._out[2])/s):this._out[5]>this._out[10]?(s=2*Math.sqrt(1+this._out[5]-this._out[0]-this._out[10]),i=(this._out[8]-this._out[2])/s,t=(this._out[1]+this._out[4])/s,u=.25*s,o=(this._out[6]+this._out[9])/s):(s=2*Math.sqrt(1+this._out[10]-this._out[0]-this._out[5]),i=(this._out[1]-this._out[4])/s,t=(this._out[8]+this._out[2])/s,u=(this._out[6]+this._out[9])/s,o=.25*s),h.set(t,u,o,i),h},t.fromRotationTranslationScale=function(u,o,i){var s=new t,h=u.value,_=h[0],a=h[1],n=h[2],e=h[3],r=o.value,l=i.value,v=l[0],M=l[1],c=l[2],f=_+_,b=a+a,m=n+n,w=_*f,x=_*b,p=_*m,y=a*b,d=a*m,P=n*m,S=e*f,I=e*b,O=e*m;return s.set((1-(y+P))*v,(x+O)*v,(p-I)*v,0,(x-O)*M,(1-(w+P))*M,(d+S)*M,0,(p+I)*c,(d-S)*c,(1-(w+y))*c,0,r[0],r[1],r[2],1),s},t.fromRotationTranslationScaleOrigin=function(u,o,i,s){var h=new t,_=u.value,a=_[0],n=_[1],e=_[2],r=_[3],l=o.value,v=l[0],M=l[1],c=l[2],f=s.value,b=f[0],m=f[1],w=f[2],x=o.value,p=a+a,y=n+n,d=e+e,P=a*p,S=a*y,I=a*d,O=n*y,N=n*d,E=e*d,L=r*p,g=r*y,q=r*d,z=(1-(O+E))*v,A=(S+q)*v,k=(I-g)*v,R=(S-q)*M,D=(1-(P+E))*M,T=(N+L)*M,F=(I+g)*c,Q=(N-L)*c,V=(1-(P+O))*c;return h.set(z,A,k,0,R,D,T,0,F,Q,V,0,x[0]+b-(z*b+R*m+F*w),x[1]+m-(A*b+D*m+Q*w),x[2]+w-(k*b+T*m+V*w),1),h},t.fromQuat=function(u){var o=new t,i=u.value,s=i[0],h=i[1],_=i[2],a=i[3],n=s+s,e=h+h,r=_+_,l=s*n,v=h*n,M=h*e,c=_*n,f=_*e,b=_*r,m=a*n,w=a*e,x=a*r;return o.set(1-M-b,v+x,c-w,0,v-x,1-l-b,f+m,0,c+w,f-m,1-l-M,0,0,0,0,1),o},t.frustum=function(u,o,i,s,h,_){var a=new t,n=1/(o-u),e=1/(s-i),r=1/(h-_);return a.set(2*h*n,0,0,0,0,2*h*e,0,0,(o+u)*n,(s+i)*e,(_+h)*r,-1,0,0,_*h*2*r,0),a},t.perspective=function(u,o,i,s){var h=new t,_=Math.tan(.5*(Math.PI-u)),a=1/(i-s);return h.set(_/o,0,0,0,0,_,0,0,0,0,(s+i)*a,-1,0,0,2*s*i*a,0),h},t.perspectiveN11=function(u,o,i,s){var h=new t,_=1/Math.tan(u/2),a=1/(i-s);return h.set(_/o,0,0,0,0,_,0,0,0,0,(s+i)*a,-1,0,0,2*s*i*a,0),h},t.perspective01=function(u,o,i,s){var h=new t,_=1/Math.tan(u/2),a=1/(i-s);return h.set(_/o,0,0,0,0,_,0,0,0,0,s*a,-1,0,0,s*i*a,0),h},t.perspectiveFromFieldOfView=function(u,o,i,s,h,_){var a=new t,n=Math.tan(u*Math.PI/180),e=Math.tan(o*Math.PI/180),r=Math.tan(i*Math.PI/180),l=Math.tan(s*Math.PI/180),v=2/(r+l),M=2/(n+e);return a.set(v,0,0,0,0,M,0,0,-(r-l)*v*.5,(n-e)*M*.5,_/(h-_),-1,0,0,_*h/(h-_),0),a},t.ortho=function(u,o,i,s,h,_){var a=new t,n=1/(u-o),e=1/(i-s),r=1/(h-_);return a.set(-2*n,0,0,0,0,-2*e,0,0,0,0,2*r,0,(u+o)*n,(s+i)*e,(_+h)*r,1),a},o.lookAt=function(t,u,o){var i=t.clone().sub(u).normalize(),s=o.clone().cross(i),h=i.clone().cross(s);return this.set(s.value[0],s.value[1],s.value[2],0,h.value[0],h.value[1],h.value[2],0,i.value[0],i.value[1],i.value[2],0,t.value[0],t.value[1],t.value[2],1),this},o.toString=function(){return"mat4("+this._out[0]+", "+this._out[1]+", "+this._out[2]+", "+this._out[3]+", "+this._out[4]+", "+this._out[5]+", "+this._out[6]+", "+this._out[7]+", "+this._out[8]+", "+this._out[9]+", "+this._out[10]+", "+this._out[11]+", "+this._out[12]+", "+this._out[13]+", "+this._out[14]+", "+this._out[15]+")"},o.forb=function(){return Math.sqrt(Math.pow(this._out[0],2)+Math.pow(this._out[1],2)+Math.pow(this._out[2],2)+Math.pow(this._out[3],2)+Math.pow(this._out[4],2)+Math.pow(this._out[5],2)+Math.pow(this._out[6],2)+Math.pow(this._out[7],2)+Math.pow(this._out[8],2)+Math.pow(this._out[9],2)+Math.pow(this._out[10],2)+Math.pow(this._out[11],2)+Math.pow(this._out[12],2)+Math.pow(this._out[13],2)+Math.pow(this._out[14],2)+Math.pow(this._out[15],2))},o.sub=function(t){return this._out[0]-=t.value[0],this._out[1]-=t.value[1],this._out[2]-=t.value[2],this._out[3]-=t.value[3],this._out[4]-=t.value[4],this._out[5]-=t.value[5],this._out[6]-=t.value[6],this._out[7]-=t.value[7],this._out[8]-=t.value[8],this._out[9]-=t.value[9],this._out[10]-=t.value[10],this._out[11]-=t.value[11],this._out[12]-=t.value[12],this._out[13]-=t.value[13],this._out[14]-=t.value[14],this._out[15]-=t.value[15],this},o.equals=function(t){var o=this._out,i=o[0],s=o[1],h=o[2],_=o[3],a=o[4],n=o[5],e=o[6],r=o[7],l=o[8],v=o[9],M=o[10],c=o[11],f=o[12],b=o[13],m=o[14],w=o[15],x=t.value,p=x[0],y=x[1],d=x[2],P=x[3],S=x[4],I=x[5],O=x[6],N=x[7],E=x[8],L=x[9],g=x[10],q=x[11],z=x[12],A=x[13],k=x[14],R=x[15];return Math.abs(i-p)<=u.EPSILON*Math.max(1,Math.abs(i),Math.abs(p))&&Math.abs(s-y)<=u.EPSILON*Math.max(1,Math.abs(s),Math.abs(y))&&Math.abs(h-d)<=u.EPSILON*Math.max(1,Math.abs(h),Math.abs(d))&&Math.abs(_-P)<=u.EPSILON*Math.max(1,Math.abs(_),Math.abs(P))&&Math.abs(a-S)<=u.EPSILON*Math.max(1,Math.abs(a),Math.abs(S))&&Math.abs(n-I)<=u.EPSILON*Math.max(1,Math.abs(n),Math.abs(I))&&Math.abs(e-O)<=u.EPSILON*Math.max(1,Math.abs(e),Math.abs(O))&&Math.abs(r-N)<=u.EPSILON*Math.max(1,Math.abs(r),Math.abs(N))&&Math.abs(l-E)<=u.EPSILON*Math.max(1,Math.abs(l),Math.abs(E))&&Math.abs(v-L)<=u.EPSILON*Math.max(1,Math.abs(v),Math.abs(L))&&Math.abs(M-g)<=u.EPSILON*Math.max(1,Math.abs(M),Math.abs(g))&&Math.abs(c-q)<=u.EPSILON*Math.max(1,Math.abs(c),Math.abs(q))&&Math.abs(f-z)<=u.EPSILON*Math.max(1,Math.abs(f),Math.abs(z))&&Math.abs(b-A)<=u.EPSILON*Math.max(1,Math.abs(b),Math.abs(A))&&Math.abs(m-k)<=u.EPSILON*Math.max(1,Math.abs(m),Math.abs(k))&&Math.abs(w-R)<=u.EPSILON*Math.max(1,Math.abs(w),Math.abs(R))},i(t,[{key:"value",get:function(){return this._out}}]),t}(),n=function(){function t(){this._out=new Array(2),this._out[0]=0,this._out[1]=0}t.random=function(o){void 0===o&&(o=1),o=o||1;var i=2*u.RANDOM()*Math.PI;return(new t).set(Math.cos(i)*o,Math.sin(i)*o)};var o=t.prototype;return o.set=function(t,u){return this._out[0]=t,this._out[1]=u,this},o.clone=function(){var u=new t;return u.set(this._out[0],this._out[1]),u},o.add=function(t){return this._out[0]+=t._out[0],this._out[1]+=t._out[1],this},o.sub=function(t){return this._out[0]-=t._out[0],this._out[1]-=t._out[1],this},o.multiply=function(t){return this._out[0]*=t._out[0],this._out[1]*=t._out[1],this},o.divide=function(t){return this._out[0]/=t._out[0],this._out[1]/=t._out[1],this},o.ceil=function(){return this._out[0]=Math.ceil(this._out[0]),this._out[1]=Math.ceil(this._out[1]),this},o.floor=function(){return this._out[0]=Math.floor(this._out[0]),this._out[1]=Math.floor(this._out[1]),this},o.round=function(){return this._out[0]=Math.round(this._out[0]),this._out[1]=Math.round(this._out[1]),this},o.min=function(t){return this._out[0]=Math.min(this._out[0],t._out[0]),this._out[1]=Math.min(this._out[1],t._out[1]),this},o.max=function(t){return this._out[0]=Math.max(this._out[0],t._out[0]),this._out[1]=Math.max(this._out[1],t._out[1]),this},o.scale=function(t){return this._out[0]*=t,this._out[1]*=t,this},o.distance=function(t){var u=this._out[0]-t._out[0],o=this._out[1]-t._out[1];return Math.sqrt(u*u+o*o)},o.manhattanDistance=function(t){return Math.abs(this._out[0]-t._out[0])+Math.abs(this._out[1]-t._out[1])},o.chebyshevDistance=function(t){var u=Math.abs(this._out[0]-t._out[0]),o=Math.abs(this._out[1]-t._out[1]);return Math.max(u,o)},o.len=function(){return this.distance(new t)},o.negate=function(){return this._out[0]=-this._out[0],this._out[1]=-this._out[1],this},o.inverse=function(){return this._out[0]=1/this._out[0],this._out[1]=1/this._out[1],this},o.normalize=function(){var t=this.len();return t>0&&(this._out[0]/=t,this._out[1]/=t),this},o.dot=function(t){return this._out[0]*t._out[0]+this._out[1]*t._out[1]},o.lerp=function(t,u){var o=this._out,i=o[0],s=o[1],h=t._out,_=h[1];return this._out[0]=i+u*(h[0]-i),this._out[1]=s+u*(_-s),this},o.toString=function(){return"vec2("+this._out[0]+","+this._out[1]+")"},o.transformMat3=function(t){var u=this._out,o=u[0],i=u[1];return this._out[0]=t._out[0]*o+t._out[3]*i+t._out[6],this._out[1]=t._out[1]*o+t._out[4]*i+t._out[7],this},o.transformMat4=function(t){var u=this._out,o=u[0],i=u[1];return this._out[0]=t.value[0]*o+t.value[4]*i+t.value[5],this._out[1]=t.value[1]*o+t.value[5]*i+t.value[13],this},o.equals=function(t){var o=this._out,i=o[0],s=o[1],h=t._out,_=h[0],a=h[1];return Math.abs(i-_)<=u.EPSILON*Math.max(1,Math.abs(i),Math.abs(_))&&Math.abs(s-a)<=u.EPSILON*Math.max(1,Math.abs(s),Math.abs(a))},i(t,[{key:"x",get:function(){return this._out[0]}},{key:"y",get:function(){return this._out[1]}},{key:"value",get:function(){return this._out}}]),t}(),e=function(){function t(){this._out=new Array(4),this._out[0]=0,this._out[1]=0,this._out[2]=0,this._out[3]=0}t.random=function(o){void 0===o&&(o=1),o=o||1;var i=new t;return i.set(u.RANDOM(),u.RANDOM(),u.RANDOM(),u.RANDOM()).normalize().scale(o),i};var o=t.prototype;return o.set=function(t,u,o,i){return this._out[0]=t,this._out[1]=u,this._out[2]=o,this._out[3]=i,this},o.clone=function(){var u=new t;return u.set(this._out[0],this._out[1],this._out[2],this._out[3]),u},o.add=function(t){return this._out[0]+=t.value[0],this._out[1]+=t.value[1],this._out[2]+=t.value[2],this._out[3]+=t.value[3],this},o.sub=function(t){return this._out[0]-=t.value[0],this._out[1]-=t.value[1],this._out[2]-=t.value[2],this._out[3]-=t.value[3],this},o.multiply=function(t){return this._out[0]*=t.value[0],this._out[1]*=t.value[1],this._out[2]*=t.value[2],this._out[3]*=t.value[3],this},o.divide=function(t){return this._out[0]/=t.value[0],this._out[1]/=t.value[1],this._out[2]/=t.value[2],this._out[3]/=t.value[3],this},o.ceil=function(){return this._out[0]=Math.ceil(this._out[0]),this._out[1]=Math.ceil(this._out[1]),this._out[2]=Math.ceil(this._out[2]),this._out[3]=Math.ceil(this._out[3]),this},o.round=function(){return this._out[0]=Math.round(this._out[0]),this._out[1]=Math.round(this._out[1]),this._out[2]=Math.round(this._out[2]),this._out[3]=Math.round(this._out[3]),this},o.floor=function(){return this._out[0]=Math.floor(this._out[0]),this._out[1]=Math.floor(this._out[1]),this._out[2]=Math.floor(this._out[2]),this._out[3]=Math.floor(this._out[3]),this},o.min=function(t){return this._out[0]=Math.min(this._out[0],t.value[0]),this._out[1]=Math.min(this._out[1],t.value[1]),this._out[2]=Math.min(this._out[2],t.value[2]),this._out[3]=Math.min(this._out[3],t.value[3]),this},o.max=function(t){return this._out[0]=Math.max(this._out[0],t.value[0]),this._out[1]=Math.max(this._out[1],t.value[1]),this._out[2]=Math.max(this._out[2],t.value[2]),this._out[3]=Math.max(this._out[3],t._out[3]),this},o.scale=function(t){return this._out[0]*=t,this._out[1]*=t,this._out[2]*=t,this._out[3]*=t,this},o.distance=function(t){var u=this._out,o=t._out,i=u[0]-o[0],s=u[1]-o[1],h=u[2]-o[2],_=u[3]-o[3];return Math.sqrt(i*i+s*s+h*h+_*_)},o.len=function(){return this.distance(new t)},o.negate=function(){return this._out[0]=-this._out[0],this._out[1]=-this._out[1],this._out[2]=-this._out[2],this._out[3]=-this._out[3],this},o.inverse=function(){this._out[0]=1/this._out[0],this._out[1]=1/this._out[1],this._out[2]=1/this._out[2],this._out[3]=1/this._out[3]},o.normalize=function(){var t=this.len();return t>0&&(this._out[0]/=t,this._out[1]/=t,this._out[2]/=t,this._out[3]/=t),this},o.dot=function(t){var u=this.value,o=t.value;return u[0]*o[0]+u[1]*o[1]+u[2]*o[2]+u[3]*o[3]},o.lerp=function(t,u,o){var i=t.value,s=i[0],h=i[1],_=i[2],a=i[3],n=u.value,e=n[1],r=n[2],l=n[3];return this._out[0]=s+o*(n[0]-s),this._out[1]=h+o*(e-h),this._out[2]=_+o*(r-_),this._out[3]=a+o*(l-a),this},o.transformMat4=function(t){var u=this._out,o=u[0],i=u[1],s=u[2],h=u[3];return this._out[0]=t.value[0]*o+t.value[4]*i+t.value[8]*s+t.value[12]*h,this._out[1]=t.value[1]*o+t.value[5]*i+t.value[9]*s+t.value[13]*h,this._out[2]=t.value[2]*o+t.value[6]*i+t.value[10]*s+t.value[14]*h,this._out[3]=t.value[3]*o+t.value[7]*i+t.value[11]*s+t.value[15]*h,this},o.transformQuat=function(t){var u=this._out,o=u[0],i=u[1],s=u[2],h=t.value,_=h[0],a=h[1],n=h[2],e=h[3],r=e*o+a*s-n*i,l=e*i+n*o-_*s,v=e*s+_*i-a*o,M=-_*o-a*i-n*s;return this._out[0]=r*e+M*-_+l*-n-v*-a,this._out[1]=l*e+M*-a+v*-_-r*-n,this._out[2]=v*e+M*-n+r*-a-l*-_,this._out[3]=t.value[3],this},o.toString=function(){return"vec4("+this._out[0]+", "+this._out[1]+", "+this._out[2]+", "+this._out[3]+")"},o.equals=function(t){var o=this._out,i=o[0],s=o[1],h=o[2],_=o[3],a=t._out,n=a[0],e=a[1],r=a[2],l=a[3];return Math.abs(i-n)<=u.EPSILON*Math.max(1,Math.abs(i),Math.abs(n))&&Math.abs(s-e)<=u.EPSILON*Math.max(1,Math.abs(s),Math.abs(e))&&Math.abs(h-r)<=u.EPSILON*Math.max(1,Math.abs(h),Math.abs(r))&&Math.abs(_-l)<=u.EPSILON*Math.max(1,Math.abs(_),Math.abs(l))},i(t,[{key:"x",get:function(){return this._out[0]}},{key:"y",get:function(){return this._out[1]}},{key:"z",get:function(){return this._out[2]}},{key:"w",get:function(){return this._out[3]}},{key:"value",get:function(){return this._out}}]),t}();exports.GLMatrix=u,exports.Mat3=s,exports.Mat4=a,exports.Quat=_,exports.Vec2=n,exports.Vec3=h,exports.Vec4=e;


},{}],"../src/core/GeodeticCoordinate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeodeticCoordinate = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GeodeticCoordinate =
/*#__PURE__*/
function () {
  function GeodeticCoordinate(lng, lat) {
    var _this = this;

    var alt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.0;

    _classCallCheck(this, GeodeticCoordinate);

    this.toGeodetic = function () {
      return new GeodeticCoordinate(_this.lng, _this.lat, 0);
    };

    this.isGeodetic = function () {
      return _this.alt === 0;
    };

    this.lng = lng;
    this.lat = lat;
    this.alt = alt;
  }

  _createClass(GeodeticCoordinate, [{
    key: "Latitude",
    get: function get() {
      return this.lat;
    }
  }, {
    key: "Longitude",
    get: function get() {
      return this.lng;
    }
  }, {
    key: "Altitude",
    get: function get() {
      return this.alt;
    },
    set: function set(v) {
      this.alt = v;
    }
  }]);

  return GeodeticCoordinate;
}();

exports.GeodeticCoordinate = GeodeticCoordinate;
},{}],"../src/util/fixed.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tan = exports.sin = exports.log = exports.exp = exports.cos = exports.atan = void 0;

var sin = function sin(x) {
  return Math.sin(x) + 8 - 8;
};

exports.sin = sin;

var cos = function cos(x) {
  return Math.cos(x) + 8 - 8;
};

exports.cos = cos;

var log = function log(x) {
  return Math.log(x) + 8 - 8;
};

exports.log = log;

var atan = function atan(x) {
  return Math.atan(x) + 8 - 8;
};

exports.atan = atan;

var tan = function tan(x) {
  return Math.tan(x) + 8 - 8;
};

exports.tan = tan;

var exp = function exp(x) {
  return Math.exp(x) + 8 - 8;
};

exports.exp = exp;
},{}],"../src/util/physical.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SOLAR = exports.LUNAR = exports.EARTH = void 0;
var EARTH;
exports.EARTH = EARTH;

(function (EARTH) {
  EARTH[EARTH["RADIUS_X"] = 6378137] = "RADIUS_X";
  EARTH[EARTH["RADIUS_Y"] = 6378137] = "RADIUS_Y";
  EARTH[EARTH["RADIUS_Z"] = 6356752.314245179] = "RADIUS_Z";
})(EARTH || (exports.EARTH = EARTH = {}));

var LUNAR;
exports.LUNAR = LUNAR;

(function (LUNAR) {
  LUNAR[LUNAR["LUNAR_RADIUS"] = 1737400] = "LUNAR_RADIUS";
})(LUNAR || (exports.LUNAR = LUNAR = {}));

var SOLAR;
exports.SOLAR = SOLAR;

(function (SOLAR) {
  SOLAR[SOLAR["SOLAR_RADIUS"] = 695500000] = "SOLAR_RADIUS";
})(SOLAR || (exports.SOLAR = SOLAR = {}));
},{}],"../src/util/epsilon.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EPSILON = void 0;
var EPSILON;
exports.EPSILON = EPSILON;

(function (EPSILON) {
  EPSILON[EPSILON["EPSILON1"] = 0.1] = "EPSILON1";
  EPSILON[EPSILON["EPSILON7"] = 1e-7] = "EPSILON7";
  EPSILON[EPSILON["EPSILON12"] = 1e-12] = "EPSILON12";
  EPSILON[EPSILON["EPSILON14"] = 1e-14] = "EPSILON14";
})(EPSILON || (exports.EPSILON = EPSILON = {}));
},{}],"../src/core/Ellipsoid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WGS84 = exports.PSEUDOMERCATOR = exports.Ellipsoid = void 0;

var _kiwi = require("kiwi.matrix");

var _physical = require("../util/physical");

var _epsilon = require("../util/epsilon");

var _fixed = require("../util/fixed");

var _GeodeticCoordinate = require("./GeodeticCoordinate");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ellipsoid =
/*#__PURE__*/
function () {
  function Ellipsoid(x, y, z) {
    _classCallCheck(this, Ellipsoid);

    this.x = x;
    this.y = y;
    this.z = z;
    this.radii = new _kiwi.Vec3().set(x, y, z);
    this.radiiSquared = new _kiwi.Vec3().set(x * x, y * y, z * z);
    this.oneOverRadii = new _kiwi.Vec3().set(1 / x, 1 / y, 1 / z);
    this.oneOverRadiiSquared = new _kiwi.Vec3().set(1 / (x * x), 1 / (y * y), 1 / (z * z));
    this.oneOverMaximumRadius = 1 / this.MaximumRadius;
  }

  _createClass(Ellipsoid, [{
    key: "RadiiSquared",
    get: function get() {
      return this.radiiSquared;
    }
  }, {
    key: "Radii",
    get: function get() {
      return this.radii;
    }
  }, {
    key: "OneOverRadii",
    get: function get() {
      return this.oneOverRadii;
    }
  }, {
    key: "MaximumRadius",
    get: function get() {
      return Math.max(this.x, this.y, this.z);
    }
  }, {
    key: "OneOverMaximumRadius",
    get: function get() {
      return this.oneOverMaximumRadius;
    }
  }, {
    key: "geodeticSurfaceNormalCartographic",
    value: function geodeticSurfaceNormalCartographic(cartographic) {
      var longitude = _kiwi.GLMatrix.toRadian(cartographic.Longitude),
          latitude = _kiwi.GLMatrix.toRadian(cartographic.Latitude),
          cosLatitude = (0, _fixed.cos)(latitude);

      var x = cosLatitude * (0, _fixed.cos)(longitude),
          y = cosLatitude * (0, _fixed.sin)(longitude),
          z = (0, _fixed.sin)(latitude);
      return new _kiwi.Vec3().set(x, y, z);
    }
  }, {
    key: "geodeticSurfaceNormal",
    value: function geodeticSurfaceNormal(cartesian) {
      var oneOverRadiiSquared = this.oneOverRadiiSquared;
      var result = cartesian.clone().multiply(oneOverRadiiSquared);
      return result.normalize();
    }
  }, {
    key: "scaleToGeodeticSurface",
    value: function scaleToGeodeticSurface(position) {
      var positionX = position.x;
      var positionY = position.y;
      var positionZ = position.z;
      var oneOverRadii = this.oneOverRadii;
      var oneOverRadiiX = oneOverRadii.x;
      var oneOverRadiiY = oneOverRadii.y;
      var oneOverRadiiZ = oneOverRadii.z;
      var x2 = positionX * positionX * oneOverRadiiX * oneOverRadiiX;
      var y2 = positionY * positionY * oneOverRadiiY * oneOverRadiiY;
      var z2 = positionZ * positionZ * oneOverRadiiZ * oneOverRadiiZ;
      var squaredNorm = x2 + y2 + z2;
      var ratio = Math.sqrt(1.0 / squaredNorm);
      var intersection = position.clone().scale(ratio);

      if (squaredNorm < _epsilon.EPSILON.EPSILON1) {
        return !isFinite(ratio) ? undefined : intersection.clone();
      }

      var oneOverRadiiSquared = this.oneOverRadiiSquared;
      var oneOverRadiiSquaredX = oneOverRadiiSquared.x;
      var oneOverRadiiSquaredY = oneOverRadiiSquared.y;
      var oneOverRadiiSquaredZ = oneOverRadiiSquared.z;
      var gradient = new _kiwi.Vec3().set(intersection.x * oneOverRadiiSquaredX * 2.0, intersection.y * oneOverRadiiSquaredY * 2.0, intersection.z * oneOverRadiiSquaredZ * 2.0);
      var lambda = (1.0 - ratio) * position.len() / (0.5 * gradient.len());
      var correction = 0.0;
      var func;
      var denominator;
      var xMultiplier;
      var yMultiplier;
      var zMultiplier;
      var xMultiplier2;
      var yMultiplier2;
      var zMultiplier2;
      var xMultiplier3;
      var yMultiplier3;
      var zMultiplier3;

      do {
        lambda -= correction;
        xMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredX);
        yMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredY);
        zMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredZ);
        xMultiplier2 = xMultiplier * xMultiplier;
        yMultiplier2 = yMultiplier * yMultiplier;
        zMultiplier2 = zMultiplier * zMultiplier;
        xMultiplier3 = xMultiplier2 * xMultiplier;
        yMultiplier3 = yMultiplier2 * yMultiplier;
        zMultiplier3 = zMultiplier2 * zMultiplier;
        func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1.0;
        denominator = x2 * xMultiplier3 * oneOverRadiiSquaredX + y2 * yMultiplier3 * oneOverRadiiSquaredY + z2 * zMultiplier3 * oneOverRadiiSquaredZ;
        var derivative = -2.0 * denominator;
        correction = func / derivative;
      } while (Math.abs(func) > _epsilon.EPSILON.EPSILON12);

      return new _kiwi.Vec3().set(positionX * xMultiplier, positionY * yMultiplier, positionZ * zMultiplier);
    }
  }, {
    key: "spaceToGeographic",
    value: function spaceToGeographic(spaceCoord) {
      var p = this.scaleToGeodeticSurface(spaceCoord);
      var n = this.geodeticSurfaceNormal(p);
      var h = spaceCoord.clone().sub(p);
      var longitude = Math.atan2(n.y, n.x);
      var latitude = Math.asin(n.z);
      var height = Math.sign(h.clone().dot(spaceCoord)) * h.len();
      return new _GeodeticCoordinate.GeodeticCoordinate(_kiwi.GLMatrix.toDegree(longitude), _kiwi.GLMatrix.toDegree(latitude), height);
    }
  }, {
    key: "geographicToSpace",
    value: function geographicToSpace(geographic) {
      var radiiSquared = this.radiiSquared,
          n = this.geodeticSurfaceNormalCartographic(geographic),
          k = radiiSquared.clone().multiply(n);
      var gamma = Math.sqrt(n.clone().dot(k));
      k.scale(1 / gamma);
      n.scale(geographic.Altitude);
      return k.add(n);
    }
  }]);

  return Ellipsoid;
}();

exports.Ellipsoid = Ellipsoid;
var WGS84 = new Ellipsoid(_physical.EARTH.RADIUS_X, _physical.EARTH.RADIUS_Y, _physical.EARTH.RADIUS_Z);
exports.WGS84 = WGS84;
var semimajorAxis = Math.max(_physical.EARTH.RADIUS_X, _physical.EARTH.RADIUS_Y, _physical.EARTH.RADIUS_Z);
var PSEUDOMERCATOR = new Ellipsoid(semimajorAxis, semimajorAxis, semimajorAxis);
exports.PSEUDOMERCATOR = PSEUDOMERCATOR;
},{"kiwi.matrix":"../node_modules/kiwi.matrix/dist/bundle.js","../util/physical":"../src/util/physical.ts","../util/epsilon":"../src/util/epsilon.ts","../util/fixed":"../src/util/fixed.ts","./GeodeticCoordinate":"../src/core/GeodeticCoordinate.ts"}],"../src/core/Projection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebMercatorProjection = exports.Projection = void 0;

var _kiwi = require("kiwi.matrix");

var _GeodeticCoordinate = require("./GeodeticCoordinate");

var _fixed = require("../util/fixed");

var _Ellipsoid = require("./Ellipsoid");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Projection =
/*#__PURE__*/
function () {
  function Projection(ellipsoid) {
    _classCallCheck(this, Projection);

    this.ellipsoid = ellipsoid;
    this.semimajorAxis = this.ellipsoid.MaximumRadius;
    this.oneOverSemimajorAxis = 1.0 / this.semimajorAxis;
  }

  _createClass(Projection, [{
    key: "Ellipsoid",
    get: function get() {
      return this.ellipsoid;
    }
  }]);

  return Projection;
}();

exports.Projection = Projection;

var WebMercatorProjection =
/*#__PURE__*/
function (_Projection) {
  _inherits(WebMercatorProjection, _Projection);

  var _super = _createSuper(WebMercatorProjection);

  function WebMercatorProjection() {
    var _this;

    _classCallCheck(this, WebMercatorProjection);

    _this = _super.call(this, _Ellipsoid.PSEUDOMERCATOR);
    _this.maximumLatitude = 85.0511287798;
    _this.maxZoom = 23;
    _this.resolutions = [];
    _this.tilePixelSize = 256;
    var resolutions = [];
    var d = 2 * _this.semimajorAxis * Math.PI;

    for (var i = 0; i < _this.maxZoom; i++) {
      resolutions[i] = d / (_this.tilePixelSize * Math.pow(2, i));
    }

    _this.resolutions = resolutions;
    return _this;
  }

  _createClass(WebMercatorProjection, [{
    key: "mercatorAngleToGeodeticLatitude",
    value: function mercatorAngleToGeodeticLatitude(mercatorAngle) {
      return Math.PI / 2 - 2.0 * (0, _fixed.atan)((0, _fixed.exp)(-mercatorAngle));
    }
  }, {
    key: "geodeticLatitudeToMercatorAngle",
    value: function geodeticLatitudeToMercatorAngle(latitude) {
      var maximumLatitude = this.maximumLatitude;
      if (latitude > maximumLatitude) latitude = maximumLatitude;else if (latitude < -maximumLatitude) latitude = -maximumLatitude;
      var sinLatitude = (0, _fixed.sin)(latitude);
      return 0.5 * (0, _fixed.log)((1.0 + sinLatitude) / (1.0 - sinLatitude));
    }
  }, {
    key: "project",
    value: function project(geographic) {
      var semimajorAxis = this.semimajorAxis;
      var x = _kiwi.GLMatrix.toRadian(geographic.Longitude) * semimajorAxis,
          y = this.geodeticLatitudeToMercatorAngle(_kiwi.GLMatrix.toRadian(geographic.Latitude)) * semimajorAxis,
          z = geographic.Altitude;
      return new _kiwi.Vec3().set(x, y, z);
    }
  }, {
    key: "unproject",
    value: function unproject(v3) {
      var oneOverEarthSemimajorAxis = this.oneOverSemimajorAxis,
          longitude = v3.x * oneOverEarthSemimajorAxis,
          latitude = this.mercatorAngleToGeodeticLatitude(v3.y * oneOverEarthSemimajorAxis),
          height = v3.z;
      return new _GeodeticCoordinate.GeodeticCoordinate(_kiwi.GLMatrix.toDegree(longitude), _kiwi.GLMatrix.toDegree(latitude), height);
    }
  }, {
    key: "getResolution",
    value: function getResolution(zoomLevel) {
      return this.resolutions[zoomLevel];
    }
  }, {
    key: "getMaxZoomResolution",
    value: function getMaxZoomResolution() {
      var maxZoom = this.maxZoom - 1;
      return this.resolutions[maxZoom];
    }
  }]);

  return WebMercatorProjection;
}(Projection);

exports.WebMercatorProjection = WebMercatorProjection;
},{"kiwi.matrix":"../node_modules/kiwi.matrix/dist/bundle.js","./GeodeticCoordinate":"../src/core/GeodeticCoordinate.ts","../util/fixed":"../src/util/fixed.ts","./Ellipsoid":"../src/core/Ellipsoid.ts"}],"../src/globe/Globe.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Globe = void 0;

var _browser = require("../util/browser");

var _isString = require("../util/isString");

var _EventEmitter2 = require("../core/EventEmitter");

var _Projection = require("../core/Projection");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Globe =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Globe, _EventEmitter);

  var _super = _createSuper(Globe);

  function Globe(opts) {
    var _this;

    _classCallCheck(this, Globe);

    _this = _super.call(this);
    _this.sketchpads = [];

    _this.initCavnasAndCamera = function () {
      var c = _this.origin.center,
          r = _this.devicePixelRatio;
      var w = _this.width,
          h = _this.height,
          rw = r * w,
          rh = r * h;
      _this.canvas.width = rw;
      _this.canvas.height = rh;
      _this.canvas.style.width = "".concat(w, "px");
      _this.canvas.style.height = "".concat(h, "px");

      _this.registerCamera(c);
    };

    _this.initHooks = function () {
      var _a;

      (_a = Globe.hooks) === null || _a === void 0 ? void 0 : _a.forEach(function (hook) {
        var func = hook.func,
            args = hook.args;
        func.apply(_assertThisInitialized(_this), args);
      });
    };

    _this.initAuxTools = function () {
      _this.EnableCursorAuxTool();
    };

    _this.add = function (skpd) {
      _this.sketchpads.push(skpd);

      skpd.attach(_assertThisInitialized(_this));

      _this.updateQuadtreeTileByDistanceError();
    };

    _this.canvas = (0, _isString.isString)(opts.canvas) ? document.getElementById(opts.canvas) : opts.canvas;
    _this.devicePixelRatio = opts.devicePixelRatio || _browser.browser.devicePixelRatio || 1.0;
    _this.width = opts.width;
    _this.height = opts.height;
    _this.prjection = new _Projection.WebMercatorProjection();
    _this.ellipsoid = _this.prjection.Ellipsoid;
    _this.origin = {
      center: opts.coordinate.toGeodetic(),
      zoom: opts.zoom,
      zoomMax: opts.zoomMax || 20,
      zoomMin: opts.zoomMin || 0
    };

    _this.initCavnasAndCamera();

    _this.initHooks();

    _this.initAuxTools();

    return _this;
  }

  _createClass(Globe, [{
    key: "Origin",
    get: function get() {
      return this.origin;
    }
  }, {
    key: "Canvas",
    get: function get() {
      return this.canvas;
    }
  }, {
    key: "Ellipsoid",
    get: function get() {
      return this.ellipsoid;
    }
  }, {
    key: "MaximumRadius",
    get: function get() {
      return this.ellipsoid.MaximumRadius;
    }
  }, {
    key: "Zoom",
    get: function get() {
      return this._state_quadtree_.level;
    }
  }, {
    key: "Width",
    get: function get() {
      return this.width;
    }
  }, {
    key: "Height",
    get: function get() {
      return this.height;
    }
  }, {
    key: "DevicePixelRatio",
    get: function get() {
      return this.devicePixelRatio;
    }
  }, {
    key: "Sketchpads",
    get: function get() {
      return this.sketchpads;
    }
  }], [{
    key: "registerHook",
    value: function registerHook(func) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      Globe.hooks.push({
        func: func,
        args: args
      });
    }
  }]);

  return Globe;
}(_EventEmitter2.EventEmitter);

exports.Globe = Globe;
Globe.hooks = [];
},{"../util/browser":"../src/util/browser.ts","../util/isString":"../src/util/isString.ts","../core/EventEmitter":"../src/core/EventEmitter.ts","../core/Projection":"../src/core/Projection.ts"}],"../src/util/split.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.split = void 0;

var trim = function trim(input) {
  return ((input || '') + '').replace(/^\s+|\s+$/g, '');
};

var split = function split(input) {
  return trim(input).split(/\s+/);
};

exports.split = split;
},{}],"../src/util/dom.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPropagation = exports.removeDOMEvent = exports.preventDefault = exports.getEventContainerPosition = exports.addDOMEvent = void 0;

var _split = require("./split");

var _browser = require("./browser");

var PREFIX = '_geosketchpad_';

var addDOMEvent = function addDOMEvent(element, eventName, handler, context) {
  var eventHandler = function eventHandler(e) {
    e = e || window.event;
    handler.call(context || element, e);
  };

  (0, _split.split)(eventName).forEach(function (type) {
    var key = "".concat(PREFIX, "_").concat(type);
    element[key] = element[key] || [];
    var hit = listenDOMEvent(element, type, handler);
    if (hit >= 0) removeDOMEvent(element, type, handler);
    element[key].push(eventHandler);
    if (_browser.browser.ie) element.addEventListener(type, eventHandler, false);else element.addEventListener(type, eventHandler, {
      capture: false,
      passive: false
    });
  });
};

exports.addDOMEvent = addDOMEvent;

var listenDOMEvent = function listenDOMEvent(element, type, handler) {
  var Key = "".concat(PREFIX, "_").concat(type);
  if (!element || !element[Key] || !handler) return -1;
  var handlers = element[Key];

  for (var i = 0, len = handlers.length; i < len; i++) {
    if (handlers[i] === handler) return i;
  }

  return -1;
};

var removeDOMEvent = function removeDOMEvent(element, eventName, handler) {
  var remove = function remove(type, fn) {
    element.removeEventListener(type, fn, false);
  };

  var types = (0, _split.split)(eventName);
  types.forEach(function (type) {
    var key = "".concat(PREFIX, "_").concat(type);

    if (!handler && element[key]) {
      var handlers = element[key];
      handlers === null || handlers === void 0 ? void 0 : handlers.forEach(function (listener) {
        remove(type, listener);
      });
      delete element[key];
    }

    var hit = listenDOMEvent(element, type, handler);
    if (hit > 0) remove(type, element[key]);
    element[key].splice(hit, 1);
  });
};

exports.removeDOMEvent = removeDOMEvent;

var preventDefault = function preventDefault(e) {
  if (e.preventDefault) e.preventDefault();else e.returnValue = false;
};

exports.preventDefault = preventDefault;

var stopPropagation = function stopPropagation(e) {
  if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;
};

exports.stopPropagation = stopPropagation;

var getEventContainerPosition = function getEventContainerPosition(e, dom) {
  var targetEvent = e instanceof MouseEvent ? e : e.touches[0];
  var style = window.getComputedStyle(dom);
  var padding = [parseInt(style['padding-left']), parseInt(style['padding-top'])];
  var rect = dom.getBoundingClientRect();
  var offsetWidth = dom.offsetWidth,
      offsetHeight = dom.offsetHeight;
  var scaleX = offsetWidth ? rect.width / offsetWidth : 1;
  var scaleY = offsetHeight ? rect.height / offsetHeight : 1;
  var position = [rect.left + padding[0], rect.top + padding[1], scaleX, scaleY];
  return {
    clientX: (targetEvent.clientX - position[0] - dom.clientLeft) / position[2],
    clientY: (targetEvent.clientY - position[1] - dom.clientTop) / position[3]
  };
};

exports.getEventContainerPosition = getEventContainerPosition;
},{"./split":"../src/util/split.ts","./browser":"../src/util/browser.ts"}],"../node_modules/pipegl/src/util/check.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = void 0;

const check = (pred, message) => {
  if (!pred) throw new Error(`pipegl:${message}`);
};

exports.check = check;
},{}],"../node_modules/pipegl/src/pool/BufferPool.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferPool0 = void 0;

const nextPow16 = v => {
  for (let i = 16, max = 1 << 28; i <= max; i *= 16) if (v <= i) return i;

  return 0;
};

const nextLog2 = v => {
  let shift = 0;
  let r = +(v > 0xFFFF) << 4;
  v >>>= r;
  shift = +(v > 0xFF) << 3;
  v >>>= shift;
  r |= shift;
  shift = +(v > 0xF) << 2;
  v >>>= shift;
  r |= shift;
  shift = +(v > 0x3) << 1;
  v >>>= shift;
  r |= shift;
  return r | v >> 1;
};

const interLoop = n => {
  const r = [];

  for (let i = 0; i < n; i++) r[i] = [];

  return r;
};

class BufferPool {
  constructor() {
    this.bufferPool = interLoop(8);

    this.alloc = size => {
      const bufferPool = this.bufferPool,
            actualSize = nextPow16(size),
            bin = bufferPool[nextLog2(actualSize) >> 2];
      return bin.length > 0 ? bin.pop() : new ArrayBuffer(actualSize);
    };

    this.allocType = (scomponent, size) => {
      const alloc = this.alloc;
      let arr = null;

      switch (scomponent) {
        case 'BYTE':
          arr = new Int8Array(alloc(size), 0, size);
          break;

        case 'UNSIGNED_BYTE':
          arr = new Uint8Array(alloc(size), 0, size);
          break;

        case 'SHORT':
          arr = new Int16Array(alloc(2 * size), 0, size);
          break;

        case 'UNSIGNED_SHORT':
          arr = new Uint16Array(alloc(2 * size), 0, size);
          break;

        case 'INT':
          arr = new Int32Array(alloc(4 * size), 0, size);
          break;

        case 'UNSIGNED_INT':
          arr = new Uint32Array(alloc(4 * size), 0, size);
          break;

        case 'FLOAT':
          arr = new Float32Array(alloc(4 * size), 0, size);
          break;
      }

      if (arr.length !== size) arr = arr.subarray(0, size);
      return arr;
    };

    this.free = buffer => {
      if (!buffer) return;
      const bufferPool = this.bufferPool;
      bufferPool[nextLog2(buffer.byteLength) >> 2].push(buffer);
    };

    this.freeType = typedArraybuffer => {
      this.free(typedArraybuffer.buffer);
    };
  }

}

const bufferPool0 = new BufferPool();
exports.bufferPool0 = bufferPool0;
},{}],"../node_modules/pipegl/src/core/Constant.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CWebGLStatusVariable = exports.CWebGLStatusTYPE = exports.CWebGLStatusFLAG = exports.CVector = exports.CUsage = exports.CTextureWrapTarget = exports.CTextureMapTarget = exports.CTextureMINFilter = exports.CTextureMAGFilter = exports.CTextureFillTarget = exports.CTextureCompressed = exports.CTextureComponentSize = exports.CTextureComponent = exports.CTextureColor2Component = exports.CTextureColor = exports.CTextureChannelCount = exports.CShaderTarget = exports.CRenderbufferColor = exports.CPrimitive = exports.CMipmapHint = exports.CDimension = exports.CComponent = exports.CColorSpace = exports.CBlendFunc = exports.CAttributeTS = exports.CAttachmentTarget = exports.CArraybufferTarget = exports.CActiveTarget = void 0;
const CBlendFunc = {
  FUNC_ADD: 0x8006,
  FUNC_SUBTRACT: 0x800A,
  FUNC_REVERSE_SUBTRACT: 0x800B,
  MIN_EXT: 0x8007,
  MAX_EXT: 0x8008
};
exports.CBlendFunc = CBlendFunc;
const CComponent = {
  BYTE: 0x1400,
  UNSIGNED_BYTE: 0x1401,
  SHORT: 0x1402,
  UNSIGNED_SHORT: 0x1403,
  INT: 0x1404,
  UNSIGNED_INT: 0x1405,
  FLOAT: 0x1406
};
exports.CComponent = CComponent;
const CPrimitive = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
};
exports.CPrimitive = CPrimitive;
const CTextureMapTarget = {
  TEXTURE_2D: 0x0DE1,
  TEXTURE_CUBE_MAP: 0x8513,
  TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515,
  TEXTURE_CUBE_MAP_NEGATIVE_X: 0x8516,
  TEXTURE_CUBE_MAP_POSITIVE_Y: 0x8517,
  TEXTURE_CUBE_MAP_NEGATIVE_Y: 0x8518,
  TEXTURE_CUBE_MAP_POSITIVE_Z: 0x8519,
  TEXTURE_CUBE_MAP_NEGATIVE_Z: 0x851A
};
exports.CTextureMapTarget = CTextureMapTarget;
const CShaderTarget = {
  FRAGMENT_SHADER: 0x8B30,
  VERTEX_SHADER: 0x8B31
};
exports.CShaderTarget = CShaderTarget;
const CArraybufferTarget = {
  ARRAY_BUFFER: 0x8892,
  ELEMENT_ARRAY_BUFFER: 0x8893
};
exports.CArraybufferTarget = CArraybufferTarget;
const CUsage = {
  STATIC_DRAW: 0x88E4,
  STREAM_DRAW: 0x88E0,
  DYNAMIC_DRAW: 0x88E8
};
exports.CUsage = CUsage;
const CDimension = {
  POINTS: 1,
  LINES: 2,
  TRIANGLES: 3
};
exports.CDimension = CDimension;
const CActiveTarget = {
  ACTIVE_ATTRIBUTES: 0x8B89,
  ACTIVE_UNIFORMS: 0x8B86
};
exports.CActiveTarget = CActiveTarget;
const CVector = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
exports.CVector = CVector;
const CAttachmentTarget = {
  TEXTURE_2D: 0x0DE1,
  RENDERBUFFER: 0x8D41
};
exports.CAttachmentTarget = CAttachmentTarget;
const CTextureFillTarget = {
  REPEAT: 0x2901,
  CLAMP_TO_EDGE: 0x812F,
  MIRRORED_REPEAT: 0x8370
};
exports.CTextureFillTarget = CTextureFillTarget;
const CMipmapHint = {
  DONT_CARE: 0x1100,
  FASTEST: 0x1101,
  NICEST: 0x1102
};
exports.CMipmapHint = CMipmapHint;
const CTextureWrapTarget = {
  TEXTURE_WRAP_S: 0x2802,
  TEXTURE_WRAP_T: 0x2803
};
exports.CTextureWrapTarget = CTextureWrapTarget;
const CTextureMAGFilter = {
  NEAREST: 0x2600,
  LINEAR: 0x2601
};
exports.CTextureMAGFilter = CTextureMAGFilter;
const CTextureMINFilter = {
  NEAREST: 0x2600,
  LINEAR: 0x2601,
  NEAREST_MIPMAP_NEAREST: 0x2700,
  LINEAR_MIPMAP_NEAREST: 0x2701,
  NEAREST_MIPMAP_LINEAR: 0x2702,
  LINEAR_MIPMAP_LINEAR: 0x2703
};
exports.CTextureMINFilter = CTextureMINFilter;
const CColorSpace = {
  NONE: 0,
  BROWSER_DEFAULT_WEBGL: 0x9244
};
exports.CColorSpace = CColorSpace;
const CTextureComponent = {
  BYTE: 0x1400,
  UNSIGNED_BYTE: 0x1401,
  SHORT: 0x1402,
  UNSIGNED_SHORT: 0x1403,
  INT: 0x1404,
  UNSIGNED_INT: 0x1405,
  FLOAT: 0x1406,
  UNSIGNED_SHORT_4_4_4_4: 0x8033,
  UNSIGNED_SHORT_5_5_5_1: 0x8034,
  UNSIGNED_SHORT_5_6_5: 0x8363,
  HALF_FLOAT_OES: 0x8D61,
  UNSIGNED_INT_24_8_WEBGL: 0x84FA
};
exports.CTextureComponent = CTextureComponent;
const CTextureColor = {
  ALPHA: 0x1906,
  RGB: 0x1907,
  RGBA: 0x1908,
  RGBA4: 0x8056,
  RGB5_A1: 0x8057,
  RGB565: 0x8D62,
  LUMINANCE: 0x1909,
  LUMINANCE_ALPHA: 0x190A,
  SRGB_EXT: 0x8c40,
  SRGB_ALPHA_EXT: 0x8c42,
  DEPTH_COMPONENT: 0x1902,
  DEPTH_STENCIL: 0x84F9
};
exports.CTextureColor = CTextureColor;
const CTextureColor2Component = {
  RGBA4: 'UNSIGNED_SHORT_4_4_4_4',
  RGB5_A1: 'UNSIGNED_SHORT_5_5_5_1'
};
exports.CTextureColor2Component = CTextureColor2Component;
const CTextureCompressed = {
  COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83F0,
  COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83F1,
  COMPRESSED_RGBA_S3TC_DXT3_EXT: 0x83F2,
  COMPRESSED_RGBA_S3TC_DXT5_EXT: 0x83F3
};
exports.CTextureCompressed = CTextureCompressed;
const CTextureComponentSize = {
  0x1400: 1,
  0x1401: 1,
  0x1402: 2,
  0x1403: 2,
  0x1404: 4,
  0x1405: 4,
  0x1406: 4,
  0x8D61: 2,
  0x8363: 2,
  0x8033: 2,
  0x8034: 2,
  0x84FA: 4
};
exports.CTextureComponentSize = CTextureComponentSize;
const CTextureChannelCount = {
  0x1909: 1,
  0x1906: 1,
  0x1902: 1,
  0x84F9: 2,
  0x190A: 2,
  0x1907: 3,
  0x8c40: 3,
  0x1908: 4,
  0x8c42: 4
};
exports.CTextureChannelCount = CTextureChannelCount;
const CRenderbufferColor = {
  RGBA4: 0x8056,
  RGB565: 0x8D62,
  RGB5_A1: 0x8057,
  DEPTH_COMPONENT16: 0x81A5,
  STENCIL_INDEX8: 0x8D48,
  DEPTH_STENCIL: 0x84F9,
  SRGB8_ALPHA8_EXT: 0x8c43,
  RGB16F_EXT: 0x881B,
  RGBA16F_EXT: 0x881A,
  RGBA32F_EXT: 0x8814
};
exports.CRenderbufferColor = CRenderbufferColor;
const CWebGLStatusTYPE = {
  FLAG: 1,
  BOOLEAN: 2,
  ARRAY: 3,
  DECARRAY: 4,
  NUMBER: 5
};
exports.CWebGLStatusTYPE = CWebGLStatusTYPE;
const CWebGLStatusFLAG = {
  DITHER: CWebGLStatusTYPE.FLAG,
  BLEND: CWebGLStatusTYPE.FLAG,
  DEPTH_TEST: CWebGLStatusTYPE.FLAG,
  CULL_FACE: CWebGLStatusTYPE.FLAG,
  POLYGON_OFFSET_FILL: CWebGLStatusTYPE.FLAG,
  SAMPLE_ALPHA_TO_COVERAGE: CWebGLStatusTYPE.FLAG,
  SAMPLE_COVERAGE: CWebGLStatusTYPE.FLAG,
  STENCIL_TEST: CWebGLStatusTYPE.FLAG,
  SCISSOR_TEST: CWebGLStatusTYPE.FLAG
};
exports.CWebGLStatusFLAG = CWebGLStatusFLAG;
const CWebGLStatusVariable = {
  blendColor: CWebGLStatusTYPE.ARRAY,
  scissor: CWebGLStatusTYPE.DECARRAY,
  blendEquationSeparate: CWebGLStatusTYPE.DECARRAY,
  blendFuncSeparate: CWebGLStatusTYPE.DECARRAY,
  blendFunc: CWebGLStatusTYPE.DECARRAY,
  depthFunc: CWebGLStatusTYPE.NUMBER,
  depthRange: CWebGLStatusTYPE.DECARRAY,
  depthMask: CWebGLStatusTYPE.BOOLEAN,
  colorMask: CWebGLStatusTYPE.DECARRAY,
  cullFace: CWebGLStatusTYPE.NUMBER,
  frontFace: CWebGLStatusTYPE.NUMBER,
  lineWidth: CWebGLStatusTYPE.NUMBER,
  polygonOffset: CWebGLStatusTYPE.DECARRAY,
  sampleCoverage: CWebGLStatusTYPE.DECARRAY,
  stencilMask: CWebGLStatusTYPE.NUMBER,
  stencilFunc: CWebGLStatusTYPE.DECARRAY,
  stencilOpSeparate: CWebGLStatusTYPE.DECARRAY,
  stencilOp: CWebGLStatusTYPE.DECARRAY,
  viewport: CWebGLStatusTYPE.DECARRAY
};
exports.CWebGLStatusVariable = CWebGLStatusVariable;
const CAttributeTS = {
  5126: 1,
  35664: 2,
  35665: 3,
  35666: 4,
  35667: 2,
  35668: 3,
  35669: 4,
  35671: 2,
  35672: 3,
  35673: 4
};
exports.CAttributeTS = CAttributeTS;
},{}],"../node_modules/pipegl/src/core/Limit.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Limit = void 0;

var _BufferPool = require("./../pool/BufferPool");

var _Constant = require("./Constant");

const MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FF;
const MAX_DRAW_BUFFERS_WEBGL = 0x8824;
const MAX_COLOR_ATTACHMENTS_WEBGL = 0x8CDF;

class Limit {
  constructor(gl, extLib) {
    this.maxAnisotropic = 1;
    this.maxDrawbuffers = 1;
    this.maxColorAttachments = 1;
    this.readFloat = false;
    this.npotTextureCube = true;
    this.colorBits = new Array(4);
    this.info = {};
    if (extLib.get('EXT_texture_filter_anisotropic')) this.maxAnisotropic = gl.getParameter(MAX_TEXTURE_MAX_ANISOTROPY_EXT);

    if (extLib.get('WEBGL_draw_buffers')) {
      this.maxDrawbuffers = gl.getParameter(MAX_DRAW_BUFFERS_WEBGL);
      this.maxColorAttachments = gl.getParameter(MAX_COLOR_ATTACHMENTS_WEBGL);
    }

    if (extLib.get('OES_texture_float')) {
      this.readFloat = true;
      const readFloatTexture = gl.createTexture();
      gl.bindTexture(_Constant.CTextureMapTarget.TEXTURE_2D, readFloatTexture);
      gl.texImage2D(_Constant.CTextureMapTarget.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, _Constant.CComponent.FLOAT, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, _Constant.CTextureMapTarget.TEXTURE_2D, readFloatTexture, 0);
      gl.bindTexture(_Constant.CTextureMapTarget.TEXTURE_2D, null);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) this.readFloat = false;else {
        gl.viewport(0, 0, 1, 1);
        gl.clearColor(1.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const pixels = _BufferPool.bufferPool0.allocType('FLOAT', 4);

        gl.readPixels(0, 0, 1, 1, gl.RGBA, _Constant.CComponent.FLOAT, pixels);
        if (gl.getError()) this.readFloat = false;else {
          gl.deleteFramebuffer(fbo);
          gl.deleteTexture(readFloatTexture);
          this.readFloat = pixels[0] === 1.0;
        }

        _BufferPool.bufferPool0.freeType(pixels);
      }
    }

    const cubeTexture = gl.createTexture();

    const data = _BufferPool.bufferPool0.allocType('UNSIGNED_BYTE', 36);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(_Constant.CTextureMapTarget.TEXTURE_CUBE_MAP, cubeTexture);
    gl.texImage2D(_Constant.CTextureMapTarget.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, 3, 3, 0, gl.RGBA, _Constant.CComponent.UNSIGNED_BYTE, data);

    _BufferPool.bufferPool0.freeType(data);

    gl.bindTexture(_Constant.CTextureMapTarget.TEXTURE_CUBE_MAP, null);
    gl.deleteTexture(cubeTexture);
    this.npotTextureCube = !gl.getError();
    this.colorBits.push(...[gl.getParameter(gl.RED_BITS), gl.getParameter(gl.GREEN_BITS), gl.getParameter(gl.BLUE_BITS), gl.getParameter(gl.ALPHA_BITS)]);
    this.depthBits = gl.getParameter(gl.DEPTH_BITS);
    this.stencilBits = gl.getParameter(gl.STENCIL_BITS);
    this.pointSizeDims = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
    this.lineWidthDims = gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE);
    this.maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
    this.maxCombineTextureUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    this.maxCubeMapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
    this.maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
    this.maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    this.maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    this.maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    this.maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    this.maxVertexTextureUnits = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    this.maxVaryingVectors = gl.getParameter(gl.MAX_VARYING_VECTORS);
    this.info.glsl = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
    this.info.vendor = gl.getParameter(gl.VENDOR);
    this.info.version = gl.getParameter(gl.VERSION);
    this.info.renderer = gl.getParameter(gl.RENDERER);
  }

}

exports.Limit = Limit;
},{"./../pool/BufferPool":"../node_modules/pipegl/src/pool/BufferPool.ts","./Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/core/Extension.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Extension = void 0;

class Extension {
  constructor(gl, ...extNames) {
    this.get = extName => {
      return this.extensions[extName];
    };

    this.getByForce = extName => {
      const gl = this.gl,
            extensions = this.extensions;
      const ext = extensions[extName] = extensions[extName] || gl.getExtension(extName);
      return ext;
    };

    this.gl = gl;
    this.extensions = {};

    for (let i = 0, len = extNames.length; i < len; i++) {
      const extName = extNames[i];
      const ext = gl.getExtension(extName);

      if (!!ext) {
        this.extensions[extName] = ext;
        console.log(`pipegl extension ${extName} load successful`);
      } else {
        console.log(`pipegl extension ${extName} load fail`);
      }
    }
  }

}

exports.Extension = Extension;
},{}],"../node_modules/pipegl/src/util/getIdx.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIdx = void 0;
let id = 0;

const getIdx = () => {
  return id++;
};

exports.getIdx = getIdx;
},{}],"../node_modules/pipegl/src/core/Dispose.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dispose = void 0;

var _getIdx = require("../util/getIdx");

class Dispose {
  constructor() {
    this.id = (0, _getIdx.getIdx)();
    this.refCount = 0;
  }

  get ID() {
    return this.id;
  }

}

exports.Dispose = Dispose;
},{"../util/getIdx":"../node_modules/pipegl/src/util/getIdx.ts"}],"../node_modules/pipegl/src/res/GShader.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERTSHADER_SET = exports.GShader = exports.FRAGSHADER_SET = void 0;

var _check = require("../util/check");

var _Dispose = require("../core/Dispose");

var _Constant = require("../core/Constant");

const FRAGSHADER_SET = new Map();
exports.FRAGSHADER_SET = FRAGSHADER_SET;
const VERTSHADER_SET = new Map();
exports.VERTSHADER_SET = VERTSHADER_SET;

class GShader extends _Dispose.Dispose {
  constructor(gl, id, source, target) {
    super();
    this.id = id;
    this.gl = gl;
    this.target = _Constant.CShaderTarget[target];
    this.shader = gl.createShader(this.target);
    this.source = source;
    gl.shaderSource(this.shader, source);
    gl.compileShader(this.shader);
    (0, _check.check)(gl.getShaderParameter(this.shader, gl.COMPILE_STATUS), `shader编译错误 - ${gl.getShaderInfoLog(this.shader)}`);
    this.target === _Constant.CShaderTarget['FRAGMENT_SHADER'] ? FRAGSHADER_SET.set(this.ID, this) : VERTSHADER_SET.set(this.ID, this);
  }

  dispose() {
    throw new Error('Method not implemented.');
  }

  decRef() {
    throw new Error('Method not implemented.');
  }

  get Shader() {
    return this.shader;
  }

}

exports.GShader = GShader;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../core/Dispose":"../node_modules/pipegl/src/core/Dispose.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/state/ShaderState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShaderState = void 0;

var _GShader = require("../res/GShader");

class ShaderState {
  constructor(gl, stringState, stats) {
    this.createShader = (target, id) => {
      const SHADER_SET = target === 'FRAGMENT_SHADER' ? ShaderState.FRAGSHADER_SET : ShaderState.VERTSHADER_SET;
      let shader = SHADER_SET.get(id);

      if (!shader) {
        const source = this.stringState.str(id);
        shader = new _GShader.GShader(this.gl, id, source, target);
      }

      return shader;
    };

    this.gl = gl;
    this.stringState = stringState;
    this.stats = stats;
  }

}

exports.ShaderState = ShaderState;
ShaderState.FRAGSHADER_SET = _GShader.FRAGSHADER_SET;
ShaderState.VERTSHADER_SET = _GShader.VERTSHADER_SET;
},{"../res/GShader":"../node_modules/pipegl/src/res/GShader.ts"}],"../node_modules/pipegl/src/state/StringState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringState = void 0;

class StringState {
  constructor() {
    this.stringValues = [];

    this.id = str => {
      let result = StringState.STRINGSTATE_SET.get(str);
      if (result) return result;
      result = this.stringValues.length;
      StringState.STRINGSTATE_SET.set(str, result);
      this.stringValues.push(str);
      return result;
    };

    this.str = id => {
      return this.stringValues[id];
    };
  }

}

exports.StringState = StringState;
StringState.STRINGSTATE_SET = new Map();
},{}],"../node_modules/pipegl/src/util/detectComponent.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectComponent = void 0;

const detectComponent = data => {
  const ne = Object.prototype.toString.call(data);

  switch (ne) {
    case `[object Int8Array]`:
      return 'BYTE';

    case `[object ArrayBuffer]`:
    case `[object Float64Array]`:
    case `[object Uint8ClampedArray]`:
    case `[object Uint8Array]`:
      return 'UNSIGNED_BYTE';

    case `[object Int16Array]`:
      return 'SHORT';

    case `[object Uint16Array]`:
      return 'UNSIGNED_SHORT';

    case `[object Int32Array]`:
      return 'INT';

    case `[object Uint32Array]`:
      return 'UNSIGNED_INT';

    case `[object Float32Array]`:
      return 'FLOAT';

    default:
      return 'FLOAT';
  }
};

exports.detectComponent = detectComponent;
},{}],"../node_modules/pipegl/src/util/getFlatten.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDimension = exports.getArrayShape = exports.flattenArrayWithShape = exports.flattenArray = void 0;

var _BufferPool = require("../pool/BufferPool");

const getArrayShape = array => {
  const shape = [];
  let arr = array;

  while (arr.length > 0) {
    shape.push(arr.length);
    arr = arr[0];
  }

  return shape;
};

exports.getArrayShape = getArrayShape;

const getDimension = shape => {
  return shape.reduce((pre, cur) => {
    return cur * pre;
  }) || 0;
};

exports.getDimension = getDimension;

const flatten1D = (arr, len0, out) => {
  for (let i = 0; i < len0; ++i) out[i] = arr[i];
};

const flatten2D = (arr, len0, len1, out) => {
  let ptr = 0;

  for (let i = 0; i < len0; ++i) {
    const row = arr[i];

    for (let j = 0; j < len1; ++j) out[ptr++] = row[j];
  }
};

const flatten3D = (arr, len0, len1, len2, out, ptr_ = 0) => {
  let ptr = ptr_;

  for (let i = 0; i < len0; ++i) {
    let row = arr[i];

    for (let j = 0; j < len1; ++j) {
      let col = row[j];

      for (let k = 0; k < len2; ++k) out[ptr++] = col[k];
    }
  }
};

const flattenArrayWithShape = (array, shape, scomponent, out_ = null) => {
  const size = getDimension(shape);

  const out = out_ || _BufferPool.bufferPool0.allocType(scomponent, size);

  switch (shape.length) {
    case 0:
      break;

    case 1:
      flatten1D(array, shape[0], out);
      break;

    case 2:
      flatten2D(array, shape[0], shape[1], out);
      break;

    case 3:
      flatten3D(array, shape[0], shape[1], shape[2], out, 0);
      break;

    default:
      throw new Error(`pipegl: flatten did't support ${shape.length} D array`);
  }

  return out;
};

exports.flattenArrayWithShape = flattenArrayWithShape;

const flattenArray = (array, scomponent, out_ = null) => {
  const shape = getArrayShape(array);
  return flattenArrayWithShape(array, shape, scomponent, out_);
};

exports.flattenArray = flattenArray;
},{"../pool/BufferPool":"../node_modules/pipegl/src/pool/BufferPool.ts"}],"../node_modules/pipegl/src/res/GBuffer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GBuffer = exports.BUFFER_SET = void 0;

var _check = require("../util/check");

var _Dispose = require("../core/Dispose");

var _BufferPool = require("../pool/BufferPool");

var _detectComponent = require("../util/detectComponent");

var _getFlatten = require("../util/getFlatten");

var _Constant = require("../core/Constant");

const BUFFER_SET = new Map();
exports.BUFFER_SET = BUFFER_SET;

class GBuffer extends _Dispose.Dispose {
  constructor(gl, target, usage = 'STATIC_DRAW', component = 'FLOAT', dimension = 'POINTS') {
    super();

    this.setSubData = (data, offset) => {
      const gl = this.gl,
            size = offset + data.byteLength;
      (0, _check.check)(size <= this.byteLength, `subdata错误，写入数据长度${size}超过原始长度${this.byteLength},写入失败`);
      gl.bufferSubData(this.target, offset, data);
    };

    this.bufferTypedArray = data => {
      this.byteLength = data.byteLength;
      this.gl.bufferData(this.target, data, this.usage);
    };

    this.paddingWithData = (data, usage, component) => {
      this.usage = _Constant.CUsage[usage || 'STATIC_DRAW'];
      const shape = (0, _getFlatten.getArrayShape)(data);
      const d0 = shape.length === 1 ? data[0] : shape.length === 2 ? data[0][0] : shape.length === 3 ? data[0][0][0] : 0;
      component = component || (0, _detectComponent.detectComponent)(d0) || 'FLOAT';
      this.component = _Constant.CComponent[component];
      const flatData = (0, _getFlatten.flattenArrayWithShape)(data, shape, component);
      this.bufferTypedArray(flatData);

      _BufferPool.bufferPool0.freeType(flatData);

      return this;
    };

    this.subData = (data, offset = 0) => {
      this.bind();
      const shape = (0, _getFlatten.getArrayShape)(data);
      const d0 = shape.length === 1 ? data[0] : shape.length === 2 ? data[0][0] : shape.length === 3 ? data[0][0][0] : 0;
      const scomponent = (0, _detectComponent.detectComponent)(d0) || 'FLOAT';
      this.component = _Constant.CComponent[scomponent];
      const flatData = (0, _getFlatten.flattenArrayWithShape)(data, shape, scomponent);
      this.setSubData(flatData, offset);

      _BufferPool.bufferPool0.freeType(flatData);
    };

    this.bind = () => {
      this.gl.bindBuffer(this.target, this.buffer);
    };

    this.unbind = () => {
      this.gl.bindBuffer(this.target, null);
      this.decRef();
    };

    this.gl = gl;
    this.byteLength = 0;
    this.buffer = gl.createBuffer();
    this.target = _Constant.CArraybufferTarget[target];
    this.usage = _Constant.CUsage[usage || 'STATIC_DRAW'];
    this.dimension = _Constant.CDimension[dimension || 'POINTS'];
    this.component = _Constant.CComponent[component || 'UNSIGNED_BYTE'];
    BUFFER_SET.set(this.ID, this);
  }

  decRef() {
    this.refCount--;
  }

  dispose() {
    throw new Error('Method not implemented.');
  }

  get Dimension() {
    return this.dimension;
  }

  get ByteLength() {
    return this.byteLength;
  }

  get Component() {
    return this.component;
  }

}

exports.GBuffer = GBuffer;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../core/Dispose":"../node_modules/pipegl/src/core/Dispose.ts","../pool/BufferPool":"../node_modules/pipegl/src/pool/BufferPool.ts","../util/detectComponent":"../node_modules/pipegl/src/util/detectComponent.ts","../util/getFlatten":"../node_modules/pipegl/src/util/getFlatten.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/state/BufferState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BufferState = void 0;

var _GBuffer = require("../res/GBuffer");

var _Constant = require("../core/Constant");

class BufferState {
  constructor(gl, stats) {
    this.streamPool = [];

    this.createBuffer = opts => {
      const data = opts.data,
            byteLength = opts.byteLength || 0,
            usage = opts.usage || 'STATIC_DRAW',
            component = opts.component || 'FLOAT',
            dimension = opts.dimension || 'POINTS',
            target = opts.target || 'ARRAY_BUFFER';
      const buffer = new _GBuffer.GBuffer(this.gl, target, usage, component, dimension);
      buffer.bind();
      if (!data && byteLength > 0) this.gl.bufferData(_Constant.CArraybufferTarget[target], byteLength, _Constant.CUsage[usage]);else buffer.paddingWithData(data, usage, component);
      this.reglBuffer = buffer;
      this.stats.bufferCount++;
      return buffer;
    };

    this.createStreambuffer = (data, target) => {
      const usage = 'STREAM_DRAW',
            component = 'FLOAT',
            dimension = 'POINTS';
      const buffer = this.streamPool.pop() || new _GBuffer.GBuffer(this.gl, target, usage, component, dimension);
      buffer.bind();
      buffer.paddingWithData(data, usage, component);
      this.reglBuffer = buffer;
      return buffer;
    };

    this.destoryStreambuffer = streambuffer => {
      this.streamPool.push(streambuffer);
    };

    this.gl = gl;
    this.stats = stats;
  }

}

exports.BufferState = BufferState;
BufferState.REGLBUFFER_SET = _GBuffer.BUFFER_SET;
},{"../res/GBuffer":"../node_modules/pipegl/src/res/GBuffer.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/util/getExtendCopy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtend = exports.getCopy = void 0;

const getExtend = (target, ...exts) => {
  exts.forEach(ext => {
    const keys = Object.keys(ext);

    for (let i = 0, len = keys.length; i < len; ++i) target[keys[i]] = ext[keys[i]];
  });
  return target;
};

exports.getExtend = getExtend;

const getCopy = (target, ...exts) => {
  exts.forEach(ext => {
    var _a;

    (_a = Object.keys(target)) === null || _a === void 0 ? void 0 : _a.forEach(key => {
      if (ext[key] !== undefined && ext[key] !== null) target[key] = ext[key];
    });
  });
  return target;
};

exports.getCopy = getCopy;
},{}],"../node_modules/pipegl/src/util/toHalfFloat.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHalfFloat = void 0;

var _BufferPool = require("./../pool/BufferPool");

const FLOAT = new Float32Array(1),
      INT = new Uint32Array(FLOAT.buffer);

const toHalfFloat = array => {
  const len = array.length;

  const ushorts = _BufferPool.bufferPool0.allocType('UNSIGNED_SHORT', len);

  for (let i = 0; i < len; ++i) {
    if (isNaN(array[i])) ushorts[i] = 0xffff;else if (array[i] === Infinity) ushorts[i] = 0x7c00;else if (array[i] === -Infinity) ushorts[i] = 0xfc00;else {
      FLOAT[0] = array[i];
      const x = INT[0];
      const sgn = x >>> 31 << 15;
      const exp = (x << 1 >>> 24) - 127;
      const frac = x >> 13 & (1 << 10) - 1;
      if (exp < -24) ushorts[i] = sgn;else if (exp < -14) {
        const s = -14 - exp;
        ushorts[i] = sgn + (frac + (1 << 10) >> s);
      } else if (exp > 15) ushorts[i] = sgn + 0x7c00;else ushorts[i] = sgn + (exp + 15 << 10) + frac;
    }
  }

  return ushorts;
};

exports.toHalfFloat = toHalfFloat;
},{"./../pool/BufferPool":"../node_modules/pipegl/src/pool/BufferPool.ts"}],"../node_modules/pipegl/src/core/Transpose.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transpose = void 0;

var _toHalfFloat = require("../util/toHalfFloat");

var _BufferPool = require("../pool/BufferPool");

class Transpose {}

exports.Transpose = Transpose;

Transpose.preConvert = (image, size) => {
  const component = image.component === 'HALF_FLOAT_OES' ? 'FLOAT' : image.component;
  return _BufferPool.bufferPool0.allocType(component, size);
};

Transpose.postConvert = (image, data) => {
  if (image.component === 'HALF_FLOAT_OES') {
    image.data = (0, _toHalfFloat.toHalfFloat)(data);

    _BufferPool.bufferPool0.freeType(data);
  } else image.data = data;
};

Transpose.TransposeData = (image, arr, sx, sy, sc, offset) => {
  if (!arr) return arr;
  const w = image.width,
        h = image.height,
        c = image.channels,
        size = w * h * c;
  const data = Transpose.preConvert(image, size);
  let p = 0;

  for (let i = 0; i < h; ++i) for (let j = 0; j < w; ++j) for (let k = 0; k < c; ++k) data[p++] = arr[sx * j + sy * i + sc * k + offset];

  Transpose.postConvert(image, data);
};
},{"../util/toHalfFloat":"../node_modules/pipegl/src/util/toHalfFloat.ts","../pool/BufferPool":"../node_modules/pipegl/src/pool/BufferPool.ts"}],"../node_modules/pipegl/src/util/createTexFlag.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTexFlag = void 0;

const createTexFlag = () => {
  const texFlags = {
    inTexColor: 'RGBA',
    texColor: 'RGBA',
    component: 'UNSIGNED_BYTE',
    compressed: false,
    premultiplyAlpha: false,
    flipY: false,
    unpackAlignment: 1,
    colorSpace: 'BROWSER_DEFAULT_WEBGL',
    width: 0,
    height: 0,
    channels: 0
  };
  return texFlags;
};

exports.createTexFlag = createTexFlag;
},{}],"../node_modules/pipegl/src/pool/TexImagePool.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.texImagePool0 = void 0;

var _getExtendCopy = require("../util/getExtendCopy");

var _BufferPool = require("./BufferPool");

var _createTexFlag = require("./../util/createTexFlag");

const createTexImage = () => {
  return {
    xOffset: 0,
    yOffset: 0,
    data: null,
    neddsCopy: false,
    neddsFree: false
  };
};

class TexImagePool {
  constructor() {
    this.texImageQueue = [];

    this.allocImage = () => {
      if (this.texImageQueue.length > 0) return this.texImageQueue.pop();
      const A = createTexImage(),
            B = (0, _createTexFlag.createTexFlag)();
      return (0, _getExtendCopy.getExtend)(A, B);
    };

    this.freeImage = texImage => {
      if (texImage.neddsFree) _BufferPool.bufferPool0.free(texImage.data);
      (0, _getExtendCopy.getExtend)(texImage, createTexImage());
      this.texImageQueue.push(texImage);
    };
  }

}

const texImagePool0 = new TexImagePool();
exports.texImagePool0 = texImagePool0;
},{"../util/getExtendCopy":"../node_modules/pipegl/src/util/getExtendCopy.ts","./BufferPool":"../node_modules/pipegl/src/pool/BufferPool.ts","./../util/createTexFlag":"../node_modules/pipegl/src/util/createTexFlag.ts"}],"../node_modules/pipegl/src/pool/MipmapPool.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mipmapPool0 = void 0;

var _Constant = require("../core/Constant");

var _createTexFlag = require("../util/createTexFlag");

var _getExtendCopy = require("../util/getExtendCopy");

var _TexImagePool = require("./TexImagePool");

class MipmapPool {
  constructor() {
    this.mipmapQueue = [];

    this.allocMipmap = () => {
      const mipmap = this.mipmapQueue.pop() || (0, _createTexFlag.createTexFlag)();
      (0, _getExtendCopy.getExtend)(mipmap, (0, _createTexFlag.createTexFlag)());
      mipmap.genMipmaps = false;
      mipmap.mipmapHint = _Constant.CMipmapHint['DONT_CARE'];
      mipmap.mipmask = 0;
      mipmap.images = new Array(16);
      return mipmap;
    };

    this.freeMipmap = mipmap => {
      const texImages = mipmap.images;

      for (let i = 0, len = texImages.length; i < len; ++i) {
        const texImage = texImages[i];
        if (texImage) _TexImagePool.texImagePool0.freeImage(texImage);
        texImages[i] = null;
      }

      this.mipmapQueue.push(mipmap);
    };
  }

}

const mipmapPool0 = new MipmapPool();
exports.mipmapPool0 = mipmapPool0;
},{"../core/Constant":"../node_modules/pipegl/src/core/Constant.ts","../util/createTexFlag":"../node_modules/pipegl/src/util/createTexFlag.ts","../util/getExtendCopy":"../node_modules/pipegl/src/util/getExtendCopy.ts","./TexImagePool":"../node_modules/pipegl/src/pool/TexImagePool.ts"}],"../node_modules/pipegl/src/res/GTexture.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TEXTURE_UNIT_ARR = exports.TEXTURE_SET = exports.GTexture = void 0;

var _check = require("../util/check");

var _Dispose = require("../core/Dispose");

var _Constant = require("../core/Constant");

const TEXTURE_SET = new Map();
exports.TEXTURE_SET = TEXTURE_SET;
const TEXTURE_UNIT_ARR = [];
exports.TEXTURE_UNIT_ARR = TEXTURE_UNIT_ARR;
const TEXTURE0$1 = 0x84C0;
const TEXTURE2D$1 = 0x0DE1;

class GTexture extends _Dispose.Dispose {
  constructor(gl, limLib, target, stats) {
    super();
    this.isCubeTexture = false;

    this.bind = () => {
      const gl = this.gl,
            target = this.target;
      const numTexUnits = this.limLib.maxTextureUnits;
      this.bindCount++;

      if (this.unit < 0) {
        for (let i = 0; i < numTexUnits; ++i) {
          const other = TEXTURE_UNIT_ARR[i];

          if (other) {
            if (other.bindCount > 0) continue;
            other.unit = -1;
          }

          TEXTURE_UNIT_ARR[i] = this;
          this.unit = i;
          break;
        }

        (0, _check.check)(this.unit < numTexUnits, `REGLTexture错误：使用纹理超过设备支持上限${this.limLib.maxTextureUnits}`);
        gl.activeTexture(gl.TEXTURE0 + this.unit);
        gl.bindTexture(target, this.texture);
      }

      return this.unit;
    };

    this.unbind = () => {
      return this.bindCount--;
    };

    this.tempBind = () => {
      const gl = this.gl,
            target = this.target;
      gl.activeTexture(TEXTURE0$1);
      gl.bindTexture(target, this.texture);
    };

    this.tempRestore = () => {
      const gl = this.gl,
            prev = TEXTURE_UNIT_ARR[0];

      if (prev) {
        const target = prev.target;
        gl.bindTexture(target, prev.texture);
      } else gl.bindTexture(TEXTURE2D$1, null);
    };

    this.gl = gl;
    this.target = _Constant.CTextureMapTarget[target || 'TEXTURE_2D'];
    this.bindCount = 0;
    this.unit = -1;
    this.limLib = limLib;
    this.refCount = 1;
    this.texture = gl.createTexture();
    this.stats = stats;
    if (this.target === _Constant.CTextureMapTarget.TEXTURE_2D) this.stats.textureCount++;else if (this.target === _Constant.CTextureMapTarget.TEXTURE_CUBE_MAP) {
      this.isCubeTexture = true;
      this.stats.cubeCount++;
    }
    TEXTURE_SET.set(this.ID, this);
  }

  dispose() {
    throw new Error('Method not implemented.');
  }

  decRef() {
    if (--this.refCount <= 0) this.dispose();
  }

  set TexInfo(v) {
    this.texInfo = v;
  }

  get TexInfo() {
    return this.texInfo;
  }

  set TexFlag(v) {
    this.texFlag = v;
  }

  get TexFlag() {
    return this.texFlag;
  }

  set Mipmap(v) {
    this.mipmap = v;
  }

  get Mipmap() {
    return this.mipmap;
  }

  get Width() {
    return this.mipmap.width;
  }

  get Height() {
    return this.mipmap.height;
  }

  get Channels() {
    return this.mipmap.channels;
  }

  get Texutre() {
    return this.texture;
  }

  get IsCubeTexture() {
    return this.isCubeTexture;
  }

}

exports.GTexture = GTexture;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../core/Dispose":"../node_modules/pipegl/src/core/Dispose.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/util/isPowerOf2.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPowerOf2 = void 0;

const isPowerOf2 = n => {
  return n > 0 && (n & n - 1) == 0;
};

exports.isPowerOf2 = isPowerOf2;
},{}],"../node_modules/pipegl/src/util/getPixelSize.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPixelSize = void 0;

var _Constant = require("../core/Constant");

const getPixelSize = (component, channels) => {
  switch (component) {
    case 'UNSIGNED_SHORT_4_4_4_4':
    case 'UNSIGNED_SHORT_5_5_5_1':
    case 'UNSIGNED_SHORT_5_6_5':
      return 2;

    case 'UNSIGNED_INT_24_8_WEBGL':
      return 4;

    default:
      return _Constant.CTextureComponentSize[_Constant.CTextureComponent[component]] * channels;
  }
};

exports.getPixelSize = getPixelSize;
},{"../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/util/checkTexture.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkTextureCube = exports.checkTexture2D = exports.checkMipmapTexture2D = void 0;

var _check = require("./check");

var _isPowerOf = require("./isPowerOf2");

var _getPixelSize = require("./getPixelSize");

var _Constant = require("../core/Constant");

const checkTexture2D = (opts, extLib, limLib) => {
  opts.component = opts.component || 'BYTE';
  opts.width = opts.width || 1;
  opts.height = opts.height || 1;
  opts.texColor = opts.texColor || 'RGBA';
  opts.channels = opts.channels || _Constant.CTextureChannelCount[_Constant.CTextureColor[opts.texColor]];
  opts.compressed = _Constant.CTextureCompressed[opts.texColor] ? true : false;
  (0, _check.check)(opts.component === 'FLOAT' && extLib.get('OES_texture_float'), `CheckTexture2D error: 指定纹理类型需要启用OES_texture_float插件`);
  (0, _check.check)(opts.component === 'HALF_FLOAT_OES' && extLib.get('OES_texture_float'), `CheckTexture2D error: 指定纹理类型需要启用OES_texture_float插件`);
  (0, _check.check)((opts.component === 'UNSIGNED_SHORT' || opts.component === 'UNSIGNED_INT' || opts.component === 'UNSIGNED_INT_24_8_WEBGL') && extLib.get('WEBGL_depth_texture'), `CheckTexture2D error: 指定纹理类型需要启用WEBGL_depth_texture插件`);
  (0, _check.check)(opts.channels > 0 && opts.channels <= 4, `CheckTexture2D error: 纹理通道数错误`);
  (0, _check.check)(opts.width > 0 && opts.width <= limLib.maxTextureSize && opts.height > 0 && opts.height <= limLib.maxTextureSize, `CheckTexture2D error: 纹理分辨率错误，长或宽超过设备支持上限${limLib.maxTextureSize}`);
};

exports.checkTexture2D = checkTexture2D;

const checkMipmapTexture2D = (texInfo, mipData, extLib, limLib) => {
  const w = mipData.width,
        h = mipData.height,
        c = mipData.channels;
  (0, _check.check)(w > 0 && w <= limLib.maxTextureSize && h > 0 && h <= limLib.maxTextureSize, `CheckTexture2D error: 纹理分辨率错误，长或宽超过设备支持上限${limLib.maxTextureSize}`);
  if (texInfo.wrapS !== 'CLAMP_TO_EDGE' || texInfo.wrapT !== 'CLAMP_TO_EDGE') (0, _check.check)((0, _isPowerOf.isPowerOf2)(w) && (0, _isPowerOf.isPowerOf2)(h), `CheckTexture2D error: 纹理模式非CLAMP时要求分辨率为2的幂`);

  if (mipData.mipmask === 1) {
    if (w !== 1 && h !== 1) (0, _check.check)(texInfo.minFilter !== 'LINEAR_MIPMAP_LINEAR' && texInfo.minFilter !== 'LINEAR_MIPMAP_NEAREST' && texInfo.minFilter !== 'NEAREST_MIPMAP_LINEAR' && texInfo.minFilter !== 'NEAREST_MIPMAP_NEAREST', `CheckTexture2D error: min filter必须是mimap类型`);
  } else {
    (0, _check.check)((0, _isPowerOf.isPowerOf2)(w) && (0, _isPowerOf.isPowerOf2)(h), `CheckTexture2D error:纹理模式非CLAMP时要求分辨率为2的幂`);
    (0, _check.check)(mipData.mipmask === (w << 1) - 1, `CheckTexture2D error:丢失/不合法的mipmask`);
  }

  if (mipData.component === 'FLOAT') {
    (0, _check.check)(extLib.get('OES_texture_float'), `CheckTexture2D error: FLOAT类型纹理需要开启OES_texture_float`);
    (0, _check.check)((texInfo.minFilter !== 'NEAREST' || texInfo.magFilter !== 'NEAREST') && extLib.get('OES_texture_float_linear'), `CheckTexture2D error: filter 不支持非NEAREST插值，需开启OES_texture_float_linear`);
    (0, _check.check)(!texInfo.genMipmaps, `CheckTexture2D error: mipmap生成不支持float纹理类型`);
  }

  for (let i = 0; i < 16; ++i) {
    const mipimg = mipData.images[i];

    if (mipimg) {
      const mw = w >> i,
            mh = h >> i;
      (0, _check.check)(mipData.mipmask & 1 << i, `CheckTexture2D error: mipmap数据缺失`);
      (0, _check.check)(mipimg.width === mw && mipimg.height === mh, `CheckTexture2D error: 错误的mipmap images shape信息`);
      (0, _check.check)(mipimg.texColor === mipData.texColor && mipimg.inTexColor === mipData.inTexColor && mipimg.component === mipData.component, `CheckTexture2D error: 不合适的mipmap image数据类型`);

      if (mipimg.compressed) {} else if (mipimg.data) {
        const rowSize = Math.ceil((0, _getPixelSize.getPixelSize)(mipimg.component, c) * mw / mipimg.unpackAlignment) * mipimg.unpackAlignment;
        (0, _check.check)(mipimg.data.byteLength === rowSize * mh, `CheckTexture2D error: 数据缓冲的大小与image格式对应的数据长度不一致`);
      }
    }
  }

  if (mipData.compressed) (0, _check.check)(!mipData.genMipmaps, `CheckTexture2D error: 纹理压缩格式不支持生成mipmap`);
};

exports.checkMipmapTexture2D = checkMipmapTexture2D;

const checkTextureCube = (info, mipmap, faces, limLib) => {
  const w = mipmap.width,
        h = mipmap.height,
        c = mipmap.channels;
  (0, _check.check)(w > 0 && w <= limLib.maxTextureSize && h > 0 && h <= limLib.maxTextureSize, `checkTextureCube error: 超过设备支持纹理上限`);
  (0, _check.check)(w === h, `checkTextureCube error: 立方体贴图必须是正方形`);
  (0, _check.check)(info.wrapS === 'CLAMP_TO_EDGE' && info.wrapT === 'CLAMP_TO_EDGE', `checkTextureCube error: 立方体贴图wrap模式只支持CLAMP_TO_EDGE`);
  faces.forEach(face => {
    (0, _check.check)(face.width === w && face.height === h, `checkTextureCube error: 立方体每个纹理单元分辨率必须一致，${face}分辨率错误`);
    const mipmaps = face.images;

    for (let k = 0; k < 16; k++) {
      const img = mipmaps[k];

      if (img) {
        const mw = w >> k,
              mh = h >> k;
        (0, _check.check)(face.mipmask & 1 << k, `checkTextureCube error: mipmap数据丢失`);
        (0, _check.check)(img.width === mw && img.height === mh, `checkTextureCube error: mipmap纹理分辨率错误`);
        (0, _check.check)(img.component === mipmap.component && img.inTexColor === mipmap.inTexColor && img.texColor === mipmap.texColor, `checkTextureCube error: 子图像参数需要一直，包括component/inTexColor/texColor`);

        if (img.compressed) {} else if (img.data) {
          (0, _check.check)(img.data.byteLength === mw * mh * Math.max((0, _getPixelSize.getPixelSize)(img.component, c), img.unpackAlignment), `checkTextureCube error: 为压缩格式生成mipmap失败`);
        } else {}
      }
    }
  });
};

exports.checkTextureCube = checkTextureCube;
},{"./check":"../node_modules/pipegl/src/util/check.ts","./isPowerOf2":"../node_modules/pipegl/src/util/isPowerOf2.ts","./getPixelSize":"../node_modules/pipegl/src/util/getPixelSize.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/state/TextureState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureState = void 0;

var _check = require("../util/check");

var _getExtendCopy = require("../util/getExtendCopy");

var _Transpose = require("../core/Transpose");

var _detectComponent = require("../util/detectComponent");

var _MipmapPool = require("../pool/MipmapPool");

var _TexImagePool = require("../pool/TexImagePool");

var _GTexture = require("../res/GTexture");

var _checkTexture = require("../util/checkTexture");

var _Constant = require("../core/Constant");

const GL_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FE;
const GL_TEXTURE_CUBE_MAPS = ['TEXTURE_CUBE_MAP_POSITIVE_X', 'TEXTURE_CUBE_MAP_NEGATIVE_X', 'TEXTURE_CUBE_MAP_POSITIVE_Y', 'TEXTURE_CUBE_MAP_NEGATIVE_Y', 'TEXTURE_CUBE_MAP_POSITIVE_Z', 'TEXTURE_CUBE_MAP_NEGATIVE_Z'];
const CHANNEL_TEX_COLOR = {
  1: 'LUMINANCE',
  2: 'LUMINANCE_ALPHA',
  3: 'RGB',
  4: 'RGBA'
};

class TextureState {
  constructor(gl, extLib, limLib, stats) {
    this.setImage = (info, target, mipLevel) => {
      const gl = this.gl,
            data = info.data,
            inTexColor = info.inTexColor,
            texColor = info.texColor,
            component = info.component,
            width = info.width,
            height = info.height,
            target0 = _Constant.CTextureMapTarget[target];

      if (info.compressed) {
        gl.compressedTexImage2D(target0, mipLevel, _Constant.CTextureColor[inTexColor], width, height, 0, data || null);
      } else if (info.neddsCopy) {
        gl.copyTexImage2D(target0, mipLevel, _Constant.CTextureColor[texColor], info.xOffset, info.yOffset, width, height, 0);
      } else {
        gl.texImage2D(target0, mipLevel, _Constant.CTextureColor[inTexColor], width, height, 0, _Constant.CTextureColor[texColor], _Constant.CTextureComponent[component], data || null);
      }
    };

    this.setMipmap = (mimap, target) => {
      const images = mimap.images;

      for (let i = 0, len = images.length; i < len; i++) {
        const image = images[i];
        if (!image) return;
        this.setImage(image, target, i);
      }
    };

    this.setTexFlags = flags => {
      const gl = this.gl;
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flags.flipY);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, flags.premultiplyAlpha);
      gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, _Constant.CColorSpace[flags.colorSpace]);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, flags.unpackAlignment);
    };

    this.setTexInfo = (info, target) => {
      const extLib = this.extLib,
            gl = this.gl,
            target0 = _Constant.CTextureMapTarget[target];
      if (info.minFilter) gl.texParameteri(target0, gl.TEXTURE_MIN_FILTER, _Constant.CTextureMINFilter[info.minFilter]);
      if (info.magFilter) gl.texParameteri(target0, gl.TEXTURE_MAG_FILTER, _Constant.CTextureMAGFilter[info.magFilter]);
      if (info.wrapS) gl.texParameteri(target0, gl.TEXTURE_WRAP_S, _Constant.CTextureFillTarget[info.wrapS]);
      if (info.wrapT) gl.texParameteri(target0, gl.TEXTURE_WRAP_T, _Constant.CTextureFillTarget[info.wrapT]);
      if (info.anisotropic && extLib.get('EXT_texture_filter_anisotropic')) gl.texParameteri(target0, GL_TEXTURE_MAX_ANISOTROPY_EXT, info.anisotropic);

      if (info.genMipmaps) {
        gl.hint(gl.GENERATE_MIPMAP_HINT, info.mimmapHint);
        gl.generateMipmap(target0);
      }
    };

    this.fixTexInfo = opts => {
      const texInfo = {
        minFilter: 'NEAREST',
        magFilter: 'NEAREST',
        wrapS: 'CLAMP_TO_EDGE',
        wrapT: 'CLAMP_TO_EDGE',
        anisotropic: 1,
        genMipmaps: false,
        mimmapHint: _Constant.CMipmapHint['DONT_CARE']
      };

      if (opts.min) {
        texInfo.minFilter = opts.min;
        if (TextureState.MIPMAP_FILTERS.indexOf(_Constant.CTextureMINFilter[texInfo.minFilter]) >= 0) texInfo.genMipmaps = true;
      }

      if (opts.mag) {
        texInfo.magFilter = opts.mag;
      }

      if (opts.wrapS) {
        texInfo.wrapS = opts.wrapS;
      }

      if (opts.wrapT) {
        texInfo.wrapT = opts.wrapT;
      }

      if (opts.anisotropic) {
        const num = opts.anisotropic;
        (0, _check.check)(num >= 1 && num <= this.limLib.maxAnisotropic, `TextureState error: 各项异性过滤不在可用范围[${1}, ${this.limLib.maxAnisotropic}]`);
        texInfo.anisotropic = num;
      }

      if (opts.mipmap && !opts.min) texInfo.minFilter = 'NEAREST_MIPMAP_NEAREST';
      return texInfo;
    };

    this.fixMipmap = (mipmap, arr, shape, stride, offset, opts = {}) => {
      const imageData = mipmap.images[0] = _TexImagePool.texImagePool0.allocImage();

      (0, _getExtendCopy.getCopy)(imageData, mipmap, opts);
      (0, _check.check)(!imageData.compressed || arr instanceof Uint8Array, `TextureState error: 压缩纹理必须以Uint8Array格式传输`);
      imageData.component = mipmap.component = (0, _detectComponent.detectComponent)(arr);
      const w = shape[0],
            h = shape[1],
            c = shape[2];
      imageData.width = w;
      imageData.height = h;
      imageData.channels = c;
      imageData.texColor = imageData.inTexColor = CHANNEL_TEX_COLOR[c];
      imageData.neddsFree = true;

      _Transpose.Transpose.TransposeData(imageData, arr, stride[0], stride[1], stride[2], offset);

      (0, _getExtendCopy.getCopy)(mipmap, mipmap.images[0], opts);
      return mipmap;
    };

    this.createTexture2D = (data, w, h, c, opts = {}) => {
      const gl = this.gl;
      const offset = opts.offset || 0;
      const stride = opts.stride || [0, 0, 0];
      const gTexture = new _GTexture.GTexture(gl, this.limLib, 'TEXTURE_2D', this.stats);
      const texInfo = this.fixTexInfo(opts);
      gTexture.TexInfo = texInfo;

      const mipmap = _MipmapPool.mipmapPool0.allocMipmap();

      const imageData = mipmap.images[0] = _TexImagePool.texImagePool0.allocImage();

      mipmap.mipmask = 1;
      imageData.width = mipmap.width = w;
      imageData.height = mipmap.height = h;
      imageData.channels = mipmap.channels = c || 4;

      if (stride[0] === 0 && stride[1] === 0 && stride[2] === 0) {
        stride[0] = imageData.channels;
        stride[1] = imageData.channels * imageData.width;
        stride[2] = 1;
      }

      (0, _check.check)(imageData.channels >= 1 && imageData.channels <= 4, `TextureState error: 纹理通道必须在1-4之间`);
      if (gTexture.TexInfo.genMipmaps) mipmap.mipmask = (mipmap.width << 1) - 1;
      gTexture.TexFlag = mipmap;
      gTexture.Mipmap = this.fixMipmap(mipmap, data, [imageData.width, imageData.height, imageData.channels], stride, offset, opts);
      (0, _checkTexture.checkMipmapTexture2D)(texInfo, mipmap, this.extLib, this.limLib);
      if (texInfo.genMipmaps) gTexture.Mipmap.mipmask = (mipmap.width << 1) - 1;
      gTexture.tempBind();
      this.setTexFlags(gTexture.TexFlag);
      this.setMipmap(gTexture.Mipmap, 'TEXTURE_2D');
      this.setTexInfo(gTexture.TexInfo, 'TEXTURE_2D');
      gTexture.tempRestore();

      _MipmapPool.mipmapPool0.freeMipmap(mipmap);

      return gTexture;
    };

    this.createTextureCube = (faces, w, h, c, opts = {}) => {
      const offset = opts.offset || 0;
      const stride = opts.stride || [0, 0, 0];
      const gTexture = new _GTexture.GTexture(this.gl, this.limLib, 'TEXTURE_CUBE_MAP', this.stats);
      const texInfo = this.fixTexInfo(opts);
      gTexture.TexInfo = texInfo;
      const gFaces = [];
      Object.keys(faces).forEach(key => {
        const data = faces[key];

        const mipmap = _MipmapPool.mipmapPool0.allocMipmap();

        const imageData = mipmap.images[0] = _TexImagePool.texImagePool0.allocImage();

        mipmap.mipmask = 1;
        imageData.width = mipmap.width = w;
        imageData.height = mipmap.height = h;
        imageData.channels = mipmap.channels = c || 4;

        if (stride[0] === 0 && stride[1] === 0 && stride[2] === 0) {
          stride[0] = imageData.channels;
          stride[1] = imageData.channels * imageData.width;
          stride[2] = 1;
        }

        (0, _check.check)(imageData.channels >= 1 && imageData.channels <= 4, `TextureState error: 纹理通道必须在1-4之间`);
        this.fixMipmap(mipmap, data, [imageData.width, imageData.height, imageData.channels], stride, offset, opts);
        gFaces.push(mipmap);
      });
      gTexture.Mipmap = gFaces[0];
      if (texInfo.genMipmaps) gTexture.Mipmap.mipmask = (gFaces[0].width << 1) - 1;else gTexture.Mipmap.mipmask = gFaces[0].mipmask;
      gTexture.TexFlag = gFaces[0];
      (0, _checkTexture.checkTextureCube)(texInfo, gTexture.Mipmap, gFaces, this.limLib);
      gTexture.tempBind();
      this.setTexFlags(gTexture.TexFlag);
      gFaces.forEach((mipmap, i) => {
        this.setMipmap(mipmap, GL_TEXTURE_CUBE_MAPS[i]);
      });
      this.setTexInfo(texInfo, 'TEXTURE_CUBE_MAP');
      gTexture.tempRestore();
      gFaces.forEach(mipmap => {
        _MipmapPool.mipmapPool0.freeMipmap(mipmap);
      });
      return gTexture;
    };

    this.gl = gl;
    this.extLib = extLib;
    this.limLib = limLib;
    this.stats = stats;
  }

}

exports.TextureState = TextureState;
TextureState.TEXTURE_SET = _GTexture.TEXTURE_SET;
TextureState.MIPMAP_FILTERS = [0x2700, 0x2702, 0x2701, 0x2703];
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../util/getExtendCopy":"../node_modules/pipegl/src/util/getExtendCopy.ts","../core/Transpose":"../node_modules/pipegl/src/core/Transpose.ts","../util/detectComponent":"../node_modules/pipegl/src/util/detectComponent.ts","../pool/MipmapPool":"../node_modules/pipegl/src/pool/MipmapPool.ts","../pool/TexImagePool":"../node_modules/pipegl/src/pool/TexImagePool.ts","../res/GTexture":"../node_modules/pipegl/src/res/GTexture.ts","../util/checkTexture":"../node_modules/pipegl/src/util/checkTexture.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/res/GProgram.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PROGRAM_SET = exports.GProgram = void 0;

var _check = require("../util/check");

var _Dispose = require("../core/Dispose");

var _Constant = require("../core/Constant");

const PROGRAM_SET = new Map();
exports.PROGRAM_SET = PROGRAM_SET;

class GProgram extends _Dispose.Dispose {
  constructor(gl, shaderState, stringState, fragShaderId, vertShaderId, attribLocations) {
    super();

    this.use = () => {
      (0, _check.check)(this.program, `Program错误，空的program无法切换使用`);
      this.gl.useProgram(this.program);
    };

    this.link = attributeLocations => {
      const gl = this.gl,
            shaderState = this.shaderState,
            fragId = this.fragId,
            vertId = this.vertId;
      const fragShader = shaderState.createShader('FRAGMENT_SHADER', fragId);
      const vertShader = shaderState.createShader('VERTEX_SHADER', vertId);
      const program = this.program = gl.createProgram();
      gl.attachShader(program, fragShader.Shader);
      gl.attachShader(program, vertShader.Shader);
      attributeLocations === null || attributeLocations === void 0 ? void 0 : attributeLocations.forEach((v, i) => {
        const binding = attributeLocations[i];
        gl.bindAttribLocation(program, i, binding);
      });
      gl.linkProgram(program);
      (0, _check.check)(gl.getProgramParameter(program, gl.LINK_STATUS), `Program错误，编译错误${gl.getProgramInfoLog(program)}`);
      this.activeUniforms();
      this.activeAttributes();
    };

    this.activeUniforms = () => {
      const insertActvieInfo = info => {
        for (let i = 0, len = this.uniforms.length; i < len; i++) {
          if (this.uniforms[i].id === info.id) {
            this.uniforms[i].location = info.location;
            return;
          }
        }

        this.uniforms.push(info);
      };

      const gl = this.gl,
            program = this.program,
            stringState = this.stringState;
      const numUniforms = gl.getProgramParameter(program, _Constant.CActiveTarget['ACTIVE_UNIFORMS']);

      for (let i = 0; i < numUniforms; ++i) {
        const info = gl.getActiveUniform(program, i);

        if (info) {
          if (info.size > 1) {
            for (let j = 0, len = info.size; j < len; ++j) {
              const name = info.name.replace(`[0]`, `[${j}]`);
              insertActvieInfo({
                name: name,
                id: stringState.id(name),
                location: gl.getUniformLocation(program, name),
                info: info
              });
            }
          }

          let uniName = info.name;

          if (info.size > 1) {
            uniName = uniName.replace('[0]', '');
          }

          insertActvieInfo({
            name: uniName,
            id: stringState.id(uniName),
            location: gl.getUniformLocation(program, uniName),
            info: info
          });
        }
      }
    };

    this.activeAttributes = () => {
      const insertActiveInfo = info => {
        for (let i = 0, len = this.attributes.length; i < len; i++) {
          if (this.attributes[i].id === info.id) {
            this.attributes[i].location = info.location;
            return;
          }
        }

        this.attributes.push(info);
      };

      const gl = this.gl,
            program = this.program;
      const numAttributes = gl.getProgramParameter(program, _Constant.CActiveTarget['ACTIVE_ATTRIBUTES']);

      for (let i = 0; i < numAttributes; ++i) {
        const info = gl.getActiveAttrib(program, i);
        if (info) insertActiveInfo({
          name: info.name,
          id: this.stringState.id(info.name),
          location: gl.getAttribLocation(program, info.name),
          info
        });
      }
    };

    this.gl = gl;
    this.fragId = fragShaderId;
    this.vertId = vertShaderId;
    this.program = null;
    this.uniforms = [];
    this.attributes = [];
    this.shaderState = shaderState;
    this.stringState = stringState;
    this.link(attribLocations);
    PROGRAM_SET.set(this.ID, this);
  }

  dispose() {
    throw new Error('Method not implemented.');
  }

  decRef() {
    throw new Error('Method not implemented.');
  }

  get Uniforms() {
    return this.uniforms;
  }

  get Attributes() {
    return this.attributes;
  }

  get AttActiveInfo() {
    if (!this.attPosition) {
      this.attPosition = new Map();
      this.attributes.forEach(att => {
        this.attPosition.set(att.name, att);
      });
    }

    return this.attPosition;
  }

}

exports.GProgram = GProgram;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../core/Dispose":"../node_modules/pipegl/src/core/Dispose.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/state/ProgramState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgramState = void 0;

var _check = require("../util/check");

var _GProgram = require("../res/GProgram");

class ProgramState {
  constructor(gl, shaderState, stringState) {
    this.createProgram = (frag, vert, attribLocations) => {
      (0, _check.check)(vert.length >= 0, `ProgramState error: vertex shader is missing`);
      (0, _check.check)(frag.length >= 0, `ProgramState error: fragment shader is missing`);
      const gl = this.gl,
            shaderState = this.shaderState,
            stringState = this.stringState;
      const fragShader = shaderState.createShader('FRAGMENT_SHADER', stringState.id(frag));
      const vertShader = shaderState.createShader('VERTEX_SHADER', stringState.id(vert));
      const reglProgram = new _GProgram.GProgram(gl, shaderState, stringState, fragShader.ID, vertShader.ID, attribLocations);
      return reglProgram;
    };

    this.useProgram = reglProgramId => {
      const reglProgram = ProgramState.PROGRAM_SET.get(reglProgramId);
      reglProgram.use();
      this.reglProgram = reglProgram;
    };

    this.gl = gl;
    this.shaderState = shaderState;
    this.stringState = stringState;
    this.reglProgram = null;
  }

  get Current() {
    return this.reglProgram;
  }

}

exports.ProgramState = ProgramState;
ProgramState.PROGRAM_SET = _GProgram.PROGRAM_SET;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../res/GProgram":"../node_modules/pipegl/src/res/GProgram.ts"}],"../node_modules/pipegl/src/res/GElementsbuffer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGLELEMENTBUFFER_SET = exports.GElementsbuffer = void 0;

var _Dispose = require("../core/Dispose");

var _Constant = require("../core/Constant");

const REGLELEMENTBUFFER_SET = new Map();
exports.REGLELEMENTBUFFER_SET = REGLELEMENTBUFFER_SET;

class GElementsbuffer extends _Dispose.Dispose {
  constructor(reglBuffer, primitive = 'TRIANGLES') {
    super();

    this.subData = (data, offset) => {
      this.reglBuffer.subData(data, offset);
    };

    this.paddingWithData = (data, usage, component) => {
      this.reglBuffer.paddingWithData(data, usage, component);
    };

    this.bind = () => {
      this.reglBuffer.bind();
    };

    this.vertCount = 0;
    this.reglBuffer = reglBuffer;
    this.primitive = _Constant.CPrimitive[primitive || 'TRIANGLES'];
    REGLELEMENTBUFFER_SET.set(this.ID, this);
  }

  dispose() {
    this;
  }

  decRef() {
    throw new Error("Method not implemented.");
  }

  get Dimension() {
    return this.reglBuffer.Dimension;
  }

  get ByteLength() {
    return this.reglBuffer.ByteLength;
  }

  set Primitive(v) {
    this.primitive = v;
  }

  get Primitive() {
    return this.primitive;
  }

  get VertCount() {
    return this.vertCount;
  }

  set VertCount(v) {
    this.vertCount = v;
  }

  get Component() {
    return this.reglBuffer.Component;
  }

}

exports.GElementsbuffer = GElementsbuffer;
},{"../core/Dispose":"../node_modules/pipegl/src/core/Dispose.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/state/ElementState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementsState = void 0;

var _check = require("../util/check");

var _Constant = require("../core/Constant");

var _GElementsbuffer = require("../res/GElementsbuffer");

class ElementsState {
  constructor(gl, extLib, bufferState, stats) {
    this.streamPool = [];

    this.initElements = opts => {
      opts.reglElementbuffer.bind();
      opts.reglElementbuffer.paddingWithData(opts.data, opts.usage, opts.component);

      if (!opts.primitive) {
        opts.reglElementbuffer.Primitive = opts.reglElementbuffer.Dimension === 1 ? _Constant.CPrimitive['POINTS'] : opts.reglElementbuffer.Dimension === 2 ? _Constant.CPrimitive['LINES'] : opts.reglElementbuffer.Dimension === 3 ? _Constant.CPrimitive['TRIANGLES'] : _Constant.CPrimitive[opts.primitive];
      } else opts.reglElementbuffer.Primitive = _Constant.CPrimitive[opts.primitive || 'TRIANGLES'];

      opts.count = opts.count || opts.reglElementbuffer.ByteLength;
      if (opts.component === 'UNSIGNED_SHORT') opts.count >>= 1;else if (opts.component === 'UNSIGNED_INT') opts.count >>= 2;
      opts.reglElementbuffer.VertCount = opts.count;
      return opts.reglElementbuffer;
    };

    this.fixComponent = component => {
      switch (component) {
        case 'UNSIGNED_BYTE':
        case 'BYTE':
          component = 'UNSIGNED_BYTE';
          break;

        case 'UNSIGNED_SHORT':
        case 'SHORT':
          component = 'UNSIGNED_SHORT';
          break;

        case 'UNSIGNED_INT':
        case 'INT':
          component = this.extLib.get('OES_element_index_uint') ? 'UNSIGNED_INT' : 'UNSIGNED_SHORT';
          break;

        default:
          (0, _check.check)(false, `ElementsState Error: unvilade paramter ${component}`);
      }

      return component;
    };

    this.getElementsbuffer = id => {
      return ElementsState.ELEMENTBUFFER_SET.get(id);
    };

    this.createElementsbuffer = opts => {
      const data = opts.data,
            count = opts.count || 0,
            usage = opts.usage || 'STATIC_DRAW',
            target = 'ELEMENT_ARRAY_BUFFER',
            component = this.fixComponent(opts.component) || 'UNSIGNED_SHORT',
            dimension = opts.dimension || 'TRIANGLES',
            primitive = opts.primitive || 'TRIANGLES',
            byteLength = opts.data.length;
      const reglbuffer = this.bufferState.createBuffer({
        target: target,
        data: data,
        usage: usage,
        component: component,
        dimension: dimension,
        byteLength: byteLength
      });
      const reglElementbuffer = new _GElementsbuffer.GElementsbuffer(reglbuffer, primitive);
      this.stats.elementsCount++;
      return this.initElements({
        reglElementbuffer: reglElementbuffer,
        data: data,
        component: component,
        usage: usage,
        primitive: primitive,
        count: count
      });
    };

    this.createStreamElementsbuffer = opts => {
      const data = opts.data,
            count = opts.count || 0,
            usage = opts.usage || 'STREAM_DRAW',
            target = 'ELEMENT_ARRAY_BUFFER',
            component = this.fixComponent(opts.component) || 'UNSIGNED_SHORT',
            dimension = opts.dimension || 'TRIANGLES',
            primitive = opts.primitive || 'TRIANGLES',
            byteLength = opts.data.length;
      const reglbuffer = this.bufferState.createBuffer({
        target: target,
        data: data,
        usage: usage,
        component: component,
        dimension: dimension,
        byteLength: byteLength
      });
      const reglElementbuffer = new _GElementsbuffer.GElementsbuffer(reglbuffer, primitive);
      this.stats.elementsCount++;
      return this.initElements({
        reglElementbuffer: reglElementbuffer,
        data: data,
        component: component,
        usage: usage,
        primitive: primitive,
        count: count
      });
    };

    this.destoryStreamElementsbuffer = streamElementbuffer => {
      this.streamPool.push(streamElementbuffer);
    };

    this.gl = gl;
    this.extLib = extLib;
    this.bufferState = bufferState;
    this.stats = stats;
  }

}

exports.ElementsState = ElementsState;
ElementsState.ELEMENTBUFFER_SET = _GElementsbuffer.REGLELEMENTBUFFER_SET;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts","../res/GElementsbuffer":"../node_modules/pipegl/src/res/GElementsbuffer.ts"}],"../node_modules/pipegl/src/util/isNDArray.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNDArray = void 0;

var _getFlatten = require("./getFlatten");

const isNDArray = v => {
  if (Array.isArray(v)) {
    const shape = (0, _getFlatten.getArrayShape)(v);
    if (shape.length > 0 && shape.length < 3) return true;
  }

  return false;
};

exports.isNDArray = isNDArray;
},{"./getFlatten":"../node_modules/pipegl/src/util/getFlatten.ts"}],"../node_modules/pipegl/src/util/isTypedArray.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTypedArray = void 0;

const isTypedArray = v => {
  return v instanceof Uint8Array || v instanceof Uint16Array || v instanceof Uint32Array || v instanceof Int8Array || v instanceof Int16Array || v instanceof Int32Array || v instanceof Float32Array || v instanceof Float64Array || v instanceof Uint8ClampedArray;
};

exports.isTypedArray = isTypedArray;
},{}],"../node_modules/pipegl/src/util/isBufferArray.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBufferArray = void 0;

var _isNDArray = require("./isNDArray");

var _isTypedArray = require("./isTypedArray");

const isBufferArray = v => {
  return Array.isArray(v) || (0, _isTypedArray.isTypedArray)(v) || (0, _isNDArray.isNDArray)(v);
};

exports.isBufferArray = isBufferArray;
},{"./isNDArray":"../node_modules/pipegl/src/util/isNDArray.ts","./isTypedArray":"../node_modules/pipegl/src/util/isTypedArray.ts"}],"../node_modules/pipegl/src/util/checkAttribute.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAttribute = void 0;

var _check = require("./check");

var _isNDArray = require("./isNDArray");

var _ = require("..");

const checkAttribute = v => {
  let checkResult = false;
  if ((0, _isNDArray.isNDArray)(v)) checkResult = true;
  if (v.buffer) checkResult = true;
  if (v instanceof _.Props) checkResult = true;
  (0, _check.check)(checkResult, `不支持的attribute类型，当前仅支持number[], number[][], number[][][], Props<T>, IAttributeBuffer类型`);
};

exports.checkAttribute = checkAttribute;
},{"./check":"../node_modules/pipegl/src/util/check.ts","./isNDArray":"../node_modules/pipegl/src/util/isNDArray.ts","..":"../node_modules/pipegl/src/index.ts"}],"../node_modules/pipegl/src/util/defaultValue.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultValue = void 0;

const defaultValue = (v, dv) => {
  return v === null || v === undefined ? dv : v;
};

exports.defaultValue = defaultValue;
},{}],"../node_modules/pipegl/src/res/GVertexArrayObject.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VAO_SET = exports.GVertexArrayObject = void 0;

var _check = require("../util/check");

var _GBuffer = require("./GBuffer");

var _Dispose = require("../core/Dispose");

var _defaultValue = require("../util/defaultValue");

var _Constant = require("../core/Constant");

const VAO_SET = new Map();
exports.VAO_SET = VAO_SET;

class GVertexArrayObject extends _Dispose.Dispose {
  constructor(opts) {
    super();
    this.attributeSet = new Map();

    this.refresh = opts => {
      this.attributeSet = opts.recordSet || this.attributeSet;
      this.elements = opts.elements || this.elements;
      this.offset = (0, _defaultValue.defaultValue)(opts.offset, this.offset);
      this.count = (0, _defaultValue.defaultValue)(opts.count, this.count);
      this.instances = (0, _defaultValue.defaultValue)(opts.instances, this.instances);
      this.primitive = (0, _defaultValue.defaultValue)(_Constant.CPrimitive[opts.primitive], this.primitive);
      this.bindings = false;
    };

    this.bindAttrs = () => {
      var _a;

      this.refCount++;
      this.extVAO.bindVertexArrayOES(this.vao);
      if (this.bindings) return;
      const gl = this.gl;
      (_a = this.attributeSet) === null || _a === void 0 ? void 0 : _a.forEach((att, loc) => {
        if (att.buffer) {
          if (att.buffer instanceof _GBuffer.GBuffer) {
            const act = this.programState.Current.AttActiveInfo.get(loc);
            (0, _check.check)(act, `GVertexArrayObject 错误: VAO绑定属性与当前Program不一致`);
            const pos = act.location;
            const size = _Constant.CAttributeTS[act.info.type];
            gl.vertexAttribPointer(pos, size, att.component, att.normalized, att.stride, att.offset);
            gl.enableVertexAttribArray(pos);
            if (this.extITA && att.divisor) this.extITA.vertexAttribDivisorANGLE(pos, att.divisor);
          } else if (Array.isArray(att.buffer)) {
            const act = this.programState.Current.AttActiveInfo.get(loc);
            (0, _check.check)(act, `GVertexArrayObject 错误: VAO绑定属性与当前Program不一致`);
            const pos = act.location;
            gl.disableVertexAttribArray(pos);
            gl.vertexAttrib4fv(pos, att.buffer);
          }
        }
      });
      this.elements ? gl.bindBuffer(_Constant.CArraybufferTarget['ELEMENT_ARRAY_BUFFER'], this.elements) : gl.bindBuffer(_Constant.CArraybufferTarget['ELEMENT_ARRAY_BUFFER'], null);
      this.bindings = true;
    };

    this.gl = opts.gl;
    this.extVAO = opts.extVAO;
    this.extITA = opts.extITA;
    this.programState = opts.programState;
    this.instances = -1;
    this.offset = 0;
    this.count = 0;
    this.bindings = false;
    this.primitive = _Constant.CPrimitive['TRIANGLES'];
    this.stats = opts.stats;
    this.vao = this.extVAO.createVertexArrayOES();
    this.stats.vaoCount++;
    VAO_SET.set(this.ID, this);
  }

  dispose() {
    throw new Error("Method not implemented.");
  }

  decRef() {
    if (this.refCount-- == 0) {
      this.dispose();
    }
  }

  set Elements(v) {
    this.elements = v;
  }

  get Elements() {
    return this.elements;
  }

  get Offset() {
    return this.offset;
  }

  get Count() {
    return this.count;
  }

  get Instances() {
    return this.instances;
  }

  get Primitive() {
    return this.primitive;
  }

}

exports.GVertexArrayObject = GVertexArrayObject;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","./GBuffer":"../node_modules/pipegl/src/res/GBuffer.ts","../core/Dispose":"../node_modules/pipegl/src/core/Dispose.ts","../util/defaultValue":"../node_modules/pipegl/src/util/defaultValue.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/state/AttributeState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeState = void 0;

var _check = require("../util/check");

var _Constant = require("../core/Constant");

var _isBufferArray = require("../util/isBufferArray");

var _GElementsbuffer = require("../res/GElementsbuffer");

var _checkAttribute = require("../util/checkAttribute");

var _GVertexArrayObject = require("../res/GVertexArrayObject");

class AttributeState {
  constructor(gl, extLib, limLib, bufferState, elementState, programState, stats) {
    this.getAttribute = i => {
      return this.attributeBindings[i];
    };

    this.applyAttribute = attrs => {
      var _a;

      const RECORD_SET = new Map();
      (_a = Object.keys(attrs)) === null || _a === void 0 ? void 0 : _a.forEach(key => {
        const v = attrs[key];
        (0, _checkAttribute.checkAttribute)(v);
        const record = {
          name: key
        };

        if ((0, _isBufferArray.isBufferArray)(v)) {
          const v0 = v;
          const buf = this.bufferState.createBuffer({
            data: v0,
            target: 'ARRAY_BUFFER'
          });
          record.buffer = buf;
          record.component = buf.Component;
          record.divisor = 0;
          record.offset = 0;
          record.stride = 0;
          record.normalized = false;
        } else if (v.buffer) {
          const v0 = v;
          const buf = (0, _isBufferArray.isBufferArray)(v0.buffer) ? this.bufferState.createBuffer({
            data: v0.buffer,
            target: 'ARRAY_BUFFER'
          }) : v0.buffer;
          record.offset = v0.offset | 0;
          (0, _check.check)(record.offset >= 0, `offset只能是大于等于0的数字`);
          record.stride = v0.stride | 0;
          (0, _check.check)(record.stride >= 0 && record.stride < 256, `扫描线宽取值范围必须[0,255]`);
          record.normalized = !!v0.normalized;
          record.component = _Constant.CComponent[v0.component] || buf.Component;
          (0, _check.check)(Object.values(_Constant.CComponent).indexOf(record.component) !== -1, `数据类型只能是${Object.values(_Constant.CComponent)}`);
          (0, _check.check)(v0.divisor === 0 || this.extLib.get('ANGLE_instanced_arrays'), `不支持ANGLE_instanced_arrays插件，不能设置实例化参数divisor`);
          (0, _check.check)(v0.divisor >= 0, `不支持的divisor值`);
          record.buffer = buf;
          record.component = buf.Component;
        }

        RECORD_SET.set(record.name, record);
      });
      return RECORD_SET;
    };

    this.createREGLVertexArrayObject = (attrs, opts = {}) => {
      const RECORD_SET = this.applyAttribute(attrs);
      let ELEMENTS = null;

      if (opts.elements) {
        if (opts.elements instanceof _GElementsbuffer.GElementsbuffer) ELEMENTS = opts.elements;else ELEMENTS = this.elementState.createElementsbuffer({
          data: opts.elements,
          component: 'UNSIGNED_SHORT',
          primitive: opts.primitive || 'TRIANGLES'
        });
      }

      const vertexArrayObject = new _GVertexArrayObject.GVertexArrayObject({
        gl: this.gl,
        extVAO: this.extVAO,
        extITA: this.extITA,
        programState: this.programState,
        stats: this.stats
      });
      vertexArrayObject.refresh({
        recordSet: RECORD_SET,
        elements: ELEMENTS,
        offset: opts.offset,
        count: opts.count,
        instances: opts.instances,
        primitive: opts.primitive
      });
      return vertexArrayObject;
    };

    this.setVAO = vao => {
      var _a;

      if (vao) this.current = vao;else {
        (_a = this.Current) === null || _a === void 0 ? void 0 : _a.decRef();
        this.current = null;
      }
    };

    this.gl = gl;
    this.extLib = extLib;
    this.limLib = limLib;
    this.bufferState = bufferState;
    this.elementState = elementState;
    this.programState = programState;
    this.current = null;
    this.extVAO = extLib.getByForce('OES_vertex_array_object');
    this.extITA = extLib.getByForce('ANGLE_instanced_arrays');
    this.attributeBindings = new Array(limLib.maxAttributes);

    for (let i = 0; i < limLib.maxAttributes; i++) this.attributeBindings[i] = {};

    this.stats = stats;
  }

  get Current() {
    return this.current;
  }

}

exports.AttributeState = AttributeState;
AttributeState.VAO_SET = _GVertexArrayObject.VAO_SET;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts","../util/isBufferArray":"../node_modules/pipegl/src/util/isBufferArray.ts","../res/GElementsbuffer":"../node_modules/pipegl/src/res/GElementsbuffer.ts","../util/checkAttribute":"../node_modules/pipegl/src/util/checkAttribute.ts","../res/GVertexArrayObject":"../node_modules/pipegl/src/res/GVertexArrayObject.ts"}],"../node_modules/pipegl/src/res/GRenderbuffer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RENDERBUFFER_SET = exports.GRenderbuffer = void 0;

var _Dispose = require("../core/Dispose");

var _Constant = require("../core/Constant");

const RENDERBUFFER_SET = new Map();
exports.RENDERBUFFER_SET = RENDERBUFFER_SET;

class GRenderbuffer extends _Dispose.Dispose {
  constructor(gl, width, height, format, stats) {
    super();

    this.bind = () => {
      const gl = this.gl;
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
      gl.renderbufferStorage(gl.RENDERBUFFER, this.Format, this.width, this.height);
      this.refCount++;
    };

    this.gl = gl;
    this.renderbuffer = gl.createRenderbuffer();
    this.format = format || 'RGBA4';
    this.width = width;
    this.height = height;
    this.stats = stats;
    this.stats.renderbufferCount++;
    RENDERBUFFER_SET.set(this.ID, this);
  }

  dispose() {
    const gl = this.gl;
    const handler = this.renderbuffer;
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.deleteRenderbuffer(handler);
    this.renderbuffer = null;
    this.refCount = 0;
    RENDERBUFFER_SET.delete(this.ID);
    this.stats.renderbufferCount--;
  }

  decRef() {
    if (--this.refCount <= 0) this.dispose();
  }

  get Width() {
    return this.width;
  }

  get Height() {
    return this.height;
  }

  get Renderbuffer() {
    return this.renderbuffer;
  }

  get Format() {
    return _Constant.CRenderbufferColor[this.format];
  }

}

exports.GRenderbuffer = GRenderbuffer;
},{"../core/Dispose":"../node_modules/pipegl/src/core/Dispose.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/res/GAttachment.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GAttachment = void 0;

var _Dispose = require("../core/Dispose");

var _GTexture = require("./GTexture");

var _GRenderbuffer = require("./GRenderbuffer");

var _Constant = require("../core/Constant");

class GAttachment extends _Dispose.Dispose {
  constructor(gl, target, attach) {
    var _a, _b, _c, _d;

    super();

    this.attach = (location, textureTarget = -1) => {
      const gl = this.gl,
            target = textureTarget === -1 ? this.target : textureTarget;
      if (this.reglTexture) gl.framebufferTexture2D(gl.FRAMEBUFFER, location, target, this.reglTexture.Texutre, 0);else gl.framebufferRenderbuffer(gl.FRAMEBUFFER, location, target, this.reglRenderbuffer.Renderbuffer);
    };

    this.gl = gl;
    this.target = _Constant.CAttachmentTarget[target || 'TEXTURE_2D'] || 0;
    if (attach instanceof _GTexture.GTexture) this.reglTexture = attach;else if (attach instanceof _GRenderbuffer.GRenderbuffer) this.reglRenderbuffer = attach;
    this.width = ((_a = this.reglTexture) === null || _a === void 0 ? void 0 : _a.Width) || ((_b = this.reglRenderbuffer) === null || _b === void 0 ? void 0 : _b.Width) || 0;
    this.height = ((_c = this.reglTexture) === null || _c === void 0 ? void 0 : _c.Height) || ((_d = this.reglRenderbuffer) === null || _d === void 0 ? void 0 : _d.Height) || 0;
  }

  dispose() {
    throw new Error("Method not implemented.");
  }

  decRef() {
    if (--this.refCount <= 0) this.dispose();
  }

  get Texture() {
    return this.reglTexture;
  }

}

exports.GAttachment = GAttachment;
},{"../core/Dispose":"../node_modules/pipegl/src/core/Dispose.ts","./GTexture":"../node_modules/pipegl/src/res/GTexture.ts","./GRenderbuffer":"../node_modules/pipegl/src/res/GRenderbuffer.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/res/GFramebuffer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GFramebuffer = exports.FRAMEBUFFER_SET = void 0;

var _check = require("../util/check");

var _Dispose = require("../core/Dispose");

const COLOR_ATTACHMENT0_WEBGL = 0x8CE0;
const TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
const FRAMEBUFFER_SET = new Map();
exports.FRAMEBUFFER_SET = FRAMEBUFFER_SET;

class GFramebuffer extends _Dispose.Dispose {
  constructor(gl, limLib, stats) {
    super();
    this.colorAttachments = [];
    this.depthAttachment = null;
    this.stencilAttachment = null;
    this.depthStencilAttachment = null;

    this.refreshAttachment = opts => {
      this.colorDrawbuffers = [];
      this.colorAttachments = opts.colorAttachments;
      this.depthAttachment = opts.depthAttachment;
      this.stencilAttachment = opts.stencilAttachment;
      this.depthStencilAttachment = opts.depthStencilAttachment;
      this.colorAttachments.forEach((attachment, index) => this.colorDrawbuffers.push(COLOR_ATTACHMENT0_WEBGL + index));
    };

    this.bind = (target = 0) => {
      if (!this.IsCubeMapAttachment) {
        (0, _check.check)(target === 0, `GFramebuffer Error: 非cube map FBO时只允许绑定0号fbo。`);
        this.refCount++;
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
      } else {
        (0, _check.check)(target >= 0 && target < 6, `GFramebuffer Error: cube map FBO只允许绑定0-5号FBO。`);
        this.refCount++;
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebufferCube[target]);
      }
    };

    this.unbind = () => {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    };

    this.updateStencilDetphBuffer = gl => {
      for (let i = this.colorAttachments.length; i < this.limLib.maxColorAttachments; ++i) {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, null, 0);
      }

      if (this.depthAttachment) {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, null, 0);
        this.depthAttachment.attach(gl.DEPTH_ATTACHMENT);
      }

      if (this.stencilAttachment) {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT, gl.TEXTURE_2D, null, 0);
        this.depthAttachment.attach(gl.STENCIL_ATTACHMENT);
      }

      if (this.depthStencilAttachment) {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.TEXTURE_2D, null, 0);
        this.depthAttachment.attach(gl.DEPTH_STENCIL_ATTACHMENT);
      }
    };

    this.chechFramebufferStatus = gl => {
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      (0, _check.check)(!gl.isContextLost() && status === gl.FRAMEBUFFER_COMPLETE, `GFramebuffer 错误: 错误码${status}`);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      const ERROR = gl.getError();
      (0, _check.check)(ERROR === gl.NO_ERROR, `GFramebuffer 错误: gl上下文错误, 错误码 ${ERROR}`);
      (0, _check.check)(ERROR !== gl.INVALID_ENUM, `GFramebuffer 错误: 请检查是否使用了多个颜色附件，多颜色附件必须开启插件WEBGL_draw_buffers`);
    };

    this.updateFramebuffer = () => {
      var _a;

      const gl = this.gl;

      if (!this.IsCubeMapAttachment) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        (_a = this.colorAttachments) === null || _a === void 0 ? void 0 : _a.forEach((colorAttachment, i) => {
          colorAttachment.attach(gl.COLOR_ATTACHMENT0 + i);
        });
        this.updateStencilDetphBuffer(gl);
        this.chechFramebufferStatus(gl);
      } else {
        (0, _check.check)(this.colorAttachments.length === 1, `GFramebuffer Error: cube map贴图时仅支持colorAttachment0为cube map Attachment`);
        const cubeAttachment = this.colorAttachments[0];
        this.framebufferCube = [gl.createFramebuffer(), gl.createFramebuffer(), gl.createFramebuffer(), gl.createFramebuffer(), gl.createFramebuffer(), gl.createFramebuffer()];
        this.framebufferCube.forEach((fb, i) => {
          gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
          cubeAttachment.attach(gl.COLOR_ATTACHMENT0, TEXTURE_CUBE_MAP_POSITIVE_X + i);
          this.updateStencilDetphBuffer(gl);
          this.chechFramebufferStatus(gl);
        });
      }
    };

    this.gl = gl;
    this.framebuffer = gl.createFramebuffer();
    this.width = 0;
    this.height = 0;
    this.limLib = limLib;
    this.stats = stats;
    this.stats.framebufferCount++;
    FRAMEBUFFER_SET.set(this.ID, this);
  }

  dispose() {
    const gl = this.gl;
    (0, _check.check)(this.framebuffer, `REGLFramebuffer 错误: 请不要重复清理FBO`);
    gl.deleteFramebuffer(this.framebuffer);
    this.framebuffer = null;
    this.stats.framebufferCount--;
    FRAMEBUFFER_SET.delete(this.ID);
  }

  decRef() {
    var _a;

    (_a = this.colorAttachments) === null || _a === void 0 ? void 0 : _a.forEach(attachment => {
      attachment.decRef();
    });
    this.depthAttachment.decRef();
    this.stencilAttachment.decRef();
    this.depthStencilAttachment.decRef();
    if (--this.refCount <= 0) this.dispose();
  }

  get ColorAttachments() {
    return this.colorAttachments;
  }

  get ColorDrawbuffers() {
    return this.colorDrawbuffers;
  }

  get IsCubeMapAttachment() {
    var _a;

    return (_a = this.colorAttachments[0]) === null || _a === void 0 ? void 0 : _a.Texture.IsCubeTexture;
  }

  get FBO() {
    return this.IsCubeMapAttachment ? this.framebufferCube : [this.framebuffer];
  }

}

exports.GFramebuffer = GFramebuffer;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../core/Dispose":"../node_modules/pipegl/src/core/Dispose.ts"}],"../node_modules/pipegl/src/state/FramebufferState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FramebufferState = void 0;

var _GTexture = require("../res/GTexture");

var _GAttachment = require("../res/GAttachment");

var _GFramebuffer = require("../res/GFramebuffer");

const UINT8EMPTY0 = new Uint8Array(0);

class FramebufferState {
  constructor(gl, textureState, renderbufferState, extLib, limLib, stats) {
    this.allocAttachment = opts => {
      const gl = this.gl;

      if (opts.isTexture) {
        const texture = this.textureState.createTexture2D(UINT8EMPTY0, opts.w, opts.h, opts.c);
        return new _GAttachment.GAttachment(gl, 'TEXTURE_2D', texture);
      } else {
        const rbo = this.renderbufferState.createRenderbuffer({
          w: opts.w,
          h: opts.h,
          format: opts.format || 'RGBA4'
        });
        return new _GAttachment.GAttachment(gl, 'RENDERBUFFER', rbo);
      }
    };

    this.createFramebuffer = opts => {
      var _a;

      const gl = this.gl;
      const fbo = new _GFramebuffer.GFramebuffer(gl, this.limLib, this.stats);
      const colorAttachments = [];
      (_a = opts.colors) === null || _a === void 0 ? void 0 : _a.forEach(color => {
        const TYPE = color instanceof _GTexture.GTexture ? 'TEXTURE_2D' : 'RENDERBUFFER';
        colorAttachments.push(new _GAttachment.GAttachment(gl, TYPE, color));
      });
      const depthAttachment = !opts.depth ? null : new _GAttachment.GAttachment(gl, 'RENDERBUFFER', opts.depth);
      const stencilAttachment = !opts.stencil ? null : new _GAttachment.GAttachment(gl, 'RENDERBUFFER', opts.stencil);
      const depthStencilAttachment = !opts.depthStencil ? null : new _GAttachment.GAttachment(gl, 'RENDERBUFFER', opts.depthStencil);
      fbo.refreshAttachment({
        colorAttachments,
        depthAttachment,
        stencilAttachment,
        depthStencilAttachment
      });
      fbo.updateFramebuffer();
      return fbo;
    };

    this.gl = gl;
    this.textureState = textureState;
    this.renderbufferState = renderbufferState;
    this.extLib = extLib;
    this.limLib = limLib;
    this.stats = stats;
  }

  set Current(v) {
    this.current = v;
  }

  get Current() {
    return this.current;
  }

  set Next(v) {
    this.next = v;
  }

  get Next() {
    return this.next;
  }

}

exports.FramebufferState = FramebufferState;
FramebufferState.FRAMEBUFFER_SET = _GFramebuffer.FRAMEBUFFER_SET;
},{"../res/GTexture":"../node_modules/pipegl/src/res/GTexture.ts","../res/GAttachment":"../node_modules/pipegl/src/res/GAttachment.ts","../res/GFramebuffer":"../node_modules/pipegl/src/res/GFramebuffer.ts"}],"../node_modules/pipegl/src/state/RenderbufferState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderbufferState = void 0;

var _check = require("../util/check");

var _GRenderbuffer = require("../res/GRenderbuffer");

class RenderbufferState {
  constructor(gl, extLib, limLib, stats) {
    this.createRenderbuffer = opts => {
      const gl = this.gl,
            w = opts.w || 0,
            h = opts.h || 0,
            f = opts.format || 'RGBA4';
      (0, _check.check)(w > 0 && h > 0 && w <= this.limLib.maxTextureSize && h <= this.limLib.maxTextureSize, `Renderbuffer error: 分辨率错误`);
      const rbo = new _GRenderbuffer.GRenderbuffer(gl, w, h, f, this.stats);
      rbo.bind();
      return rbo;
    };

    this.gl = gl;
    this.extLib = extLib;
    this.limLib = limLib;
    this.stats = stats;
  }

}

exports.RenderbufferState = RenderbufferState;
RenderbufferState.RENDERBUFFER_SET = _GRenderbuffer.RENDERBUFFER_SET;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../res/GRenderbuffer":"../node_modules/pipegl/src/res/GRenderbuffer.ts"}],"../node_modules/pipegl/src/util/createStats.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStats = void 0;

const createStats = () => {
  const stats = {
    vaoCount: 0,
    bufferCount: 0,
    elementsCount: 0,
    framebufferCount: 0,
    framebufferCubeCount: 0,
    shaderCount: 0,
    textureCount: 0,
    cubeCount: 0,
    renderbufferCount: 0,
    maxTextureUnits: 0
  };
  return stats;
};

exports.createStats = createStats;
},{}],"../node_modules/pipegl/src/compiler/parseConfigure.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseConfigure = exports.defaultWebGLOptions = void 0;
const defaultWebGLOptions = {
  alpha: true,
  antialias: false,
  depth: true,
  failIfMajorPerformanceCaveat: true,
  powerPreference: 'high-performance',
  premultipliedAlpha: false,
  preserveDrawingBuffer: false,
  stencil: true
};
exports.defaultWebGLOptions = defaultWebGLOptions;

const createCanvasElement = (container, width, height, devicePixelRatio) => {
  const canvas = document.createElement('canvas');
  const w = width || container.clientWidth || window.innerWidth;
  const h = height || container.clientHeight || window.innerHeight;
  canvas.width = w * devicePixelRatio;
  canvas.height = h * devicePixelRatio;
  canvas.style.border = `0px`;
  canvas.style.margin = `0px`;
  canvas.style.padding = `0px`;
  canvas.style.top = `0px`;
  canvas.style.left = `0px`;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  container === document.body ? canvas.style.position = 'absolute' : null;
  container.appendChild(canvas);
  return canvas;
};

const parseConfigure = (opts = {}) => {
  opts.devicePixelRatio = opts.devicePixelRatio || devicePixelRatio || 1.0;
  opts.webglOptions = opts.webglOptions || defaultWebGLOptions;
  opts.container = opts.container || document.body;
  opts.canvas = opts.gl ? opts.gl.canvas : opts.canvas ? opts.canvas : createCanvasElement(opts.container, opts.width, opts.height, opts.devicePixelRatio);
  opts.width = parseInt(opts.canvas.style.width);
  opts.height = parseInt(opts.canvas.style.height);
  opts.gl = opts.gl || opts.canvas.getContext('webgl', opts.webglOptions);
  opts.extensions = opts.extensions || [];
  opts.profile = false;
  return opts;
};

exports.parseConfigure = parseConfigure;
},{}],"../node_modules/pipegl/src/compiler/emitElement.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitElement = void 0;

var _Constant = require("../core/Constant");

const emitElement = (pipeline, extLib, vao, iBlock, element, instances) => {
  const GL_NAME = pipeline.getVariable('gl');
  const COUNT_NAME = !vao ? pipeline.getVariable('count') : vao.Count;
  const PRIMITIVE_NAME = !vao ? pipeline.getVariable('primitive') : vao.Primitive;
  const OFFSET_NAME = !vao ? pipeline.getVariable('offset') : vao.Offset;
  const INSTANCES_NAME = !vao ? pipeline.getVariable('instances') : vao.Instances;

  if (extLib.get('ANGLE_instanced_arrays') && instances > 0) {
    if (element) {
      const ELEMENT_NAME = iBlock.def(`${pipeline.getVariable('elementState')}.getElementsbuffer(${element.ID})`);
      iBlock.push(`${ELEMENT_NAME}.bind()`);
      iBlock.push(`${pipeline.getVariable('extLib')}.get('ANGLE_instanced_arrays').drawElementsInstancedANGLE(${ELEMENT_NAME}.Primitive, ${ELEMENT_NAME}.VertCount,${ELEMENT_NAME}.Component, ${OFFSET_NAME}<<(${ELEMENT_NAME}.Component - ${_Constant.CComponent.UNSIGNED_BYTE})>>1, ${INSTANCES_NAME})`);
    } else iBlock.push(`${pipeline.getVariable('extLib')}.get('ANGLE_instanced_arrays').drawArraysInstancedANGLE(${PRIMITIVE_NAME}, ${OFFSET_NAME},${COUNT_NAME}, ${INSTANCES_NAME})`);
  } else if (element) {
    const ELEMENT_NAME = iBlock.def(`${pipeline.getVariable('elementState')}.getElementsbuffer(${element.ID})`);
    iBlock.push(`${ELEMENT_NAME}.bind()`);
    iBlock.push(`${GL_NAME}.drawElements(${ELEMENT_NAME}.Primitive, ${ELEMENT_NAME}.VertCount,${ELEMENT_NAME}.Component, ${OFFSET_NAME}<<(${ELEMENT_NAME}.Component - ${_Constant.CComponent.UNSIGNED_BYTE})>>1)`);
  } else {
    iBlock.push(`${GL_NAME}.drawArrays(${PRIMITIVE_NAME}, ${OFFSET_NAME}, ${COUNT_NAME})`);
  }

  if (vao) iBlock.push(`${pipeline.getVariable('attributeState')}.setVAO(null)`);
  const PERFORMANCE_NAME = pipeline.getVariable('performance');
  iBlock.push(`${PERFORMANCE_NAME}.count++`);
};

exports.emitElement = emitElement;
},{"../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/compiler/emitUniform.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitUniform = void 0;

var _check = require("../util/check");

var _GTexture = require("../res/GTexture");

var _isNDArray = require("../util/isNDArray");

const UComponent = component => {
  const UTYPE = {
    prefix: '',
    isMatrix: false
  };

  switch (component) {
    case 5126:
      UTYPE.prefix = '1f';
      break;

    case 35664:
      UTYPE.prefix = '2f';
      break;

    case 35665:
      UTYPE.prefix = '3f';
      break;

    case 35666:
      UTYPE.prefix = '4f';
      break;

    case 35674:
      UTYPE.prefix = 'Matrix2f';
      UTYPE.isMatrix = true;
      break;

    case 35675:
      UTYPE.prefix = 'Matrix3f';
      UTYPE.isMatrix = true;
      break;

    case 35676:
      UTYPE.prefix = 'Matrix4f';
      UTYPE.isMatrix = true;
      break;

    case 35670:
    case 5124:
      UTYPE.prefix = '1i';
      break;

    case 35671:
    case 35667:
      UTYPE.prefix = '2i';
      break;

    case 35672:
    case 35668:
      UTYPE.prefix = '3i';
      break;

    case 35673:
    case 35669:
      UTYPE.prefix = '4i';
      break;

    case 35678:
    case 35680:
      UTYPE.prefix = '1i';
      break;

    default:
      (0, _check.check)(false, `emitUniforms error:不支持的uniform类型${component}`);
  }

  return UTYPE;
};

const emitUniform = (pipeline, iBlock, oBlock, uniforms, uniformRecordSet, input0) => {
  const GL_NAME = pipeline.getVariable('gl');
  const PERFORMANCE_NAME = pipeline.getVariable('performance');
  const ISNDARRAY_NAME = pipeline.getVariable('isNDArray');
  const ISNUMBER_NAME = pipeline.getVariable('isNumber');
  const ISTEXTURE_NAME = pipeline.getVariable('isTexture');
  uniforms === null || uniforms === void 0 ? void 0 : uniforms.forEach(u => {
    const name = u.name;
    const component = u.info.type;
    const size = u.info.size;
    const record = uniformRecordSet.get(name);
    (0, _check.check)(record, `emitUniform error:应用unifrom错误，${name}和TAttribute定义不一致，请检查`);

    if (size > 1) {}

    record.ln = pipeline.link(u);
    const {
      prefix,
      isMatrix
    } = UComponent(component);

    if (record.v) {
      if (record.v instanceof _GTexture.GTexture) {
        record.dn = pipeline.link(record.v);
        iBlock.push(`${GL_NAME}.uniform${prefix}(${record.ln}.location, ${record.dn}.bind())`);
        oBlock.push(`${record.dn}.unbind()`);
      } else {
        const sufix = (0, _isNDArray.isNDArray)(record.v) ? `${prefix}v` : prefix;
        record.dn = iBlock.def(record.v);
        iBlock.push(`${GL_NAME}.uniform${sufix}(${record.ln}.location, ${isMatrix ? 'false,' : ''}${record.dn})`);
      }
    } else if (record.f) {
      record.dn = pipeline.link(record.f);
      record.dyn = iBlock.def(`${record.dn}.call(this, ${PERFORMANCE_NAME},${pipeline.BatchID})`);
      const cond0 = iBlock.createConditionT(`${ISNDARRAY_NAME}(${record.dyn})`);
      cond0.Then.push(`${GL_NAME}.uniform${prefix}v(${record.ln}.location, ${isMatrix ? 'false,' : ''}${record.dyn})`);
      const cond1 = iBlock.createConditionT(`${ISNUMBER_NAME}(${record.dyn})`);
      cond1.Then.push(`${GL_NAME}.uniform${prefix}(${record.ln}.location, ${isMatrix ? 'false,' : ''}${record.dyn})`);
      const cond2 = iBlock.createConditionT(`${ISTEXTURE_NAME}(${record.dyn})`);
      cond2.Then.push(`${GL_NAME}.uniform${prefix}(${record.ln}.location, ${record.dyn}.bind())`);
      const cond2_0 = oBlock.createConditionT(`${ISTEXTURE_NAME}(${record.dyn})`);
      cond2_0.Then.push(`${record.dyn}.unbind()`);
    } else if (record.p) {
      record.dyn = iBlock.def(`${input0}${record.p.KEY}`);
      const cond1 = iBlock.createConditionTE(`${ISTEXTURE_NAME}(${record.dyn})`);
      cond1.Then.push(`${GL_NAME}.uniform${prefix}(${record.ln}.location, ${record.dyn}.bind())`);
      const cond11 = oBlock.createConditionT(`${ISTEXTURE_NAME}(${record.dyn})`);
      cond11.Then.push(`${record.dyn}.unbind()`);
      const cond12 = cond1.Else.createConditionTE(`${ISNDARRAY_NAME}(${record.dyn})`);
      cond12.Then.push(`${GL_NAME}.uniform${prefix}v(${record.ln}.location, ${isMatrix ? 'false,' : ''}${record.dyn})`);
      cond12.Else.push(`${GL_NAME}.uniform${prefix}(${record.ln}.location, ${isMatrix ? 'false,' : ''}${record.dyn})`);
    }
  });
};

exports.emitUniform = emitUniform;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../res/GTexture":"../node_modules/pipegl/src/res/GTexture.ts","../util/isNDArray":"../node_modules/pipegl/src/util/isNDArray.ts"}],"../node_modules/pipegl/src/compiler/emitAttribute.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitAttribute = void 0;

var _Constant = require("../core/Constant");

const emitBuffer = (pipeline, iBlock, attribute, record, extLib, input0) => {
  const GL_NAME = pipeline.getVariable('gl'),
        ATTRIBUTE_NAME = pipeline.link(attribute),
        BUFFER_NAME = record.ln,
        LOCATION_NAME = iBlock.def(`${ATTRIBUTE_NAME}.location`),
        SIZE_NAME = iBlock.def(`${record.size || _Constant.CAttributeTS[attribute.info.type]}`),
        BINDING_NAME = iBlock.def(`${pipeline.getVariable('attributeState')}.getAttribute(${attribute.location})`);
  const cond1 = iBlock.createConditionT(`!${BINDING_NAME}.buffer`);
  cond1.Then.push(`${GL_NAME}.enableVertexAttribArray(${LOCATION_NAME})`);

  if (record.p) {
    const BUFFERSTATE_NAME = pipeline.getVariable('bufferState');
    const ISNDARRAY_NAME = pipeline.getVariable('isNDArray');
    record.dyn = iBlock.def(`${input0}${record.p.KEY}`);
    const cond3 = iBlock.createConditionTE(`!${BINDING_NAME}.buffer`);
    const cond3_0 = cond3.Then.createConditionTE(`${ISNDARRAY_NAME}(${record.dyn})`);
    cond3_0.Then.push(`${BINDING_NAME}.buffer=${BUFFERSTATE_NAME}.createBuffer({data:${record.dyn},target: 'ARRAY_BUFFER'})`);
    cond3_0.Else.push(`${BINDING_NAME}.buffer=${record.dyn}`);
    cond3.Then.push(`${BINDING_NAME}.component=${BINDING_NAME}.buffer.component`);
    cond3.Then.push(`${BINDING_NAME}.size=${SIZE_NAME}`);
    cond3.Then.push(`${BINDING_NAME}.normalized=${record.normalized || false}`);
    cond3.Then.push(`${BINDING_NAME}.offset=${record.offset || 0}`);
    cond3.Then.push(`${BINDING_NAME}.stride=${record.stride || 0}`);
    cond3.Then.push(`${BINDING_NAME}.divisor=${record.divisor || 0}`);
    cond3.Then.push(`${BINDING_NAME}.buffer.bind()`);
    cond3.Then.push(`${GL_NAME}.vertexAttribPointer(${LOCATION_NAME},${BINDING_NAME}.size,${BINDING_NAME}.component, ${BINDING_NAME}.normalized, ${BINDING_NAME}.offset, ${BINDING_NAME}.stride)`);
    const cond3_1 = cond3.Else.createConditionTE(`${ISNDARRAY_NAME}(${record.dyn})`);
    cond3_1.Then.push(`${BINDING_NAME}.buffer.subData(${record.dyn})`);
    cond3_1.Else.push(`${BINDING_NAME}.buffer=${record.dyn}`);
    cond3_1.Else.push(`${BINDING_NAME}.buffer.bind()`);
    cond3_1.Else.push(`${GL_NAME}.vertexAttribPointer(${LOCATION_NAME},${BINDING_NAME}.size,${BINDING_NAME}.component, ${BINDING_NAME}.normalized, ${BINDING_NAME}.offset, ${BINDING_NAME}.stride)`);
  } else {
    const cond2 = iBlock.createConditionT(`${BINDING_NAME}.component!==${BUFFER_NAME}.component||${BINDING_NAME}.size!==${SIZE_NAME}||${BINDING_NAME}.buffer!==${BUFFER_NAME}||${BINDING_NAME}.normalized!==${record.normalized || false}||${BINDING_NAME}.offset!==${record.offset || 0}||${BINDING_NAME}.stride!==${record.stride || 0}`);
    cond2.Then.push(`${BINDING_NAME}.component=${BUFFER_NAME}.component`);
    cond2.Then.push(`${BINDING_NAME}.size=${SIZE_NAME}`);
    cond2.Then.push(`${BINDING_NAME}.buffer=${BUFFER_NAME}`);
    cond2.Then.push(`${BINDING_NAME}.normalized=${record.normalized || false}`);
    cond2.Then.push(`${BINDING_NAME}.offset=${record.offset || 0}`);
    cond2.Then.push(`${BINDING_NAME}.stride=${record.stride || 0}`);
    cond2.Then.push(`${GL_NAME}.bindBuffer(${_Constant.CArraybufferTarget['ARRAY_BUFFER']},${BUFFER_NAME}.buffer)`);
    cond2.Then.push(`${GL_NAME}.vertexAttribPointer(${LOCATION_NAME},${BINDING_NAME}.size,${BINDING_NAME}.component, ${BINDING_NAME}.normalized, ${BINDING_NAME}.offset, ${BINDING_NAME}.stride)`);
  }

  if (extLib.get('ANGLE_instanced_arrays')) {
    const DIVISOR = record.divisor || 0;
    const cond4 = iBlock.createConditionT(`${BINDING_NAME}.divisor!==${DIVISOR}`);
    cond4.Then.push(`${pipeline.getVariable('extLib')}.get('ANGLE_instanced_arrays').vertexAttribDivisorANGLE(${LOCATION_NAME}, ${DIVISOR})`);
    cond4.Then.push(`${BINDING_NAME}.divisor=${DIVISOR}`);
  }
};

const emitAttribute = (pipeline, iBlock, extLib, vao, attributes, attributeRecordSet, input0) => {
  const cond0 = iBlock.createConditionTE(`${pipeline.getVariable('vao')}`);
  cond0.Then.push(`${pipeline.getVariable('attributeState')}.setVAO(${pipeline.getVariable('vao')})`);
  cond0.Then.push(`${pipeline.getVariable('vao')}.bindAttrs()`);
  cond0.Else.push(`${pipeline.getVariable('attributeState')}.setVAO(null)`);

  if (!vao) {
    attributes.forEach(att => {
      const name = att.name;
      const record = attributeRecordSet.get(name);
      emitBuffer(pipeline, iBlock, att, record, extLib, input0);
    });
  }
};

exports.emitAttribute = emitAttribute;
},{"../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/compiler/emitBatch.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitBatch = void 0;

var _emitElement = require("./emitElement");

var _emitUniform = require("./emitUniform");

var _emitAttribute = require("./emitAttribute");

const emitBatch = (pipeline, batchBlock, pipelineData, extLib, instances) => {
  const LOOP_BATCH_NAME = batchBlock.def(0);
  const P0_NAME = `p0[${LOOP_BATCH_NAME}]`;
  batchBlock.push(`for(${LOOP_BATCH_NAME};${LOOP_BATCH_NAME}<p0.length;++${LOOP_BATCH_NAME}){`);
  const scope0 = batchBlock.createScope(),
        iBlock = scope0.Entry,
        oBlock = scope0.Exit;
  (0, _emitAttribute.emitAttribute)(pipeline, iBlock, extLib, pipelineData.vao, pipelineData.program.Attributes, pipelineData.attributeRecordSet, P0_NAME);
  (0, _emitUniform.emitUniform)(pipeline, iBlock, oBlock, pipelineData.program.Uniforms, pipelineData.uniformRecordSet, P0_NAME);
  (0, _emitElement.emitElement)(pipeline, extLib, pipelineData.vao, iBlock, pipelineData.element, instances);
  batchBlock.push(`}`);
};

exports.emitBatch = emitBatch;
},{"./emitElement":"../node_modules/pipegl/src/compiler/emitElement.ts","./emitUniform":"../node_modules/pipegl/src/compiler/emitUniform.ts","./emitAttribute":"../node_modules/pipegl/src/compiler/emitAttribute.ts"}],"../node_modules/pipegl/src/compiler/emitStatus.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitStatus = void 0;

const emitStatus = (pipeline, iBlock, status) => {
  if (status) {
    const STATUS_NAME = pipeline.link(status);
    status.StatusList.forEach(v => {
      const cond = iBlock.createConditionT(`${STATUS_NAME}.needRefresh('${v}')`);
      cond.Then.push(`${STATUS_NAME}.refresh('${v}')`);
    });
  }
};

exports.emitStatus = emitStatus;
},{}],"../node_modules/pipegl/src/compiler/emitProgram.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitProgram = void 0;

const emitProgram = (pipeline, iBlock, pipelineData) => {
  const PROGRAMSTATE_NAME = pipeline.getVariable('programState');
  const cond = iBlock.createConditionT(`!${PROGRAMSTATE_NAME}.Current||${PROGRAMSTATE_NAME}.Current.ID!==${pipelineData.program.ID}`);
  cond.Then.push(`${PROGRAMSTATE_NAME}.useProgram(${pipelineData.program.ID})`);
};

exports.emitProgram = emitProgram;
},{}],"../node_modules/pipegl/src/core/Status.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Status = void 0;

var _check = require("./../util/check");

var _Constant = require("./Constant");

class Status {
  constructor(gl) {
    this.NEXT_FLAG_SET = new Map();
    this.NEXT_VARIABLE_SET = new Map();
    this.statusList = [];

    this.needRefresh = key => {
      if (_Constant.CWebGLStatusFLAG[key]) {
        const k = key;
        const cur = Status.CURRENT_FLAG_SET.get(k);
        const next = this.NEXT_FLAG_SET.get(k);
        return cur != next;
      } else if (_Constant.CWebGLStatusVariable[key]) {
        const k = key;
        const cur = Status.CURRENT_VARIABLE_SET.get(k);
        const next = this.NEXT_VARIABLE_SET.get(k);
        if (!cur) return true;else if (cur.length !== next.length) return true;else return cur.join() !== next.join();
      } else (0, _check.check)(false, `Status 错误: 不支持的webgl状态${key}修改，请检查状态是否合法`);
    };

    this.refresh = key => {
      const gl = this.gl;

      if (_Constant.CWebGLStatusFLAG[key]) {
        const k = key;
        const v = this.NEXT_FLAG_SET.get(k);
        v ? gl.enable(gl[k]) : gl.disable(gl[k]);
        Status.CURRENT_FLAG_SET.set(k, v);
      } else if (_Constant.CWebGLStatusVariable[key]) {
        const k = key;
        const v = this.NEXT_VARIABLE_SET.get(k);
        gl[k].apply(gl, v);
        Status.CURRENT_VARIABLE_SET.set(k, v);
      } else (0, _check.check)(false, `Status 错误: 不支持的webgl状态${key}修改，请检查状态是否合法`);
    };

    this.setFlag = (key, v) => {
      this.NEXT_FLAG_SET.set(key, v);
      this.statusList.push(key);
    };

    this.setVariable = (key, v) => {
      this.NEXT_VARIABLE_SET.set(key, v.slice());
      this.statusList.push(key);
    };

    this.gl = gl;
    this.setFlag('DITHER', false);
    this.setFlag('BLEND', false);
    this.setVariable('blendColor', [0, 0, 0, 0]);
    this.setVariable('blendEquationSeparate', [gl.FUNC_ADD, gl.FUNC_ADD]);
    this.setVariable('blendFuncSeparate', [gl.ONE, gl.ZERO, gl.ONE, gl.ZERO]);
    this.setFlag('DEPTH_TEST', true);
    this.setVariable('depthFunc', [gl.LESS]);
    this.setVariable('depthRange', [0, 1]);
    this.setVariable('depthMask', [true]);
    this.setVariable('colorMask', [true, true, true, true]);
    this.setFlag('CULL_FACE', false);
    this.setVariable('cullFace', [gl.BACK]);
    this.setVariable('frontFace', [gl.CCW]);
    this.setVariable('lineWidth', [1]);
    this.setFlag('POLYGON_OFFSET_FILL', false);
    this.setVariable('polygonOffset', [0, 0]);
    this.setFlag('SAMPLE_ALPHA_TO_COVERAGE', false);
    this.setFlag('SAMPLE_COVERAGE', false);
    this.setVariable('sampleCoverage', [1, false]);
    this.setFlag('STENCIL_TEST', false);
    this.setVariable('stencilMask', [-1]);
    this.setVariable('stencilOpSeparate', [gl.FRONT, gl.KEEP, gl.KEEP, gl.KEEP]);
    this.setFlag('SCISSOR_TEST', false);
    this.setVariable('scissor', [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]);
    this.setVariable('viewport', [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]);
  }

  get StatusList() {
    return this.statusList;
  }

}

exports.Status = Status;
Status.CURRENT_FLAG_SET = new Map();
Status.CURRENT_VARIABLE_SET = new Map();
},{"./../util/check":"../node_modules/pipegl/src/util/check.ts","./Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/compiler/parseStatus.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseStatus = void 0;

var _check = require("../util/check");

var _Status = require("../core/Status");

var _Constant = require("../core/Constant");

const parseStatus = opts => {
  var _a;

  const {
    gl,
    status
  } = opts;
  const s0 = new _Status.Status(gl);
  (_a = Object.keys(status)) === null || _a === void 0 ? void 0 : _a.forEach(key => {
    const v = status[key];
    if (_Constant.CWebGLStatusFLAG[key]) s0.setFlag(key, v);else if (_Constant.CWebGLStatusVariable[key]) s0.setVariable(key, v);else (0, _check.check)(false, `ParseStatus error:不支持的WebGL状态设置${key}`);
  });
  return s0;
};

exports.parseStatus = parseStatus;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../core/Status":"../node_modules/pipegl/src/core/Status.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts"}],"../node_modules/pipegl/src/compiler/parseProgram.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseProgram = void 0;

const parseProgram = (opts, locations) => {
  const {
    frag,
    vert,
    stringState,
    shaderState,
    programState
  } = opts;
  const fragId = stringState.id(frag),
        fragShader = shaderState.createShader('FRAGMENT_SHADER', fragId);
  const vertId = stringState.id(vert),
        vertShader = shaderState.createShader('VERTEX_SHADER', vertId);
  const program = programState.createProgram(frag, vert, locations);
  return {
    fragId,
    vertId,
    fragShader,
    vertShader,
    program
  };
};

exports.parseProgram = parseProgram;
},{}],"../node_modules/pipegl/src/compiler/parseElement.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.praseElements = void 0;

var _isNDArray = require("../util/isNDArray");

const praseElements = opts => {
  const {
    elements,
    elementState
  } = opts;

  if (elements && (0, _isNDArray.isNDArray)(elements)) {
    return elementState.createElementsbuffer({
      data: elements,
      component: 'UNSIGNED_SHORT',
      primitive: opts.primitive || 'TRIANGLES'
    });
  }
};

exports.praseElements = praseElements;
},{"../util/isNDArray":"../node_modules/pipegl/src/util/isNDArray.ts"}],"../node_modules/pipegl/src/compiler/emitFramebuffer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitFramebuffer = void 0;

var _GFramebuffer = require("../res/GFramebuffer");

const emitFramebuffer = (pipeline, iBlock, oBlock, framebuffer, extLib) => {
  const GL_NAME = pipeline.getVariable('gl'),
        FRAMEBUFFERSTATE_NAME = pipeline.getVariable('framebufferState'),
        EXT_DRAWBUFFERS_NAME = extLib.get('WEBGL_draw_buffers') ? pipeline.def(`${pipeline.getVariable('extLib')}.get('WEBGL_draw_buffers')`) : null,
        NEXT_NAME = `${FRAMEBUFFERSTATE_NAME}.Next`,
        CURRENT_NAME = `${FRAMEBUFFERSTATE_NAME}.Current`;

  if (framebuffer && framebuffer.framebuffer instanceof _GFramebuffer.GFramebuffer) {
    const FRAMEBUFFER_NAME = pipeline.link(framebuffer.framebuffer);
    const NEXT_FRAMEBUFFER_CACHED_NAME = iBlock.def(`${NEXT_NAME}`);
    iBlock.push(`${NEXT_NAME}=${FRAMEBUFFER_NAME}`);
    oBlock.push(`${NEXT_NAME}=${NEXT_FRAMEBUFFER_CACHED_NAME}`);
    const LOOP_FBO_NAME = iBlock.def(0);
    iBlock.push(`for(${LOOP_FBO_NAME};${LOOP_FBO_NAME}<${FRAMEBUFFER_NAME}.FBO.length;++${LOOP_FBO_NAME}){`);
    const cond0 = iBlock.createConditionT(`${FRAMEBUFFER_NAME}!==${CURRENT_NAME}`);
    const cond0_1 = cond0.Then.createConditionTE(`${FRAMEBUFFER_NAME}`);
    cond0_1.Then.push(`${FRAMEBUFFER_NAME}.bind(${LOOP_FBO_NAME})`);
    if (EXT_DRAWBUFFERS_NAME) cond0_1.Then.push(`${EXT_DRAWBUFFERS_NAME}.drawBuffersWEBGL(${FRAMEBUFFER_NAME}.ColorDrawbuffers)`);
    cond0_1.Else.push(`${GL_NAME}.bindFramebuffer(${GL_NAME}.FRAMEBUFFER, null)`);
    iBlock.push(`${FRAMEBUFFERSTATE_NAME}.Current=${NEXT_NAME}`);
    oBlock.push(`}`);
  } else if (framebuffer && framebuffer.framebuffer) {
    const FN_NAME = pipeline.link(framebuffer.framebuffer);
    const FRAMEBUFFER_NAME = iBlock.def(`${FN_NAME}.call(this, ${pipeline.getVariable('performance')}, ${pipeline.BatchID})`);
    const NEXT_FRAMEBUFFER_CACHED_NAME = iBlock.def(`${FRAMEBUFFERSTATE_NAME}.Next`);
    oBlock.push(`${FRAMEBUFFERSTATE_NAME}.Next=${NEXT_FRAMEBUFFER_CACHED_NAME}`);
    iBlock.push(`${FRAMEBUFFERSTATE_NAME}.Next=${NEXT_FRAMEBUFFER_CACHED_NAME}`);
    const cond0 = iBlock.createConditionT(`${FRAMEBUFFER_NAME}&&${NEXT_NAME}!==${FRAMEBUFFERSTATE_NAME}.Current`);
    const cond0_1 = cond0.Then.createConditionTE(`${FRAMEBUFFER_NAME}`);
    cond0_1.Then.push(`${FRAMEBUFFER_NAME}.bind()`);
    if (EXT_DRAWBUFFERS_NAME) cond0_1.Then.push(`${EXT_DRAWBUFFERS_NAME}.drawBuffersWEBGL(${FRAMEBUFFER_NAME}.ColorDrawbuffers)`);
    cond0_1.Else.push(`${GL_NAME}.bindFramebuffer(${GL_NAME}.FRAMEBUFFER, null)`);
    iBlock.push(`${FRAMEBUFFERSTATE_NAME}.Current=${NEXT_NAME}`);
  } else {
    const cond0 = iBlock.createConditionT(`${CURRENT_NAME}!==null`);
    cond0.Then.push(`${GL_NAME}.bindFramebuffer(${GL_NAME}.FRAMEBUFFER, null)`);
    cond0.Then.push(`${CURRENT_NAME}=null`);
  }

  if (framebuffer && framebuffer.color) iBlock.push(`${GL_NAME}.clearColor(${framebuffer.color})`);
  if (framebuffer && framebuffer.clearBit) iBlock.push(`${GL_NAME}.clear(${framebuffer.clearBit})`);
};

exports.emitFramebuffer = emitFramebuffer;
},{"../res/GFramebuffer":"../node_modules/pipegl/src/res/GFramebuffer.ts"}],"../node_modules/pipegl/src/util/isFunction.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = void 0;

const isFunction = v => typeof v === 'function';

exports.isFunction = isFunction;
},{}],"../node_modules/pipegl/src/core/Props.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Props = void 0;

class Props {
  constructor(key) {
    this.key = `['${key}']`;
  }

  get KEY() {
    return this.key;
  }

}

exports.Props = Props;
},{}],"../node_modules/pipegl/src/compiler/parseUniform.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseUniform = void 0;

var _isFunction = require("../util/isFunction");

var _Props = require("../core/Props");

const parseUniform = opts => {
  var _a;

  const {
    uniforms
  } = opts;
  const UNIFORMS = new Map();
  uniforms && ((_a = Object.keys(uniforms)) === null || _a === void 0 ? void 0 : _a.forEach(key => {
    const v = uniforms[key];
    const record = {
      key: key
    };
    if ((0, _isFunction.isFunction)(v)) record.f = v;else if (v instanceof _Props.Props) record.p = v;else record.v = v;
    UNIFORMS.set(key, record);
  }));
  return UNIFORMS;
};

exports.parseUniform = parseUniform;
},{"../util/isFunction":"../node_modules/pipegl/src/util/isFunction.ts","../core/Props":"../node_modules/pipegl/src/core/Props.ts"}],"../node_modules/kiwi.codegen/src/util/slice.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slice = void 0;
var slice = function (x) {
    return Array.prototype.slice.call(x);
};
exports.slice = slice;

},{}],"../node_modules/kiwi.codegen/src/util/join.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = void 0;
var slice_1 = require("./slice");
var join = function (x) {
    return (0, slice_1.slice)(x).join('');
};
exports.join = join;

},{"./slice":"../node_modules/kiwi.codegen/src/util/slice.ts"}],"../node_modules/kiwi.codegen/src/util/getId.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = void 0;
var id = 1;
var getId = function () {
    return id++;
};
exports.getId = getId;

},{}],"../node_modules/kiwi.codegen/src/core/Compilable.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compilable = void 0;
var getId_1 = require("../util/getId");
/**
 * @date 2021/8/15
 * @description complie code
 * @author axmand
 * @example
 * //inherit
 * class BlockClass extends Compilable{ }
 */
var Compilable = /** @class */ (function () {
    function Compilable() {
        var _this = this;
        this.id = "compilable-".concat((0, getId_1.getId)());
        this.regularize = function (raw) {
            return raw.replace(/\n/g, '').replace(/;/g, ';\n').replace(/}/g, '}\n').replace(/{/g, '{\n');
        };
        this.compile = function () {
            throw new Error("".concat(_this.ID, " unimplemented method"));
        };
    }
    Object.defineProperty(Compilable.prototype, "ID", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    return Compilable;
}());
exports.Compilable = Compilable;

},{"../util/getId":"../node_modules/kiwi.codegen/src/util/getId.ts"}],"../node_modules/kiwi.codegen/src/code/Scope.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
var Block_1 = require("./Block");
var Compilable_1 = require("../core/Compilable");
/**
 * @description
 * codeblock seems like:
 * //entry
 * const a = '112233'
 * ...
 * ...
 * //exit, always in tail
 * const b = a;
 */
var Scope = /** @class */ (function (_super) {
    __extends(Scope, _super);
    function Scope() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * entry block
         */
        _this.entrytBlock = new Block_1.Block();
        /**
         * tail block
         */
        _this.exitBlock = new Block_1.Block();
        _this.compile = function () {
            return _this.regularize("".concat(_this.Entry.compile()).concat(_this.Exit.compile()));
        };
        return _this;
    }
    Object.defineProperty(Scope.prototype, "Entry", {
        get: function () {
            return this.entrytBlock;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scope.prototype, "Exit", {
        get: function () {
            return this.exitBlock;
        },
        enumerable: false,
        configurable: true
    });
    return Scope;
}(Compilable_1.Compilable));
exports.Scope = Scope;

},{"./Block":"../node_modules/kiwi.codegen/src/code/Block.ts","../core/Compilable":"../node_modules/kiwi.codegen/src/core/Compilable.ts"}],"../node_modules/kiwi.codegen/src/code/Condition.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionTE = exports.ConditionT = void 0;
var join_1 = require("./../util/join");
var Block_1 = require("./Block");
var Compilable_1 = require("../core/Compilable");
/**
 * @description
 * code block seems like:
 * if(cond){
 *  //then block
 * }
 * else{
 *  //else block
 * }
 */
var ConditionTE = /** @class */ (function (_super) {
    __extends(ConditionTE, _super);
    function ConditionTE() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        /**
         * then block body
         */
        _this.thenBlock = new Block_1.Block();
        /**
         * else block body
         */
        _this.elseBlock = new Block_1.Block();
        _this.compile = function () {
            return _this.regularize("if(".concat(_this.predSource, "){").concat(_this.Then.compile(), "}else{").concat(_this.Else.compile(), "}"));
        };
        _this.predSource = (0, join_1.join)(args);
        return _this;
    }
    Object.defineProperty(ConditionTE.prototype, "Then", {
        /**
         * @description then block codelines
         * @example
         * cond.Then.push(`console(true)`);
         */
        get: function () {
            return this.thenBlock;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConditionTE.prototype, "Else", {
        /**
         * @description else block codelines
         * @example
         * cond.Else.push(`alert(0)`);
         */
        get: function () {
            return this.elseBlock;
        },
        enumerable: false,
        configurable: true
    });
    return ConditionTE;
}(Compilable_1.Compilable));
exports.ConditionTE = ConditionTE;
/**
 * @description
 * code block seems like
 * if(cond){
 *  //then block
 * }
 */
var ConditionT = /** @class */ (function (_super) {
    __extends(ConditionT, _super);
    function ConditionT() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        /**
         *
         */
        _this.thenBlock = new Block_1.Block();
        _this.compile = function () {
            return _this.regularize("if(".concat(_this.predSource, "){").concat(_this.Then.compile(), "}"));
        };
        _this.predSource = (0, join_1.join)(args);
        return _this;
    }
    Object.defineProperty(ConditionT.prototype, "Then", {
        get: function () {
            return this.thenBlock;
        },
        enumerable: false,
        configurable: true
    });
    return ConditionT;
}(Compilable_1.Compilable));
exports.ConditionT = ConditionT;

},{"./../util/join":"../node_modules/kiwi.codegen/src/util/join.ts","./Block":"../node_modules/kiwi.codegen/src/code/Block.ts","../core/Compilable":"../node_modules/kiwi.codegen/src/core/Compilable.ts"}],"../node_modules/kiwi.codegen/src/util/check.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegenValueError = exports.codegenError = void 0;
/**
 * @description check error by cond 'pred'
 * @param pred
 * @param message
 */
var codegenError = function (pred, message) {
    if (!pred) {
        var error = new Error("error-".concat(message));
        throw error;
    }
};
exports.codegenError = codegenError;
/**
 * @description check o is null or undefined or empty
 * @param o
 * @param message
 */
var codegenValueError = function (o, message) {
    var cond = true;
    if (Array.isArray(o))
        cond = false;
    else if (Number(o) !== NaN)
        cond = false;
    else if (o !== null || o !== undefined)
        cond = false;
    codegenError(!cond, message);
};
exports.codegenValueError = codegenValueError;

},{}],"../node_modules/kiwi.codegen/src/code/Block.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
var Scope_1 = require("./Scope");
var Compilable_1 = require("../core/Compilable");
var Condition_1 = require("./Condition");
var slice_1 = require("../util/slice");
var check_1 = require("./../util/check");
var getId_1 = require("../util/getId");
var join_1 = require("../util/join");
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * codeline count
         */
        _this.lc = 0;
        /**
         * variable declare array
         */
        _this.VARIABLE_NAME_ARR = [];
        _this.CODELINE_SET = new Map();
        _this.MERGE_BLOCKS_ARR = [];
        /**
         * @description declare varaible, assign with default value 'v'
         * @example
         * const name = block.def([1,2]); //var g0 = [1,2];
         * @param v
         */
        _this.def = function (v) {
            (0, check_1.codegenValueError)(v, "v does not support null/undefined");
            var NAME = "b".concat((0, getId_1.getId)()), CODELINE_ARR = _this.CODELINE_SET, VARIABLE_NAME_ARR = _this.VARIABLE_NAME_ARR;
            VARIABLE_NAME_ARR.push(NAME);
            var lines = [];
            lines.push(NAME, "=");
            Array.isArray(v) ? lines.push("[".concat((0, slice_1.slice)(v), "]")) : lines.push(v);
            lines.push(";");
            CODELINE_ARR.set(_this.lc++, lines);
            return NAME;
        };
        /**
         * @description combine block/scope/condition after this codeline
         * @param v
         */
        _this.combine = function (v) {
            _this.CODELINE_SET.set(_this.lc++, v);
        };
        /**
         * @description append exist block in tail
         * @param block
         */
        _this.appendBlock = function (block) {
            (0, check_1.codegenError)(!_this.MERGE_BLOCKS_ARR.find(function (b) { return b.ID === block.ID; }), "Duplicate block merges are not allowed");
            _this.MERGE_BLOCKS_ARR.push(block);
        };
        /**
         * @description create new Block from this line
         * @returns
         */
        _this.createBlock = function () {
            var block = new Block();
            _this.CODELINE_SET.set(_this.lc++, block);
            return block;
        };
        /**
         * @description create Scope and combie in this codeline
         * @returns
         */
        _this.createScope = function () {
            var scope = new Scope_1.Scope();
            _this.CODELINE_SET.set(_this.lc++, scope);
            return scope;
        };
        /**
         * @description create ConditionT
         * @param args
         * @returns
         */
        _this.createConditionT = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var cond = new (Condition_1.ConditionT.bind.apply(Condition_1.ConditionT, __spreadArray([void 0], args, false)))();
            _this.combine(cond);
            return cond;
        };
        /**
         * @description create ConditionTE
         * @param args
         * @returns
         */
        _this.createConditionTE = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var cond = new (Condition_1.ConditionTE.bind.apply(Condition_1.ConditionTE, __spreadArray([void 0], args, false)))();
            _this.combine(cond);
            return cond;
        };
        /**
         * @description compile block
         * @returns
         */
        _this.compile = function () {
            var CODELINE_SET = _this.CODELINE_SET, MERGE_BLOCKS_ARR = _this.MERGE_BLOCKS_ARR, VARIABLE_NAME_ARR = _this.VARIABLE_NAME_ARR;
            var declareSource = VARIABLE_NAME_ARR.length > 0 ? "var ".concat(VARIABLE_NAME_ARR.join(','), ";") : "";
            var bodySource = "";
            CODELINE_SET.forEach(function (line) {
                bodySource += (line instanceof Block ||
                    line instanceof Condition_1.ConditionTE ||
                    line instanceof Condition_1.ConditionT ||
                    line instanceof Scope_1.Scope) ? line.compile() : (0, join_1.join)(line);
            });
            var mergeSource = MERGE_BLOCKS_ARR.reduce(function (pre, cur) { return pre + cur.compile(); }, "");
            return _this.regularize("".concat(declareSource).concat(bodySource).concat(mergeSource));
        };
        return _this;
    }
    /**
     * @description add new codeline
     * @param args
     * @example
     * //add new codelines
     * block.push(`ccc=`, [2124,3], `;`);
     * //add new codeline
     * block.push(`ccc=0`);
     * @returns
     */
    Block.prototype.push = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var lines = [], CODELINE_ARR = this.CODELINE_SET;
        args.forEach(function (v) {
            Array.isArray(v) ? lines.push("[".concat((0, slice_1.slice)(v), "]")) : lines.push(v);
        });
        if (lines.length > 0
            && "".concat(lines[lines.length - 1]).lastIndexOf('{') !== lines[lines.length - 1].length - 1
            && "".concat(lines[lines.length - 1]).lastIndexOf('}') !== lines[lines.length - 1].length - 1
            && "".concat(lines[lines.length - 1]).lastIndexOf(';') !== lines[lines.length - 1].length - 1)
            lines.push(';');
        CODELINE_ARR.set(this.lc++, lines);
        return this;
    };
    return Block;
}(Compilable_1.Compilable));
exports.Block = Block;

},{"./Scope":"../node_modules/kiwi.codegen/src/code/Scope.ts","../core/Compilable":"../node_modules/kiwi.codegen/src/core/Compilable.ts","./Condition":"../node_modules/kiwi.codegen/src/code/Condition.ts","../util/slice":"../node_modules/kiwi.codegen/src/util/slice.ts","./../util/check":"../node_modules/kiwi.codegen/src/util/check.ts","../util/getId":"../node_modules/kiwi.codegen/src/util/getId.ts","../util/join":"../node_modules/kiwi.codegen/src/util/join.ts"}],"../node_modules/kiwi.codegen/src/code/Procedure.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Procedure = void 0;
var Scope_1 = require("./Scope");
var Compilable_1 = require("../core/Compilable");
/**
 * @description
 * codeline seems like:
 * add:funciton(p0){
 *  //do something
 * }
 */
var Procedure = /** @class */ (function (_super) {
    __extends(Procedure, _super);
    function Procedure(fnName, parameterCount) {
        if (parameterCount === void 0) { parameterCount = 0; }
        var _this = _super.call(this) || this;
        /**
         *
         */
        _this.inputArguments = [];
        /**
         *
         */
        _this.bodyScope = new Scope_1.Scope();
        _this.registArgs = function () {
            var ne = "p".concat(_this.inputArguments.length);
            _this.inputArguments.push(ne);
            return ne;
        };
        _this.compile = function () {
            var inputArgumentsSource = _this.inputArguments.join();
            return _this.regularize("function(".concat(inputArgumentsSource, "){").concat(_this.bodyScope.compile(), "}"));
        };
        _this.name = fnName;
        _this.parameterCount = parameterCount;
        for (var i = 0; i < _this.parameterCount; i++)
            _this.registArgs();
        return _this;
    }
    Object.defineProperty(Procedure.prototype, "Name", {
        /**
         *
         */
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Procedure.prototype, "Entry", {
        get: function () {
            return this.bodyScope.Entry;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Procedure.prototype, "Exit", {
        get: function () {
            return this.bodyScope.Exit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Procedure.prototype, "Scope", {
        get: function () {
            return this.bodyScope;
        },
        enumerable: false,
        configurable: true
    });
    return Procedure;
}(Compilable_1.Compilable));
exports.Procedure = Procedure;

},{"./Scope":"../node_modules/kiwi.codegen/src/code/Scope.ts","../core/Compilable":"../node_modules/kiwi.codegen/src/core/Compilable.ts"}],"../node_modules/kiwi.codegen/src/index.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionTE = exports.ConditionT = exports.Procedure = exports.Template = exports.Scope = exports.Block = void 0;
var join_1 = require("./util/join");
var getId_1 = require("./util/getId");
var Block_1 = require("./code/Block");
Object.defineProperty(exports, "Block", { enumerable: true, get: function () { return Block_1.Block; } });
var Scope_1 = require("./code/Scope");
Object.defineProperty(exports, "Scope", { enumerable: true, get: function () { return Scope_1.Scope; } });
var Procedure_1 = require("./code/Procedure");
Object.defineProperty(exports, "Procedure", { enumerable: true, get: function () { return Procedure_1.Procedure; } });
var Compilable_1 = require("./core/Compilable");
var Condition_1 = require("./code/Condition");
Object.defineProperty(exports, "ConditionT", { enumerable: true, get: function () { return Condition_1.ConditionT; } });
Object.defineProperty(exports, "ConditionTE", { enumerable: true, get: function () { return Condition_1.ConditionTE; } });
/**
 * @author axmand
 * @description
 */
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * func name - func
         */
        _this.PROCEDURE_SET = new Map();
        _this.GLOBAL_NAME_ARR = [];
        _this.GLOBAL_VALUE_ARR = [];
        _this.bathcId = "0";
        _this.globalBlock = new Block_1.Block();
        /**
         * @description link global object
         * @example
         * const g = template.link({});
         * @param v
         * @returns
         */
        _this.link = function (v) {
            var GLOBAL_VALUE_ARR = _this.GLOBAL_VALUE_ARR, GLOBAL_NAME_ARR = _this.GLOBAL_NAME_ARR;
            for (var i = 0, len = GLOBAL_VALUE_ARR.length; i < len; i++)
                if (GLOBAL_VALUE_ARR[i] === v)
                    return GLOBAL_NAME_ARR[i];
            var gln = "g".concat((0, getId_1.getId)());
            GLOBAL_NAME_ARR.push(gln);
            GLOBAL_VALUE_ARR.push(v);
            return gln;
        };
        /**
         * @de define o
         * @param o
         * @returns
         */
        _this.def = function (o) {
            return _this.globalBlock.def(o);
        };
        /**
         * @description create return function 'procedure'
         * @param name
         * @param parameterCount
         * @returns
         */
        _this.procedure = function (name, parameterCount) {
            if (parameterCount === void 0) { parameterCount = 0; }
            var procedure = new Procedure_1.Procedure(name, parameterCount);
            _this.PROCEDURE_SET.set(procedure.Name, procedure);
            return procedure;
        };
        /**
         * @description
         * compile block
         * seems like:
         * (function anonymous(linkNames){
         *  //main
         *  return{
         *      fnName:function(p0){
         *      },
         *      //....
         *  }
         * })
         */
        _this.compile = function () {
            var proces = [];
            _this.PROCEDURE_SET.forEach(function (v, k) {
                proces.push("\"".concat(k, "\":").concat(v.compile(), ","));
            });
            var source = _this.regularize("\"use strict\";".concat(_this.globalBlock.compile(), "return{").concat((0, join_1.join)(proces), "}"));
            /**
             * link name as inputs
             * such as:
             * [gl].concat(str);
             * excuted as:
             * function(gl){//str};
             */
            var proc = Function.apply(null, _this.GLOBAL_NAME_ARR.concat(source));
            /**
             * reference:
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
             * executed in strict, apply(null)
             */
            return proc.apply(null, _this.GLOBAL_VALUE_ARR);
        };
        return _this;
    }
    Object.defineProperty(Template.prototype, "BatchID", {
        get: function () {
            return this.bathcId;
        },
        enumerable: false,
        configurable: true
    });
    return Template;
}(Compilable_1.Compilable));
exports.Template = Template;

},{"./util/join":"../node_modules/kiwi.codegen/src/util/join.ts","./util/getId":"../node_modules/kiwi.codegen/src/util/getId.ts","./code/Block":"../node_modules/kiwi.codegen/src/code/Block.ts","./code/Scope":"../node_modules/kiwi.codegen/src/code/Scope.ts","./code/Procedure":"../node_modules/kiwi.codegen/src/code/Procedure.ts","./core/Compilable":"../node_modules/kiwi.codegen/src/core/Compilable.ts","./code/Condition":"../node_modules/kiwi.codegen/src/code/Condition.ts"}],"../node_modules/pipegl/src/core/Pipeline.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pipeline = void 0;

var _GTexture = require("../res/GTexture");

var _isNDArray = require("../util/isNDArray");

var _GFramebuffer = require("../res/GFramebuffer");

var _kiwi = require("kiwi.codegen");

const PipelineConstant = {
  isNDArray: _isNDArray.isNDArray,
  isNumber: v => !isNaN(parseFloat(v)) && isFinite(v),
  isTexture: v => v instanceof _GTexture.GTexture,
  isFramebuffer: v => v instanceof _GFramebuffer.GFramebuffer
};

class Pipeline {
  constructor(pipelineSchema) {
    var _a;

    this.variableNameSet = new Map();

    this.getVariable = v => {
      return this.variableNameSet.get(v);
    };

    this.appendData = (v, linkName) => {
      var _a;

      this.link(v, linkName);
      (_a = Object.keys(v)) === null || _a === void 0 ? void 0 : _a.forEach(key => {
        this.variableNameSet.set(key, this.template.def(`${this.getVariable(linkName)}.${key}`));
      });
    };

    this.append = v => {
      const ne = v.attributeState !== undefined && v.bufferState !== undefined ? 'pipeState' : 'pipeData';
      this.appendData(v, ne);
    };

    this.proc = (name, parameterCount) => {
      return this.template.procedure(name, parameterCount);
    };

    this.def = v => {
      return this.template.def(v);
    };

    this.compile = () => {
      return this.template.compile();
    };

    this.template = new _kiwi.Template();
    this.pipelineSchema = pipelineSchema;
    this.batchId = 0;
    this.append(pipelineSchema);
    this.link(PipelineConstant, 'pipeConstant');
    (_a = Object.keys(PipelineConstant)) === null || _a === void 0 ? void 0 : _a.forEach(key => {
      this.variableNameSet.set(key, this.template.def(`${this.getVariable('pipeConstant')}.${key}`));
    });
  }

  get BatchID() {
    return this.batchId;
  }

  link(v, name) {
    const v0 = this.template.link(v);
    if (name) this.variableNameSet.set(name, v0);else this.variableNameSet.set(v0, v0);
    return v0;
  }

}

exports.Pipeline = Pipeline;
},{"../res/GTexture":"../node_modules/pipegl/src/res/GTexture.ts","../util/isNDArray":"../node_modules/pipegl/src/util/isNDArray.ts","../res/GFramebuffer":"../node_modules/pipegl/src/res/GFramebuffer.ts","kiwi.codegen":"../node_modules/kiwi.codegen/src/index.ts"}],"../node_modules/pipegl/src/compiler/parseAttribute.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAttribute = void 0;

var _check = require("../util/check");

var _Constant = require("../core/Constant");

var _Props = require("../core/Props");

var _isBufferArray = require("../util/isBufferArray");

var _checkAttribute = require("../util/checkAttribute");

const parseAttribute = opts => {
  var _a;

  const {
    pipeline,
    attributes,
    extLib,
    bufferState
  } = opts;
  const RECORD_SET = new Map();
  (_a = Object.keys(attributes)) === null || _a === void 0 ? void 0 : _a.forEach(key => {
    const v = attributes[key];
    (0, _checkAttribute.checkAttribute)(v);
    const record = {
      name: key
    };

    if ((0, _isBufferArray.isBufferArray)(v)) {
      const v0 = v;
      const buf = bufferState.createBuffer({
        data: v0,
        target: 'ARRAY_BUFFER'
      });
      record.buffer = buf;
      record.component = buf.Component;
      record.divisor = 0;
      record.offset = 0;
      record.stride = 0;
      record.normalized = false;
      record.ln = pipeline.link(buf);
    } else if (v.buffer) {
      const v0 = v;
      const buf = (0, _isBufferArray.isBufferArray)(v0.buffer) ? bufferState.createBuffer({
        data: v0.buffer,
        target: 'ARRAY_BUFFER'
      }) : v0.buffer;
      record.offset = v0.offset | 0;
      (0, _check.check)(record.offset >= 0, `offset只能是大于等于0的数字`);
      record.stride = v0.stride | 0;
      (0, _check.check)(record.stride >= 0 && record.stride < 256, `扫描线宽取值范围必须[0,255]`);
      record.normalized = !!v0.normalized;
      record.component = _Constant.CComponent[v0.component] || buf.Component;
      (0, _check.check)(Object.values(_Constant.CComponent).indexOf(record.component) !== -1, `数据类型只能是${Object.values(_Constant.CComponent)}`);
      (0, _check.check)(v0.divisor === 0 || extLib.get('ANGLE_instanced_arrays'), `不支持ANGLE_instanced_arrays插件，不能设置实例化参数divisor`);
      (0, _check.check)(v0.divisor >= 0, `不支持的divisor值`);
      record.divisor = v0.divisor || 0;
      record.buffer = buf;
      record.component = buf.Component;
      record.ln = pipeline.link(buf);
    } else if (v instanceof _Props.Props) {
      record.p = v;
      record.offset = 0;
      record.stride = 0;
      record.normalized = false;
      record.component = _Constant.CComponent['FLOAT'];
      record.divisor === 0;
    }

    RECORD_SET.set(record.name, record);
  });
  return RECORD_SET;
};

exports.parseAttribute = parseAttribute;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts","../core/Props":"../node_modules/pipegl/src/core/Props.ts","../util/isBufferArray":"../node_modules/pipegl/src/util/isBufferArray.ts","../util/checkAttribute":"../node_modules/pipegl/src/util/checkAttribute.ts"}],"../node_modules/pipegl/src/compiler/parseFramebuffer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFramebuffer = void 0;

var _check = require("../util/check");

const parseFramebuffer = opts => {
  if (!opts.framebuffer) return null;
  const fb = opts.framebuffer,
        gl = opts.gl;
  const response = {};
  response.framebuffer = opts.framebuffer.framebuffer;
  const bit = gl.COLOR_BUFFER_BIT;

  if (fb.clear && fb.clear.color) {
    const color = fb.clear.color;
    (0, _check.check)(color.length === 4, `Error: clear color must consist of 4`);
    response.color = color;
    response.clearBit = bit;
  }

  if (fb.clear && fb.clear.depth) response.clearBit = (response.clearBit || bit) | gl.DEPTH_BUFFER_BIT;
  if (fb.clear && fb.clear.stencil) response.clearBit = (response.clearBit || bit) | gl.STENCIL_BUFFER_BIT;
  return response;
};

exports.parseFramebuffer = parseFramebuffer;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts"}],"../node_modules/pipegl/src/compiler/CompilerCore.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompilerCore = void 0;

var _emitBatch = require("./emitBatch");

var _emitStatus = require("./emitStatus");

var _Constant = require("../core/Constant");

var _emitProgram = require("./emitProgram");

var _emitUniform = require("./emitUniform");

var _emitElement = require("./emitElement");

var _parseStatus = require("./parseStatus");

var _parseProgram = require("./parseProgram");

var _parseElement = require("./parseElement");

var _emitAttribute = require("./emitAttribute");

var _emitFramebuffer = require("./emitFramebuffer");

var _parseUniform = require("./parseUniform");

var _Pipeline = require("../core/Pipeline");

var _parseAttribute = require("./parseAttribute");

var _parseFramebuffer = require("./parseFramebuffer");

class CompilerCore {
  constructor(opts) {
    this.perparePipelineData = opts => {
      let elementbuffer = null,
          attributeRecordSet = null;
      const framebuffer = (0, _parseFramebuffer.parseFramebuffer)(opts);
      const status = (0, _parseStatus.parseStatus)(opts);

      if (!opts.vao) {
        elementbuffer = (0, _parseElement.praseElements)(opts);
        attributeRecordSet = (0, _parseAttribute.parseAttribute)(opts);
      }

      const uniformRecordSet = (0, _parseUniform.parseUniform)(opts);
      const program = (0, _parseProgram.parseProgram)(opts, null);
      const pipelineData = {
        attributeRecordSet,
        uniformRecordSet,
        program: program.program,
        fragShader: program.fragShader,
        vertShader: program.vertShader,
        fragId: program.fragId,
        vertId: program.vertId,
        status,
        vao: opts.vao,
        element: elementbuffer,
        performance: this.performance,
        framebuffer
      };
      opts.pipeline.append(pipelineData);
      return pipelineData;
    };

    this.applyBatchProcPipelineData = opts => {
      const {
        pipeline,
        pipelineData,
        extLib,
        instances
      } = opts;
      const drawProc = pipeline.proc('batch', 1);
      const scope0 = drawProc.Entry.createScope();
      const iBlock = scope0.Entry;
      (0, _emitStatus.emitStatus)(pipeline, iBlock, pipelineData.status);
      (0, _emitFramebuffer.emitFramebuffer)(pipeline, iBlock, scope0.Exit, pipelineData.framebuffer, extLib);
      (0, _emitProgram.emitProgram)(pipeline, iBlock, pipelineData);
      (0, _emitBatch.emitBatch)(pipeline, iBlock, pipelineData, extLib, instances);
    };

    this.applyDrawProcPipelineData = opts => {
      const {
        pipeline,
        pipelineData,
        extLib
      } = opts;
      const drawProc = pipeline.proc('draw', 1);
      const scope0 = drawProc.Entry.createScope();
      const scope1 = drawProc.Exit.createScope();
      const iBlock = scope0.Entry;
      const oBlock = scope1.Exit;
      const P0_NAME = `p0`;
      (0, _emitStatus.emitStatus)(pipeline, iBlock, pipelineData.status);
      (0, _emitFramebuffer.emitFramebuffer)(pipeline, iBlock, oBlock, pipelineData.framebuffer, extLib);
      (0, _emitProgram.emitProgram)(pipeline, iBlock, pipelineData);
      (0, _emitAttribute.emitAttribute)(pipeline, iBlock, extLib, pipelineData.vao, pipelineData.program.Attributes, pipelineData.attributeRecordSet, P0_NAME);
      (0, _emitUniform.emitUniform)(pipeline, iBlock, oBlock, pipelineData.program.Uniforms, pipelineData.uniformRecordSet, P0_NAME);
      (0, _emitElement.emitElement)(pipeline, extLib, pipelineData.vao, iBlock, pipelineData.element, opts.instances);
    };

    this.compile = opts => {
      const count = opts.count || 0,
            offset = opts.offset || 0,
            instances = opts.instances || 0,
            framebuffer = opts.framebuffer || null,
            primitive = _Constant.CPrimitive[opts.primitive || 'TRIANGLES'],
            status = opts.status || {};
      const pipeline = new _Pipeline.Pipeline({
        gl: this.gl,
        extLib: this.extLib,
        limLib: this.limLib,
        attributeState: this.attributeState,
        bufferState: this.bufferState,
        elementState: this.elementState,
        programState: this.programState,
        shaderState: this.shaderState,
        stringState: this.stringState,
        textureState: this.textureState,
        renderbufferState: this.renderbufferState,
        framebufferState: this.framebufferState,
        performance: this.performance,
        offset,
        count,
        primitive,
        instances
      });
      const pipelineData = this.perparePipelineData({
        gl: this.gl,
        pipeline: pipeline,
        attributes: opts.attributes,
        uniforms: opts.uniforms,
        elements: opts.elements,
        frag: opts.frag,
        vert: opts.vert,
        extLib: this.extLib,
        limLib: this.limLib,
        attributeState: this.attributeState,
        bufferState: this.bufferState,
        elementState: this.elementState,
        programState: this.programState,
        shaderState: this.shaderState,
        stringState: this.stringState,
        textureState: this.textureState,
        renderbufferState: this.renderbufferState,
        framebufferState: this.framebufferState,
        vao: opts.vao,
        primitive: opts.primitive || 'TRIANGLES',
        framebuffer,
        status
      });
      this.applyDrawProcPipelineData({
        pipeline,
        pipelineData,
        extLib: this.extLib,
        count,
        instances
      });
      this.applyBatchProcPipelineData({
        pipeline,
        pipelineData,
        extLib: this.extLib,
        count,
        instances
      });
      return pipeline.compile();
    };

    this.gl = opts.gl;
    this.stats = opts.stats;
    this.performance = opts.performance;
    this.extLib = opts.extLib;
    this.limLib = opts.limLib;
    this.bufferState = opts.bufferState;
    this.textureState = opts.textureState;
    this.elementState = opts.elementState;
    this.attributeState = opts.attributeState;
    this.stringState = opts.stringState;
    this.shaderState = opts.shaderState;
    this.programState = opts.programState;
    this.renderbufferState = opts.renderbufferState;
    this.framebufferState = opts.framebufferState;
  }

}

exports.CompilerCore = CompilerCore;
},{"./emitBatch":"../node_modules/pipegl/src/compiler/emitBatch.ts","./emitStatus":"../node_modules/pipegl/src/compiler/emitStatus.ts","../core/Constant":"../node_modules/pipegl/src/core/Constant.ts","./emitProgram":"../node_modules/pipegl/src/compiler/emitProgram.ts","./emitUniform":"../node_modules/pipegl/src/compiler/emitUniform.ts","./emitElement":"../node_modules/pipegl/src/compiler/emitElement.ts","./parseStatus":"../node_modules/pipegl/src/compiler/parseStatus.ts","./parseProgram":"../node_modules/pipegl/src/compiler/parseProgram.ts","./parseElement":"../node_modules/pipegl/src/compiler/parseElement.ts","./emitAttribute":"../node_modules/pipegl/src/compiler/emitAttribute.ts","./emitFramebuffer":"../node_modules/pipegl/src/compiler/emitFramebuffer.ts","./parseUniform":"../node_modules/pipegl/src/compiler/parseUniform.ts","../core/Pipeline":"../node_modules/pipegl/src/core/Pipeline.ts","./parseAttribute":"../node_modules/pipegl/src/compiler/parseAttribute.ts","./parseFramebuffer":"../node_modules/pipegl/src/compiler/parseFramebuffer.ts"}],"../node_modules/pipegl/src/util/createPerformance.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPerformance = void 0;

const createPerformance = () => {
  const stats = {
    gupTime: 0.0,
    cpuTime: 0.0,
    count: 0
  };
  return stats;
};

exports.createPerformance = createPerformance;
},{}],"../node_modules/pipegl/src/core/Pipe.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PipeGL = void 0;

var _check = require("../util/check");

var _Limit = require("./Limit");

var _Extension = require("./Extension");

var _ShaderState = require("../state/ShaderState");

var _StringState = require("../state/StringState");

var _BufferState = require("../state/BufferState");

var _TextureState = require("../state/TextureState");

var _ProgramState = require("../state/ProgramState");

var _ElementState = require("../state/ElementState");

var _AttributeState = require("../state/AttributeState");

var _FramebufferState = require("../state/FramebufferState");

var _RenderbufferState = require("../state/RenderbufferState");

var _createStats = require("../util/createStats");

var _parseConfigure = require("../compiler/parseConfigure");

var _CompilerCore = require("../compiler/CompilerCore");

var _createPerformance = require("../util/createPerformance");

class PipeGL {
  constructor(opts) {
    this.compile = opts => {
      return this.compilerCore.compile(opts);
    };

    this.vao = (atts, opts = {}) => {
      return this.attributeState.createREGLVertexArrayObject(atts, opts);
    };

    this.texture2D = (data, w, h, c, opts = {}) => {
      return this.textureState.createTexture2D(data, w, h, c, opts);
    };

    this.texture2DEmpty = (w, h, c, opts = {}) => {
      const emptyData = new Uint8Array(w * h * c);
      return this.texture2D(emptyData, w, h, c, opts);
    };

    this.textureCube = (faces, w, h, c, opts = {}) => {
      return this.textureState.createTextureCube(faces, w, h, c, opts);
    };

    this.renderbuffer = opts => {
      return this.renderbufferState.createRenderbuffer(opts);
    };

    this.buffer = (data, opts = {}) => {
      return this.bufferState.createBuffer({
        data,
        usage: opts.usage,
        component: opts.component,
        target: opts.target,
        dimension: opts.dimension,
        byteLength: opts.byteLength
      });
    };

    this.framebuffer = opts => {
      return this.framebufferState.createFramebuffer(opts);
    };

    this.clear = opts => {
      const gl = this.gl;
      const {
        color,
        depth,
        stencil
      } = opts;
      (0, _check.check)(color.length === 4, `Error: clear color must consist of 4`);
      gl.clearColor(color[0], color[1], color[2], color[3]);
      let bit = gl.COLOR_BUFFER_BIT;
      if (depth) bit = bit | gl.DEPTH_BUFFER_BIT;
      if (stencil) bit = bit | gl.STENCIL_BUFFER_BIT;
      gl.clear(bit);
    };

    this.stats = (0, _createStats.createStats)();
    this.performance = (0, _createPerformance.createPerformance)();
    this.configure = (0, _parseConfigure.parseConfigure)(opts);
    this.extLib = new _Extension.Extension(this.gl, ...this.configure.extensions);
    this.limLib = new _Limit.Limit(this.gl, this.extLib);
    this.stringState = new _StringState.StringState();
    this.bufferState = new _BufferState.BufferState(this.gl, this.stats);
    this.textureState = new _TextureState.TextureState(this.gl, this.extLib, this.limLib, this.stats);
    this.elementState = new _ElementState.ElementsState(this.gl, this.extLib, this.bufferState, this.stats);
    this.shaderState = new _ShaderState.ShaderState(this.gl, this.stringState, this.stats);
    this.programState = new _ProgramState.ProgramState(this.gl, this.shaderState, this.stringState);
    this.attributeState = new _AttributeState.AttributeState(this.gl, this.extLib, this.limLib, this.bufferState, this.elementState, this.programState, this.stats);
    this.renderbufferState = new _RenderbufferState.RenderbufferState(this.gl, this.extLib, this.limLib, this.stats);
    this.framebufferState = new _FramebufferState.FramebufferState(this.gl, this.textureState, this.renderbufferState, this.extLib, this.limLib, this.stats);
    this.compilerCore = new _CompilerCore.CompilerCore({
      gl: this.gl,
      stats: this.stats,
      performance: this.performance,
      extLib: this.extLib,
      limLib: this.limLib,
      bufferState: this.bufferState,
      textureState: this.textureState,
      elementState: this.elementState,
      attributeState: this.attributeState,
      stringState: this.stringState,
      shaderState: this.shaderState,
      programState: this.programState,
      renderbufferState: this.renderbufferState,
      framebufferState: this.framebufferState
    });
  }

  get gl() {
    return this.configure.gl;
  }

}

exports.PipeGL = PipeGL;
},{"../util/check":"../node_modules/pipegl/src/util/check.ts","./Limit":"../node_modules/pipegl/src/core/Limit.ts","./Extension":"../node_modules/pipegl/src/core/Extension.ts","../state/ShaderState":"../node_modules/pipegl/src/state/ShaderState.ts","../state/StringState":"../node_modules/pipegl/src/state/StringState.ts","../state/BufferState":"../node_modules/pipegl/src/state/BufferState.ts","../state/TextureState":"../node_modules/pipegl/src/state/TextureState.ts","../state/ProgramState":"../node_modules/pipegl/src/state/ProgramState.ts","../state/ElementState":"../node_modules/pipegl/src/state/ElementState.ts","../state/AttributeState":"../node_modules/pipegl/src/state/AttributeState.ts","../state/FramebufferState":"../node_modules/pipegl/src/state/FramebufferState.ts","../state/RenderbufferState":"../node_modules/pipegl/src/state/RenderbufferState.ts","../util/createStats":"../node_modules/pipegl/src/util/createStats.ts","../compiler/parseConfigure":"../node_modules/pipegl/src/compiler/parseConfigure.ts","../compiler/CompilerCore":"../node_modules/pipegl/src/compiler/CompilerCore.ts","../util/createPerformance":"../node_modules/pipegl/src/util/createPerformance.ts"}],"../node_modules/pipegl/src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GBuffer", {
  enumerable: true,
  get: function () {
    return _GBuffer.GBuffer;
  }
});
Object.defineProperty(exports, "GFramebuffer", {
  enumerable: true,
  get: function () {
    return _GFramebuffer.GFramebuffer;
  }
});
Object.defineProperty(exports, "GTexture", {
  enumerable: true,
  get: function () {
    return _GTexture.GTexture;
  }
});
Object.defineProperty(exports, "GVertexArrayObject", {
  enumerable: true,
  get: function () {
    return _GVertexArrayObject.GVertexArrayObject;
  }
});
Object.defineProperty(exports, "IAttributeBuffer", {
  enumerable: true,
  get: function () {
    return _parseAttribute.IAttributeBuffer;
  }
});
Object.defineProperty(exports, "IPerformance", {
  enumerable: true,
  get: function () {
    return _createPerformance.IPerformance;
  }
});
Object.defineProperty(exports, "IPipeCommand", {
  enumerable: true,
  get: function () {
    return _Pipe.IPipeCommand;
  }
});
Object.defineProperty(exports, "PipeGL", {
  enumerable: true,
  get: function () {
    return _Pipe.PipeGL;
  }
});
Object.defineProperty(exports, "Props", {
  enumerable: true,
  get: function () {
    return _Props.Props;
  }
});
Object.defineProperty(exports, "TAttribute", {
  enumerable: true,
  get: function () {
    return _parseAttribute.TAttribute;
  }
});
Object.defineProperty(exports, "TProps", {
  enumerable: true,
  get: function () {
    return _Props.TProps;
  }
});
Object.defineProperty(exports, "TUniform", {
  enumerable: true,
  get: function () {
    return _parseUniform.TUniform;
  }
});

var _Pipe = require("./core/Pipe");

var _createPerformance = require("./util/createPerformance");

var _GFramebuffer = require("./res/GFramebuffer");

var _GTexture = require("./res/GTexture");

var _GVertexArrayObject = require("./res/GVertexArrayObject");

var _GBuffer = require("./res/GBuffer");

var _Props = require("./core/Props");

var _parseUniform = require("./compiler/parseUniform");

var _parseAttribute = require("./compiler/parseAttribute");
},{"./core/Pipe":"../node_modules/pipegl/src/core/Pipe.ts","./util/createPerformance":"../node_modules/pipegl/src/util/createPerformance.ts","./res/GFramebuffer":"../node_modules/pipegl/src/res/GFramebuffer.ts","./res/GTexture":"../node_modules/pipegl/src/res/GTexture.ts","./res/GVertexArrayObject":"../node_modules/pipegl/src/res/GVertexArrayObject.ts","./res/GBuffer":"../node_modules/pipegl/src/res/GBuffer.ts","./core/Props":"../node_modules/pipegl/src/core/Props.ts","./compiler/parseUniform":"../node_modules/pipegl/src/compiler/parseUniform.ts","./compiler/parseAttribute":"../node_modules/pipegl/src/compiler/parseAttribute.ts"}],"../src/globe/auxiliar/Globe.auxiliar.Cursor.ts":[function(require,module,exports) {
"use strict";

var _Globe = require("./../Globe");

var _dom = require("../../util/dom");

var _pipegl = require("pipegl");

_Globe.Globe.prototype.EnableCursorAuxTool = function () {
  var g = this;
  g._state_aux_cursor_ = g._state_aux_cursor_ || {};

  if (!g._state_aux_cursor_.d0) {
    var ctx3d = g.getContext3D();
    var camera = g._state_camera_.camera;
    g._state_aux_cursor_.d0 = ctx3d.compile({
      vert: "precision mediump float;\n\n            uniform vec3 position;\n            uniform mat4 viewProjection;\n\n            void main(){\n                gl_PointSize = 10.0;\n                gl_Position = viewProjection*vec4(position, 1.0);\n            }",
      frag: "precision mediump float;\n\n            void main(){\n                gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n            }",
      attributes: {},
      uniforms: {
        position: new _pipegl.Props('position'),
        viewProjection: function viewProjection(performance, batchId) {
          return camera.ViewProjectionMatrix.value;
        }
      },
      primitive: 'POINTS',
      count: 1,
      status: {
        DEPTH_TEST: true
      }
    });
    g.on('mousemove', g.CursorToolEventHandler, g);
    g.on('auxtool', g.CursorToolRenderHandler, g);
  }
};

_Globe.Globe.prototype.CursorToolEventHandler = function (param) {
  var g = this;
  var currentPosition = (0, _dom.getEventContainerPosition)(param.domEvent, g.Canvas);
  var surfacePoint = g.rayTrackOnSphere(currentPosition);

  if (surfacePoint) {
    g._state_aux_cursor_.surfacePoint = surfacePoint;
    var lnglat = g.spaceCoordinateToGeographic(surfacePoint);
    g.emit('coordinate', lnglat);
  }
};

_Globe.Globe.prototype.CursorToolRenderHandler = function (framestramp) {
  var g = this;
  var p0 = g._state_aux_cursor_.surfacePoint;

  if (p0) {
    var d0 = g._state_aux_cursor_.d0;
    d0.batch([{
      position: p0.value
    }]);
  }
};
},{"./../Globe":"../src/globe/Globe.ts","../../util/dom":"../src/util/dom.ts","pipegl":"../node_modules/pipegl/src/index.ts"}],"../src/core/Ray.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ray = void 0;

var _kiwi = require("kiwi.matrix");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ray =
/*#__PURE__*/
function () {
  function Ray(startpoint, endpoint) {
    _classCallCheck(this, Ray);

    this.startpoint = startpoint.clone();
    this.endpoint = endpoint.clone();
  }

  _createClass(Ray, [{
    key: "at",
    value: function at(t) {
      return this.endpoint.clone().scale(t).add(this.startpoint);
    }
  }, {
    key: "intersectSphere",
    value: function intersectSphere(sphere) {
      var v = new _kiwi.Vec3().set(0, 0, 0).sub(this.startpoint);
      var tca = v.dot(this.endpoint);
      var d2 = v.dot(v) - tca * tca;
      var radius2 = sphere.MaximumRadius * sphere.MaximumRadius;
      if (d2 > radius2) return null;
      var thc = Math.sqrt(radius2 - d2);
      var t0 = tca - thc;
      var t1 = tca + thc;
      if (t0 < 0 && t1 < 0) return null;
      if (t0 < 0) return this.at(t1);
      return this.at(t0);
    }
  }]);

  return Ray;
}();

exports.Ray = Ray;
},{"kiwi.matrix":"../node_modules/kiwi.matrix/dist/bundle.js"}],"../src/camera/PerspectiveCamera.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerspectiveCamera = void 0;

var _kiwi = require("kiwi.matrix");

var _fixed = require("../util/fixed");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PerspectiveCamera =
/*#__PURE__*/
function () {
  function PerspectiveCamera(fov, width, height, near, far) {
    var _this = this;

    _classCallCheck(this, PerspectiveCamera);

    this.fov = Math.PI / 3;
    this.position = new _kiwi.Vec3();
    this.target = new _kiwi.Vec3().set(0, 0, 0);
    this.up = new _kiwi.Vec3().set(0, 0, 1);

    this.updateProjectionMatrix = function () {
      var cameraMatrix = new _kiwi.Mat4().lookAt(_this.position, _this.target, _this.up);
      _this.cameraMatrix = cameraMatrix.clone();
      _this.viewMatrix = cameraMatrix.clone().invert();
      _this.viewProjectionMatrix = _this.projectionMatrix.clone().multiply(_this.viewMatrix);
    };

    this.updateViewFrustrum = function () {
      var aspectRatio = _this.aspect,
          fov = _this.fov,
          fovy = aspectRatio <= 1.0 ? fov : (0, _fixed.atan)((0, _fixed.tan)(fov * 0.5) / aspectRatio * 2.0),
          near = _this.near;
      _this.top = near * (0, _fixed.tan)(0.5 * fovy);
      _this.bottom = -_this.top;
      _this.right = aspectRatio * _this.top;
      _this.left = -_this.right;
      _this.sseDenominator = 2.0 * (0, _fixed.tan)(0.5 * fovy);
    };

    this.lookAt = function (v) {
      _this.target.set(v.x, v.y, v.z);

      _this.updateProjectionMatrix();
    };

    this.position.set(height, 0, 0);
    this.width = width;
    this.height = height;
    this.aspect = width && height ? width / height : 1.0;
    this.fov = _kiwi.GLMatrix.toRadian(fov);
    this.near = near ? near : 0.1;
    this.far = far ? far : 2000;
    this.identityMatrix = new _kiwi.Mat4().identity();
    this.projectionMatrix = _kiwi.Mat4.perspective(this.fov, this.aspect, this.near, this.far);
    this.updateProjectionMatrix();
    this.updateViewFrustrum();
  }

  _createClass(PerspectiveCamera, [{
    key: "Position",
    get: function get() {
      return this.position;
    },
    set: function set(v) {
      this.position.set(v.x, v.y, v.z);
      this.updateProjectionMatrix();
    }
  }, {
    key: "CameraMatrix",
    get: function get() {
      return this.cameraMatrix;
    }
  }, {
    key: "ViewMatrix",
    get: function get() {
      return this.viewMatrix;
    }
  }, {
    key: "ProjectionMatrix",
    get: function get() {
      return this.projectionMatrix;
    }
  }, {
    key: "ViewProjectionMatrix",
    get: function get() {
      return this.viewProjectionMatrix;
    }
  }, {
    key: "Target",
    get: function get() {
      return this.target;
    }
  }, {
    key: "Up",
    get: function get() {
      return this.up;
    }
  }, {
    key: "IdentityMatrix",
    get: function get() {
      return this.identityMatrix;
    }
  }, {
    key: "SseDenominator",
    get: function get() {
      return this.sseDenominator;
    }
  }]);

  return PerspectiveCamera;
}();

exports.PerspectiveCamera = PerspectiveCamera;
},{"kiwi.matrix":"../node_modules/kiwi.matrix/dist/bundle.js","../util/fixed":"../src/util/fixed.ts"}],"../src/globe/Globe.Camera.ts":[function(require,module,exports) {
"use strict";

var _kiwi = require("kiwi.matrix");

var _Globe = require("./Globe");

var _Ray = require("../core/Ray");

var _PerspectiveCamera = require("../camera/PerspectiveCamera");

_Globe.Globe.prototype.registerCamera = function (coord) {
  var g = this;
  var box = g.Canvas.getBoundingClientRect(),
      dom = g.Canvas.ownerDocument.documentElement;
  var left = box.left + window.pageXOffset - dom.clientLeft,
      top = box.top + window.pageYOffset - dom.clientTop,
      width = box.width,
      height = box.height;
  g._state_camera_ = {
    camera: new _PerspectiveCamera.PerspectiveCamera(60, width, height, height / 2 / Math.tan(_kiwi.GLMatrix.toRadian(60)), g.Ellipsoid.MaximumRadius * 10),
    viewContainer: {
      left: left,
      top: top,
      width: width,
      height: height
    },
    viewCenter: {
      clientX: width / 2,
      clientY: height / 2
    },
    target: new _kiwi.Vec3().set(0, 0, 0)
  };
  var p0 = g.geographicToSpaceCoordinate(coord);
  g._state_camera_.camera.Position = p0;

  g._state_camera_.camera.lookAt(new _kiwi.Vec3().set(0, 0, 0));
};

_Globe.Globe.prototype.rayTrackOnSphere = function (point) {
  var g = this;
  var pndc = g.normalizedDeviceCoordinate(point);
  var space = g.normalizedDeviceCoordinateToSpaceCoordinate(pndc);
  var d = space.sub(g._state_camera_.camera.Position.clone()).normalize();
  var ray = new _Ray.Ray(g._state_camera_.camera.Position.clone(), d);
  return ray.intersectSphere(g.Ellipsoid);
};

_Globe.Globe.prototype.normalizedDeviceCoordinate = function (point) {
  var g = this;
  var x = point.clientX / g._state_camera_.viewContainer.width * 2 - 1,
      y = -(point.clientY / g._state_camera_.viewContainer.height) * 2 + 1;
  return new _kiwi.Vec3().set(x, y, 1);
};

_Globe.Globe.prototype.normalizedDeviceCoordinateToSpaceCoordinate = function (pndc) {
  var g = this;

  var m4 = g._state_camera_.camera.CameraMatrix.clone().multiply(g._state_camera_.camera.ProjectionMatrix.clone().invert());

  return pndc.clone().applyMatrix4(m4);
};

_Globe.Globe.prototype.spaceCoordinateToNormaziledDeveiceCoordinate = function (space) {
  var g = this;
  return space.clone().applyMatrix4(g._state_camera_.camera.ViewProjectionMatrix);
};

_Globe.Globe.prototype.geographicToSpaceCoordinate = function (coord) {
  var g = this;
  return g.Ellipsoid.geographicToSpace(coord);
};

_Globe.Globe.prototype.spaceCoordinateToGeographic = function (spaceCoord) {
  var g = this;
  return g.Ellipsoid.spaceToGeographic(spaceCoord);
};
},{"kiwi.matrix":"../node_modules/kiwi.matrix/dist/bundle.js","./Globe":"../src/globe/Globe.ts","../core/Ray":"../src/core/Ray.ts","../camera/PerspectiveCamera":"../src/camera/PerspectiveCamera.ts"}],"../src/util/now.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.now = void 0;

var now = function now() {
  return Date.now();
};

exports.now = now;
},{}],"../src/globe/Globe.Handler.ts":[function(require,module,exports) {
"use strict";

var _Globe = require("./Globe");

var _dom = require("../util/dom");

var _now = require("../util/now");

var DOM_EVENT_TYPES = 'wheel ' + 'mousedown ' + 'mouseup ' + 'mouseover ' + 'mouseout ' + 'mouseenter ' + 'mouseleave ' + 'mousemove ' + 'click ' + 'dblclick ' + 'contextmenu ' + 'keypress ' + 'touchstart ' + 'touchmove ' + 'touchend ';

_Globe.Globe.prototype.registerDOMEventsHook = function () {
  var g = this;
  g._state_handler_dom_ = {
    mouseDownTime: 0
  };
  g.onDOMEvent(g.Canvas, DOM_EVENT_TYPES, g.handleDOMEvent, g);
};

_Globe.Globe.prototype.onDOMEvent = function (element, eventName, handler, context) {
  var g = this;
  (0, _dom.addDOMEvent)(element, DOM_EVENT_TYPES, g.handleDOMEvent, g);
};

_Globe.Globe.prototype.handleDOMEvent = function (e) {
  var g = this;
  var type = e.type;
  if (type === 'contextmenu') (0, _dom.preventDefault)(e);
  if (type === 'mousedown' || type === 'touchstart' && (!e['touches'] || e['touches'].length === 1)) g._state_handler_dom_.mouseDownTime = (0, _now.now)();else if (type === 'click' || type === 'touchend' || type === 'contextmenu') {
    if (!this._mouseDownTime) return;else {
      var downTime = g._state_handler_dom_.mouseDownTime;
      delete g._state_handler_dom_.mouseDownTime;
      var time = (0, _now.now)();
      if (time - downTime > 300 && (type === 'click' || type === 'contextmenu')) return;else if (type === 'touchend' || type === 'click') type = 'dbclick';
    }
  } else if (type === 'wheel' || e['touches'] && e['touches'].length === 2) {
    type = 'zoom';
  }
  g.emit(type, g.parseEvent(e, type));
};

_Globe.Globe.prototype.parseEvent = function (e, type) {
  if (!e) return;
  var ctx = this;
  var DOMEventParam = {
    domEvent: e
  };

  if (type !== 'keypress' && ctx.getActualEvent(e)) {}

  return DOMEventParam;
};

_Globe.Globe.prototype.getActualEvent = function (e) {
  return e['touches'] && e['touches'].length > 0 ? e['touches'][0] : e['changedTouches'] && e['changedTouches'].length > 0 ? e['changedTouches'][0] : e;
};

_Globe.Globe.registerHook(_Globe.Globe.prototype.registerDOMEventsHook);
},{"./Globe":"../src/globe/Globe.ts","../util/dom":"../src/util/dom.ts","../util/now":"../src/util/now.ts"}],"../src/core/QuadtreeTile.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuadtreeTile = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QuadtreeTile =
/*#__PURE__*/
function () {
  function QuadtreeTile(quadtreeTileSchema, x, y, level, parent) {
    _classCallCheck(this, QuadtreeTile);

    this.quadtreeTileSchema = quadtreeTileSchema;
    this.x = x;
    this.y = y;
    this.level = level;
    this.parent = parent;
    this.boundary = this.quadtreeTileSchema.tileXYToRectangle(x, y, level);
  }

  _createClass(QuadtreeTile, [{
    key: "X",
    get: function get() {
      return this.x;
    }
  }, {
    key: "Y",
    get: function get() {
      return this.y;
    }
  }, {
    key: "Boundary",
    get: function get() {
      var tileSchema = this.quadtreeTileSchema,
          x = this.x,
          y = this.y,
          l = this.level;
      return tileSchema.tileXYToRectangle(x, y, l);
    }
  }, {
    key: "Level",
    get: function get() {
      return this.level;
    }
  }, {
    key: "Children",
    get: function get() {
      return [this.NorthwestChild, this.NortheastChild, this.SouthwestChild, this.SoutheastChild];
    }
  }, {
    key: "SouthwestChild",
    get: function get() {
      this.southwestChild = this.southwestChild || new QuadtreeTile(this.quadtreeTileSchema, this.x * 2, this.y * 2 + 1, this.level + 1, this);
      return this.southwestChild;
    }
  }, {
    key: "SoutheastChild",
    get: function get() {
      this.southeastChild = this.southeastChild || new QuadtreeTile(this.quadtreeTileSchema, this.x * 2 + 1, this.y * 2 + 1, this.level + 1, this);
      return this.southeastChild;
    }
  }, {
    key: "NorthwestChild",
    get: function get() {
      this.northwestChild = this.northwestChild || new QuadtreeTile(this.quadtreeTileSchema, this.x * 2, this.y * 2, this.level + 1, this);
      return this.northwestChild;
    }
  }, {
    key: "NortheastChild",
    get: function get() {
      this.northeastChild = this.northeastChild || new QuadtreeTile(this.quadtreeTileSchema, this.x * 2 + 1, this.y * 2, this.level + 1, this);
      return this.northeastChild;
    }
  }]);

  return QuadtreeTile;
}();

exports.QuadtreeTile = QuadtreeTile;
},{}],"../src/core/Rectangle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rectangle = void 0;

var _kiwi = require("kiwi.matrix");

var _epsilon = require("../util/epsilon");

var _GeodeticCoordinate = require("./GeodeticCoordinate");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TWO_PI = 2 * Math.PI;

var modValue = function modValue(m, n) {
  return (m % n + n) % n;
};

var zeroToTwoPi = function zeroToTwoPi(angle) {
  var mod = modValue(angle, TWO_PI);
  return Math.abs(mod) < _epsilon.EPSILON.EPSILON14 && Math.abs(angle) > _epsilon.EPSILON.EPSILON14 ? TWO_PI : mod;
};

var negativePiToPi = function negativePiToPi(angle) {
  return zeroToTwoPi(angle + Math.PI) - Math.PI;
};

var Rectangle =
/*#__PURE__*/
function () {
  function Rectangle(sw, ne) {
    _classCallCheck(this, Rectangle);

    this.south = sw.Latitude;
    this.west = sw.Longitude;
    this.north = ne.Latitude;
    this.east = ne.Longitude;
  }

  _createClass(Rectangle, [{
    key: "Width",
    get: function get() {
      var east = this.east,
          west = this.west;
      return east < west ? east + Math.PI * 2 - west : east - west;
    }
  }, {
    key: "Height",
    get: function get() {
      var north = this.north,
          south = this.south;
      return north - south;
    }
  }, {
    key: "Bounds",
    get: function get() {
      return [this.Southwest, this.Northwest, this.Northeast, this.Southeast];
    }
  }, {
    key: "Southwest",
    get: function get() {
      return new _GeodeticCoordinate.GeodeticCoordinate(this.west, this.south, 0.0);
    }
  }, {
    key: "Northwest",
    get: function get() {
      return new _GeodeticCoordinate.GeodeticCoordinate(this.west, this.north, 0.0);
    }
  }, {
    key: "Northeast",
    get: function get() {
      return new _GeodeticCoordinate.GeodeticCoordinate(this.east, this.north, 0.0);
    }
  }, {
    key: "Southeast",
    get: function get() {
      return new _GeodeticCoordinate.GeodeticCoordinate(this.east, this.south, 0.0);
    }
  }, {
    key: "Center",
    get: function get() {
      var west = _kiwi.GLMatrix.toRadian(this.west),
          south = _kiwi.GLMatrix.toRadian(this.south),
          north = _kiwi.GLMatrix.toRadian(this.north);

      var east = _kiwi.GLMatrix.toRadian(this.east);

      east = east < west ? east + TWO_PI : east;
      var longitude = negativePiToPi((west + east) * 0.5);
      var latitude = (south + north) * 0.5;
      return new _GeodeticCoordinate.GeodeticCoordinate(_kiwi.GLMatrix.toDegree(longitude), _kiwi.GLMatrix.toDegree(latitude), 0.0);
    }
  }, {
    key: "Contain",
    value: function Contain(geodeticCoordinate) {
      var lng = _kiwi.GLMatrix.toRadian(geodeticCoordinate.Longitude),
          lat = _kiwi.GLMatrix.toRadian(geodeticCoordinate.Latitude);

      var west = _kiwi.GLMatrix.toRadian(this.west),
          south = _kiwi.GLMatrix.toRadian(this.south),
          north = _kiwi.GLMatrix.toRadian(this.north);

      var east = _kiwi.GLMatrix.toRadian(this.east);

      east = east < west ? east + TWO_PI : east;
      return (lng > west || Math.abs(lng - west) <= _epsilon.EPSILON.EPSILON14) && (lng < east || Math.abs(lng - east) <= _epsilon.EPSILON.EPSILON14) && lat >= south && lat <= north;
    }
  }]);

  return Rectangle;
}();

exports.Rectangle = Rectangle;
Rectangle.MAX_VALUE = new Rectangle(new _GeodeticCoordinate.GeodeticCoordinate(-180, -90), new _GeodeticCoordinate.GeodeticCoordinate(180, 90));
},{"kiwi.matrix":"../node_modules/kiwi.matrix/dist/bundle.js","../util/epsilon":"../src/util/epsilon.ts","./GeodeticCoordinate":"../src/core/GeodeticCoordinate.ts"}],"../src/core/QuadtreeTileSchema.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webMercatorTileSchema = exports.QuadtreeTileSchema = void 0;

var _kiwi = require("kiwi.matrix");

var _Projection = require("./Projection");

var _Rectangle = require("./Rectangle");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QuadtreeTileSchema =
/*#__PURE__*/
function () {
  function QuadtreeTileSchema(projection) {
    var xNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var yNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    _classCallCheck(this, QuadtreeTileSchema);

    this.numberOfLevelZeroTilesX = xNumber | 1;
    this.numberOfLevelZeroTilesY = yNumber | 1;
    this.projection = projection;
    this.ellipsoid = projection.Ellipsoid;
    this.semimajorAxisTimesPi = projection.Ellipsoid.MaximumRadius * Math.PI;
    this.rectangleSouthwestInMeters = new _kiwi.Vec2().set(-this.semimajorAxisTimesPi, -this.semimajorAxisTimesPi);
    this.rectangleNortheastInMeters = new _kiwi.Vec2().set(this.semimajorAxisTimesPi, this.semimajorAxisTimesPi);
  }

  _createClass(QuadtreeTileSchema, [{
    key: "getNumberOfXTilesAtLevel",
    value: function getNumberOfXTilesAtLevel(level) {
      return this.numberOfLevelZeroTilesX << level;
    }
  }, {
    key: "getNumberOfYTilesAtLevel",
    value: function getNumberOfYTilesAtLevel(level) {
      return this.numberOfLevelZeroTilesY << level;
    }
  }, {
    key: "tileXYToNativeRectangle",
    value: function tileXYToNativeRectangle(x, y, level) {
      var xTiles = this.getNumberOfXTilesAtLevel(level),
          yTiles = this.getNumberOfYTilesAtLevel(level),
          xTileWidth = (this.rectangleNortheastInMeters.x - this.rectangleSouthwestInMeters.x) / xTiles;
      var west = this.rectangleSouthwestInMeters.x + x * xTileWidth,
          east = this.rectangleSouthwestInMeters.x + (x + 1) * xTileWidth,
          yTileHeight = (this.rectangleNortheastInMeters.y - this.rectangleSouthwestInMeters.y) / yTiles;
      var north = this.rectangleNortheastInMeters.y - y * yTileHeight,
          south = this.rectangleNortheastInMeters.y - (y + 1) * yTileHeight;
      return new _kiwi.Vec4().set(west, south, east, north);
    }
  }, {
    key: "tileXYToRectangle",
    value: function tileXYToRectangle(x, y, level) {
      var _this$tileXYToNativeR = _slicedToArray(this.tileXYToNativeRectangle(x, y, level).value, 4),
          west = _this$tileXYToNativeR[0],
          south = _this$tileXYToNativeR[1],
          east = _this$tileXYToNativeR[2],
          north = _this$tileXYToNativeR[3];

      var projection = this.projection;
      var sw = projection.unproject(new _kiwi.Vec3().set(west, south, 0));
      var ne = projection.unproject(new _kiwi.Vec3().set(east, north, 0));
      return new _Rectangle.Rectangle(sw, ne);
    }
  }]);

  return QuadtreeTileSchema;
}();

exports.QuadtreeTileSchema = QuadtreeTileSchema;
var webMercatorTileSchema = new QuadtreeTileSchema(new _Projection.WebMercatorProjection(), 1, 1);
exports.webMercatorTileSchema = webMercatorTileSchema;
},{"kiwi.matrix":"../node_modules/kiwi.matrix/dist/bundle.js","./Projection":"../src/core/Projection.ts","./Rectangle":"../src/core/Rectangle.ts"}],"../src/globe/Globe.Quadtree.ts":[function(require,module,exports) {
"use strict";

var _Globe = require("./Globe");

var _QuadtreeTile = require("./../core/QuadtreeTile");

var _QuadtreeTileSchema = require("./../core/QuadtreeTileSchema");

var MAXIMUM_SCREEN_SPACEERROR = 3.0;

_Globe.Globe.prototype.registerQuadtree = function (tileSchema) {
  var g = this,
      c = g.Origin.center,
      z = g.Origin.zoom;
  g._state_quadtree_ = {
    maximumScreenSpaceError: MAXIMUM_SCREEN_SPACEERROR,
    level: 0,
    quadtreeTileSchema: tileSchema,
    geometricError: [],
    maximumCameraHeight: [],
    zeroLevelTiles: [],
    visualRevealTiles: []
  };
  var sseDenominator = g._state_camera_.camera.SseDenominator,
      height = g._state_camera_.viewContainer.height;

  for (var i = 0; i < 22; i++) {
    var geometricError = g.computeMaximumGeometricError(i);
    g._state_quadtree_.geometricError[i] = geometricError;
    g._state_quadtree_.maximumCameraHeight[i] = geometricError * height / (sseDenominator * MAXIMUM_SCREEN_SPACEERROR);
  }

  g._state_quadtree_.zeroLevelTiles = g.computeZeroLevelTiles();
  c.Altitude = g.getMaximumCameraHeightByLevel(z);
  g._state_camera_.camera.Position = g.geographicToSpaceCoordinate(c);
  g.updateQuadtreeTileByDistanceError();
};

_Globe.Globe.prototype.computeZeroLevelTiles = function () {
  var g = this;
  return g.computeLevelTiles(0);
};

_Globe.Globe.prototype.computeLevelTiles = function (level) {
  var g = this;
  var quadtreeTileSchema = g._state_quadtree_.quadtreeTileSchema,
      numberOfLevelZeroTilesX = quadtreeTileSchema.getNumberOfXTilesAtLevel(level),
      numberOfLevelZeroTilesY = quadtreeTileSchema.getNumberOfYTilesAtLevel(level),
      zeroLevelTiles = [];
  var seed = 0;

  for (var y = 0; y < numberOfLevelZeroTilesY; ++y) {
    for (var x = 0; x < numberOfLevelZeroTilesX; ++x) {
      zeroLevelTiles[seed++] = new _QuadtreeTile.QuadtreeTile(quadtreeTileSchema, x, y, 0, null);
    }
  }

  return zeroLevelTiles;
};

_Globe.Globe.prototype.computeMaximumGeometricError = function (level) {
  var g = this;
  var CRITICAL_VALUE = 128;

  var maximumGeometricError = g.Ellipsoid.MaximumRadius * Math.PI / (CRITICAL_VALUE * g._state_quadtree_.quadtreeTileSchema.getNumberOfXTilesAtLevel(level));

  return maximumGeometricError;
};

_Globe.Globe.prototype.pickZeroLevelQuadtreeTiles = function (position) {
  var g = this;
  if (g._state_quadtree_.quadtreeTileSchema === _QuadtreeTileSchema.webMercatorTileSchema) return g._state_quadtree_.zeroLevelTiles;
  var zeroLevelQuadtreeTiles = g._state_quadtree_.zeroLevelTiles;
  var pickedZeroLevelQuadtreeTiles = [];
  var geodeticCoordinate = g.Ellipsoid.spaceToGeographic(position);
  zeroLevelQuadtreeTiles.forEach(function (quadtreeTile) {
    quadtreeTile.Boundary.Contain(geodeticCoordinate) ? pickedZeroLevelQuadtreeTiles.push(quadtreeTile) : null;
  });
  return pickedZeroLevelQuadtreeTiles;
};

_Globe.Globe.prototype.computeSpaceError = function (quadtreeTile) {
  var g = this;

  var level = quadtreeTile.Level,
      maxGeometricError = g._state_quadtree_.geometricError[level],
      sseDenominator = g._state_camera_.camera.SseDenominator,
      height = g._state_camera_.viewContainer.height,
      cameraSpacePosition = g._state_camera_.camera.Position.clone(),
      bounds = quadtreeTile.Boundary.Bounds,
      center = quadtreeTile.Boundary.Center;

  var spacePosition = g.Ellipsoid.geographicToSpace(center);
  var distance = cameraSpacePosition.clone().sub(spacePosition).len();
  var err = maxGeometricError * height / (distance * sseDenominator);
  return err;
};

_Globe.Globe.prototype.getMaximumCameraHeightByLevel = function (level) {
  var g = this;
  return g._state_quadtree_.maximumCameraHeight[level];
};

_Globe.Globe.prototype.updateQuadtreeTileByDistanceError = function () {
  var g = this;

  var position = g._state_camera_.camera.Position.clone();

  var level = 0;
  var rootTiles = g.pickZeroLevelQuadtreeTiles(position);
  var rawQuadtreeTiles = [];
  var renderingQuadtreeTiles = [];

  var liter = function liter(quadtreeTile) {
    var error = g.computeSpaceError(quadtreeTile);
    if (error > MAXIMUM_SCREEN_SPACEERROR) for (var i = 0; i < 4; i++) {
      liter(quadtreeTile.Children[i]);
    } else {
      var litLevel = quadtreeTile.Level;
      level = litLevel > level ? litLevel : level;
      rawQuadtreeTiles.push(quadtreeTile);
    }
  };

  for (var i = 0, len = rootTiles.length; i < len; i++) {
    var tile = rootTiles[i];
    liter(tile);
  }

  for (var _i = 0, _len = rawQuadtreeTiles.length; _i < _len; _i++) {
    var quadtreeTile = rawQuadtreeTiles[_i];
    if (quadtreeTile.Level === level) renderingQuadtreeTiles.push(quadtreeTile);
  }

  g._state_quadtree_.level = level;
  g._state_quadtree_.visualRevealTiles = renderingQuadtreeTiles;
  g.emit('tileupdated', g._state_quadtree_.visualRevealTiles);
};

_Globe.Globe.registerHook(_Globe.Globe.prototype.registerQuadtree, _QuadtreeTileSchema.webMercatorTileSchema);
},{"./Globe":"../src/globe/Globe.ts","./../core/QuadtreeTile":"../src/core/QuadtreeTile.ts","./../core/QuadtreeTileSchema":"../src/core/QuadtreeTileSchema.ts"}],"../src/util/raf.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RAF = exports.CRAF = void 0;

var getPrefixe = function getPrefixe(name) {
  return window['wekit' + name] || window['moz' + name] || window['ms' + name];
};

var RAF = window['requestAnimationFrame'] || getPrefixe('requestAnimationFrame') || function (fn) {
  return setTimeout(fn, 16);
};

exports.RAF = RAF;

var CRAF = window['cancelAnimationFrame'] || getPrefixe('cancelAnimationFrame') || getPrefixe('CanvelRequestAnimationFrame') || function (id) {
  window.clearTimeout(id);
};

exports.CRAF = CRAF;
},{}],"../src/util/merge.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = void 0;

var merge = function merge() {
  var o = arguments.length <= 0 ? undefined : arguments[0];

  for (var i = 1, len = arguments.length; i < len; i++) {
    var target = i < 0 || arguments.length <= i ? undefined : arguments[i];

    for (var key in target) {
      o[key] = target[key];
    }
  }

  return o;
};

exports.merge = merge;
},{}],"../src/core/Tween.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenCache = exports.Tween = exports.Easing = void 0;

var _merge = require("../util/merge");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TweenCache = new Map();
exports.TweenCache = TweenCache;
var Easing = {
  Linear: {
    None: function None(k) {
      return k;
    }
  },
  Quadratic: {
    In: function In(k) {
      return k * k;
    },
    Out: function Out(k) {
      return k * (2 - k);
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) return 0.5 * k * k;
      return -0.5 * (--k * (k - 2) - 1);
    }
  }
};
exports.Easing = Easing;

var Tween =
/*#__PURE__*/
function () {
  function Tween() {
    var _this = this;

    _classCallCheck(this, Tween);

    this.start = function () {
      if (_this.isPlaying) return true;
      Tween.add(_this);
      _this.isPlaying = true;
      _this.onStartCallbackFired = false;

      for (var property in _this.valuesEnd) {
        if (_this.valuesEnd[property] instanceof Array) {
          if (_this.valuesEnd[property].length === 0) continue;
          _this.valuesEnd[property] = [_this.objective[property]].concat(_this.valuesEnd[property]);
        }

        if (_this.objective[property] === undefined) continue;
        _this.valuesStart[property] = _this.objective[property];
        if (_this.valuesStart[property] instanceof Array === false) _this.valuesStart[property] *= 1.0;
      }

      TweenCache.set(_this.ID, function (framestamp) {
        _this.update(framestamp);
      });
    };

    this.update = function (framestamp) {
      _this.startTime = _this.startTime || framestamp;
      if (framestamp < _this.startTime) return true;

      if (_this.onStartCallbackFired === false) {
        if (_this.onStartCallback !== null && _this.onStartCallback !== undefined) _this.onStartCallback.call(_this, _this.objective);
        _this.onStartCallbackFired = true;
      }

      var pssedTime = (framestamp - _this.startTime) / _this.dura;
      var elapsed = pssedTime > 1 ? 1 : pssedTime;

      var value = _this.easingFunction(elapsed);

      for (var property in _this.valuesEnd) {
        if (_this.valuesStart[property] === undefined) continue;
        var start = _this.valuesStart[property] || 0;
        var end = _this.valuesEnd[property];

        var typeName = _typeof(end);

        if (typeName === 'string') {
          if (end.charAt(0) === '+' || end.charAt(0) === '-') {
            end = start + parseFloat(end);
          } else {
            end = parseFloat(end);
          }
        } else if (typeName === 'number') {
          _this.objective[property] = start + (end - start) * value;
        }
      }

      if (_this.onUpdateCallback !== null) _this.onUpdateCallback(_this.objective);

      if (elapsed === 1) {
        if (_this.onCompleteCallback !== null) _this.onCompleteCallback.call(_this.objective);
        delete TweenCache[_this.id];
      } else TweenCache.set(_this.ID, function (framestamp) {
        _this.update(framestamp);
      });
    };

    this.from = function (properties) {
      _this.valuesStart = properties;
      (0, _merge.merge)(_this.objective, properties);
      return _this;
    };

    this.to = function (properties) {
      _this.valuesEnd = properties;
      return _this;
    };

    this.fixStart = function (cb) {
      _this.onStartCallback = cb;
      return _this;
    };

    this.completeHandler = function (cb) {
      _this.onCompleteCallback = cb;
      return _this;
    };

    this.updateHandler = function (cb) {
      _this.onUpdateCallback = cb;
      return _this;
    };

    this.easingHandler = function (fn) {
      _this.easingFunction = fn;
      return _this;
    };

    this.duration = function (dura) {
      _this.dura = dura;
      return _this;
    };

    this.id = Tween.idx++;
    this.dura = 600;
    this.onStartCallbackFired = false;
    this.isPlaying = false;
    this.easingFunction = Easing.Quadratic.In;
    this.objective = {};
  }

  _createClass(Tween, [{
    key: "ID",
    get: function get() {
      return this.id;
    }
  }]);

  return Tween;
}();

exports.Tween = Tween;
Tween.idx = 0;
Tween.tweens = {};

Tween.add = function (tween) {
  Tween.tweens[tween.ID] = tween;
};
},{"../util/merge":"../src/util/merge.ts"}],"../src/globe/Globe.Renderer.ts":[function(require,module,exports) {
"use strict";

var _pipegl = require("pipegl");

var _Globe = require("./Globe");

var _raf = require("../util/raf");

var _Tween = require("../core/Tween");

_Globe.Globe.prototype.registerGlobeRenderer = function () {
  var g = this;
  g._state_globerender_ = {};
  g._state_globerender_.ctx3d = new _pipegl.PipeGL({
    canvas: g.Canvas,
    extensions: ['ANGLE_instanced_arrays', 'OES_vertex_array_object']
  });
  g.render();
};

_Globe.Globe.prototype.getContext3D = function () {
  var g = this;
  return g._state_globerender_.ctx3d;
};

_Globe.Globe.prototype.render = function () {
  var g = this;
  g.renderLoop(0);
};

_Globe.Globe.prototype.callAnimate = function (framestamp) {
  var arr = [];

  _Tween.TweenCache.forEach(function (fn) {
    return arr.push(fn);
  });

  _Tween.TweenCache.clear();

  var fn = arr.shift();

  while (fn) {
    fn(framestamp);
    fn = arr.shift();
  }
};

_Globe.Globe.prototype.callAuxtool = function (framestamp) {
  var g = this;
  g.emit('auxtool', framestamp);
};

_Globe.Globe.prototype.callWorker = function (framestamp) {
  var g = this;
  g.emit('worker', framestamp);
};

_Globe.Globe.prototype.renderLoop = function (framestamp) {
  var g = this;
  g._state_globerender_.performance = 1000 / (framestamp - g._state_globerender_.lastframestamp);
  g.callWorker(framestamp);
  g.callAnimate(framestamp);
  g.renderFrame(framestamp);
  g._state_globerender_.frameID = _raf.RAF.call(window, function (framestamp) {
    return g.renderLoop(framestamp);
  });
  g._state_globerender_.lastframestamp = framestamp;
};

_Globe.Globe.prototype.renderFrame = function (framestamp) {
  var g = this,
      camera = g._state_camera_.camera,
      state = g._state_globerender_;
  var ctx3d = g.getContext3D();
  ctx3d.clear({
    color: [0.0, 0.0, 0.0, 1.0]
  });
  g.emit('framestart', state.performance);
  g.callAuxtool(framestamp);
  var skpds = g.Sketchpads;
  skpds === null || skpds === void 0 ? void 0 : skpds.forEach(function (skpd) {
    var r = skpd.Renderer;
    r.render(framestamp, camera);
  });
  g.emit('frameend', state.performance);
};

_Globe.Globe.registerHook(_Globe.Globe.prototype.registerGlobeRenderer);
},{"pipegl":"../node_modules/pipegl/src/index.ts","./Globe":"../src/globe/Globe.ts","../util/raf":"../src/util/raf.ts","../core/Tween":"../src/core/Tween.ts"}],"../src/core/Format.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZOOM_EVENTS = exports.START_EVENTS = exports.PAN_EVENTS = exports.MOVE_EVENTS = exports.END_EVENTS = void 0;
var ZOOM_EVENTS = {
  wheel: 'wheel',
  wheelend: 'wheelend'
};
exports.ZOOM_EVENTS = ZOOM_EVENTS;
var START_EVENTS = 'touchstart mousedown';
exports.START_EVENTS = START_EVENTS;
var MOVE_EVENTS = {
  mousedown: 'mousemove',
  touchstart: 'touchmove',
  pointerdown: 'touchmove',
  MSPointerDown: 'touchmove'
};
exports.MOVE_EVENTS = MOVE_EVENTS;
var END_EVENTS = {
  mousedown: 'mouseup',
  touchstart: 'touchend',
  pointerdown: 'touchend',
  MSPointerDown: 'touchend'
};
exports.END_EVENTS = END_EVENTS;
var PAN_EVENTS = {
  panstart: 'panstart',
  paning: 'paning',
  panend: 'panend'
};
exports.PAN_EVENTS = PAN_EVENTS;
},{}],"../src/globe/handler/Globe.Handler.Pan.ts":[function(require,module,exports) {
"use strict";

var _kiwi = require("kiwi.matrix");

var _Globe = require("./../Globe");

var _split = require("../../util/split");

var _dom = require("../../util/dom");

var _Format = require("../../core/Format");

_Globe.Globe.prototype.registerPanHandlerHood = function () {
  var g = this;
  g._state_handler_pan_ = {
    startPosition: new _kiwi.Vec2(),
    moved: false,
    interupted: false
  };
  (0, _split.split)(_Format.START_EVENTS).forEach(function (type) {
    g.on(type, g.panMousedownOrTouchstart);
  });
};

_Globe.Globe.prototype.panMousedownOrTouchstart = function (args) {
  var g = this,
      e = args.domEvent;
  if (e['button'] === 2 || e['touches'] && e['touches'].length > 1) return;
  var cp = (0, _dom.getEventContainerPosition)(e, g.Canvas);
  g._state_handler_pan_.startPosition = new _kiwi.Vec2().set(cp.clientX, cp.clientY);
  var panEventParam = {
    domEvent: e,
    currentPosition: {
      clientX: cp.clientX,
      clientY: cp.clientY
    }
  };
  g.emit(_Format.PAN_EVENTS.panstart, panEventParam);
  g.on(_Format.MOVE_EVENTS[e.type], g.panMousemoveOrTouchmove);
  g.on(_Format.END_EVENTS[e.type], g.panMouseupOrTouchend);
};

_Globe.Globe.prototype.panMousemoveOrTouchmove = function (args) {
  var g = this,
      e = args.domEvent;

  if (e['touches'] && e['touches'].length > 1) {
    if (g._state_handler_pan_.moved) {
      g._state_handler_pan_.interupted = true;
      g.panMouseupOrTouchend(args);
    }

    return;
  }

  var cp = (0, _dom.getEventContainerPosition)(e, g.Canvas);
  var currentPosition = new _kiwi.Vec2().set(cp.clientX, cp.clientY);
  var offset = currentPosition.clone().sub(g._state_handler_pan_.startPosition);
  if (!offset.x && !offset.y) return;
  var panEventParam = {
    domEvent: e,
    currentPosition: {
      clientX: cp.clientX,
      clientY: cp.clientY
    }
  };
  g.emit(_Format.PAN_EVENTS.paning, panEventParam);
  g._state_handler_pan_.startPosition = currentPosition;
};

_Globe.Globe.prototype.panMouseupOrTouchend = function (args) {
  var g = this,
      e = args.domEvent;
  g.releasePanHandlerEvents();
  var cp = (0, _dom.getEventContainerPosition)(e, g.Canvas);
  var panEventParam = {
    domEvent: e,
    currentPosition: {
      clientX: cp.clientX,
      clientY: cp.clientY
    }
  };
  g.emit(_Format.PAN_EVENTS.panend, panEventParam);
};

_Globe.Globe.prototype.releasePanHandlerEvents = function () {
  var g = this;

  for (var key in _Format.MOVE_EVENTS) {
    var moveEventName = _Format.MOVE_EVENTS[key];
    var endEventName = _Format.END_EVENTS[key];
    g.off(moveEventName, g.panMousemoveOrTouchmove);
    g.off(endEventName, g.panMouseupOrTouchend);
  }
};

_Globe.Globe.registerHook(_Globe.Globe.prototype.registerPanHandlerHood);
},{"kiwi.matrix":"../node_modules/kiwi.matrix/dist/bundle.js","./../Globe":"../src/globe/Globe.ts","../../util/split":"../src/util/split.ts","../../util/dom":"../src/util/dom.ts","../../core/Format":"../src/core/Format.ts"}],"../src/globe/handler/Globe.Handler.Zoom.ts":[function(require,module,exports) {
"use strict";

var _Globe = require("../Globe");

var _now = require("../../util/now");

var _Format = require("../../core/Format");

var _dom = require("../../util/dom");

var wheelZoomDelta = 4.000244140625;

_Globe.Globe.prototype.registerZoomHandlerHook = function () {
  var g = this;
  g._state_handler_zoom_ = {
    lastWheelTime: 0,
    lastWheelEvent: null,
    onceWheelCount: 0,
    delate: 0,
    active: false,
    zooming: false,
    trackPadSuspect: 0,
    ensureTrackpad: false,
    zoomOrigin: {
      clientX: 0,
      clientY: 0
    }
  };
  g.on('zoom', g.zoomMousewheelOrTouch);
};

_Globe.Globe.prototype.releaseZoomHandlerEvents = function () {
  var g = this;
  g.off('zoom', g.zoomMousewheelOrTouch);
};

_Globe.Globe.prototype.zoomMousewheelOrTouch = function (args) {
  var g = this,
      e = args.domEvent;
  (0, _dom.preventDefault)(e);
  (0, _dom.stopPropagation)(e);

  if (e.type === 'wheel' && !g._state_handler_zoom_.zooming) {
    var n = (0, _now.now)();
    g._state_handler_zoom_.lastWheelTime = g._state_handler_zoom_.lastWheelTime || n;
    if (n - g._state_handler_zoom_.lastWheelTime < 50) g._state_handler_zoom_.onceWheelCount++;else g.processZoomWheel(e, g);
    setTimeout(function () {
      if (!g._state_handler_zoom_.zooming) g.processZoomWheel(e, g);
    }, 30);
  }
};

_Globe.Globe.prototype.processZoomWheel = function (e, g) {
  var currentPosition = (0, _dom.getEventContainerPosition)(e, g.Canvas);
  var zoomEventParam = {
    domEvent: e,
    currentPosition: currentPosition
  };

  if (!g._state_handler_zoom_.zooming) {
    g._state_handler_zoom_.trackPadSuspect = 0;
    g._state_handler_zoom_.ensureTrackpad = false;
  }

  var value = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 60 : e.deltaY;

  if (value % wheelZoomDelta !== 0) {
    if (!g._state_handler_zoom_.ensureTrackpad) {
      g._state_handler_zoom_.trackPadSuspect = Math.abs(value) < 60 ? g._state_handler_zoom_.trackPadSuspect + 1 : 0;
      if (g._state_handler_zoom_.trackPadSuspect >= 2) g._state_handler_zoom_.ensureTrackpad = true;
    }

    if (g._state_handler_zoom_.ensureTrackpad) value *= 14;
  }

  if (e.shiftKey && value) value = value / 4;
  g._state_handler_zoom_.lastWheelEvent = e;
  g._state_handler_zoom_.delate -= value;
  if (!g._state_handler_zoom_.zooming && g._state_handler_zoom_.delate) g._state_handler_zoom_.zoomOrigin = currentPosition;
  zoomEventParam.value = value;
  zoomEventParam.zoom = g._state_handler_zoom_.onceWheelCount;
  g.emit(_Format.ZOOM_EVENTS.wheel, zoomEventParam);
};

_Globe.Globe.registerHook(_Globe.Globe.prototype.registerZoomHandlerHook);
},{"../Globe":"../src/globe/Globe.ts","../../util/now":"../src/util/now.ts","../../core/Format":"../src/core/Format.ts","../../util/dom":"../src/util/dom.ts"}],"../src/globe/camera/Globe.Camera.FlyTo.ts":[function(require,module,exports) {
"use strict";

var _Globe = require("../Globe");

var _Tween = require("../../core/Tween");

var _GeodeticCoordinate = require("../../core/GeodeticCoordinate");

_Globe.Globe.prototype.flyTo = function (coord, zoom, duration) {
  var g = this,
      center = g.Origin.center.toGeodetic(),
      viewCenter = g._state_camera_.viewCenter;
  var p1 = coord.toGeodetic();
  var camera = g._state_camera_.camera,
      target = g._state_camera_.camera.Target;
  var total = camera.Position.len() - g.MaximumRadius - g.getMaximumCameraHeightByLevel(zoom);
  g._state_handler_zoom_.zooming = true;
  var cached = {
    f: g.rayTrackOnSphere(viewCenter),
    len: 0
  };
  new _Tween.Tween().from({
    len: 0,
    x: center.Longitude,
    y: center.Latitude
  }).to({
    len: total,
    x: p1.Longitude,
    y: p1.Latitude
  }).duration(duration).easingHandler(_Tween.Easing.Quadratic.InOut).updateHandler(function (v) {
    var eyeDirection = camera.Position.clone().sub(target).normalize();
    var deltaDistance = v.len - cached.len;
    var delta = eyeDirection.scale(deltaDistance);
    camera.Position = camera.Position.clone().sub(delta);
    cached.len = v.len;
    var to = new _GeodeticCoordinate.GeodeticCoordinate(v.x, v.y);
    var t = g.geographicToSpaceCoordinate(to).normalize();
    g.panFromTo(t, cached.f);
    cached.f = g.rayTrackOnSphere(viewCenter);
  }).completeHandler(function () {
    g.updateQuadtreeTileByDistanceError();
    g._state_handler_zoom_.zooming = false;
    g._state_handler_zoom_.onceWheelCount = 0;
    g._state_handler_zoom_.lastWheelTime = 0;
  }).start();
};
},{"../Globe":"../src/globe/Globe.ts","../../core/Tween":"../src/core/Tween.ts","../../core/GeodeticCoordinate":"../src/core/GeodeticCoordinate.ts"}],"../src/globe/camera/Globe.Camera.Pan.ts":[function(require,module,exports) {
"use strict";

var _kiwi = require("kiwi.matrix");

var _Globe = require("../Globe");

var _Format = require("../../core/Format");

_Globe.Globe.prototype.registerCameraPan = function () {
  var g = this;
  g._state_pan_ = {
    paning: false,
    m_lastRotateGlobeFromVector: new _kiwi.Vec3(),
    m_lastRotateGlobeAxis: new _kiwi.Vec3(),
    m_lastRotateGlobeAngle: 0,
    m_lastPostition: {
      clientX: 0,
      clientY: 0
    },
    m_rotateGlobeQuaternion: new _kiwi.Quat()
  };
  g.on(_Format.PAN_EVENTS.panstart, g.onPanStart);
  g.on(_Format.PAN_EVENTS.paning, g.onPaning);
  g.on(_Format.PAN_EVENTS.panend, g.onPanend);
};

_Globe.Globe.prototype.panFromTo = function (fm, to) {
  if (fm == null || to == null) return;
  var g = this;
  g._state_pan_.m_lastRotateGlobeFromVector = fm.clone();
  g._state_pan_.m_lastRotateGlobeAxis = fm.clone().cross(to).normalize();
  g._state_pan_.m_lastRotateGlobeAngle = fm.angle(to);
  g._state_pan_.m_rotateGlobeQuaternion = new _kiwi.Quat().setAxisAngle(g._state_pan_.m_lastRotateGlobeAxis, -g._state_pan_.m_lastRotateGlobeAngle);

  var offset = g._state_camera_.camera.Position.clone().sub(g._state_camera_.target);

  offset.applyQuat(g._state_pan_.m_rotateGlobeQuaternion);

  g._state_camera_.camera.Up.applyQuat(g._state_pan_.m_rotateGlobeQuaternion);

  g._state_camera_.camera.Position = offset.add(g._state_camera_.target);
};

_Globe.Globe.prototype.onPanStart = function (panParam) {
  var g = this,
      cp = panParam.currentPosition;
  g._state_pan_.paning = true;
  g._state_pan_.m_lastPostition = {
    clientX: cp.clientX,
    clientY: cp.clientY
  };
};

_Globe.Globe.prototype.onPaning = function (panParam) {
  var g = this,
      cp = panParam.currentPosition;
  var tc = {
    clientX: cp.clientX,
    clientY: cp.clientY
  };
  var fm = g.rayTrackOnSphere(g._state_pan_.m_lastPostition);
  var to = g.rayTrackOnSphere(tc);
  g.panFromTo(fm, to);
  g._state_pan_.m_lastPostition = {
    clientX: tc.clientX,
    clientY: tc.clientY
  };
};

_Globe.Globe.prototype.onPanend = function (args) {
  var g = this;
  g._state_pan_.paning = false;
  g.updateQuadtreeTileByDistanceError();
};

_Globe.Globe.registerHook(_Globe.Globe.prototype.registerCameraPan);
},{"kiwi.matrix":"../node_modules/kiwi.matrix/dist/bundle.js","../Globe":"../src/globe/Globe.ts","../../core/Format":"../src/core/Format.ts"}],"../src/util/clamp.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = void 0;

var clamp = function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
};

exports.clamp = clamp;
},{}],"../src/globe/camera/Globe.Camera.Zoom.ts":[function(require,module,exports) {
"use strict";

var _Globe = require("../Globe");

var _clamp = require("../../util/clamp");

var _Tween = require("../../core/Tween");

var _Format = require("../../core/Format");

_Globe.Globe.prototype.registerCameraZoom = function () {
  var g = this;
  g.on(_Format.ZOOM_EVENTS.wheel, g.onWheeling);
  g.on(_Format.ZOOM_EVENTS.wheelend, g.onWheelEnd);
};

_Globe.Globe.prototype.onWheeling = function (zoomEventParam) {
  var g = this,
      e = zoomEventParam.domEvent,
      currentPosition = zoomEventParam.currentPosition,
      value = zoomEventParam.value;
  var fr = g.rayTrackOnSphere(currentPosition);
  if (fr === null) return;
  var lv = (0, _clamp.clamp)(value > 0 ? g.Zoom - zoomEventParam.zoom : g.Zoom + zoomEventParam.zoom, g.Origin.zoomMin, g.Origin.zoomMax);
  var camera = g._state_camera_.camera,
      target = g._state_camera_.target;
  var total = camera.Position.len() - g.MaximumRadius - g.getMaximumCameraHeightByLevel(lv);
  g._state_handler_zoom_.zooming = true;
  var cached = {
    fr: fr,
    len: 0
  };
  new _Tween.Tween().from({
    len: 0
  }).to({
    len: total
  }).duration(zoomEventParam.zoom * 120).updateHandler(function (v) {
    var eyeDirection = camera.Position.clone().sub(target).normalize();
    var deltaDistance = v.len - cached.len;
    var delta = eyeDirection.scale(deltaDistance);
    camera.Position = camera.Position.clone().sub(delta);
    var to = g.rayTrackOnSphere(currentPosition);
    g.panFromTo(cached.fr, to);
    cached.len = v.len;
  }).completeHandler(function () {
    g.emit(_Format.ZOOM_EVENTS.wheelend);
  }).start();
};

_Globe.Globe.prototype.onWheelEnd = function () {
  var g = this;
  g.updateQuadtreeTileByDistanceError();
  g._state_handler_zoom_.zooming = false;
  g._state_handler_zoom_.onceWheelCount = 0;
  g._state_handler_zoom_.lastWheelTime = 0;
};

_Globe.Globe.registerHook(_Globe.Globe.prototype.registerCameraZoom);
},{"../Globe":"../src/globe/Globe.ts","../../util/clamp":"../src/util/clamp.ts","../../core/Tween":"../src/core/Tween.ts","../../core/Format":"../src/core/Format.ts"}],"../src/util/rgba.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgba = void 0;

var rgba = function rgba(uri) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return new Promise(function (resolve, reject) {
    fetch(uri).then(function (res0) {
      return res0.blob();
    }).then(function (blob) {
      return createImageBitmap(blob);
    }).then(function (bitmap) {
      var w = bitmap.width,
          h = bitmap.height,
          c = 4;
      var CANVAS = document.createElement('canvas');
      CANVAS.width = devicePixelRatio * w;
      CANVAS.height = devicePixelRatio * h;
      CANVAS.style.width = "".concat(w, "px");
      CANVAS.style.height = "".concat(h, "px");
      var CTX = CANVAS.getContext('2d');
      CTX.drawImage(bitmap, 0, 0);
      var uc8arr = CTX.getImageData(0, 0, w, h).data;
      var buf = new Uint8Array(uc8arr);
      resolve({
        buf: buf,
        w: w,
        h: h,
        c: c,
        key: key
      });
    }).catch(function (reason) {
      reject(reason);
    });
  });
};

exports.rgba = rgba;
},{}],"../src/util/llp.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.llpVertex = exports.llpTexCoord = exports.llpElement = void 0;

var _Ellipsoid = require("../core/Ellipsoid");

var _GeodeticCoordinate = require("./../core/GeodeticCoordinate");

var VERTEXCOUNT = 8;

var llpVertex = function llpVertex(boundary) {
  var lerp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : VERTEXCOUNT;
  var vertex = [];
  var factor = 1 / lerp,
      rangeX = boundary.Width,
      rangeY = boundary.Height,
      start = boundary.Southwest;

  for (var x = 0; x <= lerp; x++) {
    for (var y = 0; y <= lerp; y++) {
      var c0 = start.Longitude + x * factor * rangeX;
      var c1 = start.Latitude + y * factor * rangeY;
      var g1 = new _GeodeticCoordinate.GeodeticCoordinate(c0, c1, 0);

      var spaceCoord = _Ellipsoid.PSEUDOMERCATOR.geographicToSpace(g1);

      vertex.push(spaceCoord.value);
    }
  }

  return vertex;
};

exports.llpVertex = llpVertex;

var llpTexCoord = function llpTexCoord() {
  var lerp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : VERTEXCOUNT;
  var texCoord = [];
  var factor = 1 / lerp;

  for (var x = 0; x <= lerp; x++) {
    for (var y = 0; y <= lerp; y++) {
      texCoord.push([x * factor, 1 - y * factor]);
    }
  }

  return texCoord;
};

exports.llpTexCoord = llpTexCoord;

var llpElement = function llpElement() {
  var lerp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : VERTEXCOUNT;
  var elements = [];
  var stride = lerp + 1;

  for (var x = 0; x < lerp; x++) {
    for (var y = 0; y < lerp; y++) {
      var first = x * stride + y;
      var second = first + stride;
      elements.push([first, second, first + 1]);
      elements.push([first + 1, second, second + 1]);
    }
  }

  return elements;
};

exports.llpElement = llpElement;
},{"../core/Ellipsoid":"../src/core/Ellipsoid.ts","./../core/GeodeticCoordinate":"../src/core/GeodeticCoordinate.ts"}],"../src/render/Renderable.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderable = void 0;

var _EventEmitter2 = require("../core/EventEmitter");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Renderable =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Renderable, _EventEmitter);

  var _super = _createSuper(Renderable);

  function Renderable() {
    var _this;

    _classCallCheck(this, Renderable);

    _this = _super.apply(this, arguments);

    _this.getRegisterRender = function (name) {
      var clazz = Renderable.renderers.get(name);
      return clazz;
    };

    return _this;
  }

  return Renderable;
}(_EventEmitter2.EventEmitter);

exports.Renderable = Renderable;
Renderable.renderers = new Map();

Renderable.registerRenderer = function (name, clazz) {
  Renderable.renderers.set(name, clazz);
};
},{"../core/EventEmitter":"../src/core/EventEmitter.ts"}],"../src/sketchpad/Sektchpad.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sketchpad = void 0;

var _Renderable2 = require("../render/Renderable");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Sketchpad =
/*#__PURE__*/
function (_Renderable) {
  _inherits(Sketchpad, _Renderable);

  var _super = _createSuper(Sketchpad);

  function Sketchpad() {
    _classCallCheck(this, Sketchpad);

    return _super.call(this);
  }

  _createClass(Sketchpad, [{
    key: "Globe",
    get: function get() {
      return this.g;
    }
  }, {
    key: "attach",
    value: function attach(globe) {
      var _a, _b;

      this.g = globe;
      var clazz = this.getRegisterRender(this.constructor.name);
      this.renderer = new clazz(this, globe.getContext3D());
      (_a = this.registerData) === null || _a === void 0 ? void 0 : _a.call(this);
      (_b = this.registerEvents) === null || _b === void 0 ? void 0 : _b.call(this);
    }
  }, {
    key: "Renderer",
    get: function get() {
      return this.renderer;
    }
  }]);

  return Sketchpad;
}(_Renderable2.Renderable);

exports.Sketchpad = Sketchpad;
},{"../render/Renderable":"../src/render/Renderable.ts"}],"../src/sketchpad/layer/TileLayer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TileLayer = void 0;

var _rgba = require("../../util/rgba");

var _llp = require("../../util/llp");

var _Sektchpad = require("../Sektchpad");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TileLayer =
/*#__PURE__*/
function (_Sketchpad) {
  _inherits(TileLayer, _Sketchpad);

  var _super = _createSuper(TileLayer);

  function TileLayer() {
    var _this;

    _classCallCheck(this, TileLayer);

    _this = _super.apply(this, arguments);
    _this.CACHE = new Map();

    _this.registerEvents = function () {
      _this.g.on('tileupdated', _this.prepareData, _assertThisInitialized(_this));

      _this.g.on('worker', _this.prepareWorker, _assertThisInitialized(_this));
    };

    _this.queue = [];

    _this.prepareData = function (tiles) {
      _this.queue = [];
      var CACHE = _this.CACHE;
      tiles === null || tiles === void 0 ? void 0 : tiles.forEach(function (t) {
        var x = t.X,
            y = t.Y,
            level = t.Level,
            boundary = t.Boundary;
        var key = "".concat(level, "-").concat(x, "-").concat(y);

        if (!CACHE.has(key)) {
          var uri = "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX=".concat(level, "&TILEROW=").concat(y, "&TILECOL=").concat(x, "&tk=65ac66b5243f941bc05a75bd61d12246");
          var vertices = (0, _llp.llpVertex)(boundary);
          var q = {
            key: key,
            uri: uri,
            vertices: vertices
          };

          _this.queue.unshift(q);
        }
      });
    };

    _this.prepareWorker = function () {
      var CACHE = _this.CACHE,
          QUEUE = _this.queue;

      if (QUEUE.length > 0 && !CACHE.has(QUEUE[0].key)) {
        var q = QUEUE.shift();
        var uri = q.uri,
            vertices = q.vertices,
            key = q.key;
        CACHE.set(key, {
          uri: uri,
          vertices: vertices
        });
        (0, _rgba.rgba)(uri, key).then(function (v) {
          var schema = {
            key: v.key,
            width: v.w,
            height: v.h,
            channel: v.c,
            vertices: vertices,
            textureBuffer: v.buf
          };

          _this.Renderer.prepare(schema);
        });
      }
    };

    return _this;
  }

  return TileLayer;
}(_Sektchpad.Sketchpad);

exports.TileLayer = TileLayer;
},{"../../util/rgba":"../src/util/rgba.ts","../../util/llp":"../src/util/llp.ts","../Sektchpad":"../src/sketchpad/Sektchpad.ts"}],"../src/util/normal.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNormals = void 0;

var hypot = function hypot(x, y, z) {
  var num = Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2);
  return Math.sqrt(num);
};

var weight = function weight(s, r, a) {
  return Math.atan2(r, s - a);
};

var mulAdd = function mulAdd(dest, s, x, y, z) {
  dest[0] += s * x;
  dest[1] += s * y;
  dest[2] += s * z;
};

var createNormals = function createNormals(elements, positions) {
  var numVerts = positions.length;
  var numCells = elements.length;
  var normals = new Array(numVerts);

  for (var i = 0; i < numVerts; ++i) {
    normals[i] = [0, 0, 0];
  }

  for (var i = 0; i < numCells; ++i) {
    var cell = elements[i];
    var a = positions[cell[0]];
    var b = positions[cell[1]];
    var c = positions[cell[2]];
    var abx = a[0] - b[0];
    var aby = a[1] - b[1];
    var abz = a[2] - b[2];
    var ab = hypot(abx, aby, abz);
    var bcx = b[0] - c[0];
    var bcy = b[1] - c[1];
    var bcz = b[2] - c[2];
    var bc = hypot(bcx, bcy, bcz);
    var cax = c[0] - a[0];
    var cay = c[1] - a[1];
    var caz = c[2] - a[2];
    var ca = hypot(cax, cay, caz);
    if (Math.min(ab, bc, ca) < 1e-6) continue;
    var s = 0.5 * (ab + bc + ca);
    var r = Math.sqrt((s - ab) * (s - bc) * (s - ca) / s);
    var nx = aby * bcz - abz * bcy;
    var ny = abz * bcx - abx * bcz;
    var nz = abx * bcy - aby * bcx;
    var nl = hypot(nx, ny, nz);
    nx /= nl;
    ny /= nl;
    nz /= nl;
    mulAdd(normals[cell[0]], weight(s, r, bc), nx, ny, nz);
    mulAdd(normals[cell[1]], weight(s, r, ca), nx, ny, nz);
    mulAdd(normals[cell[2]], weight(s, r, ab), nx, ny, nz);
  }

  for (var _i = 0; _i < numVerts; ++_i) {
    var n = normals[_i];
    var l = Math.sqrt(Math.pow(n[0], 2) + Math.pow(n[1], 2) + Math.pow(n[2], 2));

    if (l < 1e-8) {
      n[0] = 1;
      n[1] = 0;
      n[2] = 0;
      continue;
    }

    n[0] /= l;
    n[1] /= l;
    n[2] /= l;
  }

  return normals;
};

exports.createNormals = createNormals;
},{}],"../src/sketchpad/SketchpadRenderer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SketchpadRenderer = void 0;

var _Sektchpad = require("./Sektchpad");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SketchpadRenderer =
/*#__PURE__*/
function () {
  function SketchpadRenderer(skpd, ctx3d) {
    _classCallCheck(this, SketchpadRenderer);

    this.skpd = skpd;
    this.ctx3d = ctx3d;
    this.g = skpd.Globe;
  }

  _createClass(SketchpadRenderer, [{
    key: "prepare",
    value: function prepare(arg) {
      throw new Error("Method not implemented.");
    }
  }, {
    key: "sort",
    value: function sort(arg) {
      throw new Error("Method not implemented.");
    }
  }, {
    key: "getCanvasImage",
    value: function getCanvasImage() {
      throw new Error("Method not implemented.");
    }
  }, {
    key: "render",
    value: function render(framestamp, camera) {
      throw new Error("Method not implemented.");
    }
  }]);

  return SketchpadRenderer;
}();

exports.SketchpadRenderer = SketchpadRenderer;

_Sektchpad.Sketchpad.registerRenderer(_Sektchpad.Sketchpad.name, SketchpadRenderer);
},{"./Sektchpad":"../src/sketchpad/Sektchpad.ts"}],"../src/sketchpad/layer/TileLayerRenderer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TileLayerRenderer = void 0;

var _pipegl = require("pipegl");

var _normal = require("../../util/normal");

var _SketchpadRenderer2 = require("../SketchpadRenderer");

var _llp = require("../../util/llp");

var _TileLayer = require("./TileLayer");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TileLayerRenderer =
/*#__PURE__*/
function (_SketchpadRenderer) {
  _inherits(TileLayerRenderer, _SketchpadRenderer);

  var _super = _createSuper(TileLayerRenderer);

  function TileLayerRenderer(qtLayer, ctx3d) {
    var _this;

    _classCallCheck(this, TileLayerRenderer);

    _this = _super.call(this, qtLayer, ctx3d);
    _this.CACHE = new Map();
    _this.batch = new Map();

    _this.prepare = function (tileData) {
      var CACHE = _this.CACHE;
      var key = tileData.key;

      _this.batch.set(key, true);

      if (!_this.CACHE.has(key)) {
        var vBuf = _this.ctx3d.buffer(tileData.vertices);

        var nBuf = _this.ctx3d.buffer((0, _normal.createNormals)(_this.elements, tileData.vertices));

        var texture = _this.ctx3d.texture2D(tileData.textureBuffer, tileData.width, tileData.height, tileData.channel);

        var schema = {
          vBuf: vBuf,
          nBuf: nBuf,
          texture: texture
        };
        CACHE.set(key, schema);
      }
    };

    _this.render = function (framestamp, camera) {
      var props = [];

      _this.batch.forEach(function (v, k) {
        var schema = _this.CACHE.get(k);

        if (schema) {
          var prop = {
            position: schema.vBuf,
            normal: schema.nBuf,
            texture: schema.texture,
            viewProjection: camera.ViewProjectionMatrix.value
          };
          props.push(prop);
        }
      });

      _this.draw0.batch(props);
    };

    _this.elements = (0, _llp.llpElement)();
    _this.draw0 = ctx3d.compile({
      vert: "precision mediump float;\n\n            attribute vec3 position;\n            attribute vec2 texCoord;\n            attribute vec3 normal;\n\n            uniform mat4 viewPorjection;\n\n            varying vec2 vTexCoord;\n            varying vec3 vPosition;\n            varying vec3 vNormal;\n\n            void main(){\n                vTexCoord = texCoord;\n                vPosition = position;\n                vNormal = normal;\n                gl_Position = viewPorjection*vec4(position, 1.0);\n            }",
      frag: "precision mediump float;\n\n            uniform sampler2D texture;\n\n            const vec3 lightPostion = vec3(0.0, 127562074.0, 127562074.0);\n            const vec3 lightColor = vec3(1.0, 1.0, 1.0);\n\n            varying vec2 vTexCoord;\n            varying vec3 vPosition;\n            varying vec3 vNormal;\n\n            void main(){\n                //\u8BA1\u7B97\u6F2B\u53CD\u5C04\u7ED3\u679C\n                vec3 lightDir = normalize(lightPostion - vPosition);\n                float diff = max(dot(vNormal, lightDir), 0.0);\n                gl_FragColor = vec4(diff * lightColor * vec3(texture2D(texture,vTexCoord)), 1.0);\n            }",
      elements: _this.elements,
      attributes: {
        position: new _pipegl.Props('position'),
        normal: new _pipegl.Props('normal'),
        texCoord: (0, _llp.llpTexCoord)()
      },
      uniforms: {
        viewPorjection: new _pipegl.Props('viewProjection'),
        texture: new _pipegl.Props('texture')
      },
      primitive: 'TRIANGLES',
      status: {
        DEPTH_TEST: true,
        CULL_FACE: true
      }
    });
    return _this;
  }

  return TileLayerRenderer;
}(_SketchpadRenderer2.SketchpadRenderer);

exports.TileLayerRenderer = TileLayerRenderer;

_TileLayer.TileLayer.registerRenderer(_TileLayer.TileLayer.name, TileLayerRenderer);
},{"pipegl":"../node_modules/pipegl/src/index.ts","../../util/normal":"../src/util/normal.ts","../SketchpadRenderer":"../src/sketchpad/SketchpadRenderer.ts","../../util/llp":"../src/util/llp.ts","./TileLayer":"../src/sketchpad/layer/TileLayer.ts"}],"../src/sketchpad/layer/GeometryLayer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeometryLayer = void 0;

var _Sektchpad = require("../Sektchpad");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var GeometryLayer =
/*#__PURE__*/
function (_Sketchpad) {
  _inherits(GeometryLayer, _Sketchpad);

  var _super = _createSuper(GeometryLayer);

  function GeometryLayer() {
    var _this;

    _classCallCheck(this, GeometryLayer);

    _this = _super.call(this);
    _this.geometrys = [];

    _this.add = function (geometry) {
      geometry.attach(_this.g);

      _this.Renderer.prepare(geometry);
    };

    return _this;
  }

  return GeometryLayer;
}(_Sektchpad.Sketchpad);

exports.GeometryLayer = GeometryLayer;
},{"../Sektchpad":"../src/sketchpad/Sektchpad.ts"}],"../src/sketchpad/layer/GeometryLayerRenderer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeometryLayerRenderer = void 0;

var _SketchpadRenderer2 = require("../SketchpadRenderer");

var _GeometryLayer = require("./GeometryLayer");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var GeometryLayerRenderer =
/*#__PURE__*/
function (_SketchpadRenderer) {
  _inherits(GeometryLayerRenderer, _SketchpadRenderer);

  var _super = _createSuper(GeometryLayerRenderer);

  function GeometryLayerRenderer(layer, ctx3d) {
    var _this;

    _classCallCheck(this, GeometryLayerRenderer);

    _this = _super.call(this, layer, ctx3d);
    _this.CACHE = new Map();

    _this.prepare = function (geometry) {
      _this.CACHE.set('`', geometry);
    };

    _this.render = function (framestamp, camera) {
      var _a;

      (_a = _this.CACHE) === null || _a === void 0 ? void 0 : _a.forEach(function (geometry) {
        geometry.Renderer.render(framestamp, camera);
      });
    };

    return _this;
  }

  return GeometryLayerRenderer;
}(_SketchpadRenderer2.SketchpadRenderer);

exports.GeometryLayerRenderer = GeometryLayerRenderer;

_GeometryLayer.GeometryLayer.registerRenderer(_GeometryLayer.GeometryLayer.name, GeometryLayerRenderer);
},{"../SketchpadRenderer":"../src/sketchpad/SketchpadRenderer.ts","./GeometryLayer":"../src/sketchpad/layer/GeometryLayer.ts"}],"../src/sketchpad/layer/tileLayers/TiandituLayer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TiandituLayer = void 0;

var _llp = require("../../../util/llp");

var _TileLayerRenderer = require("../TileLayerRenderer");

var _TileLayer2 = require("../TileLayer");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TiandituLayer =
/*#__PURE__*/
function (_TileLayer) {
  _inherits(TiandituLayer, _TileLayer);

  var _super = _createSuper(TiandituLayer);

  function TiandituLayer() {
    var _this;

    _classCallCheck(this, TiandituLayer);

    _this = _super.call(this);
    _this.token = "65ac66b5243f941bc05a75bd61d12246";

    _this.prepareData = function (tiles) {
      _this.queue = [];
      var CACHE = _this.CACHE;
      tiles === null || tiles === void 0 ? void 0 : tiles.forEach(function (t) {
        var x = t.X,
            y = t.Y,
            level = t.Level,
            boundary = t.Boundary;
        var key = "".concat(level, "-").concat(x, "-").concat(y);

        if (!CACHE.has(key)) {
          var uri = "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX=".concat(level, "&TILEROW=").concat(y, "&TILECOL=").concat(x, "&tk=").concat(_this.token);
          var vertices = (0, _llp.llpVertex)(boundary);
          var q = {
            key: key,
            uri: uri,
            vertices: vertices
          };

          _this.queue.unshift(q);
        }
      });
    };

    return _this;
  }

  return TiandituLayer;
}(_TileLayer2.TileLayer);

exports.TiandituLayer = TiandituLayer;
TiandituLayer.registerRenderer(TiandituLayer.name, _TileLayerRenderer.TileLayerRenderer);
},{"../../../util/llp":"../src/util/llp.ts","../TileLayerRenderer":"../src/sketchpad/layer/TileLayerRenderer.ts","../TileLayer":"../src/sketchpad/layer/TileLayer.ts"}],"../src/sketchpad/geometry/Hemisphere.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hemisphere = void 0;

var _kiwi = require("kiwi.matrix");

var _Sektchpad = require("../Sektchpad");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Hemisphere =
/*#__PURE__*/
function (_Sketchpad) {
  _inherits(Hemisphere, _Sketchpad);

  var _super = _createSuper(Hemisphere);

  function Hemisphere(coordinate, radius) {
    var _this;

    _classCallCheck(this, Hemisphere);

    _this = _super.call(this);
    _this.wCount = 24;
    _this.hCount = 16;
    _this.phiStart = 0;
    _this.phiLength = Math.PI;
    _this.thetaStart = 0;
    _this.thetaLength = Math.PI;

    _this.registerData = function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          phiStart = _assertThisInitialize.phiStart,
          phiLength = _assertThisInitialize.phiLength,
          thetaStart = _assertThisInitialize.thetaStart,
          thetaLength = _assertThisInitialize.thetaLength,
          wCount = _assertThisInitialize.wCount,
          hCount = _assertThisInitialize.hCount,
          radius = _assertThisInitialize.radius,
          Globe = _assertThisInitialize.Globe,
          coordinate = _assertThisInitialize.coordinate,
          Renderer = _assertThisInitialize.Renderer;

      var thetaEnd = Math.min(thetaStart + thetaLength, Math.PI);
      var vertices = [],
          normals = [],
          uvs = [],
          indices = [];
      var grid = [];
      var index = 0;

      for (var iy = 0; iy <= hCount; iy++) {
        var row = [];
        var v = iy / hCount;
        var uOffset = 0;
        if (iy === 0 && thetaStart === 0) uOffset = 0.5 / wCount;else if (iy === hCount && thetaEnd === Math.PI) uOffset = -0.5 / wCount;

        for (var ix = 0; ix <= wCount; ix++) {
          var u = ix / wCount;
          var x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
          var y = radius * Math.cos(thetaStart + v * thetaLength);
          var z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
          vertices.push([x, y, z]);
          var normal = new _kiwi.Vec3().set(x, y, z).normalize();
          normals.push(normal.value);
          uvs.push([u + uOffset, 1 - v]);
          row.push(index++);
        }

        grid.push(row);
      }

      for (var iiy = 0; iiy < hCount; iiy++) {
        for (var iix = 0; iix < wCount; iix++) {
          var a = grid[iiy][iix + 1];
          var b = grid[iiy][iix];
          var c = grid[iiy + 1][iix];
          var d = grid[iiy + 1][iix + 1];
          if (iiy !== 0 || thetaStart > 0) indices.push(a, b, d);
          if (iiy !== hCount - 1 || thetaEnd < Math.PI) indices.push(b, c, d);
        }
      }

      var modelMatrix = new _kiwi.Mat4().identity();
      var position = Globe.geographicToSpaceCoordinate(coordinate);
      modelMatrix.translate(position);
      modelMatrix.rotateZ(_kiwi.GLMatrix.toRadian(_this.coordinate.Longitude - 90));
      modelMatrix.rotateX(_kiwi.GLMatrix.toRadian(_this.coordinate.Latitude - 90));
      Renderer.prepare({
        vertices: vertices,
        normals: normals,
        uvs: uvs,
        indices: indices,
        modelMatrix: modelMatrix.value
      });
    };

    _this.radius = radius;
    _this.coordinate = coordinate;
    return _this;
  }

  return Hemisphere;
}(_Sektchpad.Sketchpad);

exports.Hemisphere = Hemisphere;
},{"kiwi.matrix":"../node_modules/kiwi.matrix/dist/bundle.js","../Sektchpad":"../src/sketchpad/Sektchpad.ts"}],"../src/sketchpad/geometry/HemisphereRenderer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HemisphereRenderer = void 0;

var _pipegl = require("pipegl");

var _Hemisphere = require("./Hemisphere");

var _SketchpadRenderer2 = require("./../SketchpadRenderer");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var HemisphereRenderer =
/*#__PURE__*/
function (_SketchpadRenderer) {
  _inherits(HemisphereRenderer, _SketchpadRenderer);

  var _super = _createSuper(HemisphereRenderer);

  function HemisphereRenderer(geometry, ctx3d) {
    var _this;

    _classCallCheck(this, HemisphereRenderer);

    _this = _super.call(this, geometry, ctx3d);

    _this.prepare = function (data) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          ctx3d = _assertThisInitialize.ctx3d;

      _this.d0 = ctx3d.compile({
        vert: "precision mediump float;\n            \n            attribute vec3 position;\n            attribute vec3 normal;\n\n            uniform float ratio;\n            uniform mat4 viewProjection, modelMatrix;\n\n            varying vec3 vNormal;\n            varying vec3 vPosition;\n\n            void main(){\n                vec3 vNormal = mat3(modelMatrix)*normal;\n                vec3 vPosition = ratio * position;\n                gl_Position = viewProjection * modelMatrix * vec4(vPosition, 1.0);\n            }",
        frag: "precision mediump float;\n\n            const vec3 lightPosition = vec3(0.0, 12756274.0, 12756274.0);\n            const vec3 lightColor = vec3(1.0, 1.0, 1.0);\n\n            uniform float alpha;\n\n            varying vec3 vNormal;\n            varying vec3 vPosition;\n\n            void main(){\n                vec3 lightDir = normalize(lightPosition-vPosition);\n                float diff = max(dot(vNormal, lightDir), 0.0);\n                gl_FragColor = vec4(0.8, 0.1, 0.0, 0.8*(1.0-alpha));\n                // gl_FragColor = vec4(diff/255.0, diff/255.0, diff/255.0, 0.5);\n            }",
        attributes: {
          position: data.vertices,
          normal: data.normals
        },
        uniforms: {
          viewProjection: new _pipegl.Props('viewProjection'),
          modelMatrix: data.modelMatrix,
          ratio: new _pipegl.Props('ratio'),
          alpha: new _pipegl.Props('alpha')
        },
        elements: data.indices,
        status: {
          DEPTH_TEST: false,
          BLEND: true,
          blendFunc: [0x0302, 0x0303]
        }
      });
    };

    _this.render = function (framestamp, camera) {
      var d0 = _this.d0;
      var batch = [];
      var r = Math.tan(framestamp * 0.0008);
      var ratio = r > 1 ? 1 : r < 0 ? 1 : r;
      batch.push({
        viewProjection: camera.ViewProjectionMatrix.value,
        ratio: ratio,
        alpha: ratio
      });
      d0.batch(batch);
    };

    return _this;
  }

  return HemisphereRenderer;
}(_SketchpadRenderer2.SketchpadRenderer);

exports.HemisphereRenderer = HemisphereRenderer;

_Hemisphere.Hemisphere.registerRenderer(_Hemisphere.Hemisphere.name, HemisphereRenderer);
},{"pipegl":"../node_modules/pipegl/src/index.ts","./Hemisphere":"../src/sketchpad/geometry/Hemisphere.ts","./../SketchpadRenderer":"../src/sketchpad/SketchpadRenderer.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GeodeticCoordinate", {
  enumerable: true,
  get: function () {
    return _GeodeticCoordinate.GeodeticCoordinate;
  }
});
Object.defineProperty(exports, "GeometryLayer", {
  enumerable: true,
  get: function () {
    return _GeometryLayer.GeometryLayer;
  }
});
Object.defineProperty(exports, "Globe", {
  enumerable: true,
  get: function () {
    return _Globe.Globe;
  }
});
Object.defineProperty(exports, "Hemisphere", {
  enumerable: true,
  get: function () {
    return _Hemisphere.Hemisphere;
  }
});
Object.defineProperty(exports, "Projection", {
  enumerable: true,
  get: function () {
    return _Projection.Projection;
  }
});
Object.defineProperty(exports, "QuadtreeTile", {
  enumerable: true,
  get: function () {
    return _QuadtreeTile.QuadtreeTile;
  }
});
Object.defineProperty(exports, "QuadtreeTileSchema", {
  enumerable: true,
  get: function () {
    return _QuadtreeTileSchema.QuadtreeTileSchema;
  }
});
Object.defineProperty(exports, "Ray", {
  enumerable: true,
  get: function () {
    return _Ray.Ray;
  }
});
Object.defineProperty(exports, "Rectangle", {
  enumerable: true,
  get: function () {
    return _Rectangle.Rectangle;
  }
});
Object.defineProperty(exports, "TiandituLayer", {
  enumerable: true,
  get: function () {
    return _TiandituLayer.TiandituLayer;
  }
});
Object.defineProperty(exports, "TileLayer", {
  enumerable: true,
  get: function () {
    return _TileLayer.TileLayer;
  }
});
Object.defineProperty(exports, "WebMercatorProjection", {
  enumerable: true,
  get: function () {
    return _Projection.WebMercatorProjection;
  }
});
Object.defineProperty(exports, "clamp", {
  enumerable: true,
  get: function () {
    return _clamp.clamp;
  }
});
Object.defineProperty(exports, "isNode", {
  enumerable: true,
  get: function () {
    return _isNode.isNode;
  }
});
Object.defineProperty(exports, "split", {
  enumerable: true,
  get: function () {
    return _split.split;
  }
});

var _Globe = require("./globe/Globe");

require("./globe/auxiliar/Globe.auxiliar.Cursor");

require("./globe/Globe.Camera");

require("./globe/Globe.Handler");

require("./globe/Globe.Quadtree");

require("./globe/Globe.Renderer");

require("./globe/handler/Globe.Handler.Pan");

require("./globe/handler/Globe.Handler.Zoom");

require("./globe/camera/Globe.Camera.FlyTo");

require("./globe/camera/Globe.Camera.Pan");

require("./globe/camera/Globe.Camera.Zoom");

var _TileLayer = require("./sketchpad/layer/TileLayer");

require("./sketchpad/layer/TileLayerRenderer");

var _GeometryLayer = require("./sketchpad/layer/GeometryLayer");

require("./sketchpad/layer/GeometryLayerRenderer");

var _TiandituLayer = require("./sketchpad/layer/tileLayers/TiandituLayer");

var _Hemisphere = require("./sketchpad/geometry/Hemisphere");

require("./sketchpad/geometry/HemisphereRenderer");

var _clamp = require("./util/clamp");

var _isNode = require("./util/isNode");

var _split = require("./util/split");

var _Ray = require("./core/Ray");

var _GeodeticCoordinate = require("./core/GeodeticCoordinate");

var _Projection = require("./core/Projection");

var _Rectangle = require("./core/Rectangle");

var _QuadtreeTile = require("./core/QuadtreeTile");

var _QuadtreeTileSchema = require("./core/QuadtreeTileSchema");
},{"./globe/Globe":"../src/globe/Globe.ts","./globe/auxiliar/Globe.auxiliar.Cursor":"../src/globe/auxiliar/Globe.auxiliar.Cursor.ts","./globe/Globe.Camera":"../src/globe/Globe.Camera.ts","./globe/Globe.Handler":"../src/globe/Globe.Handler.ts","./globe/Globe.Quadtree":"../src/globe/Globe.Quadtree.ts","./globe/Globe.Renderer":"../src/globe/Globe.Renderer.ts","./globe/handler/Globe.Handler.Pan":"../src/globe/handler/Globe.Handler.Pan.ts","./globe/handler/Globe.Handler.Zoom":"../src/globe/handler/Globe.Handler.Zoom.ts","./globe/camera/Globe.Camera.FlyTo":"../src/globe/camera/Globe.Camera.FlyTo.ts","./globe/camera/Globe.Camera.Pan":"../src/globe/camera/Globe.Camera.Pan.ts","./globe/camera/Globe.Camera.Zoom":"../src/globe/camera/Globe.Camera.Zoom.ts","./sketchpad/layer/TileLayer":"../src/sketchpad/layer/TileLayer.ts","./sketchpad/layer/TileLayerRenderer":"../src/sketchpad/layer/TileLayerRenderer.ts","./sketchpad/layer/GeometryLayer":"../src/sketchpad/layer/GeometryLayer.ts","./sketchpad/layer/GeometryLayerRenderer":"../src/sketchpad/layer/GeometryLayerRenderer.ts","./sketchpad/layer/tileLayers/TiandituLayer":"../src/sketchpad/layer/tileLayers/TiandituLayer.ts","./sketchpad/geometry/Hemisphere":"../src/sketchpad/geometry/Hemisphere.ts","./sketchpad/geometry/HemisphereRenderer":"../src/sketchpad/geometry/HemisphereRenderer.ts","./util/clamp":"../src/util/clamp.ts","./util/isNode":"../src/util/isNode.ts","./util/split":"../src/util/split.ts","./core/Ray":"../src/core/Ray.ts","./core/GeodeticCoordinate":"../src/core/GeodeticCoordinate.ts","./core/Projection":"../src/core/Projection.ts","./core/Rectangle":"../src/core/Rectangle.ts","./core/QuadtreeTile":"../src/core/QuadtreeTile.ts","./core/QuadtreeTileSchema":"../src/core/QuadtreeTileSchema.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _index = require("../src/index");

var map = new _index.Globe({
  width: window.innerWidth - 30,
  height: window.innerHeight - 20,
  zoom: 3,
  canvas: "mapCanvas",
  coordinate: new _index.GeodeticCoordinate(116.3958, 39.828)
});
var layer = new _index.TiandituLayer();
map.add(layer);
var geometryLayer = new _index.GeometryLayer();
map.add(geometryLayer);
var g0 = new _index.Hemisphere(new _index.GeodeticCoordinate(114, 30.5), 1000000);
geometryLayer.add(g0);
map.on('frameend', function (performance) {
  document.getElementById('frameLabel').textContent = "\u5E27\u7387:".concat((+performance).toFixed(2));
});
},{"../src/index":"../src/index.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58205" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/example.77de5100.js.map