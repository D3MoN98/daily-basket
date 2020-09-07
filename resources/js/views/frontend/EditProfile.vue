<template>
  <div class="prfl_rgt prf_order">
    <div class="hd_20">
      <h3>Edit Profile</h3>
    </div>
    <div class="prf_order_inn">
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for>Name</label>
          <input
            type="text"
            name
            id
            class="form-control"
            :class="{
                'is-invalid': formError && $v.user.name.$error
            }"
            v-model="user.name"
            placeholder="Your Name"
            aria-describedby="helpId"
          />
          <span v-if="formError && !$v.user.name.required" class="invalid-feedback">Name is required</span>
        </div>

        <div class="form-group">
          <label for>Email</label>
          <input
            type="text"
            name
            id
            class="form-control"
            :class="{
                'is-invalid': formError && $v.user.email.$error,
                'is-invalid': formError && email_exist,
            }"
            v-model="user.email"
            placeholder="Your Email"
            aria-describedby="helpId"
          />
          <span
            v-if="formError && !$v.user.email.required"
            class="invalid-feedback"
          >Email is required</span>
          <span
            v-if="formError && !$v.user.email.email"
            class="invalid-feedback"
          >Enter a valid email</span>
          <span v-if="formError && email_exist" class="invalid-feedback">Email already exist</span>
        </div>

        <div class="form-group">
          <label for>Contact No</label>
          <input
            type="text"
            name
            id
            class="form-control"
            :class="{
                            'is-invalid': formError && $v.user.contact_no.$error
                        }"
            v-model="user.contact_no"
            placeholder="Your Contact"
            aria-describedby="helpId"
          />
          <span
            v-if="formError && !$v.user.contact_no.required"
            class="invalid-feedback"
          >Contact is required</span>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary">
            Update Profile
            <span
              class="fa fa-circle-o-notch fa-spin"
              role="status"
              aria-hidden="true"
              v-show="submitted"
            ></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      user: {
        name: null,
        email: null,
        contact_no: null
      },
      email_exist: false,
      submitted: false,
      formError: false
    };
  },
  validations: {
    user: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      contact_no: {
        required
      },
    }
  },
  mounted () {
    this.$store.dispatch('user/getUser').then(() => {
      this.user = this.userdata
    });
  },
  computed: {
    ...mapGetters({ userdata: 'user/user' })
  },
  methods: {
    updateProfile () {
      this.submitted = true;
      this.formError = false;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.formError = true;
        this.submitted = false;
        return;
      }

      this.$store.dispatch('user/updateUser', this.user).then(() => {
        this.submitted = false;
        this.formError = false;

        toastr.success('Profile updated', '', {
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
      }).catch((error) => {
        if (error.response.status === 422) {
          this.email_exist = true;
          this.formError = true;
          this.submitted = false;
        }
      });
    }
  }
};
</script>

<style>
</style>
