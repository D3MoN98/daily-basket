(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["delivery-boy-default-layout"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/components/Header.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/delivery/components/Header.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
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
  methods: {
    logout: function logout() {
      this.$store.dispatch("auth/logout");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/components/Sidebar.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/delivery/components/Sidebar.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _views_delivery_components_Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/views/delivery/components/Header */ "./resources/js/views/delivery/components/Header.vue");
/* harmony import */ var _views_delivery_components_Sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/views/delivery/components/Sidebar */ "./resources/js/views/delivery/components/Sidebar.vue");
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
    Header: _views_delivery_components_Header__WEBPACK_IMPORTED_MODULE_0__["default"],
    Sidebar: _views_delivery_components_Sidebar__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var input = document.getElementById("search-input");
    var searchBtn = document.getElementById("search-btn");

    var expand = function expand() {
      searchBtn.classList.toggle("close");
      input.classList.toggle("square");
    };

    searchBtn.addEventListener("click", expand);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/components/Header.vue?vue&type=template&id=6044492a&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/delivery/components/Header.vue?vue&type=template&id=6044492a& ***!
  \************************************************************************************************************************************************************************************************************************/
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
  return _c("header", [
    _c("div", { staticClass: "full_hdr_bk fff_bk" }, [
      _c("div", { staticClass: "nav-header" }, [
        _c(
          "div",
          { staticClass: "nav_header_innr" },
          [
            _c(
              "router-link",
              { staticClass: "brand-logo", attrs: { to: "/seller" } },
              [
                _c("span", { staticClass: "logo-abbr" }, [_vm._v("DB")]),
                _vm._v(" "),
                _c("span", { staticClass: "logo-compact" }, [
                  _vm._v("Daily Basket")
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "brand-title" }, [
                  _vm._v("Daily Basket")
                ])
              ]
            ),
            _vm._v(" "),
            _vm._m(0)
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "header" }, [
        _c("div", { staticClass: "header-content" }, [
          _c("nav", { staticClass: "navbar navbar-expand" }, [
            _c(
              "div",
              {
                staticClass: "collapse navbar-collapse justify-content-between"
              },
              [
                _c("div", { staticClass: "header-left" }),
                _vm._v(" "),
                _c("ul", { staticClass: "navbar-nav header-right" }, [
                  _vm._m(1),
                  _vm._v(" "),
                  _vm._m(2),
                  _vm._v(" "),
                  _vm._m(3),
                  _vm._v(" "),
                  _c(
                    "li",
                    { staticClass: "nav-item dropdown header-profile" },
                    [
                      _c(
                        "a",
                        {
                          staticClass: "nav-link dropdown-toggle",
                          attrs: {
                            href: "#",
                            role: "button",
                            "data-toggle": "dropdown",
                            "aria-haspopup": "true",
                            "aria-expanded": "false"
                          }
                        },
                        [
                          _c("i", { staticClass: "far fa-user-circle" }),
                          _vm._v(" "),
                          _c("span", { staticClass: "nav_txt" }, [
                            _vm._v(
                              "\n                                        " +
                                _vm._s(
                                  _vm._.split(
                                    this.$store.getters["auth/user"].name,
                                    " "
                                  )[0]
                                ) +
                                "\n                                    "
                            )
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "dropdown-menu dropdown-menu-right" },
                        [
                          _vm._m(4),
                          _vm._v(" "),
                          _vm._m(5),
                          _vm._v(" "),
                          _vm._m(6),
                          _vm._v(" "),
                          _vm._m(7),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              staticClass: "dropdown-item",
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.logout($event)
                                }
                              }
                            },
                            [_c("span", [_vm._v("Logout")])]
                          )
                        ]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm._m(8)
                ])
              ]
            )
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "nav-control" }, [
      _c("div", { staticClass: "hamburger" }, [
        _c("span", { staticClass: "toggle-icon" }, [
          _c("i", { staticClass: "icon-menu" })
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item menu_long_gap custom_scr" }, [
      _c(
        "a",
        {
          staticClass: "nav-link",
          attrs: { href: "#", role: "button", id: "search-btn2" }
        },
        [
          _c("form", { attrs: { id: "content" } }, [
            _c("input", {
              staticClass: "input",
              attrs: { type: "text", name: "input", id: "search-input" }
            }),
            _vm._v(" "),
            _c("button", {
              staticClass: "search",
              attrs: { type: "reset", id: "search-btn" }
            })
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "nav_txt" }, [_vm._v("Search")])
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "li",
      { staticClass: "nav-item help menu_long_gap mobile_scr_484" },
      [
        _c(
          "a",
          { staticClass: "nav-link", attrs: { href: "#", role: "button" } },
          [
            _c("i", { staticClass: "fas fa-search" }),
            _vm._v(" "),
            _c("span", { staticClass: "nav_txt" }, [_vm._v("Search")])
          ]
        )
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item help menu_long_gap" }, [
      _c(
        "a",
        { staticClass: "nav-link", attrs: { href: "#", role: "button" } },
        [
          _c("i", { staticClass: "far fa-life-ring" }),
          _vm._v(" "),
          _c("span", { staticClass: "nav_txt" }, [_vm._v("Help")])
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { staticClass: "dropdown-item", attrs: { href: "#!" } }, [
      _c("span", [_vm._v("My profile")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { staticClass: "dropdown-item", attrs: { href: "#!" } }, [
      _c("span", [_vm._v("Calender")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { staticClass: "dropdown-item", attrs: { href: "#!" } }, [
      _c("span", [_vm._v("Inbox")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { staticClass: "dropdown-item", attrs: { href: "#!" } }, [
      _c("span", [_vm._v("Settings")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "li",
      { staticClass: "nav-item dropdown notification_dropdown" },
      [
        _c(
          "a",
          {
            staticClass: "nav-link",
            attrs: {
              href: "#",
              role: "button",
              "data-toggle": "dropdown",
              "aria-haspopup": "true",
              "aria-expanded": "false"
            }
          },
          [
            _c("i", { staticClass: "far fa-bell" }),
            _vm._v(" "),
            _c("span", { staticClass: "badge badge-primary" }, [_vm._v("3")])
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "dropdown-menu dropdown-menu-right" }, [
          _c("h5", { staticClass: "notification_title" }, [
            _vm._v(
              "\n                                        Notifications\n                                    "
            )
          ]),
          _vm._v(" "),
          _c("ul", { staticClass: "list-unstyled" }, [
            _c("li", { staticClass: "media dropdown-item" }, [
              _c("img", {
                staticClass: "mr-3",
                attrs: { src: "images/avatar/1.jpg", alt: "Quixlab" }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "media-body" }, [
                _c("a", { attrs: { href: "#" } }, [
                  _c("div", { staticClass: "d-flex justify-content-between" }, [
                    _c("h5", [_vm._v("Mr John")])
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "m-0" }, [
                    _vm._v(
                      "\n                                                        signed nup now\n                                                    "
                    )
                  ])
                ])
              ])
            ]),
            _vm._v(" "),
            _c("li", { staticClass: "media dropdown-item" }, [
              _c("img", {
                staticClass: "mr-3",
                attrs: { src: "images/avatar/8.jpg", alt: "Quixlab" }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "media-body" }, [
                _c("a", { attrs: { href: "#" } }, [
                  _c("div", { staticClass: "d-flex justify-content-between" }, [
                    _c("h5", [_vm._v("Lisa Heiden")])
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "m-0" }, [
                    _vm._v(
                      "\n                                                        Reset password\n                                                    "
                    )
                  ])
                ])
              ])
            ]),
            _vm._v(" "),
            _c("li", { staticClass: "media dropdown-item" }, [
              _c("img", {
                staticClass: "mr-3",
                attrs: { src: "images/avatar/2.jpg", alt: "Quixlab" }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "media-body" }, [
                _c("a", { attrs: { href: "#" } }, [
                  _c("div", { staticClass: "d-flex justify-content-between" }, [
                    _c("h5", [_vm._v("Mr khan")])
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "m-0" }, [
                    _vm._v(
                      "\n                                                        Email sent\n                                                    "
                    )
                  ])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "all-notification", attrs: { href: "#" } }, [
            _vm._v("All Notifications")
          ])
        ])
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/components/Sidebar.vue?vue&type=template&id=4bd53e0f&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/delivery/components/Sidebar.vue?vue&type=template&id=4bd53e0f& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "quixnav fixed_sidebar" }, [
      _c("div", { staticClass: "quixnav-scroll" }, [
        _c("ul", { staticClass: "metismenu", attrs: { id: "menu" } }, [
          _c("li", { staticClass: "nav-label" }, [_vm._v("DASHBOARD")])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=template&id=6919d0ee&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=template&id=6919d0ee& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "show", attrs: { id: "main-wrapper" } },
    [
      _c("Header"),
      _vm._v(" "),
      _c("Sidebar"),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: "fade", mode: "out-in" } },
        [_c("router-view")],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/delivery/components/Header.vue":
/*!***********************************************************!*\
  !*** ./resources/js/views/delivery/components/Header.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Header_vue_vue_type_template_id_6044492a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header.vue?vue&type=template&id=6044492a& */ "./resources/js/views/delivery/components/Header.vue?vue&type=template&id=6044492a&");
/* harmony import */ var _Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header.vue?vue&type=script&lang=js& */ "./resources/js/views/delivery/components/Header.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Header_vue_vue_type_template_id_6044492a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Header_vue_vue_type_template_id_6044492a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/delivery/components/Header.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/delivery/components/Header.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/delivery/components/Header.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Header.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/components/Header.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/delivery/components/Header.vue?vue&type=template&id=6044492a&":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/delivery/components/Header.vue?vue&type=template&id=6044492a& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_template_id_6044492a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Header.vue?vue&type=template&id=6044492a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/components/Header.vue?vue&type=template&id=6044492a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_template_id_6044492a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_template_id_6044492a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/delivery/components/Sidebar.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/delivery/components/Sidebar.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar_vue_vue_type_template_id_4bd53e0f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=template&id=4bd53e0f& */ "./resources/js/views/delivery/components/Sidebar.vue?vue&type=template&id=4bd53e0f&");
/* harmony import */ var _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=script&lang=js& */ "./resources/js/views/delivery/components/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sidebar_vue_vue_type_template_id_4bd53e0f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sidebar_vue_vue_type_template_id_4bd53e0f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/delivery/components/Sidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/delivery/components/Sidebar.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/delivery/components/Sidebar.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/components/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/delivery/components/Sidebar.vue?vue&type=template&id=4bd53e0f&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/delivery/components/Sidebar.vue?vue&type=template&id=4bd53e0f& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_4bd53e0f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=template&id=4bd53e0f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/components/Sidebar.vue?vue&type=template&id=4bd53e0f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_4bd53e0f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_4bd53e0f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/delivery/layouts/DefaultLayout.vue":
/*!***************************************************************!*\
  !*** ./resources/js/views/delivery/layouts/DefaultLayout.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DefaultLayout_vue_vue_type_template_id_6919d0ee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultLayout.vue?vue&type=template&id=6919d0ee& */ "./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=template&id=6919d0ee&");
/* harmony import */ var _DefaultLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DefaultLayout.vue?vue&type=script&lang=js& */ "./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DefaultLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DefaultLayout_vue_vue_type_template_id_6919d0ee___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DefaultLayout_vue_vue_type_template_id_6919d0ee___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/delivery/layouts/DefaultLayout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DefaultLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DefaultLayout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DefaultLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=template&id=6919d0ee&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=template&id=6919d0ee& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DefaultLayout_vue_vue_type_template_id_6919d0ee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DefaultLayout.vue?vue&type=template&id=6919d0ee& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/delivery/layouts/DefaultLayout.vue?vue&type=template&id=6919d0ee&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DefaultLayout_vue_vue_type_template_id_6919d0ee___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DefaultLayout_vue_vue_type_template_id_6919d0ee___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);