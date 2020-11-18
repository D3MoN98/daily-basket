import Vue from "vue";
import Vuex from "vuex";
import adminRestaurant from "./modules/admin/restaurant";
import auth from "./modules/auth";
import cart from "./modules/cart";
import checkout from "./modules/checkout";
import order from "./modules/order";
import restaurant from "./modules/restaurant";
import sellerKitchen from "./modules/seller/kitchen";
import sellerMenu from "./modules/seller/menu";
import sellerOrder from "./modules/seller/order";
import sellerRestaurant from "./modules/seller/restaurant";
import subscription from "./modules/subscription";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        user,
        order,
        subscription,
        restaurant,
        cart,
        checkout,
        sellerRestaurant,
        sellerOrder,
        sellerMenu,
        sellerKitchen,
        adminRestaurant
    }
});
