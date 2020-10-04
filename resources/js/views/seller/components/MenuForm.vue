<template>
  <div class="bsc_det_otr animate__animated animate__fadeIn">
    <form @submit.prevent="createMenuItem">
      <div class="bec_det_innr fnt_18_smb">
        <div class="bsc_det mar_btn_45">
          <h3>
            Basic Details
            <span class="red_star">*</span>
          </h3>
          <div class="flex_row row1 row_gap">
            <div class="wi280">
              <div class="fld fnt_15">
                <p>
                  Item Name
                  <span class="red_star">*</span>
                </p>
                <div class="fld_inn">
                  <input
                    type="text"
                    class="form-control ligth_place"
                    v-model="menu_item.name"
                    :class="{
                        'is-invalid':
                            formError && $v.menu_item.name.$error
                    }"
                    placeholder="Enter Item name"
                  />
                  <span
                    v-if="formError && !$v.menu_item.name.required"
                    class="invalid-feedback"
                  >Name is required</span>
                </div>
              </div>
            </div>
            <div class="cata">
              <div class="fld fnt_15">
                <p>
                  Category
                  <span class="red_star">*</span>
                </p>
                <div class="fld_inn small_slct">
                  <div class="selct_bxx small_slct">
                    <multiselect
                      v-model="menu_item.menu_category_id"
                      deselect-label
                      select-label
                      placeholder="Select one"
                      :options="menu_categories.map(type => type.id)"
                      :searchable="false"
                      :allow-empty="false"
                      :custom-label="opt => menu_categories.find(x => x.id == opt).name"
                    >
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ menu_categories.find(x => x.id == option).name }}</strong>
                      </template>
                    </multiselect>
                  </div>
                </div>
              </div>
              <div class="fld fnt_15">
                <p>
                  Sub-Category
                  <span class="red_star">*</span>
                </p>
                <div class="fld_inn small_slct">
                  <div class="selct_bxx small_slct">
                    <multiselect
                      v-model="menu_item.menu_sub_category_id"
                      deselect-label
                      select-label
                      placeholder="Select one"
                      :options="menu_sub_categories.map(type => type.id)"
                      :searchable="false"
                      :allow-empty="false"
                      :custom-label="opt => menu_sub_categories.find(x => x.id == opt).name"
                    >
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ menu_sub_categories.find(x => x.id == option).name }}</strong>
                      </template>
                    </multiselect>
                  </div>
                </div>
              </div>
              <div class="fld fnt_15">
                <p>
                  Type
                  <span class="red_star">*</span>
                </p>
                <div class="fld_inn small_slct">
                  <div
                    class="selct_bxx small_slct"
                    :class="{
                        'invalid':
                            formError && $v.menu_item.type.$error
                        }"
                  >
                    <multiselect
                      v-model="menu_item.type"
                      deselect-label
                      select-label
                      placeholder="Select one"
                      :searchable="false"
                      :allow-empty="false"
                      :options="types.map(type => type.value)"
                      :custom-label="opt => types.find(x => x.value == opt).name"
                    >
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ types.find(x => x.value == option).name }}</strong>
                      </template>
                    </multiselect>
                    <span
                      v-if="formError && !$v.menu_item.type.required"
                      class="invalid-feedback"
                    >Type is required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex_row row2 row_gap">
            <div class="w-100">
              <div class="fld fnt_15">
                <p>Item Description</p>
                <div class="fld_inn">
                  <textarea
                    v-model="menu_item.description"
                    class="form-control ligth_place"
                    :class="{
                        'is-invalid':
                            formError && $v.menu_item.description.$error
                    }"
                    placeholder="Enter description"
                    rows="3"
                  ></textarea>
                  <span
                    v-if="formError && !$v.menu_item.description.required"
                    class="invalid-feedback"
                  >Description is required</span>
                </div>
              </div>
            </div>
          </div>
          <div class="fnt_15 add_image">
            <div class="upload-btn-wrapper">
              <button class="btnnn">
                <p>
                  <a href class="animtn">
                    <input type="file" name="image" ref="file" @change="selectFile" />
                    <span class="green_col">
                      Add Item
                      Image
                    </span>
                    {{image_name !== null ? _.truncate(image_name) : '(Size : Max 50x50 px)'}}
                  </a>
                </p>
              </button>
            </div>
          </div>
        </div>
        <div class="prc_det mar_btn_45">
          <h3>
            Price Details
            <span class="red_star">*</span>
          </h3>
          <div class="flex_row row3 row_gap">
            <div class="cata">
              <div class="fld fnt_15">
                <p>Item Price</p>
                <div class="fld_inn">
                  <input
                    type="text"
                    class="form-control"
                    v-currency="{currency: 'INR', locale: 'en-IN'}"
                    :class="{
                        'is-invalid':
                            formError && $v.menu_item.price.$error
                        }"
                    placeholder="Enter Amount"
                    @keypress="isNumber"
                    ref="price"
                    @change="menu_item.price = $event.target.value"
                  />
                  <span
                    v-if="formError && !$v.menu_item.price.required"
                    class="invalid-feedback"
                  >Price is required</span>
                </div>
              </div>
              <div class="fld fnt_15">
                <p>Service Charge</p>
                <div class="fld_inn small_slct">
                  <div
                    class="selct_bxx small_slct"
                    :class="{
                        'invalid':
                            formError && $v.menu_item.gst.$error
                        }"
                  >
                    <multiselect
                      v-model="menu_item.gst"
                      deselect-label
                      select-label
                      placeholder="Select one"
                      :options="gsts.map(type => type.value)"
                      :searchable="false"
                      :allow-empty="false"
                      :custom-label="opt => gsts.find(x => x.value == opt).name"
                    >
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ gsts.find(x => x.value == option).name }}</strong>
                      </template>
                    </multiselect>
                    <span
                      class="invalid-feedback"
                      v-show="formError && !$v.menu_item.gst.required"
                    >Must have at least one value</span>
                  </div>
                </div>
              </div>
              <div class="fld fnt_15">
                <p>Delivery Charge</p>
                <div class="fld_inn">
                  <input
                    type="text"
                    class="form-control"
                    :class="{
                        'is-invalid':
                            formError && $v.menu_item.delivery_charge.$error
                        }"
                    v-currency="{currency: 'INR', locale: 'en-IN'}"
                    placeholder="Delivery Charge"
                    @keypress="isNumber"
                    ref="delivery_charge"
                    @change="menu_item.delivery_charge = $event.target.value"
                  />
                  <span
                    v-if="formError && !$v.menu_item.delivery_charge.required"
                    class="invalid-feedback"
                  >Delivery Charge is required</span>
                </div>
              </div>
            </div>
            <div class="wi280">
              <div class="fld fnt_15 text-center">
                <p>Total (Price + GST + Delivery)</p>
                <div class="fld_inn">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Total"
                    :value="menu_item_total"
                    v-currency="{currency: 'INR', locale: 'en-IN'}"
                    disabled
                    ref="total"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="oth_det mar_btn_45">
          <h3>
            Other Details
            <span class="red_star">*</span>
          </h3>
          <div class="flex_row row4 row_gap">
            <div class="oth_innr">
              <div class="fld fnt_15 lff">
                <p>Quantity Serve Per day</p>
                <div class="fld_inn">
                  <input
                    type="text"
                    class="form-control"
                    v-model="menu_item.quantity_serves_per_day"
                    :class="{
                        'is-invalid':
                            formError && $v.menu_item.quantity_serves_per_day.$error
                        }"
                    placeholder="Enter Number"
                    @keyup="isNumber"
                  />
                  <span
                    v-if="formError && !$v.menu_item.quantity_serves_per_day.required"
                    class="invalid-feedback"
                  >Quantity Serves Per Day is required</span>
                </div>
              </div>

              <div class="fld fnt_15 rgg">
                <p>Priority</p>
                <div class="fld_inn">
                  <input type="text" class="form-control" placeholder="Enter Num.." />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="oth_det row4 w-100">
          <div class="oth_det_inn">
            <!-- <h3>Item Availability</h3>
              <div class="itm_avv">
                <label class="switch">
                  <input type="checkbox" checked />
                  <span class="sliderr round"></span>
                </label>
            </div>-->
            <button type="submit" class="btn btn-primary btn-block" :disabled="submitted">
              Create
              <span
                class="fa fa-circle-o-notch fa-spin"
                role="status"
                aria-hidden="true"
                v-show="submitted"
              ></span>
            </button>
          </div>
          <div class="cross">
            <a href>
              <i class="fas fa-times-circle"></i>
            </a>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { CurrencyDirective, getValue, setValue } from 'vue-currency-input'




export default {
  components: {
    Multiselect,
  },
  directives: {
    currency: CurrencyDirective
  },
  data () {
    return {
      menu_item: {
        name: null,
        description: null,
        type: null,
        menu_category_id: null,
        menu_sub_category_id: null,
        quantity_serves_per_day: null,
        price: 0,
        gst: null,
        delivery_charge: 0,
      },
      types: [
        {
          name: 'Veg',
          value: 'veg'
        },
        {
          name: 'Non Veg',
          value: 'non-veg'
        }
      ],
      gsts: [
        { name: '5%', value: 5 },
        { name: '10%', value: 10 },
        { name: '15%', value: 15 },
        { name: '20%', value: 20 }
      ],
      formError: false,
      submitted: false,
      image: null,
      image_name: null,
    }
  },
  validations: {
    menu_item: {
      name: {
        required,
      },
      description: {
        required,
      },
      type: {
        required,
      },
      price: {
        required,
      },
      gst: {
        required,
      },
      delivery_charge: {
        required,
      },
      quantity_serves_per_day: {
        required,
      },
    },
  },
  created () {
    this.$store.dispatch('sellerRestaurant/menu_categories');
    this.$store.dispatch('sellerRestaurant/menu_sub_categories');
  },
  computed: {
    ...mapGetters({
      menu_categories: 'sellerRestaurant/getMenuCategories',
      menu_sub_categories: 'sellerRestaurant/getMenuSubCategories'
    }),
    menu_item_total () {
      return parseInt(this.menu_item.price) + parseInt(this.menu_item.delivery_charge);
    }
  },
  methods: {
    createMenuItem () {
      this.submitted = true;
      this.formError = false;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.formError = true;
        this.submitted = false;
        return;
      }

      const data = new FormData();

      data.append('image', this.image);

      _.each(this.menu_item, (value, key) => {
        data.append(key, value);
      });

      this.$store.dispatch('sellerMenu/createMenu', data).then(() => {
        this.formError = false;
        this.submitted = false;
        toastr.success('Item Added Succefully', '', {
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
        this.resetForm();
      }).catch((err) => {
        this.formError = false;
        this.submitted = false;
      });

    },
    selectFile (event) {
      this.image = this.$refs.file.files[0]
      this.image_name = this.$refs.file.files[0].name
    },
    isNumber ($e) {
      const charCode = ($e.which) ? $e.which : $e.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        return $e.preventDefault();
      }
      return true;
    },
    resetForm () {
      const self = this;
      Object.keys(this.menu_item).forEach((key) => {
        self.menu_item[key] = null;
      });
      self.image = null;
      self.image_name = null;
    },
  }
}
</script>

<style lang="scss" scoped>
.cata .fld {
  flex: 0 0 32%;
}
.bsc_det_otr {
  max-height: fit-content;
  overflow: initial;
}
.bec_det_innr {
  background: #f6f6f6;
  padding: 30px 25px 60px 25px;
}
.row4 {
  .oth_det_inn {
    flex: 0 0 75%;
  }
}
.form-control {
  background: white;
}
.multiselect {
  border: 1px solid #c8c8c8;
  border-radius: 2px;
  background: white;
}
.invalid .multiselect {
  border: 1px solid;
  border-color: #ea5455 !important;
}
.invalid .invalid-feedback {
  display: block;
}
</style>
