<template>
    <div id="main-wrapper" class="main_wrapper_class show" :class="uniqueClass">
        <Header />

        <transition name="fade" mode="out-in">
            <router-view @edit-show-ddress="showEditAddress" />
        </transition>

        <AddressSidebar />
        <SaveAddress v-if="this.$store.getters['auth/check']" />
        <ChangeAddress v-if="this.$store.getters['auth/check']" />

        <EditAddress
            v-if="this.$store.getters['auth/check'] && editAddress.show"
            :id="editAddress.id"
            @edit-hide-address="hideEditAddress"
        />

        <LoginModal />

        <SignupModal v-if="!this.$store.getters['auth/check']" />

        <SubscribeModal />

        <FeedBackModal />

        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import Header from "@/views/frontend/components/Header";
import AddressSidebar from "@/views/frontend/components/AddressSidebar";
import SaveAddress from "@/views/frontend/components/SaveAddress";
import EditAddress from "@/views/frontend/components/EditAddress";
import ChangeAddress from "@/views/frontend/components/ChangeAddress";
import SignupModal from "@/views/frontend/components/SignupModal";
import LoginModal from "@/views/frontend/components/LoginModal";
import SubscribeModal from "@/views/frontend/components/SubscribeModal";
import FeedBackModal from "@/views/frontend/components/FeedBackModal";

export default {
    components: {
        Header,
        AddressSidebar,
        SaveAddress,
        EditAddress,
        ChangeAddress,
        SignupModal,
        LoginModal,
        SubscribeModal,
        FeedBackModal
    },
    data() {
        return {
            editAddress: {
                show: false,
                id: null
            }
        };
    },
    computed: {
        isRestaurantSidebar() {
            if (
                _.indexOf(
                    [
                        "restaurants",
                        "restaurants.new",
                        "restaurants.trending",
                        "restaurants.premium"
                    ],
                    this.$route.name
                ) !== -1
            ) {
                return true;
            }
            return false;
        },

        uniqueClass() {
            if (
                _.indexOf(
                    [
                        "restaurants",
                        "restaurants.new",
                        "restaurants.trending",
                        "restaurants.premium"
                    ],
                    this.$route.name
                ) !== -1
            ) {
                return "landing_unique";
            }
            if (_.indexOf(["restaurant_details"], this.$route.name) !== -1) {
                return "left_blue_unique cart_right";
            }
            if (
                _.indexOf(
                    [
                        "profile",
                        "profile.orders",
                        "profile.edit",
                        "profile.addresses",
                        "profile.subscriptions"
                    ],
                    this.$route.name
                ) !== -1
            ) {
                return "profile_unique";
            }
            return null;
        }
    },
    methods: {
        showEditAddress(id) {
            this.editAddress.show = true;
            this.editAddress.id = id;

            const mn_wrapper = document.getElementById("main-wrapper");
            mn_wrapper.classList.add("full_body_opacity");
            mn_wrapper.parentElement.classList.add("no_scroll");
        },
        hideEditAddress() {
            this.editAddress.show = false;
            this.editAddress.id = null;
        }
    }
};
</script>

<style>
.sidebar-style-width {
    width: 37%;
}
</style>
