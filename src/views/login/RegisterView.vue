<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
    />
    <div class="serachbox">
      <input
        class="serachbox__input"
        v-model="userData.username"
        placeholder="请输入手机号"
      />
    </div>
    <div class="serachbox">
      <input
        class="serachbox__input"
        v-model="userData.password"
        placeholder="请输入密码"
      />
    </div>
    <div class="serachbox">
      <input
        class="serachbox__input"
        v-model="userData.rePassword"
        placeholder="请确认密码"
      />
    </div>
    <div class="login-btn" @click="handleRegister">注册</div>
    <div class="login-link" @click="GotoLogin">已有帐号去登录</div>
    <ToastCom
      v-if="toastData.showToast"
      :content="toastData.showContent"
    ></ToastCom>
  </div>
</template>
    <script setup>
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { post } from "../../utils/request";
import ToastCom from "../../components/ToastCom.vue";
const router = useRouter();
const toastRelated = {
  toastData: reactive({
    showToast: false,
    showContent: "",
  }),
  openToast: (message) => {
    setTimeout(() => {
      toastData.showToast = false;
      toastData.showContent = message;
    }, 1000);
  },
};
const userData = reactive({
  username: "",
  password: "",
  rePassword: "",
});
const { toastData, openToast } = toastRelated;

const handleRegister = async () => {
  try {
    console.log(userData.password);
    console.log(userData.rePassword);
    if (userData.password === userData.rePassword) {
      const result = await post("jd/api/user/register", {
        username: userData.username,
        password: userData.password,
        rePassword: userData.rePassword,
      })
        .then((data) => {
          if (data.errno === 0) {
            localStorage.isLogin = true;
            router.push({ name: "HomeView" });
          }
        })
        .catch((err) => {
          toastData.showToast = true;
          openToast("注册失败");
        });
    } else {
      toastData.showToast = true;
      openToast("两次输入密码不一致");
    }
  } catch {
    console.log("请求失败");
  }
};
const GotoLogin = () => {
  router.push({ name: "login" });
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
      height: 0.48rem;
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