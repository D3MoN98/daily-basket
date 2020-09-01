import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import cart from './modules/cart';
import checkout from './modules/checkout';
import restaurant from './modules/restaurant';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        restaurant,
        cart,
        checkout
    },
});
