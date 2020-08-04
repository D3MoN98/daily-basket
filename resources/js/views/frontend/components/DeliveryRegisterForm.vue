<template>
  <form
    id="deliverySignupForm"
    @submit.prevent="deliveryRegister"
    data-signup-form="delivery"
    class="signup-form animate__animated animate__fadeIn"
    style="display:none"
  >
    <div class="form-group">
      <input
        type="text"
        v-model="delivery.name"
        class="form-control"
        :class="{'is-invalid': submitted && $v.delivery.name.$error}"
        placeholder="Enter Name"
      />
      <span v-if="submitted && !$v.delivery.name.required" class="invalid-feedback">Name is required</span>
      <span
        v-if="submitted && !$v.delivery.name.minLength"
        class="invalid-feedback"
      >Name should should consist minimum 10 letter</span>
    </div>
    <div class="form-group">
      <input
        type="email"
        class="form-control"
        v-model="delivery.email"
        :class="{'is-invalid': submitted && $v.delivery.email.$error}"
        placeholder="Enter email address"
      />
      <span
        v-if="submitted && !$v.delivery.email.required"
        class="invalid-feedback"
      >Email is required</span>
      <span
        v-if="submitted && !$v.delivery.email.email"
        class="invalid-feedback"
      >Enter a valid email</span>
    </div>

    <div class="form-group">
      <input
        type="password"
        class="form-control"
        v-model="delivery.password"
        :class="{'is-invalid': submitted && $v.delivery.password.$error}"
        placeholder="Enter password"
      />
      <span
        v-if="submitted && !$v.delivery.password.required"
        class="invalid-feedback"
      >Password is required</span>
      <span
        v-if="submitted && !$v.delivery.password.minLength"
        class="invalid-feedback"
      >Password should be minimum 6 character</span>
    </div>

    <div class="form-group">
      <input
        type="password"
        v-model="delivery.confirm_password"
        :class="{'is-invalid': submitted && $v.delivery.confirm_password.$error}"
        class="form-control"
        placeholder="Re-enter password"
      />
      <span
        v-if="submitted && !$v.delivery.confirm_password.sameAsPassword"
        class="invalid-feedback"
      >Confirm Password should be same as password</span>
    </div>

    <div class="form-group">
      <input
        type="tel"
        v-model="delivery.contact_no"
        :class="{'is-invalid': submitted && $v.delivery.contact_no.$error}"
        class="form-control"
        placeholder="Contact No."
      />
      <span
        v-if="submitted && !$v.delivery.contact_no.required"
        class="invalid-feedback"
      >Contact No is required</span>
    </div>

    <div class="form-group">
      <input
        type="text"
        v-model="delivery.flat_no"
        class="form-control"
        :class="{'is-invalid': submitted && $v.delivery.flat_no.$error}"
        placeholder="Flat No./ House No"
      />
      <span
        v-if="submitted && !$v.delivery.flat_no.required"
        class="invalid-feedback"
      >Flat No is required</span>
    </div>

    <div class="form-group address_group">
      <textarea
        v-model="delivery.address"
        class="form-control"
        :class="{'is-invalid': submitted && $v.delivery.address.$error}"
        placeholder="Enter address"
      ></textarea>
      <span
        v-if="submitted && !$v.delivery.address.required"
        class="invalid-feedback"
      >Address is required</span>
    </div>

    <div class="form-group mar_btn_0">
      <input
        type="text"
        v-model="delivery.address_type"
        class="form-control"
        :class="{'is-invalid': submitted && $v.delivery.address_type.$error}"
        placeholder="Save As Home/Office/Work/Other Etc."
      />
      <span
        v-if="submitted && !$v.delivery.address_type.required"
        class="invalid-feedback"
      >Address Type is required</span>
    </div>
    <div class="frm_btm">
      <input type="submit" value="Sign Up" />
    </div>
    <div class="frm_alter_btn text-center">
      <h4>
        Already Member?
        <a
          href
          data-toggle="modal"
          data-target="#log_in_modal"
          data-dismiss="modal"
        >Login</a>
      </h4>
    </div>
  </form>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      delivery: {
        name: null,
        email: null,
        password: null,
        confirm_password: null,
        contact_no: null,
        flat_no: null,
        address: null,
        address_type: null,
      },
      submitted: false,
    };
  },
  validations: {
    delivery: {
      name: {
        required,
        minLength: minLength(10),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      confirm_password: {
        sameAsPassword: sameAs("password"),
      },
      contact_no: {
        required,
      },
      flat_no: {
        required,
      },
      address: {
        required,
      },
      address_type: {
        required,
      },
    },
  },
  methods: {
    deliveryRegister() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      alert("submitted");
    },
  },
};
</script>

<style>
</style>
