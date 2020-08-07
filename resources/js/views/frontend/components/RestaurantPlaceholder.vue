<template>
  <div class="ech_res">
    <div class="ech_res_innr">
      <content-loader
        :width="233"
        :height="213"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="0" rx="5" ry="5" width="233" height="146" />
        <rect x="0" y="165" rx="5" ry="5" width="185" height="20" />
        <rect x="0" y="195" rx="5" ry="5" width="35" height="15" />
        <rect x="60" y="195" rx="5" ry="5" width="65" height="15" />
      </content-loader>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  components: {
    ContentLoader,
  },
};
</script>

<style>
</style>
