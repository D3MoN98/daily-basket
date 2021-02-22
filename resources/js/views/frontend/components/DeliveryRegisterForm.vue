<template>
    <form
        id="deliverySignupForm"
        @submit.prevent="deliveryRegister"
        data-signup-form="delivery"
        class="signup-form animate__animated animate__fadeIn"
    >
        <div
            class="form-group"
            :class="{
                'animate__animated animate__shakeX':
                    formError && $v.delivery.name.$error
            }"
        >
            <input
                type="text"
                v-model="delivery.name"
                class="form-control"
                :class="{ 'is-invalid': formError && $v.delivery.name.$error }"
                placeholder="Enter Name"
            />
            <label class="form-control-placeholder" for="name"
                >Enter Name</label
            >
            <span
                v-if="formError && !$v.delivery.name.required"
                class="invalid-feedback"
                >Name is required</span
            >
            <span
                v-if="formError && !$v.delivery.name.minLength"
                class="invalid-feedback"
                >Name should should consist minimum 6 letter</span
            >
        </div>
        <div
            class="form-group"
            :class="{
                'animate__animated animate__shakeX':
                    formError && $v.delivery.email.$error
            }"
        >
            <input
                type="email"
                class="form-control"
                v-model="delivery.email"
                :class="{ 'is-invalid': formError && $v.delivery.email.$error }"
                placeholder="Enter email address"
            />
            <label class="form-control-placeholder" for="name"
                >Enter Email</label
            >
            <span
                v-if="formError && !$v.delivery.email.required"
                class="invalid-feedback"
                >Email is required</span
            >
            <span
                v-if="formError && !$v.delivery.email.email"
                class="invalid-feedback"
                >Enter a valid email</span
            >
            <span
                v-if="formError && !$v.delivery.email.isUnique"
                class="invalid-feedback"
                >Email already exist</span
            >
        </div>

        <div
            class="form-group"
            :class="{
                'animate__animated animate__shakeX':
                    formError && $v.delivery.password.$error
            }"
        >
            <input
                type="password"
                class="form-control"
                v-model="delivery.password"
                :class="{
                    'is-invalid': formError && $v.delivery.password.$error
                }"
                placeholder="Enter password"
            />
            <label class="form-control-placeholder" for="name"
                >Enter Password</label
            >
            <span
                v-if="formError && !$v.delivery.password.required"
                class="invalid-feedback"
                >Password is required</span
            >
            <span
                v-if="formError && !$v.delivery.password.minLength"
                class="invalid-feedback"
                >Password should be minimum 6 character</span
            >
        </div>

        <div
            class="form-group"
            :class="{
                'animate__animated animate__shakeX':
                    formError && $v.delivery.confirm_password.$error
            }"
        >
            <input
                type="password"
                v-model="delivery.confirm_password"
                :class="{
                    'is-invalid':
                        formError && $v.delivery.confirm_password.$error
                }"
                class="form-control"
                placeholder="Re-enter password"
            />
            <label class="form-control-placeholder" for="name"
                >Enter Confirm Password</label
            >
            <span
                v-if="formError && !$v.delivery.confirm_password.sameAsPassword"
                class="invalid-feedback"
                >Confirm Password should be same as password</span
            >
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div
                    class="form-group"
                    :class="{
                        'animate__animated animate__shakeX':
                            formError && $v.delivery.contact_no.$error
                    }"
                >
                    <input
                        type="tel"
                        v-model="delivery.contact_no"
                        :class="{
                            'is-invalid':
                                formError && $v.delivery.contact_no.$error
                        }"
                        class="form-control"
                        placeholder="Contact No."
                        @keypress="isNumber"
                    />
                    <label class="form-control-placeholder" for="name"
                        >Enter Contact No</label
                    >
                    <span
                        v-if="formError && !$v.delivery.contact_no.required"
                        class="invalid-feedback"
                        >Contact No is required</span
                    >
                    <span
                        v-if="formError && !$v.delivery.contact_no.minLength"
                        class="invalid-feedback"
                        >Contact No should be between 10 to 12 digit</span
                    >
                    <span
                        v-if="
                            formError && !$v.delivery.contact_no.isUniqueContact
                        "
                        class="invalid-feedback"
                        >Contact No already exist</span
                    >
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Agent Code (optional)"
                    />
                    <label class="form-control-placeholder" for="name"
                        >Enter Agent Code</label
                    >
                </div>
            </div>
        </div>

        <div
            class="form-group"
            :class="{
                'animate__animated animate__shakeX':
                    formError && $v.delivery.house_no.$error
            }"
        >
            <input
                type="text"
                v-model="delivery.house_no"
                class="form-control"
                :class="{
                    'is-invalid': formError && $v.delivery.house_no.$error
                }"
                placeholder="Flat No./ House No"
            />
            <label class="form-control-placeholder" for="name"
                >Enter Flat No</label
            >
            <span
                v-if="formError && !$v.delivery.house_no.required"
                class="invalid-feedback"
                >Flat No is required</span
            >
        </div>

        <div
            class="form-group address_group"
            :class="{
                'animate__animated animate__shakeX':
                    formError && $v.delivery.address.$error
            }"
        >
            <textarea
                v-model="delivery.address"
                class="form-control"
                :class="{
                    'is-invalid': formError && $v.delivery.address.$error
                }"
                placeholder="Enter address"
            ></textarea>
            <label class="form-control-placeholder" for="name"
                >Enter Address</label
            >
            <span
                v-if="formError && !$v.delivery.address.required"
                class="invalid-feedback"
                >Address is required</span
            >
        </div>

        <div class="frm_btm">
            <button
                type="submit"
                class="btn btn-primary btn-block"
                :disabled="submitted"
            >
                Sign Up
                <span
                    class="fa fa-circle-notch fa-spin"
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
                    >Login</a
                >
            </h4>
        </div>
    </form>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            delivery: {
                name: null,
                email: null,
                password: null,
                confirm_password: null,
                contact_no: null,
                house_no: null,
                address: null
            },
            isUnique: true,
            isUniqueContact: true,
            submitted: false,
            formError: false
        };
    },
    validations: {
        delivery: {
            name: {
                required,
                minLength: minLength(6)
            },
            email: {
                required,
                email,
                isUnique() {
                    return this.isUnique;
                }
            },
            password: {
                required,
                minLength: minLength(6)
            },
            confirm_password: {
                sameAsPassword: sameAs("password")
            },
            contact_no: {
                required,
                minLength: minLength(10),
                isUniqueContact() {
                    return this.isUniqueContact;
                }
            },
            house_no: {
                required
            },
            address: {
                required
            }
        }
    },
    methods: {
        deliveryRegister() {
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
                .dispatch("auth/deliveryRegister", this.delivery)
                .then(response => {
                    $("#sign_up_modal").modal("hide");
                    Swal.fire("Good job!", response.data.success, "success");
                    this.submitted = false;
                    this.resetForm();
                })
                .catch(error => {
                    this.submitted = false;

                    if (error.response) {
                        if (error.response.status === 500) {
                            $("#sign_up_modal").modal("hide");

                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: "<a href>Why do I have this issue?</a>"
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
        resetForm() {
            const self = this;
            self.submitted = false;
            Object.keys(this.delivery).forEach(key => {
                self.delivery[key] = "";
            });
        },
        isNumber($e) {
            const charCode = $e.which ? $e.which : $e.keyCode;
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57) &&
                charCode !== 46
            ) {
                return $e.preventDefault();
            }
            return true;
        }
    }
};
</script>

<style></style>
