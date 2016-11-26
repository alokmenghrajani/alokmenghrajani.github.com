var _V;
_V = typeof window == "undefined"?true:false;
var _W;
if (typeof window != "undefined") {var userAgent =navigator.userAgent.toLowerCase();_W = /msie/.test(userAgent) && !/opera/.test(userAgent)?function (a){return a instanceof ActiveXObject;}:userAgent == "no browser"?function (a){return false;}:function (a){return a instanceof Node || a instanceof Event;};}
function _X(a){throw new Error(a);}
function _Y(a){this._waiters = [];this._id = a?a:"anonymous";}
_Y.prototype = {_is_computed:false,_result:null,_waiters:null,release:function (a){this._is_computed = true;this._result = a;var b =this._waiters,d =b.length,c;for (c = 0; c < d; ++c){var e =b[c];_Z(e,a);}delete this._waiters;},wait:function (a){this._is_computed?_Z(a,this._result):this._waiters.push(a);}};
function _b(a,b){return function (){return _c(a,b);};}
function _d(a,b,c){return [a,[b,c,null]];}
function _c(a,b){return a[0].apply(a[1][0],b);}
function _e(a,b){return _c(a,[b]);}
function _f(a){return a[1][0];}
var _g = [];
function _h(a){_g.push(a);_i();}
var _j = false;
var _k = 0;
var _l = 5;
function _m(a){var b =false,c =_g,d;_k++;_j = true;try {var f =0;for (; c.length != 0 && (a || f < _l); f++){d = c.shift();var g =d();_e(g[0],g[1]);}c.length != 0 && setTimeout(_m,0);} catch (e) {b = true;console.log("Uncaught exception : " + e.toString());console.log(e.stack);}_k--;_j = _k != 0;}
function _i(){if (_j) {return;}_m();}
function _Z(a,b){_h(_b(a,[b]));}
function _n(a,b){_e(a,b);}
var _C = {};
var _o = {none:_C};
function _p(a){return {some:a};}
function _q(a,b){switch (b) {case "true":a = _r(a);break;;
case "false":a = _s(a);break;;
case _t:a = undefined;break;;default:a = a[b];}a === undefined && _X("unsafe_dot failed on " + b);return a;}
function _u(a,b){switch (b) {case "true":return _r(a);;
case "false":return _s(a);;
case _t:return;;default:return a[b];}}
function _v(a,b,c){switch (b) {case true:return a("true",_C,c);;
case false:return a("false",_C,c);;
case null:return c;;default:var d =new Array(),e,f =0,g;for (e in b) {
                                                     _t === e || d.push(e);
}d.sort();for (g = d.length; f < g; f++){e = d[f];c = a(e,b[e],c);}return c;}}
function _w(a,b,c,d){switch (b) {case true:return a("true",_C,_C,d);;
case false:return a("false",_C,_C,d);;
case null:return d;;default:var e =new Array(),f,g =0,h;for (f in b) {
                                                     _t === f || e.push(f);
}e.sort();for (h = e.length; g < h; g++){f = e[g];d = a(f,b[f],c[f],d);}return d;}}
function _x(a){return {some:a};}
function _y(a){return {some:a};}
function _z(a){return a;}
function _BB(){var a ={};a[_t] = 0;return a;}
function _BC(a,b,c){b in a && _X("add_field: trying to add the field " + b + " to the constructor " + a.toSource());a[b] = c;a[_t]++;return a;}
function _BD(a){switch (_BE(a)) {case 0:return _C;;
case 1:return _BF(a);;default:return a;}}
function _BG(a){switch (a) {case "true":return true;;
case "false":return false;;default:var b ={};b[a] = _C;return b;}}
function _BH(a,b){switch (a) {case "true":return _BI(b);;
case "false":return _BJ(b);;default:var c ={};c[a] = b;return c;}}
function _BK(a){return a;}
function _BL(a){var b =a.length - 1,c ={nil:_C};for (; b >= 0; b--){c = {hd:a[b],tl:c};}return c;}
function _BM(a){return "some" in a?a.some:null;}
function _BN(a){return a == null?_o:{some:a};}
function _BI(a){return a === _C?true:{"true":a};}
function _BJ(a){return a === _C?false:{"false":a};}
function _r(a){return a === true?_C:a["true"];}
function _s(a){return a === false?_C:a["false"];}
var _t = "size`";
function _BE(a){if (a === true || a === false) {return 1;}var b,c;if (c = a[_t],typeof c != "undefined") {return c;}c = 0;
for (b in a) {
  c++;
}a[_t] = c;return c;}
function _BO(a){return a === true?{"true":_C}:a === false?{"false":_C}:a;}
function _BF(a){return a["true"] === _C && _BE(a) === 1?true:a["false"] === _C && _BE(a) === 1?false:a;}
function _BP(a,b){a = _BO(a);var c;for (c in a) {
                               c === _t || c in b || (b[c] = a[c]);
}return _BF(b);}
function _BQ(a,b){var c =0;for (; c < a.length; c++){var d =a[c];if (typeof _u(b,d) == "undefined") {return false;}};
return true;}
function _BR(a,b,c){var d =0;for (; d < a.length; d++){var e =a[d];if (_BQ(e,b)) {return _BQ(e,c)?d:-1;};
if (_BQ(e,c)) {return -2;}};
return _X("compare_structure" + a + "\n" + b);}
var _BS = {};
_BS.PADCHAR = "=";
_BS.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
_BS.makeDOMException = function (){var e;try {return new DOMException(DOMException.INVALID_CHARACTER_ERR);} catch (tmp) {var ex =new Error("DOM Exception 5");ex.code = (ex.number = 5);ex.name = (ex.description = "INVALID_CHARACTER_ERR");ex.toString = function (){return "Error: " + ex.name + ": " + ex.message;};return ex;}};
_BS.getbyte64 = function (s,i){var idx =_BS.ALPHA.indexOf(s.charAt(i));if (idx === -1) {
throw _BS.makeDOMException();}return idx;};
_BS.decode = function (s){s = "" + s;var getbyte64 =_BS.getbyte64;var pads,i,b10;var imax =s.length;if (imax === 0) {return s;}if (imax % 4 !== 0) {
throw _BS.makeDOMException();}pads = 0;if (s.charAt(imax - 1) === _BS.PADCHAR) {pads = 1;if (s.charAt(imax - 2) === _BS.PADCHAR) {pads = 2;}imax -= 4;}var x =[];for (i = 0; i < imax; i += 4){b10 = getbyte64(s,i) << 18 | getbyte64(s,i + 1) << 12 | getbyte64(s,i + 2) << 6 | getbyte64(s,i + 3);x.push(String.fromCharCode(b10 >> 16,b10 >> 8 & 0xff,b10 & 0xff));}switch (pads) {case 1:b10 = getbyte64(s,i) << 18 | getbyte64(s,i + 1) << 12 | getbyte64(s,i + 2) << 6;x.push(String.fromCharCode(b10 >> 16,b10 >> 8 & 0xff));
break;;
case 2:b10 = getbyte64(s,i) << 18 | getbyte64(s,i + 1) << 12;x.push(String.fromCharCode(b10 >> 16));
break;;}return x.join("");};
_BS.getbyte = function (s,i){var x =s.charCodeAt(i);if (x > 255) {throw _BS.makeDOMException();}return x;};
_BS.encode = function (s){if (arguments.length !== 1) {throw new SyntaxError("Not enough arguments");}var padchar =_BS.PADCHAR,alpha =_BS.ALPHA,getbyte =_BS.getbyte;var i,b10;var x =[];s = "" + s;var imax =s.length - s.length % 3;if (s.length === 0) {return s;}for (i = 0; i < imax; i += 3){b10 = getbyte(s,i) << 16 | getbyte(s,i + 1) << 8 | getbyte(s,i + 2);x.push(alpha.charAt(b10 >> 18));x.push(alpha.charAt(b10 >> 12 & 0x3F));x.push(alpha.charAt(b10 >> 6 & 0x3f));x.push(alpha.charAt(b10 & 0x3f));}switch (s.length - imax) {case 1:b10 = getbyte(s,i) << 16;x.push(alpha.charAt(b10 >> 18) + alpha.charAt(b10 >> 12 & 0x3F) + padchar + padchar);
break;;
case 2:b10 = getbyte(s,i) << 16 | getbyte(s,i + 1) << 8;x.push(alpha.charAt(b10 >> 18) + alpha.charAt(b10 >> 12 & 0x3F) + alpha.charAt(b10 >> 6 & 0x3f) + padchar);
break;;}return x.join("");};
(function (a,b){function cy(a){return f.isWindow(a)?a:a.nodeType === 9?a.defaultView || a.parentWindow:!1;}function cu(a){if (!cj[a]) {var b =c.body,d =f("<" + a + ">").appendTo(b),e =d.css("display");d.remove();if (e === "none" || e === "") {ck || (ck = c.createElement("iframe"),ck.frameBorder = (ck.width = (ck.height = 0))),b.appendChild(ck);if (!cl || !ck.createElement) {cl = (ck.contentWindow || ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"") + "<html><body>"),cl.close();}d = cl.createElement(a),cl.body.appendChild(d),e = f.css(d,"display"),b.removeChild(ck);}cj[a] = e;}return cj[a];}function ct(a,b){var c ={};f.each(cp.concat.apply([],cp.slice(0,b)),function (){c[this] = a;});return c;}function cs(){cq = b;}function cr(){setTimeout(cs,0);return cq = f.now();}function ci(){try {return new (a.ActiveXObject)("Microsoft.XMLHTTP");} catch (b) {}}function ch(){try {return new (a.XMLHttpRequest)();} catch (b) {}}function cb(a,c){a.dataFilter && (c = a.dataFilter(c,a.dataType));var d =a.dataTypes,e ={},g,h,i =d.length,j,k =d[0],l,m,n,o,p;for (g = 1; g < i; g++){if (g === 1) {
for (h in a.converters) {
  typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
}}l = k,k = d[g];if (k === "*") {k = l;} else {if (l !== "*" && l !== k) {m = l + " " + k,n = e[m] || e["* " + k];if (!n) {p = b;
for (o in e) {
  j = o.split(" ");if (j[0] === l || j[0] === "*") {p = e[j[1] + " " + k];if (p) {o = e[o],o === !0?n = p:p === !0 && (n = o);
  break;}}
}}!n && !p && f.error("No conversion from " + m.replace(" "," to ")),n !== !0 && (c = n?n(c):p(o(c)));}}}return c;}function ca(a,c,d){var e =a.contents,f =a.dataTypes,g =a.responseFields,h,i,j,k;
for (i in g) {
  i in d && (c[g[i]] = d[i]);
}while (f[0] === "*") {f.shift(),h === b && (h = a.mimeType || c.getResponseHeader("content-type"));}if (h) {
for (i in e) {
  if (e[i] && e[i].test(h)) {f.unshift(i);break;}
}}if (f[0] in d) {j = f[0];} else {for (i in d) {
                                     if (!f[0] || a.converters[i + " " + f[0]]) {j = i;
                                     break;}k || (k = i);
}j = j || k;}if (j) {j !== f[0] && f.unshift(j);return d[j];}}function b_(a,b,c,d){if (f.isArray(b)) {f.each(b,function (b,e){c || bD.test(a)?d(a,e):b_(a + "[" + (typeof e == "object"?b:"") + "]",e,c,d);});} else {if (!c && f.type(b) === "object") {var e;
for (e in b) {
  b_(a + "[" + e + "]",b[e],c,d);
}} else {d(a,b);}}}function b$(a,c){var d,e,g =f.ajaxSettings.flatOptions || {};
for (d in c) {
  c[d] !== b && ((g[d]?a:e || (e = {}))[d] = c[d]);
}e && f.extend(!0,a,e);}function bZ(a,c,d,e,f,g){f = f || c.dataTypes[0],g = g || {},g[f] = !0;var h =a[f],i =0,j =h?h.length:0,k =a === bS,l;for (; i < j && (k || !l); i++){l = h[i](c,d,e),typeof l == "string" && (!k || g[l]?l = b:(c.dataTypes.unshift(l),l = bZ(a,c,d,e,l,g)));}(k || !l) && !g["*"] && (l = bZ(a,c,d,e,"*",g));return l;}function bY(a){return function (b,c){typeof b != "string" && (c = b,b = "*");if (f.isFunction(c)) {var d =b.toLowerCase().split(bO),e =0,g =d.length,h,i,j;for (; e < g; e++){h = d[e],j = /^\+/.test(h),j && (h = h.substr(1) || "*"),i = (a[h] = a[h] || []),i[j?"unshift":"push"](c);}}};}function bB(a,b,c){var d =b === "width"?a.offsetWidth:a.offsetHeight,e =b === "width"?1:0,g =4;if (d > 0) {if (c !== "border") {for (; e < g; e += 2){c || (d -= parseFloat(f.css(a,"padding" + bx[e])) || 0),c === "margin"?d += parseFloat(f.css(a,c + bx[e])) || 0:d -= parseFloat(f.css(a,"border" + bx[e] + "Width")) || 0;}}return d + "px";}d = by(a,b);if (d < 0 || d == null) {d = a.style[b];}if (bt.test(d)) {return d;}d = parseFloat(d) || 0;if (c) {for (; e < g; e += 2){d += parseFloat(f.css(a,"padding" + bx[e])) || 0,c !== "padding" && (d += parseFloat(f.css(a,"border" + bx[e] + "Width")) || 0),c === "margin" && (d += parseFloat(f.css(a,c + bx[e])) || 0);}}return d + "px";}function bo(a){var b =c.createElement("div");bh.appendChild(b),b.innerHTML = a.outerHTML;return b.firstChild;}function bn(a){var b =(a.nodeName || "").toLowerCase();b === "input"?bm(a):b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"),bm);}function bm(a){if (a.type === "checkbox" || a.type === "radio") {a.defaultChecked = a.checked;}}function bl(a){return typeof a.getElementsByTagName != "undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll != "undefined"?a.querySelectorAll("*"):[];}function bk(a,b){var c;b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(),b.mergeAttributes && b.mergeAttributes(a),c = b.nodeName.toLowerCase(),c === "object"?b.outerHTML = a.outerHTML:c !== "input" || a.type !== "checkbox" && a.type !== "radio"?c === "option"?b.selected = a.defaultSelected:c === "input" || c === "textarea"?b.defaultValue = a.defaultValue:c === "script" && b.text !== a.text && (b.text = a.text):(a.checked && (b.defaultChecked = (b.checked = a.checked)),b.value !== a.value && (b.value = a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"));}function bj(a,b){if (b.nodeType === 1 && !!f.hasData(a)) {var c,d,e,g =f._data(a),h =f._data(b,g),i =g.events;if (i) {delete h.handle,h.events = {};
for (c in i) {
  for (d = 0,e = i[c].length; d < e; d++){f.event.add(b,c,i[c][d]);}
}}h.data && (h.data = f.extend({},h.data));}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")):a;}function U(a){var b =V.split("|"),c =a.createDocumentFragment();if (c.createElement) {while (b.length) {c.createElement(b.pop());}}return c;}function T(a,b,c){b = b || 0;if (f.isFunction(b)) {return f.grep(a,function (a,d){var e =!!b.call(a,d,a);return e === c;});}if (b.nodeType) {return f.grep(a,function (a,d){return a === b === c;});}if (typeof b == "string") {var d =f.grep(a,function (a){return a.nodeType === 1;});if (O.test(b)) {return f.filter(b,d,!c);}b = f.filter(b,d);}return f.grep(a,function (a,d){return f.inArray(a,b) >= 0 === c;});}function S(a){return !a || !a.parentNode || a.parentNode.nodeType === 11;}function K(){return !0;}function J(){return !1;}function n(a,b,c){var d =b + "defer",e =b + "queue",g =b + "mark",h =f._data(a,d);h && (c === "queue" || !f._data(a,e)) && (c === "mark" || !f._data(a,g)) && setTimeout(function (){!f._data(a,e) && !f._data(a,g) && (f.removeData(a,d,!0),h.fire());},0);}function m(a){var b;
for (b in a) {
  if (b === "data" && f.isEmptyObject(a[b])) {continue;}if (b !== "toJSON") {return !1;}
}return !0;}function l(a,c,d){if (d === b && a.nodeType === 1) {var e ="data-" + c.replace(k,"-$1").toLowerCase();d = a.getAttribute(e);if (typeof d == "string") {try {d = d === "true"?!0:d === "false"?!1:d === "null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d;} catch (g) {}f.data(a,c,d);} else {d = b;}}return d;}function h(a){var b =g[a] = {},c,d;a = a.split(/\s+/);for (c = 0,d = a.length; c < d; c++){b[a[c]] = !0;}return b;}var c =a.document,d =a.navigator,e =a.location,f =function (){function J(){if (!e.isReady) {try {c.documentElement.doScroll("left");} catch (a) {setTimeout(J,1);return;}e.ready();}}var e =function (a,b){return new (e.fn.init)(a,b,h);},f =a.jQuery,g =a.$,h,i =/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j =/\S/,k =/^\s+/,l =/\s+$/,m =/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n =/^[\],:{}\s]*$/,o =/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p =/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q =/(?:^|:|,)(?:\s*\[)+/g,r =/(webkit)[ \/]([\w.]+)/,s =/(opera)(?:.*version)?[ \/]([\w.]+)/,t =/(msie) ([\w.]+)/,u =/(mozilla)(?:.*? rv:([\w.]+))?/,v =/-([a-z]|[0-9])/ig,w =/^-ms-/,x =function (a,b){return (b + "").toUpperCase();},y =d.userAgent,z,A,B,C =Object.prototype.toString,D =Object.prototype.hasOwnProperty,E =Array.prototype.push,F =Array.prototype.slice,G =String.prototype.trim,H =Array.prototype.indexOf,I ={};e.fn = (e.prototype = {constructor:e,init:function (a,d,f){var g,h,j,k;if (!a) {return this;}if (a.nodeType) {this.context = (this[0] = a),this.length = 1;return this;}if (a === "body" && !d && c.body) {this.context = c,this[0] = c.body,this.selector = a,this.length = 1;return this;}if (typeof a == "string") {a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3?g = i.exec(a):g = [null,a,null];if (g && (g[1] || !d)) {if (g[1]) {d = d instanceof e?d[0]:d,k = d?d.ownerDocument || d:c,j = m.exec(a),j?e.isPlainObject(d)?(a = [c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a = [k.createElement(j[1])]:(j = e.buildFragment([g[1]],[k]),a = (j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a);}h = c.getElementById(g[2]);if (h && h.parentNode) {if (h.id !== g[2]) {return f.find(a);}this.length = 1,this[0] = h;}this.context = c,this.selector = a;return this;}return !d || d.jquery?(d || f).find(a):this.constructor(d).find(a);}if (e.isFunction(a)) {return f.ready(a);}a.selector !== b && (this.selector = a.selector,this.context = a.context);return e.makeArray(a,this);},selector:"",jquery:"1.7.2",length:0,size:function (){return this.length;},toArray:function (){return F.call(this,0);},get:function (a){return a == null?this.toArray():a < 0?this[this.length + a]:this[a];},pushStack:function (a,b,c){var d =this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject = this,d.context = this.context,b === "find"?d.selector = this.selector + (this.selector?" ":"") + c:b && (d.selector = this.selector + "." + b + "(" + c + ")");return d;},each:function (a,b){return e.each(this,a,b);},ready:function (a){e.bindReady(),A.add(a);return this;},eq:function (a){a = +a;return a === -1?this.slice(a):this.slice(a,a + 1);},first:function (){return this.eq(0);},last:function (){return this.eq(-1);},slice:function (){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","));},map:function (a){return this.pushStack(e.map(this,function (b,c){return a.call(b,c,b);}));},end:function (){return this.prevObject || this.constructor(null);},push:E,sort:[].sort,splice:[].splice}),e.fn.init.prototype = e.fn,e.extend = (e.fn.extend = function (){var a,c,d,f,g,h,i =arguments[0] || {},j =1,k =arguments.length,l =!1;typeof i == "boolean" && (l = i,i = arguments[1] || {},j = 2),typeof i != "object" && !e.isFunction(i) && (i = {}),k === j && (i = this,--j);for (; j < k; j++){if ((a = arguments[j]) != null) {
for (c in a) {
  d = i[c],f = a[c];if (i === f) {continue;}l && f && (e.isPlainObject(f) || (g = e.isArray(f)))?(g?(g = !1,h = d && e.isArray(d)?d:[]):h = d && e.isPlainObject(d)?d:{},i[c] = e.extend(l,h,f)):f !== b && (i[c] = f);
}}}return i;}),e.extend({noConflict:function (b){a.$ === e && (a.$ = g),b && a.jQuery === e && (a.jQuery = f);return e;},isReady:!1,readyWait:1,holdReady:function (a){a?e.readyWait++:e.ready(!0);},ready:function (a){if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {if (!c.body) {return setTimeout(e.ready,1);}e.isReady = !0;if (a !== !0 && --e.readyWait > 0) {return;}A.fireWith(c,[e]),e.fn.trigger && e(c).trigger("ready").off("ready");}},bindReady:function (){if (!A) {A = e.Callbacks("once memory");if (c.readyState === "complete") {return setTimeout(e.ready,1);}if (c.addEventListener) {c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);} else {if (c.attachEvent) {c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b =!1;try {b = a.frameElement == null;} catch (d) {}c.documentElement.doScroll && b && J();}}}},isFunction:function (a){return e.type(a) === "function";},isArray:Array.isArray || function (a){return e.type(a) === "array";},isWindow:function (a){return a != null && a == a.window;},isNumeric:function (a){return !isNaN(parseFloat(a)) && isFinite(a);},type:function (a){return a == null?String(a):I[C.call(a)] || "object";},isPlainObject:function (a){if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) {return !1;}try {if (a.constructor && !D.call(a,"constructor") && !D.call(a.constructor.prototype,"isPrototypeOf")) {return !1;}} catch (c) {return !1;}var d;
for (d in a) {
  ;

}return d === b || D.call(a,d);},isEmptyObject:function (a){var b;for 
                                                                    (b in a) {
                                                                    return !1;
}return !0;},error:function (a){throw new Error(a);},parseJSON:function (b){if (typeof b != "string" || !b) {return null;}b = e.trim(b);if (a.JSON && a.JSON.parse) {return a.JSON.parse(b);}if (n.test(b.replace(o,"@").replace(p,"]").replace(q,""))) {return new Function("return " + b)();}e.error("Invalid JSON: " + b);},parseXML:function (c){if (typeof c != "string" || !c) {return null;}var d,f;try {a.DOMParser?(f = new DOMParser(),d = f.parseFromString(c,"text/xml")):(d = new ActiveXObject("Microsoft.XMLDOM"),d.async = "false",d.loadXML(c));} catch (g) {d = b;}(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);return d;},noop:function (){},globalEval:function (b){b && j.test(b) && (a.execScript || function (b){a.eval.call(a,b);})(b);},camelCase:function (a){return a.replace(w,"ms-").replace(v,x);},nodeName:function (a,b){return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase();},each:function (a,c,d){var f,g =0,h =a.length,i =h === b || e.isFunction(a);if (d) {if (i) {
for (f in a) {
  if (c.apply(a[f],d) === !1) {break;}
}} else {for (; g < h; ){if (c.apply(a[g++],d) === !1) {break;}}}} else {if (i) {
for (f in a) {
  if (c.call(a[f],f,a[f]) === !1) {break;}
}} else {for (; g < h; ){if (c.call(a[g],g,a[g++]) === !1) {break;}}}}return a;},trim:G?function (a){return a == null?"":G.call(a);}:function (a){return a == null?"":(a + "").replace(k,"").replace(l,"");},makeArray:function (a,b){var c =b || [];if (a != null) {var d =e.type(a);a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a)?E.call(c,a):e.merge(c,a);}return c;},inArray:function (a,b,c){var d;if (b) {if (H) {return H.call(b,a,c);}d = b.length,c = c?c < 0?Math.max(0,d + c):c:0;for (; c < d; c++){if (c in b && b[c] === a) {return c;}}}return -1;},merge:function (a,c){var d =a.length,e =0;if (typeof c.length == "number") {var f =c.length;for (; e < f; e++){a[d++] = c[e];}} else {while (c[e] !== b) {a[d++] = c[e++];}}a.length = d;return a;},grep:function (a,b,c){var d =[],e;c = !!c;var f =0,g =a.length;for (; f < g; f++){e = !!b(a[f],f),c !== e && d.push(a[f]);}return d;},map:function (a,c,d){var f,g,h =[],i =0,j =a.length,k =a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));if (k) {for (; i < j; i++){f = c(a[i],i,d),f != null && (h[h.length] = f);}} else {
for (g in a) {
  f = c(a[g],g,d),f != null && (h[h.length] = f);
}}return h.concat.apply([],h);},guid:1,proxy:function (a,c){if (typeof c == "string") {var d =a[c];c = a,a = d;}if (!e.isFunction(a)) {return b;}var f =F.call(arguments,2),g =function (){return a.apply(c,f.concat(F.call(arguments)));};g.guid = (a.guid = a.guid || g.guid || e.guid++);return g;},access:function (a,c,d,f,g,h,i){var j,k =d == null,l =0,m =a.length;if (d && typeof d == "object") {
for (l in d) {
  e.access(a,c,l,d[l],1,h,f);
}g = 1;} else {if (f !== b) {j = i === b && e.isFunction(f),k && (j?(j = c,c = function (a,b,c){return j.call(e(a),c);}):(c.call(a,f),c = null));if (c) {for (; l < m; l++){c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);}}g = 1;}}return g?a:k?c.call(a):m?c(a[0],d):h;},now:function (){return new Date().getTime();},uaMatch:function (a){a = a.toLowerCase();var b =r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];return {browser:b[1] || "",version:b[2] || "0"};},sub:function (){function a(b,c){return new (a.fn.init)(b,c);}e.extend(!0,a,this),a.superclass = this,a.fn = (a.prototype = this()),a.fn.constructor = a,a.sub = this.sub,a.fn.init = function (d,f){f && f instanceof e && !(f instanceof a) && (f = a(f));return e.fn.init.call(this,d,f,b);},a.fn.init.prototype = a.fn;var b =a(c);return a;},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function (a,b){I["[object " + b + "]"] = b.toLowerCase();}),z = e.uaMatch(y),z.browser && (e.browser[z.browser] = !0,e.browser.version = z.version),e.browser.webkit && (e.browser.safari = !0),j.test(" ") && (k = /^[\s\xA0]+/,l = /[\s\xA0]+$/),h = e(c),c.addEventListener?B = function (){c.removeEventListener("DOMContentLoaded",B,!1),e.ready();}:c.attachEvent && (B = function (){c.readyState === "complete" && (c.detachEvent("onreadystatechange",B),e.ready());});return e;}(),g ={};f.Callbacks = function (a){a = a?g[a] || h(a):{};var c =[],d =[],e,i,j,k,l,m,n =function (b){var d,e,g,h,i;for (d = 0,e = b.length; d < e; d++){g = b[d],h = f.type(g),h === "array"?n(g):h === "function" && (!a.unique || !p.has(g)) && c.push(g);}},o =function (b,f){f = f || [],e = !a.memory || [b,f],i = !0,j = !0,m = k || 0,k = 0,l = c.length;for (; c && m < l; m++){if (c[m].apply(b,f) === !1 && a.stopOnFalse) {e = !0;
break;}}j = !1,c && (a.once?e === !0?p.disable():c = []:d && d.length && (e = d.shift(),p.fireWith(e[0],e[1])));},p ={add:function (){if (c) {var a =c.length;n(arguments),j?l = c.length:e && e !== !0 && (k = a,o(e[0],e[1]));}return this;},remove:function (){if (c) {var b =arguments,d =0,e =b.length;for (; d < e; d++){var f =0;for (; f < c.length; f++){if (b[d] === c[f]) {j && f <= l && (l--,f <= m && m--),c.splice(f--,1);if (a.unique) {
break;}}}}}return this;},has:function (a){if (c) {var b =0,d =c.length;for (; b < d; b++){if (a === c[b]) {return !0;}}}return !1;},empty:function (){c = [];return this;},disable:function (){c = (d = (e = b));return this;},disabled:function (){return !c;},lock:function (){d = b,(!e || e === !0) && p.disable();return this;},locked:function (){return !d;},fireWith:function (b,c){d && (j?a.once || d.push([b,c]):(!a.once || !e) && o(b,c));return this;},fire:function (){p.fireWith(this,arguments);return this;},fired:function (){return !!i;}};return p;};var i =[].slice;f.extend({Deferred:function (a){var b =f.Callbacks("once memory"),c =f.Callbacks("once memory"),d =f.Callbacks("memory"),e ="pending",g ={resolve:b,reject:c,notify:d},h ={done:b.add,fail:c.add,progress:d.add,state:function (){return e;},isResolved:b.fired,isRejected:c.fired,then:function (a,b,c){i.done(a).fail(b).progress(c);return this;},always:function (){i.done.apply(i,arguments).fail.apply(i,arguments);return this;},pipe:function (a,b,c){return f.Deferred(function (d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function (a,b){var c =b[0],e =b[1],g;f.isFunction(c)?i[a](function (){g = c.apply(this,arguments),g && f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e + "With"](this === i?d:this,[g]);}):i[a](d[e]);});}).promise();},promise:function (a){if (a == null) {a = h;} else {var b;
for (b in h) {
  a[b] = h[b];
}}return a;}},i =h.promise({}),j;for (j in g) {
                                   i[j] = g[j].fire,i[j + "With"] = g[j].fireWith;
}i.done(function (){e = "resolved";},c.disable,d.lock).fail(function (){e = "rejected";},b.disable,d.lock),a && a.call(i,i);return i;},when:function (a){function m(a){return function (b){e[a] = arguments.length > 1?i.call(arguments,0):b,j.notifyWith(k,e);};}function l(a){return function (c){b[a] = arguments.length > 1?i.call(arguments,0):c,--g || j.resolveWith(j,b);};}var b =i.call(arguments,0),c =0,d =b.length,e =Array(d),g =d,h =d,j =d <= 1 && a && f.isFunction(a.promise)?a:f.Deferred(),k =j.promise();if (d > 1) {for (; c < d; c++){b[c] && b[c].promise && f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;}g || j.resolveWith(j,b);} else {j !== a && j.resolveWith(j,d?[a]:[]);}return k;}}),f.support = function (){var b,d,e,g,h,i,j,k,l,m,n,o,p =c.createElement("div"),q =c.documentElement;p.setAttribute("className","t"),p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d = p.getElementsByTagName("*"),e = p.getElementsByTagName("a")[0];if (!d || !d.length || !e) {return {};}g = c.createElement("select"),h = g.appendChild(c.createElement("option")),i = p.getElementsByTagName("input")[0],b = {leadingWhitespace:p.firstChild.nodeType === 3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href") === "/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value === "on",optSelected:h.selected,getSetAttribute:p.className !== "t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel = (b.boxModel = c.compatMode === "CSS1Compat"),i.checked = !0,b.noCloneChecked = i.cloneNode(!0).checked,g.disabled = !0,b.optDisabled = !h.disabled;try {delete p.test;} catch (r) {b.deleteExpando = !1;}!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick",function (){b.noCloneEvent = !1;}),p.cloneNode(!0).fireEvent("onclick")),i = c.createElement("input"),i.value = "t",i.setAttribute("type","radio"),b.radioValue = i.value === "t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j = c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked = i.checked,j.removeChild(i),j.appendChild(p);if (p.attachEvent) {
for (n in {submit:1,change:1,focusin:1}) {
  m = "on" + n,o = m in p,o || (p.setAttribute(m,"return;"),o = typeof p[m] == "function"),b[n + "Bubbles"] = o;
}}j.removeChild(p),j = (g = (h = (p = (i = null)))),f(function (){var d,e,g,h,i,j,l,m,n,q,r,s,t,u =c.getElementsByTagName("body")[0];!u || (m = 1,t = "padding:0;margin:0;border:",r = "position:absolute;top:0;left:0;width:1px;height:1px;",s = t + "0;visibility:hidden;",n = "style='" + r + t + "5px solid #000;",q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>",d = c.createElement("div"),d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px",u.insertBefore(d,u.firstChild),p = c.createElement("div"),d.appendChild(p),p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>",k = p.getElementsByTagName("td"),o = k[0].offsetHeight === 0,k[0].style.display = "",k[1].style.display = "none",b.reliableHiddenOffsets = o && k[0].offsetHeight === 0,a.getComputedStyle && (p.innerHTML = "",l = c.createElement("div"),l.style.width = "0",l.style.marginRight = "0",p.style.width = "2px",p.appendChild(l),b.reliableMarginRight = (parseInt((a.getComputedStyle(l,null) || {marginRight:0}).marginRight,10) || 0) === 0),typeof p.style.zoom != "undefined" && (p.innerHTML = "",p.style.width = (p.style.padding = "1px"),p.style.border = 0,p.style.overflow = "hidden",p.style.display = "inline",p.style.zoom = 1,b.inlineBlockNeedsLayout = p.offsetWidth === 3,p.style.display = "block",p.style.overflow = "visible",p.innerHTML = "<div style='width:5px;'></div>",b.shrinkWrapBlocks = p.offsetWidth !== 3),p.style.cssText = r + s,p.innerHTML = q,e = p.firstChild,g = e.firstChild,i = e.nextSibling.firstChild.firstChild,j = {doesNotAddBorder:g.offsetTop !== 5,doesAddBorderForTableAndCells:i.offsetTop === 5},g.style.position = "fixed",g.style.top = "20px",j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15,g.style.position = (g.style.top = ""),e.style.overflow = "hidden",e.style.position = "relative",j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5,j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m,a.getComputedStyle && (p.style.marginTop = "1%",b.pixelMargin = (a.getComputedStyle(p,null) || {marginTop:0}).marginTop !== "1%"),typeof d.style.zoom != "undefined" && (d.style.zoom = 1),u.removeChild(d),l = (p = (d = null)),f.extend(b,j));});return b;}();var j =/^(?:\{.*\}|\[.*\])$/,k =/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function (a){a = a.nodeType?f.cache[a[f.expando]]:a[f.expando];return !!a && !m(a);},data:function (a,c,d,e){if (!!f.acceptData(a)) {var g,h,i,j =f.expando,k =typeof c == "string",l =a.nodeType,m =l?f.cache:a,n =l?a[j]:a[j] && j,o =c === "events";if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) {return;}n || (l?a[j] = (n = ++f.uuid):n = j),m[n] || (m[n] = {},l || (m[n].toJSON = f.noop));if (typeof c == "object" || typeof c == "function") {e?m[n] = f.extend(m[n],c):m[n].data = f.extend(m[n].data,c);}g = (h = m[n]),e || (h.data || (h.data = {}),h = h.data),d !== b && (h[f.camelCase(c)] = d);if (o && !h[c]) {return g.events;}k?(i = h[c],i == null && (i = h[f.camelCase(c)])):i = h;return i;}},removeData:function (a,b,c){if (!!f.acceptData(a)) {var d,e,g,h =f.expando,i =a.nodeType,j =i?f.cache:a,k =i?a[h]:h;if (!j[k]) {return;}if (b) {d = c?j[k]:j[k].data;if (d) {f.isArray(b) || (b in d?b = [b]:(b = f.camelCase(b),b in d?b = [b]:b = b.split(" ")));for (e = 0,g = b.length; e < g; e++){delete d[b[e]];}if (!(c?m:f.isEmptyObject)(d)) {return;}}}if (!c) {delete j[k].data;if (!m(j[k])) {return;}}f.support.deleteExpando || !j.setInterval?delete j[k]:j[k] = null,i && (f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h] = null);}},_data:function (a,b,c){return f.data(a,b,c,!0);},acceptData:function (a){if (a.nodeName) {var b =f.noData[a.nodeName.toLowerCase()];if (b) {return b !== !0 && a.getAttribute("classid") === b;}}return !0;}}),f.fn.extend({data:function (a,c){var d,e,g,h,i,j =this[0],k =0,m =null;if (a === b) {if (this.length) {m = f.data(j);if (j.nodeType === 1 && !f._data(j,"parsedAttrs")) {g = j.attributes;for (i = g.length; k < i; k++){h = g[k].name,h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)),l(j,h,m[h]));}f._data(j,"parsedAttrs",!0);}}return m;}if (typeof a == "object") {return this.each(function (){f.data(this,a);});}d = a.split(".",2),d[1] = d[1]?"." + d[1]:"",e = d[1] + "!";return f.access(this,function (c){if (c === b) {m = this.triggerHandler("getData" + e,[d[0]]),m === b && j && (m = f.data(j,a),m = l(j,a,m));return m === b && d[1]?this.data(d[0]):m;}d[1] = c,this.each(function (){var b =f(this);b.triggerHandler("setData" + e,d),f.data(this,a,c),b.triggerHandler("changeData" + e,d);});},null,c,arguments.length > 1,null,!1);},removeData:function (a){return this.each(function (){f.removeData(this,a);});}}),f.extend({_mark:function (a,b){a && (b = (b || "fx") + "mark",f._data(a,b,(f._data(a,b) || 0) + 1));},_unmark:function (a,b,c){a !== !0 && (c = b,b = a,a = !1);if (b) {c = c || "fx";var d =c + "mark",e =a?0:(f._data(b,d) || 1) - 1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"));}},queue:function (a,b,c){var d;if (a) {b = (b || "fx") + "queue",d = f._data(a,b),c && (!d || f.isArray(c)?d = f._data(a,b,f.makeArray(c)):d.push(c));return d || [];}},dequeue:function (a,b){b = b || "fx";var c =f.queue(a,b),d =c.shift(),e ={};d === "inprogress" && (d = c.shift()),d && (b === "fx" && c.unshift("inprogress"),f._data(a,b + ".run",e),d.call(a,function (){f.dequeue(a,b);},e)),c.length || (f.removeData(a,b + "queue " + b + ".run",!0),n(a,b,"queue"));}}),f.fn.extend({queue:function (a,c){var d =2;typeof a != "string" && (c = a,a = "fx",d--);if (arguments.length < d) {return f.queue(this[0],a);}return c === b?this:this.each(function (){var b =f.queue(this,a,c);a === "fx" && b[0] !== "inprogress" && f.dequeue(this,a);});},dequeue:function (a){return this.each(function (){f.dequeue(this,a);});},delay:function (a,b){a = f.fx?f.fx.speeds[a] || a:a,b = b || "fx";return this.queue(b,function (b,c){var d =setTimeout(b,a);c.stop = function (){clearTimeout(d);};});},clearQueue:function (a){return this.queue(a || "fx",[]);},promise:function (a,c){function m(){--h || d.resolveWith(e,[e]);}typeof a != "string" && (c = a,a = b),a = a || "fx";var d =f.Deferred(),e =this,g =e.length,h =1,i =a + "defer",j =a + "queue",k =a + "mark",l;while (g--) {if (l = f.data(e[g],i,b,!0) || (f.data(e[g],j,b,!0) || f.data(e[g],k,b,!0)) && f.data(e[g],i,f.Callbacks("once memory"),!0)) {h++,l.add(m);}}m();return d.promise(c);}});var o =/[\n\t\r]/g,p =/\s+/,q =/\r/g,r =/^(?:button|input)$/i,s =/^(?:button|input|object|select|textarea)$/i,t =/^a(?:rea)?$/i,u =/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v =f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function (a,b){return f.access(this,f.attr,a,b,arguments.length > 1);},removeAttr:function (a){return this.each(function (){f.removeAttr(this,a);});},prop:function (a,b){return f.access(this,f.prop,a,b,arguments.length > 1);},removeProp:function (a){a = f.propFix[a] || a;return this.each(function (){try {this[a] = b,delete this[a];} catch (c) {}});},addClass:function (a){var b,c,d,e,g,h,i;if (f.isFunction(a)) {return this.each(function (b){f(this).addClass(a.call(this,b,this.className));});}if (a && typeof a == "string") {b = a.split(p);for (c = 0,d = this.length; c < d; c++){e = this[c];if (e.nodeType === 1) {if (!e.className && b.length === 1) {e.className = a;} else {g = " " + e.className + " ";for (h = 0,i = b.length; h < i; h++){~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");}e.className = f.trim(g);}}}}return this;},removeClass:function (a){var c,d,e,g,h,i,j;if (f.isFunction(a)) {return this.each(function (b){f(this).removeClass(a.call(this,b,this.className));});}if (a && typeof a == "string" || a === b) {c = (a || "").split(p);for (d = 0,e = this.length; d < e; d++){g = this[d];if (g.nodeType === 1 && g.className) {if (a) {h = (" " + g.className + " ").replace(o," ");for (i = 0,j = c.length; i < j; i++){h = h.replace(" " + c[i] + " "," ");}g.className = f.trim(h);} else {g.className = "";}}}}return this;},toggleClass:function (a,b){var c =typeof a,d =typeof b == "boolean";if (f.isFunction(a)) {return this.each(function (c){f(this).toggleClass(a.call(this,c,this.className,b),b);});}return this.each(function (){if (c === "string") {var e,g =0,h =f(this),i =b,j =a.split(p);while (e = j[g++]) {i = d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e);}} else {if (c === "undefined" || c === "boolean") {this.className && f._data(this,"__className__",this.className),this.className = this.className || a === !1?"":f._data(this,"__className__") || "";}}});},hasClass:function (a){var b =" " + a + " ",c =0,d =this.length;for (; c < d; c++){if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o," ").indexOf(b) > -1) {return !0;}}return !1;},val:function (a){var c,d,e,g =this[0];if (!!arguments.length) {e = f.isFunction(a);return this.each(function (d){var g =f(this),h;if (this.nodeType === 1) {e?h = a.call(this,d,g.val()):h = a,h == null?h = "":typeof h == "number"?h += "":f.isArray(h) && (h = f.map(h,function (a){return a == null?"":a + "";})),c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];if (!c || !("set" in c) || c.set(this,h,"value") === b) {this.value = h;}}});}if (g) {c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];if (c && "get" in c && (d = c.get(g,"value")) !== b) {return d;}d = g.value;return typeof d == "string"?d.replace(q,""):d == null?"":d;}}}),f.extend({valHooks:{option:{get:function (a){var b =a.attributes.value;return !b || b.specified?a.value:a.text;}},select:{get:function (a){var b,c,d,e,g =a.selectedIndex,h =[],i =a.options,j =a.type === "select-one";if (g < 0) {return null;}c = j?g:0,d = j?g + 1:i.length;for (; c < d; c++){e = i[c];if (e.selected && (f.support.optDisabled?!e.disabled:e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode,"optgroup"))) {b = f(e).val();if (j) {return b;}h.push(b);}}if (j && !h.length && i.length) {return f(i[g]).val();}return h;},set:function (a,b){var c =f.makeArray(b);f(a).find("option").each(function (){this.selected = f.inArray(f(this).val(),c) >= 0;}),c.length || (a.selectedIndex = -1);return c;}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function (a,c,d,e){var g,h,i,j =a.nodeType;if (!!a && j !== 3 && j !== 8 && j !== 2) {if (e && c in f.attrFn) {return f(a)[c](d);}if (typeof a.getAttribute == "undefined") {return f.prop(a,c,d);}i = j !== 1 || !f.isXMLDoc(a),i && (c = c.toLowerCase(),h = f.attrHooks[c] || (u.test(c)?x:w));if (d !== b) {if (d === null) {f.removeAttr(a,c);return;}if (h && "set" in h && i && (g = h.set(a,d,c)) !== b) {return g;}a.setAttribute(c,"" + d);return d;}if (h && "get" in h && i && (g = h.get(a,c)) !== null) {return g;}g = a.getAttribute(c);return g === null?b:g;}},removeAttr:function (a,b){var c,d,e,g,h,i =0;if (b && a.nodeType === 1) {d = b.toLowerCase().split(p),g = d.length;for (; i < g; i++){e = d[i],e && (c = f.propFix[e] || e,h = u.test(e),h || f.attr(a,e,""),a.removeAttribute(v?e:c),h && c in a && (a[c] = !1));}}},attrHooks:{type:{set:function (a,b){if (r.test(a.nodeName) && a.parentNode) {f.error("type property can't be changed");} else {if (!f.support.radioValue && b === "radio" && f.nodeName(a,"input")) {var c =a.value;a.setAttribute("type",b),c && (a.value = c);return b;}}}},value:{get:function (a,b){if (w && f.nodeName(a,"button")) {return w.get(a,b);}return b in a?a.value:null;},set:function (a,b,c){if (w && f.nodeName(a,"button")) {return w.set(a,b,c);}a.value = b;}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function (a,c,d){var e,g,h,i =a.nodeType;if (!!a && i !== 3 && i !== 8 && i !== 2) {h = i !== 1 || !f.isXMLDoc(a),h && (c = f.propFix[c] || c,g = f.propHooks[c]);return d !== b?g && "set" in g && (e = g.set(a,d,c)) !== b?e:a[c] = d:g && "get" in g && (e = g.get(a,c)) !== null?e:a[c];}},propHooks:{tabIndex:{get:function (a){var c =a.getAttributeNode("tabindex");return c && c.specified?parseInt(c.value,10):s.test(a.nodeName) || t.test(a.nodeName) && a.href?0:b;}}}}),f.attrHooks.tabindex = f.propHooks.tabIndex,x = {get:function (a,c){var d,e =f.prop(a,c);return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1?c.toLowerCase():b;},set:function (a,b,c){var d;b === !1?f.removeAttr(a,c):(d = f.propFix[c] || c,d in a && (a[d] = !0),a.setAttribute(c,c.toLowerCase()));return c;}},v || (y = {name:!0,id:!0,coords:!0},w = (f.valHooks.button = {get:function (a,c){var d;d = a.getAttributeNode(c);return d && (y[c]?d.nodeValue !== "":d.specified)?d.nodeValue:b;},set:function (a,b,d){var e =a.getAttributeNode(d);e || (e = c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue = b + "";}}),f.attrHooks.tabindex.set = w.set,f.each(["width","height"],function (a,b){f.attrHooks[b] = f.extend(f.attrHooks[b],{set:function (a,c){if (c === "") {a.setAttribute(b,"auto");return c;}}});}),f.attrHooks.contenteditable = {get:w.get,set:function (a,b,c){b === "" && (b = "false"),w.set(a,b,c);}}),f.support.hrefNormalized || f.each(["href","src","width","height"],function (a,c){f.attrHooks[c] = f.extend(f.attrHooks[c],{get:function (a){var d =a.getAttribute(c,2);return d === null?b:d;}});}),f.support.style || (f.attrHooks.style = {get:function (a){return a.style.cssText.toLowerCase() || b;},set:function (a,b){return a.style.cssText = "" + b;}}),f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected,{get:function (a){var b =a.parentNode;b && (b.selectedIndex,b.parentNode && b.parentNode.selectedIndex);return null;}})),f.support.enctype || (f.propFix.enctype = "encoding"),f.support.checkOn || f.each(["radio","checkbox"],function (){f.valHooks[this] = {get:function (a){return a.getAttribute("value") === null?"on":a.value;}};}),f.each(["radio","checkbox"],function (){f.valHooks[this] = f.extend(f.valHooks[this],{set:function (a,b){if (f.isArray(b)) {return a.checked = f.inArray(f(a).val(),b) >= 0;}}});});var z =/^(?:textarea|input|select)$/i,A =/^([^\.]*)?(?:\.(.+))?$/,B =/(?:^|\s)hover(\.\S+)?\b/,C =/^key/,D =/^(?:mouse|contextmenu)|click/,E =/^(?:focusinfocus|focusoutblur)$/,F =/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G =function (a){var b =F.exec(a);b && (b[1] = (b[1] || "").toLowerCase(),b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));return b;},H =function (a,b){var c =a.attributes || {};return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value));},I =function (a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1");};f.event = {add:function (a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {d.handler && (p = d,d = p.handler,g = p.selector),d.guid || (d.guid = f.guid++),j = h.events,j || (h.events = (j = {})),i = h.handle,i || (h.handle = (i = function (a){return typeof f != "undefined" && (!a || f.event.triggered !== a.type)?f.event.dispatch.apply(i.elem,arguments):b;}),i.elem = a),c = f.trim(I(c)).split(" ");for (k = 0; k < c.length; k++){l = A.exec(c[k]) || [],m = l[1],n = (l[2] || "").split(".").sort(),s = f.event.special[m] || {},m = (g?s.delegateType:s.bindType) || m,s = f.event.special[m] || {},o = f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g && G(g),namespace:n.join(".")},p),r = j[m];if (!r) {r = (j[m] = []),r.delegateCount = 0;if (!s.setup || s.setup.call(a,e,n,i) === !1) {a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent && a.attachEvent("on" + m,i);}}s.add && (s.add.call(a,o),o.handler.guid || (o.handler.guid = d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m] = !0;}a = null;}},global:{},remove:function (a,b,c,d,e){var g =f.hasData(a) && f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if (!!g && !!(o = g.events)) {b = f.trim(I(b || "")).split(" ");for (h = 0; h < b.length; h++){i = A.exec(b[h]) || [],j = (k = i[1]),l = i[2];if (!j) {
for (j in o) {
  f.event.remove(a,j + b[h],c,d,!0);
}continue;}p = f.event.special[j] || {},j = (d?p.delegateType:p.bindType) || j,r = o[j] || [],m = r.length,l = l?new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)"):null;for (n = 0; n < r.length; n++){s = r[n],(e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--,1),s.selector && r.delegateCount--,p.remove && p.remove.call(a,s));}r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a,l) === !1) && f.removeEvent(a,j,g.handle),delete o[j]);}f.isEmptyObject(o) && (q = g.handle,q && (q.elem = null),f.removeData(a,["events","handle"],!0));}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function (c,d,e,g){if (!e || e.nodeType !== 3 && e.nodeType !== 8) {var h =c.type || c,i =[],j,k,l,m,n,o,p,q,r,s;if (E.test(h + f.event.triggered)) {return;}h.indexOf("!") >= 0 && (h = h.slice(0,-1),k = !0),h.indexOf(".") >= 0 && (i = h.split("."),h = i.shift(),i.sort());if ((!e || f.event.customEvent[h]) && !f.event.global[h]) {return;}c = typeof c == "object"?c[f.expando]?c:new (f.Event)(h,c):new (f.Event)(h),c.type = h,c.isTrigger = !0,c.exclusive = k,c.namespace = i.join("."),c.namespace_re = c.namespace?new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)"):null,o = h.indexOf(":") < 0?"on" + h:"";if (!e) {j = f.cache;
for (l in j) {
  j[l].events && j[l].events[h] && f.event.trigger(c,d,j[l].handle.elem,!0);
}return;}c.result = b,c.target || (c.target = e),d = d != null?f.makeArray(d):[],d.unshift(c),p = f.event.special[h] || {};if (p.trigger && p.trigger.apply(e,d) === !1) {return;}r = [[e,p.bindType || h]];if (!g && !p.noBubble && !f.isWindow(e)) {s = p.delegateType || h,m = E.test(s + h)?e:e.parentNode,n = null;for (; m; m = m.parentNode){r.push([m,s]),n = m;}n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a,s]);}for (l = 0; l < r.length && !c.isPropagationStopped(); l++){m = r[l][0],c.type = r[l][1],q = (f._data(m,"events") || {})[c.type] && f._data(m,"handle"),q && q.apply(m,d),q = o && m[o],q && f.acceptData(m) && q.apply(m,d) === !1 && c.preventDefault();}c.type = h,!g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument,d) === !1) && (h !== "click" || !f.nodeName(e,"a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o],n && (e[o] = null),f.event.triggered = h,e[h](),f.event.triggered = b,n && (e[o] = n));return c.result;}},dispatch:function (c){c = f.event.fix(c || a.event);var d =(f._data(this,"events") || {})[c.type] || [],e =d.delegateCount,g =[].slice.call(arguments,0),h =!c.exclusive && !c.namespace,i =f.event.special[c.type] || {},j =[],k,l,m,n,o,p,q,r,s,t,u;g[0] = c,c.delegateTarget = this;if (!i.preDispatch || i.preDispatch.call(this,c) !== !1) {if (e && (!c.button || c.type !== "click")) {n = f(this),n.context = this.ownerDocument || this;for (m = c.target; m != this; m = m.parentNode || this){if (m.disabled !== !0) {p = {},r = [],n[0] = m;for (k = 0; k < e; k++){s = d[k],t = s.selector,p[t] === b && (p[t] = s.quick?H(m,s.quick):n.is(t)),p[t] && r.push(s);}r.length && j.push({elem:m,matches:r});}}}d.length > e && j.push({elem:this,matches:d.slice(e)});for (k = 0; k < j.length && !c.isPropagationStopped(); k++){q = j[k],c.currentTarget = q.elem;for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++){s = q.matches[l];if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) {c.data = s.data,c.handleObj = s,o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem,g),o !== b && (c.result = o,o === !1 && (c.preventDefault(),c.stopPropagation()));}}}i.postDispatch && i.postDispatch.call(this,c);return c.result;}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function (a,b){a.which == null && (a.which = b.charCode != null?b.charCode:b.keyCode);return a;}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function (a,d){var e,f,g,h =d.button,i =d.fromElement;a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c,f = e.documentElement,g = e.body,a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0),a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)),!a.relatedTarget && i && (a.relatedTarget = i === a.target?d.toElement:i),!a.which && h !== b && (a.which = h & 1?1:h & 2?3:h & 4?2:0);return a;}},fix:function (a){if (a[f.expando]) {return a;}var d,e,g =a,h =f.event.fixHooks[a.type] || {},i =h.props?this.props.concat(h.props):this.props;a = f.Event(g);for (d = i.length; d; ){e = i[--d],a[e] = g[e];}a.target || (a.target = g.srcElement || c),a.target.nodeType === 3 && (a.target = a.target.parentNode),a.metaKey === b && (a.metaKey = a.ctrlKey);return h.filter?h.filter(a,g):a;},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function (a,b,c){f.isWindow(this) && (this.onbeforeunload = c);},teardown:function (a,b){this.onbeforeunload === b && (this.onbeforeunload = null);}}},simulate:function (a,b,c,d){var e =f.extend(new (f.Event)(),c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented() && c.preventDefault();}},f.event.handle = f.event.dispatch,f.removeEvent = c.removeEventListener?function (a,b,c){a.removeEventListener && a.removeEventListener(b,c,!1);}:function (a,b,c){a.detachEvent && a.detachEvent("on" + b,c);},f.Event = function (a,b){if (!(this instanceof f.Event)) {return new (f.Event)(a,b);}a && a.type?(this.originalEvent = a,this.type = a.type,this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault()?K:J):this.type = a,b && f.extend(this,b),this.timeStamp = a && a.timeStamp || f.now(),this[f.expando] = !0;},f.Event.prototype = {preventDefault:function (){this.isDefaultPrevented = K;var a =this.originalEvent;!a || (a.preventDefault?a.preventDefault():a.returnValue = !1);},stopPropagation:function (){this.isPropagationStopped = K;var a =this.originalEvent;!a || (a.stopPropagation && a.stopPropagation(),a.cancelBubble = !0);},stopImmediatePropagation:function (){this.isImmediatePropagationStopped = K,this.stopPropagation();},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function (a,b){f.event.special[a] = {delegateType:b,bindType:b,handle:function (a){var c =this,d =a.relatedTarget,e =a.handleObj,g =e.selector,h;if (!d || d !== c && !f.contains(c,d)) {a.type = e.origType,h = e.handler.apply(this,arguments),a.type = b;}return h;}};}),f.support.submitBubbles || (f.event.special.submit = {setup:function (){if (f.nodeName(this,"form")) {return !1;}f.event.add(this,"click._submit keypress._submit",function (a){var c =a.target,d =f.nodeName(c,"input") || f.nodeName(c,"button")?c.form:b;d && !d._submit_attached && (f.event.add(d,"submit._submit",function (a){a._submit_bubble = !0;}),d._submit_attached = !0);});},postDispatch:function (a){a._submit_bubble && (delete a._submit_bubble,this.parentNode && !a.isTrigger && f.event.simulate("submit",this.parentNode,a,!0));},teardown:function (){if (f.nodeName(this,"form")) {return !1;}f.event.remove(this,"._submit");}}),f.support.changeBubbles || (f.event.special.change = {setup:function (){if (z.test(this.nodeName)) {if (this.type === "checkbox" || this.type === "radio") {f.event.add(this,"propertychange._change",function (a){a.originalEvent.propertyName === "checked" && (this._just_changed = !0);}),f.event.add(this,"click._change",function (a){this._just_changed && !a.isTrigger && (this._just_changed = !1,f.event.simulate("change",this,a,!0));});}return !1;}f.event.add(this,"beforeactivate._change",function (a){var b =a.target;z.test(b.nodeName) && !b._change_attached && (f.event.add(b,"change._change",function (a){this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change",this.parentNode,a,!0);}),b._change_attached = !0);});},handle:function (a){var b =a.target;if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") {return a.handleObj.handler.apply(this,arguments);}},teardown:function (){f.event.remove(this,"._change");return z.test(this.nodeName);}}),f.support.focusinBubbles || f.each({focus:"focusin",blur:"focusout"},function (a,b){var d =0,e =function (a){f.event.simulate(b,a.target,f.event.fix(a),!0);};f.event.special[b] = {setup:function (){d++ === 0 && c.addEventListener(a,e,!0);},teardown:function (){--d === 0 && c.removeEventListener(a,e,!0);}};}),f.fn.extend({on:function (a,c,d,e,g){var h,i;if (typeof a == "object") {typeof c != "string" && (d = d || c,c = b);
for (i in a) {
  this.on(i,c,d,a[i],g);
}return this;}d == null && e == null?(e = c,d = (c = b)):e == null && (typeof c == "string"?(e = d,d = b):(e = d,d = c,c = b));if (e === !1) {e = J;} else {if (!e) {return this;}}g === 1 && (h = e,e = function (a){f().off(a);return h.apply(this,arguments);},e.guid = h.guid || (h.guid = f.guid++));return this.each(function (){f.event.add(this,a,e,d,c);});},one:function (a,b,c,d){return this.on(a,b,c,d,1);},off:function (a,c,d){if (a && a.preventDefault && a.handleObj) {var e =a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType + "." + e.namespace:e.origType,e.selector,e.handler);return this;}if (typeof a == "object") {var g;
for (g in a) {
  this.off(g,c,a[g]);
}return this;}if (c === !1 || typeof c == "function") {d = c,c = b;}d === !1 && (d = J);return this.each(function (){f.event.remove(this,a,d,c);});},bind:function (a,b,c){return this.on(a,null,b,c);},unbind:function (a,b){return this.off(a,null,b);},live:function (a,b,c){f(this.context).on(a,this.selector,b,c);return this;},die:function (a,b){f(this.context).off(a,this.selector || "**",b);return this;},delegate:function (a,b,c,d){return this.on(b,a,c,d);},undelegate:function (a,b,c){return arguments.length == 1?this.off(a,"**"):this.off(b,a,c);},trigger:function (a,b){return this.each(function (){f.event.trigger(a,b,this);});},triggerHandler:function (a,b){if (this[0]) {return f.event.trigger(a,b,this[0],!0);}},toggle:function (a){var b =arguments,c =a.guid || f.guid++,d =0,e =function (c){var e =(f._data(this,"lastToggle" + a.guid) || 0) % d;f._data(this,"lastToggle" + a.guid,e + 1),c.preventDefault();return b[e].apply(this,arguments) || !1;};e.guid = c;while (d < b.length) {b[d++].guid = c;}return this.click(e);},hover:function (a,b){return this.mouseenter(a).mouseleave(b || a);}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function (a,b){f.fn[b] = function (a,c){c == null && (c = a,a = null);return arguments.length > 0?this.on(b,null,a,c):this.trigger(b);},f.attrFn && (f.attrFn[b] = !0),C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks),D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks);}),function (){function x(a,b,c,e,f,g){var h =0,i =e.length;for (; h < i; h++){var j =e[h];if (j) {var k =!1;j = j[a];while (j) {if (j[d] === c) {k = e[j.sizset];
break;}if (j.nodeType === 1) {g || (j[d] = c,j.sizset = h);if (typeof b != "string") {if (j === b) {k = !0;
break;}} else {if (m.filter(b,[j]).length > 0) {k = j;break;}}}j = j[a];}e[h] = k;}}}function w(a,b,c,e,f,g){var h =0,i =e.length;for (; h < i; h++){var j =e[h];if (j) {var k =!1;j = j[a];while (j) {if (j[d] === c) {k = e[j.sizset];
break;}j.nodeType === 1 && !g && (j[d] = c,j.sizset = h);if (j.nodeName.toLowerCase() === b) {k = j;
break;}j = j[a];}e[h] = k;}}}var a =/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d ="sizcache" + (Math.random() + "").replace(".",""),e =0,g =Object.prototype.toString,h =!1,i =!0,j =/\\/g,k =/\r\n/g,l =/\W/;[0,0].sort(function (){i = !1;return 0;});var m =function (b,d,e,f){e = e || [],d = d || c;var h =d;if (d.nodeType !== 1 && d.nodeType !== 9) {return [];}if (!b || typeof b != "string") {return e;}var i,j,k,l,n,q,r,t,u =!0,v =m.isXML(d),w =[],x =b;
do {
  a.exec(""),i = a.exec(x);if (i) {x = i[3],w.push(i[1]);if (i[2]) {l = i[3];
  break;}}
} while (i);if (w.length > 1 && p.exec(b)) {if (w.length === 2 && o.relative[w[0]]) {j = y(w[0] + w[1],d,f);} else {j = o.relative[w[0]]?[d]:m(w.shift(),d);while (w.length) {b = w.shift(),o.relative[b] && (b += w.shift()),j = y(b,j,f);}}} else {!f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(),d,v),d = n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if (d) {n = f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode?d.parentNode:d,v),j = n.expr?m.filter(n.expr,n.set):n.set,w.length > 0?k = s(j):u = !1;while (w.length) {q = w.pop(),r = q,o.relative[q]?r = w.pop():q = "",r == null && (r = d),o.relative[q](k,r,v);}} else {k = (w = []);}}k || (k = j),k || m.error(q || b);if (g.call(k) === "[object Array]") {if (!u) {e.push.apply(e,k);} else {if (d && d.nodeType === 1) {for (t = 0; k[t] != null; t++){k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d,k[t])) && e.push(j[t]);}} else {for (t = 0; k[t] != null; t++){k[t] && k[t].nodeType === 1 && e.push(j[t]);}}}} else {s(k,e);}l && (m(l,h,e,f),m.uniqueSort(e));return e;};m.uniqueSort = function (a){if (u) {h = i,a.sort(u);if (h) {var b =1;for (; b < a.length; b++){a[b] === a[b - 1] && a.splice(b--,1);}}}return a;},m.matches = function (a,b){return m(a,null,null,b);},m.matchesSelector = function (a,b){return m(b,null,null,[a]).length > 0;},m.find = function (a,b,c){var d,e,f,g,h,i;if (!a) {return [];}for (e = 0,f = o.order.length; e < f; e++){h = o.order[e];if (g = o.leftMatch[h].exec(a)) {i = g[1],g.splice(1,1);if (i.substr(i.length - 1) !== "\\") {g[1] = (g[1] || "").replace(j,""),d = o.find[h](g,b,c);if (d != null) {a = a.replace(o.match[h],"");
break;}}}}d || (d = typeof b.getElementsByTagName != "undefined"?b.getElementsByTagName("*"):[]);return {set:d,expr:a};},m.filter = function (a,c,d,e){var f,g,h,i,j,k,l,n,p,q =a,r =[],s =c,t =c && c[0] && m.isXML(c[0]);while (a && c.length) {
for (h in o.filter) {
  if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {k = o.filter[h],l = f[1],g = !1,f.splice(1,1);if (l.substr(l.length - 1) === "\\") {
  continue;}s === r && (r = []);if (o.preFilter[h]) {f = o.preFilter[h](f,s,d,r,e,t);if (!f) {g = (i = !0);} else {if (f === !0) {
  continue;}}}if (f) {for (n = 0; (j = s[n]) != null; n++){j && (i = k(j,f,n,s),p = e ^ i,d && i != null?p?g = !0:s[n] = !1:p && (r.push(j),g = !0));}}if (i !== b) {d || (s = r),a = a.replace(o.match[h],"");if (!g) {return [];}
  break;}}
}if (a === q) {if (g == null) {m.error(a);} else {break;}}q = a;}return s;},m.error = function (a){
throw new Error("Syntax error, unrecognized expression: " + a);};var n =m.getText = function (a){var b,c,d =a.nodeType,e ="";if (d) {if (d === 1 || d === 9 || d === 11) {if (typeof a.textContent == "string") {return a.textContent;}if (typeof a.innerText == "string") {return a.innerText.replace(k,"");}for (a = a.firstChild; a; a = a.nextSibling){e += n(a);}} else {if (d === 3 || d === 4) {return a.nodeValue;}}} else {for (b = 0; c = a[b]; b++){c.nodeType !== 8 && (e += n(c));}}return e;},o =m.selectors = {order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function (a){return a.getAttribute("href");},type:function (a){return a.getAttribute("type");}},relative:{"+":function (a,b){var c =typeof b == "string",d =c && !l.test(b),e =c && !d;d && (b = b.toLowerCase());var f =0,g =a.length,h;for (; f < g; f++){if (h = a[f]) {while ((h = h.previousSibling) && h.nodeType !== 1) {;
}a[f] = e || h && h.nodeName.toLowerCase() === b?h || !1:h === b;}}e && m.filter(b,a,!0);},">":function (a,b){var c,d =typeof b == "string",e =0,f =a.length;if (d && !l.test(b)) {b = b.toLowerCase();for (; e < f; e++){c = a[e];if (c) {var g =c.parentNode;a[e] = g.nodeName.toLowerCase() === b?g:!1;}}} else {for (; e < f; e++){c = a[e],c && (a[e] = d?c.parentNode:c.parentNode === b);}d && m.filter(b,a,!0);}},"":function (a,b,c){var d,f =e++,g =x;typeof b == "string" && !l.test(b) && (b = b.toLowerCase(),d = b,g = w),g("parentNode",b,f,a,d,c);},"~":function (a,b,c){var d,f =e++,g =x;typeof b == "string" && !l.test(b) && (b = b.toLowerCase(),d = b,g = w),g("previousSibling",b,f,a,d,c);}},find:{ID:function (a,b,c){if (typeof b.getElementById != "undefined" && !c) {var d =b.getElementById(a[1]);return d && d.parentNode?[d]:[];}},NAME:function (a,b){if (typeof b.getElementsByName != "undefined") {var c =[],d =b.getElementsByName(a[1]);var e =0,f =d.length;for (; e < f; e++){d[e].getAttribute("name") === a[1] && c.push(d[e]);}return c.length === 0?null:c;}},TAG:function (a,b){if (typeof b.getElementsByTagName != "undefined") {return b.getElementsByTagName(a[1]);}}},preFilter:{CLASS:function (a,b,c,d,e,f){a = " " + a[1].replace(j,"") + " ";if (f) {return a;}var g =0,h;for (; (h = b[g]) != null; g++){h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g," ").indexOf(a) >= 0)?c || d.push(h):c && (b[g] = !1));}return !1;},ID:function (a){return a[1].replace(j,"");},TAG:function (a,b){return a[1].replace(j,"").toLowerCase();},CHILD:function (a){if (a[1] === "nth") {a[2] || m.error(a[0]),a[2] = a[2].replace(/^\+|\s*/g,"");var b =/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);a[2] = b[1] + (b[2] || 1) - 0,a[3] = b[3] - 0;} else {a[2] && m.error(a[0]);}a[0] = e++;return a;},ATTR:function (a,b,c,d,e,f){var g =a[1] = a[1].replace(j,"");!f && o.attrMap[g] && (a[1] = o.attrMap[g]),a[4] = (a[4] || a[5] || "").replace(j,""),a[2] === "~=" && (a[4] = " " + a[4] + " ");return a;},PSEUDO:function (b,c,d,e,f){if (b[1] === "not") {if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) {b[3] = m(b[3],null,null,c);} else {var g =m.filter(b[3],c,d,!0 ^ f);d || e.push.apply(e,g);return !1;}} else {if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) {return !0;}}return b;},POS:function (a){a.unshift(!0);return a;}},filters:{enabled:function (a){return a.disabled === !1 && a.type !== "hidden";},disabled:function (a){return a.disabled === !0;},checked:function (a){return a.checked === !0;},selected:function (a){a.parentNode && a.parentNode.selectedIndex;return a.selected === !0;},parent:function (a){return !!a.firstChild;},empty:function (a){return !a.firstChild;},has:function (a,b,c){return !!m(c[3],a).length;},header:function (a){return /h\d/i.test(a.nodeName);},text:function (a){var b =a.getAttribute("type"),c =a.type;return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null);},radio:function (a){return a.nodeName.toLowerCase() === "input" && "radio" === a.type;},checkbox:function (a){return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type;},file:function (a){return a.nodeName.toLowerCase() === "input" && "file" === a.type;},password:function (a){return a.nodeName.toLowerCase() === "input" && "password" === a.type;},submit:function (a){var b =a.nodeName.toLowerCase();return (b === "input" || b === "button") && "submit" === a.type;},image:function (a){return a.nodeName.toLowerCase() === "input" && "image" === a.type;},reset:function (a){var b =a.nodeName.toLowerCase();return (b === "input" || b === "button") && "reset" === a.type;},button:function (a){var b =a.nodeName.toLowerCase();return b === "input" && "button" === a.type || b === "button";},input:function (a){return /input|select|textarea|button/i.test(a.nodeName);},focus:function (a){return a === a.ownerDocument.activeElement;}},setFilters:{first:function (a,b){return b === 0;},last:function (a,b,c,d){return b === d.length - 1;},even:function (a,b){return b % 2 === 0;},odd:function (a,b){return b % 2 === 1;},lt:function (a,b,c){return b < c[3] - 0;},gt:function (a,b,c){return b > c[3] - 0;},nth:function (a,b,c){return c[3] - 0 === b;},eq:function (a,b,c){return c[3] - 0 === b;}},filter:{PSEUDO:function (a,b,c,d){var e =b[1],f =o.filters[e];if (f) {return f(a,c,b,d);}if (e === "contains") {return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;}if (e === "not") {var g =b[3];var h =0,i =g.length;for (; h < i; h++){if (g[h] === a) {return !1;}}return !0;}m.error(e);},CHILD:function (a,b){var c,e,f,g,h,i,j,k =b[1],l =a;switch (k) {case "only":;
case "first":while (l = l.previousSibling) {if (l.nodeType === 1) {return !1;}}if (k === "first") {return !0;}l = a;;
case "last":while (l = l.nextSibling) {if (l.nodeType === 1) {return !1;}}return !0;;
case "nth":c = b[2],e = b[3];if (c === 1 && e === 0) {return !0;}f = b[0],g = a.parentNode;if (g && (g[d] !== f || !a.nodeIndex)) {i = 0;for (l = g.firstChild; l; l = l.nextSibling){l.nodeType === 1 && (l.nodeIndex = ++i);}g[d] = f;}j = a.nodeIndex - e;return c === 0?j === 0:j % c === 0 && j / c >= 0;;}},ID:function (a,b){return a.nodeType === 1 && a.getAttribute("id") === b;},TAG:function (a,b){return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b;},CLASS:function (a,b){return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1;},ATTR:function (a,b){var c =b[1],d =m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c] != null?a[c]:a.getAttribute(c),e =d + "",f =b[2],g =b[4];return d == null?f === "!=":!f && m.attr?d != null:f === "="?e === g:f === "*="?e.indexOf(g) >= 0:f === "~="?(" " + e + " ").indexOf(g) >= 0:g?f === "!="?e !== g:f === "^="?e.indexOf(g) === 0:f === "$="?e.substr(e.length - g.length) === g:f === "|="?e === g || e.substr(0,g.length + 1) === g + "-":!1:e && d !== !1;},POS:function (a,b,c,d){var e =b[2],f =o.setFilters[e];if (f) {return f(a,c,b,d);}}}},p =o.match.POS,q =function (a,b){return "\\" + (b - 0 + 1);};var r;
for (r in o.match) {
  o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g,q));
}o.match.globalPOS = p;var s =function (a,b){a = Array.prototype.slice.call(a,0);if (b) {b.push.apply(b,a);return b;}return a;};try {Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType;} catch (t) {s = function (a,b){var c =0,d =b || [];if (g.call(a) === "[object Array]") {Array.prototype.push.apply(d,a);} else {if (typeof a.length == "number") {var e =a.length;for (; c < e; c++){d.push(a[c]);}} else {for (; a[c]; c++){d.push(a[c]);}}}return d;};}var u,v;c.documentElement.compareDocumentPosition?u = function (a,b){if (a === b) {h = !0;return 0;}if (!a.compareDocumentPosition || !b.compareDocumentPosition) {return a.compareDocumentPosition?-1:1;}return a.compareDocumentPosition(b) & 4?-1:1;}:(u = function (a,b){if (a === b) {h = !0;return 0;}if (a.sourceIndex && b.sourceIndex) {return a.sourceIndex - b.sourceIndex;}var c,d,e =[],f =[],g =a.parentNode,i =b.parentNode,j =g;if (g === i) {return v(a,b);}if (!g) {return -1;}if (!i) {return 1;}while (j) {e.unshift(j),j = j.parentNode;}j = i;while (j) {f.unshift(j),j = j.parentNode;}c = e.length,d = f.length;var k =0;for (; k < c && k < d; k++){if (e[k] !== f[k]) {return v(e[k],f[k]);}}return k === c?v(a,f[k],-1):v(e[k],b,1);},v = function (a,b,c){if (a === b) {return c;}var d =a.nextSibling;while (d) {if (d === b) {return -1;}d = d.nextSibling;}return 1;}),function (){var a =c.createElement("div"),d ="script" + new Date().getTime(),e =c.documentElement;a.innerHTML = "<a name='" + d + "'/>",e.insertBefore(a,e.firstChild),c.getElementById(d) && (o.find.ID = function (a,c,d){if (typeof c.getElementById != "undefined" && !d) {var e =c.getElementById(a[1]);return e?e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1]?[e]:b:[];}},o.filter.ID = function (a,b){var c =typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");return a.nodeType === 1 && c && c.nodeValue === b;}),e.removeChild(a),e = (a = null);}(),function (){var a =c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a,b){var c =b.getElementsByTagName(a[1]);if (a[1] === "*") {var d =[];var e =0;for (; c[e]; e++){c[e].nodeType === 1 && d.push(c[e]);}c = d;}return c;}),a.innerHTML = "<a href='#'></a>",a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a){return a.getAttribute("href",2);}),a = null;}(),c.querySelectorAll && function (){var a =m,b =c.createElement("div"),d ="__sizzle__";b.innerHTML = "<p class='TEST'></p>";if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {m = function (b,e,f,g){e = e || c;if (!g && !m.isXML(e)) {var h =/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if (h && (e.nodeType === 1 || e.nodeType === 9)) {if (h[1]) {return s(e.getElementsByTagName(b),f);}if (h[2] && o.find.CLASS && e.getElementsByClassName) {return s(e.getElementsByClassName(h[2]),f);}}if (e.nodeType === 9) {if (b === "body" && e.body) {return s([e.body],f);}if (h && h[3]) {var i =e.getElementById(h[3]);if (!i || !i.parentNode) {return s([],f);}if (i.id === h[3]) {return s([i],f);}}try {return s(e.querySelectorAll(b),f);} catch (j) {}} else {if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {var k =e,l =e.getAttribute("id"),n =l || d,p =e.parentNode,q =/^\s*[+~]/.test(b);l?n = n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q && p && (e = e.parentNode);try {if (!q || p) {return s(e.querySelectorAll("[id='" + n + "'] " + b),f);}} catch (r) {
} finally {
  l || k.removeAttribute("id");
}}}}return a(b,e,f,g);};var e;for (e in a) {
                                m[e] = a[e];
}b = null;}}(),function (){var a =c.documentElement,b =a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;if (b) {var d =!b.call(c.createElement("div"),"div"),e =!1;try {b.call(c.documentElement,"[test!='']:sizzle");} catch (f) {e = !0;}m.matchesSelector = function (a,c){c = c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if (!m.isXML(a)) {try {if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {var f =b.call(a,c);if (f || !d || a.document && a.document.nodeType !== 11) {return f;}}} catch (g) {}}return m(c,null,null,[a]).length > 0;};}}(),function (){var a =c.createElement("div");a.innerHTML = "<div class='test e'></div><div class='test'></div>";if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {a.lastChild.className = "e";if (a.getElementsByClassName("e").length === 1) {return;}o.order.splice(1,0,"CLASS"),o.find.CLASS = function (a,b,c){if (typeof b.getElementsByClassName != "undefined" && !c) {return b.getElementsByClassName(a[1]);}},a = null;}}(),c.documentElement.contains?m.contains = function (a,b){return a !== b && (a.contains?a.contains(b):!0);}:c.documentElement.compareDocumentPosition?m.contains = function (a,b){return !!(a.compareDocumentPosition(b) & 16);}:m.contains = function (){return !1;},m.isXML = function (a){var b =(a?a.ownerDocument || a:0).documentElement;return b?b.nodeName !== "HTML":!1;};var y =function (a,b,c){var d,e =[],f ="",g =b.nodeType?[b]:b;while (d = o.match.PSEUDO.exec(a)) {f += d[0],a = a.replace(o.match.PSEUDO,"");}a = o.relative[a]?a + "*":a;var h =0,i =g.length;for (; h < i; h++){m(a,g[h],e,c);}return m.filter(f,e);};m.attr = f.attr,m.selectors.attrMap = {},f.find = m,f.expr = m.selectors,f.expr[":"] = f.expr.filters,f.unique = m.uniqueSort,f.text = m.getText,f.isXMLDoc = m.isXML,f.contains = m.contains;}();var L =/Until$/,M =/^(?:parents|prevUntil|prevAll)/,N =/,/,O =/^.[^:#\[\.,]*$/,P =Array.prototype.slice,Q =f.expr.match.globalPOS,R ={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function (a){var b =this,c,d;if (typeof a != "string") {return f(a).filter(function (){for (c = 0,d = b.length; c < d; c++){if (f.contains(b[c],this)) {return !0;}}});}var e =this.pushStack("","find",a),g,h,i;for (c = 0,d = this.length; c < d; c++){g = e.length,f.find(a,this[c],e);if (c > 0) {for (h = g; h < e.length; h++){for (i = 0; i < g; i++){if (e[i] === e[h]) {e.splice(h--,1);
break;}}}}}return e;},has:function (a){var b =f(a);return this.filter(function (){var a =0,c =b.length;for (; a < c; a++){if (f.contains(this,b[a])) {return !0;}}});},not:function (a){return this.pushStack(T(this,a,!1),"not",a);},filter:function (a){return this.pushStack(T(this,a,!0),"filter",a);},is:function (a){return !!a && (typeof a == "string"?Q.test(a)?f(a,this.context).index(this[0]) >= 0:f.filter(a,this).length > 0:this.filter(a).length > 0);},closest:function (a,b){var c =[],d,e,g =this[0];if (f.isArray(a)) {var h =1;while (g && g.ownerDocument && g !== b) {for (d = 0; d < a.length; d++){f(g).is(a[d]) && c.push({selector:a[d],elem:g,level:h});}g = g.parentNode,h++;}return c;}var i =Q.test(a) || typeof a != "string"?f(a,b || this.context):0;for (d = 0,e = this.length; d < e; d++){g = this[d];while (g) {if (i?i.index(g) > -1:f.find.matchesSelector(g,a)) {c.push(g);
break;}g = g.parentNode;if (!g || !g.ownerDocument || g === b || g.nodeType === 11) {
break;}}}c = c.length > 1?f.unique(c):c;return this.pushStack(c,"closest",a);},index:function (a){if (!a) {return this[0] && this[0].parentNode?this.prevAll().length:-1;}if (typeof a == "string") {return f.inArray(this[0],f(a));}return f.inArray(a.jquery?a[0]:a,this);},add:function (a,b){var c =typeof a == "string"?f(a,b):f.makeArray(a && a.nodeType?[a]:a),d =f.merge(this.get(),c);return this.pushStack(S(c[0]) || S(d[0])?d:f.unique(d));},andSelf:function (){return this.add(this.prevObject);}}),f.each({parent:function (a){var b =a.parentNode;return b && b.nodeType !== 11?b:null;},parents:function (a){return f.dir(a,"parentNode");},parentsUntil:function (a,b,c){return f.dir(a,"parentNode",c);},next:function (a){return f.nth(a,2,"nextSibling");},prev:function (a){return f.nth(a,2,"previousSibling");},nextAll:function (a){return f.dir(a,"nextSibling");},prevAll:function (a){return f.dir(a,"previousSibling");},nextUntil:function (a,b,c){return f.dir(a,"nextSibling",c);},prevUntil:function (a,b,c){return f.dir(a,"previousSibling",c);},siblings:function (a){return f.sibling((a.parentNode || {}).firstChild,a);},children:function (a){return f.sibling(a.firstChild);},contents:function (a){return f.nodeName(a,"iframe")?a.contentDocument || a.contentWindow.document:f.makeArray(a.childNodes);}},function (a,b){f.fn[a] = function (c,d){var e =f.map(this,b,c);L.test(a) || (d = c),d && typeof d == "string" && (e = f.filter(d,e)),e = this.length > 1 && !R[a]?f.unique(e):e,(this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());return this.pushStack(e,a,P.call(arguments).join(","));};}),f.extend({filter:function (a,b,c){c && (a = ":not(" + a + ")");return b.length === 1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b);},dir:function (a,c,d){var e =[],g =a[c];while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) {g.nodeType === 1 && e.push(g),g = g[c];}return e;},nth:function (a,b,c,d){b = b || 1;var e =0;for (; a; a = a[c]){if (a.nodeType === 1 && ++e === b) {
break;}}return a;},sibling:function (a,b){var c =[];for (; a; a = a.nextSibling){a.nodeType === 1 && a !== b && c.push(a);}return c;}});var V ="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W =/ jQuery\d+="(?:\d+|null)"/g,X =/^\s+/,Y =/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z =/<([\w:]+)/,$ =/<tbody/i,_ =/<|&#?\w+;/,ba =/<(?:script|style)/i,bb =/<(?:script|object|embed|option|style)/i,bc =new RegExp("<(?:" + V + ")[\\s/>]","i"),bd =/checked\s*(?:[^=]|=\s*.checked.)/i,be =/\/(java|ecma)script/i,bf =/^\s*<!(?:\[CDATA\[|\-\-)/,bg ={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh =U(c);bg.optgroup = bg.option,bg.tbody = (bg.tfoot = (bg.colgroup = (bg.caption = bg.thead))),bg.th = bg.td,f.support.htmlSerialize || (bg._default = [1,"div<div>","</div>"]),f.fn.extend({text:function (a){return f.access(this,function (a){return a === b?f.text(this):this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));},null,a,arguments.length);},wrapAll:function (a){if (f.isFunction(a)) {return this.each(function (b){f(this).wrapAll(a.call(this,b));});}if (this[0]) {var b =f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode && b.insertBefore(this[0]),b.map(function (){var a =this;while (a.firstChild && a.firstChild.nodeType === 1) {a = a.firstChild;}return a;}).append(this);}return this;},wrapInner:function (a){if (f.isFunction(a)) {return this.each(function (b){f(this).wrapInner(a.call(this,b));});}return this.each(function (){var b =f(this),c =b.contents();c.length?c.wrapAll(a):b.append(a);});},wrap:function (a){var b =f.isFunction(a);return this.each(function (c){f(this).wrapAll(b?a.call(this,c):a);});},unwrap:function (){return this.parent().each(function (){f.nodeName(this,"body") || f(this).replaceWith(this.childNodes);}).end();},append:function (){return this.domManip(arguments,!0,function (a){this.nodeType === 1 && this.appendChild(a);});},prepend:function (){return this.domManip(arguments,!0,function (a){this.nodeType === 1 && this.insertBefore(a,this.firstChild);});},before:function (){if (this[0] && this[0].parentNode) {return this.domManip(arguments,!1,function (a){this.parentNode.insertBefore(a,this);});}if (arguments.length) {var a =f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments);}},after:function (){if (this[0] && this[0].parentNode) {return this.domManip(arguments,!1,function (a){this.parentNode.insertBefore(a,this.nextSibling);});}if (arguments.length) {var a =this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a;}},remove:function (a,b){var c =0,d;for (; (d = this[c]) != null; c++){if (!a || f.filter(a,[d]).length) {!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode && d.parentNode.removeChild(d);}}return this;},empty:function (){var a =0,b;for (; (b = this[a]) != null; a++){b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));while (b.firstChild) {b.removeChild(b.firstChild);}}return this;},clone:function (a,b){a = a == null?!1:a,b = b == null?a:b;return this.map(function (){return f.clone(this,a,b);});},html:function (a){return f.access(this,function (a){var c =this[0] || {},d =0,e =this.length;if (a === b) {return c.nodeType === 1?c.innerHTML.replace(W,""):null;}if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["",""])[1].toLowerCase()]) {a = a.replace(Y,"<$1></$2>");try {for (; d < e; d++){c = this[d] || {},c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")),c.innerHTML = a);}c = 0;} catch (g) {}}c && this.empty().append(a);},null,a,arguments.length);},replaceWith:function (a){if (this[0] && this[0].parentNode) {if (f.isFunction(a)) {return this.each(function (b){var c =f(this),d =c.html();c.replaceWith(a.call(this,b,d));});}typeof a != "string" && (a = f(a).detach());return this.each(function (){var b =this.nextSibling,c =this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a);});}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this;},detach:function (a){return this.remove(a,!0);},domManip:function (a,c,d){var e,g,h,i,j =a[0],k =[];if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) {return this.each(function (){f(this).domManip(a,c,d,!0);});}if (f.isFunction(j)) {return this.each(function (e){var g =f(this);a[0] = j.call(this,e,c?g.html():b),g.domManip(a,c,d);});}if (this[0]) {i = j && j.parentNode,f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length?e = {fragment:i}:e = f.buildFragment(a,this,k),h = e.fragment,h.childNodes.length === 1?g = (h = h.firstChild):g = h.firstChild;if (g) {c = c && f.nodeName(g,"tr");var l =0,m =this.length,n =m - 1;for (; l < m; l++){d.call(c?bi(this[l],g):this[l],e.cacheable || m > 1 && l < n?f.clone(h,!0,!0):h);}}k.length && f.each(k,function (a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf,"/*$0*/")),b.parentNode && b.parentNode.removeChild(b);});}return this;}}),f.buildFragment = function (a,b,d){var e,g,h,i,j =a[0];b && b[0] && (i = b[0].ownerDocument || b[0]),i.createDocumentFragment || (i = c),a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0,h = f.fragments[j],h && h !== 1 && (e = h)),e || (e = i.createDocumentFragment(),f.clean(a,i,e,d)),g && (f.fragments[j] = h?e:1);return {fragment:e,cacheable:g};},f.fragments = {},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function (a,b){f.fn[a] = function (c){var d =[],e =f(c),g =this.length === 1 && this[0].parentNode;if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {e[b](this[0]);return this;}var h =0,i =e.length;for (; h < i; h++){var j =(h > 0?this.clone(!0):this).get();f(e[h])[b](j),d = d.concat(j);}return this.pushStack(d,a,e.selector);};}),f.extend({clone:function (a,b,c){var d,e,g,h =f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">")?a.cloneNode(!0):bo(a);if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {bk(a,h),d = bl(a),e = bl(h);for (g = 0; d[g]; ++g){e[g] && bk(d[g],e[g]);}}if (b) {bj(a,h);if (c) {d = bl(a),e = bl(h);for (g = 0; d[g]; ++g){bj(d[g],e[g]);}}}d = (e = null);return h;},clean:function (a,b,d,e){var g,h,i,j =[];b = b || c,typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);var k =0,l;for (; (l = a[k]) != null; k++){typeof l == "number" && (l += "");if (!l) {
continue;}if (typeof l == "string") {if (!_.test(l)) {l = b.createTextNode(l);} else {l = l.replace(Y,"<$1></$2>");var m =(Z.exec(l) || ["",""])[1].toLowerCase(),n =bg[m] || bg._default,o =n[0],p =b.createElement("div"),q =bh.childNodes,r;b === c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML = n[1] + l + n[2];while (o--) {p = p.lastChild;}if (!f.support.tbody) {var s =$.test(l),t =m === "table" && !s?p.firstChild && p.firstChild.childNodes:n[1] === "<table>" && !s?p.childNodes:[];for (i = t.length - 1; i >= 0; --i){f.nodeName(t[i],"tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i]);}}!f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l = p.childNodes,p && (p.parentNode.removeChild(p),q.length > 0 && (r = q[q.length - 1],r && r.parentNode && r.parentNode.removeChild(r)));}}var u;if (!f.support.appendChecked) {if (l[0] && typeof (u = l.length) == "number") {for (i = 0; i < u; i++){bn(l[i]);}} else {bn(l);}}l.nodeType?j.push(l):j = f.merge(j,l);}if (d) {g = function (a){return !a.type || be.test(a.type);};for (k = 0; j[k]; k++){h = j[k];if (e && f.nodeName(h,"script") && (!h.type || be.test(h.type))) {e.push(h.parentNode?h.parentNode.removeChild(h):h);} else {if (h.nodeType === 1) {var v =f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k + 1,0].concat(v));}d.appendChild(h);}}}return j;},cleanData:function (a){var b,c,d =f.cache,e =f.event.special,g =f.support.deleteExpando;var h =0,i;for (; (i = a[h]) != null; h++){if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) {
continue;}c = i[f.expando];if (c) {b = d[c];if (b && b.events) {var j;
for (j in b.events) {
  e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);
}b.handle && (b.handle.elem = null);}g?delete i[f.expando]:i.removeAttribute && i.removeAttribute(f.expando),delete d[c];}}}});var bp =/alpha\([^)]*\)/i,bq =/opacity=([^)]*)/,br =/([A-Z]|^ms)/g,bs =/^[\-+]?(?:\d*\.)?\d+$/i,bt =/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu =/^([\-+])=([\-+.\de]+)/,bv =/^margin/,bw ={position:"absolute",visibility:"hidden",display:"block"},bx =["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css = function (a,c){return f.access(this,function (a,c,d){return d !== b?f.style(a,c,d):f.css(a,c);},a,c,arguments.length > 1);},f.extend({cssHooks:{opacity:{get:function (a,b){if (b) {var c =by(a,"opacity");return c === ""?"1":c;}return a.style.opacity;}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function (a,c,d,e){if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {var g,h,i =f.camelCase(c),j =a.style,k =f.cssHooks[i];c = f.cssProps[i] || i;if (d === b) {if (k && "get" in k && (g = k.get(a,!1,e)) !== b) {return g;}return j[c];}h = typeof d,h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a,c)),h = "number");if (d == null || h === "number" && isNaN(d)) {return;}h === "number" && !f.cssNumber[i] && (d += "px");if (!k || !("set" in k) || (d = k.set(a,d)) !== b) {try {j[c] = d;} catch (l) {}}}},css:function (a,c,d){var e,g;c = f.camelCase(c),g = f.cssHooks[c],c = f.cssProps[c] || c,c === "cssFloat" && (c = "float");if (g && "get" in g && (e = g.get(a,!0,d)) !== b) {return e;}if (by) {return by(a,c);}},swap:function (a,b,c){var d ={},e,f;
for (f in b) {
  d[f] = a.style[f],a.style[f] = b[f];
}e = c.call(a);for (f in b) {
                 a.style[f] = d[f];
}return e;}}),f.curCSS = f.css,c.defaultView && c.defaultView.getComputedStyle && (bz = function (a,b){var c,d,e,g,h =a.style;b = b.replace(br,"-$1").toLowerCase(),(d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a,null)) && (c = e.getPropertyValue(b),c === "" && !f.contains(a.ownerDocument.documentElement,a) && (c = f.style(a,b))),!f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width,h.width = c,c = e.width,h.width = g);return c;}),c.documentElement.currentStyle && (bA = function (a,b){var c,d,e,f =a.currentStyle && a.currentStyle[b],g =a.style;f == null && g && (e = g[b]) && (f = e),bt.test(f) && (c = g.left,d = a.runtimeStyle && a.runtimeStyle.left,d && (a.runtimeStyle.left = a.currentStyle.left),g.left = b === "fontSize"?"1em":f,f = g.pixelLeft + "px",g.left = c,d && (a.runtimeStyle.left = d));return f === ""?"auto":f;}),by = bz || bA,f.each(["height","width"],function (a,b){f.cssHooks[b] = {get:function (a,c,d){if (c) {return a.offsetWidth !== 0?bB(a,b,d):f.swap(a,bw,function (){return bB(a,b,d);});}},set:function (a,b){return bs.test(b)?b + "px":b;}};}),f.support.opacity || (f.cssHooks.opacity = {get:function (a,b){return bq.test((b && a.currentStyle?a.currentStyle.filter:a.style.filter) || "")?parseFloat(RegExp.$1) / 100 + "":b?"1":"";},set:function (a,b){var c =a.style,d =a.currentStyle,e =f.isNumeric(b)?"alpha(opacity=" + b * 100 + ")":"",g =d && d.filter || c.filter || "";c.zoom = 1;if (b >= 1 && f.trim(g.replace(bp,"")) === "") {c.removeAttribute("filter");if (d && !d.filter) {return;}}c.filter = bp.test(g)?g.replace(bp,e):g + " " + e;}}),f(function (){f.support.reliableMarginRight || (f.cssHooks.marginRight = {get:function (a,b){return f.swap(a,{display:"inline-block"},function (){return b?by(a,"margin-right"):a.style.marginRight;});}});}),f.expr && f.expr.filters && (f.expr.filters.hidden = function (a){var b =a.offsetWidth,c =a.offsetHeight;return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a,"display")) === "none";},f.expr.filters.visible = function (a){return !f.expr.filters.hidden(a);}),f.each({margin:"",padding:"",border:"Width"},function (a,b){f.cssHooks[a + b] = {expand:function (c){var d,e =typeof c == "string"?c.split(" "):[c],f ={};for (d = 0; d < 4; d++){f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];}return f;}};});var bC =/%20/g,bD =/\[\]$/,bE =/\r?\n/g,bF =/#.*$/,bG =/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH =/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI =/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ =/^(?:GET|HEAD)$/,bK =/^\/\//,bL =/\?/,bM =/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN =/^(?:select|textarea)/i,bO =/\s+/,bP =/([?&])_=[^&]*/,bQ =/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR =f.fn.load,bS ={},bT ={},bU,bV,bW =["*/"] + ["*"];try {bU = e.href;} catch (bX) {bU = c.createElement("a"),bU.href = "",bU = bU.href;}bV = bQ.exec(bU.toLowerCase()) || [],f.fn.extend({load:function (a,c,d){if (typeof a != "string" && bR) {return bR.apply(this,arguments);}if (!this.length) {return this;}var e =a.indexOf(" ");if (e >= 0) {var g =a.slice(e,a.length);a = a.slice(0,e);}var h ="GET";c && (f.isFunction(c)?(d = c,c = b):typeof c == "object" && (c = f.param(c,f.ajaxSettings.traditional),h = "POST"));var i =this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function (a,b,c){c = a.responseText,a.isResolved() && (a.done(function (a){c = a;}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d && i.each(d,[c,b,a]);}});return this;},serialize:function (){return f.param(this.serializeArray());},serializeArray:function (){return this.map(function (){return this.elements?f.makeArray(this.elements):this;}).filter(function (){return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type));}).map(function (a,b){var c =f(this).val();return c == null?null:f.isArray(c)?f.map(c,function (a,c){return {name:b.name,value:a.replace(bE,"\r\n")};}):{name:b.name,value:c.replace(bE,"\r\n")};}).get();}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function (a,b){f.fn[b] = function (a){return this.on(b,a);};}),f.each(["get","post"],function (a,c){f[c] = function (a,d,e,g){f.isFunction(d) && (g = g || e,e = d,d = b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g});};}),f.extend({getScript:function (a,c){return f.get(a,b,c,"script");},getJSON:function (a,b,c){return f.get(a,b,c,"json");},ajaxSetup:function (a,b){b?b$(a,f.ajaxSettings):(b = a,a = f.ajaxSettings),b$(a,b);return a;},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function (a,c){function w(a,c,l,m){if (s !== 2) {s = 2,q && clearTimeout(q),p = b,n = m || "",v.readyState = a > 0?4:0;var o,r,u,w =c,x =l?ca(d,v,l):b,y,z;if (a >= 200 && a < 300 || a === 304) {if (d.ifModified) {if (y = v.getResponseHeader("Last-Modified")) {f.lastModified[k] = y;}if (z = v.getResponseHeader("Etag")) {f.etag[k] = z;}}if (a === 304) {w = "notmodified",o = !0;} else {try {r = cb(d,x),w = "success",o = !0;} catch (A) {w = "parsererror",u = A;}}} else {u = w;if (!w || a) {w = "error",a < 0 && (a = 0);}}v.status = a,v.statusText = "" + (c || w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j = b,t && g.trigger("ajax" + (o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t && (g.trigger("ajaxComplete",[v,d]),--f.active || f.event.trigger("ajaxStop"));}}typeof a == "object" && (c = a,a = b),c = c || {};var d =f.ajaxSetup({},c),e =d.context || d,g =e !== d && (e.nodeType || e instanceof f)?f(e):f.event,h =f.Deferred(),i =f.Callbacks("once memory"),j =d.statusCode || {},k,l ={},m ={},n,o,p,q,r,s =0,t,u,v ={readyState:0,setRequestHeader:function (a,b){if (!s) {var c =a.toLowerCase();a = (m[c] = m[c] || a),l[a] = b;}return this;},getAllResponseHeaders:function (){return s === 2?n:null;},getResponseHeader:function (a){var c;if (s === 2) {if (!o) {o = {};while (c = bG.exec(n)) {o[c[1].toLowerCase()] = c[2];}}c = o[a.toLowerCase()];}return c === b?null:c;},overrideMimeType:function (a){s || (d.mimeType = a);return this;},abort:function (a){a = a || "abort",p && p.abort(a),w(0,a);return this;}};h.promise(v),v.success = v.done,v.error = v.fail,v.complete = i.add,v.statusCode = function (a){if (a) {var b;if (s < 2) {
for (b in a) {
  j[b] = [j[b],a[b]];
}} else {b = a[v.status],v.then(b,b);}}return this;},d.url = ((a || d.url) + "").replace(bF,"").replace(bK,bV[1] + "//"),d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO),d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()),d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:"?80:443)) == (bV[3] || (bV[1] === "http:"?80:443)))),d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data,d.traditional)),bZ(bS,d,c,v);if (s === 2) {return !1;}t = d.global,d.type = d.type.toUpperCase(),d.hasContent = !bJ.test(d.type),t && f.active++ === 0 && f.event.trigger("ajaxStart");if (!d.hasContent) {d.data && (d.url += (bL.test(d.url)?"&":"?") + d.data,delete d.data),k = d.url;if (d.cache === !1) {var x =f.now(),y =d.url.replace(bP,"$1_=" + x);d.url = y + (y === d.url?(bL.test(d.url)?"&":"?") + "_=" + x:"");}}(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type",d.contentType),d.ifModified && (k = k || d.url,f.lastModified[k] && v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k] && v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0] && d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*"?", " + bW + "; q=0.01":""):d.accepts["*"]);
for (u in d.headers) {
  v.setRequestHeader(u,d.headers[u]);
}if (d.beforeSend && (d.beforeSend.call(e,v,d) === !1 || s === 2)) {v.abort();return !1;}
for (u in {success:1,error:1,complete:1}) {
  v[u](d[u]);
}p = bZ(bT,d,c,v);if (!p) {w(-1,"No Transport");} else {v.readyState = 1,t && g.trigger("ajaxSend",[v,d]),d.async && d.timeout > 0 && (q = setTimeout(function (){v.abort("timeout");},d.timeout));try {s = 1,p.send(l,w);} catch (z) {if (s < 2) {w(-1,z);} else {
throw z;}}}return v;},param:function (a,c){var d =[],e =function (a,b){b = f.isFunction(b)?b():b,d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);};c === b && (c = f.ajaxSettings.traditional);if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) {f.each(a,function (){e(this.name,this.value);});} else {var g;
for (g in a) {
  b_(g,a[g],c,e);
}}return d.join("&").replace(bC,"+");}}),f.extend({active:0,lastModified:{},etag:{}});var cc =f.now(),cd =/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function (){return f.expando + "_" + cc++;}}),f.ajaxPrefilter("json jsonp",function (b,c,d){var e =typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {var g,h =b.jsonpCallback = f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i =a[h],j =b.url,k =b.data,l ="$1" + h + "$2";b.jsonp !== !1 && (j = j.replace(cd,l),b.url === j && (e && (k = k.replace(cd,l)),b.data === k && (j += (/\?/.test(j)?"&":"?") + b.jsonp + "=" + h))),b.url = j,b.data = k,a[h] = function (a){g = [a];},d.always(function (){a[h] = i,g && f.isFunction(i) && a[h](g[0]);}),b.converters["script json"] = function (){g || f.error(h + " was not called");return g[0];},b.dataTypes[0] = "json";return "script";}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function (a){f.globalEval(a);return a;}}}),f.ajaxPrefilter("script",function (a){a.cache === b && (a.cache = !1),a.crossDomain && (a.type = "GET",a.global = !1);}),f.ajaxTransport("script",function (a){if (a.crossDomain) {var d,e =c.head || c.getElementsByTagName("head")[0] || c.documentElement;return {send:function (f,g){d = c.createElement("script"),d.async = "async",a.scriptCharset && (d.charset = a.scriptCharset),d.src = a.url,d.onload = (d.onreadystatechange = function (a,c){if (c || !d.readyState || /loaded|complete/.test(d.readyState)) {d.onload = (d.onreadystatechange = null),e && d.parentNode && e.removeChild(d),d = b,c || g(200,"success");}}),e.insertBefore(d,e.firstChild);},abort:function (){d && d.onload(0,1);}};}});var ce =a.ActiveXObject?function (){var a;
for (a in cg) {
  cg[a](0,1);
}}:!1,cf =0,cg;f.ajaxSettings.xhr = a.ActiveXObject?function (){return !this.isLocal && ch() || ci();}:ch,function (a){f.extend(f.support,{ajax:!!a,cors:!!a && "withCredentials" in a});}(f.ajaxSettings.xhr()),f.support.ajax && f.ajaxTransport(function (c){if (!c.crossDomain || f.support.cors) {var d;return {send:function (e,g){var h =c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if (c.xhrFields) {
for (j in c.xhrFields) {
  h[j] = c.xhrFields[j];
}}c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType),!c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");try {
for (j in e) {
  h.setRequestHeader(j,e[j]);
}} catch (k) {}h.send(c.hasContent && c.data || null),d = function (a,e){var j,k,l,m,n;try {if (d && (e || h.readyState === 4)) {d = b,i && (h.onreadystatechange = f.noop,ce && delete cg[i]);if (e) {h.readyState !== 4 && h.abort();} else {j = h.status,l = h.getAllResponseHeaders(),m = {},n = h.responseXML,n && n.documentElement && (m.xml = n);try {m.text = h.responseText;} catch (a) {}try {k = h.statusText;} catch (o) {k = "";}!j && c.isLocal && !c.crossDomain?j = m.text?200:404:j === 1223 && (j = 204);}}} catch (p) {e || g(-1,p);}m && g(j,k,m,l);},!c.async || h.readyState === 4?d():(i = ++cf,ce && (cg || (cg = {},f(a).unload(ce)),cg[i] = d),h.onreadystatechange = d);},abort:function (){d && d(0,1);}};}});var cj ={},ck,cl,cm =/^(?:toggle|show|hide)$/,cn =/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp =[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function (a,b,c){var d,e;if (a || a === 0) {return this.animate(ct("show",3),a,b,c);}var g =0,h =this.length;for (; g < h; g++){d = this[g],d.style && (e = d.style.display,!f._data(d,"olddisplay") && e === "none" && (e = (d.style.display = "")),(e === "" && f.css(d,"display") === "none" || !f.contains(d.ownerDocument.documentElement,d)) && f._data(d,"olddisplay",cu(d.nodeName)));}for (g = 0; g < h; g++){d = this[g];if (d.style) {e = d.style.display;if (e === "" || e === "none") {d.style.display = f._data(d,"olddisplay") || "";}}}return this;},hide:function (a,b,c){if (a || a === 0) {return this.animate(ct("hide",3),a,b,c);}var d,e,g =0,h =this.length;for (; g < h; g++){d = this[g],d.style && (e = f.css(d,"display"),e !== "none" && !f._data(d,"olddisplay") && f._data(d,"olddisplay",e));}for (g = 0; g < h; g++){this[g].style && (this[g].style.display = "none");}return this;},_toggle:f.fn.toggle,toggle:function (a,b,c){var d =typeof a == "boolean";f.isFunction(a) && f.isFunction(b)?this._toggle.apply(this,arguments):a == null || d?this.each(function (){var b =d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]();}):this.animate(ct("toggle",3),a,b,c);return this;},fadeTo:function (a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d);},animate:function (a,b,c,d){function g(){e.queue === !1 && f._mark(this);var b =f.extend({},e),c =this.nodeType === 1,d =c && f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties = {};
for (i in a) {
  g = f.camelCase(i),i !== g && (a[g] = a[i],delete a[i]);if ((k = f.cssHooks[g]) && "expand" in k) {l = k.expand(a[g]),delete a[g];
  for (i in l) {
    i in a || (a[i] = l[i]);
  }}
}for (g in a) {
   h = a[g],f.isArray(h)?(b.animatedProperties[g] = h[1],h = (a[g] = h[0])):b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";if (h === "hide" && d || h === "show" && !d) {return b.complete.call(this);}c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display") === "inline" && f.css(this,"float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline"?this.style.display = "inline-block":this.style.zoom = 1));
}b.overflow != null && (this.style.overflow = "hidden");for (i in a) {
                                                          j = new (f.fx)(this,b,i),h = a[i],cm.test(h)?(q = f._data(this,"toggle" + i) || (h === "toggle"?d?"show":"hide":0),q?(f._data(this,"toggle" + i,q === "show"?"hide":"show"),j[q]()):j[h]()):(m = cn.exec(h),n = j.cur(),m?(o = parseFloat(m[2]),p = m[3] || (f.cssNumber[i]?"":"px"),p !== "px" && (f.style(this,i,(o || 1) + p),n = (o || 1) / j.cur() * n,f.style(this,i,n + p)),m[1] && (o = (m[1] === "-="?-1:1) * o + n),j.custom(n,o,p)):j.custom(n,h,""));
}return !0;}var e =f.speed(b,c,d);if (f.isEmptyObject(a)) {return this.each(e.complete,[!1]);}a = f.extend({},a);return e.queue === !1?this.each(g):this.queue(e.queue,g);},stop:function (a,c,d){typeof a != "string" && (d = c,c = a,a = b),c && a !== !1 && this.queue(a || "fx",[]);return this.each(function (){function h(a,b,c){var e =b[c];f.removeData(a,c,!0),e.stop(d);}var b,c =!1,e =f.timers,g =f._data(this);d || f._unmark(!0,this);if (a == null) {
for (b in g) {
  g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this,g,b);
}} else {g[b = a + ".run"] && g[b].stop && h(this,g,b);}for (b = e.length; b--; ){e[b].elem === this && (a == null || e[b].queue === a) && (d?e[b](!0):e[b].saveState(),c = !0,e.splice(b,1));}(!d || !c) && f.dequeue(this,a);});}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function (a,b){f.fn[a] = function (a,c,d){return this.animate(b,a,c,d);};}),f.extend({speed:function (a,b,c){var d =a && typeof a == "object"?f.extend({},a):{complete:c || !c && b || f.isFunction(a) && a,duration:a,easing:c && b || b && !f.isFunction(b) && b};d.duration = f.fx.off?0:typeof d.duration == "number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if (d.queue == null || d.queue === !0) {d.queue = "fx";}d.old = d.complete,d.complete = function (a){f.isFunction(d.old) && d.old.call(this),d.queue?f.dequeue(this,d.queue):a !== !1 && f._unmark(this);};return d;},easing:{linear:function (a){return a;},swing:function (a){return -Math.cos(a * Math.PI) / 2 + .5;}},timers:[],fx:function (a,b,c){this.options = b,this.elem = a,this.prop = c,b.orig = b.orig || {};}}),f.fx.prototype = {update:function (){this.options.step && this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop] || f.fx.step._default)(this);},cur:function (){if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {return this.elem[this.prop];}var a,b =f.css(this.elem,this.prop);return isNaN(a = parseFloat(b))?!b || b === "auto"?0:b:a;},custom:function (a,c,d){function h(a){return e.step(a);}var e =this,g =f.fx;this.startTime = cq || cr(),this.end = c,this.now = (this.start = a),this.pos = (this.state = 0),this.unit = d || this.unit || (f.cssNumber[this.prop]?"":"px"),h.queue = this.options.queue,h.elem = this.elem,h.saveState = function (){f._data(e.elem,"fxshow" + e.prop) === b && (e.options.hide?f._data(e.elem,"fxshow" + e.prop,e.start):e.options.show && f._data(e.elem,"fxshow" + e.prop,e.end));},h() && f.timers.push(h) && !co && (co = setInterval(g.tick,g.interval));},show:function (){var a =f._data(this.elem,"fxshow" + this.prop);this.options.orig[this.prop] = a || f.style(this.elem,this.prop),this.options.show = !0,a !== b?this.custom(this.cur(),a):this.custom(this.prop === "width" || this.prop === "height"?1:0,this.cur()),f(this.elem).show();},hide:function (){this.options.orig[this.prop] = f._data(this.elem,"fxshow" + this.prop) || f.style(this.elem,this.prop),this.options.hide = !0,this.custom(this.cur(),0);},step:function (a){var b,c,d,e =cq || cr(),g =!0,h =this.elem,i =this.options;if (a || e >= i.duration + this.startTime) {this.now = this.end,this.pos = (this.state = 1),this.update(),i.animatedProperties[this.prop] = !0;
for (b in i.animatedProperties) {
  i.animatedProperties[b] !== !0 && (g = !1);
}if (g) {i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["","X","Y"],function (a,b){h.style["overflow" + b] = i.overflow[a];}),i.hide && f(h).hide();if (i.hide || i.show) {
for (b in i.animatedProperties) {
  f.style(h,b,i.orig[b]),f.removeData(h,"fxshow" + b,!0),f.removeData(h,"toggle" + b,!0);
}}d = i.complete,d && (i.complete = !1,d.call(h));}return !1;}i.duration == Infinity?this.now = e:(c = e - this.startTime,this.state = c / i.duration,this.pos = f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now = this.start + (this.end - this.start) * this.pos),this.update();return !0;}},f.extend(f.fx,{tick:function (){var a,b =f.timers,c =0;for (; c < b.length; c++){a = b[c],!a() && b[c] === a && b.splice(c--,1);}b.length || f.fx.stop();},interval:13,stop:function (){clearInterval(co),co = null;},speeds:{slow:600,fast:200,_default:400},step:{opacity:function (a){f.style(a.elem,"opacity",a.now);},_default:function (a){a.elem.style && a.elem.style[a.prop] != null?a.elem.style[a.prop] = a.now + a.unit:a.elem[a.prop] = a.now;}}}),f.each(cp.concat.apply([],cp),function (a,b){b.indexOf("margin") && (f.fx.step[b] = function (a){f.style(a.elem,b,Math.max(0,a.now) + a.unit);});}),f.expr && f.expr.filters && (f.expr.filters.animated = function (a){return f.grep(f.timers,function (b){return a === b.elem;}).length;});var cv,cw =/^t(?:able|d|h)$/i,cx =/^(?:body|html)$/i;"getBoundingClientRect" in c.documentElement?cv = function (a,b,c,d){try {d = a.getBoundingClientRect();} catch (e) {}if (!d || !f.contains(c,a)) {return d?{top:d.top,left:d.left}:{top:0,left:0};}var g =b.body,h =cy(b),i =c.clientTop || g.clientTop || 0,j =c.clientLeft || g.clientLeft || 0,k =h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop,l =h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft,m =d.top + k - i,n =d.left + l - j;return {top:m,left:n};}:cv = function (a,b,c){var d,e =a.offsetParent,g =a,h =b.body,i =b.defaultView,j =i?i.getComputedStyle(a,null):a.currentStyle,k =a.offsetTop,l =a.offsetLeft;while ((a = a.parentNode) && a !== h && a !== c) {if (f.support.fixedPosition && j.position === "fixed") {
break;}d = i?i.getComputedStyle(a,null):a.currentStyle,k -= a.scrollTop,l -= a.scrollLeft,a === e && (k += a.offsetTop,l += a.offsetLeft,f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0,l += parseFloat(d.borderLeftWidth) || 0),g = e,e = a.offsetParent),f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0,l += parseFloat(d.borderLeftWidth) || 0),j = d;}if (j.position === "relative" || j.position === "static") {k += h.offsetTop,l += h.offsetLeft;}f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop,h.scrollTop),l += Math.max(c.scrollLeft,h.scrollLeft));return {top:k,left:l};},f.fn.offset = function (a){if (arguments.length) {return a === b?this:this.each(function (b){f.offset.setOffset(this,a,b);});}var c =this[0],d =c && c.ownerDocument;if (!d) {return null;}if (c === d.body) {return f.offset.bodyOffset(c);}return cv(c,d,d.documentElement);},f.offset = {bodyOffset:function (a){var b =a.offsetTop,c =a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a,"marginTop")) || 0,c += parseFloat(f.css(a,"marginLeft")) || 0);return {top:b,left:c};},setOffset:function (a,b,c){var d =f.css(a,"position");d === "static" && (a.style.position = "relative");var e =f(a),g =e.offset(),h =f.css(a,"top"),i =f.css(a,"left"),j =(d === "absolute" || d === "fixed") && f.inArray("auto",[h,i]) > -1,k ={},l ={},m,n;j?(l = e.position(),m = l.top,n = l.left):(m = parseFloat(h) || 0,n = parseFloat(i) || 0),f.isFunction(b) && (b = b.call(a,c,g)),b.top != null && (k.top = b.top - g.top + m),b.left != null && (k.left = b.left - g.left + n),"using" in b?b.using.call(a,k):e.css(k);}},f.fn.extend({position:function (){if (!this[0]) {return null;}var a =this[0],b =this.offsetParent(),c =this.offset(),d =cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top -= parseFloat(f.css(a,"marginTop")) || 0,c.left -= parseFloat(f.css(a,"marginLeft")) || 0,d.top += parseFloat(f.css(b[0],"borderTopWidth")) || 0,d.left += parseFloat(f.css(b[0],"borderLeftWidth")) || 0;return {top:c.top - d.top,left:c.left - d.left};},offsetParent:function (){return this.map(function (){var a =this.offsetParent || c.body;while (a && !cx.test(a.nodeName) && f.css(a,"position") === "static") {a = a.offsetParent;}return a;});}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function (a,c){var d =/Y/.test(c);f.fn[a] = function (e){return f.access(this,function (a,e,g){var h =cy(a);if (g === b) {return h?c in h?h[c]:f.support.boxModel && h.document.documentElement[e] || h.document.body[e]:a[e];}h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e] = g;},a,e,arguments.length,null);};}),f.each({Height:"height",Width:"width"},function (a,c){var d ="client" + a,e ="scroll" + a,g ="offset" + a;f.fn["inner" + a] = function (){var a =this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null;},f.fn["outer" + a] = function (a){var b =this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null;},f.fn[c] = function (a){return f.access(this,function (a,c,h){var i,j,k,l;if (f.isWindow(a)) {i = a.document,j = i.documentElement[d];return f.support.boxModel && j || i.body && i.body[d] || j;}if (a.nodeType === 9) {i = a.documentElement;if (i[d] >= i[e]) {return i[d];}return Math.max(a.body[e],i[e],a.body[g],i[g]);}if (h === b) {k = f.css(a,c),l = parseFloat(k);return f.isNumeric(l)?l:k;}f(a).css(c,h);},c,a,arguments.length,null);};}),a.jQuery = (a.$ = f),typeof define == "function" && define.amd && define.amd.jQuery && define("jquery",[],function (){return f;});})(window);


if (!Array.prototype.map) {Array.prototype.map = function (a){if (this === void 0 || this === null) {
throw new TypeError();}var b =Object(this),c =b.length >>> 0;if (typeof a !== "function") {
throw new TypeError();}var d =new Array(c),e =arguments[1],f =0;for (; f < c; f++){f in b && (d[f] = a.call(e,b[f],f,b));}return d;};}
if (!Array.prototype.forEach) {Array.prototype.forEach = function (a){if (this === void 0 || this === null) {
throw new TypeError();}var b =Object(this),c =b.length >>> 0;if (typeof a !== "function") {
throw new TypeError();}var d =arguments[1],e =0;for (; e < c; e++){e in b && a.call(d,b[e],e,b);}};}
if (!Array.prototype.reduce) {Array.prototype.reduce = function (a){var b;if (this === void 0 || this === null) {
throw new TypeError();}var c =Object(this),d =c.length >>> 0;if (typeof a !== "function") {
throw new TypeError();}if (d == 0 && arguments.length == 1) {throw new TypeError();}var e =0,f;if (arguments.length >= 2) {f = arguments[1];} else {
do {
  if (e in c) {f = c[e++];break;}if (++e >= d) {throw new TypeError();}
} while (true);}while (e < d) {e in c && (f = a.call(b,f,c[e],e,c));e++;}return f;};}

Array.prototype.append_sub = function (a,b){return this.concat(b.slice(a));};

Array.prototype.sub = function (a){return this.slice(0,a);};

Array.prototype.inArray = function (a){var b =0,c =this.length;for (; b < c; b++){if (a == this[b]) {return true;}}return false;};

if (!String.prototype.trim) {String.prototype.trim = function (){return this.replace(/^\s+|\s+$/g,"");};}


function _BT(a,b){console && console.error("[Opa]","Fatal error",a,b);}

function _BU(a,b){console && console.error("[Opa]",a,b);}

function _BV(a,b){console && console.warn("[Opa]",a,b);}

function _BW(a,b){console && console.log("[Opa]",a,b);}

function _BX(a,b){console && console.info("[Opa]",a,b);}

function _BY(a,b){console && console.log("[Opa]",a,b);}











function _BZ(a,b){b == 0 && _X("Exception : Division by zero");b = a / b;return b > 0?Math.floor(b):Math.ceil(b);}






function _Bb(a){return a.charCodeAt(0);}








function _Bc(a,b){if (a < b) {return -1;}if (a > b) {return 1;}return 0;}











function _Bd(a,b){_X(b + " @fail: " + a);}
var _Be = _z("fail");
var _Bf = _z("position");





var _Bg;
var jlog_with_colors =function (a,b,c){var d,e ="__internal__log";d = document.getElementById(e);if (!d) {var f ="position: absolute; right: 0px; top: 0px; z-index: 100; font-size: .7em; ";f += "background-color: " + b + "; color: " + a + "; width: 300px; border: 2px solid green; ";f += "white-space: nowrap; overflow-x: auto";a = document.createElement("div");a.setAttribute("style","float: right;");d = "'#" + e + "'";d = "<a onclick=\"(new jQuery(" + d + ")).remove()\">X</a>";a.innerHTML = d;d = document.createElement("div");d.setAttribute("style",f);d.setAttribute("id",e);d.appendChild(a);document.body.appendChild(d);}a = document.createElement("div");a.setAttribute("style","clear:both");a.appendChild(document.createTextNode(c));d.appendChild(a);};_Bg = function (a){jlog_with_colors("green","white",a);return _C;};
var _Bh;
var _Bi;
var _Bj;
var _Bk;
var _Bl;
_Bh = (_Bi = (_Bj = (_Bk = (_Bl = _Bg))));






var _Bm = {number:function (a,b){return "" + a;},string:function (a,b){return a;},object:function (a,b){if (a.toSource) {return a.toSource();} else {var c ="{ ",d;
for (d in a) {
  c += d + ": " + _Bn(a[d],b + 1) + ", ";
}c += "}";return c;}},"function":function (a,b){return a.toSource?a.toSource():"function() { ...}";},"boolean":function (a,b){return "" + a;}};

function _Bn(a,b){if (b > 100) {return "...DUMP...";}if (!a) {return "" + a;}var c =typeof a;return c in _Bm?_Bm[c](a,b):"" + a;}




var _Bo = _BG("lt");
var _Bp = _BG("eq");
var _Bq = _BG("neq");
var _Br = _BG("gt");




function _Bs(a,b){var d ="",c =0;for (; c < b; c++){d += a;}return d;}




function _Bt(a,b,c){return c.substr(a,b);}




function _Bu(a){if (a > 0xFFFF) {a -= 0x10000;return String.fromCharCode(0xD800 + (a >> 10),0xDC00 + (a & 0x3FF));} else {return String.fromCharCode(a);}}




function _Bv(a,b,c){var d;for (d = 0; d < c.length; d++){if (a[b + d] != c[d]) {return false;}}return true;}







function _Bw(a,b){if (a < b) {return _Bo;}if (a == b) {return _Bp;}return _Br;}




function _Bx(a){return a.length;}


function _By(a,b){return b;}


function _CA(a,b){return b;}

function _CB(a,b){return b + 1;}

function _CC(a,b,c){return a.substring(b,b + c);}

function _CD(a,b,c){return b >= 0 || b + c < a.length?_p(a.substring(b,b + c)):_o;}

function _CE(a,b){return a.charCodeAt(b);}

function _CF(a,b){return a.charCodeAt(b);}

function _CG(a){return String.fromCharCode(a);}

function _CH(a){return a.toUpperCase();}

function _CI(a){return a.toLowerCase();}






var _CJ = 0x0000000100000000;
var _CK = -0x0000000100000000;
var _CL = 0x00000000ffffffff;
var _CM = -0x0020000000000000;
var _CN = 0x001fffffffffffff;


var _CO = Math.pow(2,53);

function _CP(a){if (a.length < 2) {return parseInt(a,10);} else {var b =/^0x/;b = a.match(b);if (b != null) {return parseInt(a,16);} else {b = /^0o/;b = a.match(b);return b != null?parseInt(a,8):parseInt(a,10);}}}


function _CQ(a){return a < 0?Math.ceil(a):Math.floor(a);}

function _CR(a,b){if (a < _CK || a > _CL || b < _CK || b > _CL) {return NaN;}return a & b;}




function _CS(a,b){if (b >= 32 || a < _CK || a > _CL) {return NaN;}return a << b;}





function _CT(a,b){if (a < b) {return _Bo;}if (a == b) {return _Bp;}return _Br;}


function _CU(){return {h:NaN,l:NaN};}




function _CV(a){if (a >= 0 && a <= _CL) {return {h:0,l:a};};
if (a < 0 || a < _CM || a > _CN) {return _CU();};
var b =Math.floor(a / _CJ);a = a % _CJ;return {h:b,l:a};}


































function _CW(a){a = "" + a;return a.indexOf(".") >= 0 || a.indexOf("e") >= 0 || a[0] == "N" || a[0] == "I" || a[1] == "I"?a:a + ".0";}











function _CX(a,b){if (isNaN(a) || isNaN(b)) {return _Bq;}if (a < b) {return _Bo;}if (a == b) {return _Bp;}return _Br;}























function _CY(a){return Math.floor(Math.random() * a);}


function _CZ(a,b){var d ="",c =0;for (; c < b; ++c){d += a.charAt(Math.floor(Math.random() * a.length));}return d;}


function _Cb(a){var b ="abcdefghijklmnopqrstuvwxyz";return _CZ(b,a);}






function _Cc(){var a =new Date();return a.getTime();}











function _Cd(a){var b =new Date();b.setTime(a);return b.getMilliseconds();}

function _Ce(a){var b =new Date();b.setTime(a);return b.getSeconds();}

function _Cf(a){var b =new Date();b.setTime(a);return b.getMinutes();}

function _Cg(a){var b =new Date();b.setTime(a);return b.getHours();}

function _Ch(){var a =new Date();return a.getTimezoneOffset();}

function _Ci(a){var b =new Date();b.setTime(a);return b.getDate();}

function _Cj(a){var b =new Date();b.setTime(a);return b.getMonth();}

function _Ck(a){var b =new Date();b.setTime(a);return b.getFullYear();}

function _Cl(a){var b =new Date();b.setTime(a);return b.getDay();}










function _Cm(a){return a[0];}

function _Cn(a,b){a[0] = b;return _C;}




function _Co(){this.contents = [];this.length = 0;}
_Co.prototype = {opa_do_not_inspect:true};

function _Cp(a){return new _Co();}

function _Cq(a,b){a.contents.push(b);a.length = a.length + b.length;return _C;}


function _Cr(a){var b =a.contents;b = b.join("");a.contents = [b];return b;}


(function (a){if (!a.cssHooks) {_Cs("jQuery 1.4.3+ is needed for this plugin to work");return;}var b =document.createElement("div");a.support.transformOrigin = b.style.MozTransformOrigin === ""?"MozTransformOrigin":b.style.WebkitTransformOrigin === ""?"WebkitTransformOrigin":b.style.msTransformOrigin === ""?"msTransformOrigin":b.style.transformOrigin === ""?"TransformOrigin":false;a.support.transformOrigin && a.support.transformOrigin !== "TransformOrigin" && (a.cssHooks.transformOrigin = {get:function (c,d,e){return a.css(c,a.support.transformOrigin);},set:function (c,d){c.style[a.support.transformOrigin] = d;}});a.support.transform = b.style.MozTransform === ""?"MozTransform":b.style.WebkitTransform === ""?"WebkitTransform":b.style.msTransform === ""?"msTransform":b.style.transform === ""?"Transform":false;a.support.transform && a.support.transform !== "Transform" && (a.cssHooks.transform = {get:function (c,d,e){return a.css(c,a.support.transform);},set:function (c,d){c.style[a.support.transform] = d;}});b = null;})(jQuery);
(function (a){var b,c =a.fn.bind,d =a.fn.unbind,e =a.fn.keydown,f =a.fn.keypress;a.fn.extend({keydown:function (g){if (g) {var h =this;var i =function (l){h._latest_keydown = l.which;h._trigger_keydown = false;return g(l);};var j =function (l){if (!l.which && h._latest_keydown) {if (h._trigger_keydown) {l.type = "keydown";l.which = h._latest_keydown;l.stopPropagation();return h.trigger(l);} else {h._trigger_keydown = true;}}};var k =function (l){h._latest_keydown = null;};c.apply(this,["keyup",k]);c.apply(this,["keypress",j]);return c.apply(this,["keydown",i]);} else {return this.trigger("keydown");}},newline:function (g){if (g) {var h =function (i){if (i.keyCode == 13) {return g(i);}};c.apply(this,["keypress.newline",h]);c.apply(this,["newline",h]);return this;} else {return this.trigger("newline");}},keyesc:function (g){if (g) {var h =function (i){if (i.keyCode == 27) {return g(i);}};c.apply(this,["keypress.keyesc",h]);c.apply(this,["keyup.keyesc",h]);c.apply(this,["keydown.keyesc",h]);c.apply(this,["keyesc",h]);return this;} else {return this.trigger("keyesc");}},opachbind:function (g,h){function i(j){return h(_Ct(j));}return this.bind(g,i);},opabind:function (g,h,i,j,k){var l =g + "." + Math.random();function m(p){if (i != null) {var q =i(_Ct(p));if (q != null) {q.stop_propagation && p.stopPropagation();q.prevent_default && p.preventDefault();}}return h(_Ct(p));}var n =j?function (p){p.stopPropagation();m(p);}:m,o =k?function (p){p.preventDefault();n(p);}:n;this.special_bind(g,l,o);return l;},opaunbind:function (g,h){return this.unbind(g,h);},special_bind:function (g,h,i,j){switch (g) {case "keydown":return this.keydown(i);;
case "keydown.keyesc":return this.keyesc(i);;
case "keydown.newline":return this.newline(i);;default:return c.apply(this,[h,j,i]);}},bind:function (g,h,i){if (arguments.length === 2 || h === false) {i = h;h = b;}return this.special_bind(g,g,i,h);},unbind:function (g,h){switch (g) {case "keyesc":d.apply(this,[g,h]);d.apply(this,["keypress.keyesc",h]);d.apply(this,["keyup.keyesc",h]);d.apply(this,["keydown.keyesc",h]);return this;
break;;
case "newline":d.apply(this,[g,h]);d.apply(this,["keypress.newline",h]);return this;
break;;default:return d.apply(this,[g,h]);}},opa_do_not_normalize:true});})(jQuery);


var _Cu = _BG("alt");

var _Cv = _BG("ctrl");

var _Cw = _BG("meta");

var _Cx = _BG("shift");

var _Cy = _BG("left");

var _DA = _BG("middle");

var _DB = _BG("right");

var _DC = {click:_BG("click"),mouseup:_BG("mouseup"),mousedown:_BG("mousedown"),mouseover:_BG("mouseover"),mouseout:_BG("mouseout"),mousemove:_BG("mousemove"),mouseenter:_BG("mouseenter"),mouseleave:_BG("mouseleave"),dblclick:_BG("dblclick"),keypress:_BG("keypress"),keydown:_BG("keydown"),keyup:_BG("keyup"),load:_BG("load"),unload:_BG("unload"),error:_BG("error"),select:_BG("select"),submit:_BG("submit"),focus:_BG("focus"),blur:_BG("blur"),mousewheel:_BG("mousewheel"),scroll:_BG("scroll"),change:_BG("change"),resize:_BG("resize"),newline:_BG("newline"),keyesc:_BG("keyesc")};
_DC["keydown.newline"] = _DC.newline;
_DC["keydown.keyesc"] = _DC.keyesc;

var _B = _BK({kind:{custom:"none"},mouse_position_on_page:{x_px:0,y_px:0},key_code:_o,mouse_button:_o,key_modifiers:{nil:_C},value_change:_o});

function _Ct(a){var d =_BB();if (a == null) {return _B;}var b =a.pageX,c =a.pageY;b == null && (b = 0);c == null && (c = 0);c = _BK({x_px:b,y_px:c});_BC(d,"mouse_position_on_page",c);c = a.which;var e;if (isNaN(Number(c)) || c == null || c <= 0) {b = _o;e = null;} else {switch (c) {case 1:b = _o;e = _p(_Cy);
break;;
case 2:b = _o;e = _p(_DB);break;;
case 3:b = _o;e = _p(_DA);break;;default:b = _p(c);e = null;}}if (e == null) {e = a.wheelDelta;c = Number(a.detail);e = e?_p(_BH("wheel",e / 120)):isNaN(c)?_o:_p(_BH("wheel",-c / 3));}_BC(d,"key_code",b);_BC(d,"mouse_button",e);c = [];a.altKey && c.push(_Cu);a.ctrlKey && c.push(_Cv);a.metaKey && c.push(_Cw);a.shiftKey && c.push(_Cx);c = _BL(c);_BC(d,"key_modifiers",c);c = a.prevValue;b = a.newValue;if (c == null && b == null) {_BC(d,"value_change",_o);} else {c = "" + c;b = "" + b;e = _BB();_BC(e,"from",c);_BC(e,"to",b);_BC(d,"value_change",_p(_BD(e)));}c = a.type;c = _DC[c];_BC(d,"kind",c?c:_BH("custom","none"));return _BD(d);}

(function (a){var b =["DOMMouseScroll","mousewheel"];function c(d){var e =[].slice.call(arguments,1),f =0;d = jQuery.event.fix(d || window.event);d.type = "mousewheel";d.wheelDelta && (f = d.wheelDelta / 120);d.detail && (f = -d.detail / 3);e.unshift(d,f);d.wheelDelta = f;return jQuery.event.handle.apply(this,e);}jQuery.event.special.mousewheel = {setup:function (){if (this.addEventListener) {var d =b.length;for (; d; ){this.addEventListener(b[--d],c,false);}} else {this.onmousewheel = c;}},teardown:function (){if (this.removeEventListener) {var d =b.length;for (; d; ){this.removeEventListener(b[--d],c,false);}} else {this.onmousewheel = null;}}};a.fn.extend({mousewheel:function (d){return d?this.bind("mousewheel",d):this.trigger("mousewheel");},unmousewheel:function (d){return this.unbind("mousewheel",d);}});})(jQuery);












(function (a){var b =function (c){if (c.keyCode == 27) {c.preventDefault();c.stopPropagation();}};a(window).keypress(b);a(window).keyup(b);a(window).keydown(b);a(document).keypress(b);a(document).keyup(b);a(document).keydown(b);a(document.body).bind("ready",function (c){a(document.body).focus();});})(jQuery);

function _DD(){return _B;}







function _DE(a){return document.createTextNode(a);}


function _DF(a){var b =document.createElement("div"),c =document.createDocumentFragment();new $(b).html(a);while (a = b.firstChild) {c.appendChild(a);}return c;}

function _DG(a,b){return a?document.createElementNS(a,b):document.createElement(b);}

function _DH(){return document.createDocumentFragment();}

function _DI(a,b,c){a.setAttribute(b,c);}

function _DJ(a,b,c,d){b?a.setAttributeNS(b,c,d):a.setAttribute(c,d);}

function _DK(a,b,c){new $(a).opabind(b,c,null,false,false);}

function _DL(a,b,c){eval("var f = function(event) { " + c + " }");new $(a).opabind(b,f,null,false,false);}

function _DM(a,b){new $(a).bind(b,function (c){c.stopPropagation();});}

function _DN(a,b){new $(a).bind(b,function (c){c.preventDefault();});}


function _DO(a,b){a.appendChild?a.appendChild(b):new $(a).append($(b));}

function _DP(a,b){new $(a).addClass(b);}

function _DQ(){return new Array();}

function _DR(a,b,c,d){a.push(function (){new $(b).css(c,d);});}


function _DS(a,b){b.length != 0 && (a.opa_style = b);}

function _DT(a){a = a.opa_style;if (a != null) {while (a.length > 0) {a.pop()();}}}


function _DU(){return new Array();}

function _DV(a,b){a.push(b);}

function _DW(a,b){var c =function (){eval(b);};a.push(c);}

function _DX(a,b){b.length != 0 && (a.opa_insertion = b);}

function _DY(a){var b =a.opa_insertion;if (typeof b != "undefined") {delete a.opa_insertion;while (b.length > 0) {b.pop()();}}}

function _DZ(a){var b =a.get(),c,d =b.length;for (c = 0; c < d; ++c){a = b[c];_DT(a);_DY(a);}}



window.Node && Node.prototype && !Node.prototype.contains && (Node.prototype.contains = function (a){return !!(this.compareDocumentPosition(a) & 16);});









function _Db(){var a =document.cookie;if (a.length == 0) {return _o;}var b =/ic=([0-9a-zA-Z]{32})/;a = a.match(b);if (a != null) {return _p(a[1]);}return _o;}





(function (a){a.extend({opa_anchors_initialized:false,opa_history_handlers_keys:[],opa_history_handlers_implem:{},add_history_handler:function (b){var c =a.opa_history_handlers_implem,d =a.opa_history_handlers_keys;if (!a.opa_anchors_initialized) {function e(i){var j,k,l =d.length;for (k = 0; k < l; ++k){j = c[d[k]];j.call(j,i);}}if (window.history.pushState) {window.addEventListener("hashchange",function (i){e((window.location.hash || location.hash).replace(/^[^#]*#/,"").replace(/^#+|#+$/,""));},false);} else {var f ={hash:null};function g(){var i =f.hash,j =window.location.hash || location.hash;if (i != j) {f.hash = j;e(j.replace(/^[^#]*#/,"").replace(/^#+|#+$/,""));}}window.setInterval(g,200);}a.opa_anchors_initialized = true;}var h ="history/" + _Cb(32);d.push(h);c[h] = b;return function (){var i =d.indexOf(h);if (i == -1) {return;}d.splice(i,1);delete c[h];};},remove_history_handler:function (b){b();},opa_states_implem:null,push_state:function (b){var c =a.opa_states_implem;if (!c) {c = (a.opa_states_implem = {});a.add_history_handler(function (e){var f =c[e];if (f == null) {return;}f(e);});}var d ="position_" + _Cb(32);window.location.hash = d;a(window).trigger("hashchange");c[d] = b;return d;}});})(jQuery);













function _Cs(a){window.alert(a);}














function _Dc(a,b,c){a[b] = c;}

function _Dd(a,b){return a[b];}

function _De(a){return a.length;}

function _Df(a,b){var c =new Array(a);a--;for (; a >= 0; a--){c[a] = b;}return c;}


true && (global = this);


function _Dg(a){return new Array(a);}

function _Dh(a){return a.length;}

function _Di(a,b,c){a[b] = c;}

function _Dj(a,b){return a[b];}


function _Dk(a){a = global[a];return a == null?_o:_p(a);}

function _Dl(a){a = global[a];return typeof a != "undefined" && a.distant || false;}

function _Dm(a,b){a = a.split(",");var c =a.length;for (; c--; ){a[c] in global && (global[a[c]].distant = b);}}
function _Dn(a){var b;b = a.info;if (typeof b != "undefined") {return b.closure_name;}b = a.name;if (b) {return b;}return a.toString().match(/function *([^(]*)/)[1];}

function _Do(a){var b =a.info;if (typeof b != "undefined") {return _p(b);} else {b = _Dn(a);return global[b] == a?_p(_BH(_z("closure_name"),b)):_o;}}

function _Dp(a,b){a.info = b;}

function _Dq(a){a = a.opa_args;return a?a:[];}

function _Dr(a){a = a.opa_ty_args;return a?a:[];}


function _Ds(a,b,c){var d =function (){return a.call(null,arguments);};d.info = c;return d;}




function _Dt(a,b){return a.apply(null,b);}


function _Du(a,b,c){if (b.length == 0) {return a;} else {var d =a.apply(null,b);d.info = _BM(_Do(a));d.opa_args = b;d.opa_ty_args = c;return d;}}

























function _Dv(a){return _BN(_f(a));}











function _Dw(a,b){_n(a,b);return _C;}



var _Dx;
var global_cookie =_Db();global_cookie = "some" in global_cookie?global_cookie.some:"BADCOOKIE";_Dx = _p(_BK({key:{client:{client:global_cookie,page:page_server}},request:_o,details:{some:{locale:_BL([window.navigator.language]),browser:{environment:{Unidentified:_C},renderer:{Unidentified:_C}}}},constraint:{free:_C}}));



function _Dy(a){return _Dx;}








var _EA = _d(function (a){return;});




























var _EB = {};


function _EC(a,b){_EB[a] = b;return _C;}

function _ED(a){var b =_EB[a];if (_EB[a]) {return _p(b);}return _o;}

var _EE = {};
var _EF = {};
var _EG = {};
var _EH = {};



function _EI(a,b){_EE[a] = b;}

function _EJ(a){a = _EE[a];return typeof a == "undefined"?_o:_p(a);}

function _EK(a,b){_EF[a] = b;}

function _EL(a){a = _EF[a];return typeof a == "undefined"?_o:_p(a);}

function _EM(a,b){_EG[a] = b;}

function _EN(a){a = _EG[a];return typeof a == "undefined"?_o:_p(a);}

function _EO(a,b){_EH[a] = b;}

function _EP(a){a = _EH[a];return typeof a == "undefined"?_o:_p(a);}







function _EQ(a){return new $(a);}

function _ER(){return new $([]);}

function _ES(){return new $("*");}

function _ET(){return new $(document);}


function _EU(){return new $(window);}

function _EV(a){return new $(document.getElementById(a));}

function _EW(a){return new $("." + a);}

function _EX(a){return new $(a);}


function _EY(a){return a.children();}

function _EZ(a){return a.contents();}


function _Eb(a){return a.find("*");}

function _Ec(a,b){return b.find("#" + a);}

function _Ed(a,b){return b.find("." + a);}


function _Ee(a,b){return b.find(a);}















function _Ef(a){return a.size();}










function _Eg(a,b){var c =a.append(b);_DZ(a);_DZ(b);return c;}

function _Eh(a,b){var c =a.prepend(b);_DZ(a);_DZ(b);return c;}




function _Ei(a,b){a.empty();var c =a.append(b);_DZ(a);_DZ(b);return c;}





function _Ej(a){var b ={value:""},c =function (d){d = a.val();if (d == "" || d == null) {return;}b.value = b.value + d;};a.each(c);return b.value;}

function _Ek(a,b){a.val(b);}



























function _El(a,b,c){a.prop(b,c);}


function _Em(a,b,c){a.css(b,c);}










function _En(a,b){a.addClass(b);}

function _Eo(a,b){a.removeClass(b);}




























function _Ep(a,b){this.hash = typeof a != "undefined"?a:function (c){return c;};this.equal = typeof b != "undefined"?b:function (c,d){return c == d;};this.size = 0;this.entries = {};}
_Ep.prototype.clear = function (){this.entries = {};this.size = 0;};
_Ep.prototype.put = function (a,b){var c =this.entries,d =this.hash(a),e =c[d];if (typeof e == "undefined") {c[d] = [{key:a,value:b}];this.size++;return;}var f;
for (f in e) {
  var g =e[f];if (this.equal(g.key,a)) {g.value = b;return;}
}this.size++;e.push({key:a,value:b});return;};
_Ep.prototype.get = function (a){var b =this.entries,c =this.hash(a),d =b[c];if (typeof d == "undefined") {return;}var e;
for (e in d) {
  var f =d[e];if (this.equal(f.key,a)) {return f.value;}
}return;};
_Ep.prototype.remove = function (a){var b =this.entries,c =this.hash(a),d =b[c];if (typeof d == "undefined") {return;}var e;
for (e in d) {
  var f =d[e];if (this.equal(f.key,a)) {delete d[e];d.length == 0 && delete b[c];this.size--;return;}
}return;};
_Ep.prototype.containsKey = function (a){return typeof this.get(a) != "undefined";};
_Ep.prototype.values = function (){var a =this.entries,b =new Array(this.size),c =0,d;
for (d in a) {
  var e =a[d],f;for (f in e) {
                  b[c++] = e[f];
  }
}return b;};

function _Eq(){this.entries = {};this.size = 0;}
_Eq.prototype.clear = function (){this.entries = {};this.size = 0;};
_Eq.prototype.put = function (a,b){var c =this.entries[a];typeof c == "undefined" && this.size++;this.entries[a] = b;return;};
_Eq.prototype.get = function (a){return this.entries[a];};
_Eq.prototype.remove = function (a){var b =this.entries[a];typeof b != "undefined" && this.size--;delete this.entries[a];};
_Eq.prototype.containsKey = function (a){return typeof this.get(a) != "undefined";};
_Eq.prototype.values = function (){var a =new Array(this.size),b =this.entries,c =0,d;
for (d in b) {
  a[c++] = {key:d,value:b[d]};
}return a;};


function _Er(a,b,c){return new _Ep(a,b);}

function _Es(a){return new _Eq();}


function _Et(a,b,c){a.put(b,c);return _C;}

function _Eu(a,b,c){a.put(b,c);return _C;}

function _Ev(a,b){b = a.get(b);return b != null?_p(b):_o;}

function _Ew(a,b){a.remove(b);return _C;}



function _Ex(a){return a.values();}
function _Ey(x0,x1){var by_ret;return by_ret = _Cq(x0,x1),by_ret,_C;}
function _FA(x0,x1,x2){var by_ret;return by_ret = _Di(x0,x1,x2),by_ret,_C;}
function _FB(x0,x1){var by_ret;return by_ret = _Dp(x0,x1),by_ret,_C;}
function _FC(x0,x1){var by_ret;return by_ret = _Dw(x0,x1),by_ret,_C;}
function _FD(x0,x1){var by_ret;return by_ret = _Z(x0,x1),by_ret,_C;}
function _FE(x0,x1,x2){var by_ret;return by_ret = _Et(x0,x1,x2),by_ret,_C;}
function _FF(x0,x1){var by_ret;return by_ret = _Ew(x0,x1),by_ret,_C;}
function _FG(x0,x1,x2){var by_ret;return by_ret = _Eu(x0,x1,x2),by_ret,_C;}
function _FH(x0,x1){var by_ret;return by_ret = _Cn(x0,x1),by_ret,_C;}
function _FI(x0,x1){var by_ret;return by_ret = _EK(x0,x1),by_ret,_C;}
function _FJ(x0,x1){var by_ret;return by_ret = _EM(x0,x1),by_ret,_C;}
function _FK(x0,x1){var by_ret;return by_ret = _EI(x0,x1),by_ret,_C;}
function _FL(x0,x1){var by_ret;return by_ret = _EO(x0,x1),by_ret,_C;}
function _FM(x0,x1,x2){var by_ret;return by_ret = _Dc(x0,x1,x2),by_ret,_C;}
_Dm("___jlog_ec6de8cf,___unary_minus_dot_ec6de8cf,___pred_ec6de8cf,_LM,_LL,_LK,_LJ,_LI,_LH,___ServerReference_create_ec6de8cf,__v1_update_ec6de8cf,__v1_compare_and_swap_ec6de8cf,__v5_get_ec6de8cf,__v2_set_ec6de8cf,_LG,_LF,_LE,_LD,_LC,_LB,_LA,_Ky,_Kx,_Kw,_Kv,_Ku,_Kt,__v62_an_ec6de8cf,_Ks,___sort_with_order_ec6de8cf,___sort_with_ec6de8cf,_Kr,_Kq,_Kp,__v1_g_ec6de8cf,_Ko,_Kn,_Km,_Kl,_Kk,_Kj,_Ki,_Kh,_Kg,_Kf,_Ke,_Kd,_Kc,_Kb,_KZ,__v55_an_ec6de8cf,_KY,_KX,_KW,_KV,_KU,_KT,_KS,_KR,__v52_an_ec6de8cf,_KQ,_KP,_KO,_KN,_KM,_KL,_KK,_KJ,_KI,_KH,_KG,_KF,_KE,___square_i_ec6de8cf,__v1_floor_ec6de8cf,__v1_ceil_ec6de8cf,__v1_abs_ec6de8cf,_KD,_KC,__v2_of_int_ec6de8cf,__v1_succ_ec6de8cf,__v1_20638497_ec6de8cf,___div_ec6de8cf,___mul_ec6de8cf,__v3_sub_ec6de8cf,__v1_add_ec6de8cf,__v1_of_string_ec6de8cf,_KB,_KA,_Jy,_Jx,_Jw,_Jv,_Ju,_Jt,_Js,_Jr,_Jq,_Jp,_Jo,_Jn,_Jm,_Jl,_Jk,_Jj,_Ji,_Jh,_Jg,__v38_an_ec6de8cf,_Jf,_Je,__v37_an_ec6de8cf,_Jd,_Jc,_Jb,_JZ,_JY,_JX,___export_ec6de8cf,_JW,_JV,_JU,_JT,___field_of_type_field_ec6de8cf,_JS,_JR,_JQ,_JP,_JO,_JN,_JM,_JL,_JK,_JJ,_JI,_JH,_JG,_JF,_JE,_JD,_JC,_JB,_JA,_Iy,_Ix,__v26_an_ec6de8cf,_Iw,_Iv,_Iu,_It,_Is,_Ir,__v2_3389dae3_ec6de8cf,___of_byte_unsafe_ec6de8cf,___to_lower_ec6de8cf,__v1_make_ec6de8cf,___to_upper_ec6de8cf,_Iq,_Ip,_Io,___compare_raw_ec6de8cf,_In,_Im,_Il,_Ik,_Ij,_Ii,_Ih,_Ig,__v2_min_ec6de8cf,_If,_Ie,_Id,_Ic,_Ib,_IZ,_IY,_IX,_IW,_IV,_IU,_IT,_IS,_IR,_IQ,_IP,_IO,_IN,_IM,_IL,_IK,_IJ,_II,_IH,_IG,_IF,_IE,_ID,_IC,_IB,_IA,_Hy,_Hx,_Hw,_Hv,_Hu,_Ht,_Hs,_Hr,_Hq,__v2_max_ec6de8cf,__v2_compare_raw_ec6de8cf,_Hp,_Ho,__v2_de0219f9_ec6de8cf,__v1_de0219f9_ec6de8cf,_Hn,_Hm,_Hl,__v2_3a1e9b87_ec6de8cf,__v1_3a1e9b87_ec6de8cf,_Hk,__v2_524a5078_ec6de8cf,__v1_524a5078_ec6de8cf,_Hj,_Hi,__v2_20638497_ec6de8cf,__v3_equals_ec6de8cf,_Hh,_Hg,__v2_336d5ebc_ec6de8cf,__v2_a7eeaea9_ec6de8cf,__v1_a7eeaea9_ec6de8cf,_Hf,_He,_Hd,_Hc,_Hb,_HZ,_HY,_HX,_HW,_HV,_HU,_HT,_HS,_HR,_HQ,_HP,_HO,_HN,_HM,_HL,_HK,_HJ,_HI,_HH,_HG,_HF,_HE,_HD,_HC,_HB,_HA,_Gy,_Gx,_Gw,_Gv,_Gu,_Gt,_Gs,_Gr,_Gq,__v1_eq_ec6de8cf,_Gp,_Go,_Gn,_Gm,_Gl,_Gk,_Gj,_Gi,_Gh,_Gg,_Gf,_Ge,_Gd,__v5_compare_ec6de8cf,_Gc,_Gb,_GZ,_GY,_GX,_GW,_GV,_GU,_GT,__v2_compare_ec6de8cf,_GS,_GR,_GQ,_GP,__v11_get_ec6de8cf,_GO,_GN,_GM,_GL,_GK,_GJ,_GI,_GH,_GG,_GF,_GE,_GD,_GC,_GB,_GA,_Fy,_Fx,_Fw,_Fv,_Fu,_Ft,_Fs,_Fr,_Fq,_Fp,_Fo,_Fn,_Fm,_Fl,__v7_to_string_ec6de8cf,_Fk,_Fj,_Fi,__v2_26b17225_ec6de8cf,__v1_26b17225_ec6de8cf,__v1_7e6a2afe_ec6de8cf,_Fh,_Fg,__v2_cedf8da0_ec6de8cf,__v1_cedf8da0_ec6de8cf,_Ff,___stringsub_ec6de8cf,_Fe,_Fd,_Fc,_Fb,_FZ,_FY,_FX,_FW,_FV,_FU,_FT,_FS,_FR,___one_byte_ec6de8cf,_FQ,___identity_ec6de8cf,_FP,__v1_black_ec6de8cf,_FO,_FN");
var _LN = {nil:_C};
var _LO = {nil:_C};
var _LP = {nil:_C};
var _LQ = {nil:_C};
var _LR = {types:_LO,rows:_LP,cols:_LQ};
var _LS = {nil:_C};
var _LT = {TyRecord_row:_LS};
var _LU = {quantifier:_LR,body:_LT};
var _LV = {TyName_args:_LN,TyName_ident:"textavl"};
var _LW = {TyConst:{TyString:_C}};
var _LX = {hd:{label:"string",ty:_LW},tl:_LS};
var _LY = {hd:"'v-2",tl:_LO};
var _LZ = {hd:"'v-3",tl:_LY};
var _Lb = {hd:"'v-4",tl:_LZ};
var _Lc = {hd:"'v-5",tl:_Lb};
var _Ld = {types:_Lc,rows:_LP,cols:_LQ};
var _Le = {TyVar:"'v-2"};
var _Lf = {TyVar:"'v-3"};
var _Lg = {TyVar:"'v-4"};
var _Lh = {TyVar:"'v-5"};
var _Li = {types:_LZ,rows:_LP,cols:_LQ};
var _Lj = {hd:{label:"f2",ty:_Le},tl:_LS};
var _Lk = {hd:{label:"f1",ty:_Lf},tl:_Lj};
var _Ll = {TyRecord_row:_Lk};
var _Lm = {quantifier:_Li,body:_Ll};
var _Ln = {hd:_LV,tl:_LN};
var _Lo = {TyName_args:_Ln,TyName_ident:"list"};
var _Lp = {hd:{label:"empty",ty:_LT},tl:_LS};
var _Lq = {hd:{label:"value",ty:_LW},tl:_LS};
var _Lr = {TyConst:{TyInt:_C}};
var _Ls = {hd:{label:"sizetree",ty:_Lr},tl:_Lq};
var _Lt = {hd:{label:"sizetext",ty:_Lr},tl:_Ls};
var _Lu = {hd:{label:"right",ty:_LV},tl:_Lt};
var _Lv = {hd:{label:"left",ty:_LV},tl:_Lu};
var _Lw = {TySum_col:{hd:_Lp,tl:{hd:_Lv,tl:{nil:_C}}}};
var _Lx = {quantifier:_LR,body:_Lw};
var _Ly = {hd:{label:"textralist2",ty:_Lo},tl:_LS};
var _MA = {hd:{label:"textralist1",ty:_Lo},tl:_Ly};
var _MB = {TySum_col:{hd:_LX,tl:{hd:_MA,tl:{nil:_C}}}};
var _MC = {quantifier:_LR,body:_MB};
var _MD = {types:_LY,rows:_LP,cols:_LQ};
var _ME = {TyAbstract:_C};
var _MF = {quantifier:_MD,body:_ME};
var _MG = {hd:_Lf,tl:_LN};
var _MH = {hd:{label:"none",ty:_LT},tl:_LS};
var _MI = {hd:{label:"some",ty:_Le},tl:_LS};
var _MJ = {TySum_col:{hd:_MH,tl:{hd:_MI,tl:{nil:_C}}}};
var _MK = {quantifier:_MD,body:_MJ};
var _ML = {hd:_Le,tl:_LN};
var _MM = {TyName_args:_ML,TyName_ident:"list"};
var _MN = {hd:{label:"tl",ty:_MM},tl:_LS};
var _MO = {hd:{label:"hd",ty:_Le},tl:_MN};
var _MP = {hd:{label:"nil",ty:_LT},tl:_LS};
var _MQ = {TySum_col:{hd:_MO,tl:{hd:_MP,tl:{nil:_C}}}};
var _MR = {quantifier:_MD,body:_MQ};
var _MS = {hd:{label:"txt",ty:_LW},tl:_LS};
var _MT = {hd:{label:"pos",ty:_Lr},tl:_MS};
var _MU = {TyRecord_row:_MT};
var _MV = {quantifier:_LR,body:_MU};
var _MW = {quantifier:_LR,body:_ME};
var _MX = {hd:{label:"value",ty:_Le},tl:_LS};
var _MY = {hd:{label:"false",ty:_LT},tl:_LS};
var _MZ = {hd:{label:"true",ty:_LT},tl:_LS};
var _Mb = {TySum_col:{hd:_MY,tl:{hd:_MZ,tl:{nil:_C}}}};
var _Mc = {quantifier:_LR,body:_Mb};
var _Md = {quantifier:_LR,body:_Lr};
var _Me = {TyName_args:_LN,TyName_ident:"void"};
var _Mf = {quantifier:_LR,body:_LW};
var _Mg = {TyName_args:_LN,TyName_ident:"JsAst.ident"};
var _Mh = {quantifier:_LR,body:_Mg};
var _Mi = {TyName_args:_LN,TyName_ident:"bool"};
var _Mj = {hd:{label:"TyFloat",ty:_LT},tl:_LS};
var _Mk = {hd:{label:"TyInt",ty:_LT},tl:_LS};
var _Ml = {hd:{label:"TyString",ty:_LT},tl:_LS};
var _Mm = {TySum_col:{hd:_Mj,tl:{hd:_Mk,tl:{hd:_Ml,tl:{nil:_C}}}}};
var _Mn = {quantifier:_LR,body:_Mm};
var _Mo = {hd:{label:"TyAbstract",ty:_LT},tl:_LS};
var _Mp = {TyName_args:_LN,TyName_ident:"OpaType.ty"};
var _Mq = {hd:{label:"TyArrow_res",ty:_Mp},tl:_LS};
var _Mr = {hd:_Mp,tl:_LN};
var _Ms = {TyName_args:_Mr,TyName_ident:"list"};
var _Mt = {hd:{label:"TyArrow_params",ty:_Ms},tl:_Mq};
var _Mu = {TyName_args:_LN,TyName_ident:"OpaType.ty_const"};
var _Mv = {hd:{label:"TyConst",ty:_Mu},tl:_LS};
var _Mw = {TyName_args:_LN,TyName_ident:"OpaTsc.quantifier"};
var _Mx = {hd:{label:"TyForall_quant",ty:_Mw},tl:_LS};
var _My = {hd:{label:"TyForall_body",ty:_Mp},tl:_Mx};
var _NA = {TyName_args:_LN,TyName_ident:"OpaType.ty_ident"};
var _NB = {hd:{label:"TyName_ident",ty:_NA},tl:_LS};
var _NC = {hd:{label:"TyName_args",ty:_Ms},tl:_NB};
var _ND = {TyName_args:_LN,TyName_ident:"OpaType.fields"};
var _NE = {hd:{label:"TyRecord_row",ty:_ND},tl:_LS};
var _NF = {TyName_args:_LN,TyName_ident:"OpaType.rowvar"};
var _NG = {hd:{label:"TyRecord_rowvar",ty:_NF},tl:_LS};
var _NH = {hd:{label:"TyRecord_row",ty:_ND},tl:_NG};
var _NI = {hd:_ND,tl:_LN};
var _NJ = {TyName_args:_NI,TyName_ident:"list"};
var _NK = {hd:{label:"TySum_col",ty:_NJ},tl:_LS};
var _NL = {TyName_args:_LN,TyName_ident:"OpaType.colvar"};
var _NM = {hd:{label:"TySum_colvar",ty:_NL},tl:_LS};
var _NN = {hd:{label:"TySum_col",ty:_NJ},tl:_NM};
var _NO = {TyName_args:_LN,TyName_ident:"OpaType.typevar"};
var _NP = {hd:{label:"TyVar",ty:_NO},tl:_LS};
var _NQ = {TySum_col:{hd:_Mo,tl:{hd:_Mt,tl:{hd:_Mv,tl:{hd:_My,tl:{hd:_NC,tl:{hd:_NE,tl:{hd:_NH,tl:{hd:_NK,tl:{hd:_NN,tl:{hd:_NP,tl:{nil:_C}}}}}}}}}}}};
var _NR = {quantifier:_LR,body:_NQ};
var _NS = {TySum_col:{hd:_NE,tl:{hd:_NH,tl:{nil:_C}}}};
var _NT = {quantifier:_LR,body:_NS};
var _NU = {TyName_args:_LN,TyName_ident:"OpaType.field"};
var _NV = {hd:_NU,tl:_LN};
var _NW = {TyName_args:_NV,TyName_ident:"list"};
var _NX = {quantifier:_LR,body:_NW};
var _NY = {hd:{label:"ty",ty:_Mp},tl:_LS};
var _NZ = {TyName_args:_LN,TyName_ident:"OpaType.Field.label"};
var _Nb = {hd:{label:"label",ty:_NZ},tl:_NY};
var _Nc = {TyRecord_row:_Nb};
var _Nd = {quantifier:_LR,body:_Nc};
var _Ne = {TySum_col:{hd:_NK,tl:{hd:_NN,tl:{nil:_C}}}};
var _Nf = {quantifier:_LR,body:_Ne};
var _Ng = {hd:{label:"quantifier",ty:_Mw},tl:_LS};
var _Nh = {hd:{label:"body",ty:_Mp},tl:_Ng};
var _Ni = {TyRecord_row:_Nh};
var _Nj = {quantifier:_LR,body:_Ni};
var _Nk = {hd:_NO,tl:_LN};
var _Nl = {TyName_args:_Nk,TyName_ident:"list"};
var _Nm = {hd:{label:"types",ty:_Nl},tl:_LS};
var _Nn = {hd:_NF,tl:_LN};
var _No = {TyName_args:_Nn,TyName_ident:"list"};
var _Np = {hd:{label:"rows",ty:_No},tl:_Nm};
var _Nq = {hd:_NL,tl:_LN};
var _Nr = {TyName_args:_Nq,TyName_ident:"list"};
var _Ns = {hd:{label:"cols",ty:_Nr},tl:_Np};
var _Nt = {TyRecord_row:_Ns};
var _Nu = {quantifier:_LR,body:_Nt};
var _Nv = {TyName_args:_LN,TyName_ident:"OpaType.row"};
var _Nw = {TyName_args:_LN,TyName_ident:"OpaType.col"};
var _Nx = {hd:_LW,tl:_LN};
var _Ny = {TyName_args:_Nx,TyName_ident:"list"};
var _OA = {quantifier:_Li,body:_ME};
var _OB = _EC("void",_LU);
var _OC = _EC("tuple_2",_Lm);
var _OD = _EC("textavl",_Lx);
var _OE = _EC("text",_MC);
var _OF = _EC("option",_MK);
var _OG = _EC("list",_MR);
var _OH = _EC("itextrator",_MV);
var _OI = _EC("continuation",_MF);
var _OJ = _EC("bool",_Mc);
var _OK = _EC("black",_MW);
var _OL = _EC("OpaType.typevar",_Mf);
var _OM = _EC("OpaType.ty_ident",_Mf);
var _ON = _EC("OpaType.ty_const",_Mn);
var _OO = _EC("OpaType.ty",_NR);
var _OP = _EC("OpaType.rowvar",_Mf);
var _OQ = _EC("OpaType.row",_NT);
var _OR = _EC("OpaType.fields",_NX);
var _OS = _EC("OpaType.field",_Nd);
var _OT = _EC("OpaType.colvar",_Mf);
var _OU = _EC("OpaType.col",_Nf);
var _OV = _EC("OpaType.Field.label",_Mf);
var _OW = _EC("OpaTsc.t",_Nj);
var _OX = _EC("OpaTsc.quantifier",_Nu);
var _OY = _EC("JsAst.ident",_Mf);
function _FN(a,b){return _FH(a,b(_Cm(a)));}
function _FO(a){return a;}
var _OZ = _C;
function _FP(a,b){return a == b;}
function _FQ(a,b){return a + b;}
function _FR(a){return _Bx(a);}
function _FS(a){return _CH(a);}
function _FT(a){return _CI(a);}
function _FU(a,b,c){return _CC(a,b,c);}
function _FV(a,b,c){return _CD(a,b,c);}
function _FW(a,b){return _CE(a,b);}
function _FX(a,b){return _CF(a,b);}
function _FY(a,b){return _CB(a,b);}
function _FZ(a){return _CG(a);}
var _Ob = "Cactutf";
var _Oc = {empty:_C};
function _Fb(a){return (a = a.value,a == null)?"[ERROR into Textavl.value]":a;}
function _Fc(a){return (a = a.sizetree,a == null)?0:a;}
function _Fd(a){return (a = a.sizetext,a == null)?0:a;}
function _Fe(a,b,c,d,e){return {left:a,value:b,right:c,sizetree:d,sizetext:e};}
function _Ff(a,b){return a > b;}
function _Fg(a,b){var c;while (c = b.tl) {a(b.hd);b = c;}return _OZ;}
function _Fh(a,b,c){var e,d;while (d = b.tl) {e = b.hd;b = d;c = a(e,c);}return c;}
function _Fi(a){return function (b){return _Ey(a,b);};}
function _Fj(a,b){return a.length + b;}
function _Fk(a){var b;return b = _Cp(_Fh(_Fj,a,0)),_Fg(_Fi(b),a),_Cr(b);}
function _Fl(a){return a.nil?true:false;}
function _Fm(a,b,c){return function (d){var e;return (e = d.tl)?e.nil?c(d.hd,b):c(c(d.hd,a),_Fm(a,b,c)(e)):b;};}
function _Fn(a,b,c,d,e){return a(b,_Fm(d,c,a)(e));}
function _Fo(a,b,c,d){return _Fn(_FQ,a,b,c,d);}
function _Fp(a){return _Fo("[","]",", ",a);}
function _Fq(a){return a.TyInt?"int":a.TyFloat?"float":"string";}
function _Fr(a){var c,b,d;return b = a.cols,c = a.rows,a = a.types,d = {f1:c,f2:b},d.f1.nil && d.f2.nil?_Fp(a):_Fp(a) + ",rows:" + _Fp(c) + ",cols:" + _Fp(b);}
function _Fx(a,b){return {f1:b.f1 + b.f2 + "{" + _Fs(a) + "}",f2:" / "};}
function _Fv(a){var b;return b = _Fh(_Fw,a,{f1:"",f2:""}).f1,_Fl(a)?"":"(" + b + ")";}
function _Fs(a){return _Fh(_Ft,a,{f1:"",f2:""}).f1;}
function _Fw(a,b){return {f1:b.f1 + b.f2 + _Od(2,a),f2:" ,"};}
function _Od(a,b){var c;while (true) {switch (a) {case 0:return _Fh(_Fx,b,{f1:"",f2:""}).f1;;
case 1:;
case 2:if (c = b.TyConst) {return _Fq(c);} else {if (c = b.TyVar,c != null) {return c;} else {if (c = b.TyArrow_params) {return _Fv(c) + " -> " + _Od(2,b.TyArrow_res);} else {if ((c = b.TyRecord_row) && _BE(b) === 1) {return "{" + _Fs(c) + "}";} else {if (c) {return "{" + _Fs(c) + "; ...}";} else {if ((c = b.TySum_col) && _BE(b) === 1) {b = c;a = 0;} else {return c?_Od(0,c) + " / __":(c = b.TyName_args)?b.TyName_ident + _Fv(c):(c = b.TyForall_quant)?"forall(" + _Fr(c) + ")." + _Od(2,b.TyForall_body):"abstract";}}}}}};}}}
function _Fu(a){return _Od(1,a);}
function _Ft(a,b){return {f1:b.f1 + b.f2 + a.label + " : " + _Od(1,a.ty),f2:"; "};}
var _Oe = _FK("OpaType.ty",_Fu);
function _Fy(a){return a + 1;}
function _GA(a,b){while (b = b.tl) {a++;}return a;}
function _GB(a){return function (b,c){var d;while (d = c.tl) {a(b,c.hd);b++;c = d;}return _OZ;};}
function _GC(a,b){return _GB(a)(0,b);}
function _GD(a,b){return function (c,d){return _FA(b,c,a(d));};}
function _GE(a,b){return function (c,d){return _FA(b,c + a + 1,d);};}
function _GF(a,b,c,d,e,f,g){return (a = a(b).some,a == null)?e(f):(e = _GA(0,c),b = _Dg(e + 1 + _GA(0,g)),_GC(_GD(d,b),c),_FA(b,e,f),_GC(_GE(e,b),g),_Dt(a,b));}
function _GG(a,b){return function (c,d,e){var f,g;return f = e.f1,(g = f.hd)?{f1:f.tl,f2:b(c,g.ty,d,e.f2)}:_Bd("[Record.fold_with_fields] value:" + _Bn(d) + " all_field:" + _Bn(a) + " fields:" + _Bn(f),"File \"lib/stdlib/core/opavalue.opa\", line 366, characters 19-144, (366:19-366:144 | 12585-12710)");};}
function _GH(a,b,c,d){return _v(_GG(c,a),b,{f1:c,f2:d}).f2;}
function _GI(a,b){return (b = b.some,b != null)?b:a();}
function _GJ(){return _Bd("name_of_field_unsafe","File \"lib/stdlib/core/opavalue.opa\", line 403, characters 30-58, (403:30-403:58 | 13883-13911)");}
function _GK(a){return _GI(_GJ,_x(a));}
function _GL(a){return _ED(a);}
var _Of = {none:_C};
function _GM(a){return {some:a};}
var _Og = _GM([_GL]);
function _GN(a){var b;return (b = _Og.some,b == null)?_Of:_Cm(b)(a);}
function _GO(a){var b;return b = _ED(a),b.none?_GN(a):b;}
function _GP(a){return function (){return _Bd("OpaTsc.get_unsafe(" + a + ")","File \"lib/stdlib/core/opatype.opa\", line 88, characters 28-63, (88:28-88:63 | 3417-3452)");};}
function _GQ(a){return _GI(_GP(a),_GO(a));}
function _GR(a){return {types:a,rows:{nil:_C},cols:{nil:_C}};}
function _GS(a,b){return _Bw(a,b);}
function _GT(a,b){return _Bw(a.label,b.label);}
function _GU(a,b,c){var d,e,g,f;return d = {f1:b,f2:c},(e = d.f1,!(f = e.tl))?d.f2:(d = d.f2,!(g = d.tl))?e:(e = e.hd,d = d.hd,a(e,d).lt?{hd:e,tl:_GU(a,f,c)}:{hd:d,tl:_GU(a,b,g)});}
function _GV(a,b){return _GU(_GT,a,b);}
function _GW(a,b){var c;return (c = b.TyRecord_rowvar,c != null)?{TyRecord_row:_GV(a,b.TyRecord_row),TyRecord_rowvar:c}:{TyRecord_row:_GV(a,b.TyRecord_row)};}
function _GX(a,b,c){var d,e,f;while (d = b.tl) {if (e = c.tl) {f = a(b.hd,c.hd);if (f.eq) {b = d;c = e;} else {return f;}} else {return {lt:_C};}}return c.nil?{eq:_C}:{gt:_C};}
function _GY(a,b){return _GX(_GT,a,b);}
function _GZ(a,b){return _GU(_GY,a,b);}
function _Gb(a,b){var c;return (c = b.TySum_colvar,c != null)?{TySum_col:_GZ(a,b.TySum_col),TySum_colvar:c}:{TySum_col:_GZ(a,b.TySum_col)};}
function _Gc(a,b){return _CT(a,b);}
var _Oh = {nil:_C};
function _Gd(a,b){return {hd:a,tl:b};}
function _Ge(a,b){var d,c;while (c = a.tl) {d = a.hd;a = c;b = {hd:d,tl:b};}return b;}
function _Gf(a){return _Ge(a,_Oh);}
function _Gg(a,b,c){var e,d;while (d = b.tl) {e = b.hd;b = d;c = _Gd(a(e),c);}return c;}
function _Gh(a,b){return _Gg(a,b,{nil:_C});}
function _Gi(a,b,c){var d;return _CT(c,100).gt?_Gf(_Gh(a,b)):(d = b.tl)?_Gd(a(b.hd),_Gi(a,d,c + 1)):_Oh;}
function _Gn(a,b,c){return function (d){var e;return d.TyConst?d:(e = d.TyVar,e != null)?(e = c(e).some)?e:d:(e = d.TyArrow_params)?{TyArrow_params:_Go(a,b,c)(e),TyArrow_res:_Gn(a,b,c)(d.TyArrow_res)}:(e = d.TyRecord_row) && _BE(d) === 1?{TyRecord_row:_Gl(a,b,c)(e)}:e?(d = d.TyRecord_rowvar,_GW(_Gl(a,b,c)(e),(e = b(d).some)?e:{TyRecord_row:{nil:_C},TyRecord_rowvar:d})):(e = d.TySum_col) && _BE(d) === 1?{TySum_col:_Gj(a,b,c)(e)}:e?(d = d.TySum_colvar,_Gb(_Gj(a,b,c)(e),(e = a(d).some)?e:{TySum_col:{nil:_C},TySum_colvar:d})):(e = d.TyName_args)?{TyName_args:_Go(a,b,c)(e),TyName_ident:d.TyName_ident}:(e = d.TyForall_quant)?{TyForall_quant:e,TyForall_body:_Gn(a,b,c)(d.TyForall_body)}:d;};}
function _Go(a,b,c){return function (d){return _Gi(_Gn(a,b,c),d,0);};}
function _Gm(a,b,c){return function (d){return {label:d.label,ty:_Gn(a,b,c)(d.ty)};};}
function _Gj(a,b,c){return function (d){return _Gi(_Gk(a,b,c),d,0);};}
function _Oi(a,b,c,d,e){while (true) {switch (a) {case 0:return _Gi(_Gm(b,c,d),e,0);;
case 1:a = 0;;}}}
function _Gl(a,b,c){return function (d){return _Oi(0,a,b,c,d);};}
function _Gk(a,b,c){return function (d){return _Oi(1,a,b,c,d);};}
function _Gp(a,b){return _Gn(b.f3,b.f2,b.f1)(a);}
function _Gq(a,b){return function (c){var d;while (d = c.hd) {if (b(d.f1,a)) {return _GM(d.f2);} else {c = c.tl;}}return _Of;};}
function _Gr(a,b,c){return _Gq(b,a)(c);}
function _Gs(a,b,c,d){var f,e,h,g;while (e = b.tl) {f = b.hd;if (g = c.tl) {h = c.hd;b = e;c = g;d = a(f,h,d);} else {return _Bd("List.fold2 l1.length != l2.length","File \"lib/stdlib/core/list.opa\", line 1160, characters 18-59, (1160:18-1160:59 | 36762-36803)");}}return d;}
function _Gt(a,b,c){return {hd:{f1:a,f2:b},tl:c};}
function _Gu(a){return function (b){return _Gr(_FP,b,a);};}
function _Gv(a,b){return _Gu(_Gs(_Gt,a,b,{nil:_C}));}
function _Gw(a,b){return {f1:_Gv(b.types,a.types),f2:_Gv(b.rows,a.rows),f3:_Gv(b.cols,a.cols)};}
function _Gx(a,b){return a.cols.nil && a.rows.nil && a.types.nil?b.body:_Gp(b.body,_Gw(a,b.quantifier));}
function _Gy(a,b){return _Gx(_GR(a),b);}
function _HA(a,b){return _Gy(b,_GQ(a));}
function _HB(a){return (a = a.tl)?a:_Bd("List.tail on empty list","File \"lib/stdlib/core/list.opa\", line 1125, characters 13-44, (1125:13-1125:44 | 35870-35901)");}
function _HC(a){return (a = a.hd,a != null)?a:_Bd("List.head on empty list","File \"lib/stdlib/core/list.opa\", line 1137, characters 13-44, (1137:13-1137:44 | 36070-36101)");}
function _HD(a,b,c){var d,e;while (d = a.tl) {if (a.hd.nil) {e = _HB(b);a = d;c = _Gd(_HC(b),c);b = e;} else {a = d;b = _HB(b);}}return c;}
function _HE(a,b){var c;return c = b.f1,{f1:c + 1,f2:_Gd(a,b.f2),f3:_Gd({f1:a,f2:c},b.f3)};}
function _HF(a){return function (b,c,d){var e,f,g,h;while (true) {f = d.f1;e = d.f2;if (h = b.tl) {g = b.hd;if (d = g.tl) {if (g.hd.label == a) {g = _HB(c);b = h;d = {f1:_Gd(d,f),f2:_Gd(_HC(c),e)};c = g;} else {b = h;c = _HB(c);d = {f1:f,f2:e};}} else {b = h;c = _HB(c);d = {f1:f,f2:e};}} else {return {f1:f,f2:e};}}};}
function _HG(a,b,c){return _HF(_GK(a))(c.f1,c.f2,{f1:{nil:_C},f2:{nil:_C}});}
function _HH(a,b){var d,c;return b = _Fh(_HE,b,{f1:0,f2:{nil:_C},f3:{nil:_C}}),c = b.f2,b = _v(_HG,a,{f1:c,f2:b.f3}),b = _HD(b.f1,b.f2,{nil:_C}),(d = b.tl) && d.nil?b.hd:_Bd("[OpaType.fields_of_fields_list] Can't select a row for :\nvalue (dump): " + _Bn(a) + "list fields : " + _Od(0,c),"File \"lib/stdlib/core/opatype.opa\", line 482, characters 12-195, (482:12-484:61 | 18815-18998)");}
function _HI(a){return _EJ(a);}
function _HJ(a){return function (b,c,d,e){return b = _GK(b),c = _HK(a)(d,c,""),{f1:a(a(a(a(e.f1,e.f2),b)," = "),c),f2:"; "};};}
function _Oj(a,b,c,d,e){var f;while (true) {switch (a) {case 0:d = b;e = "";b = _FQ;a = 2;
continue;;
case 1:return _Fl(d)?b(e,"{}"):b(_GH(_HJ(b),c,d,{f1:e,f2:"{"}).f1,"}");;
case 2:if ((a = d.TyConst) && a.TyInt) {return "" + c;} else {if (a && a.TyFloat) {return _CW(c);} else {if (a) {return c;} else {if ((a = d.TyRecord_row) && _BE(d) === 1) {d = a;a = 1;
continue;} else {if (a) {d = a;a = 1;continue;} else {if ((a = d.TySum_col) && _BE(d) === 1) {d = _HH(c,a).f1;a = 1;
continue;} else {if (a) {d = _HH(c,a).f1;a = 1;continue;} else {if (a = d.TyName_args) {f = d.TyName_ident;return _GF(_HI,f,a,_HM,_HL(b,e,_HA(f,a)),c,{nil:_C});} else {if (a = d.TyVar,a != null) {return b(e,a);} else {if (d.TyArrow_params) {return b(b(b(e,"<a function of type "),_Od(1,d)),">");} else {if (a = d.TyForall_body) {d = a;a = 2;
continue;} else {return b(e,"<a value of abstract type>");}}}}}}}}}}};
case 3:a = 0;continue;;
case 4:a = e;e = c;c = a;a = 2;;}}}
function _HK(a){return function (b,c,d){return _Oj(2,a,b,c,d);};}
function _HN(a){return function (b){return _Oj(3,a,b);};}
function _HL(a,b,c){return function (d){return _Oj(4,a,b,c,d);};}
function _HM(a){return _HN(a);}
function _HO(a){return function (b){return _Oj(0,a,b);};}
function _HP(a){return a?"true":"false";}
var _Ok = _FK("bool",_HP);
function _HQ(a){return function (b){return _HO(a)(b);};}
function _HR(a,b,c){return _Fk({hd:"[",tl:{hd:a,tl:{hd:"] on ",tl:{hd:_Od(1,b),tl:{hd:" is impossible.\n",tl:{nil:_C}}}}}}) + _Fk({hd:"Because contains a value of type ",tl:{hd:_Od(1,c),tl:{hd:".",tl:{nil:_C}}}});}
function _HS(a){return function (b,c,d,e){var f,g;return f = e.f1,(g = f.hd)?{f1:f.tl,f2:a(b,g.ty,c,d,e.f2)}:_Bd("[Record.fold2_with_fields] ","File \"lib/stdlib/core/opavalue.opa\", line 378, characters 19-54, (378:19-378:54 | 13098-13133)");};}
function _HT(a,b,c,d,e){return _w(_HS(a),b,c,{f1:d,f2:e}).f2;}
function _Ol(a,b,c,d,e,f,g){var h,i;while (true) {switch (a) {case 0:return _HT(_HU(b),c,d,e,{eq:_C});;
case 1:if ((a = e.TyConst) && a.TyInt) {return _CT(c,d);} else {if (a && a.TyFloat) {return _CX(c,d);} else {if (a) {return _Bw(c,d);} else {if ((a = e.TyRecord_row) && _BE(e) === 1) {e = a;a = 0;
continue;} else {if (a) {e = a;a = 0;continue;} else {if ((a = e.TySum_col) && _BE(e) === 1) {h = _HH(c,a);a = _CT(h.f2,_HH(d,a).f2);if (a.eq) {e = h.f1;a = 0;
continue;} else {return a;}} else {if (a) {h = _HH(c,a);a = _CT(h.f2,_HH(d,a).f2);if (a.eq) {e = h.f1;a = 0;
continue;} else {return a;}} else {if (a = e.TyName_args) {h = e.TyName_ident;if (i = _EL(h).some) {var j =_GA(0,a);if (j == 0) {return i(c,d);} else {h = _Dg(j + 2);_GC(_HW(b,h),a);_FA(h,j,c);_FA(h,j + 1,d);return _Dt(i,h);}} else {e = _HA(h,a);a = 1;
continue;}} else {return e.TyForall_body?_Bd(_HR("compare",b,e),"File \"lib/stdlib/core/opavalue.opa\", line 269, characters 9-56, (269:9-269:56 | 9156-9203)"):e.TyArrow_params?_Bd(_HR("compare",b,e),"File \"lib/stdlib/core/opavalue.opa\", line 269, characters 9-56, (269:9-269:56 | 9156-9203)"):e.TyAbstract?_Bd(_HR("compare",b,e),"File \"lib/stdlib/core/opavalue.opa\", line 269, characters 9-56, (269:9-269:56 | 9156-9203)"):_Bd(_HR("compare",b,e),"File \"lib/stdlib/core/opavalue.opa\", line 269, characters 9-56, (269:9-269:56 | 9156-9203)");}}}}}}}};
case 2:if (g.eq) {c = e;e = d;d = f;a = 1;continue;} else {return g;};
case 3:a = d;d = e;e = c;c = a;a = 1;;}}}
function _HV(a){return function (b,c,d){return _Ol(1,a,b,c,d);};}
function _HU(a){return function (b,c,d,e,f){return _Ol(2,a,b,c,d,e,f);};}
function _HX(a,b){return function (c,d){return _Ol(3,a,b,c,d);};}
function _HW(a,b){return function (c,d){return _FA(b,c,_HX(a,d));};}
function _HY(a,b,c){return _HV(c)(a,b,c);}
function _HZ(a){return function (b,c){return _HY(b,c,a);};}
function _Hb(a){return function (b,c){return _HZ(a)(b,c);};}
function _Hc(a,b,c){var e,d;return d = _Fc(a),e = _Fc(c),_Fe(a,b,c,d > e?d + 1:e + 1,_Fd(a) + _Fd(c) + _Bx(b));}
function _Hd(a){return (a = a.left)?a:{empty:_C};}
function _He(a){return (a = a.right)?a:{empty:_C};}
function _Hf(a){return Math.abs(a);}
function _Hg(a){var d,c,b;while (b = a.right) {c = a.left;d = a.value;var f =_Fc(c),e =_Fc(b);if (_Hf(e - f) > 1) {if (e - f <= -2) {if (_Fc(_He(c)) - _Fc(_Hd(c)) <= -1) {a = _Hc(_Hg(_Hd(c)),_Fb(c),_Hg(_Hc(_He(c),d,b)));} else {a = _Hc(_Hg(_Hc(_Hd(c),_Fb(c),_Hd(_He(c)))),_Fb(_He(c)),_Hg(_Hc(_He(_He(c)),d,b)));}} else {if (_Fc(_He(c)) - _Fc(_Hd(c)) <= -1) {a = _Hc(_Hg(_Hc(c,d,_Hd(_Hd(b)))),_Fb(_Hd(b)),_Hg(_Hc(_He(_Hd(b)),_Fb(b),_He(b))));} else {a = _Hc(_Hg(_Hc(c,d,_Hd(b))),_Fb(b),_Hg(_He(b)));}}} else {return a;}}return {empty:_C};}
function _Hh(a){return _Fe({empty:_C},a,{empty:_C},1,_Bx(a));}
function _Hi(a){return function (b,c){return c = _Hb(a)(b,c),(b = c.eq,b != null) && _BE(c) === 1 && _BE(b) === 0?true:false;};}
function _Hj(a,b){return a < b;}
function _Hk(a){return function (b,c){return b = _Hb(a)(b,c),(c = b.lt,c != null) && _BE(b) === 1 && _BE(c) === 0?true:false;};}
function _Hl(a,b,c){var f,e,d;while (d = a.right) {e = a.left;f = a.value;if (b == 0?c == a.sizetext:false) {return a;} else {var g =_Fd(e),h =_Bx(f);if (g > b) {if (g >= b + c) {a = e;} else {return g + h >= b + c?_Hg(_Hc(_Hl(e,b,g - b),_CC(f,0,c - g + b),{empty:_C})):_Hg(_Hc(_Hl(e,b,g - b),f,_Hl(d,0,c - h - (g - b))));}} else {if (b < g + h) {return b + c <= g + h?_Hh(_CC(f,b - g,c)):_Hg(_Hc({empty:_C},_CC(f,b - g,h - b + g),_Hl(d,0,c - h - g + b)));} else {a = d;b = b - g - h;}}}}return {empty:_C};}
function _Hm(a){var d,c,b,f,e;return (b = a.right)?(c = a.left,d = a.value,e = _Fc(c),f = _Fc(b),_Hf(f - e) > 1?f - e <= -2?_Fc(_He(c)) - _Fc(_Hd(c)) <= -1?_Hc(_Hd(c),_Fb(c),_Hc(_He(c),d,b)):_Hc(_Hc(_Hd(c),_Fb(c),_Hd(_He(c))),_Fb(_He(c)),_Hc(_He(_He(c)),d,b)):_Fc(_He(c)) - _Fc(_Hd(c)) <= -1?_Hc(_Hc(c,d,_Hd(_Hd(b))),_Fb(_Hd(b)),_Hc(_He(_Hd(b)),_Fb(b),_He(b))):_Hc(_Hc(c,d,_Hd(b)),_Fb(b),_He(b)):a):{empty:_C};}
function _Hn(a,b){return a != b;}
function _Ho(a){return function (b,c){return c = _Hb(a)(b,c),!((b = c.eq,b != null) && _BE(c) === 1 && _BE(b) === 0);};}
function _Hp(a,b){return _Bc(a,b) == -1?b:a;}
function _Hq(a,b){var f,e,d,c;return (c = a.right)?(d = a.left,e = a.sizetext,f = a.value,a.sizetree != _Hp(_Fc(d),_Fc(c)) + 1?_Fk({hd:"ERROR : Tree size corrupted:",tl:{hd:f,tl:{hd:":",tl:{nil:_C}}}}) + b:e != _Fd(d) + _Fd(c) + _Bx(f)?_Fk({hd:"ERROR : Text size corrupted:",tl:{hd:f,tl:{hd:":",tl:{nil:_C}}}}) + b:_Hf(_Fc(c) - _Fc(d)) > 1?_Fk({hd:"ERROR : Unbalanced tree:",tl:{hd:f,tl:{hd:":",tl:{nil:_C}}}}) + b:e == 0?_Fk({hd:"ERROR : string of size 0:",tl:{hd:f,tl:{hd:":",tl:{nil:_C}}}}) + b:_Hq(d,b) + _Hq(c,b)):"";}
function _Hr(a){var b;return (b = a.right)?_Hr(a.left) + a.value + _Hr(b):"";}
function _Hs(a,b){return b.nil?a:_Ge(_Gf(a),b);}
function _Ht(a){var b;return (b = a.right)?_Hs(_Ht(a.left),_Gd(a.value,_Ht(b))):{nil:_C};}
function _Hu(a,b){return _Hc(_Hh(a),b,{empty:_C});}
function _Hv(a,b){var c;return (c = a.right)?_Hg(_Hc(a.left,a.value,_Hv(c,b))):b;}
function _Hw(a,b){return a = {f1:a,f2:b},(b = a.f1,b.empty)?a.f2:(a = a.f2,a.empty)?b:_Hv(b,a);}
function _Hx(a,b,c,d){return _Hc(_Hh(_CC(a,0,c)),b,_Hh(_CC(a,c,d - c)));}
function _Hy(a,b,c){var f,e,d,g;return (d = a.right)?(e = a.left,f = a.value,g = _Fd(e),a = _Bx(f),c < g?_Hc(_Hy(e,b,c),f,d):g + a < c?_Hc(e,f,_Hy(d,b,c - g - a)):_Hc(e,_CC(f,0,c - g) + b + _CC(f,c - g,a - c + g),d)):_Hh(b);}
function _IA(a,b){var d,c,f,e;return (c = a.right)?(d = a.left,a = a.value,e = _Fd(d),f = _Bx(a),b < e?(b = _IA(d,b),{f1:b.f1,f2:_Hm(_Hc(b.f2,a,c))}):e + f < b?(b = _IA(c,b - e - f),{f1:_Hm(_Hc(d,a,b.f1)),f2:b.f2}):f - b + e == 0?{f1:_Hm(_Hc(d,_CC(a,0,b - e),{empty:_C})),f2:c}:{f1:_Hm(_Hc(d,_CC(a,0,b - e),{empty:_C})),f2:_Hm(_Hc({empty:_C},_CC(a,b - e,f - b + e),c))}):{f1:{empty:_C},f2:{empty:_C}};}
function _IB(a){var c,b;return (b = a.right)?(c = a.left,a = a.value,b.empty?{f1:a,f2:c}:(b = _IB(b),{f1:b.f1,f2:_Hm(_Hc(c,a,b.f2))})):{f1:"",f2:{empty:_C}};}
function _IC(a,b){var d,c;return c = _Fc(a),d = _Fc(b),c == 0?b:d == 0?a:c != d?_Hw(a,b):(a = _IB(a),_Hc(a.f2,a.f1,b));}
function _ID(a,b,c,d){var e,f;return (e = a.right)?(f = b + " : " + a.value + _Fk({hd:" (sizetree=",tl:{hd:"" + a.sizetree,tl:{hd:" sizetxt=",tl:{hd:"" + a.sizetext,tl:{hd:")",tl:{nil:_C}}}}}}),_ID(a.left,b + "L",f,"") + "\"" + f + "\" " + d + ";\n" + "\"" + c + "\" -> \"" + f + "\";\n" + _ID(e,b + "R",f,"")):"\"" + c + "\" -> \"" + b + ":EMPTY\";\n";}
function _IE(a){var b;return (b = a.right)?_Fe(_IE(a.left),_CH(a.value),_IE(b),a.sizetree,a.sizetext):{empty:_C};}
function _IF(a){var b;return (b = a.right)?_Fe(_IF(a.left),_CI(a.value),_IF(b),a.sizetree,a.sizetext):{empty:_C};}
function _IG(a,b){var c;while (c = a.left) {b = a.sizetext;a = c;}return b;}
function _IH(a,b){var d,c;return (c = a.right)?(d = a.left,a = a.value,d.empty?_Hc(d,b + a,c):_Hc(_IH(d,b),a,c)):{empty:_C};}
function _II(a,b){var d,c;return (c = a.right)?(d = a.left,a = a.value,c.empty?_Hc(d,a + b,c):_Hc(d,a,_II(c,b))):{empty:_C};}
function _IJ(a,b){var e,d,c;while (c = a.right) {d = a.left;e = a.value;var f =_Fd(d),g =_Bx(e);if (b < f) {a = d;} else {if (f + g < b) {a = c;b = b - f - g;} else {return _CE(e,b - f);}}}return _Bd("[Error in Textavl.get]","File \"lib/stdlib/core/textavl.opa\", line 531, characters 7-37, (531:7-531:37 | 16809-16839)");}
function _IK(a,b,c,d){var f,e;while (e = a.left) {f = a.value;if (e.empty) {return {f1:_CE(f,0),f2:f,f3:_Gd(a,d)};} else {d = _Gd(a,d);a = e;}}return {f1:b,f2:c,f3:d};}
function _IL(a){return _IK(a,0,"",{nil:_C});}
function _IM(a,b,c,d){var f,e;while (e = a.right) {f = a.value;if (e.empty) {return {f1:_CE(f,0),f2:f,f3:_Gd(a,d)};} else {d = _Gd(a,d);a = e;}}return {f1:b,f2:c,f3:d};}
function _IN(a){return _IM(a,0,"",{nil:_C});}
var _Om = {node_length:_FR,node_sub:_FU,node_sub_opt:_FV,node_uppercase:_FS,node_lowercase:_FT,node_get:_FW,node_nextchar:_FY,node_look:_FX,node_cons:_FZ,textavl_description:_Ob,empty:_Oc,value:_Fb,sizetr:_Fc,sizetxt:_Fd,node:_Fe,stringsub:_FU,sub_avl:_Hl,create_node:_Hc,left_son:_Hd,right_son:_He,balance:_Hm,uberbalance:_Hg,check_avl:_Hq,singleton:_Hh,to_string:_Hr,to_list:_Ht,build_pair:_Hu,merge_avl_nn:_Hw,split_insert:_Hx,insert_str_into_avl:_Hy,split:_IA,smart_merge_nn:_IC,smart_merge_nn_aux_left:_IB,dot_avlgraph:_ID,uppercase:_IE,lowercase:_IF,left_leaf_size:_IG,concat_left:_IH,concat_right:_II,get:_IJ,start:_IL,rstart:_IN};
function _IO(a,b){var d,c,f,e,h,g;while (c = a.tl) {d = a.hd;var i =_Fc(d);if (e = c.tl) {f = c.hd;var j =_Fc(f);if (g = e.tl) {h = e.hd;var k =_Fc(h);if (i > 1 && ((j == 1?true:false) && k > i)) {return _Gd(d,_IO(c,10));} else {if (i == 1?j > 1 && (k == 1?true:false):false) {return _Gd(d,_IO(c,b + 1));} else {if (i == 1?(j == 1?true:false) && (b == 1?true:false):false) {return _Gd(d,_IO(c,b + 1));} else {if (i > 1 && ((j == 1?true:false) && k == i)) {a = _Gd(_Hc(d,_Fb(f),h),g);b = 10;} else {if (i == 1?(j == 1?true:false) && ((k == 1?true:false) && (b == 2?true:false)):false) {a = _Gd(_Hc(d,_Fb(f),h),g);b = 10;} else {if (i > 1 && (j == 1?true:false)) {a = _Gd(_Hw(_Hw(d,f),h),g);b = 10;} else {if (i > 1) {a = _Gd(_Hw(d,f),e);b = 10;} else {return _Gd(d,_IO(c,b + 1));}}}}}}}} else {return i > 1 && j > 1?{hd:_Hw(d,f),tl:{nil:_C}}:(j == 1?b >= 3:false)?{hd:_Hw(d,f),tl:{nil:_C}}:a;}} else {return a;}}return {nil:_C};}
function _IP(a,b){var d,c,f,e,h,g;while (c = a.tl) {d = a.hd;var i =_Fc(d);if (e = c.tl) {f = c.hd;var j =_Fc(f);if (g = e.tl) {h = e.hd;var k =_Fc(h);if (i > 1 && ((j == 1?true:false) && k > i)) {return _Gd(d,_IP(c,10));} else {if (i == 1?j > 1 && (k == 1?true:false):false) {return _Gd(d,_IP(c,b + 1));} else {if (i == 1?(j == 1?true:false) && (b == 1?true:false):false) {return _Gd(d,_IP(c,b + 1));} else {if (i > 1 && ((j == 1?true:false) && k == i)) {a = _Gd(_Hc(h,_Fb(f),d),g);b = 10;} else {if (i == 1?(j == 1?true:false) && ((k == 1?true:false) && (b == 2?true:false)):false) {a = _Gd(_Hc(h,_Fb(f),d),g);b = 10;} else {if (i > 1 && (j == 1?true:false)) {a = _Gd(_Hw(_Hw(h,f),d),g);b = 10;} else {if (i > 1) {a = _Gd(_Hw(f,d),e);b = 10;} else {return _Gd(d,_IP(c,b + 1));}}}}}}}} else {return i > 1 && j > 1?{hd:_Hw(f,d),tl:{nil:_C}}:(j == 1?b >= 3:false)?{hd:_Hw(f,d),tl:{nil:_C}}:a;}} else {return a;}}return {nil:_C};}
function _IQ(a,b,c){var e,d;return (d = a.tl)?(e = a.hd,_Bx(b) + _IG(e,0) <= c?_Gd(_IH(e,b),d):_IO(_Gd(_Hh(b),a),1)):{hd:_Hh(b),tl:{nil:_C}};}
function _IR(a,b,c){var e,d;return (d = a.tl)?(e = a.hd,_Bx(b) + _IG(e,0) <= c?_Gd(_II(e,b),d):_IP(_Gd(_Hh(b),a),1)):{hd:_Hh(b),tl:{nil:_C}};}
function _IS(a){var b;return (b = a.tl)?_Fd(a.hd) + _IS(b):0;}
function _IT(a,b){var d,c;while (c = a.tl) {d = a.hd;a = c;b = _Ge(d,b);}return b;}
function _IU(a){return _IT(a,{nil:_C});}
function _IV(a){return _Gf(_IU(a));}
function _IW(a){var c,b;return b = a.txt,c = a.pos,c >= b.length?_Of:(a = _CF(b,c),_GM({f1:{txt:b,pos:_CB(b,c)},f2:a}));}
function _IX(a){return {pos:0,txt:a};}
function _IY(a,b){return {pos:a.pos + b,txt:a.txt};}
function _IZ(a,b){var c,e,d,j,i,h,g,f;return (c = a.textralist2)?(a = a.textralist1,(d = b.textralist2)?(e = b.textralist1,f = _IS(a),g = _IS(c),b = _IS(e),h = _IS(d),i = _Hf(f + g - (b + h)),j = _Hf(f + g + b - h),b = _Hf(f - (g + b + h)),i <= j && i <= b?{textralist1:_IO(_Hs(a,_Gf(c)),1),textralist2:_IP(_Hs(d,_Gf(e)),1)}:j <= i && j <= b?{textralist1:_IO(_Hs(a,_Hs(_Gf(c),e)),1),textralist2:d}:{textralist1:a,textralist2:_IP(_Hs(d,_Hs(_Gf(e),c)),1)}):{textralist1:a,textralist2:_IR(c,b.string,50)}):(a = a.string,(j = b.textralist2)?{textralist1:_IQ(b.textralist1,a,50),textralist2:j}:(b = b.string,_Bx(a) + _Bx(b) > 50?{textralist1:{hd:_Hh(a),tl:{nil:_C}},textralist2:{hd:_Hh(b),tl:{nil:_C}}}:{textralist1:{hd:_Hh(a + b),tl:{nil:_C}},textralist2:{nil:_C}}));}
function _Ib(a){return {string:a};}
function _Ic(a){var b;return (b = a.textralist2)?_IS(a.textralist1) + _IS(b):_Bx(a.string);}
function _Id(a,b){var c;return (c = b.tl)?_Hs(a(b.hd),_Id(a,c)):{nil:_C};}
function _Ie(a){var b;return (b = a.textralist2)?_Fk(_Hs(_Id(_Ht,a.textralist1),_Id(_Ht,_Gf(b)))):a.string;}
var _On = _FK("text",_Ie);
function _If(a,b){return _IZ(a,_Ib(b));}
function _Ig(a){return {string:_Om.node_cons(a)};}
function _Ih(a){return _IX(_Ie(a));}
function _Ii(a,b,c){return (a == 0?c.length == b:false)?c:_Bt(a,b,c);}
function _Ij(a,b,c){return b < 0 || (a < 0 || a + b > c.length)?_Of:_GM(_Ii(a,b,c));}
function _Ik(a,b,c){var d;return (d = _Ij(a,b,c).some,d != null)?d:_Bd(_Fk({hd:"[substring] out of range in \"",tl:{hd:c,tl:{hd:"\" (",tl:{hd:"" + a,tl:{hd:", ",tl:{hd:"" + b,tl:{hd:", ",tl:{hd:"" + c.length,tl:{hd:" )",tl:{nil:_C}}}}}}}}}}),"File \"lib/stdlib/core/string.opa\", line 198, characters 21-106, (198:21-198:106 | 5797-5882)");}
function _Il(a,b){return a = a.pos < b.pos?{f1:a,f2:b}:{f1:b,f2:a},b = a.f1,_Ib(_Ik(b.pos,a.f2.pos - b.pos,b.txt));}
function _Im(a,b){var d,c;while (c = a.tl) {d = a.hd;a = c;b = _IZ(b,d);}return b;}
function _In(a){return _Im(a,_Ib(""));}
function _Io(a){return !a.none;}
function _Ip(a){return function (b,c){while (b >= 0) {c = _Gd(a(b),c);b--;}return c;};}
function _Iq(a,b){return _Ip(a)(b - 1,{nil:_C});}
function _Ir(a,b,c,d){return function (e){while (true) {_Ey(d,b(_CG(_CF(a,e))));var f =_CB(a,e);if (f < c) {e = f;} else {return _C;}}};}
function _Is(a,b){var d,c;return c = b.length,c > 0?(d = _Cp(c * 2),_Ir(b,a,c,d)(0),_Cr(d)):b;}
function _It(a){var b;return a == "\""?"\\\"":a == "\\"?"\\\\":a == "\n"?"\\n":a == "\r"?"\\r":a == "\x09"?"\\t":(b = _CF(a,0),b < 32?b < 10?_Fk({hd:"\\u000",tl:{hd:"" + b,tl:{nil:_C}}}):_Fk({hd:"\\u00",tl:{hd:"" + b,tl:{nil:_C}}}):a);}
function _Iu(a){return _Is(_It,a);}
function _Iv(a,b){return _Ik(a,b.length - a,b);}
function _Iw(a,b,c){return (c = c.some,c != null)?a(c):b;}
function _Ix(a){return function (b){var c;return (c = b.tl)?c.nil?b:{hd:b.hd,tl:{hd:a,tl:_Ix(a)(c)}}:b;};}
function _Iy(a,b){return _Ix(a)(b);}
function _JA(a,b){return _Fk(_Iy(a,b));}
function _JB(a,b,c){return _JA(b,_Gi(a,c,0));}
function _JC(a,b,c){var e,d;return d = c.length,e = a.length,b < d || e < 1?c:_Ik(0,b - d,_Bs(a,_BZ(b - d,e) + 1)) + c;}
function _JD(a){return a <= 25?_Bu(a + 65):_Bu(a + 72);}
function _JE(a,b){var c;while (a > 50) {c = _BZ(a,50);b = _Gd(_JD(a % 50),b);a = c;}return _Fk(_Gd(_JD(a),b));}
function _JF(a){return function (){var b;return _JE((b = _Cm(a),_FH(a,b + 1),b),{nil:_C});};}
function _JG(a){return _JF([a]);}
function _JH(a){return function (b,c){return c = a(b,c),c.lt?{lt:_C}:c.gt?{gt:_C}:c.eq?{eq:_C}:_Bd("[Order.compare] These two elements cannot be compared","File \"lib/stdlib/core/order.opa\", line 92, characters 17-78, (92:17-92:78 | 3878-3939)");};}
function _JI(a){return _JH(_Hb(a));}
function _JJ(a,b,c){return c(a,b).lt?true:false;}
function _JK(a,b,c){return c = c(a,b),c.lt?true:c.eq?true:false;}
function _JL(a,b,c){return c = c(a,b),c.gt?true:c.eq?true:false;}
function _JM(a,b){return (b = b.some,b != null)?_GM(a(b)):_Of;}
function _JN(a,b){return (b = b.some,b != null)?a(b):_OZ;}
function _JO(a,b){return (b = b.some,b != null)?a(b):_Of;}
function _JP(a,b){return (b = b.some,b != null)?b:_Bd(a(),"File \"lib/stdlib/core/option.opa\", line 138, characters 23-38, (138:23-138:38 | 4168-4183)");}
function _JQ(a){return (a = a.some,a == null)?_Bd("Option.get called on {none}","File \"lib/stdlib/core/option.opa\", line 147, characters 17-53, (147:17-147:53 | 4381-4417)"):a;}
function _JR(a){return function (b){return a;};}
function _JS(a){var d,e,c,b;while (!((b = a.TyName_args) && (c = a.TyName_ident,c === "void"))) {if ((d = a.TyRecord_row) && _BE(a) === 1 && d.nil) {return true;} else {if (a.TyRecord_rowvar != null && d.nil) {return true;} else {if ((e = a.TySum_col) && _BE(a) === 1 && (d = e.hd) && d.nil && e.tl.nil) {return true;} else {if (a.TySum_colvar != null && (d = e.hd) && d.nil && e.tl.nil) {return true;} else {if (b) {a = _HA(c,b);} else {return false;}}}}}}return true;}
function _JT(a){return function (b,c){return _FA(a,b,c);};}
function _JU(a){var b;return b = _Dg(_GA(0,a)),_GC(_JT(b),a),b;}
function _JV(a){return function (b,c){while (c != -1) {b = {hd:_Dj(a,c),tl:b};c--;}return b;};}
function _JW(a){return _JV(a)({nil:_C},_Dh(a) - 1);}
function _JX(a,b,c){return _Ds(a,b,{closure_name:c});}
function _JY(a){return (a = _Do(a).some)?a:{closure_name:""};}
function _JZ(a,b){return _FB(a,{closure_name:_JY(a).closure_name,stored:b});}
function _Jb(a){return _JY(a).closure_name;}
function _Jc(a){return (a = _JY(a).stored,a != null)?_GM(a):_Of;}
function _Jd(a){return a = _Jb(a),_Dl(a)?_GM(a):_Of;}
function _Je(a){return a = _Jb(a),_JM(_JR(a),_Dk(a));}
function _Jf(a){var b;return (b = _Og.some,b == null)?_OZ:_FH(b,a);}
function _Jg(a){return function (b){var c;return c = _Cm(a),_FN(a,_Fy),"`" + ("" + c) + "_" + b;};}
var _Oo = _Jg([0]);
function _Jh(a){return {TyVar:_Oo(a)};}
function _Ji(a){return {TyRecord_row:{nil:_C},TyRecord_rowvar:_Oo(a)};}
function _Jj(a){return {TySum_col:{nil:_C},TySum_colvar:_Oo(a)};}
function _Jk(a){return {types:_Gi(_Jh,a.types,0),rows:_Gi(_Ji,a.rows,0),cols:_Gi(_Jj,a.cols,0)};}
function _Jl(a,b){var c;return c = _Jk(a),{f1:c,f2:_Gp(b,_Gw(c,a))};}
function _Jm(a){var b;while (b = a.TyName_args) {b = _HA(a.TyName_ident,b);if (b.TyAbstract) {return a;} else {a = b;}}return a;}
function _Jn(a,b){return a = _Gx(a,b),b = _Jm(a),b.TyArrow_params?b:a;}
function _Jo(a){return a.TyInt?"TyInt":a.TyFloat?"TyFloat":"TyString";}
function _Jp(a){return "vars:" + _Fp(a.types) + ",rows:" + _Fp(a.rows) + ",cols:" + _Fp(a.cols);}
function _Jt(a,b){return b + _Fk({hd:a.label,tl:{hd:" : ",tl:{hd:_Ju(a.ty),tl:{hd:"; ",tl:{nil:_C}}}}});}
function _Jr(a,b){return b + _Js(a) + "; ";}
function _Ju(a){var b;return (b = a.TyConst)?_Fk({hd:"{TyConst = ",tl:{hd:_Jo(b),tl:{hd:"}",tl:{nil:_C}}}}):(b = a.TyVar,b != null)?_Fk({hd:"{TyVar = ",tl:{hd:b,tl:{hd:"}",tl:{nil:_C}}}}):(b = a.TyArrow_params)?_Fk({hd:"{TyArrow_params = ",tl:{hd:_Jv(b),tl:{hd:"; TyArrow_res = ",tl:{hd:_Ju(a.TyArrow_res),tl:{hd:"}",tl:{nil:_C}}}}}}):(b = a.TyRecord_row) && _BE(a) === 1?_Fk({hd:"{TyRecord_row = ",tl:{hd:_Js(b),tl:{hd:"}",tl:{nil:_C}}}}):b?_Fk({hd:"{TyRecord_row = ",tl:{hd:_Js(b),tl:{hd:"; TyRecord_rowvar = ",tl:{hd:a.TyRecord_rowvar,tl:{hd:"}",tl:{nil:_C}}}}}}):(b = a.TySum_col) && _BE(a) === 1?_Fk({hd:"{TySum_col = ",tl:{hd:_Jq(b),tl:{hd:"}",tl:{nil:_C}}}}):b?_Fk({hd:"{TySum_col = ",tl:{hd:_Jq(b),tl:{hd:"; TySum_colvar = ",tl:{hd:a.TySum_colvar,tl:{hd:"}",tl:{nil:_C}}}}}}):(b = a.TyName_args)?_Fk({hd:"{TyName_args = ",tl:{hd:_Jv(b),tl:{hd:"; TyName_ident = ",tl:{hd:a.TyName_ident,tl:{hd:"}",tl:{nil:_C}}}}}}):(b = a.TyForall_quant)?_Fk({hd:"{TyForall_quant = ",tl:{hd:_Jp(b),tl:{hd:"; TyForall_body = ",tl:{hd:_Ju(a.TyForall_body),tl:{hd:"}",tl:{nil:_C}}}}}}):"{TyAbstract}";}
function _Jw(a,b){return b + _Fk({hd:_Ju(a),tl:{hd:"; ",tl:{nil:_C}}});}
function _Jq(a){return _Fh(_Jr,a,"[") + "]";}
function _Jv(a){return _Fh(_Jw,a,"[") + "]";}
function _Js(a){return _Fh(_Jt,a,"[") + "]";}
function _Jx(a,b){var d,c;while (c = b.tl) {d = b.hd;if (a(d)) {return _GM(d);} else {b = c;}}return _Of;}
function _Jy(a){return a.ty;}
function _KA(a){return function (b){return a == b.label;};}
function _KB(a,b){return _JM(_Jy,_Jx(_KA(b),a));}
function _KC(a){return a == 0?"0":a == 1?"1":a == 2?"2":a == 3?"3":a == 4?"4":a == 5?"5":a == 6?"6":a == 7?"7":a == 8?"8":a == 9?"9":a == 10?"A":a == 11?"B":a == 12?"C":a == 13?"D":a == 14?"E":a == 15?"F":_Bd("","File \"lib/stdlib/core/number.opa\", line 173, characters 16-20, (173:16-173:20 | 4623-4627)");}
function _KD(a,b){var c;while (a > 0) {c = _BZ(a,16);b = _KC(a % 16) + b;a = c;}return b;}
function _KE(a){return function (b,c,d){var e,f;while (f = b.tl) {e = b.hd;b = f;d = a(c,e)?_Gd(e,d):d;c++;}return _Gf(d);};}
function _KF(a,b){return _KE(a)(b,0,{nil:_C});}
function _KG(a){return function (b,c){return a(c);};}
function _KH(a,b){return _KF(_KG(a),b);}
function _KI(a,b,c){var d,e;while (d = b.tl) {if (e = a(b.hd).some,e == null) {b = d;} else {b = d;c = _Gd(e,c);}}return c;}
function _KJ(a,b){return _KI(a,b,{nil:_C});}
function _KK(a,b,c){var d,e;while (c <= 100) {if (d = b.tl) {if (e = a(b.hd).some,e == null) {b = d;c++;} else {return _Gd(e,_KK(a,d,c + 1));}} else {return _Oh;}}return _Gf(_KJ(a,b));}
function _KL(a){return function (b,c,d){var e,f;while (f = b.tl) {e = b.hd;b = f;c = a(d,e,c);d++;}return c;};}
function _KM(a,b,c){return _KL(a)(b,c,0);}
function _KN(a,b){return function (c){return _Fh(b,c,a);};}
function _KO(a,b,c){return _KN(c,a)(_Gf(b));}
function _KP(a){return function (b,c,d,e){var f,g;while (g = b.tl) {f = b.hd;if (a(c,f)) {b = g;c++;d = _Gd(f,d);} else {b = g;c++;e = _Gd(f,e);}}return {f1:_Gf(d),f2:_Gf(e)};};}
function _KQ(a,b){return _KP(a)(b,0,{nil:_C},{nil:_C});}
function _KR(a,b){return _KQ(_KG(a),b);}
function _KS(a){return function (b,c){var d;while (d = c.tl) {if (a(c.hd)) {return _GM(b);} else {b++;c = d;}}return _Of;};}
function _KT(a,b){return _KS(a)(0,b);}
function _KU(a,b){var c;while (c = b.tl) {if (a(b.hd)) {return true;} else {b = c;}}return false;}
function _KV(a,b){return function (c){return _Hi(a)(c,b);};}
function _KW(a){return function (b,c){return _KU(_KV(a,b),c);};}
function _KX(a,b,c){var d,e;while (d = b.tl) {if (e = c.tl) {if (a(b.hd,c.hd)) {b = d;c = e;} else {return {result:false};}} else {return {different_length:{longest_first:_C}};}}return c.nil?{result:true}:{different_length:{longest_second:_C}};}
function _KY(a,b){var c;while (a > 0) {if (c = b.tl) {a--;b = c;} else {return {nil:_C};}}return b;}
function _KZ(a){return function (b,c){var d,e;return d = c.f2,e = _GM(b),c = _Hi({TyName_args:{hd:a,tl:_LN},TyName_ident:"option"})(e,c.f1),c === true?{f1:e,f2:d}:c === false?{f1:e,f2:_Gd(b,d)}:_X("<no position available (cons.typed)>: Match failure 6215657");};}
function _Kb(a){return function (b){return _Gf(_Fh(_KZ(a),b,{f1:_Of,f2:{nil:_C}}).f2);};}
function _Kc(a,b,c){var g,e,d,f;return d = {f1:b,f2:c},(e = d.f1,!(f = e.tl))?d.f2:(g = d.f2,!(d = g.tl))?e:(e = e.hd,g = g.hd,_JJ(e,g,a)?{hd:e,tl:_Kc(a,f,c)}:{hd:g,tl:_Kc(a,b,d)});}
function _Kd(a){var c,b;return (b = a.tl)?(c = b.tl)?(c = _Kd(c),{f1:_Gd(a.hd,c.f1),f2:_Gd(b.hd,c.f2)}):{f1:{hd:a.hd,tl:{nil:_C}},f2:{nil:_C}}:{f1:{nil:_C},f2:{nil:_C}};}
function _Ke(a){return function (b){var c;return c = _Kd(b),b = c.f1,c = c.f2,c.nil?b:_Kc(a,_Ke(a)(b),_Ke(a)(c));};}
function _Kf(a,b){return _Ke(a)(b);}
function _Kg(a){return function (b){return _Kf(_JI(a),b);};}
function _Kh(a){return function (b){return _Kb(a)(_Kg(a)(b));};}
function _Ki(a,b,c,d){var e,f;while (e = c.tl) {if (f = d.tl) {b = {hd:a(c.hd,d.hd),tl:b};c = e;d = f;} else {return {different_length:_Gf(b)};}}return d.nil?{result:_Gf(b)}:{different_length:_Gf(b)};}
function _Kj(a,b,c){return _Ki(a,{nil:_C},b,c);}
function _Kk(a,b,c){return c = _Kj(a,b,c),(a = c.result)?a:c.different_length;}
function _Kl(a){return function (b,c){return _Hi(a)(b,c);};}
function _Km(a){return function (b,c){return _Gr(_Kl(a),b,c);};}
function _Kn(a){return function (b,c){return a(c,b);};}
function _Ko(a,b,c){return _Fh(_Kn(a),c,b);}
function _Kp(a,b,c){return _KO(_Kn(a),b,c);}
function _Kq(a,b,c,d){var e;while (e = b.tl) {d = a(b.hd,d);b = e;c = {hd:d.f1,tl:c};d = d.f2;}return {f1:_Gf(c),f2:d};}
function _Kr(a,b,c){return _Kq(a,b,{nil:_C},c);}
function _Ks(a,b){return _Fp(_Gi(a,b,0));}
var _Op = _FK("list",_Ks);
var _Oq = [];
function _Kt(a,b){return a == 0?_Oq:_Df(a,b);}
function _Ku(a,b,c){return function (d){while (d != c) {b(_Dd(a,d));d++;}return _OZ;};}
function _Kv(a,b){return _Ku(b,a,_De(b))(0);}
function _Kw(a,b,c){return function (d,e){while (d != c) {e = b(_Dd(a,d),e);d++;}return e;};}
function _Kx(a,b,c){return _Kw(b,a,_De(b))(0,c);}
function _Ky(a,b,c,d){while (d != 0) {_FM(b,d,c(d,_Dd(a,d)));d--;}return b;}
function _LA(a){return function (b){var c;return c = _De(a),c == 0?_Oq:_Ky(a,_Kt(c,b(0,_Dd(a,0))),b,c - 1);};}
function _LB(a,b,c,d){var e;while (e = c.tl) {_FM(a,d,b(d,c.hd));c = e;d++;}return a;}
function _LC(a){return function (b){var c;return (c = a.tl)?_LB(_Kt(_GA(0,a),b(0,a.hd)),b,c,1):_Oq;};}
function _LD(a,b){return b;}
function _LE(a){return _LC(a)(_LD);}
function _LF(a,b,c,d,e,f){while (e != d) {f = c(e,_Dd(a,e),f);_FM(b,e,f.f1);e++;f = f.f2;}return {f1:b,f2:f};}
function _LG(a,b){return function (c){var d,e;return e = _De(b),e == 0?{f1:_Oq,f2:a}:(d = c(0,_Dd(b,0),a),_LF(b,_Kt(e,d.f1),c,e,1,d.f2));};}
function _LH(a){return a.failure == null;}
function _LI(a,b){return a = {f1:a,f2:b},(b = a.f1,b.TyInt) && a.f2.TyInt?true:b.TyFloat && a.f2.TyFloat?true:b.TyString && a.f2.TyString?true:false;}
function _LJ(a){return function (){return _Cm(a);};}
function _LK(a){return function (b){return _FH(a,b);};}
function _LL(a){return a = [a],{get:_LJ(a),set:_LK(a)};}
var _Or = _CV(0);
function _LM(a){return _OZ;}
_Dm("__v31_an_f7dac3ec,__v29_an_f7dac3ec,__v28_an_f7dac3ec,__v19_an_f7dac3ec,_Ow,_Ov,_Ou,_Ot,_Os");
function _Os(){return _Of;}
var _Ox = {next:_Os};
function _Ot(a,b){while (b = b.next().some) {a = {hd:b.f1,tl:a};b = b.f2;}return _Gf(a);}
function _Ou(a){return _Ot({nil:_C},a);}
function _Ov(a,b){return function (){var c;return (c = a.next().some)?_GM({f1:b(c.f1),f2:_Ow(b,c.f2)}):_Of;};}
function _Ow(a,b){return {next:_Ov(b,a)};}
_Dm("_RF,_RE,_RD,_RC,_RB,_RA,_Qy,_Qx,_Qw,_Qv,_Qu,_Qt,_Qs,_Qr,_Qq,_Qp,__v1_upper_ec0784c7,_Qo,_Qn,_Qm,_Ql,_Qk,_Qj,_Qi,_Qh,_Qg,_Qf,_Qe,_Qd,_Qc,_Qb,_QZ,_QY,_QX,_QW,__v1_min_binding_ec0784c7,_QV,_QU,_QT,_QS,_QR,_QQ,_QP,_QO,_QN,_QM,_QL,_QK,_QJ,_QI,_QH,__v1_max_binding_ec0784c7,_QG,_QF,__v2_upper_ec0784c7,_QE,_QD,_QC,_QB,_QA,_Py,_Px,_Pw,_Pv,_Pu,_Pt,_Ps,_Pr,_Pq,_Pp,_Po,___lower_ec0784c7,_Pn,_Pm,_Pl,_Pk,_Pj,_Pi,_Ph,_Pg,_Pf,_Pe,_Pd,_Pc,_Pb,_PZ,_PY,_PX,_PW,_PV,_PU,_PT,_PS,_PR,_PQ,_PP,_PO,_PN,_PM,_PL,_PK,_PJ,_PI,_PH,_PG,_PF,_PE,_PD,_PC,_PB,_PA,_Oy");
var _RG = {TyVar:"'v-1"};
var _RH = {hd:_Lf,tl:_ML};
var _RI = {hd:_Lg,tl:_LN};
var _RJ = {empty:_C};
function _Oy(a,b){return {left:_RJ,key:a,value:b,right:_RJ,height:1};}
function _PA(a){return (a = a.height,a == null)?0:a;}
function _PB(a,b,c,d,e){return {left:a,key:b,value:c,right:d,height:e};}
function _PC(a,b,c,d){return _PB(a,b,c,d,_Hp(_PA(a),_PA(d)) + 1);}
function _PD(a,b,c,d){var f,h,e,g;return e = _PA(a),f = _PA(d),e > f + 2?(e = a.left)?(g = a.key,h = a.right,f = a.value,_PA(e) >= _PA(h)?_PC(e,g,f,_PC(h,b,c,d)):(a = h.left)?_PC(_PC(e,g,f,a),h.key,h.value,_PC(h.right,b,c,d)):_RJ):_RJ:f > e + 2?(g = d.left)?(e = d.key,h = d.right,f = d.value,_PA(g) <= _PA(h)?_PC(_PC(a,b,c,g),e,f,h):(d = g.left)?_PC(_PC(a,b,c,d),g.key,g.value,_PC(g.right,e,f,h)):_RJ):_RJ:_PC(a,b,c,d);}
function _PE(a){var b;while (!((b = a.left) && b.empty)) {if (b) {a = b;} else {return _Bd("Map.min_binding: Not Found","File \"lib/stdlib/core/map/map.opa\", line 460, characters 22-56, (460:22-460:56 | 19403-19437)");}}return {f1:a.key,f2:a.value};}
function _PF(a){return _PE(a);}
function _PG(a){var b;return (b = a.left)?b.empty?a.right:_PD(_PG(b),a.key,a.value,a.right):_RJ;}
function _PH(a,b){var d,c;return c = {f1:a,f2:b},(d = c.f1,d.empty)?c.f2:c.f2.empty?d:(c = _PE(b),_PD(a,c.f1,c.f2,_PG(b)));}
function _PI(a){var b;while (!((b = a.right) && b.empty)) {if (b) {a = b;} else {return _Bd("Map.max_binding: Not Found","File \"lib/stdlib/core/map/map.opa\", line 468, characters 22-56, (468:22-468:56 | 19712-19746)");}}return {f1:a.key,f2:a.value};}
function _PJ(a){return _PI(a);}
function _PK(a,b){var c;return (c = b.left)?_PB(_PK(a,c),b.key,a(b.value),_PK(a,b.right),b.height):_RJ;}
function _PL(a,b,c){return function (d){var e,f,g,h,i;return (h = d.right)?(g = d.key,f = d.left,e = d.value,i = c(b,g),i.eq?_PB(f,b,a,h,d.height):i.lt?_PD(_PL(a,b,c)(f),g,e,h):_PD(f,g,e,_PL(a,b,c)(h))):_Oy(b,a);};}
function _PM(a,b,c,d){return _PL(c,b,a)(d);}
function _PN(a,b,c){var g,f,e,d;while (d = b.right) {e = b.key;f = b.left;g = b.value;b = d;c = a(e,g,_PN(a,f,c));}return c;}
function _PO(a,b,c){var f,e,d;while (d = b.right) {e = b.key;f = b.value;b = b.left;c = a(e,f,_PO(a,d,c));}return c;}
function _PP(a){return function (b,c,d){var e,f,g;while (g = b.right) {f = b.key;e = b.value;d = _PP(a)(b.left,c,d);var h =d.f2;b = g;c = a(h + 1,f,e,d.f1);d = h + 1;}return {f1:c,f2:d};};}
function _PQ(a,b,c){return _PP(a)(b,c,0).f1;}
function _PR(a){return function (b,c,d){var e,f,g;while (g = b.right) {f = b.key;e = b.value;g = _PR(a)(g,c,d);d = g.f2;b = b.left;c = a(d + 1,f,e,g.f1);d++;}return {f1:c,f2:d};};}
function _PS(a,b,c){return _PR(a)(b,c,0).f1;}
function _PT(a,b){return function (c,d,e){return a(c,d)?_PM(b,c,d,e):e;};}
function _PU(a,b,c){return _PN(_PT(b,a),c,_RJ);}
function _PV(a,b,c){return function (d){return _PM(a,c,d,b);};}
function _PW(a,b){return function (c,d,e){return _Iw(_PV(b,e,c),e,a(d));};}
function _PX(a,b,c){return _PN(_PW(b,a),c,_RJ);}
function _PY(a,b){var d,c;return (c = b.left)?(d = b.key,_PB(_PY(a,c),d,a(d,b.value),_PY(a,b.right),b.height)):_RJ;}
function _PZ(a,b,c,d){return function (){return _GM({f1:{f1:d,f2:c},f2:_Pb(b,a)});};}
function _Pb(a,b){var e,d,c;while (c = a.right) {d = a.key;e = a.value;a = a.left;b = {next:_PZ(b,c,e,d)};}return b;}
function _Pd(a,b,c,d){return function (){return _GM({f1:{f1:c,f2:b},f2:_Pc(d,a)});};}
function _Pc(a,b){var f,e,d,c;while (c = a.right) {d = a.key;e = a.left;f = a.value;a = c;b = {next:_Pd(b,f,d,e)};}return b;}
function _Pe(a){var b,c,d;return (b = a.right)?(c = _CS(1,_BZ(a.height,2)) + 1,d = _BZ(c,2),c = _CY(c),b = c < d?_Pe(a.left):c > d?_Pe(b):_Of,b.some?b:_GM({f1:a.key,f2:a.value})):_Of;}
function _Pf(a){return function (b,c,d){return a(b,c);};}
function _Pg(a,b,c){return _Gd(a,c);}
function _Ph(a,b){return _PK(a,b);}
function _Pi(a,b){return function (c){var d,e,f;while (e = c.right) {d = c.key;f = a(b,d);if (f.eq) {return _GM({key:d,val:c.value});} else {if (f.lt) {c = c.left;} else {c = e;}}}return _Of;};}
function _Pj(a){return function (b,c){return _Pi(a,b)(c);};}
function _Pk(a,b,c){return function (d){var e,f,g,h;return (g = d.right)?(f = d.key,e = d.left,d = d.value,h = a(c,f),h.eq?_PC(e,f,b(d),g):h.lt?_PC(_Pk(a,b,c)(e),f,d,g):_PC(e,f,d,_Pk(a,b,c)(g))):d;};}
function _Pl(a,b){return function (c){var d,e,f;while (f = c.right) {e = c.key;d = c.left;var g =b(e),h =a(e);if (g) {if (h) {d = _Pl(a,b)(d);h = _Pl(a,b)(f);return {f1:_PD(d.f1,e,c.value,h.f1),f2:d.f2 + h.f2 + 1};} else {c = d;}} else {if (h) {c = f;} else {return {f1:_RJ,f2:0};}}}return {f1:_RJ,f2:0};};}
function _Pm(a,b,c){return _Pl(b,a)(c).f1;}
function _Pn(a,b){return function (c){return _JL(c,b,a);};}
function _Po(a,b){return function (c){return _JK(c,b,a);};}
function _Pp(a){return function (b,c,d){return _Pm(_Pn(a,b),_Po(a,c),d);};}
function _Pq(a,b,c){return function (d){var e,f,g,h,i;return (h = d.right)?(g = d.key,f = d.left,e = d.value,i = a(c,g),i.eq?_PB(f,c,b,h,d.height):i.lt?_PD(_Pq(a,b,c)(f),g,e,h):_PD(f,g,e,_Pq(a,b,c)(h))):_Oy(c,b);};}
function _Pr(a){return function (b,c){return _PU(a,b,c);};}
function _Ps(a,b,c){return _PO(a,b,c);}
function _Pt(a,b){return function (c){var d,e,f,g;return (g = c.right)?(f = c.key,e = c.left,d = c.value,c = a(b,f),c.eq?_PH(e,g):c.lt?_PD(_Pt(a,b)(e),f,d,g):_PD(e,f,d,_Pt(a,b)(g))):_RJ;};}
function _Pu(a){var b;return (b = a.left)?b.empty?{f1:a.right,f2:_GM({f1:a.key,f2:a.value})}:(b = _Pu(b),{f1:_PD(b.f1,a.key,a.value,a.right),f2:b.f2}):{f1:_RJ,f2:_Of};}
function _Pv(a,b){return function (c,d){var e,f,g,h,i;while (true) {i = {f1:c.next(),f2:d.next()};if (!(h = i.f1.some) && !i.f2.some) {return {eq:_C};} else {if (h && (f = i.f2.some)) {g = h.f1;e = i.f2.some.f1;f = a(g.f1,e.f1);if (f.eq) {f = b(g.f2,e.f2);if (f.eq) {c = h.f2;d = i.f2.some.f2;} else {return f;}} else {return f.lt?{lt:_C}:{gt:_C};}} else {if (h) {if (f) {_X("File \"lib/stdlib/core/map/map.opa\", line 974, characters 8-483, (974:8-987:30 | 38694-39169): Match failure 2839827");} else {return {gt:_C};}} else {return {lt:_C};}}}}};}
function _Pw(a,b,c){return function (d){var e,f,g,h;return (h = d.right)?(g = d.key,f = d.left,e = d.value,d = a(c,g),d.eq?{none:_C}:d.lt?(f = _Pw(a,b,c)(f).some)?_GM(_PD(f,g,e,h)):{none:_C}:(h = _Pw(a,b,c)(h).some)?_GM(_PD(f,g,e,h)):{none:_C}):_GM(_Oy(c,b));};}
function _Px(a,b,c){return _PS(a,b,c);}
function _Py(a){return function (b,c,d){return _Pq(a,c,b)(d);};}
function _QA(a,b,c){return _PN(a,b,c);}
function _QB(a){return function (b,c){return _PN(_Py(a),b,c);};}
function _QC(a){return _Pe(a);}
function _QD(a,b){return _PN(_Pf(a),b,_OZ);}
function _QE(a){return true;}
function _QF(a){return function (b,c){return _Pm(_QE,_Po(a,b),c);};}
function _QG(a,b){return function (c){var d,e;while (d = c.right) {e = a(b,c.key);if (e.eq) {return _GM(c.value);} else {if (e.lt) {c = c.left;} else {c = d;}}}return _Of;};}
function _QH(a,b){return function (c){var d,e;while (d = c.right) {e = a(b,c.key);if (e.eq) {return true;} else {if (e.lt) {c = c.left;} else {c = d;}}}return false;};}
function _QI(a){return _Pb(a,_Ox);}
function _QJ(a){return function (b,c,d){return _Pv(a,b)(_QI(c),_QI(d));};}
function _QK(a,b,c){return _Gd(b,c);}
function _QL(a){return function (b,c,d){return a(b,c)?_Gd({f1:b,f2:c},d):d;};}
function _QM(a){var b;return (b = a.right)?1 + _QM(a.left) + _QM(b):0;}
function _QN(a,b,c){return function (d){var e,f,g,h;return (h = d.right)?(g = d.key,f = d.left,e = d.value,d = a(c,g),d.eq?_PC(f,g,b(_GM(e)),h):d.lt?_PC(_QN(a,b,c)(f),g,e,h):_PC(f,g,e,_QN(a,b,c)(h))):_PC(_RJ,c,b(_Of),_RJ);};}
function _QO(a,b){return function (c){var d,e,f,g;return (g = c.right)?(f = c.key,e = c.left,d = c.value,c = a(b,f),c.eq?{f1:_PH(e,g),f2:_GM(d)}:c.lt?(c = _QO(a,b)(e),{f1:_PD(c.f1,f,d,g),f2:c.f2}):(c = _QO(a,b)(g),{f1:_PD(e,f,d,c.f1),f2:c.f2})):{f1:_RJ,f2:_Of};};}
function _QP(a){return function (b,c){return b = _QO(a,b)(c),{f1:b.f1,f2:b.f2};};}
function _QQ(a,b){return _PN(_QL(a),b,{nil:_C});}
function _QR(a){return function (b,c,d){return _Pw(a,c,b)(d);};}
function _QS(a){return function (b,c){return (b = _QR(a)(b.f1,b.f2,c).some)?b:c;};}
function _QT(a,b){return function (c){return _Fh(_QS(a),c,b);};}
function _QU(a,b){return function (c,d){var e,f,g,h,i;while (true) {h = {f1:c.next(),f2:d.next()};if (!(g = h.f1.some) && !h.f2.some) {return {eq:_C};} else {if (g && (e = h.f2.some)) {f = g.f1;e = h.f2.some.f1;i = a(f.f1,e.f1);if (i.eq) {e = b(f.f2,e.f2);if (e.eq) {c = g.f2;d = h.f2.some.f2;} else {return e;}} else {return i.lt?{lt:_C}:{gt:_C};}} else {if (g) {if (e) {_X("File \"lib/stdlib/core/map/map.opa\", line 956, characters 7-500, (956:7-969:33 | 37979-38472): Match failure 6215657");} else {return {gt:_C};}} else {return {lt:_C};}}}}};}
function _QV(a){return function (b,c,d){return _QU(a,b)(_QI(c),_QI(d));};}
function _QW(a){return _PA(a);}
function _QX(a){return function (b,c){return _QG(a,b)(c);};}
function _QY(a){return function (b){var c;return (c = b.right)?a(b.key,b.value) || (_QY(a)(b.left) || _QY(a)(c)):false;};}
function _QZ(a,b){return _QY(a)(b);}
function _Qb(a){return _Pc(a,_Ox);}
function _Qc(a){return function (b,c,d){return _QN(a,c,b)(d);};}
function _Qd(a){return _PO(_Pg,a,_Oh);}
function _Qe(a){return function (b,c){return _PX(a,b,c);};}
function _Qf(a){return function (b){var c,d,e,f;while (e = b.right) {d = b.key;c = b.value;if (f = _Qf(a)(b.left).some,f != null) {return _GM(f);} else {if (a(d,c)) {return _GM({key:d,val:c});} else {b = e;}}}return _Of;};}
function _Qg(a){var b;return (b = a.right)?b.empty?{f1:a.left,f2:_GM({f1:a.key,f2:a.value})}:(b = _Qg(b),{f1:_PD(a.left,a.key,a.value,b.f1),f2:b.f2}):{f1:_RJ,f2:_Of};}
function _Qh(a){return a.empty?true:false;}
function _Qi(a){return function (b,c){return _QH(a,b)(c);};}
function _Qj(a){return function (b,c,d){var e,f;return (f = b.right)?(e = b.key,f = _Qj(a)(f,c,_Qj(a)(b.left,c,d)),_Qi(a)(e,c)?_Py(a)(e,b.value,f):f):d;};}
function _Qk(a,b){return function (c,d){return _Qh(c) || _Qh(d)?b:_PA(c) < _PA(d)?_Qj(a)(c,d,b):_Qj(a)(d,c,b);};}
function _Ql(a,b){return _PY(a,b);}
function _Qm(a){return a = _Pu(a),{f1:a.f1,f2:a.f2};}
function _Qn(a,b,c){return _Gd({f1:a,f2:b},c);}
function _Qo(a){return a = _Qg(a),{f1:a.f1,f2:a.f2};}
function _Qp(a){return function (b,c){return _Pm(_Pn(a,b),_QE,c);};}
function _Qq(a){return function (b,c,d){return _Pk(a,c,b)(d);};}
function _Qr(a,b,c){return _PQ(a,b,c);}
function _Qs(a){return _PO(_Qn,a,_Oh);}
function _Qt(a,b){return _Oy(a,b);}
function _Qu(a){return _QM(a);}
function _Qv(a,b){return _Qf(a)(b);}
function _Qw(a){return function (b,c){return _Pt(a,b)(c);};}
function _Qx(a){return _PO(_QK,a,_Oh);}
function _Qy(a){var b;return b = {empty:_C},{empty:b,is_empty:_Qh,singleton:_Qt,height:_QW,size:_Qu,find:_Qv,get:_QX(a),get_key_val:_Pj(a),add:_Py(a),add_without_erasing:_QR(a),remove:_Qw(a),union:_QB(a),retrieve:_QQ,replace:_Qq(a),replace_or_add:_Qc(a),contains:_Qi(a),mem:_Qi(a),exists:_QZ,rev_fold:_Ps,fold:_QA,foldi:_Qr,rev_foldi:_Px,map:_Ph,filter:_Pr(a),filter_map:_Qe(a),mapi:_Ql,iter:_QD,min_binding:_PF,max_binding:_PJ,extract:_QP(a),extract_min_binding:_Qm,extract_max_binding:_Qo,random_get:_QC,sub_map_gen:_Pm,submap:_Pp(a),greater:_Qp(a),lesser:_QF(a),intersection:_Qk(a,b),From:{assoc_list:_QT(a,b)},To:{iter:_QI,rev_iter:_Qb,assoc_list:_Qs,key_list:_Qd,val_list:_Qx},compare:_QV(a),order_maps:_QJ(a)};}
function _RA(a){return _Qy(_JI(a));}
function _RB(a){return _If(a," => ");}
function _RC(a){return function (b){return _If(b,a);};}
function _RD(a){return _If(a,"\n");}
function _RE(a,b,c){return function (d,e,f){return _RD((f = _RB(_If(f,c(d))),_RC(b(e))(f)));};}
function _RF(a,b,c,d){return _Ie(_RA(_RG).fold(_RE(_RG,b,a),d,_Ib("")));}
var _RK = _FK("ordered_map",_RF);
var _RL = _Qy(_Gc);
var _RM = _Qy(_GS);
_Dm("__v118_an_66746a24,_TD,_TC,_TB,_TA,_Sy,_Sx,_Sw,__v4_on_success_66746a24,__v3_on_success_66746a24,__v5_on_failure_66746a24,_Sv,__v6_on_success_66746a24,_Su,_St,_Ss,__v7_on_failure_66746a24,_Sr,_Sq,_Sp,_So,_Sn,_Sm,_Sl,__v115_an_66746a24,__v113_an_66746a24,__v112_an_66746a24,_Sk,__v102_an_66746a24,__v103_an_66746a24,_Sj,__v100_an_66746a24,_Si,__v99_an_66746a24,_Sh,__v97_an_66746a24,__v96_an_66746a24,__v95_an_66746a24,__v93_an_66746a24,__v89_an_66746a24,_Sg,__v90_an_66746a24,_Sf,_Se,_Sd,_Sc,_Sb,_SZ,_SY,__v83_an_66746a24,_SX,_SW,_SV,__v80_an_66746a24,_SU,__v79_an_66746a24,_ST,__v77_an_66746a24,_SS,__v76_an_66746a24,_SR,_SQ,__v74_an_66746a24,_SP,__v73_an_66746a24,_SO,_SN,_SM,__v70_an_66746a24,_SL,_SK,__v68_an_66746a24,_SJ,__v67_an_66746a24,__v85_an_66746a24,__v82_an_66746a24,_SI,__v71_an_66746a24,__v66_an_66746a24,__v65_an_66746a24,__v64_an_66746a24,_SH,__v63_an_66746a24,_SG,_SF,_SE,__v60_an_66746a24,_SD,_SC,_SB,__v58_an_66746a24,__v59_an_66746a24,_SA,__v56_an_66746a24,__v57_an_66746a24,__v61_an_66746a24,__v54_an_66746a24,__v51_an_66746a24,__v52_an_66746a24,__v46_an_66746a24,__v50_an_66746a24,__v49_an_66746a24,__v44_an_66746a24,__v40_an_66746a24,__v43_an_66746a24,__v41_an_66746a24,__v38_an_66746a24,__v42_an_66746a24,__v39_an_66746a24,__v45_an_66746a24,__v36_an_66746a24,_Ry,_Rx,_Rw,_Rv,_Ru,__v33_an_66746a24,__v32_an_66746a24,_Rt,_Rs,__v30_an_66746a24,__v29_an_66746a24,_Rr,_Rq,_Rp,__v25_an_66746a24,_Ro,_Rn,__v22_an_66746a24,_Rm,_Rl,_Rk,__v19_an_66746a24,__v17_an_66746a24,_Rj,_Ri,_Rh,_Rg,_Rf,_Re,_Rd,__v9_an_66746a24,__v11_an_66746a24,__v12_an_66746a24,__v8_an_66746a24,__v6_an_66746a24,_Rc,_Rb,_RZ,_RY,_RX,_RW,_RV,_RU,_RT,_RS,_RR,_RQ,_RP,_RO,_RN");
var _TE = {TyName_args:_LN,TyName_ident:"text"};
var _TF = {TyName_args:_LN,TyName_ident:"itextrator"};
function _RN(a,b,c){return a?_GM({f1:b,f2:c()}):_IW(b).none?_GM({f1:b,f2:c()}):_Of;}
function _RO(a,b){return a?b:(a = b.some)?_IW(a.f1).none?b:_Of:_Of;}
function _RP(a,b){return a.pos == b.pos;}
function _RQ(a){return function (b,c){var d,e;while (e = a(c).some) {d = e.f1;if (_RP(c,d)) {return {f1:c,f2:_Gf(b)};} else {b = _Gd(e.f2,b);c = d;}}return {f1:c,f2:_Gf(b)};};}
function _RR(a,b,c){return b = _RQ(b)({nil:_C},c),a && _Fl(b.f2)?_Of:_GM(b);}
function _RS(a){return function (b){var c;while (c = a(b).some) {c = c.f1;if (_RP(b,c)) {return b;} else {b = c;}}return b;};}
function _RT(a,b,c){return b = _RS(b)(c),a && _RP(c,b)?_Of:_GM({f1:b,f2:_OZ});}
function _RU(a,b){var d,c;return c = a.pos,d = a.txt,c + b.length > d.length?_Of:_Bv(d,c,b)?_GM({f1:_IY(a,b.length),f2:b}):_Of;}
function _RV(){return _OZ;}
function _RW(a,b){return (b = _RU(b,"").some)?_RN(a,b.f1,_RV):{none:_C};}
function _RX(){return {nil:_C};}
function _RY(a,b){return (b = _RW(a,b).some)?_RN(a,b.f1,_RX):{none:_C};}
function _RZ(a,b){return function (){return _Gd(a,b);};}
function _Rb(a,b){return function (c,d){var e;return (d = a(true,d).some)?(e = _Rc(b - 1,a)(c,d.f1).some)?_RN(c,e.f1,_RZ(d.f2,e.f2)):{none:_C}:{none:_C};};}
function _Rc(a,b){return a > 0?_Rb(b,a):_RY;}
function _Rd(a,b){return function (){var c;return (c = _RW(b,a).some)?_RN(b,c.f1,_RX):{none:_C};};}
function _Re(a,b){return function (){var c;return (c = _RW(b,a).some)?_RN(b,c.f1,_RX):{none:_C};};}
function _Rf(a,b){return function (c){return (c = a(true,c).some)?(c = b(true,c.f1).some)?{some:{f1:c.f1,f2:c.f2}}:{none:_C}:{none:_C};};}
function _Rg(a,b){return function (c,d){var e,f;return (e = ((e = b(true,d).some)?(f = _RR(false,_Rf(a,b),e.f1).some)?_RN(c,f.f1,_RZ(e.f2,f.f2)):{none:_C}:{none:_C}).some)?{some:e}:_Rd(d,c)();};}
function _Rh(a){return function (){return a;};}
function _Ri(a,b){return function (c,d){var e;return (e = ((e = a(true,d).some)?(e = _Rg(a,b)(c,e.f1).some)?_RN(c,e.f1,_Rh(e.f2)):{none:_C}:{none:_C}).some)?{some:e}:_Re(d,c)();};}
function _Rj(a,b,c){return a?_Ri(c,b):_Rg(c,b);}
function _Rk(a,b){return (b = (_IW(b).none?{some:{f1:b,f2:_C}}:{none:_C}).some)?_RN(a,b.f1,_RV):{none:_C};}
function _Rl(){return _Bd("[Rule.fail] Internal parsing error.","File \"lib/stdlib/core/parser/rules.opa\", line 303, characters 28-71, (303:28-303:71 | 10168-10211)");}
function _Rm(a,b){var c;return (b = _Rk(true,b).some)?(b = ((c = _IW(b.f1).some)?(b = c.f2,b == 46?{some:{f1:c.f1,f2:b}}:{none:_C}):{none:_C}).some)?_RN(a,b.f1,_Rl):{none:_C}:{none:_C};}
function _Rn(a,b){return function (c,d){var e;return (e = b(true,d).some)?(d = e.f2,(e = (_GA(0,d) < a?_Rm:_RW)(c,e.f1).some)?_RN(c,e.f1,_Rh(d)):{none:_C}):{none:_C};};}
function _Ro(a,b,c,d){return _Rn(a,_Rj(b,c,d));}
function _Rp(a){return function (){return _CP(_Ie(a));};}
function _Rq(a,b){return function (){return _Il(a,b);};}
function _Rr(a,b){var c,d;return (c = ((c = ((c = _IW(b).some)?(d = c.f2,d >= 48 && 57 >= d?{some:{f1:c.f1,f2:d}}:{none:_C}):{none:_C}).some)?(c = c.f1,_RN(a,c,_Rq(b,c))):{none:_C}).some)?_RN(a,c.f1,_Rp(c.f2)):{none:_C};}
function _Rs(a){var b;return (a = _IW(a).some)?(b = a.f2,b >= 48 && 57 >= b?{some:{f1:a.f1,f2:b}}:{none:_C}):{none:_C};}
function _Rt(a,b){var c;return (b = ((c = _RT(true,_Rs,b).some)?(c = c.f1,_RN(a,c,_Rq(b,c))):{none:_C}).some)?_RN(a,b.f1,_Rp(b.f2)):{none:_C};}
function _Ru(a){return function (b,c){var d;return (c = ((d = _Rc(a,_Rr)(b,c).some)?(d = d.f1,_RN(b,d,_Rq(c,d))):{none:_C}).some)?_RN(b,c.f1,_Rp(c.f2)):{none:_C};};}
function _Rv(a){return -1;}
function _Rw(a,b){return function (){return _Iw(_Rv,1,a) * b;};}
function _Rx(a,b){var c;return (b = ((c = _RU(b,"-").some)?{some:{f1:c.f1,f2:{some:c.f2}}}:{some:{f1:b,f2:{none:_C}}}).some)?(c = _Rt(a,b.f1).some)?_RN(a,c.f1,_Rw(b.f2,c.f2)):{none:_C}:{none:_C};}
function _Ry(){return _C;}
function _SA(a,b){return function (){var c;return (c = _RU(a,"\x00").some)?(c = c.f1,_RN(b,c,_Rq(a,c))):{none:_C};};}
function _SB(a,b){return function (){var c;return (c = ((c = _RU(a,"\x0b").some)?(c = c.f1,_RN(b,c,_Rq(a,c))):{none:_C}).some)?{some:c}:_SA(a,b)();};}
function _SC(a,b){return function (){var c;return (c = ((c = _RU(a,"\n").some)?(c = c.f1,_RN(b,c,_Rq(a,c))):{none:_C}).some)?{some:c}:_SB(a,b)();};}
function _SD(a,b){return function (){var c;return (c = ((c = _RU(a,"\r").some)?(c = c.f1,_RN(b,c,_Rq(a,c))):{none:_C}).some)?{some:c}:_SC(a,b)();};}
function _SE(a,b){return function (){var c;return (c = ((c = _RU(a,"\x09").some)?(c = c.f1,_RN(b,c,_Rq(a,c))):{none:_C}).some)?{some:c}:_SD(a,b)();};}
function _SF(a,b){var c;return (c = ((c = _RU(b," ").some)?(c = c.f1,_RN(a,c,_Rq(b,c))):{none:_C}).some)?{some:c}:_SE(b,a)();}
function _SG(a){return _SF(true,a);}
function _SH(a,b){return (b = _RT(false,_SG,b).some)?_RN(a,b.f1,_RV):{none:_C};}
function _SI(){return 12;}
function _SJ(a,b){return function (){var c;return (c = _RU(a,"F").some)?_RN(b,c.f1,_Ry):{none:_C};};}
function _SK(){return 15;}
function _SL(a,b){return function (){var c;return (c = ((c = ((c = _RU(a,"f").some)?_RN(b,c.f1,_Ry):{none:_C}).some)?{some:c}:_SJ(a,b)()).some)?_RN(b,c.f1,_SK):{none:_C};};}
function _SM(a,b){return function (){var c;return (c = _RU(a,"E").some)?_RN(b,c.f1,_Ry):{none:_C};};}
function _SN(){return 14;}
function _SO(a,b){return function (){var c;return (c = ((c = ((c = ((c = _RU(a,"e").some)?_RN(b,c.f1,_Ry):{none:_C}).some)?{some:c}:_SM(a,b)()).some)?_RN(b,c.f1,_SN):{none:_C}).some)?{some:c}:_SL(a,b)();};}
function _SP(a,b){return function (){var c;return (c = _RU(a,"D").some)?_RN(b,c.f1,_Ry):{none:_C};};}
function _SQ(){return 13;}
function _SR(a,b){return function (){var c;return (c = ((c = ((c = ((c = _RU(a,"d").some)?_RN(b,c.f1,_Ry):{none:_C}).some)?{some:c}:_SP(a,b)()).some)?_RN(b,c.f1,_SQ):{none:_C}).some)?{some:c}:_SO(a,b)();};}
function _SS(a,b){return function (){var c;return (c = _RU(a,"C").some)?_RN(b,c.f1,_Ry):{none:_C};};}
function _ST(a,b){return function (){var c;return (c = ((c = ((c = ((c = _RU(a,"c").some)?_RN(b,c.f1,_Ry):{none:_C}).some)?{some:c}:_SS(a,b)()).some)?_RN(b,c.f1,_SI):{none:_C}).some)?{some:c}:_SR(a,b)();};}
function _SU(a,b){return function (){var c;return (c = _RU(a,"B").some)?_RN(b,c.f1,_Ry):{none:_C};};}
function _SV(){return 11;}
function _SW(a,b){return function (){var c;return (c = ((c = ((c = ((c = _RU(a,"b").some)?_RN(b,c.f1,_Ry):{none:_C}).some)?{some:c}:_SU(a,b)()).some)?_RN(b,c.f1,_SV):{none:_C}).some)?{some:c}:_ST(a,b)();};}
function _SX(a,b){return function (){var c;return (c = _RU(a,"A").some)?_RN(b,c.f1,_Ry):{none:_C};};}
function _SY(){return 10;}
function _SZ(a,b){return function (){var c;return (c = ((c = ((c = ((c = _RU(a,"a").some)?_RN(b,c.f1,_Ry):{none:_C}).some)?{some:c}:_SX(a,b)()).some)?_RN(b,c.f1,_SY):{none:_C}).some)?{some:c}:_SW(a,b)();};}
function _Sb(a,b){var c;return (c = ((c = _Rr(a,b).some)?_RN(a,c.f1,_Rh(c.f2)):{none:_C}).some)?{some:c}:_SZ(b,a)();}
function _Sc(a,b){return b * 16 + a;}
function _Sd(a){return _Sb(true,a);}
function _Se(a){return function (){return _Fh(_Sc,a,0);};}
function _Sf(a,b){return (b = _RR(true,_Sd,b).some)?_RN(a,b.f1,_Se(b.f2)):{none:_C};}
function _Sg(a){return function (){return _Ie(a);};}
function _Sh(a,b){var c,d;return (c = ((c = ((c = _IW(b).some)?(d = c.f2,d >= 97 && 122 >= d || (d >= 65 && 90 >= d || d >= 48 && 57 >= d)?{some:{f1:c.f1,f2:d}}:{none:_C}):{none:_C}).some)?(c = c.f1,_RN(a,c,_Rq(b,c))):{none:_C}).some)?_RN(a,c.f1,_Sg(c.f2)):{none:_C};}
function _Si(a){return _Sh(true,a);}
function _Sj(a,b){var c;return (c = ((c = _RT(true,_Si,b).some)?(c = c.f1,_RN(a,c,_Rq(b,c))):{none:_C}).some)?_RN(a,c.f1,_Sg(c.f2)):{none:_C};}
function _Sk(a){return function (b,c){return _RO(b,_RU(c,a));};}
function _Sl(a,b,c,d,e){return (b = b(a,c).some)?e({f1:b.f1,f2:b.f2}):d();}
function _Sm(a,b,c,d,e){return _Sl(a,b,_Ih(c),d,e);}
function _Sn(a,b,c,d,e){return _Sm(a,b,_Ib(c),d,e);}
var _TG = {genparse:_Sn};
function _So(a,b){return function (c,d,e){return c = c.length < 20?c:_Ik(0,20,c) + "...",_Bd(_Fk({hd:"Parse error: function ",tl:{hd:_HQ(b)(e),tl:{hd:" on string: <",tl:{hd:c,tl:{hd:"> ",tl:{hd:_HQ(a)(d),tl:{nil:_C}}}}}}}),"File \"lib/stdlib/core/parser/parser.opa\", line 115, characters 5-64, (115:5-115:64 | 4381-4440)");};}
function _Sp(){return _Of;}
function _Sq(a){return a.f2;}
function _Sr(a,b){return _Bd("","File \"lib/stdlib/core/parser/parser.opa\", line 171, characters 7-11, (171:7-171:11 | 6346-6350)");}
function _Ss(a){return _GM(a.f2);}
function _St(a,b){return function (c,d){return b.genparse(true,c,d,_Sp,_Ss);};}
function _Su(a,b){return function (){return _So(_LW,_LW)(_HQ(a)(b),"File \"lib/stdlib/core/parser/parser.opa\", line 153, characters 41-52, (153:41-153:52 | 5626-5637)","partial_parse");};}
function _Sv(a,b){return function (c,d){return b.genparse(true,c,d,_Su(a,d),_Sq);};}
function _Sw(a,b){return function (){return _So(_LW,_LW)(_HQ(a)(b),"File \"lib/stdlib/core/parser/parser.opa\", line 129, characters 41-52, (129:41-129:52 | 4760-4771)","parse");};}
function _Sx(a,b){return function (c,d){return b.genparse(false,c,d,_Sw(a,d),_Sq);};}
function _Sy(a,b){return function (c,d){return b.genparse(false,c,d,_Sp,_Ss);};}
function _TA(a,b){return function (c,d){return b.genparse(false,c,d,_Sp,_Sq);};}
function _TB(a){return function (b){return {parse_generic:b.genparse,parse:_Sx(a,b),try_parse:_Sy(a,b),try_parse_opt:_TA(a,b),partial_parse:_Sv(a,b),partial_try_parse:_St(a,b),parse_and_it:_Sr};};}
var _TH = _TB(_LW)(_TG);
function _TC(a,b){return _TH.parse(a,b);}
function _TD(a,b){return _TH.try_parse(a,b);}
var _TI = {genparse:_Sm};
var _TJ = _TB(_TE)(_TI);
var _TK = {genparse:_Sl};
var _TL = _TB(_TF)(_TK);
_Dm("_UO,_UN,_UM,__v8_an_fd8e7cbf,_UL,_UK,_UJ,_UI,_UH,_UG,__v1_lower_fd8e7cbf,_UF,_UE,_UD,_UC,_UB,_UA,_Ty,_Tx,_Tw,_Tv,_Tu,__v6_an_fd8e7cbf,_Tt,_Ts,_Tr,_Tq,_Tp,_To,_Tn,_Tm,_Tl,_Tk,_Tj,_Ti,_Th,_Tg,_Tf,_Te,_Td,_Tc,_Tb,_TZ,_TY,_TX,_TW,__v2_upper_fd8e7cbf,__v2_lower_fd8e7cbf,_TV,_TU,__v2_an_fd8e7cbf,_TT,_TS,_TR,_TQ,_TP,_TO,_TN,_TM");
var _UP = {TyName_args:_MG,TyName_ident:"option"};
function _TM(a){return function (b,c){return a(b);};}
function _TN(){return "Set.unsafe_min_binding";}
function _TO(a,b){return function (c){return _JK(c,b,a);};}
function _TP(a){return function (b,c){return a.union(b,c);};}
function _TQ(a,b){return {eq:_C};}
function _TR(a){return function (b,c){return a.compare(_TQ,b,c).eq?true:false;};}
function _TS(a){return function (b,c){return a.contains(b,c);};}
function _TT(a){return true;}
function _TU(){return "Set.unsafe_max_binding";}
function _TV(a){return _JP(_TU,a);}
function _TW(a,b){return function (c,d){return b.sub_map_gen(_TT,_TO(a,c),d);};}
function _TX(a){return function (b){return b = a.extract_max_binding(b),{f1:b.f1,f2:(b = b.f2.some)?{some:b.f1}:{none:_C}};};}
function _TY(a){return function (b){return _TX(a)(b).f1;};}
function _TZ(a){return function (b,c){return a.add(b,_OZ,c);};}
function _Tb(a){return function (b){return a.is_empty(b);};}
function _Tc(a){return function (b){return a.singleton(b,_OZ);};}
function _Td(a){return function (b){return a.height(b);};}
function _Te(a){return function (b){return a.size(b);};}
function _Tf(a){return function (b,c){return a.exists(_TM(b),c);};}
function _Tg(a){return a.key;}
function _Th(a){return function (b,c){return _JM(_Tg,a.get_key_val(b,c));};}
function _Ti(a){return function (b,c){return (b = a.find(_TM(b),c).some)?_GM(b.key):_Of;};}
function _Tj(a,b){return function (c,d,e){return b(c)?a.add(c,_OZ,e):e;};}
function _Tk(a){return function (b,c){return a.fold(_Tj(a,b),c,a.empty);};}
function _Tl(a){return function (b,c,d){return a(b,d);};}
function _Tm(a){return function (b,c,d){return a.fold(_Tl(b),c,d);};}
function _Tn(a){return function (b,c){return a.extract(b,c).f1;};}
function _To(a,b){return function (c,d){return _TZ(a)(b(c),d);};}
function _Tp(a,b){return function (c,d){return _Tm(a)(_To(a,c),d,b);};}
function _Tq(a,b){return function (c,d){return b.add(a(c),_OZ,d);};}
function _Tr(a){return function (b,c,d){return c = _Qy(c),_Tm(a)(_Tq(b,c),d,c.empty);};}
function _Ts(a,b){return function (c,d){return a.add(b(c),d);};}
function _Tt(a){return function (b,c,d){return _Tm(a)(_Ts(c,b),d,c.empty);};}
function _Tu(a){return function (b,c){return a.iter(_TM(b),c);};}
function _Tv(a){return function (b,c){return a.intersection(b,c);};}
function _Tw(a){return function (b){return b = a.extract_min_binding(b),{f1:b.f1,f2:(b = b.f2.some)?{some:b.f1}:{none:_C}};};}
function _Tx(a){return function (b){return _Tw(a)(b).f2;};}
function _Ty(a){return _JP(_TN,a);}
function _UA(a){return function (b){return _Ty(_Tx(a)(b));};}
function _UB(a){return function (b){return _Tw(a)(b).f1;};}
function _UC(a){return function (b){return _TX(a)(b).f2;};}
function _UD(a){return function (b){return _TV(_UC(a)(b));};}
function _UE(a,b){return function (c){return _JL(c,b,a);};}
function _UF(a,b){return function (c,d,e){return b.sub_map_gen(_UE(a,c),_TO(a,d),e);};}
function _UG(a,b){return function (c,d){return b.sub_map_gen(_UE(a,c),_TT,d);};}
function _UH(a){return a.f1;}
function _UI(a){return function (b){return _JM(_UH,a.random_get(b));};}
function _UJ(a){return {f1:a,f2:_OZ};}
function _UK(a){return function (b){return a.From.assoc_list(_Gi(_UJ,b,0));};}
function _UL(a){return function (b){return a.To.key_list(b);};}
function _UM(a){return function (b){return _Ow(_UH,a.To.iter(b));};}
function _UN(a){var c,b;return b = _Qy(a),c = b.empty,{empty:c,is_empty:_Tb(b),singleton:_Tc(b),height:_Td(b),size:_Te(b),add:_TZ(b),exists:_Tf(b),contains:_TS(b),mem:_TS(b),get:_Th(b),find:_Ti(b),filter:_Tk(b),fold:_Tm(b),remove:_Tn(b),map:_Tp(b,c),map_to_different_order:_Tr(b),map_to_different_set:_Tt(b),iter:_Tu(b),From:{list:_UK(b)},To:{list:_UL(b),iter:_UM(b)},equal:_TR(b),intersection:_Tv(b),union:_TP(b),pop_min_binding:_Tw(b),min_binding:_Tx(b),unsafe_min_binding:_UA(b),remove_min_binding:_UB(b),pop_max_binding:_TX(b),max_binding:_UC(b),unsafe_max_binding:_UD(b),remove_max_binding:_TY(b),subset:_UF(a,b),greater:_UG(a,b),less:_TW(a,b),random_get:_UI(b)};}
function _UO(a){return _UN(_JI(a));}
var _UQ = _UN(_GS);
var _UR = _UN(_Gc);
_Dm("_Yn,__v1_to_formatted_string_7e5812a5,_Ym,___milliseconds_7e5812a5,__v1_in_milliseconds_7e5812a5,__v1_ordering_7e5812a5,__v1_compare_7e5812a5,___shift_backward_7e5812a5,___time_t_of_int_7e5812a5,__v222_an_7e5812a5,__v221_an_7e5812a5,__v209_an_7e5812a5,__v208_an_7e5812a5,__v213_an_7e5812a5,__v214_an_7e5812a5,__v205_an_7e5812a5,__v203_an_7e5812a5,__v201_an_7e5812a5,__v200_an_7e5812a5,__v198_an_7e5812a5,_Yl,_Yk,_Yj,_Yi,_Yh,_Yg,_Yf,__v188_an_7e5812a5,_Ye,_Yd,_Yc,__v184_an_7e5812a5,_Yb,__v183_an_7e5812a5,_YZ,__v178_an_7e5812a5,_YY,_YX,_YW,_YV,_YU,_YT,__v170_an_7e5812a5,_YS,__v168_an_7e5812a5,_YR,__v166_an_7e5812a5,_YQ,_YP,_YO,_YN,_YM,_YL,_YK,_YJ,_YI,_YH,_YG,_YF,_YE,_YD,_YC,_YB,_YA,_Xy,_Xx,_Xw,_Xv,_Xu,_Xt,___id_7e5812a5,_Xs,_Xr,__v151_an_7e5812a5,_Xq,_Xp,_Xo,_Xn,_Xm,_Xl,_Xk,_Xj,__v145_an_7e5812a5,_Xi,_Xh,_Xg,_Xf,_Xe,_Xd,_Xc,_Xb,_XZ,__v138_an_7e5812a5,_XY,_XX,__v136_an_7e5812a5,_XW,_XV,_XU,__v134_an_7e5812a5,_XT,_XS,_XR,_XQ,_XP,_XO,_XN,__v12_f_7e5812a5,_XM,_XL,_XK,_XJ,_XI,__v126_an_7e5812a5,_XH,_XG,_XF,_XE,_XD,_XC,__v121_an_7e5812a5,__v122_an_7e5812a5,_XB,__v118_an_7e5812a5,_XA,_Wy,_Wx,_Ww,_Wv,_Wu,_Wt,_Ws,_Wr,_Wq,_Wp,_Wo,_Wn,_Wm,_Wl,_Wk,_Wj,_Wi,_Wh,_Wg,_Wf,_We,_Wd,_Wc,_Wb,_WZ,_WY,_WX,_WW,_WV,_WU,_WT,_WS,_WR,_WQ,_WP,_WO,_WN,_WM,_WL,_WK,_WJ,_WI,_WH,_WG,_WF,_WE,_WD,_WC,_WB,_WA,_Vy,_Vx,_Vw,_Vv,_Vu,_Vt,_Vs,_Vr,__v1_ll_export_7e5812a5,___export_7e5812a5,_Vq,_Vp,___ll_export_7e5812a5,___export_t_7e5812a5,___advance_7e5812a5,___ordering_7e5812a5,_Vo,__v52_an_7e5812a5,__v51_an_7e5812a5,___in_milliseconds_7e5812a5,___ll_import_7e5812a5,___import_t_7e5812a5,___time_now_7e5812a5,__v1_ll_import_7e5812a5,___import_7e5812a5,___between_7e5812a5,__v46_an_7e5812a5,__v44_an_7e5812a5,_Vn,_Vm,_Vl,__v35_an_7e5812a5,_Vk,__v36_an_7e5812a5,_Vj,_Vi,_Vh,_Vg,_Vf,_Ve,_Vd,_Vc,_Vb,_VZ,_VY,_VX,_VW,_VV,_VU,_VT,_VS,_VR,_VQ,_VP,_VO,_VN,_VM,_VL,_VK,_VJ,_VI,_VH,__v14_an_7e5812a5,_VG,_VF,_VE,_VD,_VC,_VB,_VA,_Uy,_Ux,_Uw,_Uv,_Uu,_Ut,_Us,_Ur,_Uq,_Up,_Uo,_Un,_Um,_Ul,_Uk,_Uj,_Ui,_Uh,_Ug,_Uf,_Ue,_Ud,_Uc,_Ub,_UZ,_UY,_UX,_UW,_UV,_UU,_UT,_US");
var _Yo = {hd:_Lr,tl:_LN};
function _US(a){return function (b,c){return a;};}
var _Yp = _US("");
var _Yq = _CQ(2628000000.);
function _UT(){return {success:604800000.};}
function _UU(){return {success:60000.};}
function _UV(){return {success:3600000.};}
function _UW(a,b){return function (){return _Il(a,b);};}
function _UX(){return {success:1};}
function _UY(a){return function (){return {failure:_Fk({hd:"Unknown directive: ",tl:{hd:_Ie(a),tl:{nil:_C}}})};};}
function _UZ(a,b){return function (){var c;return (c = ((c = _IW(a).some)?(c = c.f1,_RN(b,c,_UW(a,c))):{none:_C}).some)?_RN(b,c.f1,_UY(c.f2)):{none:_C};};}
function _Ub(){return {success:31536000000.};}
function _Uc(a,b){return function (){var c,d;return (c = ((c = ((c = _IW(a).some)?(d = c.f2,d == 89?{some:{f1:c.f1,f2:d}}:{none:_C}):{none:_C}).some)?_RN(b,c.f1,_Ub):{none:_C}).some)?{some:c}:_UZ(a,b)();};}
function _Ud(){return {success:_Yq};}
function _Ue(a,b){return function (){var c,d;return (c = ((c = ((d = _IW(a).some)?(c = d.f2,c == 77?{some:{f1:d.f1,f2:c}}:{none:_C}):{none:_C}).some)?_RN(b,c.f1,_Ud):{none:_C}).some)?{some:c}:_Uc(a,b)();};}
function _Uf(a,b){return function (){var c,d;return (c = ((c = ((c = _IW(a).some)?(d = c.f2,d == 87?{some:{f1:c.f1,f2:d}}:{none:_C}):{none:_C}).some)?_RN(b,c.f1,_UT):{none:_C}).some)?{some:c}:_Ue(a,b)();};}
function _Ug(){return {success:86400000.};}
function _Uh(a,b){return function (){var c,d;return (c = ((c = ((c = _IW(a).some)?(d = c.f2,d == 68?{some:{f1:c.f1,f2:d}}:{none:_C}):{none:_C}).some)?_RN(b,c.f1,_Ug):{none:_C}).some)?{some:c}:_Uf(a,b)();};}
function _Ui(a,b){return function (){var c,d;return (c = ((c = ((d = _IW(a).some)?(c = d.f2,c == 104?{some:{f1:d.f1,f2:c}}:{none:_C}):{none:_C}).some)?_RN(b,c.f1,_UV):{none:_C}).some)?{some:c}:_Uh(a,b)();};}
function _Uj(a,b){return function (){var c,d;return (c = ((c = ((c = _IW(a).some)?(d = c.f2,d == 109?{some:{f1:c.f1,f2:d}}:{none:_C}):{none:_C}).some)?_RN(b,c.f1,_UU):{none:_C}).some)?{some:c}:_Ui(a,b)();};}
function _Uk(){return {success:1000};}
function _Ul(a,b){return function (){var c,d;return (c = ((c = ((c = _IW(a).some)?(d = c.f2,d == 115?{some:{f1:c.f1,f2:d}}:{none:_C}):{none:_C}).some)?_RN(b,c.f1,_Uk):{none:_C}).some)?{some:c}:_Uj(a,b)();};}
function _Um(a,b){var c,d;return (c = ((c = ((c = _IW(b).some)?(d = c.f2,d == 120?{some:{f1:c.f1,f2:d}}:{none:_C}):{none:_C}).some)?_RN(a,c.f1,_UX):{none:_C}).some)?{some:c}:_Ul(b,a)();}
function _Un(a){return function (){return a;};}
function _Uo(a,b){var c;return (b = ((b = _IW(b).some)?(c = b.f2,c == 37?{some:{f1:b.f1,f2:c}}:{none:_C}):{none:_C}).some)?(b = _Um(a,b.f1).some)?_RN(a,b.f1,_Un(b.f2)):{none:_C}:{none:_C};}
function _Up(a,b){return a + b;}
function _Uq(a,b){return a - b;}
function _Ur(a,b){var c;return c = _BZ(_Hf(b),a),{f1:(b >= 0?_Uq:_Up)(b,c * a),f2:c};}
function _Us(a,b){return function (c,d){return c = _HQ(a)(d),d = b - c.length,d > 0?_Bs("0",d) + c:c;};}
function _Ut(a){return function (b,c){return b?{success:_Us(a,c)}:{failure:"Attempt to use [#] value in an undefined context"};};}
function _Uu(a,b){return function (c,d){return b(c,d) + a(c,d);};}
function _Uv(a,b){var f,e,d,c;return c = {f1:a,f2:b},(d = c.f1,e = d.success) && (f = c.f2.success)?{success:_Uu(c.f2.success,e)}:!e && !c.f2.success?{failure:d.failure + "\n" + c.f2.failure}:e?f?_X("File \"lib/stdlib/core/date/duration_private.opa\", line 132, characters 14-19, (132:14-132:19 | 5078-5083): Match failure 2839827"):b:a;}
function _Uw(a){return a > 0;}
function _Ux(a){return a < 0;}
function _Uy(a){return a == 0?true:false;}
function _VA(a,b,c,d){return function (e,f){return a(f,b)?d(e,f):c(e,f);};}
function _VB(a,b){return function (c,d){return {success:_VA(a,b,d,c)};};}
function _VC(a,b,c,d){return function (){var e,f,g;return (e = c.success)?(g = d.some)?(f = g.success)?_VB(a,b)(e,f):{failure:g.failure}:_VB(a,b)(e,_Yp):{failure:c.failure};};}
function _VD(a){return function (){return _Ut(_Lr)(a,1);};}
function _VE(a){return function (){return _Ut(_Lr)(a,3);};}
function _VF(a){return function (){return _KO(_Uv,a,{success:_Yp});};}
function _VG(a){return function (){var b;return (b = _RU(a,":").some)?{some:{f1:b.f1,f2:_C}}:{none:_C};};}
function _VH(a){return function (){return {success:_US(_Ie(a))};};}
function _VI(a,b){return function (){var c;return (c = ((c = (((c = ((c = _RU(a,"]").some)?{some:{f1:c.f1,f2:_C}}:{none:_C}).some)?{some:c}:_VG(a)()).none?{some:{f1:a,f2:_C}}:{none:_C}).some)?(c = _IW(c.f1).some)?(c = c.f1,_RN(b,c,_UW(a,c))):{none:_C}:{none:_C}).some)?_RN(b,c.f1,_VH(c.f2)):{none:_C};};}
function _VJ(a){return function (){var b;return (b = _RU(a,"[").some)?(b = b.f1,{some:{f1:b,f2:_Il(a,b)}}):{none:_C};};}
function _VK(a){return _IW(a);}
function _VL(a){return function (){return {failure:_Fk({hd:"Invalid use of special character: ",tl:{hd:_Ie(a),tl:{nil:_C}}})};};}
function _VM(a,b){return function (){var c,d;return (c = ((c = ((c = ((c = _RU(a,"%").some)?(c = c.f1,{some:{f1:c,f2:_Il(a,c)}}):{none:_C}).some)?{some:c}:_VJ(a)()).some)?(d = _RT(false,_VK,c.f1).some)?_RN(b,d.f1,_VL(c.f2)):{none:_C}:{none:_C}).some)?{some:c}:_VI(a,b)();};}
function _VN(a,b){return function (c,d){return d = _Ur(b,c),a(d.f1,d.f2);};}
function _VO(a,b){return function (){var c,d,e;return e = {f1:a,f2:b},(d = e.f1,c = d.success,c != null) && _BE(d) === 1 && e.f2.success?{success:_VN(e.f2.success,c)}:{failure:"Wrong use of [%X:...] mode"};};}
function _VP(a){return function (){var b,c;return (b = ((c = _IW(a).some)?(b = c.f2,b == 62?{some:{f1:c.f1,f2:b}}:{none:_C}):{none:_C}).some)?{some:{f1:b.f1,f2:_Ff}}:{none:_C};};}
function _VQ(a){return function (){var b,c;return (b = ((b = ((b = _IW(a).some)?(c = b.f2,c == 61?{some:{f1:b.f1,f2:c}}:{none:_C}):{none:_C}).some)?{some:{f1:b.f1,f2:_FP}}:{none:_C}).some)?{some:b}:_VP(a)();};}
function _VR(a){return function (){var b,c;return (b = ((b = ((b = _IW(a).some)?(c = b.f2,c == 60?{some:{f1:b.f1,f2:c}}:{none:_C}):{none:_C}).some)?{some:{f1:b.f1,f2:_Hj}}:{none:_C}).some)?{some:b}:_VQ(a)();};}
function _VS(a){return function (){var b,c;return (b = ((b = _IW(a).some)?(c = b.f2,c == 62?{some:{f1:b.f1,f2:c}}:{none:_C}):{none:_C}).some)?{some:{f1:b.f1,f2:_Uw}}:{none:_C};};}
function _VT(a){return function (){var b,c;return (b = ((b = ((b = _IW(a).some)?(c = b.f2,c == 48?{some:{f1:b.f1,f2:c}}:{none:_C}):{none:_C}).some)?{some:{f1:b.f1,f2:_Uy}}:{none:_C}).some)?{some:b}:_VS(a)();};}
function _VU(a,b){return function (c,d){return a(c)?b(c,d):"";};}
function _VV(a,b){return function (){var c;return (c = b.success)?{success:_VU(a,c)}:{failure:b.failure};};}
function _VW(a){return function (b,c){return "" + _Ur(a,b).f2;};}
function _VX(a){return function (){var b;return (b = a.success,b != null)?{success:_VW(b)}:{failure:a.failure};};}
function _VY(a){return function (){return _Ut(_Lr)(a,2);};}
function _VZ(a){return function (){return _Ut(_Lr)(a,4);};}
function _Vb(a){return function (){return _Ut(_Lr)(a,5);};}
function _Vc(){return {success:_US(":")};}
function _Vd(){return {success:_US("]")};}
function _Ve(){return {success:_US("[")};}
function _Vf(){return {success:_US("#")};}
function _Vg(){return {success:_US("%")};}
function _Vh(a){return function (b,c){return (c = _RR(false,_Vi(a),c).some)?_RN(b,c.f1,_VF(c.f2)):{none:_C};};}
function _Vi(a){return function (b){return _Vj(a)(true,b);};}
function _Yr(a,b,c,d){var e,f,g,h,i,j;while (true) {switch (a) {case 0:return (e = ((e = _RU(b,"[").some)?(f = _Uo(true,e.f1).some)?(e = ((e = _IW(f.f1).some)?(g = e.f2,g == 58?{some:{f1:e.f1,f2:g}}:{none:_C}):{none:_C}).some)?(e = _Vh(true)(true,e.f1).some)?(g = _RU(e.f1,"]").some)?_RN(c,g.f1,_VO(f.f2,e.f2)):{none:_C}:{none:_C}:{none:_C}:{none:_C}:{none:_C}).some)?{some:e}:_VM(b,c)();;
case 1:if (e = ((e = _RU(c,"[#").some)?(f = e.f1,(h = ((e = ((e = _RU(f,"<>").some)?{some:{f1:e.f1,f2:_Hn}}:{none:_C}).some)?{some:e}:_VR(f)()).some)?(f = _Rt(true,h.f1).some)?(e = ((g = _IW(f.f1).some)?(e = g.f2,e == 58?{some:{f1:g.f1,f2:e}}:{none:_C}):{none:_C}).some)?(i = _Vh(b)(true,e.f1).some)?(g = i.f1,(g = ((e = ((e = ((e = _IW(g).some)?(j = e.f2,j == 58?{some:{f1:e.f1,f2:j}}:{none:_C}):{none:_C}).some)?(e = _Vh(b)(true,e.f1).some)?{some:{f1:e.f1,f2:e.f2}}:{none:_C}:{none:_C}).some)?{some:{f1:e.f1,f2:{some:e.f2}}}:{some:{f1:g,f2:{none:_C}}}).some)?(e = _RU(g.f1,"]").some)?_RN(d,e.f1,_VC(h.f2,f.f2,i.f2,g.f2)):{none:_C}:{none:_C}):{none:_C}:{none:_C}:{none:_C}:{none:_C}):{none:_C}).some) {return {some:e};} else {b = c;c = d;a = 0;
continue;};
case 2:if (e = ((e = _RU(c,"[%").some)?(f = e.f1,(f = ((e = ((e = ((e = _IW(f).some)?(g = e.f2,g == 60?{some:{f1:e.f1,f2:g}}:{none:_C}):{none:_C}).some)?{some:{f1:e.f1,f2:_Ux}}:{none:_C}).some)?{some:e}:_VT(f)()).some)?(e = ((e = _IW(f.f1).some)?(g = e.f2,g == 58?{some:{f1:e.f1,f2:g}}:{none:_C}):{none:_C}).some)?(e = _Vh(b)(true,e.f1).some)?(g = _RU(e.f1,"]").some)?_RN(d,g.f1,_VV(f.f2,e.f2)):{none:_C}:{none:_C}:{none:_C}:{none:_C}):{none:_C}).some) {return {some:e};} else {a = 1;
continue;};
case 3:if (e = ((e = _RU(c,"[").some)?(e = _Uo(true,e.f1).some)?(f = _RU(e.f1,"]").some)?_RN(d,f.f1,_VX(e.f2)):{none:_C}:{none:_C}:{none:_C}).some) {return {some:e};} else {a = 2;
continue;};
case 4:if (e = ((e = _RU(c,"#").some)?_RN(d,e.f1,_VD(b)):{none:_C}).some) {return {some:e};} else {a = 3;
continue;};
case 5:if (e = ((e = _RU(c,"##").some)?_RN(d,e.f1,_VY(b)):{none:_C}).some) {return {some:e};} else {a = 4;
continue;};
case 6:if (e = ((e = _RU(c,"###").some)?_RN(d,e.f1,_VE(b)):{none:_C}).some) {return {some:e};} else {a = 5;
continue;};
case 7:if (e = ((e = _RU(c,"####").some)?_RN(d,e.f1,_VZ(b)):{none:_C}).some) {return {some:e};} else {a = 6;
continue;};
case 8:if (e = ((e = _RU(c,"#####").some)?_RN(d,e.f1,_Vb(b)):{none:_C}).some) {return {some:e};} else {a = 7;
continue;};
case 9:if (e = ((e = _RU(c,"\\:").some)?_RN(d,e.f1,_Vc):{none:_C}).some) {return {some:e};} else {a = 8;
continue;};
case 10:if (e = ((e = _RU(c,"\\]").some)?_RN(d,e.f1,_Vd):{none:_C}).some) {return {some:e};} else {a = 9;
continue;};
case 11:if (e = ((e = _RU(c,"\\[").some)?_RN(d,e.f1,_Ve):{none:_C}).some) {return {some:e};} else {a = 10;
continue;};
case 12:if (e = ((e = _RU(c,"\\#").some)?_RN(d,e.f1,_Vf):{none:_C}).some) {return {some:e};} else {a = 11;
continue;};
case 13:if (e = ((e = _RU(d,"\\%").some)?_RN(c,e.f1,_Vg):{none:_C}).some) {return {some:e};} else {e = d;d = c;c = e;a = 12;};}}}
function _Vj(a){return function (b,c){return _Yr(13,a,b,c);};}
function _Vk(a,b){return function (){return _Ic(b) == 0?a:{failure:_Fk({hd:"Failed to parse format suffix: ",tl:{hd:_Ie(b),tl:{nil:_C}}})};};}
function _Vl(a,b){var d,c;return (c = _Vh(false)(true,b).some)?(d = c.f1,(b = ((b = _RT(false,_VK,d).some)?(b = b.f1,_RN(a,b,_UW(d,b))):{none:_C}).some)?_RN(a,b.f1,_Vk(c.f2,b.f2)):{none:_C}):{none:_C};}
function _Vm(a){return _TC(_Vl,a);}
function _Vn(a){return a;}
function _Vo(a,b){return _CT(a,b);}
function _Vp(a){var c,b;return b = _Vm(a),(c = b.success)?c:_Bd(_Fk({hd:"Could not generate duration printer from format: '",tl:{hd:a,tl:{hd:"': ",tl:{hd:b.failure,tl:{nil:_C}}}}}),"File \"lib/stdlib/core/date/duration.opa\", line 578, characters 21-99, (578:21-578:99 | 18477-18555)");}
var _Ys = "[%>:[%D:[#=1:tomorrow :in ]]][%Y:[#>0:# year[#>1:s] ][#=0:[%M:[#>0:# month[#>1:s] ][#=0:[%D:[#>1:# day[#>1:s] ][#=0:[%h:[#>0:# hour[#>1:s] ][#=0:[%m:[#>0:# minute[#>1:s] ][#=0:[%s:[#>0:# second[#>1:s] :now ]]]]]]]]]]]][%<:[%D:[#=1:yesterday :ago ]]]";
var _Yt = "[%>:in ][%Y:[#>0:#Y [%M:[#>0:#M ]]][#=0:[%M:[#>0:#M [%D:[#>0:#D ]]][#=0:[%D:[#>0:#D [%h:[#>0:#h ]]][#=0:[%h:[#>0:#h [%m:[#>0:#m ]]][#=0:[%m:[#>0:#m [%s:[#>0:#s ]]][#=0:[%s:#s ]]]]]]]]]]][%<:ago ]";
var _Yu = "[%h:#\\:[%m:##\\:[%s:##.[%x:##]]]]";
var _Yv = "[%h:#\\:[%m:##\\:[%s:##]]]";
var _Yw = "[%h:#\\:[%m:##]]";
var _Yx = _Vp(_Ys);
var _Yy = _Vp(_Yt);
var _ZA = _Vp(_Yv);
var _ZB = _Vp(_Yu);
var _ZC = _Vp(_Yw);
function _Vq(a){return _Yx(a,0);}
var _ZD = _FK("Duration.duration",_Vq);
var _ZE = _Qy(_Vo);
var _ZF = _UN(_Vo);
function _Vr(a){return function (b){return a(b);};}
function _Vs(a){return _Cd(a);}
var _ZG = _Vr(_Vs);
function _Vt(a){return _Ce(a);}
var _ZH = _Vr(_Vt);
function _Vu(a){return _Cf(a);}
var _ZI = _Vr(_Vu);
function _Vv(a){return _Cg(a);}
var _ZJ = _Vr(_Vv);
function _Vw(a){return _Ci(a);}
var _ZK = _Vr(_Vw);
function _Vx(a){return _Cj(a);}
var _ZL = _Vr(_Vx);
function _Vy(a){return _Ck(a);}
var _ZM = _Vr(_Vy);
function _WA(a){return _Cl(a);}
var _ZN = _Vr(_WA);
function _WB(a,b,c){return b -= a.length,b > 0?_Bs(c,b) + a:a;}
function _WC(a,b,c,d){return c = b.no_padding_info?c:b,a = "" + a,c.do_not_pad?a:c.pad_with_zeros?_WB(a,d,"0"):c.pad_with_spaces?_WB(a,d," "):_Bd("Date.ToString.pad","File \"lib/stdlib/core/date/date_private.opa\", line 144, characters 30-55, (144:30-144:55 | 5174-5199)");}
var _ZO = {hd:{f1:"c",f2:"%a %b %_d %Y %H:%M:%S"},tl:{hd:{f1:"e",f2:"%_d"},tl:{hd:{f1:"D",f2:"%m/%d/%y"},tl:{hd:{f1:"F",f2:"%Y-%m-%d"},tl:{hd:{f1:"h",f2:"%b"},tl:{hd:{f1:"R",f2:"%H:%M"},tl:{hd:{f1:"T",f2:"%H:%M:%S"},tl:{nil:_C}}}}}}}};
function _WD(){var d,c,b,a;return a = _Ch(),b = _BZ(_Hf(a),60),c = _Hf(a) % 60,d = {pad_with_zeros:_C},_Fk({hd:a > 0?"-":"+",tl:{hd:_WC(b,d,d,2),tl:{hd:_WC(c,d,d,2),tl:{nil:_C}}}});}
function _WE(a){return a == 0?{sunday:_C}:a == 1?{monday:_C}:a == 2?{tuesday:_C}:a == 3?{wednesday:_C}:a == 4?{thursday:_C}:a == 5?{friday:_C}:a == 6?{saturday:_C}:_Bd("Date.Weekday.of_int","File \"lib/stdlib/core/date/date.opa\", line 678, characters 14-41, (678:14-678:41 | 22492-22519)");}
function _WF(a){return _WE(_ZN(a));}
function _WG(a){return a == 0?{january:_C}:a == 1?{february:_C}:a == 2?{march:_C}:a == 3?{april:_C}:a == 4?{may:_C}:a == 5?{june:_C}:a == 6?{july:_C}:a == 7?{august:_C}:a == 8?{september:_C}:a == 9?{october:_C}:a == 10?{november:_C}:a == 11?{december:_C}:_Bd("Date.Month.of_int","File \"lib/stdlib/core/date/date.opa\", line 756, characters 14-39, (756:14-756:39 | 24442-24467)");}
function _WH(a){return _WG(_ZL(a));}
function _WI(a){return a == 0?12:a <= 12?a:a <= 23?a - 12:_Bd(_Fk({hd:"Date.Hour.convert_24h_to_12h(",tl:{hd:"" + a,tl:{hd:")",tl:{nil:_C}}}}),"File \"lib/stdlib/core/date/date.opa\", line 646, characters 9-68, (646:9-646:68 | 21727-21786)");}
function _WJ(a){return a.monday?1:a.tuesday?2:a.wednesday?3:a.thursday?4:a.friday?5:a.saturday?6:0;}
function _WK(a){return a.monday?"Monday":a.tuesday?"Tuesday":a.wednesday?"Wednesday":a.thursday?"Thursday":a.friday?"Friday":a.saturday?"Saturday":"Sunday";}
var _ZP = _FK("Date.weekday",_WK);
function _WL(a){return a.january?0:a.february?1:a.march?2:a.april?3:a.may?4:a.june?5:a.july?6:a.august?7:a.september?8:a.october?9:a.november?10:11;}
function _WM(a){return a.january?"January":a.february?"February":a.march?"March":a.april?"April":a.may?"May":a.june?"June":a.july?"July":a.august?"August":a.september?"September":a.october?"October":a.november?"November":"December";}
var _ZQ = _FK("Date.month",_WM);
function _WN(a){return _Ik(0,3,_WM(_WH(a.f2)));}
function _WO(a){return a = _ZK(a.f2),a == 1?"1st":a == 2?"2nd":a == 3?"3rd":_Fk({hd:"" + a,tl:{hd:"th",tl:{nil:_C}}});}
function _WP(a){return a = _WJ(_WF(a.f2)),"" + (a == 0?7:a);}
function _WQ(a){return _WC(_BZ(_ZM(a.f2),100),a.f1,{pad_with_spaces:_C},2);}
function _WR(a){return _Ik(0,3,_WK(_WF(a.f2)));}
function _WS(a){return _WC(_WI(_ZJ(a.f2)),a.f1,{pad_with_zeros:_C},2);}
function _WT(a){return "%";}
function _WU(a){return "\n";}
function _WV(a){return _WC(_ZH(a.f2),a.f1,{pad_with_zeros:_C},2);}
function _WW(a){return _WK(_WF(a.f2));}
function _WX(a){return _WM(_WH(a.f2));}
function _WY(a){return _WC(_ZK(a.f2),a.f1,{pad_with_zeros:_C},2);}
function _WZ(a){return _WC(_ZJ(a.f2),a.f1,{pad_with_zeros:_C},2);}
function _Wb(a){return _WC(_ZJ(a.f2),a.f1,{pad_with_spaces:_C},2);}
function _Wc(a){return _WC(_WI(_ZJ(a.f2)),a.f1,{pad_with_spaces:_C},2);}
function _Wd(a){return _WC(_WL(_WH(a.f2)) + 1,a.f1,{pad_with_zeros:_C},2);}
function _We(a){return _WC(_ZI(a.f2),a.f1,{pad_with_zeros:_C},2);}
function _Wf(a){return _ZJ(a.f2) < 12?"AM":"PM";}
function _Wg(a){return _ZJ(a.f2) < 12?"am":"pm";}
function _Wh(a){return "\x09";}
function _Wi(a){return "" + _WJ(_WF(a.f2));}
function _Wj(a){return _WC(_ZG(a.f2),a.f1,{pad_with_zeros:_C},3);}
function _Wk(a){return _WC(_ZM(a.f2) % 100,{pad_with_zeros:_C},{pad_with_zeros:_C},2);}
function _Wl(a){return _WC(_ZM(a.f2),a.f1,{pad_with_spaces:_C},4);}
function _Wm(a){return _WD();}
var _ZR = {hd:{f1:"%",f2:false,f3:_WT},tl:{hd:{f1:"a",f2:false,f3:_WR},tl:{hd:{f1:"A",f2:false,f3:_WW},tl:{hd:{f1:"b",f2:false,f3:_WN},tl:{hd:{f1:"B",f2:false,f3:_WX},tl:{hd:{f1:"C",f2:true,f3:_WQ},tl:{hd:{f1:"d",f2:true,f3:_WY},tl:{hd:{f1:"E",f2:false,f3:_WO},tl:{hd:{f1:"H",f2:true,f3:_WZ},tl:{hd:{f1:"I",f2:true,f3:_WS},tl:{hd:{f1:"k",f2:true,f3:_Wb},tl:{hd:{f1:"l",f2:true,f3:_Wc},tl:{hd:{f1:"m",f2:true,f3:_Wd},tl:{hd:{f1:"M",f2:true,f3:_We},tl:{hd:{f1:"n",f2:false,f3:_WU},tl:{hd:{f1:"p",f2:false,f3:_Wf},tl:{hd:{f1:"P",f2:false,f3:_Wg},tl:{hd:{f1:"S",f2:true,f3:_WV},tl:{hd:{f1:"t",f2:false,f3:_Wh},tl:{hd:{f1:"u",f2:false,f3:_WP},tl:{hd:{f1:"w",f2:false,f3:_Wi},tl:{hd:{f1:"x",f2:true,f3:_Wj},tl:{hd:{f1:"y",f2:false,f3:_Wk},tl:{hd:{f1:"Y",f2:true,f3:_Wl},tl:{hd:{f1:"z",f2:true,f3:_Wm},tl:{nil:_C}}}}}}}}}}}}}}}}}}}}}}}}}};
function _Wn(){return {no_padding_info:_C};}
function _Wo(a,b){return function (){var c;return (c = _RW(b,a).some)?_RN(b,c.f1,_Wn):{none:_C};};}
function _Wp(){return {pad_with_zeros:_C};}
function _Wq(a,b){return function (){var c;return (c = ((c = _RU(a,"0").some)?_RN(b,c.f1,_Wp):{none:_C}).some)?{some:c}:_Wo(a,b)();};}
function _Wr(){return {pad_with_spaces:_C};}
function _Ws(a,b){return function (){var c;return (c = ((c = _RU(a,"_").some)?_RN(b,c.f1,_Wr):{none:_C}).some)?{some:c}:_Wq(a,b)();};}
function _Wt(){return {do_not_pad:_C};}
function _Wu(a,b){var c;return (c = ((c = _RU(b,"-").some)?_RN(a,c.f1,_Wt):{none:_C}).some)?{some:c}:_Ws(b,a)();}
function _Wv(a,b){return function (c){return a({f1:b,f2:c});};}
function _Ww(a,b,c,d){return function (){return b || (d.no_padding_info && _BE(d) === 1?true:false)?{success:_Wv(a,d)}:{failure:_Fk({hd:"Directive %",tl:{hd:c,tl:{hd:" does not accept a padding flag",tl:{nil:_C}}}})};};}
function _Wx(a,b,c,d){return function (e,f){var g;return (g = _Wu(true,f).some)?(f = d(e,g.f1).some)?_RN(e,f.f1,_Ww(a,b,c,g.f2)):{none:_C}:{none:_C};};}
function _Wy(a){var b;return b = a.f1,_Wx(a.f3,a.f2,b,_Sk(b));}
function _XA(a){return function (){return {failure:_Fk({hd:"Unknown directive '%",tl:{hd:_Ie(a),tl:{hd:"'",tl:{nil:_C}}}})};};}
function _XB(a,b){var c;return (b = ((c = _IW(b).some)?(c = c.f1,{some:{f1:c,f2:_Il(b,c)}}):{none:_C}).some)?(c = _RT(false,_VK,b.f1).some)?_RN(a,c.f1,_XA(b.f2)):{none:_C}:{none:_C};}
function _XC(a){var b;return (b = a.tl)?_XD(b,a.hd):_XB;}
function _ZS(a,b,c,d,e){var f;while (true) {switch (a) {case 0:return (f = _XC(b)(d,c).some)?_RN(d,f.f1,_Un(f.f2)):{none:_C};;
case 1:if (f = ((f = _Wy(c)(d,e).some)?_RN(d,f.f1,_Un(f.f2)):{none:_C}).some) {return {some:f};} else {c = e;a = 0;};}}}
function _XD(a,b){return function (c,d){return _ZS(1,a,b,c,d);};}
function _XE(a){var b,c;return (b = (((b = _IW(a).some)?(c = b.f2,c == 37?{some:{f1:b.f1,f2:c}}:{none:_C}):{none:_C}).none?{some:{f1:a,f2:_C}}:{none:_C}).some)?(b = _IW(b.f1).some)?(b = b.f1,{some:{f1:b,f2:_Il(a,b)}}):{none:_C}:{none:_C};}
function _XF(a){return function (b){return _Ie(_In(a));};}
function _XG(a){return function (){return {success:_XF(a)};};}
function _XH(a,b){return function (){var c;return (c = _RR(true,_XE,a).some)?_RN(b,c.f1,_XG(c.f2)):{none:_C};};}
function _XI(a,b){var c,d;return (c = ((c = ((d = _IW(b).some)?(c = d.f2,c == 37?{some:{f1:d.f1,f2:c}}:{none:_C}):{none:_C}).some)?(c = _XC(_ZR)(a,c.f1).some)?_RN(a,c.f1,_Un(c.f2)):{none:_C}:{none:_C}).some)?{some:c}:_XH(b,a)();}
function _XJ(a,b,c){var g,f,e,d;return d = {f1:b,f2:c},(e = d.f1,f = e.success,f != null) && (g = d.f2,g.success != null)?{success:a(f,d.f2.success)}:(a = e.failure,a != null) && d.f2.failure != null?{failure:a + "\n" + d.f2.failure}:a != null?b:g.failure != null?c:_X("File \"lib/stdlib/core/date/date_private.opa\", line 214, characters 14-19, (214:14-214:19 | 8681-8686): Match failure 6215657");}
function _XK(a,b){return function (c){return b(c) + a(c);};}
function _XL(a,b){return _XK(b,a);}
function _XM(a,b){return _XJ(_XL,a,b);}
function _XN(a,b){return _XJ(_Up,a,b);}
function _XO(a){return "";}
function _XP(a){return _XI(true,a);}
function _XQ(a){return function (){return _KO(_XM,a,{success:_XO});};}
function _XR(a,b){return (b = _RR(false,_XP,b).some)?_RN(a,b.f1,_XQ(b.f2)):{none:_C};}
function _XS(){return _Bd("Date.ToString.unfold_abbreviations_with","File \"lib/stdlib/core/date/date_private.opa\", line 235, characters 32-79, (235:32-235:79 | 9418-9465)");}
function _XT(a,b){return (b = _Rm(a,b).some)?_RN(a,b.f1,_XS):{none:_C};}
function _XU(a,b,c){return function (){return c.no_padding_info && _BE(c) === 1?{success:a}:{failure:_Fk({hd:"Abbreviation '",tl:{hd:b,tl:{hd:"' does not accept padding prefix",tl:{nil:_C}}}})};};}
function _ZT(a,b,c,d,e,f,g){var h,i;while (true) {switch (a) {case 0:return (h = _XV(b)(d,c).some)?_RN(d,h.f1,_Un(h.f2)):{none:_C};;
case 1:if (h = ((i = _Wu(true,g).some)?(h = e(f,i.f1).some)?_RN(f,h.f1,_XU(c,d,i.f2)):{none:_C}:{none:_C}).some) {return {some:h};} else {c = g;d = f;a = 0;};}}}
function _XW(a,b,c,d){return function (e,f){return _ZT(1,a,b,c,d,e,f);};}
function _XV(a){var c,b;return (b = a.hd)?(c = b.f1,_XW(a.tl,b.f2,c,_Sk(c))):_XT;}
function _XX(a){return function (){return {success:_Ie(a)};};}
function _XY(a,b){return function (){var c;return (c = ((c = _IW(a).some)?(c = c.f1,_RN(b,c,_UW(a,c))):{none:_C}).some)?_RN(b,c.f1,_XX(c.f2)):{none:_C};};}
function _XZ(a,b){return function (){var c;return (c = ((c = _RU(a,"%").some)?(c = _XV(_ZO)(b,c.f1).some)?_RN(b,c.f1,_Un(c.f2)):{none:_C}:{none:_C}).some)?{some:c}:_XY(a,b)();};}
function _Xb(){return {success:"%%"};}
function _Xc(a,b){var c;return (c = ((c = _RU(b,"%%").some)?_RN(a,c.f1,_Xb):{none:_C}).some)?{some:c}:_XZ(b,a)();}
function _Xd(a){return function (){return _KO(_XN,a,{success:""});};}
function _Xe(a){return _Xc(true,a);}
function _Xf(a,b){return (b = _RR(false,_Xe,b).some)?_RN(a,b.f1,_Xd(b.f2)):{none:_C};}
function _Xg(a){var b;return a = _TC(_Xf,a),(b = a.success,b != null)?_TC(_XR,b):{failure:a.failure};}
function _Xh(){return _Bd("Date.OfString.parse_month","File \"lib/stdlib/core/date/date_private.opa\", line 274, characters 24-57, (274:24-274:57 | 10705-10738)");}
function _Xi(a,b){return (b = _Rm(a,b).some)?_RN(a,b.f1,_Xh):{none:_C};}
function _Xj(a){return function (b){return {day:b.day,h:b.h,min:b.min,month:a,ms:b.ms,s:b.s,wday:b.wday,year:b.year};};}
function _Xk(a){return function (){return _Xj(a);};}
function _Xm(a,b){var d,c;return b == 12?_Xi:(c = _WG(b),d = _WM(c),_Xl(b,a,c,_Sk(a?_Ik(0,3,d):d)));}
function _ZU(a,b,c,d,e,f,g){var h;while (true) {switch (a) {case 0:return (h = _Xm(c,b + 1)(e,d).some)?_RN(e,h.f1,_Un(h.f2)):{none:_C};;
case 1:if (h = ((h = e(f,g).some)?_RN(f,h.f1,_Xk(d)):{none:_C}).some) {return {some:h};} else {d = g;e = f;a = 0;};}}}
function _Xl(a,b,c,d){return function (e,f){return _ZU(1,a,b,c,d,e,f);};}
function _Xn(){return _Bd("Date.OfString.parse_wday","File \"lib/stdlib/core/date/date_private.opa\", line 287, characters 24-56, (287:24-287:56 | 11187-11219)");}
function _Xo(a,b){return (b = _Rm(a,b).some)?_RN(a,b.f1,_Xn):{none:_C};}
function _Xp(a){return function (b){return {day:b.day,h:b.h,min:b.min,month:b.month,ms:b.ms,s:b.s,wday:a,year:b.year};};}
function _Xq(a){return function (){return _Xp(a);};}
function _Xr(a,b){var d,c;return b == 7?_Xo:(c = _WE(b),d = _WK(c),_Xs(b,a,c,_Sk(a?_Ik(0,3,d):d)));}
function _ZV(a,b,c,d,e,f,g){var h;while (true) {switch (a) {case 0:return (h = _Xr(c,b + 1)(e,d).some)?_RN(e,h.f1,_Un(h.f2)):{none:_C};;
case 1:if (h = ((h = e(f,g).some)?_RN(f,h.f1,_Xq(d)):{none:_C}).some) {return {some:h};} else {d = g;e = f;a = 0;};}}}
function _Xs(a,b,c,d){return function (e,f){return _ZV(1,a,b,c,d,e,f);};}
function _Xt(a,b){return function (){return a(b);};}
function _Xu(a){return function (b,c){return (c = _SH(true,c).some)?(c = _Rt(b,c.f1).some)?_RN(b,c.f1,_Xt(a,c.f2)):{none:_C}:{none:_C};};}
function _Xv(a,b,c,d){return function (){return a({f1:_Ie(b),f2:c,f3:d});};}
function _Xw(a){return function (){var b;return (b = _RU(a,"-").some)?(b = b.f1,{some:{f1:b,f2:_Il(a,b)}}):{none:_C};};}
function _Xx(a){return (a = (_RU(a,")").none?{some:{f1:a,f2:_C}}:{none:_C}).some)?(a = _IW(a.f1).some)?{some:{f1:a.f1,f2:_C}}:{none:_C}:{none:_C};}
function _Xy(){return _C;}
function _YA(a,b,c){return function (){var d,e,f,g,h;return (e = _SH(true,b).some)?(d = e.f1,(d = ((e = ((e = _RU(d,"+").some)?(e = e.f1,{some:{f1:e,f2:_Il(d,e)}}):{none:_C}).some)?{some:e}:_Xw(d)()).some)?(f = _Ru(2)(true,d.f1).some)?(h = _Ru(2)(true,f.f1).some)?(g = h.f1,(e = ((e = ((e = _SH(true,g).some)?(e = _RU(e.f1,"(").some)?(e = _RT(false,_Xx,e.f1).some)?(e = _RU(e.f1,")").some)?_RN(c,e.f1,_Xy):{none:_C}:{none:_C}:{none:_C}:{none:_C}).some)?{some:{f1:e.f1,f2:{some:e.f2}}}:{some:{f1:g,f2:{none:_C}}}).some)?_RN(c,e.f1,_Xv(a,d.f2,f.f2,h.f2)):{none:_C}):{none:_C}:{none:_C}:{none:_C}):{none:_C};};}
function _YB(){return _FO;}
function _YC(a){return function (b,c){var d;return (d = ((d = _SH(true,c).some)?(d = _RU(d.f1,"GMT").some)?_RN(b,d.f1,_YB):{none:_C}:{none:_C}).some)?{some:d}:_YA(a,c,b)();};}
function _YD(a){return {day:a.day,h:a.h == 12?0:a.h,min:a.min,month:a.month,ms:a.ms,s:a.s,wday:a.wday,year:a.year};}
function _YE(a){return {day:a.day,h:a.h == 12?12:a.h + 12,min:a.min,month:a.month,ms:a.ms,s:a.s,wday:a.wday,year:a.year};}
function _YF(a,b){var d,c;return c = a.f2,d = a.f3,a.f1 == "-"?{day:b.day,h:b.h + c,min:b.min + d,month:b.month,ms:b.ms,s:b.s,wday:b.wday,year:b.year}:{day:b.day,h:b.h - c,min:b.min - d,month:b.month,ms:b.ms,s:b.s,wday:b.wday,year:b.year};}
function _YG(a){return function (b){return {day:b.day,h:a,min:b.min,month:b.month,ms:b.ms,s:b.s,wday:b.wday,year:b.year};};}
function _YH(a){return function (b){return {day:b.day,h:b.h,min:b.min,month:b.month,ms:b.ms,s:b.s,wday:b.wday,year:a < 70?2000 + a:1900 + a};};}
function _YI(){return _YE;}
function _YJ(a,b){return function (){var c;return (c = _RU(a,"PM").some)?_RN(b,c.f1,_YI):{none:_C};};}
function _YK(){return _YD;}
function _YL(a,b){var c;return (c = ((c = _RU(b,"AM").some)?_RN(a,c.f1,_YK):{none:_C}).some)?{some:c}:_YJ(b,a)();}
function _YM(a){return function (b){return _YF(a,b);};}
function _YN(){return _Vn;}
function _YO(a,b){return (b = _RU(b,"%").some)?_RN(a,b.f1,_YN):{none:_C};}
function _YP(a){return function (b){return {day:a,h:b.h,min:b.min,month:b.month,ms:b.ms,s:b.s,wday:b.wday,year:b.year};};}
function _YQ(a){return _YP(a);}
function _YR(a){return _YG(a);}
function _YS(a){return _YG(a);}
function _YT(a){return _YG(a);}
function _YU(a){return _YG(a);}
function _YV(a){return function (b){return {day:b.day,h:b.h,min:b.min,month:_WG(a - 1),ms:b.ms,s:b.s,wday:b.wday,year:b.year};};}
function _YW(a){return _YV(a);}
function _YX(a){return function (b){return {day:b.day,h:b.h,min:a,month:b.month,ms:b.ms,s:b.s,wday:b.wday,year:b.year};};}
function _YY(a){return _YX(a);}
function _YZ(a,b){return (b = _RU(b,"\n").some)?_RN(a,b.f1,_YN):{none:_C};}
function _Yb(a,b){return function (){var c;return (c = _RU(a,"pm").some)?_RN(b,c.f1,_YI):{none:_C};};}
function _Yc(a,b){var c;return (c = ((c = _RU(b,"am").some)?_RN(a,c.f1,_YK):{none:_C}).some)?{some:c}:_Yb(b,a)();}
function _Yd(a){return function (b){return {day:b.day,h:b.h,min:b.min,month:b.month,ms:b.ms,s:a,wday:b.wday,year:b.year};};}
function _Ye(a){return _Yd(a);}
function _Yf(a,b){return (b = _RU(b,"\x09").some)?_RN(a,b.f1,_YN):{none:_C};}
function _Yg(a){return function (b){return {day:b.day,h:b.h,min:b.min,month:b.month,ms:a,s:b.s,wday:b.wday,year:b.year};};}
function _Yh(a){return _Yg(a);}
function _Yi(a){return _YH(a);}
function _Yj(a){return function (b){return {day:b.day,h:b.h,min:b.min,month:b.month,ms:b.ms,s:b.s,wday:b.wday,year:a};};}
function _Yk(a){return _Yj(a);}
function _Yl(a){return _YM(a);}
var _ZW = {hd:{f1:"%",f2:_YO},tl:{hd:{f1:"a",f2:_Xr(true,0)},tl:{hd:{f1:"A",f2:_Xr(false,0)},tl:{hd:{f1:"b",f2:_Xm(true,0)},tl:{hd:{f1:"B",f2:_Xm(false,0)},tl:{hd:{f1:"d",f2:_Xu(_YQ)},tl:{hd:{f1:"H",f2:_Xu(_YR)},tl:{hd:{f1:"I",f2:_Xu(_YS)},tl:{hd:{f1:"k",f2:_Xu(_YT)},tl:{hd:{f1:"l",f2:_Xu(_YU)},tl:{hd:{f1:"m",f2:_Xu(_YW)},tl:{hd:{f1:"M",f2:_Xu(_YY)},tl:{hd:{f1:"n",f2:_YZ},tl:{hd:{f1:"p",f2:_YL},tl:{hd:{f1:"P",f2:_Yc},tl:{hd:{f1:"S",f2:_Xu(_Ye)},tl:{hd:{f1:"t",f2:_Yf},tl:{hd:{f1:"x",f2:_Xu(_Yh)},tl:{hd:{f1:"y",f2:_Xu(_Yi)},tl:{hd:{f1:"Y",f2:_Xu(_Yk)},tl:{hd:{f1:"z",f2:_YC(_Yl)},tl:{nil:_C}}}}}}}}}}}}}}}}}}}}}};
function _Ym(a){var c,b;return b = _Xg(a),(c = b.success)?c:_Bd(_Fk({hd:"Date.generate_printer(",tl:{hd:a,tl:{hd:") -> problem with the format: ",tl:{hd:b.failure,tl:{nil:_C}}}}}),"File \"lib/stdlib/core/date/date.opa\", line 932, characters 21-98, (932:21-932:98 | 30593-30670)");}
var _ZX = "%c";
var _ZY = "%H:%M:%S";
var _ZZ = "%F";
var _Zb = "%Y-%m-%d | %H:%M:%S.%x";
var _Zc = _Ym(_ZX);
var _Zd = _Ym(_ZY);
var _Ze = _Ym(_ZZ);
var _Zf = _Ym(_Zb);
function _Yn(a){return _Zc(a);}
var _Zg = _FK("Date.date",_Yn);
var _Zh = _Qy(_Vo);
var _Zi = _UN(_Vo);



function _Zj(a,b){setTimeout(function (){b();},a);return _C;}


function _Zk(a){return _Zj(0,a);}












function _Zl(a){return /[e\.]/.test(a);}


function _Zm(a){var b =function (l){var c =new Array(),m =function (n){var k;if (typeof n != "object") {return;}
for (k in n) {
  if (n[k] == null) {c.push(n);break;}
}for (k in n) {
   n[k] != null && m(n[k]);
}};m(l);return c;},c =new Array();if (a.charAt(0) == "$") {a = a.substr(1);while (a.length > 0) {var d =a.search(/[^0-9]/),e =parseInt(a.substr(0,d),10),f =a.substr(d,e);c.push(JSON.parse(f));a = a.substr(d + e);}} else {c.push(JSON.parse(a));}var g =0,h =1;for (; h < c.length; h){var i =b(c[g]),j =0;for (; j < i.length; j++){var k;
for (k in i[j]) {
  if (i[j][k] == null) {i[j][k] = c[h];h++;}
}}g++;}return c[0];}
var _Zn = _BH(_z("Record"),_BG(_z("nil")));

function _Zo(a){function b(d){switch (typeof d) {case "number":return _Zl(d)?_BH("Float",d):_BH("Int",d);;
case "string":return _BH("String",d);;
case "boolean":return _BH("Bool",d);;
case "object":if (d instanceof Array) {var e,f =d.length,g =new Array(f);for (e = 0; e < f; ++e){g[e] = b(d[e]);}return _BH("List",_BL(g));} else {var e,g =[],h =true;
for (e in d) {
  var i =_BB();i = _BC(i,"f1",e);i = _BC(i,"f2",b(d[e]));var j =_BD(i);g.push(j);h = false;
}if (h) {return _Zn;}return _BH("Record",_BL(g));};default:throw {message:"This is not a valid object to transform to json",obj:d};}}try {return _p(b(a));} catch (c) {_Bl(c);return _o;}}

function _Zp(a){try {var c =_Zm(a);if (c == null) {return _o;}return _Zo(c);} catch (b) {return _o;}}

function _Zq(a){return _Zo(a);}

function _Zr(){return new Array();}

function _Zs(a,b){b.unshift(a);return b;}

function _Zt(){return new Object();}

function _Zu(a,b,c){c[a] = b;return c;}

function _Zv(a){return a;}

function _Zw(a){return a;}

function _Zx(a){return a;}

function _Zy(a){return a;}


function _bA(a){return a;}

function _bB(a){return a;}





var _bC = function (){var a =new Object();function b(){return Math.floor(Math.random() * 1073741824);}var c =function (){var d =b(),e =_Db();if ("none" in e) {
throw new Error("no cookie no session");} else {return "" + d + e.some;}};return {get:function (d){return a[d];},remove:function (d){delete a[d];},serialize:function (d){var e =d.serialized;if (e == null) {e = {cl_id:c()};d.serialized = e;a[e.cl_id] = d;}return e;},random_id:b};}();

function _bD(a,b,c,d,e,f,g){this.lchan_id = _bC.random_id();this.state = a;this.action = c;this.unserialize = b;this.messages = new Array();this.on_delete = e === null?[]:[e];this.more = f;this.ctx = d;this.concurrent = g;this.killed = false;this.is_client = true;}
_bD.prototype = {get_context:function (a){return "some" in this.ctx?this.ctx:a;},send_no_cps_aux:function (a,b,c,d){if (this.state == null) {c && c();return;}var e =this.get_context(e);d && d();var f =null;try {f = this.action(this.state,a,e);if ("none" in f) {this.state = null;this.kill();return;} else {this.state = f.some;return;}} catch (g) {console.error("[LocalChannel.send] Catch :",g);return;}},send:function (a,b,c,d,e){var f =this;function g(){f.send_no_cps_aux(b,c,d,e);}this.concurrent?g():setTimeout(g,0);},call_no_cps:function (a,b,c,d){var e =null;try {var g =function (h,i){var j =_BB();j = _BC(j,_z("f1"),_d(function (k){e = k;}));j = _BC(j,_z("f2"),i);j = _BD(j);return d(h,j);};this.action = g;this.send_no_cps_aux(a,_o,null,null);} catch (f) {console.error("[LocalChannel.call] Cell :",f);}e === null && _X("Call failed, result was [null]");return e;},serialize:function (){return _bC.serialize(this);},kill:function (){this.killed = true;var a =this.on_delete,b =a.length,c =0;for (; c < b; c++){a[c]();}while (this.messages.length > 0) {a = this.messages.pop().herror;typeof a != "undefined" && a();}a = _bC.get(this.lchan_id);a != null && _bC.remove(a.cl_id);},compare:function (a){return a instanceof _bD?_Bc(this.lchan_id,a.lchan_id):1;},owner:function (){return null;},on_remove:function (a){this.killed?a():this.on_delete.push(a);}};

var _bE = {};
var _bF = {};
var _bG = {};
(function (){function a(){}var b =new Array();var c =new Array();function d(){return Math.floor(Math.random() * 1073741824);}var e =-1;if (typeof page_server != "undefined") {e = page_server;} else {_V || _Bl("Warning: the server hasn't set the page number");e = d();}var f ="";f = typeof base_url != "undefined"?base_url:"";var g =f + "/_internal_/" + e,h =true,i =typeof desactivate_safari_hack == "undefined" || !desactivate_safari_hack;if (i && !_V && "userAgent" in navigator) {var j =navigator.userAgent;h = !/Safari/.test(j) || /Chromium/.test(j);}var k =function (Q){_X("Unregistered serialization function");},l =function (Q){_X("Unregistered unserialization function");},m =3;function n(){var Q =d(),R =_Db();if ("none" in R) {
throw new Error("no cookie no session");} else {return "" + Q + R.some;}}function o(){return d();}var p =true;function q(){p = false;
	//_Bl("Error: the connexion with the server seems to be lost. Please reload");
throw "Error: the connexion with the server seems to be lost. Please reload";}var r ="";function s(Q){if (p) {Q.url = r + g + Q.url;if (b.length != 0) {var R =Q.data;typeof R == "undefined" && (R = "");var S ={to_register:b,uri:Q.url,body:R};Q.data = JSON.stringify(S);Q.url = g + "/chan/register";b = new Array();var T;if (Q.success) {T = Q.success;Q.success = function (){};} else {T = function (){};}Q.statusCode = {"205":q,"200":T};}return jQuery.ajax(Q);} else {q();}}var t ={send:function (Q,R,S,T,U){S = this.message_to_post(Q(R));typeof T != "undefined" && (S.herror = k(T));typeof U != "undefined" && (S.hsuccess = k(U));S = JSON.stringify(S);s({type:"POST",url:"/chan/send",data:S,async:h});},call_no_cps:function (Q,R,S,T){R = D(g + "/cell/CallThatPlease",this.message_to_post(R(Q)),true);R = _Zm(R);return S(R);},message_to_post:function (Q){return {to:this.serialize(),message:Q};}};function u(Q){this.srv_id = Q;this.is_client = false;}u.prototype = {serialize:function (){var Q ={srv_id:this.srv_id};if (typeof this.addr != "undefined") {Q.addr = this.addr;Q.port = this.port;}return Q;},compare:function (Q){return Q instanceof u?_Bc(this.srv_id,Q.srv_id):-1;},owner:function (){return this;},on_remove:function (Q){return null;},send:t.send,call_no_cps:t.call_no_cps,message_to_post:t.message_to_post};function v(Q){this.cl_id = Q;this.is_client = true;}v.prototype = {serialize:function (){var Q ={cl_id:this.cl_id};if (typeof this.addr != "undefined") {Q.addr = this.addr;Q.port = this.port;}return Q;},compare:function (Q){return Q instanceof v?_Bc(this.cl_id,Q.cl_id):Q instanceof _bD?-1:1;},owner:function (){return this;},on_remove:function (Q){return null;},send:t.send,call_no_cps:function (){
throw Error("Not yet implemented");},message_to_post:t.message_to_post};function w(Q){window.console && window.console.error?window.console.error.apply(null,arguments):_Bl.apply(null,arguments);}var x =new Object();function y(Q,R,S){var T =x[R];if (T == null) {
throw new Error("Rpc client " + R + " doesn't exist");}var U =T(S);"none" in U?w("RPC comet call ",Q," failed, no data in ",S):Q != null && s({type:"POST",url:"/rpc_return/" + Q,data:U.some,async:h});}function z(Q,R){var S =Q.id,T =Q.msg,U =Q.herror,V =Q.hsuccess,W =_bC.get(S);typeof U != "undefined" && (U = function (){l(Q.herror)();});typeof V != "undefined" && (V = function (){l(Q.hsuccess)();});if (W != null) {var X =W.unserialize(T);W.send(null,X,R,U,V);} else {typeof U != "undefined" && U();}}function A(Q){switch (Q.type) {case "rpc":y(Q.id,Q.name,Q.args);
break;;
case "asyncrpc":y(null,Q.name,Q.args);break;;
case "chan":z(Q,_o);break;;default:_X("Messages type " + Q.type + " is unknown");}}var B =function (Q){return false;},C,D,E =0,F =false,G ={waiting_pang:0},H =90000,I =15000,J =I;function K(Q,R){var S =_Zm(Q);switch (S.type) {case "pong":
break;;
case "break":return;;
case "msgs":var T =S.body,U =0;for (; U < T.length; U++){Q = T[U];var V =_Zo(Q);V = _BM(V);V != null?B(V) || A(Q):console.error("LLPing","Bad json",T[U]);}if (R == -1) {return null;} else {
break;};
case "result":return S;;default:_X("Ping loop type " + S.type + " is unknown");}h?typeof R != "undefined" && R >= E && M(false):M(false);}function L(Q,R,S){if (J == H) {_Bl("Error: the connexion with the server seems to be lost");return;} else {}setTimeout(M,J);J = Math.min(J * 2,H);}function M(Q){var R =++E,S =function (){if (R < E) {} else {
		//s({type:"POST",url:"/ping",data:JSON.stringify(E),success:function (T){K(T,R);},error:L});
}};Q == true?S():setTimeout(S,0);}function N(Q,R,S){var T,U,V,W;E++;W = E;G[W] = null;G.waiting_pang++;T = {ping:E,uri:Q,body:S?JSON.stringify(R):R};var X =0;while (G[W] === null) {U = s({type:"POST",async:false,url:"/pang",data:JSON.stringify(T)});V = K(U.responseText,-1);if (V !== null && typeof V != "undefined") {typeof G[V.id] == "undefined"?w("Receive the pang(" + V.id + ") result too late",V):G[V.id] = V.body;} else {if (typeof V == "undefined") {if (X >= m) {delete G[W];G.waiting_pang--;G.waiting_pang == 0 && M(false);
throw new Error("Maximum pang attempt reached");}X++;}}T = ++E;}V = G[W];delete G[W];G.waiting_pang--;G.waiting_pang == 0 && M(false);return V;}D = N;C = function (){if (!F) {F = true;M(true);}};var O =null;function P(){if (O == null) {var Q =s({type:"POST",async:false,url:"/chan/sharedaddr",async:h});O = JSON.parse(Q.responseText);}}_bE.set_domain_url = function (Q){r = Q;};_bE.llmake = function (Q,R,S,T,U,V,W){C();T = new _bD(Q,R,S,T,U,V,W);return T;};_bE.unserialize = function (Q){var R;if ("srv_id" in Q) {R = new u(Q["srv_id"]);} else {if ("cl_id" in Q) {var S =_bC.get(Q.cl_id);if (S != null) {return S;} else {R = new v(Q.cl_id);}} else {
throw new Error("Bad formatted channel");}}if ("addr" in Q && "port" in Q) {P();if (O.addr != Q.addr || O.port != Q.port) {R.addr = Q.addr;R.port = Q.port;}}return R;};_bE.get_more = function (Q){var R =Q.more;if (typeof Q.more == "undefined") {return _o;}return R;};_bE.set_uu = function (Q,R){k = Q;l = R;};_bE.serialize = function (Q){var R =Q.serialized;if (R == null) {R = Q.serialize();Q.on_remove != null && Q.on_remove(function (){s({type:"POST",url:"/chan/remove",data:JSON.stringify(R),async:h});});Q instanceof _bD && b.push(R);}return R;};_bE.serialize_and_share = function (Q){var R =Q.shared_serialize;if (R == null) {var S =_bE.serialize(Q);R = {};var T;
for (T in S) {
  R[T] = S[T];
}if (R.addr == null) {P();R.addr = O.addr;R.port = O.port;}Q.shared_serialize = R;}return R;};_bE.exportt = function (Q,R){if (R == null) {return _bE.serialize(Q);}var S =R.serialize(),T;T = S.addr != null?_bE.serialize_and_share(Q):_bE.serialize(Q);if (!(R.srv_id != null && R.addr == null)) {Q = {entity:S,channel:T};b.push(Q);}return T;};_bF.comet_table_add = function (Q,R){x[Q] = R;};_bG.start = C;_bG.internal_prefix = f + "/_internal_/" + e;_bG.ajax = s;_bG.set_max_pang_attempt = function (Q){m = Q;};_bG.pang_request = function (Q,R,S){return D(g + Q,R,S);};_bG.async_call = function (Q,R){s({type:"POST",url:Q,data:R,async:h});};_bG.process_msg = function (Q){B = Q;};})();




function _bH(a,b){_bE.set_uu(a,b);return _C;}





















function _bI(a,b){return _bG.pang_request(a,b,false);}


function _bJ(a,b){_bG.async_call(a,b);}


function _bK(a){_bG.process_msg(a);return _C;}






_V || _bG.start();


function _bL(a,b,c,d,e){return new _bD(a,null,b,d,_BM(c),null,e);}

function _bM(a,b,c){c.send(null,b,a);return _C;}


function _bN(a,b,c){return a.call_no_cps(b,null,null,c);}

_Dm("___string_of_user_id_5bd07984,___user_id_of_string_5bd07984,_dT,_dS,_dR,_dQ,_dP,_dO,_dN,_dM,_dL,_dK,_dJ,_dI,_dH,___of_relative_5bd07984,___of_absolute_5bd07984,_dG,__v97_an_5bd07984,_dF,_dE,_dD,_dC,__v95_an_5bd07984,_dB,_dA,_cy,_cx,_cw,_cv,_cu,_ct,_cs,_cr,_cq,__v88_an_5bd07984,_cp,_co,__v86_an_5bd07984,_cn,__v84_an_5bd07984,__v85_an_5bd07984,_cm,_cl,_ck,_cj,_ci,__v80_an_5bd07984,_ch,__v78_an_5bd07984,_cg,_cf,_ce,_cd,__v76_an_5bd07984,_cc,__v74_an_5bd07984,_cb,__v73_an_5bd07984,_cZ,__v72_an_5bd07984,_cY,__v71_an_5bd07984,__v70_an_5bd07984,_cX,_cW,__v68_an_5bd07984,_cV,_cU,_cT,_cS,__v64_an_5bd07984,_cR,__v62_an_5bd07984,__v63_an_5bd07984,_cQ,_cP,__v61_an_5bd07984,_cO,__v59_an_5bd07984,_cN,__v58_an_5bd07984,_cM,__v57_an_5bd07984,_cL,__v56_an_5bd07984,__v55_an_5bd07984,_cK,__v54_an_5bd07984,_cJ,__v53_an_5bd07984,_cI,__v52_an_5bd07984,_cH,__v48_an_5bd07984,_cG,_cF,_cE,_cD,_cC,__v44_an_5bd07984,_cB,_cA,_by,__v39_an_5bd07984,_bx,_bw,_bv,_bu,__v35_an_5bd07984,_bt,__v37_an_5bd07984,_bs,__v34_an_5bd07984,_br,_bq,__v32_an_5bd07984,_bp,__v31_an_5bd07984,_bo,_bn,_bm,_bl,_bk,__v28_an_5bd07984,__v29_an_5bd07984,_bj,_bi,__v26_an_5bd07984,__v25_an_5bd07984,_bh,_bg,_bf,__v22_an_5bd07984,_be,_bd,__v19_an_5bd07984,_bc,_bb,_bZ,_bY,_bX,_bW,_bV,__v15_an_5bd07984,_bU,_bT,_bS,_bR,_bQ,__v5_an_5bd07984,__v4_an_5bd07984,_bP,_bO");
var _dU = {TyName_args:_Yo,TyName_ident:"list"};
var _dV = {hd:{label:"Chrome",ty:_dU},tl:_LS};
var _dW = {hd:{label:"Safari",ty:_dU},tl:_LS};
var _dX = {hd:{label:"Unidentified",ty:_LT},tl:_LS};
var _dY = {TySum_col:{hd:_dV,tl:{hd:_dW,tl:{hd:_dX,tl:{nil:_C}}}}};
var _dZ = {quantifier:_LR,body:_dY};
var _db = {hd:{label:"server",ty:_LT},tl:_LS};
var _dc = {TyName_args:_LN,TyName_ident:"HttpRequest.request"};
var _dd = {TyName_args:_LN,TyName_ident:"renderer_engine"};
var _de = {hd:{label:"renderer",ty:_dd},tl:_LS};
var _df = {TyName_args:_LN,TyName_ident:"environment_interface_engine"};
var _dg = {hd:{label:"environment",ty:_df},tl:_de};
var _dh = {TyRecord_row:_dg};
var _di = {quantifier:_LR,body:_dh};
var _dj = {hd:_dc,tl:_LN};
var _dk = {TyName_args:_LN,TyName_ident:"bot_engine"};
var _dl = {hd:{label:"Bot",ty:_dk},tl:_LS};
var _dm = {hd:{label:"Gecko",ty:_dU},tl:_LS};
var _dn = {hd:{label:"Nokia",ty:_dU},tl:_LS};
var _do = {hd:{label:"Presto",ty:_dU},tl:_LS};
var _dp = {hd:{label:"Trident",ty:_dU},tl:_LS};
var _dq = {TyName_args:_LN,TyName_ident:"webkit_variant"};
var _dr = {hd:{label:"variant",ty:_dq},tl:_LS};
var _ds = {hd:{label:"Webkit",ty:_dU},tl:_dr};
var _dt = {TySum_col:{hd:_dl,tl:{hd:_dm,tl:{hd:_dn,tl:{hd:_do,tl:{hd:_dp,tl:{hd:_dX,tl:{hd:_ds,tl:{nil:_C}}}}}}}}};
var _du = {quantifier:_LR,body:_dt};
var _dv = {hd:{label:"Macintosh",ty:_LT},tl:_LS};
var _dw = {hd:{label:"Symbian",ty:_LT},tl:_LS};
var _dx = {hd:{label:"Windows",ty:_LT},tl:_LS};
var _dy = {hd:{label:"X11",ty:_LT},tl:_LS};
var _eA = {hd:{label:"iPhone",ty:_LT},tl:_LS};
var _eB = {TySum_col:{hd:_dv,tl:{hd:_dw,tl:{hd:_dX,tl:{hd:_dx,tl:{hd:_dy,tl:{hd:_eA,tl:{nil:_C}}}}}}}};
var _eC = {quantifier:_LR,body:_eB};
var _eD = {hd:{label:"Googlebot",ty:_dU},tl:_LS};
var _eE = {hd:{label:"Msnbot",ty:_dU},tl:_LS};
var _eF = {hd:{label:"Yahoobot",ty:_Me},tl:_LS};
var _eG = {TySum_col:{hd:_eD,tl:{hd:_eE,tl:{hd:_eF,tl:{nil:_C}}}}};
var _eH = {quantifier:_LR,body:_eG};
var _eI = {TyName_args:_LN,TyName_ident:"Uri.uri"};
var _eJ = {TyName_args:_Nx,TyName_ident:"option"};
var _eK = {hd:{label:"username",ty:_eJ},tl:_LS};
var _eL = {hd:{label:"password",ty:_eJ},tl:_eK};
var _eM = {TyRecord_row:_eL};
var _eN = {quantifier:_LR,body:_eM};
var _eO = {hd:_LW,tl:_Nx};
var _eP = {TyName_args:_eO,TyName_ident:"tuple_2"};
var _eQ = {hd:_eP,tl:_LN};
var _eR = {TyName_args:_eQ,TyName_ident:"list"};
var _eS = {hd:{label:"query",ty:_eR},tl:_LS};
var _eT = {hd:{label:"address",ty:_LW},tl:_eS};
var _eU = {hd:{label:"schema",ty:_eJ},tl:_LS};
var _eV = {hd:{label:"query",ty:_eR},tl:_eU};
var _eW = {TyName_args:_Yo,TyName_ident:"option"};
var _eX = {hd:{label:"port",ty:_eW},tl:_eV};
var _eY = {hd:{label:"path",ty:_Ny},tl:_eX};
var _eZ = {hd:{label:"is_directory",ty:_Mi},tl:_eY};
var _eb = {hd:{label:"fragment",ty:_eJ},tl:_eZ};
var _ec = {hd:{label:"domain",ty:_LW},tl:_eb};
var _ed = {TyName_args:_LN,TyName_ident:"Uri.uri_credentials"};
var _ee = {hd:{label:"credentials",ty:_ed},tl:_ec};
var _ef = {hd:{label:"path",ty:_Ny},tl:_eS};
var _eg = {hd:{label:"is_from_root",ty:_Mi},tl:_ef};
var _eh = {hd:{label:"is_directory",ty:_Mi},tl:_eg};
var _ei = {hd:{label:"fragment",ty:_eJ},tl:_eh};
var _ej = {TySum_col:{hd:_eT,tl:{hd:_ee,tl:{hd:_ei,tl:{nil:_C}}}}};
var _ek = {quantifier:_LR,body:_ej};
var _el = {TyName_args:_LN,TyName_ident:"WebInfo.private.native_request"};
var _em = {hd:{label:"request",ty:_el},tl:_LS};
var _en = {TyName_args:_LN,TyName_ident:"WebInfo.private.native_connection"};
var _eo = {hd:{label:"connexion",ty:_en},tl:_em};
var _ep = {TyRecord_row:_eo};
var _eq = {quantifier:_LR,body:_ep};
var _er = {hd:{label:"stop_propagation",ty:_Mi},tl:_LS};
var _es = {hd:{label:"prevent_default",ty:_Mi},tl:_er};
var _et = {TyRecord_row:_es};
var _eu = {quantifier:_LR,body:_et};
var _ev = {hd:{label:"prevent_default",ty:_LT},tl:_LS};
var _ew = {TyName_args:_LN,TyName_ident:"Dom.event"};
var _ex = {hd:_ew,tl:_LN};
var _ey = {TyName_args:_LN,TyName_ident:"Dom.event_propagation"};
var _fA = {TyArrow_params:_ex,TyArrow_res:_ey};
var _fB = {hd:{label:"propagation_handler",ty:_fA},tl:_LS};
var _fC = {hd:{label:"stop_propagation",ty:_LT},tl:_LS};
var _fD = {TySum_col:{hd:_ev,tl:{hd:_fB,tl:{hd:_fC,tl:{nil:_C}}}}};
var _fE = {quantifier:_LR,body:_fD};
var _fF = {hd:{label:"blur",ty:_LT},tl:_LS};
var _fG = {hd:{label:"change",ty:_LT},tl:_LS};
var _fH = {hd:{label:"click",ty:_LT},tl:_LS};
var _fI = {hd:{label:"custom",ty:_LW},tl:_LS};
var _fJ = {hd:{label:"dblclick",ty:_LT},tl:_LS};
var _fK = {hd:{label:"error",ty:_LT},tl:_LS};
var _fL = {hd:{label:"focus",ty:_LT},tl:_LS};
var _fM = {hd:{label:"focusin",ty:_LT},tl:_LS};
var _fN = {hd:{label:"focusout",ty:_LT},tl:_LS};
var _fO = {hd:{label:"input",ty:_LT},tl:_LS};
var _fP = {hd:{label:"keydown",ty:_LT},tl:_LS};
var _fQ = {hd:{label:"keyesc",ty:_LT},tl:_LS};
var _fR = {hd:{label:"keypress",ty:_LT},tl:_LS};
var _fS = {hd:{label:"keyup",ty:_LT},tl:_LS};
var _fT = {hd:{label:"load",ty:_LT},tl:_LS};
var _fU = {hd:{label:"mousedown",ty:_LT},tl:_LS};
var _fV = {hd:{label:"mouseenter",ty:_LT},tl:_LS};
var _fW = {hd:{label:"mouseleave",ty:_LT},tl:_LS};
var _fX = {hd:{label:"mousemove",ty:_LT},tl:_LS};
var _fY = {hd:{label:"mouseout",ty:_LT},tl:_LS};
var _fZ = {hd:{label:"mouseover",ty:_LT},tl:_LS};
var _fb = {hd:{label:"mouseup",ty:_LT},tl:_LS};
var _fc = {hd:{label:"mousewheel",ty:_LT},tl:_LS};
var _fd = {hd:{label:"newline",ty:_LT},tl:_LS};
var _fe = {hd:{label:"paste",ty:_LT},tl:_LS};
var _ff = {hd:{label:"ready",ty:_LT},tl:_LS};
var _fg = {hd:{label:"resize",ty:_LT},tl:_LS};
var _fh = {hd:{label:"scroll",ty:_LT},tl:_LS};
var _fi = {hd:{label:"select",ty:_LT},tl:_LS};
var _fj = {hd:{label:"submit",ty:_LT},tl:_LS};
var _fk = {hd:{label:"unload",ty:_LT},tl:_LS};
var _fl = {TySum_col:{hd:_fF,tl:{hd:_fG,tl:{hd:_fH,tl:{hd:_fI,tl:{hd:_fJ,tl:{hd:_fK,tl:{hd:_fL,tl:{hd:_fM,tl:{hd:_fN,tl:{hd:_fO,tl:{hd:_fP,tl:{hd:_fQ,tl:{hd:_fR,tl:{hd:_fS,tl:{hd:_fT,tl:{hd:_fU,tl:{hd:_fV,tl:{hd:_fW,tl:{hd:_fX,tl:{hd:_fY,tl:{hd:_fZ,tl:{hd:_fb,tl:{hd:_fc,tl:{hd:_fd,tl:{hd:_fe,tl:{hd:_ff,tl:{hd:_fg,tl:{hd:_fh,tl:{hd:_fi,tl:{hd:_fj,tl:{hd:_fk,tl:{nil:_C}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}};
var _fm = {quantifier:_LR,body:_fl};
var _fn = {hd:{label:"to",ty:_LW},tl:_LS};
var _fo = {hd:{label:"from",ty:_LW},tl:_fn};
var _fp = {TyRecord_row:_fo};
var _fq = {hd:_fp,tl:_LN};
var _fr = {TyName_args:_fq,TyName_ident:"option"};
var _fs = {hd:{label:"value_change",ty:_fr},tl:_LS};
var _ft = {TyName_args:_LN,TyName_ident:"Dom.dimensions"};
var _fu = {hd:{label:"mouse_position_on_page",ty:_ft},tl:_fs};
var _fv = {hd:{label:"left",ty:_LT},tl:_LS};
var _fw = {hd:{label:"middle",ty:_LT},tl:_LS};
var _fx = {hd:{label:"right",ty:_LT},tl:_LS};
var _fy = {hd:{label:"wheel",ty:_Lr},tl:_LS};
var _gA = {TySum_col:{hd:_fv,tl:{hd:_fw,tl:{hd:_fx,tl:{hd:_fy,tl:{nil:_C}}}}}};
var _gB = {hd:_gA,tl:_LN};
var _gC = {TyName_args:_gB,TyName_ident:"option"};
var _gD = {hd:{label:"mouse_button",ty:_gC},tl:_fu};
var _gE = {TyName_args:_LN,TyName_ident:"Dom.event.kind"};
var _gF = {hd:{label:"kind",ty:_gE},tl:_gD};
var _gG = {hd:{label:"alt",ty:_LT},tl:_LS};
var _gH = {hd:{label:"ctrl",ty:_LT},tl:_LS};
var _gI = {hd:{label:"meta",ty:_LT},tl:_LS};
var _gJ = {hd:{label:"shift",ty:_LT},tl:_LS};
var _gK = {TySum_col:{hd:_gG,tl:{hd:_gH,tl:{hd:_gI,tl:{hd:_gJ,tl:{nil:_C}}}}}};
var _gL = {hd:_gK,tl:_LN};
var _gM = {TyName_args:_gL,TyName_ident:"list"};
var _gN = {hd:{label:"key_modifiers",ty:_gM},tl:_gF};
var _gO = {TyName_args:_LN,TyName_ident:"Dom.key_code"};
var _gP = {hd:_gO,tl:_LN};
var _gQ = {TyName_args:_gP,TyName_ident:"option"};
var _gR = {hd:{label:"key_code",ty:_gQ},tl:_gN};
var _gS = {TyRecord_row:_gR};
var _gT = {quantifier:_LR,body:_gS};
var _gU = {hd:{label:"y_px",ty:_Lr},tl:_LS};
var _gV = {hd:{label:"x_px",ty:_Lr},tl:_gU};
var _gW = {TyRecord_row:_gV};
var _gX = {quantifier:_LR,body:_gW};
var _gY = _EC("webkit_variant",_dZ);
var _gZ = _EC("user_compat",_di);
var _gb = _EC("url",_Mf);
var _gc = _EC("renderer_engine",_du);
var _gd = _EC("environment_interface_engine",_eC);
var _ge = _EC("bot_engine",_eH);
var _gf = _EC("WebInfo.private.native_request",_MW);
var _gg = _EC("WebInfo.private.native_connection",_MW);
var _gh = _EC("Uri.uri_credentials",_eN);
var _gi = _EC("Uri.uri",_ek);
var _gj = _EC("HttpRequest.request",_eq);
var _gk = _EC("Dom.key_code",_Md);
var _gl = _EC("Dom.event_propagation",_eu);
var _gm = _EC("Dom.event_option",_fE);
var _gn = _EC("Dom.event.kind",_fm);
var _go = _EC("Dom.event",_gT);
var _gp = _EC("Dom.dimensions",_gX);
var _gq = {some:_Cc()};
function _bO(a,b){return function (){return _Il(a,b);};}
function _bP(a){return function (){return a;};}
function _bQ(a){return _Fk({hd:"" + a.a,tl:{hd:".",tl:{hd:"" + a.b,tl:{hd:".",tl:{hd:"" + a.c,tl:{hd:".",tl:{hd:"" + a.d,tl:{nil:_C}}}}}}}});}
var _gr = _FK("IPv4.ip",_bQ);
function _bR(a,b){var c;while (a.length != 0) {c = _Iv(2,a);b = b + "%" + _Ik(0,2,a);a = c;}return b;}
function _bS(a){return _bR(a.length % 2 == 0?a:"0" + a,"");}
function _bT(a){return function (){return _bS(_KD(a,""));};}
function _bU(a,b){return function (){var c;return (c = _IW(a).some)?_RN(b,c.f1,_bT(c.f2)):{none:_C};};}
function _bV(a){return function (){return _Ie(a);};}
function _bW(a,b){var c,d;return (c = ((c = ((c = ((d = _IW(b).some)?(c = d.f2,c >= 97 && 122 >= c || (c >= 65 && 90 >= c || (c >= 48 && 57 >= c || (c == 126 || (c == 33 || (c == 64 || (c == 36 || (c == 94 || (c == 38 || (c == 42 || (c == 40 || (c == 41 || (c == 95 || (c == 124 || (c == 92 || (c == 61 || (c == 45 || (c == 91 || (c == 93 || (c == 125 || (c == 123 || (c == 59 || (c == 58 || (c == 63 || (c == 47 || (c == 46 || c == 44)))))))))))))))))))))))))?{some:{f1:d.f1,f2:c}}:{none:_C}):{none:_C}).some)?(c = c.f1,_RN(a,c,_bO(b,c))):{none:_C}).some)?_RN(a,c.f1,_bV(c.f2)):{none:_C}).some)?{some:c}:_bU(b,a)();}
function _bX(a){return _bW(true,a);}
function _bY(a){return function (){return _Fk(a);};}
function _bZ(a,b){return (b = _RR(false,_bX,b).some)?_RN(a,b.f1,_bY(b.f2)):{none:_C};}
function _bb(a){return _TC(_bZ,a);}
function _bc(a,b){return function (){return {username:_GM(a),password:b};};}
function _bd(a,b){return (b = _RU(b,":").some)?(b = _Sj(a,b.f1).some)?_RN(a,b.f1,_bP(b.f2)):{none:_C}:{none:_C};}
function _be(a,b){var c,d;return (b = _Sj(true,b).some)?(c = b.f1,(d = ((d = _bd(true,c).some)?{some:{f1:d.f1,f2:{some:d.f2}}}:{some:{f1:c,f2:{none:_C}}}).some)?(c = _RU(d.f1,"@").some)?_RN(a,c.f1,_bc(b.f2,d.f2)):{none:_C}:{none:_C}):{none:_C};}
function _bf(a,b){return (b = _RU(b,":").some)?(b = _Rt(a,b.f1).some)?_RN(a,b.f1,_bP(b.f2)):{none:_C}:{none:_C};}
function _bg(a,b){return function (){return _Bu(a * 16 + b);};}
function _bh(a,b){var c;return (b = _RU(b,"%").some)?(c = _Sb(true,b.f1).some)?(b = _Sb(a,c.f1).some)?_RN(a,b.f1,_bg(c.f2,b.f2)):{none:_C}:{none:_C}:{none:_C};}
function _bi(a){var b;return (b = _IW(a).some)?(a = b.f2,a == 45 || (a == 95 || (a == 46 || (a == 33 || (a == 126 || (a == 42 || (a == 39 || (a == 40 || a == 41)))))))?{some:{f1:b.f1,f2:a}}:{none:_C}):{none:_C};}
function _bj(a,b){var c;return (c = ((c = _RT(true,_bi,b).some)?(c = c.f1,_RN(a,c,_bO(b,c))):{none:_C}).some)?_RN(a,c.f1,_bV(c.f2)):{none:_C};}
function _bk(a){return function (){var b;return (b = _bj(true,a).some)?{some:{f1:b.f1,f2:_C}}:{none:_C};};}
function _bl(a){var b;return (b = ((b = _Sh(true,a).some)?{some:{f1:b.f1,f2:_C}}:{none:_C}).some)?{some:b}:_bk(a)();}
function _bm(a,b){var c;return (b = ((c = _RT(true,_bl,b).some)?(c = c.f1,_RN(a,c,_bO(b,c))):{none:_C}).some)?_RN(a,b.f1,_bV(b.f2)):{none:_C};}
function _bn(){return " ";}
function _bo(a,b){return function (){var c;return (c = _RU(a," ").some)?_RN(b,c.f1,_bn):{none:_C};};}
function _bp(a,b){return function (){var c;return (c = ((c = _bh(b,a).some)?_RN(b,c.f1,_bP(c.f2)):{none:_C}).some)?{some:c}:_bo(a,b)();};}
function _bq(a,b){var c;return (c = ((c = _bm(a,b).some)?_RN(a,c.f1,_bP(c.f2)):{none:_C}).some)?{some:c}:_bp(b,a)();}
function _br(a){return _bq(true,a);}
function _bs(a,b){return (b = _RR(true,_br,b).some)?_RN(a,b.f1,_bY(b.f2)):{none:_C};}
function _bt(a,b){var c,d;return (c = ((d = _IW(b).some)?(c = d.f2,c == 47?{some:{f1:d.f1,f2:c}}:{none:_C}):{none:_C}).some)?(c = c.f1,_RN(a,c,_bO(b,c))):{none:_C};}
function _bu(a,b){return (b = _bs(a,b).some)?_RN(a,b.f1,_bP(b.f2)):{none:_C};}
function _bv(a){var b;return (a = _IW(a).some)?(b = a.f2,b == 47?{some:{f1:a.f1,f2:b}}:{none:_C}):{none:_C};}
function _bw(a,b){return a == ""?b:a == "."?b:a == ".."?(b = b.tl)?b:{nil:_C}:{hd:a,tl:b};}
function _bx(a,b,c){return function (){return {is_from_root:a,is_directory:c,path:_Gf(_Fh(_bw,b,{nil:_C}))};};}
function _by(a){return function (){return _Io(a);};}
function _cA(a,b){var c;return (c = ((c = ((c = _RT(true,_bv,b).some)?(c = c.f1,_RN(a,c,_bO(b,c))):{none:_C}).some)?{some:{f1:c.f1,f2:{some:c.f2}}}:{some:{f1:b,f2:{none:_C}}}).some)?_RN(a,c.f1,_by(c.f2)):{none:_C};}
function _cB(a){return function (b,c){var d,e;return (d = _cA(true,c).some)?(e = a(true,d.f1).some)?(c = _cA(b,e.f1).some)?_RN(b,c.f1,_bx(d.f2,e.f2,c.f2)):{none:_C}:{none:_C}:{none:_C};};}
var _gs = _cB(_Rj(false,_bu,_bt));
function _cC(a,b){var c,d;return (c = ((d = _IW(b).some)?(c = d.f2,c == 45?{some:{f1:d.f1,f2:c}}:{none:_C}):{none:_C}).some)?(c = c.f1,_RN(a,c,_bO(b,c))):{none:_C};}
function _cD(a){return function (){return _Fo("","","-",a);};}
function _cE(a){return function (){return _Fo("","",".",a);};}
function _cF(a){return function (b,c){return (c = a(b,c).some)?_RN(b,c.f1,_cE(c.f2)):{none:_C};};}
function _cG(a){return function (b,c){return (c = a(b,c).some)?_RN(b,c.f1,_cD(c.f2)):{none:_C};};}
function _cH(a,b){var c,d;return (c = ((c = _IW(b).some)?(d = c.f2,d == 46?{some:{f1:c.f1,f2:d}}:{none:_C}):{none:_C}).some)?(c = c.f1,_RN(a,c,_bO(b,c))):{none:_C};}
var _gt = _cF(_Ro(1,false,_cG(_Ro(1,false,_Sj,_cC)),_cH));
function _cI(a){var b;return (a = _IW(a).some)?(b = a.f2,b == 123 || (b == 125 || (b == 124 || (b == 92 || (b == 94 || (b == 91 || (b == 93 || (b == 96 || b == 34)))))))?{some:{f1:a.f1,f2:b}}:{none:_C}):{none:_C};}
function _cJ(a,b){var c;return (b = ((c = _RT(true,_cI,b).some)?(c = c.f1,_RN(a,c,_bO(b,c))):{none:_C}).some)?_RN(a,b.f1,_bV(b.f2)):{none:_C};}
function _cK(a,b){return function (){var c;return (c = _cJ(b,a).some)?_RN(b,c.f1,_bP(c.f2)):{none:_C};};}
function _cL(a,b){return function (){var c,d;return (c = ((c = ((c = ((d = _IW(a).some)?(c = d.f2,c == 47 || (c == 58 || (c == 64 || (c == 43 || (c == 36 || (c == 44 || c == 32)))))?{some:{f1:d.f1,f2:c}}:{none:_C}):{none:_C}).some)?(c = c.f1,_RN(b,c,_bO(a,c))):{none:_C}).some)?_RN(b,c.f1,_bV(c.f2)):{none:_C}).some)?{some:c}:_cK(a,b)();};}
function _cM(a,b){return function (){var c,d;return (c = ((c = ((c = _IW(a).some)?(d = c.f2,d == 43?{some:{f1:c.f1,f2:d}}:{none:_C}):{none:_C}).some)?_RN(b,c.f1,_bn):{none:_C}).some)?{some:c}:_cL(a,b)();};}
function _cN(a,b){return function (){var c;return (c = ((c = _bh(b,a).some)?_RN(b,c.f1,_bP(c.f2)):{none:_C}).some)?{some:c}:_cM(a,b)();};}
function _cO(a,b){var c;return (c = ((c = _bm(a,b).some)?_RN(a,c.f1,_bP(c.f2)):{none:_C}).some)?{some:c}:_cN(b,a)();}
function _cP(a){return _cO(true,a);}
function _cQ(a,b){return (b = _RR(true,_cP,b).some)?_RN(a,b.f1,_bY(b.f2)):{none:_C};}
function _cR(a,b){return (b = _RR(false,_cP,b).some)?_RN(a,b.f1,_bY(b.f2)):{none:_C};}
function _cS(a,b){return function (){var c;return {f1:a,f2:(c = b.some,c != null)?c:""};};}
function _cT(a,b){var d,c;return (c = _cQ(true,b).some)?(d = c.f1,(b = ((b = ((b = _RU(d,"=").some)?(b = _cR(a,b.f1).some)?_RN(a,b.f1,_bP(b.f2)):{none:_C}:{none:_C}).some)?{some:{f1:b.f1,f2:{some:b.f2}}}:{some:{f1:d,f2:{none:_C}}}).some)?_RN(a,b.f1,_cS(c.f2,b.f2)):{none:_C}):{none:_C};}
function _cU(){return _OZ;}
function _cV(a,b){var c;return (b = ((b = _IW(b).some)?(c = b.f2,c == 38 || c == 59?{some:{f1:b.f1,f2:c}}:{none:_C}):{none:_C}).some)?_RN(a,b.f1,_cU):{none:_C};}
var _gu = _Rj(false,_cT,_cV);
function _cW(a,b){var c;return (b = _RU(b,"?").some)?(b = b.f1,(b = ((c = _RU(b,"&").some)?{some:{f1:c.f1,f2:{some:c.f2}}}:{some:{f1:b,f2:{none:_C}}}).some)?(b = _gu(a,b.f1).some)?_RN(a,b.f1,_bP(b.f2)):{none:_C}:{none:_C}):{none:_C};}
function _cX(a){var b;return (b = _IW(a).some)?(a = b.f2,a == 59 || (a == 47 || (a == 63 || (a == 58 || (a == 64 || (a == 38 || (a == 61 || (a == 43 || (a == 36 || a == 44))))))))?{some:{f1:b.f1,f2:a}}:{none:_C}):{none:_C};}
function _cY(a,b){var c;return (c = ((c = _RT(true,_cX,b).some)?(c = c.f1,_RN(a,c,_bO(b,c))):{none:_C}).some)?_RN(a,c.f1,_bV(c.f2)):{none:_C};}
function _cZ(a,b){return function (){var c;return (c = _bh(b,a).some)?_RN(b,c.f1,_bP(c.f2)):{none:_C};};}
function _cb(a,b){return function (){var c;return (c = ((c = _bm(b,a).some)?_RN(b,c.f1,_bP(c.f2)):{none:_C}).some)?{some:c}:_cZ(a,b)();};}
function _cc(a,b){var c;return (c = ((c = _cY(a,b).some)?_RN(a,c.f1,_bP(c.f2)):{none:_C}).some)?{some:c}:_cb(b,a)();}
function _cd(a){return _cc(true,a);}
function _ce(a,b){return (b = _RR(true,_cd,b).some)?_RN(a,b.f1,_bY(b.f2)):{none:_C};}
function _cf(){return "";}
function _cg(a,b){return function (){var c;return (c = _RU(a,"#").some)?_RN(b,c.f1,_cf):{none:_C};};}
function _ch(a,b){var c;return (c = ((c = _RU(b,"#").some)?(c = _ce(a,c.f1).some)?_RN(a,c.f1,_bP(c.f2)):{none:_C}:{none:_C}).some)?{some:c}:_cg(b,a)();}
function _ci(a,b){return (b = _RU(b,"/").some)?(b = _gs(a,b.f1).some)?_RN(a,b.f1,_bP(b.f2)):{none:_C}:{none:_C};}
function _cj(a){return a.path;}
function _ck(a){return a.is_directory;}
function _cl(a,b,c,d,e,f,g){return function (){var h;return {schema:a,credentials:(h = b.some)?h:{username:_Of,password:_Of},domain:c,port:d,path:(h = _JM(_cj,e).some)?h:{nil:_C},is_directory:(h = _JM(_ck,e).some,h != null)?h:false,query:(h = f.some)?h:{nil:_C},fragment:g};};}
function _cm(a){return function (b,c){var d,e,f,g,h,i;return (d = ((e = _be(true,c).some)?{some:{f1:e.f1,f2:{some:e.f2}}}:{some:{f1:c,f2:{none:_C}}}).some)?(f = _gt(true,d.f1).some)?(e = f.f1,(c = ((c = _bf(true,e).some)?{some:{f1:c.f1,f2:{some:c.f2}}}:{some:{f1:e,f2:{none:_C}}}).some)?(e = c.f1,(g = ((i = _ci(true,e).some)?{some:{f1:i.f1,f2:{some:i.f2}}}:{some:{f1:e,f2:{none:_C}}}).some)?(e = g.f1,(h = ((i = _cW(true,e).some)?{some:{f1:i.f1,f2:{some:i.f2}}}:{some:{f1:e,f2:{none:_C}}}).some)?(e = h.f1,(i = ((i = _ch(true,e).some)?{some:{f1:i.f1,f2:{some:i.f2}}}:{some:{f1:e,f2:{none:_C}}}).some)?(e = _SH(b,i.f1).some)?_RN(b,e.f1,_cl(a,d.f2,f.f2,c.f2,g.f2,h.f2,i.f2)):{none:_C}:{none:_C}):{none:_C}):{none:_C}):{none:_C}):{none:_C}:{none:_C};};}
function _cn(a,b){return function (){var c;return (c = ((c = _RU(a,"@").some)?(c = c.f1,_RN(b,c,_bO(a,c))):{none:_C}).some)?_RN(b,c.f1,_bV(c.f2)):{none:_C};};}
function _co(a,b){var c;return (c = ((c = _cc(a,b).some)?_RN(a,c.f1,_bP(c.f2)):{none:_C}).some)?{some:c}:_cn(b,a)();}
function _cp(a){return _co(true,a);}
function _cq(a,b){return (b = _RR(true,_cp,b).some)?_RN(a,b.f1,_bY(b.f2)):{none:_C};}
function _cr(a,b){return function (){var c;return {address:a,query:(c = b.some)?c:{nil:_C}};};}
function _cs(a,b){var c,d;return (b = _cq(true,b).some)?(c = b.f1,(d = ((d = _cW(a,c).some)?{some:{f1:d.f1,f2:{some:d.f2}}}:{some:{f1:c,f2:{none:_C}}}).some)?_RN(a,d.f1,_cr(b.f2,d.f2)):{none:_C}):{none:_C};}
function _ct(a){return a.mailto?"mailto":a.http?"http":a.https?"https":"ftp";}
function _cu(){return {mailto:_C};}
function _cv(a,b){return function (){var c;return (c = _RU(a,"mailto").some)?_RN(b,c.f1,_cu):{none:_C};};}
function _cw(){return {http:_C};}
function _cx(a,b){return function (){var c;return (c = ((c = _RU(a,"http").some)?_RN(b,c.f1,_cw):{none:_C}).some)?{some:c}:_cv(a,b)();};}
function _cy(){return {https:_C};}
function _dA(a,b){return function (){var c;return (c = ((c = _RU(a,"https").some)?_RN(b,c.f1,_cy):{none:_C}).some)?{some:c}:_cx(a,b)();};}
function _dB(){return {ftp:_C};}
function _dC(a,b){var c;return (c = ((c = _RU(b,"ftp").some)?_RN(a,c.f1,_dB):{none:_C}).some)?{some:c}:_dA(b,a)();}
function _dD(a,b){var c,d;return (c = _dC(true,b).some)?(b = _RU(c.f1,":").some)?(b = b.f1,(b = ((d = _RU(b,"//").some)?{some:{f1:d.f1,f2:{some:d.f2}}}:{some:{f1:b,f2:{none:_C}}}).some)?_RN(a,b.f1,_bP(c.f2)):{none:_C}):{none:_C}:{none:_C};}
function _dE(a,b,c){return function (){var d;return {path:a.path,fragment:c,query:(d = b.some)?d:{nil:_C},is_from_root:a.is_from_root,is_directory:a.is_directory};};}
function _dF(a,b){return function (){var c,d,e,f;return (c = _SH(true,a).some)?(e = _gs(true,c.f1).some)?(d = e.f1,(f = ((c = _cW(true,d).some)?{some:{f1:c.f1,f2:{some:c.f2}}}:{some:{f1:d,f2:{none:_C}}}).some)?(c = f.f1,(d = ((d = _ch(true,c).some)?{some:{f1:d.f1,f2:{some:d.f2}}}:{some:{f1:c,f2:{none:_C}}}).some)?(c = _SH(b,d.f1).some)?_RN(b,c.f1,_dE(e.f2,f.f2,d.f2)):{none:_C}:{none:_C}):{none:_C}):{none:_C}:{none:_C};};}
function _dG(a,b){var c,d;return (c = ((c = _SH(true,b).some)?(d = _dD(true,c.f1).some)?(c = d.f2,(c = (c.http?_cm(_GM(_ct(c))):c.https?_cm(_GM(_ct(c))):c.ftp?_cm(_GM(_ct(c))):_cs)(a,d.f1).some)?_RN(a,c.f1,_bP(c.f2)):{none:_C}):{none:_C}:{none:_C}).some)?{some:c}:_dF(b,a)();}
function _dH(a){return _TD(_dG,a);}
function _dI(a){return encodeURIComponent(a);}
function _dJ(a){return !_dH(a).none;}
function _dK(a){return _Gi(_dI,a,0);}
function _dL(a){return _JA("/",_dK(a));}
function _dM(a){return _Fk({hd:"#",tl:{hd:a,tl:{nil:_C}}});}
function _dN(a){return function (b){return _Fk({hd:a,tl:{hd:":",tl:{hd:b,tl:{hd:"@",tl:{nil:_C}}}}});};}
function _dO(a){return function (b){return _Iw(_dN(b),b,a.password);};}
function _dP(a){return _Fk({hd:encodeURIComponent(a.f1),tl:{hd:"=",tl:{hd:encodeURIComponent(a.f2),tl:{nil:_C}}}});}
function _dQ(a){return _Fk({hd:a,tl:{hd:"://",tl:{nil:_C}}});}
function _dR(a){return a.nil?"":"?" + _JB(_dP,"&",a);}
function _dS(a){return _Fk({hd:":",tl:{hd:"" + a,tl:{nil:_C}}});}
function _dT(a){var b,c;return (b = a.is_from_root,b != null)?_Fk({hd:b?"/":"",tl:{hd:_dL(a.path),tl:{hd:a.is_directory?"/":"",tl:{hd:(b = a.fragment.some,b != null)?_Fk({hd:"#",tl:{hd:b,tl:{nil:_C}}}):"",tl:{hd:_dR(a.query),tl:{nil:_C}}}}}}):(c = a.credentials)?(b = a.path,_Fk({hd:_Iw(_dQ,"",a.schema),tl:{hd:_Iw(_dO(c),"",c.username),tl:{hd:a.domain,tl:{hd:_Iw(_dS,"",a.port),tl:{hd:b.nil?"/":_dL({hd:"",tl:b}),tl:{hd:a.is_directory?"/":"",tl:{hd:_dR(a.query),tl:{hd:_Iw(_dM,"",a.fragment),tl:{nil:_C}}}}}}}}})):_Fk({hd:"mailto:",tl:{hd:a.address,tl:{hd:_dR(a.query),tl:{nil:_C}}}});}
var _gv = _FK("Uri.uri",_dT);
_Dm("_gy,_gx,_gw");
function _gw(a){return function (b){return _Iq(b,a);};}
function _gx(a){return function (b){return _Gi(b,a,0);};}
function _gy(a,b){return function (c){return _Kk(c,b,a);};}
;
;
function _hA(x0,x1,x2){var by_ret;return by_ret = _bM(x0,x1,x2),by_ret,_C;}
function _hB(x0){var by_ret;return by_ret = _Zk(x0),by_ret,_C;}
function _hC(x0,x1){var by_ret;return by_ret = _BY(x0,x1),by_ret,_C;}
function _hD(x0,x1){var by_ret;return by_ret = _BU(x0,x1),by_ret,_C;}
function _hE(x0,x1){var by_ret;return by_ret = _BT(x0,x1),by_ret,_C;}
function _hF(x0,x1){var by_ret;return by_ret = _BX(x0,x1),by_ret,_C;}
function _hG(x0,x1){var by_ret;return by_ret = _BW(x0,x1),by_ret,_C;}
function _hH(x0,x1){var by_ret;return by_ret = _BV(x0,x1),by_ret,_C;}
function _hI(x0,x1){var by_ret;return by_ret = _bJ(x0,x1),by_ret,_C;}
function _hJ(x0){var by_ret;return by_ret = _bK(x0),by_ret,_C;}
function _hK(x0,x1){var by_ret;return by_ret = _bH(function (p0_0){return x0(function (){return p0_0(),_C;});},x1),by_ret,_C;}
_Dm("_kR,__v1_observer_f2f00d5f,__v176_an_f2f00d5f,__v174_an_f2f00d5f,__v173_an_f2f00d5f,__v171_an_f2f00d5f,__v162_an_f2f00d5f,__v157_an_f2f00d5f,__v156_an_f2f00d5f,_kQ,_kP,_kO,_kN,_kM,_kL,_kK,_kJ,_kI,_kH,_kG,_kF,_kE,_kD,___finish_serialize_f2f00d5f,_kC,_kB,_kA,_jy,__v113_an_f2f00d5f,__v111_an_f2f00d5f,__v110_an_f2f00d5f,__v2_on_message_basic_f2f00d5f,__v3_on_message_basic_f2f00d5f,__v102_an_f2f00d5f,__v101_an_f2f00d5f,__v15_an_f2f00d5f,__v1_timer_f2f00d5f,__v1_ser_f2f00d5f,___to_string_in_js_f2f00d5f,_jx,_jw,_jv,__v1_for_string_f2f00d5f,__v1_25fb0bee_f2f00d5f,___deserialize_f2f00d5f,_ju,_jt,_js,_jr,_jq,_jp,_jo,_jn,_jm,_jl,_jk,_jj,_ji,_jh,_jg,_jf,_je,_jd,_jc,_jb,_jZ,_jY,_jX,_jW,_jV,_jU,_jT,_jS,_jR,_jQ,_jP,_jO,_jN,_jM,_jL,_jK,_jJ,_jI,_jH,_jG,_jF,_jE,_jD,_jC,_jB,_jA,_iy,_ix,__v65_an_f2f00d5f,_iw,_iv,_iu,_it,_is,_ir,_iq,_ip,__v95_an_f2f00d5f,__v94_an_f2f00d5f,_io,_in,_im,_il,_ik,_ij,_ii,_ih,_ig,_if,_ie,_id,_ic,_ib,_iZ,_iY,_iX,_iW,___partial_unserialize_f2f00d5f,___deserialize_opt_f2f00d5f,___of_string_f2f00d5f,_iV,_iU,_iT,_iS,_iR,_iQ,_iP,_iO,_iN,_iM,_iL,_iK,_iJ,__v36_an_f2f00d5f,_iI,_iH,_iG,_iF,_iE,__v33_an_f2f00d5f,_iD,_iC,_iB,_iA,_hy,_hx,___from_ll_json_f2f00d5f,_hw,_hv,_hu,_ht,_hs,_hr,_hq,_hp,_ho,_hn,_hm,_hl,_hk,__v38_an_f2f00d5f,_hj,_hi,_hh,_hg,_hf,_he,_hd,_hc,_hb,_hZ,_hY,_hX,_hW,_hV,_hU,_hT,_hS,_hR,_hQ,_hP,_hO,_hN,_hM,_hL");
var _kS = {TyName_args:_LN,TyName_ident:"RPC.Json.private.native"};
var _kT = {TyName_args:_LN,TyName_ident:"OpaNetwork.cid"};
var _kU = {TyName_args:_LN,TyName_ident:"OpaNetwork.entity"};
var _kV = {TyName_args:_LN,TyName_ident:"RPC.Json.json"};
var _kW = {hd:_RG,tl:_LN};
var _kX = {hd:_RG,tl:_kW};
var _kY = {TyName_args:_kX,TyName_ident:"Cell.cell"};
var _kZ = {hd:{label:"Bool",ty:_Mi},tl:_LS};
var _kb = {TyConst:{TyFloat:_C}};
var _kc = {hd:{label:"Float",ty:_kb},tl:_LS};
var _kd = {hd:{label:"Int",ty:_Lr},tl:_LS};
var _ke = {hd:_kV,tl:_LN};
var _kf = {TyName_args:_ke,TyName_ident:"list"};
var _kg = {hd:{label:"List",ty:_kf},tl:_LS};
var _kh = {hd:_LW,tl:_ke};
var _ki = {TyName_args:_kh,TyName_ident:"tuple_2"};
var _kj = {hd:_ki,tl:_LN};
var _kk = {TyName_args:_kj,TyName_ident:"list"};
var _kl = {hd:{label:"Record",ty:_kk},tl:_LS};
var _km = {hd:{label:"String",ty:_LW},tl:_LS};
var _kn = {TySum_col:{hd:_kZ,tl:{hd:_kc,tl:{hd:_kd,tl:{hd:_kg,tl:{hd:_kl,tl:{hd:_km,tl:{nil:_C}}}}}}}};
var _ko = {hd:{label:"TyConst",ty:_Mm},tl:_LS};
var _kp = {hd:{label:"TyName_ident",ty:_LW},tl:_LS};
var _kq = {hd:{label:"TyName_args",ty:_Ms},tl:_kp};
var _kr = {TySum_col:{hd:_Mo,tl:{hd:_Mt,tl:{hd:_ko,tl:{hd:_My,tl:{hd:_kq,tl:{hd:_NE,tl:{hd:_NH,tl:{hd:_NK,tl:{hd:_NN,tl:{hd:_NP,tl:{nil:_C}}}}}}}}}}}};
var _ks = {TyName_args:_kW,TyName_ident:"channel"};
var _kt = {TyName_args:_LN,TyName_ident:"OpaSerializeClosure.intermediate"};
var _ku = {TyName_args:_LN,TyName_ident:"c292634"};
var _kv = {hd:_ku,tl:_LN};
var _kw = {hd:_LW,tl:_kv};
var _kx = {TyName_args:_kw,TyName_ident:"tuple_2"};
var _ky = {hd:_kx,tl:_LN};
var _lA = {TyName_args:_ky,TyName_ident:"list"};
var _lB = {hd:{label:"Record",ty:_lA},tl:_LS};
var _lC = {TySum_col:{hd:_kZ,tl:{hd:_kc,tl:{hd:_kd,tl:{hd:_kg,tl:{hd:_lB,tl:{hd:_km,tl:{nil:_C}}}}}}}};
var _lD = {TyName_args:_LN,TyName_ident:"ThreadContext.client"};
var _lE = {hd:{label:"other",ty:_LW},tl:_LS};
var _lF = {hd:{label:"client",ty:_LW},tl:_LS};
var _lG = {hd:{label:"remote",ty:_LT},tl:_LS};
var _lH = {TySum_col:{hd:_lF,tl:{hd:_lE,tl:{hd:_lG,tl:{nil:_C}}}}};
var _lI = {TyArrow_params:_LN,TyArrow_res:_Me};
var _lJ = {TyName_args:_LN,TyName_ident:"black"};
var _lK = {hd:_lJ,tl:_LN};
var _lL = {TyName_args:_lK,TyName_ident:"option"};
var _lM = {hd:_LW,tl:_ML};
var _lN = {TyName_args:_ML,TyName_ident:"option"};
var _lO = {TyName_args:_LN,TyName_ident:"ThreadContext.t"};
var _lP = {TyName_args:_LN,TyName_ident:"OpaTsc.t"};
var _lQ = {hd:_lP,tl:_LN};
var _lR = {TyName_args:_lQ,TyName_ident:"option"};
var _lS = {TyArrow_params:_Nx,TyArrow_res:_lR};
var _lT = {quantifier:_LR,body:_lS};
var _lU = {TyName_args:_ML,TyName_ident:"Channel.t"};
var _lV = {quantifier:_MD,body:_lU};
var _lW = {TyName_args:_dj,TyName_ident:"option"};
var _lX = {hd:{label:"request",ty:_lW},tl:_LS};
var _lY = {TyName_args:_LN,TyName_ident:"ThreadContext.key"};
var _lZ = {hd:{label:"key",ty:_lY},tl:_lX};
var _lb = {hd:{label:"locale",ty:_Ny},tl:_LS};
var _lc = {TyName_args:_LN,TyName_ident:"user_compat"};
var _ld = {hd:{label:"browser",ty:_lc},tl:_lb};
var _le = {TyRecord_row:_ld};
var _lf = {hd:_le,tl:_LN};
var _lg = {TyName_args:_lf,TyName_ident:"option"};
var _lh = {hd:{label:"details",ty:_lg},tl:_lZ};
var _li = {TyName_args:_LN,TyName_ident:"ThreadContext.constraint"};
var _lj = {hd:{label:"constraint",ty:_li},tl:_lh};
var _lk = {TyRecord_row:_lj};
var _ll = {quantifier:_LR,body:_lk};
var _lm = {hd:{label:"client",ty:_lD},tl:_LS};
var _ln = {hd:{label:"nothing",ty:_LT},tl:_LS};
var _lo = {TyName_args:_LN,TyName_ident:"ThreadContext.server"};
var _lp = {hd:{label:"server",ty:_lo},tl:_LS};
var _lq = {TySum_col:{hd:_lm,tl:{hd:_ln,tl:{hd:_lp,tl:{nil:_C}}}}};
var _lr = {quantifier:_LR,body:_lq};
var _ls = {hd:{label:"free",ty:_LT},tl:_LS};
var _lt = {hd:{label:"no_client_calls",ty:_LT},tl:_LS};
var _lu = {TySum_col:{hd:_ls,tl:{hd:_lt,tl:{nil:_C}}}};
var _lv = {quantifier:_LR,body:_lu};
var _lw = {hd:{label:"page",ty:_Lr},tl:_LS};
var _lx = {hd:{label:"client",ty:_LW},tl:_lw};
var _ly = {TyRecord_row:_lx};
var _mA = {quantifier:_LR,body:_ly};
var _mB = {hd:{label:"List",ty:_MM},tl:_LS};
var _mC = {TyName_args:_lM,TyName_ident:"tuple_2"};
var _mD = {hd:_mC,tl:_LN};
var _mE = {TyName_args:_mD,TyName_ident:"list"};
var _mF = {hd:{label:"Record",ty:_mE},tl:_LS};
var _mG = {TySum_col:{hd:_kZ,tl:{hd:_kc,tl:{hd:_kd,tl:{hd:_mB,tl:{hd:_mF,tl:{hd:_km,tl:{nil:_C}}}}}}}};
var _mH = {quantifier:_MD,body:_mG};
var _mI = {TyName_args:_ke,TyName_ident:"RPC.Json.json0"};
var _mJ = {quantifier:_LR,body:_mI};
var _mK = {hd:{label:"ty_args",ty:_kf},tl:_LS};
var _mL = {hd:{label:"func_name",ty:_LW},tl:_mK};
var _mM = {hd:{label:"args",ty:_kf},tl:_mL};
var _mN = {TyRecord_row:_mM};
var _mO = {quantifier:_LR,body:_mN};
var _mP = {hd:{label:"client",ty:_LT},tl:_lG};
var _mQ = {hd:{label:"peer",ty:_LT},tl:_lG};
var _mR = {TySum_col:{hd:_lm,tl:{hd:_mP,tl:{hd:_mQ,tl:{hd:_db,tl:{nil:_C}}}}}};
var _mS = {quantifier:_LR,body:_mR};
var _mT = {quantifier:_LR,body:_lH};
var _mU = {hd:{label:"entity",ty:_Le},tl:_LS};
var _mV = {TyName_args:_RI,TyName_ident:"option"};
var _mW = {TyArrow_params:_MG,TyArrow_res:_mV};
var _mX = {hd:{label:"unserialize",ty:_mW},tl:_LS};
var _mY = {hd:{label:"more",ty:_lL},tl:_mX};
var _mZ = {hd:_Lh,tl:_RI};
var _mb = {TyName_args:_mZ,TyName_ident:"Actor.t"};
var _mc = {hd:{label:"local",ty:_mb},tl:_mY};
var _md = {hd:{label:"id",ty:_LW},tl:_mc};
var _me = {TySum_col:{hd:_mU,tl:{hd:_md,tl:{nil:_C}}}};
var _mf = {quantifier:_Ld,body:_me};
var _mg = {hd:_kT,tl:_LN};
var _mh = {hd:_kV,tl:_mg};
var _mi = {hd:_Le,tl:_mh};
var _mj = {hd:_lO,tl:_mi};
var _mk = {TyName_args:_mj,TyName_ident:"GenChannel.t"};
var _ml = {quantifier:_MD,body:_mk};
var _mm = {TyName_args:_ML,TyName_ident:"continuation"};
var _mn = {hd:_mm,tl:_MG};
var _mo = {TyName_args:_mn,TyName_ident:"tuple_2"};
var _mp = {hd:_mo,tl:_LN};
var _mq = {TyName_args:_mp,TyName_ident:"channel"};
var _mr = {quantifier:_Li,body:_mq};
var _ms = _EC("channel",_lV);
var _mt = _EC("ThreadContext.t",_ll);
var _mu = _EC("ThreadContext.server",_MW);
var _mv = _EC("ThreadContext.key",_lr);
var _mw = _EC("ThreadContext.constraint",_lv);
var _mx = _EC("ThreadContext.client",_mA);
var _my = _EC("RPC.Json.private.native",_MW);
var _nA = _EC("RPC.Json.json0",_mH);
var _nB = _EC("RPC.Json.json",_mJ);
var _nC = _EC("OpaSerializeClosure.intermediate",_mO);
var _nD = _EC("OpaNetwork.entity",_mS);
var _nE = _EC("OpaNetwork.cid",_mT);
var _nF = _EC("GenChannel.t",_mf);
var _nG = _EC("Channel.t",_ml);
var _nH = _EC("Cell.cell",_mr);
var _nI = _EC("Actor.t",_OA);
function _hL(a){return _Bd("ERROR STUB : An error occurs when you call this stub => " + a,"File \"lib/stdlib/core/rpc/core/exports.opa\", line 35, characters 3-71, (35:3-35:71 | 1957-2025)");}
var _nJ = {types:{nil:_C},rows:{nil:_C},cols:{nil:_C},values:{nil:_C}};
function _hM(a){return isFinite(a)?_CW(a):isNaN(a)?"NaN":a < 0.?"-Infinity":"Infinity";}
function _hN(a,b){return _If(a,_Fk({hd:"\"",tl:{hd:_Iu(b),tl:{hd:"\"",tl:{nil:_C}}}}));}
function _hO(a,b){return function (c,d){var e;return e = d.f1,c = _hP(a)(c,d.f3?e:_If(e,","),b),{f1:c.f1,f2:_Hs(d.f2,c.f2),f3:false};};}
function _hP(a){return function (b,c,d){var e;return (e = b.Int,e != null)?{f1:_If(c,"" + e),f2:{nil:_C}}:(e = b.Float,e != null)?{f1:_If(c,_hM(e)),f2:{nil:_C}}:(e = b.String,e != null)?{f1:_hN(c,e),f2:{nil:_C}}:(e = b.Bool,e != null)?{f1:_If(c,_HP(e)),f2:{nil:_C}}:(e = b.Record)?(d == 0?false && a:false)?{f1:_If(c,"null"),f2:{hd:b,tl:{nil:_C}}}:(b = _Fh(_hQ(a,d),e,{f1:_If(c,"{"),f2:{nil:_C},f3:true}),{f1:_If(b.f1,"}"),f2:b.f2}):(b = _Fh(_hO(a,d),b.List,{f1:_If(c,"["),f2:{nil:_C},f3:true}),{f1:_If(b.f1,"]"),f2:b.f2});};}
function _hQ(a,b){return function (c,d){var e;return e = d.f1,c = _hP(a)(c.f2,_If(_hN(d.f3?e:_If(e,","),c.f1),":"),b - 1),{f1:c.f1,f2:_Hs(d.f2,c.f2),f3:false};};}
function _hR(a,b){return _IZ(_If(b,"" + _Ic(a)),a);}
function _hS(a){return function (b,c,d,e){while (true) {var f =_hP(a)(b,_Ib(""),100),g =f.f1;f = _Hs(d,f.f2);if (_Fl(f)) {return _Fl(e)?g:_KO(_hR,_Gd(g,e),_If(c,"$"));} else {b = _HC(f);d = _HB(f);e = _Gd(g,e);}}};}
function _hT(a,b,c){return _hS(c)(a,b,{nil:_C},{nil:_C});}
function _hU(a){return _Ie(_hT(a,_Ib(""),true));}
var _nK = [{nil:_C}];
function _hV(a,b,c){var d;return d = (d = _Cm(_nK),_FH(_nK,{nil:_C}),d),d.nil?c(a,b):(b = {Record:{hd:{f1:"to_register",f2:{List:d}},tl:{hd:{f1:"url",f2:{String:_Fk({hd:_bG.internal_prefix,tl:{hd:a,tl:{nil:_C}}})}},tl:{hd:{f1:"body",f2:{String:b}},tl:{nil:_C}}}}},c("/chan/register",_hU(b)));}
function _hW(a,b){return _bI(a,b);}
function _hX(a,b){return _hV(a,b,_hW);}
function _hY(a,b){return _hE(a,b);}
function _hZ(a,b){return _hD(a,b);}
function _hb(a,b){return _hH(a,b);}
function _hc(a,b){return _hG(a,b);}
function _hd(a,b){return _hF(a,b);}
function _he(a){return function (b,c){return _hC(b,c);};}
function _nL(a){return _he(a);}
var _nM = {fatal:_hY,error:_hZ,warning:_hb,notice:_hc,info:_hd,debug:_nL};
function _hf(a){return function (b){var c;return (c = b.set,c != null)?{some:c}:b.unchanged?{some:a}:{none:_C};};}
function _hg(a){return function (b){return b["continue"]?{some:a}:{none:_C};};}
function _hh(a){return function (b,c){var d;return (d = a.normal)?_hf(b)(d(b,c)):(d = a.basic)?_hg(b)(d(b,c)):_hg(b)(a.concurrent(b,c));};}
var _nN = _CO;
var _nO = -_nN;
var _nP = {to:{server:_C},closure:{at_best:_C},to_session:{none:_C},serialize_closure_callback:_LM};
function _hi(a,b,c){return function (d){var e;return (d = ((e = d.entity_id)?(d = _Ev(b,e).some)?(_FF(b,e),{cb:d.cb}):_C:(e = d.local_id,(d = _Ev(c,e).some)?(_FF(c,e),{cb:d.cb}):_C)).cb)?_hB(d):_OZ;};}
function _hj(a,b){return function (){return _hB(a),b();};}
function _hk(a,b,c){return function (d,e){var f;return (f = d.entity)?(d = ((d = _Ev(b,f).some)?(_FG(b,f,{cb:_hj(e,d.cb),owner:d.owner}),_C):{cb:e}).cb)?_hB(d):_OZ:(d = d.id,(f = _Ev(c,d).some)?_FG(c,d,{cb:_hj(e,f.cb),id:f.id}):_FE(c,d,{id:"",cb:e}));};}
function _hl(a,b,c){return function (d,e,f){var g;return (g = ((g = _Ev(c,d).some)?_GM(g.owner):b.default_entity).some,g == null)?f.error(_Fk({hd:"Entity channel(",tl:{hd:_HQ(_kT)(d),tl:{hd:") not found: Can't send the message",tl:{nil:_C}}}})):f.should?b.try_send(g,d,e)?f.success():f.error(_Fk({hd:"Entity channel(",tl:{hd:_HQ(_kT)(d),tl:{hd:") can't be reached",tl:{nil:_C}}}})):b.send(g,d,e);};}
function _hm(a){return _nM.error("CHANNEL",a);}
function _hn(a){return function (b){return _hm(b),_hB(a);};}
function _ho(a){return function (){return _hB(a);};}
function _hp(){return _OZ;}
function _hq(a){var b;return (b = a.herror)?{error:_hn(b),success:_ho(a.hsuccess),should:true}:{error:_hm,success:_hp,should:false};}
function _hr(a){return a.hsuccess?a.message:a.message;}
function _hs(a){return a.hsuccess?a.serialize(a.message):a.serialize(a.message);}
function _ht(a,b,c){return function (d,e,f){var g,h;return h = _hq(f),(g = e.entity)?_hl(a,b,c)(g,_hs(f),h):(_hA(d,_hr(f),e.local),h.success());};}
var _nQ = {key:{nothing:_C},request:_Of,constraint:{free:_C},details:_Of};
function _hu(a){return (a = a.from,a == null)?_Dy():_Dv(a);}
function _hv(a){return (a = _hu(a).some)?a:_nQ;}
function _hw(a){return function (b,c,d){return _hh(a)(b,c);};}
function _hx(a){return function (b,c){return a((b = _Zq(c).some)?b:(_nM.error("Session",_HQ(_kS)(c)),_Bd("Malformed JSON object","File \"lib/stdlib/core/rpc/core/session_private.opa\", line 109, characters 99-128, (109:99-109:128 | 3978-4007)")));};}
function _hy(a,b,c,d,e,f){return f(a,_hx(b),_hw(c),e.maker?{some:_hv({current:_C})}:e.sender?{none:_C}:(b = _hv({current:_C}),b.key.nothing?{none:_C}:{some:b}),d,c.concurrent?true:false);}
function _iA(a,b,c,d){return function (){return _hi(a,b,c)({local_id:d});};}
function _iB(a,b,c,d,e){return function (f,g,h,i,j,k){return g = b(),{local:_bL(f,h,_GM(_iA(a,c,d,g)),i,k),more:_JM(_FO,j),unserialize:e,id:g};};}
function _iC(a,b,c,d){return function (e,f,g,h,i){return _hy(e,g,f,i,h,_iB(a,b,c,d,g));};}
function _iD(a,b,c){return function (d){var e;return (e = d.entity_id)?_Ev(b,e).none?(_hm(_Fk({hd:"Entity channel(",tl:{hd:_HQ(_kT)(e),tl:{hd:") not found",tl:{nil:_C}}}})),{none:_C}):{some:{entity:e}}:(e = d.local_id,d = _Ev(c,e),d.none?(_hm(_Fk({hd:"Local channel(",tl:{hd:e,tl:{hd:") not found",tl:{nil:_C}}}})),d):d);};}
function _iE(a,b){return function (c,d){return _FE(b,c,{owner:d,cb:_hp});};}
function _iF(a){return function (b){return b.owner;};}
function _iG(a,b){return function (c){return (c = c.entity)?_JM(_iF(a),_Ev(b,c)):_Of;};}
function _iH(a){return function (b,c){return c = _Cb(20) + c,_FE(a,c,b),c;};}
function _iI(a,b,c){return function (){return _iH(a)(c,b);};}
function _iJ(a,b){return function (c){var d,e,f;return (d = c.id,d != null)?(f = _Ev(a,d).some)?(e = f.id,{local_id:e == ""?(c = _iI(b,d,c)(),_FG(a,e,{id:c,cb:f.cb}),c):e}):(f = _iI(b,d,c)(),_FE(a,d,{id:f,cb:_hp}),{local_id:f}):{entity_id:c.entity};};}
function _iK(a,b,c){return function (d,e,f,g){var h;return (h = e.unserialize)?(h = h(f).some,h == null)?_hm(_Fk({hd:"Error on message unserialization for the local channel(",tl:{hd:e.id,tl:{hd:")",tl:{nil:_C}}}})):_hA(d,h,e.local):_hl(a,b,c)(e.entity,f,_hq(g));};}
function _iL(a,b,c,d){return function (e){var f;return f = _Hi(a)(d,e.value.owner),f === true?_hi(a,b,c)({entity_id:e.key}):f === false?_C:_X("<no position available (cons.typed)>: Match failure 2839827");};}
function _iM(a,b,c){return function (d){return _Kv(_iL(a,b,c,d),_Ex(b));};}
function _iN(a){return function (b){var c,d,e,f;return f = _JG(0),e = _Er(b.hash_cid,b.equals_cid,1024),d = _Es(1024),c = _Es(1024),{make:_iC(a,f,e,d),send_to_entity:_hl(a,b,e),send:_ht(a,b,e),forward:_iK(a,b,e),remove:_hi(a,e,d),register:_iE(a,e),remove_entity:_iM(a,e,d),find:_iD(a,e,c),owner:_iG(a,e),identify:_iJ(d,c),on_remove:_hk(a,e,d)};};}
function _iO(a,b){return _hI(a,b);}
function _iP(a,b){return _hV(a,b,_iO);}
var _nR = "cl_id";
var _nS = "srv_id";
function _iQ(a){var b;return (b = a.other,b != null)?{Record:{hd:{f1:_nS,f2:{String:b}},tl:{nil:_C}}}:(b = a.client,b != null)?{Record:{hd:{f1:_nR,f2:{String:b}},tl:{nil:_C}}}:{String:"TODO/REMOTE"};}
function _iR(a,b,c){return _iP("/chan/send",_hU({Record:{hd:{f1:"to",f2:_iQ(b)},tl:{hd:{f1:"message",f2:c},tl:{nil:_C}}}}));}
function _iS(a,b,c){return _iR(a,b,c),true;}
var _nT = _GM({server:_C});
var _nU = _HO(_kT);
var _nV = _Hi(_kT);
var _nW = {send:_iR,try_send:_iS,default_entity:_nT,hash_cid:_nU,equals_cid:_nV};
var _nX = _iN(_kU)(_nW);
var _nY = _nX.owner;
function _iT(a){return a.client?true:false;}
function _iU(a){var b;return a = _nY(a),{closure:_nP.closure,serialize_closure_callback:_nP.serialize_closure_callback,to:(b = a.some)?_iT(b)?{client:_C}:{server:_C}:{server:_C},to_session:a};}
function _iV(a){var b;return (a = a.Record) && (b = a.hd) && b.f1 === "ty_args" && (b = b.f2.List) && a.tl.hd && a.tl.hd.f1 === "func_name" && a.tl.hd.f2.String != null && a.tl.tl.hd && a.tl.tl.hd.f1 === "args" && a.tl.tl.hd.f2.List && a.tl.tl.tl.nil?_GM({func_name:a.tl.hd.f2.String,args:a.tl.tl.hd.f2.List,ty_args:b}):_Of;}
function _iW(a,b){var c,d;while (c = a.tl) {if (d = b.hd) {if (a.hd == d.label) {a = c;b = b.tl;} else {return false;}} else {return false;}}return b.nil?true:false;}
function _iX(a){return function (b){return _iW(a,b);};}
function _iY(a,b){return _Jx(_iX(a),b);}
var _nZ = _nX.make;
function _iZ(a,b){return _nX.send(_hu({current:_C}),a,b);}
function _ib(a){return _FH(_nK,{hd:{String:a},tl:_Cm(_nK)});}
function _ic(a,b){return b = _nX.identify(a),(a = b.local_id,a != null)?(_ib(a),{Record:{hd:{f1:_nR,f2:{String:a}},tl:{nil:_C}}}):(a = b.entity_id,b = a.other,b != null) && _BE(a) === 1?{Record:{hd:{f1:_nS,f2:{String:b}},tl:{nil:_C}}}:(b = a.client,b != null) && _BE(a) === 1?{Record:{hd:{f1:_nR,f2:{String:b}},tl:{nil:_C}}}:_Bd("","File \"lib/stdlib/core/rpc/core/channel.opa\", line 414, characters 12-16, (414:12-414:16 | 13128-13132)");}
var _nb = {client:"_internal_",page:-1};
function _id(a){return _nM.error("OPACHANNEL",a);}
var _nc = _nX.find;
var _nd = _nX.register;
function _ie(a){var d,c,b;return (b = a.Record) && (c = b.hd) && (d = c.f2.String,d != null) && b.tl.nil?(c = c.f1,c == _nR?(c = _nc({local_id:d}),c.none?(_nd({client:d},{client:_nb}),{some:{entity:{client:d}}}):c):c == _nS?(_nX.register({other:d},{server:_C}),_nX.find({entity_id:{other:d}})):(_id(_Fk({hd:"Bad JSON fields : ",tl:{hd:c,tl:{nil:_C}}})),{none:_C})):(_id(_Fk({hd:"Bad formatted JSON : ",tl:{hd:_HQ(_kV)(a),tl:{nil:_C}}})),{none:_C});}
function _if(a){return (a = a.more)?_JM(_FO,a):_Of;}
function _ig(a){return function (b,c){return _nM.error("Finish unserialize",_HQ(a)(b)),c;};}
function _ih(a,b){return _FD(a,b),{"continue":_C};}
function _ii(a){return function (b){return _Gd(b,a);};}
function _ij(a){return _JM(_Gf,a);}
function _ik(a){return function (b,c){return _FA(a,b,c);};}
function _il(a){return function (b,c){var d;return d = _Dg(a),_GC(_ik(d),c),{"return":_Dt(b,d),instruction:{"continue":_C}};};}
function _im(a){return _Bd("That case should never happen","File \"lib/stdlib/core/rpc/core/cell.opa\", line 132, characters 41-78, (132:41-132:78 | 4594-4631)");}
function _in(a,b,c){var d;return d = c.f1,b = a(b,c.f2),true && !false?_FC(d,b["return"]):_FD(d,b["return"]),b.instruction;}
function _io(a,b,c){return function (d,e){return _in(c,d,e);};}
function _ip(a){return function (b){return a.to.server?_Jd(b):_Je(b);};}
function _iq(a,b){return {"return":a,instruction:{"continue":_C}};}
function _ir(a){return function (b){return _Bd("Cell for abstract serialization, can't receive remote messages","File \"lib/stdlib/core/rpc/core/opaserialize.opa\", line 360, characters 26-96, (360:26-360:96 | 13058-13128)");};}
function _is(a){return a.f1;}
function _it(a){return _JM(_is,_EN(a));}
function _iu(a){return _d(a);}
function _iv(a,b){return function (c){return _KO(c,a,b);};}
function _iw(a,b){return _Gd(a.f1,b);}
function _ix(a){return a.f2;}
function _iy(a){return _JM(_ix,_EN(a));}
function _jA(a){return a.none?true:false;}
function _jM(a){return _jN(a);}
function _jG(a,b){return function (c){return _iZ(b,{serialize:_jH(a,_iU(b)),message:c});};}
function _jT(a,b,c){return _JO(_jU(b,a),c);}
function _je(a){return function (b,c,d){return _Gd(_ne(0,c,b,a),d);};}
function _jd(a,b){return function (c){return {List:_Gf(_Gs(_je(b),a,c,{nil:_C}))};};}
function _jP(a,b){return function (c,d,e,f){return {hd:{f1:_GK(c),f2:_jI(a,b)(e,d)},tl:f};};}
function _jo(a){return function (b,c){var d,e,f,g,h;return e = b.f1,d = b.f2,g = c.f1,f = c.f2,c = c.f3,c?{f1:g,f2:{nil:_C},f3:c}:(b = f.tl)?(h = f.hd,h.label != e?e < h.label?_ig(_LW)(_Fk({hd:"Superfluous field ",tl:{hd:e,tl:{hd:" in json",tl:{nil:_C}}}}),{f1:g,f2:f,f3:c}):_ig(_LW)(_Fk({hd:"Missing field ",tl:{hd:e,tl:{hd:" in json",tl:{nil:_C}}}}),{f1:g,f2:f,f3:true}):(f = _jD(a)(d,h.ty).some,f == null)?_ig(_LW)(_Fk({hd:"Unserialization of field ",tl:{hd:h.label,tl:{hd:" with json ",tl:{hd:_HQ(_kV)(d),tl:{hd:" and with type ",tl:{hd:_Od(1,h.ty),tl:{hd:" fail",tl:{nil:_C}}}}}}}}),{f1:g,f2:{nil:_C},f3:true}):(h = _y(e).some,h == null)?_ig(_LW)("No field are named " + e,{f1:g,f2:{nil:_C},f3:true}):{f1:_BC(g,h,f),f2:b,f3:c}):_ig(_LW)(_Fk({hd:"Superfluous field '",tl:{hd:e,tl:{hd:"' in json",tl:{nil:_C}}}}),{f1:g,f2:f,f3:c});};}
function _jf(a,b){return (a = _JM(_jg,_iV(a)).some)?a:_Of;}
function _jC(a){return function (b){var c;return (c = b.String,c != null) && c === "PleaseCallForMe"?{some:_d(_im)}:_nf(1,b,{TyName_args:{hd:a,tl:{nil:_C}},TyName_ident:"continuation"});};}
function _jS(a){return function (b){return (b = b.List)?_ij(_Gs(_jT,a,b,{some:{nil:_C}})):(_Bd("Cell for closure : unexpected message","File \"lib/stdlib/core/rpc/core/opaserialize.opa\", line 258, characters 19-64, (258:19-258:64 | 8878-8923)"),_Of);};}
function _jU(a,b){return function (c){return _JM(_ii(c),_nf(1,a,b));};}
function _jE(a){return function (b,c){return _JM(_iu,_JM(_jF(c),_jD(a)(b,_ks)));};}
function _jg(a){var b,c;return b = a.args,false && _GA(0,b) != 0?_Of:(c = _Dk(a.func_name).some,c == null)?_Of:(a = _gx(a.ty_args)(_jh),b = _gy(a,b)(_ji),_KU(_jA,b)?_Of:(b = _gx(b)(_JQ),a = _gx(a)(_JQ),_GM(_Du(c,_JU(b),_JU(a)))));}
function _jF(a){return function (b){return _jG(a,b);};}
function _jV(a,b){var c,e,d;return (c = a(b).some,c == null)?_Of:(a = _Dq(b),d = _Dr(b),e = _Dh(a),b = _Dh(d),true && e != 0?_Of:e != b?_Of:_GM({func_name:c,args:_gw(e)(_jW(a,d)),ty_args:_gw(b)(_jX(d))}));}
function _jk(a,b){return function (c,d){return c = {f1:d,f2:_jD(a)(c,b)},(d = c.f1.some) && c.f2.some != null?_GM({hd:c.f2.some,tl:d}):_Of;};}
function _jB(a,b,c,d){return function (e){var f,g;return (e = e.List) && (g = e.tl) && (f = g.tl) && f.nil?(e = {f1:_jC(c)(e.hd),f2:d(g.hd)},(f = e.f1,g = f.some,g != null) && _BE(f) === 1 && e.f2.some != null?{some:{f1:g,f2:e.f2.some}}:{none:_C}):{none:_C};};}
function _jY(a,b,c){return function (d,e){return _Gd(_jI(a,b)(d,c),e);};}
function _jJ(a,b){return function (c,d,e,f){var g;return g = (f = f.some)?f:b,f = (f = d.normal)?{normal:_io(a,b,f)}:(f = d.basic)?{basic:_io(a,b,f)}:{concurrent:_io(a,b,d.concurrent)},_nZ(c,f,_jB(a,b,g,(e = e.some)?e:_jK(a)),{sender:_C},_GM({cell:{s_result:_jL(g),on_message:_hh(f)}}));};}
function _ng(a,b,c,d,e,f,g,h){while (true) {switch (a) {case 0:;
case 1:a = (h = g.some)?h:c;h = (h = f.some)?h:_jc(b,c,e,d);if (f = d.local,f != null) {return (h = _if(d).some)?_bN(f,e,h.cell.on_message):_Bd("","File \"lib/stdlib/core/rpc/core/cell.opa\", line 252, characters 20-24, (252:20-252:24 | 8818-8822)");} else {h = {Record:{hd:{f1:"to",f2:_ic(d,_nP)},tl:{hd:{f1:"message",f2:{List:{hd:{String:"PleaseCallForMe"},tl:{hd:h(e),tl:{nil:_C}}}}},tl:{nil:_C}}}};h = _hX("/cell/CallThatPlease",_hU(h));return (f = _nf(0,h,a).some,f != null)?f:_Bd("Bad cell response:" + h,"File \"lib/stdlib/core/rpc/core/cell.opa\", line 260, characters 59-87, (260:59-260:87 | 9202-9230)");};
case 2:f = {none:_C};g = {none:_C};a = 0;;}}}
function _jb(a,b){return function (c,d,e,f){return _ng(0,a,b,c,d,e,f);};}
function _jj(a,b){return function (c,d){return _ng(2,a,b,c,d);};}
function _ne(a,b,c,d,e,f,g){var j,h,i;while (true) {switch (a) {case 0:a = d;d = b;e = c;b = a;a = 7;
continue;;
case 1:d = _nP;a = 0;continue;;
case 2:a = c;c = d;d = _nZ(e,{concurrent:_ih},_jO(f),{maker:_C},{none:_C});e = {TyName_args:{hd:b,tl:_LN},TyName_ident:"channel"};b = a;a = 7;
continue;;
case 3:h = _GA(0,f);return (a = _Jc(e).some)?a.arity == h?_jI(b,c)(a.cell,_kY):_Bd("runtime","File \"lib/stdlib/core/rpc/core/opaserialize.opa\", line 306, characters 17-32, (306:17-306:32 | 11058-11073)"):b.closure.local?_jR(b,c,g,f,e,h)():(a = _jV(_ip(b),e).some)?(b.serialize_closure_callback(a.func_name),_jI(b,c)(a,_kt)):_jR(b,c,g,f,e,h)();;
case 4:return {Record:_GH(_jP(b,c),d,e,{nil:_C})};;
case 5:return {List:_KO(_jY(b,c,e),d,{nil:_C})};;
case 6:if (e) {d = _jJ(_RG,_RG)(d,{concurrent:_iq},_GM(_ir(_RG)),_GM({TyVar:"Cell for abstract serialization, can't send remote result"}));e = _kY;} else {e = _kY;};
case 7:if ((a = e.TyConst) && a.TyInt) {return !(_nO <= d && d <= _nN) && (b.to.client?true:false)?_Bd(_Fk({hd:"Cannot serialize the integer ",tl:{hd:"" + d,tl:{hd:", it is out of range, use min_int and max_int to ensure the range",tl:{nil:_C}}}}),"File \"lib/stdlib/core/rpc/core/opaserialize.opa\", line 375, characters 14-125, (375:14-375:125 | 13655-13766)"):{Int:d};} else {if (a && a.TyString) {return {String:d};} else {if (a) {if (isFinite(d)) {return {Float:d};} else {d = _hM(d);e = {TyConst:{TyString:_C}};a = 7;
continue;}} else {if ((a = e.TyRecord_row) && _BE(e) === 1) {e = a;a = 4;
continue;} else {if (a) {e = a;a = 4;continue;} else {if ((a = e.TySum_col) && _BE(e) === 1) {e = _HH(d,a).f1;a = 4;
continue;} else {if (a) {e = _HH(d,a).f1;a = 4;continue;} else {if ((i = e.TyName_args) && (a = i.tl) && (j = a.nil) && e.TyName_ident === "list") {e = i.hd;a = 5;
continue;} else {if (i && (h = e.TyName_ident,h === "Session.private.native")) {return _ic(d,b);} else {if (i && h === "channel") {return _ic(d,b);} else {if (i && h === "Cell.cell") {return _ic(d,b);} else {if (i && h === "OpaSerialize.unser") {return d;} else {if (i && h === "RPC.Json.json") {return d;} else {if (i && a && j && h === "continuation") {e = d;f = i.hd;d = c;c = b;b = _RG;a = 2;
continue;} else {if (i && h === "Dom.private.element") {e = true;a = 6;
continue;} else {if (i && h === "style_constructor") {e = true;a = 6;
continue;} else {if (i) {return _GF(_it,h,i,_jM,_jQ(b,c,_HA(h,i)),d,{hd:b,tl:{nil:_C}});} else {if (a = e.TyForall_body) {e = a;a = 7;
continue;} else {if (j = e.TyArrow_params) {a = e.TyArrow_res;h = e;e = d;f = j;g = a;d = h;a = 3;
continue;} else {if (e.TyAbstract) {_nM.error("partial_serialize_options",_HR("OpaSerialize.partial_serialize",c,e));_nM.error("partial_serialize_options",_Fk({hd:"value: ",tl:{hd:_Bn(d),tl:{nil:_C}}}));return _Bd("OpaSerialize.partial_serialize","File \"lib/stdlib/core/rpc/core/opaserialize.opa\", line 442, characters 9-47, (442:9-442:47 | 16508-16546)");} else {_nM.error("partial_serialize_options",_HR("OpaSerialize.partial_serialize",c,e));_nM.error("partial_serialize_options",_Fk({hd:"value: ",tl:{hd:_Bn(d),tl:{nil:_C}}}));return _Bd("OpaSerialize.partial_serialize","File \"lib/stdlib/core/rpc/core/opaserialize.opa\", line 442, characters 9-47, (442:9-442:47 | 16508-16546)");}}}}}}}}}}}}}}}}}}}};
case 8:(a = b.closure.distant)?a():_OZ;d = _jJ(_RG,_RG)(f,{concurrent:_il(g)},{some:_jS(e)},{some:d});e = _kY;a = 7;
continue;;
case 9:a = c;c = b;b = a;a = 1;continue;;
case 10:a = d;d = c;c = b;b = a;a = 0;continue;;
case 11:a = c;c = b;b = a;a = 0;continue;;
case 12:a = e;e = d;d = a;a = 7;continue;;
case 13:b = _Dj(b,d);c = _Dj(c,d);a = 1;continue;;
case 14:b = _Dj(b,c);c = _Mp;a = 1;continue;;
case 15:c = b;d = _iU(e);b = f;a = 0;;}}}
function _jI(a,b){return function (c,d){return _ne(7,a,b,c,d);};}
function _jR(a,b,c,d,e,f){return function (){return _ne(8,a,b,c,d,e,f);};}
function _jL(a){return function (b){return _ne(9,a,b);};}
function _jH(a,b){return function (c){return _ne(10,a,b,c);};}
function _jN(a){return function (b,c){return _ne(11,a,b,c);};}
function _jQ(a,b,c){return function (d){return _ne(12,a,b,c,d);};}
function _jW(a,b){return function (c){return _ne(13,a,b,c);};}
function _jX(a){return function (b){return _ne(14,a,b);};}
function _jc(a,b,c,d){return function (e){return _ne(15,a,b,c,d,e);};}
function _nh(a,b,c,d,e,f,g,h){while (true) {switch (a) {case 0:return _jb(b,c)(g,h,{some:_jd(e,f)},{some:d});;
case 1:a = g;g = f;h = _JW(h);f = a;a = 0;;}}}
function _jZ(a,b,c,d,e,f){return function (g){return _nh(1,a,b,c,d,e,f,g);};}
function _jl(a){return function (b){return _jm(a,b);};}
function _nf(a,b,c,d,e){var j,g,f,h,i;while (true) {switch (a) {case 0:if (a = _Zp(b).some) {b = a;} else {_nM.error("OpaSerialize.unserialize","Failed to unserialize from a string");return {none:_C};};
case 1:a = c;d = c;c = b;b = a;a = 7;continue;;
case 2:a = _jf(c,e);if (a.none) {if (f = _jD(b)(c,_kY).some,f == null) {return {none:_C};} else {a = _iU(f);g = _GA(0,d);return _GM((a = _JX(_jZ(_RG,_RG,e,d,f,a),g,"UnserializedClosure"),_JZ(a,{cell:f,arity:g}),a));}} else {return a;};
case 3:if ((a = d.hd) && d.tl.nil) {if (_JS(a.ty)) {return (a = _y(a.label).some,a == null)?{none:_C}:{some:_BG(a)};}} else {};
case 4:a = _iv(c,{f1:_BB(),f2:d,f3:false})(_jo(b));g = a.f2;if (g.hd) {return _ig(_LW)(_Fk({hd:"Missing fields in json : ",tl:{hd:_Fs(g),tl:{nil:_C}}}),_Of);} else {if (a.f3) {_nM.error(_Fk({hd:"Failed to deserialize with fields ",tl:{hd:_Fs(d),tl:{nil:_C}}}),_HQ(_kk)(c));return _Of;} else {return _GM(_BD(a.f1));}};
case 5:return (a = _jD(b)(c,_kY).some)?d?{some:_jj(_RG,_RG)(a,_OZ)}:{some:a}:{none:_C};;
case 6:return (a = d.some)?_KO(_jk(b,a),c,_GM({nil:_C})):_ig(_LW)("Empty list with a record wihtout hd field",_Of);;
case 7:h = {f1:c,f2:d};if ((i = h.f1,g = i.Int,g != null) && h.f2.TyConst && h.f2.TyConst.TyInt) {return _GM(g);} else {if ((a = i.Float,a != null) && h.f2.TyConst && h.f2.TyConst.TyFloat) {return _GM(a);} else {if ((j = i.String,j != null) && h.f2.TyConst && h.f2.TyConst.TyString) {return _GM(j);} else {if (j != null && h.f2.TyConst && h.f2.TyConst.TyFloat) {return j == "Infinity"?_GM(Infinity):j == "-Infinity"?_GM(-1. / 0.):j == "NaN"?_GM(NaN):_ig(_LW)(_Fk({hd:"Try to unserialize a float with the json string ",tl:{hd:j,tl:{nil:_C}}}),_Of);} else {if (g != null && h.f2.TyConst && h.f2.TyConst.TyFloat) {return _GM(g);} else {if ((f = i.Record) && h.f2.TyRecord_row && _BE(h.f2) === 1) {c = f;d = h.f2.TyRecord_row;a = 3;
continue;} else {if (f && h.f2.TyRecord_rowvar != null) {c = f;d = h.f2.TyRecord_row;a = 3;
continue;} else {if (f && h.f2.TySum_col && _BE(h.f2) === 1) {j = h.f2.TySum_col;a = _Fh(_iw,f,{nil:_C});if (g = _iY(a,j).some) {c = f;d = g;a = 3;
continue;} else {return _ig(_LW)(_Fk({hd:"Fields (",tl:{hd:_Od(0,j),tl:{hd:") are not found in type sum (",tl:{hd:_Fp(a),tl:{hd:")",tl:{nil:_C}}}}}}),{none:_C});}} else {if (f && h.f2.TySum_colvar != null) {j = h.f2.TySum_col;a = _Fh(_iw,f,{nil:_C});if (g = _iY(a,j).some) {c = f;d = g;a = 3;
continue;} else {return _ig(_LW)(_Fk({hd:"Fields (",tl:{hd:_Od(0,j),tl:{hd:") are not found in type sum (",tl:{hd:_Fp(a),tl:{hd:")",tl:{nil:_C}}}}}}),{none:_C});}} else {if ((a = i.List) && a.nil) {return _GM({nil:_C});} else {if (a && h.f2.TyName_args && h.f2.TyName_args.tl && h.f2.TyName_args.tl.nil && h.f2.TyName_ident === "list") {c = a;d = _GM(h.f2.TyName_args.hd);a = 6;
continue;} else {if (a && h.f2.TyRecord_row) {c = a;d = _KB(h.f2.TyRecord_row,"hd");a = 6;
continue;} else {if (a && h.f2.TySum_col) {if (g = _iY({hd:"hd",tl:{hd:"tl",tl:{nil:_C}}},h.f2.TySum_col).some) {c = a;d = _KB(g,"hd");a = 6;
continue;} else {return _ig(_LW)("Fields hd and tl are not found in type sum for a json list",{none:_C});}} else {if (f && h.f2.TyName_args && h.f2.TyName_args.tl && h.f2.TyName_args.tl.nil && h.f2.TyName_ident === "list") {d = c;e = {nil:_C};c = h.f2.TyName_args.hd;} else {if ((f = h.f2,h = f.TyName_args) && (g = f.TyName_ident,g === "Session.private.native")) {return _ie(c);} else {if (h && g === "channel") {return _ie(c);} else {if (h && g === "Cell.cell") {return _ie(c);} else {if (h && g === "OpaSerialize.unser") {return _GM(c);} else {if (h && g === "RPC.Json.json") {return _GM(c);} else {if (h && (a = h.tl) && a.nil && g === "continuation") {return _jE(b)(c,h.hd);} else {if (h && g === "dom_element") {d = true;a = 5;
continue;} else {if (h && g === "style_constructor") {d = true;a = 5;
continue;} else {if (h) {return _GF(_iy,g,h,_jl(b),_jn(b,_HA(g,h)),c,{nil:_C});} else {if (a = f.TyForall_body) {d = a;a = 7;
continue;} else {if (a = f.TyArrow_params) {d = a;e = f.TyArrow_res;a = 2;
continue;} else {if (j != null && f.TyVar != null) {_nM.warning("UNSERIALIZE",_Fk({hd:"unknown type TyVar in ",tl:{hd:_Ju(b),tl:{nil:_C}}}) + " - Suspicious but legal, TODO eliminate legal case - replaced by a dummy value");return _GM("I was unserialized from a TyVar");} else {_nM.error("OpaSerialize.finish_unserialize",_Fk({hd:"Type doesn't match value :\nvalue : ",tl:{hd:_HO(_kn)(i),tl:{hd:"\n on type : ",tl:{hd:_HO(_kr)(f),tl:{hd:"\n inside the main type ",tl:{hd:_Od(1,b),tl:{nil:_C}}}}}}}));return {none:_C};}}}}}}}}}}}}}}}}}}}}}}}}}};
case 8:if (j = d.Record) {a = _Km(_LW)("hd",j);if ((g = a.some,g != null) && _BE(a) === 1) {if (f = _jD(b)(g,c).some,f != null) {g = _Km(_LW)("tl",j);if ((a = g.some,a != null) && _BE(g) === 1) {d = a;e = {hd:f,tl:e};a = 8;
continue;} else {if ((a = g.none,a != null) && _BE(g) === 1 && _BE(a) === 0) {return _ig(_LW)("missing tl field",_Of);} else {_X("File \"lib/stdlib/core/rpc/core/opaserialize.opa\", line 713, characters 19-202, (713:19-716:21 | 27524-27707): Match failure 6215657");}}} else {return _ig(_LW)("TODO",_Of);}} else {if ((g = a.none,g != null) && _BE(a) === 1 && _BE(g) === 0) {return _GM(_Gf(e));} else {_X("File \"lib/stdlib/core/rpc/core/opaserialize.opa\", line 709, characters 15-494, (709:15-720:17 | 27369-27848): Match failure 5853243");}}} else {return _ig(_LW)("mixed record/list case",_Of);};
case 9:a = 1;continue;;
case 10:a = d;d = c;c = a;a = 7;continue;;
case 11:a = d;d = c;c = a;a = 7;continue;;
case 12:c = _Mp;a = 9;continue;;
case 13:if (a = c.some) {c = a;a = 9;continue;} else {return _Of;};
case 14:a = c;c = b;b = a;a = 1;continue;;
case 15:a = c;c = b;b = a;a = 1;;}}}
function _jD(a){return function (b,c){return _nf(7,a,b,c);};}
function _jm(a,b){return function (c){return _nf(10,a,b,c);};}
function _jn(a,b){return function (c){return _nf(11,a,b,c);};}
function _jh(a){return _nf(12,a);}
function _ji(a,b){return _nf(13,a,b);}
function _jO(a){return function (b){return _nf(14,a,b);};}
function _jK(a){return function (b){return _nf(15,a,b);};}
function _jp(a){return function (b,c){return _Gd(_ne(1,b,a),c);};}
function _jq(a){return function (b){return _Fh(_jp(a),b,{nil:_C});};}
function _jr(a){return _hU({List:{hd:{List:_jq(_Mp)(a.types)},tl:{hd:{List:_jq(_Nv)(a.rows)},tl:{hd:{List:_jq(_Nw)(a.cols)},tl:{hd:{List:_Gf(a.values)},tl:{nil:_C}}}}}});}
function _js(a,b,c){var d;return d = "/rpc_call/" + a,a = {TySum_col:{hd:{hd:{label:"failure",ty:{TyRecord_row:{nil:_C}}},tl:{nil:_C}},tl:{hd:{hd:{label:"success",ty:c},tl:{nil:_C}},tl:{nil:_C}}}},(a = _nf(0,_hX(d,_jr(b)),a).some) && (c = a.success,c != null)?c:a?_Bd(_Fk({hd:"OPARPC : Request on ",tl:{hd:d,tl:{hd:" has failed",tl:{nil:_C}}}}),"File \"lib/stdlib/core/rpc/core/oparpc.opa\", line 232, characters 29-73, (232:29-232:73 | 7708-7752)"):_Bd(_Fk({hd:"OPARPC : Request on ",tl:{hd:d,tl:{hd:" has failed",tl:{nil:_C}}}}),"File \"lib/stdlib/core/rpc/core/oparpc.opa\", line 235, characters 9-53, (235:9-235:53 | 7840-7884)");}
function _jt(a){return function (b,c){var d,e;return e = _Cm(a),(d = _RM.get(b,e).some,d == null)?(c = c(),_FH(a,_RM.add(b,c,e)),c):d;};}
var _ni = _jt([_RM.empty]);
function _nj(){return _js("__default_opa_event_stdlib.core.rpc.core",_nJ,_Jn({types:{nil:_C},rows:{nil:_C},cols:{nil:_C}},_Mh));}
function _nk(){return _ni("__default_opa_event_stdlib.core.rpc.core",_nj);}
function _ju(a,b,c){return {cols:c.cols,rows:c.rows,types:c.types,values:{hd:_ne(1,b,a),tl:c.values}};}
function _nl(a){var d,c,b;return b = _Jn({types:{nil:_C},rows:{nil:_C},cols:{nil:_C}},_lT),(c = b.TyArrow_params) && (d = c.tl) && d.nil?_js("__OpaTsc_server_get_stdlib.core.rpc.core",_ju(c.hd,a,_nJ),b.TyArrow_res):_hL("__OpaTsc_server_get_stdlib.core.rpc.core");}
function _jv(a){var b;return (b = a.Int,b != null)?_Zv(b):(b = a.Float,b != null)?_Zw(b):(b = a.String,b != null)?_Zx(b):(b = a.Bool,b != null)?_Zy(b):(b = a.List)?_bA(_KO(_jx,b,_Zr())):_bB(_Fh(_jw,a.Record,_Zt()));}
function _jw(a,b){return _Zu(a.f1,_jv(a.f2),b);}
function _jx(a,b){return _Zs(_jv(a),b);}
function _jy(a){return _nM.error("PingClient",a);}
function _kA(a){return _nM.error("OpaRPC",a);}
var _nm = _Es(1024);
function _kB(a,b,c){var d;return (d = _Ev(_nm,b).some)?(d = d(c).some,d == null)?_kA(_Fk({hd:"An error occurs when call client rpc(",tl:{hd:b,tl:{hd:") with \"",tl:{hd:c,tl:{hd:"\"",tl:{nil:_C}}}}}})):(a = a.some,a == null)?_OZ:_iP(_Fk({hd:"/rpc_return/",tl:{hd:a,tl:{nil:_C}}}),d):_kA(_Fk({hd:"Client rpc(",tl:{hd:b,tl:{hd:") was not found",tl:{nil:_C}}}}));}
var _nn = _nX.forward;
function _no(a){return _Bd("Should not happen","File \"lib/stdlib/core/rpc/core/ping_client.opa\", line 57, characters 24-59, (57:24-57:59 | 2336-2371)");}
function _np(a){return _jy(a),false;}
function _kC(a){var e,d,c,b;return (b = a.Record) && (c = b.hd) && (d = c.f1,d === "type") && (e = c.f2.String,e != null) && e === "chan" && b.tl.hd && b.tl.hd.f1 === "id" && b.tl.tl.hd && b.tl.tl.hd.f1 === "msg" && !b.tl.tl.tl.tl?(d = b.tl.hd.f2,e = b.tl.tl.hd.f2,(a = _ie(d).some)?(_nn(_Of,a,e,{serialize:_no,message:e}),true):_np(_Fk({hd:"Can't unserialize ",tl:{hd:_HQ(_lC)(d),tl:{nil:_C}}}))):b && c && d === "type" && e != null && e === "rpc" && b.tl.hd && b.tl.hd.f1 === "name" && b.tl.hd.f2.String != null && b.tl.tl.hd && b.tl.tl.hd.f1 === "id" && b.tl.tl.hd.f2.String != null && b.tl.tl.tl.hd && b.tl.tl.tl.hd.f1 === "args" && b.tl.tl.tl.hd.f2.String != null && b.tl.tl.tl.tl.nil?(_kB(_GM(b.tl.tl.hd.f2.String),b.tl.hd.f2.String,b.tl.tl.tl.hd.f2.String),true):b && c && d === "type" && e != null && e === "asyncrpc" && b.tl.hd && b.tl.hd.f1 === "name" && b.tl.hd.f2.String != null && b.tl.tl.hd && b.tl.tl.hd.f1 === "args" && b.tl.tl.hd.f2.String != null && !b.tl.tl.tl.tl?(_kB(_Of,b.tl.hd.f2.String,b.tl.tl.hd.f2.String),true):_np(_Fk({hd:"I don't understand message : ",tl:{hd:_HQ(_kV)(a),tl:{nil:_C}}}));}
function _kD(a,b){var c;return (c = _nf(0,a,b).some,c == null)?_Bd(_Fk({hd:"[OpaSerialize.unserialize_unsafe] error when unserializing ",tl:{hd:a,tl:{hd:", with type ",tl:{hd:_Od(1,b),tl:{nil:_C}}}}}),"File \"lib/stdlib/core/rpc/core/opaserialize.opa\", line 489, characters 18-132, (489:18-489:132 | 17725-17839)"):c;}
function _kE(a,b){return function (c,d){return _Gd(b(c,a),d);};}
function _kF(a,b,c){return {List:_Kx(_kE(c,a),b,{nil:_C})};}
function _kG(a,b,c){return function (d,e,f){return f.none?_Of:(e = a(e).some,e == null)?{none:_C}:(_FM(c,b - 1 - d,e),f);};}
function _kH(a,b){var c,d;return (c = b.List)?(b = _GA(0,c),d = _Kt(b,1),_KM(_kG(a,b,d),c,_GM(d))):_Of;}
var _nq = {f1:_kF,f2:_kH};
var _nr = _FJ("llarray",_nq);
function _kI(a,b){return b = a.txt,{Record:{hd:{f1:"unicode_index",f2:{Int:_CA(b,a.pos)}},tl:{hd:{f1:"txt",f2:{String:b}},tl:{nil:_C}}}};}
function _kJ(a){var b;return (a = a.Record) && (b = a.hd) && b.f1 === "unicode_index" && (b = b.f2.Int,b != null) && a.tl.hd && a.tl.hd.f1 === "txt" && a.tl.hd.f2.String != null && a.tl.tl.nil?(a = a.tl.hd.f2.String,_GM(_IY(_IX(a),_By(a,b)))):_Of;}
var _ns = {f1:_kI,f2:_kJ};
var _nt = _FJ("itextrator",_ns);
function _kK(a,b){var d,c;return c = {f1:a,f2:b},(d = c.f1,a = d.entity) && (b = a.other,b != null) && c.f2.entity && c.f2.entity.other != null?_Bw(b,c.f2.entity.other):!a && !c.f2.entity?_Bw(d.id,c.f2.id):a && a.remote && c.f2.entity && c.f2.entity.remote?{eq:_C}:!a && c.f2.entity?{gt:_C}:a && !c.f2.entity?{lt:_C}:a && c.f2.entity?_JI(_lH)(a,c.f2.entity):_X("File \"lib/stdlib/core/rpc/core/channel.opa\", line 460, characters 12-17, (460:12-460:17 | 14467-14472): Match failure 9340425");}
function _kL(a){return _jv(_ne(1,a,_lI));}
function _kM(){return _Bd("Unserialize of herror failed","File \"lib/stdlib/core/rpc/core/session_private.opa\", line 47, characters 14-50, (47:14-47:50 | 1938-1974)");}
function _kN(a){return _GI(_kM,_nf(1,_GI(_kM,_Zq(a)),_lI));}
var _nu = _hK(_kL,_kN);
var _nv = _UN(_kK);
var _nw = _hJ(_kC);
function _nx(a){return function (b){return _EC(a,b);};}
function _kO(a){var b;return b = _nl(a),_JN(_nx(a),b),b;}
var _ny = (_Jf(_kO),_OZ);
function _kP(a,b){return {Bool:a};}
function _kQ(a){var b,c;return (b = a.Bool,b != null)?_GM(b):(c = a.Record) && (b = c.hd) && (a = b.f1,a === "false") && c.tl.nil?_GM(false):c && b && a === "true" && c.tl.nil?_GM(true):_Of;}
var _oA = {f1:_kP,f2:_kQ};
var _oB = _FJ("bool",_oA);
var _A = _kD;
function _kR(a,b,c){return _kK(b,c);}
var _oC = _FI("channel",_kR);
;
;
;
_Dm("___equal_ty_e3ca26a0,_pC,_pB,_pA,_oy,_ox,_ow,_ov,_ou,_ot,_os,_or,_oq,_op,_oo,_on,__v13_an_e3ca26a0,_om,_ol,_ok,_oj,_oi,_oh,_og,_of,_oe,_od,_oc,_ob,_oZ,___2edf2958_e3ca26a0,_oY,_oX,_oW,__v1_patterns_indexes_e3ca26a0,__v3_fields_indexes_e3ca26a0,_oV,_oU,_oT,_oS,_oR,_oQ,_oP,_oO,_oN,_oM,_oL,_oK,_oJ,_oI,_oH,_oG,_oF,_oE,_oD");
function _pD(a,b,c){var e,d;while (true) {switch (a) {case 0:if (b == c) {return true;} else {d = _KX(_oF,b,c);return (e = d.result,e != null) && _BE(d) === 1?e:false;};
case 1:if (b.label == c.label) {b = b.ty;c = c.ty;a = 4;continue;} else {return false;};
case 2:if (b == c) {return true;} else {e = _KX(_oE,b,c);return (d = e.result,d != null) && _BE(e) === 1?d:false;};
case 3:d = _Hi(_NJ)(b,c);if (d === true) {return true;} else {if (d === false) {e = _KX(_oD,b,c);return (d = e.result,d != null) && _BE(e) === 1?d:false;} else {_X("File \"lib/stdlib/core/compare/compare.opa\", line 364, characters 20-97, (364:20-364:97 | 12940-13017): Match failure 2839827");}};
case 4:if (b == c) {return true;} else {if (e = b.TyConst) {return (d = c.TyConst)?e == d || (e.TyInt?d.TyInt?true:false:e.TyString?d.TyString?true:false:d.TyFloat?true:false):false;} else {if (d = b.TyName_args) {if (e = c.TyName_args) {if (b.TyName_ident == c.TyName_ident) {b = d;c = e;a = 0;} else {return false;}} else {return false;}} else {if ((e = b.TyRecord_row) && _BE(b) === 1) {if ((d = c.TyRecord_row) && _BE(c) === 1) {b = e;c = d;a = 2;} else {if (d) {b = e;c = d;a = 2;} else {return false;}}} else {if (e) {if ((d = c.TyRecord_row) && _BE(c) === 1) {b = e;c = d;a = 2;} else {if (d) {b = e;c = d;a = 2;} else {return false;}}} else {if ((e = b.TySum_col) && _BE(b) === 1) {if ((d = c.TySum_col) && _BE(c) === 1) {b = e;c = d;a = 3;} else {if (d) {b = e;c = d;a = 3;} else {return false;}}} else {if (e) {if ((d = c.TySum_col) && _BE(c) === 1) {b = e;c = d;a = 3;} else {if (d) {b = e;c = d;a = 3;} else {return false;}}} else {if (d = b.TyForall_body) {if (e = c.TyForall_body) {b = d;c = e;a = 4;} else {return false;}} else {if (b.TyVar != null) {return c.TyVar != null?true:false;} else {if (e = b.TyArrow_params) {if (d = c.TyArrow_params) {if (_pD(4,b.TyArrow_res,c.TyArrow_res)) {b = e;c = d;a = 0;} else {return false;}} else {return false;}} else {return false;}}}}}}}}}};}}}
function _oE(a,b){return _pD(1,a,b);}
function _oD(a,b){return _pD(2,a,b);}
function _oF(a,b){return _pD(4,a,b);}
var _pE = {next_index:0,entries:{nil:_C}};
function _oG(a,b){return {name:a,args:b};}
function _oH(a){return {ty:a,implementation:_Of,postenv_i:_Of};}
function _oI(a,b){return a.name == b.name && _pD(0,a.args,b.args);}
function _oJ(a,b){return _oI(a,b.ty);}
function _oK(a,b){return function (c){return _oI(c.ty,b)?c.implementation.none?{implementation:_GM(a),postenv_i:c.postenv_i,ty:c.ty}:c:c;};}
function _oL(a,b,c){return {entries:_Gi(_oK(b,a),c.entries,0),next_index:c.next_index};}
function _oM(a,b){var c;while (c = b.hd) {if (_oJ(a,c)) {return _GM(c);} else {b = b.tl;}}return _Of;}
function _oN(a,b){return _oM(a,b.entries);}
function _oO(a,b){return function (c){return _oJ(a,c)?{implementation:c.implementation,postenv_i:_GM(b),ty:c.ty}:c;};}
function _oP(a){return function (b){return _oJ(a,b) && !b.postenv_i.none;};}
function _oQ(a,b){var c;return (c = _KT(_oP(a),b.entries).some,c != null)?{f1:b,f2:c}:(c = b.next_index,{f1:{entries:_Gi(_oO(a,c),b.entries,0),next_index:c + 1},f2:c});}
function _oR(a,b){return a.postenv_i.none?b:b + 1;}
function _oS(a){return function (b){var c;return (c = b.postenv_i.some,c == null)?_OZ:_FM(a,c,(b = b.implementation.some)?b:_Bd("[compare.P.postenv_i] no implementation","File \"lib/stdlib/core/compare/compare.opa\", line 468, characters 33-80, (468:33-468:80 | 16812-16859)"));};}
function _oT(a){var b;return b = _Kt(_Fh(_oR,a.entries,0),0),_Fg(_oS(b),a.entries),b;}
function _oU(a,b){return {entries:{hd:_oH(a),tl:b.entries},next_index:b.next_index};}
function _oV(a,b){return b;}
function _oW(a,b,c,d,e){return b(c,_q(d,a),_q(e,a));}
function _oX(a,b,c,d,e){return function (f,g){var h,i;while (true) {i = (_Dd(b,g),_Dd(a,g),h = _Dd(b,g),i = _q(d,h),h = _q(c,h),_Dd(a,g)(e,i,h));if (i.eq?g == f:true) {return i;} else {g++;}}};}
function _oY(a,b,c){return function (d,e,f){return e == f?{eq:_C}:_oX(a,b,f,e,d)(c - 1,0);};}
function _oZ(a,b,c){return _CT(b,c);}
function _ob(a,b,c){return _CX(b,c);}
function _oc(a,b,c){return _Bw(b,c);}
function _od(a,b,c){return {eq:_C};}
function _oe(a,b,c){return {neq:_C};}
function _of(a,b){return (a = _y(b.label).some,a != null)?a:_Bd("","File \"lib/stdlib/core/compare/compare.opa\", line 187, characters 62-70, (187:62-187:70 | 5670-5678)");}
function _og(a){return _LA(a)(_of);}
function _oh(a,b){return function (c,d,e){return _oW(b,a,c,d,e);};}
function _oi(a,b,c,d){return function (e,f,g){var h;return h = _oW(c,a,e,f,g),h.eq?_oW(d,b,e,f,g):h;};}
function _oj(a){return function (b,c){return c;};}
function _ok(a,b){return function (c,d,e){var f;return d == e?{eq:_C}:(f = _BR(a,d,e),f == -2?{lt:_C}:f == -1?{gt:_C}:_Dd(b,f)(c,d,e));};}
function _ol(a,b){return _LE(b);}
function _om(a,b){return _og(b);}
function _on(a){return function (b,c,d){return _Dd(b,a)(b,c,d);};}
function _oo(a,b){return function (c,d){return b(a,c,d);};}
function _op(a,b){return function (c,d){return _FA(b,c,_oo(a,d));};}
function _oq(a,b,c){return function (d,e,f){var g;return g = _Dg(b + 2),_GC(_op(d,g),c),_Dt(a,g)(e,f);};}
function _or(a){return function (b,c,d){return a(c,d);};}
function _os(a){return function (b){return _Bd(_Fk({hd:"Comparing ",tl:{hd:_Od(1,a),tl:{hd:" is impossible.\n",tl:{nil:_C}}}}) + _Fk({hd:"Because contains a value of type ",tl:{hd:_Od(1,b),tl:{hd:".",tl:{nil:_C}}}}),"File \"lib/stdlib/core/compare/compare.opa\", line 194, characters 20-174, (194:20-195:85 | 5898-6052)");};}
function _ot(a,b){return function (c,d,e){return _os(a)(b);};}
function _ou(a){return function (b,c){return {f1:_ot(a,b),f2:c};};}
function _pF(a,b,c,d,e,f,g){var h,i;while (true) {switch (a) {case 0:h = _De(d);if (h == 0) {return {f1:_od,f2:f};} else {if (h == 1) {a = _ov(b)(_Dd(c,0).ty,f);return {f1:_oh(a.f1,_Dd(d,0)),f2:a.f2};} else {if (h == 2) {h = _ov(b)(_Dd(c,0).ty,f);a = _ov(b)(_Dd(c,1).ty,h.f2);return {f1:_oi(h.f1,a.f1,_Dd(d,0),_Dd(d,1)),f2:a.f2};} else {a = _LG(f,c)(_ox(b));return {f1:_oY(a.f1,_LA(d)(_oj(e)),h),f2:a.f2};}}};
case 1:a = _og(c);e = a;f = d;d = a;a = 0;continue;;
case 2:h = _LC(c)(_ol);if (_De(h) == 1) {c = _Dd(h,0);a = 1;continue;} else {i = _LA(h)(_om);a = _LA(i)(_oV);h = _LG(d,h)(_ow(b,i,a));return {f1:_ok(a,h.f1),f2:h.f2};};
case 3:i = _oG(c,d);if (a = _oN(i,e).some) {if (a = a.implementation.some) {return {f1:a,f2:e};} else {a = _oQ(i,e);return {f1:_on(a.f2),f2:a.f1};}} else {a = _oU(i,e);a = _ov(b)(_HA(c,d),a);h = a.f1;return {f1:h,f2:_oL(i,h,a.f2)};};
case 4:h = _GA(0,d);if (h == 0) {return {f1:_or(c),f2:e};} else {a = _Kr(_ov(b),d,e);return {f1:_oq(c,h,a.f1),f2:a.f2};};
case 5:if (a = c.TyConst) {return {f1:a.TyInt?_oZ:a.TyFloat?_ob:_oc,f2:d};} else {if ((h = c.TyRecord_row) && _BE(c) === 1) {c = _LE(h);a = 1;
continue;} else {if ((a = c.TySum_col) && _BE(c) === 1) {c = a;a = 2;continue;} else {if (a) {c = a;a = 2;
continue;} else {if (i = c.TyName_args) {a = c.TyName_ident;if (h = _EL(a).some) {c = h;e = d;d = i;a = 4;
continue;} else {c = a;e = d;d = i;a = 3;continue;}} else {if (a = c.TyForall_body) {c = a;a = 5;
continue;} else {return h?_ou(b)(c,d):c.TyVar != null?_ou(b)(c,d):c.TyArrow_params?{f1:_oe,f2:d}:_ou(b)(c,d);}}}}}};
case 6:c = d.ty;d = e;a = 5;continue;;
case 7:h = _Dd(c,e);a = f;e = _Dd(d,e);f = g;d = h;c = a;a = 0;;}}}
function _ov(a){return function (b,c){return _pF(5,a,b,c);};}
function _ox(a){return function (b,c,d){return _pF(6,a,b,c,d);};}
function _ow(a,b,c){return function (d,e,f){return _pF(7,a,b,c,d,e,f);};}
function _oy(a,b){return function (c,d){return a(b,c,d);};}
function _pA(a){return a = _ov(a)(a,_pE),_oy(a.f1,_oT(a.f2));}
var _pG = _pA(_Mp);
function _pB(a,b){var c,d;while (c = a.hd) {if (d = b.hd) {d = _pG(c,d);if (d.eq) {a = a.tl;b = b.tl;} else {return d;}} else {return {lt:_C};}}return b.nil?{eq:_C}:{gt:_C};}
function _pC(a,b){var c;return c = _Bw(a.name,b.name),c.eq?_pB(a.args,b.args):c;}
var _pH = _Qy(_pC);
var _pI = _LL(_pH.empty);
_Dm("_pw,_pv,_pu,_pt,_ps,_pr,_pq,_pp,_po,_pn,_pm,_pl,_pk,_pj,_pi,_ph,_pg,_pf,_pe,_pd,_pc,_pb,_pZ,_pY,_pX,_pW,_pV,_pU,_pT,_pS,_pR,_pQ,_pP,_pO,_pN,_pM,_pL,_pK,_pJ");
function _pJ(a){return a.detected;}
function _pK(a){return function (b,c){var d,e;while (true) {var f =c.hare,g ={hd:b,tl:f},h =c.tortoise_step + 1;if (_CR(h,1) == 0) {e = c.tortoise;if (d = e.tl) {h = {detected:c.detected,hare:g,tortoise:d,tortoise_step:h};return a(e.hd,b)?{detected:true,hare:h.hare,tortoise:h.tortoise,tortoise_step:h.tortoise_step}:h;} else {f.nil?_Bd("assert failure","File \"lib/stdlib/core/unification/cycle_detection.opa\", line 65, characters 11-33, (65:11-65:33 | 2275-2297)"):_C;c = {detected:c.detected,hare:{nil:_C},tortoise:_Gf(f),tortoise_step:c.tortoise_step};}} else {return {detected:c.detected,hare:g,tortoise:c.tortoise,tortoise_step:h};}}};}
function _pL(a){return {empty:{detected:false,tortoise_step:0,hare:{nil:_C},tortoise:{nil:_C}},push:_pK(a),detected:_pJ};}
function _pM(a,b){return _pD(4,a.f1,b.f1) && _pD(4,a.f2,b.f2);}
var _px = _pL(_pM);
var _py = {"var":_RM.empty,col:_RM.empty,row:_RM.empty,cycle_detector:_px.empty};
function _qA(a,b,c,d){var e;while (true) {switch (a) {case 0:if (e = _RM.get(b,d["var"]).some) {b = e;c = d;} else {return c;};
case 1:if (e = b.TyVar,e != null) {d = c;c = b;b = e;a = 0;} else {return b;};}}}
function _pN(a,b,c){return _BP(c,{"var":_RM.add(a,b,c["var"])});}
function _pO(a,b,c){var d,e;return (d = _RM.get(a,c["var"]).some)?(e = _qA(1,d,c),b = _Hi(_NQ)(e,d),b === true?{f1:d,f2:c}:b === false?{f1:e,f2:_pN(a,e,c)}:_X("<no position available (cons.typed)>: Match failure 2839827")):{f1:b,f2:_pN(a,b,c)};}
function _pP(a,b){var c;return (c = a.success)?b(c):a;}
function _pQ(a,b){return _Gx(_GR(b),_GQ(a));}
function _pR(a,b){var c;while (true) {var d ={hd:a,tl:b};if (c = a.TyName_args) {a = _pQ(a.TyName_ident,c);b = d;} else {return d;}}}
function _pS(a,b,c){return _pR(_pQ(b,c),{hd:a,tl:{nil:_C}});}
function _pT(a,b,c){return _HC(_pS(a,b,c));}
function _pU(a,b,c,d,e){return a == b?e:a < b?_pN(b,c,e):_pN(a,d,e);}
function _pV(a){return function (b,c,d){var e;return (e = d.success)?a(b,c,e):d;};}
function _pW(a,b,c,d){return function (e){return _GA(0,c) != _GA(0,b)?{failure:d}:_Gs(_pV(e),c,b,{success:a});};}
function _pX(a,b,c,d,e,f){return a = _pS(a,b,c),d = _pS(d,e,f),b = _GA(0,a),f = _GA(0,d),{f1:_KY(_Hp(0,b - f),_Gf(a)),f2:_KY(_Hp(0,f - b),_Gf(d))};}
function _pY(a,b){var c;while (c = b.tl) {a = _Gd(b.hd,a);b = c;}return a;}
function _qB(a,b,c,d,e,f,g,h,i,j,k){var l,n,m,o;while (true) {switch (a) {case 0:a = {f1:g,f2:h};if ((l = a.f1,m = l.tl) && a.f2.tl) {n = l.hd;l = a.f2.hd;a = a.f2.tl;o = f(n,l);if (o.eq) {return _pP(d(n,l,k),_pb(b,c,d,e,f,j,i,a,m));} else {if (o.lt) {g = m;i = _Gd(n,i);a = 0;
continue;} else {h = a;j = _Gd(l,j);a = 0;continue;}}} else {if (!m && !a.f2.tl) {a = {f1:i,f2:j};return a.f1.nil && a.f2.nil?{success:k}:e(c,b,_Gf(i),_Gf(j),k);} else {return e(c,b,_pY(g,i),_pY(h,j),k);}};
case 1:a = i;l = j;i = h;j = g;h = a;g = l;a = 0;;}}}
function _pZ(a,b,c,d,e){return function (f,g,h,i,j){return _qB(0,a,b,c,d,e,f,g,h,i,j);};}
function _pb(a,b,c,d,e,f,g,h,i){return function (j){return _qB(1,a,b,c,d,e,f,g,h,i,j);};}
function _pc(a,b,c,d,e,f,g,h){return _pZ(e,d,c,b,a)(f,g,{nil:_C},{nil:_C},h);}
function _pd(a,b){var d,c,f,e;while (c = a.tl) {d = a.hd;if (e = b.tl) {f = b.hd;if (d.label == f.label) {a = c;b = e;} else {e = _Hk(_NU)(d,f);if (e === true) {return {lt:_C};} else {if (e === false) {return {gt:_C};} else {_X("File \"lib/stdlib/core/unification/opatype_unification.opa\", line 229, characters 13-49, (229:13-230:16 | 10241-10277): Match failure 6215657");}}}} else {return {gt:_C};}}return b.nil?{eq:_C}:{lt:_C};}
function _pe(a,b){return _Bw(a.label,b.label);}
function _pf(a,b){return (b = _qA(0,a,{TyVar:a},b).TyVar,b != null)?a == b?_Of:_GM(b):_Of;}
function _pg(a){var b;return (b = a.TyVar,b != null) && _BE(a) === 1?b:_Bd("proj_var","File \"lib/stdlib/core/unification/opatype_unification.opa\", line 387, characters 10-26, (387:10-387:26 | 16842-16858)");}
function _ph(a){return function (b,c){var d,e;return e = c.f1,d = c.f2,(c = a(b).some,c != null)?_UQ.mem(b,e) || (_UQ.mem(b,d) && _UQ.mem(c,e) || _UQ.mem(c,d))?(e = _UQ.remove(b,e),b = _UQ.remove(b,d),{f1:_UQ.remove(c,e),f2:_UQ.remove(c,b)}):{f1:e,f2:d}:{f1:e,f2:d};};}
function _pi(a,b){return function (c){return _Fh(_ph(a),b,c);};}
function _pj(a){return function (b){return _pi(a,b);};}
function _pk(a,b,c,d){var e;return e = _Gi(c,a,0),a = _Gi(c,b,0),c = (c = (c = {f1:_UQ.From.list(e),f2:_UQ.From.list(a)},_pj(d)(e)(c)),_pj(d)(a)(c)),_UQ.is_empty(c.f1) && _UQ.is_empty(c.f2);}
function _pl(a){return function (b){return _pf(b,a);};}
function _qC(a,b,c,d){while (true) {switch (a) {case 0:return _pW(d,c,b,{hd:{incompatible_arity:_C},tl:{nil:_C}})(_po);;
case 1:a = c;c = b;b = a;a = 0;;}}}
function _pu(a,b){return function (c){return _qC(1,a,b,c);};}
function _pr(a,b,c,d,e){return _pc(_pe,_ps,_pn,c,d,a,b,e);}
function _qD(a,b,c,d){var e,g,k,j,i,h,f;while (true) {switch (a) {case 0:if (b.label != c.label) {return {failure:{nil:_C}};} else {b = b.ty;c = c.ty;};
case 1:g = (e = {f1:b,f2:c},(f = e.f1,g = f.TyName_args) && e.f2.TyName_args?_qE(2,b,f.TyName_ident,g,c,e.f2.TyName_ident,e.f2.TyName_args,d):g?_qE(3,_pT(b,f.TyName_ident,g),c,d):(h = e.f2,g = h.TyName_args)?_qE(3,b,_pT(c,h.TyName_ident,g),d):(i = f.TyConst) && h.TyConst?_LI(i,h.TyConst)?{success:d}:{failure:{nil:_C}}:(j = f.TyArrow_params) && h.TyArrow_params?_pP(_qD(1,f.TyArrow_res,h.TyArrow_res,d),_pu(h.TyArrow_params,j)):(k = f.TyVar,k != null) && h.TyVar != null?(g = h.TyVar,k == g?{success:d}:(i = _pO(k,c,d),e = i.f1,i = _pO(g,b,i.f2),f = i.f1,i = i.f2,e == b && f == c?{success:_pU(k,g,b,c,i)}:_qD(1,e,f,i))):k != null?(g = _pO(k,c,d),_qD(1,g.f1,c,g.f2)):(g = h.TyVar,g != null)?(g = _pO(g,b,d),_qD(1,b,g.f1,g.f2)):(e = f.TyRecord_row) && _BE(f) === 1 && h.TyRecord_row && _BE(h) === 1?_qF(3,e,h.TyRecord_row,d):(g = f.TyRecord_rowvar,g != null) && h.TyRecord_rowvar != null?_pr(e,h.TyRecord_row,_GM(g),_GM(h.TyRecord_rowvar),d):g != null && h.TyRecord_row && _BE(h) === 1?_pr(e,h.TyRecord_row,_GM(g),_Of,d):e && _BE(f) === 1 && h.TyRecord_rowvar != null?_pr(e,h.TyRecord_row,_Of,_GM(h.TyRecord_rowvar),d):(g = f.TySum_col) && _BE(f) === 1 && h.TySum_col && _BE(h) === 1?_qG(3,g,h.TySum_col,d):(k = f.TySum_colvar,k != null) && h.TySum_colvar != null?_qG(2,g,h.TySum_col,_GM(k),_GM(h.TySum_colvar),d):k != null && h.TySum_col && _BE(h) === 1?_qG(2,g,h.TySum_col,_GM(k),_Of,d):g && _BE(f) === 1 && h.TySum_colvar != null?_qG(2,g,h.TySum_col,_Of,_GM(h.TySum_colvar),d):e && _BE(f) === 1 && h.TySum_colvar != null?_qG(2,{hd:e,tl:{nil:_C}},h.TySum_col,_Of,_GM(h.TySum_colvar),d):k != null && h.TyRecord_row && _BE(h) === 1?_qG(2,{hd:h.TyRecord_row,tl:{nil:_C}},g,_Of,_GM(k),d):e && _BE(f) === 1 && h.TySum_col && _BE(h) === 1?_qG(3,{hd:e,tl:{nil:_C}},h.TySum_col,d):g && _BE(f) === 1 && h.TyRecord_row && _BE(h) === 1?_qG(3,{hd:h.TyRecord_row,tl:{nil:_C}},g,d):(g = f.TyForall_body) && h.TyForall_body?(i = _Jl(f.TyForall_quant,g),g = _Jl(h.TyForall_quant,h.TyForall_body),k = _qD(1,i.f2,g.f2,d),(e = k.success)?_pk(i.f1.types,g.f1.types,_pg,_pl(e))?{success:e}:{failure:{hd:{incompatible_quantification:_C},tl:{nil:_C}}}:k):g?_qD(1,_Jl(f.TyForall_quant,g).f2,c,d):(g = h.TyForall_body)?_qD(1,b,_Jl(h.TyForall_quant,g).f2,d):f.TyAbstract?{failure:{nil:_C}}:h.TyAbstract?{failure:{nil:_C}}:i?{failure:{nil:_C}}:j?{failure:{nil:_C}}:e && _BE(f) === 1?{failure:{nil:_C}}:e?{failure:{nil:_C}}:k == null?{failure:{nil:_C}}:{failure:{nil:_C}});return (e = g.failure)?{failure:{hd:{generic:{f1:b,f2:c}},tl:e}}:g;;}}}
function _pn(a,b,c){return _qD(0,a,b,c);}
function _po(a,b,c){return _qD(1,a,b,c);}
function _qE(a,b,c,d,e,f,g,h){var l,k,j,i,m;while (true) {switch (a) {case 0:return _pW(d,c,b,{hd:{incompatible_arity:_C},tl:{nil:_C}})(_po);;
case 1:if ((a = b.f1,i = a.hd) && b.f2.hd) {j = a.tl;a = b.f2.hd;k = b.f2.tl;l = {f1:i,f2:a};if ((b = l.f1,m = b.TyName_args) && l.f2.TyName_args) {if (b.TyName_ident == l.f2.TyName_ident) {b = m;d = c;c = l.f2.TyName_args;a = 0;
continue;} else {b = {f1:j,f2:k};a = 1;continue;}} else {(j.nil?true:false)?_C:_Bd("assert failure","File \"lib/stdlib/core/unification/opatype_unification.opa\", line 128, characters 12-28, (128:12-128:28 | 6140-6156)");(k.nil?true:false)?_C:_Bd("assert failure","File \"lib/stdlib/core/unification/opatype_unification.opa\", line 129, characters 12-28, (129:12-129:28 | 6169-6185)");b = i;d = c;c = a;a = 3;
continue;}} else {return {failure:{nil:_C}};};
case 2:if (c == f) {b = d;c = g;d = h;a = 0;continue;} else {b = _pX(b,c,d,e,f,g);c = h;a = 1;
continue;};
case 3:m = d.cycle_detector;k = _px.push({f1:b,f2:c},m);if (k.detected) {return {success:d};} else {k = _qD(1,b,c,{col:d.col,cycle_detector:k,row:d.row,"var":d["var"]});return (l = k.success)?{success:{col:l.col,cycle_detector:m,row:l.row,"var":l["var"]}}:k;};}}}
function _qF(a,b,c,d,e,f){var h,g;while (true) {switch (a) {case 0:return _pW(d,c,b,{hd:{incompatible_record:_C},tl:{nil:_C}})(_pn);;
case 1:if (a = _RM.get(b,d.row).some) {b = c;c = a;a = 3;continue;} else {return {success:{col:d.col,cycle_detector:d.cycle_detector,row:_RM.add(b,c,d.row),"var":d["var"]}};};
case 2:a = {f1:b,f2:c,f3:d,f4:e};if ((g = a.f1.some,g == null) && a.f2.some == null && a.f3.nil && a.f4.nil) {return {success:f};} else {if (g != null && a.f2.some != null && a.f3.nil && a.f4.nil) {a = a.f2.some;return g == a?{success:f}:_pP(_qF(1,g,{nil:_C},f),_pt(a,{nil:_C}));} else {if (g != null && a.f2.some != null) {return {failure:{hd:{incompatible_record:_C},tl:{nil:_C}}};} else {if (g == null && a.f3.hd) {return {failure:{hd:{incompatible_record:_C},tl:{nil:_C}}};} else {if ((h = a.f2.some,h == null) && a.f4.hd) {return {failure:{hd:{incompatible_record:_C},tl:{nil:_C}}};} else {if (g != null && h == null && a.f4.nil) {b = g;c = a.f3;d = f;a = 1;
continue;} else {if (g == null && h != null && a.f3.nil) {b = h;c = a.f4;d = f;a = 1;
continue;} else {_X("File \"lib/stdlib/core/unification/opatype_unification.opa\", line 249, characters 5-516, (249:5-261:65 | 11000-11511): Match failure 5853243");}}}}}}};
case 3:a = 0;continue;;
case 4:a = 1;;}}}
function _pm(a,b,c){return _qF(0,a,b,c);}
function _ps(a,b,c,d,e){return _qF(2,a,b,c,d,e);}
function _pt(a,b){return function (c){return _qF(4,a,b,c);};}
function _qG(a,b,c,d,e,f){var g;while (true) {switch (a) {case 0:if (a = _RM.get(b,d.col).some) {b = c;c = a;a = 3;
continue;} else {return {success:{col:_RM.add(b,c,d.col),cycle_detector:d.cycle_detector,row:d.row,"var":d["var"]}};};
case 1:a = {f1:b,f2:c,f3:d,f4:e};if ((g = a.f1.some,g == null) && a.f2.some == null && a.f3.nil && a.f4.nil) {return {success:f};} else {if (g != null && a.f2.some != null && a.f3.nil && a.f4.nil) {a = a.f2.some;return g == a?{success:f}:_pP(_qG(0,g,{nil:_C},f),_pq(a,{nil:_C}));} else {if (g != null && a.f2.some == null && a.f3.nil) {b = g;c = a.f4;d = f;a = 0;
continue;} else {if (g == null && a.f2.some != null && a.f4.nil) {b = a.f2.some;c = a.f3;d = f;a = 0;
continue;} else {if (g != null && a.f2.some != null) {return {failure:{hd:{incompatible_record:_C},tl:{nil:_C}}};} else {if (g == null && a.f4.hd) {return {failure:{hd:{incompatible_record:_C},tl:{nil:_C}}};} else {if (a.f2.some == null && a.f3.hd) {return {failure:{hd:{incompatible_record:_C},tl:{nil:_C}}};} else {_X("File \"lib/stdlib/core/unification/opatype_unification.opa\", line 205, characters 5-516, (205:5-217:44 | 9474-9985): Match failure 4018065");}}}}}}};
case 2:return _pc(_pd,_pp,_pm,d,e,b,c,f);;
case 3:e = _Of;f = d;d = _Of;a = 2;continue;;
case 4:a = 0;;}}}
function _pp(a,b,c,d,e){return _qG(1,a,b,c,d,e);}
function _pq(a,b){return function (c){return _qG(4,a,b,c);};}
function _pv(a,b){return _qD(1,a,b,_py);}
function _pw(a,b){return _LH(_pv(a,b));}
_Dm("_F,_E");
var _qH = {TyName_args:_LN,TyName_ident:"FunAction.t"};
var _qI = {TyArrow_params:_ex,TyArrow_res:_Me};
var _qJ = {quantifier:_LR,body:_qI};
var _qK = _EC("FunAction.t",_qJ);
function _E(a,b){return ((a = _nf(0,a,_qH).some)?a:_Bd("Error on unserialize a fun action","File \"lib/stdlib/core/funaction/funaction.opa\", line 45, characters 40-81, (45:40-45:81 | 1639-1680)"))(b);}
function _F(a){return _Ct(a);}
_Dm("__v152_an_f0fec9dc,__v151_an_f0fec9dc,__v8_an_f0fec9dc,__v6_an_f0fec9dc,__v5_an_f0fec9dc,_qN,_qM,_qL");
var _qO = {TyName_args:_LN,TyName_ident:"Color.color"};
var _qP = {quantifier:_LR,body:_qO};
var _qQ = {hd:{label:"r",ty:_Lr},tl:_LS};
var _qR = {hd:{label:"g",ty:_Lr},tl:_qQ};
var _qS = {hd:{label:"b",ty:_Lr},tl:_qR};
var _qT = {hd:{label:"a",ty:_Lr},tl:_qS};
var _qU = {TyRecord_row:_qT};
var _qV = {quantifier:_LR,body:_qU};
var _qW = _EC("color",_qP);
var _qX = _EC("Color.color",_qV);
function _qL(a){return a < 0?0:a > 255?255:a;}
function _qM(a){var b;return b = a.a,b == 0?"transparent":b == 255?_Fk({hd:"rgb(",tl:{hd:"" + _qL(a.r),tl:{hd:",",tl:{hd:"" + _qL(a.g),tl:{hd:",",tl:{hd:"" + _qL(a.b),tl:{hd:")",tl:{nil:_C}}}}}}}}):_Fk({hd:"rgba(",tl:{hd:"" + _qL(a.r),tl:{hd:",",tl:{hd:"" + _qL(a.g),tl:{hd:",",tl:{hd:"" + _qL(a.b),tl:{hd:",",tl:{hd:"" + _BZ(_qL(a.a),255),tl:{hd:")",tl:{nil:_C}}}}}}}}}});}
function _qN(a,b,c,d){return {r:_qL(a),g:_qL(b),b:_qL(c),a:_qL(d)};}
var _qY = _qN(0,0,0,255);
var _qZ = _qN(95,158,160,255);
function _qb(x0,x1){var by_ret;return by_ret = _DP(x0,x1),by_ret,_C;}
function _qc(x0,x1){var by_ret;return by_ret = _DV(x0,x1),by_ret,_C;}
function _qd(x0,x1){var by_ret;return by_ret = _DW(x0,x1),by_ret,_C;}
function _qe(x0,x1,x2,x3){var by_ret;return by_ret = _DR(x0,x1,x2,x3),by_ret,_C;}
function _qf(x0,x1){var by_ret;return by_ret = _DO(x0,x1),by_ret,_C;}
function _qg(x0,x1,x2){var by_ret;return by_ret = _DK(x0,x1,x2),by_ret,_C;}
function _qh(x0,x1){var by_ret;return by_ret = _DN(x0,x1),by_ret,_C;}
function _qi(x0,x1){var by_ret;return by_ret = _DM(x0,x1),by_ret,_C;}
function _qj(x0,x1,x2){var by_ret;return by_ret = _DL(x0,x1,x2),by_ret,_C;}
function _qk(x0,x1,x2){var by_ret;return by_ret = _DI(x0,x1,x2),by_ret,_C;}
function _ql(x0,x1,x2,x3){var by_ret;return by_ret = _DJ(x0,x1,x2,x3),by_ret,_C;}
function _qm(x0,x1){var by_ret;return by_ret = _DX(x0,x1),by_ret,_C;}
function _qn(x0,x1){var by_ret;return by_ret = _DS(x0,x1),by_ret,_C;}
function _qo(x0,x1){var by_ret;return by_ret = _En(x0,x1),by_ret,_C;}
function _qp(x0,x1){var by_ret;return by_ret = _Eo(x0,x1),by_ret,_C;}
function _qq(x0,x1,x2){var by_ret;return by_ret = _El(x0,x1,x2),by_ret,_C;}
function _qr(x0,x1,x2){var by_ret;return by_ret = _Em(x0,x1,x2),by_ret,_C;}
function _qs(x0,x1){var by_ret;return by_ret = _Ek(x0,x1),by_ret,_C;}
_Dm("___exec_2b6d75d2,___hassoc_2b6d75d2,_tN,___Xml_find_attr_2b6d75d2,__v226_an_2b6d75d2,__v224_an_2b6d75d2,__v221_an_2b6d75d2,__v222_an_2b6d75d2,__v219_an_2b6d75d2,__v216_an_2b6d75d2,__v217_an_2b6d75d2,__v218_an_2b6d75d2,__v214_an_2b6d75d2,__v213_an_2b6d75d2,__v212_an_2b6d75d2,__v209_an_2b6d75d2,__v208_an_2b6d75d2,__v206_an_2b6d75d2,__v203_an_2b6d75d2,__v202_an_2b6d75d2,__v201_an_2b6d75d2,__v199_an_2b6d75d2,__v197_an_2b6d75d2,__v195_an_2b6d75d2,__v190_an_2b6d75d2,__v193_an_2b6d75d2,__v184_an_2b6d75d2,__v185_an_2b6d75d2,__v182_an_2b6d75d2,__v180_an_2b6d75d2,__v174_an_2b6d75d2,__v173_an_2b6d75d2,__v172_an_2b6d75d2,__v169_an_2b6d75d2,__v168_an_2b6d75d2,__v166_an_2b6d75d2,__v165_an_2b6d75d2,__v164_an_2b6d75d2,__v162_an_2b6d75d2,__v161_an_2b6d75d2,__v159_an_2b6d75d2,__v158_an_2b6d75d2,__v156_an_2b6d75d2,__v155_an_2b6d75d2,__v154_an_2b6d75d2,__v152_an_2b6d75d2,__v148_an_2b6d75d2,__v147_an_2b6d75d2,__v145_an_2b6d75d2,__v144_an_2b6d75d2,__v143_an_2b6d75d2,__v142_an_2b6d75d2,__v134_an_2b6d75d2,__v133_an_2b6d75d2,__v132_an_2b6d75d2,__v131_an_2b6d75d2,__v129_an_2b6d75d2,__v127_an_2b6d75d2,___to_xhtml_2b6d75d2,__v125_an_2b6d75d2,__v116_an_2b6d75d2,_tM,_tL,_tK,_tJ,_tI,_tH,_tG,_tF,_tE,_tD,_tC,_tB,___to_selection_2b6d75d2,_tA,_sy,_sx,_sw,_sv,_su,_st,_ss,_sr,_sq,_sp,_so,_sn,___select_raw_unsafe_2b6d75d2,_sm,_sl,_sk,__v1_fa_2b6d75d2,___fa_2b6d75d2,__v2_fa_2b6d75d2,__v3_fa_2b6d75d2,__v2_oracle_2b6d75d2,___prepare_for_export_as_xml_blocks_non_utf8_2b6d75d2,__v54_an_2b6d75d2,__v49_an_2b6d75d2,__v46_an_2b6d75d2,__v53_an_2b6d75d2,_sj,_si,__v1_sassoc_full_2b6d75d2,_sh,_sg,__v22_an_2b6d75d2,_sf,_se,_sd,_sc,_sb,___bind_value_unsafe_2b6d75d2,_sZ,__v1_to_xhtml_2b6d75d2,_sY,_sX,_sW,_sV,_sU,_sT,_sS,_sR,_sQ,_sP,_sO,_sN,_sM,_sL,_sK,_sJ,_sI,_sH,_sG,_sF,_sE,_sD,_sC,_sB,_sA,_ry,_rx,_rw,_rv,_ru,_rt,_rs,_rr,_rq,_rp,_ro,_rn,_rm,_rl,_rk,_rj,_ri,_rh,_rg,_rf,_re,_rd,_rc,_rb,_rZ,_rY,_rX,_rW,_rV,_rU,_rT,_rS,_rR,_rQ,_rP,_rO,_rN,_rM,___coerce_default_cursor_2b6d75d2,_rL,_rK,_rJ,_rI,_rH,_rG,_rF,_rE,_rD,_rC,_rB,_rA,_qy,__v10_an_2b6d75d2,__v8_an_2b6d75d2,__v6_an_2b6d75d2,_qx,_qw,_qv,_qu,_qt");
var _tO = {TyName_args:_LN,TyName_ident:"xhtml"};
var _tP = {hd:_tO,tl:_LN};
var _tQ = {TyName_args:_tP,TyName_ident:"list"};
var _tR = {TyName_args:_LN,TyName_ident:"Css.decoration"};
var _tS = {TyName_args:_LN,TyName_ident:"Dom.event_option"};
var _tT = {hd:{label:"tag",ty:_LW},tl:_LS};
var _tU = {TyName_args:_LN,TyName_ident:"Css.entry"};
var _tV = {hd:_tS,tl:_LN};
var _tW = {TyName_args:_tV,TyName_ident:"list"};
var _tX = {hd:_tW,tl:_LN};
var _tY = {TyName_args:_LN,TyName_ident:"Css.properties"};
var _tZ = {TyName_args:_LN,TyName_ident:"Xml.binding"};
var _tb = {hd:_tZ,tl:_LN};
var _tc = {TyName_args:_tb,TyName_ident:"list"};
var _td = {hd:{label:"xmlns",ty:_tc},tl:_LS};
var _te = {hd:{label:"tag",ty:_LW},tl:_td};
var _tf = {hd:{label:"specific_attributes",ty:_UP},tl:_te};
var _tg = {hd:{label:"namespace",ty:_LW},tl:_tf};
var _th = {TyName_args:_RH,TyName_ident:"xml"};
var _ti = {hd:_th,tl:_LN};
var _tj = {TyName_args:_ti,TyName_ident:"list"};
var _tk = {hd:{label:"content",ty:_tj},tl:_tg};
var _tl = {TyName_args:_LN,TyName_ident:"Xml.attribute"};
var _tm = {hd:_tl,tl:_LN};
var _tn = {TyName_args:_tm,TyName_ident:"list"};
var _to = {hd:{label:"args",ty:_tn},tl:_tk};
var _tp = {hd:{label:"content_unsafe",ty:_LW},tl:_LS};
var _tq = {hd:{label:"fragment",ty:_tj},tl:_LS};
var _tr = {hd:{label:"text",ty:_LW},tl:_LS};
var _ts = {hd:{label:"xml_dialect",ty:_lN},tl:_LS};
var _tt = {TySum_col:{hd:_to,tl:{hd:_tp,tl:{hd:_tq,tl:{hd:_tr,tl:{hd:_ts,tl:{nil:_C}}}}}}};
var _tu = {quantifier:_Li,body:_tt};
var _tv = {hd:{label:"js_code_unsafe",ty:_LW},tl:_LS};
var _tw = {hd:{label:"html_code_unsafe",ty:_LW},tl:_tv};
var _tx = {TyRecord_row:_tw};
var _ty = {quantifier:_LR,body:_tx};
var _uA = {hd:{label:"style",ty:_tY},tl:_LS};
var _uB = {TyName_args:_LN,TyName_ident:"xhtml_href"};
var _uC = {hd:{label:"href",ty:_uB},tl:_uA};
var _uD = {TyName_args:_tX,TyName_ident:"handle_assoc"};
var _uE = {hd:_uD,tl:_LN};
var _uF = {TyName_args:_uE,TyName_ident:"list"};
var _uG = {hd:{label:"events_options",ty:_uF},tl:_uC};
var _uH = {TyName_args:_LN,TyName_ident:"xhtml_event"};
var _uI = {hd:_uH,tl:_LN};
var _uJ = {TyName_args:_uI,TyName_ident:"handle_assoc"};
var _uK = {hd:_uJ,tl:_LN};
var _uL = {TyName_args:_uK,TyName_ident:"list"};
var _uM = {hd:{label:"events",ty:_uL},tl:_uG};
var _uN = {hd:{label:"class",ty:_Ny},tl:_uM};
var _uO = {TyName_args:_LN,TyName_ident:"xhtml_bool_attribute"};
var _uP = {hd:_uO,tl:_LN};
var _uQ = {TyName_args:_uP,TyName_ident:"list"};
var _uR = {hd:{label:"bool_attributes",ty:_uQ},tl:_uN};
var _uS = {TyRecord_row:_uR};
var _uT = {quantifier:_LR,body:_uS};
var _uU = {hd:{label:"constant",ty:_LW},tl:_LS};
var _uV = {hd:{label:"typed",ty:_eI},tl:_LS};
var _uW = {hd:{label:"untyped",ty:_LW},tl:_LS};
var _uX = {TySum_col:{hd:_uU,tl:{hd:_MH,tl:{hd:_uV,tl:{hd:_uW,tl:{nil:_C}}}}}};
var _uY = {quantifier:_LR,body:_uX};
var _uZ = {hd:{label:"expr",ty:_qH},tl:_LS};
var _ub = {TySum_col:{hd:_uZ,tl:{hd:_Lq,tl:{nil:_C}}}};
var _uc = {quantifier:_LR,body:_ub};
var _ud = {hd:{label:"bool",ty:_Mi},tl:_LS};
var _ue = {TySum_col:{hd:_ud,tl:{hd:_MH,tl:{hd:_LX,tl:{nil:_C}}}}};
var _uf = {quantifier:_LR,body:_ue};
var _ug = {TyName_args:_LN,TyName_ident:"xhtml_bool_attribute_value"};
var _uh = {hd:{label:"value",ty:_ug},tl:_LS};
var _ui = {hd:{label:"name",ty:_LW},tl:_uh};
var _uj = {TyRecord_row:_ui};
var _uk = {quantifier:_LR,body:_uj};
var _ul = {TyName_args:_LN,TyName_ident:"xhtml_specific_extensions"};
var _um = {hd:_ul,tl:_LN};
var _un = {TyName_args:_LN,TyName_ident:"xhtml_specific_attributes"};
var _uo = {hd:_un,tl:_um};
var _up = {TyName_args:_uo,TyName_ident:"xml"};
var _uq = {quantifier:_LR,body:_up};
var _ur = {hd:{label:"leading",ty:_LT},tl:_LS};
var _us = {hd:{label:"not_leading",ty:_LT},tl:_LS};
var _ut = {TySum_col:{hd:_ur,tl:{hd:_us,tl:{nil:_C}}}};
var _uu = {quantifier:_LR,body:_ut};
var _uv = {hd:{label:"name",ty:_gE},tl:_MX};
var _uw = {TyRecord_row:_uv};
var _ux = {quantifier:_MD,body:_uw};
var _uy = {hd:{label:"lower_case",ty:_LT},tl:_LS};
var _vA = {hd:{label:"upper_case",ty:_LT},tl:_LS};
var _vB = {TySum_col:{hd:_uy,tl:{hd:_vA,tl:{nil:_C}}}};
var _vC = {quantifier:_LR,body:_vB};
var _vD = {hd:{label:"all",ty:_LT},tl:_LS};
var _vE = {hd:{label:"bottom",ty:_LT},tl:_LS};
var _vF = {hd:{label:"top",ty:_LT},tl:_LS};
var _vG = {TySum_col:{hd:_vD,tl:{hd:_vE,tl:{hd:_fv,tl:{hd:_fx,tl:{hd:_vF,tl:{nil:_C}}}}}}};
var _vH = {quantifier:_LR,body:_vG};
var _vI = {hd:{label:"default",ty:_LW},tl:_LS};
var _vJ = {hd:{label:"uri",ty:_LW},tl:_LS};
var _vK = {hd:{label:"name",ty:_LW},tl:_vJ};
var _vL = {TySum_col:{hd:_vI,tl:{hd:_vK,tl:{nil:_C}}}};
var _vM = {quantifier:_LR,body:_vL};
var _vN = {hd:{label:"namespace",ty:_LW},tl:_Lq};
var _vO = {hd:{label:"name",ty:_LW},tl:_vN};
var _vP = {TyRecord_row:_vO};
var _vQ = {quantifier:_LR,body:_vP};
var _vR = {hd:{label:"class",ty:_LW},tl:_LS};
var _vS = {hd:{label:"id",ty:_LW},tl:_LS};
var _vT = {hd:{label:"default",ty:_LT},tl:_LS};
var _vU = {hd:{label:"normal",ty:_LT},tl:_LS};
var _vV = {hd:{label:"nowrap",ty:_LT},tl:_LS};
var _vW = {hd:{label:"pre",ty:_LT},tl:_LS};
var _vX = {TySum_col:{hd:_vU,tl:{hd:_vV,tl:{hd:_vW,tl:{nil:_C}}}}};
var _vY = {quantifier:_LR,body:_vX};
var _vZ = {hd:{label:"hidden",ty:_LT},tl:_LS};
var _vb = {hd:{label:"visible",ty:_LT},tl:_LS};
var _vc = {TySum_col:{hd:_vZ,tl:{hd:_vb,tl:{nil:_C}}}};
var _vd = {quantifier:_LR,body:_vc};
var _ve = {hd:{label:"baseline",ty:_LT},tl:_LS};
var _vf = {TySum_col:{hd:_ve,tl:{hd:_fw,tl:{nil:_C}}}};
var _vg = {quantifier:_LR,body:_vf};
var _vh = {TyName_args:_LN,TyName_ident:"Css.background"};
var _vi = {hd:{label:"background",ty:_vh},tl:_LS};
var _vj = {TyName_args:_LN,TyName_ident:"Css.border"};
var _vk = {hd:{label:"border",ty:_vj},tl:_LS};
var _vl = {TyName_args:_LN,TyName_ident:"Css.border_collapse"};
var _vm = {hd:{label:"border_collapse",ty:_vl},tl:_LS};
var _vn = {TyName_args:_LN,TyName_ident:"Css.size"};
var _vo = {hd:{label:"border_radius",ty:_vn},tl:_LS};
var _vp = {hd:{label:"border_spacing",ty:_vn},tl:_LS};
var _vq = {hd:{label:"bottom",ty:_vn},tl:_LS};
var _vr = {TyName_args:_LN,TyName_ident:"color"};
var _vs = {hd:{label:"color",ty:_vr},tl:_LS};
var _vt = {TyName_args:_LN,TyName_ident:"Css.cursor"};
var _vu = {hd:{label:"cursor",ty:_vt},tl:_LS};
var _vv = {TyName_args:_LN,TyName_ident:"Css.direction"};
var _vw = {hd:{label:"direction",ty:_vv},tl:_LS};
var _vx = {TyName_args:_LN,TyName_ident:"Css.display"};
var _vy = {hd:{label:"display",ty:_vx},tl:_LS};
var _wA = {TyName_args:_LN,TyName_ident:"Css.float"};
var _wB = {hd:{label:"float",ty:_wA},tl:_LS};
var _wC = {TyName_args:_LN,TyName_ident:"Css.font"};
var _wD = {hd:{label:"font",ty:_wC},tl:_LS};
var _wE = {hd:_tR,tl:_LN};
var _wF = {TyName_args:_wE,TyName_ident:"list"};
var _wG = {hd:{label:"font_decoration",ty:_wF},tl:_LS};
var _wH = {TyName_args:_LN,TyName_ident:"Css.font_family"};
var _wI = {hd:{label:"font_family",ty:_wH},tl:_LS};
var _wJ = {hd:{label:"font_size",ty:_vn},tl:_LS};
var _wK = {TyName_args:_LN,TyName_ident:"Css.font_variant"};
var _wL = {hd:{label:"font_variant",ty:_wK},tl:_LS};
var _wM = {hd:{label:"height",ty:_vn},tl:_LS};
var _wN = {hd:{label:"left",ty:_vn},tl:_LS};
var _wO = {TyName_args:_LN,TyName_ident:"Css.size_or_normal"};
var _wP = {hd:{label:"letter_spacing",ty:_wO},tl:_LS};
var _wQ = {hd:{label:"line_height",ty:_vn},tl:_LS};
var _wR = {TyName_args:_LN,TyName_ident:"Css.list_style"};
var _wS = {hd:{label:"list_style",ty:_wR},tl:_LS};
var _wT = {TyName_args:_LN,TyName_ident:"Css.block_size"};
var _wU = {hd:{label:"margin",ty:_wT},tl:_LS};
var _wV = {TyName_args:_LN,TyName_ident:"Css.size_or_none"};
var _wW = {hd:{label:"max_height",ty:_wV},tl:_LS};
var _wX = {hd:{label:"max_width",ty:_wV},tl:_LS};
var _wY = {hd:{label:"min_height",ty:_wV},tl:_LS};
var _wZ = {hd:{label:"min_width",ty:_wV},tl:_LS};
var _wb = {hd:{label:"not_typed",ty:_eP},tl:_LS};
var _wc = {hd:{label:"opacity",ty:_kb},tl:_LS};
var _wd = {TyName_args:_LN,TyName_ident:"Css.overflow"};
var _we = {hd:{label:"overflow",ty:_wd},tl:_LS};
var _wf = {hd:{label:"padding",ty:_wT},tl:_LS};
var _wg = {TyName_args:_LN,TyName_ident:"Css.position"};
var _wh = {hd:{label:"position",ty:_wg},tl:_LS};
var _wi = {hd:{label:"right",ty:_vn},tl:_LS};
var _wj = {TyName_args:_LN,TyName_ident:"Css.table_layout"};
var _wk = {hd:{label:"table_layout",ty:_wj},tl:_LS};
var _wl = {TyName_args:_LN,TyName_ident:"Css.align"};
var _wm = {hd:{label:"text_align",ty:_wl},tl:_LS};
var _wn = {hd:{label:"top",ty:_vn},tl:_LS};
var _wo = {TyName_args:_LN,TyName_ident:"Css.vertical_align"};
var _wp = {hd:{label:"vertical_align",ty:_wo},tl:_LS};
var _wq = {TyName_args:_LN,TyName_ident:"Css.visibility"};
var _wr = {hd:{label:"visibility",ty:_wq},tl:_LS};
var _ws = {TyName_args:_LN,TyName_ident:"Css.white_space"};
var _wt = {hd:{label:"white_space",ty:_ws},tl:_LS};
var _wu = {hd:{label:"width",ty:_vn},tl:_LS};
var _wv = {hd:{label:"z_index",ty:_eW},tl:_LS};
var _ww = {TySum_col:{hd:_vi,tl:{hd:_vk,tl:{hd:_vm,tl:{hd:_vo,tl:{hd:_vp,tl:{hd:_vq,tl:{hd:_vs,tl:{hd:_vu,tl:{hd:_vw,tl:{hd:_vy,tl:{hd:_wB,tl:{hd:_wD,tl:{hd:_wG,tl:{hd:_wI,tl:{hd:_wJ,tl:{hd:_wL,tl:{hd:_wM,tl:{hd:_wN,tl:{hd:_wP,tl:{hd:_wQ,tl:{hd:_wS,tl:{hd:_wU,tl:{hd:_wW,tl:{hd:_wX,tl:{hd:_wY,tl:{hd:_wZ,tl:{hd:_wb,tl:{hd:_wc,tl:{hd:_we,tl:{hd:_wf,tl:{hd:_wh,tl:{hd:_wi,tl:{hd:_wk,tl:{hd:_wm,tl:{hd:_wn,tl:{hd:_wp,tl:{hd:_wr,tl:{hd:_wt,tl:{hd:_wu,tl:{hd:_wv,tl:{nil:_C}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}};
var _wx = {quantifier:_LR,body:_ww};
var _wy = {hd:{label:"auto",ty:_LT},tl:_LS};
var _xA = {hd:{label:"fixed",ty:_LT},tl:_LS};
var _xB = {hd:{label:"inherit",ty:_LT},tl:_LS};
var _xC = {TySum_col:{hd:_wy,tl:{hd:_xA,tl:{hd:_xB,tl:{nil:_C}}}}};
var _xD = {quantifier:_LR,body:_xC};
var _xE = {hd:{label:"inside",ty:_LT},tl:_LS};
var _xF = {hd:{label:"outside",ty:_LT},tl:_LS};
var _xG = {TySum_col:{hd:_xE,tl:{hd:_xF,tl:{nil:_C}}}};
var _xH = {quantifier:_LR,body:_xG};
var _xI = {hd:{label:"size",ty:_vn},tl:_LS};
var _xJ = {TySum_col:{hd:_vU,tl:{hd:_xI,tl:{nil:_C}}}};
var _xK = {quantifier:_LR,body:_xJ};
var _xL = {TySum_col:{hd:_MH,tl:{hd:_xI,tl:{nil:_C}}}};
var _xM = {quantifier:_LR,body:_xL};
var _xN = {hd:{label:"cm",ty:_kb},tl:_LS};
var _xO = {hd:{label:"em",ty:_kb},tl:_LS};
var _xP = {hd:{label:"ex",ty:_kb},tl:_LS};
var _xQ = {hd:{label:"inch",ty:_kb},tl:_LS};
var _xR = {hd:{label:"mm",ty:_kb},tl:_LS};
var _xS = {hd:{label:"pc",ty:_kb},tl:_LS};
var _xT = {hd:{label:"percent",ty:_kb},tl:_LS};
var _xU = {hd:{label:"pt",ty:_kb},tl:_LS};
var _xV = {hd:{label:"px",ty:_Lr},tl:_LS};
var _xW = {TySum_col:{hd:_xN,tl:{hd:_xO,tl:{hd:_xP,tl:{hd:_xQ,tl:{hd:_xR,tl:{hd:_xS,tl:{hd:_xT,tl:{hd:_xU,tl:{hd:_xV,tl:{nil:_C}}}}}}}}}}};
var _xX = {quantifier:_LR,body:_xW};
var _xY = {TyName_args:_LN,TyName_ident:"Css.event"};
var _xZ = {hd:{label:"event",ty:_xY},tl:_LS};
var _xb = {TySum_col:{hd:_vR,tl:{hd:_xZ,tl:{hd:_vS,tl:{hd:_tT,tl:{nil:_C}}}}}};
var _xc = {quantifier:_LR,body:_xb};
var _xd = {TyName_args:_LN,TyName_ident:"Css.selector_item"};
var _xe = {hd:_xd,tl:_LN};
var _xf = {TyName_args:_xe,TyName_ident:"list"};
var _xg = {TyName_args:_LN,TyName_ident:"Css.unary"};
var _xh = {hd:_xg,tl:_LN};
var _xi = {TyName_args:_xh,TyName_ident:"list"};
var _xj = {quantifier:_LR,body:_xi};
var _xk = {TyName_args:_LN,TyName_ident:"url"};
var _xl = {hd:{label:"absolute",ty:_LT},tl:_LS};
var _xm = {hd:{label:"relative",ty:_LT},tl:_LS};
var _xn = {hd:{label:"static",ty:_LT},tl:_LS};
var _xo = {TySum_col:{hd:_xl,tl:{hd:_xA,tl:{hd:_xm,tl:{hd:_xn,tl:{nil:_C}}}}}};
var _xp = {quantifier:_LR,body:_xo};
var _xq = {TySum_col:{hd:_wy,tl:{hd:_vZ,tl:{hd:_fh,tl:{hd:_vb,tl:{nil:_C}}}}}};
var _xr = {quantifier:_LR,body:_xq};
var _xs = {TyName_args:_LN,TyName_ident:"leading_zero"};
var _xt = {hd:{label:"decimal",ty:_xs},tl:_LS};
var _xu = {hd:{label:"disc",ty:_LT},tl:_LS};
var _xv = {hd:{label:"greek",ty:_LT},tl:_LS};
var _xw = {hd:{label:"image",ty:_xk},tl:_LS};
var _xx = {TyName_args:_LN,TyName_ident:"case"};
var _xy = {hd:{label:"latin",ty:_xx},tl:_LS};
var _yA = {hd:{label:"roman",ty:_xx},tl:_LS};
var _yB = {hd:{label:"square",ty:_LT},tl:_LS};
var _yC = {TySum_col:{hd:_xt,tl:{hd:_xu,tl:{hd:_xv,tl:{hd:_xw,tl:{hd:_xy,tl:{hd:_yA,tl:{hd:_yB,tl:{nil:_C}}}}}}}}};
var _yD = {quantifier:_LR,body:_yC};
var _yE = {TyName_args:_LN,TyName_ident:"Css.style_position"};
var _yF = {hd:_yE,tl:_LN};
var _yG = {TyName_args:_yF,TyName_ident:"option"};
var _yH = {hd:{label:"style_position",ty:_yG},tl:_LS};
var _yI = {TyName_args:_LN,TyName_ident:"Css.list_style_def"};
var _yJ = {hd:_yI,tl:_LN};
var _yK = {TyName_args:_yJ,TyName_ident:"option"};
var _yL = {hd:{label:"style",ty:_yK},tl:_yH};
var _yM = {TyRecord_row:_yL};
var _yN = {quantifier:_LR,body:_yM};
var _yO = {hd:{label:"small_caps",ty:_LT},tl:_LS};
var _yP = {TySum_col:{hd:_xB,tl:{hd:_vU,tl:{hd:_yO,tl:{nil:_C}}}}};
var _yQ = {quantifier:_LR,body:_yP};
var _yR = {hd:{label:"Garamond",ty:_LT},tl:_LS};
var _yS = {hd:{label:"Georgia",ty:_LT},tl:_LS};
var _yT = {hd:{label:"HeavyImpact",ty:_LT},tl:_LS};
var _yU = {hd:{label:"Helvetica",ty:_LT},tl:_LS};
var _yV = {hd:{label:"Monospace",ty:_LT},tl:_LS};
var _yW = {hd:{label:"TimesNewRoman",ty:_LT},tl:_LS};
var _yX = {hd:{label:"Trebuchet",ty:_LT},tl:_LS};
var _yY = {hd:{label:"Verdana",ty:_LT},tl:_LS};
var _yZ = {TySum_col:{hd:_yR,tl:{hd:_yS,tl:{hd:_yT,tl:{hd:_yU,tl:{hd:_yV,tl:{hd:_yW,tl:{hd:_yX,tl:{hd:_yY,tl:{nil:_C}}}}}}}}}};
var _yb = {quantifier:_LR,body:_yZ};
var _yc = {hd:{label:"line_height",ty:_wO},tl:_xI};
var _yd = {hd:{label:"family",ty:_wH},tl:_yc};
var _ye = {hd:{label:"decoration",ty:_wF},tl:_yd};
var _yf = {TyRecord_row:_ye};
var _yg = {quantifier:_LR,body:_yf};
var _yh = {hd:{label:"css_none",ty:_LT},tl:_LS};
var _yi = {TySum_col:{hd:_yh,tl:{hd:_fv,tl:{hd:_fx,tl:{nil:_C}}}}};
var _yj = {quantifier:_LR,body:_yi};
var _yk = {hd:{label:"active",ty:_LT},tl:_LS};
var _yl = {hd:{label:"first_child",ty:_LT},tl:_LS};
var _ym = {hd:{label:"hover",ty:_LT},tl:_LS};
var _yn = {hd:{label:"link",ty:_LT},tl:_LS};
var _yo = {hd:{label:"visited",ty:_LT},tl:_LS};
var _yp = {TySum_col:{hd:_yk,tl:{hd:_yl,tl:{hd:_fL,tl:{hd:_ym,tl:{hd:_yn,tl:{hd:_yo,tl:{nil:_C}}}}}}}};
var _yq = {quantifier:_LR,body:_yp};
var _yr = {hd:_xf,tl:_LN};
var _ys = {TyName_args:_yr,TyName_ident:"list"};
var _yt = {hd:_ys,tl:_LN};
var _yu = {TyName_args:_yt,TyName_ident:"list"};
var _yv = {quantifier:_LR,body:_yu};
var _yw = {hd:{label:"block",ty:_LT},tl:_LS};
var _yx = {hd:{label:"inline",ty:_LT},tl:_LS};
var _yy = {hd:{label:"inline_block",ty:_LT},tl:_LS};
var _zA = {TySum_col:{hd:_yw,tl:{hd:_yh,tl:{hd:_yx,tl:{hd:_yy,tl:{nil:_C}}}}}};
var _zB = {quantifier:_LR,body:_zA};
var _zC = {hd:{label:"left_to_right",ty:_LT},tl:_LS};
var _zD = {hd:{label:"right_to_left",ty:_LT},tl:_LS};
var _zE = {TySum_col:{hd:_zC,tl:{hd:_zD,tl:{nil:_C}}}};
var _zF = {quantifier:_LR,body:_zE};
var _zG = {hd:{label:"crosshair",ty:_LT},tl:_LS};
var _zH = {hd:{label:"help",ty:_LT},tl:_LS};
var _zI = {hd:{label:"move",ty:_LT},tl:_LS};
var _zJ = {hd:{label:"pointer",ty:_LT},tl:_LS};
var _zK = {hd:{label:"progress",ty:_LT},tl:_LS};
var _zL = {TyName_args:_LN,TyName_ident:"Css.cursor_resize"};
var _zM = {hd:{label:"resize",ty:_zL},tl:_LS};
var _zN = {hd:{label:"text",ty:_LT},tl:_LS};
var _zO = {hd:{label:"wait",ty:_LT},tl:_LS};
var _zP = {TySum_col:{hd:_wy,tl:{hd:_zG,tl:{hd:_vT,tl:{hd:_zH,tl:{hd:_zI,tl:{hd:_zJ,tl:{hd:_zK,tl:{hd:_zM,tl:{hd:_zN,tl:{hd:_zO,tl:{nil:_C}}}}}}}}}}}};
var _zQ = {quantifier:_LR,body:_zP};
var _zR = {hd:{label:"bold",ty:_LT},tl:_LS};
var _zS = {hd:{label:"italic",ty:_LT},tl:_LS};
var _zT = {hd:{label:"line_through",ty:_LT},tl:_LS};
var _zU = {hd:{label:"overline",ty:_LT},tl:_LS};
var _zV = {hd:{label:"underline",ty:_LT},tl:_LS};
var _zW = {TySum_col:{hd:_zR,tl:{hd:_zS,tl:{hd:_zT,tl:{hd:_vU,tl:{hd:_zU,tl:{hd:_yO,tl:{hd:_zV,tl:{nil:_C}}}}}}}}};
var _zX = {quantifier:_LR,body:_zW};
var _zY = {hd:{label:"e",ty:_LT},tl:_LS};
var _zZ = {hd:{label:"n",ty:_LT},tl:_LS};
var _zb = {hd:{label:"ne",ty:_LT},tl:_LS};
var _zc = {hd:{label:"nw",ty:_LT},tl:_LS};
var _zd = {hd:{label:"s",ty:_LT},tl:_LS};
var _ze = {hd:{label:"se",ty:_LT},tl:_LS};
var _zf = {hd:{label:"sw",ty:_LT},tl:_LS};
var _zg = {hd:{label:"w",ty:_LT},tl:_LS};
var _zh = {TySum_col:{hd:_zY,tl:{hd:_zZ,tl:{hd:_zb,tl:{hd:_zc,tl:{hd:_zd,tl:{hd:_ze,tl:{hd:_zf,tl:{hd:_zg,tl:{nil:_C}}}}}}}}}};
var _zi = {quantifier:_LR,body:_zh};
var _zj = {hd:_xk,tl:_LN};
var _zk = {TyName_args:_zj,TyName_ident:"list"};
var _zl = {hd:{label:"icons",ty:_zk},tl:_LS};
var _zm = {TyName_args:_LN,TyName_ident:"Css.default_cursor"};
var _zn = {hd:{label:"default",ty:_zm},tl:_zl};
var _zo = {TyRecord_row:_zn};
var _zp = {quantifier:_LR,body:_zo};
var _zq = {TyName_args:_LN,TyName_ident:"Css.border_thickness"};
var _zr = {hd:_zq,tl:_LN};
var _zs = {TyName_args:_zr,TyName_ident:"option"};
var _zt = {hd:{label:"width",ty:_zs},tl:_LS};
var _zu = {TyName_args:_LN,TyName_ident:"Css.border_style_elt"};
var _zv = {hd:_zu,tl:_LN};
var _zw = {TyName_args:_zv,TyName_ident:"option"};
var _zx = {hd:{label:"style",ty:_zw},tl:_zt};
var _zy = {hd:_vr,tl:_LN};
var _BBA = {TyName_args:_zy,TyName_ident:"option"};
var _BBB = {hd:{label:"color",ty:_BBA},tl:_zx};
var _BBC = {TyRecord_row:_BBB};
var _BBD = {quantifier:_LR,body:_BBC};
var _BBE = {hd:{label:"medium",ty:_LT},tl:_LS};
var _BBF = {hd:{label:"thick",ty:_LT},tl:_LS};
var _BBG = {hd:{label:"thin",ty:_LT},tl:_LS};
var _BBH = {TySum_col:{hd:_BBE,tl:{hd:_xI,tl:{hd:_BBF,tl:{hd:_BBG,tl:{nil:_C}}}}}};
var _BBI = {quantifier:_LR,body:_BBH};
var _BBJ = {hd:{label:"dashed",ty:_LT},tl:_LS};
var _BBK = {hd:{label:"dotted",ty:_LT},tl:_LS};
var _BBL = {hd:{label:"double",ty:_LT},tl:_LS};
var _BBM = {hd:{label:"groove",ty:_LT},tl:_LS};
var _BBN = {hd:{label:"inset",ty:_LT},tl:_LS};
var _BBO = {hd:{label:"outset",ty:_LT},tl:_LS};
var _BBP = {hd:{label:"ridge",ty:_LT},tl:_LS};
var _BBQ = {hd:{label:"solid",ty:_LT},tl:_LS};
var _BBR = {TySum_col:{hd:_yh,tl:{hd:_BBJ,tl:{hd:_BBK,tl:{hd:_BBL,tl:{hd:_BBM,tl:{hd:_vZ,tl:{hd:_BBN,tl:{hd:_BBO,tl:{hd:_BBP,tl:{hd:_BBQ,tl:{nil:_C}}}}}}}}}}}};
var _BBS = {quantifier:_LR,body:_BBR};
var _BBT = {hd:{label:"collapse",ty:_LT},tl:_LS};
var _BBU = {hd:{label:"separate",ty:_LT},tl:_LS};
var _BBV = {TySum_col:{hd:_BBT,tl:{hd:_xB,tl:{hd:_BBU,tl:{nil:_C}}}}};
var _BBW = {quantifier:_LR,body:_BBV};
var _BBX = {TyName_args:_LN,TyName_ident:"Css.border_type"};
var _BBY = {hd:_BBX,tl:_LN};
var _BBZ = {TyName_args:_LN,TyName_ident:"border"};
var _BBb = {hd:_BBZ,tl:_BBY};
var _BBc = {TyName_args:_BBb,TyName_ident:"tuple_2"};
var _BBd = {quantifier:_LR,body:_BBc};
var _BBe = {hd:_vn,tl:_LN};
var _BBf = {TyName_args:_BBe,TyName_ident:"option"};
var _BBg = {hd:{label:"t",ty:_BBf},tl:_LS};
var _BBh = {hd:{label:"r",ty:_BBf},tl:_BBg};
var _BBi = {hd:{label:"l",ty:_BBf},tl:_BBh};
var _BBj = {hd:{label:"b",ty:_BBf},tl:_BBi};
var _BBk = {TyRecord_row:_BBj};
var _BBl = {quantifier:_LR,body:_BBk};
var _BBm = {hd:{label:"both",ty:_LT},tl:_LS};
var _BBn = {hd:{label:"x",ty:_LT},tl:_LS};
var _BBo = {hd:{label:"y",ty:_LT},tl:_LS};
var _BBp = {TySum_col:{hd:_BBm,tl:{hd:_yh,tl:{hd:_BBn,tl:{hd:_BBo,tl:{nil:_C}}}}}};
var _BBq = {quantifier:_LR,body:_BBp};
var _BBr = {hd:{label:"center",ty:_LT},tl:_LS};
var _BBs = {TySum_col:{hd:_vE,tl:{hd:_BBr,tl:{hd:_xI,tl:{hd:_vF,tl:{nil:_C}}}}}};
var _BBt = {quantifier:_LR,body:_BBs};
var _BBu = {TySum_col:{hd:_BBr,tl:{hd:_fv,tl:{hd:_fx,tl:{hd:_xI,tl:{nil:_C}}}}}};
var _BBv = {quantifier:_LR,body:_BBu};
var _BBw = {TyName_args:_LN,TyName_ident:"Css.background_position_y"};
var _BBx = {hd:{label:"y",ty:_BBw},tl:_LS};
var _BBy = {TyName_args:_LN,TyName_ident:"Css.background_position_x"};
var _BCA = {hd:{label:"x",ty:_BBy},tl:_BBx};
var _BCB = {TyRecord_row:_BCA};
var _BCC = {quantifier:_LR,body:_BCB};
var _BCD = {TyName_args:_zj,TyName_ident:"option"};
var _BCE = {hd:{label:"url",ty:_BCD},tl:_LS};
var _BCF = {TyName_args:_LN,TyName_ident:"Css.background_repeat"};
var _BCG = {hd:_BCF,tl:_LN};
var _BCH = {TyName_args:_BCG,TyName_ident:"option"};
var _BCI = {hd:{label:"repeat",ty:_BCH},tl:_BCE};
var _BCJ = {TyName_args:_LN,TyName_ident:"Css.background_position"};
var _BCK = {hd:_BCJ,tl:_LN};
var _BCL = {TyName_args:_BCK,TyName_ident:"option"};
var _BCM = {hd:{label:"position",ty:_BCL},tl:_BCI};
var _BCN = {hd:{label:"color",ty:_BBA},tl:_BCM};
var _BCO = {hd:_Me,tl:_LN};
var _BCP = {TyName_args:_BCO,TyName_ident:"option"};
var _BCQ = {hd:{label:"attached",ty:_BCP},tl:_BCN};
var _BCR = {TyRecord_row:_BCQ};
var _BCS = {quantifier:_LR,body:_BCR};
var _BCT = {hd:{label:"justify",ty:_LT},tl:_LS};
var _BCU = {TySum_col:{hd:_BBr,tl:{hd:_BCT,tl:{hd:_fv,tl:{hd:_fx,tl:{nil:_C}}}}}};
var _BCV = {quantifier:_LR,body:_BCU};
var _BCW = _EC("xml",_tu);
var _BCX = _EC("xhtml_specific_extensions",_ty);
var _BCY = _EC("xhtml_specific_attributes",_uT);
var _BCZ = _EC("xhtml_href",_uY);
var _BCb = _EC("xhtml_event",_uc);
var _BCc = _EC("xhtml_bool_attribute_value",_uf);
var _BCd = _EC("xhtml_bool_attribute",_uk);
var _BCe = _EC("xhtml",_uq);
var _BCf = _EC("leading_zero",_uu);
var _BCg = _EC("handle_assoc",_ux);
var _BCh = _EC("case",_vC);
var _BCi = _EC("border",_vH);
var _BCj = _EC("Xml.binding",_vM);
var _BCk = _EC("Xml.attribute",_vQ);
var _BCl = _EC("Css.white_space",_vY);
var _BCm = _EC("Css.visibility",_vd);
var _BCn = _EC("Css.vertical_align",_vg);
var _BCo = _EC("Css.unary",_wx);
var _BCp = _EC("Css.table_layout",_xD);
var _BCq = _EC("Css.style_position",_xH);
var _BCr = _EC("Css.size_or_normal",_xK);
var _BCs = _EC("Css.size_or_none",_xM);
var _BCt = _EC("Css.size",_xX);
var _BCu = _EC("Css.selector_item",_xc);
var _BCv = _EC("Css.properties",_xj);
var _BCw = _EC("Css.position",_xp);
var _BCx = _EC("Css.overflow",_xr);
var _BCy = _EC("Css.list_style_def",_yD);
var _BDA = _EC("Css.list_style",_yN);
var _BDB = _EC("Css.font_variant",_yQ);
var _BDC = _EC("Css.font_family",_yb);
var _BDD = _EC("Css.font",_yg);
var _BDE = _EC("Css.float",_yj);
var _BDF = _EC("Css.event",_yq);
var _BDG = _EC("Css.entry",_yv);
var _BDH = _EC("Css.display",_zB);
var _BDI = _EC("Css.direction",_zF);
var _BDJ = _EC("Css.default_cursor",_zQ);
var _BDK = _EC("Css.decoration",_zX);
var _BDL = _EC("Css.cursor_resize",_zi);
var _BDM = _EC("Css.cursor",_zp);
var _BDN = _EC("Css.border_type",_BBD);
var _BDO = _EC("Css.border_thickness",_BBI);
var _BDP = _EC("Css.border_style_elt",_BBS);
var _BDQ = _EC("Css.border_collapse",_BBW);
var _BDR = _EC("Css.border",_BBd);
var _BDS = _EC("Css.block_size",_BBl);
var _BDT = _EC("Css.background_repeat",_BBq);
var _BDU = _EC("Css.background_position_y",_BBt);
var _BDV = _EC("Css.background_position_x",_BBv);
var _BDW = _EC("Css.background_position",_BCC);
var _BDX = _EC("Css.background",_BCS);
var _BDY = _EC("Css.align",_BCV);
var _BDZ = {"default":"",map:_RM.empty};
function _qt(a,b){var c,d;return c = a.map,(d = b.name,d != null)?{"default":a["default"],map:_RM.add(d,b.uri,c)}:{"default":b["default"],map:c};}
function _qu(a,b){return _Ko(_qt,a,b);}
function _qv(a,b){return a == ""?b["default"]:(a = _RM.get(a,b.map).some,a != null)?a:b["default"];}
function _qw(a,b){return a == ""?_GM(b["default"]):_RM.get(a,b.map);}
function _qx(a){return {fragment:a};}
function _qy(a,b){return _qx(_Gi(a,b,0));}
var _BDb = _FL("list",_qy);
function _rA(a,b){return _Iw(a,{fragment:{nil:_C}},b);}
var _BDc = _FL("option",_rA);
function _rB(a,b){return _qx(_Ou(_Ow(a,b)));}
var _BDd = _FL("iter",_rB);
function _rC(a){return {text:a};}
function _rD(a){return _rC("" + a);}
function _rE(a){return _rC(_CW(a));}
function _rF(a){return _EP(a);}
function _rG(a){return _rH(a);}
function _BDe(a,b,c){var e,d;while (true) {switch (a) {case 0:return (a = c.TyName_args) && (d = c.TyName_ident,d === "xml")?b:a && d === "xhtml"?b:a && d === "text"?_rC(_Ie(b)):(e = c.TyConst) && e.TyInt?_rD(b):e && e.TyFloat?_rE(b):e?_rC(b):a && (e = a.hd) && (e = e.TyName_ident,e != null) && e === "xhtml" && a.tl.nil && d === "list"?_qx(b):a?_GF(_rF,d,a,_rG,_rI(_HA(d,a)),b,{nil:_C}):_pw(c,_tQ)?_qx(b):{text:_Fk({hd:"Can't make an xml with ",tl:{hd:_Od(1,c),tl:{nil:_C}}})};;
case 1:a = c;c = b;b = a;a = 0;continue;;
case 2:a = c;c = b;b = a;a = 0;;}}}
function _rH(a){return function (b){return _BDe(1,a,b);};}
function _rI(a){return function (b){return _BDe(2,a,b);};}
function _rJ(a){return function (b){return _BDe(0,b,a);};}
var _BDf = {url:_Of,position:_Of,repeat:_Of,color:_Of,attached:_Of};
var _BDg = {attached:_BDf.attached,color:_BDf.color,position:_BDf.position,repeat:_GM({css_none:_C}),url:_BDf.url};
var _BDh = {attached:_BDf.attached,color:_BDf.color,position:_BDf.position,repeat:_GM({both:_C}),url:_BDf.url};
var _BDi = {attached:_BDf.attached,color:_BDf.color,position:_BDf.position,repeat:_GM({x:_C}),url:_BDf.url};
var _BDj = {attached:_BDf.attached,color:_BDf.color,position:_BDf.position,repeat:_GM({y:_C}),url:_BDf.url};
var _BDk = {attached:_GM(_OZ),color:_BDf.color,position:_BDf.position,repeat:_BDf.repeat,url:_BDf.url};
function _rK(a){return {style:_GM(a),width:_Of,color:_Of};}
function _rL(a){return {style:_Of,width:_GM(a),color:_Of};}
var _BDl = _rL({thin:_C});
var _BDm = _rL({medium:_C});
var _BDn = _rL({thick:_C});
var _BDo = _rK({css_none:_C});
var _BDp = _rK({hidden:_C});
var _BDq = _rK({dotted:_C});
var _BDr = _rK({dashed:_C});
var _BDs = _rK({solid:_C});
var _BDt = _rK({"double":_C});
var _BDu = _rK({groove:_C});
var _BDv = _rK({ridge:_C});
var _BDw = _rK({inset:_C});
var _BDx = _rK({outset:_C});
function _rM(a){return {height:a};}
function _rN(a){return {list_style:a};}
function _rO(a,b){return _rN({style:b,style_position:a});}
function _rP(a){return _rO(_GM(a),_Of);}
function _rQ(a){return _rO(_Of,_GM(a));}
var _BDy = _rP({inside:_C});
var _BEA = _rP({outside:_C});
var _BEB = _rQ({disc:_C});
var _BEC = _rQ({square:_C});
var _BED = _rQ({decimal:{not_leading:_C}});
var _BEE = _rQ({decimal:{leading:_C}});
var _BEF = _rQ({roman:{lower_case:_C}});
var _BEG = _rQ({roman:{upper_case:_C}});
var _BEH = _rQ({latin:{lower_case:_C}});
var _BEI = _rQ({latin:{upper_case:_C}});
var _BEJ = _rQ({greek:_C});
function _rR(a){return {width:a};}
function _rS(a){return _JA(" ",a);}
function _rT(a,b){return {name:a,value:b};}
function _rU(a,b){return {hd:_rT(a,b),tl:{nil:_C}};}
function _rV(a,b){return (b = b.some,b == null)?{nil:_C}:_rU(a,b);}
function _rW(a){var b;return (b = a.cm,b != null)?_Fk({hd:_CW(b),tl:{hd:"cm",tl:{nil:_C}}}):(b = a.em,b != null)?_Fk({hd:_CW(b),tl:{hd:"em",tl:{nil:_C}}}):(b = a.ex,b != null)?_Fk({hd:_CW(b),tl:{hd:"ex",tl:{nil:_C}}}):(b = a.inch,b != null)?_Fk({hd:_CW(b),tl:{hd:"in",tl:{nil:_C}}}):(b = a.mm,b != null)?_Fk({hd:_CW(b),tl:{hd:"mm",tl:{nil:_C}}}):(b = a.percent,b != null)?_Fk({hd:_CW(b),tl:{hd:"%",tl:{nil:_C}}}):(b = a.pc,b != null)?_Fk({hd:_CW(b),tl:{hd:"pc",tl:{nil:_C}}}):(b = a.pt,b != null)?_Fk({hd:_CW(b),tl:{hd:"pt",tl:{nil:_C}}}):_Fk({hd:"" + a.px,tl:{hd:"px",tl:{nil:_C}}});}
function _rX(a){return a.center?"center":a.top?"top":(a = a.size)?_rW(a):"bottom";}
function _rY(a){return a.center?"center":a.left?"left":(a = a.size)?_rW(a):"right";}
function _rZ(a){return _Fk({hd:_rX(a.y),tl:{hd:" ",tl:{hd:_rY(a.x),tl:{nil:_C}}}});}
function _rb(a){return a.block?"block":a.inline?"inline":a.inline_block?"inline-block":"none";}
function _rc(a,b){return (b = _JM(a,b).some,b != null)?b:"";}
function _rd(a){return a.inside?"inside":"outside";}
function _re(a){return _Fk({hd:"url(\"",tl:{hd:_bb(a),tl:{hd:"\")",tl:{nil:_C}}}});}
function _rf(a){return a.upper_case?"upper":"lower";}
function _rg(a){var b;return (b = a.image,b != null)?_re(b):a.disc?"disc":a.square?"square":(b = a.decimal) && b.leading?"decimal-leading-zero":b?"decimal":(b = a.roman)?_rf(b) + "-roman":(b = a.latin)?_rf(b) + "-latin":"lower-greek";}
function _rh(a){return a.style.none && a.style_position.none?_Of:_GM(_rS({hd:_rc(_rd,a.style_position),tl:{hd:_rc(_rg,a.style),tl:{nil:_C}}}));}
function _ri(a){return a.overline?true:a.underline?true:a.line_through?true:false;}
function _rj(a){return "fixed";}
function _rk(a){return a.normal?"normal":a.pre?"pre":"nowrap";}
function _rl(a,b){return function (c,d){return d + b(c) + a;};}
function _rm(a,b,c){return _Fh(_rl(b,a),c,"");}
function _rn(a,b){return _rm(a," ",b);}
function _ro(a){return a.auto?"auto":a.fixed?"fixed":"inherit";}
function _rp(a){return a.left?"left":a.right?"right":a.center?"center":"justify";}
function _rq(a,b){return function (c){return _Ho(a)(c.name,b);};}
function _rr(a){return function (b,c,d){return _Gd(_rT(b,c),_KH(_rq(a,b),d));};}
function _rs(a){return a.italic?"italic":a.bold?"bold":a.underline?_Bd("CSS::to_xhtml_style: Unexpected underline/overline/line-through in font","File \"lib/stdlib/core/xhtml/css.opa\", line 225, characters 29-108, (225:29-225:108 | 8308-8387)"):a.overline?_Bd("CSS::to_xhtml_style: Unexpected underline/overline/line-through in font","File \"lib/stdlib/core/xhtml/css.opa\", line 225, characters 29-108, (225:29-225:108 | 8308-8387)"):a.line_through?_Bd("CSS::to_xhtml_style: Unexpected underline/overline/line-through in font","File \"lib/stdlib/core/xhtml/css.opa\", line 225, characters 29-108, (225:29-225:108 | 8308-8387)"):a.small_caps?"small_caps":"normal";}
function _rt(a){return _qM(a);}
function _ru(a){return a.css_none?"none":a.hidden?"hidden":a.dotted?"dotted":a.dashed?"dashed":a.solid?"solid":a["double"]?"double":a.groove?"groove":a.ridge?"ridge":a.inset?"inset":"outset";}
function _rv(a){return a.thin?"thin":a.medium?"medium":(a = a.size)?_rW(a):"thick";}
function _rw(a){return a.color.none && a.style.none && a.width.none?_Of:_GM(_rS({hd:_rc(_ru,a.style),tl:{hd:_rc(_rv,a.width),tl:{hd:_rc(_rt,a.color),tl:{nil:_C}}}}));}
function _rx(a,b){return a.italic?_rr(_LW)("font-style","italic",b):a.bold?_rr(_LW)("font-weight","bold",b):a.underline?_Bd("CSS::to_xhtml_string: Compiler bug","File \"lib/stdlib/core/xhtml/css.opa\", line 349, characters 31-73, (349:31-349:73 | 14409-14451)"):a.overline?_Bd("CSS::to_xhtml_string: Compiler bug","File \"lib/stdlib/core/xhtml/css.opa\", line 349, characters 31-73, (349:31-349:73 | 14409-14451)"):a.line_through?_Bd("CSS::to_xhtml_string: Compiler bug","File \"lib/stdlib/core/xhtml/css.opa\", line 349, characters 31-73, (349:31-349:73 | 14409-14451)"):a.small_caps?_rr(_LW)("font-variant","small-caps",b):{hd:_rT("font-style","normal"),tl:{hd:_rT("font-weight","normal"),tl:{hd:_rT("font-variant","normal"),tl:{nil:_C}}}};}
function _ry(a){var d,c,b;return b = _KR(_ri,a),_Hs((a = _Kh(_tR)(b.f1),(c = a.nil,c != null) && _BE(a) === 1 && _BE(c) === 0?{nil:_C}:(c = a.tl,c != null) && (d = a.hd,d != null) && _BE(a) === 2 && (a = c.nil,a != null) && _BE(c) === 1 && _BE(a) === 0?d.underline?_rU("text-decoration","underline"):d.overline?_rU("text-decoration","overline"):d.line_through?_rU("text-decoration","line-through"):_Bd("CSS::to_xhtml_string: Compiler bug","File \"lib/stdlib/core/xhtml/css.opa\", line 337, characters 18-60, (337:18-337:60 | 13888-13930)"):_rU("text-decoration","underline overline")),_Gf(_Fh(_rx,b.f2,{nil:_C})));}
function _sA(a){return a.collapse?"collapse":a.separate?"separate":"inherit";}
function _sB(a){return (a = a.some,a == null)?"auto":"" + a;}
function _sC(a){return a.n?"n-resize":a.s?"s-resize":a.e?"e-resize":a.w?"w-resize":a.ne?"ne-resize":a.nw?"nw-resize":a.se?"se-resize":"sw-resize";}
function _sD(a){var b;return a.pointer?"pointer":a.auto?"auto":a["default"]?"default":a.crosshair?"crosshair":a.progress?"progress":a.move?"move":a.text?"text":(b = a.resize)?_sC(b):a.help?"help":"wait";}
function _sE(a){var b;return b = _CQ(a * 100.),{hd:_rT("opacity",_CW(a)),tl:{hd:_rT("filter",_Fk({hd:"alpha(opacity=",tl:{hd:"" + b,tl:{hd:")",tl:{nil:_C}}}})),tl:{hd:_rT("-ms-filter",_Fk({hd:"progid:DXImageTransform.Microsoft.Alpha(opacity=",tl:{hd:"" + b,tl:{hd:")",tl:{nil:_C}}}})),tl:{nil:_C}}}};}
function _sF(a){return a.left?"left":a.right?"right":"none";}
function _sG(a){return a.normal?"normal":a.inherit?"inherit":"small-caps";}
function _sH(a){return a.middle?"middle":"baseline";}
function _sI(a,b){return function (c){return _rT(a + "-" + b,_rW(c));};}
function _sJ(a){return function (b){return _JM(_sI(a,b.f1),b.f2);};}
function _sK(a){return a.absolute?"absolute":a.relative?"relative":a.fixed?"fixed":"static";}
function _sL(a){return a.left_to_right?"ltr":"rtl";}
function _sM(a){return a = _rW(a),{hd:_rT("border-radius",a),tl:{hd:_rT("-moz-morder-radius",a),tl:{hd:_rT("-webkit-border-radius",a),tl:{nil:_C}}}};}
function _sN(a){return a.visible?"visible":"hidden";}
function _sO(a){return a.x?"repeat-x":a.y?"repeat-y":a.css_none?"no-repeat":"repeat";}
function _sP(a,b){return _KK(_sJ(a),{hd:{f1:"top",f2:b.t},tl:{hd:{f1:"bottom",f2:b.b},tl:{hd:{f1:"left",f2:b.l},tl:{hd:{f1:"right",f2:b.r},tl:{nil:_C}}}}},0);}
function _sQ(a){return (a = a.size)?_rW(a):"normal";}
function _sR(a){return a.TimesNewRoman?"Cambria, \"Hoefler Text\", Utopia, \"Liberation Serif\", \"Nimbus Roman No9 L Regular\", Times, \"Times New Roman\", serif":a.Georgia?"Constantia, \"Lucida Bright\", Lucidabright, \"Lucida Serif\", Lucida, \"DejaVu Serif,\" \"Bitstream Vera Serif\", \"Liberation Serif\", Georgia, serif":a.Garamond?"\"Palatino Linotype\", Palatino, Palladio, \"URW Palladio L\", \"Book Antiqua\", Baskerville, \"Bookman Old Style\", \"Bitstream Charter\", \"Nimbus Roman No9 L\", Garamond, \"Apple Garamond\", \"ITC Garamond Narrow\", \"New Century Schoolbook\", \"Century Schoolbook\", \"Century Schoolbook L\", Georgia, serif":a.Helvetica?"Frutiger, \"Frutiger Linotype\", Univers, Calibri, \"Gill Sans\", \"Gill Sans MT\", \"Myriad Pro\", Myriad, \"DejaVu Sans Condensed\", \"Liberation Sans\", \"Nimbus Sans L\", Tahoma, Geneva, \"Helvetica Neue\", Helvetica, Arial, sans-serif":a.Verdana?"Corbel, \"Lucida Grande\", \"Lucida Sans Unicode\", \"Lucida Sans\", \"DejaVu Sans\", \"Bitstream Vera Sans\", \"Liberation Sans\", Verdana, \"Verdana Ref\", sans-serif":a.Trebuchet?"\"Segoe UI\", Candara, \"Bitstream Vera Sans\", \"DejaVu Sans\", \"Bitstream Vera Sans\", \"Trebuchet MS\", Verdana, \"Verdana Ref\", sans-serif":a.HeavyImpact?"Impact, Haettenschweiler, \"Franklin Gothic Bold\", Charcoal, \"Helvetica Inserat\", \"Bitstream Vera Sans Bold\", \"Arial Black\", sans-serif":"Consolas, \"Andale Mono WT\", \"Andale Mono\", \"Lucida Console\", \"Lucida Sans Typewriter\", \"DejaVu Sans Mono\", \"Bitstream Vera Sans Mono\", \"Liberation Mono\", \"Nimbus Mono L\", Monaco, \"Courier New\", Courier, monospace";}
function _sS(a){return _rS({hd:_rn(_rs,a.decoration),tl:{hd:_rW(a.size),tl:{hd:"/",tl:{hd:_sQ(a.line_height),tl:{hd:_sR(a.family),tl:{nil:_C}}}}}});}
function _sT(a){return (a = a.size)?_rW(a):"none";}
function _sU(a){return _rS({hd:_rm(_re,",",a.icons),tl:{hd:_sD(a["default"]),tl:{nil:_C}}});}
function _sV(a){return a.hidden?"hidden":a.visible?"visible":a.scroll?"scroll":"auto";}
function _sW(a){return a.attached.none && a.color.none && a.position.none && a.repeat.none && a.url.none?_Of:_GM(_rS({hd:_rc(_re,a.url),tl:{hd:_rc(_rZ,a.position),tl:{hd:_rc(_sO,a.repeat),tl:{hd:_rc(_rt,a.color),tl:{hd:_rc(_rj,a.attached),tl:{nil:_C}}}}}}));}
function _sX(a){var b;return (b = a.background)?_rV("background",_sW(b)):(b = a.border)?(a = b.f1,_rV(a.all?"border":a.left?"border-left":a.right?"border-right":a.top?"border-top":"border-bottom",_rw(b.f2))):(b = a.border_collapse)?_rU("border-collapse",_sA(b)):(b = a.border_radius)?_sM(b):(b = a.border_spacing)?_rU("border-spacing",_rW(b)):(b = a.bottom)?_rU("bottom",_rW(b)):(b = a.color)?_rU("color",_qM(b)):(b = a.cursor)?_rU("cursor",_sU(b)):(b = a.direction)?_rU("direction",_sL(b)):(b = a.display)?_rU("display",_rb(b)):(b = a["float"])?_rU("float",_sF(b)):(b = a.font)?_Hs(_rU("font",_sS({decoration:{nil:_C},family:b.family,line_height:b.line_height,size:b.size})),_sX({font_decoration:b.decoration})):(b = a.font_family)?_rU("font-family",_sR(b)):(b = a.font_size)?_rU("font-size",_rW(b)):(b = a.font_decoration)?_ry(b):(b = a.font_variant)?_rU("font-variant",_sG(b)):(b = a.height)?_rU("height",_rW(b)):(b = a.left)?_rU("left",_rW(b)):(b = a.letter_spacing)?_rU("letter-spacing",_sQ(b)):(b = a.line_height)?_rU("line-height",_rW(b)):(b = a.list_style)?_rV("list-style",_rh(b)):(b = a.margin)?_sP("margin",b):(b = a.max_height)?_rU("max-height",_sT(b)):(b = a.min_height)?_rU("min-height",_sT(b)):(b = a.max_width)?_rU("max-width",_sT(b)):(b = a.min_width)?_rU("min-width",_sT(b)):(b = a.overflow)?_rU("overflow",_sV(b)):(b = a.opacity,b != null)?_sE(b):(b = a.padding)?_sP("padding",b):(b = a.position)?_rU("position",_sK(b)):(b = a.right)?_rU("right",_rW(b)):(b = a.table_layout)?_rU("table-layout",_ro(b)):(b = a.text_align)?_rU("text-align",_rp(b)):(b = a.top)?_rU("top",_rW(b)):(b = a.vertical_align)?_rU("vertical_align",_sH(b)):(b = a.visibility)?_rU("visibility",_sN(b)):(b = a.width)?_rU("width",_rW(b)):(b = a.white_space)?_rU("white-space",_rk(b)):(b = a.z_index)?_rU("z-index",_sB(b)):(b = a.not_typed,_rU(b.f1,b.f2));}
function _sY(a){return _IV(_Gi(_sX,a,0));}
var _BEK = "http://www.w3.org/1999/xhtml";
function _sZ(a){return a.click?"click":a.mouseup?"mouseup":a.mousedown?"mousedown":a.mouseover?"mouseover":a.mouseout?"mouseout":a.mousemove?"mousemove":a.mouseenter?"mouseenter":a.mouseleave?"mouseleave":a.resize?"resize":a.dblclick?"dblclick":a.keypress?"keypress":a.keydown?"keydown":a.keyup?"keyup":a.load?"load":a.unload?"unload":a.error?"error":a.submit?"submit":a.focus?"focus":a.focusin?"focusin":a.focusout?"focusout":a.blur?"blur":a.mousewheel?"mousewheel":a.change?"change":a.select?"select":a.scroll?"scroll":a.newline?"keydown.newline":a.keyesc?"keydown.keyesc":a.ready?"ready":a.input?"input":(a = a.custom,a == null)?"paste":a;}
function _sb(a){return function (b){var c;return (c = b["default"],c != null)?_qk(a,"xmlns",c):_qk(a,_Fk({hd:"xmlns:",tl:{hd:b.name,tl:{nil:_C}}}),b.uri);};}
function _sc(a,b){return function (c){var d,e,f;return f = c.name,e = c.namespace,d = c.value,e == ""?_qk(b,f,d):(c = _qw(e,a).some,c == null)?_qk(b,f,d):_ql(b,c,f,d);};}
function _sd(a,b,c,d,e){return function (f){return a(d,c,b,e,f);};}
function _sf(a,b){return function (c,d){var e,f,g;while (!(e = c.text,e != null)) {if (e = c.content_unsafe,e != null) {return _DF(e);} else {if (g = c.fragment) {if (e = g.tl) {if (e.nil) {c = g.hd;} else {e = _DH();_Fg(_se(a,b,d,e),g);return e;}} else {return _DH();}} else {if (g = c.args) {f = c.tag;e = c.xmlns;var h =_qu(d,e),i =_DG(_qv(c.namespace,h),f);_Fg(_sb(i),e);_Fg(_sc(h,i),g);_Fg(_se(a,b,h,i),c.content);_JN(_sd(a,g,f,h,i),c.specific_attributes);return i;} else {return (e = c.xml_dialect.some,e == null)?_DH():b(e);}}}}return _DE(e);};}
function _se(a,b,c,d){return function (e){return _qf(d,_sf(a,b)(e,c));};}
function _sg(a,b,c,d){return _sf(d,c)(a,_BDZ);}
function _BEL(a){return function (b){return a(b);};}
function _BEM(a){return a.stop_propagation?true:false;}
function _BEN(a){return a.prevent_default?true:false;}
function _BEO(a){return function (b){var c,d;return c = b.name,b = b.value,c.ready?_OZ:(d = _sZ(c),c = _KU(_BEM,b),b = _KU(_BEN,b),c?_qi(a,d):_OZ,b?_qh(a,d):_OZ,_OZ);};}
function _BEP(a){return function (b){return _qd(a,b.js_code_unsafe),_DF(b.html_code_unsafe);};}
function _BEQ(a){return function (b){return _qb(a,b);};}
function _BER(a,b){return function (c){return _qe(a,b,c.name,c.value);};}
function _BES(a){return function (b){var c,d;return d = b.name,c = b.value,(b = c.string,b != null)?_qk(a,d,b):(b = c.bool,b != null)?b?_qk(a,d,d):_OZ:_qk(a,d,d);};}
function _BET(a){return function (){return a(_DD());};}
function _BEU(a,b){return function (c){var d,e;return d = c.name,c = c.value,(e = c.expr)?d.ready?_qc(a,_BET(e)):d.unload?_qc(a,_BET(e)):_qg(b,_sZ(d),_BEL(e)):(c = c.value,d.ready?_qd(a,_Fk({hd:"var event = ",tl:{hd:_nk(),tl:{hd:";",tl:{nil:_C}}}}) + c):d.unload?_qd(a,_Fk({hd:"var event = ",tl:{hd:_nk(),tl:{hd:";",tl:{nil:_C}}}}) + c):_qj(b,_sZ(d),c));};}
function _BEV(a){return a.name == "href"?true:false;}
function _BEW(a,b){return function (c,d,e,f,g){return c = g.href,_Fg(_BEQ(f),g["class"]),_Fg(_BER(a,f),_sY(g.style)),_Fg(_BES(f),g.bool_attributes),_Fg(_BEU(b,f),g.events),_Fg(_BEO(f),g.events_options),d = d == "a"?c.none?(c = _Jx(_BEV,e).some)?{constant:c.value}:{constant:"javascript:void(0)"}:c:c,d.none?_OZ:(c = d.constant,c != null)?_qk(f,"href",c):(c = d.typed)?_qk(f,"href",_dT(c)):(c = d.untyped,_qk(f,"href",_dJ(c)?c:"javascript:void(0)/*Sanitized URI*/"));};}
function _sh(a){var c,b;return b = _DQ(),c = _DU(),a = _sg(a,_BEK,_BEP(c),_BEW(b,c)),_qn(a,b),_qm(a,c),_EQ(a);}
var _BEX = _JG(200);
function _si(a){return a == "!"?"\\\\" + a:a == "\""?"\\\\" + a:a == "#"?"\\\\" + a:a == "$"?"\\\\" + a:a == "%"?"\\\\" + a:a == "&"?"\\\\" + a:a == "'"?"\\\\" + a:a == "("?"\\\\" + a:a == ")"?"\\\\" + a:a == "*"?"\\\\" + a:a == "+"?"\\\\" + a:a == ","?"\\\\" + a:a == "."?"\\\\" + a:a == "/"?"\\\\" + a:a == ":"?"\\\\" + a:a == ";"?"\\\\" + a:a == "<"?"\\\\" + a:a == "="?"\\\\" + a:a == ">"?"\\\\" + a:a == "?"?"\\\\" + a:a == "@"?"\\\\" + a:a == "["?"\\\\" + a:a == "\\"?"\\\\" + a:a == "]"?"\\\\" + a:a == "^"?"\\\\" + a:a == "`"?"\\\\" + a:a == "{"?"\\\\" + a:a == "|"?"\\\\" + a:a == "}"?"\\\\" + a:a == "~"?"\\\\" + a:a == " "?"\\\\" + a:a;}
function _sj(a){return _Is(_si,a);}
function _sk(a){return function (b,c){return _ne(0,b,a,c);};}
function _sl(a){return function (b){return _nf(1,b,a);};}
var _BEY = function (){var a;return a = _Jm(_tO),{f1:_sk(a),f2:_sl(a)};}();
var _BEZ = _FJ("xhtml",_BEY);
function _sm(a){return {id:a};}
function _sn(a){return _EV(_sj(a));}
function _so(a){return _EW(_sj(a));}
function _sp(a,b){return _Ec(_sj(a),b);}
function _sq(a,b){return _Ed(_sj(a),b);}
function _sr(a,b){var c;while (!b.document) {if (b.window) {return _ER();} else {if (b.concrete != null) {return _ER();} else {if (c = b.id,c != null) {return _sp(c,a);} else {if (c = b["class"],c != null) {return _sq(c,a);} else {if (b.all) {return _Eb(a);} else {if (c = b.selector,c != null) {return _Ee(c,a);} else {if (c = b.inside) {a = _sr(a,c);b = b.select;} else {return b.contents?_EZ(a):_EY(a);}}}}}}}}return _ER();}
function _ss(a){var b;return a.all?_ES():a.document?_ET():a.window?_EU():(b = a.id,b != null)?_sn(b):(b = a["class"],b != null)?_so(b):(b = a.selector,b != null)?_EX(b):(b = a.inside)?_sr(_ss(b),a.select):(b = a.concrete,b != null)?b:a.contents?_ET():_ET();}
function _st(a){return {top:_ss,depth:_sr}.top(a);}
function _su(a){return {concrete:_st(a)};}
function _sv(a){return {concrete:a};}
function _sw(a){return {concrete:_sh(a)};}
function _sx(a){return _Ef(_st(a));}
function _sy(a){var b;return a.document?"document":a.all?"*":(b = a.id,b != null)?_Fk({hd:"#",tl:{hd:b,tl:{nil:_C}}}):(b = a["class"],b != null)?_Fk({hd:".",tl:{hd:b,tl:{nil:_C}}}):a.concrete != null?"(dom element)":a.window?"window":(b = a.selector,b != null)?b:(b = a.inside)?_Fk({hd:_sy(b),tl:{hd:" ",tl:{hd:_sy(a.select),tl:{nil:_C}}}}):a.shallow?":parent:children":":children";}
function _tA(a){return {aux:_sy}.aux(a);}
function _tB(a,b){return _sv(_Eg(_st(a),_st(b)));}
function _tC(a,b){return _sv(_Eh(_st(a),_st(b)));}
function _tD(a,b){return _sv(_Ei(_st(a),_st(b)));}
function _tE(a){return _Ej(_st(a));}
function _tF(a,b){return _qs(_st(a),b);}
function _BEb(a){return function (b){return _qr(a,b.name,b.value);};}
function _tG(a,b){return _Fg(_BEb(_st(a)),b),_OZ;}
function _tH(a,b){return _tG(a,_sY(b));}
function _tI(a,b,c){return _qq(_st(a),b,c),_OZ;}
function _tJ(a){var c,b,d;return b = a.jq,c = a.subject,a = a.verb,d = _su(b),_sx(d) == 0?_nM.info("Dom.transform",_Fk({hd:"empty DOM selection ",tl:{hd:_tA(b),tl:{nil:_C}}})):(b = c.property,b != null)?(_tI(d,b,c.value_p),_OZ):(b = c.value,b != null)?(a.append?_tF(d,_tE(d) + b):a.prepend?_tF(d,b + _tE(d)):_tF(d,b),_OZ):(b = c.content)?(b = _sw(b),a.append?_tB(d,b):a.prepend?_tC(d,b):_tD(d,b),_OZ):a.set?_tH(d,c.css):_Bd("Style properties can only be set.","File \"lib/stdlib/core/xhtml/dom.opa\", line 941, characters 20-61, (941:20-941:61 | 25730-25771)");}
function _tK(a){return _Fg(_tJ,a);}
function _tL(a,b){return _qo(_st(a),b);}
function _tM(a,b){return _qp(_st(a),b);}
function _tN(a){return _rC(_dT(a));}
var _BEc = _FL("Uri.uri",_tN);
var _BEd = _JH(_Hb(_tU));
var _BEe = _Qy(_BEd);
_Dm("__v69_an_183fb61f,__v68_an_183fb61f,__v67_an_183fb61f,__v70_an_183fb61f,__v66_an_183fb61f,__v64_an_183fb61f,__v60_an_183fb61f,__v61_an_183fb61f,__v59_an_183fb61f,__v56_an_183fb61f,__v53_an_183fb61f,__v50_an_183fb61f,__v44_an_183fb61f,__v40_an_183fb61f,__v42_an_183fb61f,__v35_an_183fb61f,__v32_an_183fb61f,__v38_an_183fb61f,__v24_an_183fb61f,__v21_an_183fb61f,__v27_an_183fb61f,__v20_an_183fb61f,__v17_an_183fb61f,__v15_an_183fb61f,__v12_an_183fb61f");
;
_Dm("___quaternary_plurial_d8ba401b,___set_lang_d8ba401b,__v1_to_string_d8ba401b");
_Dm("__v2_decode_diff_521ef8d5,__v1_decode_diff_521ef8d5");
;
;
_Dm("___poutput_1873e751");




_Dm("__v156_an_b970f080,___public_b970f080");
;
;
;
_Dm("___scrollBy_6faeb85d,__v4_an_6faeb85d,__v1_an_6faeb85d");
_Dm("_S,_BIv,_R,_P,__v125_an,_L,_BIu,_T,_BIt,_U,_BIs,_BIr,_BIq,_BIp,_BIo,_BIn,_BIm,_BIl,_BIk,_BIj,_BIi,_BIh,_BIg,_BIf,_BIe,__v97_an,_BId,_BIc,_BIb,_BIZ,_BIY,_BIX,__v93_an,_BIW,__v92_an,_BIV,__v91_an,__v104_an,_BIU,_BIT,__v105_an,_BIS,_BIR,_BIQ,_BIP,_BIO,_BIN,_BIM,_BIL,_BIK,_BIJ,_BII,_BIH,_BIG,_BIF,_BIE,_BID,_BIC,_BIB,_BIA,_BHy,_BHx,__v85_an,_BHw,__v84_an,__v83_an,_BHv,__v82_an,_BHu,__v81_an,_BHt,_BHs,_BHr,__v78_an,_BHq,_BHp,_BHo,_BHn,_BHm,__v72_an,_BHl,_BHk,__v76_an,__v74_an,_BHj,__v71_an,_BHi,__v70_an,_BHh,_BHg,_BHf,__v68_an,__v69_an,__v67_an,_BHe,__v66_an,_BHd,__v65_an,_BHc,__v64_an,_BHb,__v63_an,_BHZ,__v62_an,_BHY,_BHX,__v60_an,__v61_an,_BHW,_BHV,_BHU,_BHT,__v57_an,_BHS,_BHR,__v55_an,_BHQ,_BHP,_BHO,__v52_an,_BHN,__v51_an,_BHM,__v50_an,_BHL,__v49_an,_BHK,__v48_an,_BHJ,__v47_an,_BHI,__v46_an,_BHH,__v45_an,_BHG,__v44_an,_BHF,__v43_an,__v53_an,__v56_an,__v54_an,_BHE,_BHD,_BHC,_BHB,_BHA,_BGy,_BGx,_BGw,_BGv,_BGu,_BGt,_BGs,_BGr,_BGq,_BGp,_BGo,___coerce,_BGn,_BGm,_BGl,_BGk,_BGj,_BGi,_BGh,_BGg,_BGf,_BGe,_BGd,_BGc,_BGb,_BGZ,_BGY,_BGX,_BGW,_BGV,_BGU,_BGT,_BGS,_BGR,_BGQ,_BGP,_BGO,_BGN,_BGM,__v27_an,__v26_an,_BGL,__v24_an,_BGK,___fa,__v2_fa,__v3_fa,_BGJ,_BGI,_BGH,_BGG,_BGF,_BGE,_BGD,_BGC,_BGB,_BGA,_BFy,_BFx,_BFw,_BFv,_BFu,_BFt,_BFs,_BFr,___print_escaped_char,_BFq,_BFp,_BFo,_BFn,_BFm,_BFl,_BFk,_BFj,_BFi,_BFh,_BFg,_BFf,_BFe,_BFd,_BFc,_BFb,_BFZ,_BFY,_BFX,_BFW,_BFV,_BFU,_BFT,_BFS,_BFR,_BFQ,_BFP,_BFO,_BFN,_BFM,_BFL,_BFK,_BFJ,_BFI,_BFH,_BFG,_BFF,_BFE,_BFD,_BFC,_BFB,_BFA,_BEy,_BEx,_BEw,_BEv,_BEu,_BEt,_BEs,_BEr,_BEq,_BEp,_BEo,_BEn,_BEm,_BEl,_BEk,_BEj,_BEi,_BEh,_BEg,_BEf");
var _BIw = {TyName_args:_LN,TyName_ident:"lint_rule_type"};
var _BIx = {hd:{label:"empty_character_class",ty:_LT},tl:_LS};
var _BIy = {hd:{label:"empty_regexp",ty:_LT},tl:_LS};
var _BJA = {hd:{label:"improve_escaped_char",ty:_LT},tl:_LS};
var _BJB = {hd:{label:"inconsistent_end_anchors",ty:_LT},tl:_LS};
var _BJC = {hd:{label:"inconsistent_start_anchors",ty:_LT},tl:_LS};
var _BJD = {hd:{label:"incorrect_quantifier",ty:_LT},tl:_LS};
var _BJE = {hd:{label:"incorrect_reference",ty:_LT},tl:_LS};
var _BJF = {hd:{label:"invalid_range_in_character_class",ty:_LT},tl:_LS};
var _BJG = {hd:{label:"lazy_character_class",ty:_LT},tl:_LS};
var _BJH = {hd:{label:"non_ideal_quantifier",ty:_LT},tl:_LS};
var _BJI = {hd:{label:"non_optimal_class_range",ty:_LT},tl:_LS};
var _BJJ = {hd:{label:"unused_group",ty:_LT},tl:_LS};
var _BJK = {hd:{label:"useless_non_greedy",ty:_LT},tl:_LS};
var _BJL = {TySum_col:{hd:_BIx,tl:{hd:_BIy,tl:{hd:_BJA,tl:{hd:_BJB,tl:{hd:_BJC,tl:{hd:_BJD,tl:{hd:_BJE,tl:{hd:_BJF,tl:{hd:_BJG,tl:{hd:_BJH,tl:{hd:_BJI,tl:{hd:_BJJ,tl:{hd:_BJK,tl:{nil:_C}}}}}}}}}}}}}}};
var _BJM = {quantifier:_LR,body:_BJL};
var _BJN = _EC("lint_rule_type",_BJM);
function _BEf(a,b){return function (c,d){var e;return (e = c.prev.some,e == null)?{current:{some:d},ll:c.ll,prev:{some:d}}:b(d,e)?{current:{some:a(d,_JQ(c.current))},ll:c.ll,prev:c.prev}:{prev:{some:d},current:{some:d},ll:_Gd(_JQ(c.current),c.ll)};};}
function _BEg(a,b,c){return a = _Kp(_BEf(c,b),a,{prev:{none:_C},current:{none:_C},ll:{nil:_C}}),(b = a.current.some,b != null)?_Gd(b,a.ll):{nil:_C};}
function _BEh(a){var b;return (b = a.atom) && b["char"] != null && a.quantifier.noop?true:b && (b = b.escaped_char) && b.identity_escape != null && a.quantifier.noop?true:false;}
function _BEi(a,b){return _BEh(a) && _BEh(b);}
function _BEj(a){return function (b){var c;return (c = b.atom) && (b = c.escaped_char) && (b = b.identity_escape,b != null)?a.highlight_string_printer?_Fk({hd:"\\",tl:{hd:b,tl:{nil:_C}}}):b:c && (b = c["char"],b != null)?b:"TODO: FIXME";};}
function _BEk(a){return function (b,c){return {id:b.id,atom:{"char":_Fk({hd:_BEj(a)(b),tl:{hd:_BEj(a)(c),tl:{nil:_C}}})},quantifier:{noop:_C},greedy:true};};}
function _BJO(a,b,c){var d;while (true) {switch (a) {case 0:return (a = b.assertion) && (d = a.match_ahead)?{id:b.id,assertion:{match_ahead:_BEl(d,c)}}:a && (a = a.dont_match_ahead)?{id:b.id,assertion:{dont_match_ahead:_BEl(a,c)}}:(a = b.atom)?{id:b.id,atom:_BEo(a,c),quantifier:b.quantifier,greedy:b.greedy}:b;;
case 1:a = c;c = b;b = a;a = 0;;}}}
function _BEn(a){return function (b){return _BJO(1,a,b);};}
function _BEl(a,b){return _Gi(_BEm(b),a,0);}
function _BEo(a,b){var c;return (c = a.group)?{id:a.id,group_id:a.group_id,group:_BEl(c,b)}:(c = a.ncgroup)?{ncgroup:_BEl(c,b)}:a;}
function _BJP(a,b,c){while (true) {switch (a) {case 0:return _Gi(_BEn(c),_BEg(b,_BEi,_BEk(c)),0);;
case 1:a = c;c = b;b = a;a = 0;;}}}
function _BEm(a){return function (b){return _BJP(1,a,b);};}
function _BEp(a){return function (b,c){var d;return c.result?(d = c.elements.some,d == null)?{elements:{some:b},result:true}:(d = _Hi(a)(d,b),d === true?c:d === false?{elements:{some:b},result:false}:_X("<no position available (cons.typed)>: Match failure 5652136")):c;};}
function _BEq(a){return function (b){return _Fh(_BEp(a),b,{elements:{none:_C},result:true}).result;};}
function _BEr(a,b){var c,d;return (c = a.group)?(d = a.group_id,d == b?{ncgroup:_BEs(c,b)}:{id:a.id,group_id:d,group:_BEs(c,b)}):(c = a.group_ref,c != null)?c >= b?{group_ref:c - 1}:{group_ref:c}:a;}
function _BEs(a,b){return _Gi(_BEt(b),a,0);}
function _BJQ(a,b,c){while (true) {switch (a) {case 0:return (a = b.atom)?{id:b.id,atom:_BEr(a,c),quantifier:b.quantifier,greedy:b.greedy}:b;;
case 1:a = c;c = b;b = a;a = 0;;}}}
function _BEu(a){return function (b){return _BJQ(1,a,b);};}
function _BJR(a,b,c){while (true) {switch (a) {case 0:return _Gi(_BEu(c),b,0);;
case 1:a = c;c = b;b = a;a = 0;;}}}
function _BEt(a){return function (b){return _BJR(1,a,b);};}
function _BEv(a,b,c){var d;return a.char_class?(d = a.id,d == b?{id:d,char_class:c}:a):(d = a.group)?{id:a.id,group_id:a.group_id,group:_BEw(d,b,c)}:(d = a.ncgroup)?{ncgroup:_BEw(d,b,c)}:a;}
function _BEw(a,b,c){return _Gi(_BEx(c,b),a,0);}
function _BJS(a,b,c,d){while (true) {switch (a) {case 0:return (a = b.atom)?{id:b.id,atom:_BEv(a,c,d),quantifier:b.quantifier,greedy:b.greedy}:b;;
case 1:a = d;d = b;b = a;a = 0;;}}}
function _BEy(a,b){return function (c){return _BJS(1,a,b,c);};}
function _BJT(a,b,c,d){while (true) {switch (a) {case 0:return _Gi(_BEy(d,c),b,0);;
case 1:a = d;d = b;b = a;a = 0;;}}}
function _BEx(a,b){return function (c){return _BJT(1,a,b,c);};}
function _BFA(a){var b;return (b = a.control_escape,b != null)?_Fk({hd:"\\",tl:{hd:b,tl:{nil:_C}}}):(b = a.control_letter,b != null)?_Fk({hd:"\\c",tl:{hd:b,tl:{nil:_C}}}):(b = a.hex_escape_sequence,b != null)?_Fk({hd:"\\x",tl:{hd:b,tl:{nil:_C}}}):(b = a.unicode_escape_sequence,b != null)?_Fk({hd:"\\u",tl:{hd:b,tl:{nil:_C}}}):(b = a.identity_escape,b != null)?_Fk({hd:"\\",tl:{hd:b,tl:{nil:_C}}}):_Fk({hd:"\\",tl:{hd:a.character_class_escape,tl:{nil:_C}}});}
function _BFB(a){var b;return (b = a.escaped_char)?_BFA(b):a["char"];}
function _BFC(a,b){return _Fk({hd:b || b,tl:{hd:(b = a.class_atom)?_BFB(b):_Fk({hd:_BFB(a.start_char),tl:{hd:"-",tl:{hd:_BFB(a.end_char),tl:{nil:_C}}}}),tl:{nil:_C}}});}
function _BFD(a){var b;return b = _Fh(_BFC,a.class_ranges,""),a.neg?_Fk({hd:"[^",tl:{hd:b,tl:{hd:"]",tl:{nil:_C}}}}):_Fk({hd:"[",tl:{hd:b,tl:{hd:"]",tl:{nil:_C}}}});}
function _BFE(a,b,c,d){return function (e){var f;return e.noop?"":e.star?"*":e.plus?"+":e.qmark?"?":(f = e.exactly,f != null)?_Fk({hd:"{",tl:{hd:_HQ(a)(f),tl:{hd:"}",tl:{nil:_C}}}}):(f = e.at_least,f != null)?_Fk({hd:"{",tl:{hd:_HQ(b)(f),tl:{hd:",}",tl:{nil:_C}}}}):_Fk({hd:"{",tl:{hd:_HQ(c)(e.min),tl:{hd:",",tl:{hd:_HQ(d)(e.max),tl:{hd:"}",tl:{nil:_C}}}}}});};}
function _BFF(a){return _JA("|",_Gi(_BFG,a,0));}
function _BFG(a){return _Fh(_BFH,a,"");}
function _BFI(a){var b;return a.dot?".":(b = a["char"],b != null)?b:(b = a.group_ref,b != null)?_Fk({hd:"\\",tl:{hd:"" + b,tl:{nil:_C}}}):(b = a.escaped_char)?_BFA(b):(b = a.ncgroup)?_Fk({hd:"(?:",tl:{hd:_BFF(b),tl:{hd:")",tl:{nil:_C}}}}):(b = a.group)?_Fk({hd:"(",tl:{hd:_BFF(b),tl:{hd:")",tl:{nil:_C}}}}):(b = a.char_class)?_BFD(b):_Fk({hd:"\\",tl:{hd:a.character_class_escape,tl:{nil:_C}}});}
function _BFH(a,b){return _Fk({hd:b,tl:{hd:_BJU(0,a),tl:{nil:_C}}});}
function _BJU(a,b){var c;while (true) {switch (a) {case 0:if (c = b.assertion) {b = c;} else {return _Fk({hd:_BFI(b.atom),tl:{hd:_BFE(_Lr,_Lr,_Lr,_Lr)(b.quantifier),tl:{hd:b.greedy?"":"?",tl:{nil:_C}}}});};
case 1:return b.anchor_start?"^":b.anchor_end?"$":b.match_word_boundary?"\\b":b.dont_match_word_boundary?"\\B":(c = b.match_ahead)?_Fk({hd:"(?=",tl:{hd:_BFF(c),tl:{hd:")",tl:{nil:_C}}}}):_Fk({hd:"(?!",tl:{hd:_BFF(b.dont_match_ahead),tl:{hd:")",tl:{nil:_C}}}});;}}}
function _BFJ(a){var b;return (b = a.control_escape,b != null)?b == "f"?12:b == "n"?10:b == "r"?13:b == "t"?9:b == "v"?11:0:(b = a.control_letter,b != null)?_Bb(b) % 32:(b = a.hex_escape_sequence,b != null)?(b = _TD(_Sf,b).some,b != null)?b:0:(b = a.unicode_escape_sequence,b != null)?(b = _TD(_Sf,b).some,b != null)?b:0:(b = a.identity_escape,b != null)?b == "b"?8:_Bb(b):_Bb(a.character_class_escape);}
function _BFK(a){var b;return (b = a.escaped_char)?_BFJ(b):_Bb(a["char"]);}
function _BFL(a,b){var c;return _UO(_BIw).mem(b.lint_rule,a.matched_rules)?a:(c = _UO(_BIw).add(b.lint_rule,a.matched_rules),{errors:_Gd(b,a.errors),groups:a.groups,groups_referenced:a.groups_referenced,matched_rules:c});}
function _BFM(a,b){var d,c,g,f,e;return (c = a.end_char)?(d = a.start_char,e = _BFK(d),a = _BFK(c),f = _BFB(d),g = _BFB(c),e > a?_BFL(b,{lint_rule:{invalid_range_in_character_class:_C},title:"invalid range in character class",body:_Fk({hd:"[",tl:{hd:f,tl:{hd:"-",tl:{hd:g,tl:{hd:"] is invalid.",tl:{nil:_C}}}}}}),"class":"alert-error",patch:{none:_C}}):((a = d["char"],a != null) && a === "A"?(a = c["char"],a != null) && a === "z"?true:false:false)?_BFL(b,{lint_rule:{lazy_character_class:_C},title:"programmer laziness",body:"When you write A-z instead of A-Za-z, you are matching on 6 extra characters!","class":"",patch:{none:_C}}):b):b;}
function _BFN(a,b,c){while (true) {var d =_UR.add(a,c);if (a == b) {return d;} else {a++;c = d;}}}
function _BFO(a,b){var c;return (c = a.control_escape,c != null)?c == "f"?_UR.add(12,b):c == "n"?_UR.add(10,b):c == "r"?_UR.add(13,b):c == "t"?_UR.add(9,b):c == "v"?_UR.add(11,b):b:(c = a.control_letter,c != null)?_UR.add(_Bb(c) % 32,b):(c = a.hex_escape_sequence,c != null)?(c = _TD(_Sf,c).some,c != null)?_UR.add(c,b):b:(c = a.unicode_escape_sequence,c != null)?(c = _TD(_Sf,c).some,c != null)?_UR.add(c,b):b:(c = a.identity_escape,c != null)?c == "b"?_UR.add(8,b):_UR.add(_Bb(c),b):(c = a.character_class_escape,c == "d"?_BFN(_Bb("0"),_Bb("9"),b):c == "D"?b:c == "s"?_UR.add(160,_UR.add(32,_UR.add(13,_UR.add(12,_UR.add(11,_UR.add(10,_UR.add(9,b))))))):c == "S"?b:c == "w"?(c = _BFN(_Bb("0"),_Bb("9"),b),c = _BFN(_Bb("a"),_Bb("z"),c),c = _BFN(_Bb("A"),_Bb("Z"),c),_UR.add(_Bb("_"),c)):c == "W"?b:b);}
function _BFP(a,b){var c;return (c = a.escaped_char)?_BFO(c,b):_UR.add(_Bb(a["char"]),b);}
function _BFQ(a){return _JC("0",2,_CI(_KD(a,"")));}
function _BFR(a){return _JC("0",4,_CI(_KD(a,"")));}
function _BFS(a){return a < 33?{escaped_char:{hex_escape_sequence:_BFQ(a)}}:a >= 91 && a <= 93?{escaped_char:{identity_escape:_Ie(_Ig(a))}}:a < 127?{"char":_Ie(_Ig(a))}:a < 256?{escaped_char:{hex_escape_sequence:_BFQ(a)}}:{escaped_char:{unicode_escape_sequence:_BFR(a)}};}
function _BFT(a,b,c,d){while (true) {var e =_UR.remove(b,c);if (_UR.mem(b + 1,e)) {b++;c = e;} else {if (a == b) {return {f1:_Gd({class_atom:_BFS(a)},d),f2:e};} else {if (a + 1 == b) {var f =_Gd({class_atom:_BFS(a)},d);return {f1:_Gd({class_atom:_BFS(b)},f),f2:e};} else {return {f1:_Gd({start_char:_BFS(a),end_char:_BFS(b)},d),f2:e};}}}}}
function _BFU(a,b){while (!_UR.is_empty(a)) {var c =_RL.min_binding(a).f1;c = _BFT(c,c,a,b);a = c.f2;b = c.f1;}return b;}
function _BFV(a,b){var c;return (c = b.class_atom) && (c = c["char"],c != null) && c === "-"?{ll:a.ll,dash:true}:{ll:_Gd(b,a.ll),dash:a.dash};}
function _BFW(a){return a = _Kp(_BFV,_BFU(a,{nil:_C}),{ll:{nil:_C},dash:false}),_Gf(a.dash?_Gd({class_atom:{"char":"-"}},a.ll):a.ll);}
function _BFX(a,b){var c;return (c = a.class_atom)?_BFP(c,b):_BFN(_BFK(a.start_char),_BFK(a.end_char),b);}
function _BFY(a,b,c,d){var e,f;return _UO(_BJL).mem({invalid_range_in_character_class:_C},d.matched_rules) || (_UO(_BJL).mem({non_optimal_class_range:_C},d.matched_rules) || _UO(_BJL).mem({lazy_character_class:_C},d.matched_rules))?d:(e = {class_ranges:_BFW(_Fh(_BFX,c.class_ranges,_RL.empty)),neg:c.neg},f = _BFD(e),c = _BFD(c),f != c?(e = _BEw(a,b,e),_BFL(d,{lint_rule:{non_optimal_class_range:_C},title:"non optimal character range",body:_Fk({hd:"A shorter/cleaner way to write ",tl:{hd:c,tl:{hd:" is ",tl:{hd:f,tl:{nil:_C}}}}}),"class":"",patch:{some:_BFF(e)}})):d);}
function _BFZ(a,b,c,d){return d = _BFY(a,b,c,_Fh(_BFM,c.class_ranges,d)),_Fl(c.class_ranges)?_BFL(d,c.neg?{lint_rule:{empty_character_class:_C},title:"empty negative character class",body:"[^] is equivalent to . and will match any character. It is however not cross-browser safe.","class":"",patch:{none:_C}}:{lint_rule:{empty_character_class:_C},title:"empty character class",body:"[] is an empty character class and will never match. It is however not cross-browser safe.","class":"",patch:{none:_C}}):d;}
function _BFb(a){var b,c;return b = {hd:"^",tl:{hd:"$",tl:{hd:"\\",tl:{hd:"/",tl:{hd:".",tl:{hd:"*",tl:{hd:"+",tl:{hd:"?",tl:{hd:"(",tl:{hd:")",tl:{hd:"[",tl:{hd:"]",tl:{hd:"{",tl:{hd:"}",tl:{hd:"|",tl:{nil:_C}}}}}}}}}}}}}}}},c = _Ie(_Ig(a)),a == 10?{escaped_char:{control_escape:"n"}}:a < 33?{escaped_char:{hex_escape_sequence:_BFQ(a)}}:(b = _KW(_LW)(c,b),b === true?{escaped_char:{control_escape:c}}:b === false?a < 127?{"char":c}:a < 256?{escaped_char:{hex_escape_sequence:_BFQ(a)}}:{escaped_char:{unicode_escape_sequence:_BFR(a)}}:_X("<no position available (cons.typed)>: Match failure 443359"));}
function _BFc(a,b){var d,c;return c = _BFb(_BFJ(a)),a = _BFA(a),d = _BFI(c),c["char"] != null?_BFL(b,{lint_rule:{improve_escaped_char:_C},title:"improve escaped character",body:_Fk({hd:a,tl:{hd:" can simply be written as ",tl:{hd:d,tl:{hd:".",tl:{nil:_C}}}}}),"class":"",patch:{none:_C}}):c.escaped_char?d != a?_BFL(b,{lint_rule:{improve_escaped_char:_C},title:"improve escaped character",body:_Fk({hd:a,tl:{hd:" can simply be written as ",tl:{hd:d,tl:{hd:".",tl:{nil:_C}}}}}),"class":"",patch:{none:_C}}):b:b;}
function _BJV(a,b,c){var d;while (true) {switch (a) {case 0:return _Fh(_BFd,b,c);;
case 1:if (c.at_start) {if (d = b.hd) {b = d;} else {return {at_start:true,result:{hd:false,tl:{nil:_C}}};}} else {if ((d = b.tl) && d.nil) {b = b.hd;} else {if (d) {b = d;a = 1;
continue;} else {return {at_start:false,result:{hd:false,tl:{nil:_C}}};}}};
case 2:if (c.at_start) {if ((d = b.assertion) && d.anchor_start) {return {at_start:true,result:_Gd(true,c.result)};} else {if (d && d.anchor_end) {return {at_start:true,result:_Gd(false,c.result)};} else {if (d && d.match_ahead) {return {at_start:true,result:_Gd(true,c.result)};} else {if (d && d.dont_match_ahead) {return {at_start:true,result:_Gd(true,c.result)};} else {if (d && d.match_word_boundary) {return {at_start:true,result:_Gd(true,c.result)};} else {if (d) {return {at_start:true,result:_Gd(true,c.result)};} else {b = b.atom;}}}}}}} else {if ((d = b.assertion) && d.anchor_start) {return {at_start:false,result:_Gd(false,c.result)};} else {if (d && d.anchor_end) {return {at_start:false,result:_Gd(true,c.result)};} else {if (d && d.match_ahead) {return {at_start:true,result:_Gd(true,c.result)};} else {if (d && d.dont_match_ahead) {return {at_start:true,result:_Gd(true,c.result)};} else {if (d && d.match_word_boundary) {return {at_start:true,result:_Gd(true,c.result)};} else {if (d) {return {at_start:true,result:_Gd(true,c.result)};} else {b = b.atom;}}}}}}};
case 3:if (d = b.group) {b = d;a = 0;} else {if (d = b.ncgroup) {b = d;a = 0;} else {return {at_start:c.at_start,result:_Gd(false,c.result)};}};}}}
function _BFd(a,b){return _BJV(1,a,b);}
function _BFe(a,b,c){return _BEq(_Mi)(_BJV(0,b,{at_start:a,result:{nil:_C}}).result)?c:_BFL(c,a?{lint_rule:{inconsistent_start_anchors:_C},title:"inconsistent anchors",body:"start anchor is only applied in some cases","class":"alert-info",patch:{none:_C}}:{lint_rule:{inconsistent_end_anchors:_C},title:"inconsistent anchors",body:"end anchor is only applied in some cases","class":"alert-info",patch:{none:_C}});}
function _BFf(a,b){return _BFe(false,a,_BFe(true,a,b));}
function _BFg(a,b){while (a != 0) {if (_UR.mem(a,b)) {a--;} else {return {some:a};}}return {none:_C};}
function _BFh(a,b){var c;return (c = _BFg(_UR.size(b.groups),b.groups_referenced).some,c == null)?b:_BFL(b,{lint_rule:{unused_group:_C},title:"unused group",body:"some groups are not referenced, consider using non capturing groups: (?:...)","class":"",patch:{some:_BFF(_BEs(a,c))}});}
function _BFi(a,b,c){var e,d;return (d = a.max,d != null)?(e = a.min,e > d?_BFL(c,{lint_rule:{incorrect_quantifier:_C},title:"incorrect quantifier",body:"min is greater than max","class":"alert-error",patch:{none:_C}}):e == d?_BFL(c,{lint_rule:{non_ideal_quantifier:_C},title:"improve the quantifier",body:_Fk({hd:"{",tl:{hd:"" + e,tl:{hd:",",tl:{hd:"" + d,tl:{hd:"} can be written as {",tl:{hd:"" + e,tl:{hd:"}",tl:{nil:_C}}}}}}}}),"class":"",patch:{none:_C}}):(e == 0?d == 1?true:false:false)?_BFL(c,{lint_rule:{non_ideal_quantifier:_C},title:"improve the quantifier",body:"{0,1} can be written as ?","class":"",patch:{none:_C}}):c):(e = a.at_least,e != null) && e === 0?_BFL(c,{lint_rule:{non_ideal_quantifier:_C},title:"improve the quantifier",body:"{0,} can be written as *","class":"",patch:{none:_C}}):e != null && e === 1?_BFL(c,{lint_rule:{non_ideal_quantifier:_C},title:"improve the quantifier",body:"{1,} can be written as +","class":"",patch:{none:_C}}):(e = a.exactly,e != null)?b?e == 0?_BFL(c,{lint_rule:{non_ideal_quantifier:_C},title:"remove the quantifier",body:"{0} makes no sense.","class":"alert-error",patch:{none:_C}}):e == 1?_BFL(c,{lint_rule:{non_ideal_quantifier:_C},title:"remove the quantifier",body:"{1} makes no sense.","class":"",patch:{none:_C}}):c:_BFL(c,{lint_rule:{useless_non_greedy:_C},title:"useless non greedy",body:"when matching an exact amount, using non greddy makes no sense","class":"",patch:{none:_C}}):c;}
function _BJW(a,b,c,d){while (true) {switch (a) {case 0:return _Fh(_BFj(b),c,d);;
case 1:a = 0;;}}}
function _BFk(a){return function (b,c){return _BJW(1,a,b,c);};}
function _BJX(a,b,c,d){var e;while (true) {switch (a) {case 0:return (a = c.hd) && a.nil && c.tl.nil?_BFL(d,{lint_rule:{empty_regexp:_C},title:"empty regexp",body:"javascript does not let you write empty regular expressions since // starts a line comment.","class":"alert-error",patch:{some:"/(?:)/"}}):_Fh(_BFk(b),c,d);;
case 1:if (e = c.atom) {a = _BFi(c.quantifier,c.greedy,d);c = e;d = a;} else {return d;};
case 2:if (a = c.group) {a = _BJX(0,b,a,d);return {errors:a.errors,groups:_UR.add(c.group_id,a.groups),groups_referenced:a.groups_referenced,matched_rules:a.matched_rules};} else {if (a = c.ncgroup) {c = a;a = 0;
continue;} else {if (a = c.group_ref,a != null) {e = _UR.mem(a,d.groups)?d:_BFL(d,{lint_rule:{incorrect_reference:_C},title:"incorrect reference",body:_Fk({hd:"\\",tl:{hd:"" + a,tl:{hd:" refers to an invalid capture group",tl:{nil:_C}}}}),"class":"alert-error",patch:{none:_C}});return {errors:e.errors,groups:e.groups,groups_referenced:_UR.add(a,e.groups_referenced),matched_rules:e.matched_rules};} else {return (a = c.escaped_char)?_BFc(a,d):(a = c.char_class)?_BFZ(b,c.id,a,d):d;}}};
case 3:a = 1;;}}}
function _BFj(a){return function (b,c){return _BJX(3,a,b,c);};}
function _BFl(a){return _BFf(a,_BFh(a,_BJX(0,a,a,{matched_rules:_UO(_BIw).empty,errors:{nil:_C},groups:_UR.empty,groups_referenced:_UR.empty})));}
function _BFm(a){return function (b){return _tL(_sm("" + a),"highlight"),_OZ;};}
function _BFn(a){return {some:_BFm(a)};}
function _BFo(a){return function (b){return _tM(_sm("" + a),"highlight"),_OZ;};}
function _BFp(a){return {some:_BFo(a)};}
function _BFq(a,b){var c;return a = {f1:a,f2:b},(c = a.f1,c.noop)?{fragment:{nil:_C}}:(b = c.star) && !a.f2?{text:"0-∞"}:b && a.f2?{text:"∞-0"}:(b = c.plus) && !a.f2?{text:"1-∞"}:b && a.f2?{text:"∞-1"}:(b = c.qmark) && !a.f2?{text:"0-1"}:b && a.f2?{text:"1-0"}:(b = c.exactly,b != null)?_rD(b):(b = c.at_least,b != null) && !a.f2?{fragment:{hd:_rD(b),tl:{hd:{text:"-∞"},tl:{nil:_C}}}}:b != null && a.f2?{fragment:{hd:{text:"∞-"},tl:{hd:_rD(b),tl:{nil:_C}}}}:(b = c.max,b != null) && !a.f2?{fragment:{hd:_rD(c.min),tl:{hd:{text:"-"},tl:{hd:_rD(b),tl:{nil:_C}}}}}:b != null && a.f2?{fragment:{hd:_rD(b),tl:{hd:{text:"-"},tl:{hd:_rD(c.min),tl:{nil:_C}}}}}:_X("File \"pretty_printers/svg_printer.opa\", line 462, characters 13-30, (462:13-462:30 | 16319-16336): Match failure 8890857");}
function _BFr(a){var b;return (b = a.escaped_char)?_BFA(b):(b = a["char"],b == " "?"⎵":b);}
function _BFs(a,b){var c;return (c = a.tl)?c.nil?a.hd:_Fk({hd:a.hd,tl:{hd:b,tl:{hd:_BFs(c,b),tl:{nil:_C}}}}):"";}
function _BFt(a){var b;return (b = a.class_atom)?_BFr(b):_Fk({hd:_BFr(a.start_char),tl:{hd:"-",tl:{hd:_BFr(a.end_char),tl:{nil:_C}}}});}
function _BFu(a,b,c){var d;return d = _BFs(_Gi(_BFt,b.class_ranges,0)," "),{node:{label:b.neg?_Fk({hd:"[^",tl:{hd:d,tl:{hd:"]",tl:{nil:_C}}}}):_Fk({hd:"[",tl:{hd:d,tl:{hd:"]",tl:{nil:_C}}}}),extra:c,width:0,height:0,x:0,y:0,color:_qY,mouseenter:_BFn(a),mouseleave:_BFp(a)}};}
function _BFv(a,b,c){return {node:{label:_BFA(b),extra:c,width:0,height:0,x:0,y:0,color:_qZ,mouseenter:_BFn(a),mouseleave:_BFp(a)}};}
function _BFw(a){return _Fl(a)?{node:{label:"∅",extra:{fragment:{nil:_C}},width:0,height:0,x:0,y:0,color:_qZ,mouseenter:{none:_C},mouseleave:{none:_C}}}:{seq:{group_id:{none:_C},width:0,height:0,x:0,y:0,border:0,items:_Gi(_BFx,a,0),extra:{fragment:{nil:_C}},mouseenter:{none:_C},mouseleave:{none:_C}}};}
function _BFy(a){return {choice:{width:0,height:0,items:_Gi(_BFw,a,0)}};}
function _BJY(a,b,c,d,e){var g,f;while (true) {switch (a) {case 0:if (f = b.atom) {e = b.greedy;g = b.quantifier;b = b.id;c = f;d = g;} else {if (f = b.assertion,f.anchor_start) {g = b.id;return {node:{label:"^",extra:{fragment:{nil:_C}},width:0,height:0,x:0,y:0,color:_qZ,mouseenter:_BFn(g),mouseleave:_BFp(g)}};} else {if (f.anchor_end) {g = b.id;return {node:{label:"$",extra:{fragment:{nil:_C}},width:0,height:0,x:0,y:0,color:_qZ,mouseenter:_BFn(g),mouseleave:_BFp(g)}};} else {if (f.match_word_boundary) {g = b.id;return {node:{label:"\\b",extra:{fragment:{nil:_C}},width:0,height:0,x:0,y:0,color:_qZ,mouseenter:_BFn(g),mouseleave:_BFp(g)}};} else {if (f.dont_match_word_boundary) {g = b.id;return {node:{label:"\\B",extra:{fragment:{nil:_C}},width:0,height:0,x:0,y:0,color:_qZ,mouseenter:_BFn(g),mouseleave:_BFp(g)}};} else {if (g = f.match_ahead) {f = b.id;return {seq:{group_id:{some:"?="},width:0,height:0,x:0,y:0,border:20,items:{hd:_BFy(g),tl:{nil:_C}},extra:{fragment:{nil:_C}},mouseenter:_BFn(f),mouseleave:_BFp(f)}};} else {g = b.id;return {seq:{group_id:{some:"?!"},width:0,height:0,x:0,y:0,border:20,items:{hd:_BFy(f.dont_match_ahead),tl:{nil:_C}},extra:{fragment:{nil:_C}},mouseenter:_BFn(g),mouseleave:_BFp(g)}};}}}}}};
case 1:f = _BFq(d,e);return (g = c["char"],g != null)?{node:{label:g == " "?"⎵":g,extra:f,width:0,height:0,x:0,y:0,color:_qY,mouseenter:_BFn(b),mouseleave:_BFp(b)}}:c.dot?{node:{label:".",extra:f,width:0,height:0,x:0,y:0,color:_qZ,mouseenter:_BFn(b),mouseleave:_BFp(b)}}:(g = c.character_class_escape,g != null)?{node:{label:_Fk({hd:"\\",tl:{hd:g,tl:{nil:_C}}}),extra:f,width:0,height:0,x:0,y:0,color:_qZ,mouseenter:_BFn(b),mouseleave:_BFp(b)}}:(g = c.escaped_char)?_BFv(b,g,f):(g = c.group_ref,g != null)?{node:{label:_Fk({hd:"\\",tl:{hd:"" + g,tl:{nil:_C}}}),extra:f,width:0,height:0,x:0,y:0,color:_qZ,mouseenter:_BFn(b),mouseleave:_BFp(b)}}:(g = c.group)?{seq:{group_id:{some:"" + c.group_id},width:0,height:0,x:0,y:0,border:20,items:{hd:_BFy(g),tl:{nil:_C}},extra:f,mouseenter:_BFn(b),mouseleave:_BFp(b)}}:(g = c.ncgroup)?{seq:{group_id:{none:_C},width:0,height:0,x:0,y:0,border:20,items:{hd:_BFy(g),tl:{nil:_C}},extra:f,mouseenter:_BFn(b),mouseleave:_BFp(b)}}:_BFu(b,c.char_class,f);;}}}
function _BFx(a){return _BJY(0,a);}
function _BGA(a){var b;return (b = a.node)?{width:b.width,height:b.height}:(b = a.choice)?{width:b.width,height:b.height}:(b = a.seq,{width:b.width,height:b.height});}
function _BJZ(a,b,c,d,e){while (true) {switch (a) {case 0:if (a = b.node) {return {node:{color:a.color,extra:a.extra,height:d,label:a.label,mouseenter:a.mouseenter,mouseleave:a.mouseleave,width:c,x:a.x,y:a.y}};} else {if (a = b.choice) {return {choice:{width:c,height:d,items:_Gi(_BGC(c,_CQ((d - a.height) / _GA(0,a.items))),a.items,0)}};} else {a = b.seq;return {seq:{border:a.border,extra:a.extra,group_id:a.group_id,height:d,items:_Gi(_BGB(d,a,_CQ((c - a.width - a.border) / _GA(0,a.items))),a.items,0),mouseenter:a.mouseenter,mouseleave:a.mouseleave,width:c,x:a.x,y:a.y}};}};
case 1:a = d;d = _BGA(d).height + c;c = b;b = a;a = 0;continue;;
case 2:a = _BGA(e).width + d;d = b - c.border;c = a;b = e;a = 0;;}}}
function _BGC(a,b){return function (c){return _BJZ(1,a,b,c);};}
function _BGB(a,b,c){return function (d){return _BJZ(2,a,b,c,d);};}
function _BGD(a,b){return a = _BGA(a),{max_width:_Hp(b.max_width,a.width),sum_width:b.sum_width + a.width,max_height:_Hp(b.max_height,a.height),sum_height:b.sum_height + a.height};}
function _BGE(a){return _Fh(_BGD,a,{max_width:0,sum_width:0,max_height:0,sum_height:0});}
function _BGH(a,b){return a = _BGG(a,b.x,b.y),{x:b.x + _BGA(a).width,y:b.y,l:_Gd(a,b.l)};}
function _BGG(a,b,c){var d;return (d = a.node)?{node:{color:d.color,extra:d.extra,height:d.height,label:d.label,mouseenter:d.mouseenter,mouseleave:d.mouseleave,width:d.width,x:b,y:c}}:(d = a.choice)?{choice:{height:d.height,items:_Fh(_BGF,d.items,{x:b,y:c,l:{nil:_C}}).l,width:d.width}}:(d = a.seq,{seq:{border:d.border,extra:d.extra,group_id:d.group_id,height:d.height,items:_Fh(_BGH,d.items,{x:b + _BZ(d.border,2),y:c + _BZ(d.border,2),l:{nil:_C}}).l,mouseenter:d.mouseenter,mouseleave:d.mouseleave,width:d.width,x:b,y:c}});}
function _BGF(a,b){return a = _BGG(a,b.x,b.y),{x:b.x,y:b.y + _BGA(a).height,l:_Gd(a,b.l)};}
function _BGI(a){var c,b;return (b = a.node)?{node:{color:b.color,extra:b.extra,height:80,label:b.label,mouseenter:b.mouseenter,mouseleave:b.mouseleave,width:_Hp(70 + b.label.length * 7,90),x:b.x,y:b.y}}:(b = a.choice)?(b = _Gi(_BGI,b.items,0),a = _BGE(b),{choice:{height:a.sum_height,items:b,width:a.max_width}}):(c = a.seq,b = _Gi(_BGI,c.items,0),a = _BGE(b),{seq:{border:c.border,extra:c.extra,group_id:c.group_id,height:a.max_height + _BZ(c.border,2),items:b,mouseenter:c.mouseenter,mouseleave:c.mouseleave,width:a.sum_width,x:c.x,y:c.y}});}
function _BGJ(a){var b;return b = _BGI(a),a = _BGA(b),_BGG(_BJZ(0,b,a.width,a.height),1,1);}
function _BJb(a){return function (b){return a(b);};}
function _BGK(a){return _OZ;}
function _BGL(a){var h,g,f,e,d,c,b;return b = a.x + _BZ(a.width,2),c = a.y + _BZ(a.height,2),d = _Hp(10 + a.label.length * 7,30),e = _qM(a.color),f = _Fk({hd:"fill:",tl:{hd:e,tl:{hd:";font-size: 15px;text-anchor:middle;",tl:{nil:_C}}}}),g = _Fk({hd:"fill:",tl:{hd:e,tl:{hd:";font-size: 10px;text-anchor:middle;",tl:{nil:_C}}}}),{namespace:"svg",tag:"g",args:{nil:_C},specific_attributes:{some:{"class":{nil:_C},style:{nil:_C},bool_attributes:{nil:_C},events:{hd:{name:{mouseenter:_C},value:{expr:_BJb((h = a.mouseenter.some)?h:_BGK)}},tl:{hd:{name:{mouseleave:_C},value:{expr:_BJb((h = a.mouseleave.some)?h:_BGK)}},tl:{nil:_C}}},events_options:{nil:_C},href:{none:_C}}},xmlns:{nil:_C},content:{hd:{text:"\n"},tl:{hd:{namespace:"svg",tag:"rect",args:{hd:{namespace:"",name:"x",value:"" + (b - _BZ(d,2))},tl:{hd:{namespace:"",name:"y",value:"" + (c - _BZ(30,2))},tl:{hd:{namespace:"",name:"rx",value:"20"},tl:{hd:{namespace:"",name:"ry",value:"20"},tl:{hd:{namespace:"",name:"width",value:"" + d},tl:{hd:{namespace:"",name:"height",value:"30"},tl:{hd:{namespace:"",name:"style",value:_Fk({hd:"fill:white; stroke:",tl:{hd:e,tl:{hd:";stroke-width:1",tl:{nil:_C}}}})},tl:{nil:_C}}}}}}}},content:{nil:_C},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{text:"\n"},tl:{hd:{namespace:"svg",tag:"text",args:{hd:{namespace:"",name:"x",value:"" + b},tl:{hd:{namespace:"",name:"y",value:"" + (c + 5)},tl:{hd:{namespace:"",name:"style",value:f},tl:{nil:_C}}}},content:{hd:_rC(a.label),tl:{nil:_C}},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{text:"\n"},tl:{hd:{namespace:"svg",tag:"text",args:{hd:{namespace:"",name:"x",value:"" + b},tl:{hd:{namespace:"",name:"y",value:"" + (c - 20)},tl:{hd:{namespace:"",name:"style",value:g},tl:{nil:_C}}}},content:{hd:a.extra,tl:{nil:_C}},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{text:"\n"},tl:{nil:_C}}}}}}}}};}
function _BGM(a,b){return {fragment:{hd:b,tl:{hd:_BJc(0,a),tl:{nil:_C}}}};}
function _BJc(a,b){var d,c;while (true) {switch (a) {case 0:if (c = b.node) {return _BGL(c);} else {if (c = b.choice) {b = c.items;} else {d = b.seq;var f =_BJc(1,d.items),e =(c = d.mouseenter.some)?c:_BGK;c = (c = d.mouseleave.some)?c:_BGK;return {fragment:{hd:{text:"\n"},tl:{hd:d.border > 0?{namespace:"svg",tag:"rect",args:{hd:{namespace:"",name:"x",value:"" + d.x},tl:{hd:{namespace:"",name:"y",value:"" + d.y},tl:{hd:{namespace:"",name:"rx",value:"5"},tl:{hd:{namespace:"",name:"ry",value:"5"},tl:{hd:{namespace:"",name:"width",value:"" + d.width},tl:{hd:{namespace:"",name:"height",value:"" + d.height},tl:{hd:{namespace:"",name:"style",value:"fill: white; stroke: #dc143c; stroke-width: 1;"},tl:{nil:_C}}}}}}}},specific_attributes:{some:{"class":{nil:_C},style:{nil:_C},bool_attributes:{nil:_C},events:{hd:{name:{mouseenter:_C},value:{expr:_BJb(e)}},tl:{hd:{name:{mouseleave:_C},value:{expr:_BJb(c)}},tl:{nil:_C}}},events_options:{nil:_C},href:{none:_C}}},xmlns:{nil:_C},content:{nil:_C}}:{fragment:{nil:_C}},tl:{hd:{text:"\n"},tl:{hd:(c = d.group_id.some,c != null)?{namespace:"svg",tag:"text",args:{hd:{namespace:"",name:"style",value:"fill:#dc143c; font-size:12px; text-anchor:start;"},tl:{hd:{namespace:"",name:"x",value:"" + (d.x + 2)},tl:{hd:{namespace:"",name:"y",value:"" + (d.y + 12)},tl:{hd:{namespace:"",name:"height",value:"8"},tl:{nil:_C}}}}},content:{hd:_rC(c),tl:{nil:_C}},xmlns:{nil:_C},specific_attributes:{none:_C}}:{fragment:{nil:_C}},tl:{hd:{text:"\n"},tl:{hd:f,tl:{hd:{text:"\n"},tl:{hd:{namespace:"svg",tag:"text",args:{hd:{namespace:"",name:"x",value:"" + (d.x + d.width - 2)},tl:{hd:{namespace:"",name:"y",value:"" + (d.y + 10)},tl:{hd:{namespace:"",name:"style",value:"fill:#dc143c; font-size:10px; text-anchor:end;"},tl:{nil:_C}}}},content:{hd:d.extra,tl:{nil:_C}},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{text:"\n"},tl:{nil:_C}}}}}}}}}}};}};
case 1:return _Fh(_BGM,b,{fragment:{nil:_C}});;}}}
function _BGN(a){return function (b,c){return _Gd({f1:b,f2:a},c);};}
function _BGO(a){return function (b,c){return b = _BJd(0,b,a,c.pairs),{pairs:b.pairs,prev:_Hs(b.prev,c.prev)};};}
function _BJd(a,b,c,d){while (true) {switch (a) {case 0:return (a = b.node)?{pairs:_Fh(_BGN(a),c,d),prev:{hd:a,tl:{nil:_C}}}:(a = b.choice)?_Fh(_BGO(c),a.items,{pairs:d,prev:{nil:_C}}):_Fh(_BGP,b.seq.items,{pairs:d,prev:c});;
case 1:d = c.pairs;c = c.prev;a = 0;;}}}
function _BGP(a,b){return _BJd(1,a,b);}
function _BGQ(a,b){var d,c,g,f,e;return c = a.f1,d = a.f2,a = d.x + _BZ(_Hp(10 + d.label.length * 7,30),2) + _BZ(d.width,2),d = d.y + _BZ(d.height,2),e = c.x - _BZ(_Hp(10 + c.label.length * 7,30),2) + _BZ(c.width,2),c = c.y + _BZ(c.height,2),f = a + _BZ((e - a) * 2,3),g = e - _BZ((e - a) * 2,3),{fragment:{hd:{text:"\n"},tl:{hd:b,tl:{hd:{text:"\n"},tl:{hd:{namespace:"svg",tag:"path",args:{hd:{namespace:"",name:"d",value:_Fk({hd:"M",tl:{hd:"" + e,tl:{hd:",",tl:{hd:"" + c,tl:{hd:" L",tl:{hd:"" + (e - 7),tl:{hd:",",tl:{hd:"" + (c - 4),tl:{hd:" L",tl:{hd:"" + (e - 5),tl:{hd:",",tl:{hd:"" + c,tl:{hd:" L",tl:{hd:"" + (e - 7),tl:{hd:",",tl:{hd:"" + (c + 4),tl:{hd:" L",tl:{hd:"" + e,tl:{hd:",",tl:{hd:"" + c,tl:{nil:_C}}}}}}}}}}}}}}}}}}}}})},tl:{hd:{namespace:"",name:"style",value:"fill:rgb(0,0,0); stroke:rgb(0,0,0);stroke-width:2"},tl:{nil:_C}}},content:{nil:_C},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{text:"\n"},tl:{hd:{namespace:"svg",tag:"path",args:{hd:{namespace:"",name:"d",value:_Fk({hd:"M",tl:{hd:"" + a,tl:{hd:",",tl:{hd:"" + d,tl:{hd:" C",tl:{hd:"" + f,tl:{hd:",",tl:{hd:"" + d,tl:{hd:" ",tl:{hd:"" + g,tl:{hd:",",tl:{hd:"" + c,tl:{hd:" ",tl:{hd:"" + e,tl:{hd:",",tl:{hd:"" + c,tl:{nil:_C}}}}}}}}}}}}}}}}})},tl:{hd:{namespace:"",name:"style",value:"fill:none; stroke:rgb(0,0,0);stroke-width:2"},tl:{nil:_C}}},content:{nil:_C},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{text:"\n"},tl:{nil:_C}}}}}}}}};}
function _BGR(a){return _Fh(_BGQ,_BJd(0,a,{nil:_C},{nil:_C}).pairs,{fragment:{nil:_C}});}
function _BGS(a){var c,b;return a = _BGJ(_BFy(a)),b = _BJc(0,a),c = _BGR(a),a = _BGA(a),{namespace:"svg",tag:"svg",args:{hd:{namespace:"",name:"version",value:"1.1"},tl:{nil:_C}},specific_attributes:{some:{"class":{nil:_C},style:{hd:_rM({px:a.height + 2}),tl:{hd:_rR({px:a.width + 2}),tl:{nil:_C}}},bool_attributes:{nil:_C},events:{nil:_C},events_options:{nil:_C},href:{none:_C}}},xmlns:{hd:{name:"svg",uri:"http://www.w3.org/2000/svg"},tl:{nil:_C}},content:{hd:{text:"\n"},tl:{hd:b,tl:{hd:{text:"\n"},tl:{hd:c,tl:{hd:{text:"\n"},tl:{nil:_C}}}}}}};}
function _BGT(a,b){return function (c,d){return d.f1?{f1:false,f2:_rJ(a)(c)}:{f1:false,f2:{fragment:{hd:d.f2,tl:{hd:b,tl:{hd:_rJ(a)(c),tl:{nil:_C}}}}}};};}
function _BGU(a){return function (b,c){return _Fh(_BGT(a,c),b,{f1:true,f2:{fragment:{nil:_C}}}).f2;};}
function _BGV(a){var b;return (b = a.control_escape,b != null)?{fragment:{hd:{text:"\\"},tl:{hd:_rC(b),tl:{nil:_C}}}}:(b = a.control_letter,b != null)?{fragment:{hd:{text:"\\c"},tl:{hd:_rC(b),tl:{nil:_C}}}}:(b = a.hex_escape_sequence,b != null)?{fragment:{hd:{text:"\\x"},tl:{hd:_rC(b),tl:{nil:_C}}}}:(b = a.unicode_escape_sequence,b != null)?{fragment:{hd:{text:"\\u"},tl:{hd:_rC(b),tl:{nil:_C}}}}:(b = a.identity_escape,b != null)?{fragment:{hd:{text:"\\"},tl:{hd:_rC(b),tl:{nil:_C}}}}:{fragment:{hd:{text:"\\"},tl:{hd:_rC(a.character_class_escape),tl:{nil:_C}}}};}
function _BGW(a){var b;return (b = a.escaped_char)?_BGV(b):_rC(a["char"]);}
function _BGX(a,b){return {fragment:{hd:b || b,tl:{hd:(b = a.class_atom)?_BGW(b):{fragment:{hd:_BGW(a.start_char),tl:{hd:{text:"-"},tl:{hd:_BGW(a.end_char),tl:{nil:_C}}}}},tl:{nil:_C}}}};}
function _BGY(a){var b;return b = _Fh(_BGX,a.class_ranges,{fragment:{nil:_C}}),a.neg?{fragment:{hd:{text:"[^"},tl:{hd:b,tl:{hd:{text:"]"},tl:{nil:_C}}}}}:{fragment:{hd:{text:"["},tl:{hd:b,tl:{hd:{text:"]"},tl:{nil:_C}}}}};}
function _BGZ(a,b,c,d){return function (e){var f;return e.noop?{fragment:{nil:_C}}:e.star?{text:"*"}:e.plus?{text:"+"}:e.qmark?{text:"?"}:(f = e.exactly,f != null)?{fragment:{hd:{text:"{"},tl:{hd:_rJ(a)(f),tl:{hd:{text:"}"},tl:{nil:_C}}}}}:(f = e.at_least,f != null)?{fragment:{hd:{text:"{"},tl:{hd:_rJ(b)(f),tl:{hd:{text:",}"},tl:{nil:_C}}}}}:{fragment:{hd:{text:"{"},tl:{hd:_rJ(c)(e.min),tl:{hd:{text:","},tl:{hd:_rJ(d)(e.max),tl:{hd:{text:"}"},tl:{nil:_C}}}}}}};};}
function _BGc(a){return _BGU(_tO)(_Gi(_BGd,a,0),{text:"|"});}
function _BGf(a){var b;return (b = a.assertion)?{namespace:"",tag:"span",args:{hd:{namespace:"",name:"id",value:"" + a.id},tl:{nil:_C}},content:{hd:_BGg(b),tl:{nil:_C}},xmlns:{nil:_C},specific_attributes:{none:_C}}:{namespace:"",tag:"span",args:{hd:{namespace:"",name:"id",value:"" + a.id},tl:{nil:_C}},content:{hd:_BGb(a.atom),tl:{hd:_BGZ(_Lr,_Lr,_Lr,_Lr)(a.quantifier),tl:{hd:_rC(a.greedy?"":"?"),tl:{nil:_C}}}},xmlns:{nil:_C},specific_attributes:{none:_C}};}
function _BGg(a){var b;return a.anchor_start?{text:"^"}:a.anchor_end?{text:"$"}:a.match_word_boundary?{text:"\\b"}:a.dont_match_word_boundary?{text:"\\B"}:(b = a.match_ahead)?{fragment:{hd:{text:"(?="},tl:{hd:_BGc(b),tl:{hd:{text:")"},tl:{nil:_C}}}}}:{fragment:{hd:{text:"(?!"},tl:{hd:_BGc(a.dont_match_ahead),tl:{hd:{text:")"},tl:{nil:_C}}}}};}
function _BGd(a){return _Fh(_BGe,a,{fragment:{nil:_C}});}
function _BGb(a){var b;return a.dot?{text:"."}:(b = a["char"],b != null)?_rC(b):(b = a.group_ref,b != null)?{fragment:{hd:{text:"\\"},tl:{hd:_rD(b),tl:{nil:_C}}}}:(b = a.escaped_char)?_BGV(b):(b = a.ncgroup)?{fragment:{hd:{text:"(?:"},tl:{hd:_BGc(b),tl:{hd:{text:")"},tl:{nil:_C}}}}}:(b = a.group)?{namespace:"",tag:"span",args:{hd:{namespace:"",name:"id",value:"" + a.id},tl:{nil:_C}},content:{hd:{text:"("},tl:{hd:_BGc(b),tl:{hd:{text:")"},tl:{nil:_C}}}},xmlns:{nil:_C},specific_attributes:{none:_C}}:(b = a.char_class)?{namespace:"",tag:"span",args:{hd:{namespace:"",name:"id",value:"" + a.id},tl:{nil:_C}},content:{hd:_BGY(b),tl:{nil:_C}},xmlns:{nil:_C},specific_attributes:{none:_C}}:{fragment:{hd:{text:"\\"},tl:{hd:_rC(a.character_class_escape),tl:{nil:_C}}}};}
function _BGe(a,b){return {fragment:{hd:b,tl:{hd:_BGf(a),tl:{nil:_C}}}};}
function _BGh(a,b){return {st:a,v:b};}
function _BGi(a,b,c){var d;return (d = c.tl)?(a = b(a,c.hd),c = _BGi(a.st,b,d),_BGh(c.st,_Gd(a.v,c.v))):_BGh(a,{nil:_C});}
function _BGm(a,b){return _BGi(a,_BGj,b);}
function _BGl(a,b){var c;return (c = b.group)?(c = _BGm({term_id:a.term_id + 1,group_id:a.group_id + 1},c),_BGh(c.st,{id:a.term_id,group_id:a.group_id,group:c.v})):(c = b.ncgroup)?(c = _BGm({term_id:a.term_id + 1,group_id:a.group_id},c),_BGh(c.st,{ncgroup:c.v})):(c = b.char_class)?_BGh({term_id:a.term_id + 1,group_id:a.group_id},{id:a.term_id,char_class:c}):_BGh(a,b);}
function _BGj(a,b){return _BGi(a,_BGk,b);}
function _BGk(a,b){var c;return (c = b.atom)?(c = _BGl({group_id:a.group_id,term_id:a.term_id + 1},c),_BGh(c.st,{id:a.term_id,atom:c.v,quantifier:b.quantifier,greedy:b.greedy})):_BGh({group_id:a.group_id,term_id:a.term_id + 1},{id:a.term_id,assertion:b.assertion});}
function _BGn(a){return (a = a.some)?{some:_BGm({term_id:1,group_id:1},a).v}:{none:_C};}
function _BGo(a){return function (){return {exactly:a};};}
function _BGp(a,b){return function (){var c;return (c = _Rt(b,a).some)?_RN(b,c.f1,_BGo(c.f2)):{none:_C};};}
function _BGq(a){return function (){return {at_least:a};};}
function _BGr(a,b){return function (){var c,d;return (c = ((c = _Rt(true,a).some)?(d = _RU(c.f1,",").some)?_RN(b,d.f1,_BGq(c.f2)):{none:_C}:{none:_C}).some)?{some:c}:_BGp(a,b)();};}
function _BGs(a,b){return function (){return {min:a,max:b};};}
function _BGt(a,b){var c,d;return (c = ((c = _Rt(true,b).some)?(d = _RU(c.f1,",").some)?(d = _Rt(a,d.f1).some)?_RN(a,d.f1,_BGs(c.f2,d.f2)):{none:_C}:{none:_C}:{none:_C}).some)?{some:c}:_BGr(b,a)();}
function _BGu(){return {plus:_C};}
function _BGv(){return {star:_C};}
function _BGw(){return {noop:_C};}
function _BGx(a,b){return function (){var c;return (c = _RU(a,"").some)?_RN(b,c.f1,_BGw):{none:_C};};}
function _BGy(){return {qmark:_C};}
function _BHA(a){return function (){return a;};}
function _BHB(a,b){return function (){var c,d;return (c = ((c = _RU(a,"{").some)?(d = _BGt(true,c.f1).some)?(c = _RU(d.f1,"}").some)?_RN(b,c.f1,_BHA(d.f2)):{none:_C}:{none:_C}:{none:_C}).some)?{some:c}:_BGx(a,b)();};}
function _BHC(a,b){return function (){var c;return (c = ((c = _RU(a,"?").some)?_RN(b,c.f1,_BGy):{none:_C}).some)?{some:c}:_BHB(a,b)();};}
function _BHD(a,b){return function (){var c;return (c = ((c = _RU(a,"+").some)?_RN(b,c.f1,_BGu):{none:_C}).some)?{some:c}:_BHC(a,b)();};}
function _BHE(a,b){var c;return (c = ((c = _RU(b,"*").some)?_RN(a,c.f1,_BGv):{none:_C}).some)?{some:c}:_BHD(b,a)();}
function _BHF(a,b){return function (){var c;return (c = _RU(a,"|").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C};};}
function _BHG(a,b){return function (){var c;return (c = ((c = _RU(a,"}").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHF(a,b)();};}
function _BHH(a,b){return function (){var c;return (c = ((c = _RU(a,"{").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHG(a,b)();};}
function _BHI(a,b){return function (){var c;return (c = ((c = _RU(a,"]").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHH(a,b)();};}
function _BHJ(a,b){return function (){var c;return (c = ((c = _RU(a,"[").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHI(a,b)();};}
function _BHK(a,b){return function (){var c;return (c = ((c = _RU(a,")").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHJ(a,b)();};}
function _BHL(a,b){return function (){var c;return (c = ((c = _RU(a,"(").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHK(a,b)();};}
function _BHM(a,b){return function (){var c;return (c = ((c = _RU(a,"?").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHL(a,b)();};}
function _BHN(a,b){return function (){var c;return (c = ((c = _RU(a,"+").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHM(a,b)();};}
function _BHO(a,b){return function (){var c;return (c = ((c = _RU(a,"*").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHN(a,b)();};}
function _BHP(a,b){return function (){var c;return (c = ((c = _RU(a,".").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHO(a,b)();};}
function _BHQ(a,b){return function (){var c;return (c = ((c = _RU(a,"/").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHP(a,b)();};}
function _BHR(a,b){return function (){var c;return (c = ((c = _RU(a,"\\").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHQ(a,b)();};}
function _BHS(a,b){return function (){var c;return (c = ((c = _RU(a,"$").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHR(a,b)();};}
function _BHT(a,b){var c;return (c = ((c = _RU(b,"^").some)?_RN(a,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHS(b,a)();}
function _BHU(a){return function (){return _Ie(a);};}
function _BHV(a,b){return function (){return _Il(a,b);};}
function _BHW(a,b){var c;return (c = ((c = (_BHT(true,b).none?{some:{f1:b,f2:_C}}:{none:_C}).some)?(c = _IW(c.f1).some)?(c = c.f1,_RN(a,c,_BHV(b,c))):{none:_C}:{none:_C}).some)?_RN(a,c.f1,_BHU(c.f2)):{none:_C};}
function _BHX(a,b){return function (){var c;return (c = _RU(a,"W").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C};};}
function _BHY(a,b){return function (){var c;return (c = ((c = _RU(a,"w").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHX(a,b)();};}
function _BHZ(a,b){return function (){var c;return (c = ((c = _RU(a,"S").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHY(a,b)();};}
function _BHb(a,b){return function (){var c;return (c = ((c = _RU(a,"s").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHZ(a,b)();};}
function _BHc(a,b){return function (){var c;return (c = ((c = _RU(a,"D").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHb(a,b)();};}
function _BHd(a,b){var c;return (c = ((c = _RU(b,"d").some)?_RN(a,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHc(b,a)();}
function _BHe(a,b){var c;return (b = ((c = _IW(b).some)?(b = c.f2,b >= 48 && 57 >= b || (b >= 97 && 102 >= b || b >= 65 && 70 >= b)?{some:{f1:c.f1,f2:b}}:{none:_C}):{none:_C}).some)?_RN(a,b.f1,_BHA(b.f2)):{none:_C};}
function _BHf(a,b){return function (){var c;return (c = _RU(a,"v").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C};};}
function _BHg(a,b){return function (){var c;return (c = ((c = _RU(a,"t").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHf(a,b)();};}
function _BHh(a,b){return function (){var c;return (c = ((c = _RU(a,"r").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHg(a,b)();};}
function _BHi(a,b){return function (){var c;return (c = ((c = _RU(a,"n").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHh(a,b)();};}
function _BHj(a,b){var c;return (c = ((c = _RU(b,"f").some)?_RN(a,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHi(b,a)();}
function _BHk(a){return function (){return {identity_escape:_Ie(a)};};}
function _BHl(a){return function (){return {control_letter:_Ie(a)};};}
function _BHm(a,b){return function (){var c,d;return (d = _RU(a,"\\").some)?(c = d.f1,(d = ((d = _IW(c).some)?(d = d.f1,_RN(b,d,_BHV(c,d))):{none:_C}).some)?_RN(b,d.f1,_BHk(d.f2)):{none:_C}):{none:_C};};}
function _BHn(a){return function (){return {unicode_escape_sequence:_Ie(a)};};}
function _BHo(a,b){return function (){var c,d;return (c = ((c = _RU(a,"\\u").some)?(d = c.f1,(c = ((c = _BHe(true,d).some)?(c = _BHe(true,c.f1).some)?(c = _BHe(true,c.f1).some)?(c = _BHe(b,c.f1).some)?(c = c.f1,_RN(b,c,_BHV(d,c))):{none:_C}:{none:_C}:{none:_C}:{none:_C}).some)?_RN(b,c.f1,_BHn(c.f2)):{none:_C}):{none:_C}).some)?{some:c}:_BHm(a,b)();};}
function _BHp(a){return function (){return {hex_escape_sequence:_Ie(a)};};}
function _BHq(a,b){return function (){var c,d;return (c = ((c = _RU(a,"\\x").some)?(d = c.f1,(c = ((c = _BHe(true,d).some)?(c = _BHe(b,c.f1).some)?(c = c.f1,_RN(b,c,_BHV(d,c))):{none:_C}:{none:_C}).some)?_RN(b,c.f1,_BHp(c.f2)):{none:_C}):{none:_C}).some)?{some:c}:_BHo(a,b)();};}
function _BHr(a,b){return function (){var c,d,e;return (c = ((c = _RU(a,"\\c").some)?(c = c.f1,(c = ((d = ((d = _IW(c).some)?(e = d.f2,e >= 97 && 122 >= e || e >= 65 && 90 >= e?{some:{f1:d.f1,f2:e}}:{none:_C}):{none:_C}).some)?(d = d.f1,_RN(b,d,_BHV(c,d))):{none:_C}).some)?_RN(b,c.f1,_BHl(c.f2)):{none:_C}):{none:_C}).some)?{some:c}:_BHq(a,b)();};}
function _BHs(a){return function (){return {control_escape:a};};}
function _BHt(a,b){var c;return (c = ((c = _RU(b,"\\").some)?(c = _BHj(a,c.f1).some)?_RN(a,c.f1,_BHs(c.f2)):{none:_C}:{none:_C}).some)?{some:c}:_BHr(b,a)();}
function _BHu(a,b){return function (){var c;return (c = _RU(a,"]").some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C};};}
function _BHv(a,b){var c;return (c = ((c = _RU(b,"\\").some)?_RN(a,c.f1,_BHA(c.f2)):{none:_C}).some)?{some:c}:_BHu(b,a)();}
function _BHw(a,b){var c;return (c = ((c = (_BHv(true,b).none?{some:{f1:b,f2:_C}}:{none:_C}).some)?(c = _IW(c.f1).some)?(c = c.f1,_RN(a,c,_BHV(b,c))):{none:_C}:{none:_C}).some)?_RN(a,c.f1,_BHU(c.f2)):{none:_C};}
function _BHx(a,b){return function (){var c;return (c = _BHt(b,a).some)?_RN(b,c.f1,_BHA(c.f2)):{none:_C};};}
function _BHy(a){return function (){return {character_class_escape:a};};}
function _BIA(a,b){var c;return (c = ((c = _RU(b,"\\").some)?(c = _BHd(a,c.f1).some)?_RN(a,c.f1,_BHy(c.f2)):{none:_C}:{none:_C}).some)?{some:c}:_BHx(b,a)();}
function _BIB(a){return function (){return {"char":a};};}
function _BIC(a,b){return function (){var c;return (c = _BHw(b,a).some)?_RN(b,c.f1,_BIB(c.f2)):{none:_C};};}
function _BID(a){return function (){return {escaped_char:a};};}
function _BIE(a,b){var c;return (c = ((c = _BIA(a,b).some)?_RN(a,c.f1,_BID(c.f2)):{none:_C}).some)?{some:c}:_BIC(b,a)();}
function _BIF(a){return function (){return {class_atom:a};};}
function _BIG(a,b){return function (){var c;return (c = _BIE(b,a).some)?_RN(b,c.f1,_BIF(c.f2)):{none:_C};};}
function _BIH(a,b){return function (){return {start_char:a,end_char:b};};}
function _BII(a,b){var c,d;return (c = ((d = _BIE(true,b).some)?(c = _RU(d.f1,"-").some)?(c = _BIE(a,c.f1).some)?_RN(a,c.f1,_BIH(d.f2,c.f2)):{none:_C}:{none:_C}:{none:_C}).some)?{some:c}:_BIG(b,a)();}
function _BIJ(a){return function (){return {dont_match_ahead:a};};}
function _BIK(a){return function (){return {match_ahead:a};};}
function _BIL(){return {dont_match_word_boundary:_C};}
function _BIM(){return {match_word_boundary:_C};}
function _BIN(){return {anchor_end:_C};}
function _BIO(){return {anchor_start:_C};}
function _BIP(){return {dot:_C};}
function _BIQ(a,b){return function (){return {id:0,atom:a,quantifier:b,greedy:true};};}
function _BIR(a,b){return function (){return {id:0,atom:a,quantifier:b,greedy:false};};}
function _BIS(a){return function (){return {id:0,assertion:a};};}
function _BIT(){return _RW;}
function _BIU(a,b){return (b = _RU(b,"|").some)?_RN(a,b.f1,_BIT):{none:_C};}
function _BIV(a,b){return function (){var c;return (c = _BHW(b,a).some)?_RN(b,c.f1,_BIB(c.f2)):{none:_C};};}
function _BIW(a,b){return function (){var c;return (c = ((c = _BHt(b,a).some)?_RN(b,c.f1,_BID(c.f2)):{none:_C}).some)?{some:c}:_BIV(a,b)();};}
function _BIX(a,b){return function (){var c;return (c = ((c = _RU(a,"\\").some)?(c = _BHd(b,c.f1).some)?_RN(b,c.f1,_BHy(c.f2)):{none:_C}:{none:_C}).some)?{some:c}:_BIW(a,b)();};}
function _BIY(a){return function (){return {group_ref:a};};}
function _BIZ(a,b){return function (){var c;return (c = ((c = _RU(a,"\\").some)?(c = _Rx(b,c.f1).some)?_RN(b,c.f1,_BIY(c.f2)):{none:_C}:{none:_C}).some)?{some:c}:_BIX(a,b)();};}
function _BIb(a){return _BII(true,a);}
function _BIc(a){return function (){return {id:0,char_class:{neg:false,class_ranges:a}};};}
function _BId(a,b){return function (){var c,d;return (c = ((c = _RU(a,"[").some)?(c = _RR(false,_BIb,c.f1).some)?(d = _RU(c.f1,"]").some)?_RN(b,d.f1,_BIc(c.f2)):{none:_C}:{none:_C}:{none:_C}).some)?{some:c}:_BIZ(a,b)();};}
function _BIe(a){return function (){return {id:0,char_class:{neg:true,class_ranges:a}};};}
function _BIf(a,b){return function (){var c,d;return (c = ((c = _RU(a,"[^").some)?(d = _RR(false,_BIb,c.f1).some)?(c = _RU(d.f1,"]").some)?_RN(b,c.f1,_BIe(d.f2)):{none:_C}:{none:_C}:{none:_C}).some)?{some:c}:_BId(a,b)();};}
function _BIg(a){return function (){return {id:0,group_id:0,group:a};};}
function _BIh(a){return function (){return {ncgroup:a};};}
function _BIj(a,b){return (b = _Rj(false,_BIk,_RW)(a,b).some)?_RN(a,b.f1,_BHA(b.f2)):{none:_C};}
function _BIi(a,b){return (b = _Rj(false,_BIj,_BIU)(a,b).some)?_RN(a,b.f1,_BHA(b.f2)):{none:_C};}
function _BJe(a,b,c){var d,e,f;while (true) {switch (a) {case 0:if (d = ((d = _BJf(0,b,c).some)?_RN(b,d.f1,_BIS(d.f2)):{none:_C}).some) {return {some:d};} else {d = c;c = b;b = d;a = 2;
continue;};
case 1:return (e = _BJg(0,true,b).some)?(d = _BHE(c,e.f1).some)?_RN(c,d.f1,_BIQ(e.f2,d.f2)):{none:_C}:{none:_C};;
case 2:if (d = ((e = _BJg(0,true,b).some)?(d = _BHE(true,e.f1).some)?(f = _RU(d.f1,"?").some)?_RN(c,f.f1,_BIR(e.f2,d.f2)):{none:_C}:{none:_C}:{none:_C}).some) {return {some:d};} else {a = 1;};}}}
function _BIk(a,b){return _BJe(0,a,b);}
function _BJf(a,b,c){var d,e;while (true) {switch (a) {case 0:if (d = ((d = _RU(c,"^").some)?_RN(b,d.f1,_BIO):{none:_C}).some) {return {some:d};} else {d = c;c = b;b = d;a = 5;
continue;};
case 1:return (d = _RU(b,"(?!").some)?(d = _BIi(true,d.f1).some)?(e = _RU(d.f1,")").some)?_RN(c,e.f1,_BIJ(d.f2)):{none:_C}:{none:_C}:{none:_C};;
case 2:if (d = ((d = _RU(b,"(?=").some)?(d = _BIi(true,d.f1).some)?(e = _RU(d.f1,")").some)?_RN(c,e.f1,_BIK(d.f2)):{none:_C}:{none:_C}:{none:_C}).some) {return {some:d};} else {a = 1;
continue;};
case 3:if (d = ((d = _RU(b,"\\B").some)?_RN(c,d.f1,_BIL):{none:_C}).some) {return {some:d};} else {a = 2;
continue;};
case 4:if (d = ((d = _RU(b,"\\b").some)?_RN(c,d.f1,_BIM):{none:_C}).some) {return {some:d};} else {a = 3;
continue;};
case 5:if (d = ((d = _RU(b,"$").some)?_RN(c,d.f1,_BIN):{none:_C}).some) {return {some:d};} else {a = 4;};}}}
function _BJg(a,b,c){var d,e;while (true) {switch (a) {case 0:if (d = ((d = _RU(c,".").some)?_RN(b,d.f1,_BIP):{none:_C}).some) {return {some:d};} else {d = c;c = b;b = d;a = 2;
continue;};
case 1:return (d = ((d = _RU(b,"(").some)?(e = _BIi(true,d.f1).some)?(d = _RU(e.f1,")").some)?_RN(c,d.f1,_BIg(e.f2)):{none:_C}:{none:_C}:{none:_C}).some)?{some:d}:_BIf(b,c)();;
case 2:if (d = ((d = _RU(b,"(?:").some)?(e = _BIi(true,d.f1).some)?(d = _RU(e.f1,")").some)?_RN(c,d.f1,_BIh(e.f2)):{none:_C}:{none:_C}:{none:_C}).some) {return {some:d};} else {a = 1;};}}}
function _BIl(a){return _BGn(_TD(_BIi,a));}
function _BIq(a){return a = _BIm(_BFl(a)),_Io(a)?_tK({hd:{jq:_sm("lint_output"),subject:{content:_JQ(a)},verb:{set:_C}},tl:{nil:_C}}):_tK({hd:{jq:_sm("lint_output"),subject:{content:{fragment:{nil:_C}}},verb:{set:_C}},tl:{nil:_C}});}
function _BIn(a,b){return {fragment:{hd:b,tl:{hd:_BIo(a),tl:{nil:_C}}}};}
function _BIm(a){return a.errors.nil?{none:_C}:{some:_Fh(_BIn,a.errors,{fragment:{nil:_C}})};}
function _BIo(a){var b;return b = (b = a.patch.some,b == null)?{fragment:{nil:_C}}:{fragment:{hd:{text:"\n"},tl:{hd:{namespace:"",tag:"a",args:{hd:{namespace:"",name:"_debug",value:b},tl:{nil:_C}},specific_attributes:{some:{"class":{hd:"btn",tl:{hd:"btn-mini",tl:{hd:"btn-success",tl:{hd:"pull-right",tl:{nil:_C}}}}},style:{nil:_C},bool_attributes:{nil:_C},events:{hd:{name:{click:_C},value:{expr:_BJh(b)}},tl:{nil:_C}},events_options:{nil:_C},href:{none:_C}}},xmlns:{nil:_C},content:{hd:{text:"\napply fix\n"},tl:{nil:_C}}},tl:{hd:{text:"\n"},tl:{hd:{namespace:"",tag:"br",args:{nil:_C},content:{nil:_C},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{text:"\n"},tl:{nil:_C}}}}}}},{namespace:"",tag:"div",args:{hd:{namespace:"",name:"class",value:_Fk({hd:"alert ",tl:{hd:a["class"],tl:{nil:_C}}})},tl:{nil:_C}},content:{hd:{text:"\n"},tl:{hd:{namespace:"",tag:"strong",args:{nil:_C},content:{hd:_rC(a.title),tl:{nil:_C}},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{namespace:"",tag:"br",args:{nil:_C},content:{nil:_C},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{text:"\n"},tl:{hd:_rC(a.body),tl:{hd:{namespace:"",tag:"br",args:{nil:_C},content:{nil:_C},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{text:"\n"},tl:{hd:b,tl:{hd:{text:"\n"},tl:{nil:_C}}}}}}}}}},xmlns:{nil:_C},specific_attributes:{none:_C}};}
function _BJh(a){return function (b){return _BIp(a)(b);};}
function _BJi(a,b,c){while (true) {switch (a) {case 0:_tF(_sm("regexp"),b);;
case 1:_tL(_sm("row1"),"hidden");_tM(_sm("row2"),"hidden");_tM(_sm("row3"),"hidden");c = _tE(_sm("regexp"));if (c == "xkcd") {_tK({hd:{jq:_sm("parser_output"),subject:{content:{namespace:"",tag:"img",args:{hd:{namespace:"",name:"src",value:"http://imgs.xkcd.com/comics/regular_expressions.png "},tl:{nil:_C}},content:{nil:_C},xmlns:{nil:_C},specific_attributes:{none:_C}}},verb:{set:_C}},tl:{nil:_C}});_tK({hd:{jq:_sm("string_output"),subject:{content:{text:"xkcd"}},verb:{set:_C}},tl:{nil:_C}});return _tK({hd:{jq:_sm("lint_output"),subject:{content:{fragment:{nil:_C}}},verb:{set:_C}},tl:{nil:_C}});} else {if (a = _BIl(c).some) {_tK({hd:{jq:_sm("string_output"),subject:{content:_BGc(_BEl(a,{highlight_string_printer:_C}))},verb:{set:_C}},tl:{nil:_C}});_tK({hd:{jq:_sm("parser_output"),subject:{content:_BGS(_BEl(a,{svg_printer:_C}))},verb:{set:_C}},tl:{nil:_C}});_BIq(a);return _tK({hd:{jq:_sm("debug_output"),subject:{content:_rC(_Bn(a))},verb:{set:_C}},tl:{nil:_C}});} else {_tK({hd:{jq:_sm("string_output"),subject:{content:_rC(c)},verb:{set:_C}},tl:{nil:_C}});_tK({hd:{jq:_sm("parser_output"),subject:{content:(c = {namespace:"",tag:"div",args:{nil:_C},specific_attributes:{some:{"class":{hd:"alert-message",tl:{hd:"error",tl:{nil:_C}}},style:{nil:_C},bool_attributes:{nil:_C},events:{nil:_C},events_options:{nil:_C},href:{none:_C}}},xmlns:{nil:_C},content:{hd:{text:"\n"},tl:{hd:{namespace:"",tag:"strong",args:{nil:_C},content:{hd:{text:"oh snap!"},tl:{nil:_C}},xmlns:{nil:_C},specific_attributes:{none:_C}},tl:{hd:{text:" Parsing failed!\n"},tl:{nil:_C}}}}},c)},verb:{set:_C}},tl:{nil:_C}});return _tK({hd:{jq:_sm("lint_output"),subject:{content:{fragment:{nil:_C}}},verb:{set:_C}},tl:{nil:_C}});}};
case 2:a = 0;;}}}
function _BIp(a){return function (b){return _BJi(2,a,b);};}
function _BIr(a){return _BJi(1);}
function _BIs(a){return _BJi(0,"^a.*|b$");}
function _BJj(a){return _BIs(a);}
function _U(a){return _BJj;}
function _BIt(a){return _BJi(0,"a(bc?|[d-e]){4,}f");}
function _BJk(a){return _BIt(a);}
function _T(a){return _BJk;}
function _BIu(a){return _BJi(0,"(abc).(efg).\\2\\4");}
function _BJl(a){return _BIu(a);}
function _L(a){return _BJl;}
function _P(a){return _BIr;}
function _R(a){return _BIr;}
function _BIv(a){return _tL(_sm("row2"),"hidden"),_tL(_sm("row3"),"hidden"),_tM(_sm("row1"),"hidden");}
function _BJm(a){return _BIv(a);}
function _S(a){return _BJm;}
