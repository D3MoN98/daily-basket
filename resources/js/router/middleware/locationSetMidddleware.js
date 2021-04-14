export default function locationSetMidddleware({ next, store }) {
    if (store.getters["auth/isLoggedIn"]) {
        return next({
            name: "restaurants"
        });
    }

    if (
        (store.getters["auth/currentLocation"] != null &&
            store.getters["auth/currentLocation"].lat) != 0
    ) {
        return next({
            name: "restaurants"
        });
    }

    return next();
}
