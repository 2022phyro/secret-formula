<script setup>
// import MyIcon from './MyIcon.vue';
import ChatInput from './ChatInput.vue'
import AIReply from './AIReply.vue'
import UserRequest from './UserRequest.vue'
import { onMounted, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { inst, baseUrl, lget } from '@/utils'
import { useChatStateStore, useThreadStateStore } from '@/stores/state'
import { storeToRefs } from 'pinia'
const testData = ref([])
const errorThread = ref('')
const isStreaming = ref(false)
let chatContainer = ref(null)
const isLoaded = ref(false)
provide('isStreaming', isStreaming)
const { setCurrentThread } = useThreadStateStore()

const scrollToBottom = () => {
  if (chatContainer.value && filteredTestData().length > 0) {
    setTimeout(() => {
      const specificElement = document.getElementById('myDiv')?.lastElementChild
      if (specificElement) {
        specificElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 0)
  }
}
const filteredTestData = () => {
  return testData.value.filter((item) => item.content)
}
watch(testData, () => {
  scrollToBottom()
})
watch(
  () => testData.value[testData.value.length - 1]?.content,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      scrollToBottom()
    }
  }
);
watch(isStreaming, (newValue) => {
  if (!newValue) scrollToBottom()
})
const route = useRoute()
onMounted(() => {
  const id = route.params.id
  if (!id) {
    setCurrentThread('')
    return
  }
  setCurrentThread(id)
  isLoaded.value = true
  inst(true)
    .get(`${baseUrl}/chat/all?thread_id=${id}`)
    .then(({ data }) => {
      testData.value = data.chats
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      isLoaded.value = false
    })
})
watch(route, () => {
  const id = route.params.id
  errorThread.value = ''
  if (!id) {
    setCurrentThread('')
    return
  }
  setCurrentThread(id)
  inst(true)
    .get(`${baseUrl}/chat/all?thread_id=${id}`)
    .then(({ data }) => {
      testData.value = data.chats
    })
    .catch((err) => {
      console.error(err)
    })
})
const chatStore = useChatStateStore()
const { newChat } = storeToRefs(chatStore)
const newChatCallBack = (data) => {
  testData.value.push(data)
  scrollToBottom()
}
const streamCallBack = () => {
  streamData()
}
const tokenLimitCallback = (errorMessage) => {
  errorThread.value = errorMessage
}
const streamData = async () => {
  isStreaming.value = true
  const chat_id = newChat.value.id
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
        return
      }

      // Convert the Uint8Array to a string and add it to testData
      const text = new TextDecoder('utf-8').decode(value)
        const item = testData.value.find((item) => item.id == chat_id)
        if (item) {
          item.content += text
        } else {
          testData.value.push({ id: chat_id, content: text, chat_type: 'RESPONSE', media: [] })
        }

      return reader.read().then(processText)
    })
  } catch (err) {
    console.error(err)
    return
  } finally {
    isStreaming.value = false
  }
}

</script>
<template>
  <section class="chat-layer" ref="chatContainer">
    <div class="empty-chat" v-if="filteredTestData().length === 0 && isLoaded === false">
      <img src="/logo.png" alt="logo" class="logo" />
      <p>Start chatting. What would you like to know?</p>
    </div>
    <ul class="chat-body" id="myDiv" v-else>
      <li v-for="item in filteredTestData()" :key="item.id">
        <component :is="item.chat_type == 'QUERY' ? UserRequest : AIReply" v-bind="item" />
      </li>
      <li class="error">{{ errorThread }}</li>
    </ul>
    <ChatInput @newChat="newChatCallBack" @postSuccess="streamCallBack" @tokenLimit="tokenLimitCallback" />
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
  overflow-y: scroll;
}

.empty-chat {
  margin: auto;
  padding: 30px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.empty-chat img {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
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
