<template>
  <div class="wrapper__address">
    <span class="iconfont address-location">&#xe790;</span>
    <span class="wrapper__address__text">武汉大学信息学部18舍</span>
    <span class="iconfont address-bell">&#xe7c4;</span>
  </div>
  <div class="search">
    <span class="iconfont searchbtn">&#xe600;</span>
    <input type="text" class="searchinput" placeholder="山姆超市" />
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div v-for="item in iconList" :key="item.desc" class="icons__item">
      <img
        class="icons__item__img"
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
      />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>
<script setup>
const iconList = [
  { imgName: "超市", desc: "超市便利" },
  { imgName: "菜市场", desc: "菜市场" },
  { imgName: "水果店", desc: "水果店" },
  { imgName: "鲜花", desc: "鲜花绿植" },
  { imgName: "医药健康", desc: "医药健康" },
  { imgName: "家居", desc: "家居时尚" },
  { imgName: "蛋糕", desc: "烘培蛋糕" },
  { imgName: "签到", desc: "签到" },
  { imgName: "大牌免运", desc: "大牌免运" },
  { imgName: "红包", desc: "红包套餐" },
];
</script>
<style lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  box-sizing: border-box;
  // overflow-y: auto;
  // background-color: skyblue;
  &__address {
    padding: 0.16rem 0rem 0.16rem 0;
    position: relative;
    text-align: center;
    &__text {
      display: inline-block;
      overflow: hidden;
      //连续的空白被合并，并且换行失效https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space
      white-space: nowrap;
      //
      text-overflow: ellipsis;
      width: 2.3rem;
      padding-right: 0.1rem;
      font-size: 0.16rem;
      margin-left: 0.05rem;
    }
    .address-location {
      // 相对定位是相对于本应该出现的位置而言的
      position: relative;
      top: -0.02rem;
      font-size: 0.18rem;
    }
    .address-bell {
      position: absolute;
      right: 0;
      top: 0.16rem;
      font-size: 0.18rem;
      flex-grow: 1;
    }
  }
}
.search {
  width: 100%;
  margin-bottom: 0.12rem;
  background: #f5f5f5;
  color: #b7b7b7;
  border-radius: 0.16rem;
  display: flex;
  align-items: center;
  .searchbtn {
    font-size: 0.16rem;
    margin: 0 0.08rem 0 0.16rem;
  }
  .searchinput {
    line-height: 0.32rem;
    background: none;
    border: none;
    font-size: 0.14rem;
    flex-grow: 1;
  }
}
.banner {
  // 在图片没加载完成之前，高度为0，overflow:hidden，那么所有的高度就由padding-bottom撑开，25.4％指的是高宽比（因为全屏加载）
  // 然后图片加载完成后，在该区域中显示，这样就防止图片加载慢时，别的元素占据了图片的位置
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: #333;
    }
  }
}
.gap {
  height: 0.1rem;
  background: #f1f1f1;
}
</style>
