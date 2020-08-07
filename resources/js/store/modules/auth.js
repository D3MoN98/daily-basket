import axios from 'axios';

const state = {
    token: localStorage.getItem('auth_token') || null,
    user: localStorage.getItem('user') || null,
};

const getters = {
    isLoggedIn: (state) => !!state.token,
    check: (state) => !!state.token,
    user: (state) => JSON.parse(state.user),
};

const mutations = {
    login: (state, payload) => {
        const response = payload.data;
        state.token = response.auth_token;
        state.user = JSON.stringify(response.user);
        localStorage.setItem('auth_token', response.auth_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        Vue.router.push('/restaurants').catch(() => {});
    },
    logout: (state, payload) => {
        state.token = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        Vue.router.push({
            name: 'home',
        });
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
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
