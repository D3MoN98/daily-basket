<template>
  <li>
    <h3>{{cart_item.name}}</h3>
    <div class="food_qty">
      <div class="qty_number">
        <span class="minus" @click="addToCart(cart_item.id, - 1, cart_item.rowId)">-</span>
        <input type="text" :value="cart_item.qty" disabled />
        <span class="plus" @click="addToCart(cart_item.id, 1, cart_item.rowId)">+</span>
      </div>
      <p>{{cart_item.subtotal}}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    cart_item: null,
  },
  methods: {
    addToCart (id, qty, rowId = null) {
      if (!this.$store.getters['auth/check']) {
        $('#log_in_modal').modal('show');
      }

      const newQty = this.cart_item.qty !== undefined ? this.cart_item.qty + qty : qty;

      if (newQty <= 0) {
        this.$store.dispatch('cart/removeFormCart', rowId);
      } else if (newQty > 0) {
        this.$store.dispatch('cart/addToCart', { id, qty, rowId });
      }
    },
  },
};
</script>

<style>
</style>
