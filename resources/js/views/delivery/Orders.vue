<template>
    <div class="content-body">
        <!-- row -->

        <div class="container">
            <div class="dash_hd_cmn">
                <h3>Delivery for today</h3>
                <div class="dash_hd_rgt">
                    <div
                        class="selct_bxx small_slct"
                        style="width: 200px"
                    ></div>
                </div>
            </div>
            <div class="dash_delivry mt-3">
                <div class="dash_delivry_innr bfr_assign">
                    <ul v-if="orders.length > 0">
                        <li
                            :class="{
                                delivered: order.status === 'delivered'
                            }"
                            v-for="order in orders"
                            :key="order.id"
                        >
                            <div
                                class="delivery_boy_details"
                                v-if="order.delevery_boy !== null"
                            >
                                <div class="boy_det_innr">
                                    <h3>
                                        Order Contact Name:
                                        <span>{{ order.user.name }}</span>
                                    </h3>
                                </div>
                                <h3>
                                    Order Contact No :
                                    <span>{{ order.user.contact_no }}</span>
                                </h3>
                            </div>
                            <div class="dal_innr_otr">
                                <div class="dal_innr">
                                    <div class="deliver_msg">
                                        <h3>
                                            Order ID#
                                            <span>{{ order.id }}</span>
                                        </h3>
                                        <div
                                            class="del_msg_inn"
                                            v-if="order.status === 'delivered'"
                                        >
                                            <i class="fas fa-check-circle"></i>
                                            <p>Delivered</p>
                                        </div>
                                    </div>

                                    <div class="del_add_otr">
                                        <h4>Delivery Address:</h4>
                                        <address>
                                            {{ order.address.address }}
                                        </address>
                                    </div>
                                    <div
                                        class="dal_btnn"
                                        v-if="
                                            order.delevery_boy !== null &&
                                                order.status !== 'delivered'
                                        "
                                    >
                                        <div class="dal_btn_innr">
                                            <a
                                                href="#"
                                                @click.prevent="
                                                    openDeliveryAddress()
                                                "
                                                class="cmnn_btnn del_enable_btn"
                                                role="button"
                                                >Check On Map</a
                                            >
                                        </div>
                                        <div class="dal_btn_innr">
                                            <a
                                                href="#"
                                                class="cmnn_btnn del_enable_btn"
                                                @click.prevent="
                                                    orderDelivered(order.id)
                                                "
                                                role="button"
                                                >Complete delivery</a
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div v-else style="height: 50vh">No deliveries</div>
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            sortBy: "all"
        };
    },
    mounted() {
        this.$store.dispatch("deliveryOrder/orders");
    },
    computed: {
        ...mapGetters({
            orders: "deliveryOrder/getOrders"
        })
    },
    methods: {
        orderDelivered(id) {
            Swal.fire({
                title: "Are you sure you want to change the status?",
                text: "",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#6883b9",
                cancelButtonColor: "#dd6b55",
                confirmButtonText: "Yes"
            }).then(result => {
                if (result.value) {
                    this.$store
                        .dispatch("deliveryOrder/orderDelivered", id)
                        .then(() => {
                            toastr.success(
                                "Order status changed to delivered",
                                "",
                                {
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
                                }
                            );
                        })
                        .catch(error => {
                            toastr.error("Something went wrong", "", {
                                positionClass: "toast-bottom-center",
                                closeButton: true,
                                debug: false,
                                newestOnTop: false,
                                progressBar: false,
                                preventDuplicates: false,
                                onclick: null,
                                timeOut: "5000",
                                extendedTimeOut: "1000",
                                showEasing: "swing",
                                hideEasing: "linear",
                                showMethod: "fadeIn",
                                hideMethod: "fadeOut"
                            });
                        });
                }
            });
        },
        openDeliveryAddress() {
            document.getElementById("delivery_address").style.width = "37%";

            const mn_wrapper = document.getElementById("main-wrapper");
            mn_wrapper.classList.add("full_body_opacity");
            mn_wrapper.parentElement.classList.add("no_scroll");
        }
    }
};
</script>

<style lang="scss" scoped>
.delivered {
    opacity: 0.5;
}

.deliver_msg {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .del_msg_inn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        i {
            font-size: 27px;
            margin-right: 8px;
            color: #48c479 !important;
        }
    }
}
</style>
