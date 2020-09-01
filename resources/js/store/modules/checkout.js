import axios from 'axios';

const state = {

};

const getters = {
    orders: (state, getters) => state,
};

const mutations = {
    setOrders(state, payload) {

    }
};

const actions = {
    async placeOrder({
        commit,
        dispatch
    }, order) {
        return axios.post('/api/checkout/', order).then((res) => res.data).then((res) => {
            if (res.success) {
                Swal.fire(
                    'Good job!',
                    res.success,
                    'success'
                );
                dispatch('cart/setCartItem', [], {
                    root: true
                });
            }
        }).catch((err) => {
            console.log(err);
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
