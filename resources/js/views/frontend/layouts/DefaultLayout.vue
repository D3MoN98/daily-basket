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

        <LoginModal v-if="!this.$store.getters['auth/check']" />

        <ForgetPassword v-if="!this.$store.getters['auth/check']" />

        <ResetPassword
            v-if="reset_password.token != null"
            :reset_password="reset_password"
        />

        <SignupModal v-if="!this.$store.getters['auth/check']" />

        <SubscribeModal />

        <FeedBackModal v-if="showFeedback" />

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
import ForgetPassword from "@/views/frontend/components/ForgetPassword";
import ResetPassword from "@/views/frontend/components/ResetPassword";

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
        FeedBackModal,
        ForgetPassword,
        ResetPassword
    },
    data() {
        return {
            editAddress: {
                show: false,
                id: null
            },
            showFeedback: false,
            reset_password: {
                email: null,
                token: null
            }
        };
    },
    mounted() {
        if (this.$store.getters["auth/check"]) {
            this.$store.dispatch("feedback/getOrderId").then(() => {
                if (this.$store.getters["feedback/order_id"] !== null) {
                    this.showFeedback = true;
                }
            });
        }

        if (this.$route.name == "reset.password") {
            this.reset_password.token = this.$route.query.token;
            this.reset_password.email = this.$route.query.email;

            setTimeout(() => {
                $("#reset_password_modal").modal("show");
            }, 2000);
        }
    },
    computed: {
        // isRestaurantSidebar() {
        //     if (
        //         _.indexOf(
        //             [
        //                 "restaurants",
        //                 "restaurants.new",
        //                 "restaurants.trending",
        //                 "restaurants.premium",
        //                 "reset.password"
        //             ],
        //             this.$route.name
        //         ) !== -1
        //     ) {
        //         return true;
        //     }
        //     return false;
        // },

        uniqueClass() {
            if (
                _.indexOf(
                    [
                        "restaurants",
                        "restaurants.new",
                        "restaurants.trending",
                        "restaurants.premium",
                        "reset.password"
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
