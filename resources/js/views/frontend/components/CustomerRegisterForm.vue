<template>
  <form
    id="customerSignupForm"
    @submit.prevent="customerRegister"
    data-signup-form="customer"
    class="signup-form animate__animated animate__fadeIn"
  >
    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': submitted && $v.customer.name.$error}"
    >
      <input
        type="text"
        v-model="customer.name"
        class="form-control"
        :class="{'is-invalid': submitted && $v.customer.name.$error}"
        placeholder="Enter Name"
      />
      <span v-if="submitted && !$v.customer.name.required" class="invalid-feedback">Name is required</span>
      <span
        v-if="submitted && !$v.customer.name.minLength"
        class="invalid-feedback"
      >Name should should consist minimum 10 letter</span>
    </div>
    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': submitted && $v.customer.email.$error}"
    >
      <input
        type="email"
        class="form-control"
        v-model="customer.email"
        :class="{'is-invalid': submitted && $v.customer.email.$error}"
        placeholder="Enter email address"
      />
      <span
        v-if="submitted && !$v.customer.email.required"
        class="invalid-feedback"
      >Email is required</span>
      <span
        v-if="submitted && !$v.customer.email.email"
        class="invalid-feedback"
      >Enter a valid email</span>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': submitted && $v.customer.password.$error}"
    >
      <input
        type="password"
        class="form-control"
        v-model="customer.password"
        :class="{'is-invalid': submitted && $v.customer.password.$error}"
        placeholder="Enter password"
      />
      <span
        v-if="submitted && !$v.customer.password.required"
        class="invalid-feedback"
      >Password is required</span>
      <span
        v-if="submitted && !$v.customer.password.minLength"
        class="invalid-feedback"
      >Password should be minimum 6 character</span>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': submitted && $v.customer.confirm_password.$error}"
    >
      <input
        type="password"
        v-model="customer.confirm_password"
        :class="{'is-invalid': submitted && $v.customer.confirm_password.$error}"
        class="form-control"
        placeholder="Re-enter password"
      />
      <span
        v-if="submitted && !$v.customer.confirm_password.sameAsPassword"
        class="invalid-feedback"
      >Confirm Password should be same as password</span>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div
          class="form-group"
          :class="{'animate__animated animate__shakeX': submitted && $v.customer.contact_no.$error}"
        >
          <input
            type="tel"
            v-model="customer.contact_no"
            :class="{'is-invalid': submitted && $v.customer.contact_no.$error}"
            class="form-control"
            placeholder="Contact No."
          />
          <span
            v-if="submitted && !$v.customer.contact_no.required"
            class="invalid-feedback"
          >Contact No is required</span>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Agent Code (optional)" />
        </div>
      </div>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': submitted && $v.customer.flat_no.$error}"
    >
      <input
        type="text"
        v-model="customer.flat_no"
        class="form-control"
        :class="{'is-invalid': submitted && $v.customer.flat_no.$error}"
        placeholder="Flat No./ House No"
      />
      <span
        v-if="submitted && !$v.customer.flat_no.required"
        class="invalid-feedback"
      >Flat No is required</span>
    </div>

    <div
      class="form-group address_group"
      :class="{'animate__animated animate__shakeX': submitted && $v.customer.address.$error}"
    >
      <textarea
        v-model="customer.address"
        class="form-control"
        :class="{'is-invalid': submitted && $v.customer.address.$error}"
        placeholder="Enter address"
      ></textarea>
      <span
        v-if="submitted && !$v.customer.address.required"
        class="invalid-feedback"
      >Address is required</span>
    </div>

    <div
      class="form-group mar_btn_0"
      :class="{'animate__animated animate__shakeX': submitted && $v.customer.address_type.$error}"
    >
      <input
        type="text"
        v-model="customer.address_type"
        class="form-control"
        :class="{'is-invalid': submitted && $v.customer.address_type.$error}"
        placeholder="Save As Home/Office/Work/Other Etc."
      />
      <span
        v-if="submitted && !$v.customer.address_type.required"
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
      customer: {
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
    customer: {
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
    customerRegister() {
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
