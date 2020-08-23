<template>
  <div>
    <RestaurantSidebar />

    <div class="content-body">
      <div class="container">
        <div class="main_area">
          <div class="land1_main">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
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
  </div>
</template>

<script>
import RestaurantSidebar from '@/views/frontend/components/RestaurantSidebar';

export default {
  components: {
    RestaurantSidebar,

  },
};
</script>

<style>
</style>
