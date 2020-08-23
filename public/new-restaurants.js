(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["new-restaurants"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _RestaurantCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RestaurantCard */ "./resources/js/views/frontend/components/RestaurantCard.vue");
/* harmony import */ var _RestaurantPlaceholder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RestaurantPlaceholder */ "./resources/js/views/frontend/components/RestaurantPlaceholder.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      isLoaded: false
    };
  },
  components: {
    RestaurantCard: _RestaurantCard__WEBPACK_IMPORTED_MODULE_1__["default"],
    RestaurantPlaceholder: _RestaurantPlaceholder__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mounted: function mounted() {
    var _this = this;

    this.$store.dispatch('restaurant/newRestaurants').then(function () {
      _this.isLoaded = true;
    });
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])({
    restaurants: 'restaurant/getRestaurants'
  }))
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=template&id=6c21e5d1&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=template&id=6c21e5d1& ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "rst_list" },
    [
      _vm._l(_vm.restaurants, function(restaurant) {
        return _c("RestaurantCard", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isLoaded,
              expression: "isLoaded"
            }
          ],
          key: restaurant.id,
          attrs: { restaurant: restaurant }
        })
      }),
      _vm._v(" "),
      _vm._l(6, function(index) {
        return _c("RestaurantPlaceholder", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.isLoaded,
              expression: "!isLoaded"
            }
          ],
          key: index + "_plchldr"
        })
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/frontend/components/NewRestaurants.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/views/frontend/components/NewRestaurants.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewRestaurants_vue_vue_type_template_id_6c21e5d1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewRestaurants.vue?vue&type=template&id=6c21e5d1& */ "./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=template&id=6c21e5d1&");
/* harmony import */ var _NewRestaurants_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewRestaurants.vue?vue&type=script&lang=js& */ "./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewRestaurants_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewRestaurants_vue_vue_type_template_id_6c21e5d1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewRestaurants_vue_vue_type_template_id_6c21e5d1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/frontend/components/NewRestaurants.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewRestaurants_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewRestaurants.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewRestaurants_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=template&id=6c21e5d1&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=template&id=6c21e5d1& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewRestaurants_vue_vue_type_template_id_6c21e5d1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewRestaurants.vue?vue&type=template&id=6c21e5d1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/frontend/components/NewRestaurants.vue?vue&type=template&id=6c21e5d1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewRestaurants_vue_vue_type_template_id_6c21e5d1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewRestaurants_vue_vue_type_template_id_6c21e5d1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);