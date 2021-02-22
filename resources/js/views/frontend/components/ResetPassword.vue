<template>
    <div class="modal fade log_in_u" id="reset_password_modal">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content modal_form">
                <div class="modal-header">
                    <h5 class="modal-title">Reset Passwod</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="welcome_msg">
                        <h3>Welcome Dailybasket</h3>
                    </div>
                    <form
                        id="resetPasswordForm"
                        @submit.prevent="resetPassword"
                    >
                        <div
                            class="form-group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.password.$error
                            }"
                        >
                            <input
                                type="password"
                                class="form-control"
                                v-model="password"
                                :class="{
                                    'is-invalid':
                                        formError && $v.password.$error
                                }"
                                placeholder="Enter password"
                            />
                            <label class="form-control-placeholder" for="name"
                                >Enter Password</label
                            >
                            <span
                                v-if="formError && !$v.password.required"
                                class="invalid-feedback"
                                >Password is required</span
                            >
                            <span
                                v-if="formError && !$v.password.minLength"
                                class="invalid-feedback"
                                >Password should be minimum 6 character</span
                            >
                        </div>

                        <div
                            class="form-group"
                            :class="{
                                'animate__animated animate__shakeX':
                                    formError && $v.password_confirmation.$error
                            }"
                        >
                            <input
                                type="password"
                                v-model="password_confirmation"
                                :class="{
                                    'is-invalid':
                                        formError &&
                                        $v.password_confirmation.$error
                                }"
                                class="form-control"
                                placeholder="Re-enter password"
                            />
                            <label class="form-control-placeholder" for="name"
                                >Enter Confirm Password</label
                            >
                            <span
                                v-if="
                                    formError &&
                                        !$v.password_confirmation.sameAsPassword
                                "
                                class="invalid-feedback"
                                >Confirm Password should be same as
                                password</span
                            >
                        </div>

                        <div class="frm_btm">
                            <button
                                type="submit"
                                class="btn btn-primary btn-block"
                                :disabled="submitted"
                            >
                                Reset Password
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
                                    data-target="#reset_password_modal"
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            password: null,
            password_confirmation: null,
            submitted: false,
            formError: false
        };
    },
    props: {
        reset_password: {
            email: null,
            token: null
        }
    },
    validations: {
        password: {
            required,
            minLength: minLength(6)
        },
        password_confirmation: {
            sameAsPassword: sameAs("password")
        }
    },
    methods: {
        resetPassword() {
            this.submitted = true;
            this.formError = false;

            this.$v.$touch();
            if (this.$v.$invalid) {
                this.formError = true;
                this.submitted = false;
                return;
            }

            this.$store
                .dispatch("auth/resetPassword", {
                    email: this.reset_password.email,
                    token: this.reset_password.token,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                })
                .then(response => {
                    $("#reset_password_modal").modal("hide");
                    Swal.fire("Ok!", response.data.success, "success");

                    this.submitted = false;
                    this.formError = false;
                    this.resetForm();
                })
                .catch(error => {
                    this.submitted = false;
                    console.log(error.response);
                    if (error.response) {
                        if (error.response.status === 500) {
                            $("#reset_password_modal").modal("hide");

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
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: error.response.data.error,
                                    footer:
                                        "<a href>Why do I have this issue?</a>"
                                });
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
