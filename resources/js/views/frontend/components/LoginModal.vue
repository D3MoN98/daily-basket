<template>
  <div class="modal fade log_in_u" id="log_in_modal">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content modal_form">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="welcome_msg">
            <h3>Welcome Dailybasket</h3>
          </div>
          <form id="loginForm" @submit.prevent="login">
            <div
              class="alert alert-danger animate__animated animate__bounceIn"
              v-show="credentialError"
              role="alert"
            >
              <strong>{{credentialErrorMessage}}</strong>
            </div>
            <div class="form-group">
              <input
                type="email"
                v-model="user.email"
                class="form-control"
                :class="{
                                    'is-invalid':
                                        formError && $v.user.email.$error
                                }"
                placeholder="Email"
              />
              <span
                v-if="formError && !$v.user.email.required"
                class="invalid-feedback"
              >Email is required</span>
              <span
                v-if="formError && !$v.user.email.email"
                class="invalid-feedback"
              >Enter a valid email</span>
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                v-model="user.password"
                :class="{
                                    'is-invalid':
                                        formError && $v.user.password.$error
                                }"
                placeholder="Password"
              />
              <span
                v-if="formError && !$v.user.email.required"
                class="invalid-feedback"
              >Password is required</span>
            </div>
            <div class="alter_login">
              <div class="otp_login">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="check1" value checked />
                  <label class="form-check-label" for="check1">Login via OTP</label>
                </div>
              </div>
              <div class="forget_pass">
                <a href="javaScript:void(0);">Forgot password?</a>
              </div>
            </div>
            <div class="frm_btm">
              <button type="submit" class="btn btn-primary btn-block" :disabled="submitted">
                Login
                <span
                  class="fa fa-circle-o-notch fa-spin"
                  role="status"
                  aria-hidden="true"
                  v-show="submitted"
                ></span>
              </button>
            </div>
            <div class="frm_alter_btn text-center">
              <h4>
                Don't have an account?
                <a
                  href
                  data-toggle="modal"
                  data-target="#sign_up_modal"
                  data-dismiss="modal"
                >Sign-Up</a>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required, email,
} from 'vuelidate/lib/validators';

export default {
  data () {
    return {
      user: {
        email: null,
        password: null,
      },
      remember: false,
      submitted: false,
      formError: false,
      credentialError: false,
      credentialErrorMessage: null,
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    login () {
      this.submitted = true;
      this.formError = false;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.formError = true;
        this.submitted = false;
        return;
      }

      this.$store
        .dispatch('auth/login', this.user)
        .then(() => {
          this.submitted = false;
          this.formError = false;
          this.resetForm();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.credentialErrorMessage = error.response.data.error;
            this.credentialError = true;
            this.submitted = false;
            this.resetForm();
          }
          setTimeout(() => {
            this.credentialError = false;
          }, 3000);
        });
    },
    resetForm () {
      const self = this;
      Object.keys(this.user).forEach((key) => {
        self.user[key] = '';
      });
    },
  },
};
</script>

<style scoped>
</style>
