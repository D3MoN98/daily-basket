<template>
  <div>
    <div class="hd_20">
      <h3>past Subscribed Order</h3>
    </div>
    <div class="order_otr">
      <ul v-if="past_subscriptions.length > 0">
        <li v-for="subscription in past_subscriptions" :key="subscription.id">
          <div class="eachh_order_innr">
            <div class="order_picc">
              <img :src="subscription.restaurant.image" />
            </div>
            <div class="order_rgtt_prt">
              <div class="order_dess">
                <h5>{{ subscription.restaurant.name }}</h5>
                <p
                  v-for="subscription_item in subscription.subscription_items"
                  :key="subscription_item.id"
                >
                  {{ subscription_item.name }} X
                  {{ subscription_item.pivot.quantity }}
                </p>
              </div>
              <div class="order_statuss upcoming">
                <p>
                  <!-- <span>
                    <i class="fas fa-check-circle"></i>
                  </span> -->
                  {{ subscription.status }}
                </p>
              </div>
            </div>
          </div>
          <div class="order_datee">
            <ul>
              <li>{{ subscription.created_at_formatted }}</li>
            </ul>
          </div>
        </li>
      </ul>
      <p v-else>No Past Subscribed Orders</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted () {
    this.$store.dispatch('subscription/pastSubscriptions')
  },
  computed: {
    ...mapGetters({
      past_subscriptions: 'subscription/getPastSubscriptions'
    })
  }
}
</script>

<style>
</style>
