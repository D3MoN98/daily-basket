<template>
  <div id="change_address" class="sidenav delivery_sidebar">
    <a href="javascript:void(0)" class="closebtn" @click.prevent="closeChageAddress()">&times;</a>
    <div class="address_bar" v-if="userAddresses !== null">
      <h4>Change Delivery Address</h4>
      <div class="saved_address" v-if="userAddresses.length === 0"></div>
      <div class="saved_address" v-else>
        <div
          class="address_inn"
          @click="setDeleveryAddress(address)"
          v-for="address in userAddresses"
          :key="address.id"
        >
          <h5>
            <i class="fas fa-home" v-if="address.type == 'home'"></i>
            <i class="fas fa-briefcase" v-else-if="address.type == 'work'"></i>
            <i class="fas fa-map-marker-alt" v-else></i>
            {{_.startCase(_.toLower(address.type))}}
          </h5>
          <address>{{address.address}}</address>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  required,
} from 'vuelidate/lib/validators';

export default {
  data () {
    return {

    };
  },
  computed: {
    ...mapGetters({
      userAddresses: 'auth/userAddresses',
    }),
  },
  mounted () {

  },
  methods: {
    setDeleveryAddress (address) {
      this.$store.dispatch('auth/setDeleveryAddress', address).then(() => {
        this.closeChageAddress();
        toastr.success('Deliver address is changed', '', {
          positionClass: 'toast-bottom-center',
          timeOut: 1500,
          closeButton: !0,
          debug: !1,
          newestOnTop: !0,
          progressBar: !0,
          preventDuplicates: !0,
          onclick: null,
          showDuration: '300',
          hideDuration: '1000',
          extendedTimeOut: '1000',
          showEasing: 'swing',
          hideEasing: 'linear',
          showMethod: 'fadeIn',
          hideMethod: 'fadeOut',
          tapToDismiss: !1,
        });
      });
    },
    closeChageAddress () {
      document.getElementById('change_address').style.width = '0';
      const mn_wrapper = document.getElementById('main-wrapper');
      mn_wrapper.classList.remove('full_body_opacity');
      mn_wrapper.parentElement.classList.remove('no_scroll');
    },
  },

};
</script>

<style lang="scss" scoped>
/* width */
::-webkit-scrollbar {
  width: 0;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ecebeb;
  border-radius: none;
}

.address_bar h4 {
  font-family: "Averta_Semibold";
  font-weight: normal;
  color: #6883b9;
  padding: 10px 0;
  margin-bottom: 20px;
  padding: 20px 0;
  margin-bottom: 10px;
}
.saved_address {
  padding-right: 50px;
  .address_inn {
    cursor: pointer;
    transition: all 0.1s ease-in-out 0.1s;
    transform: scale(1);
    &:hover {
      box-shadow: 0 0.125em 0 rgba(0, 0, 0, 0.075) !important;
      transform: scale(1.05);
    }
  }
}
</style>
