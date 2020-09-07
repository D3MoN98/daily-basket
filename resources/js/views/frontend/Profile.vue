<template>
  <div class="content-body">
    <!-- row -->
    <div class="container">
      <div class="profile_full_area">
        <div class="plate_bk">
          <img :src="'/images/custom_image/plate_bk.png'" />
        </div>

        <div class="profile_detils">
          <h3 @click="$emit('edit-ddress')">Vikas Gupta</h3>
          <div class="profl_det_inn">
            <h3>8956234789</h3>
            <p>vikasgupta1234@gmail.com</p>
            <h5>
              <router-link to="/profile/edit">EDIT PROFILE</router-link>
            </h5>
          </div>
        </div>
        <div class="profile_related">
          <div class="prfl_lft">
            <ul>
              <router-link tag="li" active-class="actvv" to="/profile/edit" exact>
                <a>Edit Profile</a>
              </router-link>

              <router-link tag="li" active-class="actvv" to="/profile/orders" exact>
                <a>Orders</a>
              </router-link>

              <li>
                <a href="profile_subscriptions.html">Subscriptions</a>
              </li>
              <li>
                <a href="profile_payment.html">Payments</a>
              </li>
              <router-link tag="li" active-class="actvv" to="/profile/addresses" exact>
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
export default {

};
</script>

<style></style>
