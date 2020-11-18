<template>
    <Datatable
        :columns="columns"
        :customRow="true"
        :url="'/api/seller/order/current'"
    >
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </Datatable>
</template>

<script>
import Datatable from "@/views/components/Datatable";

export default {
    components: {
        Datatable
    },
    data() {
        return {
            isLoaded: false,
            columns: [
                {
                    name: "id",
                    label: "Order ID",
                    orderAble: true
                },
                {
                    name: "user.name",
                    label: "Customer Name",
                    orderAble: false
                },
                {
                    name: "user.contact_no",
                    label: "Contact No",
                    orderAble: false
                },
                {
                    name: "total",
                    label: "Total Amount",
                    orderAble: false
                },
                {
                    name: "status",
                    label: "Status",
                    orderAble: false
                },
                {
                    name: "created_at",
                    label: "Order At",
                    orderAble: true
                }
            ]
        };
    }
};
</script>

<style></style>
