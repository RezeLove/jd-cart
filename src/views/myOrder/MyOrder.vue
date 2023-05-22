<template>
  <!-- <div class="wrapper">
    <div class="title" @click="test">我的订单</div>
    <div class="orders" v-for="shop in cartList" :key="shop.name">
      <div class="shop">
        <span class="shopname">{{ shop.name }}</span>
        <span class="status">已取消</span>
      </div>
      <div class="product-item">
        <div class="pics">
          <template v-for="product in shop.productList" :key="product._id">
            <img class="pic" :src="product.imgUrl" />
          </template>
        </div>
        <div class="price-Num">
          <div class="price">&yen;{{ shop.pay }}</div>
          <div class="Num">共{{ shop.amount }}件</div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders" v-for="(shop, index) in orderData" :key="index">
      <div class="shop">
        <span class="shopname">{{ shop.shopName }}</span>
        <span class="status">{{ shop.isCanceled ? "已取消" : "已支付" }}</span>
      </div>
      <div class="product-item">
        <div class="pics">
          <template v-for="(product, index) in shop.products" :key="index">
            <img class="pic" :src="product.product.img" />
          </template>
        </div>
        <div class="price-Num">
          <div class="price">&yen;{{ shop.totalPrice }}</div>
          <div class="Num">共{{ shop.totalNum }}件</div>
        </div>
      </div>
    </div>
  </div>
  <DockerView />
</template>
<script setup>
import DockerView from "../home/DockerView.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { get } from "../../utils/request";
import { errorMonitor } from "events";
import { onMounted } from "vue";
const store = useStore();
const { cartList } = store.state;
const orderData = ref();
onMounted(async () => {
  try {
    const result = await get("/api/order");
    if (result?.errno == 0 && result?.data?.length > 0) {
      const orderList = result.data;
      orderList.forEach((order) => {
        let totalNum = 0;
        let totalPrice = 0;
        order.products.forEach((product) => {
          totalNum += product.orderSales;
          totalPrice += product.orderSales * product.product.price;
        });
        order.totalNum = totalNum;
        order.totalPrice = totalPrice;
      });
      orderData.value = result.data;
      console.log(orderData.value);
    }
  } catch {
    console.log("fail");
  }
});
</script>
<style scoped lang="scss">
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgb(248, 248, 248);

  .title {
    line-height: 0.44rem;
    background: #fff;
    color: #333;
    font-size: 0.18rem;
    text-align: center;
  }
  .orders {
    background: #fff;
    margin: 0.16rem 0.18rem 0rem 0.18rem;
    padding: 0.16rem;
    .shop {
      display: flex;
      margin-bottom: 0.16rem;
      .shopname {
        flex: 1;
        line-height: 0.22rem;
        font-size: 0.16rem;
        color: #333;
      }
      .status {
        float: right;
        color: #999;
        font-size: 0.14rem;
      }
    }
    .product-item {
      display: flex;
      .pics {
        flex: 1;
        .pic {
          width: 0.4rem;
          height: 0.4rem;
          margin-right: 0.12rem;
        }
      }

      .price-Num {
        width: 0.7rem;
        .price {
          margin-bottom: 0.04rem;
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: #e93b3b;
          text-align: right;
        }
        .Num {
          line-height: 0.14rem;
          font-size: 0.12rem;
          color: #333;
          text-align: right;
        }
      }
    }
  }
}
</style>