const state = {
    subscriptions: []
};

const getters = {
    getSubscriptions: state => state.subscriptions
};

const mutations = {
    setSubscriptions(state, subscriptions) {
        state.subscriptions = subscriptions;
    }
};

const actions = {
    async subscriptions({ commit }) {
        return axios
            .get(`/api/kitchen-staff/subscription`)
            .then(res => res.data)
            .then(res => {
                commit("setSubscriptions", res.data);
            });
    },
    async updateStatus({ commit, dispatch }, { id, status }) {
        return axios
            .put(`/api/kitchen-staff/subscription_item/status/update/${id}`, {
                status
            })
            .then(res => res.data)
            .then(res => {
                dispatch("subscriptions");
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
