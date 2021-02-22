<template>
    <div
        class="modal fade"
        id="deliveryBoyModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delivery Boy Details</h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form
                        id="deliveryBoySignupForm"
                        @submit.prevent="deliveryBoyRegister"
                        data-signup-form="delivery_boy"
                        class="signup-form animate__animated animate__fadeIn"
                    >
                        <div
                            class="form-group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.delivery_boy.name.$error
                            }"
                        >
                            <input
                                type="text"
                                v-model="delivery_boy.name"
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        formError && $v.delivery_boy.name.$error
                                }"
                                placeholder="Enter Name"
                            />
                            <span
                                v-if="
                                    formError && !$v.delivery_boy.name.required
                                "
                                class="invalid-feedback"
                                >Name is required</span
                            >
                            <span
                                v-if="
                                    formError && !$v.delivery_boy.name.minLength
                                "
                                class="invalid-feedback"
                                >Name should should consist minimum 6
                                letter</span
                            >
                        </div>
                        <div
                            class="form-group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.delivery_boy.email.$error
                            }"
                        >
                            <input
                                type="email"
                                class="form-control"
                                v-model="delivery_boy.email"
                                :class="{
                                    'is-invalid':
                                        formError &&
                                        $v.delivery_boy.email.$error
                                }"
                                placeholder="Enter email address"
                            />
                            <span
                                v-if="
                                    formError && !$v.delivery_boy.email.required
                                "
                                class="invalid-feedback"
                                >Email is required</span
                            >
                            <span
                                v-if="formError && !$v.delivery_boy.email.email"
                                class="invalid-feedback"
                                >Enter a valid email</span
                            >
                            <span
                                v-if="
                                    formError && !$v.delivery_boy.email.isUnique
                                "
                                class="invalid-feedback"
                                >Email already exist</span
                            >
                        </div>

                        <div
                            class="form-group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.delivery_boy.password.$error
                            }"
                        >
                            <input
                                type="password"
                                class="form-control"
                                v-model="delivery_boy.password"
                                :class="{
                                    'is-invalid':
                                        formError &&
                                        $v.delivery_boy.password.$error
                                }"
                                placeholder="Enter password"
                            />
                            <span
                                v-if="
                                    formError &&
                                        !$v.delivery_boy.password.required
                                "
                                class="invalid-feedback"
                                >Password is required</span
                            >
                            <span
                                v-if="
                                    formError &&
                                        !$v.delivery_boy.password.minLength
                                "
                                class="invalid-feedback"
                                >Password should be minimum 6 character</span
                            >
                        </div>

                        <div
                            class="form-group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError &&
                                    $v.delivery_boy.confirm_password.$error
                            }"
                        >
                            <input
                                type="password"
                                v-model="delivery_boy.confirm_password"
                                :class="{
                                    'is-invalid':
                                        formError &&
                                        $v.delivery_boy.confirm_password.$error
                                }"
                                class="form-control"
                                placeholder="Re-enter password"
                            />
                            <span
                                v-if="
                                    formError &&
                                        !$v.delivery_boy.confirm_password
                                            .sameAsPassword
                                "
                                class="invalid-feedback"
                                >Confirm Password should be same as
                                password</span
                            >
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <div
                                    class="form-group"
                                    :class="{
                                        'animate__animated animate__shakeX':
                                            formError &&
                                            $v.delivery_boy.contact_no.$error
                                    }"
                                >
                                    <input
                                        type="tel"
                                        v-model="delivery_boy.contact_no"
                                        :class="{
                                            'is-invalid':
                                                formError &&
                                                $v.delivery_boy.contact_no
                                                    .$error
                                        }"
                                        class="form-control"
                                        placeholder="Contact No."
                                        @keypress="isNumber"
                                        maxlength="10"
                                    />
                                    <span
                                        v-if="
                                            formError &&
                                                !$v.delivery_boy.contact_no
                                                    .required
                                        "
                                        class="invalid-feedback"
                                        >Contact No is required</span
                                    >
                                    <span
                                        v-if="
                                            formError &&
                                                !$v.delivery_boy.contact_no
                                                    .minLength
                                        "
                                        class="invalid-feedback"
                                        >Contact No should be between 10 to 12
                                        digit</span
                                    >
                                    <span
                                        v-if="
                                            formError &&
                                                !$v.delivery_boy.contact_no
                                                    .isUniqueContact
                                        "
                                        class="invalid-feedback"
                                        >Contact No already exist</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div
                            class="form-group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.delivery_boy.house_no.$error
                            }"
                        >
                            <input
                                type="text"
                                v-model="delivery_boy.house_no"
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        formError &&
                                        $v.delivery_boy.house_no.$error
                                }"
                                placeholder="Flat No./ House No"
                            />
                            <span
                                v-if="
                                    formError &&
                                        !$v.delivery_boy.house_no.required
                                "
                                class="invalid-feedback"
                                >Flat No is required</span
                            >
                        </div>

                        <div
                            class="form-group address_group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.delivery_boy.address.$error
                            }"
                        >
                            <textarea
                                v-model="delivery_boy.address"
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        formError &&
                                        $v.delivery_boy.address.$error
                                }"
                                placeholder="Enter address"
                            ></textarea>
                            <span
                                v-if="
                                    formError &&
                                        !$v.delivery_boy.address.required
                                "
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
                                Add Delivery Boy
                                <span
                                    class="fa fa-circle-notch fa-spin"
                                    role="status"
                                    aria-hidden="true"
                                    v-show="submitted"
                                ></span>
                            </button>
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
            delivery_boy: {
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
        delivery_boy: {
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
        deliveryBoyRegister() {
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
                .dispatch(
                    "sellerDeliveryBoy/deliveryBoyRegister",
                    this.delivery_boy
                )
                .then(response => {
                    $("#deliveryBoyModal").modal("hide");
                    Swal.fire("Good job!", response.data.success, "success");
                    this.submitted = false;
                    this.resetForm();
                })
                .catch(error => {
                    this.submitted = false;

                    if (error.response) {
                        if (error.response.status === 500) {
                            $("#deliveryBoyModal").modal("hide");

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
            Object.keys(this.delivery_boy).forEach(key => {
                self.delivery_boy[key] = "";
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
