<template>
  <div class="content">
    <div class="left">
      <div
        v-for="item in sections"
        :key="item.name"
        @click="getContent(item.name, item.tab)"
        :class="{ 'left-div': true, active: item.name == currentTab }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="right">
      <div class="item" v-for="e in contentList" :key="e._id">
        <img class="item__pic" :src="e.imgUrl" />
        <div class="item__text">
          <h4 class="title">{{ e.name }}</h4>
          <p class="sales">月售{{ e.sales }}件</p>
          <p>
            <span class="current"
              ><span class="rmb">￥</span>{{ e.price }}</span
            >
            <span class="origin">￥{{ e.oldPrice }}</span>
          </p>
          <div class="btn">
            <!-- 刚开始的时候cartList?.[shopId]?.[producId].count不存在，就显示0，这个语句是个表达式，有返回值，因此可以这么谢 -->
            <span
              class="iconfont btn-minus"
              @click="changeCartNum(shopId, shopname.name, e._id, e, -1)"
              >-</span
            >
            {{ cartList?.[shopId]?.productList?.[e._id]?.count || 0 }}
            <span
              class="iconfont btn-plus"
              @click="changeCartNum(shopId, shopname.name, e._id, e, 1)"
              >+</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script setup>
import { ref, defineProps, watchEffect } from "vue";
import { get } from "../../utils/request";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const props = defineProps(["shopname"]);
//动态获取某个商家不同品类的商品信息，共三类 tab-all 所有商品、seckill 秒杀商品、fruit水果
let contentList = ref();
let currentTab = ref();
const sections = [
  {
    name: "全部商品",
    tab: "all",
  },
  {
    name: "秒杀",
    tab: "seckill",
  },
  {
    name: "新鲜水果",
    tab: "fruit",
  },
];

//点击时切换tab发送请求，展示不同内容
// const getContent = async (name, tab) => {
//   currentTab.value = name;
//   const result = await get(`/api/shop/${route.params.id}/products`, { tab });
//   if (result.errno === 0 && result.data.length) {
//     contentList.value = result.data;
//   }
// };

// 上下两种写法都可以

//也可通过watchEffect来实现相同的功能,这样就不用每次在click的时候都调用getContentData函数了
const getContent = async (name, tab) => {
  currentTab.value = name;
};

// shopId是当前所在商店的id
const route = useRoute();
const shopId = route.params.id;

//getContentData需要传参数
const getContentData = async () => {
  //params要求是对象的形式，要传参数currentTab.value，注意要以对象的形式传参
  const result = await get(`/api/shop/${shopId}/products`, {
    tab: currentTab.value,
  });
  if (result.errno === 0 && result.data.length) {
    contentList.value = result.data;
  }
};

//getContentData与currentTab.value有关，每当currentTab.value发生变化时，getContentData就会执行
watchEffect(() => {
  getContentData();
});

//购物车的相关逻辑，点击+ - 号时数量发生变化，通过vuex管理全局数据
const store = useStore();
const { cartList } = store.state;
const changeCartNum = (shopId, shopname, productId, productInfo, add) => {
  // commit给vuex中的mutations对state的数据进行修改
  // 注意：参数以对象的形式传递
  store.commit("changeCartNum", {
    shopId,
    shopname,
    productId,
    productInfo,
    add,
  });
};
</script>

  <style lang="scss" scoped>
.content {
  position: absolute;
  top: 1.6rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  display: flex;
}
.left {
  width: 0.76rem;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.left-div {
  font-size: 0.14rem;
  line-height: 0.4rem;
  text-align: center;
  color: #333;
}
.active {
  background: white;
}
.right {
  flex: 1;
  overflow: scroll;
}
.item {
  position: relative;
  padding: 0 0.16rem;
  margin: 0.12rem 0;
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
    .sales {
      line-height: 0.16rem;
      font-size: 0.12rem;
      color: #333;
      margin: 0.06rem 0;
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
</style>