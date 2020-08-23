<template>
  <li>
    <div class="food_image">
      <content-loader
        :width="100"
        :height="100"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="0" rx="0" ry="0" width="100" height="100" />
      </content-loader>
    </div>
    <div class="food_details">
      <div class="food_desp">
        <h5>
          <content-loader
            :width="200"
            :height="10"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="150" height="10" />
          </content-loader>
        </h5>
        <p>
          <content-loader
            :width="200"
            :height="20"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="200" height="5" />
            <rect x="0" y="10" rx="5" ry="5" width="100" height="5" />
          </content-loader>
        </p>
      </div>
      <div class="food_qty">
        <div class="qty_number" style="width: 80px;">
          <content-loader
            :width="80"
            :height="30"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="0" ry="0" width="80" height="30" />
          </content-loader>
        </div>
        <p>
          <content-loader
            :width="50"
            :height="10"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="50" height="10" />
          </content-loader>
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  components: {
    ContentLoader,
  },
};
</script>

<style>
</style>
