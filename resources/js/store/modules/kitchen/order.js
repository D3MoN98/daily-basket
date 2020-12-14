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
            .get(`/api/kitchen-staff/order`)
            .then(res => res.data)
            .then(res => {
                commit("setOrders", res.data);
            });
    },
    async updateStatus({ commit, dispatch }, { id, status }) {
        return axios
            .put(`/api/kitchen-staff/order_item/status/update/${id}`, {
                status
            })
            .then(res => res.data)
            .then(res => {
                dispatch("orders");
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
