const state = {
    token: localStorage.getItem("auth_token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    userAddresses: null,
    currentLocation:
        JSON.parse(localStorage.getItem("current_location")) || null,
    deleveryAddress:
        JSON.parse(localStorage.getItem("delevery_address")) || null
};

const getters = {
    isLoggedIn: state => !!state.token,
    check: state => !!state.token,
    user: state => state.user,
    userRole: (state, getters) => getters.user.role,
    userAddresses: state => state.userAddresses,
    currentLocation: state => state.currentLocation,
    deleveyAddress: state => state.deleveryAddress
};

const mutations = {
    login: (state, payload) => {
        const response = payload.data;
        state.token = response.auth_token;
        state.user = response.user;
        localStorage.setItem("auth_token", response.auth_token);
        localStorage.setItem("user", JSON.stringify(response.user));
        $("#log_in_modal").modal("hide");

        if (response.user.role === "seller") {
            window.location.href = "/seller";
        } else if (response.user.role === "kitchen-staff") {
            window.location.href = "/kitchen-staff";
        } else if (response.user.role === "delivery-boy") {
            window.location.href = "/delivery-boy";
        } else if (response.user.role === "customer") {
            window.location.reload();
        } else {
            window.location.reload();
        }
    },
    logout: (state, payload) => {
        state.token = null;
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        localStorage.removeItem("delevery_address");
        window.location.href = "/";
    },
    setUser(state, user) {
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
    },
    setUserAddresses: (state, payload) => {
        state.userAddresses = payload;
    },
    setCurrentLocation: (state, payload) => {
        state.currentLocation = payload;
        localStorage.setItem("current_location", JSON.stringify(payload));
    },
    setDeleveryAddress: (state, payload) => {
        state.deleveryAddress = payload;
        localStorage.setItem("delevery_address", JSON.stringify(payload));
    }
};

const actions = {
    login(context, data) {
        return new Promise((resolve, reject) => {
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios
                    .post("/api/login", data)
                    .then(response => {
                        context.dispatch("userAddresses");
                        context.commit("login", response);
                        resolve(response);
                    })
                    .catch(err => {
                        localStorage.removeItem("auth_token_default");
                        reject(err);
                    });
            });
        });
    },
    logout(context) {
        axios
            .get("/api/logout")
            .then(res => res.data)
            .then(res => {
                context.commit("logout", res);
            })
            .catch(err => console.log(err));
    },
    customerRegister(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post("api/customer/sign-up", data)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    sellerRegister(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post("api/seller/sign-up", data)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    deliveryRegister(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post("api/delivery/sign-up", data)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    setUser({ commit }, user) {
        commit("setUser", user);
    },
    async userAddresses(context) {
        return axios
            .get("api/user/addresses")
            .then(res => res.data)
            .then(res => {
                context.commit("setUserAddresses", res.data);
                if (res.data.length > 0) {
                    if (
                        res.data.find(address => address.type === "home") !==
                        undefined
                    ) {
                        context.commit(
                            "setDeleveryAddress",
                            res.data.find(address => address.type === "home")
                        );
                    }
                }
            })
            .catch(error => console.log(error));
    },
    async saveUserAddresses({ commit, dispatch }, data) {
        return axios
            .post("api/user/address", data)
            .then(res => res.data)
            .then(res => {
                console.log(res.address);
                commit("setDeleveryAddress", res.address);
                dispatch("userAddresses");
            })
            .catch(error => console.log(error));
    },
    setCurrentLocation(context, { lat, lng, formatted_address }) {
        context.commit("setCurrentLocation", {
            lat,
            lng,
            formatted_address
        });
    },
    async setDeleveryAddress(context, address) {
        context.commit("setDeleveryAddress", address);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
