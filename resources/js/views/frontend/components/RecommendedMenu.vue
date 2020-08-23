<template>
  <div id="recommendedMenu" class="food_tab_items animate__animated animate__fadeIn">
    <!-- <h3>Lunch1</h3>
    <h4>Indian</h4>-->
    <div class="food_ottr">
      <ul>
        <MenuItem
          v-show="isRecommendedMenuItemLoaded"
          v-for="menu_item in recommended_menu_items"
          :key="menu_item.id"
          :menu_item="menu_item"
        />
        <MenuItemPlaceholder
          v-show="!isRecommendedMenuItemLoaded"
          v-for="index in 6"
          :key="index+'_plchldr'"
        />
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
    isRecommendedMenuItemLoaded: {
      type: Boolean,
      default: false,
    },
    recommended_menu_items: null,
  },
};
</script>

<style>
</style>
