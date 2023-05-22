<template>
  <div class="nearby__item">
    <img :src="item.imgUrl" class="nearby__item__img" />
    <div class="nearby__content">
      <div class="nearby__content__title">{{ item.name }}</div>
      <div class="nearby__content__tags">
        <span class="nearby__content__tag">月售：{{ item.sales }}+</span>
        <span class="nearby__content__tag">起送：{{ item.expressLimit }}</span>
        <span class="nearby__content__tag"
          >基础运费：{{ item.expressPrice }}</span
        >
      </div>
      <p class="nearby__content__highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>
<script setup>
// import { defineProps } from "vue";
const props = defineProps(["item"]);
</script>
<style lang="scss" scoped>
.nearby {
  &__item {
    display: flex;
    padding-top: 0.12rem;
    &__img {
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
  }
  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: #333;
    }
    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #333;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}
</style>