<template>
  <div class="pay_area">
    <h4>Pay Now</h4>
    <form id="paymentForm" @submit="order">
      <div class="modal_chkbox">
        <div class="chk_inn">
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
        </div>
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
                id="expiry-month"
              />
            </div>

            <div class="echh_fld">
              <input
                class="expiry-year form-control"
                :class="{'is-invalid' : expiryYearValidation}"
                name="expiry-year"
                id="expiry-year"
              />
            </div>

            <div class="echh_fld">
              <input
                type="text"
                class="form-control cvc"
                id="cvc"
                :class="{'is-invalid' : cvvValidation}"
                placeholder="CVV"
              />
            </div>
          </div>
        </div>
        <div class="pay_fld">
          <input type="submit" class="pay_btnn subc_btn" value="PAY" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CardJs from 'card-js';
import CardValidator from 'card-validator';

export default {
  data () {
    return {
      isInValid: false,
      numberValidation: false,
      nameValidation: false,
      cvvValidation: false,
      expiryMonthValidation: false,
      expiryYearValidation: false,
    };
  },
  mounted () {
    $('.card-js').CardJs();
  },
  methods: {
    order (e) {
      e.preventDefault();
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
        return false;
      }
      this.isInValid = false;

      console.log('dasd');
    },
  },
};
</script>

<style>
</style>
