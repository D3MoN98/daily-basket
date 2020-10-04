<template>
  <div class="quixnav fixed_sidebar">
    <div class="quixnav-scroll">
      <ul class="metismenu" id="menu">
        <li class="nav-label">DASHBOARD</li>
        <li>
          <router-link to="/admin" class="has-arrow" aria-expanded="false">
            <i class="fas fa-tachometer-alt"></i>
            <span class="nav-text">Administration</span>
          </router-link>
          <ul aria-expanded="false">
            <li>
              <a href="javascript:void()">Activity</a>
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
          <router-link to="/admin/restaurants" aria-expanded="false" active-class="select_link">
            <i class="fas fa-table"></i>
            <span class="nav-text">Restaurants</span>
          </router-link>
        </li>

        <!-- <li>
          <a href="javascript:void()" aria-expanded="false">
            <i class="fas fa-clipboard-list"></i>
            <span class="nav-text">Customers</span>
          </a>
        </li>-->
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
