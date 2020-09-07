<template>
  <div class="prfl_rgt prf_address">
    <div class="hd_20">
      <h3>Manage Your Address</h3>
    </div>
    <div class="prf_address_inn">
      <ul>
        <li v-for="userAddress in userAddresses" :key="userAddress.id">
          <div class="prf_add_inn">
            <h3>{{userAddress.type}}</h3>
            <address>{{userAddress.address}}</address>
            <div class="edit_del">
              <p>
                <a href @click.prevent="$emit('edit-show-ddress', userAddress.id)">Edit</a>
              </p>
              <p>
                <a href @click.prevent="deleteAddress(userAddress.id)">Delete</a>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted () {
    this.$store.dispatch('user/userAddresses');
  },
  computed: {
    ...mapGetters({ userAddresses: 'user/userAddresses' })
  },
  methods: {
    deleteAddress (id) {
      Swal.fire({
        title: 'Are you sure you want to delete this address?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6883b9',
        cancelButtonColor: '#dd6b55',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('user/deleteAddress', id);
        }
      });
    },
  }
}
</script>

<style>
</style>
