<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <div class="backarrow iconfont" @click="backToHome">&#xe679;</div>
      <div class="search">
        <span class="search__icon iconfont">&#xe600;</span>
        <input
          type="text"
          class="search__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <SingleShop :item="item" />
    <ShopContent :shopname="item" />
    <ShopCart />
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import SingleShop from "../shop/SingleShop.vue";
import ShopContent from "../shop/ShopContent.vue";
import ShopCart from "../shop/ShopCart.vue";

//根据id来显示对应的router
// 该页面是由首页跳转过来的，通过route来获取id 通过route.params.id
const route = useRoute();
const item = ref();
const getItem = async () => {
  const result = await get(`/api/shop/${route.params.id}`);
  if (result.errno === 0 && result.data) {
    item.value = result.data;
  }
};
getItem();

//回退逻辑
const router = useRouter();
const backToHome = () => {
  router.push({ name: "HomeView" });
  // router.back();
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 0 0.18rem;
  height: 100%;
}
.search-wrapper {
  display: flex;
  align-items: center;
}
.backarrow {
  font-size: 0.22rem;
  padding: 0.01rem 0 0 0;
  color: #b6b6b6;
  text-align: center;
  margin-right: 0.05rem;
}
.search {
  width: 100%;
  margin: 0.2rem 0 0.16rem 0;
  background: #f5f5f5;
  color: #b7b7b7;
  border-radius: 0.16rem;
  display: flex;
  align-items: center;
  &__input {
    border: none;
    background: none;
    outline: none;
    flex-grow: 1;
  }
  &__icon {
    font-size: 0.2rem;
    margin: 0 0.1rem;
    line-height: 0.32rem;
  }
}
</style>