<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <!-- 这里把to加上引号，变为动态的，同时使用ES6的字符串拼接语法 -->
    <router-link
      v-for="item in nearShops"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <SingleShop :item="item" />
    </router-link>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { get } from "../../utils/request";
import SingleShop from "../shop/SingleShop.vue";

const nearShops = ref([]);
//通过接口，使用get动态获取数据
const getNearShops = async () => {
  const result = await get("/api/shop/hot-list");
  if (result.errno === 0 && result.data.length) {
    nearShops.value = result.data;
  }
};
//记得调用
getNearShops();
</script>
<style lang="scss">
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: #333;
  }
  a {
    text-decoration: none;
  }
}
</style>
