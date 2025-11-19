<template>
  <div
    class="flex items-center justify-between h-full px-6 bg-white border-b border-gray-200 shadow-sm"
  >
    <!-- Left: Logo -->
    <div
      class="flex items-center gap-2 cursor-pointer"
      @click="$router.push('/')"
    >
      <div
        class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg"
      >
        A
      </div>
      <h1 class="text-xl font-medium text-gray-900 tracking-tight">
        Antigravity
      </h1>
    </div>

    <!-- Center: Navigation -->
    <nav class="hidden md:flex items-center space-x-1">
      <template v-for="item in navigationItems" :key="item.id">
        <!-- Simple Link -->
        <a
          v-if="item.type === 'link'"
          :href="item.href"
          class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors rounded-full"
        >
          {{ item.label }}
        </a>

        <!-- Dropdown -->
        <div v-else-if="item.type === 'dropdown'" class="relative group">
          <button
            class="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 group-hover:text-blue-600 group-hover:bg-gray-100 transition-colors rounded-full outline-none"
          >
            {{ item.label }}
            <svg
              class="w-4 h-4 transition-transform group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <!-- Dropdown Menu -->
          <div
            class="absolute left-0 top-full pt-2 w-56 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-300 ease-out transform translate-y-1 group-hover:translate-y-0 z-50"
          >
            <div class="bg-white rounded-lg shadow-xl overflow-hidden py-2">
              <a
                v-for="subItem in item.items"
                :key="subItem.id"
                :href="subItem.href"
                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                <div class="font-medium">{{ subItem.title }}</div>
                <div class="text-xs text-gray-500 mt-0.5">
                  {{ subItem.description }}
                </div>
              </a>
            </div>
          </div>
        </div>
      </template>
    </nav>

    <!-- Right: Actions -->
    <div class="flex items-center space-x-4">
      <button
        class="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Download
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { navigationConfig } from "@/config/navigation.js";

// 导航数据
const navigationItems = ref([]);

// 组件挂载时加载导航数据
onMounted(() => {
  // 方式1: 直接使用本地配置
  navigationItems.value = navigationConfig;

  // 方式2: 如果需要从后端获取，取消下面的注释
  // fetchNavigationFromAPI().then(data => {
  //   navigationItems.value = data;
  // });
});
</script>

<style scoped>
/* Remove all borders and outlines from links and buttons */
a,
button {
  border: none !important;
  outline: none !important;
}

/* Remove focus ring */
button:focus,
button:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

/* Ensure smooth transitions */
.group:hover .group-hover\:opacity-100 {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
</style>
