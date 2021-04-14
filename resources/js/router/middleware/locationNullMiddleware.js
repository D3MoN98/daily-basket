export default function locationNullMiddleware({ next, store }) {
    if (
        store.getters["auth/currentLocation"] === null ||
        store.getters["auth/currentLocation"].lat === 0
    ) {
        return next({
            name: "home"
        });
    }

    return next();
}
