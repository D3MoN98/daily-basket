<template>
  <div id="main-wrapper" class="show">
    <Header />

    <Sidebar />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>

import Header from '@/views/seller/components/Header';
import Sidebar from '@/views/seller/components/Sidebar';

export default {
  components: {
    Header,
    Sidebar
  },

  data () {
    return {};
  },

  mounted () {
    const input = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const expand = () => {
      searchBtn.classList.toggle('close');
      input.classList.toggle('square');
    };
    searchBtn.addEventListener('click', expand);
  },

};
</script>

<style></style>
