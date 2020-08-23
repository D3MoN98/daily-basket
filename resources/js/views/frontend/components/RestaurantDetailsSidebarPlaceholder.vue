<template>
  <div class="side_bar_blue">
    <div class="blue_side_otr">
      <div class="res_image">
        <content-loader
          :width="250"
          :height="250"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="0" y="0" rx="0" ry="0" width="250" height="250" />
        </content-loader>
      </div>
      <div class="res_details">
        <content-loader
          :width="200"
          :height="70"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="20" y="5" rx="5" ry="5" width="160" height="15" />
          <rect x="5" y="40" rx="5" ry="5" width="190" height="10" />
        </content-loader>
      </div>
      <div class="subc_btn_otr">
        <a
          href="#"
          class="subc_btn"
          role="button"
          data-toggle="modal"
          data-dismiss="modal"
          data-target="#subscribe_modal"
        >Subscribe</a>
      </div>
      <div class="we_offer">
        <p>We Offer</p>
        <ul>
          <li>
            <span>
              <i class="fas fa-check-circle"></i>
            </span>Lunch
          </li>
          <li>
            <span>
              <i class="fas fa-check-circle"></i>
            </span>Dinner
          </li>
        </ul>
      </div>
    </div>
    <div class="call_last">
      <a href="tel:+987654321">
        <span>
          <i class="fas fa-phone"></i>
        </span>
        987654321
      </a>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  components: { ContentLoader },
};
</script>

<style>
</style>
