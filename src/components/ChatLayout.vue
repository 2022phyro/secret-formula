<script setup>
// import MyIcon from './MyIcon.vue';
import ChatInput from './ChatInput.vue'
import AIReply from './AIReply.vue'
import UserRequest from './UserRequest.vue'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { inst, baseUrl, lget } from '@/utils'
import { useChatStateStore } from '@/stores/state'
import { storeToRefs } from 'pinia'
const testData = ref([])
const errorThread = ref('')
let chatLayout = ref(null)

function scrollToBottom() {
  const el = document.getElementById('myDiv')
  // if (el) {
  //   el.scrollIntoView({ behavior: 'smooth', block: 'end' });
  // }
  el.scrollIntoView({ behavior: 'smooth', block: 'end' })
}
const filteredTestData = () => {
  return testData.value.filter((item) => item.content)
}
const route = useRoute()
onMounted(() => {
  const id = route.params.id
  if (!id) {
    return
  }
  inst(true)
    .get(`${baseUrl}/chat/all?thread_id=${id}`)
    .then(({ data }) => {
      testData.value = data.chats
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
})
watch(route, () => {
  const id = route.params.id
  inst(true)
    .get(`${baseUrl}/chat/all?thread_id=${id}`)
    .then(({ data }) => {
      testData.value = data.chats
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
})
const chatStore = useChatStateStore()
const { newChat } = storeToRefs(chatStore)
const reply = ref('')
const { chat_id, chat_type } = newChat.value
const newChatCallBack = (data) => {
  testData.value.push(data)
  streamData()
}

const streamData = async () => {
  const chat_id = newChat.value.id
  console.log(chat_id)
  try {
    const response = await fetch(`${baseUrl}/chat/stream/${chat_id}`, {
      headers: {
        Authorization: `Bearer ${lget('token')}`,
        'Content-Type': 'application/octet-stream'
      }
    })

    if (!response.ok) {
      console.log(response)
      errorThread.value = 'Something went wrong please try again or start a new conversation'
      return
    }
    const reader = response.body.getReader()

    reader.read().then(function processText({ done, value }) {
      if (done) {
        console.log('----------------\nStream complete')
        return
      }

      // Convert the Uint8Array to a string and add it to testData
      const text = new TextDecoder('utf-8').decode(value)
      console.log(text)
      setTimeout(() => {}, 2000)
      const item = testData.value.find((item) => item.id == chat_id)
      if (item) {
        item.content += text
      } else {
        testData.value.push({ id: chat_id, content: text, chat_type: 'RESPONSE', image: '' })
      }
      return reader.read().then(processText)
    })
  } catch (err) {
    console.log(err)
    return
  }
}
</script>
<template>
  <section class="chat-layer">
    <!--Implement infinte scrolling, also the list will have it's own component for rendering
        my messages and the ai's replies-->
    <ul class="chat-body" id="myDiv">
      <li v-for="item in filteredTestData()" :key="item.id">
        <component :is="item.chat_type == 'QUERY' ? UserRequest : AIReply" v-bind="item" />
      </li>
      <p class="error">{{ errorThread }}</p>
    </ul>
    <ChatInput @newChat="newChatCallBack" />
  </section>
</template>
<style scoped>
.chat-layer {
  height: calc(100vh - 60px - 100px);
  position: absolute;
  /* border: 1px solid red; */
  bottom: 0;
  right: 0;
  top: 60px;
  width: calc(100vw - 280px);
  display: flex;
  align-self: stretch;
  flex-flow: column;
  align-items: center;
  padding: 0 30px;
  overflow: auto;
}
.chat-body {
  max-width: 700px;
  padding: 0;
  width: 100%;
  /* background: greenyellow; */
}
.chat-body li {
  list-style: none;
  padding: 20px;
  width: 100%;
  /* background: red; */
}
.error {
  color: grey;
  text-align: center;
}
@media screen and (max-width: 768px) {
  .chat-layer {
    height: calc(100vh - 50px - 100px);
    width: 100%;
    padding: 0;
    top: 50px;
  }
}
</style>
