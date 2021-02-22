<template>
    <div class="content-body dash_menu">
        <!-- row -->
        <div class="container">
            <div v-if="isLoaded">
                <RestaurantDetails
                    :restaurant="restaurant"
                    :cuisines="cuisines"
                />
            </div>

            <div class="menu_btm iinr_side_pad">
                <div class="menu_btm_hdd fnt_18_smb">
                    <h3>
                        <a href @click.prevent="toggleMenuForm">Create Item</a>
                    </h3>
                    <!-- <div class="selct_bxx small_slct">
            <select id="mounth">
              <option value="hide">-- Secect --</option>
              <option value="a" rel="icon-temperature">All</option>
              <option value="b">Demo 1</option>
              <option value="c">Demo 2</option>
            </select>
          </div> -->
                </div>

                <MenuForm v-if="showMenuForm" />

                <div class="custom_footer iinr_side_pad">
                    <p>
                        Copyright © Designed &amp; Developed by
                        <a href target="_blank">Sutanu & Sudipta</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RestaurantDetails from "../seller/components/RestaurantDetails";
import MenuForm from "../seller/components/MenuForm";
import { mapGetters } from "vuex";

export default {
    components: {
        RestaurantDetails,
        MenuForm
    },
    data() {
        return {
            isLoaded: false,
            showMenuForm: false
        };
    },
    created() {
        this.$store.dispatch("sellerRestaurant/restaurant").then(() => {
            this.$store.dispatch("sellerRestaurant/cuisines").then(() => {
                this.isLoaded = true;
            });
        });
    },
    computed: {
        ...mapGetters({
            restaurant: "sellerRestaurant/getRestaurant",
            cuisines: "sellerRestaurant/getCuisines"
        })
    },
    methods: {
        toggleMenuForm() {
            this.showMenuForm = !this.showMenuForm;
        }
    }
};
</script>

<style></style>
