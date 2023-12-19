<script setup>
import MyIcon from './MyIcon.vue'
import { ref, computed } from 'vue'
const emit = defineEmits(['openPopUp'])

const showButtons = ref(false)

const editFAB = () => {
  showButtons.value = false
  emit('openPopUp', 'editThread', 'How to make a perfect stew')
}

const deleteFAB = () => {
  showButtons.value = false
  emit('openPopUp', 'deleteThread')
}

const style = computed(() => {
  return {
    width: showButtons.value ? '150px' : '30px',
    height: showButtons.value ? '100px' : '30px'
  }
})
</script>
<template>
  <div class="chatControl" :style="style">
    <MyIcon name="more_vert" @click="showButtons = !showButtons" />
    <transition name="fade">
      <ul v-if="showButtons">
        <li @click="editFAB">
          <MyIcon name="stylus" />
          <span>Edit name</span>
        </li>
        <li @click="deleteFAB">
          <MyIcon name="delete" />
          <span>Delete</span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<style scoped>
.chatControl {
  width: fit-content;
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  transition:
    width 0.5s ease,
    height 0.5s ease;
}
.chatControl li {
  width: 130px;
  display: flex;
  align-items: center;
  background: white;
  color: black;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  flex-flow: row;
  border: 2px solid #ee9e3d;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  transition: all 0.5s ease;
  cursor: pointer;
}
.chatControl li:last-child {
  margin-top: 7px;
}

li span:first-child {
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  width: 40px;
  height: 40px;
  border-right: 2px solid #ee9e3d;
  text-align: center;
  line-height: 40px;
}

li span:last-child {
  font-weight: 600;
  font-size: 13px;
  padding: 5px 10px;
  line-height: 30px;
  width: 90px;
  height: 40px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
li:hover {
  background: rgba(233, 158, 61, 0.5);
  backdrop-filter: blur(5px);
}
[role='button'] {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}
</style>
