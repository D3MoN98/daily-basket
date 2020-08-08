<template>
  <header>
    <div class="full_hdr_bk fff_bk">
      <!--**********************************
            Nav header start
      ***********************************-->
      <div class="nav-header">
        <div class="nav_header_innr">
          <a href="index.html" class="brand-logo">
            <span class="logo-abbr">DB</span>
            <span class="logo-compact">Daily Basket</span>
            <span class="brand-title">Daily Basket</span>
          </a>

          <div class="nav-control">
            <div class="hamburger">
              <span class="toggle-icon">
                <i class="icon-menu"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!--**********************************
            Nav header end
      ***********************************-->

      <!--**********************************
            Header start
      ***********************************-->
      <div class="header">
        <div class="header-content">
          <nav class="navbar navbar-expand">
            <div class="collapse navbar-collapse justify-content-between">
              <div class="header-left">
                <!--<div class="search_bar dropdown">
                                <span class="search_icon d-lg-none p-3 c-pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-search"></i>
                                </span>
                                <div class="dropdown-menu p-0 m-0">
                                    <form class="form-inline">
                                        <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                                    </form>
                                </div>
                </div>-->
                <!--<p>De</p>-->
              </div>

              <ul class="navbar-nav header-right">
                <!--<li class="nav-item search menu_long_gap">
                                <a class="nav-link" href="#" role="button">
                                   <i class="fas fa-search"></i><span class="nav_txt">search</span></a>
                </li>-->
                <li class="nav-item menu_long_gap custom_scr">
                  <a class="nav-link" href="#" role="button" id="search-btn2">
                    <form id="content">
                      <input type="text" name="input" class="input" id="search-input" />
                      <button type="reset" class="search" id="search-btn"></button>
                    </form>
                    <span class="nav_txt">Search</span>
                  </a>
                </li>
                <li class="nav-item help menu_long_gap mobile_scr_484">
                  <a class="nav-link" href="#" role="button">
                    <i class="fas fa-search"></i>
                    <span class="nav_txt">Search</span>
                  </a>
                </li>
                <li class="nav-item help menu_long_gap">
                  <a class="nav-link" href="#" role="button">
                    <i class="far fa-life-ring"></i>
                    <span class="nav_txt">Help</span>
                  </a>
                </li>
                <li class="nav-item dropdown header-profile">
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
                      <span>Calender</span>
                    </a>
                    <a href="#!" class="dropdown-item">
                      <span>Inbox</span>
                    </a>
                    <a href="#!" class="dropdown-item">
                      <span>Settings</span>
                    </a>
                    <a @click.prevent="logout" class="dropdown-item">
                      <span>Logout</span>
                    </a>
                  </div>
                </li>
                <li class="nav-item dropdown notification_dropdown">
                  <a
                    class="nav-link"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="far fa-bell"></i>
                    <span class="badge badge-primary">3</span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <h5 class="notification_title">Notifications</h5>
                    <ul class="list-unstyled">
                      <li class="media dropdown-item">
                        <img class="mr-3" src="images/avatar/1.jpg" alt="Quixlab" />
                        <div class="media-body">
                          <a href="#">
                            <div class="d-flex justify-content-between">
                              <h5>Mr John</h5>
                            </div>
                            <p class="m-0">signed nup now</p>
                          </a>
                        </div>
                      </li>
                      <li class="media dropdown-item">
                        <img class="mr-3" src="images/avatar/8.jpg" alt="Quixlab" />
                        <div class="media-body">
                          <a href="#">
                            <div class="d-flex justify-content-between">
                              <h5>Lisa Heiden</h5>
                            </div>
                            <p class="m-0">Reset password</p>
                          </a>
                        </div>
                      </li>
                      <li class="media dropdown-item">
                        <img class="mr-3" src="images/avatar/2.jpg" alt="Quixlab" />
                        <div class="media-body">
                          <a href="#">
                            <div class="d-flex justify-content-between">
                              <h5>Mr khan</h5>
                            </div>
                            <p class="m-0">Email sent</p>
                          </a>
                        </div>
                      </li>
                    </ul>
                    <a class="all-notification" href="#">All Notifications</a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <!--**********************************

            Header end ti-comment-alt
      ***********************************-->
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

<style>
</style>
