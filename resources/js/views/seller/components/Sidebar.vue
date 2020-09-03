<template>
  <div class="quixnav fixed_sidebar">
    <div class="quixnav-scroll">
      <ul class="metismenu" id="menu">
        <li class="nav-label">DASHBOARD</li>
        <li>
          <router-link to="/seller" class="has-arrow" aria-expanded="false">
            <i class="fas fa-tachometer-alt"></i>
            <span class="nav-text">Administration</span>
          </router-link>
          <ul aria-expanded="false">
            <li>
              <a href="javascript:void()" class="select_link">Activity</a>
            </li>
            <li>
              <a href="javascript:void()">Customers</a>
            </li>
            <li>
              <a href="javascript:void()">Collections</a>
            </li>
          </ul>
        </li>

        <li>
          <a href="javascript:void()" aria-expanded="false">
            <i class="fas fa-clipboard-list"></i>
            <span class="nav-text">Order Management</span>
          </a>
        </li>
        <li>
          <router-link to="/seller/menu" aria-expanded="false">
            <i class="fas fa-pizza-slice"></i>
            <span class="nav-text">Menu</span>
          </router-link>
        </li>

        <li>
          <a href="javascript:void()" aria-expanded="false">
            <i class="kithen_image">
              <img src="images/custom_image/kitchen_blue.png" alt="Pic-not-found" />
            </i>
            <span class="nav-text">Kitchen</span>
          </a>
        </li>
        <li>
          <a href="javascript:void()" aria-expanded="false">
            <i class="fas fa-shipping-fast"></i>
            <span class="nav-text">Delivery</span>
          </a>
        </li>
        <li>
          <a href="javascript:void()" aria-expanded="false">
            <i class="far fa-chart-bar"></i>
            <span class="nav-text">Finance</span>
          </a>
        </li>
        <li>
          <a href="javascript:void()" aria-expanded="false">
            <i class="fas fa-comment-dots"></i>
            <span class="nav-text">Customer Feedback</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>
</style>
