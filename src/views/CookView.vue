<script setup>
import SideMenu from '@/components/SideMenu.vue'
import ChatLayout from '@/components/ChatLayout.vue'
import ChatPopUp from '@/components/ChatPopUp.vue'
import ChatControl from '@/components/ChatControl.vue'
import MyHeader from '@/components/MyHeader.vue'

import { ref } from 'vue'
const visible = ref(false)
const pType = ref('')
const pDecision = ref(false)
const pCall = ref(null)
const pDefault = ref('')
const pArgs = ref([])
const popUp = (name, formDefault) => {
  switch (name) {
    case 'logout': {
      pDecision.value = true
      visible.value = true
      pType.value = 'logout'
      break
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
      pCall.value = console.log
      pArgs.value = ['hello', 'edit thread']
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
  <MyHeader/>
  <div class="cook-view">
    <SideMenu @openPopup="popUp" />
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
