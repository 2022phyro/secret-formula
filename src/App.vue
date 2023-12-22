<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { lget } from './utils'

const theme = ref(lget('theme'))
onMounted(() => {
  if (theme.value) {
    document.documentElement.setAttribute('data-scheme', theme.value)
  }
})
</script>
<template>
  <RouterView />
</template>

<style scoped></style>
