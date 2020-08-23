<template>
  <div class="modal fade" ref="my-modal" id="sign_up_modal">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content modal_form">
        <div class="modal-header">
          <h5 class="modal-title">Sign Up</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="welcome_msg">
            <h3>Welcome Dailybasket</h3>
          </div>
          <div class="modal_chkbox">
            <p>You Are</p>
            <div class="chk_inn">
              <div class="form-check custom_chkbx">
                <input
                  id="customerFormRadio"
                  class="form-check-input"
                  type="radio"
                  value="customer"
                  name="sign_up_form_radio"
                  @change="changeForm"
                  checked
                />
                <span class="checkmark"></span>
                <label class="form-check-label" for="customerFormRadio">Customer</label>
              </div>
              <div class="form-check custom_chkbx">
                <input
                  id="sellerFormRadio"
                  class="form-check-input"
                  type="radio"
                  value="seller"
                  name="sign_up_form_radio"
                  @change="changeForm"
                />
                <span class="checkmark"></span>
                <label class="form-check-label" for="sellerFormRadio">Seller</label>
              </div>
              <div class="form-check custom_chkbx">
                <input
                  id="deliveryFormRadio"
                  class="form-check-input"
                  type="radio"
                  value="delivery"
                  name="sign_up_form_radio"
                  @change="changeForm"
                />
                <span class="checkmark"></span>
                <label class="form-check-label" for="deliveryFormRadio">Delivery</label>
              </div>
            </div>
          </div>

          <CustomerRegisterForm v-show="registerFormShow=='customer'" />

          <SellerRegisterForm v-show="registerFormShow=='seller'" />

          <DeliveryRegisterForm v-show="registerFormShow=='delivery'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerRegisterForm from './CustomerRegisterForm';
import SellerRegisterForm from './SellerRegisterForm';
import DeliveryRegisterForm from './DeliveryRegisterForm';

export default {
  data () {
    return {
      registerFormShow: 'customer',
    };
  },
  components: {
    CustomerRegisterForm,
    SellerRegisterForm,
    DeliveryRegisterForm,
  },
  methods: {
    changeForm ($e) {
      this.registerFormShow = $e.target.value;
    },
  },
};
</script>

<style scoped>
.form-check-label {
  cursor: pointer;
}
</style>
