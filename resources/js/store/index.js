import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import cart from "./modules/cart";
import checkout from "./modules/checkout";
import restaurant from "./modules/restaurant";
import sellerMenu from "./modules/seller/Menu";
import sellerOrder from "./modules/seller/order";
import sellerRestaurant from "./modules/seller/restaurant";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        user,
        restaurant,
        cart,
        checkout,
        sellerRestaurant,
        sellerOrder,
        sellerMenu
    }
});
