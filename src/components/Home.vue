<template>
  <div class="flex flex-col">
    <!-- state的使用 -->
    <div>我叫 {{ username }}，我今年 {{ age }} 岁啦, 喜欢 {{ like }}</div>
    <div>爱好有</div>
    <div v-for="item in hobby" :key="item.id">
      <div>{{ item.name }}</div>
    </div>
    <button @click="editPiniaHandler">点击修改</button>
    <button @click="editAll">点击修改全部</button>
    <button @click="resetBtn">重置</button>
    <button @click="saveBtn">存储到本地</button>
  </div>
</template>
 
 
 
 <script setup>
import { onMounted, ref, onBeforeMount } from "vue";
import { storeToRefs } from "pinia"; //引入pinia转换

import homeInfoStore from "../store/home";
const homeInfo = homeInfoStore();

// const { username, age, like, hobby } = homeInfo //直接结构赋值  不是响应式
// const { username ,age, like, hobby } = toRefs(homeInfo) // 响应式
const { username, age, like, hobby } = storeToRefs(homeInfo); // 响应式

defineProps({
  name: String,
});
onBeforeMount(() => {
  homeInfo.getRemoteUser("999");
});
onMounted(() => {});

// 一个一个修改
const editPiniaHandler = () => {
  homeInfo.username += "嘎";
  homeInfo.age += 1;
  homeInfo.like = "boy";
};
//使用$patch方法  以对象的形式一次性修改
const editAll = () => {
  homeInfo.$patch({
    username: "鸭蛋",
    age: 21,
  });
};
// $state  替换 state 为新对象
const replaceAll = () => {
  homeInfo.$state = {
    name: "狗子",
    age: "22",
    like: "boy",
    obj: { money: 10, friend: 1 },
  };
};
// 重置state,这里需要提取本地数据,本地没有数据才直接调用这个方法
const resetBtn = () => {
  homeInfo.$reset();
};
const saveBtn = () => {
  homeInfo.savePersistedState();
};
</script>
 
 
 <style>
</style>