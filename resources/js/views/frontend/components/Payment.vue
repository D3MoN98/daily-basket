<template>
  <div class="pay_area">
    <h4>Pay Now</h4>
    <form id="paymentForm" @submit.prevent="payAndOrder">
      <div class="modal_chkbox">
        <!-- <div class="chk_inn">
          <div class="form-check custom_chkbx">
            <input class="form-check-input" type="radio" name="gridRadios" value="Customer" checked />
            <span class="checkmark"></span>
            <label class="form-check-label">Credit/Debit Card</label>
          </div>
          <div class="form-check custom_chkbx">
            <input class="form-check-input" type="radio" name="gridRadios" value="Seller" />
            <span class="checkmark"></span>
            <label class="form-check-label">Wallet</label>
          </div>
          <div class="form-check custom_chkbx">
            <input class="form-check-input" type="radio" name="gridRadios" value="Delivery" />
            <span class="checkmark"></span>
            <label class="form-check-label">COD</label>
          </div>
        </div> -->
      </div>
      <div class="card_field">
        <div
          class="alert alert-danger animate__animated animate__bounceIn"
          v-show="isInValid"
          role="alert"
        >
          <strong>Card details invalid</strong>
        </div>
        <div class="card-js">
          <div class="full_field">
            <input
              type="text"
              class="form-control name"
              id="name"
              :class="{'is-invalid' : nameValidation}"
              v-model="order.card_holder_name"
              placeholder="Name on the card"
            />
          </div>
          <div class="full_field">
            <input
              type="no"
              class="card-number form-control"
              :class="{'is-invalid' : numberValidation}"
              id="number"
              placeholder="Enter card number"
            />
          </div>
          <div class="full_field">
            <div class="echh_fld">
              <input
                class="expiry-month form-control"
                :class="{'is-invalid' : expiryMonthValidation}"
                name="expiry-month"
                v-model="order.card_exp_month"
                id="expiry-month"
              />
            </div>

            <div class="echh_fld">
              <input
                class="expiry-year form-control"
                :class="{'is-invalid' : expiryYearValidation}"
                name="expiry-year"
                v-model="order.card_exp_years"
                id="expiry-year"
              />
            </div>

            <div class="echh_fld">
              <input
                type="text"
                class="form-control cvc"
                id="cvc"
                :class="{'is-invalid' : cvvValidation}"
                v-model="order.card_cvv"
                placeholder="CVV"
              />
            </div>
          </div>
        </div>
        <div class="pay_fld">
          <button type="submit" class="pay_btnn subc_btn" :disabled="submitted">
            Pay {{order.subtotal}} & Order
            <span
              class="fa fa-circle-o-notch fa-spin"
              role="status"
              aria-hidden="true"
              v-show="submitted"
            ></span>
          </button>
        </div>
      </div>
      <input type="hidden" name="address_id" v-model="order.address_id" />
      <input type="hidden" name="subtotal" v-model="order.subtotal" />
    </form>
  </div>
</template>

<script>
import CardJs from 'card-js';
import CardValidator from 'card-validator';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      submitted: false,
      isInValid: false,
      numberValidation: false,
      nameValidation: false,
      cvvValidation: false,
      expiryMonthValidation: false,
      expiryYearValidation: false,
      order: {
        card_holder_name: null,
        card_number: null,
        card_exp_month: null,
        card_exp_years: null,
        card_cvv: null,
        address_id: this.deleveyAddress.id,
        subtotal: this.subTotalAmount,
        subscription: this.subscribeDetails
      }
    };
  },
  props: {
    deleveyAddress: null,
    subTotalAmount: null,
    subscribeDetails: null,
  },
  mounted () {
    $('.card-js').CardJs();
  },
  methods: {
    payAndOrder () {
      this.submitted = true;

      const myCard = $('.card-js');
      const numberValidation = CardValidator.number(myCard.CardJs('cardNumber'));
      const cvvValidation = CardValidator.cvv(myCard.CardJs('cvc'));
      const expiryMonthValidation = CardValidator.expirationMonth(myCard.CardJs('expiryMonth'));
      const expiryYearValidation = CardValidator.expirationYear(myCard.CardJs('expiryYear'));
      const nameValidation = $('#name').val().length !== 0;

      this.numberValidation = !numberValidation.isValid;
      this.cvvValidation = !cvvValidation.isValid;
      this.expiryMonthValidation = !expiryMonthValidation.isValid;
      this.expiryYearValidation = !expiryYearValidation.isValid;
      this.nameValidation = !nameValidation;

      if (!numberValidation.isValid || !cvvValidation.isValid || !expiryMonthValidation.isValid || !expiryYearValidation.isValid || !nameValidation) {
        this.isInValid = true;
        this.submitted = false;
        return false;
      }
      this.isInValid = false;

      this.order.card_exp_month = myCard.CardJs('expiryMonth');
      this.order.card_exp_years = myCard.CardJs('expiryYear');
      this.order.card_number = myCard.CardJs('cardNumber');

      this.$store.dispatch('checkout/placeOrder', this.order).then(() => {
        this.submitted = false;
      });
    },
  },
};
</script>

<style>
</style>
