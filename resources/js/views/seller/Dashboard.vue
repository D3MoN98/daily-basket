<template>
    <div class="content-body">
        <div class="container">
            <div class="dash_hd_cmn">
                <h3>
                    ABC tiffin service<span class=""
                        >Dimond Hourver Road Khanti Park</span
                    >
                </h3>
            </div>
            <div class="activity_otr">
                <div class="site_dett">
                    <div class="blue_radius ttl_ordr">
                        <div class="tpline">
                            <div class="count_det">
                                <h5>{{ count.total_order }}</h5>
                            </div>
                            <div class="act_imgg">
                                <img
                                    src="images/custom_image/total_order.png"
                                />
                            </div>
                        </div>
                        <h6>Total Orders</h6>
                    </div>

                    <div class="blue_radius ordr_prg">
                        <div class="tpline">
                            <div class="count_det">
                                <h5>{{ count.in_progress_order }}</h5>
                            </div>
                            <div class="act_imgg">
                                <img src="images/custom_image/oder_prg.png" />
                            </div>
                        </div>
                        <h6>Order In Progress</h6>
                    </div>

                    <div class="blue_radius del_ordr">
                        <div class="tpline">
                            <div class="count_det">
                                <h5>{{ count.delivered_order }}</h5>
                            </div>
                            <div class="act_imgg ">
                                <img src="images/custom_image/del_ordr.png" />
                            </div>
                        </div>
                        <h6>Delivered Orders</h6>
                    </div>

                    <div class="blue_radius cnsl_or">
                        <div class="tpline">
                            <div class="count_det">
                                <h5>{{ count.cancelled_order }}</h5>
                            </div>
                            <div class="act_imgg ">
                                <img src="images/custom_image/cncl_ordr.png" />
                            </div>
                        </div>
                        <h6>Cancelled Order</h6>
                    </div>

                    <div class="blue_radius mbrs">
                        <div class="tpline">
                            <div class="count_det">
                                <h5>{{ count.total_member }}</h5>
                            </div>
                            <div class="act_imgg ">
                                <img src="images/custom_image/memberss.png" />
                            </div>
                        </div>
                        <h6>New Member</h6>
                    </div>
                </div>

                <div class="act_dwn_arr">
                    <div class="row">
                        <div class="col-6 order_riview">
                            <div class="col_innrr">
                                <div class="act_dwn_hd">
                                    <div class="act_box_hd">
                                        <h3>Order Overview</h3>
                                        <p>May,2020</p>
                                    </div>
                                    <div class="selct_bxx small_slct">
                                        <div class="select">
                                            <select
                                                id="mounth"
                                                class="select-hidden"
                                            >
                                                <option value="hide"
                                                    >-- All --</option
                                                >
                                                <option
                                                    value="a"
                                                    rel="icon-temperature"
                                                    >Individuals</option
                                                >
                                                <option value="b"
                                                    >Unsubcribes</option
                                                >
                                                <option value="c"
                                                    >subcribes</option
                                                >
                                            </select>
                                            <div class="select-styled">
                                                -- All --
                                            </div>
                                            <ul
                                                class="select-options"
                                                style="display: none;"
                                            >
                                                <li rel="hide">-- All --</li>
                                                <li rel="a">Individuals</li>
                                                <li rel="b">Unsubcribes</li>
                                                <li rel="c">subcribes</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="chart_otr">
                                    <p>Chart Place...</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 order_items">
                            <div class="col_innrr">
                                <div class="act_dwn_hd">
                                    <div class="act_box_hd">
                                        <h3>Most Ordered Items</h3>
                                        <p>May,2020</p>
                                    </div>
                                </div>
                                <div class="order_itm_loop">
                                    <ul
                                        v-if="
                                            count.most_ordered_items.length > 0
                                        "
                                    >
                                        <li
                                            v-for="item in count.most_ordered_items"
                                            :key="item.data.id"
                                        >
                                            <p>{{ item.data.name }}</p>
                                            <h6>{{ item.count }}</h6>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="custom_footer">
                <p>
                    Copyright © Designed &amp; Developed by
                    <a href="" target="_blank">Sutanu &amp; Sudipta</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: {
                total_order: null,
                in_progress_order: null,
                delivered_order: null,
                cancelled_order: null,
                total_member: null,
                most_ordered_items: []
            }
        };
    },
    mounted() {
        axios
            .get("/api/seller/count-overview")
            .then(res => res.data)
            .then(res => {
                this.count = res.data;
            })
            .catch(error => {
                console.log("something went wrong");
            });
    }
};
</script>

<style></style>
