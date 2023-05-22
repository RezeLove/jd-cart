import { createStore } from 'vuex'

//由于Vuex的数据是存储在内存中的，当页面刷新的时候内存被清空重载新内容，原来的数据就丢了
// 因此，可以将数据存储在localstorage里面（也有其他方法，比如vue的localstorage相关插件）
const setLocalStorage = (state) => {
  const { cartList } = state
  // localStrorage必须以json格式保存
  const cartListJson = JSON.stringify(cartList)
  localStorage.cartList = cartListJson
}

export default createStore({
  state: {
    //数据结构cartList:{1:{name:,productList:{}},2:{name:,productList:{}}}
    cartList: {
    }
  },
  getters: {
  },
  mutations: {
    // 共两个参数，一个是state，另一个是其余参数的对象
    changeCartNum(state, payload) {
      const { shopId, shopname, productId, productInfo, add } = payload
      let shopInfo = state.cartList[shopId]
      // 如果没有就创建一次 后续不再重复这些步骤
      if (!shopInfo) {
        //构造二层
        shopInfo = {};
        shopInfo.name = shopname
        //构造第三层
        shopInfo.productList = {}
      }
      let product = shopInfo.productList[productId]
      // 如果没有product就把从后端接口获取的数据传给product
      // 但是product没有count，因此需要初始化count属性
      if (!product) {
        product = productInfo
        product.count = 0
        product.totalprice = 0
        product.checked = true
      }
      product.count += add
      product.totalprice = product.count * product.price
      if (product.count < 0) { product.count = 0 }
      // if (product.count > 0) { product.checked = true }

      //这里的product和shopInfo就相当于是一个变量，它们的修改不会影响原来的对象
      // 因此需要重新赋值一遍
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },
    clearAll(state, payload) {
      const { shopId } = payload
      let shopInfo = state.cartList[shopId]?.productList;
      for (let i in shopInfo) {
        shopInfo[i].count = 0;
      }
      state.cartList[shopId].productList = shopInfo
      setLocalStorage(state)
    },
    selectAll(state, payload) {
      const { shopId, select } = payload
      let shopInfo = state.cartList[shopId]?.productList;
      if (select == true) {
        for (let i in shopInfo) {
          shopInfo[i].checked = false;
        }
      }
      else {
        for (let i in shopInfo) {
          shopInfo[i].checked = true;
        }
      }
      state.cartList[shopId].productList = shopInfo
      setLocalStorage(state)
    },
    gotoOrder(state, payload) {
      const { shopId, pay, amount } = payload
      state.cartList[shopId].pay = pay
      state.cartList[shopId].amount = amount
      setLocalStorage(state)
    },
    clearCart(state, payload) {
      const { shopID } = payload
      state.cartList[shopID].productList = {}
      setLocalStorage(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
