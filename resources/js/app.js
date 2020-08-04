import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import VueProgressBar from "vue-progressbar";
import Vuelidate from "vuelidate";

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue");
Vue.set(Vue.prototype, "_", _);

// require("vue-axios-interceptors");

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
    transition: { speed: "0.75s", opacity: "0.9s", termination: 500 },
    autoRevert: true,
    location: "top",
    inverse: false
};
Vue.use(VueProgressBar, options);

// Set Vue router
Vue.router = router;

// Set Vue validation
Vue.use(Vuelidate);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
