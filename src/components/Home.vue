<template>
  <div class="flex flex-col">
    <div class="flex-none w-14 h-14 bg-green-500">01</div>
    <div class="flex-initial w-64 bg-blue-400">02</div>
    <div class="flex-initial w-32 bg-red-500">03</div>
  </div>
</template>
 
 
 
 <script setup>
import { onMounted, ref } from "vue";
defineProps({
  name: String,
});
onMounted(() => {});
</script>
 
 
 <style>
</style>