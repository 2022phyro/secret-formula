<script setup>
import { ref, computed } from 'vue'
import ButtonLoader from './ButtonLoader.vue'
import MyIcon from './MyIcon.vue'
const isLoading = ref(false)
const emit = defineEmits(['closePopUp', 'pFormSuccess', 'nFormSuccess', 'dFormSuccess'])

const props = defineProps({
  visible: Boolean,
  type: String,
  decision: Boolean,
  callback: Function,
  formDefault: String,
  args: Array
})
const thread = ref(props.formDefault ? props.formDefault : '')

const visile = computed(() => props.visible)
const dsn = computed(() => props.decision)
const close = () => {
  emit('closePopUp')
}
const closeAndCallback = async () => {
  isLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (props.callback) {
      props.callback(...props.args)
    }
  } finally {
    isLoading.value = false
    emit('closePopUp')
  }
}
const closeFormAndCallback = async () => {
  if (thread.value === '') {
    return
  }
  isLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (props.callback) {
      const body = {
        title: thread.value
      }
    const res = await props.callback(body, ...props.args)
      switch (props.type) {
        case 'newThr': {
          emit('nFormSuccess', res.data)
          break}
        case 'editThr': {
          emit('pFormSuccess', thread.value)
          break;}
      }
    }
  } catch (err) {
    console.error(err)
  } finally {
    thread.value = ''
    isLoading.value = false
    emit('closePopUp')
  }
}
const allMessages = {
  logout: 'Are you sure you want to logout',
  deleteAcc: 'Are you sure you want to delete your account? Note this action is irreversible',
  newThr: "Enter the name of the new thread let's get cooking",
  editThr: 'Change thread name',
  deleteThr: 'Are you sure you want to delete this thread? Note this action is irreversible'
}
const danger = computed(() => {
  return props.type === 'deleteAcc' || props.type === 'deleteThr'
})
</script>
<template>
  <div class="parent" v-if="visile" :disabled="isLoading">
    <div class="content">
      <span class="close" @click="close" v-if="!isLoading">&times;</span>
      <p>{{ allMessages[props.type] }}</p>
      <div class="buttons" v-if="dsn">
        <button class="btn" @click="close" :disabled="isLoading">Cancel</button>
        <button
          class="btn"
          @click="closeAndCallback"
          :class="[danger ? 'danger' : '']"
          :disabled="isLoading"
        >
          <ButtonLoader v-if="isLoading" />
          <span v-else>{{ danger ? 'Delete' : 'Logout' }}</span>
        </button>
      </div>
      <form v-else @submit.prevent="closeFormAndCallback">
        <input name="newThread" v-model="thread" />
        <button type="submit" class="form-btn">
          <MyIcon name="send" />
        </button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.parent {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  z-index: 10000;
  background: rgb(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  position: relative;
  background: white;
  min-width: 270px;
  max-width: 340px;
  margin: 0 10px;
  padding: 20px;
  padding-top: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.buttons {
  margin-top: 20px;
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
}
.close {
  font-size: 30px;
  position: absolute;
  right: 20px;
  top: 0;
  font-weight: 800;
  cursor: pointer;
  color: #e99e3d;
}
.close:hover,
.close:active {
  color: red;
}

button.danger {
  box-shadow:
    1px 1px 0px 0px,
    1px 1px 0px 0px,
    1px 1px 0px 0px,
    1px 1px 0px 0px,
    2px 2px 0px 0px #f00;
  color: red;
  border-color: red;
}
button.danger:hover {
  color: white;
  background-color: red;
}
button[disabled] {
  cursor: not-allowed;
  opacity: 0.8;
}
button[disabled]:hover,
button[disabled]:active {
  color: #e99e3d;
  background: white;
  top: auto;
  left: auto;
  box-shadow:
    1px 1px 0px 0px,
    1px 1px 0px 0px,
    1px 1px 0px 0px,
    1px 1px 0px 0px,
    3px 3px 0px 0px;
}
button.danger[disabled]:hover,
button.danger[disabled]:active {
  color: red;
  background: white;
}
form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  border-radius: 5px;
}

input {
  width: 100%;
  height: 35px;
  font-family: 'Space Grotesk';
  font-size: 16px;
  border-radius: 12px;
  padding: 0 35px 0 10px;
  outline: none;
  border: 1px solid #ccc;
}
input:focus {
  border: 1px solid #e99e3d;
}
/* form button {
    width: 24px;
    height: 24px;
    padding: 0;
    font-size: 24px;
    line-height: 1;
    border: none;
    color:#e99e3d;
    background: none;
    outline: none;
    margin: 0;
    margin-left: -1.2em;
}
form button > span {
    color: #e99e3d;
} */
</style>
