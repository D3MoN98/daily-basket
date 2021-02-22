<template>
    <div class="content-body">
        <!-- row -->
        <div class="container">
            <div class="dash_hd_cmn">
                <h3>Profile</h3>
            </div>

            <div class="row">
                <div class="col-12">
                    <form @submit.prevent="updateProfile">
                        <div class="form-group">
                            <label for>Name</label>
                            <input
                                type="text"
                                name
                                id
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        formError && $v.user.name.$error
                                }"
                                v-model="user.name"
                                placeholder="Your Name"
                                aria-describedby="helpId"
                                maxlength="25"
                            />
                            <span
                                v-if="formError && !$v.user.name.required"
                                class="invalid-feedback"
                                >Name is required</span
                            >
                        </div>

                        <div class="form-group">
                            <label for>Email</label>
                            <input
                                type="text"
                                name
                                id
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        formError && $v.user.email.$error,
                                    'is-invalid':
                                        formError && !$v.user.email.isUnique
                                }"
                                v-model="user.email"
                                placeholder="Your Email"
                                aria-describedby="helpId"
                                maxlength="30"
                            />
                            <span
                                v-if="formError && !$v.user.email.required"
                                class="invalid-feedback"
                                >Email is required</span
                            >
                            <span
                                v-if="formError && !$v.user.email.email"
                                class="invalid-feedback"
                                >Enter a valid email</span
                            >
                            <span
                                v-if="formError && !$v.user.email.isUnique"
                                class="invalid-feedback"
                                >Email already exist</span
                            >
                        </div>

                        <div class="form-group">
                            <label for>Contact No</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    name
                                    id
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            formError &&
                                            $v.user.contact_no.$error
                                    }"
                                    v-model="user.contact_no"
                                    placeholder="Your Contact"
                                    aria-describedby="helpId"
                                    @keypress="isNumber"
                                    maxlength="10"
                                />
                                <span
                                    v-if="
                                        formError &&
                                            !$v.user.contact_no.required
                                    "
                                    class="invalid-feedback"
                                    >Contact is required</span
                                >
                                <span
                                    v-if="
                                        formError &&
                                            !$v.user.contact_no.minLength
                                    "
                                    class="invalid-feedback"
                                    >Contact No should be 10 digit</span
                                >
                                <span
                                    v-if="
                                        formError &&
                                            !$v.user.contact_no.isUniqueContact
                                    "
                                    class="invalid-feedback"
                                    >Contact No already exist</span
                                >
                            </div>
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">
                                Update Profile
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

            <div class="dash_hd_cmn mt-3">
                <h3>Restaurant Details</h3>
            </div>

            <div class="row">
                <div class="col-12">
                    <form @submit.prevent="updateRestaurantDetails">
                        <div class="form-group">
                            <label for="">Restaurant Image</label><br />
                            <div class="dropper">
                                <div class="dropper-wrapper">
                                    <div
                                        class="dropper-text"
                                        v-if="cropped === null"
                                    >
                                        <p>Click Here To Browse</p>
                                    </div>
                                    <img
                                        v-else
                                        id="image"
                                        :src="cropped"
                                        alt=""
                                    />
                                    <div
                                        class="dropper-overlay"
                                        v-if="cropped !== null"
                                    >
                                        <p>Change Image</p>
                                    </div>
                                    <input type="file" @change="croppie" />
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="">Restaurant Name</label>
                            <input
                                type="text"
                                name=""
                                id=""
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        restFormError &&
                                        $v.restaurant.name.$error
                                }"
                                v-model="restaurant.name"
                                placeholder=""
                                aria-describedby="helpId"
                                maxlength="50"
                            />

                            <span
                                v-if="
                                    restFormError &&
                                        !$v.restaurant.name.required
                                "
                                class="invalid-feedback"
                                >Name is required</span
                            >

                            <span
                                v-if="
                                    formError && !$v.restaurant.name.minLength
                                "
                                class="invalid-feedback"
                                >Name should be atleast 5 digit</span
                            >
                        </div>

                        <div class="form-group">
                            <label for="">Description</label>
                            <textarea
                                name=""
                                id=""
                                cols="10"
                                rows="3"
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        restFormError &&
                                        $v.restaurant.description.$error
                                }"
                                v-model="restaurant.description"
                                maxlength="255"
                            ></textarea>

                            <span
                                v-if="
                                    restFormError &&
                                        !$v.restaurant.description.required
                                "
                                class="invalid-feedback"
                                >Description is required</span
                            >
                        </div>

                        <div class="form-group">
                            <label for>Contact No</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    name
                                    id
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            restFormError &&
                                            $v.restaurant.contact_no.$error
                                    }"
                                    aria-describedby="helpId"
                                    @keypress="isNumber"
                                    v-model="restaurant.contact_no"
                                    maxlength="10"
                                />

                                <span
                                    v-if="
                                        restFormError &&
                                            !$v.restaurant.contact_no.required
                                    "
                                    class="invalid-feedback"
                                    >Contact No is required</span
                                >

                                <span
                                    v-if="
                                        restFormError &&
                                            !$v.restaurant.contact_no.minLength
                                    "
                                    class="invalid-feedback"
                                    >Contact No should be 10 digit</span
                                >
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="">Gstin No</label>
                            <input
                                type="text"
                                name=""
                                id=""
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        restFormError &&
                                        $v.restaurant.gstin_no.$error
                                }"
                                placeholder=""
                                aria-describedby="helpId"
                                v-model="restaurant.gstin_no"
                                maxlength="15"
                            />
                            <span
                                v-if="
                                    restFormError &&
                                        !$v.restaurant.gstin_no.required
                                "
                                class="invalid-feedback"
                                >Gstin No is required</span
                            >
                            <span
                                v-if="
                                    restFormError &&
                                        !$v.restaurant.gstin_no.minLength
                                "
                                class="invalid-feedback"
                                >Gstin No should be 15 digit</span
                            >
                        </div>

                        <div class="form-group">
                            <label for="">Fssai License No</label>
                            <input
                                type="text"
                                name=""
                                id=""
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        restFormError &&
                                        $v.restaurant.fssai_license_no.$error
                                }"
                                placeholder=""
                                aria-describedby="helpId"
                                @keypress="isNumber"
                                v-model="restaurant.fssai_license_no"
                                maxlength="14"
                            />
                            <span
                                v-if="
                                    restFormError &&
                                        !$v.restaurant.fssai_license_no.required
                                "
                                class="invalid-feedback"
                                >Fssai License No is required</span
                            >
                            <span
                                v-if="
                                    restFormError &&
                                        !$v.restaurant.fssai_license_no
                                            .minLength
                                "
                                class="invalid-feedback"
                                >Fssai License No should be 14 digit</span
                            >
                        </div>
                        <button type="submit" class="btn btn-primary">
                            Update Restaurant Details
                            <span
                                class="fa fa-circle-notch fa-spin"
                                role="status"
                                aria-hidden="true"
                                v-show="restSubmitted"
                            ></span>
                        </button>
                    </form>
                </div>
            </div>

            <div class="custom_footer">
                <p>
                    Copyright © Designed &amp; Developed by
                    <a href target="_blank">Sutanu & Sudipta</a>
                </p>
            </div>
        </div>

        <!-- Modal -->
        <div
            class="modal fade"
            id="crop"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <form @submit.prevent="crop">
                        <div class="modal-header">
                            <h5 class="modal-title">Crop And Upload</h5>
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
                            <vue-croppie
                                ref="croppieRef"
                                :enableOrientation="true"
                                :mouseWheelZoom="false"
                                :boundary="{ width: 665, height: 505 }"
                                :viewport="{
                                    width: 640,
                                    height: 480,
                                    type: 'square'
                                }"
                            >
                            </vue-croppie>
                            <!-- the result -->
                            <!-- <img :src="cropped" /> -->
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Crop and Upload
                            </button>
                        </div>
                        <input type="text" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import VueCroppie from "vue-croppie";
import "croppie/croppie.css"; // import the croppie css manually

export default {
    data() {
        return {
            user: {
                name: null,
                email: null,
                contact_no: null
            },
            isUnique: true,
            isUniqueContact: true,
            submitted: false,
            formError: false,

            restaurant: {
                name: null,
                contact_no: null,
                description: null,
                gstin_no: null,
                fssai_license_no: null,
                image: null
            },
            restFormError: false,
            restSubmitted: false,

            croppieImage: "",
            cropped: null
        };
    },
    validations: {
        user: {
            name: {
                required
            },
            email: {
                required,
                email,
                isUnique() {
                    return this.isUnique;
                }
            },
            contact_no: {
                required,
                minLength: minLength(10),
                isUniqueContact() {
                    return this.isUniqueContact;
                }
            }
        },
        restaurant: {
            name: {
                required,
                minLength: minLength(5)
            },
            contact_no: {
                required,
                minLength: minLength(10)
            },
            description: {
                required
            },
            gstin_no: {
                required,
                minLength: minLength(15)
            },
            fssai_license_no: {
                required,
                minLength: minLength(14)
            }
        }
    },
    mounted() {
        this.$store.dispatch("user/getUser").then(() => {
            this.user = this.userdata;
        });

        this.$store.dispatch("sellerRestaurant/restaurant").then(() => {
            this.restaurant = this.restaurantData;
            this.cropped = this.restaurant.image;
        });
    },
    computed: {
        ...mapGetters({
            userdata: "user/user",
            restaurantData: "sellerRestaurant/getRestaurant"
        })
    },
    methods: {
        updateProfile() {
            this.submitted = true;
            this.formError = false;
            this.isUnique = true;
            this.isUniqueContact = true;

            this.$v.$touch();
            if (this.$v.$invalid) {
                this.formError = true;
                this.submitted = false;
                return;
            }

            this.$store
                .dispatch("user/updateUser", this.user)
                .then(() => {
                    this.submitted = false;
                    this.formError = false;

                    toastr.success("Profile updated", "", {
                        positionClass: "toast-bottom-center",
                        timeOut: 1500,
                        closeButton: !0,
                        debug: !1,
                        newestOnTop: !0,
                        progressBar: !0,
                        preventDuplicates: !0,
                        onclick: null,
                        showDuration: "300",
                        hideDuration: "1000",
                        extendedTimeOut: "1000",
                        showEasing: "swing",
                        hideEasing: "linear",
                        showMethod: "fadeIn",
                        hideMethod: "fadeOut",
                        tapToDismiss: !1
                    });
                })
                .catch(error => {
                    this.submitted = false;

                    if (error.response.status === 422) {
                        console.log(error.response.data.errors.email);
                        this.formError = true;
                        if (error.response.data.errors.email) {
                            this.isUnique = false;
                        }
                        if (error.response.data.errors.contact_no) {
                            this.isUniqueContact = false;
                        }
                    }
                });
        },

        updateRestaurantDetails() {
            this.restSubmitted = true;
            this.restFormError = false;

            this.$v.$touch();
            if (this.$v.$invalid) {
                this.restFormError = true;
                this.restSubmitted = false;
                return;
            }

            this.$store
                .dispatch("sellerRestaurant/updateRestaurant", this.restaurant)
                .then(() => {
                    this.restSubmitted = false;
                    this.restFormError = false;

                    toastr.success("Profile updated", "", {
                        positionClass: "toast-bottom-center",
                        timeOut: 1500,
                        closeButton: !0,
                        debug: !1,
                        newestOnTop: !0,
                        progressBar: !0,
                        preventDuplicates: !0,
                        onclick: null,
                        showDuration: "300",
                        hideDuration: "1000",
                        extendedTimeOut: "1000",
                        showEasing: "swing",
                        hideEasing: "linear",
                        showMethod: "fadeIn",
                        hideMethod: "fadeOut",
                        tapToDismiss: !1
                    });
                })
                .catch(error => {
                    this.restSubmitted = false;
                    this.restFormError = true;
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
        },

        croppie(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;

            var reader = new FileReader();
            reader.onload = e => {
                this.$refs.croppieRef.bind({
                    url: e.target.result
                });
            };

            reader.readAsDataURL(files[0]);

            $("#crop").modal("show");
        },
        crop() {
            // Options can be updated.
            // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
            let options = {
                type: "base64",
                size: { width: 640, height: 480 },
                format: "jpeg"
            };
            let data = null;
            this.$refs.croppieRef.result(options, output => {
                this.cropped = output;
                console.log(output);

                const data = new FormData();
                data.append("image", output);

                this.$store
                    .dispatch("sellerRestaurant/updateRestaurantImage", data)
                    .then(() => {
                        $("#crop").modal("hide");

                        toastr.success("Restaurant image updated", "", {
                            positionClass: "toast-bottom-center",
                            timeOut: 1500,
                            closeButton: true,
                            debug: false,
                            progressBar: false,
                            preventDuplicates: false,
                            onclick: null,
                            timeOut: "5000",
                            extendedTimeOut: "1000",
                            showEasing: "swing",
                            hideEasing: "linear",
                            showMethod: "fadeIn",
                            hideMethod: "fadeOut",
                            tapToDismiss: !1
                        });
                    })
                    .catch(error => {
                        toastr.error("Something went wrong", "", {
                            positionClass: "toast-bottom-center",
                            closeButton: true,
                            debug: false,
                            newestOnTop: false,
                            progressBar: false,
                            preventDuplicates: false,
                            onclick: null,
                            timeOut: "5000",
                            extendedTimeOut: "1000",
                            showEasing: "swing",
                            hideEasing: "linear",
                            showMethod: "fadeIn",
                            hideMethod: "fadeOut"
                        });
                    });
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.dropper {
    padding: 10px;
    border: 1px dashed #203b72;
    border-width: 2px;
    transition: all 0.5s ease;
    display: inline-block;
    text-align: center;
    align-self: center;
    .dropper-wrapper {
        width: 320px;
        height: 240px;
        background: #fbfbfb;
        position: relative;
        display: flex;
        .dropper-text {
            margin: auto;
            font-weight: bold;
        }
        .dropper-overlay {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            background: rgb(0, 0, 0, 0.3);
            opacity: 0;
            transition: visibility 0.3s linear, opacity 0.3s linear;

            display: flex;
            visibility: hidden;
            font-weight: bold;
            p {
                margin: auto;
                color: white;
            }
        }
        &:hover .dropper-overlay {
            visibility: visible;
            opacity: 1;
        }
        &:hover {
            background: #f7f7f7;
        }
        img {
            width: 100%;
            height: 100%;
        }
        input[type="file"] {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            opacity: 0;
        }
    }
}
</style>
