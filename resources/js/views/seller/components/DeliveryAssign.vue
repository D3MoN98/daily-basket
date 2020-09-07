<template>
  <div class="modal fade" id="add_del_boy">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content modal_form">
        <div class="modal-header">
          <h5 class="modal-title">Assigning Delivery Boy</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="dlvry_mdl_inn">
            <form @submit.prevent="assignOrder">
              <div class="chk_inn">
                <div
                  class="form-check custom_chkbx"
                  v-for="delivery_boy in delivery_boys"
                  :key="delivery_boy.id"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    :value="delivery_boy.id"
                    v-model="user_id"
                  />
                  <span class="checkmark shd_2"></span>
                  <div class="form-check-label">
                    <h4>{{delivery_boy.name}}</h4>
                    <p>{{delivery_boy.contact_no}}</p>
                  </div>
                </div>
              </div>
              <div class="frm_btm">
                <input type="submit" value="Okay" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      isLoaded: false,
      user_id: null
    }
  },
  props: {
    order_id: null
  },
  mounted () {
    this.$store.dispatch('sellerOrder/deliveryBoys').then(() => {
      this.isLoaded = true;
    });
  },
  computed: {
    ...mapGetters({ delivery_boys: 'sellerOrder/getDeliveryBoys' })
  },
  methods: {
    assignOrder () {
      this.$store.dispatch('sellerOrder/assignOrder', { id: this.order_id, user_id: this.user_id }).then(() => {
        toastr.success('Delevery boy assigned', '', {
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

        $('#add_del_boy').modal('hide');
      })
    }
  }
}
</script>

<style>
</style>
