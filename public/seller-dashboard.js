(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["seller-dashboard"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/seller/Dashboard.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/seller/Dashboard.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      count: {
        total_order: null,
        in_progress_order: null,
        delivered_order: null,
        cancelled_order: null,
        total_member: null,
        most_ordered_items: []
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    axios.get("/api/seller/count-overview").then(function (res) {
      return res.data;
    }).then(function (res) {
      _this.count = res.data;
    })["catch"](function (error) {
      console.log("something went wrong");
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/seller/Dashboard.vue?vue&type=template&id=f6d45a3a&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/seller/Dashboard.vue?vue&type=template&id=f6d45a3a& ***!
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
  return _c("div", { staticClass: "content-body" }, [
    _c("div", { staticClass: "container" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "activity_otr" }, [
        _c("div", { staticClass: "site_dett" }, [
          _c("div", { staticClass: "blue_radius ttl_ordr" }, [
            _c("div", { staticClass: "tpline" }, [
              _c("div", { staticClass: "count_det" }, [
                _c("h5", [_vm._v(_vm._s(_vm.count.total_order))])
              ]),
              _vm._v(" "),
              _vm._m(1)
            ]),
            _vm._v(" "),
            _c("h6", [_vm._v("Total Orders")])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "blue_radius ordr_prg" }, [
            _c("div", { staticClass: "tpline" }, [
              _c("div", { staticClass: "count_det" }, [
                _c("h5", [_vm._v(_vm._s(_vm.count.in_progress_order))])
              ]),
              _vm._v(" "),
              _vm._m(2)
            ]),
            _vm._v(" "),
            _c("h6", [_vm._v("Order In Progress")])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "blue_radius del_ordr" }, [
            _c("div", { staticClass: "tpline" }, [
              _c("div", { staticClass: "count_det" }, [
                _c("h5", [_vm._v(_vm._s(_vm.count.delivered_order))])
              ]),
              _vm._v(" "),
              _vm._m(3)
            ]),
            _vm._v(" "),
            _c("h6", [_vm._v("Delivered Orders")])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "blue_radius cnsl_or" }, [
            _c("div", { staticClass: "tpline" }, [
              _c("div", { staticClass: "count_det" }, [
                _c("h5", [_vm._v(_vm._s(_vm.count.cancelled_order))])
              ]),
              _vm._v(" "),
              _vm._m(4)
            ]),
            _vm._v(" "),
            _c("h6", [_vm._v("Cancelled Order")])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "blue_radius mbrs" }, [
            _c("div", { staticClass: "tpline" }, [
              _c("div", { staticClass: "count_det" }, [
                _c("h5", [_vm._v(_vm._s(_vm.count.total_member))])
              ]),
              _vm._v(" "),
              _vm._m(5)
            ]),
            _vm._v(" "),
            _c("h6", [_vm._v("New Member")])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "act_dwn_arr" }, [
          _c("div", { staticClass: "row" }, [
            _vm._m(6),
            _vm._v(" "),
            _c("div", { staticClass: "col-6 order_items" }, [
              _c("div", { staticClass: "col_innrr" }, [
                _vm._m(7),
                _vm._v(" "),
                _c("div", { staticClass: "order_itm_loop" }, [
                  _vm.count.most_ordered_items.length > 0
                    ? _c(
                        "ul",
                        _vm._l(_vm.count.most_ordered_items, function(item) {
                          return _c("li", { key: item.data.id }, [
                            _c("p", [_vm._v(_vm._s(item.data.name))]),
                            _vm._v(" "),
                            _c("h6", [_vm._v(_vm._s(item.count))])
                          ])
                        }),
                        0
                      )
                    : _vm._e()
                ])
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _vm._m(8)
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dash_hd_cmn" }, [
      _c("h3", [
        _vm._v("\n                ABC tiffin service"),
        _c("span", {}, [_vm._v("Dimond Hourver Road Khanti Park")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "act_imgg" }, [
      _c("img", { attrs: { src: "images/custom_image/total_order.png" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "act_imgg" }, [
      _c("img", { attrs: { src: "images/custom_image/oder_prg.png" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "act_imgg " }, [
      _c("img", { attrs: { src: "images/custom_image/del_ordr.png" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "act_imgg " }, [
      _c("img", { attrs: { src: "images/custom_image/cncl_ordr.png" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "act_imgg " }, [
      _c("img", { attrs: { src: "images/custom_image/memberss.png" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-6 order_riview" }, [
      _c("div", { staticClass: "col_innrr" }, [
        _c("div", { staticClass: "act_dwn_hd" }, [
          _c("div", { staticClass: "act_box_hd" }, [
            _c("h3", [_vm._v("Order Overview")]),
            _vm._v(" "),
            _c("p", [_vm._v("May,2020")])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "selct_bxx small_slct" }, [
            _c("div", { staticClass: "select" }, [
              _c(
                "select",
                { staticClass: "select-hidden", attrs: { id: "mounth" } },
                [
                  _c("option", { attrs: { value: "hide" } }, [
                    _vm._v("-- All --")
                  ]),
                  _vm._v(" "),
                  _c(
                    "option",
                    { attrs: { value: "a", rel: "icon-temperature" } },
                    [_vm._v("Individuals")]
                  ),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "b" } }, [
                    _vm._v("Unsubcribes")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "c" } }, [_vm._v("subcribes")])
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "select-styled" }, [
                _vm._v(
                  "\n                                            -- All --\n                                        "
                )
              ]),
              _vm._v(" "),
              _c(
                "ul",
                {
                  staticClass: "select-options",
                  staticStyle: { display: "none" }
                },
                [
                  _c("li", { attrs: { rel: "hide" } }, [_vm._v("-- All --")]),
                  _vm._v(" "),
                  _c("li", { attrs: { rel: "a" } }, [_vm._v("Individuals")]),
                  _vm._v(" "),
                  _c("li", { attrs: { rel: "b" } }, [_vm._v("Unsubcribes")]),
                  _vm._v(" "),
                  _c("li", { attrs: { rel: "c" } }, [_vm._v("subcribes")])
                ]
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "chart_otr" }, [
          _c("p", [_vm._v("Chart Place...")])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "act_dwn_hd" }, [
      _c("div", { staticClass: "act_box_hd" }, [
        _c("h3", [_vm._v("Most Ordered Items")]),
        _vm._v(" "),
        _c("p", [_vm._v("May,2020")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "custom_footer" }, [
      _c("p", [
        _vm._v(
          "\n                Copyright © Designed & Developed by\n                "
        ),
        _c("a", { attrs: { href: "", target: "_blank" } }, [
          _vm._v("Sutanu & Sudipta")
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/seller/Dashboard.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/seller/Dashboard.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_f6d45a3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=f6d45a3a& */ "./resources/js/views/seller/Dashboard.vue?vue&type=template&id=f6d45a3a&");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js& */ "./resources/js/views/seller/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_f6d45a3a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_f6d45a3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/seller/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/seller/Dashboard.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/seller/Dashboard.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/seller/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/seller/Dashboard.vue?vue&type=template&id=f6d45a3a&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/seller/Dashboard.vue?vue&type=template&id=f6d45a3a& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_f6d45a3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=f6d45a3a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/seller/Dashboard.vue?vue&type=template&id=f6d45a3a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_f6d45a3a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_f6d45a3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);