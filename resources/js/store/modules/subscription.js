import axios from "axios";

const state = {
    current_subscriptions: [],
    past_subscriptions: []
};

const getters = {
    getCurrentSubscriptions: state => state.current_subscriptions,
    getPastSubscriptions: state => state.past_subscriptions
};

const mutations = {
    setCurrentSubscriptions(state, current_subscriptions) {
        state.current_subscriptions = current_subscriptions;
    },
    setPastSubscriptions(state, past_subscriptions) {
        state.past_subscriptions = past_subscriptions;
    }
};

const actions = {
    async currentSubscriptions({ commit }) {
        return axios
            .get(`/api/subscription/current/`)
            .then(res => res.data)
            .then(res => {
                commit("setCurrentSubscriptions", res.data);
            });
    },
    async pastSubscriptions({ commit }) {
        return axios
            .get(`/api/subscription/past/`)
            .then(res => res.data)
            .then(res => {
                commit("setPastSubscriptions", res.data);
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
