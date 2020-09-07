(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~seller-dashboard"],{

/***/ "./node_modules/@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.es.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.es.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}("undefined"!=typeof self?self:this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=31)}([function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(26)("wks"),o=n(28),r=n(3).Symbol,s="function"==typeof r;(t.exports=function(t){return i[t]||(i[t]=s&&r[t]||(s?r:o)("Symbol."+t))}).store=i},function(t,e){t.exports=function(t,e,n,i,o,r){var s,a=t=t||{},u=typeof t.default;"object"!==u&&"function"!==u||(s=t,a=t.default);var l="function"==typeof a?a.options:a;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),o&&(l._scopeId=o);var c;if(r?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},l._ssrRegister=c):i&&(c=i),c){var d=l.functional,f=d?l.render:l.beforeCreate;d?(l._injectStyles=c,l.render=function(t,e){return c.call(e),f(t,e)}):l.beforeCreate=f?[].concat(f,c):[c]}return{esModule:s,exports:a,options:l}}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var i=n(3),o=n(0),r=n(20),s=n(5),a=n(10),u=function(t,e,n){var l,c,d,f=t&u.F,h=t&u.G,p=t&u.S,v=t&u.P,y=t&u.B,m=t&u.W,b=h?o:o[e]||(o[e]={}),g=b.prototype,x=h?i:p?i[e]:(i[e]||{}).prototype;h&&(n=e);for(l in n)(c=!f&&x&&void 0!==x[l])&&a(b,l)||(d=c?x[l]:n[l],b[l]=h&&"function"!=typeof x[l]?n[l]:y&&c?r(d,i):m&&x[l]==d?function(t){var e=function(e,n,i){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,i)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(d):v&&"function"==typeof d?r(Function.call,d):d,v&&((b.virtual||(b.virtual={}))[l]=d,t&u.R&&g&&!g[l]&&s(g,l,d)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e,n){var i=n(6),o=n(13);t.exports=n(8)?function(t,e,n){return i.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var i=n(7),o=n(36),r=n(37),s=Object.defineProperty;e.f=n(8)?Object.defineProperty:function(t,e,n){if(i(t),e=r(e,!0),i(n),o)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var i=n(12);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(15);t.exports=function(t){return Object(i(t))}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(39),o=n(29);t.exports=Object.keys||function(t){return i(t,o)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){var i=n(26)("keys"),o=n(28);t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,e){t.exports={}},function(t,e,n){t.exports={default:n(33),__esModule:!0}},function(t,e,n){var i=n(35);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,o){return t.call(e,n,i,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var i=n(12),o=n(3).document,r=i(o)&&i(o.createElement);t.exports=function(t){return r?o.createElement(t):{}}},function(t,e,n){var i=n(23),o=n(15);t.exports=function(t){return i(o(t))}},function(t,e,n){var i=n(24);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var i=n(16),o=Math.min;t.exports=function(t){return t>0?o(i(t),9007199254740991):0}},function(t,e,n){var i=n(0),o=n(3),r=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return r[t]||(r[t]=void 0!==e?e:{})})("versions",[]).push({version:i.version,mode:n(27)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=!0},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(6).f,o=n(10),r=n(1)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,r)&&i(t,r,{configurable:!0,value:e})}},function(t,e,n){"use strict";function i(t){g||n(46)}function o(t){O||n(45)}function r(t){N||n(70)}function s(t){G||n(44)}function a(t){at||n(32)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(19),l=n.n(u),c=n(47),d=n.n(c),f=n(66),h=n.n(f),p={name:"ClockPickerCanvas",props:{width:{type:Number,default:300},type:{type:String,default:"hours"},hoursIn:{type:Number,default:24},gisture:{type:Number,default:30},disabled:{type:Array,default:function(){return[]}},defaultValue:{type:String,default:null},activeColor:{type:String,default:"#a48bd1"},activeTextColor:{type:String,default:"white"},color:{type:String,default:"#757575"},disabledColor:{type:String,default:"#ddd"},font:{type:String,default:""}},data:function(){return{radius:null,ctx:null,anglesMap:{},anglesMapFactor:null,$canvas:null,value:null,lastEvent:{x:null,y:null,angle:null,radius:null,round:null},moveStart:!1,throttleDelay:100,scheduled:!1,alpha:.7}},computed:{pxRatio:function(){return"undefined"==typeof window?1:window.devicePixelRatio}},methods:{init:function(){this.getCanvasElement(),this.setDimensions(),this.setAnglesMap(),this.setTypography(),this.drawNumbers()},getCanvasElement:function(){this.$canvas=this.$refs.canvas,this.ctx=this.$canvas.getContext("2d")},setDimensions:function(){var t=this.gisture*this.pxRatio,e=this.width*this.pxRatio;return this.ctx.translate(e/2,e/2),this.radius=e/2-t/2,{x:e/2,y:e/2}},setTypography:function(){var t=14*this.pxRatio;this.ctx.font="normal normal 500 "+t+"px "+this.font,this.ctx.textAlign="center",this.ctx.textBaseline="middle"},setAnglesMap:function(){var t="hours"===this.type?12:60;this.anglesMapFactor=360/t;for(var e=0;e<t;e+=1){var n=this.anglesMapFactor*e-90;this.anglesMap[this.padNo(e)]={angle:this.roundAngle(n),round:Math.floor((n+90)/360)}}if("hours"===this.type&&24===this.hoursIn)for(var i=12;i<24;i+=1){var o=this.anglesMapFactor*i-90;this.anglesMap[this.padNo(i)]={angle:this.roundAngle(o),round:Math.floor((o+90)/360)}}},drawNumbers:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],n=this.pxRatio*this.width,i=[],o=[],r=[];h()(this.anglesMap).forEach(function(n){var s=t.gisture*t.pxRatio,a=t.anglesMap[n],u=a.angle,l=a.round,c=t.radius-l*s,d=c*Math.cos(u*(Math.PI/180)),f=c*Math.sin(u*(Math.PI/180));t.disabled.includes(n)?o.push([n,d,f]):e&&t.value===n?i.push(n,d,f):e||t.lastEvent.value!==n?r.push([n,d,f]):i.push(n,d,f)}),this.ctx.clearRect(-n/2,-n/2,n,n),this.drawCircle(0,0,3,this.activeColor),this.drawLine(i[1],i[2],this.activeColor),this.drawCircle(i[1],i[2],12,this.activeColor,this.alpha,!0),o.forEach(function(e){return t.drawDisabled.apply(t,d()(e))}),r.forEach(function(e){return t.drawNormalValue.apply(t,d()(e))}),this.drawValue.apply(this,i)},drawDisabled:function(t,e,n){var i=this.type,o=Number(t)%5==0;if("hours"===i||o)return this.ctx.fillStyle=this.disabledColor,void this.ctx.fillText(t,e,n);this.drawCircle(e,n,2,this.disabledColor)},drawValue:function(t,e,n){var i=this.shouldDrawNo(t);this.ctx.fillStyle=this.activeColor,i?(this.ctx.fillStyle=this.activeTextColor,this.ctx.fillText(t,e,n)):this.drawCircle(e,n,3,this.activeTextColor)},drawNormalValue:function(t,e,n){if(this.shouldDrawNo(t))return this.ctx.fillStyle=this.color,void this.ctx.fillText(t,e,n);this.drawCircle(e,n,2,this.activeColor,.3)},shouldDrawNo:function(t){var e=Number(t)%5==0;return"hours"===this.type||e},drawCircle:function(t,e,n,i){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,r=arguments.length>5&&void 0!==arguments[5]&&arguments[5],s=n*this.pxRatio,a=this.width*this.pxRatio;this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(t,e,s,0,2*Math.PI),this.ctx.closePath(),r&&(this.ctx.clip(),this.ctx.clearRect(-a/2,-a/2,a,a)),this.ctx.fillStyle=i,this.ctx.globalAlpha=o,this.ctx.fill(),this.ctx.restore(),this.ctx.globalAlpha=1},drawLine:function(t,e,n){this.ctx.save(),this.ctx.beginPath(),this.ctx.moveTo(0,0),this.ctx.lineTo(t,e),this.ctx.closePath(),this.ctx.strokeStyle=n,this.ctx.globalAlpha=this.alpha,this.ctx.lineWidth=this.pxRatio,this.ctx.stroke(),this.ctx.restore(),this.ctx.globalAlpha=1},padNo:function(t){var e="00"+t;return e.slice(e.length-2)},roundAngle:function(t){var e=t<0?360+t:t;return e-360*Math.floor(e/360)},onPointChange:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.pxRatio*this.width;this.ctx.clearRect(-n/2,-n/2,n,n),this.calculateLastEvent(t),this.getSelectedNo(e),this.drawNumbers(e)},calculateLastEvent:function(t){var e=t.clientX,n=t.clientY,i=this.gisture*this.pxRatio,o=this.$canvas.getBoundingClientRect(),r=o.x+this.width/2,s=o.y+this.width/2,a=e-r,u=n-s,c=Math.atan(u/a),d=Math.abs(a/Math.cos(c))*this.pxRatio,f=Math.round((this.radius-d)/i),h=c*(180/Math.PI);return a<0?h+=180:u<0&&(h+=360),f<0?f=0:f>1&&(f=1),"hours"!==this.type&&(f=0),"hours"===this.type&&12===this.hoursIn&&(f=0),this.lastEvent=l()(this.lastEvent,{x:a,y:u,angle:h,radius:d,round:f}),this.lastEvent},getSelectedNo:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=this.anglesMapFactor,i=this.lastEvent.angle%n>=n/2?1:0,o=Math.floor(this.lastEvent.angle/n),r=n*(o+i),s=h()(this.anglesMap).find(function(e){var n=t.anglesMap[e],i=n.angle,o=n.round;return i===(r>=360?r-360:r)&&o===t.lastEvent.round});if(e&&this.$emit("value-change",""),!this.disabled.includes(s)){if(e)return this.value=s,void this.$emit("set",this.value);this.$emit("value-change",s),this.lastEvent.value=s}},onMouseDown:function(){this.moveStart=!0},onMouseMove:function(t){var e=this;this.moveStart&&(this.scheduled||(this.scheduled=!0,setTimeout(function(){e.onPointChange(t,!1),e.scheduled=!1},this.throttleDelay)))},onMouseUp:function(t){this.moveStart=!1,this.onPointChange(t,!0)},onTouchStart:function(){this.moveStart=!0},onTouchMove:function(t){var e=this;this.moveStart&&(this.scheduled||(this.scheduled=!0,setTimeout(function(){var n=t.changedTouches;e.onPointChange(n[0],!1),e.scheduled=!1},this.throttleDelay)))},onTouchEnd:function(t){var e=t.changedTouches;this.onPointChange(e[0],!0),this.moveStart=!1}},mounted:function(){var t=this;this.$nextTick(function(){var e=t.disabled.includes(t.defaultValue);t.value=e?"--":t.defaultValue,t.init()})}},v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"clock-picker__canvas"},[n("canvas",{ref:"canvas",style:{width:t.width+"px",height:t.width+"px"},attrs:{width:t.width*t.pxRatio,height:t.width*t.pxRatio},on:{mouseup:function(e){t.onMouseUp(e)},mousedown:function(e){t.onMouseDown(e)},touchstart:function(e){t.onTouchStart(e)},touchend:function(e){t.onTouchEnd(e)},mousemove:function(e){t.onMouseMove(e)},touchmove:function(e){t.onTouchMove(e)}}})])},y=[];v._withStripped=!0;var m={render:v,staticRenderFns:y},b=m,g=!1,x=n(2),_=i,k=x(p,b,!1,_,null,null);k.options.__file="src/components/ClockPickerCanvas.vue";var S=k.exports,C={name:"ClockPickerHours",props:{value:{type:String,default:"00"},disabledFrom:{type:String,default:null},disabledTo:{type:String,default:null},disabledMinsFrom:{type:String,default:null},disabledMinsTo:{type:String,default:null},activeColor:{type:String,default:"black"},activeTextColor:{type:String,default:"white"},color:{type:String,default:"#757575"},disabledColor:{type:String,default:"#ddd"},font:{type:String,default:""}},components:{ClockPickerCanvas:S},data:function(){return{}},computed:{disabledRange:function(){var t=this.disabledFrom,e=this.disabledTo,n=this.disabledMinsFrom,i=this.disabledMinsTo,o="00"===n?0:1,r="59"===i?0:1;return t===e?[]:t&&e?this.makeArray(Number(t)+o,Number(e)-r):t?this.makeArray(Number(t)+o,23):e&&e>0?this.makeArray(0,Number(e)-r):[]}},methods:{makeArray:function(t,e){for(var n=[],i=t;i<=e;i++){var o="00"+(i>23?0:i);n.push(o.slice(o.length-2))}return n},isDisabled:function(t){return this.disabledRange.includes(t)},itemClass:function(t){var e=Number(t);return 12===e?0:e>12?e-12:e},setValue:function(t){this.$emit("set",t)}}},w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"clock-picker__hours"},[n("clock-picker-canvas",{attrs:{width:280,disabled:t.disabledRange,"default-value":t.value,color:t.color,"disabled-color":t.disabledColor,"active-color":t.activeColor,"active-text-color":t.activeTextColor,font:t.font},on:{"value-change":function(e){t.$emit("set-temp-hours",e)},set:function(e){t.setValue(e)}}})],1)},T=[];w._withStripped=!0;var M={render:w,staticRenderFns:T},E=M,O=!1,F=n(2),P=o,j=F(C,E,!1,P,null,null);j.options.__file="src/components/ClockPickerHours.vue";var R=j.exports,A={name:"ClockPickerMinutes",props:{buttonClass:{type:String},value:{type:String},shouldDisableAll:{type:Boolean,default:!1},shouldDisableFrom:{type:Boolean,default:!1},disabledFrom:{type:String,default:null},disabledTo:{type:String,default:null},disabledHrFrom:{type:String,default:null},disabledHrTo:{type:String,default:null},activeColor:{type:String,default:"black"},activeTextColor:{type:String,default:"white"},color:{type:String,default:"#757575"},disabledColor:{type:String,default:"#ddd"},font:{type:String,default:""}},components:{ClockPickerCanvas:S},data:function(){return{}},computed:{minutes:function(){return this.makeArray(0,59)},disabledRange:function(){var t=this.disabledFrom,e=this.disabledTo,n=this.shouldDisableFrom,i=this.disabledHrFrom,o=this.disabledHrTo,r=i===o;return n&&t?this.makeArray(t,r?e:59):e?this.makeArray(0,e):[]}},methods:{makeArray:function(t,e){for(var n=[],i=t;i<=e;i++){var o="00"+i;n.push(o.slice(o.length-2))}return n},isDisabled:function(t){return this.disabledRange.includes(t)},isSmall:function(t){return Number(t)%5!=0},setValue:function(t){this.$emit("set",t)}}},D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"clock-picker__minutes"},[n("clock-picker-canvas",{attrs:{disabled:t.disabledRange,type:"mins",width:280,"default-value":t.value,color:t.color,"disabled-color":t.disabledColor,"active-color":t.activeColor,"active-text-color":t.activeTextColor,font:t.font},on:{"value-change":function(e){t.$emit("set-temp-mins",e)},set:function(e){t.setValue(e)}}})],1)},V=[];D._withStripped=!0;var H={render:D,staticRenderFns:V},$=H,N=!1,I=n(2),B=r,L=I(A,$,!1,B,null,null);L.options.__file="src/components/ClockPickerMinutes.vue";var U=L.exports,q={name:"ClockPickerDialog",props:{disabledFrom:{type:String,default:null},disabledTo:{type:String,default:null},initialValue:{type:String,default:"00:00"},cancelText:{type:String,default:null},doneText:{type:String,default:null},activeColor:{type:String,default:"black"},activeTextColor:{type:String,default:"white"},color:{type:String,default:"#757575"},disabledColor:{type:String,default:"#ddd"},closeOnOverlay:{type:Boolean,default:!1},font:{type:String,default:""}},components:{ClockPickerHours:R,ClockPickerMinutes:U},watch:{initialValue:function(){this.updateTime()}},data:function(){return{opened:!1,hours:this.initialValue.slice(0,2),minutes:this.initialValue.slice(3,5),isHoursSet:!1,isMinutesSet:!1,tempHours:"",tempMins:""}},computed:{disabledHoursFrom:function(){var t=this.disabledFrom;return t?t.slice(0,2):null},disabledMinutesFrom:function(){var t=this.disabledFrom;return t?t.slice(3,5):null},disabledHoursTo:function(){var t=this.disabledTo;return t?t.slice(0,2):null},disabledMinutesTo:function(){var t=this.disabledTo,e=this.isHoursSet,n=this.disabledHoursTo,i=this.hours;return!t||e&&i!==n?null:t.slice(3)},shouldDisableAllMinutes:function(){var t=this.isHoursSet,e=this.hours,n=this.disabledHoursTo,i=this.disabledHoursFrom;return t&&e<n&&e>i},shouldDisableFrom:function(){var t=this.isHoursSet,e=this.hours,n=this.disabledHoursFrom;return t&&e===n},isDoneDisabled:function(){var t=/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,e=this.hours+":"+this.minutes;return!t.test(e)}},methods:{open:function(){this.opened=!0},close:function(){this.opened=!1,this.isHoursSet=!1,this.isMinutesSet=!1},cancel:function(){this.$emit("cancel",this.hours+":"+this.minutes),this.hours=this.initialValue.slice(0,2),this.minutes=this.initialValue.slice(3)},setHours:function(t){this.hours=t,this.isHoursSet=!0},setMinutes:function(t){this.minutes=t,this.isMinutesSet=!0},done:function(){this.$emit("done",this.hours+":"+this.minutes)},updateTime:function(){this.hours=this.initialValue.slice(0,2),this.minutes=this.initialValue.slice(3,5)},onSetTempHours:function(t){this.tempHours=t},onSetTempMins:function(t){this.tempMins=t},onOverlayClick:function(){this.closeOnOverlay&&this.cancel()}},mounted:function(){this.updateTime()}},W=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"clock-picker__dialog",class:{"clock-picker__dialog--active":t.opened}},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[t.opened?n("div",{staticClass:"clock-picker__dialog-drop",on:{click:function(e){t.onOverlayClick()}}}):t._e()]),t._v(" "),n("transition",{attrs:{name:"scale",mode:"out-in"}},[t.opened?n("div",{staticClass:"clock-picker__dialog-body"},[n("div",{staticClass:"clock-picker__dialog-header",style:{backgroundColor:t.activeColor,color:t.activeTextColor,fontFamily:t.font}},[n("span",{on:{click:function(e){t.isHoursSet=!1}}},[t._v(t._s(t.tempHours||t.hours))]),t._v(" "),n("b",[t._v(":")]),t._v(" "),n("span",[t._v(t._s(t.tempMins||t.minutes))])]),t._v(" "),n("div",{staticClass:"clock-picker__dialog-content"},[n("transition",{attrs:{name:"scale",mode:"out-in"}},[t.isHoursSet?t._e():n("clock-picker-hours",{attrs:{"disabled-from":t.disabledHoursFrom,"disabled-to":t.disabledHoursTo,"disabled-mins-from":t.disabledMinutesFrom,"disabled-mins-to":t.disabledMinutesTo,value:t.hours,color:t.color,"disabled-color":t.disabledColor,"active-color":t.activeColor,"active-text-color":t.activeTextColor,font:t.font},on:{"set-temp-hours":function(e){t.onSetTempHours(e)},set:function(e){t.setHours(e)}}})],1),t._v(" "),n("transition",{attrs:{name:"scale",mode:"out-in"}},[t.isHoursSet?n("clock-picker-minutes",{attrs:{"should-disable-all":t.shouldDisableAllMinutes,"should-disable-from":t.shouldDisableFrom,"disabled-from":t.disabledMinutesFrom,"disabled-to":t.disabledMinutesTo,"disabled-hr-from":t.disabledHoursFrom,"disabled-hr-to":t.disabledHoursTo,value:t.minutes,color:t.color,"disabled-color":t.disabledColor,"active-color":t.activeColor,"active-text-color":t.activeTextColor,font:t.font},on:{"set-temp-mins":function(e){t.onSetTempMins(e)},set:function(e){t.setMinutes(e)}}}):t._e()],1)],1),t._v(" "),n("div",{staticClass:"clock-picker__dialog-actions"},[n("button",{staticClass:"clock-picker__dialog-action",style:{color:t.activeColor},attrs:{type:"button"},on:{click:t.cancel}},[t._v(t._s(t.cancelText))]),t._v(" "),n("button",{staticClass:"clock-picker__dialog-action",style:{color:t.isDoneDisabled?t.disabledColor:t.activeColor},attrs:{type:"button",disabled:t.isDoneDisabled},on:{click:t.done}},[t._v(t._s(t.doneText))])])]):t._e()])],1)},K=[];W._withStripped=!0;var X={render:W,staticRenderFns:K},z=X,G=!1,Y=n(2),J=s,Q=Y(q,z,!1,J,null,null);Q.options.__file="src/components/ClockPickerDialog.vue";var Z=Q.exports,tt=function(){var t=Math.random().toString(36).substring(2,9);return"clock_picker_input_"+(Date.now().toString(36)+t)},et={container:"clock-picker__input-container",focus:"clock-picker__input--focused",error:"clock-picker__input--error",value:"clock-picker__input--has-value",input:"clock-picker__input",label:"clock-picker__label"},nt={name:"VueClockPicker",props:{inputContainerClass:{type:String,default:et.container},inputClass:{type:String,default:et.input},inputFocusClass:{type:String,default:et.focus},inputErrorClass:{type:String,default:et.error},inputValueClass:{type:String,default:et.value},labelClass:{type:String,default:et.label},placeholder:{type:String,default:""},name:{type:String,default:"time_input"},label:{type:String,default:""},id:{type:String,default:null},required:{type:Boolean,default:!1},value:{type:String,default:""},disabledFrom:{type:String,default:""},disabledTo:{type:String,default:""},doneText:{type:String,default:"done"},cancelText:{type:String,default:"cancel"},activeColor:{type:String,default:"#a48bd1"},activeTextColor:{type:String,default:"white"},color:{type:String,default:"#757575"},disabledColor:{type:String,default:"#ddd"},closeOnEsc:{type:Boolean,default:!1},closeOnOverlay:{type:Boolean,default:!1},font:{type:String,default:"Roboto, arial, san-serif"}},components:{ClockPickerDialog:Z},data:function(){return{isFocused:!1,dialogOpen:!1,showError:!1,isTouched:!1,uuid:this.id||tt(),timeErrors:{}}},computed:{hasError:function(){return this.checkErrors()&&this.isTouched},hasValue:function(){return!!this.value}},methods:{open:function(){var t=this;this.emitEvent("beforeOpen"),this.$refs.dialog.open(),this.$nextTick(function(){t.emitEvent("open")})},close:function(){var t=this;this.emitEvent("beforeClose"),this.$refs.dialog.close(),this.$nextTick(function(){t.emitEvent("close"),t.isTouched=!0})},cancel:function(t){this.emitEvent("cancel",t),this.close()},onKeydown:function(t){"Escape"===t.key&&this.cancel()},handleDone:function(t){this.$emit("input",t),this.validate(),this.$emit("timeset",t),this.close()},emitEvent:function(t,e){this.$emit(t,e)},getValue:function(){return this.value},setValue:function(t){this.handleDone(t)},isValid:function(){return/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(this.value)},isDisabled:function(t){var e=parseInt(this.disabledFrom.slice(0,2),10),n=parseInt(this.disabledTo.slice(0,2),10),i=parseInt(this.disabledFrom.slice(3),10),o=parseInt(this.disabledTo.slice(3),10),r=parseInt(t.slice(0,2),10),s=parseInt(t.slice(3),10);return e===n&&e===r&&0===i&&59===o||e===n&&e===r&&s>=i&&s<=o||e<n&&r===e&&i<=s||e<n&&r===n&&o>=s||e<n&&r>e&&r<n||e>n},checkErrors:function(){var t=this.required&&!this.value,e=this.value&&!this.isValid(),n=this.value&&this.isDisabled(this.value);return this.timeErrors=l()(this.timeErrors,{required:t,notValid:e,disabled:n}),t||e||n},validate:function(){this.showError=this.checkErrors(),this.isTouched=!0}},mounted:function(){this.value&&this.validate(),this.closeOnEsc&&document.body.addEventListener("keydown",this.onKeydown)},destroy:function(){this.closeOnEsc&&document.body.removeEventListener("keydown",this.onKeydown)}},it=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"clock-picker"},[n("div",{class:(i={},i[t.inputContainerClass]=!0,i[t.inputValueClass]=t.hasValue,i[t.inputErrorClass]=t.hasError&&t.isTouched,i[t.inputFocusClass]=t.isFocused,i)},[t.label?n("label",{class:t.labelClass,attrs:{for:t.uuid}},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("input",{ref:"input",class:t.inputClass,attrs:{type:"text",id:t.uuid,name:t.name,placeholder:t.placeholder,readonly:""},domProps:{value:t.value},on:{click:t.open}}),t._v(" "),t._t("error",[t._v(t._s(t.hasError&&t.isTouched?"Error":""))])],2),t._v(" "),n("clock-picker-dialog",{ref:"dialog",attrs:{"initial-value":t.hasError||!t.value?"--:--":t.value,"disabled-from":t.disabledFrom,"disabled-to":t.disabledTo,"done-text":t.doneText,"cancel-text":t.cancelText,color:t.color,"disabled-color":t.disabledColor,"active-color":t.activeColor,"active-text-color":t.activeTextColor,"close-on-overlay":t.closeOnOverlay,font:t.font},on:{cancel:function(e){t.cancel(e)},done:function(e){t.handleDone(e)}}})],1);var i},ot=[];it._withStripped=!0;var rt={render:it,staticRenderFns:ot},st=rt,at=!1,ut=n(2),lt=a,ct=ut(nt,st,!1,lt,null,null);ct.options.__file="src/components/ClockPicker.vue";e.default=ct.exports},function(t,e){},function(t,e,n){n(34),t.exports=n(0).Object.assign},function(t,e,n){var i=n(4);i(i.S+i.F,"Object",{assign:n(38)})},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){t.exports=!n(8)&&!n(9)(function(){return 7!=Object.defineProperty(n(21)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(12);t.exports=function(t,e){if(!i(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!i(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!i(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!i(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){"use strict";var i=n(14),o=n(42),r=n(43),s=n(11),a=n(23),u=Object.assign;t.exports=!u||n(9)(function(){var t={},e={},n=Symbol(),i="abcdefghijklmnopqrst";return t[n]=7,i.split("").forEach(function(t){e[t]=t}),7!=u({},t)[n]||Object.keys(u({},e)).join("")!=i})?function(t,e){for(var n=s(t),u=arguments.length,l=1,c=o.f,d=r.f;u>l;)for(var f,h=a(arguments[l++]),p=c?i(h).concat(c(h)):i(h),v=p.length,y=0;v>y;)d.call(h,f=p[y++])&&(n[f]=h[f]);return n}:u},function(t,e,n){var i=n(10),o=n(22),r=n(40)(!1),s=n(17)("IE_PROTO");t.exports=function(t,e){var n,a=o(t),u=0,l=[];for(n in a)n!=s&&i(a,n)&&l.push(n);for(;e.length>u;)i(a,n=e[u++])&&(~r(l,n)||l.push(n));return l}},function(t,e,n){var i=n(22),o=n(25),r=n(41);t.exports=function(t){return function(e,n,s){var a,u=i(e),l=o(u.length),c=r(s,l);if(t&&n!=n){for(;l>c;)if((a=u[c++])!=a)return!0}else for(;l>c;c++)if((t||c in u)&&u[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var i=n(16),o=Math.max,r=Math.min;t.exports=function(t,e){return t=i(t),t<0?o(t+e,0):r(t,e)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){"use strict";e.__esModule=!0;var i=n(48),o=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default=function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,o.default)(t)}},function(t,e,n){t.exports={default:n(49),__esModule:!0}},function(t,e,n){n(50),n(59),t.exports=n(0).Array.from},function(t,e,n){"use strict";var i=n(51)(!0);n(52)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=i(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var i=n(16),o=n(15);t.exports=function(t){return function(e,n){var r,s,a=String(o(e)),u=i(n),l=a.length;return u<0||u>=l?t?"":void 0:(r=a.charCodeAt(u),r<55296||r>56319||u+1===l||(s=a.charCodeAt(u+1))<56320||s>57343?t?a.charAt(u):r:t?a.slice(u,u+2):s-56320+(r-55296<<10)+65536)}}},function(t,e,n){"use strict";var i=n(27),o=n(4),r=n(53),s=n(5),a=n(18),u=n(54),l=n(30),c=n(58),d=n(1)("iterator"),f=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,e,n,p,v,y,m){u(n,e,p);var b,g,x,_=function(t){if(!f&&t in w)return w[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},k=e+" Iterator",S="values"==v,C=!1,w=t.prototype,T=w[d]||w["@@iterator"]||v&&w[v],M=T||_(v),E=v?S?_("entries"):M:void 0,O="Array"==e?w.entries||T:T;if(O&&(x=c(O.call(new t)))!==Object.prototype&&x.next&&(l(x,k,!0),i||"function"==typeof x[d]||s(x,d,h)),S&&T&&"values"!==T.name&&(C=!0,M=function(){return T.call(this)}),i&&!m||!f&&!C&&w[d]||s(w,d,M),a[e]=M,a[k]=h,v)if(b={values:S?M:_("values"),keys:y?M:_("keys"),entries:E},m)for(g in b)g in w||r(w,g,b[g]);else o(o.P+o.F*(f||C),e,b);return b}},function(t,e,n){t.exports=n(5)},function(t,e,n){"use strict";var i=n(55),o=n(13),r=n(30),s={};n(5)(s,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(s,{next:o(1,n)}),r(t,e+" Iterator")}},function(t,e,n){var i=n(7),o=n(56),r=n(29),s=n(17)("IE_PROTO"),a=function(){},u=function(){var t,e=n(21)("iframe"),i=r.length;for(e.style.display="none",n(57).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),u=t.F;i--;)delete u.prototype[r[i]];return u()};t.exports=Object.create||function(t,e){var n;return null!==t?(a.prototype=i(t),n=new a,a.prototype=null,n[s]=t):n=u(),void 0===e?n:o(n,e)}},function(t,e,n){var i=n(6),o=n(7),r=n(14);t.exports=n(8)?Object.defineProperties:function(t,e){o(t);for(var n,s=r(e),a=s.length,u=0;a>u;)i.f(t,n=s[u++],e[n]);return t}},function(t,e,n){var i=n(3).document;t.exports=i&&i.documentElement},function(t,e,n){var i=n(10),o=n(11),r=n(17)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),i(t,r)?t[r]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e,n){"use strict";var i=n(20),o=n(4),r=n(11),s=n(60),a=n(61),u=n(25),l=n(62),c=n(63);o(o.S+o.F*!n(65)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,o,d,f=r(t),h="function"==typeof this?this:Array,p=arguments.length,v=p>1?arguments[1]:void 0,y=void 0!==v,m=0,b=c(f);if(y&&(v=i(v,p>2?arguments[2]:void 0,2)),void 0==b||h==Array&&a(b))for(e=u(f.length),n=new h(e);e>m;m++)l(n,m,y?v(f[m],m):f[m]);else for(d=b.call(f),n=new h;!(o=d.next()).done;m++)l(n,m,y?s(d,v,[o.value,m],!0):o.value);return n.length=m,n}})},function(t,e,n){var i=n(7);t.exports=function(t,e,n,o){try{return o?e(i(n)[0],n[1]):e(n)}catch(e){var r=t.return;throw void 0!==r&&i(r.call(t)),e}}},function(t,e,n){var i=n(18),o=n(1)("iterator"),r=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||r[o]===t)}},function(t,e,n){"use strict";var i=n(6),o=n(13);t.exports=function(t,e,n){e in t?i.f(t,e,o(0,n)):t[e]=n}},function(t,e,n){var i=n(64),o=n(1)("iterator"),r=n(18);t.exports=n(0).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||r[i(t)]}},function(t,e,n){var i=n(24),o=n(1)("toStringTag"),r="Arguments"==i(function(){return arguments}()),s=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(e=Object(t),o))?n:r?i(e):"Object"==(a=i(e))&&"function"==typeof e.callee?"Arguments":a}},function(t,e,n){var i=n(1)("iterator"),o=!1;try{var r=[7][i]();r.return=function(){o=!0},Array.from(r,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var r=[7],s=r[i]();s.next=function(){return{done:n=!0}},r[i]=function(){return s},t(r)}catch(t){}return n}},function(t,e,n){t.exports={default:n(67),__esModule:!0}},function(t,e,n){n(68),t.exports=n(0).Object.keys},function(t,e,n){var i=n(11),o=n(14);n(69)("keys",function(){return function(t){return o(i(t))}})},function(t,e,n){var i=n(4),o=n(0),r=n(9);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],s={};s[t]=e(n),i(i.S+i.F*r(function(){n(1)}),"Object",s)}},function(t,e){}])});

/***/ }),

/***/ "./node_modules/@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.min.css":
/*!**********************************************************************************!*\
  !*** ./node_modules/@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.min.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../css-loader??ref--6-1!../../../postcss-loader/src??ref--6-2!./vue2-clock-picker.min.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.min.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.min.css":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/postcss-loader/src??ref--6-2!./node_modules/@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.min.css ***!
  \******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.clock-picker__input {\n  border: 1px solid gainsboro;\n}\n.clock-picker__input--error, .clock-picker__input--error.clock-picker__input--has-value {\n  color: #F44336;\n}\n.clock-picker__input--error .clock-picker__input, .clock-picker__input--error.clock-picker__input--has-value .clock-picker__input {\n    border-color: #F44336;\n}\n.clock-picker__input--has-value .clock-picker__input {\n  border-color: #00E676;\n}\n.clock-picker__button {\n  background: none;\n  width: 24px;\n  height: 24px;\n  display: inline-block;\n  border: 0;\n  border-radius: 12px;\n  line-height: 24px;\n  padding: 0;\n  margin: 0;\n  cursor: pointer;\n  color: #757575;\n  font-weight: 500;\n  font-size: 13px;\n}\n.clock-picker__button:hover {\n    background-color: #f5f5f5;\n}\n.clock-picker__button:active {\n    background-color: #ededed;\n}\n.clock-picker__button:focus {\n    background-color: #e8e8e8;\n}\n.clock-picker__button--active, .clock-picker__button--active:active, .clock-picker__button--active:hover, .clock-picker__button--active:focus {\n    background-color: #a48bd1;\n    color: #fff;\n}\n.clock-picker__button[disabled] {\n    opacity: .4 !important;\n    cursor: default;\n}\n.clock-picker__button[disabled], .clock-picker__button[disabled]:active, .clock-picker__button[disabled]:hover, .clock-picker__button[disabled]:focus {\n      background-color: #f5f5f5;\n      color: #757575;\n}\n\n.clock-picker__dialog {\n  display: none;\n}\n.clock-picker__dialog--active {\n    display: block;\n}\n.clock-picker__dialog-drop {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.2);\n    z-index: 200;\n}\n.clock-picker__dialog-body {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    max-width: 100%;\n    max-height: 100%;\n    overflow: auto;\n    width: 320px;\n    margin: -235px -160px;\n    background-color: #fff;\n    z-index: 201;\n    transform: scale(1);\n    border-radius: 5px;\n    overflow: auto;\n}\n.clock-picker__dialog-header {\n    padding: 1.5rem 1.5rem;\n    font-size: 2rem;\n    text-align: center;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.clock-picker__dialog-header span:hover, .clock-picker__dialog-header span:focus {\n      cursor: pointer;\n}\n.clock-picker__dialog-content {\n    position: relative;\n    width: 100%;\n    height: 280px;\n    margin-top: 24px;\n    margin-bottom: 24px;\n}\n.clock-picker__dialog-content .clock-picker__hours,\n    .clock-picker__dialog-content .clock-picker__minutes {\n      position: absolute;\n}\n.clock-picker__dialog-actions {\n    display: flex;\n    flex-direction: row;\n    border-top: 1px solid #f5f5f5;\n    padding: .5rem;\n}\n.clock-picker__dialog-action {\n    padding: 0 1rem;\n    margin: 0;\n    background: transparent;\n    border: 0;\n    flex: 1;\n    font-size: 16px;\n    font-weight: 500;\n    line-height: 32px;\n    display: inline-block;\n    cursor: pointer;\n}\n.clock-picker__dialog-action:hover {\n      background-color: #f5f5f5;\n}\n.clock-picker__dialog-action:focus {\n      background-color: #ededed;\n}\n.clock-picker__dialog-action:active {\n      background-color: #e6e6e6;\n}\n.clock-picker__dialog-action[disabled] {\n      background-color: #f5f5f5;\n      color: #e6e6e6;\n}\n.clock-picker__dialog-action[disabled]:hover, .clock-picker__dialog-action[disabled]:focus, .clock-picker__dialog-action[disabled]:active {\n        cursor: not-allowed;\n}\n.clock-picker__dialog .scale-enter-active,\n  .clock-picker__dialog .scale-leave-active,\n  .clock-picker__dialog .fade-enter-active,\n  .clock-picker__dialog .fade-leave-active {\n    transition: all .3s ease;\n}\n.clock-picker__dialog .scale-enter,\n  .clock-picker__dialog .scale-leave-active {\n    opacity: 0;\n    transform: scale(0);\n}\n.clock-picker__dialog .fade-enter,\n  .clock-picker__dialog .fade-leave-active {\n    opacity: 0;\n}\n\n.clock-picker__hours {\n  position: relative;\n  width: 100%;\n  height: 280px;\n}\n\n.clock-picker__minutes {\n  position: relative;\n  width: 100%;\n  height: 280px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-currency-input/dist/vue-currency-input.esm.js":
/*!************************************************************************!*\
  !*** ./node_modules/vue-currency-input/dist/vue-currency-input.esm.js ***!
  \************************************************************************/
/*! exports provided: default, CurrencyDirective, CurrencyInput, getValue, parse, setValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyDirective", function() { return directive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyInput", function() { return component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValue", function() { return getValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setValue", function() { return setValue; });
/**
 * Vue Currency Input 1.22.2
 * (c) 2018-2020 Matthias Stiller
 * @license MIT
 */
var escapeRegExp = function (str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
var removeLeadingZeros = function (str) { return str.replace(/^0+(0$|[^0])/, '$1'); };
var count = function (str, search) { return (str.match(new RegExp(escapeRegExp(search), 'g')) || []).length; };
var startsWith = function (str, search) { return str.substring(0, search.length) === search; };
var substringBefore = function (str, search) { return str.substring(0, str.indexOf(search)); };

var DECIMAL_SYMBOLS = [',', '.', '٫'];
var NumberFormat = function NumberFormat (options) {
  var currency = options.currency;
  var locale = options.locale;
  var precision = options.precision;
  var autoDecimalMode = options.autoDecimalMode;
  var valueAsInteger = options.valueAsInteger;
  var numberFormat = new Intl.NumberFormat(locale, typeof currency === 'string' ? { currency: currency, style: 'currency' } : { minimumFractionDigits: 1 });
  var ps = numberFormat.format(123456);
  this.locale = locale;
  this.currency = currency;
  this.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) { return i.toLocaleString(locale); });
  this.decimalSymbol = count(ps, this.digits[0]) ? ps.substr(ps.indexOf(this.digits[6]) + 1, 1) : undefined;
  this.groupingSymbol = ps.substr(ps.indexOf(this.digits[3]) + 1, 1);
  this.minusSymbol = substringBefore(Number(-1).toLocaleString(locale), this.digits[1]);
  if (this.decimalSymbol === undefined) {
    this.minimumFractionDigits = this.maximumFractionDigits = 0;
  } else if (typeof precision === 'number') {
    this.minimumFractionDigits = this.maximumFractionDigits = precision;
  } else if (typeof precision === 'object' && !autoDecimalMode && !valueAsInteger) {
    this.minimumFractionDigits = precision.min || 0;
    this.maximumFractionDigits = precision.max !== undefined ? precision.max : 20;
  } else if (typeof currency === 'string') {
    this.minimumFractionDigits = numberFormat.resolvedOptions().minimumFractionDigits;
    this.maximumFractionDigits = numberFormat.resolvedOptions().maximumFractionDigits;
  } else {
    this.minimumFractionDigits = this.maximumFractionDigits = 2;
  }
  if (typeof currency === 'string') {
    this.prefix = substringBefore(ps, this.digits[1]);
    this.negativePrefix = substringBefore(numberFormat.format(-1), this.digits[1]);
    this.suffix = ps.substring(ps.lastIndexOf(this.decimalSymbol ? this.digits[0] : this.digits[6]) + 1);
  } else {
    this.prefix = (currency || {}).prefix || '';
    this.negativePrefix = "" + (this.minusSymbol) + (this.prefix);
    this.suffix = (currency || {}).suffix || '';
  }
};
NumberFormat.prototype.parse = function parse (str, valueAsInteger) {
    if ( valueAsInteger === void 0 ) valueAsInteger = false;
  if (str) {
    var negative = this.isNegative(str);
    str = this.normalizeDigits(str);
    str = this.stripCurrencySymbol(str);
    str = this.stripMinusSymbol(str);
    var fraction = this.decimalSymbol ? ("(" + (escapeRegExp(this.decimalSymbol)) + "\\d*)?") : '';
    var match = str.match(new RegExp(("^" + (this.integerPattern()) + fraction + "$")));
    if (match) {
      var number = Number(("" + (negative ? '-' : '') + ((this.onlyDigits(match[1]))) + "." + ((this.onlyDigits(match[3] || '')))));
      return valueAsInteger ? Number(number.toFixed(this.maximumFractionDigits).split('.').join('')) : number
    }
  }
  return null
};
NumberFormat.prototype.format = function format (number, options) {
    if ( options === void 0 ) options = {
  minimumFractionDigits: this.minimumFractionDigits,
  maximumFractionDigits: this.maximumFractionDigits
};
  if (typeof this.currency === 'string') {
    return number.toLocaleString(this.locale, Object.assign({}, {style: 'currency',
      currency: this.currency},
      options))
  } else {
    return this.insertCurrencySymbol(Math.abs(number).toLocaleString(this.locale, options), number < 0 || (number === 0 && (1 / number < 0)))
  }
};
NumberFormat.prototype.integerPattern = function integerPattern () {
  return ("(0|[1-9]\\d{0,2}(" + (escapeRegExp(this.groupingSymbol)) + "?\\d{3})*)")
};
NumberFormat.prototype.toFraction = function toFraction (str) {
  return ("" + (this.digits[0]) + (this.decimalSymbol) + ((this.onlyLocaleDigits(str.substr(1)).substr(0, this.maximumFractionDigits))))
};
NumberFormat.prototype.isFractionIncomplete = function isFractionIncomplete (str) {
  return !!this.normalizeDigits(str).match(new RegExp(("^" + (this.integerPattern()) + (escapeRegExp(this.decimalSymbol)) + "$")))
};
NumberFormat.prototype.isNegative = function isNegative (str) {
  return startsWith(str, this.negativePrefix) || startsWith(str.replace('-', this.minusSymbol), this.minusSymbol)
};
NumberFormat.prototype.insertCurrencySymbol = function insertCurrencySymbol (str, negative) {
  return ("" + (negative ? this.negativePrefix : this.prefix) + str + (this.suffix))
};
NumberFormat.prototype.stripMinusSymbol = function stripMinusSymbol (str) {
  return str.replace('-', this.minusSymbol).replace(this.minusSymbol, '')
};
NumberFormat.prototype.stripCurrencySymbol = function stripCurrencySymbol (str) {
  return str.replace(this.negativePrefix, '').replace(this.prefix, '').replace(this.suffix, '')
};
NumberFormat.prototype.normalizeDecimalSymbol = function normalizeDecimalSymbol (str, from) {
    var this$1 = this;
  DECIMAL_SYMBOLS.forEach(function (s) {
    str = str.substr(0, from) + str.substr(from).replace(s, this$1.decimalSymbol);
  });
  return str
};
NumberFormat.prototype.normalizeDigits = function normalizeDigits (str) {
  if (this.digits[0] !== '0') {
    this.digits.forEach(function (digit, index) {
      str = str.replace(new RegExp(digit, 'g'), index);
    });
  }
  return str
};
NumberFormat.prototype.onlyDigits = function onlyDigits (str) {
  return this.normalizeDigits(str).replace(/\D+/g, '')
};
NumberFormat.prototype.onlyLocaleDigits = function onlyLocaleDigits (str) {
  return str.replace(new RegExp(("[^" + (this.digits.join('')) + "]*"), 'g'), '')
};

var DEFAULT_OPTIONS = {
  locale: undefined,
  currency: 'EUR',
  valueAsInteger: false,
  distractionFree: true,
  precision: undefined,
  autoDecimalMode: false,
  valueRange: undefined,
  allowNegative: true
};
var parse = function (formattedValue, options) {
  var mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);
  return new NumberFormat(mergedOptions).parse(formattedValue, mergedOptions.valueAsInteger)
};
var getValue = function (ref) { return (ref.$el || ref).$ci.getValue(); };
var setValue = function (ref, value) {
  (ref.$el || ref).$ci.setValue(value);
};

var equal = function (a, b) {
  if (a === b) {
    return true
  }
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }
  var keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) {
    return false
  }
  if (!keys.every(Object.prototype.hasOwnProperty.bind(b))) {
    return false
  }
  return keys.every(function (key) { return equal(a[key], b[key]); })
};

var DefaultNumberMask = function DefaultNumberMask (numberFormat) {
  this.numberFormat = numberFormat;
};
DefaultNumberMask.prototype.conformToMask = function conformToMask (str, previousConformedValue) {
    var this$1 = this;
    if ( previousConformedValue === void 0 ) previousConformedValue = '';
  var negative = this.numberFormat.isNegative(str);
  var checkIncompleteValue = function (str) {
    if (str === '' && negative && previousConformedValue !== this$1.numberFormat.negativePrefix) {
      return ''
    } else if (this$1.numberFormat.maximumFractionDigits > 0) {
      if (this$1.numberFormat.isFractionIncomplete(str)) {
        return str
      } else if (startsWith(str, this$1.numberFormat.decimalSymbol)) {
        return this$1.numberFormat.toFraction(str)
      }
    }
    return null
  };
  var value = str;
  value = this.numberFormat.stripCurrencySymbol(value);
  value = this.numberFormat.stripMinusSymbol(value);
  var incompleteValue = checkIncompleteValue(value);
  if (incompleteValue != null) {
    return this.numberFormat.insertCurrencySymbol(incompleteValue, negative)
  }
  var ref = value.split(this.numberFormat.decimalSymbol);
    var integer = ref[0];
    var fraction = ref.slice(1);
  var integerDigits = removeLeadingZeros(this.numberFormat.onlyDigits(integer));
  var fractionDigits = this.numberFormat.onlyDigits(fraction.join('')).substr(0, this.numberFormat.maximumFractionDigits);
  var invalidFraction = fraction.length > 0 && fractionDigits.length === 0;
  var invalidNegativeValue = integerDigits === '' && negative && (previousConformedValue === str.slice(0, -1) || previousConformedValue !== this.numberFormat.negativePrefix);
  if (invalidFraction || invalidNegativeValue) {
    return previousConformedValue
  } else if (integerDigits.match(/\d+/)) {
    return {
      numberValue: Number(("" + (negative ? '-' : '') + integerDigits + "." + fractionDigits)),
      fractionDigits: fractionDigits
    }
  } else {
    return ''
  }
};
var AutoDecimalModeNumberMask = function AutoDecimalModeNumberMask (numberFormat) {
  this.numberFormat = numberFormat;
};
AutoDecimalModeNumberMask.prototype.conformToMask = function conformToMask (str) {
  if (str === '') {
    return ''
  }
  var negative = this.numberFormat.isNegative(str);
  var numberValue = this.numberFormat.stripMinusSymbol(str) === ''
    ? -0
    : Number(("" + (negative ? '-' : '') + (removeLeadingZeros(this.numberFormat.onlyDigits(str))))) / Math.pow(10, this.numberFormat.minimumFractionDigits);
  return {
    numberValue: numberValue,
    fractionDigits: numberValue.toFixed(this.numberFormat.minimumFractionDigits).slice(-this.numberFormat.minimumFractionDigits)
  }
};

var getCaretPositionAfterFormat = function (newValue, inputtedValue, caretPosition, numberFormat, options) {
  var prefix = numberFormat.prefix;
  var suffix = numberFormat.suffix;
  var decimalSymbol = numberFormat.decimalSymbol;
  var maximumFractionDigits = numberFormat.maximumFractionDigits;
  var groupingSymbol = numberFormat.groupingSymbol;
  var decimalSymbolPosition = inputtedValue.indexOf(decimalSymbol) + 1;
  var caretPositionFromLeft = inputtedValue.length - caretPosition;
  if (Math.abs(newValue.length - inputtedValue.length) > 1 && caretPosition <= decimalSymbolPosition) {
    return newValue.indexOf(decimalSymbol) + 1
  } else if (newValue.substr(caretPosition, 1) === groupingSymbol && count(newValue, groupingSymbol) === count(inputtedValue, groupingSymbol) + 1) {
    return newValue.length - caretPositionFromLeft - 1
  } else {
    if (!options.autoDecimalMode && decimalSymbolPosition !== 0 && caretPosition > decimalSymbolPosition) {
      if (numberFormat.onlyDigits(inputtedValue.substr(decimalSymbolPosition)).length - 1 === maximumFractionDigits) {
        caretPositionFromLeft -= 1;
      }
    }
    return options.distractionFree.hideCurrencySymbol
      ? newValue.length - caretPositionFromLeft
      : Math.max(newValue.length - Math.max(caretPositionFromLeft, suffix.length), prefix.length === 0 ? 0 : prefix.length + 1)
  }
};
var getDistractionFreeCaretPosition = function (numberFormat, options, value, caretPosition) {
  var result = caretPosition;
  if (options.distractionFree.hideCurrencySymbol) {
    result -= numberFormat.prefix.length;
  }
  if (options.distractionFree.hideGroupingSymbol) {
    result -= count(value.substring(0, caretPosition), numberFormat.groupingSymbol);
  }
  return Math.max(0, result)
};

var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
var NumberInput = function NumberInput (el, options, callbackFns) {
  this.el = el;
  this.callbackFns = callbackFns;
  this.numberValue = null;
  this.addEventListener();
  this.init(options);
  this.setValue(this.currencyFormat.parse(this.el.value));
};
NumberInput.prototype.init = function init (newOptions) {
  var options = Object.assign({}, newOptions);
  var distractionFree = options.distractionFree;
    var autoDecimalMode = options.autoDecimalMode;
    var valueRange = options.valueRange;
  if (typeof distractionFree === 'boolean') {
    options.distractionFree = {
      hideCurrencySymbol: distractionFree,
      hideNegligibleDecimalDigits: distractionFree,
      hideGroupingSymbol: distractionFree
    };
  }
  if (valueRange) {
    options.valueRange = {
      min: valueRange.min !== undefined ? Math.max(valueRange.min, -MAX_SAFE_INTEGER) : -MAX_SAFE_INTEGER,
      max: valueRange.max !== undefined ? Math.min(valueRange.max, MAX_SAFE_INTEGER) : MAX_SAFE_INTEGER
    };
  } else {
    options.valueRange = {
      min: -MAX_SAFE_INTEGER,
      max: MAX_SAFE_INTEGER
    };
  }
  if (autoDecimalMode) {
    options.distractionFree.hideNegligibleDecimalDigits = false;
    this.el.setAttribute('inputmode', 'numeric');
  } else {
    this.el.setAttribute('inputmode', 'decimal');
  }
  this.options = options;
  this.currencyFormat = new NumberFormat(this.options);
  this.numberMask = options.autoDecimalMode ? new AutoDecimalModeNumberMask(this.currencyFormat) : new DefaultNumberMask(this.currencyFormat);
};
NumberInput.prototype.setOptions = function setOptions (options) {
  this.init(options);
  this.applyFixedFractionFormat(this.numberValue, true);
};
NumberInput.prototype.applyFixedFractionFormat = function applyFixedFractionFormat (number, forcedChange) {
  this.format(number != null ? this.currencyFormat.format(this.validateValueRange(number)) : null);
  if (number !== this.numberValue || forcedChange) {
    this.callbackFns.onChange(this.getValue());
  }
};
NumberInput.prototype.getValue = function getValue () {
  return this.currencyFormat.parse(this.formattedValue, this.options.valueAsInteger)
};
NumberInput.prototype.setValue = function setValue (value) {
  var newValue = this.options.valueAsInteger && value != null ? value / Math.pow(10, this.currencyFormat.maximumFractionDigits) : value;
  if (newValue !== this.numberValue) {
    this.applyFixedFractionFormat(newValue);
  }
};
NumberInput.prototype.validateValueRange = function validateValueRange (value) {
  var ref = this.options.valueRange;
    var min = ref.min;
    var max = ref.max;
  return Math.min(Math.max(value, min), max)
};
NumberInput.prototype.updateInputValue = function updateInputValue (value, hideNegligibleDecimalDigits) {
    if ( hideNegligibleDecimalDigits === void 0 ) hideNegligibleDecimalDigits = false;
  if (value != null) {
    if (this.decimalSymbolInsertedAt !== undefined) {
      value = this.currencyFormat.normalizeDecimalSymbol(value, this.decimalSymbolInsertedAt);
      this.decimalSymbolInsertedAt = undefined;
    }
    var conformedValue = this.numberMask.conformToMask(value, this.formattedValue);
    var formattedValue;
    if (typeof conformedValue === 'object') {
      var numberValue = conformedValue.numberValue;
        var fractionDigits = conformedValue.fractionDigits;
      var ref = this.currencyFormat;
        var maximumFractionDigits = ref.maximumFractionDigits;
        var minimumFractionDigits = ref.minimumFractionDigits;
      if (this.focus) {
        minimumFractionDigits = maximumFractionDigits;
      }
      minimumFractionDigits = hideNegligibleDecimalDigits
        ? fractionDigits.replace(/0+$/, '').length
        : Math.min(minimumFractionDigits, fractionDigits.length);
      formattedValue = numberValue > MAX_SAFE_INTEGER
        ? this.formattedValue
        : this.currencyFormat.format(numberValue, {
          useGrouping: !(this.focus && this.options.distractionFree.hideGroupingSymbol),
          minimumFractionDigits: minimumFractionDigits,
          maximumFractionDigits: maximumFractionDigits
        });
    } else {
      formattedValue = conformedValue;
    }
    if (!this.options.allowNegative) {
      formattedValue = formattedValue.replace(this.currencyFormat.negativePrefix, this.currencyFormat.prefix);
    }
    if (this.focus && this.options.distractionFree.hideCurrencySymbol) {
      formattedValue = formattedValue
        .replace(this.currencyFormat.negativePrefix, this.currencyFormat.minusSymbol)
        .replace(this.currencyFormat.prefix, '')
        .replace(this.currencyFormat.suffix, '');
    }
    this.el.value = formattedValue;
    this.numberValue = this.currencyFormat.parse(formattedValue);
  } else {
    this.el.value = this.numberValue = null;
  }
  this.formattedValue = this.el.value;
};
NumberInput.prototype.format = function format (value) {
  this.updateInputValue(value);
  this.callbackFns.onInput(this.getValue());
};
NumberInput.prototype.addEventListener = function addEventListener () {
    var this$1 = this;
  this.el.addEventListener('input', function () {
    var ref = this$1.el;
      var value = ref.value;
      var selectionStart = ref.selectionStart;
    this$1.format(value);
    if (this$1.focus) {
      this$1.setCaretPosition(getCaretPositionAfterFormat(this$1.formattedValue, value, selectionStart, this$1.currencyFormat, this$1.options));
    }
  });
  this.el.addEventListener('focus', function () {
    this$1.focus = true;
    var ref = this$1.options.distractionFree;
      var hideCurrencySymbol = ref.hideCurrencySymbol;
      var hideGroupingSymbol = ref.hideGroupingSymbol;
      var hideNegligibleDecimalDigits = ref.hideNegligibleDecimalDigits;
    if (hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
      setTimeout(function () {
        var ref = this$1.el;
          var value = ref.value;
          var selectionStart = ref.selectionStart;
          var selectionEnd = ref.selectionEnd;
        if (value) {
          this$1.updateInputValue(this$1.el.value, hideNegligibleDecimalDigits);
        }
        if (Math.abs(selectionStart - selectionEnd) > 0) {
          this$1.setCaretPosition(0, this$1.el.value.length);
        } else {
          this$1.setCaretPosition(getDistractionFreeCaretPosition(this$1.currencyFormat, this$1.options, value, selectionStart));
        }
      });
    }
  });
  this.el.addEventListener('keypress', function (e) {
    if (DECIMAL_SYMBOLS.includes(e.key)) {
      this$1.decimalSymbolInsertedAt = this$1.el.selectionStart;
    }
  });
  this.el.addEventListener('blur', function () {
    this$1.focus = false;
    if (this$1.numberValue != null) {
      this$1.applyFixedFractionFormat(this$1.numberValue);
    }
  });
  this.el.addEventListener('change', function () {
    this$1.callbackFns.onChange(this$1.getValue());
  });
};
NumberInput.prototype.setCaretPosition = function setCaretPosition (start, end) {
  if ( end === void 0 ) end = start;
 this.el.setSelectionRange(start, end); };

var directive = {
  bind: function bind (el, ref, vnode) {
    var optionsFromBinding = ref.value;
    var inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input');
    if (!inputElement) {
      throw new Error('No input element found')
    }
    var options = Object.assign({}, DEFAULT_OPTIONS,
      (vnode.context.$ci || {}).globalOptions,
      optionsFromBinding);
    var listeners = (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners) || {};
    var emit = function (event, data) {
      if (listeners[event]) {
        listeners[event](vnode.componentOptions ? data : { target: { value: data } });
      }
    };
    el.$ci = new NumberInput(inputElement, options, {
      onChange: function () { emit('change', inputElement.value); },
      onInput: function () { emit('input', inputElement.value); }
    });
  },
  componentUpdated: function componentUpdated (el, ref) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    if (!equal(value, oldValue)) {
      el.$ci.setOptions(value);
    }
  }
};

var component = {
  render: function render (h) {
    var this$1 = this;
    return h('input', {
      directives: [{
        name: 'currency',
        value: this.options
      }],
      on: Object.assign({}, this.$listeners,
        {change: function () {
          this$1.$emit('change', getValue(this$1.$el));
        },
        input: function () {
          var numberValue = getValue(this$1.$el);
          if (this$1.value !== numberValue) {
            this$1.$emit('input', numberValue);
          }
        }})
    })
  },
  directives: {
    currency: directive
  },
  name: 'CurrencyInput',
  props: {
    value: {
      type: Number,
      default: null
    },
    locale: {
      type: String,
      default: undefined
    },
    currency: {
      type: [String, Object],
      default: undefined
    },
    distractionFree: {
      type: [Boolean, Object],
      default: undefined
    },
    precision: {
      type: [Number, Object],
      default: undefined
    },
    autoDecimalMode: {
      type: Boolean,
      default: undefined
    },
    valueAsInteger: {
      type: Boolean,
      default: undefined
    },
    valueRange: {
      type: Object,
      default: undefined
    },
    allowNegative: {
      type: Boolean,
      default: undefined
    }
  },
  mounted: function mounted () {
    this.setValue(this.value);
  },
  computed: {
    options: function options () {
      var this$1 = this;
      var options = Object.assign({}, DEFAULT_OPTIONS,
        (this.$ci || {}).globalOptions);
      Object.keys(DEFAULT_OPTIONS).forEach(function (key) {
        if (this$1[key] !== undefined) {
          options[key] = this$1[key];
        }
      });
      return options
    }
  },
  watch: {
    value: 'setValue'
  },
  methods: {
    setValue: function setValue$1 (value) {
      setValue(this.$el, value);
    }
  }
};

var plugin = {
  install: function install (Vue, ref) {
    if ( ref === void 0 ) ref = {};
    var componentName = ref.componentName; if ( componentName === void 0 ) componentName = component.name;
    var directiveName = ref.directiveName; if ( directiveName === void 0 ) directiveName = 'currency';
    var globalOptions = ref.globalOptions; if ( globalOptions === void 0 ) globalOptions = {};
    Vue.component(componentName, component);
    Vue.directive(directiveName, directive);
    Vue.prototype.$ci = {
      parse: function (formattedValue, options) { return parse(formattedValue, Object.assign({}, globalOptions, options)); },
      getValue: getValue,
      setValue: setValue,
      globalOptions: globalOptions
    };
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

/* harmony default export */ __webpack_exports__["default"] = (plugin);



/***/ })

}]);