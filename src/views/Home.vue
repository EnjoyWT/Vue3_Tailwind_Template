<template>
  <div class="flex flex-col">
    <!-- state的使用 -->
    <div class="text-red-500 font-thin">
      我叫 {{ username }}，我今年 {{ age }} 岁啦, 喜欢 {{ like }}
    </div>
    <div>爱好有</div>
    <div v-for="item in hobby" :key="item.id">
      <div>{{ item.name }}</div>
    </div>
    <button @click="editPiniaHandler">点击修改</button>
    <button @click="editAll">点击修改全部</button>
    <button @click="replaceAll">替换所有数据</button>
    <button @click="resetBtn">重置</button>
    <button @click="saveBtn">存储到本地 (自动持久化)</button>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount } from "vue";
import { storeToRefs } from "pinia"; //引入pinia转换
import { ElMessage } from "element-plus";

import { useHomeInfoStore } from "../store/home";
const homeInfo = useHomeInfoStore();

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
  ElMessage.success("数据修改成功！");
};
// 一次性修改多个属性
const editAll = () => {
  homeInfo.username = "鸭蛋";
  homeInfo.age = 21;
  ElMessage({
    message: "批量修改完成",
    type: "success",
  });
};
// 替换所有状态为新对象
const replaceAll = () => {
  homeInfo.setUser({
    userId: "9999",
    username: "狗子",
    age: 22,
    like: "boy",
    obj: { money: 10, friend: 1 },
    hobby: [
      { id: 3, name: "游泳", level: 5 },
      { id: 4, name: "跑步", level: 8 },
    ],
  });
  ElMessage.warning("所有数据已替换");
};
// 重置state到初始值
const resetBtn = () => {
  homeInfo.setUser({
    userId: "3333",
    username: "赫赫333444",
    age: 30,
    like: "girl",
    obj: { money: 100, friend: 10 },
    hobby: [
      { id: 1, name: "篮球", level: 1 },
      { id: 2, name: "rap", level: 10 },
    ],
  });
  ElMessage.info("数据已重置到初始状态");
};
const saveBtn = () => {
  console.log("数据已自动持久化到本地存储");
  // 现在持久化是自动的，不需要手动调用
  // 可以通过浏览器开发者工具查看 localStorage 中的 'home-info-store' 键
  ElMessage({
    message: "数据已自动持久化到本地存储",
    type: "success",
    duration: 3000,
  });
};
</script>

<style></style>
