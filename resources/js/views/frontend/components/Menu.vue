<template>
  <div id="menu" class="food_tab_items animate__animated animate__fadeIn">
    <!-- <h3>Lunch2</h3>
    <h4>Indian</h4>-->
    <div class="food_ottr">
      <ul>
        <MenuItem
          v-show="isMenuItemLoaded"
          v-for="menu_item in menu_items"
          :key="menu_item.id"
          :menu_item="menu_item"
        />
        <MenuItemPlaceholder v-show="!isMenuItemLoaded" v-for="index in 6" :key="index+'_plchldr'" />
      </ul>
    </div>
  </div>
</template>

<script>
import MenuItem from '@/views/frontend/components/MenuItem';
import MenuItemPlaceholder from '@/views/frontend/components/MenuItemPlaceholder';

export default {
  components: {
    MenuItem,
    MenuItemPlaceholder,
  },
  props: {
    isMenuItemLoaded: {
      type: Boolean,
      default: false,
    },
    menu_items: null,
  },
};
</script>

<style>
</style>
