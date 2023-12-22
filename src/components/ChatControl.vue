<script setup>
import MyIcon from './MyIcon.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
const emit = defineEmits(['openPopUp', 'newThread'])

const showButtons = ref(false)

const editFAB = () => {
  showButtons.value = false
  emit('openPopUp', 'editThread', 'How to make a perfect stew')
}

const newThread = () => {
  emit('openPopUp', 'newThread')
}

const deleteFAB = () => {
  showButtons.value = false
  emit('openPopUp', 'deleteThread')
}

const closeFAB = () => {
  showButtons.value = false
}

const stopPropagation = (e) => {
  e.stopPropagation()
}

onMounted(() => {
  window.addEventListener('click', closeFAB)
})

onUnmounted(() => {
  window.removeEventListener('click', closeFAB)
})

const style = computed(() => {
  return {
    width: showButtons.value ? '150px' : 'fit-content',
    height: showButtons.value ? '100px' : '30px'
  }
})
</script>
<template>
  <div class="chatControl" :style="style">
    <div :class="['options', showButtons ? 'active' : '']" @click.stop="stopPropagation">
      <MyIcon name="library_add" @click="newThread" />
      <MyIcon :name="showButtons ? 'close' : 'more_vert'" @click="showButtons = !showButtons" />
    </div>
    <transition name="fade">
      <ul v-if="showButtons" @click.stop="stopPropagation">
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
  top: 10px;
  right: 10px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  transition:
    width 0.5s ease,
    height 0.5s ease;
}
.chatControl .options {
  display: flex;
  padding: 5px;
  align-items: center;
  color: black;
  gap: 0;
  justify-content: space-around;
  width: 130px;
  z-index: 7;
}
.chatControl .options.active {
  /* background-color: #f3c486; */
  border-bottom: 3px solid #ceab7f;
  font-weight: 600;
  border-radius: 8px;
}
.chatControl ul {
  list-style-type: none;
  border: 1px solid #e99e3d;
  background-color: var(--color-background);
  border-top: none;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 0;
  width: 120px;
  margin-right: 5px;
  margin-top: -2px;
  padding-top: 4px;
  z-index: -1;
}
.chatControl ul li {
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  font-size: 13px;
  gap: 5px;
  margin: 0;
  padding: 5px 15px;
  cursor: pointer;
  font-weight: 300;
}
.chatControl ul li:hover {
  border-radius: 10px;
  background: #e99e3d;
}

.chatControl li:last-child {
  margin-top: 7px;
}
[role='button'] {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}
@media screen and (max-width: 768px) {
  .chatControl .options {
    gap: 15px;
    justify-content: flex-end;
  }
  /* .chatControl li span:last-child {
    display: none;
  } */
}
</style>
