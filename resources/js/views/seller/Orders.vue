<template>
  <div class="content-body">
    <!-- row -->
    <div class="container">
      <div class="dash_hd_cmn">
        <h3>Order Management</h3>
        <!-- <div class="selct_bxx small_slct">
          <select id="mounth">
            <option value="hide">-- All --</option>
            <option value="a" rel="icon-temperature">Jan</option>
            <option value="b">Feb</option>
            <option value="c">Mar</option>
          </select>
        </div>-->
      </div>
      <div class="sub_tab_table order_mang">
        <ul class="nav nav-pills parent-nav mb-4">
          <li class="nav-item">
            <a
              href="#navpills-1"
              class="nav-link active"
              data-toggle="tab"
              aria-expanded="false"
            >Individual Orders</a>
          </li>
          <li class="nav-item">
            <a
              href="#navpills-2"
              class="nav-link"
              data-toggle="tab"
              aria-expanded="false"
            >Subscribed Orders</a>
          </li>
        </ul>
        <div class="tab-content">
          <div id="navpills-1" class="tab-pane fade show active">
            <div class="row">
              <div class="col-md-12">
                <ul class="nav nav-pills child-nav mb-4">
                  <li class="nav-item">
                    <a
                      href="#current"
                      class="nav-link active"
                      data-toggle="tab"
                      aria-expanded="false"
                    >Current Orders</a>
                  </li>
                  <li class="nav-item">
                    <a
                      href="#past"
                      class="nav-link"
                      data-toggle="tab"
                      aria-expanded="false"
                    >Past Orders</a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div id="current" class="tab-pane fade show active">
                    <CurrentOrders />
                  </div>
                  <div id="past" class="tab-pane">
                    <PastOrders />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="navpills-2" class="tab-pane fade">
            <div class="row">
              <div class="col-md-12">
                <ul class="nav nav-pills child-nav mb-4">
                  <li class="nav-item">
                    <a
                      href="#currentSubscriptions"
                      class="nav-link active"
                      data-toggle="tab"
                      aria-expanded="false"
                    >Current Subscriptions</a>
                  </li>
                  <li class="nav-item">
                    <a
                      href="#pastSubscriptions"
                      class="nav-link"
                      data-toggle="tab"
                      aria-expanded="false"
                    >Past Subscriptions</a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div id="currentSubscriptions" class="tab-pane fade show active">
                    <CurrentSubscriptions />
                  </div>
                  <div id="pastSubscriptions" class="tab-pane">
                    <PastSubscriptions />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="custom_footer">
        <p>
          Copyright © Designed &amp; Developed by
          <a href target="_blank">Sutanu & Sudipta</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentOrders from "@/views/seller/components/CurrentOrders";
import CurrentSubscriptions from "@/views/seller/components/CurrentSubscriptions";
import PastSubscriptions from "@/views/seller/components/PastSubscriptions";
import PastOrders from "@/views/seller/components/PastOrders";

export default {
  components: {
    CurrentOrders,
    CurrentSubscriptions,
    PastSubscriptions,
    PastOrders,
  }
}
</script>

<style lang="scss" scoped>
.parent-nav {
  .nav-item {
    width: 50%;
  }
  .nav-link {
    color: #6883b9;
    padding: 19px 10px;
    font-size: 18px;
    border: 1px solid #cdced1;
    font-family: "Averta_Semibold";
    line-height: 1;
    cursor: pointer;
    text-align: center;
  }
  .nav-link.active {
    background: #6883b9;
    border-color: #6883b9 !important;
    margin-bottom: 0 !important;
    color: #fff !important;
  }
  .nav-item:last-child .nav-link {
    border-left: 0;
  }
}
// .child-nav {
//   .nav-link {
//     color: #090909;
//     margin-right: 60px;
//     position: relative;
//     padding: 0px 5px 7px 5px;
//   }
// }
</style>
