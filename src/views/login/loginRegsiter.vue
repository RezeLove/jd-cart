<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
    />
    <div class="serachbox">
      <input
        class="serachbox__input"
        placeholder="请输入手机号"
        v-model="userData.username"
      />
    </div>
    <div class="serachbox">
      <input
        class="serachbox__input"
        type="password"
        placeholder="请输入密码"
        v-model="userData.password"
      />
    </div>
    <div class="serachbox">
      <input class="serachbox__input" placeholder="请确认密码" />
    </div>
    <div class="login-btn" @click="handleLogin">登录</div>
    <div class="login-link" @click="GotoRegister">立即注册</div>
    <!-- <ToastCom v-if="true" :content="userData.showContent" /> -->
    <ToastCom />
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, reactive } from "vue";
import { post } from "../../utils/request";
import ToastCom from "../../components/ToastCom.vue";
const toast = ref(null);
const userData = reactive({
  username: "",
  password: "",
  showToast: false,
  showContent: "登录失败",
});
const router = useRouter();
const handleLogin = async () => {
  const result = await post("j123d/api/user/login", {
    username: userData.username,
    password: userData.password,
  })
    .then((data) => {
      console.log(data);
      if (data.errno === 0) {
        localStorage.isLogin = true;
        router.push({ name: "HomeView" });
      }
    })
    .catch((err) => {
      userData.showToast = true;
      setTimeout(() => {
        userData.showToast = false;
      }, 1000);
    });
};
const GotoRegister = () => {
  router.push({ name: "register" });
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 24%;
  left: 0;
  right: 0;
  text-align: center;
  &__img {
    height: 0.66rem;
    width: 0.66rem;
    margin-bottom: 0.4rem;
  }
  .serachbox {
    margin: 0rem 0.4rem 0.16rem 0.4rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    border-radius: 6px;
    outline: none;
    padding: 0 0.16rem;
    &__input {
      margin: 0.12rem 0;
      line-height: 0.22rem;
      width: 2.95rem;
      background: none;
      outline: none;
      border: none;
      padding: 0;
    }
  }
  .login-btn {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.16rem;
    text-align: center;
  }
  .login-link {
    text-align: center;
    font-size: 0.14rem;
    color: #777;
  }
}
</style>