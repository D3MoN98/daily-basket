<template>
    <div class="content-body">
        <!-- row -->
        <div class="container">
            <div class="profile_full_area">
                <div class="plate_bk">
                    <img :src="'/images/custom_image/plate_bk.png'" />
                </div>

                <div class="profile_detils">
                    <h3 @click="$emit('edit-ddress')">{{ user.name }}</h3>
                    <div class="profl_det_inn">
                        <h3>{{ user.contact_no }}</h3>
                        <p>{{ user.email }}</p>
                        <!-- <h5>
              <router-link to="/profile/edit">EDIT PROFILE</router-link>
            </h5> -->
                    </div>
                </div>
                <div class="profile_related">
                    <div class="prfl_lft">
                        <ul>
                            <router-link
                                tag="li"
                                active-class="actvv"
                                to="/profile/edit"
                                exact
                            >
                                <a>Edit Profile</a>
                            </router-link>

                            <router-link
                                tag="li"
                                active-class="actvv"
                                to="/profile/orders"
                                exact
                            >
                                <a>Orders</a>
                            </router-link>

                            <router-link
                                tag="li"
                                active-class="actvv"
                                to="/profile/subscriptions"
                                exact
                            >
                                <a>Subscriptions</a>
                            </router-link>

                            <li>
                                <router-link
                                    tag="li"
                                    active-class="actvv"
                                    to="/profile/payment"
                                    exact
                                >
                                    <a>Payments</a>
                                </router-link>
                            </li>
                            <router-link
                                tag="li"
                                active-class="actvv"
                                to="/profile/addresses"
                                exact
                            >
                                <a>Addresses</a>
                            </router-link>
                        </ul>

                        <div class="lftt_img_bkk">
                            <img :src="'/images/custom_image/left_bk.png'" />
                        </div>
                    </div>

                    <transition name="fade" mode="out-in">
                        <router-view v-on="$listeners"></router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters({
            user: "auth/user"
        })
    }
};
</script>

<style></style>
