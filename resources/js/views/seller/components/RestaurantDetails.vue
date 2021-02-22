<template>
    <div class="menu_top iinr_side_pad">
        <div class="menu_tp_lft">
            <div class="lef_inr_lft">
                <div class="img_arr">
                    <img
                        v-for="(image, imageIndex) in [restaurant.image]"
                        :key="imageIndex"
                        @click="index = imageIndex"
                        :src="image"
                        alt=""
                    />
                    <div class="suc_msg">
                        <i class="fas fa-check"></i>
                    </div>
                </div>
                <div class="image_optn">
                    <ul>
                        <li>
                            <a
                                href="#"
                                v-for="(image, imageIndex) in [
                                    restaurant.image
                                ]"
                                :key="imageIndex"
                                @click.prevent="index = imageIndex"
                                :src="image"
                                alt=""
                                >Preview</a
                            >
                        </li>
                        <li>
                            <a href="#" @click.prevent="changeFile"
                                >Change
                                <input
                                    type="file"
                                    id="changeFile"
                                    @change="croppie"
                            /></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="lef_inr_rgt">
                <div class="user_det">
                    <h4>{{ restaurant.name }}</h4>
                    <p>{{ restaurant.address.address }}</p>
                    <p>Ph No. : {{ restaurant.contact_no }}</p>
                </div>
                <div class="selct_bxx">
                    <multiselect
                        v-model="res.cuisines"
                        :options="cuisines"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Secect Cuisines"
                        label="name"
                        track-by="name"
                        @close="onClose"
                    >
                        <template
                            slot="selection"
                            slot-scope="{ values, search, isOpen }"
                        >
                            <span
                                class="multiselect__single"
                                :data-search="search"
                                v-if="values.length &amp;&amp; !isOpen"
                                >{{ values.length }} options selected</span
                            >
                        </template>
                    </multiselect>
                </div>
            </div>
        </div>
        <CoolLightBox
            :items="[restaurant.image]"
            :index="index"
            :fullScreen="true"
            @close="index = null"
        >
        </CoolLightBox>

        <div class="menu_tp_rgt">
            <form @submit.prevent="save">
                <div class="open_time">
                    <ul>
                        <li>
                            <p>Opening Time :</p>
                            <div class="in_bxx">
                                <vue-timepicker
                                    :input-class="
                                        'form-control form_control_cus clockpicker'
                                    "
                                    format="hh:mm A"
                                    placeholder="Enter Time"
                                    v-model="res.opening_time"
                                    @close="
                                        updateRestauramt({
                                            opening_time: res.opening_time
                                        })
                                    "
                                    close-on-complete
                                    hide-clear-button
                                    auto-scroll
                                ></vue-timepicker>
                            </div>
                        </li>
                        <li>
                            <p>Closing Time :</p>
                            <div class="in_bxx">
                                <vue-timepicker
                                    :input-class="
                                        'form-control form_control_cus clockpicker'
                                    "
                                    v-model="res.closing_time"
                                    format="hh:mm A"
                                    placeholder="Enter Time"
                                    @close="
                                        updateRestauramt({
                                            closing_time: res.closing_time
                                        })
                                    "
                                    close-on-complete
                                    hide-clear-button
                                    auto-scroll
                                ></vue-timepicker>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="subcc">
                    <div class="subcc_innr">
                        <div class="subcc_switch">
                            <p>
                                Model :
                                <span>Subscription</span>
                            </p>
                            <div class="swtchh_otr"></div>
                        </div>
                        <div class="subcc_btnn">
                            <label class="switch">
                                <input
                                    type="checkbox"
                                    v-model="res.subscription"
                                    :checked="res.subscription === 1"
                                    @change="
                                        updateRestauramt({
                                            subscription: res.subscription
                                                ? '1'
                                                : '0'
                                        })
                                    "
                                />
                                <span class="sliderr round"></span>
                            </label>
                        </div>
                    </div>
                    <div class="sbcc_btn">
                        <a
                            href="#"
                            class="cmnn_btnn"
                            role="button"
                            data-toggle="modal"
                            data-dismiss="modal"
                            data-target="#subscribe_modal"
                            >Subscribe</a
                        >
                    </div>
                </div>
            </form>
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
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import VueClockPicker from '@pencilpix/vue2-clock-picker';
import Multiselect from "vue-multiselect";
// import '@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.min.css';
import "vue-multiselect/dist/vue-multiselect.min.css";
// Main JS (in UMD format)
import VueTimepicker from "vue2-timepicker";

// CSS
import "vue2-timepicker/dist/VueTimepicker.css";

// use the component
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

import VueCroppie from "vue-croppie";
import "croppie/croppie.css"; // import the croppie css manually

export default {
    components: {
        // VueClockPicker,
        VueTimepicker,
        Multiselect,
        CoolLightBox
    },
    data() {
        return {
            res: {
                subscription: this.restaurant.subscription,
                opening_time: this.restaurant.opening_time,
                closing_time: this.restaurant.closing_time,
                cuisines: this.restaurant.cuisines
            },
            value: [],
            index: null,

            croppieImage: "",
            cropped: null
        };
    },
    props: {
        restaurant: null,
        cuisines: null
    },
    methods: {
        updateRestauramt(restaurant) {
            this.$store
                .dispatch("sellerRestaurant/updateRestaurant", restaurant)
                .then(() => {
                    toastr.success("Details updated", "", {
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
                });
        },
        onClose(value) {
            this.value = value;

            const cuisines = _.map(this.value, function(value) {
                return _.pick(value, ["id"]).id;
            });

            this.updateRestauramt({ cuisines: _.join(cuisines, ",") });
        },
        changeFile() {
            document.getElementById("changeFile").click();
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
.clockpicker {
    text-align: center;
}
.img_arr {
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .suc_msg {
        position: absolute;
    }
}
#changeFile {
    // display: none;
}
</style>
