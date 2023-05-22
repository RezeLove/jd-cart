<template>
  <div class="wrapper">
    <CustomerAddress />
    <ProductList />
  </div>
</template>
<script setup>
import ProductList from "../order/ProductList.vue";
import CustomerAddress from "../order/CustomerAddress.vue";
</script>
<style lang="scss" scoped>
.wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #eee;
  z-index: 0;
}
</style>