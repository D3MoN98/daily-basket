<template>
    <div>
        <div class="hd_20">
            <h3>Current Order</h3>
        </div>
        <div class="order_otr">
            <ul v-if="current_orders.length > 0">
                <li v-for="order in current_orders" :key="order.id">
                    <div class="eachh_order_innr">
                        <div class="order_picc">
                            <img :src="order.restaurant.image" />
                        </div>
                        <div class="order_rgtt_prt">
                            <div class="order_dess">
                                <h5>{{ order.restaurant.name }}</h5>
                                <p
                                    v-for="order_item in order.order_items"
                                    :key="order_item.id"
                                >
                                    {{ order_item.name }} X
                                    {{ order_item.pivot.quantity }}
                                </p>
                            </div>
                            <!-- <div class="order_statuss delivered">
                <p>
                  <span>
                    <i class="fas fa-check-circle"></i>
                  </span>
                  {{ order.status }}
                </p>
              </div> -->
                        </div>
                    </div>
                    <div class="order_datee">
                        <ul>
                            <li>{{ order.created_at_formatted }}</li>
                        </ul>
                    </div>
                    <div class="crnt_status_bar">
                        <ul>
                            <li
                                :class="{
                                    active_part:
                                        _.indexOf(
                                            [
                                                'accepted',
                                                'in_progress',
                                                'delivered'
                                            ],
                                            order.status
                                        ) !== -1
                                }"
                            >
                                <span>
                                    <i class="fas fa-check-circle"></i> </span
                                >Accepted
                            </li>
                            <li
                                :class="{
                                    active_part:
                                        _.indexOf(
                                            [
                                                'in_progress',
                                                'prepared',
                                                'delivered'
                                            ],
                                            order.status
                                        ) !== -1
                                }"
                            >
                                <span>
                                    <i class="fas fa-check-circle"></i> </span
                                >In Progress
                            </li>
                            <li
                                :class="{
                                    active_part:
                                        _.indexOf(
                                            ['delivered', 'prepared'],
                                            order.status
                                        ) !== -1
                                }"
                            >
                                <span>
                                    <i class="fas fa-check-circle"></i> </span
                                >Out for delivery
                            </li>
                            <li
                                :class="{
                                    active_part: order.status == 'delivered'
                                }"
                            >
                                <span>
                                    <i class="fas fa-check-circle"></i> </span
                                >Delivered
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <p v-else>No Current Orders</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    mounted() {
        this.$store.dispatch("order/currentOrders");
    },
    computed: {
        ...mapGetters({
            current_orders: "order/getCurrentOrders"
        })
    }
};
</script>

<style></style>
