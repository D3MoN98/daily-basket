<template>
  <div
    class="modal fade"
    id="subscribeModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Select your day</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- <div class="btn-group" role="group" aria-label>
            <button type="button" class="btn mr-2 btn-secondary">3 Days Trial</button>
            <button type="button" class="btn mr-2 btn-secondary">15 Days Pack</button>
            <button type="button" class="btn mr-2 btn-secondary">30 Days Value</button>
          </div>-->
          <div class="form-group">
            <div class="chk_btnn">
              <input
                type="radio"
                id="three_daays_trial"
                value="three_daays_trial"
                @change="subscribeDateChange"
                name="subscribe_date"
              />
              <label for="three_daays_trial">
                <span class="rdo_span">3 Days Trial</span>
              </label>

              <input
                type="radio"
                id="fifteen_days_pack"
                value="fifteen_days_pack"
                @change="subscribeDateChange"
                name="subscribe_date"
              />
              <label for="fifteen_days_pack">
                <span class="rdo_span">15 Days Pack</span>
              </label>

              <input
                type="radio"
                id="thirty_days_value"
                value="thirty_days_value"
                @change="subscribeDateChange"
                name="subscribe_date"
              />
              <label for="thirty_days_value">
                <span class="rdo_span">30 Days Value</span>
              </label>
            </div>
          </div>
          <hr />
          <p class="text-center mb-2">
            <b>Or pick a cutomize Date</b>
          </p>
          <div class="d-flex justify-content-center" role="group" aria-label>
            <button type="button" @click="toggleCalender" class="btn btn-secondary">Custom Date</button>
          </div>
          <div v-if="showCalender" class="d-flex justify-content-center mt-2">
            <DatePicker mode="range" :min-date="new Date()" v-model="range" is-inline />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click.prevent="addSubscribe">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  components: {
    DatePicker
  },
  data () {
    return {
      today: new Date(),
      range: {
        start: null, // Jan 16th, 2018
        end: null    // Jan 19th, 2018
      },
      preDefinedSubscribeDate: {
        three_daays_trial: {
          start: new Date(),
          end: new Date(new Date().setDate(new Date().getDate() + 2))
        },
        fifteen_days_pack: {
          start: new Date(),
          end: new Date(new Date().setDate(new Date().getDate() + 14))
        },
        thirty_days_value: {
          start: new Date(),
          end: new Date(new Date().setDate(new Date().getDate() + 29))
        }
      },
      showCalender: false
    }
  },
  methods: {
    addSubscribe () {
      this.$store.dispatch('cart/setSubscribe', { start: this.range.start.getTime(), end: this.range.end.getTime() })
      $('#subscribeModal').modal('hide');
      toastr.success('Subscribe applied', '', {
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
    },
    toggleCalender () {
      this.showCalender = !this.showCalender
      document.getElementsByName('subscribe_date').forEach(element => {
        element.checked = false
      });
    },
    subscribeDateChange (e) {
      this.showCalender = false
      if (e.target.value === 'three_daays_trial') {
        this.range = this.preDefinedSubscribeDate.three_daays_trial
      } else if (e.target.value === 'fifteen_days_pack') {
        this.range = this.preDefinedSubscribeDate.fifteen_days_pack
      } else if (e.target.value === 'thirty_days_value') {
        this.range = this.preDefinedSubscribeDate.thirty_days_value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-dialog {
  width: fit-content;
}
.modal-content {
  padding: 20px;
}
.modal-footer {
  padding: 1rem 0;
  padding-bottom: 0;
}
.chk_btnn {
  label {
    width: fit-content;
    margin-left: 0.25rem;
    padding: 0.375rem 0.75rem;
    border: 2px solid #678098;
  }
  .rdo_span {
    padding: 0;
  }
}
</style>
