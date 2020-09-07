import axios from "axios";

const state = {
    cart_items: [],
    restaurant_id: null
};

const getters = {
    getCartItems: state => state.cart_items,
    isCartEmpty: state => state.cart_items.length === 0,
    getRestaurantId: state => state.restaurant_id
};

const mutations = {
    setCartItems(state, payload) {
        state.cart_items = payload;
    },
    setRestaurantId(state, payload) {
        state.restaurant_id = payload;
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
