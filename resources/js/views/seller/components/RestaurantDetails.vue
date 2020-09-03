<template>
  <div class="menu_top iinr_side_pad">
    <div class="menu_tp_lft">
      <div class="lef_inr_lft">
        <div class="img_arr">
          <img :src="restaurant.image" alt />
          <div class="suc_msg">
            <i class="fas fa-check"></i>
          </div>
        </div>
        <div class="image_optn">
          <ul>
            <li>
              <a href>Preview</a>
            </li>
            <li>
              <a href>Change</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="lef_inr_rgt">
        <div class="user_det">
          <h4>{{restaurant.name}}</h4>
          <p>{{restaurant.address.address}}</p>
          <p>Ph No. : {{restaurant.contact_no}}</p>
        </div>
        <div class="selct_bxx">
          <!-- <select id="food_cat">
            <option value="hide">-- Secect Cat --</option>
            <option value="A" rel="icon-temperature">North Indian</option>
            <option value="B">Chinese</option>
            <option value="C">Moglai</option>
          </select>-->
          <multiselect
            v-model="res.cuisines"
            :options="cuisines"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Secect Cuisines"
            label="name"
            track-by="name"
            @close="onClose"
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span
                class="multiselect__single"
                :data-search="search"
                v-if="values.length &amp;&amp; !isOpen"
              >{{ values.length }} options selected</span>
            </template>
          </multiselect>
        </div>
      </div>
    </div>
    <div class="menu_tp_rgt">
      <form @submit.prevent="save">
        <div class="open_time">
          <ul>
            <li>
              <p>Opening Time :</p>
              <div class="in_bxx">
                <VueClockPicker
                  :input-class="'form-control form_control_cus clockpicker'"
                  v-model="res.opening_time"
                  :placeholder="'Enter Time'"
                  @timeset="updateRestauramt({opening_time: res.opening_time})"
                />
              </div>
            </li>
            <li>
              <p>Closing Time :</p>
              <div class="in_bxx">
                <VueClockPicker
                  :input-class="'form-control form_control_cus clockpicker'"
                  v-model="res.closing_time"
                  :placeholder="'Enter Time'"
                  @timeset="updateRestauramt({closing_time: res.closing_time})"
                />
              </div>
            </li>
          </ul>
        </div>
        <div class="subcc">
          <div class="subcc_innr">
            <div class="subcc_switch">
              <p>
                Model :
                <span>Subscription</span>
              </p>
              <div class="swtchh_otr"></div>
            </div>
            <div class="subcc_btnn">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="res.subscription"
                  :checked="res.subscription === 1"
                  @change="updateRestauramt({subscription: res.subscription ? '1' : '0'})"
                />
                <span class="sliderr round"></span>
              </label>
            </div>
          </div>
          <div class="sbcc_btn">
            <a
              href="#"
              class="cmnn_btnn"
              role="button"
              data-toggle="modal"
              data-dismiss="modal"
              data-target="#subscribe_modal"
            >Subscribe</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueClockPicker from '@pencilpix/vue2-clock-picker';
import Multiselect from 'vue-multiselect'
import '@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.min.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';


export default {
  components: {
    VueClockPicker,
    Multiselect
  },
  data () {
    return {
      res: {
        subscription: this.restaurant.subscription,
        opening_time: this.restaurant.opening_time,
        closing_time: this.restaurant.closing_time,
        cuisines: this.restaurant.cuisines,
      },
      value: [],
    }
  },
  props: {
    restaurant: null,
    cuisines: null
  },
  methods: {
    updateRestauramt (restaurant) {
      this.$store.dispatch('sellerRestaurant/updateRestaurant', restaurant).then(() => {
        toastr.success('Details updated', '', {
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
      });
    },
    onClose (value) {
      this.value = value

      const cuisines = _.map(this.value, function (value) {
        return _.pick(value, ['id']).id
      });

      this.updateRestauramt({ cuisines: _.join(cuisines, ',') });
    },
  }
}
</script>


<style lang="scss">
.clock-picker__canvas {
  display: flex;
  justify-content: center;
}
.clockpicker {
  text-align: center;
}
</style>

<style lang="scss" scoped>
.clockpicker {
  text-align: center;
}
.img_arr {
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .suc_msg {
    position: absolute;
  }
}
</style>
