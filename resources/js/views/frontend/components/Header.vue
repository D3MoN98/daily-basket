<template>
    <header>
        <div class="full_hdr_bk landing_full_hdr">
            <div class="nav-header">
                <div class="nav_header_innr">
                    <router-link to="/" class="brand-logo">
                        <span class="logo-compact">Daily Basket</span>
                    </router-link>

                    <div class="nav-control">
                        <div class="hamburger">
                            <span class="toggle-icon">
                                <i class="icon-menu"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header">
                <div class="header-content">
                    <nav class="navbar navbar-expand">
                        <div
                            class="collapse navbar-collapse justify-content-between"
                        >
                            <div class="header-left">
                                <div class="hdr_del">
                                    <a onclick="openNav()">
                                        Delivery to
                                        <!-- <span class="hdr_plc">Home</span> -->
                                        <span
                                            class="hdr_add"
                                            v-if="currentLocation !== null"
                                            >{{
                                                `${currentLocation.formatted_address.substring(
                                                    0,
                                                    30
                                                )}...`
                                            }}</span
                                        >
                                    </a>
                                </div>
                            </div>
                            <ul class="navbar-nav header-right">
                                <li class="nav-item menu_long_gap">
                                    <router-link to="/search" class="nav-link">
                                        <i class="fas fa-search"></i>
                                        <span class="nav_txt">Search</span>
                                    </router-link>
                                </li>
                                <li class="nav-item menu_long_gap">
                                    <a class="nav-link" href="#" role="button">
                                        <i class="far fa-life-ring"></i>
                                        <span class="nav_txt">Help</span>
                                    </a>
                                </li>

                                <li
                                    class="nav-item menu_long_gap"
                                    v-if="!this.$store.getters['auth/check']"
                                >
                                    <a
                                        class="nav-link"
                                        href="#"
                                        role="button"
                                        data-toggle="modal"
                                        data-dismiss="modal"
                                        data-target="#log_in_modal"
                                    >
                                        <i class="far fa-user-circle"></i>
                                        <span class="nav_txt">Login</span>
                                    </a>
                                </li>

                                <li
                                    class="nav-item dropdown menu_long_gap after_login_profile"
                                    v-if="this.$store.getters['auth/check']"
                                >
                                    <a
                                        class="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i class="far fa-user-circle"></i>
                                        <span class="nav_txt">
                                            {{
                                                _.split(
                                                    this.$store.getters[
                                                        "auth/user"
                                                    ].name,
                                                    " "
                                                )[0]
                                            }}
                                        </span>
                                    </a>
                                    <div
                                        class="dropdown-menu dropdown-menu-right"
                                    >
                                        <router-link
                                            to="/profile/edit"
                                            class="dropdown-item"
                                        >
                                            <span>My Profile</span>
                                        </router-link>
                                        <router-link
                                            to="/profile/orders"
                                            class="dropdown-item"
                                        >
                                            <span>My Order</span>
                                        </router-link>
                                        <a
                                            href="#"
                                            @click.prevent="logout"
                                            class="dropdown-item"
                                        >
                                            <span>Logout</span>
                                        </a>
                                    </div>
                                </li>

                                <li class="nav-item">
                                    <div class="dropdown cart-dropdown">
                                        <a
                                            class="nav-link dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i class="fas fa-cart-plus"></i>
                                            <span class="nav_txt">Cart</span>
                                        </a>
                                        <div
                                            class="dropdown-menu dropdown-menu-right shadow"
                                            aria-labelledby="dropdownMenuButton"
                                        >
                                            <div class="cart-content">
                                                <h2>Cart is empty</h2>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            currentLocation: "auth/currentLocation"
        })
    },
    methods: {
        logout() {
            this.$store.dispatch("auth/logout");
        }
    }
};
</script>

<style scoped lang="scss">
.hdr_add {
    text-overflow: ellipsis;
}
.cart-dropdown .dropdown-menu {
    min-width: 25rem;
    height: 200px;
    border: none;
    margin: 1.35rem 0 0;
    .cart-content {
        width: 100%;
        height: 100%;
        text-align: center;
        display: flex;
    }
    h2 {
        margin: auto;
    }
    .dropdown-toggle::after {
        content: none !important;
    }
}
</style>
