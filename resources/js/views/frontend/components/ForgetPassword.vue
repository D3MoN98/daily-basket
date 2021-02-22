<template>
    <div class="modal fade log_in_u" id="foregt_password_modal">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content modal_form">
                <div class="modal-header">
                    <h5 class="modal-title">Forget Passwod</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="welcome_msg">
                        <h3>Welcome Dailybasket</h3>
                    </div>
                    <form
                        id="foregtPasswordForm"
                        @submit.prevent="foregtPassword"
                    >
                        <div class="form-group">
                            <input
                                type="email"
                                v-model="email"
                                class="form-control"
                                :class="{
                                    'is-invalid': formError && $v.email.$error
                                }"
                                placeholder="Email"
                                @keyup="changeIsExist"
                            />
                            <label class="form-control-placeholder" for="name"
                                >Enter Email</label
                            >
                            <span
                                v-if="formError && !$v.email.required"
                                class="invalid-feedback"
                                >Email is required</span
                            >
                            <span
                                v-if="formError && !$v.email.email"
                                class="invalid-feedback"
                                >Enter a valid email</span
                            >
                            <span
                                v-if="formError && !$v.email.isExist"
                                class="invalid-feedback"
                                >We can't find a user with that email
                                address.</span
                            >
                        </div>

                        <div class="frm_btm">
                            <button
                                type="submit"
                                class="btn btn-primary btn-block"
                                :disabled="submitted"
                            >
                                Get The Link
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
                                Don't have an account?
                                <a
                                    href
                                    data-toggle="modal"
                                    data-target="#foregt_password_modal"
                                    data-dismiss="modal"
                                    >Sign-Up</a
                                >
                            </h4>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            email: null,
            submitted: false,
            isExist: true,
            formError: false
        };
    },
    validations: {
        email: {
            required,
            email,
            isExist() {
                return this.isExist;
            }
        }
    },
    methods: {
        foregtPassword() {
            this.submitted = true;
            this.formError = false;

            this.$v.$touch();
            if (this.$v.$invalid) {
                this.formError = true;
                this.submitted = false;
                return;
            }

            this.$store
                .dispatch("auth/forgetPassword", { email: this.email })
                .then(response => {
                    $("#foregt_password_modal").modal("hide");
                    Swal.fire("Ok!", response.data.success, "success");

                    this.submitted = false;
                    this.formError = false;
                    this.resetForm();
                })
                .catch(error => {
                    this.submitted = false;
                    if (error.response) {
                        if (error.response.status === 500) {
                            $("#foregt_password_modal").modal("hide");

                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: "<a href>Why do I have this issue?</a>"
                            });
                        }
                        if (error.response.status === 422) {
                            this.formError = true;
                            if (error.response.data.error) {
                                this.isExist = false;
                            }
                        }
                    }
                });
        },
        resetForm() {
            const self = this;
            Object.keys(this.user).forEach(key => {
                self.user[key] = "";
            });
        },
        changeIsExist() {
            this.isExist = true;
        }
    }
};
</script>

<style scoped></style>
