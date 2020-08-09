import axios from 'axios';

const state = {
    token: localStorage.getItem('auth_token') || null,
    user: localStorage.getItem('user') || null,
    userAddresses: null,
};

const getters = {
    isLoggedIn: (state) => !!state.token,
    check: (state) => !!state.token,
    user: (state) => JSON.parse(state.user),
    userRole: (state, getters) => getters.user.role,
    userAddresses: (state) => state.userAddresses,
};

const mutations = {
    login: (state, payload) => {
        const response = payload.data;
        state.token = response.auth_token;
        state.user = JSON.stringify(response.user);
        localStorage.setItem('auth_token', response.auth_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        $('#log_in_modal').modal('hide');

        if (response.user.role === 'seller') {
            window.location.href = '/seller';
        } else if (response.user.role === 'customer') {
            window.location.href = '/';
        } else {
            window.location.href = '/';
        }
    },
    logout: (state, payload) => {
        state.token = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/';
    },
    setUserAddresses: (state, payload) => {
        state.userAddresses = payload;
    },
};

const actions = {
    login(context, data) {
        return new Promise((resolve, reject) => {
            axios.get('/sanctum/csrf-cookie').then((response) => {
                axios
                    .post('/api/login', data)
                    .then((response) => {
                        context.commit('login', response);
                        resolve(response);
                    })
                    .catch((err) => {
                        localStorage.removeItem('auth_token_default');
                        reject(err);
                    });
            });
        });
    },
    logout(context) {
        axios
            .get('/api/logout')
            .then((res) => res.data)
            .then((res) => {
                context.commit('logout', res);
            })
            .catch((err) => console.log(err));
    },
    customerRegister(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post('api/customer/sign-up', data)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    sellerRegister(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post('api/seller/sign-up', data)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    deliveryRegister(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post('api/delivery/sign-up', data)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    async userAddresses(context) {
        return axios.get('api/user/addresses')
            .then((res) => res.data)
            .then((res) => context.commit('setUserAddresses', res.data))
            .catch((error) => console.log(error));
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
