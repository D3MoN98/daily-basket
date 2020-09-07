const state = {
    todays_orders: [],
    delivery_boys: []
};

const getters = {
    getTodaysOrders: state => state.todays_orders,
    getDeliveryBoys: state => state.delivery_boys
};

const mutations = {
    setTodaysOrders(state, todays_orders) {
        state.todays_orders = todays_orders;
    },
    setDeliveryBoys(state, delivery_boys) {
        state.delivery_boys = delivery_boys;
    }
};

const actions = {
    async todaysOrders({ commit }, type = "all") {
        return axios
            .get(`/api/seller/order/today/${type}`)
            .then(res => res.data)
            .then(res => {
                commit("setTodaysOrders", res.data);
            });
    },
    async deliveryBoys({ commit }) {
        return axios
            .get(`/api/seller/delivery_boy`)
            .then(res => res.data)
            .then(res => {
                commit("setDeliveryBoys", res.data);
            });
    },
    async assignOrder({ commit, dispatch }, { id, user_id }) {
        return axios
            .put(`/api/seller/order/assign/${id}`, { user_id: user_id })
            .then(res => res.data)
            .then(res => {
                dispatch("todaysOrders");
            });
    },
    async orderDelivered({ commit, dispatch }, id) {
        return axios
            .put(`/api/seller/order/delivered/${id}`)
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
