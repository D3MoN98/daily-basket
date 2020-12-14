<template>
    <Datatable
        :columns="columns"
        :customRow="true"
        :url="url"
        #default="rows"
        ref="datatable"
    >
        <tr
            :class="{
                'table-primary': row.status === 'processing',
                'table-info': row.status === 'prepared',
                'table-success': row.status === 'delivered'
            }"
            v-for="row in rows.data"
            :key="row.id"
        >
            <td>{{ row.id }}</td>
            <td>{{ row.user.name }}</td>
            <td>
                <p v-for="order_item in row.order_items" :key="order_item.id">
                    {{ order_item.name }} X {{ order_item.pivot.quantity }}
                </p>
            </td>
            <td>{{ row.total }}</td>
            <td>
                <select
                    @change.prevent="updateStatus(row.id, $event)"
                    id=""
                    class="form-control form-control-sm"
                >
                    <option
                        v-for="status in statuses"
                        :key="status.slug"
                        :value="status.slug"
                        :selected="status.slug === row.status"
                        :disabled="status.disabled"
                        >{{ status.name }}</option
                    >
                </select>
            </td>
            <td>{{ row.created_at_formatted }}</td>
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
            url: "/api/seller/order/current",
            statuses: [
                { name: "Processing", slug: "processing" },
                { name: "Accepted", slug: "accepted" },
                { name: "In Progress", slug: "in_progress" },
                { name: "Prepared", slug: "prepared", disabled: true },
                { name: "Delivered", slug: "delivered", disabled: true }
            ],
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
                    name: "order_items",
                    label: "Order Items",
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
                    name: "created_at_formatted",
                    label: "Order At",
                    orderAble: true
                }
            ]
        };
    },
    methods: {
        updateStatus(id, $event) {
            axios
                .put(`api/seller/order/status/update/${id}`, {
                    status: $event.target.value
                })
                .then(res => {
                    toastr.success("Status updated", "", {
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
                    this.$refs.datatable.fetch(this.url);
                })
                .catch(error => {
                    console.log(error);
                    toastr.error("Something went wrong", error.error, {
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
                });
        }
    }
};
</script>

<style scoped lang="scss">
tr.table-primary select.form-control {
    border-color: #678098 !important;
}
tr.table-info select.form-control {
    border-color: #678098 !important;
}
tr.table-success select.form-control {
    border-color: #678098 !important;
}
select.form-control {
    &:hover,
    &:active {
        background: transparent;
    }
}
</style>
