<template>
  <div
    class="right_cart"
    :class="{'blank_cart': this.cart_items.length === 0, 'fill_cart': this.cart_items.length > 0}"
  >
    <div class="blank_cart_inn" v-if="this.cart_items.length === 0">
      <h3>Cart Empty</h3>
    </div>
    <div class="fill_cart_inn" v-else-if="this.cart_items.length > 0">
      <h2>Cart</h2>
      <!-- <div class="modal_chkbox">
        <div class="chk_inn">
          <div class="form-check custom_chkbx">
            <input class="form-check-input" type="radio" name="gridRadios" value="Customer" checked />
            <span class="checkmark"></span>
            <label class="form-check-label">Lunch</label>
          </div>
          <div class="form-check custom_chkbx">
            <input class="form-check-input" type="radio" name="gridRadios" value="Seller" />
            <span class="checkmark"></span>
            <label class="form-check-label">Dinner</label>
          </div>
          <div class="form-check custom_chkbx">
            <input class="form-check-input" type="radio" name="gridRadios" value="Delivery" />
            <span class="checkmark"></span>
            <label class="form-check-label">Both</label>
          </div>
        </div>
      </div>
      <div class="subc_box text-center">
        <p>
          <span>
            <i class="fas fa-check-circle"></i>
          </span>3 days subscription applied
        </p>
        <h5>17th May - 19th May</h5>
      </div>-->
      <div class="delivery_food">
        <ul>
          <CartItem v-for="cart_item in cart_items" :cart_item="cart_item" :key="cart_item.rowId" />
        </ul>
      </div>
      <div class="amt_cal">
        <div class="amt_cal_innr">
          <div class="sub_total">
            <h5>Sub-Total</h5>
            <p>{{parseFloat(subTotal).toFixed(2)}}</p>
          </div>
          <div class="tax">
            <h5>Taxes</h5>
            <p>50.00</p>
          </div>
          <div class="other_chrgs">
            <h5>Other Charges</h5>
            <p>50.00</p>
          </div>
        </div>
        <div class="cupon">
          <input type="text" class="form-control" placeholder="Apply Coupon Code" />
        </div>
      </div>
      <div class="amt_cal">
        <div class="amt_cal_innr">
          <div class="total">
            <h5>Total</h5>
            <p>300.00</p>
          </div>
        </div>
      </div>

      <Payment />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/views/frontend/components/CartItem';
import Payment from '@/views/frontend/components/Payment';

export default {
  components: {
    CartItem,
    Payment,
  },
  computed: {
    ...mapGetters({
      cart_items: 'cart/getCartItems',
      isCartEmpty: 'cart/isCartEmpty',
    }),
    subTotal () {
      return this.cart_items.reduce(((acc, value) => acc + Math.floor(value.subtotal)), 0);
    },
  },
  mounted () {
    this.$store.dispatch('cart/getCartItems');
  },

};
</script>

<style scoped>
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
</style>
