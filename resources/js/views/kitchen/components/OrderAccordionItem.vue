<template>
    <div id="accordion-five" class="accordion accordion-left-indicator">
        <div class="accordion__item">
            <div
                class="accordion__header collapsed"
                data-toggle="collapse"
                :data-target="'#indicator_collapse' + order.id"
                aria-expanded="true"
                :aria-controls="'indicator_collapse' + order.id"
            >
                <span class="accordion__header--text">
                    # Order Id {{ order.id }}
                    <span
                        class="text-success"
                        v-if="order.status === 'prepared'"
                        >- Done</span
                    >
                    <small class="float-right">
                        Ordered
                        {{ order.created_at_human }}
                    </small>
                </span>
                <span class="accordion__header--indicator"></span>
            </div>
            <div
                :id="'indicator_collapse' + order.id"
                class="accordion__body collapse"
                data-parent="#accordion-five"
                style=""
            >
                <div class="accordion__body--text">
                    <ul>
                        <li
                            v-for="order_item in order.order_items"
                            :key="order_item.pivot.id"
                        >
                            <div class="kit_ord_inn">
                                <h5>{{ order_item.name }}</h5>
                                <!-- <h6>
                                        Item Id:
                                        <span>{{
                                            order_item.pivot.menu_item_id
                                        }}</span>
                                    </h6> -->
                                <h6>
                                    Qty:
                                    <span>{{ order_item.pivot.quantity }}</span>
                                </h6>
                                <div class="kit_btnn">
                                    <ul>
                                        <li>
                                            <a
                                                @click="
                                                    updateStatus(
                                                        order_item.pivot.id,
                                                        'in progress'
                                                    )
                                                "
                                                :class="{
                                                    'bg-warning border-0 text-white':
                                                        order_item.pivot
                                                            .cooking_status ===
                                                        'in progress'
                                                }"
                                                href="javascript:void(0)"
                                                :disabled="
                                                    order_item.pivot
                                                        .cooking_status ===
                                                        'completed'
                                                "
                                                >In Progress</a
                                            >
                                        </li>
                                        <li>
                                            <a
                                                @click="
                                                    updateStatus(
                                                        order_item.pivot.id,
                                                        'completed'
                                                    )
                                                "
                                                :class="{
                                                    'bg-success border-0 text-white':
                                                        order_item.pivot
                                                            .cooking_status ===
                                                        'completed'
                                                }"
                                                href="javascript:void(0)"
                                                :disabled="
                                                    order_item.pivot
                                                        .cooking_status ===
                                                        'completed'
                                                "
                                                >Completed</a
                                            >
                                        </li>
                                        <li>
                                            <a
                                                @click="
                                                    updateStatus(
                                                        order_item.pivot.id,
                                                        'in queue'
                                                    )
                                                "
                                                :class="{
                                                    'bg-warning border-0 text-white':
                                                        order_item.pivot
                                                            .cooking_status ===
                                                        'in queue'
                                                }"
                                                href="javascript:void(0)"
                                                :disabled="
                                                    order_item.pivot
                                                        .cooking_status ===
                                                        'completed'
                                                "
                                                >In queue</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        order: {}
    },
    methods: {
        updateStatus(id, status) {
            this.$store
                .dispatch("kitchenOrder/updateStatus", { id, status })
                .then(res => {
                    toastr.success("Status changed", "", {
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
        }
    }
};
</script>

<style></style>
