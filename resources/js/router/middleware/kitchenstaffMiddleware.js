export default function sellerMiddleware({ next, store }) {
    if (!store.getters["auth/isLoggedIn"]) {
        return next({
            name: "home"
        });
    }
    if (store.getters["auth/userRole"] !== "kitchen staff") {
        return next({
            name: "home"
        });
    }
    return next();
}
