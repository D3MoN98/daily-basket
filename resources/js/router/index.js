import DefaultLayout from "@/views/frontend/layouts/DefaultLayout";
import Restaurants from "@/views/frontend/Restaurants";
import Vue from "vue";
import VueRouter from "vue-router";
// import store from "./../store";

// import admin from "./middleware/admin";
// import guest from "./middleware/guest";
// import middlewarePipeline from "./middlewarePipeline";

Vue.use(VueRouter);

const routes = [
    {
        name: "home",
        path: "/",
        component: Restaurants,
        meta: { layout: DefaultLayout }
    },
    {
        name: "restaurants",
        path: "/restaurants",
        component: Restaurants,
        meta: { layout: DefaultLayout }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

// router.beforeEach((to, from, next) => {
//     if (!to.meta.middleware) {
//         return next();
//     }
//     const middleware = to.meta.middleware;

//     // const store = await store  //await the store

//     const context = {
//         to,
//         from,
//         next,
//         store
//     };

//     // alert(Vue.auth.check());

//     return middleware[0]({
//         ...context,
//         next: middlewarePipeline(context, middleware, 1)
//     });
// });

export default router;
