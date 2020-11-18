/* eslint-disable space-in-parens */
// @ts-ignore
import store from "@/store";
import DefaultLayout from "@/views/frontend/layouts/DefaultLayout";
import Vue from "vue";
import VueRouter from "vue-router";
import adminMiddleware from "./middleware/adminMiddleware";
import authMiddleware from "./middleware/authMiddleware";
import deliveryboyMiddleware from "./middleware/deliveryboyMiddleware";
import kitchenstaffMiddleware from "./middleware/kitchenstaffMiddleware";
import sellerMiddleware from "./middleware/sellerMiddleware";
import middlewarePipeline from "./middlewarePipeline";

Vue.use(VueRouter);

const routes = [
    {
        name: "home",
        path: "/",
        redirect: "/restaurants/trending",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "restaurants" */ "@/views/frontend/Restaurants"
            ),
        meta: {
            // @ts-ignore
            layout: DefaultLayout
        }
    },

    {
        name: "restaurants",
        path: "/restaurants",
        redirect: "/restaurants/trending",
        meta: {
            // @ts-ignore
            layout: DefaultLayout
        },
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "restaurants" */ "@/views/frontend/Restaurants"
            ),
        children: [
            {
                name: "restaurants.trending",
                path: "trending",
                // @ts-ignore
                component: () =>
                    import(
                        /* webpackChunkName: "trending-restaurants" */ "@/views/frontend/components/TrendingRestaurants"
                    ),
                meta: {
                    // @ts-ignore
                    layout: DefaultLayout
                }
            },
            {
                name: "restaurants.new",
                path: "new",
                // @ts-ignore
                component: () =>
                    import(
                        /* webpackChunkName: "new-restaurants" */ "@/views/frontend/components/NewRestaurants"
                    ),
                meta: {
                    // @ts-ignore
                    layout: DefaultLayout
                }
            },
            {
                name: "restaurants.premium",
                path: "premium",
                // @ts-ignore
                component: () =>
                    import(
                        /* webpackChunkName: "premium-restaurants" */ "@/views/frontend/components/PremiumRestaurants"
                    ),
                meta: {
                    // @ts-ignore
                    layout: DefaultLayout
                }
            }
        ]
    },

    {
        name: "restaurant_details",
        path: "/restaurant/:slug",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "restaurant-details" */ "@/views/frontend/RestaurantDetails"
            ),
        meta: {
            // @ts-ignore
            layout: DefaultLayout
        }
    },

    {
        name: "search",
        path: "/search",
        // @ts-ignore
        component: () =>
            import(/* webpackChunkName: "search" */ "@/views/frontend/Search"),
        meta: {
            // @ts-ignore
            layout: DefaultLayout
        }
    },

    // user routes
    {
        name: "profile",
        path: "/profile",
        redirect: "/profile/orders",
        meta: {
            // @ts-ignore
            layout: DefaultLayout,
            middleware: [authMiddleware]
        },
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "restaurants" */ "@/views/frontend/Profile"
            ),
        children: [
            {
                name: "profile.orders",
                path: "orders",
                // @ts-ignore
                component: () =>
                    import(
                        /* webpackChunkName: "profile-orders" */ "@/views/frontend/Orders"
                    ),
                meta: {
                    // @ts-ignore
                    layout: DefaultLayout,
                    middleware: [authMiddleware]
                }
            },

            {
                name: "profile.subscriptions",
                path: "subscriptions",
                // @ts-ignore
                component: () =>
                    import(
                        /* webpackChunkName: "profile-subscriptions" */ "@/views/frontend/Subscriptions"
                    ),
                meta: {
                    // @ts-ignore
                    layout: DefaultLayout,
                    middleware: [authMiddleware]
                }
            },

            {
                name: "profile.addresses",
                path: "addresses",
                // @ts-ignore
                component: () =>
                    import(
                        /* webpackChunkName: "profile-edit" */ "@/views/frontend/Addresses"
                    ),
                meta: {
                    // @ts-ignore
                    layout: DefaultLayout,
                    middleware: [authMiddleware]
                }
            },

            {
                name: "profile.addresses",
                path: "edit",
                // @ts-ignore
                component: () =>
                    import(
                        /* webpackChunkName: "profile-edit" */ "@/views/frontend/EditProfile"
                    ),
                meta: {
                    // @ts-ignore
                    layout: DefaultLayout,
                    middleware: [authMiddleware]
                }
            }
        ]
    },

    // seller routes
    {
        name: "seller.dashboard",
        path: "/seller",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "seller-dashboard" */ "@/views/seller/Dashboard"
            ),
        meta: {
            // @ts-ignore
            layout: () =>
                import(
                    /* webpackChunkName: "seller-default-layout" */ "@/views/seller/layouts/DefaultLayout"
                ),
            middleware: [sellerMiddleware]
        }
    },
    {
        name: "seller.menu",
        path: "/seller/menu",
        // @ts-ignore
        component: () =>
            import(/* webpackChunkName: "seller-menu" */ "@/views/seller/Menu"),
        meta: {
            // @ts-ignore
            layout: () =>
                import(
                    /* webpackChunkName: "seller-default-layout" */ "@/views/seller/layouts/DefaultLayout"
                ),
            middleware: [sellerMiddleware]
        }
    },
    {
        name: "seller.kitchen",
        path: "/seller/kitchen",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "seller-kitchen" */ "@/views/seller/Kitchen"
            ),
        meta: {
            // @ts-ignore
            layout: () =>
                import(
                    /* webpackChunkName: "seller-default-layout" */ "@/views/seller/layouts/DefaultLayout"
                ),
            middleware: [sellerMiddleware]
        }
    },
    {
        name: "seller.deleveries",
        path: "/seller/deleveries",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "seller-deleveries" */ "@/views/seller/Deliveries"
            ),
        meta: {
            // @ts-ignore
            layout: () =>
                import(
                    /* webpackChunkName: "seller-default-layout" */ "@/views/seller/layouts/DefaultLayout"
                ),
            middleware: [sellerMiddleware]
        }
    },
    {
        name: "seller.orders",
        path: "/seller/orders",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "seller-orders" */ "@/views/seller/Orders"
            ),
        meta: {
            // @ts-ignore
            layout: () =>
                import(
                    /* webpackChunkName: "seller-default-layout" */ "@/views/seller/layouts/DefaultLayout"
                ),
            middleware: [sellerMiddleware]
        }
    },

    // admin routes
    {
        name: "admin.dashboard",
        path: "/admin",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "admin-dashboard" */ "@/views/admin/Dashboard"
            ),
        meta: {
            // @ts-ignore
            layout: () =>
                import(
                    /* webpackChunkName: "admin-default-layout" */ "@/views/admin/layouts/DefaultLayout"
                ),
            middleware: [adminMiddleware]
        }
    },

    {
        name: "admin.restaurants",
        path: "/admin/restaurants",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "admin-restaurants" */ "@/views/admin/Restaurants"
            ),
        meta: {
            // @ts-ignore
            layout: () =>
                import(
                    /* webpackChunkName: "admin-default-layout" */ "@/views/admin/layouts/DefaultLayout"
                ),
            middleware: [adminMiddleware]
        }
    },

    // kitchen-staff routes
    {
        name: "kitchen-staff.dashboard",
        path: "/kitchen-staff",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "kitchen-staff-dashboard" */ "@/views/kitchen-staff/Dashboard"
            ),
        meta: {
            // @ts-ignore
            layout: () =>
                import(
                    /* webpackChunkName: "kitchen-staff-default-layout" */ "@/views/kitchen-staff/layouts/DefaultLayout"
                ),
            middleware: [kitchenstaffMiddleware]
        }
    },
    {
        name: "kitchen-staff.dashboard",
        path: "/kitchen-staff/orders",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "kitchen-staff-orders" */ "@/views/kitchen-staff/Orders"
            ),
        meta: {
            // @ts-ignore
            layout: () =>
                import(
                    /* webpackChunkName: "kitchen-staff-default-layout" */ "@/views/kitchen-staff/layouts/DefaultLayout"
                ),
            middleware: [kitchenstaffMiddleware]
        }
    },

    // delivery-boy routes
    {
        name: "delivery-boy.dashboard",
        path: "/delivery-boy",
        // @ts-ignore
        component: () =>
            import(
                /* webpackChunkName: "delivery-boy-dashboard" */ "@/views/delivery-boy/Dashboard"
            ),
        meta: {
            // @ts-ignore
            layout: () =>
                import(
                    /* webpackChunkName: "delivery-boy-default-layout" */ "@/views/delivery-boy/layouts/DefaultLayout"
                ),
            middleware: [deliveryboyMiddleware]
        }
    },
    {
        path: "*",
        // @ts-ignore
        component: () => import(/* webpackChunkName: "404" */ "@/views/404")
    }
    // @ts-ignore
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next();
    }
    const { middleware } = to.meta;

    const context = {
        to,
        from,
        next,
        store
    };

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    });
});

export default router;
