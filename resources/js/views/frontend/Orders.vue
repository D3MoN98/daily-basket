<template>
  <div class="prfl_rgt prf_order">
    <div class="prf_order_inn">
      <div class="order_tab_otr">
        <div id="order_tab">
          <ul class="resp-tabs-list">
            <li>Individual Order</li>
            <li>Subscribed Order</li>
          </ul>
          <div class="resp-tabs-container">
            <div>
              <div class="order_con_inn">
                <div class="current_order tab_orderr">
                  <CurrentOrders />
                </div>
                <div class="past_order tab_orderr">
                  <PastOrders />
                </div>
              </div>
            </div>
            <div>
              <div class="order_con_inn">
                <div class="current_order tab_orderr">
                  <CurrentSubscriptions />
                </div>
                <div class="past_order tab_orderr">
                  <PastSubscriptions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PastOrders from "@/views/frontend/components/PastOrders";
import CurrentOrders from "@/views/frontend/components/CurrentOrders";
import CurrentSubscriptions from "@/views/frontend/components/CurrentSubscriptions";
import PastSubscriptions from "@/views/frontend/components/PastSubscriptions";

export default {
  components: {
    PastOrders,
    CurrentOrders,
    CurrentSubscriptions,
    PastSubscriptions,
  },
  mounted () {
    $("#order_tab").easyResponsiveTabs({
      type: "default", //Types: default, vertical, accordion
      width: "auto", //auto or any width like 600px
      fit: true, // 100% fit in a container
      closed: "accordion", // Start closed if in accordion view
      activate: function (event) {
        // Callback function if tab is switched
        var $tab = $(this);
        var $info = $("#tabInfo");
        var $name = $("span", $info);
        $name.text($tab.text());
        $info.show();
      }
    });
  }
}
</script>

<style>
</style>
