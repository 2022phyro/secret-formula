<script setup>
import { lget, lset } from '@/utils'
import { ref, watch } from 'vue'
const isDarkMode = ref(lget('theme') === 'dark')

watch(
  isDarkMode,
  (newVal) => {
    document.documentElement.setAttribute('data-scheme', newVal ? 'dark' : 'light')
    lset('theme', newVal ? 'dark' : 'light')
  },
  { immediate: true }
)
</script>
<template>
  <div>
    <input type="checkbox" id="checkboxInput" v-model="isDarkMode" />
    <label for="checkboxInput" class="toggleSwitch"> </label>
  </div>
</template>
<style scoped>
/* To hide the checkbox */
#checkboxInput {
  display: none;
}

.toggleSwitch {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 50px;
  height: 30px;
  background-color: rgb(245, 223, 129);
  border-radius: 20px;
  cursor: pointer;
  transition-duration: 0.2s;
}

.toggleSwitch::after {
  content: '';
  position: absolute;
  height: 22px;
  width: 22px;
  left: 5px;
  background-color: transparent;
  border-radius: 50%;
  transition-duration: 0.2s;
  box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
  border: 3px solid #3d3a36;
}

#checkboxInput:checked + .toggleSwitch::after {
  transform: translateX(calc(100% - 5px));
  transition-duration: 0.2s;
  background-color: #3d3a36;
  border: 3px solid white;
  box-shadow: 7px 2px 5px rgba(255, 255, 255, 0.26);
}
/* Switch background change */
#checkboxInput:checked + .toggleSwitch {
  background-color: var(--color-background);
  transition-duration: 0.2s;
}
</style>
