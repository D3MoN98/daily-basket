/* eslint-disable no-param-reassign */
const state = {
    restaurants: []
};

const getters = {
    getRestaurants: state => state.restaurants
};

const mutations = {
    setRestaurants(state, restaurants) {
        state.restaurants = restaurants;
    }
};

const actions = {
    async restaurants({ commit }) {
        return axios
            .get("/api/admin/restaurant")
            .then(res => res.data)
            .then(res => {
                commit("setRestaurants", res.data);
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
