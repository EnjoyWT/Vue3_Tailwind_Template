<template>
  <div class="common-layout w-full min-h-screen bg-[#f8f9fa]">
    <el-container class="min-h-screen flex flex-col">
      <el-header class="!p-0 !h-[64px] sticky top-0 z-50">
        <Header />
      </el-header>
      <el-main class="!p-0 flex-1">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
