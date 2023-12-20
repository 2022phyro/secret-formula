<script setup>
import SideMenu from '@/components/SideMenu.vue'
import ChatLayout from '@/components/ChatLayout.vue'
import ChatPopUp from '@/components/ChatPopUp.vue'
import ChatControl from '@/components/ChatControl.vue'
import MyHeader from '@/components/MyHeader.vue'
import { inst, baseUrl, lset } from '@/utils.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useThreadStateStore } from '@/stores/threadState'

const threadState = useThreadStateStore()
const { setNewThread, setEditThread, setDeleteThread } = threadState
const router = useRouter()
const visible = ref(false)
const pType = ref('')
const pDecision = ref(false)
const pCall = ref(null)
const pArgs = ref([])

onMounted(() => {
  inst(true)
    .get(`${baseUrl}/auth/user`)
    .then((res) => {
      const userInfo = {
        firstName: res.data.first_name,
        email: res.data.email,
        avatar: res.data.profile_picture,
      }
      lset('user', userInfo)
    })
    .catch((err) => {
      if (err) {
        console.log(err.response)
      }
    })
  }) 
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
    return res.data
  } catch (err) {
    console.log(err.response.data)
    throw new Error(err)
  }
}
const callBackNewThread = async (body) => {
  try {
    const res = await inst(true).post(`${baseUrl}/chat/thread`, body)
    return res.data
  } catch (err) {
    console.log(err.response.data)
    throw new Error(err)
  }
}
const callBackDeleteThread = async () => {
  try {
    const id = router.currentRoute.value.params.id
    const res = await inst(true).delete(`${baseUrl}/chat/thread/${id}`)
    return res.data
  } catch (err) {
    console.log(err.response.data)
    throw new Error(err)
  }
}
const patchBar = (title) => {
  setEditThread(title)
}
const deleteBar = () => {
  setDeleteThread(true)
}
const newBar = ( threadData) => {
  setNewThread(threadData)
}
// const
const popUp = (name) => {
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
      pCall.value = callBackNewThread
      pArgs.value = []
      break
    }
    case 'editThread': {
      pDecision.value = false
      visible.value = true
      pType.value = 'editThr'
      pCall.value = callBackEditThread
      pArgs.value = []
      break
    }
    case 'deleteThread': {
      pDecision.value = true
      visible.value = true
      pType.value = 'deleteThr'
      pCall.value = callBackDeleteThread
      pArgs.value = []
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
