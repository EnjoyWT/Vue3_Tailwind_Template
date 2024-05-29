

<template>
  <div class="bg-green-500 w-1/2">
    <p>Hi There , this is a templete for about</p>
    <button @click="goToAbout" class="bg-blue-500">去子页面</button>
    <router-view></router-view>
  </div>
</template>

<script setup>
// 引入 ref 函数
import { ref } from "vue";
import { useRouter } from "vue-router";

defineProps({
  name: String,
});

// 使用 useRouter 获取路由实例
const router = useRouter();

// 定义一个方法，用于跳转到 About 页面
const goToAbout = () => {
  router.push({ path: "/about/sub2" }); // 使用相对路径进行跳转
  // router.push("sub2");
};
</script>
