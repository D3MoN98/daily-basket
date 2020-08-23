<template>
  <router-link :to="{ path: '/restaurant/' + restaurant.slug }" class="ech_res">
    <div class="ech_res_innr">
      <div class="res_pic">
        <!--Basic Size 231px*146px-->
        <img :src="restaurant.image" alt />
      </div>
      <div class="res_det">
        <h3>{{restaurant.name}}</h3>
        <div class="ret_price">
          <div class="rtng">
            <i class="fas fa-star"></i>
            <p>6.7</p>
          </div>
          <div class="prc">
            <p>
              <span>300</span> for two
            </p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    restaurant: {},
  },
};
</script>

<style>
</style>
