<template>
  <!-- 蒙层的写法 z-index妙用 -->
  <div class="mask" v-show="showCart" @click="showCartButton"></div>
  <div class="cart-drawer" v-show="showCart">
    <div class="cartDrawer-heder">
      <div class="selectall">
        <span
          class="checkbox iconfont"
          v-html="result.select ? '&#xe66a;' : '&#xe6f2;'"
          @click="selectAll(shopId, result.select)"
        ></span
        >全选
      </div>
      <div class="clear" @click="clearAll(shopId)">清空购物车</div>
    </div>
    <div
      class="item"
      v-for="e in cartList[shopId]?.productList"
      :key="e._id"
      v-show="e.count != 0"
    >
      <div
        class="checkbox iconfont"
        v-html="e.checked ? '&#xe66a;' : '&#xe6f2;'"
        @click="changeCheck(e._id)"
      ></div>
      <img class="item__pic" :src="e.imgUrl" />
      <div class="item__text">
        <h4 class="title">{{ e.name }}</h4>
        <p>
          <span class="current"><span class="rmb">￥</span>{{ e.price }}</span>
          <span class="origin">￥{{ e.oldPrice }}</span>
        </p>
        <div class="btn">
          <!-- 刚开始的时候cartList?.[shopId]?.[producId].count不存在，就显示0，这个语句是个表达式，有返回值，因此可以这么谢 -->
          <span
            class="iconfont btn-minus"
            @click="changeCartNum(shopId, e._id, e, -1)"
            >-</span
          >
          {{ e.count || 0 }}
          <span
            class="iconfont btn-plus"
            @click="changeCartNum(shopId, e._id, e, 1)"
            >+</span
          >
        </div>
      </div>
    </div>
  </div>
  <div class="cart-wrapper">
    <div class="cart-icon">
      <img
        src="http://www.dell-lee.com/imgs/vue3/basket.png"
        class="basket-icon"
        @click="showCartButton"
      />
      <div class="number-tag">{{ result.totalNum }}</div>
    </div>
    <div class="cart-text">
      总计:<span class="price">&yen; {{ result.price }}</span>
    </div>
    <router-link :to="`/Order/${shopId}`">
      <div
        class="cart-button"
        v-show="result.price > 0"
        @click="gotoOrder(shopId, result.price, result.totalNum)"
      >
        去结算
      </div>
    </router-link>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
//获取vuex的数据
//ustStore后，cartList就是响应式的
const store = useStore();
let cartList = store.state.cartList;
const route = useRoute();
const shopId = route.params.id;

//是否显示抽屉，通过点击购物车按钮确定
const showCart = ref(false);
const changeCartNum = (shopId, productId, productInfo, add) => {
  store.commit("changeCartNum", { shopId, productId, productInfo, add });
};

const showCartButton = () => {
  showCart.value = !showCart.value;
};

//购物车checkbox部分,通过checkbox确定是否计算给商品的价格
const changeCheck = (productId) => {
  cartList[shopId].productList[productId].checked =
    !cartList[shopId].productList[productId].checked;
};

//购物车全选部分,计算购物车价格和数量都是用computed且都进行了循环，可以写在一起
let result = computed(() => {
  let result = { select: true, totalNum: 0, price: 0 };
  const shopInfo = cartList[shopId]?.productList;
  for (let i in shopInfo) {
    const product = shopInfo[i];
    if (product.count > 0 && !product.checked) {
      result.select = false;
    }
    if (product.checked) {
      result.totalNum += product.count;
      result.price += product.count * product.price;
    }
  }
  result.price = result.price.toFixed(2);
  // 记住return一个值
  return result;
});

//全选购物车
const selectAll = (shopId, select) => {
  store.commit("selectAll", { shopId, select });
};

//清空购物车
const clearAll = (shopId) => {
  store.commit("clearAll", { shopId });
};

//点击去结算后，在vuex保存当前商家需要付的总额
const gotoOrder = (shopId, pay, amount) => {
  store.commit("gotoOrder", { shopId, pay, amount });
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart-drawer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  background: #fff;
  z-index: 2;
}
.cartDrawer-heder {
  display: flex;
  border: 1px solid #f1f1f1;
  justify-content: space-between;
}
.selectall,
.clear {
  font-size: 0.15rem;
  padding: 0.1rem 0;
}
.selectall {
  padding-left: 0.1rem;
}
.clear {
  padding-right: 0.1rem;
}
.checkbox {
  color: #0091ff;
  font-size: 0.22rem;
  margin-right: 0.1rem;
}
.right {
  flex: 1;
  overflow: scroll;
}
.item {
  position: relative;
  padding: 0 0.16rem;
  margin: 0rem 0;
  display: flex;
  align-items: center;
  &__pic {
    width: 0.68rem;
    height: 0.68rem;
    margin-right: 0.1rem;
  }
  &__text {
    .title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333;
      margin: 0;
    }
  }
  .current {
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #e93b3b;
    margin: 0;
  }
  .rmb {
    font-size: 0.12rem;
  }
  .origin {
    line-height: 0.2rem;
    font-size: 0.12rem;
    color: #999;
    margin-left: 0.06rem;
    text-decoration: line-through;
  }
  .btn {
    position: absolute;
    right: 0.14rem;
    bottom: 0.12rem;
    text-align: center;
  }
  .btn-minus,
  .btn-plus {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    //当line-height与height一致时，可实现单行的垂直居中
    line-height: 0.18rem;
    font-size: 0.2rem;
    border-radius: 50%;
  }
  .btn-minus {
    border: 0.01rem grey solid;
    color: #666;
    margin-right: 0.05rem;
  }
  .btn-plus {
    background: #0091ff;
    color: white;
    margin-left: 0.05rem;
  }
}
.cart-wrapper {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 0.5rem;
  display: flex;
  background: #fff;
  align-items: center;
  z-index: 2;
  a {
    text-decoration: none;
  }
}
.cart-icon {
  position: relative;
  width: 0.84rem;
  text-align: center;
  .basket-icon {
    width: 0.28rem;
    height: 0.26rem;
  }
  .number-tag {
    position: absolute;
    right: 0.2rem;
    top: 0;
    border-radius: 50%;
    min-width: 0.12rem;
    height: 0.12rem;
    line-height: 0.12rem;
    font-size: 0.12rem;
    color: #fff;
    background-color: #e93b3b;
  }
}

.cart-text {
  flex: 1;
  font-size: 0.12rem;
  color: #333;
  .price {
    font-size: 0.18rem;
    color: #e93b3b;
  }
}
.cart-button {
  background-color: #4fb0f9;
  line-height: 0.5rem;
  width: 0.98rem;
  text-align: center;
  color: #fff;
  font-size: 0.14rem;
}
</style>