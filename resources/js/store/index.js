import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import restaurant from "./modules/restaurant";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        user,
        restaurant
    }
});
