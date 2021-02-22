(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~seller-menu"],{

/***/ "./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js ***!
  \*****************************************************************/
/*! exports provided: disableBodyScroll, clearAllBodyScrollLocks, enableBodyScroll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableBodyScroll", function() { return disableBodyScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAllBodyScrollLocks", function() { return clearAllBodyScrollLocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableBodyScroll", function() { return enableBodyScroll; });
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Older browsers don't support event options, feature detect it.

// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

var hasPassiveEvents = false;
if (typeof window !== 'undefined') {
  var passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return undefined;
    }
  };
  window.addEventListener('testPassive', null, passiveTestOptions);
  window.removeEventListener('testPassive', null, passiveTestOptions);
}

var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


var locks = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting = void 0;
var previousBodyPaddingRight = void 0;

// returns true if `el` should be allowed to receive touchmove events.
var allowTouchMove = function allowTouchMove(el) {
  return locks.some(function (lock) {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true;
    }

    return false;
  });
};

var preventDefault = function preventDefault(rawEvent) {
  var e = rawEvent || window.event;

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target)) {
    return true;
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
};

var setOverflowHidden = function setOverflowHidden(options) {
  // If previousBodyPaddingRight is already set, don't set it again.
  if (previousBodyPaddingRight === undefined) {
    var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    if (_reserveScrollBarGap && scrollBarGap > 0) {
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = scrollBarGap + 'px';
    }
  }

  // If previousBodyOverflowSetting is already set, don't set it again.
  if (previousBodyOverflowSetting === undefined) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

var restoreOverflowSetting = function restoreOverflowSetting() {
  if (previousBodyPaddingRight !== undefined) {
    document.body.style.paddingRight = previousBodyPaddingRight;

    // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
    // can be set again.
    previousBodyPaddingRight = undefined;
  }

  if (previousBodyOverflowSetting !== undefined) {
    document.body.style.overflow = previousBodyOverflowSetting;

    // Restore previousBodyOverflowSetting to undefined
    // so setOverflowHidden knows it can be set again.
    previousBodyOverflowSetting = undefined;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};

var handleScroll = function handleScroll(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return preventDefault(event);
  }

  event.stopPropagation();
  return true;
};

var disableBodyScroll = function disableBodyScroll(targetElement, options) {
  // targetElement must be provided
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
    return;
  }

  // disableBodyScroll must not have been called on this targetElement before
  if (locks.some(function (lock) {
    return lock.targetElement === targetElement;
  })) {
    return;
  }

  var lock = {
    targetElement: targetElement,
    options: options || {}
  };

  locks = [].concat(_toConsumableArray(locks), [lock]);

  if (isIosDevice) {
    targetElement.ontouchstart = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    targetElement.ontouchmove = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = true;
    }
  } else {
    setOverflowHidden(options);
  }
};

var clearAllBodyScrollLocks = function clearAllBodyScrollLocks() {
  if (isIosDevice) {
    // Clear all locks ontouchstart/ontouchmove handlers, and the references.
    locks.forEach(function (lock) {
      lock.targetElement.ontouchstart = null;
      lock.targetElement.ontouchmove = null;
    });

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }

    // Reset initial clientY.
    initialClientY = -1;
  } else {
    restoreOverflowSetting();
  }

  locks = [];
};

var enableBodyScroll = function enableBodyScroll(targetElement) {
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
    return;
  }

  locks = locks.filter(function (lock) {
    return lock.targetElement !== targetElement;
  });

  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }
  } else if (!locks.length) {
    restoreOverflowSetting();
  }
};



/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-cool-lightbox/dist/vue-cool-lightbox.min.css":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-cool-lightbox/dist/vue-cool-lightbox.min.css ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".cool-lightbox{position:fixed;left:0;bottom:0;top:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;right:0;-webkit-transition:all .3s ease;transition:all .3s ease}.cool-lightbox .cool-lightbox-zoom{position:absolute;bottom:15px;left:50%;display:-webkit-box;display:-ms-flexbox;display:flex;z-index:99999;background-color:rgba(15,15,15,.8);border-radius:8px;padding:0 12px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.cool-lightbox .cool-lightbox-zoom input[type=range]{-webkit-appearance:none;margin:10px 0;width:105px;background:0 0}.cool-lightbox .cool-lightbox-zoom input[type=range]:focus{outline:0}.cool-lightbox .cool-lightbox-zoom input[type=range]::-webkit-slider-runnable-track{width:100%;height:4px;cursor:pointer;animate:.2s;-webkit-box-shadow:0 0 0 #000;box-shadow:0 0 0 #000;background:#e6e6e6;border-radius:11px;border:0 solid #000}.cool-lightbox .cool-lightbox-zoom input[type=range]::-webkit-slider-thumb{-webkit-box-shadow:1px 1px 1px #000;box-shadow:1px 1px 1px #000;border:1px solid #000;height:12px;width:12px;border-radius:13px;background:#fff;cursor:pointer;-webkit-appearance:none;margin-top:-4.5px}.cool-lightbox .cool-lightbox-zoom input[type=range]:focus::-webkit-slider-runnable-track{background:#e6e6e6}.cool-lightbox .cool-lightbox-zoom input[type=range]::-moz-range-track{width:100%;height:4px;cursor:pointer;animate:.2s;box-shadow:0 0 0 #000;background:#e6e6e6;border-radius:11px;border:0 solid #000}.cool-lightbox .cool-lightbox-zoom input[type=range]::-moz-range-thumb{box-shadow:1px 1px 1px #000;border:1px solid #000;height:12px;width:12px;border-radius:13px;background:#fff;cursor:pointer}.cool-lightbox .cool-lightbox-zoom input[type=range]::-ms-track{width:100%;height:4px;cursor:pointer;animate:.2s;background:0 0;border-color:transparent;color:transparent}.cool-lightbox .cool-lightbox-zoom input[type=range]::-ms-fill-lower{background:#e6e6e6;border:0 solid #000;border-radius:22px;box-shadow:0 0 0 #000}.cool-lightbox .cool-lightbox-zoom input[type=range]::-ms-fill-upper{background:#e6e6e6;border:0 solid #000;border-radius:22px;box-shadow:0 0 0 #000}.cool-lightbox .cool-lightbox-zoom input[type=range]::-ms-thumb{box-shadow:1px 1px 1px #000;border:1px solid #000;height:12px;width:12px;border-radius:13px;background:#fff;cursor:pointer}.cool-lightbox .cool-lightbox-zoom input[type=range]:focus::-ms-fill-lower{background:#e6e6e6}.cool-lightbox .cool-lightbox-zoom input[type=range]:focus::-ms-fill-upper{background:#e6e6e6}.cool-lightbox .cool-lightbox-zoom .cool-lightbox-zoom__icon{height:15px;width:15px;color:#fff}.cool-lightbox .cool-lightbox-zoom .cool-lightbox-zoom__icon:first-of-type{margin-right:10px}.cool-lightbox .cool-lightbox-zoom .cool-lightbox-zoom__icon:last-of-type{margin-left:10px}.cool-lightbox .cool-lightbox-thumbs{position:absolute;height:100vh;overflow-y:auto;width:102px;right:-102px;top:0;overflow-x:hidden;-webkit-transition:none;transition:none;background-color:#ddd;scrollbar-width:thin;scrollbar-color:#fa4242 rgba(175,175,175,.9)}@media (min-width:767px){.cool-lightbox .cool-lightbox-thumbs{-webkit-transition:all .3s ease;transition:all .3s ease}}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar{width:6px;height:6px}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-button{width:0;height:0}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-thumb{background:#fa4242;border:0 none #fff;border-radius:50px}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-thumb:hover{background:#fff}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-thumb:active{background:#000}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-track{background:#e1e1e1;border:0 none #fff;border-radius:8px}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-track:hover{background:#666}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-track:active{background:#333}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-corner{background:0 0}@media (min-width:767px){.cool-lightbox .cool-lightbox-thumbs{width:212px;right:-212px}}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:2px;padding-right:0}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb{background-color:#000;width:100%;margin-right:2px;margin-bottom:2px;display:block;height:75px;position:relative}@media (min-width:767px){.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb{width:calc(100%/2 - 2px)}}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb:before{top:0;left:0;right:0;bottom:0;opacity:0;content:'';z-index:150;-webkit-transition:all .3s ease;transition:all .3s ease;position:absolute;visibility:hidden;border:3px solid #fa4242}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb.is-video .cool-lightbox__thumb__icon{position:absolute;z-index:100;top:50%;left:50%;width:25px;height:25px;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb.is-video .cool-lightbox__thumb__icon path{fill:#fff}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb.is-video:after{content:'';top:0;left:0;right:0;bottom:0;z-index:50;position:absolute;background:rgba(0,0,0,.6)}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb.active:before,.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb:hover:before{opacity:1;visibility:visible}.cool-lightbox .cool-lightbox__inner{padding:60px 0;position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;-webkit-transition:none;transition:none}@media (min-width:767px){.cool-lightbox .cool-lightbox__inner{-webkit-transition:all .3s ease;transition:all .3s ease}}.cool-lightbox .cool-lightbox__progressbar{position:absolute;top:0;left:0;right:0;height:2px;z-index:500;-webkit-transform-origin:0;transform-origin:0;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:-webkit-transform 3s linear;transition:-webkit-transform 3s linear;transition:transform 3s linear;transition:transform 3s linear, -webkit-transform 3s linear;display:block}.cool-lightbox.cool-lightbox--is-swipping{cursor:-webkit-grabbing;cursor:grabbing}.cool-lightbox.cool-lightbox--is-swipping iframe{pointer-events:none}.cool-lightbox.cool-lightbox--is-swipping .cool-lightbox__slide{-webkit-transition:none;transition:none}.cool-lightbox.cool-lightbox--is-swipping .cool-lightbox__slide.cool-lightbox__slide--hide{display:-webkit-box;display:-ms-flexbox;display:flex;z-index:50}.cool-lightbox.cool-lightbox--zoom-disabled .cool-lightbox__slide .cool-lightbox__slide__img{-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0)}.cool-lightbox.cool-lightbox--can-zoom .cool-lightbox__slide img{cursor:-webkit-zoom-in;cursor:zoom-in}.cool-lightbox.cool-lightbox--is-zooming .cool-lightbox__slide img{cursor:move;cursor:grab;cursor:-webkit-grab}.cool-lightbox.cool-lightbox--is-zooming .cool-lightbox-caption{opacity:0}.cool-lightbox.cool-lightbox--thumbs-right.cool-lightbox--show-thumbs .cool-lightbox__inner{right:102px}@media (min-width:767px){.cool-lightbox.cool-lightbox--thumbs-right.cool-lightbox--show-thumbs .cool-lightbox__inner{right:212px}}.cool-lightbox.cool-lightbox--thumbs-right.cool-lightbox--show-thumbs .cool-lightbox-thumbs{right:0}.cool-lightbox.cool-lightbox--thumbs-bottom .cool-lightbox-thumbs{width:100%;left:0;right:0;top:auto;height:70px;bottom:-70px;overflow:auto}@media (min-width:767px){.cool-lightbox.cool-lightbox--thumbs-bottom .cool-lightbox-thumbs{bottom:-79px;height:79px}}.cool-lightbox.cool-lightbox--thumbs-bottom .cool-lightbox-thumbs .cool-lightbox-thumbs__list{width:100%;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.cool-lightbox.cool-lightbox--thumbs-bottom .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb{width:100px;-ms-flex-negative:0;flex-shrink:0;margin-bottom:0;height:65px}@media (min-width:767px){.cool-lightbox.cool-lightbox--thumbs-bottom .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb{height:75px}}.cool-lightbox.cool-lightbox--thumbs-bottom.cool-lightbox--show-thumbs .cool-lightbox__inner{bottom:70px}@media (min-width:767px){.cool-lightbox.cool-lightbox--thumbs-bottom.cool-lightbox--show-thumbs .cool-lightbox__inner{bottom:79px}}.cool-lightbox.cool-lightbox--thumbs-bottom.cool-lightbox--show-thumbs .cool-lightbox-thumbs{bottom:0}.cool-lightbox *{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0;margin:0}.cool-lightbox button{background:0 0;border:none;cursor:pointer;outline:0}.cool-lightbox svg path,.cool-lightbox svg rect{fill:currentColor}.cool-lightbox .cool-lightbox-button{padding:21px 16px 21px 4px;height:100px;opacity:1;z-index:800;color:#ccc;-webkit-transition:all .3s ease;transition:all .3s ease;position:absolute;top:calc(50% - 50px);width:54px;transition:all .3s ease;visibility:visible}@media (min-width:767px){.cool-lightbox .cool-lightbox-button{width:70px;padding:31px 26px 31px 6px}}.cool-lightbox .cool-lightbox-button.hidden{opacity:0;visibility:hidden}.cool-lightbox .cool-lightbox-button:hover{color:#fff}.cool-lightbox .cool-lightbox-button>.cool-lightbox-button__icon{padding:7px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;background:rgba(30,30,30,.6)}.cool-lightbox .cool-lightbox-button>.cool-lightbox-button__icon>svg{width:100%;height:100%}.cool-lightbox .cool-lightbox-button.cool-lightbox-button--prev{left:0}.cool-lightbox .cool-lightbox-button.cool-lightbox-button--next{right:0;padding:21px 4px 21px 16px}@media (min-width:767px){.cool-lightbox .cool-lightbox-button.cool-lightbox-button--next{padding:31px 6px 31px 26px}}.cool-lightbox .cool-lightbox-pdf{max-width:100%}.cool-lightbox .cool-lightbox__iframe{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;top:50%;left:50%;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;position:relative;-webkit-transform:translate3d(-50%,-50%,0) scale3d(1,1,1);transform:translate3d(-50%,-50%,0) scale3d(1,1,1)}.cool-lightbox .cool-lightbox__iframe iframe{width:100%;height:100%}@media (min-width:767px){.cool-lightbox .cool-lightbox__iframe iframe{max-width:80vw;max-height:80vh}}.cool-lightbox .cool-lightbox__wrapper{width:100%;height:100%;position:relative}.cool-lightbox .cool-lightbox__wrapper.cool-lightbox__wrapper--swipe{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.cool-lightbox .cool-lightbox__wrapper.cool-lightbox__wrapper--swipe .cool-lightbox__slide{-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;height:100%;opacity:.4;-webkit-transition:opacity .3s linear;transition:opacity .3s linear}.cool-lightbox .cool-lightbox__wrapper.cool-lightbox__wrapper--swipe .cool-lightbox__slide.cool-lightbox__slide--current{opacity:1}.cool-lightbox .cool-lightbox__slide{width:100%;top:0;bottom:0;left:0;right:0;z-index:100;display:none;position:absolute;margin-right:30px;-webkit-transition:-webkit-transform .3s ease;transition:-webkit-transform .3s ease;transition:transform .3s ease;transition:transform .3s ease, -webkit-transform .3s ease}.cool-lightbox .cool-lightbox__slide:last-of-type{margin-right:0}.cool-lightbox .cool-lightbox__slide.cool-lightbox__slide--current{display:-webkit-box;display:-ms-flexbox;display:flex}.cool-lightbox .cool-lightbox__slide .cool-lightbox__slide__img{position:absolute;height:100%;width:100%;left:50%;top:50%;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translate3d(-50%,-50%,0) scale3d(1,1,1);transform:translate3d(-50%,-50%,0) scale3d(1,1,1);-webkit-transition:all .3s ease;transition:all .3s ease;display:-webkit-box;display:-ms-flexbox;display:flex}.cool-lightbox .cool-lightbox__slide img{max-width:100%;max-height:100%;margin:auto;z-index:9999;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-box-shadow:0 0 1.5rem rgba(0,0,0,.45);box-shadow:0 0 1.5rem rgba(0,0,0,.45)}.cool-lightbox-toolbar{position:absolute;top:0;right:0;opacity:1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-transition:all .3s ease;transition:all .3s ease;visibility:visible}.cool-lightbox-toolbar.hidden{opacity:0;visibility:hidden}.cool-lightbox-toolbar .cool-lightbox-toolbar__btn{background:rgba(30,30,30,.6);border:0;border-radius:0;-webkit-box-shadow:none;box-shadow:none;cursor:pointer;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;margin:0;padding:9px;position:relative;-webkit-transition:color .2s;transition:color .2s;vertical-align:top;visibility:inherit;width:40px;height:40px;color:#ccc}@media (min-width:767px){.cool-lightbox-toolbar .cool-lightbox-toolbar__btn{width:44px;height:44px;padding:10px}}.cool-lightbox-toolbar .cool-lightbox-toolbar__btn>svg{width:100%;height:100%}.cool-lightbox-toolbar .cool-lightbox-toolbar__btn:hover{color:#fff}.cool-lightbox-caption{bottom:0;color:#eee;font-size:14px;font-weight:400;left:0;opacity:1;line-height:1.5;padding:18px 28px 16px 24px;right:0;text-align:center;direction:ltr;position:absolute;-webkit-transition:opacity .25s ease,visibility 0s ease .25s;transition:opacity .25s ease,visibility 0s ease .25s;z-index:99997;background:-webkit-gradient(linear,left bottom, left top,color-stop(0, rgba(0,0,0,.75)),color-stop(50%, rgba(0,0,0,.3)),color-stop(65%, rgba(0,0,0,.15)),color-stop(75.5%, rgba(0,0,0,.075)),color-stop(82.85%, rgba(0,0,0,.037)),color-stop(88%, rgba(0,0,0,.019)),to(transparent));background:linear-gradient(0deg,rgba(0,0,0,.75) 0,rgba(0,0,0,.3) 50%,rgba(0,0,0,.15) 65%,rgba(0,0,0,.075) 75.5%,rgba(0,0,0,.037) 82.85%,rgba(0,0,0,.019) 88%,transparent)}@media (min-width:767px){.cool-lightbox-caption{padding:22px 30px 23px 30px}}.cool-lightbox-caption a{color:#eee;text-decoration:underline}.cool-lightbox-caption h6{font-size:14px;margin:0 0 6px 0;line-height:130%}@media (min-width:767px){.cool-lightbox-caption h6{font-size:16px;margin:0 0 6px 0}}.cool-lightbox-caption p{font-size:13px;line-height:130%;color:#ccc}@media (min-width:767px){.cool-lightbox-caption p{font-size:15px}}.cool-lightbox-caption p a{color:#ccc}.cool-lightbox-caption p a:hover{color:#eee}.cool-lightbox-modal-enter-active,.cool-lightbox-modal-leave-active{-webkit-transition:opacity .35s;transition:opacity .35s}.cool-lightbox-modal-enter,.cool-lightbox-modal-leave-to{opacity:0}.cool-lightbox-slide-change-enter-active,.cool-lightbox-slide-change-leave-active{-webkit-transition:opacity .27s;transition:opacity .27s}.cool-lightbox-slide-change-enter,.cool-lightbox-slide-change-leave-to{opacity:0}.cool-lightbox-loading-wrapper{top:50%;left:50%;position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.cool-lightbox-loading-wrapper .cool-lightbox-loading{-webkit-animation:cool-lightbox-rotate 1s linear infinite;animation:cool-lightbox-rotate 1s linear infinite;background:0 0;border:4px solid #888;border-bottom-color:#fff;border-radius:50%;height:50px;opacity:.7;padding:0;width:50px;z-index:500}@-webkit-keyframes cool-lightbox-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cool-lightbox-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/vue2-timepicker/dist/VueTimepicker.css":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue2-timepicker/dist/VueTimepicker.css ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".vue__time-picker{display:inline-block;position:relative;font-size:1em;width:10em;font-family:sans-serif;vertical-align:middle}.vue__time-picker *{-webkit-box-sizing:border-box;box-sizing:border-box}.vue__time-picker input.display-time{border:1px solid #d2d2d2;width:10em;height:2.2em;padding:.3em .5em;font-size:1em}.vue__time-picker input.has-custom-icon{padding-left:1.8em}.vue__time-picker input.display-time.invalid:not(.skip-error-style){border-color:#c03;outline-color:#c03}.vue__time-picker input.display-time.disabled,.vue__time-picker input.display-time:disabled{color:#d2d2d2}.vue__time-picker .controls{position:absolute;top:0;bottom:0;right:0;z-index:3;-webkit-box-orient:horizontal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;pointer-events:none}.vue__time-picker .controls,.vue__time-picker .controls>*{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}.vue__time-picker .controls>*{cursor:pointer;width:auto;-webkit-box-orient:vertical;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 .35em;color:#d2d2d2;line-height:100%;font-style:normal;pointer-events:auto;-webkit-transition:color .2s,opacity .2s;transition:color .2s,opacity .2s}.vue__time-picker .controls>:hover{color:#797979}.vue__time-picker .controls>:active,.vue__time-picker .controls>:focus{outline:0}.vue__time-picker .controls .char{font-size:1.1em;line-height:100%;-webkit-margin-before:-.15em}.vue__time-picker .custom-icon{z-index:2;position:absolute;left:0;top:0;bottom:0;width:1.8em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;pointer-events:none}.vue__time-picker .controls img,.vue__time-picker .controls svg,.vue__time-picker .custom-icon img,.vue__time-picker .custom-icon svg{display:inline-block;vertical-align:middle;margin:0;border:0;outline:0;max-width:1em;height:auto}.vue__time-picker .time-picker-overlay{z-index:4;position:fixed;top:0;left:0;right:0;bottom:0}.vue__time-picker .dropdown{position:absolute;z-index:5;top:calc(2.2em + 2px);left:0;background:#fff;-webkit-box-shadow:0 1px 6px rgba(0,0,0,.15);box-shadow:0 1px 6px rgba(0,0,0,.15);width:10em;height:10em;font-weight:400}.vue__time-picker .dropdown.drop-up{top:auto;bottom:calc(2.2em + 1px)}.vue__time-picker .dropdown .select-list{width:10em;height:10em;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.vue__time-picker .dropdown .select-list:active,.vue__time-picker .dropdown .select-list:focus{outline:0}.vue__time-picker .dropdown ul{padding:0;margin:0;list-style:none;outline:0;-webkit-box-flex:1;-ms-flex:1 1 0.00001px;flex:1 1 0.00001px;overflow-x:hidden;overflow-y:auto}.vue__time-picker .dropdown ul.apms,.vue__time-picker .dropdown ul.minutes,.vue__time-picker .dropdown ul.seconds{border-left:1px solid #fff}.vue__time-picker .dropdown ul li{list-style:none;text-align:center;padding:.3em 0;color:#161616}.vue__time-picker .dropdown ul li:not(.hint):not([disabled]):focus,.vue__time-picker .dropdown ul li:not(.hint):not([disabled]):hover{background:rgba(0,0,0,.08);color:#161616;cursor:pointer}.vue__time-picker .dropdown ul li:not([disabled]).active,.vue__time-picker .dropdown ul li:not([disabled]).active:focus,.vue__time-picker .dropdown ul li:not([disabled]).active:hover{background:#41b883;color:#fff}.vue__time-picker .dropdown ul li[disabled],.vue__time-picker .dropdown ul li[disabled]:hover{background:transparent;opacity:.3;cursor:not-allowed}.vue__time-picker .dropdown .hint{color:#a5a5a5;cursor:default;font-size:.8em}", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-cool-lightbox/dist/vue-cool-lightbox.esm.js":
/*!**********************************************************************!*\
  !*** ./node_modules/vue-cool-lightbox/dist/vue-cool-lightbox.esm.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var body_scroll_lock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-scroll-lock */ "./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js");


var LazyLoadDirective = {
  inserted: function (el) {
    function loadImage() {
      var imageElement = Array.from(el.children).find(
        function (el) { return el.nodeName === "IMG"; }
      );
      if (imageElement) {
        imageElement.addEventListener("load", function () {
          setTimeout(function () { return el.classList.add("loaded"); }, 100);
        });
        imageElement.addEventListener("error", function () { return console.log("error"); });
        imageElement.src = imageElement.dataset.url;
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      var options = {
        root: null,
        threshold: "0"
      };
      var observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }
    if (window["IntersectionObserver"]) {
      createObserver();
    } else {
      loadImage();
    }
  }
};

var AutoplayObserver = {
    inserted: function (el) {
      // getYoutube ID
      function isYoutubeVideo(url) {

        // youtube data
        var youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        var ytId = (url.match(youtubeRegex)) ? RegExp.$1 : false;

        if(ytId) {
          return true;
        }

        return false;
      }

      function autoplayVideo() {
        var tagName = el.tagName;
        var autoplay = el.dataset.autoplay; 
        if(autoplay) {
          if(tagName === 'VIDEO') {
            el.muted = true;
            el.autoplay = true;

            return;
          }

          if(tagName === 'IFRAME') {
            var url = new URL(el.src);
            var muted = 'muted';

            if(isYoutubeVideo(el.src)) {
              muted = 'mute';
            }

            // append autoplay
            url.searchParams.append(muted, 1);
            url.searchParams.append('autoplay', 1);

            el.src = url.href;
          }
        }
      }
  
      function handleIntersect(entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            autoplayVideo();
            observer.unobserve(el);
          }
        });
      }
  
      function createObserver() {
        var options = {
          root: null,
          threshold: "0"
        };
        var observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(el);
      }
      if (window["IntersectionObserver"]) {
        createObserver();
      } else {
        loadImage();
      }
    }
  };

//

var script = {
  directives: {
    lazyload: LazyLoadDirective,
    autoplayObserver: AutoplayObserver,
  },

  data: function data() {
    return {
      // swipe data
      initialMouseX: 0,
      initialMouseY: 0,
      endMouseX: 0,
      endMouseY: 0,
      swipeType: null,
      IsSwipping: false,
      isDraggingSwipe: false,

      // use for mouse wheel
      prevTime: 0,

      // swipe effect
      xSwipeWrapper: 0,
      ySwipeWrapper: 0,
      swipeAnimation: null,
      swipeInterval: null,
      lightboxInnerWidth: null,

      // styles data
      imgIndex: this.index,
      isVisible: false,
      paddingBottom: false,
      imageLoading: false,
      showThumbs: false,
      isFullScreenMode: false,

      // aspect ratio videos
      aspectRatioVideo: {
        width: 'auto',
        height: 'auto',
      },

      // props to bind styles
      buttonsVisible: true,
      scale: 1,
      top: 0,
      left: 0,
      lastX: 0,
      lastY: 0,
      isDraging: false,
      canZoom: true,
      isZooming: false,
      transition: 'all .3s ease',
      zoomBar: 0,

      // slideshow playing data
      isPlayingSlideShow: false,
      intervalProgress: null,
      loopData: false,
      stylesInterval: {
        'display': 'block'
      }
    };
  },

  props: {
    index: {
      required: true
    },

    effect: {
      type: String,
      default: 'swipe'
    },

    items: {
      type: Array,
      required: true,
    },

    loop: {
      type: Boolean,
      default: true,
    },

    slideshow: {
      type: Boolean,
      default: true,
    },

    slideshowColorBar: {
      type: String,
      default: '#fa4242',
    },

    slideshowDuration: {
      type: Number,
      default: 3000,
    },
    
    useZoomBar: {
      type: Boolean,
      default: false,
    },

    closeOnClickOutsideMobile: {
      type: Boolean,
      default: false,
    },
    
    srcName: {
      type: String,
      default: 'src',
    },
    
    srcThumb: {
      type: String,
      default: 'thumb',
    },

    srcMediaType: {
      type: String,
      default: 'mediaType',
    },

    overlayColor: {
      type: String,
      default: 'rgba(30, 30, 30, .9)'
    },

    zIndex: {
      type: Number,
      default: 9999,
    },

    gallery: {
      type: Boolean,
      default: true,
    },

    fullScreen: {
      type: Boolean,
      default: false,
    },

    thumbsPosition: {
      type: String,
      default: 'right',
    },

    youtubeCookies: {
      type: Boolean,
      default: true,
    },

    enableWheelEvent: {
      type: Boolean,
      default: false,
    },

    showCloseButton: {
      type: Boolean,
      default: true,
    },
    
    disableZoom: {
      type: Boolean,
      default: false,
    },

    dir: {
      type: String,
      default: 'ltr',
    },

    enableScrollLock: {
      type: Boolean,
      default: true,
    },
  },

  watch: {
    zoomBar: function zoomBar(newVal, prevVal) {
      var item;
      if(this.isZooming) {
        if(this.effect == 'swipe') {
          item = this.$refs.items[this.imgIndex].childNodes[0];
        } else {
          item = this.$refs.items.childNodes[0];
        }

        var newZoom = 1.6 + newVal/10;
        item.style.transform  = 'translate3d(calc(-50% + '+this.left+'px), calc(-50% + '+this.top+'px), 0px) scale3d('+newZoom+', '+newZoom+', '+newZoom+')';
      }
    },

    showThumbs: function showThumbs(prev, val) {
      var widthGalleryBlock = 212;
      var swipeAnimation = 'all .3s ease';
      if(window.innerWidth < 767) {
        widthGalleryBlock = 102;
        swipeAnimation = null;
      }

      if (this.thumbsPosition === 'bottom') {
        widthGalleryBlock = 0;
      }

      var self = this;
      this.swipeAnimation = swipeAnimation;

      if(prev) {

        if(this.dir === 'rtl') {
          this.xSwipeWrapper = this.imgIndex*(window.innerWidth - widthGalleryBlock) + 30*this.imgIndex;
        } else {
          this.xSwipeWrapper = -this.imgIndex*(window.innerWidth - widthGalleryBlock) - 30*this.imgIndex;
        }

      } else {
        
        if(this.dir === 'rtl') {
          this.xSwipeWrapper = this.imgIndex*window.innerWidth + 30*this.imgIndex;
        } else {
          this.xSwipeWrapper = -this.imgIndex*window.innerWidth - 30*this.imgIndex;
        }

      }

      setTimeout(function() {
        self.swipeAnimation = null;
      }, 300);
    },

    index: function index(prev, val) {
      var self = this;
      
      // body scroll lock
      var $body = document.querySelector('body');

      if(prev !== null) {
        
        // swipe type
        this.swipeType = null;
        this.initialMouseY = 0;
        this.ySwipeWrapper = 0;
        
        // set loop from data
        this.loopData = this.loop;

        // swipe effect case remove loop
        if(this.effect === 'swipe') {
          this.loopData = false;
          window.addEventListener('resize', this.xPositionOnResize);
        }

        // add img index
        this.imgIndex = prev;
        this.isVisible = true;

        // add events listener
        window.addEventListener('keydown', this.eventListener);

        // add wheel event
        if(this.enableWheelEvent) {
          window.addEventListener('wheel', this.wheelEvent);
        }
        
        // only in mobile
        if(window.innerWidth < 700) {

          // add click event
          setTimeout(function() {
            window.addEventListener('click', self.showButtons);
          }, 200);
        }

        if (this.enableScrollLock) {
          setTimeout(function() {
            self.setCompensateForScrollbar();
            Object(body_scroll_lock__WEBPACK_IMPORTED_MODULE_0__["disableBodyScroll"])(self.$refs.coolLightbox);
          }, 50);
        }

      } else {

        // hide and stop slideshow
        this.isVisible = false;
        this.stopSlideShow();

        // set starts X to 0
        this.startsX = 0;
        this.initialMouseY = 0;
        this.swipeType = null;

        // clear interval
        clearInterval(this.swipeInterval);
        this.swipeAnimation = null;

        // finish swipe
        this.isDraggingSwipe = false;
        this.isZooming = true;

        // remove events listener
        window.removeEventListener('keydown', this.eventListener);

        if (this.enableScrollLock) {
          self.removeCompensateForScrollbar();
          Object(body_scroll_lock__WEBPACK_IMPORTED_MODULE_0__["enableBodyScroll"])(self.$refs.coolLightbox);
        }

        // remove click event
        window.removeEventListener('click', this.showButtons);

        // remove resize event
        window.removeEventListener('resize', this.xPositionOnResize);
        
        // remove wheel event
        if(this.enableWheelEvent) {
          window.removeEventListener('wheel', this.wheelEvent);
        }
      }

    }, 
    
    imgIndex: function imgIndex(prev, val) {
      var this$1 = this;
      
      // when animation is loaded
      this.$nextTick(function () {

        if(this$1.effect === 'swipe') {
          this$1.setLightboxInnerWidth();
          this$1.setXPosition(prev);
        }
        
        if(prev !== null & val === null) {
          this$1.$emit("on-open", prev);
        }

        if(prev !== null) {
          if(prev !== val) {
            if(!this$1.getYoutubeUrl(this$1.getItemSrc(prev)) && !this$1.getVimeoUrl(this$1.getItemSrc(prev))) {
              this$1.stopVideos();
            }
          }

          // if is an image change imageLoading to true
          if(!this$1.getVideoUrl(this$1.getItemSrc(prev))) {
            if(!this$1.is_cached(this$1.getItemSrc(prev))) {
              this$1.imageLoading = true;
            }
          }

          // add caption padding to Lightbox wrapper
          this$1.addCaptionPadding();
          
          // setAspectRatioVideo when is swipe
          if(this$1.effect === 'swipe') {
            this$1.setAspectRatioVideo();
          } else {

            if(this$1.getVideoUrl(this$1.getItemSrc(prev))) {
              this$1.setAspectRatioVideo();
            }
          }
        }

        // reset zoom
        this$1.resetZoom();

        // reset swipe type
        this$1.swipeType = null;
        this$1.ySwipeWrapper = 0;

      });
    }, 
  },

  beforeDestroy: function beforeDestroy () {
    if (this.enableScrollLock) {
      this.removeCompensateForScrollbar();
      if(this.$refs.coolLightbox) {
        Object(body_scroll_lock__WEBPACK_IMPORTED_MODULE_0__["enableBodyScroll"])(this.$refs.coolLightbox);
      }
    }
  },

  methods: {
    getExtFromItem: function getExtFromItem(imgIndex) {
      if(imgIndex === null) {
        return false
      }

      if(this.checkIfIsObject(imgIndex)) {
        var item = this.items[imgIndex];

        //item extension is specified, so return it
        if (item['ext']) {
          return item['ext']
        }

        return 'mp4';
      }
    },

    stopVideos: function stopVideos() {
      var videos = document.getElementsByClassName("cool-lightbox-video");
      var isVideoPlaying = function (video) { return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2); };
      if(videos.length > 0) {
        Array.prototype.forEach.call(videos, function (video) {
          var type = video.tagName;
          
          if(type === 'IFRAME') {
            var iframeSrc = video.src;
            return video.src = iframeSrc;
          }

          if(isVideoPlaying(video)) {
            return video.pause();
          }

        });
      }
    }, 

    removeCompensateForScrollbar: function removeCompensateForScrollbar() {
      document.body.classList.remove("compensate-for-scrollbar");
      var noscrollStyle = document.getElementById("coollightbox-style-noscroll");
      if(noscrollStyle !== null) {
        document.getElementById("coollightbox-style-noscroll").remove();
      }
    },

    setCompensateForScrollbar: function setCompensateForScrollbar() {
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (
        !isMobile &&
        document.body.scrollHeight > window.innerHeight
      ) {
        document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend',
          '<style id="coollightbox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
            (window.innerWidth - document.documentElement.clientWidth) +
          "px;}</style>"
        );

        document.body.classList.add("compensate-for-scrollbar");
      }
    }, 

    setAutoplay: function setAutoplay(itemIndex) {
      if(this.checkIfIsObject(itemIndex) && this.items[itemIndex].hasOwnProperty('autoplay') && this.items[itemIndex].autoplay) {
        return true;
      }

      return false;
    },

    toggleFullScreenMode: function toggleFullScreenMode() {
      if(this.isFullScreenMode) {
        this.closeFullscreen();
      } else {
        this.fullScreenMode();
      }

      this.isFullScreenMode = !this.isFullScreenMode;
    },

    closeFullscreen: function closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    },

    fullScreenMode: function fullScreenMode() {
      /* Get the documentElement (<html>) to display the page in fullscreen */
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },

    // check if event is arrow button or toolbar button
    checkIfIsButton: function checkIfIsButton(eventEmit) {
      var elements = '.cool-lightbox-button, .cool-lightbox-button *, .cool-lightbox-toolbar__btn, .cool-lightbox-toolbar__btn *, .cool-lightbox-caption h6, .cool-lightbox-caption p, .cool-lightbox-caption a';
      if (event.target.matches(elements)) {
        return true
      }

      return false
    },

    // start swipe event
    startSwipe: function startSwipe(event) {
      if(this.isZooming) {
        return false;
      }

      // check if is some button
      if(this.checkIfIsButton(event)) {
        return false;
      }

      // clear interval
      clearInterval(this.swipeInterval);
      this.swipeAnimation = null;

      // starts swipe
      this.isDraggingSwipe = true;
      this.initialMouseX = this.getMouseXPosFromEvent(event);
      this.initialMouseY = this.getMouseYPosFromEvent(event);
    },

    // continue swipe event
    continueSwipe: function continueSwipe(event) {
      if(this.isDraggingSwipe) {
        this.IsSwipping = true;
        var currentPosX = this.getMouseXPosFromEvent(event);
        var currentPosY = this.getMouseYPosFromEvent(event);
        var windowWidth = this.lightboxInnerWidth;

        // diffs
        var diffX = Math.abs(currentPosX - this.initialMouseX);
        var diffY = Math.abs(currentPosY - this.initialMouseY);

        // swipe type
        if(this.swipeType == null) {
          if(diffY > 5 || diffX > 5) {
            if(diffY > diffX) {
              this.swipeType = 'v';
            } else {
              this.swipeType = 'h';
            }
          }
        }

        // swipe
        if(this.swipeType == 'h') {
          // swipe wrapper
          if(this.dir === 'rtl') {
            this.xSwipeWrapper = (windowWidth*this.imgIndex) + currentPosX - this.initialMouseX + 30*this.imgIndex;
          } else {
            this.xSwipeWrapper = -(windowWidth*this.imgIndex) + currentPosX - this.initialMouseX - 30*this.imgIndex;
          }

        } else {
          this.ySwipeWrapper = currentPosY - this.initialMouseY;
        }

        // mobile caseS
        if(event.type === 'touchmove') {
          this.endMouseX = this.getMouseXPosFromEvent(event);
          this.endMouseY = this.getMouseYPosFromEvent(event);
        }
      }
    },

    // end swipe event
    endSwipe: function endSwipe(event) {
      if(this.checkIfIsButton(event) && this.initialMouseX === 0) {
        return false;
      }

      // event check is dragging and swipe
      var self = this;
      var swipeType = this.swipeType;
      this.isDraggingSwipe = false;
      
      // horizontal swipe type
      if(this.initialMouseX === 0 && swipeType == 'h') {
        return false
      }

      // touch end fixes
      if(event.type !== 'touchend') {
        this.endMouseX = this.getMouseXPosFromEvent(event);
        this.endMouseY = this.getMouseYPosFromEvent(event);
      } else {
        if(this.endMouseX === 0) {
          return;
        }
      }

      // check if is dragged 
      if(
        ((this.endMouseX - this.initialMouseX === 0) && swipeType == 'h') || 
        this.isZooming ||
        ((this.endMouseY - this.initialMouseY === 0) && swipeType == 'v')
      ) {
        return;
      } 
      
      // set swipe animation
      this.setSwipeAnimation();

      // reset swipe data
      setTimeout(function() {
        self.IsSwipping = false;
        self.initialMouseX = 0;
        self.endMouseX = 0;
      }, 10);

      // type of swipe
      if(this.swipeType === 'h') {

        // if the swipe is to the right
        if((this.endMouseX - this.initialMouseX) < -40) {
          if(this.dir === 'rtl') {
            return this.swipeToLeft()
          }
          return this.swipeToRight()
        } 

        // if the swipe is to the left
        if((this.endMouseX - this.initialMouseX) > 40) {
          if(this.dir === 'rtl') {
            return this.swipeToRight()
          }
          return this.swipeToLeft();
        }
      }


      if(this.swipeType === 'v') {
        var diffY = Math.abs(this.endMouseY - this.initialMouseY);

        // diff Y
        if(diffY >= 90) {
          this.close();
        } else {
          this.ySwipeWrapper = 0;
        }
      } 
      
      this.swipeType = null;
      var windowWidth = this.lightboxInnerWidth;

      if(this.dir === 'rtl') {
        this.xSwipeWrapper = this.imgIndex*windowWidth + 30*this.imgIndex;
        return;
      }

      this.xSwipeWrapper = -this.imgIndex*windowWidth - 30*this.imgIndex;
    },
    
    // swipe to left effect
    swipeToLeft: function swipeToLeft() {
      if(!this.hasPrevious && this.effect === 'swipe') {

        if(this.dir === 'rtl') {
          return this.xSwipeWrapper = this.imgIndex*this.lightboxInnerWidth + 30*this.imgIndex
        }

        return this.xSwipeWrapper = -this.imgIndex*this.lightboxInnerWidth - 30*this.imgIndex
      }

      this.changeIndexToPrev();
    },
    
    // swipe to right effect
    swipeToRight: function swipeToRight() {
      if(!this.hasNext && this.effect === 'swipe') {

        if(this.dir === 'rtl') {
          return this.xSwipeWrapper = this.imgIndex*this.lightboxInnerWidth + 30*this.imgIndex
        }

        return this.xSwipeWrapper = -this.imgIndex*this.lightboxInnerWidth - 30*this.imgIndex
      }

      this.changeIndexToNext();
    },

    // function that return x position from event
    getMouseXPosFromEvent: function getMouseXPosFromEvent(event) {
      if(event.type.indexOf('mouse') !== -1){
          return event.clientX;
      }
      return event.touches[0].clientX;
    },
    
    // function that return Y position from event
    getMouseYPosFromEvent: function getMouseYPosFromEvent(event) {
      if(event.type.indexOf('mouse') !== -1){
          return event.clientY;
      }
      return event.touches[0].clientY;
    },

    // check if the image is cached
    is_cached: function is_cached(src) {
      var image = new Image();
      image.src = src;

      return image.complete;
    },

    // image loaded event
    imageLoaded: function imageLoaded() {
      this.imageLoading = false;
    },

    // get video url
    itemThumb: function itemThumb(itemUrl, itemIndex) {

      var thumb = this.getItemThumb(itemIndex);
      if(thumb) {
        return thumb
      }

      var youtubeID = this.getYoutubeID(itemUrl);
      if(youtubeID) {
        return 'https://img.youtube.com/vi/'+youtubeID+'/mqdefault.jpg'
      }

      var vimeoID = this.getVimeoID(itemUrl);
      if(vimeoID) {
        return false
      }

      return itemUrl
    },
    
    // get item src
    getItemSrc: function getItemSrc(imgIndex) {
      if(imgIndex === null) {
        return false
      }

      var item = this.items[imgIndex];
      if(this.checkIfIsObject(imgIndex)) {
        return item[this.srcName]
      }

      return item
    },
    
    getItemAlt: function getItemAlt(imgIndex) {
      if(imgIndex === null) {
        return false
      }

      var item = this.items[imgIndex];
      if(this.checkIfIsObject(imgIndex)) {
        return item.alt;
      }

      return null
    },

    getItemThumb: function getItemThumb(imgIndex) {
      if(imgIndex === null) {
        return false
      }

      var item = this.items[imgIndex];
      if(this.checkIfIsObject(imgIndex)) {
        return item[this.srcThumb]
      } 

      if(this.getVideoUrl(item)) {
        return false
      }

      return item
    },

    // get item media type
    getMediaType: function getMediaType(imgIndex) {
      if(imgIndex === null) {
        return false
      }

      if(this.checkIfIsObject(imgIndex)) {
        
        var item$1 = this.items[imgIndex];

        //item type is specified, so return it
        if (item$1[this.srcMediaType]) {
          return item$1[this.srcMediaType]
        }
      }
    
      if (this.getVideoUrl(this.getItemSrc(imgIndex))) {
        return 'video'
      } else if (this.getPDFurl(this.getItemSrc(imgIndex))) { 
        return 'iframe'
      } else {
        return 'image'
      }
    },

    // toggle play slideshow event
    togglePlaySlideshow: function togglePlaySlideshow() {
      if(!this.slideshow) {
        return false
      }

      if(!this.hasNext && !this.loopData) {
        return false
      }
      this.isPlayingSlideShow = !this.isPlayingSlideShow;

      // if is playing move if not stop it
      if(this.isPlayingSlideShow) {
        this.move();
      } else {
        this.stopSlideShow();
      }
    },

    // stop slideshow
    stopSlideShow: function stopSlideShow() {
      this.isPlayingSlideShow = false;
      clearInterval(this.intervalProgress);
      this.stylesInterval = {
        'transform': 'scaleX(0)',
        'transition': 'none',
      };
    },

    // move event in zoom
    move: function move() {
      var self = this;
      this.progressWidth = 100;
      this.intervalProgress = setInterval(frame, this.slideshowDuration + 90);
      
      self.stylesInterval = {
        'transform': 'scaleX(1)',
        'background': this.slideshowColorBar,
        'transition-duration': this.slideshowDuration+'ms',
      };
      function frame() {
        self.stylesInterval = {
          'transform': 'scaleX(0)',
          'transition': 'none',
        };
        
        if(self.dir === 'rtl') {
          self.onPrevClick(true);
        } else {
          self.onNextClick(true);
        }

        if(!self.hasNext && !self.loopData) {
          self.stopSlideShow();
        } else {
          setTimeout(function() {
            self.stylesInterval = {
              'transform': 'scaleX(1)',
              'background': self.slideshowColorBar,
              'transition-duration': self.slideshowDuration+'ms',
            };
          }, 50);
        }
      }
    }, 

    // show buttons event
    showButtons: function showButtons(event) {
      if (!this.checkIfIsButton(event)) {
        var self = this;
        setTimeout(function() {
          self.buttonsVisible = !self.buttonsVisible;
        }, 100);
      }
    },

    // check if is allowed to drag
    checkMouseEventPropButton: function checkMouseEventPropButton(button) {
      if (!this.isZooming) { return false }
      // mouse left btn click
      return button === 0
    },

    // handle mouse down event
    handleMouseDown: function handleMouseDown(e) {
      if (!this.checkMouseEventPropButton(e.button)) { return }
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.isDraging = true;
      e.stopPropagation();
    },

    // handle mouse up event
    handleMouseUp: function handleMouseUp(e) {
      if (!this.checkMouseEventPropButton(e.button)) { return }
      this.isDraging = false;
      this.lastX = this.lastY = 0;

      // Fix drag zoom out
      var thisContext = this;
      setTimeout(function() {
        thisContext.canZoom = true;
      }, 100);
    },

    // handle mouse move event
    handleMouseMove: function handleMouseMove(e) {
      if (!this.checkMouseEventPropButton(e.button)) { return }
      if (this.isDraging) {
        this.top = this.top - this.lastY + e.clientY;
        this.left = this.left - this.lastX + e.clientX;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.canZoom = false;
        
        var item = e.target.parentNode;
        var newZoom = 1.6 + this.zoomBar/10;
        item.style.transform  = 'translate3d(calc(-50% + '+this.left+'px), calc(-50% + '+this.top+'px), 0px) scale3d('+newZoom+', '+newZoom+', '+newZoom+')';
      }
      e.stopPropagation();
    },

    // zoom image event
    zoomImage: function zoomImage(indexImage) {
      if(this.disableZoom) {
        return false
      }

      if(window.innerWidth < 700) {
        return false
      }

      if(!this.canZoom) {
        return false
      }

      if(this.IsSwipping) {
        return false
      }

      // item zoom
      var item;
      if(this.effect == 'swipe') {
        item = this.$refs.items[this.imgIndex].childNodes[0];
      } else {
        item = this.$refs.items.childNodes[0];
      }
      
      // zoom variables
      var isZooming = this.isZooming;
      var thisContext = this;

      // Is zooming check
      if(isZooming) {
        if(!this.isDraging) { 
          this.isZooming = false;
          this.zoomBar = 0;
        }
      } else {
        this.isZooming = true;
      }

      // check if is zooming
      if(this.isZooming) {
        this.stopSlideShow();

        // add scale
        item.style.transform  = 'translate3d(calc(-50%), calc(-50%), 0px) scale3d(1.6, 1.6, 1.6)';

        // hide buttons
        this.buttonsVisible = false;

        // fix drag transition problems
        setTimeout(function() {
          thisContext.transition = 'all .0s ease';
        }, 100);

      } else {

        // show buttons 
        this.buttonsVisible = true;
        this.resetZoom();
      }
    },

    // Reset zoom data
    resetZoom: function resetZoom() {
      this.scale = 1;
      this.left = 0;
      this.top = 0;
      this.zoomBar = 0;
      this.isZooming = false;
      this.swipeType = null;
      this.transition = 'all .3s ease';

      // only if index is not null
      if(this.imgIndex != null) {
        
        var item;
        if(this.effect == 'swipe') {
          item = this.$refs.items[this.imgIndex].childNodes[0];
        } else {
          item = this.$refs.items.childNodes[0];
        }

        // reset styles
        if(this.disableZoom) {
          item.style.transform  = 'translate3d(calc(-50% + '+this.left+'px), calc(-50% + '+this.top+'px), 0px)';
        } else {
          item.style.transform  = 'translate3d(calc(-50% + '+this.left+'px), calc(-50% + '+this.top+'px), 0px) scale3d(1, 1, 1)';
        }

        this.initialMouseX = 0;
        if(window.innerWidth >= 700) {
          this.buttonsVisible = true;
        }
      }
    },

    // Aspect Ratio responsive video
    setAspectRatioVideo: function setAspectRatioVideo() {

      var thisContext = this;
      var el = document.getElementsByClassName('cool-lightbox__inner');
      el = el[0];

      var computedStyle = getComputedStyle(el);
      if(window.innerWidth < 700) {

        var width = el.clientWidth;
        var height = Math.round((width/16)*9);

        this.aspectRatioVideo.height = height+'px';
        this.aspectRatioVideo.width = width+'px';

      } else {
        
        setTimeout(function() {
          var height = el.clientHeight;
          height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);

          var width = (height/9)*16;

          thisContext.aspectRatioVideo.height = height+'px';
          thisContext.aspectRatioVideo.width = width+'px';
        }, 150);

      }
    },

    // close event
    close: function close() {
      this.stopSlideShow();
      this.swipeType = null;
      this.$emit("close", this.imgIndex);
      this.showThumbs = false;
      this.imgIndex = null;
    },

    wheelEvent: function wheelEvent(event) {
      var delay = 350;
      var currentTime = new Date().getTime();
      var direction = event.deltaY > 0 ? 'top' : 'down';

      if (currentTime - this.prevTime < delay) { return; }

      this.prevTime = currentTime;

      switch (direction) {
        case 'top':
          return this.changeIndexToPrev();
        case 'down':
          return this.changeIndexToNext();
      }
    },

    // close event click outside
    closeModal: function closeModal(event) {
      if(!this.closeOnClickOutsideMobile) {
        if(window.innerWidth < 700) {
          return false;
        }
      }

      if(this.IsSwipping) {
        return false;
      }

      var elements = '.cool-lightbox-zoom, .cool-lightbox-zoom *, .cool-lightbox-thumbs, svg, path, rect, .cool-lightbox-thumbs *, .cool-lightbox-button, .cool-lightbox-toolbar__btn, .cool-lightbox-toolbar__btn *, .cool-lightbox-button *, .cool-lightbox__slide__img *, .cool-lightbox-video, .cool-lightbox-caption h6, .cool-lightbox-caption p, .cool-lightbox-caption a';
      if (!event.target.matches(elements)) {
        this.close();
      }
    },

    // set swipe animation
    setSwipeAnimation: function setSwipeAnimation() {
      var self = this;
      clearInterval(this.swipeInterval);
      this.swipeAnimation = null;

      // animation swipe
      this.swipeAnimation = 'all .3s ease';
      this.swipeInterval = setInterval(interval, 330);

      function interval() {
        self.swipeAnimation = null;
      }
    },

    // next slide event
    onNextClick: function onNextClick(isFromSlideshow) {
      if ( isFromSlideshow === void 0 ) isFromSlideshow = false;

      if(this.isZooming) {
        return false;
      }

      if(!isFromSlideshow) {
        this.stopSlideShow();
      }

      this.setSwipeAnimation();

      if(this.dir === 'rtl') {
        return this.changeIndexToPrev();
      }

      this.changeIndexToNext();
    },

    // prev slide event
    onPrevClick: function onPrevClick(isFromSlideshow) {
      if ( isFromSlideshow === void 0 ) isFromSlideshow = false;

      if(this.isZooming) {
        return false;
      }
      
      if(!isFromSlideshow) {
        this.stopSlideShow();
      }
      
      this.setSwipeAnimation();

      if(this.dir === 'rtl') {
        return this.changeIndexToNext();
      }

      this.changeIndexToPrev();
    },

    // change to next index
    changeIndexToNext: function changeIndexToNext() {
      if(this.hasNext) {
        this.onIndexChange(this.imgIndex + 1);
      } else {
        // only if has loop prop
        if(this.loopData) {
          this.onIndexChange(0);
        }
      }
    },

    // change to prev index
    changeIndexToPrev: function changeIndexToPrev() {
      if(this.hasPrevious) {
        this.onIndexChange(this.imgIndex - 1);
      } else {
        // only if has loop prop
        if(this.loopData) {
          this.onIndexChange(this.items.length - 1);
        }
      }
    },

    // set lightbox inner width
    setLightboxInnerWidth: function setLightboxInnerWidth() {
      var el = document.getElementsByClassName('cool-lightbox__inner');
      var width = el[0].clientWidth;
      this.lightboxInnerWidth = width;
    },

    // x position on resize event
    xPositionOnResize: function xPositionOnResize() {
      this.setLightboxInnerWidth();
      var index = this.imgIndex;

      if(this.dir === 'rtl') {
        this.xSwipeWrapper = index*this.lightboxInnerWidth+30*index;
        return;
      }

      // set x position
      this.xSwipeWrapper = -index*this.lightboxInnerWidth-30*index;
    },

    // set x position by img index
    setXPosition: function setXPosition(index) {
      if(this.dir === 'rtl') {
        this.xSwipeWrapper = index*this.lightboxInnerWidth+30*index;
        return
      }

      // set x position
      this.xSwipeWrapper = -index*this.lightboxInnerWidth-30*index;
      return; 
    },

    // index change
    onIndexChange: function onIndexChange(index) {
      this.imgIndex = index;
      this.$emit('on-change', index);
    },

    // caption size 
    addCaptionPadding: function addCaptionPadding() {
      if(this.checkIfIsObject(this.imgIndex) && (this.items[this.imgIndex].title || this.items[this.imgIndex].descripcion)) {
        var el = document.getElementsByClassName('cool-lightbox-caption');
        if(el.length > 0) {
          this.paddingBottom = el[0].offsetHeight;
        } 
      } else {
        this.paddingBottom = 60;
      }
    },

    getPDFurl: function getPDFurl(url) {
      if(this.imgIndex === null) {
        return false
      }

      var str = new String(url);
      if(str.endsWith('.pdf')){
        return url
      }

      return false
    },

    // check if is video
    getVideoUrl: function getVideoUrl(itemSrc) {

      var youtubeUrl = this.getYoutubeUrl(itemSrc);
      var vimeoUrl = this.getVimeoUrl(itemSrc);
      var mp4Url = this.checkIsMp4(itemSrc);

      if(youtubeUrl) {
        return youtubeUrl
      }

      if(vimeoUrl) {
        return vimeoUrl
      }

      if(mp4Url) {
        return mp4Url
      }

      return false
    },
    
    // getYoutube ID
    getYoutubeID: function getYoutubeID(url) {

      // youtube data
      var youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      var ytId = (url.match(youtubeRegex)) ? RegExp.$1 : false;

      if(ytId) {
        return ytId
      }

      return false
    },

    // get youtube url
    getYoutubeUrl: function getYoutubeUrl(url) {

      // youtube data
      var ytId = this.getYoutubeID(url);

      // if is youtube video
      if(ytId) {

        // check if allows youtube cookies
        if(this.youtubeCookies) {
          return 'https://www.youtube.com/embed/'+ytId
        }

        return 'https://www.youtube-nocookie.com/embed/'+ytId
      }

      return false
    },

    // vimeo ID
    getVimeoID: function getVimeoID(url) {
      
      // if is vimeo video
      var result = url.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i);
      if(result !== null) {
        return result[1]
      }

      return false
    },

    // get vimeo url
    getVimeoUrl: function getVimeoUrl(url) {

      // if is vimeo video
      var result = url.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i);
      if(result !== null) {
        return '//player.vimeo.com/video/'+result[1]+'?hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1'
      }

      return false
    },

    // check if video is mp4
    checkIsMp4: function checkIsMp4(url) {
      if(this.imgIndex === null) {
        return false
      }

      var str = new String(url);
      if(
        (str.indexOf('.mp4') !== -1) || 
        (str.indexOf('.mov') !== -1) || 
        (str.indexOf('.webm') !== -1) || 
        (str.indexOf('.ogg') !== -1) || 
        (str.indexOf('.avi') !== -1)
      ) {
        return url
      }

      return false
    },

    // if is video get extension
    getVideoExt: function getVideoExt(url) {
      if(this.imgIndex === null) {
        return false
      }

      var str = new String(url);
      if(str.indexOf('.mp4') !== -1 || str.indexOf('.mov') !== -1){
        return 'mp4'
      }

      if(str.indexOf('.webm') !== -1) {
        return 'webm'
      }

      if(str.indexOf('.ogg') !== -1) {
        return 'ogg'
      }
      
      if(str.indexOf('.avi') !== -1) {
        return 'avi'
      }

      return false
    },

    // check if item is object
    checkIfIsObject: function checkIfIsObject(itemIndex) {
      var item = this.items[itemIndex];
      if(typeof item === 'object' && item !== null) {
        return true
      }
      return false;
    },

    // arrows and escape events
    eventListener: function eventListener(e) {
      switch (e.keyCode) {
        case 39:
          return this.onNextClick()
        case 37:
          return this.onPrevClick()
        case 38:
        case 40:
        case ' ':
          return e.preventDefault()
        case 27:
          return this.close()
      }
    },
  },

  computed: {
    
    // Images wrapper styles to use drag and zoom
    imgWrapperStyle: function imgWrapperStyle() {
      return {
        top: "50%",
        left: "50%",
        transition: this.transition,
      }
    },

    // lightbox styles
    lightboxStyles: function lightboxStyles() {
      return { 
        'z-index': this.zIndex,
        'background-color': this.overlayColor,
      }
    },

    innerStyles: function innerStyles() {
      return {
        'padding-bottom': this.paddingBottom+'px',
      }
    },

    // get item src
    itemSrc: function itemSrc() {
      if(this.imgIndex === null) {
        return false
      }

      var item = this.items[this.imgIndex];
      if(this.checkIfIsObject(this.imgIndex)) {
        return item[this.srcName]
      }

      return item
    },

    // Lightbox classes
    lightboxClasses: function lightboxClasses() {
      var classesReturn = [
        { 'cool-lightbox--can-zoom': this.canZoom && !this.disableZoom },
        { 'cool-lightbox--zoom-disabled': this.disableZoom},
        { 'cool-lightbox--is-zooming': this.isZooming },
        { 'cool-lightbox--show-thumbs': this.showThumbs },
        { 'cool-lightbox--is-swipping': this.isDraggingSwipe }
      ];

      var classString = 'cool-lightbox--thumbs-'+this.thumbsPosition;
      classesReturn.push(classString);

      return classesReturn
    },

    // Buttons classes
    buttonsClasses: function buttonsClasses() {
      return {
        'hidden': !this.buttonsVisible,
      }
    },

    // check if the slide has next element
    hasNextButton: function hasNextButton() {
      if(this.dir === 'rtl') {
        return (this.imgIndex - 1 >= 0)
      }
        
      return (this.imgIndex + 1 < this.items.length)
    },

    // check if the slide has previous element 
    hasPreviousButton: function hasPreviousButton() {
      if(this.dir === 'rtl') {
        return (this.imgIndex + 1 < this.items.length)
      }

      return (this.imgIndex - 1 >= 0)
    },

    // check if the slide has next element
    hasNext: function hasNext() {
      return (this.imgIndex + 1 < this.items.length)
    },

    // check if the slide has previous element 
    hasPrevious: function hasPrevious() {
      return (this.imgIndex - 1 >= 0)
    },
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"cool-lightbox-modal"}},[(_vm.isVisible)?_c('div',{ref:"coolLightbox",staticClass:"cool-lightbox",class:_vm.lightboxClasses,style:(_vm.lightboxStyles),on:{"click":_vm.closeModal}},[(_vm.gallery)?_c('div',{staticClass:"cool-lightbox-thumbs"},[_c('div',{staticClass:"cool-lightbox-thumbs__list"},_vm._l((_vm.items),function(item,itemIndex){return _c('button',{key:itemIndex,staticClass:"cool-lightbox__thumb",class:{ 
            active: itemIndex === _vm.imgIndex,
            'is-video': _vm.getMediaType(itemIndex) === 'video' 
          },attrs:{"type":"button"},on:{"click":function($event){_vm.imgIndex = itemIndex;}}},[(_vm.getMediaType(itemIndex) === 'video')?_c('svg',{staticClass:"cool-lightbox__thumb__icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M6.5 5.4v13.2l11-6.6z"}})]):_vm._e(),_vm._v(" "),_c('img',{attrs:{"src":_vm.itemThumb(_vm.getItemSrc(itemIndex), itemIndex),"alt":""}})])}),0)]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"cool-lightbox__inner",style:(_vm.innerStyles),on:{"mousedown":_vm.startSwipe,"mousemove":_vm.continueSwipe,"mouseup":_vm.endSwipe,"touchstart":_vm.startSwipe,"touchmove":_vm.continueSwipe,"touchend":_vm.endSwipe}},[_c('div',{staticClass:"cool-lightbox__progressbar",style:(_vm.stylesInterval)}),_vm._v(" "),_c('div',{staticClass:"cool-lightbox__navigation"},[_c('button',{directives:[{name:"show",rawName:"v-show",value:((_vm.hasPreviousButton || _vm.loopData) && _vm.items.length > 1),expression:"(hasPreviousButton || loopData) && items.length > 1"}],staticClass:"cool-lightbox-button cool-lightbox-button--prev",class:_vm.buttonsClasses,attrs:{"type":"button","title":"Previous"},on:{"click":_vm.onPrevClick}},[_vm._t("icon-previous",[_c('div',{staticClass:"cool-lightbox-button__icon"},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"}})])])])],2),_vm._v(" "),_c('button',{directives:[{name:"show",rawName:"v-show",value:((_vm.hasNextButton || _vm.loopData) && _vm.items.length > 1),expression:"(hasNextButton || loopData) && items.length > 1"}],staticClass:"cool-lightbox-button cool-lightbox-button--next",class:_vm.buttonsClasses,attrs:{"type":"button","title":"Next"},on:{"click":function($event){return _vm.onNextClick(false)}}},[_vm._t("icon-next",[_c('div',{staticClass:"cool-lightbox-button__icon"},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"}})])])])],2)]),_vm._v(" "),(_vm.effect === 'swipe')?_c('div',{staticClass:"cool-lightbox__wrapper cool-lightbox__wrapper--swipe",style:({
          transform: 'translate3d('+_vm.xSwipeWrapper+'px, '+_vm.ySwipeWrapper+'px, 0)',
          transition: _vm.swipeAnimation
        })},_vm._l((_vm.items),function(item,itemIndex){return _c('div',{key:itemIndex,ref:"items",refInFor:true,staticClass:"cool-lightbox__slide",class:{ 'cool-lightbox__slide--current': itemIndex === _vm.imgIndex }},[(_vm.getMediaType(itemIndex) === 'image')?_c('div',{directives:[{name:"lazyload",rawName:"v-lazyload"}],key:"image",staticClass:"cool-lightbox__slide__img",style:(_vm.imgWrapperStyle)},[_c('img',{key:itemIndex,attrs:{"data-url":_vm.getItemSrc(itemIndex),"draggable":"false","alt":_vm.getItemAlt(itemIndex)},on:{"load":_vm.imageLoaded,"click":function($event){return _vm.zoomImage(itemIndex)},"mousedown":function($event){return _vm.handleMouseDown($event)},"mouseup":function($event){return _vm.handleMouseUp($event)},"mousemove":function($event){return _vm.handleMouseMove($event)},"touchstart":function($event){return _vm.handleMouseDown($event)},"touchmove":function($event){return _vm.handleMouseMove($event)},"touchend":function($event){return _vm.handleMouseUp($event)}}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.imageLoading),expression:"imageLoading"}],staticClass:"cool-lightbox-loading-wrapper"},[_vm._t("loading",[_c('div',{staticClass:"cool-lightbox-loading"})])],2)]):_c('div',{key:"video",staticClass:"cool-lightbox__iframe"},[((!_vm.checkIsMp4(_vm.getItemSrc(itemIndex)) && _vm.getMediaType(itemIndex) === 'video'))?_c('iframe',{directives:[{name:"autoplayObserver",rawName:"v-autoplayObserver"}],key:itemIndex,staticClass:"cool-lightbox-video",style:(_vm.aspectRatioVideo),attrs:{"data-autoplay":_vm.setAutoplay(itemIndex),"src":_vm.getVideoUrl(_vm.getItemSrc(itemIndex)),"frameborder":"0","allow":"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture","allowfullscreen":""}}):_vm._e(),_vm._v(" "),((_vm.getMediaType(itemIndex) === 'iframe') || (_vm.getPDFurl(_vm.getItemSrc(itemIndex))))?_c('iframe',{key:itemIndex,staticClass:"cool-lightbox-pdf",attrs:{"src":_vm.getItemSrc(itemIndex),"frameborder":"0","allowfullscreen":""}}):_vm._e(),_vm._v(" "),(_vm.checkIsMp4(_vm.getItemSrc(itemIndex)) || _vm.getMediaType(itemIndex) === 'webVideo')?_c('video',{directives:[{name:"autoplayObserver",rawName:"v-autoplayObserver"}],key:_vm.checkIsMp4(_vm.getItemSrc(itemIndex)),staticClass:"cool-lightbox-video",style:(_vm.aspectRatioVideo),attrs:{"data-autoplay":_vm.setAutoplay(itemIndex),"controls":"","controlslist":"nodownload","l":"","poster":""}},[_c('source',{attrs:{"src":_vm.checkIsMp4(_vm.getItemSrc(itemIndex)),"type":'video/'+(_vm.getVideoExt(_vm.getItemSrc(itemIndex)) ? _vm.getVideoExt(_vm.getItemSrc(itemIndex)) : _vm.getExtFromItem(itemIndex))}}),_vm._v("\n              Sorry, your browser doesn't support embedded videos\n            ")]):_vm._e()])])}),0):_vm._e(),_vm._v(" "),(_vm.effect === 'fade')?_c('div',{staticClass:"cool-lightbox__wrapper"},[_c('div',{ref:"items",staticClass:"cool-lightbox__slide cool-lightbox__slide--current"},[_c('transition',{attrs:{"name":"cool-lightbox-slide-change","mode":"out-in"}},[(_vm.getMediaType(_vm.imgIndex) === 'image')?_c('div',{key:"image",staticClass:"cool-lightbox__slide__img",style:(_vm.imgWrapperStyle)},[_c('transition',{attrs:{"name":"cool-lightbox-slide-change","mode":"out-in"}},[_c('img',{key:_vm.imgIndex,attrs:{"src":_vm.getItemSrc(_vm.imgIndex),"draggable":"false","alt":_vm.getItemAlt(_vm.imgIndex)},on:{"load":_vm.imageLoaded,"click":_vm.zoomImage,"mousedown":function($event){return _vm.handleMouseDown($event)},"mouseup":function($event){return _vm.handleMouseUp($event)},"mousemove":function($event){return _vm.handleMouseMove($event)}}})]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.imageLoading),expression:"imageLoading"}],staticClass:"cool-lightbox-loading-wrapper"},[_vm._t("loading",[_c('div',{staticClass:"cool-lightbox-loading"})])],2)],1):_c('div',{key:"video",staticClass:"cool-lightbox__iframe"},[_c('transition',{attrs:{"name":"cool-lightbox-slide-change","mode":"out-in"}},[((!_vm.checkIsMp4(_vm.getItemSrc(_vm.imgIndex)) && _vm.getMediaType(_vm.imgIndex) === 'video'))?_c('iframe',{directives:[{name:"autoplayObserver",rawName:"v-autoplayObserver"}],key:_vm.getVideoUrl(_vm.getItemSrc(_vm.imgIndex)),staticClass:"cool-lightbox-video",style:(_vm.aspectRatioVideo),attrs:{"data-autoplay":_vm.setAutoplay(_vm.imgIndex),"src":_vm.getVideoUrl(_vm.getItemSrc(_vm.imgIndex)),"frameborder":"0","allow":"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture","allowfullscreen":""}}):_vm._e(),_vm._v(" "),((_vm.getMediaType(_vm.imgIndex) === 'iframe') || (_vm.getPDFurl(_vm.getItemSrc(_vm.imgIndex))))?_c('iframe',{key:_vm.imgIndex,staticClass:"cool-lightbox-pdf",attrs:{"src":_vm.getItemSrc(_vm.imgIndex),"frameborder":"0","allowfullscreen":""}}):_vm._e(),_vm._v(" "),(_vm.checkIsMp4(_vm.getItemSrc(_vm.imgIndex)) || _vm.getMediaType(_vm.imgIndex) === 'webVideo')?_c('video',{directives:[{name:"autoplayObserver",rawName:"v-autoplayObserver"}],key:_vm.checkIsMp4(_vm.getItemSrc(_vm.imgIndex)),staticClass:"cool-lightbox-video",style:(_vm.aspectRatioVideo),attrs:{"data-autoplay":_vm.setAutoplay(_vm.imgIndex),"controls":"","controlslist":"nodownload","poster":""}},[_c('source',{attrs:{"src":_vm.checkIsMp4(_vm.getItemSrc(_vm.imgIndex)),"type":'video/'+(_vm.getVideoExt(_vm.getItemSrc(_vm.imgIndex)) ? _vm.getVideoExt(_vm.getItemSrc(_vm.imgIndex)) : _vm.getExtFromItem(_vm.imgIndex))}}),_vm._v("\n                  Sorry, your browser doesn't support embedded videos\n                ")]):_vm._e()])],1)])],1)]):_vm._e(),_vm._v(" "),_c('transition',{attrs:{"name":"cool-lightbox-modal"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.checkIfIsObject(_vm.imgIndex) && (_vm.items[_vm.imgIndex].title || _vm.items[_vm.imgIndex].description)),expression:"checkIfIsObject(imgIndex) && (items[imgIndex].title || items[imgIndex].description)"}],key:"caption-block",staticClass:"cool-lightbox-caption"},[_c('transition',{attrs:{"name":"cool-lightbox-slide-change","mode":"out-in"}},[(_vm.checkIfIsObject(_vm.imgIndex) && _vm.items[_vm.imgIndex].title)?_c('h6',{key:"title",domProps:{"innerHTML":_vm._s(_vm.items[_vm.imgIndex].title)}}):_vm._e()]),_vm._v(" "),_c('transition',{attrs:{"name":"cool-lightbox-slide-change","mode":"out-in"}},[(_vm.checkIfIsObject(_vm.imgIndex) && _vm.items[_vm.imgIndex].description)?_c('p',{key:"description",domProps:{"innerHTML":_vm._s(_vm.items[_vm.imgIndex].description)}}):_vm._e()])],1)]),_vm._v(" "),_c('div',{staticClass:"cool-lightbox-toolbar",class:_vm.buttonsClasses},[(this.slideshow && _vm.items.length > 1)?_c('button',{staticClass:"cool-lightbox-toolbar__btn",attrs:{"type":"button","title":"Play slideshow"},on:{"click":_vm.togglePlaySlideshow}},[(!_vm.isPlayingSlideShow)?_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M6.5 5.4v13.2l11-6.6z"}})]):_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg"}},[_c('g',[_c('rect',{attrs:{"id":"svg_4","height":"11.97529","width":"11.728392","y":"6.030873","x":"6.259265","stroke-width":"1.5","stroke":"#000","fill":"#000000"}})])])]):_vm._e(),_vm._v(" "),(_vm.items.length > 1 && _vm.gallery)?_c('button',{staticClass:"cool-lightbox-toolbar__btn",attrs:{"type":"button","title":"Show thumbnails"},on:{"click":function($event){_vm.showThumbs = !_vm.showThumbs;}}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 \n            0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 \n            0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 \n            0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"}})])]):_vm._e(),_vm._v(" "),(_vm.fullScreen)?_c('button',{staticClass:"cool-lightbox-toolbar__btn",attrs:{"type":"button","title":"Fullscreen"},on:{"click":_vm.toggleFullScreenMode}},[_c('svg',{attrs:{"width":"20px","height":"20px","viewBox":"0 0 18 18","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"}})])]):_vm._e(),_vm._v(" "),(_vm.showCloseButton)?_c('button',{staticClass:"cool-lightbox-toolbar__btn",attrs:{"type":"button","title":"Close"},on:{"click":_vm.close}},[_vm._t("close",[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"}})])])],2):_vm._e()])],1),_vm._v(" "),_c('transition',{attrs:{"name":"cool-lightbox-modal"}},[(_vm.isZooming && _vm.useZoomBar)?_c('div',{staticClass:"cool-lightbox-zoom"},[_c('svg',{staticClass:"cool-lightbox-zoom__icon",attrs:{"height":"469pt","viewBox":"0 -192 469.33333 469","width":"469pt","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"m437.332031.167969h-405.332031c-17.664062 \n          0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 \n          32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0"}})]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.zoomBar),expression:"zoomBar"}],attrs:{"type":"range","name":"points","min":"0","max":"50"},domProps:{"value":(_vm.zoomBar)},on:{"__r":function($event){_vm.zoomBar=$event.target.value;}}}),_vm._v(" "),_c('svg',{staticClass:"cool-lightbox-zoom__icon",attrs:{"height":"426.66667pt","viewBox":"0 0 426.66667 426.66667","width":"426.66667pt","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 \n          9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 \n          11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 \n          21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 \n          21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"}})])]):_vm._e()])],1):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var CoolLightBox = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component("CoolLightBox", CoolLightBox);
}

var plugin = {
  install: install
};

var GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

CoolLightBox.install = install;

/* harmony default export */ __webpack_exports__["default"] = (CoolLightBox);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-cool-lightbox/dist/vue-cool-lightbox.min.css":
/*!***********************************************************************!*\
  !*** ./node_modules/vue-cool-lightbox/dist/vue-cool-lightbox.min.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader??ref--6-1!../../postcss-loader/src??ref--6-2!./vue-cool-lightbox.min.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-cool-lightbox/dist/vue-cool-lightbox.min.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

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



/***/ }),

/***/ "./node_modules/vue2-timepicker/dist/VueTimepicker.common.js":
/*!*******************************************************************!*\
  !*** ./node_modules/vue2-timepicker/dist/VueTimepicker.common.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyNames = __webpack_require__("241c").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__("6eeb");
var anObject = __webpack_require__("825a");
var fails = __webpack_require__("d039");
var flags = __webpack_require__("ad6d");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "2626":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var definePropertyModule = __webpack_require__("9bf2");
var wellKnownSymbol = __webpack_require__("b622");
var DESCRIPTORS = __webpack_require__("83ab");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4160":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var forEach = __webpack_require__("17c2");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "45fc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $some = __webpack_require__("b727").some;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('some');
var USES_TO_LENGTH = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "466d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toLength = __webpack_require__("50c4");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aFunction = __webpack_require__("1c0b");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "498a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $trim = __webpack_require__("58a8").trim;
var forcedStringTrimMethod = __webpack_require__("c8d2");

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ "4d63":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var inheritIfRequired = __webpack_require__("7156");
var defineProperty = __webpack_require__("9bf2").f;
var getOwnPropertyNames = __webpack_require__("241c").f;
var isRegExp = __webpack_require__("44e7");
var getFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var setInternalState = __webpack_require__("69f3").set;
var setSpecies = __webpack_require__("2626");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = getFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y && sticky) setInternalState(result, { sticky: sticky });

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__("0366");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var getIteratorMethod = __webpack_require__("35a1");

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5319":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__("44e7");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "60da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var objectKeys = __webpack_require__("df75");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var has = __webpack_require__("5135");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    if (document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("d039");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a15b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IndexedObject = __webpack_require__("44ad");
var toIndexedObject = __webpack_require__("fc6a");
var arrayMethodIsStrict = __webpack_require__("a640");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "a434":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var toAbsoluteIndex = __webpack_require__("23cb");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var toObject = __webpack_require__("7b0b");
var arraySpeciesCreate = __webpack_require__("65f0");
var createProperty = __webpack_require__("8418");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a630":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var from = __webpack_require__("4df4");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "aab0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_timepicker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fd6f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_timepicker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_timepicker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_timepicker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ab13":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "ae40":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__("e163");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c740":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $findIndex = __webpack_require__("b727").findIndex;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8d2":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var whitespaces = __webpack_require__("5899");

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ "c975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $indexOf = __webpack_require__("4d64").indexOf;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "caad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $includes = __webpack_require__("4d64").includes;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cca6":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var assign = __webpack_require__("60da");

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var has = __webpack_require__("5135");
var isObject = __webpack_require__("861d");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"08a1de70-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/vue-timepicker.vue?vue&type=template&id=11d43692&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"vue__time-picker time-picker",style:(_vm.inputWidthStyle)},[_c('input',{ref:"input",staticClass:"display-time",class:[_vm.inputClass, {'is-empty': _vm.inputIsEmpty, 'invalid': _vm.hasInvalidInput, 'all-selected': _vm.allValueSelected, 'disabled': _vm.disabled, 'has-custom-icon': _vm.$slots && _vm.$slots.icon }],style:(_vm.inputWidthStyle),attrs:{"type":"text","id":_vm.id,"name":_vm.name,"placeholder":_vm.placeholder ? _vm.placeholder : _vm.formatString,"tabindex":_vm.disabled ? -1 : _vm.tabindex,"disabled":_vm.disabled,"readonly":!_vm.manualInput,"autocomplete":_vm.autocomplete},domProps:{"value":_vm.inputIsEmpty ? null : _vm.customDisplayTime},on:{"focus":_vm.onFocus,"change":_vm.onChange,"blur":function($event){_vm.debounceBlur(); _vm.blurEvent()},"mousedown":_vm.onMouseDown,"keydown":[_vm.keyDownHandler,function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }if($event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey){ return null; }return _vm.escBlur($event)}],"compositionstart":_vm.onCompostionStart,"compositionend":_vm.onCompostionEnd,"paste":_vm.pasteHandler}}),(_vm.showClearBtn || _vm.showDropdownBtn)?_c('div',{staticClass:"controls",attrs:{"tabindex":"-1"}},[(!_vm.isActive && _vm.showClearBtn)?_c('span',{staticClass:"clear-btn",class:{'has-custom-btn': _vm.$slots && _vm.$slots.clearButton },attrs:{"tabindex":"-1"},on:{"click":_vm.clearTime}},[_vm._t("clearButton",[_c('span',{staticClass:"char"},[_vm._v("×")])])],2):_vm._e(),(_vm.showDropdownBtn)?_c('span',{staticClass:"dropdown-btn",class:{'has-custom-btn': _vm.$slots && _vm.$slots.dropdownButton },attrs:{"tabindex":"-1"},on:{"click":function($event){return _vm.setDropdownState(_vm.fixedDropdownButton ? !_vm.showDropdown : true, true)},"mousedown":_vm.keepFocusing}},[_vm._t("dropdownButton",[_c('span',{staticClass:"char"},[_vm._v("▾")])])],2):_vm._e()]):_vm._e(),(_vm.$slots && _vm.$slots.icon)?_c('div',{staticClass:"custom-icon"},[_vm._t("icon")],2):_vm._e(),(_vm.showDropdown)?_c('div',{staticClass:"time-picker-overlay",attrs:{"tabindex":"-1"},on:{"click":_vm.toggleActive}}):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showDropdown),expression:"showDropdown"}],staticClass:"dropdown",class:[_vm.dropdownDirClass],style:(_vm.inputWidthStyle),attrs:{"tabindex":"-1"},on:{"mouseup":_vm.keepFocusing,"click":function($event){$event.stopPropagation();}}},[_c('div',{staticClass:"select-list",style:(_vm.inputWidthStyle),attrs:{"tabindex":"-1"}},[(!_vm.advancedKeyboard)?[_vm._l((_vm.columnsSequence),function(column){return [(column === 'hour')?_c('ul',{key:column,staticClass:"hours",on:{"scroll":_vm.keepFocusing}},[_c('li',{staticClass:"hint",domProps:{"textContent":_vm._s(_vm.hourLabelText)}}),_vm._l((_vm.hours),function(hr,hIndex){return [(!_vm.opts.hideDisabledHours || (_vm.opts.hideDisabledHours && !_vm.isDisabled('hour', hr)))?_c('li',{key:hIndex,class:{active: _vm.hour === hr},attrs:{"disabled":_vm.isDisabled('hour', hr),"data-key":hr},domProps:{"textContent":_vm._s(hr)},on:{"click":function($event){return _vm.select('hour', hr)}}}):_vm._e()]})],2):_vm._e(),(column === 'minute')?_c('ul',{key:column,staticClass:"minutes",on:{"scroll":_vm.keepFocusing}},[_c('li',{staticClass:"hint",domProps:{"textContent":_vm._s(_vm.minuteLabelText)}}),_vm._l((_vm.minutes),function(m,mIndex){return [(!_vm.opts.hideDisabledMinutes || (_vm.opts.hideDisabledMinutes && !_vm.isDisabled('minute', m)))?_c('li',{key:mIndex,class:{active: _vm.minute === m},attrs:{"disabled":_vm.isDisabled('minute', m),"data-key":m},domProps:{"textContent":_vm._s(m)},on:{"click":function($event){return _vm.select('minute', m)}}}):_vm._e()]})],2):_vm._e(),(column === 'second')?_c('ul',{key:column,staticClass:"seconds",on:{"scroll":_vm.keepFocusing}},[_c('li',{staticClass:"hint",domProps:{"textContent":_vm._s(_vm.secondLabelText)}}),_vm._l((_vm.seconds),function(s,sIndex){return [(!_vm.opts.hideDisabledSeconds || (_vm.opts.hideDisabledSeconds && !_vm.isDisabled('second', s)))?_c('li',{key:sIndex,class:{active: _vm.second === s},attrs:{"disabled":_vm.isDisabled('second', s),"data-key":s},domProps:{"textContent":_vm._s(s)},on:{"click":function($event){return _vm.select('second', s)}}}):_vm._e()]})],2):_vm._e(),(column === 'apm')?_c('ul',{key:column,staticClass:"apms",on:{"scroll":_vm.keepFocusing}},[_c('li',{staticClass:"hint",domProps:{"textContent":_vm._s(_vm.apmLabelText)}}),_vm._l((_vm.apms),function(a,aIndex){return [(!_vm.opts.hideDisabledHours || (_vm.opts.hideDisabledHours && !_vm.isDisabled('apm', a)))?_c('li',{key:aIndex,class:{active: _vm.apm === a},attrs:{"disabled":_vm.isDisabled('apm', a),"data-key":a},domProps:{"textContent":_vm._s(_vm.apmDisplayText(a))},on:{"click":function($event){return _vm.select('apm', a)}}}):_vm._e()]})],2):_vm._e()]})]:_vm._e(),(_vm.advancedKeyboard)?[_vm._l((_vm.columnsSequence),function(column){return [(column === 'hour')?_c('ul',{key:column,staticClass:"hours",attrs:{"tabindex":"-1"},on:{"scroll":_vm.keepFocusing}},[_c('li',{staticClass:"hint",attrs:{"tabindex":"-1"},domProps:{"textContent":_vm._s(_vm.hourLabelText)}}),_vm._l((_vm.hours),function(hr,hIndex){return [(!_vm.opts.hideDisabledHours || (_vm.opts.hideDisabledHours && !_vm.isDisabled('hour', hr)))?_c('li',{key:hIndex,class:{active: _vm.hour === hr},attrs:{"tabindex":_vm.isDisabled('hour', hr) ? -1 : _vm.tabindex,"data-key":hr,"disabled":_vm.isDisabled('hour', hr)},domProps:{"textContent":_vm._s(hr)},on:{"click":function($event){return _vm.select('hour', hr)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.select('hour', hr)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.select('hour', hr)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.prevItem('hour', hr)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.nextItem('hour', hr)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.preventDefault();return _vm.toLeftColumn('hour')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"right",39,$event.key,["Right","ArrowRight"])){ return null; }if('button' in $event && $event.button !== 2){ return null; }$event.preventDefault();return _vm.toRightColumn('hour')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }if($event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey){ return null; }return _vm.debounceBlur($event)}],"blur":_vm.debounceBlur,"focus":_vm.keepFocusing}}):_vm._e()]})],2):_vm._e(),(column === 'minute')?_c('ul',{key:column,staticClass:"minutes",attrs:{"tabindex":"-1"},on:{"scroll":_vm.keepFocusing}},[_c('li',{staticClass:"hint",attrs:{"tabindex":"-1"},domProps:{"textContent":_vm._s(_vm.minuteLabelText)}}),_vm._l((_vm.minutes),function(m,mIndex){return [(!_vm.opts.hideDisabledMinutes || (_vm.opts.hideDisabledMinutes && !_vm.isDisabled('minute', m)))?_c('li',{key:mIndex,class:{active: _vm.minute === m},attrs:{"tabindex":_vm.isDisabled('minute', m) ? -1 : _vm.tabindex,"data-key":m,"disabled":_vm.isDisabled('minute', m)},domProps:{"textContent":_vm._s(m)},on:{"click":function($event){return _vm.select('minute', m)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.select('minute', m)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.select('minute', m)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.prevItem('minute', m)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.nextItem('minute', m)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.preventDefault();return _vm.toLeftColumn('minute')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"right",39,$event.key,["Right","ArrowRight"])){ return null; }if('button' in $event && $event.button !== 2){ return null; }$event.preventDefault();return _vm.toRightColumn('minute')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }if($event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey){ return null; }return _vm.debounceBlur($event)}],"blur":_vm.debounceBlur,"focus":_vm.keepFocusing}}):_vm._e()]})],2):_vm._e(),(column === 'second')?_c('ul',{key:column,staticClass:"seconds",attrs:{"tabindex":"-1"},on:{"scroll":_vm.keepFocusing}},[_c('li',{staticClass:"hint",attrs:{"tabindex":"-1"},domProps:{"textContent":_vm._s(_vm.secondLabelText)}}),_vm._l((_vm.seconds),function(s,sIndex){return [(!_vm.opts.hideDisabledSeconds || (_vm.opts.hideDisabledSeconds && !_vm.isDisabled('second', s)))?_c('li',{key:sIndex,class:{active: _vm.second === s},attrs:{"tabindex":_vm.isDisabled('second', s) ? -1 : _vm.tabindex,"data-key":s,"disabled":_vm.isDisabled('second', s)},domProps:{"textContent":_vm._s(s)},on:{"click":function($event){return _vm.select('second', s)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.select('second', s)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.select('second', s)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.prevItem('second', s)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.nextItem('second', s)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.preventDefault();return _vm.toLeftColumn('second')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"right",39,$event.key,["Right","ArrowRight"])){ return null; }if('button' in $event && $event.button !== 2){ return null; }$event.preventDefault();return _vm.toRightColumn('second')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }if($event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey){ return null; }return _vm.debounceBlur($event)}],"blur":_vm.debounceBlur,"focus":_vm.keepFocusing}}):_vm._e()]})],2):_vm._e(),(column === 'apm')?_c('ul',{key:column,staticClass:"apms",attrs:{"tabindex":"-1"},on:{"scroll":_vm.keepFocusing}},[_c('li',{staticClass:"hint",attrs:{"tabindex":"-1"},domProps:{"textContent":_vm._s(_vm.apmLabelText)}}),_vm._l((_vm.apms),function(a,aIndex){return [(!_vm.opts.hideDisabledHours || (_vm.opts.hideDisabledHours && !_vm.isDisabled('apm', a)))?_c('li',{key:aIndex,class:{active: _vm.apm === a},attrs:{"tabindex":_vm.isDisabled('apm', a) ? -1 : _vm.tabindex,"data-key":a,"disabled":_vm.isDisabled('apm', a)},domProps:{"textContent":_vm._s(_vm.apmDisplayText(a))},on:{"click":function($event){return _vm.select('apm', a)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.select('apm', a)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.select('apm', a)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.prevItem('apm', a)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.nextItem('apm', a)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.preventDefault();return _vm.toLeftColumn('apm')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"right",39,$event.key,["Right","ArrowRight"])){ return null; }if('button' in $event && $event.button !== 2){ return null; }$event.preventDefault();return _vm.toRightColumn('apm')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }if($event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey){ return null; }return _vm.debounceBlur($event)}],"blur":_vm.debounceBlur,"focus":_vm.keepFocusing}}):_vm._e()]})],2):_vm._e()]})]:_vm._e()],2)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/vue-timepicker.vue?vue&type=template&id=11d43692&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__("c740");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.some.js
var es_array_some = __webpack_require__("45fc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__("4d63");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js







function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js







function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js








function _createForOfIteratorHelper(o) {
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var it,
      normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/vue-timepicker.vue?vue&type=script&lang=js&


























var CONFIG = {
  HOUR_TOKENS: ['HH', 'H', 'hh', 'h', 'kk', 'k'],
  MINUTE_TOKENS: ['mm', 'm'],
  SECOND_TOKENS: ['ss', 's'],
  APM_TOKENS: ['A', 'a'],
  BASIC_TYPES: ['hour', 'minute', 'second', 'apm']
};
var DEFAULT_OPTIONS = {
  format: 'HH:mm',
  minuteInterval: 1,
  secondInterval: 1,
  hourRange: null,
  minuteRange: null,
  secondRange: null,
  hideDisabledHours: false,
  hideDisabledMinutes: false,
  hideDisabledSeconds: false,
  hideDisabledItems: false,
  advancedKeyboard: false,
  hideDropdown: false,
  blurDelay: 300,
  manualInputTimeout: 1000,
  dropOffsetHeight: 160
};
/* harmony default export */ var vue_timepickervue_type_script_lang_js_ = ({
  name: 'VueTimepicker',
  props: {
    value: {
      type: [Object, String]
    },
    format: {
      type: String
    },
    minuteInterval: {
      type: [Number, String]
    },
    secondInterval: {
      type: [Number, String]
    },
    hourRange: {
      type: Array
    },
    minuteRange: {
      type: Array
    },
    secondRange: {
      type: Array
    },
    hideDisabledHours: {
      type: Boolean,
      default: false
    },
    hideDisabledMinutes: {
      type: Boolean,
      default: false
    },
    hideDisabledSeconds: {
      type: Boolean,
      default: false
    },
    hideDisabledItems: {
      type: Boolean,
      default: false
    },
    hideClearButton: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    closeOnComplete: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    },
    name: {
      type: String
    },
    inputClass: {
      type: [String, Object, Array]
    },
    placeholder: {
      type: String
    },
    tabindex: {
      type: [Number, String],
      default: 0
    },
    inputWidth: {
      type: String
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    hourLabel: {
      type: String
    },
    minuteLabel: {
      type: String
    },
    secondLabel: {
      type: String
    },
    apmLabel: {
      type: String
    },
    amText: {
      type: String
    },
    pmText: {
      type: String
    },
    blurDelay: {
      type: [Number, String]
    },
    advancedKeyboard: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: false
    },
    dropDirection: {
      type: String,
      default: 'down'
    },
    dropOffsetHeight: {
      type: [Number, String]
    },
    containerId: {
      type: String
    },
    manualInput: {
      type: Boolean,
      default: false
    },
    manualInputTimeout: {
      type: [Number, String]
    },
    hideDropdown: {
      type: Boolean,
      default: false
    },
    fixedDropdownButton: {
      type: Boolean,
      default: false
    },
    debugMode: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      timeValue: {},
      hours: [],
      minutes: [],
      seconds: [],
      apms: [],
      isActive: false,
      showDropdown: false,
      isFocusing: false,
      debounceTimer: undefined,
      hourType: 'HH',
      minuteType: 'mm',
      secondType: '',
      apmType: '',
      hour: '',
      minute: '',
      second: '',
      apm: '',
      fullValues: undefined,
      bakDisplayTime: undefined,
      doClearApmChecking: false,
      selectionTimer: undefined,
      kbInputTimer: undefined,
      kbInputLog: '',
      bakCurrentPos: undefined,
      forceDropOnTop: false
    };
  },
  computed: {
    opts: function opts() {
      var options = Object.assign({}, DEFAULT_OPTIONS);

      if (this.format && this.format.length) {
        options.format = String(this.format);
      }

      if (this.isNumber(this.minuteInterval)) {
        options.minuteInterval = +this.minuteInterval;
      } // minuteInterval failsafe


      if (!options.minuteInterval || options.minuteInterval < 1 || options.minuteInterval > 60) {
        if (this.debugMode) {
          if (options.minuteInterval > 60) {
            this.debugLog("\"minute-interval\" should be less than 60. Current value is ".concat(this.minuteInterval));
          } else if (options.minuteInterval === 0 || options.minuteInterval < 1) {
            this.debugLog("\"minute-interval\" should be NO less than 1. Current value is ".concat(this.minuteInterval));
          }
        }

        if (options.minuteInterval === 0) {
          options.minuteInterval = 60;
        } else {
          options.minuteInterval = 1;
        }
      }

      if (this.isNumber(this.secondInterval)) {
        options.secondInterval = +this.secondInterval;
      } // secondInterval failsafe


      if (!options.secondInterval || options.secondInterval < 1 || options.secondInterval > 60) {
        if (this.debugMode) {
          if (options.secondInterval > 60) {
            this.debugLog("\"second-interval\" should be less than 60. Current value is ".concat(this.secondInterval));
          } else if (options.secondInterval === 0 || options.secondInterval < 1) {
            this.debugLog("\"second-interval\" should be NO less than 1. Current value is ".concat(this.secondInterval));
          }
        }

        if (options.secondInterval === 0) {
          options.secondInterval = 60;
        } else {
          options.secondInterval = 1;
        }
      }

      if (this.hourRange && Array.isArray(this.hourRange)) {
        options.hourRange = JSON.parse(JSON.stringify(this.hourRange));

        if (!this.hourRange.length && this.debugMode) {
          this.debugLog('The "hour-range" array is empty (length === 0)');
        }
      }

      if (this.minuteRange && Array.isArray(this.minuteRange)) {
        options.minuteRange = JSON.parse(JSON.stringify(this.minuteRange));

        if (!this.minuteRange.length && this.debugMode) {
          this.debugLog('The "minute-range" array is empty (length === 0)');
        }
      }

      if (this.secondRange && Array.isArray(this.secondRange)) {
        options.secondRange = JSON.parse(JSON.stringify(this.secondRange));

        if (!this.secondRange.length && this.debugMode) {
          this.debugLog('The "second-range" array is empty (length === 0)');
        }
      }

      if (this.hideDisabledItems) {
        options.hideDisabledItems = true;
      }

      if (this.hideDisabledHours || this.hideDisabledItems) {
        options.hideDisabledHours = true;
      }

      if (this.hideDisabledMinutes || this.hideDisabledItems) {
        options.hideDisabledMinutes = true;
      }

      if (this.hideDisabledSeconds || this.hideDisabledItems) {
        options.hideDisabledSeconds = true;
      }

      if (this.hideDropdown) {
        if (this.manualInput) {
          options.hideDropdown = true;
        } else if (this.debugMode) {
          this.debugLog('"hide-dropdown" only works with "manual-input" mode');
        }
      }

      if (this.blurDelay && +this.blurDelay > 0) {
        options.blurDelay = +this.blurDelay;
      }

      if (this.manualInputTimeout && +this.manualInputTimeout > 0) {
        options.manualInputTimeout = +this.manualInputTimeout;
      }

      if (this.dropOffsetHeight && +this.dropOffsetHeight > 0) {
        options.dropOffsetHeight = +this.dropOffsetHeight;
      }

      return options;
    },
    useStringValue: function useStringValue() {
      return typeof this.value === 'string';
    },
    formatString: function formatString() {
      return this.opts.format || DEFAULT_OPTIONS.format;
    },
    inUse: function inUse() {
      var _this = this;

      var typesInUse = CONFIG.BASIC_TYPES.filter(function (type) {
        return _this.getTokenByType(type);
      }); // Sort types and tokens by their sequence in the "format" string

      typesInUse.sort(function (l, r) {
        return _this.formatString.indexOf(_this.getTokenByType(l) || null) - _this.formatString.indexOf(_this.getTokenByType(r) || null);
      });
      var tokensInUse = typesInUse.map(function (type) {
        return _this.getTokenByType(type);
      });
      return {
        hour: !!this.hourType,
        minute: !!this.minuteType,
        second: !!this.secondType,
        apm: !!this.apmType,
        types: typesInUse || [],
        tokens: tokensInUse || []
      };
    },
    displayTime: function displayTime() {
      var formatString = String(this.formatString);

      if (this.hour) {
        formatString = formatString.replace(new RegExp(this.hourType, 'g'), this.hour);
      }

      if (this.minute) {
        formatString = formatString.replace(new RegExp(this.minuteType, 'g'), this.minute);
      }

      if (this.second && this.secondType) {
        formatString = formatString.replace(new RegExp(this.secondType, 'g'), this.second);
      }

      if (this.apm && this.apmType) {
        formatString = formatString.replace(new RegExp(this.apmType, 'g'), this.apm);
      }

      return formatString;
    },
    customDisplayTime: function customDisplayTime() {
      if (!this.amText && !this.pmText) {
        return this.displayTime;
      }

      return this.displayTime.replace(new RegExp(this.apm, 'g'), this.apmDisplayText(this.apm));
    },
    inputIsEmpty: function inputIsEmpty() {
      return this.formatString === this.displayTime;
    },
    allValueSelected: function allValueSelected() {
      if (this.inUse.hour && !this.hour || this.inUse.minute && !this.minute || this.inUse.second && !this.second || this.inUse.apm && !this.apm) {
        return false;
      }

      return true;
    },
    columnsSequence: function columnsSequence() {
      return this.inUse.types.map(function (type) {
        return type;
      }) || [];
    },
    showClearBtn: function showClearBtn() {
      if (this.hideClearButton || this.disabled) {
        return false;
      }

      return !this.inputIsEmpty;
    },
    showDropdownBtn: function showDropdownBtn() {
      if (this.fixedDropdownButton) {
        return true;
      }

      if (this.opts.hideDropdown && this.isActive && !this.showDropdown) {
        return true;
      }

      return false;
    },
    baseOn12Hours: function baseOn12Hours() {
      return this.hourType === 'h' || this.hourType === 'hh';
    },
    hourRangeIn24HrFormat: function hourRangeIn24HrFormat() {
      var _this2 = this;

      if (!this.hourType || !this.opts.hourRange) {
        return false;
      }

      if (!this.opts.hourRange.length) {
        return [];
      }

      var range = [];
      this.opts.hourRange.forEach(function (value) {
        if (value instanceof Array) {
          if (value.length > 2 && _this2.debugMode) {
            _this2.debugLog("Nested array within \"hour-range\" must contain no more than two items. Only the first two items of ".concat(JSON.stringify(value), " will be taken into account."));
          }

          var start = value[0];
          var end = value[1] || value[0];

          if (_this2.is12hRange(start)) {
            start = _this2.translate12hRange(start);
          }

          if (_this2.is12hRange(end)) {
            end = _this2.translate12hRange(end);
          }

          for (var i = +start; i <= +end; i++) {
            if (i < 0 || i > 24) {
              continue;
            }

            if (!range.includes(i)) {
              range.push(i);
            }
          }
        } else {
          if (_this2.is12hRange(value)) {
            value = _this2.translate12hRange(value);
          } else {
            value = +value;
          }

          if (value < 0 || value > 24) {
            return;
          }

          if (!range.includes(value)) {
            range.push(value);
          }
        }
      });
      range.sort(function (l, r) {
        return l - r;
      });
      return range;
    },
    restrictedHourRange: function restrictedHourRange() {
      // No restriction
      if (!this.hourRangeIn24HrFormat) {
        return false;
      } // 12-Hour


      if (this.baseOn12Hours) {
        var range = this.hourRangeIn24HrFormat.map(function (value) {
          if (value === 12) {
            return '12p';
          } else if (value === 24 || value === 0) {
            return '12a';
          }

          return value > 12 ? "".concat(value % 12, "p") : "".concat(value, "a");
        });
        return range;
      } // 24-Hour


      return this.hourRangeIn24HrFormat;
    },
    validHoursList: function validHoursList() {
      var _this3 = this;

      if (!this.manualInput) {
        return false;
      }

      if (this.restrictedHourRange) {
        var list = [];

        if (this.baseOn12Hours) {
          list = this.restrictedHourRange.map(function (hr) {
            var l = hr.substr(0, hr.length - 1);
            var r = hr.substr(-1);
            return "".concat(_this3.formatValue(_this3.hourType, l)).concat(r);
          });
          var am12Index = list.indexOf('12a');

          if (am12Index > 0) {
            // Make '12a' the first item in h/hh
            list.unshift(list.splice(am12Index, 1)[0]);
          }

          return list;
        }

        list = this.restrictedHourRange.map(function (hr) {
          return _this3.formatValue(_this3.hourType, hr);
        });

        if (list.length > 1 && list[0] && list[0] === '24') {
          // Make '24' the last item in k/kk
          list.push(list.shift());
        }

        return list;
      }

      if (this.baseOn12Hours) {
        return [].concat([], this.hours.map(function (hr) {
          return "".concat(hr, "a");
        }), this.hours.map(function (hr) {
          return "".concat(hr, "p");
        }));
      }

      return this.hours;
    },
    has: function has() {
      var result = {
        customApmText: false
      };
      var apmEnabled = !!this.apmType;

      if (apmEnabled && this.hourRangeIn24HrFormat && this.hourRangeIn24HrFormat.length) {
        var range = [].concat([], this.hourRangeIn24HrFormat);
        result.am = range.some(function (value) {
          return value < 12 || value === 24;
        });
        result.pm = range.some(function (value) {
          return value >= 12 && value < 24;
        });
      } else {
        result.am = apmEnabled;
        result.pm = apmEnabled;
      }

      if (this.amText && this.amText.length || this.pmText && this.pmText.length) {
        result.customApmText = true;
      }

      return result;
    },
    minuteRangeList: function minuteRangeList() {
      if (!this.minuteType || !this.opts.minuteRange) {
        return false;
      }

      if (!this.opts.minuteRange.length) {
        return [];
      }

      return this.renderRangeList(this.opts.minuteRange, 'minute');
    },
    secondRangeList: function secondRangeList() {
      if (!this.secondType || !this.opts.secondRange) {
        return false;
      }

      if (!this.opts.secondRange.length) {
        return [];
      }

      return this.renderRangeList(this.opts.secondRange, 'second');
    },
    hourLabelText: function hourLabelText() {
      return this.hourLabel || this.hourType;
    },
    minuteLabelText: function minuteLabelText() {
      return this.minuteLabel || this.minuteType;
    },
    secondLabelText: function secondLabelText() {
      return this.secondLabel || this.secondType;
    },
    apmLabelText: function apmLabelText() {
      return this.apmLabel || this.apmType;
    },
    inputWidthStyle: function inputWidthStyle() {
      if (!this.inputWidth || !this.inputWidth.length) {
        return;
      }

      return {
        width: this.inputWidth
      };
    },
    tokenRegexBase: function tokenRegexBase() {
      return this.inUse.tokens.join('|');
    },
    tokenChunks: function tokenChunks() {
      if (!this.manualInput && !this.useStringValue) {
        return false;
      }

      var formatString = String(this.formatString);
      var tokensRegxStr = "(".concat(this.tokenRegexBase, ")+?");
      var tokensMatchAll = this.getMatchAllByRegex(formatString, tokensRegxStr);
      var tokenChunks = [];

      var _iterator = _createForOfIteratorHelper(tokensMatchAll),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tkMatch = _step.value;
          var rawToken = tkMatch[0];
          var tokenMatchItem = {
            index: tkMatch.index,
            token: rawToken,
            type: this.getTokenType(rawToken),
            needsCalibrate: rawToken.length < 2,
            len: (rawToken || '').length
          };
          tokenChunks.push(tokenMatchItem);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return tokenChunks;
    },
    needsPosCalibrate: function needsPosCalibrate() {
      if (!this.manualInput) {
        return false;
      }

      return this.tokenChunks.some(function (chk) {
        return chk.needsCalibrate;
      });
    },
    tokenChunksPos: function tokenChunksPos() {
      var _this4 = this;

      if (!this.manualInput) {
        return false;
      }

      if (!this.needsPosCalibrate) {
        return this.tokenChunks.map(function (chk) {
          return {
            token: chk.token,
            type: chk.type,
            start: chk.index,
            end: chk.index + chk.len
          };
        });
      }

      var list = [];
      var calibrateLen = 0;
      this.tokenChunks.forEach(function (chk) {
        var chunkCurrentLen; // Adjust for customized AM/PM text

        if (chk.type === 'apm' && _this4.has.customApmText) {
          if (_this4.apm && _this4.apm.length) {
            var customApmText = _this4.apm.toLowerCase() === 'am' ? _this4.amText : _this4.pmText;
            chunkCurrentLen = customApmText && customApmText.length ? customApmText.length : chk.len;
          } else {
            chunkCurrentLen = chk.len;
          } // Others

        } else {
          chunkCurrentLen = _this4[chk.type] && _this4[chk.type].length ? _this4[chk.type].length : chk.len;
        }

        list.push({
          token: chk.token,
          type: chk.type,
          start: chk.index + calibrateLen,
          end: chk.index + calibrateLen + chunkCurrentLen
        });

        if (chk.needsCalibrate && chunkCurrentLen > chk.len) {
          calibrateLen += chunkCurrentLen - chk.len;
        }
      });
      return list;
    },
    invalidValues: function invalidValues() {
      if (this.inputIsEmpty) {
        return [];
      }

      if (!this.restrictedHourRange && !this.minuteRangeList && !this.secondRangeList && this.opts.minuteInterval === 1 && this.opts.secondInterval === 1) {
        return [];
      }

      var result = [];

      if (this.inUse.hour && !this.isEmptyValue(this.hourType, this.hour) && (!this.isValidValue(this.hourType, this.hour) || this.isDisabled('hour', this.hour))) {
        result.push('hour');
      }

      if (this.inUse.minute && !this.isEmptyValue(this.minuteType, this.minute) && (!this.isValidValue(this.minuteType, this.minute) || this.isDisabled('minute', this.minute) || this.notInInterval('minute', this.minute))) {
        result.push('minute');
      }

      if (this.inUse.second && !this.isEmptyValue(this.secondType, this.second) && (!this.isValidValue(this.secondType, this.second) || this.isDisabled('second', this.second) || this.notInInterval('second', this.second))) {
        result.push('second');
      }

      if (this.inUse.apm && !this.isEmptyValue(this.apmType, this.apm) && (!this.isValidValue(this.apmType, this.apm) || this.isDisabled('apm', this.apm))) {
        result.push('apm');
      }

      if (result.length) {
        return result;
      }

      return [];
    },
    hasInvalidInput: function hasInvalidInput() {
      return Boolean(this.invalidValues && this.invalidValues.length);
    },
    autoDirectionEnabled: function autoDirectionEnabled() {
      return this.dropDirection === 'auto';
    },
    dropdownDirClass: function dropdownDirClass() {
      if (this.autoDirectionEnabled) {
        return this.forceDropOnTop ? 'drop-up' : 'drop-down';
      }

      return this.dropDirection === 'up' ? 'drop-up' : 'drop-down';
    }
  },
  watch: {
    'opts.format': function optsFormat(newValue) {
      this.renderFormat(newValue);
    },
    'opts.minuteInterval': function optsMinuteInterval(newInteval) {
      this.renderList('minute', newInteval);
    },
    'opts.secondInterval': function optsSecondInterval(newInteval) {
      this.renderList('second', newInteval);
    },
    value: {
      deep: true,
      handler: function handler() {
        this.readValues();
      }
    },
    displayTime: function displayTime() {
      this.fillValues();
    },
    disabled: function disabled(toDisabled) {
      if (toDisabled) {
        // Force close dropdown and reset status when disabled
        if (this.isActive) {
          this.isActive = false;
        }

        if (this.showDropdown) {
          this.showDropdown = false;
        }
      }
    },
    'invalidValues.length': function invalidValuesLength(newLength, oldLength) {
      if (newLength && newLength >= 1) {
        this.$emit('error', this.invalidValues);
      } else if (oldLength && oldLength >= 1) {
        this.$emit('error', []);
      }
    }
  },
  methods: {
    formatValue: function formatValue(token, i) {
      if (!this.isNumber(i)) {
        return '';
      }

      i = +i;

      switch (token) {
        case 'H':
        case 'h':
        case 'k':
        case 'm':
        case 's':
          if (['h', 'k'].includes(token) && i === 0) {
            return token === 'k' ? '24' : '12';
          }

          return String(i);

        case 'HH':
        case 'mm':
        case 'ss':
        case 'hh':
        case 'kk':
          if (['hh', 'kk'].includes(token) && i === 0) {
            return token === 'kk' ? '24' : '12';
          }

          return i < 10 ? "0".concat(i) : String(i);

        default:
          return '';
      }
    },
    checkAcceptingType: function checkAcceptingType(validValues, formatString) {
      if (!validValues || !formatString || !formatString.length) {
        return '';
      }

      for (var i = 0; i < validValues.length; i++) {
        if (formatString.indexOf(validValues[i]) > -1) {
          return validValues[i];
        }
      }

      return '';
    },
    renderFormat: function renderFormat(newFormat) {
      var _this5 = this;

      newFormat = newFormat || this.opts.format || DEFAULT_OPTIONS.format;
      var hourType = this.checkAcceptingType(CONFIG.HOUR_TOKENS, newFormat);
      var minuteType = this.checkAcceptingType(CONFIG.MINUTE_TOKENS, newFormat);
      this.secondType = this.checkAcceptingType(CONFIG.SECOND_TOKENS, newFormat);
      this.apmType = this.checkAcceptingType(CONFIG.APM_TOKENS, newFormat); // Failsafe checking

      if (!hourType && !minuteType && !this.secondType && !this.apmType) {
        if (this.debugMode && this.format) {
          this.debugLog("No valid tokens found in your defined \"format\" string \"".concat(this.format, "\". Fallback to the default \"HH:mm\" format."));
        }

        hourType = 'HH';
        minuteType = 'mm';
      }

      this.hourType = hourType;
      this.minuteType = minuteType;
      this.hourType ? this.renderHoursList() : this.hours = [];
      this.minuteType ? this.renderList('minute') : this.minutes = [];
      this.secondType ? this.renderList('second') : this.seconds = [];
      this.apmType ? this.renderApmList() : this.apms = [];
      this.$nextTick(function () {
        _this5.readValues();
      });
    },
    renderHoursList: function renderHoursList() {
      var hoursCount = this.baseOn12Hours ? 12 : 24;
      var hours = [];

      for (var i = 0; i < hoursCount; i++) {
        if (this.hourType === 'k' || this.hourType === 'kk') {
          hours.push(this.formatValue(this.hourType, i + 1));
        } else {
          hours.push(this.formatValue(this.hourType, i));
        }
      }

      this.hours = hours;
    },
    renderList: function renderList(listType, interval) {
      if (!this.isMinuteOrSecond(listType)) {
        return;
      }

      var isMinute = listType === 'minute';
      interval = interval || (isMinute ? this.opts.minuteInterval || DEFAULT_OPTIONS.minuteInterval : this.opts.secondInterval || DEFAULT_OPTIONS.secondInterval);
      var result = [];

      for (var i = 0; i < 60; i += interval) {
        result.push(this.formatValue(isMinute ? this.minuteType : this.secondType, i));
      }

      isMinute ? this.minutes = result : this.seconds = result;
    },
    renderApmList: function renderApmList() {
      this.apms = this.apmType === 'A' ? ['AM', 'PM'] : ['am', 'pm'];
    },
    readValues: function readValues() {
      if (this.useStringValue) {
        if (this.debugMode) {
          this.debugLog("Received a string value: \"".concat(this.value, "\""));
        }

        this.readStringValues(this.value);
      } else {
        if (this.debugMode) {
          this.debugLog("Received an object value: \"".concat(JSON.stringify(this.value || {}), "\""));
        }

        this.readObjectValues(this.value);
      }
    },
    readObjectValues: function readObjectValues(objValue) {
      var _this6 = this;

      var timeValue = JSON.parse(JSON.stringify(objValue || {}));
      var values = Object.keys(timeValue); // Failsafe for empty `v-model` object

      if (values.length === 0) {
        this.addFallbackValues();
        return;
      }

      CONFIG.BASIC_TYPES.forEach(function (type) {
        var token = _this6.getTokenByType(type);

        if (values.indexOf(token) > -1) {
          var sanitizedValue = _this6.sanitizedValue(token, timeValue[token]);

          _this6[type] = sanitizedValue;
          timeValue[token] = sanitizedValue;
        } else {
          _this6[type] = '';
        }
      });
      this.timeValue = timeValue;
    },
    getMatchAllByRegex: function getMatchAllByRegex(testString, regexString) {
      var str = 'polyfillTest';
      var needsPolyfill = Boolean(!str.matchAll || typeof str.matchAll !== 'function');
      return needsPolyfill ? this.polyfillMatchAll(testString, regexString) : testString.matchAll(new RegExp(regexString, 'g'));
    },
    readStringValues: function readStringValues(stringValue) {
      var _this7 = this;

      // Failsafe for empty `v-model` string
      if (!stringValue || !stringValue.length) {
        this.addFallbackValues();
        return;
      }

      var formatString = String(this.formatString);
      var tokensRegxStr = "(".concat(this.tokenRegexBase, ")+?");
      var othersRegxStr = "[^(".concat(this.tokenRegexBase, ")]+");
      var tokensMatchAll = this.getMatchAllByRegex(formatString, tokensRegxStr);
      var othersMatchAll = this.getMatchAllByRegex(formatString, othersRegxStr);
      var chunks = [];
      var tokenChunks = [];

      var _iterator2 = _createForOfIteratorHelper(tokensMatchAll),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var tkMatch = _step2.value;
          var tokenMatchItem = {
            index: tkMatch.index,
            token: tkMatch[0],
            isValueToken: true
          };
          chunks.push(tokenMatchItem);
          tokenChunks.push(tokenMatchItem);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(othersMatchAll),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var otMatch = _step3.value;
          chunks.push({
            index: otMatch.index,
            token: otMatch[0]
          });
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      chunks.sort(function (l, r) {
        return l.index < r.index ? -1 : 1;
      });
      var regexCombo = '';
      chunks.forEach(function (chunk) {
        if (chunk.isValueToken) {
          var tokenRegex = _this7.getTokenRegex(chunk.token) || '';
          regexCombo += tokenRegex;
        } else {
          var safeChars = chunk.token.replace(/\\{0}(\*|\?|\.|\+)/g, '\\$1');
          regexCombo += "(?:".concat(safeChars, ")");
        }
      });
      var comboReg = new RegExp(regexCombo); // Do test before match

      if (comboReg.test(stringValue)) {
        var matchResults = stringValue.match(new RegExp(regexCombo));
        var valueResults = matchResults.slice(1, tokenChunks.length + 1);
        var timeValue = {};
        valueResults.forEach(function (value, vrIndex) {
          if (tokenChunks[vrIndex]) {
            var targetToken = tokenChunks[vrIndex].token;
            timeValue[targetToken] = _this7.setValueFromString(value, targetToken);
          }
        });
        this.timeValue = timeValue;

        if (this.debugMode) {
          var tokenChunksForLog = tokenChunks.map(function (tChunk) {
            return tChunk && tChunk.token;
          });
          this.debugLog("Successfully parsed values ".concat(JSON.stringify(valueResults), "\nfor ").concat(JSON.stringify(tokenChunksForLog), "\nin format pattern '").concat(this.formatString, "'"));
        }
      } else {
        if (this.debugMode) {
          this.debugLog("The input string in \"v-model\" does NOT match the \"format\" pattern\nformat: ".concat(this.formatString, "\nv-model: ").concat(stringValue));
        }
      }
    },
    polyfillMatchAll: function polyfillMatchAll(targetString, regxStr) {
      var matchesList = targetString.match(new RegExp(regxStr, 'g'));
      var result = [];
      var indicesReg = [];

      if (matchesList && matchesList.length) {
        matchesList.forEach(function (matchedItem) {
          var existIndex = indicesReg.findIndex(function (idxItem) {
            return idxItem.str === matchedItem;
          });
          var index;

          if (existIndex >= 0) {
            if (indicesReg[existIndex] && indicesReg[existIndex].regex) {
              index = indicesReg[existIndex].regex.exec(targetString).index;
            }
          } else {
            var itemIndicesRegex = new RegExp(matchedItem, 'g');
            index = itemIndicesRegex.exec(targetString).index;
            indicesReg.push({
              str: String(matchedItem),
              regex: itemIndicesRegex
            });
          }

          result.push({
            0: String(matchedItem),
            index: index
          });
        });
      }

      return result;
    },
    addFallbackValues: function addFallbackValues() {
      var _this8 = this;

      var timeValue = {};
      this.inUse.types.forEach(function (type) {
        timeValue[_this8.getTokenByType(type)] = '';
      });
      this.timeValue = timeValue;
    },
    setValueFromString: function setValueFromString(parsedValue, token) {
      if (!token || !parsedValue) {
        return '';
      }

      var tokenType = this.getTokenType(token);

      if (!tokenType || !tokenType.length) {
        return '';
      }

      var stdValue = parsedValue !== this.getTokenByType(tokenType) ? parsedValue : '';
      this[tokenType] = stdValue;
      return stdValue;
    },
    fillValues: function fillValues(forceEmit) {
      var _this9 = this;

      var fullValues = {};
      var baseHour = this.hour;
      var baseHourType = this.hourType;
      var apmValue; // Hour type or hour value is NOT set in the "format" string

      if (!baseHourType || !this.isNumber(baseHour)) {
        CONFIG.HOUR_TOKENS.forEach(function (token) {
          return fullValues[token] = '';
        });
        apmValue = this.lowerCasedApm(this.apm || '');
        fullValues.a = apmValue;
        fullValues.A = apmValue.toUpperCase(); // Both Hour type and value are set
      } else {
        var hourValue = +baseHour;

        var _apmValue = this.baseOn12Hours && this.apm ? this.lowerCasedApm(this.apm) : false;

        CONFIG.HOUR_TOKENS.forEach(function (token) {
          if (token === baseHourType) {
            fullValues[token] = baseHour;
            return;
          }

          var value;
          var apm;

          switch (token) {
            case 'H':
            case 'HH':
            case 'k':
            case 'kk':
              if (_this9.baseOn12Hours) {
                if (_apmValue === 'pm') {
                  value = hourValue < 12 ? hourValue + 12 : hourValue;
                } else if (['k', 'kk'].includes(token)) {
                  value = hourValue === 12 ? 24 : hourValue;
                } else {
                  value = hourValue % 12;
                }
              } else {
                if (['k', 'kk'].includes(token)) {
                  value = hourValue === 0 ? 24 : hourValue;
                } else {
                  value = hourValue % 24;
                }
              }

              fullValues[token] = _this9.formatValue(token, value);
              break;

            case 'h':
            case 'hh':
              // h <-> hh
              if (_this9.baseOn12Hours) {
                value = hourValue;
                apm = _apmValue || ''; // Read from other hour formats
              } else {
                if (hourValue > 11 && hourValue < 24) {
                  apm = 'pm';
                  value = hourValue === 12 ? 12 : hourValue % 12;
                } else {
                  apm = 'am';
                  value = hourValue % 12 === 0 ? 12 : hourValue;
                }
              }

              fullValues[token] = _this9.formatValue(token, value);
              fullValues.a = apm;
              fullValues.A = apm.toUpperCase();
              break;
          }
        });
      }

      fullValues.m = this.formatValue('m', this.minute);
      fullValues.mm = this.formatValue('mm', this.minute);
      fullValues.s = this.formatValue('s', this.second);
      fullValues.ss = this.formatValue('ss', this.second);
      this.fullValues = fullValues; // On lazy mode, emit `input` and `change` events only when:
      // - The user pick a new value and then close the dropdown
      // - The user click the ("x") clear button

      if (!this.lazy || forceEmit) {
        this.emitTimeValue();
      }

      if (this.closeOnComplete && this.allValueSelected && this.showDropdown) {
        this.toggleActive();
      }
    },
    emitTimeValue: function emitTimeValue() {
      if (!this.fullValues) {
        return;
      }

      if (this.lazy && this.bakDisplayTime === this.displayTime) {
        if (this.debugMode) {
          this.debugLog('The value does not change on `lazy` mode. Skip the emitting `input` and `change` event.');
        }

        return;
      }

      var fullValues = JSON.parse(JSON.stringify(this.fullValues));

      if (this.useStringValue) {
        this.$emit('input', this.inputIsEmpty ? '' : String(this.displayTime));
      } else {
        var tokensInUse = this.inUse.tokens || [];
        var timeValue = {};
        tokensInUse.forEach(function (token) {
          timeValue[token] = fullValues[token] || '';
        });
        this.$emit('input', JSON.parse(JSON.stringify(timeValue)));
      }

      this.$emit('change', {
        data: fullValues,
        displayTime: this.inputIsEmpty ? '' : String(this.displayTime)
      });
    },
    translate12hRange: function translate12hRange(value) {
      var valueT = this.match12hRange(value);

      if (+valueT[1] === 12) {
        return +valueT[1] + (valueT[2].toLowerCase() === 'p' ? 0 : 12);
      }

      return +valueT[1] + (valueT[2].toLowerCase() === 'p' ? 12 : 0);
    },
    isDisabled: function isDisabled(type, value) {
      if (!this.isBasicType(type) || !this.inUse[type]) {
        return true;
      }

      switch (type) {
        case 'hour':
          return this.isDisabledHour(value);

        case 'minute':
        case 'second':
          if (!this["".concat(type, "RangeList")]) {
            return false;
          }

          return !this["".concat(type, "RangeList")].includes(value);

        case 'apm':
          if (!this.restrictedHourRange) {
            return false;
          }

          return !this.has[this.lowerCasedApm(value)];

        default:
          return true;
      }
    },
    isDisabledHour: function isDisabledHour(value) {
      if (!this.restrictedHourRange) {
        return false;
      }

      if (this.baseOn12Hours) {
        if (!this.apm || !this.apm.length) {
          return false;
        } else {
          var token = this.apm.toLowerCase() === 'am' ? 'a' : 'p';
          return !this.restrictedHourRange.includes("".concat(+value).concat(token));
        }
      } // Fallback for 'HH' and 'H hour format with a `hour-range` in a 12-hour form


      if ((this.hourType === 'HH' || this.hourType === 'H') && +value === 0 && this.restrictedHourRange.includes(24)) {
        return false;
      }

      return !this.restrictedHourRange.includes(+value);
    },
    notInInterval: function notInInterval(section, value) {
      if (!section || !this.isMinuteOrSecond(section)) {
        return;
      }

      if (this.opts["".concat(section, "Interval")] === 1) {
        return false;
      }

      return +value % this.opts["".concat(section, "Interval")] !== 0;
    },
    renderRangeList: function renderRangeList(rawRange, section) {
      var _this10 = this;

      if (!rawRange || !section || !this.isMinuteOrSecond(section)) {
        return [];
      }

      var range = [];
      var formatedValue;
      rawRange.forEach(function (value) {
        if (value instanceof Array) {
          if (value.length > 2 && _this10.debugMode) {
            _this10.debugLog("Nested array within \"".concat(section, "-range\" must contain no more than two items. Only the first two items of ").concat(JSON.stringify(value), " will be taken into account."));
          }

          var start = value[0];
          var end = value[1] || value[0];

          for (var i = +start; i <= +end; i++) {
            if (i < 0 || i > 59) {
              continue;
            }

            formatedValue = _this10.formatValue(_this10.getTokenByType(section), i);

            if (!range.includes(formatedValue)) {
              range.push(formatedValue);
            }
          }
        } else {
          if (+value < 0 || +value > 59) {
            return;
          }

          formatedValue = _this10.formatValue(_this10.getTokenByType(section), value);

          if (!range.includes(formatedValue)) {
            range.push(formatedValue);
          }
        }
      });
      range.sort(function (l, r) {
        return l - r;
      }); // Debug Mode

      if (this.debugMode) {
        var fullList = (section === 'minute' ? this.minutes : this.seconds) || [];
        var validItems = fullList.filter(function (item) {
          return range.includes(item);
        });

        if (!validItems || !validItems.length) {
          if (section === 'minute') {
            this.debugLog("The minute list is empty due to the \"minute-range\" config\nminute-range: ".concat(JSON.stringify(this.minuteRange), "\nminute-interval: ").concat(this.opts.minuteInterval));
          } else {
            this.debugLog("The second list is empty due to the \"second-range\" config\nsecond-range: ".concat(JSON.stringify(this.secondRange), "\nsecond-interval: ").concat(this.opts.secondInterval));
          }
        }
      }

      return range;
    },
    forceApmSelection: function forceApmSelection() {
      if (this.manualInput) {
        // Skip this to allow users to paste a string value from the clipboard in Manual Input mode
        return;
      }

      if (this.apmType && !this.apm) {
        if (this.has.am || this.has.pm) {
          this.doClearApmChecking = true;
          var apmValue = this.has.am ? 'am' : 'pm';
          this.apm = this.apmType === 'A' ? apmValue.toUpperCase() : apmValue;
        }
      }
    },
    emptyApmSelection: function emptyApmSelection() {
      if (this.doClearApmChecking && this.hour === '' && this.minute === '' && this.second === '') {
        this.apm = '';
      }

      this.doClearApmChecking = false;
    },
    apmDisplayText: function apmDisplayText(apmValue) {
      if (this.amText && this.lowerCasedApm(apmValue) === 'am') {
        return this.amText;
      }

      if (this.pmText && this.lowerCasedApm(apmValue) === 'pm') {
        return this.pmText;
      }

      return apmValue;
    },
    toggleActive: function toggleActive() {
      var _this11 = this;

      if (this.disabled) {
        return;
      }

      this.isActive = !this.isActive;

      if (this.isActive) {
        this.isFocusing = true;

        if (this.manualInput) {
          this.$emit('focus');
        }

        if (!this.opts.hideDropdown) {
          this.setDropdownState(true);
        } // Record to check if value did change in the later phase


        if (this.lazy) {
          this.bakDisplayTime = String(this.displayTime || '');
        }

        if (this.manualInput && !this.inputIsEmpty) {
          this.$nextTick(function () {
            if (_this11.$refs.input && _this11.$refs.input.selectionStart === 0 && _this11.$refs.input.selectionEnd === _this11.displayTime.length) {
              // Select the first slot instead of the whole value string when tabbed in
              _this11.selectFirstSlot();
            }
          });
        }
      } else {
        if (this.showDropdown) {
          this.setDropdownState(false);
        } else if (this.manualInput) {
          this.$emit('blur');
        }

        this.isFocusing = false;

        if (this.lazy) {
          this.fillValues(true);
          this.bakDisplayTime = undefined;
        }
      }

      if (this.restrictedHourRange && this.baseOn12Hours) {
        this.showDropdown ? this.forceApmSelection() : this.emptyApmSelection();
      }

      if (this.showDropdown) {
        this.checkForAutoScroll();
      }
    },
    setDropdownState: function setDropdownState(toShow) {
      var fromUserClick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (toShow) {
        this.keepFocusing();

        if (this.autoDirectionEnabled) {
          this.checkDropDirection();
        }

        this.showDropdown = true;
        this.$emit('open');

        if (fromUserClick) {
          if (this.fixedDropdownButton) {
            this.isActive = true;
          }

          this.$emit('blur');
          this.checkForAutoScroll();
        }
      } else {
        this.showDropdown = false;
        this.$emit('close');
      }
    },
    blurEvent: function blurEvent() {
      if (this.manualInput && !this.opts.hideDropdown) {
        // hideDropdown's `blur` event is handled somewhere else
        this.$emit('blur');
      }
    },
    select: function select(type, value) {
      if (this.isBasicType(type) && !this.isDisabled(type, value)) {
        this[type] = value;

        if (this.doClearApmChecking) {
          this.doClearApmChecking = false;
        }
      }
    },
    clearTime: function clearTime() {
      if (this.disabled) {
        return;
      }

      this.hour = '';
      this.minute = '';
      this.second = '';
      this.apm = '';

      if (this.manualInput && this.$refs && this.$refs.input && this.$refs.input.value.length) {
        this.$refs.input.value = '';
      }

      if (this.lazy) {
        this.fillValues(true);
      }
    },
    //
    // Auto-Scroll
    //
    checkForAutoScroll: function checkForAutoScroll() {
      var _this12 = this;

      if (this.inputIsEmpty) {
        return;
      }

      if (this.autoScroll) {
        this.$nextTick(function () {
          _this12.scrollToSelectedValues();
        });
      } else if (this.advancedKeyboard) {
        // Auto-focus on selected value in the first column for advanced-keyboard
        this.$nextTick(function () {
          var firstColumn = _this12.inUse.types[0];

          _this12.scrollToSelected(firstColumn, true);
        });
      }
    },
    scrollToSelected: function scrollToSelected(column) {
      var allowFallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!this.timeValue || this.inputIsEmpty) {
        return;
      }

      var targetList = this.$el.querySelectorAll("ul.".concat(column, "s"))[0];
      var targetValue = this.activeItemInCol(column)[0];

      if (!targetValue && allowFallback) {
        // No value selected in the target column, fallback to the first found valid item
        targetValue = this.validItemsInCol(column)[0];
      }

      if (targetList && targetValue) {
        targetList.scrollTop = targetValue.offsetTop || 0;

        if (this.advancedKeyboard) {
          targetValue.focus();
        }
      }
    },
    scrollToSelectedValues: function scrollToSelectedValues() {
      var _this13 = this;

      if (!this.timeValue || this.inputIsEmpty) {
        return;
      }

      this.inUse.types.forEach(function (section) {
        _this13.scrollToSelected(section);
      });
    },
    //
    // Additional Keyboard Navigation
    //
    onFocus: function onFocus() {
      if (this.disabled) {
        return;
      }

      if (!this.isFocusing) {
        this.isFocusing = true;
      }

      if (!this.isActive) {
        this.toggleActive();
      }
    },
    escBlur: function escBlur() {
      if (this.disabled) {
        return;
      }

      window.clearTimeout(this.debounceTimer);
      this.isFocusing = false;
      var inputBox = this.$el.querySelectorAll('input.display-time')[0];

      if (inputBox) {
        inputBox.blur();
      }
    },
    debounceBlur: function debounceBlur() {
      var _this14 = this;

      if (this.disabled) {
        return;
      }

      this.isFocusing = false;
      window.clearTimeout(this.debounceTimer);
      this.debounceTimer = window.setTimeout(function () {
        window.clearTimeout(_this14.debounceTimer);

        _this14.onBlur();
      }, this.opts.blurDelay);
    },
    onBlur: function onBlur() {
      if (!this.disabled && !this.isFocusing && this.isActive) {
        this.toggleActive();
      }
    },
    keepFocusing: function keepFocusing() {
      if (this.disabled) {
        return;
      }

      window.clearTimeout(this.debounceTimer);

      if (!this.isFocusing) {
        this.isFocusing = true;
      }
    },
    validItemsInCol: function validItemsInCol(column) {
      var columnClass = "".concat(column, "s");
      return this.$el.querySelectorAll("ul.".concat(columnClass, " > li:not(.hint):not([disabled])"));
    },
    activeItemInCol: function activeItemInCol(column) {
      var columnClass = "".concat(column, "s");
      return this.$el.querySelectorAll("ul.".concat(columnClass, " > li.active:not(.hint)"));
    },
    getClosestSibling: function getClosestSibling(column, dataKey) {
      var getPrevious = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var siblingsInCol = this.validItemsInCol(column);
      var selfIndex = Array.prototype.findIndex.call(siblingsInCol, function (sbl) {
        return sbl.getAttribute('data-key') === dataKey;
      }); // Already the first item

      if (getPrevious && selfIndex === 0) {
        return siblingsInCol[siblingsInCol.length - 1];
      } // Already the last item


      if (!getPrevious && selfIndex === siblingsInCol.length - 1) {
        return siblingsInCol[0];
      } // Selected value not in the valid values list


      if (selfIndex < 0) {
        return siblingsInCol[0];
      }

      if (getPrevious) {
        return siblingsInCol[selfIndex - 1];
      }

      return siblingsInCol[selfIndex + 1];
    },
    prevItem: function prevItem(column, dataKey) {
      var isManualInput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var targetItem = this.getClosestSibling(column, dataKey, true);

      if (targetItem) {
        return isManualInput ? targetItem : targetItem.focus();
      }
    },
    nextItem: function nextItem(column, dataKey) {
      var isManualInput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var targetItem = this.getClosestSibling(column, dataKey, false);

      if (targetItem) {
        return isManualInput ? targetItem : targetItem.focus();
      }
    },
    getSideColumnName: function getSideColumnName(currentColumn) {
      var toLeft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var currentColumnIndex = this.inUse.types.indexOf(currentColumn);

      if (toLeft && currentColumnIndex <= 0) {
        if (this.debugMode) {
          this.debugLog('You\'re in the leftmost list already');
        }

        return;
      } else if (!toLeft && currentColumnIndex === this.inUse.types.length - 1) {
        if (this.debugMode) {
          this.debugLog('You\'re in the rightmost list already');
        }

        return;
      }

      return this.inUse.types[toLeft ? currentColumnIndex - 1 : currentColumnIndex + 1];
    },
    getFirstItemInSideColumn: function getFirstItemInSideColumn(currentColumn) {
      var toLeft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var targetColumn = this.getSideColumnName(currentColumn, toLeft);

      if (!targetColumn) {
        return;
      }

      var listItems = this.validItemsInCol(targetColumn);

      if (listItems && listItems[0]) {
        return listItems[0];
      }
    },
    getActiveItemInSideColumn: function getActiveItemInSideColumn(currentColumn) {
      var toLeft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var targetColumn = this.getSideColumnName(currentColumn, toLeft);

      if (!targetColumn) {
        return;
      }

      var activeItems = this.activeItemInCol(targetColumn);

      if (activeItems && activeItems[0]) {
        return activeItems[0];
      }
    },
    toLeftColumn: function toLeftColumn(currentColumn) {
      var targetItem = this.getActiveItemInSideColumn(currentColumn, true) || this.getFirstItemInSideColumn(currentColumn, true);

      if (targetItem) {
        targetItem.focus();
      }
    },
    toRightColumn: function toRightColumn(currentColumn) {
      var targetItem = this.getActiveItemInSideColumn(currentColumn, false) || this.getFirstItemInSideColumn(currentColumn, false);

      if (targetItem) {
        targetItem.focus();
      }
    },
    //
    // Manual Input
    //
    onMouseDown: function onMouseDown() {
      var _this15 = this;

      if (!this.manualInput) {
        return;
      }

      window.clearTimeout(this.selectionTimer);
      this.selectionTimer = window.setTimeout(function () {
        window.clearTimeout(_this15.selectionTimer);

        if (_this15.$refs && _this15.$refs.input) {
          var nearestSlot = _this15.getNearestChunkByPos(_this15.$refs.input.selectionStart || 0);

          _this15.debounceSetInputSelection(nearestSlot);
        }
      }, 50);
    },
    keyDownHandler: function keyDownHandler(evt) {
      if (evt.isComposing || evt.keyCode === 229) {
        // Skip IME inputs
        evt.preventDefault();
        evt.stopPropagation();
        return false;
      } // Numbers


      if (evt.keyCode >= 48 && evt.keyCode <= 57 || evt.keyCode >= 96 && evt.keyCode <= 105) {
        evt.preventDefault();
        this.keyboardInput(evt.key); // A|P|M
      } else if ([65, 80, 77].includes(evt.keyCode)) {
        evt.preventDefault();
        this.keyboardInput(evt.key, true); // Arrow keys
      } else if (evt.keyCode >= 37 && evt.keyCode <= 40) {
        evt.preventDefault();
        this.clearKbInputLog();
        this.arrowHandler(evt); // Delete|Backspace
      } else if (evt.keyCode === 8 || evt.keyCode === 46) {
        evt.preventDefault();
        this.clearKbInputLog();
        this.clearTime(); // Tab
      } else if (evt.keyCode === 9) {
        this.clearKbInputLog();
        this.tabHandler(evt); // Prevent any Non-ESC and non-pasting inputs
      } else if (evt.keyCode !== 27 && !(evt.metaKey || evt.ctrlKey)) {
        evt.preventDefault();
      }
    },
    onCompostionStart: function onCompostionStart(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.bakCurrentPos = this.getCurrentTokenChunk();
      return false;
    },
    onCompostionEnd: function onCompostionEnd(evt) {
      var _this16 = this;

      evt.preventDefault();
      evt.stopPropagation();
      var cpsData = evt.data;
      var inputIsCustomApmText = false;

      if (this.has.customApmText) {
        inputIsCustomApmText = this.isCustomApmText(cpsData);
      }

      if (inputIsCustomApmText) {
        this.setSanitizedValueToSection('apm', inputIsCustomApmText);
      }

      this.$refs.input.value = this.has.customApmText ? this.customDisplayTime : this.displayTime;
      this.$nextTick(function () {
        if (_this16.bakCurrentPos) {
          var bakPos = JSON.parse(JSON.stringify(_this16.bakCurrentPos));

          if (inputIsCustomApmText) {
            bakPos.end = bakPos.start + cpsData.length;
          }

          _this16.debounceSetInputSelection(bakPos);

          _this16.bakCurrentPos = null;
        }
      });
      return false;
    },
    pasteHandler: function pasteHandler(evt) {
      evt.preventDefault();
      var pastingText = (evt.clipboardData || window.clipboardData).getData('text');

      if (this.debugMode) {
        this.debugLog("Pasting value \"".concat(pastingText, "\" from clipboard"));
      }

      if (!pastingText || !pastingText.length) {
        return;
      } // Replace custom AM/PM text (if any)


      if (this.has.customApmText) {
        pastingText = this.replaceCustomApmText(pastingText);
      }

      if (this.inputIsEmpty) {
        this.readStringValues(pastingText);
      } else {
        this.kbInputLog = pastingText.substr(-2, 2);
        this.setKbInput();
        this.debounceClearKbLog();
      }
    },
    arrowHandler: function arrowHandler(evt) {
      var direction = {
        37: 'L',
        38: 'U',
        39: 'R',
        40: 'D'
      }[evt.keyCode];

      if (direction === 'U' || direction === 'D') {
        if (this.inputIsEmpty) {
          this.selectFirstValidValue();
        } else {
          var currentChunk = this.getCurrentTokenChunk();

          if (!currentChunk) {
            this.selectFirstValidValue();
            return;
          }

          var tokenType = currentChunk.type;
          this.getClosestValidItemInCol(tokenType, this[tokenType], direction);
          var newChunkPos = this.getCurrentTokenChunk();
          this.debounceSetInputSelection(newChunkPos);
        }
      } else if (direction === 'R') {
        this.toLateralToken(false);
      } else if (direction === 'L') {
        this.toLateralToken(true);
      }
    },
    tabHandler: function tabHandler(evt) {
      if (!this.inputIsEmpty && this.tokenChunksPos && this.tokenChunksPos.length) {
        var currentChunk = this.getCurrentTokenChunk();

        if (!currentChunk) {
          return;
        }

        var firstChunk = this.tokenChunksPos[0];
        var lastChunk = this.tokenChunksPos[this.tokenChunksPos.length - 1];

        if (evt.shiftKey && currentChunk.token !== firstChunk.token || !evt.shiftKey && currentChunk.token !== lastChunk.token) {
          evt.preventDefault();
          this.toLateralToken(evt.shiftKey);
        }
      }
    },
    keyboardInput: function keyboardInput(newChar) {
      var isApm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var currentChunk = this.getCurrentTokenChunk();

      if (!currentChunk || currentChunk.type !== 'apm' && isApm || currentChunk.type === 'apm' && !isApm) {
        return;
      }

      this.kbInputLog = "".concat(this.kbInputLog.substr(-1)).concat(newChar);
      this.setKbInput();
      this.debounceClearKbLog();
    },
    clearKbInputLog: function clearKbInputLog() {
      window.clearTimeout(this.kbInputTimer);
      this.kbInputLog = '';
    },
    debounceClearKbLog: function debounceClearKbLog() {
      var _this17 = this;

      window.clearTimeout(this.kbInputTimer);
      this.kbInputTimer = window.setTimeout(function () {
        _this17.clearKbInputLog();
      }, this.opts.manualInputTimeout);
    },
    setKbInput: function setKbInput(value) {
      value = value || this.kbInputLog;
      var currentChunk = this.getCurrentTokenChunk();

      if (!currentChunk || !value || !value.length) {
        return;
      }

      var chunkType = currentChunk.type;
      var chunkToken = currentChunk.token;
      var validValue;

      if (chunkType === 'apm') {
        if (this.lowerCasedApm(value).includes('a')) {
          validValue = 'am';
        } else if (this.lowerCasedApm(value).includes('p')) {
          validValue = 'pm';
        }

        if (validValue) {
          validValue = chunkToken === 'A' ? validValue.toUpperCase() : validValue;
        }
      } else {
        if (this.isValidValue(chunkToken, value)) {
          validValue = value;
        } else {
          var lastInputValue = this.formatValue(chunkToken, value.substr(-1));

          if (this.isValidValue(chunkToken, lastInputValue)) {
            validValue = lastInputValue;
          }
        }
      }

      if (validValue) {
        this.setSanitizedValueToSection(chunkType, validValue);
        var newChunkPos = this.getCurrentTokenChunk();
        this.debounceSetInputSelection(newChunkPos);
      }

      if (this.debugMode) {
        if (validValue) {
          this.debugLog("Successfully set value \"".concat(validValue, "\" from latest input \"").concat(value, "\" for the \"").concat(chunkType, "\" slot"));
        } else {
          this.debugLog("Value \"".concat(value, "\" is invalid in the \"").concat(chunkType, "\" slot"));
        }
      }
    },
    // Form Autofill
    onChange: function onChange() {
      if (!this.manualInput || !this.$refs || !this.$refs.input) {
        return;
      }

      var autoFillValue = this.$refs.input.value || '';

      if (autoFillValue && autoFillValue.length) {
        this.readStringValues(autoFillValue);
      }
    },
    getNearestChunkByPos: function getNearestChunkByPos(startPos) {
      if (!this.tokenChunksPos || !this.tokenChunksPos.length) {
        return;
      }

      var nearest;
      var nearestDelta = -1;

      for (var i = 0; i < this.tokenChunksPos.length; i++) {
        var chunk = JSON.parse(JSON.stringify(this.tokenChunksPos[i]));

        if (chunk.start === startPos) {
          return chunk;
        }

        var delta = Math.abs(chunk.start - startPos);

        if (nearestDelta < 0) {
          nearest = chunk;
          nearestDelta = delta;
        } else {
          if (nearestDelta <= delta) {
            return nearest;
          }

          nearestDelta = delta;
          nearest = chunk;
        }
      }

      return nearest;
    },
    selectFirstValidValue: function selectFirstValidValue() {
      if (!this.tokenChunksPos || !this.tokenChunksPos.length) {
        return;
      }

      var firstSlotType = this.tokenChunksPos[0].type;

      if (firstSlotType === 'hour') {
        this.getClosestHourItem();
      } else {
        this.getClosestValidItemInCol(firstSlotType, this[firstSlotType]);
      }

      this.selectFirstSlot();
    },
    getClosestHourItem: function getClosestHourItem(currentValue) {
      var _this18 = this;

      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'U';

      if (!this.validHoursList || !this.validHoursList.length) {
        if (this.debugMode) {
          this.debugLog("No valid hour values found, please check your \"hour-range\" config\nhour-range: ".concat(JSON.stringify(this.hourRange)));
        }

        return;
      }

      if (!currentValue) {
        this.setManualHour(this.validHoursList[0]);
        return;
      }

      var currentIndex = this.validHoursList.findIndex(function (item) {
        if (!_this18.baseOn12Hours) {
          return item === currentValue;
        } else {
          var valueKey = "".concat(currentValue).concat(_this18.lowerCasedApm(_this18.apm) === 'pm' ? 'p' : 'a');
          return item === valueKey;
        }
      });
      var nextIndex;

      if (currentIndex === -1) {
        nextIndex = 0;
      } else if (direction === 'D') {
        nextIndex = currentIndex === 0 ? this.validHoursList.length - 1 : currentIndex - 1;
      } else {
        nextIndex = (currentIndex + 1) % this.validHoursList.length;
      }

      var nextItem = this.validHoursList[nextIndex];
      this.setManualHour(nextItem);
    },
    getClosestValidItemInCol: function getClosestValidItemInCol(column, currentValue) {
      var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'U';

      if (column === 'hour') {
        this.getClosestHourItem(currentValue, direction);
      } else {
        var nextItem = direction === 'D' ? this.prevItem(column, this[column], true) : this.nextItem(column, this[column], true);

        if (nextItem) {
          this.select(column, nextItem.getAttribute('data-key'));
        }
      }
    },
    setSanitizedValueToSection: function setSanitizedValueToSection(section, inputValue) {
      if (!section || !this.getTokenByType(section)) {
        return;
      } // NOTE: Disabled values are allowed here, followed by an 'error' event, though


      var sanitizedValue = this.sanitizedValue(this.getTokenByType(section), inputValue);
      this[section] = sanitizedValue;
    },
    setManualHour: function setManualHour(nextItem) {
      if (this.is12hRange(nextItem)) {
        var hourT = this.match12hRange(nextItem);
        var apmValue = hourT[2] === 'a' ? 'AM' : 'PM';
        this.setSanitizedValueToSection('apm', this.apmType === 'a' ? apmValue.toLowerCase() : apmValue);
        this.setSanitizedValueToSection('hour', hourT[1]);
      } else {
        this.setSanitizedValueToSection('hour', nextItem);
      }
    },
    debounceSetInputSelection: function debounceSetInputSelection(_ref) {
      var _this19 = this;

      var _ref$start = _ref.start,
          start = _ref$start === void 0 ? 0 : _ref$start,
          _ref$end = _ref.end,
          end = _ref$end === void 0 ? 0 : _ref$end;
      this.$nextTick(function () {
        _this19.setInputSelectionRange(start, end);
      });
      window.clearTimeout(this.selectionTimer);
      this.selectionTimer = window.setTimeout(function () {
        window.clearTimeout(_this19.selectionTimer); // Double-check selection for 12hr format

        if (_this19.$refs.input && (_this19.$refs.input.selectionStart !== start || _this19.$refs.input.selectionEnd !== end)) {
          _this19.setInputSelectionRange(start, end);
        }
      }, 30);
    },
    setInputSelectionRange: function setInputSelectionRange(start, end) {
      if (this.$refs && this.$refs.input) {
        this.$refs.input.setSelectionRange(start, end);
      }
    },
    getCurrentTokenChunk: function getCurrentTokenChunk() {
      return this.getNearestChunkByPos(this.$refs.input && this.$refs.input.selectionStart || 0);
    },
    selectFirstSlot: function selectFirstSlot() {
      var firstChunkPos = this.getNearestChunkByPos(0);
      this.debounceSetInputSelection(firstChunkPos);
    },
    toLateralToken: function toLateralToken(toLeft) {
      var currentChunk = this.getCurrentTokenChunk();

      if (!currentChunk) {
        this.selectFirstValidValue();
        return;
      }

      var currentChunkIndex = this.tokenChunksPos.findIndex(function (chk) {
        return chk.token === currentChunk.token;
      });

      if (!toLeft && currentChunkIndex >= this.tokenChunksPos.length - 1 || toLeft && currentChunkIndex === 0) {
        if (this.debugMode) {
          if (toLeft) {
            this.debugLog('You\'re in the leftmost slot already');
          } else {
            this.debugLog('You\'re in the rightmost slot already');
          }
        }

        return;
      }

      var targetSlotPos = toLeft ? this.tokenChunksPos[currentChunkIndex - 1] : this.tokenChunksPos[currentChunkIndex + 1];
      this.debounceSetInputSelection(targetSlotPos);
    },
    isCustomApmText: function isCustomApmText(inputData) {
      if (!inputData || !inputData.length) {
        return false;
      }

      if (this.amText && this.amText === inputData) {
        return this.apmType === 'A' ? 'AM' : 'am';
      }

      if (this.pmText && this.pmText === inputData) {
        return this.apmType === 'A' ? 'PM' : 'pm';
      }

      return false;
    },
    replaceCustomApmText: function replaceCustomApmText(inputString) {
      if (this.amText && this.amText.length && inputString.includes(this.amText)) {
        return inputString.replace(new RegExp(this.amText, 'g'), this.apmType === 'A' ? 'AM' : 'am');
      } else if (this.pmText && this.pmText.length && inputString.includes(this.pmText)) {
        return inputString.replace(new RegExp(this.pmText, 'g'), this.apmType === 'A' ? 'PM' : 'pm');
      }

      return inputString;
    },
    checkDropDirection: function checkDropDirection() {
      if (!this.$el) {
        return;
      }

      var container;

      if (this.containerId && this.containerId.length) {
        container = document.getElementById(this.containerId);

        if (!container && this.debugMode) {
          this.debugLog("Container with id \"".concat(this.containerId, "\" not found. Fallback to document body."));
        }
      }

      var el = this.$el;
      var spaceDown;

      if (container && container.offsetHeight) {
        // Valid container found
        spaceDown = container.offsetTop + container.offsetHeight - (el.offsetTop + el.offsetHeight);
      } else {
        // Fallback to document body
        var docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        spaceDown = docHeight - (el.offsetTop + el.offsetHeight);
      }

      this.forceDropOnTop = this.opts.dropOffsetHeight > spaceDown;
    },
    //
    // Helpers
    //
    is12hRange: function is12hRange(value) {
      return /^\d{1,2}(a|p|A|P)$/.test(value);
    },
    match12hRange: function match12hRange(value) {
      return value.match(/^(\d{1,2})(a|p|A|P)$/);
    },
    isNumber: function isNumber(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    isBasicType: function isBasicType(type) {
      return CONFIG.BASIC_TYPES.includes(type);
    },
    lowerCasedApm: function lowerCasedApm(apmValue) {
      return (apmValue || '').toLowerCase();
    },
    getTokenRegex: function getTokenRegex(token) {
      switch (token) {
        case 'HH':
          return '([01][0-9]|2[0-3]|H{2})';

        case 'H':
          return '([0-9]{1}|1[0-9]|2[0-3]|H{1})';

        case 'hh':
          return '(0[1-9]|1[0-2]|h{2})';

        case 'h':
          return '([1-9]{1}|1[0-2]|h{1})';

        case 'kk':
          return '(0[1-9]|1[0-9]|2[0-4]|k{2})';

        case 'k':
          return '([1-9]{1}|1[0-9]|2[0-4]|k{1})';

        case 'mm':
          return '([0-5][0-9]|m{2})';

        case 'ss':
          return '([0-5][0-9]|s{2})';

        case 'm':
          return '([0-9]{1}|[1-5][0-9]|m{1})';

        case 's':
          return '([0-9]{1}|[1-5][0-9]|s{1})';

        case 'A':
          return '(AM|PM|A{1})';

        case 'a':
          return '(am|pm|a{1})';

        default:
          return '';
      }
    },
    isEmptyValue: function isEmptyValue(targetToken, testValue) {
      return !testValue || !testValue.length || testValue && testValue === targetToken;
    },
    isValidValue: function isValidValue(targetToken, testValue) {
      if (!targetToken || this.isEmptyValue(targetToken, testValue)) {
        return false;
      }

      var tokenRegexStr = this.getTokenRegex(targetToken);

      if (!tokenRegexStr || !tokenRegexStr.length) {
        return false;
      }

      return new RegExp("^".concat(tokenRegexStr, "$")).test(testValue);
    },
    sanitizedValue: function sanitizedValue(targetToken, inputValue) {
      if (this.isValidValue(targetToken, inputValue)) {
        return inputValue;
      }

      return '';
    },
    getTokenType: function getTokenType(token) {
      return this.inUse.types[this.inUse.tokens.indexOf(token)] || '';
    },
    getTokenByType: function getTokenByType(type) {
      return this["".concat(type, "Type")] || '';
    },
    isMinuteOrSecond: function isMinuteOrSecond(type) {
      return ['minute', 'second'].includes(type);
    },
    debugLog: function debugLog(logText) {
      var _this20 = this;

      if (!logText || !logText.length) {
        return;
      }

      var identifier = '';

      if (this.id) {
        identifier += "#".concat(this.id);
      }

      if (this.name) {
        identifier += "[name=".concat(this.name, "]");
      }

      if (this.inputClass) {
        var inputClasses = [];

        if (typeof this.inputClass === 'string') {
          inputClasses = this.inputClass.split(/\s/g);
        } else if (Array.isArray(this.inputClass)) {
          inputClasses = [].concat([], this.inputClass);
        } else if (_typeof(this.inputClass) === 'object') {
          Object.keys(this.inputClass).forEach(function (clsName) {
            if (_this20.inputClass[clsName]) {
              inputClasses.push(clsName);
            }
          });
        }

        var _iterator4 = _createForOfIteratorHelper(inputClasses),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var inputClass = _step4.value;

            if (inputClass && inputClass.trim().length) {
              identifier += ".".concat(inputClass.trim());
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }

      var finalLogText = "DEBUG: ".concat(logText).concat(identifier ? "\n\t(".concat(identifier, ")") : '');

      if (window.console.debug && typeof window.console.debug === 'function') {
        window.console.debug(finalLogText);
      } else {
        window.console.log(finalLogText);
      }
    }
  },
  mounted: function mounted() {
    window.clearTimeout(this.debounceTimer);
    window.clearTimeout(this.selectionTimer);
    window.clearTimeout(this.kbInputTimer);
    this.renderFormat();
  },
  beforeDestroy: function beforeDestroy() {
    window.clearTimeout(this.debounceTimer);
    window.clearTimeout(this.selectionTimer);
    window.clearTimeout(this.kbInputTimer);
  }
});
// CONCATENATED MODULE: ./src/vue-timepicker.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_vue_timepickervue_type_script_lang_js_ = (vue_timepickervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/vue-timepicker.vue?vue&type=style&index=0&lang=css&
var vue_timepickervue_type_style_index_0_lang_css_ = __webpack_require__("aab0");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/vue-timepicker.vue






/* normalize component */

var component = normalizeComponent(
  src_vue_timepickervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_timepicker = (component.exports);
// CONCATENATED MODULE: ./src/index.js

/* harmony default export */ var src_0 = (vue_timepicker);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_0);



/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fd6f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ });
//# sourceMappingURL=VueTimepicker.common.js.map

/***/ }),

/***/ "./node_modules/vue2-timepicker/dist/VueTimepicker.css":
/*!*************************************************************!*\
  !*** ./node_modules/vue2-timepicker/dist/VueTimepicker.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader??ref--6-1!../../postcss-loader/src??ref--6-2!./VueTimepicker.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/vue2-timepicker/dist/VueTimepicker.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

}]);