<template>
  <div class="side_bar_blue">
    <div class="blue_side_otr">
      <div class="res_image">
        <img :src="restaurant.image" />
      </div>
      <div class="res_details">
        <h3>{{restaurant.name}}</h3>
        <address>{{restaurant.address.address}}</address>
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
      <a href="tel:+">
        <span>
          <i class="fas fa-phone"></i>
        </span>
        {{restaurant.contact_no}}
      </a>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    restaurant: null,
  },
};
</script>

<style>
</style>
