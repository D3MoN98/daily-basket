<template>
  <div class="content-body">
    <!-- row -->

    <div class="container">
      <div class="dash_hd_cmn">
        <h3>
          Restaurants
          <span class>Datatable</span>
        </h3>
        <!-- <div class="selct_bxx small_slct">
          <select id="mounth">
            <option value="hide">-- All --</option>
            <option value="a" rel="icon-temperature">Individuals</option>
            <option value="b">Unsubcribes</option>
            <option value="c">subcribes</option>
          </select>
        </div>-->
      </div>
      <div class="cmn_table adress_size">
        <Datatable :columns="columns" :url="'/api/admin/restaurant'" />
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
import Datatable from "@/views/components/Datatable";

export default {
  components: {
    Datatable
  },
  data () {
    return {
      isLoaded: false,
      columns: [
        {
          name: 'name',
          label: 'Name'
        },
        {
          name: 'contact_no',
          label: 'Contact No'
        },
        {
          name: 'address.address',
          label: 'Order Status'
        }
      ]
    };
  },
};
</script>

<style></style>
