export default function authMiddleware({
    next,
    store,
}) {
    if (!store.getters['auth/isLoggedIn']) {
        return next({
            name: 'restaurants',
        });
    }
    return next();
}
