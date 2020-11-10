import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { BModal, BootstrapVue, IconsPlugin, VBModal } from "bootstrap-vue";
import VueProgressBar from "vue-progressbar";
import * as VueGoogleMaps from "vue2-google-maps";
import Vuelidate from "vuelidate";

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue");

Vue.set(Vue.prototype, "_", _);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.component("b-modal", BModal);
// Note that Vue automatically prefixes directive names with `v-`
Vue.directive("b-modal", VBModal);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

Vue.config.productionTip = false;

// Set Vue progressbar
const options = {
    color: "#7367F0",
    failedColor: "#7367f0",
    thickness: "4px",
    transition: {
        speed: "0.75s",
        opacity: "0.9s",
        termination: 500
    },
    autoRevert: true,
    location: "top",
    inverse: false
};

Vue.use(VueProgressBar, options);

// Set Vue router
Vue.router = router;

// Set Vue validation
Vue.use(Vuelidate);

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyCQ50fCTWgDOCjgUmkxARbJCFpIrqq-Uok",
        libraries: "places" // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        /// / If you want to set the version, you can do so:
        // v: '3.26',
    },

    /// / If you intend to programmatically custom event listener code
    /// / (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    /// / instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    /// / you might need to turn this on.
    autobindAllEvents: false

    /// / If you want to manually install components, e.g.
    /// / import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    /// / Vue.component('GmapMarker', GmapMarker)
    /// / then disable the following:
    // installComponents: true,
});

// directives

Vue.directive("click-outside", {
    bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unbind: function(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    }
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// eslint-disable-next-line no-unused-vars
const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
