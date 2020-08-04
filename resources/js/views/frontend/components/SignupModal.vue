<template>
  <div class="modal fade" id="sign_up_modal">
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
              <div class="form-check">
                <input
                  id="customer"
                  class="form-check-input"
                  type="radio"
                  name="sign_as"
                  value="customer"
                  checked
                />
                <label class="form-check-label" for="customer">Customer</label>
              </div>
              <div class="form-check">
                <input
                  id="seller"
                  class="form-check-input"
                  type="radio"
                  name="sign_as"
                  value="seller"
                />
                <label class="form-check-label" for="seller">Seller</label>
              </div>
              <div class="form-check">
                <input
                  id="delivery"
                  class="form-check-input"
                  type="radio"
                  name="sign_as"
                  value="delivery"
                />
                <label class="form-check-label" for="delivery">Delivery</label>
              </div>
            </div>
          </div>

          <CustomerRegisterForm />

          <SellerRegisterForm />

          <DeliveryRegisterForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerRegisterForm from "./CustomerRegisterForm";
import SellerRegisterForm from "./SellerRegisterForm";
import DeliveryRegisterForm from "./DeliveryRegisterForm";

export default {
  components: {
    CustomerRegisterForm,
    SellerRegisterForm,
    DeliveryRegisterForm,
  },

  mounted() {
    $(document).on(
      "change",
      'input[type="radio"][name="sign_as"]',
      function () {
        var sign_as = $(this).val();
        $(".signup-form").hide();
        $(".signup-form").each(function (index) {
          if ($(this).data("signup-form") === sign_as) {
            $(this).show();
          }
        });
      }
    );
  },
};
</script>

<style scoped>
.form-check-label {
  cursor: pointer;
}
</style>
