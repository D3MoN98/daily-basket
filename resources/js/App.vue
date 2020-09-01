<template>
  <component :is="this.$route.meta.layout || 'div'">
    <router-view></router-view>
  </component>
</template>

<script>
export default {
  computed: {
    _ () {
      return _;
    },
  },
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish();
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      //  start the progress bar
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach(() => {
      //  finish the progress bar
      this.$Progress.finish();
    });
  },
};
</script>

<style lang="scss">
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
  opacity: 0;
}

/* sudipta */
.form-control {
  background-color: transparent;
  border: 1px solid #c8c8c8;
  border-radius: 2px;
}
.form-control:focus {
  border-color: #6883b9;
}
.btn-primary {
  color: #ffffff;
  background: #6883b9;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: all 0.4s;
  &:hover,
  &:focus {
    color: #ffffff !important;
    background: #6883b9 !important;
    border-color: transparent !important;
  }
}
</style>
