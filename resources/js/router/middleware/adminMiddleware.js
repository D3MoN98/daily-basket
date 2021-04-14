export default function adminMiddleware({ next, store }) {
    if (!store.getters["auth/isLoggedIn"]) {
        return next({
            name: "home"
        });
    }
    if (store.getters["auth/userRole"] !== "admin") {
        return next({
            name: "home"
        });
    }
    return next();
}
