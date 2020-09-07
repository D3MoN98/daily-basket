<template>
  <form
    id="customerSignupForm"
    @submit.prevent="customerRegister"
    data-signup-form="customer"
    class="signup-form animate__animated animate__fadeIn"
    autocomplete="off"
  >
    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.customer.name.$error}"
    >
      <input
        type="text"
        v-model="customer.name"
        class="form-control"
        :class="{'is-invalid': formError && $v.customer.name.$error}"
        placeholder="Enter Name"
      />
      <label class="form-control-placeholder" for="name">Enter Name</label>
      <span v-if="formError && !$v.customer.name.required" class="invalid-feedback">Name is required</span>
      <span
        v-if="formError && !$v.customer.name.minLength"
        class="invalid-feedback"
      >Name should should consist minimum 6 letter</span>
    </div>
    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.customer.email.$error}"
    >
      <input
        type="email"
        class="form-control"
        v-model="customer.email"
        :class="{'is-invalid': formError && $v.customer.email.$error}"
        placeholder="Enter email address"
      />
      <label class="form-control-placeholder" for="name">Enter Email</label>
      <span
        v-if="formError && !$v.customer.email.required"
        class="invalid-feedback"
      >Email is required</span>
      <span
        v-if="formError && !$v.customer.email.email"
        class="invalid-feedback"
      >Enter a valid email</span>
      <span
        v-if="formError && !$v.customer.email.isUnique"
        class="invalid-feedback"
      >Email already exist</span>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.customer.password.$error}"
    >
      <input
        type="password"
        class="form-control"
        v-model="customer.password"
        :class="{'is-invalid': formError && $v.customer.password.$error}"
        placeholder="Enter password"
      />
      <label class="form-control-placeholder" for="name">Enter Password</label>
      <span
        v-if="formError && !$v.customer.password.required"
        class="invalid-feedback"
      >Password is required</span>
      <span
        v-if="formError && !$v.customer.password.minLength"
        class="invalid-feedback"
      >Password should be minimum 6 character</span>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.customer.confirm_password.$error}"
    >
      <input
        type="password"
        v-model="customer.confirm_password"
        :class="{'is-invalid': formError && $v.customer.confirm_password.$error}"
        class="form-control"
        placeholder="Re-enter password"
      />
      <label class="form-control-placeholder" for="name">Enter Confirm Password</label>
      <span
        v-if="formError && !$v.customer.confirm_password.sameAsPassword"
        class="invalid-feedback"
      >Confirm Password should be same as password</span>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div
          class="form-group"
          :class="{'animate__animated animate__shakeX': formError && $v.customer.contact_no.$error}"
        >
          <input
            type="tel"
            v-model="customer.contact_no"
            :class="{'is-invalid': formError && $v.customer.contact_no.$error}"
            class="form-control"
            placeholder="Contact No."
            maxlength="12"
            @keypress="isNumber"
          />
          <label class="form-control-placeholder" for="name">Enter Contact No</label>
          <span
            v-if="formError && !$v.customer.contact_no.required"
            class="invalid-feedback"
          >Contact No is required</span>
          <span
            v-if="formError && !$v.customer.contact_no.minLength"
            class="invalid-feedback"
          >Contact No should be between 10 to 12 digit</span>
          <span
            v-if="formError && !$v.customer.contact_no.isUniqueContact"
            class="invalid-feedback"
          >Contact No already exist</span>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Agent Code (optional)" />
          <label class="form-control-placeholder" for="name">Enter Agent Code</label>
        </div>
      </div>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.customer.house_no.$error}"
    >
      <input
        type="text"
        v-model="customer.house_no"
        class="form-control"
        :class="{'is-invalid': formError && $v.customer.house_no.$error}"
        placeholder="Flat No./ House No"
      />
      <label class="form-control-placeholder" for="name">Enter Flat No</label>
      <span
        v-if="formError && !$v.customer.house_no.required"
        class="invalid-feedback"
      >Flat No is required</span>
    </div>

    <div
      class="form-group address_group"
      :class="{'animate__animated animate__shakeX': formError && $v.customer.address.$error}"
    >
      <textarea
        v-model="customer.address"
        class="form-control"
        :class="{'is-invalid': formError && $v.customer.address.$error}"
        placeholder="Enter address"
      ></textarea>
      <label class="form-control-placeholder" for="name">Enter Address</label>
      <span
        v-if="formError && !$v.customer.address.required"
        class="invalid-feedback"
      >Address is required</span>
    </div>

    <div
      class="form-group"
      :class="{'animate__animated animate__shakeX': formError && $v.customer.address_type.$error}"
    >
      <div class="chk_btnn">
        <input
          type="radio"
          id="home_id"
          value="home"
          name="address_type"
          @change="addressTypeChange"
        />
        <label for="home_id">
          <span class="rdo_span rdo_home_i">Home</span>
        </label>

        <input
          type="radio"
          id="work_id"
          value="work"
          name="address_type"
          @change="addressTypeChange"
        />
        <label for="work_id">
          <span class="rdo_span rdo_home_w">Work</span>
        </label>

        <input
          type="radio"
          id="other_id"
          value="other"
          name="address_type"
          @change="addressTypeChange"
        />
        <label for="other_id">
          <span class="rdo_span rdo_home_o">Others</span>
        </label>

        <div class="others_box form-group">
          <input
            class="form-control"
            type="text"
            id="address-type-inp"
            v-model="customer.address_type"
            :class="{'is-invalid': formError && $v.customer.address_type.$error}"
            placeholder="Other"
          />
          <label class="form-control-placeholder" for="name">Other</label>
        </div>
      </div>
      <span
        v-if="formError && !$v.customer.address_type.required"
        class="invalid-feedback"
      >Address Type is required</span>
    </div>
    <!--
    <div
      class="form-group mar_btn_0"
      :class="{'animate__animated animate__shakeX': formError && $v.customer.address_type.$error}"
    >
      <input
        type="text"
        v-model="customer.address_type"
        class="form-control"
        :class="{'is-invalid': formError && $v.customer.address_type.$error}"
        placeholder="Save As Home/Office/Work/Other Etc."
      />
      <span
        v-if="formError && !$v.customer.address_type.required"
        class="invalid-feedback"
      >Address Type is required</span>
    </div>-->
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
      customer: {
        name: null,
        email: null,
        password: null,
        confirm_password: null,
        contact_no: null,
        house_no: null,
        address: null,
        address_type: null,
      },
      isUnique: true,
      isUniqueContact: true,
      submitted: false,
      formError: false,
    };
  },
  validations: {
    customer: {
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
        minLength: minLength(10),
        isUniqueContact () {
          return this.isUniqueContact
        }
      },
      house_no: {
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
    customerRegister () {
      this.submitted = true;
      this.isUnique = true;
      this.isUniqueContact = true;
      this.formError = false;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.formError = true;
        this.submitted = false;
        return;
      }

      this.$store
        .dispatch('auth/customerRegister', this.customer)
        .then((response) => {
          $('#sign_up_modal').modal('hide');
          Swal.fire('Good job!', response.data.success, 'success');
          this.submitted = false;
          this.resetForm();
        })
        .catch((error) => {
          console.log(error.response);
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
              if (error.response.data.errors.email) {
                this.isUnique = false;
              }
              if (error.response.data.errors.contact_no) {
                this.isUniqueContact = false;
              }
            }
          }
        });
    },
    resetForm () {
      const self = this;
      self.submitted = false;
      Object.keys(this.customer).forEach((key) => {
        self.customer[key] = '';
      });
    },
    isNumber ($e) {
      const charCode = ($e.which) ? $e.which : $e.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        return $e.preventDefault();
      }
      return true;
    },
    addressTypeChange ($e) {
      const inp = document.getElementById('address-type-inp');
      inp.value = '';
      if ($e.target.value !== 'other') {
        this.customer.address_type = $e.target.value;
      }
    },
  },
};
</script>

<style>
</style>
