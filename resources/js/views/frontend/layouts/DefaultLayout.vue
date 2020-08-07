<template>
  <div id="main-wrapper" class="main_wrapper_class show">
    <Header />

    <RestaurantSidebar v-show="isRestaurantSidebar" />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <AddressSidebar />

    <LoginModal />

    <SignupModal v-if="!this.$store.getters['auth/check']" />

    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Header from '@/views/frontend/components/Header';
import RestaurantSidebar from '@/views/frontend/components/RestaurantSidebar';
import AddressSidebar from '@/views/frontend/components/AddressSidebar';
import SignupModal from '@/views/frontend/components/SignupModal';
import LoginModal from '@/views/frontend/components/LoginModal';

export default {
  components: {
    Header,
    RestaurantSidebar,
    AddressSidebar,
    SignupModal,
    LoginModal,
  },

  data() {
    return {};
  },

  computed: {
    isRestaurantSidebar() {
      if (
        _.indexOf(
          [
            'restaurants',
            'restaurants.new',
            'restaurants.trending',
            'restaurants.premium',
          ],
          this.$route.name,
        ) !== -1
      ) {
        return true;
      }
        return false;
    },
  },
};
</script>

<style></style>
