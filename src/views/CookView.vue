<script setup>
import SideMenu from '@/components/SideMenu.vue'
import ChatLayout from '@/components/ChatLayout.vue'
import ChatPopUp from '@/components/ChatPopUp.vue'
import ChatControl from '@/components/ChatControl.vue'
import MyHeader from '@/components/MyHeader.vue'
import { inst, baseUrl } from '@/utils.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useThreadStateStore } from '@/stores/threadState'

const threadState = useThreadStateStore()
const { setNewThread, setEditThread } = threadState
const router = useRouter()
const visible = ref(false)
const pType = ref('')
const pDecision = ref(false)
const pCall = ref(null)
const pDefault = ref('')
const pArgs = ref([])
const callBackLogout = async () => {
  try {
    const res = await inst(true).post(`${baseUrl}/auth/logout`)
    console.log(res.data)
    localStorage.clear()
    router.push('/')
  } catch (err) {
    console.log(err.response.data)
    throw new Error(err)
  }
}
const callBackEditThread = async (body) => {
  try {
    const id = router.currentRoute.value.params.id
    const res = await inst(true).patch(`${baseUrl}/chat/thread/${id}`, body)
    console.log(res.data)
  } catch (err) {
    console.log(err.response.data)
    throw new Error(err)
  }
}
const patchBar = (title) => {
  console.log("War", title)
  setEditThread(title)
}
const deleteBar = () => {
}
const newBar = ( threadData) => {
  setNewThread(threadData)
}
// const
const popUp = (name, formDefault) => {
  switch (name) {
    case 'logout': {
      pDecision.value = true
      visible.value = true
      pType.value = 'logout'
      pCall.value = callBackLogout
      break;
    }
    case 'deleteAcc': {
      pDecision.value = true
      visible.value = true
      pCall.value = console.log
      pArgs.value = ['hello', 'popup']
      pType.value = 'deleteAcc'
      break
    }
    case 'newThread': {
      pDecision.value = false
      visible.value = true
      pType.value = 'newThr'
      pCall.value = console.log
      pArgs.value = ['hello', 'new thread']
      break
    }
    case 'editThread': {
      pDecision.value = false
      visible.value = true
      pType.value = 'editThr'
      pCall.value = callBackEditThread
      pArgs.value = []
      pDefault.value = formDefault
      break
    }
    case 'deleteThread': {
      pDecision.value = true
      visible.value = true
      pType.value = 'deleteThr'
      pCall.value = console.log
      pArgs.value = ['hello', 'd thread']
      break
    }
  }
}
const cPopUp = () => {
  visible.value = false
  pType.value = ''
  pDecision.value = false
  pCall.value = null
  pArgs.value = []
}
</script>
<template>
  <MyHeader />
  <div class="cook-view">
    <SideMenu @openPopup="popUp"/>
    <ChatLayout />
    <ChatControl @openPopUp="popUp" />
    <ChatPopUp
      :visible="visible"
      :type="pType"
      :decision="pDecision"
      :callback="pCall"
      :args="pArgs"
      :formDefault="pDefault"
      @closePopUp="cPopUp"
      @pFormSuccess="patchBar"
      @nFormSuccess="newBar"
      @dFormSuccess="deleteBar"
    />
  </div>
</template>
<style scoped>
.cook-view {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-start;
}
</style>
