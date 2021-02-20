export default function sellerMiddleware({ next, store }) {
    if (store.getters["auth/isLoggedIn"]) {
        return next({
            name: "restaurants"
        });
    }

    if (store.getters["auth/currentLocation"] !== null) {
        return next({
            name: "restaurants"
        });
    }

    return next();
}
