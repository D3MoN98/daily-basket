<template>
    <div id="main-wrapper" class="show">
        <Header />

        <Sidebar />

        <DeliveryAddress v-if="this.$store.getters['auth/check']" />

        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<script>
import Header from "@/views/delivery/components/Header";
import Sidebar from "@/views/delivery/components/Sidebar";
import DeliveryAddress from "@/views/delivery/components/DeliveryAddress";

export default {
    components: {
        Header,
        Sidebar,
        DeliveryAddress
    },

    data() {
        return {};
    },

    mounted() {
        const input = document.getElementById("search-input");
        const searchBtn = document.getElementById("search-btn");
        const expand = () => {
            searchBtn.classList.toggle("close");
            input.classList.toggle("square");
        };
        searchBtn.addEventListener("click", expand);
    }
};
</script>

<style></style>
