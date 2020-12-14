<template>
    <div
        class="modal fade"
        id="kithcenStaffModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Kithen Staff Details</h5>
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
                        id="kitchenSignupForm"
                        @submit.prevent="kitchenRegister"
                        data-signup-form="kitchen"
                        class="signup-form animate__animated animate__fadeIn"
                    >
                        <div
                            class="form-group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.kitchen.name.$error
                            }"
                        >
                            <input
                                type="text"
                                v-model="kitchen.name"
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        formError && $v.kitchen.name.$error
                                }"
                                placeholder="Enter Name"
                            />
                            <span
                                v-if="formError && !$v.kitchen.name.required"
                                class="invalid-feedback"
                                >Name is required</span
                            >
                            <span
                                v-if="formError && !$v.kitchen.name.minLength"
                                class="invalid-feedback"
                                >Name should should consist minimum 6
                                letter</span
                            >
                        </div>
                        <div
                            class="form-group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.kitchen.email.$error
                            }"
                        >
                            <input
                                type="email"
                                class="form-control"
                                v-model="kitchen.email"
                                :class="{
                                    'is-invalid':
                                        formError && $v.kitchen.email.$error
                                }"
                                placeholder="Enter email address"
                            />
                            <span
                                v-if="formError && !$v.kitchen.email.required"
                                class="invalid-feedback"
                                >Email is required</span
                            >
                            <span
                                v-if="formError && !$v.kitchen.email.email"
                                class="invalid-feedback"
                                >Enter a valid email</span
                            >
                            <span
                                v-if="formError && !$v.kitchen.email.isUnique"
                                class="invalid-feedback"
                                >Email already exist</span
                            >
                        </div>

                        <div
                            class="form-group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.kitchen.password.$error
                            }"
                        >
                            <input
                                type="password"
                                class="form-control"
                                v-model="kitchen.password"
                                :class="{
                                    'is-invalid':
                                        formError && $v.kitchen.password.$error
                                }"
                                placeholder="Enter password"
                            />
                            <span
                                v-if="
                                    formError && !$v.kitchen.password.required
                                "
                                class="invalid-feedback"
                                >Password is required</span
                            >
                            <span
                                v-if="
                                    formError && !$v.kitchen.password.minLength
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
                                    $v.kitchen.confirm_password.$error
                            }"
                        >
                            <input
                                type="password"
                                v-model="kitchen.confirm_password"
                                :class="{
                                    'is-invalid':
                                        formError &&
                                        $v.kitchen.confirm_password.$error
                                }"
                                class="form-control"
                                placeholder="Re-enter password"
                            />
                            <span
                                v-if="
                                    formError &&
                                        !$v.kitchen.confirm_password
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
                                            $v.kitchen.contact_no.$error
                                    }"
                                >
                                    <input
                                        type="tel"
                                        v-model="kitchen.contact_no"
                                        :class="{
                                            'is-invalid':
                                                formError &&
                                                $v.kitchen.contact_no.$error
                                        }"
                                        class="form-control"
                                        placeholder="Contact No."
                                        @keypress="isNumber"
                                        maxlength="10"
                                    />
                                    <span
                                        v-if="
                                            formError &&
                                                !$v.kitchen.contact_no.required
                                        "
                                        class="invalid-feedback"
                                        >Contact No is required</span
                                    >
                                    <span
                                        v-if="
                                            formError &&
                                                !$v.kitchen.contact_no.minLength
                                        "
                                        class="invalid-feedback"
                                        >Contact No should be between 10 to 12
                                        digit</span
                                    >
                                    <span
                                        v-if="
                                            formError &&
                                                !$v.kitchen.contact_no
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
                                    formError && $v.kitchen.house_no.$error
                            }"
                        >
                            <input
                                type="text"
                                v-model="kitchen.house_no"
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        formError && $v.kitchen.house_no.$error
                                }"
                                placeholder="Flat No./ House No"
                            />
                            <span
                                v-if="
                                    formError && !$v.kitchen.house_no.required
                                "
                                class="invalid-feedback"
                                >Flat No is required</span
                            >
                        </div>

                        <div
                            class="form-group address_group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.kitchen.address.$error
                            }"
                        >
                            <textarea
                                v-model="kitchen.address"
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        formError && $v.kitchen.address.$error
                                }"
                                placeholder="Enter address"
                            ></textarea>
                            <span
                                v-if="formError && !$v.kitchen.address.required"
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
                                Add Kitchen Staff
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
        </div>
    </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            kitchen: {
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
        kitchen: {
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
        kitchenRegister() {
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
                .dispatch("sellerKitchen/kitchenStaffRegister", this.kitchen)
                .then(response => {
                    $("#kithcenStaffModal").modal("hide");
                    Swal.fire("Good job!", response.data.success, "success");
                    this.submitted = false;
                    this.resetForm();
                })
                .catch(error => {
                    this.submitted = false;

                    if (error.response) {
                        if (error.response.status === 500) {
                            $("#kithcenStaffModal").modal("hide");

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
            Object.keys(this.kitchen).forEach(key => {
                self.kitchen[key] = "";
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
