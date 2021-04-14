(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["landing"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/frontend/Landing.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/frontend/Landing.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _views_frontend_components_SignupModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/views/frontend/components/SignupModal */ "./resources/js/views/frontend/components/SignupModal.vue");
/* harmony import */ var _views_frontend_components_LoginModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/views/frontend/components/LoginModal */ "./resources/js/views/frontend/components/LoginModal.vue");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__);
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
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    SignupModal: _views_frontend_components_SignupModal__WEBPACK_IMPORTED_MODULE_0__["default"],
    LoginModal: _views_frontend_components_LoginModal__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      locating: false,
      currentPos: {
        lat: 0,
        lng: 0
      },
      formError: false,
      autocompleteOptions: {
        componentRestrictions: {
          country: ["in"]
        }
      }
    };
  },
  validations: {
    position: {
      isEmpty: function isEmpty() {
        return !(this.currentPos.lat === 0 && this.currentPos.lng === 0);
      }
    }
  },
  methods: {
    getAddressData: function getAddressData(address) {
      this.currentPos = {
        formatted_address: address.formatted_address,
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      };
    },
    saveLocation: function saveLocation() {
      var _this = this;

      this.locating = true;
      this.formError = false;
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.formError = true;
        this.locating = false;
        return;
      }

      this.$store.dispatch("auth/setCurrentLocation", this.currentPos).then(function () {
        _this.locating = false;

        _this.$router.push("restaurants");
      });
    },
    // locate me to get current location
    locateMe: function locateMe() {
      var _this2 = this;

      // this.locating = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          _this2.currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          _this2.reverseGeocode(_this2.currentPos, function (result) {
            _this2.currentPos.formatted_address = result;

            _this2.saveLocation();
          });
        }, function (failure) {
          if (failure.message.startsWith("Only secure origins are allowed")) {
            // Secure Origin issue.
            console.log("Only secure origins are allowed");
          }
        });
      } else {
        console.error("Please turn on your geolocation");
      }
    },
    // reverse geocode to get formatted address
    reverseGeocode: function reverseGeocode(latlong, callback) {
      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({
        location: latlong
      }, function (results, status) {
        if (status === "OK") {
          if (results[0]) {
            var address = results[0].formatted_address;
            return callback(address); // call the callback function here
          }

          console.log("No results found");
          return false;
        }

        console.log("Geocoder failed due to: ".concat(status));
        return false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/frontend/Landing.vue?vue&type=template&id=6ef0b6f9&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/frontend/Landing.vue?vue&type=template&id=6ef0b6f9& ***!
  \**************************************************************************************************************************************************************************************************************/
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
    [
      _c("section", { staticClass: "landing_sec" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "cntr_conn text-center" }, [
          _c("div", { staticClass: "sctr_img" }, [
            _c("img", { attrs: { src: "/images/custom_image/l.jpg", alt: "" } })
          ]),
          _vm._v(" "),
          _c("h1", [_vm._v("Food delivered to your doorstep")]),
          _vm._v(" "),
          _c("p", [_vm._v("Welcome to Daily Basket")]),
          _vm._v(" "),
          _c(
            "form",
            {
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.saveLocation($event)
                }
              }
            },
            [
              _c("gmap-autocomplete", {
                attrs: { options: _vm.autocompleteOptions },
                on: { place_changed: _vm.getAddressData },
                scopedSlots: _vm._u([
                  {
                    key: "input",
                    fn: function(slotProps) {
                      return [
                        _c("v-text-field", {
                          ref: "input",
                          attrs: {
                            outlined: "",
                            "prepend-inner-icon": "place",
                            placeholder: "Location Of Event"
                          },
                          on: {
                            listeners: slotProps.listeners,
                            attrs: slotProps.attrs
                          }
                        })
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _vm.formError && !_vm.$v.position.isEmpty.required
                ? _c(
                    "span",
                    { staticClass: "invalid-feedback text-left d-block" },
                    [_vm._v("Location rquired\n                ")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("button", { staticClass: "btn", attrs: { type: "submit" } }, [
                _c("span", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.locating,
                      expression: "locating"
                    }
                  ],
                  staticClass: "fa fa-circle-notch fa-spin",
                  attrs: { role: "status", "aria-hidden": "true" }
                }),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !_vm.locating,
                        expression: "!locating"
                      }
                    ]
                  },
                  [
                    _vm._v(
                      "Order Food " + _vm._s(_vm.$v.position.isEmpty.required)
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "locate-me" }, [
                _c(
                  "a",
                  {
                    attrs: { href: "" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.locateMe($event)
                      }
                    }
                  },
                  [_vm._v("Locates Me\n                    ")]
                )
              ])
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c("LoginModal"),
      _vm._v(" "),
      !this.$store.getters["auth/check"] ? _c("SignupModal") : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "top_btn" }, [
      _c(
        "a",
        {
          attrs: {
            href: "#",
            role: "button",
            "data-dismiss": "modal",
            "data-toggle": "modal",
            "data-target": "#log_in_modal"
          }
        },
        [_vm._v("Login")]
      ),
      _vm._v(" "),
      _c(
        "a",
        {
          attrs: {
            href: "#",
            role: "button",
            "data-toggle": "modal",
            "data-dismiss": "modal",
            "data-target": "#sign_up_modal"
          }
        },
        [_vm._v("Signup")]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/frontend/Landing.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/frontend/Landing.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Landing_vue_vue_type_template_id_6ef0b6f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Landing.vue?vue&type=template&id=6ef0b6f9& */ "./resources/js/views/frontend/Landing.vue?vue&type=template&id=6ef0b6f9&");
/* harmony import */ var _Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Landing.vue?vue&type=script&lang=js& */ "./resources/js/views/frontend/Landing.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Landing_vue_vue_type_template_id_6ef0b6f9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Landing_vue_vue_type_template_id_6ef0b6f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/frontend/Landing.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/frontend/Landing.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/frontend/Landing.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Landing.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/frontend/Landing.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/frontend/Landing.vue?vue&type=template&id=6ef0b6f9&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/frontend/Landing.vue?vue&type=template&id=6ef0b6f9& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_template_id_6ef0b6f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Landing.vue?vue&type=template&id=6ef0b6f9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/frontend/Landing.vue?vue&type=template&id=6ef0b6f9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_template_id_6ef0b6f9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_template_id_6ef0b6f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);