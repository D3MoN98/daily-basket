<template>
  <div>
    <div class="hd_20">
      <h3>Past Order</h3>
    </div>
    <div class="order_otr">
      <ul v-if="past_orders.length > 0">
        <li v-for="order in past_orders" :key="order.id">
          <div class="eachh_order_innr">
            <div class="order_picc">
              <img :src="order.restaurant.image" />
            </div>
            <div class="order_rgtt_prt">
              <div class="order_dess">
                <h5>{{ order.restaurant.name }}</h5>
                <p v-for="order_item in order.order_items" :key="order_item.id">
                  {{ order_item.name }} X {{ order_item.pivot.quantity }}
                </p>
              </div>
              <div class="order_statuss delivered">
                <p>
                  <span>
                    <i class="fas fa-check-circle"></i>
                  </span>
                  {{ order.status }}
                </p>
              </div>
            </div>
          </div>
          <div class="order_datee">
            <ul>
              <li>{{ order.created_at_formatted }}</li>
            </ul>
          </div>
        </li>
      </ul>
      <p v-else>No past orders</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted () {
    this.$store.dispatch('order/pastOrders')
  },
  computed: {
    ...mapGetters({
      past_orders: 'order/getPasttOrders'
    })
  }
}
</script>

<style>
</style>
