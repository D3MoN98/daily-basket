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
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact No</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="kitchen_staff in kitchen_staffs"
                            :key="kitchen_staff.id"
                        >
                            <td scope="row">{{ kitchen_staff.name }}</td>
                            <td>{{ kitchen_staff.contact_no }}</td>
                            <td style="width: 25%">
                                <span
                                    class="badge cursor-pointer"
                                    :class="{
                                        'badge-success':
                                            kitchen_staff.pivot.is_active == 1,
                                        'badge-danger':
                                            kitchen_staff.pivot.is_active == 0
                                    }"
                                    role="button"
                                    @click.prevent="
                                        changeActive(kitchen_staff.pivot.id)
                                    "
                                    >{{
                                        kitchen_staff.pivot.is_active == 1
                                            ? "Active"
                                            : "Not Active"
                                    }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
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

export default {
    data() {
        return {
            isLoaded: false,
            isActiveChanged: false
        };
    },
    components: {
        KithcenStaffModal
    },
    mounted() {
        this.$store.dispatch("sellerKitchen/kitchenStaffs").then(() => {
            this.isLoaded = true;
        });
    },
    computed: {
        ...mapGetters({
            kitchen_staffs: "sellerKitchen/getKitchenStaff"
        })
    },
    methods: {
        changeActive(id) {
            this.isActiveChanged = true;
            this.$store.dispatch("sellerKitchen/changeActive", id);
        }
    }
};
</script>

<style></style>
