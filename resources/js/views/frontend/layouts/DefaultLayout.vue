<template>
  <div id="main-wrapper" class="main_wrapper_class show" :class="uniqueClass">
    <Header />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <AddressSidebar />
    <SaveAddress v-if="this.$store.getters['auth/check']" />
    <ChangeAddress v-if="this.$store.getters['auth/check']" />

    <LoginModal />

    <SignupModal v-if="!this.$store.getters['auth/check']" />

    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Header from '@/views/frontend/components/Header';
import AddressSidebar from '@/views/frontend/components/AddressSidebar';
import SaveAddress from '@/views/frontend/components/SaveAddress';
import ChangeAddress from '@/views/frontend/components/ChangeAddress';
import SignupModal from '@/views/frontend/components/SignupModal';
import LoginModal from '@/views/frontend/components/LoginModal';

export default {
  components: {
    Header,
    AddressSidebar,
    SaveAddress,
    ChangeAddress,
    SignupModal,
    LoginModal,
  },

  data () {
    return {};
  },

  computed: {
    isRestaurantSidebar () {
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

    uniqueClass () {
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
        return 'landing_unique';
      } if (
        _.indexOf(
          [
            'restaurant_details',
          ],
          this.$route.name,
        ) !== -1
      ) {
        return 'left_blue_unique cart_right';
      }
      return null;
    },
  },
};
</script>

<style></style>
