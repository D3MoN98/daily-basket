/* eslint-disable no-param-reassign */
import axios from "axios";

const state = {
    kitchenStaffs: []
};

const getters = {
    getKitchenStaff: state => state.kitchenStaffs
};

const mutations = {
    setKitchenStaffs(state, kitchenStaffs) {
        state.kitchenStaffs = kitchenStaffs;
    }
};

const actions = {
    kitchenStaffRegister(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post("api/seller/kitchen-staff/sign-up", data)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    async kitchenStaffs({ commit }) {
        return axios
            .get(`/api/seller/kitchen-staff`)
            .then(res => res.data)
            .then(res => {
                commit("setKitchenStaffs", res.data);
            });
    },
    async changeActive({ commit, dispatch }, id) {
        return axios
            .get(`/api/seller/kitchen-staff/change-active/${id}`)
            .then(res => res.data)
            .then(res => {
                dispatch("kitchenStaffs");
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
