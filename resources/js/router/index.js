import store from '@/store';
import NotFound from '@/views/404';
import NewRestaurants from '@/views/frontend/components/NewRestaurants';
import PremiumRestaurants from '@/views/frontend/components/PremiumRestaurants';
import TrendingRestaurants from '@/views/frontend/components/TrendingRestaurants';
import DefaultLayout from '@/views/frontend/layouts/DefaultLayout';
import Restaurants from '@/views/frontend/Restaurants';
import Vue from 'vue';
import VueRouter from 'vue-router';
import middlewarePipeline from './middlewarePipeline';
// import admin from "./middleware/admin";
// import guest from "./middleware/guest";

Vue.use(VueRouter);

const routes = [{
        name: 'home',
        path: '/',
        component: Restaurants,
        meta: {
            layout: DefaultLayout,
        },
    },
    {
        name: 'restaurants',
        path: '/restaurants',
        redirect: '/restaurants/trending',
        component: Restaurants,
        children: [{
                name: 'restaurants.trending',
                path: 'trending',
                component: TrendingRestaurants,
                meta: {
                    layout: DefaultLayout,
                },
            },
            {
                name: 'restaurants.new',
                path: 'new',
                component: NewRestaurants,
                meta: {
                    layout: DefaultLayout,
                },
            },
            {
                name: 'restaurants.premium',
                path: 'premium',
                component: PremiumRestaurants,
                meta: {
                    layout: DefaultLayout,
                },
            },
        ],
        meta: {
            layout: DefaultLayout,
        },
    },
    {
        path: '*',
        component: NotFound,
    },
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

    // const store = await store; //await the store

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
