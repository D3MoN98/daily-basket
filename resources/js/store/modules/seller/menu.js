/* eslint-disable no-param-reassign */
import axios from 'axios';

const state = {
    menu_items: [],
};

const getters = {
    getMenuItems: (state) => state.menu_items,
};

const mutations = {
    setMenuItems(state, menu_items) {
        state.menu_items = menu_items;
    },
};

const actions = {
    async menu({
        commit,
    }) {
        return axios.get(`/api/seller/menu`)
            .then((res) => res.data)
            .then((res) => {
                commit('setMenuItems', res.data);
            });
    },

    async createMenu({
        commit,
    }, menu_item) {
        return axios.post(`/api/seller/menu`, menu_item)
            .then((res) => res.data)
            .then((res) => {
                console.log(res);
                // commit('setMenuItems', res.data);
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
