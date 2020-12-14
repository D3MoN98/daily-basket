<template>
    <div class="content-body">
        <!-- row -->

        <div class="container">
            <div class="dash_hd_cmn">
                <h3>
                    Feedback
                    <span class>Datatable</span>
                </h3>
            </div>
            <div class="cmn_table adress_size">
                <Datatable
                    :columns="columns"
                    customRow="true"
                    :url="url"
                    #default="rows"
                    ref="datatable"
                >
                    <tr v-for="row in rows.data" :key="row.id">
                        <td>
                            {{ row.user.name }}
                        </td>
                        <td>{{ row.order_id }}</td>
                        <td>
                            <i
                                v-for="i in row.rating"
                                :key="i"
                                class="fas fa-star text-warning"
                            ></i>
                        </td>
                        <td>{{ row.created_at_formatted }}</td>
                    </tr>
                </Datatable>
            </div>
            <div class="custom_footer">
                <p>
                    Copyright © Designed &amp; Developed by
                    <a href target="_blank">Sutanu & Sudipta</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import Datatable from "@/views/components/Datatable";

export default {
    components: {
        Datatable
    },
    data() {
        return {
            url: "/api/seller/feedback",
            isLoaded: false,
            columns: [
                {
                    name: "user.name",
                    label: "Customer Name"
                },
                {
                    name: "order_id",
                    label: "Order Id"
                },
                {
                    name: "rating",
                    label: "Rating"
                },
                {
                    name: "created_at",
                    label: "Rated At"
                }
            ]
        };
    }
};
</script>
