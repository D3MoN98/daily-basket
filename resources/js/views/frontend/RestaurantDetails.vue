<template>
    <div>
        <RestaurantDetailsSidebar v-if="isLoaded" :restaurant="restaurant" />
        <RestaurantDetailsSidebarPlaceholder v-else />

        <div class="content-body">
            <!-- row -->
            <div class="container">
                <div class="main_area">
                    <div class="food_otr">
                        <div class="food_tab_otr side_chkbox">
                            <div id="food_tab">
                                <div class="select_area">
                                    <ul class="resp-tabs-list">
                                        <li>Recommended</li>
                                        <li>Menu</li>
                                    </ul>
                                    <div class="modal_chkbox tab_chk_bx">
                                        <div class="chk_inn">
                                            <div
                                                class="form-check custom_chkbx"
                                            >
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="gridRadios"
                                                    value="Customer"
                                                    @change="onlyVeg"
                                                />
                                                <span class="checkmark"></span>
                                                <label class="form-check-label"
                                                    >Only Veg</label
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="resp-tabs-container">
                                    <div>
                                        <RecommendedMenu
                                            :isRecommendedMenuItemLoaded="
                                                isRecommendedMenuItemLoaded
                                            "
                                            :recommended_menu_items="
                                                recommended_menu_items
                                            "
                                        />
                                    </div>
                                    <div>
                                        <Menu
                                            :isMenuItemLoaded="isMenuItemLoaded"
                                            :menu_items="menu_items"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="custom_footer">
                        <p>
                            Copyright © Designed &amp; Developed by
                            <a href target="_blank">Sutanu & Sudipta</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <Cart />
    </div>
</template>

<script>
import RestaurantDetailsSidebar from "@/views/frontend/components/RestaurantDetailsSidebar";
import Menu from "@/views/frontend/components/Menu";
import Cart from "@/views/frontend/components/Cart";
import RecommendedMenu from "@/views/frontend/components/RecommendedMenu";
import RestaurantDetailsSidebarPlaceholder from "@/views/frontend/components/RestaurantDetailsSidebarPlaceholder";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            isLoaded: false,
            isMenuItemLoaded: false,
            isRecommendedMenuItemLoaded: false
        };
    },
    components: {
        Menu,
        Cart,
        RecommendedMenu,
        RestaurantDetailsSidebar,
        RestaurantDetailsSidebarPlaceholder
    },
    watch: {
        $route: function(to, from) {
            this.loadRestaurant();
        }
    },
    mounted() {
        $("#food_tab").easyResponsiveTabs({
            type: "default",
            width: "auto",
            fit: true,
            closed: "accordion",
            activate() {
                const $tab = $(this);
                const $info = $("#tabInfo");
                const $name = $("span", $info);
                $name.text($tab.text());
                $info.show();
            }
        });
    },
    created() {
        this.loadRestaurant();
    },
    computed: {
        ...mapGetters({
            restaurant: "restaurant/getRestaurant",
            menu_items: "restaurant/getMenuItems",
            recommended_menu_items: "restaurant/getRecommendedMenuItems"
        })
    },
    methods: {
        onlyVeg($e) {
            this.isMenuItemLoaded = false;
            this.isRecommendedMenuItemLoaded = false;
            if ($e.target.checked) {
                this.$store
                    .dispatch("restaurant/vegMenuItems", this.restaurant.id)
                    .then(() => {
                        this.isMenuItemLoaded = true;
                    });
                this.$store
                    .dispatch(
                        "restaurant/vegRecommendeMenuItems",
                        this.restaurant.id
                    )
                    .then(() => {
                        this.isRecommendedMenuItemLoaded = true;
                    });

                toastr.success("Menu item set to veg", "", {
                    positionClass: "toast-bottom-center",
                    timeOut: 1500,
                    closeButton: !0,
                    debug: !1,
                    newestOnTop: !0,
                    progressBar: !0,
                    preventDuplicates: !0,
                    onclick: null,
                    showDuration: "300",
                    hideDuration: "1000",
                    extendedTimeOut: "1000",
                    showEasing: "swing",
                    hideEasing: "linear",
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut",
                    tapToDismiss: !1
                });
            } else {
                this.$store
                    .dispatch("restaurant/menu", this.restaurant.id)
                    .then(() => {
                        this.isMenuItemLoaded = true;
                    });
                this.$store
                    .dispatch("restaurant/recommendedMenu", this.restaurant.id)
                    .then(() => {
                        this.isRecommendedMenuItemLoaded = true;
                    });
            }
        },
        loadRestaurant() {
            this.$store
                .dispatch("restaurant/restaurant", this.$route.params.slug)
                .then(() => {
                    this.$store
                        .dispatch("restaurant/menu", this.restaurant.id)
                        .then(() => {
                            this.isMenuItemLoaded = true;
                        });
                    this.$store
                        .dispatch(
                            "restaurant/recommendedMenu",
                            this.restaurant.id
                        )
                        .then(() => {
                            this.isRecommendedMenuItemLoaded = true;
                        });
                    this.isLoaded = true;
                });
        }
    }
};
</script>

<style></style>
