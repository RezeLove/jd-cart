<template>
  <div class="wrapper">
    <HeaderView />
    <NearShops />
  </div>
  <DockerView />
</template>

<script setup>
import HeaderView from "./HeaderView.vue";
import NearShops from "./NearShops.vue";
import DockerView from "./DockerView.vue";
</script>
  <style lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
