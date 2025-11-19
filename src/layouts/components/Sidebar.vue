<template>
  <el-menu
    :default-active="activeMenu"
    class="h-full border-r border-gray-200"
    background-color="#ffffff"
    text-color="#374151"
    active-text-color="#1a73e8"
    router
  >
    <el-menu-item index="/">
      <el-icon><HomeFilled /></el-icon>
      <span>Home</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <el-icon><InfoFilled /></el-icon>
      <span>About</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { HomeFilled, InfoFilled } from "@element-plus/icons-vue";

const route = useRoute();
const activeMenu = computed(() => route.path);
</script>

<style scoped lang="css">
:deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
}
</style>
