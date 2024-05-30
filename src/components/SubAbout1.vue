<template>
  <div>
    <p>这里是 subAbout1 页面</p>
    <div>我叫 {{ username }}，我今年 {{ age }} 岁啦}</div>
  </div>
</template>



<script setup>
import { ref } from "vue";

import { storeToRefs } from "pinia"; //引入pinia转换

import homeInfoStore from "../store/home";
const homeInfo = homeInfoStore();

// const { username, age, like, hobby } = homeInfo //直接结构赋值  不是响应式
// const { username ,age, like, hobby } = toRefs(homeInfo) // 响应式
const { username, age } = storeToRefs(homeInfo); // 响应式

defineProps({
  name: String,
});
</script>


<style>
</style>