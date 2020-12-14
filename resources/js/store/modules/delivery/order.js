import axios from "axios";

const state = {
    orders: []
};

const getters = {
    getOrders: state => state.orders
};

const mutations = {
    setOrders(state, orders) {
        state.orders = orders;
    }
};

const actions = {
    async orders({ commit }) {
        return axios
            .get(`/api/delivery-boy/order`)
            .then(res => res.data)
            .then(res => {
                commit("setOrders", res.data);
            });
    },
    async orderDelivered({ commit, dispatch }, id) {
        return axios
            .put(`/api/delivery-boy/order/${id}`)
            .then(res => res.data)
            .then(res => {
                dispatch("todaysOrders");
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
