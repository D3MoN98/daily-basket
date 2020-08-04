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
            <div class="alert alert-danger animate_animated animate__bounceIn" role="alert">
              <strong>danger</strong>
            </div>
            <div class="form-group">
              <input
                type="email"
                v-model="user.email"
                class="form-control"
                :class="{
                                    'is-invalid':
                                        submitted && $v.user.email.$error
                                }"
                placeholder="Email"
              />
              <span
                v-if="submitted && !$v.user.email.required"
                class="invalid-feedback"
              >Email is required</span>
              <span
                v-if="submitted && !$v.user.email.email"
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
                                        submitted && $v.user.password.$error
                                }"
                placeholder="Password"
              />
              <span
                v-if="submitted && !$v.user.email.required"
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
              <button type="submit" class="btn btn-primary btn-block">Login</button>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      remember: false,
      submitted: false,
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
    login(e) {
      // e.preventDefault();
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      $(".frm_btm .btn").append(
        ' <span class="fa fa-circle-o-notch fa-spin" role="status" aria-hidden="true"></span>'
      );
      $(".frm_btm .btn").attr("disabled", "disabled");

      this.$store
        .dispatch("auth/login", this.user)
        .then(() => {
          $("#log_in_modal").modal("hide");
          const form = $("#loginForm");
          form.find(".frm_btm .btn").removeAttr("disabled");
          form.find(".frm_btm .btn .fa-circle-o-notch").remove();
        })
        .catch((error) => {
          const form = $("#loginForm");
          form.find(".alert-danger strong").html(error.response.data.error);
          form.find(".alert").show();
          form.find(".frm_btm .btn").removeAttr("disabled");
          form.find(".frm_btm .btn .fa-circle-o-notch").remove();
          this.resetForm();
          this.submitted = false;
          setTimeout(() => {
            $(".alert-danger").hide();
          }, 3000);
        });
    },
    resetForm() {
      var self = this;
      Object.keys(this.user).forEach(function (key, index) {
        self.user[key] = "";
      });
    },
  },
};
</script>

<style scoped>
.alert-danger {
  display: none;
}
</style>
