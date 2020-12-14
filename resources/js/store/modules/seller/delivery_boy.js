/* eslint-disable no-param-reassign */
import axios from "axios";

const state = {
    delivery_boy: null
};

const getters = {
    getDeliveryBoy: state => state.delivery_boy
};

const mutations = {
    setDeliveryBoy(state, delivery_boy) {
        state.delivery_boy = delivery_boy;
    }
};

const actions = {
    deliveryBoyRegister(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post("api/seller/delivery-boy/sign-up", data)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
