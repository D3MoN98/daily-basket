export default function deliveryboyMiddleware({ next, store }) {
    if (!store.getters["auth/isLoggedIn"]) {
        return next({
            name: "home"
        });
    }
    if (store.getters["auth/userRole"] !== "delivery-boy") {
        return next({
            name: "home"
        });
    }
    return next();
}
