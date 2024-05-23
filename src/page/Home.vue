<template>
  <div class="flex">
    <div class="flex-none w-14 h-14">01</div>
    <div class="flex-initial w-64 ...">02</div>
    <div class="flex-initial w-32 ...">03</div>
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