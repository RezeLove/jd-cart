<template>
  <div class="docker">
    <div v-for="(item, index) in dockerList" :key="index" class="docker__item">
      <router-link :to="item.to">
        <!-- 因为item.icon是不常见字符，可能会被转义，因此直接使用v-html="item.icon" 防止被转移 -->
        <span class="iconfont" v-html="item.icon"></span>
        <span class="text">{{ item.text }}</span>
      </router-link>
    </div>
  </div>
</template>
<script setup>
const dockerList = [
  { icon: "&#xe7c6;", text: "首页", to: { name: "HomeView" } },
  { icon: "&#xe747;", text: "购物车", to: { name: "ShoppingCart" } },
  { icon: "&#xe713;", text: "订单", to: { name: "myOrder" } },
  { icon: "&#xe7d5;", text: "我的", to: { name: "Mine" } },
];
</script>
<style lang="scss" scoped>
.docker {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  box-sizing: border-box;
  padding: 0 0.18rem;
  border-top: 1px solid #f1f1f1;
  // 调用变量
  display: flex;
  .router-link-active {
    color: #1fa4fc;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  // BEM命名法 block__element--modify
  // scss使用&可以代替外层的class
  &__item {
    text-align: center;
    flex: 1;
    .text {
      display: block;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.25rem;
    }
  }
}
</style>
