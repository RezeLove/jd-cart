<template>
  <div class="Toast">{{ content }}</div>
</template>
<script setup>
import { defineProps, defineExpose, reactive } from "vue";
const props = defineProps({
  content: {
    type: String,
    default: "登陆失败",
  },
});
const toastRelated = {
  toastData: reactive({
    showToast: false,
    showContent: "登录失败",
  }),
  openToast: (message) => {
    setTimeout(() => {
      toastData.showToast = false;
      toastData.showContent = message;
    }, 1000);
  },
};
const test = false;
defineExpose({ toastRelated, test });
</script>
<style lang="scss" scoped>
.Toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  border-radius: 0.05rem;
  color: white;
  background: rgba(0, 0, 0, 0.35);
}
</style>