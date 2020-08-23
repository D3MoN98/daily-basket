/* eslint-disable no-param-reassign */
import axios from 'axios';

const state = {
    restaurants: [],
    restaurant_counts: {
        trending: null,
        new: null,
        premium: null,
    },
    restaurant: null,
    menu_items: [],
    recommended_menu_items: [],
};

const getters = {
    getRestaurants: (state) => state.restaurants,
    getRestaurantCounts: (state) => state.restaurant_counts,
    getRestaurant: (state) => state.restaurant,
    getMenuItems: (state) => state.menu_items,
    getRecommendedMenuItems: (state) => state.recommended_menu_items,
    getVegMenuItems: (state) => state.menu_items.filter((items) => items.type === 'veg'),
    getNonVegMenuItems: (state) => state.menu_items.filter((items) => items.type === 'non-veg'),
    getVegRecommendedMenuItems: (state) => state.recommended_menu_items.filter((items) => items.type === 'non-veg'),
};

const mutations = {
    setRestaurants(state, restaurants) {
        state.restaurants = restaurants;
    },
    setNewRestaurantCount(state, count) {
        state.restaurant_counts.new = count;
    },
    setPremiumRestaurantCount(state, count) {
        state.restaurant_counts.premium = count;
    },
    setTrendingRestaurantCount(state, count) {
        state.restaurant_counts.trending = count;
    },
    setRestaurantDetails(state, restaurant) {
        state.restaurant = restaurant;
    },
    setMenuItems(state, menuItems) {
        state.menu_items = menuItems;
    },
    setRecommendedMenuItems(state, recommendedMenuItems) {
        state.recommended_menu_items = recommendedMenuItems;
    },
    setVegMenuItems(state, payload) {
        state.menu_items = payload;
    },
    setVegRecommendedMenuItems(state, payload) {
        state.recommended_menu_items = payload;
    },
};

const actions = {
    async trendingRestaurants({
        commit,
    }) {
        return axios
            .get('/api/restaurants/trending')
            .then((res) => res.data)
            .then((res) => {
                commit('setRestaurants', res.data);
            });
    },
    async newRestaurants({
        commit,
    }) {
        return axios
            .get('/api/restaurants/new')
            .then((res) => res.data)
            .then((res) => {
                commit('setRestaurants', res.data);
            });
    },
    async premiumRestaurants({
        commit,
    }) {
        return axios
            .get('/api/restaurants/premium')
            .then((res) => res.data)
            .then((res) => {
                commit('setRestaurants', res.data);
            });
    },
    restaurantCounts({
        commit,
        dispatch,
    }) {
        axios
            .get('/api/restaurants/trending')
            .then((res) => res.data)
            .then((res) => {
                commit('setTrendingRestaurantCount', res.data.length);
            });
        axios
            .get('/api/restaurants/new')
            .then((res) => res.data)
            .then((res) => {
                commit('setNewRestaurantCount', res.data.length);
            });
        axios
            .get('/api/restaurants/premium')
            .then((res) => res.data)
            .then((res) => {
                commit('setPremiumRestaurantCount', res.data.length);
            });
    },
    async restaurant({
        commit,
    }, slug) {
        return axios.get(`/api/restaurant/${slug}`)
            .then((res) => res.data)
            .then((res) => {
                commit('setRestaurantDetails', res.data);
            });
    },
    async menu({
        commit,
    }, id) {
        return axios.get(`/api/menu/${id}`)
            .then((res) => res.data)
            .then((res) => {
                commit('setMenuItems', res.data);
            });
    },
    async recommendedMenu({
        commit,
    }, id) {
        return axios.get(`/api/menu/${id}`)
            .then((res) => res.data)
            .then((res) => {
                commit('setRecommendedMenuItems', res.data);
            });
    },
    async vegMenuItems({
        commit,
    }, id) {
        return axios.get(`/api/menu/${id}/veg`)
            .then((res) => res.data)
            .then((res) => {
                commit('setVegMenuItems', res.data);
            });
    },
    async vegRecommendeMenuItems({
        commit,
    }, id) {
        return axios.get(`/api/menu/${id}/veg`)
            .then((res) => res.data)
            .then((res) => {
                commit('setVegRecommendedMenuItems', res.data);
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
