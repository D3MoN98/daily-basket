const state = {
    feedback: null,
    order_id: null
};

const getters = {
    feedback: state => state.feedback,
    order_id: state => state.order_id
};

const mutations = {
    setOrderId(state, order_id) {
        state.order_id = order_id;
    }
};

const actions = {
    async getOrderId({ commit }) {
        return axios
            .get("/api/feedback/check/")
            .then(res => res.data)
            .then(res => {
                commit("setOrderId", res.order_id);
            });
    },
    feedbackPost(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/feedback", data)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
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
