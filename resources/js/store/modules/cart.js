import axios from "axios";

const state = {
    cart_items: [],
    restaurant_id: null,
    subscribe: {
        applied: false,
        start: null,
        end: null
    }
};

const getters = {
    getCartItems: state => state.cart_items,
    isCartEmpty: state => state.cart_items.length === 0,
    getRestaurantId: state => state.restaurant_id,
    isSubscribeApplied: state => state.subscribe.applied,
    getSubscribe: state => state.subscribe,
    getSubscribeDateDiff: state => {
        const date1 = new Date(state.subscribe.start);
        const date2 = new Date(state.subscribe.end);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1;
    }
};

const mutations = {
    setCartItems(state, payload) {
        state.cart_items = payload;
    },
    setRestaurantId(state, payload) {
        state.restaurant_id = payload;
    },
    setSubscribe(state, { start, end }) {
        state.subscribe.applied = true;
        state.subscribe.start = start;
        state.subscribe.end = end;
    },
    removeSubscribe(state) {
        state.subscribe.applied = false;
        state.subscribe.start = null;
        state.subscribe.end = null;
    }
};

const actions = {
    setCartItem({ commit }, item) {
        commit("setCartItems", item);
    },
    async getCartItems({ commit }) {
        return axios
            .get("/api/cart")
            .then(res => res.data)
            .then(res => {
                commit("setCartItems", res.data);
                commit("setRestaurantId", res.restaurant_id);
            })
            .catch(err => {
                console.log(err);
            });
    },
    async addToCart({ commit }, { id, qty, rowId }) {
        return axios
            .post("/api/cart", {
                id,
                qty,
                rowId
            })
            .then(res => res.data)
            .then(res => {
                if (!res.error) {
                    commit("setCartItems", res.data);
                } else {
                    Swal.fire({
                        title: "Do you want to refresh the cart?",
                        text: res.error,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#6883b9",
                        cancelButtonColor: "#dd6b55",
                        confirmButtonText: "Yes",
                        preConfirm: () =>
                            axios
                                .post("/api/cart", {
                                    id,
                                    qty,
                                    rowId,
                                    refresh: true
                                })
                                .then(res => res.data)
                                .then(res => {
                                    console.log(res);
                                    commit("setCartItems", res.data);
                                    commit(
                                        "setRestaurantId",
                                        res.restaurant_id
                                    );
                                })
                    });
                }
            })
            .catch(err => {});
    },
    async removeFormCart({ commit }, rowId) {
        return axios
            .delete(`/api/cart/${rowId}`)
            .then(res => res.data)
            .then(res => {
                commit("setCartItems", res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },
    setSubscribe({ commit }, date) {
        commit("setSubscribe", date);
    },
    async removeSubscribe({ commit }) {
        commit("removeSubscribe");
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
