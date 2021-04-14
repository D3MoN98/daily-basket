<template>
    <div>
        <section class="landing_sec">
            <div class="top_btn">
                <a
                    href="#"
                    role="button"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#log_in_modal"
                    >Login</a
                >
                <a
                    href="#"
                    role="button"
                    data-toggle="modal"
                    data-dismiss="modal"
                    data-target="#sign_up_modal"
                    >Signup</a
                >
            </div>
            <div class="cntr_conn text-center">
                <div class="sctr_img">
                    <img :src="'/images/custom_image/l.jpg'" alt="" />
                </div>
                <h1>Food delivered to your doorstep</h1>
                <p>Welcome to Daily Basket</p>
                <form @submit.prevent="saveLocation">
                    <gmap-autocomplete
                        @place_changed="getAddressData"
                        :options="autocompleteOptions"
                    >
                        <template v-slot:input="slotProps">
                            <v-text-field
                                outlined
                                prepend-inner-icon="place"
                                placeholder="Location Of Event"
                                ref="input"
                                v-on:listeners="slotProps.listeners"
                                v-on:attrs="slotProps.attrs"
                            >
                            </v-text-field>
                        </template>
                    </gmap-autocomplete>
                    <span
                        class="invalid-feedback text-left d-block"
                        v-if="formError && !$v.position.isEmpty.required"
                        >Location rquired
                    </span>
                    <!-- <input
                        type="scarch"
                        placeholder="Enter Your Delivery Location"
                    /> -->
                    <button class="btn" type="submit">
                        <span
                            class="fa fa-circle-notch fa-spin"
                            role="status"
                            aria-hidden="true"
                            v-show="locating"
                        ></span>
                        <span v-show="!locating"
                            >Order Food {{ $v.position.isEmpty.required }}</span
                        >
                    </button>
                    <span class="locate-me"
                        ><a href="" @click.prevent="locateMe"
                            >Locates Me
                        </a></span
                    >
                </form>
            </div>
        </section>

        <LoginModal />

        <SignupModal v-if="!this.$store.getters['auth/check']" />
    </div>
</template>

<script>
import SignupModal from "@/views/frontend/components/SignupModal";
import LoginModal from "@/views/frontend/components/LoginModal";
import { required } from "vuelidate/lib/validators";

export default {
    components: {
        SignupModal,
        LoginModal
    },
    data() {
        return {
            locating: false,
            currentPos: {
                lat: 0,
                lng: 0
            },
            formError: false,
            autocompleteOptions: {
                componentRestrictions: {
                    country: ["in"]
                }
            }
        };
    },

    validations: {
        position: {
            isEmpty() {
                return !(
                    this.currentPos.lat === 0 && this.currentPos.lng === 0
                );
            }
        }
    },

    methods: {
        getAddressData(address) {
            this.currentPos = {
                formatted_address: address.formatted_address,
                lat: address.geometry.location.lat(),
                lng: address.geometry.location.lng()
            };
        },

        saveLocation() {
            this.locating = true;
            this.formError = false;

            this.$v.$touch();
            if (this.$v.$invalid) {
                this.formError = true;
                this.locating = false;
                return;
            }

            this.$store
                .dispatch("auth/setCurrentLocation", this.currentPos)
                .then(() => {
                    this.locating = false;
                    this.$router.push("restaurants");
                });
        },

        // locate me to get current location
        locateMe() {
            // this.locating = true;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.currentPos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        this.reverseGeocode(this.currentPos, result => {
                            this.currentPos.formatted_address = result;
                            this.saveLocation();
                        });
                    },
                    failure => {
                        if (
                            failure.message.startsWith(
                                "Only secure origins are allowed"
                            )
                        ) {
                            // Secure Origin issue.
                            console.log("Only secure origins are allowed");
                        }
                    }
                );
            } else {
                console.error("Please turn on your geolocation");
            }
        },

        // reverse geocode to get formatted address
        reverseGeocode(latlong, callback) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: latlong }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        const address = results[0].formatted_address;
                        return callback(address); // call the callback function here
                    }
                    console.log("No results found");
                    return false;
                }
                console.log(`Geocoder failed due to: ${status}`);
                return false;
            });
        }
    }
};
</script>

<style></style>
