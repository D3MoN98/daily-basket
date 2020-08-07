<template>
  <div class="side_bar_wht">
    <div class="lft_side_innr1">
      <ul>
        <li>
          <router-link :to="{name: 'restaurants.trending'}" active-class="active">
            <div class="rnd_icon">
              <div class="rnd_icon_img">
                <img :src="'/images/custom_image/tranding.png'" alt />
              </div>
            </div>
            <div class="side_txt1">
              <h3>Trending</h3>
              <h5>{{restaurant_counts.trending}} Options</h5>
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'restaurants.new'}" active-class="active">
            <div class="rnd_icon">
              <div class="rnd_icon_img">
                <img :src="'/images/custom_image/what-new.png'" alt />
              </div>
            </div>
            <div class="side_txt1">
              <h3>What's New</h3>
              <h5>{{restaurant_counts.new}} Options</h5>
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'restaurants.premium'}" active-class="active">
            <div class="rnd_icon">
              <div class="rnd_icon_img">
                <img :src="'/images/custom_image/premium.png'" alt />
              </div>
            </div>
            <div class="side_txt1">
              <h3>Premium</h3>
              <h5>{{restaurant_counts.premium}} Options</h5>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted () {
    this.$store.dispatch('restaurant/restaurantCounts');
  },
  computed: {
    ...mapGetters({
      restaurant_counts: 'restaurant/getRestaurantCounts',
    }),
  },
};
</script>

<style>
</style>
