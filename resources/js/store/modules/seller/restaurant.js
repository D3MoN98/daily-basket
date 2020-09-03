/* eslint-disable no-param-reassign */
import axios from 'axios';

const state = {
    restaurant: null,
    cuisines: null,
    menu_categories: [],
    menu_sub_categories: [],
};

const getters = {
    getRestaurant: (state) => state.restaurant,
    getCuisines: (state) => state.cuisines,
    getMenuCategories: (state) => state.menu_categories,
    getMenuSubCategories: (state) => state.menu_sub_categories,
};

const mutations = {
    setRestaurantDetails(state, restaurant) {
        state.restaurant = restaurant;
    },
    setCuisines(state, cuisines) {
        state.cuisines = cuisines;
    },
    setMenuCategories(state, menu_categories) {
        state.menu_categories = menu_categories;
    },
    setMenuSubCategories(state, menu_sub_categories) {
        state.menu_sub_categories = menu_sub_categories;
    },
};

const actions = {
    async restaurant({
        commit,
    }) {
        return axios.get(`/api/seller/restaurant`)
            .then((res) => res.data)
            .then((res) => {
                commit('setRestaurantDetails', res.data);
            });
    },
    async cuisines({
        commit,
    }) {
        return axios.get(`/api/seller/cuisines`)
            .then((res) => res.data)
            .then((res) => {
                commit('setCuisines', res.data);
            });
    },
    async updateRestaurant({
        commit,
    }, restaurant) {
        return axios.post(`/api/seller/restaurant`, restaurant)
            .then((res) => res.data)
            .then((res) => {
                commit('setRestaurantDetails', res.data);
            });
    },
    async menu_categories({
        commit,
    }) {
        return axios.get(`/api/seller/menu_categories`)
            .then((res) => res.data)
            .then((res) => {
                commit('setMenuCategories', res.data);
            });
    },
    async menu_sub_categories({
        commit,
    }) {
        return axios.get(`/api/seller/menu_sub_categories`)
            .then((res) => res.data)
            .then((res) => {
                commit('setMenuSubCategories', res.data);
            });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
