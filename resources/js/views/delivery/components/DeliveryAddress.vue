<template>
    <div id="delivery_address" class="sidenav delivery_sidebar">
        <a
            href="javascript:void(0)"
            class="closebtn"
            @click.prevent="closeDeliveryAddress()"
            >&times;</a
        >
        <div class="address_bar">
            <h4>Delivery Route</h4>
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
                        :center="{ lat: 22.5022509, lng: 88.3394889 }"
                        :zoom="16"
                        style="width: 100%; height: 100%"
                        :options="{
                            disableDefaultUI: true,
                            gestureHandling: 'cooperative'
                        }"
                    >
                        <DirectionsRenderer
                            travelMode="DRIVING"
                            :origin="origin"
                            :destination="destination"
                        />
                    </GmapMap>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import DirectionsRenderer from "../components/DirectionsRenderer";

export default {
    components: {
        DirectionsRenderer
    },
    data() {
        return {
            address: {
                address: null,
                house_no: null,
                type: null,
                landmark: null,
                latitude: null,
                longitude: null
            },
            map: null,
            currentPos: {
                lat: 22.5022509,
                lng: 88.3394889
            },
            origin: {
                lat: 22.509003,
                lng: 88.308077
            },
            destination: {
                lat: 22.4954988,
                lng: 88.3709008
            },
            rePositioned: false
        };
    },

    computed: {
        ...mapGetters({
            currentLocation: "auth/currentLocation"
        })
    },
    mounted() {
        setTimeout(() => {
            this.$refs.mapRefAlt.$mapPromise.then(map => {
                map.setZoom(13);
            });
        }, 3000);
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
                            //   window.marker.setPosition(reCenterPosition);
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
        closeDeliveryAddress() {
            document.getElementById("delivery_address").style.width = "0";
            const mn_wrapper = document.getElementById("main-wrapper");
            mn_wrapper.classList.remove("full_body_opacity");
            mn_wrapper.parentElement.classList.remove("no_scroll");
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
</style>
