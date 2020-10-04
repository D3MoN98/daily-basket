<template>
  <Datatable :columns="columns" :url="'/api/seller/subscription/past'" />
</template>

<script>
import Datatable from "@/views/components/Datatable";

export default {
  components: {
    Datatable
  },
  data () {
    return {
      isLoaded: false,
      columns: [
        {
          name: 'id',
          label: 'ID',
          orderAble: true,
        },
        {
          name: 'user.name',
          label: 'Customer Name',
          orderAble: false,
        },
        {
          name: 'user.contact_no',
          label: 'Contact No',
          orderAble: false,
        },
        {
          name: 'total',
          label: 'Total Amount',
          orderAble: true,
        },
        {
          name: 'started_at',
          label: 'Started',
          orderAble: true,
        },
        {
          name: 'expired_at',
          label: 'Expired',
          orderAble: true,
        },
        {
          name: 'created_at',
          label: 'Created At',
          orderAble: true,
        },
      ]
    };
  },
}
</script>

<style>
</style>
