/* eslint-disable space-in-parens */
import Vue from 'vue';
import VueRouter from 'vue-router';
import sellerMiddleware from './middleware/sellerMiddleware';
import middlewarePipeline from './middlewarePipeline';

Vue.use(VueRouter);

const routes = [{
        name: 'home',
        path: '/',
        redirect: '/restaurants/trending',
        // @ts-ignore
        component: () => import( /* webpackChunkName: "restaurants" */ '@/views/frontend/Restaurants'),
        meta: {
            // @ts-ignore
            layout: () => import( /* webpackChunkName: "frontend-default-layout" */ '@/views/frontend/layouts/DefaultLayout'),
        },
    },

    {
        name: 'restaurants',
        path: '/restaurants',
        redirect: '/restaurants/trending',
        meta: {
            // @ts-ignore
            layout: () => import( /* webpackChunkName: "frontend-default-layout" */ '@/views/frontend/layouts/DefaultLayout'),
        },
        // @ts-ignore
        component: () => import( /* webpackChunkName: "restaurants" */ '@/views/frontend/Restaurants'),
        children: [{
                name: 'restaurants.trending',
                path: 'trending',
                // @ts-ignore
                component: () => import( /* webpackChunkName: "trending-restaurants" */ '@/views/frontend/components/TrendingRestaurants'),
                meta: {
                    // @ts-ignore
                    layout: () => import( /* webpackChunkName: "frontend-default-layout" */ '@/views/frontend/layouts/DefaultLayout'),
                },
            },
            {
                name: 'restaurants.new',
                path: 'new',
                // @ts-ignore
                component: () => import( /* webpackChunkName: "new-restaurants" */ '@/views/frontend/components/NewRestaurants'),
                meta: {
                    // @ts-ignore
                    layout: () => import( /* webpackChunkName: "frontend-default-layout" */ '@/views/frontend/layouts/DefaultLayout'),
                },
            },
            {
                name: 'restaurants.premium',
                path: 'premium',
                // @ts-ignore
                component: () => import( /* webpackChunkName: "premium-restaurants" */ '@/views/frontend/components/PremiumRestaurants'),
                meta: {
                    // @ts-ignore
                    layout: () => import( /* webpackChunkName: "frontend-default-layout" */ '@/views/frontend/layouts/DefaultLayout'),
                },
            },
        ],

    },

    {
        name: 'restaurant_details',
        path: '/restaurant/:slug',
        // @ts-ignore
        component: () => import( /* webpackChunkName: "restaurant-details" */ '@/views/frontend/RestaurantDetails'),
        meta: {
            // @ts-ignore
            layout: () => import( /* webpackChunkName: "frontend-default-layout" */ '@/views/frontend/layouts/DefaultLayout'),
        },
    },

    {
        name: 'seller.dashboard',
        path: '/seller',
        // @ts-ignore
        component: () => import( /* webpackChunkName: "seller-dashboard" */ '@/views/seller/Dashboard'),
        meta: {
            // @ts-ignore
            layout: () => import( /* webpackChunkName: "seller-default-layout" */ '@/views/seller/layouts/DefaultLayout'),
            middleware: [sellerMiddleware],
        },
    },

    {
        path: '*',
        // @ts-ignore
        component: () => import( /* webpackChunkName: "404" */ '@/views/404'),
    },
    // @ts-ignore
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next();
    }
    const {
        middleware,
    } = to.meta;

    // @ts-ignore
    const store = () => import('@/store');

    const context = {
        to,
        from,
        next,
        store,
    };

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1),
    });
});

export default router;
