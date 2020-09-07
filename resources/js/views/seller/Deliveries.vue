<template>
  <div class="content-body">
    <!-- row -->

    <div class="container">
      <div class="dash_hd_cmn">
        <h3>Delivery for today</h3>
        <div class="dash_hd_rgt">
          <div class="selct_bxx small_slct" style="width: 200px">
            <multiselect
              v-model="sortOption"
              deselect-label
              select-label
              track-by="name"
              label="name"
              placeholder="Select one"
              :options="sortOptions"
              :searchable="false"
              :allow-empty="false"
              @input="sortDeliveries"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <strong>{{ option.name }}</strong>
              </template>
            </multiselect>
          </div>
          <div class="delivry_by_add">
            <div class="del_add_img">
              <img :src="'/images/custom_image/add_delv.png'" />
            </div>
            <h4>
              <a href>Add delivery boy</a>
            </h4>
          </div>
        </div>
      </div>
      <div class="dash_delivry">
        <div class="dash_delivry_innr bfr_assign" v-if="isLoaded">
          <ul v-if="orders.length > 0">
            <li
              :class="{'delivered': order.status === 'delivered'}"
              v-for="order in orders"
              :key="order.id"
            >
              <div class="delivery_boy_details" v-if="order.delevery_boy !== null">
                <div class="boy_det_innr">
                  <h3>
                    Delivery Boy:
                    <span>{{order.delevery_boy.name}}</span>
                  </h3>
                  <p>
                    <a href="#" v-if="order.status !== 'delivered'">EDIT</a>
                  </p>
                </div>
                <h3>
                  Contact No :
                  <span>{{order.delevery_boy.contact_no}}</span>
                </h3>
              </div>
              <div class="dal_innr_otr">
                <div class="dal_innr">
                  <div class="deliver_msg">
                    <h3>
                      Order ID#
                      <span>{{order.id}}</span>
                    </h3>
                    <div class="del_msg_inn" v-if="order.status === 'delivered'">
                      <i class="fas fa-check-circle"></i>
                      <p>Delivered</p>
                    </div>
                  </div>

                  <div class="del_add_otr">
                    <h4>Delivery Address:</h4>
                    <address>{{order.address.address}}</address>
                  </div>
                  <div class="dal_btnn">
                    <div class="dal_btn_innr" v-if="order.delevery_boy === null">
                      <a
                        href="#"
                        class="cmnn_btnn del_enable_btn"
                        role="button"
                        data-toggle="modal"
                        data-dismiss="modal"
                        data-target="#add_del_boy"
                        @click="changeAssign(order.id)"
                      >Click to assign</a>
                    </div>
                    <div
                      class="dal_btn_innr"
                      v-if="order.delevery_boy !== null && order.status !== 'delivered'"
                    >
                      <a
                        href="#"
                        class="cmnn_btnn del_enable_btn"
                        @click.prevent="orderDelivered(order.id)"
                        role="button"
                      >Complete delivery</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div v-else style="height: 50vh">No deliveries</div>
        </div>
      </div>
      <div class="custom_footer">
        <p>
          Copyright © Designed &amp; Developed by
          <a href target="_blank">Sutanu & Sudipta</a>
        </p>
      </div>
    </div>

    <DeliveryAssign :order_id="changeAssignId" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { mapGetters } from 'vuex';
import DeliveryAssign from '@/views/seller/components/DeliveryAssign';

export default {
  components: {
    DeliveryAssign,
    Multiselect,
  },
  data () {
    return {
      isLoaded: false,
      changeAssignId: null,
      sortOption: {
        name: 'All',
        value: 'all'
      },
      sortOptions: [
        {
          name: 'All',
          value: 'all'
        },
        {
          name: 'Delivered',
          value: 'delivered'
        },
        {
          name: 'To Be Delivered',
          value: 'processing'
        },
      ]
    }
  },
  mounted () {
    this.$store.dispatch('sellerOrder/todaysOrders').then(() => {
      this.isLoaded = true;
    });
  },
  computed: {
    ...mapGetters({ orders: 'sellerOrder/getTodaysOrders' })
  },
  methods: {
    changeAssign (id) {
      this.changeAssignId = id
    },
    orderDelivered (id) {
      Swal.fire({
        title: 'Are you sure you want to change the status?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6883b9',
        cancelButtonColor: '#dd6b55',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('sellerOrder/orderDelivered', id).then(() => {
            toastr.success('Order status changed to delivered', '', {
              positionClass: 'toast-bottom-center',
              timeOut: 1500,
              closeButton: !0,
              debug: !1,
              newestOnTop: !0,
              progressBar: !0,
              preventDuplicates: !0,
              onclick: null,
              showDuration: '300',
              hideDuration: '1000',
              extendedTimeOut: '1000',
              showEasing: 'swing',
              hideEasing: 'linear',
              showMethod: 'fadeIn',
              hideMethod: 'fadeOut',
              tapToDismiss: !1,
            });
          })
        }
      });
    },
    sortDeliveries (value) {
      this.$store.dispatch('sellerOrder/todaysOrders', value.value).then(() => {
        this.isLoaded = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.delivered {
  opacity: 0.5;
}

.deliver_msg {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .del_msg_inn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      font-size: 27px;
      margin-right: 8px;
      color: #48c479 !important;
    }
  }
}
</style>
