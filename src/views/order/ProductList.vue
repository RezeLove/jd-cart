<template>
  <div class="products">
    <div class="shop-title">{{ shop.name }}</div>
    <div class="product-list">
      <div class="item" v-for="e in shop.productList" :key="e._id">
        <template v-if="e.count > 0">
          <img class="item__pic" :src="e.imgUrl" />
          <div class="item__text">
            <h4 class="title">{{ e.name }}</h4>
            <span class="current"
              ><span class="rmb">￥</span>{{ e.price }} x {{ e.count }}</span
            >
            <span class="totalprice"
              ><span class="rmb">￥</span>{{ e.totalprice }}</span
            >
          </div>
        </template>
      </div>
    </div>
  </div>
  <div class="docker">
    <div class="cart-text">
      实付金额 <b>&yen;{{ shop.pay }}</b>
    </div>
    <div class="cart-button" @click="Popup">提交订单</div>
  </div>
  <!-- 点击提交订单的提示消息 -->
  <div class="mask" v-if="showNotice" @click="Popup">
    <div class="content" @click.stop>
      <div class="title"><b>确认是否离开收银台</b></div>
      <div class="text">请尽快完成支付,否则将被取消</div>
      <div class="btn-box">
        <span class="btn1" @click="handleOrder(false, shopID)">取消订单</span>
        <span class="btn2" @click="handleOrder(true, shopID)">确认支付</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { post } from "../../utils/request";
const showNotice = ref(false);
const store = useStore();
const route = useRoute();
const router = useRouter();
const { cartList } = store.state;
const shopID = route.params.id;
const shop = cartList[shopID];
const test = () => {
  console.log(showNotice);
};
//点击提交订单后
const Popup = () => {
  console.log("into");
  showNotice.value = !showNotice.value;
};

// 提示消息相关
const products = [];
// 确认提交订单后
const handleOrder = async (isCanceled, shopID) => {
  for (let i in shop.productList) {
    if (shop.productList[i].count > 0) {
      products.push({
        id: shop.productList[i]._id,
        num: shop.productList[i].count,
      });
    }
  }
  try {
    const result = await post("/api/order", {
      addressId: shopID,
      shopName: shop.name,
      isCanceled,
      products,
    });
    if (result.errno === 0) {
      console.log(result.data);
      if (isCanceled) {
        router.push({ name: "myOrder" });
      }

      //   当提交完订单后, 还需要把购物车清空;
      // store.commit("clearCart", { shopID });
    }
  } catch {
    console.log("fail");
  }
};
</script>
<style lang="scss" scoped>
.products {
  margin: 0.16rem 0.18rem 0.1rem 0.18rem;
  background: #fff;
  .shop-title {
    line-height: 0.22rem;
    font-size: 0.18rem;
    font-weight: bold;
    padding: 0.16rem 0 0 0.16rem;
    color: #333;
  }
  .product-list {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0.6rem;
    top: 2.5rem;
    overflow-y: scroll;
  }
  .item {
    // position: relative;
    padding: 0.12rem 0.16rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    &__pic {
      width: 0.5rem;
      height: 0.5rem;
      margin-right: 0.15rem;
    }
    &__text {
      margin: 0;
      padding: 0;
      .title {
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #333;
        margin: 0;
      }
    }
    .current,
    .totalprice {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #e93b3b;
      margin: 0;
    }
    .totalprice {
      color: #000;
      position: absolute;
      right: 0.05rem;
    }
    .rmb {
      font-size: 0.12rem;
    }
  }
}
.docker {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  line-height: 0.49rem;
  display: flex;
  background: #fff;
  .cart-text {
    flex: 1;
    padding-left: 0.24rem;
    font-size: 0.17rem;
    color: #333;
  }
  .cart-button {
    background-color: #4fb0f9;
    width: 0.98rem;
    text-align: center;
    color: #fff;
    font-size: 0.14rem;
  }
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    border-radius: 0.04rem;
    text-align: center;
    .title {
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
      font-size: 0.18rem;
      color: #333;
    }
    .text {
      font-size: 0.14rem;
      color: #666;
      margin-top: 0.08rem;
    }
    .btn-box {
      margin: 0.24rem 0.58rem;
      display: flex;
    }
    .btn1,
    .btn2 {
      flex: 1;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      font-size: 0.14rem;
    }
    .btn1 {
      margin-right: 0.12rem;
      border: 0.01rem solid #4fb0f9;
      color: #4fb0f9;
    }
    .btn2 {
      margin-left: 0.12rem;
      background: #4fb0f9;
      color: #fff;
    }
  }
}
</style>