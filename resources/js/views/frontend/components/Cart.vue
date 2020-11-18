<template>
    <div
        class="right_cart"
        :class="{
            blank_cart: this.cart_items.length === 0,
            fill_cart: this.cart_items.length > 0
        }"
    >
        <div class="blank_cart_inn" v-if="this.cart_items.length === 0">
            <h3>Cart Empty</h3>
        </div>
        <div class="fill_cart_inn" v-else-if="this.cart_items.length > 0">
            <h2>Cart</h2>

            <div class="subscription-box" v-if="isSubscribeApplied">
                <h4>Subscription Applied</h4>
                <div class="modal_chkbox">
                    <div class="chk_inn">
                        <div class="form-check custom_chkbx">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="gridRadios"
                                value="Customer"
                                checked
                            />
                            <span class="checkmark"></span>
                            <label class="form-check-label">Lunch</label>
                        </div>
                        <div class="form-check custom_chkbx">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="gridRadios"
                                value="Seller"
                            />
                            <span class="checkmark"></span>
                            <label class="form-check-label">Dinner</label>
                        </div>
                        <div class="form-check custom_chkbx">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="gridRadios"
                                value="Delivery"
                            />
                            <span class="checkmark"></span>
                            <label class="form-check-label">Both</label>
                        </div>
                    </div>
                </div>
                <div class="subc_box text-center">
                    <p>
                        <span>
                            <i class="fas fa-check-circle"></i>
                        </span>
                        {{ getSubscribeDateDiff }} days
                    </p>
                    <h5>
                        {{
                            `${getSubscribeDateInFormate.start.ordinal} ${getSubscribeDateInFormate.start.month_short_name}`
                        }}
                        -
                        {{
                            `${getSubscribeDateInFormate.end.ordinal} ${getSubscribeDateInFormate.end.month_short_name}`
                        }}
                    </h5>
                </div>
                <div
                    class="subscription-action"
                    v-if="userAddresses.length > 0"
                >
                    <a
                        href="javascript:void(0);"
                        @click.prevent="removeSubscription()"
                        >Remove</a
                    >
                </div>
            </div>
            <div class="delivery_food">
                <ul>
                    <CartItem
                        v-for="cart_item in cart_items"
                        :cart_item="cart_item"
                        :key="cart_item.rowId"
                    />
                </ul>
            </div>

            <div class="amt_cal">
                <div class="amt_cal_innr">
                    <div class="sub_total">
                        <h5>Sub-Total</h5>
                        <p>{{ parseFloat(subTotal).toFixed(2) }}</p>
                    </div>
                    <div class="tax">
                        <h5>Taxes</h5>
                        <p>00.00</p>
                    </div>
                    <div class="other_chrgs">
                        <h5>Other Charges</h5>
                        <p>00.00</p>
                    </div>
                </div>
                <div class="cupon">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Apply Coupon Code"
                    />
                </div>
            </div>
            <div class="amt_cal">
                <div class="amt_cal_innr">
                    <div class="total">
                        <h5>Total</h5>
                        <p>{{ parseFloat(subTotal).toFixed(2) }}</p>
                    </div>
                </div>
            </div>
            <div class="delivery_to">
                <h4>Delevered To</h4>
                <div class="delivery-address" v-if="userAddresses.length > 0">
                    <div class="address-icon">
                        <i
                            class="fas fa-home"
                            v-if="deleveyAddress.type == 'home'"
                        ></i>
                        <i
                            class="fas fa-briefcase"
                            v-else-if="deleveyAddress.type == 'work'"
                        ></i>
                        <i class="fas fa-map-marker-alt" v-else></i>
                    </div>
                    <div>
                        <b>{{ _.startCase(_.toLower(deleveyAddress.type)) }}</b>
                        <p>{{ _.truncate(deleveyAddress.address) }}</p>
                    </div>
                </div>
                <div
                    class="delivery-address"
                    v-else-if="userAddresses.length === 0"
                >
                    <div class="address-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <p>{{ _.truncate(currentLocation.formatted_address) }}</p>
                </div>
                <div class="delevery-action" v-if="userAddresses.length > 0">
                    <a
                        href="javascript:void(0);"
                        @click.prevent="openSaveAddress()"
                        >Add New</a
                    >
                    <a
                        href="javascript:void(0);"
                        @click.prevent="openChangeAddress()"
                        >Change</a
                    >
                </div>
                <div
                    class="delevery-action"
                    v-else-if="userAddresses.length === 0"
                >
                    <a
                        href="javascript:void(0);"
                        @click.prevent="openSaveAddress()"
                        >Add New</a
                    >
                </div>
            </div>
            <Payment
                :deleveyAddress="deleveyAddress"
                :sub-total-amount="subTotal"
                :subscribeDetails="getSubscribe"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartItem from "@/views/frontend/components/CartItem";
import Payment from "@/views/frontend/components/Payment";

export default {
    components: {
        CartItem,
        Payment
    },
    created() {
        if (this.$store.getters["auth/check"]) {
            this.$store.dispatch("auth/userAddresses").then(() => {
                this.isLoaded = this.userAddresses.length > 0;
            });
        }
    },
    computed: {
        ...mapGetters({
            cart_items: "cart/getCartItems",
            isCartEmpty: "cart/isCartEmpty",
            isSubscribeApplied: "cart/isSubscribeApplied",
            getSubscribe: "cart/getSubscribe",
            getSubscribeDateDiff: "cart/getSubscribeDateDiff",
            userAddresses: "auth/userAddresses",
            currentLocation: "auth/currentLocation",
            deleveyAddress: "auth/deleveyAddress",
            subTotal: "cart/getSubTotal"
        }),
        getSubscribeDateInFormate() {
            let start = new Date(this.getSubscribe.start);
            const formatter = new Intl.DateTimeFormat("fr", { month: "short" });

            start = {
                day: start.getDate(),
                month: start.getMonth(),
                month_short_name: formatter.format(new Date(start)),
                year: start.getFullYear(),
                ordinal:
                    start.getDate() +
                    (start.getDate() > 0
                        ? ["th", "st", "nd", "rd"][
                              (start.getDate() > 3 && start.getDate() < 21) ||
                              start.getDate() % 10 > 3
                                  ? 0
                                  : start.getDate() % 10
                          ]
                        : "")
            };

            let end = new Date(this.getSubscribe.end);
            end = {
                day: end.getDate(),
                month: end.getMonth(),
                month_short_name: formatter.format(new Date(end)),
                year: end.getFullYear(),
                ordinal:
                    end.getDate() +
                    (end.getDate() > 0
                        ? ["th", "st", "nd", "rd"][
                              (end.getDate() > 3 && end.getDate() < 21) ||
                              end.getDate() % 10 > 3
                                  ? 0
                                  : end.getDate() % 10
                          ]
                        : "")
            };
            return { start, end };
        }
    },
    mounted() {
        if (this.$store.getters["auth/check"]) {
            this.$store.dispatch("cart/getCartItems");
        }
    },
    methods: {
        openSaveAddress() {
            document.getElementById("delivery_address_add").style.width = "37%";

            const mn_wrapper = document.getElementById("main-wrapper");
            mn_wrapper.classList.add("full_body_opacity");
            mn_wrapper.parentElement.classList.add("no_scroll");
        },
        openChangeAddress() {
            document.getElementById("change_address").style.width = "37%";

            const mn_wrapper = document.getElementById("main-wrapper");
            mn_wrapper.classList.add("full_body_opacity");
            mn_wrapper.parentElement.classList.add("no_scroll");
        },
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
/* width */
::-webkit-scrollbar {
    width: 0;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: transparent;
    border-radius: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #ecebeb;
    border-radius: none;
}
.delivery_to {
    h4 {
        font-size: 17px;
        line-height: 1;
        color: #030303;
        font-family: "Averta_Semibold";
    }
    margin-bottom: 15px;
    border-bottom: 1px solid #c8c2c2;
}
.delivery-address {
    margin: 15px 0;
    display: flex;
    .address-icon {
        width: 40px;
        height: 40px;
        border: 1px solid #cfcfcf;
        margin-right: 10px;
        display: flex;
        // align-self: center;
        .fas {
            margin: auto;
        }
    }
}

.delevery-action {
    text-align: right;
    margin-bottom: 10px;
    a {
        margin-left: 10px;
    }
}

.subscription-box {
    h4 {
        font-size: 17px;
        line-height: 1;
        color: #030303;
        font-family: "Averta_Semibold";
    }
    margin-bottom: 15px;
    border-bottom: 1px solid #c8c2c2;
    .subscription-action {
        text-align: right;
        margin-bottom: 10px;
        a {
            margin-left: 10px;
        }
    }
}
.fill_cart_inn .modal_chkbox {
    margin-top: 10px;
    margin-bottom: 10px;
}
.subc_box {
    border-width: 2px;
    border-style: dashed;
}
</style>
