<template>
  <div class="rst_list">
    <RestaurantCard
      v-show="isLoaded"
      v-for="restaurant in restaurants"
      :restaurant="restaurant"
      :key="restaurant.id"
    />
    <RestaurantPlaceholder v-show="!isLoaded" v-for="index in 6" :key="index+'_plchldr'" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RestaurantCard from './RestaurantCard';
import RestaurantPlaceholder from './RestaurantPlaceholder';

export default {
  data () {
    return {
      isLoaded: false,
    };
  },
  components: {
    RestaurantCard,
    RestaurantPlaceholder,
  },
  mounted () {
    this.$store
      .dispatch('restaurant/trendingRestaurants')
      .then(() => { this.isLoaded = true; });
  },
  computed: {
    ...mapGetters({
      restaurants: 'restaurant/getRestaurants',
    }),
  },
};
</script>

<style>
</style>
