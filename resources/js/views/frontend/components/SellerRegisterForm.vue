<template>
  <form
    id="sellerSignupForm"
    @submit.prevent="sellerRegister"
    data-signup-form="seller"
    class="signup-form animate__animated animate__fadeIn"
  >
    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.seller.name.$error}"
    >
      <input
        type="text"
        v-model="seller.name"
        class="form-control"
        :class="{'is-invalid': formError && $v.seller.name.$error}"
        placeholder="Enter Seller Name"
      />
      <span v-if="formError && !$v.seller.name.required" class="invalid-feedback">Name is required</span>
      <span
        v-if="formError && !$v.seller.name.minLength"
        class="invalid-feedback"
      >Name should should consist minimum 10 letter</span>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.seller.email.$error}"
    >
      <input
        type="email"
        class="form-control"
        v-model="seller.email"
        :class="{'is-invalid': formError && $v.seller.email.$error}"
        placeholder="Enter email address"
      />
      <span v-if="formError && !$v.seller.email.required" class="invalid-feedback">Email is required</span>
      <span v-if="formError && !$v.seller.email.email" class="invalid-feedback">Enter a valid email</span>
      <span
        v-if="formError && !$v.seller.email.isUniqe"
        class="invalid-feedback"
      >Email already exist</span>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.seller.password.$error}"
    >
      <input
        type="password"
        class="form-control"
        v-model="seller.password"
        :class="{'is-invalid': formError && $v.seller.password.$error}"
        placeholder="Enter password"
      />
      <span
        v-if="formError && !$v.seller.password.required"
        class="invalid-feedback"
      >Password is required</span>
      <span
        v-if="formError && !$v.seller.password.minLength"
        class="invalid-feedback"
      >Password should be minimum 6 character</span>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.seller.confirm_password.$error}"
    >
      <input
        type="password"
        v-model="seller.confirm_password"
        :class="{'is-invalid': formError && $v.seller.confirm_password.$error}"
        class="form-control"
        placeholder="Re-enter password"
      />
      <span
        v-if="formError && !$v.seller.confirm_password.sameAsPassword"
        class="invalid-feedback"
      >Confirm Password should be same as password</span>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div
          class="form-group"
          :class="{'animate__animated animate__shakeX': formError && $v.seller.contact_no.$error}"
        >
          <input
            type="tel"
            v-model="seller.contact_no"
            :class="{'is-invalid': formError && $v.seller.contact_no.$error}"
            class="form-control"
            placeholder="Contact No."
          />
          <span
            v-if="formError && !$v.seller.contact_no.required"
            class="invalid-feedback"
          >Contact No is required</span>
          <span
            v-if="formError && !$v.seller.contact_no.minLength"
            class="invalid-feedback"
          >Contact No should be between 10 to 12 digit</span>
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
      :class="{'animate__animated animate__shakeX': formError && $v.seller.house_no.$error}"
    >
      <input
        type="text"
        v-model="seller.house_no"
        class="form-control"
        :class="{'is-invalid': formError && $v.seller.house_no.$error}"
        placeholder="Flat No./ House No"
      />
      <span
        v-if="formError && !$v.seller.house_no.required"
        class="invalid-feedback"
      >Flat No is required</span>
    </div>

    <div
      class="form-group address_group"
      :class="{'animate__animated animate__shakeX': formError && $v.seller.address.$error}"
    >
      <textarea
        v-model="seller.address"
        class="form-control"
        :class="{'is-invalid': formError && $v.seller.address.$error}"
        placeholder="Enter address"
      ></textarea>
      <span
        v-if="formError && !$v.seller.address.required"
        class="invalid-feedback"
      >Address is required</span>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.seller.gstin_no.$error}"
    >
      <input
        type="text"
        v-model="seller.gstin_no"
        class="form-control"
        :class="{'is-invalid': formError && $v.seller.gstin_no.$error}"
        placeholder="Enter GSTIN No"
      />
      <span
        v-if="formError && !$v.seller.gstin_no.required"
        class="invalid-feedback"
      >GSTIN No is required</span>
    </div>

    <div
      class="form-group mar_btn_0"
      :class="{'animate__animated animate__shakeX': formError && $v.seller.fssai_license_no.$error}"
    >
      <input
        type="text"
        v-model="seller.fssai_license_no"
        class="form-control"
        :class="{'is-invalid': formError && $v.seller.fssai_license_no.$error}"
        placeholder="Enter Fssai License no"
      />
      <span
        v-if="formError && !$v.seller.fssai_license_no.required"
        class="invalid-feedback"
      >Fssai License No is required</span>
    </div>

    <div class="frm_btm">
      <button type="submit" class="btn btn-primary btn-block" :disabled="submitted">
        Sign Up
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
  sameAs,
} from 'vuelidate/lib/validators';

export default {
  data () {
    return {
      seller: {
        name: null,
        email: null,
        password: null,
        confirm_password: null,
        contact_no: null,
        house_no: null,
        address: null,
        gstin_no: null,
        fssai_license_no: null,
      },
      isUnique: true,
      submitted: false,
      formError: false,
    };
  },
  validations: {
    seller: {
      name: {
        required,
        minLength: minLength(6),
      },
      email: {
        required,
        email,
        isUnique () {
          return this.isUnique;
        },
      },
      password: {
        required,
        minLength: minLength(6),
      },
      confirm_password: {
        sameAsPassword: sameAs('password'),
      },
      contact_no: {
        required,
        minLength: minLength(8),
      },
      house_no: {
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
    sellerRegister () {
      this.submitted = true;
      this.isUnique = true;
      this.formError = false;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.formError = true;
        this.submitted = false;
        return;
      }

      this.$store
        .dispatch('auth/sellerRegister', this.seller)
        .then((response) => {
          $('#sign_up_modal').modal('hide');
          Swal.fire('Good job!', response.data.success, 'success');
          this.submitted = false;
          this.resetForm();
        })
        .catch((error) => {
          this.submitted = false;

          if (error.response) {
            if (error.response.status === 500) {
              $('#sign_up_modal').modal('hide');

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>',
              });
            }
            if (error.response.status === 422) {
              this.formError = true;
              this.isUnique = false;
            }
          }
        });
    },
    resetForm () {
      const self = this;
      self.submitted = false;
      Object.keys(this.seller).forEach((key) => {
        self.seller[key] = '';
      });
    },
    isNumber ($e) {
      const charCode = ($e.which) ? $e.which : $e.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        return $e.preventDefault();
      }
      return true;
    },
  },
};
</script>

<style>
</style>
