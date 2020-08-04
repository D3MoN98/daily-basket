<template>
  <form
    id="sellerSignupForm"
    @submit.prevent="sellerRegister"
    data-signup-form="seller"
    class="signup-form animate__animated animate__fadeIn"
    style="display:none"
  >
    <div class="form-group">
      <input
        type="text"
        v-model="seller.name"
        class="form-control"
        :class="{'is-invalid': submitted && $v.seller.name.$error}"
        placeholder="Enter Seller Name"
      />
      <span v-if="submitted && !$v.seller.name.required" class="invalid-feedback">Name is required</span>
      <span
        v-if="submitted && !$v.seller.name.minLength"
        class="invalid-feedback"
      >Name should should consist minimum 10 letter</span>
    </div>
    <div class="form-group">
      <input
        type="email"
        class="form-control"
        v-model="seller.email"
        :class="{'is-invalid': submitted && $v.seller.email.$error}"
        placeholder="Enter email address"
      />
      <span v-if="submitted && !$v.seller.email.required" class="invalid-feedback">Email is required</span>
      <span v-if="submitted && !$v.seller.email.email" class="invalid-feedback">Enter a valid email</span>
    </div>

    <div class="form-group">
      <input
        type="password"
        class="form-control"
        v-model="seller.password"
        :class="{'is-invalid': submitted && $v.seller.password.$error}"
        placeholder="Enter password"
      />
      <span
        v-if="submitted && !$v.seller.password.required"
        class="invalid-feedback"
      >Password is required</span>
      <span
        v-if="submitted && !$v.seller.password.minLength"
        class="invalid-feedback"
      >Password should be minimum 6 character</span>
    </div>

    <div class="form-group">
      <input
        type="password"
        v-model="seller.confirm_password"
        :class="{'is-invalid': submitted && $v.seller.confirm_password.$error}"
        class="form-control"
        placeholder="Re-enter password"
      />
      <span
        v-if="submitted && !$v.seller.confirm_password.sameAsPassword"
        class="invalid-feedback"
      >Confirm Password should be same as password</span>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <input
            type="tel"
            v-model="seller.contact_no"
            :class="{'is-invalid': submitted && $v.seller.contact_no.$error}"
            class="form-control"
            placeholder="Contact No."
          />
          <span
            v-if="submitted && !$v.seller.contact_no.required"
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

    <div class="form-group">
      <input
        type="text"
        v-model="seller.flat_no"
        class="form-control"
        :class="{'is-invalid': submitted && $v.seller.flat_no.$error}"
        placeholder="Flat No./ House No"
      />
      <span
        v-if="submitted && !$v.seller.flat_no.required"
        class="invalid-feedback"
      >Flat No is required</span>
    </div>

    <div class="form-group address_group">
      <textarea
        v-model="seller.address"
        class="form-control"
        :class="{'is-invalid': submitted && $v.seller.address.$error}"
        placeholder="Enter address"
      ></textarea>
      <span
        v-if="submitted && !$v.seller.address.required"
        class="invalid-feedback"
      >Address is required</span>
    </div>

    <div class="form-group">
      <input
        type="text"
        v-model="seller.gstin_no"
        class="form-control"
        :class="{'is-invalid': submitted && $v.seller.gstin_no.$error}"
        placeholder="Enter GSTIN No"
      />
      <span
        v-if="submitted && !$v.seller.gstin_no.required"
        class="invalid-feedback"
      >GSTIN No is required</span>
    </div>

    <div class="form-group mar_btn_0">
      <input
        type="text"
        v-model="seller.fssai_license_no"
        class="form-control"
        :class="{'is-invalid': submitted && $v.seller.fssai_license_no.$error}"
        placeholder="Enter Fssai License no"
      />
      <span
        v-if="submitted && !$v.seller.fssai_license_no.required"
        class="invalid-feedback"
      >Fssai License No is required</span>
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
      seller: {
        name: null,
        email: null,
        password: null,
        confirm_password: null,
        contact_no: null,
        flat_no: null,
        address: null,
        gstin_no: null,
        fssai_license_no: null,
      },
      submitted: false,
    };
  },
  validations: {
    seller: {
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
      gstin_no: {
        required,
      },
      fssai_license_no: {
        required,
      },
    },
  },
  methods: {
    sellerRegister() {
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
