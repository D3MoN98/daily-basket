<template>
    <div class="content-body">
        <!-- row -->

        <div class="container">
            <div class="dash_hd_cmn">
                <h3>
                    ABC tiffin service<span class=""
                        >Dimond Hourver Road Khanti Park</span
                    >
                </h3>
                <!-- <div class="selct_bxx small_slct">
                    <select id="mounth">
                        <option value="hide">-- All --</option>
                        <option value="a" rel="icon-temperature"
                            >Individuals</option
                        >
                        <option value="b">Unsubcribes</option>
                        <option value="c">subcribes</option>
                    </select>
                </div> -->
            </div>
            <div class="kitchen_otr">
                <div class="innr_hdr">
                    <div class="innr_hdr_in">
                        <h3>Kitchen Service for today</h3>
                    </div>
                    <div class="hdr_mul_sel">
                        <select
                            id="mounth"
                            class="form-control form-control-sm"
                            v-model="sortBy"
                        >
                            <option value="all">All</option>
                            <option value="orders">Individuals</option>
                            <option value="subcribes">subcribes</option>
                        </select>
                    </div>
                </div>
                <div class="kitchen_order">
                    <div
                        v-if="
                            isLoaded &&
                                (sortBy == 'all' || sortBy == 'subcribes')
                        "
                    >
                        <SubscriptionAccordionItem
                            v-for="subscription in subscriptions"
                            :key="subscription.id"
                            :subscription="subscription"
                        />
                        <div v-if="subscriptions.length === 0">
                            No Subscribed Orders Yet
                        </div>
                    </div>
                    <div
                        v-if="
                            isLoaded && (sortBy == 'all' || sortBy == 'orders')
                        "
                    >
                        <OrderAccordionItem
                            v-for="order in orders"
                            :key="order.id"
                            :order="order"
                        />
                        <div v-if="orders.length === 0">
                            No Orders Yet
                        </div>
                    </div>
                </div>
            </div>
            <div class="custom_footer">
                <p>
                    Copyright © Designed &amp; Developed by
                    <a href="" target="_blank">Sutanu & Sudipta</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import SubscriptionAccordionItem from "./components/SubscriptionAccordionItem";
import OrderAccordionItem from "./components/OrderAccordionItem";

export default {
    components: {
        SubscriptionAccordionItem,
        OrderAccordionItem
    },
    data() {
        return {
            isLoaded: false,
            sortBy: "all"
        };
    },
    mounted() {
        this.$store.dispatch("kitchenSubscription/subscriptions").then(() => {
            this.$store.dispatch("kitchenOrder/orders").then(() => {
                this.isLoaded = true;
            });
        });
    },
    computed: {
        ...mapGetters({
            orders: "kitchenOrder/getOrders",
            subscriptions: "kitchenSubscription/getSubscriptions"
        })
    }
};
</script>
