import axios from "axios";

const state = {
    users: []
};

const getters = {
    users: state => state.users
};

const mutations = {
    users(state, users) {
        state.users = users;
    }
};

const actions = {
    async users({ commit }) {
        return axios
            .get("/api/user")
            .then(res => res.data)
            .then(res => {
                commit("users", res.data);
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
