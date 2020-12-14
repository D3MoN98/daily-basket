<template>
    <div class="content-body">
        <!-- row -->
        <div class="container">
            <div class="dash_hd_cmn">
                <h3>Kithcen Staffs</h3>
                <!-- Button trigger modal -->
                <button
                    type="button"
                    class="btn btn-primary btn-lg"
                    data-toggle="modal"
                    data-target="#kithcenStaffModal"
                >
                    Add Staff
                </button>
            </div>
            <div class="sub_tab_table order_mang">
                <Datatable
                    :columns="columns"
                    customRow="true"
                    :url="url"
                    #default="rows"
                    ref="datatable"
                >
                    <tr v-for="row in rows.data" :key="row.id">
                        <td>{{ row.name }}</td>
                        <td>{{ row.contact_no }}</td>
                        <td style="width: 25%">
                            <span
                                class="badge cursor-pointer"
                                :class="{
                                    'badge-success': row.pivot.is_active == 1,
                                    'badge-danger': row.pivot.is_active == 0
                                }"
                                role="button"
                                @click.prevent="updateActive(row.pivot.id)"
                                >{{
                                    row.pivot.is_active == 1
                                        ? "Active"
                                        : "Not Active"
                                }}
                            </span>
                        </td>
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

        <!-- Modal -->
        <KithcenStaffModal />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import KithcenStaffModal from "./components/KitchenStaffModal";
import Datatable from "@/views/components/Datatable";

export default {
    data() {
        return {
            isLoaded: false,
            url: "/api/seller/kitchen-staff",
            columns: [
                {
                    name: "name",
                    label: "Name"
                },
                {
                    name: "contact_no",
                    label: "Contact No"
                },
                {
                    name: "pivot.is_active",
                    label: "Active"
                }
            ]
        };
    },
    components: {
        KithcenStaffModal,
        Datatable
    },
    methods: {
        updateActive(id) {
            axios
                .post(`/api/seller/kitchen-staff/change-active/${id}`)
                .then(res => res.data)
                .then(res => {
                    this.$refs.datatable.fetch(this.url);
                });
        }
    }
};
</script>

<style></style>
