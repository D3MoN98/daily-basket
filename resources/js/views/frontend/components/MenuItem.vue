<template>
    <li>
        <div class="food_image">
            <img :src="'/images/download.jpeg'" alt />
        </div>
        <div class="food_details">
            <div class="food_desp">
                <h5>{{ menu_item.name }}</h5>
                <p>{{ menu_item.description }}</p>
            </div>
            <div class="food_qty">
                <button
                    type="button"
                    v-if="!cart_item"
                    class="btn btn-primary animate__animated animate__fadeIn"
                    @click="addToCart(menu_item.id, 1)"
                >
                    Add
                </button>
                <div
                    v-else
                    class="qty_number animate__animated animate__fadeIn"
                >
                    <span
                        class="minus"
                        @click="addToCart(menu_item.id, -1, cart_item.rowId)"
                        >-</span
                    >
                    <input type="text" :value="cart_item.qty" disabled />
                    <span
                        class="plus"
                        @click="addToCart(menu_item.id, 1, cart_item.rowId)"
                        >+</span
                    >
                </div>
                <p>{{ parseFloat(menu_item.price).toFixed(2) }}</p>
            </div>
        </div>
    </li>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        menu_item: null
    },
    computed: {
        ...mapGetters({
            cart_items: "cart/getCartItems"
        }),
        cart_item() {
            return this.cart_items.find(
                item => item.id === this.menu_item.id,
                this.menu_item.id
            );
        }
    },
    methods: {
        addToCart(id, qty, rowId = null) {
            if (!this.$store.getters["auth/check"]) {
                $("#log_in_modal").modal("show");
                return false;
            }

            const newQty =
                this.cart_item === undefined ? qty : this.cart_item.qty + qty;

            if (newQty <= 0) {
                this.$store.dispatch("cart/removeFormCart", rowId);
            } else if (newQty > 0) {
                this.$store.dispatch("cart/addToCart", { id, qty, rowId });
            }
        }
    }
};
</script>

<style></style>
