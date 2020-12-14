<template>
    <div class="content-body">
        <!-- row -->

        <div class="container">
            <div class="dash_hd_cmn">
                <h3>
                    Restaurants
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
                    <tr
                        :class="{ 'table-primary': row.new }"
                        v-for="row in rows.data"
                        :key="row.id"
                    >
                        <td>
                            {{ row.name }}
                            <router-link
                                :to="{ path: '/restaurant/' + row.slug }"
                                target="_blank"
                            >
                                <i
                                    class="fa fa-external-link"
                                    aria-hidden="true"
                                ></i>
                            </router-link>
                        </td>
                        <td>{{ row.contact_no }}</td>
                        <td>{{ row.address.address }}</td>
                        <td>
                            <span
                                class="badge cursor-pointer"
                                :class="{
                                    'badge-success': row.is_verified == 1,
                                    'badge-danger': row.is_verified == 0
                                }"
                                role="button"
                                @click.prevent="updateVerification(row.id)"
                                >{{
                                    row.is_verified == 1
                                        ? "Verified"
                                        : "Not Verified"
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
            url: "/api/admin/restaurant",
            isLoaded: false,
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
                    name: "address.address",
                    label: "Address"
                },
                {
                    name: "is_verified",
                    label: "Verified"
                }
            ]
        };
    },
    methods: {
        updateVerification(id) {
            axios
                .post(`api/admin/restaurant/update/verification/${id}`)
                .then(res => res.data)
                .then(res => {
                    this.$refs.datatable.fetch(this.url);
                });
        }
    }
};
</script>

<style></style>
