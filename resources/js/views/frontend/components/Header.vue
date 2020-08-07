<template>
  <header>
    <div class="full_hdr_bk landing_full_hdr">
      <div class="nav-header">
        <div class="nav_header_innr">
          <router-link to="/" class="brand-logo">
            <span class="logo-compact">Daily Basket</span>
          </router-link>

          <div class="nav-control">
            <div class="hamburger">
              <span class="toggle-icon">
                <i class="icon-menu"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="header">
        <div class="header-content">
          <nav class="navbar navbar-expand">
            <div class="collapse navbar-collapse justify-content-between">
              <div class="header-left">
                <div class="hdr_del">
                  <a onclick="openNav()">
                    Delivery to
                    <span class="hdr_plc">Home</span>
                    <span class="hdr_add">Sbi staff quater,Chiku..</span>
                  </a>
                </div>
              </div>
              <ul class="navbar-nav header-right">
                <li class="nav-item menu_long_gap">
                  <router-link to="/restaurants" class="nav-link">
                    <i class="fas fa-search"></i>
                    <span class="nav_txt">Search</span>
                  </router-link>
                </li>
                <li class="nav-item menu_long_gap">
                  <a class="nav-link" href="#" role="button">
                    <i class="far fa-life-ring"></i>
                    <span class="nav_txt">Help</span>
                  </a>
                </li>

                <li class="nav-item menu_long_gap" v-if="!this.$store.getters['auth/check']">
                  <a
                    class="nav-link"
                    href="#"
                    role="button"
                    data-toggle="modal"
                    data-dismiss="modal"
                    data-target="#sign_up_modal"
                  >
                    <i class="far fa-user-circle"></i>
                    <span class="nav_txt">Sign-Up</span>
                  </a>
                </li>

                <li
                  class="nav-item dropdown menu_long_gap after_login_profile"
                  v-if="this.$store.getters['auth/check']"
                >
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="far fa-user-circle"></i>
                    <span class="nav_txt">
                      {{
                      _.split(
                      this.$store.getters["auth/user"]
                      .name,
                      " "
                      )[0]
                      }}
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a href="#!" class="dropdown-item">
                      <span>My profile</span>
                    </a>
                    <a href="#!" class="dropdown-item">
                      <span>My Order</span>
                    </a>
                    <a @click.prevent="logout" class="dropdown-item">
                      <span>Logout</span>
                    </a>
                  </div>
                </li>

                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    role="button"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#log_in_modal"
                  >
                    <i class="fas fa-shopping-cart"></i>
                    <span class="nav_txt">Cart</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>

<style></style>
