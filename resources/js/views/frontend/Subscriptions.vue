<template>
  <div class="prfl_rgt prf_subscrip">
    <div class="row">
      <div class="col-md-6">
        <div class="hd_20">
          <h3>Subscription</h3>
        </div>
        <div
          v-for="subscription in current_subscriptions"
          :key="subscription.id"
        >
          <div class="prf_subscrip_inn">
            <div class="fnt_16">
              <h3>
                Your
                {{ dateDiff(subscription.started_at, subscription.expired_at) }}
                days value subscription will end on
                <span>{{
                  new Date(subscription.expired_at).toDateString()
                }}</span>
              </h3>
            </div>

            <h5><a href=""></a></h5>

            <div class="date_subcc">
              <p>
                Start Date :
                <span>{{
                  new Date(subscription.started_at).toDateString()
                }}</span>
              </p>
              <p>
                End Date :
                <span>{{
                  new Date(subscription.expired_at).toDateString()
                }}</span>
              </p>
            </div>

            <div class="subccc_bttn">
              <a href="#" class="cmnn_btnn">Renew It</a>
              <!-- <a href="#" class="cmnn_btnn">Try another one</a> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 subc_rggt">
        <div class="hd_20">
          <h3>Subscription</h3>
        </div>
        <div class="cus_date_pic"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted () {
    this.$store.dispatch('subscription/currentSubscriptions')
  },
  computed: {
    ...mapGetters({
      current_subscriptions: 'subscription/getCurrentSubscriptions'
    }),

  },
  methods: {
    dateDiff (start, end) {
      const date1 = new Date(start);
      const date2 = new Date(end);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays + 1;
    }
  }
}
</script>

<style>
</style>
