<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__arrow" @click="Back">&#xe679;</div>
      <div class="top__header__text">确认订单</div>
    </div>
    <div class="top__addressee">
      <div class="top__addressee__title">收货地址</div>
      <div class="top__addressee__address">
        上海市青浦区盈港路688弄
        <span class="iconfont right-arrow">&#xe62d;</span>
      </div>
      <div class="top__addressee__customer">
        <span>TX7</span>
        <span>17621184365</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const Back = () => {
  router.back();
};
</script>
<style lang="scss" scoped>
.top {
  position: relative;
  height: 1.96rem;
  /* 背景色的写法 可设置背景色的大小 */
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 225, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    padding-top: 0.26rem;
    text-align: center;
    line-height: 0.24rem;
    color: #fff;
    display: flex;
    font-size: 0.18rem;
    &__arrow {
      font-size: 0.2rem;
    }
    &__text {
      flex: 1;
    }
  }
  &__addressee {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.1rem;
    background: #fff;
    border-radius: 0.04rem;
    &__title {
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-weight: bold;
      font-size: 0.16rem;
      color: #333;
      line-height: 0.22rem;
    }
    &__address {
      position: relative;
      padding: 0rem 0.4rem 0 0.16rem;
      line-height: 0.2rem;
      color: #333;
      font-size: 0.14rem;
      .right-arrow {
        position: absolute;
        right: 0.01rem;
        top: -0.03rem;
        color: #666;
        font-size: 0.2rem;
      }
    }
    &__customer {
      padding: 0.06rem 0 0 0.16rem;
      span {
        line-height: 0.18rem;
        font-size: 0.12rem;
        color: #666;
        margin-right: 0.06rem;
      }
    }
  }
}
</style>