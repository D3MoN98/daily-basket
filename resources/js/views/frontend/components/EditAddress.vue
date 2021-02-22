<template>
    <div
        id="edit_address"
        class="sidenav delivery_sidebar sidebar-style-width animate__animated animate__faster"
        :class="{ animate__fadeInLeft: show, animate__fadeOutLeft: !show }"
    >
        <a
            href="javascript:void(0)"
            class="closebtn"
            @click.prevent="closeEditAddress"
            >&times;</a
        >
        <div class="address_bar">
            <h4>Edit Address</h4>
            <div class="map">
                <div class="map-action">
                    <button
                        class="btn btn-sm btn-outline-primary"
                        :class="{ 'btn-primary': rePositioned }"
                        @click="reCenter"
                    >
                        <i class="fas fa-location"></i>
                    </button>
                    <button
                        class="btn btn-sm btn-outline-primary btn-plus"
                        @click="zoom(+1)"
                    >
                        <i class="fas fa-plus"></i>
                    </button>
                    <button
                        class="btn btn-sm btn-outline-primary btn-plus"
                        @click="zoom(-1)"
                    >
                        <i class="fas fa-minus"></i>
                    </button>
                </div>

                <div id="gmap-alt" class="w-100">
                    <GmapMap
                        ref="mapRefAlt"
                        :center="{ lat: 10, lng: 10 }"
                        :zoom="18"
                        style="width: 100%; height: 100%"
                        :options="{
                            disableDefaultUI: true,
                            gestureHandling: 'cooperative'
                        }"
                        @dragend="updateCoordinatesOnMapDrag"
                    >
                        <GmapMarker
                            ref="markerRefAlt"
                            :position="currentPos"
                            :clickable="true"
                            :draggable="true"
                            @click="center = currentPos"
                            @dragend="updateCoordinates"
                        />
                    </GmapMap>
                </div>
            </div>
            <form @submit.prevent="updateAddress">
                <div
                    class="form-group"
                    :class="{
                        'animate__animated animate__shakeX':
                            formError && $v.address.house_no.$error
                    }"
                >
                    <input
                        type="text"
                        name="house_no"
                        class="form-control"
                        :class="{
                            'is-invalid':
                                formError && $v.address.house_no.$error
                        }"
                        v-model="address.house_no"
                        placeholder="Flat/House No"
                    />
                    <span
                        v-if="formError && !$v.address.house_no.required"
                        class="invalid-feedback"
                        >Flat No is required</span
                    >
                </div>
                <div
                    class="form-group"
                    :class="{
                        'animate__animated animate__shakeX':
                            formError && $v.address.address.$error
                    }"
                >
                    <textarea
                        name="address"
                        class="form-control"
                        placeholder="Address"
                        :class="{
                            'is-invalid': formError && $v.address.address.$error
                        }"
                        v-model="address.address"
                        rows="4"
                    ></textarea>
                    <span
                        v-if="formError && !$v.address.address.required"
                        class="invalid-feedback"
                        >Address is required</span
                    >
                </div>
                <div
                    class="form-group"
                    :class="{
                        'animate__animated animate__shakeX':
                            formError && $v.address.landmark.$error
                    }"
                >
                    <input
                        type="text"
                        v-model="address.landmark"
                        name="landmark"
                        class="form-control"
                        placeholder="Landmark"
                        :class="{
                            'is-invalid':
                                formError && $v.address.landmark.$error
                        }"
                    />
                    <span
                        v-if="formError && !$v.address.landmark.required"
                        class="invalid-feedback"
                        >Landmark is required</span
                    >
                </div>
                <div
                    class="form-group"
                    :class="{
                        'animate__animated animate__shakeX':
                            formError && $v.address.type.$error
                    }"
                >
                    <div class="chk_btnn">
                        <input
                            type="radio"
                            id="edit_home_id"
                            value="home"
                            name="edit_type"
                            @change="addressTypeChange"
                        />
                        <label for="edit_home_id">
                            <span class="rdo_span rdo_home_i">Home</span>
                        </label>

                        <input
                            type="radio"
                            id="edit_work_id"
                            value="work"
                            name="edit_type"
                            @change="addressTypeChange"
                        />
                        <label for="edit_work_id">
                            <span class="rdo_span rdo_home_w">Work</span>
                        </label>

                        <input
                            type="radio"
                            id="edit_other_id"
                            value="other"
                            name="edit_type"
                            @change="addressTypeChange"
                        />
                        <label for="edit_other_id">
                            <span class="rdo_span rdo_home_o">Others</span>
                        </label>

                        <div class="others_box form-group">
                            <input
                                class="form-control"
                                type="text"
                                id="address-type-inp"
                                v-model="address.type"
                                :class="{
                                    'is-invalid':
                                        formError && $v.address.type.$error
                                }"
                                placeholder="Other"
                            />
                        </div>
                    </div>
                    <span
                        v-if="formError && !$v.address.type.required"
                        class="invalid-feedback"
                        >Address address_Type is required</span
                    >
                </div>
                <input
                    type="hidden"
                    name="latitude"
                    class="form-control"
                    v-model="address.latitude"
                />
                <input
                    type="hidden"
                    name="latitude"
                    class="form-control"
                    v-model="address.longitude"
                />
                <div class="form-group">
                    <button class="btn btn-primary btn-lg btn-block">
                        Update Address
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
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            show: true,
            address: {
                address: null,
                house_no: null,
                type: null,
                landmark: null,
                latitude: null,
                longitude: null
            },
            submitted: false,
            formError: false,
            map: null,
            currentPos: {
                lat: 0,
                lng: 0
            },
            rePositioned: false
        };
    },
    props: {
        id: null
    },
    validations: {
        address: {
            address: {
                required
            },
            house_no: {
                required
            },
            landmark: {
                required
            },
            type: {
                required
            }
        }
    },
    computed: {
        ...mapGetters({
            editAddress: "user/editAddress"
        })
    },
    mounted() {
        this.$store.dispatch("user/getAddressById", this.id).then(() => {
            this.address.address = this.editAddress.address;
            this.address.house_no = this.editAddress.house_no;
            this.address.type = this.editAddress.type;
            this.address.landmark = this.editAddress.landmark;
            this.address.latitude = this.editAddress.latitude;
            this.address.longitude = this.editAddress.longitude;

            this.currentPos.lat = this.editAddress.latitude;
            this.currentPos.lng = this.editAddress.longitude;
        });

        this.$refs.mapRefAlt.$mapPromise.then(map => {
            const styles = {
                default: [],
                hide: [
                    {
                        featureType: "poi.business",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "transit",
                        elementType: "labels.icon",
                        stylers: [{ visibility: "off" }]
                    }
                ]
            };

            // map set style
            map.setOptions({ styles: styles.hide });

            console.log(this.currentPos);
            const reCenterPosition = new window.google.maps.LatLng(
                this.currentPos.lat,
                this.currentPos.lng
            );
            console.log(reCenterPosition);
            map.setCenter(reCenterPosition);
        });
    },
    methods: {
        reCenter() {
            this.$refs.mapRefAlt.$mapPromise.then(map => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            this.currentPos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };

                            this.address.latitude = position.coords.latitude;
                            this.address.longitude = position.coords.longitude;

                            this.reverseGeocode(this.currentPos, result => {
                                this.currentPos.formatted_address = result;
                                this.address.address = result;
                                this.$store.dispatch(
                                    "auth/setCurrentLocation",
                                    this.currentPos
                                );
                            });

                            const reCenterPosition = new window.google.maps.LatLng(
                                this.currentPos.lat,
                                this.currentPos.lng
                            );
                            map.setZoom(18);
                            map.setCenter(reCenterPosition);
                            this.rePositioned = false;
                        },
                        () => {
                            console.error("Please turn on your geolocation");
                        }
                    );
                } else {
                    console.error("Please turn on your geolocation");
                }
            });
        },
        reverseGeocode(latlong, callback) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: latlong }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        const address = results[0].formatted_address;
                        callback(address); // call the callback function here
                    } else {
                        console.log("No results found");
                        return false;
                    }
                } else {
                    console.log(`Geocoder failed due to: ${status}`);
                    return false;
                }
            });
        },
        zoom(level) {
            this.$refs.mapRefAlt.$mapPromise.then(map => {
                const zoom = map.getZoom() + level;
                map.setZoom(zoom);
            });
        },
        addressTypeChange($e) {
            if ($e.target.value !== "other") {
                this.address.type = $e.target.value;
            }
        },
        updateCoordinates(location) {
            this.currentPos = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng()
            };
            this.address.latitude = location.latLng.lat();
            this.address.longitude = location.latLng.lng();

            this.reverseGeocode(this.currentPos, result => {
                this.currentPos.formatted_address = result;
                this.address.address = result;
                this.$store.dispatch(
                    "auth/setCurrentLocation",
                    this.currentPos
                );
            });
        },
        updateCoordinatesOnMapDrag() {
            this.$refs.mapRefAlt.$mapPromise.then(map => {
                this.currentPos = map.getCenter();
                this.reverseGeocode(this.currentPos, result => {
                    this.currentPos.formatted_address = result;
                    this.address.address = result;
                    this.$store.dispatch(
                        "auth/setCurrentLocation",
                        this.currentPos
                    );
                });
            });
        },
        updateAddress() {
            this.submitted = true;
            this.formError = false;

            this.$v.$touch();
            if (this.$v.$invalid) {
                this.formError = true;
                this.submitted = false;
                return;
            }

            this.$store
                .dispatch("user/updateAddress", {
                    id: this.id,
                    address: this.address
                })
                .then(() => {
                    this.submitted = false;
                    this.formError = false;
                    this.closeEditAddress();
                    toastr.success("Address updated", "", {
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
                .catch(() => {
                    this.submitted = false;
                });
        },
        closeEditAddress() {
            this.show = false;

            const mn_wrapper = document.getElementById("main-wrapper");
            mn_wrapper.classList.remove("full_body_opacity");
            mn_wrapper.parentElement.classList.remove("no_scroll");

            setTimeout(() => {
                this.$emit("edit-hide-address");
            }, 300);
        }
    }
};
</script>

<style lang="scss" scoped>
/* width */
::-webkit-scrollbar {
    width: 0;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: transparent;
    border-radius: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #ecebeb;
    border-radius: none;
}

.address_bar h4 {
    font-family: "Averta_Semibold";
    font-weight: normal;
    color: #6883b9;
    padding: 10px 0;
    margin-bottom: 20px;
    padding: 20px 0;
    margin-bottom: 10px;
}

.map {
    padding: 5px;
    margin: 0 0 25px 0;
    border: 1px solid #dcdcdc;
    position: relative;
    .map-action {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1;
        display: flex;
        flex-flow: column;
        background: transparent;
        .btn {
            margin-bottom: 10px;
            font-weight: bolder;
            &.btn-primary .fas {
                color: white;
            }
        }
    }
}
#gmap-alt {
    height: 300px;
}

.chk_btnn input#edit_other_id:checked + label + .others_box,
.chk_btnn input#edit_other_id:checked + label + .others_box input {
    display: block;
}
</style>
