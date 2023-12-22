<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router'
const isDarkMode = ref(localStorage.getItem('theme') === 'dark')

onMounted(() => {
  document.documentElement.setAttribute('data-scheme', isDarkMode.value ? 'dark' : 'light')
})
</script>
<template>
  <RouterView />
</template>

<style scoped></style>
