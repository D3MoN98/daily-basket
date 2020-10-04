const state = {
    current_orders: [],
    past_orders: []
};

const getters = {
    getCurrentOrders: state => state.current_orders,
    getPasttOrders: state => state.past_orders
};

const mutations = {
    setCurrentOrders(state, current_orders) {
        state.current_orders = current_orders;
    },
    setPastOrders(state, past_orders) {
        state.past_orders = past_orders;
    }
};

const actions = {
    async currentOrders({ commit }) {
        return axios
            .get(`/api/order/current/`)
            .then(res => res.data)
            .then(res => {
                commit("setCurrentOrders", res.data);
            });
    },
    async pastOrders({ commit }) {
        return axios
            .get(`/api/order/past/`)
            .then(res => res.data)
            .then(res => {
                commit("setPastOrders", res.data);
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
