<template>
    <div
        class="modal fade"
        id="feedback"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
        data-keyboard="false"
        data-backdrop="static"
    >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content modal_form">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Rate Your Experience
                    </h5>
                    <!-- <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                  </button> -->
                </div>
                <div class="modal-body">
                    <form id="feedbackForm" @submit.prevent="feedbackSubmit">
                        <div class="rate_innr">
                            <div class="rt_hd text-center">
                                <h5>Hope you enjoyed the food</h5>
                                <p>
                                    Please rate us.Your rating help us to
                                    improve our service towards you
                                </p>
                            </div>
                            <div class="rting_star">
                                <ul>
                                    <a @click="rating(1)"
                                        ><i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                        ></i
                                    ></a>
                                    <a @click="rating(2)"
                                        ><i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                        ></i
                                    ></a>
                                    <a @click="rating(3)"
                                        ><i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                        ></i
                                    ></a>
                                    <a @click="rating(4)"
                                        ><i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                        ></i
                                    ></a>
                                    <a @click="rating(5)"
                                        ><i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                        ></i
                                    ></a>
                                </ul>

                                <span
                                    v-if="
                                        formError &&
                                            !$v.feedback.rating.required
                                    "
                                    class="invalid-feedback"
                                    >Please select the stars</span
                                >
                            </div>
                            <div class="">
                                <div class="rtng_prps">
                                    <input
                                        type="radio"
                                        id="del"
                                        name="rtng_mdll"
                                        v-model="feedback.improve_in"
                                        value="delivery"
                                    />
                                    <label for="del">
                                        <span class="trng_op_otr">
                                            <img
                                                :src="
                                                    '/images/custom_image/byke.png'
                                                "
                                            />
                                            <h3>Delivery</h3>
                                        </span>
                                    </label>

                                    <input
                                        type="radio"
                                        id="pack"
                                        name="rtng_mdll"
                                        v-model="feedback.improve_in"
                                        value="packaging"
                                    />
                                    <label for="pack">
                                        <span class="trng_op_otr">
                                            <img
                                                :src="
                                                    '/images/custom_image/packg.png'
                                                "
                                            />
                                            <h3>Packaging</h3>
                                        </span>
                                    </label>

                                    <input
                                        type="radio"
                                        id="qty"
                                        name="rtng_mdll"
                                        v-model="feedback.improve_in"
                                        value="quantity"
                                    />
                                    <label for="qty">
                                        <span class="trng_op_otr">
                                            <img
                                                :src="
                                                    '/images/custom_image/qty.png'
                                                "
                                            />
                                            <h3>Quantity</h3>
                                        </span>
                                    </label>

                                    <input
                                        type="radio"
                                        id="qua"
                                        name="rtng_mdll"
                                        v-model="feedback.improve_in"
                                        value="quality"
                                    />
                                    <label for="qua">
                                        <span class="trng_op_otr">
                                            <img
                                                :src="
                                                    '/images/custom_image/qualty.png'
                                                "
                                            />
                                            <h3>Quality</h3>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div class="rtng_textar">
                                <textarea
                                    placeholder="Text for any suggestions"
                                    v-model="feedback.review"
                                ></textarea>
                                <span
                                    v-if="
                                        formError &&
                                            !$v.feedback.review.required
                                    "
                                    class="invalid-feedback"
                                    >Please review in few words</span
                                >
                            </div>
                        </div>
                        <div class="frm_btm">
                            <button
                                class="btn btn-primary btn-block"
                                type="submit"
                                :disabled="submitted"
                            >
                                Submit
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
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            feedback: {
                rating: null,
                review: null,
                improve_in: null,
                order_id: null
            },
            submitted: false,
            formError: false
        };
    },
    validations: {
        feedback: {
            rating: {
                required
            },
            review: {
                required
            }
        }
    },
    mounted() {
        $("#feedback").modal("show");

        this.feedback.order_id = this.$store.getters["feedback/order_id"];
    },
    methods: {
        rating(star) {
            $(".rting_star a").removeClass("active_star");

            for (let i = 0; i < star; i++) {
                $(".rting_star a")
                    .eq(i)
                    .addClass("active_star");
            }

            this.feedback.rating = star;
        },
        feedbackSubmit() {
            this.submitted = true;
            this.formError = false;

            this.$v.$touch();
            if (this.$v.$invalid) {
                this.formError = true;
                this.submitted = false;
                return;
            }

            this.$store
                .dispatch("feedback/feedbackPost", this.feedback)
                .then(res => {
                    this.submitted = false;
                    this.formError = false;
                    this.resetForm();

                    $("#feedback").modal("hide");

                    toastr.success(
                        "Feedback has been posted successfully",
                        "",
                        {
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
                        }
                    );
                });
        },
        resetForm() {
            const self = this;
            Object.keys(this.feedback).forEach(key => {
                self.feedback[key] = "";
            });
        }
    }
};
</script>

<style scoped lang="scss">
.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #ea5455;
}
</style>
