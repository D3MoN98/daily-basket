<template>
    <div class="content-body">
        <!-- row -->

        <div class="container">
            <div class="dash_hd_cmn">
                <h3>
                    Customer
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
                            {{ row.name }}
                        </td>
                        <td>{{ row.email }}</td>
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
            url: "/api/seller/customer",
            isLoaded: false,
            columns: [
                {
                    name: "name",
                    label: "Customer Name"
                },
                {
                    name: "email",
                    label: "Email"
                }
            ]
        };
    }
};
</script>
