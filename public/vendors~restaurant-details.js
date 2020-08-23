(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~restaurant-details"],{

/***/ "./node_modules/card-js/card-js.min.js":
/*!*********************************************!*\
  !*** ./node_modules/card-js/card-js.min.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function CardJs(elem){this.elem=jQuery(elem),this.captureName=this.elem.data("capture-name")?this.elem.data("capture-name"):!1,this.iconColour=this.elem.data("icon-colour")?this.elem.data("icon-colour"):!1,this.stripe=this.elem.data("stripe")?this.elem.data("stripe"):!1,this.stripe&&(this.captureName=!1),this.initCardNumberInput(),this.initNameInput(),this.initExpiryMonthInput(),this.initExpiryYearInput(),this.initCvcInput(),this.elem.empty(),this.setupCardNumberInput(),this.setupNameInput(),this.setupExpiryInput(),this.setupCvcInput(),this.iconColour&&this.setIconColour(this.iconColour),this.refreshCreditCardTypeIcon()}!function($){var methods={init:function(){return this.data("cardjs",new CardJs(this)),this},cardNumber:function(){return this.data("cardjs").getCardNumber()},cardType:function(){return this.data("cardjs").getCardType()},name:function(){return this.data("cardjs").getName()},expiryMonth:function(){return this.data("cardjs").getExpiryMonth()},expiryYear:function(){return this.data("cardjs").getExpiryYear()},cvc:function(){return this.data("cardjs").getCvc()}};$.fn.CardJs=function(methodOrOptions){return methods[methodOrOptions]?methods[methodOrOptions].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof methodOrOptions&&methodOrOptions?void $.error("Method "+methodOrOptions+" does not exist on jQuery.CardJs"):methods.init.apply(this,arguments)}}(jQuery),$(function(){$(".card-js").each(function(i,obj){$(obj).CardJs()})}),CardJs.prototype.constructor=CardJs,CardJs.KEYS={0:48,9:57,NUMPAD_0:96,NUMPAD_9:105,DELETE:46,BACKSPACE:8,ARROW_LEFT:37,ARROW_RIGHT:39,ARROW_UP:38,ARROW_DOWN:40,HOME:36,END:35,TAB:9,A:65,X:88,C:67,V:86},CardJs.CREDIT_CARD_NUMBER_DEFAULT_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_VISA_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_MASTERCARD_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_DISCOVER_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_JCB_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_AMEX_MASK="XXXX XXXXXX XXXXX",CardJs.CREDIT_CARD_NUMBER_DINERS_MASK="XXXX XXXX XXXX XX",CardJs.prototype.creditCardNumberMask=CardJs.CREDIT_CARD_NUMBER_DEFAULT_MASK,CardJs.CREDIT_CARD_NUMBER_PLACEHOLDER="Card number",CardJs.NAME_PLACEHOLDER="Name on card",CardJs.EXPIRY_MASK="XX / XX",CardJs.EXPIRY_PLACEHOLDER="MM / YY",CardJs.EXPIRY_USE_DROPDOWNS=!1,CardJs.EXPIRY_NUMBER_OF_YEARS=10,CardJs.CVC_MASK_3="XXX",CardJs.CVC_MASK_4="XXXX",CardJs.CVC_PLACEHOLDER="CVC",CardJs.CREDIT_CARD_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="3px" width="24px" height="17px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><g><path class="svg" d="M182.385,14.258c-2.553-2.553-5.621-3.829-9.205-3.829H42.821c-3.585,0-6.653,1.276-9.207,3.829c-2.553,2.553-3.829,5.621-3.829,9.206v99.071c0,3.585,1.276,6.654,3.829,9.207c2.554,2.553,5.622,3.829,9.207,3.829H173.18c3.584,0,6.652-1.276,9.205-3.829s3.83-5.622,3.83-9.207V23.464C186.215,19.879,184.938,16.811,182.385,14.258z M175.785,122.536c0,0.707-0.258,1.317-0.773,1.834c-0.516,0.515-1.127,0.772-1.832,0.772H42.821c-0.706,0-1.317-0.258-1.833-0.773c-0.516-0.518-0.774-1.127-0.774-1.834V73h135.571V122.536z M175.785,41.713H40.214v-18.25c0-0.706,0.257-1.316,0.774-1.833c0.516-0.515,1.127-0.773,1.833-0.773H173.18c0.705,0,1.316,0.257,1.832,0.773c0.516,0.517,0.773,1.127,0.773,1.833V41.713z"/><rect class="svg" x="50.643" y="104.285" width="20.857" height="10.429"/><rect class="svg" x="81.929" y="104.285" width="31.286" height="10.429"/></g></svg>',CardJs.LOCK_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="3px" width="24px" height="17px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><path class="svg" d="M152.646,70.067c-1.521-1.521-3.367-2.281-5.541-2.281H144.5V52.142c0-9.994-3.585-18.575-10.754-25.745c-7.17-7.17-15.751-10.755-25.746-10.755s-18.577,3.585-25.746,10.755C75.084,33.567,71.5,42.148,71.5,52.142v15.644h-2.607c-2.172,0-4.019,0.76-5.54,2.281c-1.521,1.52-2.281,3.367-2.281,5.541v46.929c0,2.172,0.76,4.019,2.281,5.54c1.521,1.52,3.368,2.281,5.54,2.281h78.214c2.174,0,4.02-0.76,5.541-2.281c1.52-1.521,2.281-3.368,2.281-5.54V75.607C154.93,73.435,154.168,71.588,152.646,70.067z M128.857,67.786H87.143V52.142c0-5.757,2.037-10.673,6.111-14.746c4.074-4.074,8.989-6.11,14.747-6.11s10.673,2.036,14.746,6.11c4.073,4.073,6.11,8.989,6.11,14.746V67.786z"/></svg>',CardJs.CALENDAR_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><path class="svg" d="M172.691,23.953c-2.062-2.064-4.508-3.096-7.332-3.096h-10.428v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.554-2.553-5.621-3.83-9.207-3.83h-5.213c-3.586,0-6.654,1.277-9.207,3.83c-2.554,2.553-3.83,5.622-3.83,9.206v7.822H92.359v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.553-2.553-5.622-3.83-9.207-3.83h-5.214c-3.585,0-6.654,1.277-9.207,3.83c-2.553,2.553-3.83,5.622-3.83,9.206v7.822H50.643c-2.825,0-5.269,1.032-7.333,3.096s-3.096,4.509-3.096,7.333v104.287c0,2.823,1.032,5.267,3.096,7.332c2.064,2.064,4.508,3.096,7.333,3.096h114.714c2.824,0,5.27-1.032,7.332-3.096c2.064-2.064,3.096-4.509,3.096-7.332V31.286C175.785,28.461,174.754,26.017,172.691,23.953z M134.073,13.036c0-0.761,0.243-1.386,0.731-1.874c0.488-0.488,1.113-0.733,1.875-0.733h5.213c0.762,0,1.385,0.244,1.875,0.733c0.488,0.489,0.732,1.114,0.732,1.874V36.5c0,0.761-0.244,1.385-0.732,1.874c-0.49,0.488-1.113,0.733-1.875,0.733h-5.213c-0.762,0-1.387-0.244-1.875-0.733s-0.731-1.113-0.731-1.874V13.036z M71.501,13.036c0-0.761,0.244-1.386,0.733-1.874c0.489-0.488,1.113-0.733,1.874-0.733h5.214c0.761,0,1.386,0.244,1.874,0.733c0.488,0.489,0.733,1.114,0.733,1.874V36.5c0,0.761-0.244,1.386-0.733,1.874c-0.489,0.488-1.113,0.733-1.874,0.733h-5.214c-0.761,0-1.386-0.244-1.874-0.733c-0.488-0.489-0.733-1.113-0.733-1.874V13.036z M165.357,135.572H50.643V52.143h114.714V135.572z"/></svg>',CardJs.USER_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><g><path class="svg" d="M107.999,73c8.638,0,16.011-3.056,22.12-9.166c6.111-6.11,9.166-13.483,9.166-22.12c0-8.636-3.055-16.009-9.166-22.12c-6.11-6.11-13.484-9.165-22.12-9.165c-8.636,0-16.01,3.055-22.12,9.165c-6.111,6.111-9.166,13.484-9.166,22.12c0,8.637,3.055,16.01,9.166,22.12C91.99,69.944,99.363,73,107.999,73z"/><path class="svg" d="M165.07,106.037c-0.191-2.743-0.571-5.703-1.141-8.881c-0.57-3.178-1.291-6.124-2.16-8.84c-0.869-2.715-2.037-5.363-3.504-7.943c-1.466-2.58-3.15-4.78-5.052-6.6s-4.223-3.272-6.965-4.358c-2.744-1.086-5.772-1.63-9.085-1.63c-0.489,0-1.63,0.584-3.422,1.752s-3.815,2.472-6.069,3.911c-2.254,1.438-5.188,2.743-8.799,3.909c-3.612,1.168-7.237,1.752-10.877,1.752c-3.639,0-7.264-0.584-10.876-1.752c-3.611-1.166-6.545-2.471-8.799-3.909c-2.254-1.439-4.277-2.743-6.069-3.911c-1.793-1.168-2.933-1.752-3.422-1.752c-3.313,0-6.341,0.544-9.084,1.63s-5.065,2.539-6.966,4.358c-1.901,1.82-3.585,4.02-5.051,6.6s-2.634,5.229-3.503,7.943c-0.869,2.716-1.589,5.662-2.159,8.84c-0.571,3.178-0.951,6.137-1.141,8.881c-0.19,2.744-0.285,5.554-0.285,8.433c0,6.517,1.983,11.664,5.948,15.439c3.965,3.774,9.234,5.661,15.806,5.661h71.208c6.572,0,11.84-1.887,15.806-5.661c3.966-3.775,5.948-8.921,5.948-15.439C165.357,111.591,165.262,108.78,165.07,106.037z"/></g></svg>',CardJs.MAIL_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><path class="svg" d="M177.171,19.472c-2.553-2.553-5.622-3.829-9.206-3.829H48.036c-3.585,0-6.654,1.276-9.207,3.829C36.276,22.025,35,25.094,35,28.679v88.644c0,3.585,1.276,6.652,3.829,9.205c2.553,2.555,5.622,3.83,9.207,3.83h119.929c3.584,0,6.653-1.275,9.206-3.83c2.554-2.553,3.829-5.621,3.829-9.205V28.679C181,25.094,179.725,22.025,177.171,19.472zM170.57,117.321c0,0.706-0.258,1.317-0.774,1.833s-1.127,0.773-1.832,0.773H48.035c-0.706,0-1.317-0.257-1.833-0.773c-0.516-0.516-0.774-1.127-0.774-1.833V54.75c1.738,1.955,3.612,3.748,5.622,5.377c14.557,11.189,26.126,20.368,34.708,27.538c2.77,2.336,5.024,4.155,6.762,5.459s4.087,2.62,7.047,3.951s5.744,1.995,8.351,1.995H108h0.081c2.606,0,5.392-0.664,8.351-1.995c2.961-1.331,5.311-2.647,7.049-3.951c1.737-1.304,3.992-3.123,6.762-5.459c8.582-7.17,20.15-16.349,34.707-27.538c2.01-1.629,3.885-3.422,5.621-5.377V117.321z M170.57,30.797v0.896c0,3.204-1.262,6.776-3.787,10.713c-2.525,3.938-5.256,7.075-8.188,9.41c-10.484,8.257-21.373,16.865-32.672,25.827c-0.326,0.271-1.277,1.073-2.852,2.403c-1.574,1.331-2.824,2.351-3.748,3.056c-0.924,0.707-2.131,1.562-3.625,2.566s-2.865,1.752-4.114,2.24s-2.417,0.732-3.503,0.732H108h-0.082c-1.086,0-2.253-0.244-3.503-0.732c-1.249-0.488-2.621-1.236-4.114-2.24c-1.493-1.004-2.702-1.859-3.625-2.566c-0.923-0.705-2.173-1.725-3.748-3.056c-1.575-1.33-2.526-2.132-2.852-2.403c-11.297-8.962-22.187-17.57-32.67-25.827c-7.985-6.3-11.977-14.013-11.977-23.138c0-0.706,0.258-1.317,0.774-1.833c0.516-0.516,1.127-0.774,1.833-0.774h119.929c0.434,0.244,0.814,0.312,1.141,0.204c0.326-0.11,0.57,0.094,0.732,0.61c0.163,0.516,0.312,0.76,0.448,0.733c0.136-0.027,0.218,0.312,0.245,1.019c0.025,0.706,0.039,1.061,0.039,1.061V30.797z"/></svg>',CardJs.INFORMATION_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><g><path class="svg" d="M97.571,41.714h20.859c1.411,0,2.633-0.516,3.666-1.548c1.031-1.031,1.547-2.254,1.547-3.666V20.857c0-1.412-0.516-2.634-1.549-3.667c-1.031-1.031-2.254-1.548-3.666-1.548H97.571c-1.412,0-2.634,0.517-3.666,1.548c-1.032,1.032-1.548,2.255-1.548,3.667V36.5c0,1.412,0.516,2.635,1.548,3.666C94.937,41.198,96.159,41.714,97.571,41.714z"/><path class="svg" d="M132.523,111.048c-1.031-1.032-2.254-1.548-3.666-1.548h-5.215V62.571c0-1.412-0.516-2.634-1.547-3.666c-1.033-1.032-2.255-1.548-3.666-1.548H87.143c-1.412,0-2.634,0.516-3.666,1.548c-1.032,1.032-1.548,2.254-1.548,3.666V73c0,1.412,0.516,2.635,1.548,3.666c1.032,1.032,2.254,1.548,3.666,1.548h5.215V109.5h-5.215c-1.412,0-2.634,0.516-3.666,1.548c-1.032,1.032-1.548,2.254-1.548,3.666v10.429c0,1.412,0.516,2.635,1.548,3.668c1.032,1.03,2.254,1.547,3.666,1.547h41.714c1.412,0,2.634-0.517,3.666-1.547c1.031-1.033,1.547-2.256,1.547-3.668v-10.429C134.07,113.302,133.557,112.08,132.523,111.048z"/></g></svg>',CardJs.keyCodeFromEvent=function(e){return e.which||e.keyCode},CardJs.keyIsCommandFromEvent=function(e){return e.ctrlKey||e.metaKey},CardJs.keyIsNumber=function(e){return CardJs.keyIsTopNumber(e)||CardJs.keyIsKeypadNumber(e)},CardJs.keyIsTopNumber=function(e){var keyCode=CardJs.keyCodeFromEvent(e);return keyCode>=CardJs.KEYS[0]&&keyCode<=CardJs.KEYS[9]},CardJs.keyIsKeypadNumber=function(e){var keyCode=CardJs.keyCodeFromEvent(e);return keyCode>=CardJs.KEYS.NUMPAD_0&&keyCode<=CardJs.KEYS.NUMPAD_9},CardJs.keyIsDelete=function(e){return CardJs.keyCodeFromEvent(e)==CardJs.KEYS.DELETE},CardJs.keyIsBackspace=function(e){return CardJs.keyCodeFromEvent(e)==CardJs.KEYS.BACKSPACE},CardJs.keyIsDeletion=function(e){return CardJs.keyIsDelete(e)||CardJs.keyIsBackspace(e)},CardJs.keyIsArrow=function(e){var keyCode=CardJs.keyCodeFromEvent(e);return keyCode>=CardJs.KEYS.ARROW_LEFT&&keyCode<=CardJs.KEYS.ARROW_DOWN},CardJs.keyIsNavigation=function(e){var keyCode=CardJs.keyCodeFromEvent(e);return keyCode==CardJs.KEYS.HOME||keyCode==CardJs.KEYS.END},CardJs.keyIsKeyboardCommand=function(e){var keyCode=CardJs.keyCodeFromEvent(e);return CardJs.keyIsCommandFromEvent(e)&&(keyCode==CardJs.KEYS.A||keyCode==CardJs.KEYS.X||keyCode==CardJs.KEYS.C||keyCode==CardJs.KEYS.V)},CardJs.keyIsTab=function(e){return CardJs.keyCodeFromEvent(e)==CardJs.KEYS.TAB},CardJs.copyAllElementAttributes=function(source,destination){$.each(source[0].attributes,function(idx,attr){destination.attr(attr.nodeName,attr.nodeValue)})},CardJs.numbersOnlyString=function(string){for(var numbersOnlyString="",i=0;i<string.length;i++){var currentChar=string.charAt(i),isValid=!isNaN(parseInt(currentChar));isValid&&(numbersOnlyString+=currentChar)}return numbersOnlyString},CardJs.applyFormatMask=function(string,mask){for(var formattedString="",numberPos=0,j=0;j<mask.length;j++){var currentMaskChar=mask[j];if("X"==currentMaskChar){var digit=string.charAt(numberPos);if(!digit)break;formattedString+=string.charAt(numberPos),numberPos++}else formattedString+=currentMaskChar}return formattedString},CardJs.cardTypeFromNumber=function(number){if(re=new RegExp("^30[0-5]"),null!=number.match(re))return"Diners - Carte Blanche";if(re=new RegExp("^(30[6-9]|36|38)"),null!=number.match(re))return"Diners";if(re=new RegExp("^35(2[89]|[3-8][0-9])"),null!=number.match(re))return"JCB";if(re=new RegExp("^3[47]"),null!=number.match(re))return"AMEX";if(re=new RegExp("^(4026|417500|4508|4844|491(3|7))"),null!=number.match(re))return"Visa Electron";var re=new RegExp("^4");return null!=number.match(re)?"Visa":(re=new RegExp("^5[1-5]"),null!=number.match(re)?"Mastercard":(re=new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"),null!=number.match(re)?"Discover":""))},CardJs.caretStartPosition=function(element){return"number"==typeof element.selectionStart?element.selectionStart:!1},CardJs.caretEndPosition=function(element){return"number"==typeof element.selectionEnd?element.selectionEnd:!1},CardJs.setCaretPosition=function(element,caretPos){if(null!=element)if(element.createTextRange){var range=element.createTextRange();range.move("character",caretPos),range.select()}else element.selectionStart?(element.focus(),element.setSelectionRange(caretPos,caretPos)):element.focus()},CardJs.normaliseCaretPosition=function(mask,caretPosition){var numberPos=0;if(0>caretPosition||caretPosition>mask.length)return 0;for(var i=0;i<mask.length;i++){if(i==caretPosition)return numberPos;"X"==mask[i]&&numberPos++}return numberPos},CardJs.denormaliseCaretPosition=function(mask,caretPosition){var numberPos=0;if(0>caretPosition||caretPosition>mask.length)return 0;for(var i=0;i<mask.length;i++){if(numberPos==caretPosition)return i;"X"==mask[i]&&numberPos++}return mask.length},CardJs.filterNumberOnlyKey=function(e){var isNumber=CardJs.keyIsNumber(e),isDeletion=CardJs.keyIsDeletion(e),isArrow=CardJs.keyIsArrow(e),isNavigation=CardJs.keyIsNavigation(e),isKeyboardCommand=CardJs.keyIsKeyboardCommand(e),isTab=CardJs.keyIsTab(e);isNumber||isDeletion||isArrow||isNavigation||isKeyboardCommand||isTab||e.preventDefault()},CardJs.digitFromKeyCode=function(keyCode){return keyCode>=CardJs.KEYS[0]&&keyCode<=CardJs.KEYS[9]?keyCode-CardJs.KEYS[0]:keyCode>=CardJs.KEYS.NUMPAD_0&&keyCode<=CardJs.KEYS.NUMPAD_9?keyCode-CardJs.KEYS.NUMPAD_0:null},CardJs.handleMaskedNumberInputKey=function(e,mask){CardJs.filterNumberOnlyKey(e);var keyCode=e.which||e.keyCode,element=e.target,caretStart=CardJs.caretStartPosition(element),caretEnd=CardJs.caretEndPosition(element),normalisedStartCaretPosition=CardJs.normaliseCaretPosition(mask,caretStart),normalisedEndCaretPosition=CardJs.normaliseCaretPosition(mask,caretEnd),newCaretPosition=caretStart,isNumber=CardJs.keyIsNumber(e),isDelete=CardJs.keyIsDelete(e),isBackspace=CardJs.keyIsBackspace(e);if(isNumber||isDelete||isBackspace){e.preventDefault();var rawText=$(element).val(),numbersOnly=CardJs.numbersOnlyString(rawText),digit=CardJs.digitFromKeyCode(keyCode),rangeHighlighted=normalisedEndCaretPosition>normalisedStartCaretPosition;rangeHighlighted&&(numbersOnly=numbersOnly.slice(0,normalisedStartCaretPosition)+numbersOnly.slice(normalisedEndCaretPosition)),caretStart!=mask.length&&(isNumber&&rawText.length<=mask.length&&(numbersOnly=numbersOnly.slice(0,normalisedStartCaretPosition)+digit+numbersOnly.slice(normalisedStartCaretPosition),newCaretPosition=Math.max(CardJs.denormaliseCaretPosition(mask,normalisedStartCaretPosition+1),CardJs.denormaliseCaretPosition(mask,normalisedStartCaretPosition+2)-1)),isDelete&&(numbersOnly=numbersOnly.slice(0,normalisedStartCaretPosition)+numbersOnly.slice(normalisedStartCaretPosition+1))),0!=caretStart&&isBackspace&&!rangeHighlighted&&(numbersOnly=numbersOnly.slice(0,normalisedStartCaretPosition-1)+numbersOnly.slice(normalisedStartCaretPosition),newCaretPosition=CardJs.denormaliseCaretPosition(mask,normalisedStartCaretPosition-1)),$(element).val(CardJs.applyFormatMask(numbersOnly,mask)),CardJs.setCaretPosition(element,newCaretPosition)}},CardJs.handleCreditCardNumberKey=function(e,cardMask){CardJs.handleMaskedNumberInputKey(e,cardMask)},CardJs.handleCreditCardNumberChange=function(e){},CardJs.handleExpiryKey=function(e){CardJs.handleMaskedNumberInputKey(e,CardJs.EXPIRY_MASK)},CardJs.prototype.getCardNumber=function(){return this.cardNumberInput.val()},CardJs.prototype.getCardType=function(){return CardJs.cardTypeFromNumber(this.getCardNumber())},CardJs.prototype.getName=function(){return this.nameInput.val()},CardJs.prototype.getExpiryMonth=function(){return this.expiryMonthInput.val()},CardJs.prototype.getExpiryYear=function(){return this.expiryYearInput.val()},CardJs.prototype.getCvc=function(){return this.cvcInput.val()},CardJs.prototype.setIconColour=function(colour){this.elem.find(".icon .svg").css({fill:colour})},CardJs.prototype.setIconColour=function(colour){this.elem.find(".icon .svg").css({fill:colour})},CardJs.prototype.refreshCreditCardTypeIcon=function(){this.setCardTypeIconFromNumber(CardJs.numbersOnlyString(this.cardNumberInput.val()))},CardJs.prototype.clearCardTypeIcon=function(){this.elem.find(".card-number-wrapper .card-type-icon").removeClass("show")},CardJs.prototype.setCardTypeIconAsVisa=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show visa")},CardJs.prototype.setCardTypeIconAsMasterCard=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show master-card")},CardJs.prototype.setCardTypeIconAsAmericanExpress=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show american-express")},CardJs.prototype.setCardTypeIconAsDiscover=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show discover")},CardJs.prototype.setCardTypeIconAsDiners=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show diners")},CardJs.prototype.setCardTypeIconAsJcb=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show jcb")},CardJs.prototype.setCardTypeIconFromNumber=function(number){switch(CardJs.cardTypeFromNumber(number)){case"Visa Electron":case"Visa":this.setCardTypeAsVisa();break;case"Mastercard":this.setCardTypeAsMasterCard();break;case"AMEX":this.setCardTypeAsAmericanExpress();break;case"Discover":this.setCardTypeAsDiscover();break;case"Diners - Carte Blanche":case"Diners":this.setCardTypeAsDiners();break;case"JCB":this.setCardTypeAsJcb();break;default:this.clearCardType()}},CardJs.prototype.setCardMask=function(cardMask){this.creditCardNumberMask=cardMask,this.cardNumberInput.attr("maxlength",cardMask.length)},CardJs.prototype.setCvc3=function(){this.cvcInput.attr("maxlength",CardJs.CVC_MASK_3.length)},CardJs.prototype.setCvc4=function(){this.cvcInput.attr("maxlength",CardJs.CVC_MASK_4.length)},CardJs.prototype.clearCardType=function(){this.clearCardTypeIcon(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_DEFAULT_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsVisa=function(){this.setCardTypeIconAsVisa(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_VISA_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsMasterCard=function(){this.setCardTypeIconAsMasterCard(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_MASTERCARD_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsAmericanExpress=function(){this.setCardTypeIconAsAmericanExpress(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_AMEX_MASK),this.setCvc4()},CardJs.prototype.setCardTypeAsDiscover=function(){this.setCardTypeIconAsDiscover(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_DISCOVER_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsDiners=function(){this.setCardTypeIconAsDiners(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_DINERS_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsJcb=function(){this.setCardTypeIconAsJcb(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_JCB_MASK),this.setCvc3()},CardJs.prototype.initCardNumberInput=function(){var $this=this;this.cardNumberInput=this.elem.find(".card-number"),this.cardNumberInput[0]?this.cardNumberInput.detach():this.cardNumberInput=$("<input class='card-number' />"),this.cardNumberInput.attr("type","tel"),this.cardNumberInput.attr("placeholder")||this.cardNumberInput.attr("placeholder",CardJs.CREDIT_CARD_NUMBER_PLACEHOLDER),this.cardNumberInput.attr("maxlength",this.creditCardNumberMask.length),this.cardNumberInput.attr("x-autocompletetype","cc-number"),this.cardNumberInput.attr("autocompletetype","cc-number"),this.cardNumberInput.attr("autocorrect","off"),this.cardNumberInput.attr("spellcheck","off"),this.cardNumberInput.attr("autocapitalize","off"),this.cardNumberInput.keydown(function(e){CardJs.handleCreditCardNumberKey(e,$this.creditCardNumberMask)}),this.cardNumberInput.keyup(function(e){$this.refreshCreditCardTypeIcon()}),this.cardNumberInput.change(CardJs.handleCreditCardNumberChange)},CardJs.prototype.initNameInput=function(){this.nameInput=this.elem.find(".name"),this.nameInput[0]?(this.captureName=!0,this.nameInput.detach()):this.nameInput=$("<input class='name' />"),this.nameInput.attr("placeholder")||this.nameInput.attr("placeholder",CardJs.NAME_PLACEHOLDER)},CardJs.prototype.initExpiryMonthInput=function(){this.expiryMonthInput=this.elem.find(".expiry-month"),this.expiryMonthInput[0]?this.expiryMonthInput.detach():this.expiryMonthInput=$("<input class='expiry-month' />")},CardJs.prototype.initExpiryYearInput=function(){this.expiryYearInput=this.elem.find(".expiry-year"),this.expiryYearInput[0]?this.expiryYearInput.detach():this.expiryYearInput=$("<input class='expiry-year' />")},CardJs.prototype.initCvcInput=function(){this.cvcInput=this.elem.find(".cvc"),this.cvcInput[0]?this.cvcInput.detach():this.cvcInput=$("<input class='cvc' />"),this.cvcInput.attr("type","tel"),this.cvcInput.attr("placeholder")||this.cvcInput.attr("placeholder",CardJs.CVC_PLACEHOLDER),this.cvcInput.attr("maxlength",CardJs.CVC_MASK_3.length),this.cvcInput.attr("x-autocompletetype","cc-csc"),this.cvcInput.attr("autocompletetype","cc-csc"),this.cvcInput.attr("autocorrect","off"),this.cvcInput.attr("spellcheck","off"),this.cvcInput.attr("autocapitalize","off"),this.cvcInput.keydown(CardJs.filterNumberOnlyKey)},CardJs.prototype.setupCardNumberInput=function(){this.stripe&&this.cardNumberInput.attr("data-stripe","number"),this.elem.append("<div class='card-number-wrapper'></div>");var wrapper=this.elem.find(".card-number-wrapper");wrapper.append(this.cardNumberInput),wrapper.append("<div class='card-type-icon'></div>"),wrapper.append("<div class='icon'></div>"),wrapper.find(".icon").append(CardJs.CREDIT_CARD_SVG)},CardJs.prototype.setupNameInput=function(){if(this.captureName){this.elem.append("<div class='name-wrapper'></div>");var wrapper=this.elem.find(".name-wrapper");wrapper.append(this.nameInput),wrapper.append("<div class='icon'></div>"),wrapper.find(".icon").append(CardJs.USER_SVG)}},CardJs.prototype.setupExpiryInput=function(){this.elem.append("<div class='expiry-container'><div class='expiry-wrapper'></div></div>");var expiryInput,wrapper=this.elem.find(".expiry-wrapper");if(this.EXPIRY_USE_DROPDOWNS){expiryInput=$("<div></div>");var expiryMonthNew=$("<select><option value='any' selected='' hidden=''>MM</option><option value='1'>01</option><option value='2'>02</option><option value='3'>03</option><option value='4'>04</option><option value='5'>05</option><option value='6'>06</option><option value='7'>07</option><option value='8'>08</option><option value='9'>09</option><option value='10'>10</option><option value='11'>11</option><option value='12'>12</option></select>"),expiryMonthOld=this.expiryMonthInput;CardJs.copyAllElementAttributes(expiryMonthOld,expiryMonthNew),this.expiryMonthInput.remove(),this.expiryMonthInput=expiryMonthNew;for(var expiryYearNew=$("<select><option value='any' selected='' hidden=''>YY</option></select>"),currentYear=parseInt((new Date).getFullYear().toString().substring(2,4)),i=0;i<CardJs.EXPIRY_NUMBER_OF_YEARS;i++)expiryYearNew.append("<option value='"+currentYear+"'>"+currentYear+"</option>"),currentYear=(currentYear+1)%100;var expiryYearOld=this.expiryYearInput;CardJs.copyAllElementAttributes(expiryYearOld,expiryYearNew),this.expiryYearInput.remove(),this.expiryYearInput=expiryYearNew,expiryInput.append(this.expiryMonthInput),expiryInput.append(this.expiryYearInput)}else{expiryInput=$("<div></div>"),this.expiryMonthInput=$("<input type='hidden' name='expiry-month' />"),this.expiryYearInput=$("<input type='hidden' name='expiry-year' />"),this.stripe&&(this.expiryMonthInput.attr("data-stripe","exp-month"),this.expiryYearInput.attr("data-stripe","exp-year")),this.expiryMonthYearInput=$("<input class='expiry' />"),this.expiryMonthYearInput.attr("type","tel"),this.expiryMonthYearInput.attr("placeholder")||this.expiryMonthYearInput.attr("placeholder",CardJs.EXPIRY_PLACEHOLDER),this.expiryMonthYearInput.attr("maxlength",CardJs.EXPIRY_MASK.length),this.expiryMonthYearInput.attr("x-autocompletetype","cc-exp"),this.expiryMonthYearInput.attr("autocompletetype","cc-exp"),this.expiryMonthYearInput.attr("autocorrect","off"),this.expiryMonthYearInput.attr("spellcheck","off"),this.expiryMonthYearInput.attr("autocapitalize","off");var $this=this;this.expiryMonthYearInput.keydown(function(e){CardJs.handleExpiryKey(e);var val=$this.expiryMonthYearInput.val();1==val.length&&parseInt(val)>1&&CardJs.keyIsNumber(e)&&$this.expiryMonthYearInput.val(CardJs.applyFormatMask("0"+val,CardJs.EXPIRY_MASK)),$this.EXPIRY_USE_DROPDOWNS||null==$this.expiryMonthYearInput||($this.expiryMonthInput.val($this.expiryMonth()),$this.expiryYearInput.val(7==val.length?val.substr(5,2):null))}),this.expiryMonthYearInput.blur(function(e){$this.refreshExpiryMonthValidation()}),expiryInput.append(this.expiryMonthYearInput),expiryInput.append(this.expiryMonthInput),expiryInput.append(this.expiryYearInput)}wrapper.append(expiryInput),wrapper.append("<div class='icon'></div>"),wrapper.find(".icon").append(CardJs.CALENDAR_SVG)},CardJs.prototype.setupCvcInput=function(){this.stripe&&this.cvcInput.attr("data-stripe","cvc"),this.elem.append("<div class='cvc-container'><div class='cvc-wrapper'></div></div>");var wrapper=this.elem.find(".cvc-wrapper");wrapper.append(this.cvcInput),wrapper.append("<div class='icon'></div>"),wrapper.find(".icon").append(CardJs.LOCK_SVG)},CardJs.prototype.expiryMonth=function(){if(!this.EXPIRY_USE_DROPDOWNS&&null!=this.expiryMonthYearInput){var val=this.expiryMonthYearInput.val();return val.length>=2?parseInt(val.substr(0,2)):null}return null},CardJs.isValidMonth=function(expiryMonth){return expiryMonth>=1&&12>=expiryMonth},CardJs.isExpiryValid=function(month,year){var today=new Date,currentMonth=today.getMonth()+1,currentYear=""+today.getFullYear();return 2==(""+year).length&&(year=currentYear.substring(0,2)+""+year),currentMonth=parseInt(currentMonth),currentYear=parseInt(currentYear),month=parseInt(month),year=parseInt(year),CardJs.isValidMonth(month)&&(year>currentYear||year==currentYear&&month>=currentMonth)},CardJs.prototype.refreshExpiryMonthValidation=function(){CardJs.isExpiryValid(this.getExpiryMonth(),this.getExpiryYear())?this.setExpiryMonthAsValid():this.setExpiryMonthAsInvalid()},CardJs.prototype.setExpiryMonthAsValid=function(){this.EXPIRY_USE_DROPDOWNS||this.expiryMonthYearInput.parent().removeClass("has-error")},CardJs.prototype.setExpiryMonthAsInvalid=function(){this.EXPIRY_USE_DROPDOWNS||this.expiryMonthYearInput.parent().addClass("has-error")};

/***/ }),

/***/ "./node_modules/card-validator/dist/card-number.js":
/*!*********************************************************!*\
  !*** ./node_modules/card-validator/dist/card-number.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cardNumber = void 0;
var luhn10 = __webpack_require__(/*! ./luhn-10 */ "./node_modules/card-validator/dist/luhn-10.js");
var getCardTypes = __webpack_require__(/*! credit-card-type */ "./node_modules/credit-card-type/dist/index.js");
function verification(card, isPotentiallyValid, isValid) {
    return {
        card: card,
        isPotentiallyValid: isPotentiallyValid,
        isValid: isValid,
    };
}
function cardNumber(value, options) {
    if (options === void 0) { options = {}; }
    var isPotentiallyValid, isValid, maxLength;
    if (typeof value !== "string" && typeof value !== "number") {
        return verification(null, false, false);
    }
    var testCardValue = String(value).replace(/-|\s/g, "");
    if (!/^\d*$/.test(testCardValue)) {
        return verification(null, false, false);
    }
    var potentialTypes = getCardTypes(testCardValue);
    if (potentialTypes.length === 0) {
        return verification(null, false, false);
    }
    else if (potentialTypes.length !== 1) {
        return verification(null, true, false);
    }
    var cardType = potentialTypes[0];
    if (options.maxLength && testCardValue.length > options.maxLength) {
        return verification(cardType, false, false);
    }
    if (cardType.type === getCardTypes.types.UNIONPAY &&
        options.luhnValidateUnionPay !== true) {
        isValid = true;
    }
    else {
        isValid = luhn10(testCardValue);
    }
    maxLength = Math.max.apply(null, cardType.lengths);
    if (options.maxLength) {
        maxLength = Math.min(options.maxLength, maxLength);
    }
    for (var i = 0; i < cardType.lengths.length; i++) {
        if (cardType.lengths[i] === testCardValue.length) {
            isPotentiallyValid = testCardValue.length < maxLength || isValid;
            return verification(cardType, isPotentiallyValid, isValid);
        }
    }
    return verification(cardType, testCardValue.length < maxLength, false);
}
exports.cardNumber = cardNumber;


/***/ }),

/***/ "./node_modules/card-validator/dist/cvv.js":
/*!*************************************************!*\
  !*** ./node_modules/card-validator/dist/cvv.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cvv = void 0;
var DEFAULT_LENGTH = 3;
function includes(array, thing) {
    for (var i = 0; i < array.length; i++) {
        if (thing === array[i]) {
            return true;
        }
    }
    return false;
}
function max(array) {
    var maximum = DEFAULT_LENGTH;
    var i = 0;
    for (; i < array.length; i++) {
        maximum = array[i] > maximum ? array[i] : maximum;
    }
    return maximum;
}
function verification(isValid, isPotentiallyValid) {
    return { isValid: isValid, isPotentiallyValid: isPotentiallyValid };
}
function cvv(value, maxLength) {
    if (maxLength === void 0) { maxLength = DEFAULT_LENGTH; }
    maxLength = maxLength instanceof Array ? maxLength : [maxLength];
    if (typeof value !== "string") {
        return verification(false, false);
    }
    if (!/^\d*$/.test(value)) {
        return verification(false, false);
    }
    if (includes(maxLength, value.length)) {
        return verification(true, true);
    }
    if (value.length < Math.min.apply(null, maxLength)) {
        return verification(false, true);
    }
    if (value.length > max(maxLength)) {
        return verification(false, false);
    }
    return verification(true, true);
}
exports.cvv = cvv;


/***/ }),

/***/ "./node_modules/card-validator/dist/expiration-date.js":
/*!*************************************************************!*\
  !*** ./node_modules/card-validator/dist/expiration-date.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expirationDate = void 0;
var parse_date_1 = __webpack_require__(/*! ./lib/parse-date */ "./node_modules/card-validator/dist/lib/parse-date.js");
var expiration_month_1 = __webpack_require__(/*! ./expiration-month */ "./node_modules/card-validator/dist/expiration-month.js");
var expiration_year_1 = __webpack_require__(/*! ./expiration-year */ "./node_modules/card-validator/dist/expiration-year.js");
function verification(isValid, isPotentiallyValid, month, year) {
    return {
        isValid: isValid,
        isPotentiallyValid: isPotentiallyValid,
        month: month,
        year: year,
    };
}
function expirationDate(value, maxElapsedYear) {
    var date;
    if (typeof value === "string") {
        value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, "$1/$2");
        date = parse_date_1.parseDate(String(value));
    }
    else if (value !== null && typeof value === "object") {
        var fullDate = __assign({}, value);
        date = {
            month: String(fullDate.month),
            year: String(fullDate.year),
        };
    }
    else {
        return verification(false, false, null, null);
    }
    var monthValid = expiration_month_1.expirationMonth(date.month);
    var yearValid = expiration_year_1.expirationYear(date.year, maxElapsedYear);
    if (monthValid.isValid) {
        if (yearValid.isCurrentYear) {
            var isValidForThisYear = monthValid.isValidForThisYear;
            return verification(isValidForThisYear, isValidForThisYear, date.month, date.year);
        }
        if (yearValid.isValid) {
            return verification(true, true, date.month, date.year);
        }
    }
    if (monthValid.isPotentiallyValid && yearValid.isPotentiallyValid) {
        return verification(false, true, null, null);
    }
    return verification(false, false, null, null);
}
exports.expirationDate = expirationDate;


/***/ }),

/***/ "./node_modules/card-validator/dist/expiration-month.js":
/*!**************************************************************!*\
  !*** ./node_modules/card-validator/dist/expiration-month.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.expirationMonth = void 0;
function verification(isValid, isPotentiallyValid, isValidForThisYear) {
    return {
        isValid: isValid,
        isPotentiallyValid: isPotentiallyValid,
        isValidForThisYear: isValidForThisYear || false,
    };
}
function expirationMonth(value) {
    var currentMonth = new Date().getMonth() + 1;
    if (typeof value !== "string") {
        return verification(false, false);
    }
    if (value.replace(/\s/g, "") === "" || value === "0") {
        return verification(false, true);
    }
    if (!/^\d*$/.test(value)) {
        return verification(false, false);
    }
    var month = parseInt(value, 10);
    if (isNaN(Number(value))) {
        return verification(false, false);
    }
    var result = month > 0 && month < 13;
    return verification(result, result, result && month >= currentMonth);
}
exports.expirationMonth = expirationMonth;


/***/ }),

/***/ "./node_modules/card-validator/dist/expiration-year.js":
/*!*************************************************************!*\
  !*** ./node_modules/card-validator/dist/expiration-year.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.expirationYear = void 0;
var DEFAULT_VALID_NUMBER_OF_YEARS_IN_THE_FUTURE = 19;
function verification(isValid, isPotentiallyValid, isCurrentYear) {
    return {
        isValid: isValid,
        isPotentiallyValid: isPotentiallyValid,
        isCurrentYear: isCurrentYear || false,
    };
}
function expirationYear(value, maxElapsedYear) {
    if (maxElapsedYear === void 0) { maxElapsedYear = DEFAULT_VALID_NUMBER_OF_YEARS_IN_THE_FUTURE; }
    var isCurrentYear;
    if (typeof value !== "string") {
        return verification(false, false);
    }
    if (value.replace(/\s/g, "") === "") {
        return verification(false, true);
    }
    if (!/^\d*$/.test(value)) {
        return verification(false, false);
    }
    var len = value.length;
    if (len < 2) {
        return verification(false, true);
    }
    var currentYear = new Date().getFullYear();
    if (len === 3) {
        // 20x === 20x
        var firstTwo = value.slice(0, 2);
        var currentFirstTwo = String(currentYear).slice(0, 2);
        return verification(false, firstTwo === currentFirstTwo);
    }
    if (len > 4) {
        return verification(false, false);
    }
    var numericValue = parseInt(value, 10);
    var twoDigitYear = Number(String(currentYear).substr(2, 2));
    var valid = false;
    if (len === 2) {
        isCurrentYear = twoDigitYear === numericValue;
        valid =
            numericValue >= twoDigitYear &&
                numericValue <= twoDigitYear + maxElapsedYear;
    }
    else if (len === 4) {
        isCurrentYear = currentYear === numericValue;
        valid =
            numericValue >= currentYear &&
                numericValue <= currentYear + maxElapsedYear;
    }
    return verification(valid, valid, isCurrentYear);
}
exports.expirationYear = expirationYear;


/***/ }),

/***/ "./node_modules/card-validator/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/card-validator/dist/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var creditCardType = __importStar(__webpack_require__(/*! credit-card-type */ "./node_modules/credit-card-type/dist/index.js"));
var card_number_1 = __webpack_require__(/*! ./card-number */ "./node_modules/card-validator/dist/card-number.js");
var expiration_date_1 = __webpack_require__(/*! ./expiration-date */ "./node_modules/card-validator/dist/expiration-date.js");
var expiration_month_1 = __webpack_require__(/*! ./expiration-month */ "./node_modules/card-validator/dist/expiration-month.js");
var expiration_year_1 = __webpack_require__(/*! ./expiration-year */ "./node_modules/card-validator/dist/expiration-year.js");
var cvv_1 = __webpack_require__(/*! ./cvv */ "./node_modules/card-validator/dist/cvv.js");
var postal_code_1 = __webpack_require__(/*! ./postal-code */ "./node_modules/card-validator/dist/postal-code.js");
var cardValidator = {
    creditCardType: creditCardType,
    number: card_number_1.cardNumber,
    expirationDate: expiration_date_1.expirationDate,
    expirationMonth: expiration_month_1.expirationMonth,
    expirationYear: expiration_year_1.expirationYear,
    cvv: cvv_1.cvv,
    postalCode: postal_code_1.postalCode,
};
module.exports = cardValidator;


/***/ }),

/***/ "./node_modules/card-validator/dist/lib/is-array.js":
/*!**********************************************************!*\
  !*** ./node_modules/card-validator/dist/lib/is-array.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Polyfill taken from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill>.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = void 0;
exports.isArray = Array.isArray ||
    function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };


/***/ }),

/***/ "./node_modules/card-validator/dist/lib/parse-date.js":
/*!************************************************************!*\
  !*** ./node_modules/card-validator/dist/lib/parse-date.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = void 0;
var expiration_year_1 = __webpack_require__(/*! ../expiration-year */ "./node_modules/card-validator/dist/expiration-year.js");
var is_array_1 = __webpack_require__(/*! ./is-array */ "./node_modules/card-validator/dist/lib/is-array.js");
function getNumberOfMonthDigitsInDateString(dateString) {
    var firstCharacter = Number(dateString[0]);
    var assumedYear;
    /*
      if the first character in the string starts with `0`,
      we know that the month will be 2 digits.
  
      '0122' => {month: '01', year: '22'}
    */
    if (firstCharacter === 0) {
        return 2;
    }
    /*
      if the first character in the string starts with
      number greater than 1, it must be a 1 digit month
  
      '322' => {month: '3', year: '22'}
    */
    if (firstCharacter > 1) {
        return 1;
    }
    /*
      if the first 2 characters make up a number between
      13-19, we know that the month portion must be 1
  
      '139' => {month: '1', year: '39'}
    */
    if (firstCharacter === 1 && Number(dateString[1]) > 2) {
        return 1;
    }
    /*
      if the first 2 characters make up a number between
      10-12, we check if the year portion would be considered
      valid if we assumed that the month was 1. If it is
      not potentially valid, we assume the month must have
      2 digits.
  
      '109' => {month: '10', year: '9'}
      '120' => {month: '1', year: '20'} // when checked in the year 2019
      '120' => {month: '12', year: '0'} // when checked in the year 2021
    */
    if (firstCharacter === 1) {
        assumedYear = dateString.substr(1);
        return expiration_year_1.expirationYear(assumedYear).isPotentiallyValid ? 1 : 2;
    }
    /*
      If the length of the value is exactly 5 characters,
      we assume a full year was passed in, meaning the remaining
      single leading digit must be the month value.
  
      '12202' => {month: '1', year: '2202'}
    */
    if (dateString.length === 5) {
        return 1;
    }
    /*
      If the length of the value is more than five characters,
      we assume a full year was passed in addition to the month
      and therefore the month portion must be 2 digits.
  
      '112020' => {month: '11', year: '2020'}
    */
    if (dateString.length > 5) {
        return 2;
    }
    /*
      By default, the month value is the first value
    */
    return 1;
}
function parseDate(datestring) {
    var date;
    if (/^\d{4}-\d{1,2}$/.test(datestring)) {
        date = datestring.split("-").reverse();
    }
    else if (/\//.test(datestring)) {
        date = datestring.split(/\s*\/\s*/g);
    }
    else if (/\s/.test(datestring)) {
        date = datestring.split(/ +/g);
    }
    if (is_array_1.isArray(date)) {
        return {
            month: date[0] || "",
            year: date.slice(1).join(),
        };
    }
    var numberOfDigitsInMonth = getNumberOfMonthDigitsInDateString(datestring);
    var month = datestring.substr(0, numberOfDigitsInMonth);
    return {
        month: month,
        year: datestring.substr(month.length),
    };
}
exports.parseDate = parseDate;


/***/ }),

/***/ "./node_modules/card-validator/dist/luhn-10.js":
/*!*****************************************************!*\
  !*** ./node_modules/card-validator/dist/luhn-10.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable */
/*
 * Luhn algorithm implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

function luhn10(identifier) {
    var sum = 0;
    var alt = false;
    var i = identifier.length - 1;
    var num;
    while (i >= 0) {
        num = parseInt(identifier.charAt(i), 10);
        if (alt) {
            num *= 2;
            if (num > 9) {
                num = (num % 10) + 1; // eslint-disable-line no-extra-parens
            }
        }
        alt = !alt;
        sum += num;
        i--;
    }
    return sum % 10 === 0;
}
module.exports = luhn10;


/***/ }),

/***/ "./node_modules/card-validator/dist/postal-code.js":
/*!*********************************************************!*\
  !*** ./node_modules/card-validator/dist/postal-code.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.postalCode = void 0;
var DEFAULT_MIN_POSTAL_CODE_LENGTH = 3;
function verification(isValid, isPotentiallyValid) {
    return { isValid: isValid, isPotentiallyValid: isPotentiallyValid };
}
function postalCode(value, options) {
    if (options === void 0) { options = {}; }
    var minLength = options.minLength || DEFAULT_MIN_POSTAL_CODE_LENGTH;
    if (typeof value !== "string") {
        return verification(false, false);
    }
    else if (value.length < minLength) {
        return verification(false, true);
    }
    return verification(true, true);
}
exports.postalCode = postalCode;


/***/ }),

/***/ "./node_modules/credit-card-type/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/credit-card-type/dist/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var cardTypes = __webpack_require__(/*! ./lib/card-types */ "./node_modules/credit-card-type/dist/lib/card-types.js");
var add_matching_cards_to_results_1 = __webpack_require__(/*! ./lib/add-matching-cards-to-results */ "./node_modules/credit-card-type/dist/lib/add-matching-cards-to-results.js");
var is_valid_input_type_1 = __webpack_require__(/*! ./lib/is-valid-input-type */ "./node_modules/credit-card-type/dist/lib/is-valid-input-type.js");
var find_best_match_1 = __webpack_require__(/*! ./lib/find-best-match */ "./node_modules/credit-card-type/dist/lib/find-best-match.js");
var clone_1 = __webpack_require__(/*! ./lib/clone */ "./node_modules/credit-card-type/dist/lib/clone.js");
var customCards = {};
var cardNames = {
    VISA: "visa",
    MASTERCARD: "mastercard",
    AMERICAN_EXPRESS: "american-express",
    DINERS_CLUB: "diners-club",
    DISCOVER: "discover",
    JCB: "jcb",
    UNIONPAY: "unionpay",
    MAESTRO: "maestro",
    ELO: "elo",
    MIR: "mir",
    HIPER: "hiper",
    HIPERCARD: "hipercard",
};
var ORIGINAL_TEST_ORDER = [
    cardNames.VISA,
    cardNames.MASTERCARD,
    cardNames.AMERICAN_EXPRESS,
    cardNames.DINERS_CLUB,
    cardNames.DISCOVER,
    cardNames.JCB,
    cardNames.UNIONPAY,
    cardNames.MAESTRO,
    cardNames.ELO,
    cardNames.MIR,
    cardNames.HIPER,
    cardNames.HIPERCARD,
];
var testOrder = clone_1.clone(ORIGINAL_TEST_ORDER);
function findType(cardType) {
    return customCards[cardType] || cardTypes[cardType];
}
function getAllCardTypes() {
    return testOrder.map(function (cardType) { return clone_1.clone(findType(cardType)); });
}
function getCardPosition(name, ignoreErrorForNotExisting) {
    if (ignoreErrorForNotExisting === void 0) { ignoreErrorForNotExisting = false; }
    var position = testOrder.indexOf(name);
    if (!ignoreErrorForNotExisting && position === -1) {
        throw new Error('"' + name + '" is not a supported card type.');
    }
    return position;
}
function creditCardType(cardNumber) {
    var results = [];
    if (!is_valid_input_type_1.isValidInputType(cardNumber)) {
        return results;
    }
    if (cardNumber.length === 0) {
        return getAllCardTypes();
    }
    testOrder.forEach(function (cardType) {
        var cardConfiguration = findType(cardType);
        add_matching_cards_to_results_1.addMatchingCardsToResults(cardNumber, cardConfiguration, results);
    });
    var bestMatch = find_best_match_1.findBestMatch(results);
    if (bestMatch) {
        return [bestMatch];
    }
    return results;
}
creditCardType.getTypeInfo = function (cardType) {
    return clone_1.clone(findType(cardType));
};
creditCardType.removeCard = function (name) {
    var position = getCardPosition(name);
    testOrder.splice(position, 1);
};
creditCardType.addCard = function (config) {
    var existingCardPosition = getCardPosition(config.type, true);
    customCards[config.type] = config;
    if (existingCardPosition === -1) {
        testOrder.push(config.type);
    }
};
creditCardType.updateCard = function (cardType, updates) {
    var originalObject = customCards[cardType] || cardTypes[cardType];
    if (!originalObject) {
        throw new Error("\"" + cardType + "\" is not a recognized type. Use `addCard` instead.'");
    }
    if (updates.type && originalObject.type !== updates.type) {
        throw new Error("Cannot overwrite type parameter.");
    }
    var clonedCard = clone_1.clone(originalObject);
    clonedCard = __assign(__assign({}, clonedCard), updates);
    customCards[clonedCard.type] = clonedCard;
};
creditCardType.changeOrder = function (name, position) {
    var currentPosition = getCardPosition(name);
    testOrder.splice(currentPosition, 1);
    testOrder.splice(position, 0, name);
};
creditCardType.resetModifications = function () {
    testOrder = clone_1.clone(ORIGINAL_TEST_ORDER);
    customCards = {};
};
creditCardType.types = cardNames;
module.exports = creditCardType;


/***/ }),

/***/ "./node_modules/credit-card-type/dist/lib/add-matching-cards-to-results.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/credit-card-type/dist/lib/add-matching-cards-to-results.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.addMatchingCardsToResults = void 0;
var clone_1 = __webpack_require__(/*! ./clone */ "./node_modules/credit-card-type/dist/lib/clone.js");
var matches_1 = __webpack_require__(/*! ./matches */ "./node_modules/credit-card-type/dist/lib/matches.js");
function addMatchingCardsToResults(cardNumber, cardConfiguration, results) {
    var i, patternLength;
    for (i = 0; i < cardConfiguration.patterns.length; i++) {
        var pattern = cardConfiguration.patterns[i];
        if (!matches_1.matches(cardNumber, pattern)) {
            continue;
        }
        var clonedCardConfiguration = clone_1.clone(cardConfiguration);
        if (Array.isArray(pattern)) {
            patternLength = String(pattern[0]).length;
        }
        else {
            patternLength = String(pattern).length;
        }
        if (cardNumber.length >= patternLength) {
            clonedCardConfiguration.matchStrength = patternLength;
        }
        results.push(clonedCardConfiguration);
        break;
    }
}
exports.addMatchingCardsToResults = addMatchingCardsToResults;


/***/ }),

/***/ "./node_modules/credit-card-type/dist/lib/card-types.js":
/*!**************************************************************!*\
  !*** ./node_modules/credit-card-type/dist/lib/card-types.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var cardTypes = {
    visa: {
        niceType: "Visa",
        type: "visa",
        patterns: [4],
        gaps: [4, 8, 12],
        lengths: [16, 18, 19],
        code: {
            name: "CVV",
            size: 3,
        },
    },
    mastercard: {
        niceType: "Mastercard",
        type: "mastercard",
        patterns: [[51, 55], [2221, 2229], [223, 229], [23, 26], [270, 271], 2720],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            size: 3,
        },
    },
    "american-express": {
        niceType: "American Express",
        type: "american-express",
        patterns: [34, 37],
        gaps: [4, 10],
        lengths: [15],
        code: {
            name: "CID",
            size: 4,
        },
    },
    "diners-club": {
        niceType: "Diners Club",
        type: "diners-club",
        patterns: [[300, 305], 36, 38, 39],
        gaps: [4, 10],
        lengths: [14, 16, 19],
        code: {
            name: "CVV",
            size: 3,
        },
    },
    discover: {
        niceType: "Discover",
        type: "discover",
        patterns: [6011, [644, 649], 65],
        gaps: [4, 8, 12],
        lengths: [16, 19],
        code: {
            name: "CID",
            size: 3,
        },
    },
    jcb: {
        niceType: "JCB",
        type: "jcb",
        patterns: [2131, 1800, [3528, 3589]],
        gaps: [4, 8, 12],
        lengths: [16, 17, 18, 19],
        code: {
            name: "CVV",
            size: 3,
        },
    },
    unionpay: {
        niceType: "UnionPay",
        type: "unionpay",
        patterns: [
            620,
            [624, 626],
            [62100, 62182],
            [62184, 62187],
            [62185, 62197],
            [62200, 62205],
            [622010, 622999],
            622018,
            [622019, 622999],
            [62207, 62209],
            [622126, 622925],
            [623, 626],
            6270,
            6272,
            6276,
            [627700, 627779],
            [627781, 627799],
            [6282, 6289],
            6291,
            6292,
            810,
            [8110, 8131],
            [8132, 8151],
            [8152, 8163],
            [8164, 8171],
        ],
        gaps: [4, 8, 12],
        lengths: [14, 15, 16, 17, 18, 19],
        code: {
            name: "CVN",
            size: 3,
        },
    },
    maestro: {
        niceType: "Maestro",
        type: "maestro",
        patterns: [
            493698,
            [500000, 504174],
            [504176, 506698],
            [506779, 508999],
            [56, 59],
            63,
            67,
            6,
        ],
        gaps: [4, 8, 12],
        lengths: [12, 13, 14, 15, 16, 17, 18, 19],
        code: {
            name: "CVC",
            size: 3,
        },
    },
    elo: {
        niceType: "Elo",
        type: "elo",
        patterns: [
            401178,
            401179,
            438935,
            457631,
            457632,
            431274,
            451416,
            457393,
            504175,
            [506699, 506778],
            [509000, 509999],
            627780,
            636297,
            636368,
            [650031, 650033],
            [650035, 650051],
            [650405, 650439],
            [650485, 650538],
            [650541, 650598],
            [650700, 650718],
            [650720, 650727],
            [650901, 650978],
            [651652, 651679],
            [655000, 655019],
            [655021, 655058],
        ],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVE",
            size: 3,
        },
    },
    mir: {
        niceType: "Mir",
        type: "mir",
        patterns: [[2200, 2204]],
        gaps: [4, 8, 12],
        lengths: [16, 17, 18, 19],
        code: {
            name: "CVP2",
            size: 3,
        },
    },
    hiper: {
        niceType: "Hiper",
        type: "hiper",
        patterns: [637095, 637568, 637599, 637609, 637612],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            size: 3,
        },
    },
    hipercard: {
        niceType: "Hipercard",
        type: "hipercard",
        patterns: [606282],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            size: 3,
        },
    },
};
module.exports = cardTypes;


/***/ }),

/***/ "./node_modules/credit-card-type/dist/lib/clone.js":
/*!*********************************************************!*\
  !*** ./node_modules/credit-card-type/dist/lib/clone.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
function clone(originalObject) {
    if (!originalObject) {
        return null;
    }
    return JSON.parse(JSON.stringify(originalObject));
}
exports.clone = clone;


/***/ }),

/***/ "./node_modules/credit-card-type/dist/lib/find-best-match.js":
/*!*******************************************************************!*\
  !*** ./node_modules/credit-card-type/dist/lib/find-best-match.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.findBestMatch = void 0;
function hasEnoughResultsToDetermineBestMatch(results) {
    var numberOfResultsWithMaxStrengthProperty = results.filter(function (result) { return result.matchStrength; }).length;
    /*
     * if all possible results have a maxStrength property that means the card
     * number is sufficiently long enough to determine conclusively what the card
     * type is
     * */
    return (numberOfResultsWithMaxStrengthProperty > 0 &&
        numberOfResultsWithMaxStrengthProperty === results.length);
}
function findBestMatch(results) {
    if (!hasEnoughResultsToDetermineBestMatch(results)) {
        return null;
    }
    return results.reduce(function (bestMatch, result) {
        if (!bestMatch) {
            return result;
        }
        /*
         * If the current best match pattern is less specific than this result, set
         * the result as the new best match
         * */
        if (Number(bestMatch.matchStrength) < Number(result.matchStrength)) {
            return result;
        }
        return bestMatch;
    });
}
exports.findBestMatch = findBestMatch;


/***/ }),

/***/ "./node_modules/credit-card-type/dist/lib/is-valid-input-type.js":
/*!***********************************************************************!*\
  !*** ./node_modules/credit-card-type/dist/lib/is-valid-input-type.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidInputType = void 0;
function isValidInputType(cardNumber) {
    return typeof cardNumber === "string" || cardNumber instanceof String;
}
exports.isValidInputType = isValidInputType;


/***/ }),

/***/ "./node_modules/credit-card-type/dist/lib/matches.js":
/*!***********************************************************!*\
  !*** ./node_modules/credit-card-type/dist/lib/matches.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Adapted from https://github.com/polvo-labs/card-type/blob/aaab11f80fa1939bccc8f24905a06ae3cd864356/src/cardType.js#L37-L42
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = void 0;
function matchesRange(cardNumber, min, max) {
    var maxLengthToCheck = String(min).length;
    var substr = cardNumber.substr(0, maxLengthToCheck);
    var integerRepresentationOfCardNumber = parseInt(substr, 10);
    min = parseInt(String(min).substr(0, substr.length), 10);
    max = parseInt(String(max).substr(0, substr.length), 10);
    return (integerRepresentationOfCardNumber >= min &&
        integerRepresentationOfCardNumber <= max);
}
function matchesPattern(cardNumber, pattern) {
    pattern = String(pattern);
    return (pattern.substring(0, cardNumber.length) ===
        cardNumber.substring(0, pattern.length));
}
function matches(cardNumber, pattern) {
    if (Array.isArray(pattern)) {
        return matchesRange(cardNumber, pattern[0], pattern[1]);
    }
    return matchesPattern(cardNumber, pattern);
}
exports.matches = matches;


/***/ })

}]);