const state = {
    user: null,
    userAddresses: [],
    editAddress: null
};

const getters = {
    user: state => state.user,
    userAddresses: state => state.userAddresses,
    editAddress: state => state.editAddress
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setUserAddresses: (state, payload) => {
        state.userAddresses = payload;
    },
    setEditAddress: (state, payload) => {
        state.editAddress = payload;
    }
};

const actions = {
    async getUser({ commit }) {
        return axios
            .get("/api/user")
            .then(res => res.data)
            .then(res => {
                commit("setUser", res.data);
            });
    },
    updateUser(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .put("/api/user/update", data)
                .then(response => {
                    context.commit("setUser", response.data.data);
                    context.dispatch("auth/setUser", response.data.data, {
                        root: true
                    });
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    async userAddresses(context) {
        return axios
            .get("api/user/addresses")
            .then(res => res.data)
            .then(res => {
                context.commit("setUserAddresses", res.data);
            })
            .catch(error => console.log(error));
    },
    async getAddressById(context, id) {
        return axios
            .get(`api/user/address/${id}`)
            .then(res => res.data)
            .then(res => {
                context.commit("setEditAddress", res.data);
            })
            .catch(error => console.log(error));
    },
    async updateAddress(context, { id, address }) {
        return axios
            .put(`api/user/address/${id}`, address)
            .then(res => res.data)
            .then(res => {
                context.dispatch("userAddresses");
            })
            .catch(error => console.log(error));
    },
    async deleteAddress(context, id) {
        return axios
            .delete(`api/user/address/${id}`)
            .then(res => res.data)
            .then(res => {
                context.dispatch("userAddresses");
            })
            .catch(err => console.log(err));
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
