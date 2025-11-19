<template>
  <div
    class="flex flex-col items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
  >
    <h1 class="text-5xl font-bold mb-4">Welcome to the SPA Mode</h1>
    <p class="text-xl mb-8">
      This page uses the BlankLayout (No Header, No Sidebar)
    </p>
    <router-link
      to="/"
      class="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
    >
      Go to Dashboard
    </router-link>
  </div>
</template>

<script setup></script>
