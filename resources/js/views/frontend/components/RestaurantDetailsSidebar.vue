<template>
    <div class="side_bar_blue">
        <div class="blue_side_otr">
            <div class="res_image">
                <!-- <img :src="restaurant.image" /> -->
                <img :src="'/images/download.jpeg'" />
            </div>
            <div class="res_details">
                <h3>{{ restaurant.name }}</h3>
                <address>{{ restaurant.address.address }}</address>
            </div>
            <div class="subc_btn_otr">
                <a
                    href="#"
                    class="subc_btn"
                    v-show="
                        !isSubscribeApplied &&
                            cartRestaurantId === restaurant.id
                    "
                    role="button"
                    data-toggle="modal"
                    data-dismiss="modal"
                    data-target="#subscribeModal"
                    >Subscribe</a
                >
                <a
                    href="#"
                    class="subc_btn"
                    v-show="!isCartEmpty && cartRestaurantId !== restaurant.id"
                    role="button"
                    >Subscribe</a
                >
                <a
                    v-show="
                        isSubscribeApplied &&
                            subscribe.restaurant_id === restaurant.id
                    "
                    class="subc_btn subscribed"
                    href="javascript:void(0);"
                    @click.prevent="removeSubscription()"
                >
                    Subscribed
                </a>
            </div>
            <div class="we_offer">
                <p>We Offer {{ cartRestaurantId }}</p>
                <ul>
                    <li>
                        <span> <i class="fas fa-check-circle"></i> </span>Lunch
                    </li>
                    <li>
                        <span> <i class="fas fa-check-circle"></i> </span>Dinner
                    </li>
                </ul>
            </div>
        </div>
        <div class="call_last">
            <a href="tel:+">
                <span>
                    <i class="fas fa-phone"></i>
                </span>
                {{ restaurant.contact_no }}
            </a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        restaurant: null
    },
    computed: {
        ...mapGetters({
            isSubscribeApplied: "cart/isSubscribeApplied",
            subscribe: "cart/getSubscribe",
            cartRestaurantId: "cart/getRestaurantId",
            isCartEmpty: "cart/isCartEmpty"
        })
    },
    methods: {
        removeSubscription() {
            this.$store.dispatch("cart/removeSubscribe").then(() => {
                toastr.success("Subscribe removed", "", {
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
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.subscribed {
    background: transparent;
    color: #48c479;
    border-color: #48c479;
}
</style>
