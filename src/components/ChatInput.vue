<script setup>
import { ref, watch, inject } from 'vue'
import MyIcon from './MyIcon.vue'
import { inst, baseUrl } from '@/utils.js'
import { useChatStateStore, useThreadStateStore } from '@/stores/state'
import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia'
import ButtonLoader from './ButtonLoader.vue'
const text = ref('')
const file = ref(null)
const imageURL = ref('')
const upload = ref(false)
const error = ref('')
const fileInput = ref(null)
const isSubmitting = ref(false)
const emit = defineEmits(['newChat', 'postSuccess', 'tokenLimit'])
const { setNewChat } = useChatStateStore()
const threadState = useThreadStateStore()
const { setCurrentThread } = threadState
const { currentThread } = storeToRefs(threadState)
const isStreaming = inject('isStreaming')

const upload_file = () => {
  upload.value = !upload.value
}
const handleFileChange = (e) => {
  file.value = e.target.files[0]
  if (file.value && file.value.type.startsWith('image/')) {
    imageURL.value = URL.createObjectURL(file.value)
  } else {
    file.value = null
    imageURL.value = ''
  }
}

const triggerFilePicker = () => {
  fileInput.value.click()
}
watch(isStreaming, (newValue) => {
  isSubmitting.value = newValue
})
const handleFileDrop = (e) => {
  e.preventDefault()
  file.value = e.dataTransfer.files[0]
  if (file.value && file.value.type.startsWith('image/')) {
    imageURL.value = URL.createObjectURL(file.value)
  } else {
    file.value = null
    imageURL.value = ''
  }
}

const clearImageInput = () => {
  file.value = null
  imageURL.value = ''
}

const handleSubmit = async () => {
  let hasThread = false
  isSubmitting.value = true
  upload.value = false
  const threadId = currentThread.value
  if (!text.value) {
    error.value =
      !text.value && file.value
        ? 'For this version you have to send an image with a text query'
        : ''
  } else {
    const formData = new FormData()
    formData.append('query', text.value)
    if (file.value !== null) formData.append('image', file.value)
    try {
      if (threadId) {
        formData.append('thread_id', threadId)
        hasThread = true
      }
      const newChatData = {
        content: text.value,
        id: uuidv4(),
        chat_type: 'QUERY',
        media: [{type: 'IMAGE', url: imageURL.value }]
      }
      emit('newChat', newChatData)
      text.value = ''
      file.value = null
      imageURL.value = ''
      const res = await inst(true).post(`${baseUrl}/chat/`, formData)
      setNewChat(res.data.chat)
      if (!hasThread) {
        setCurrentThread(res.data.chat.thread_id)
      }
      emit('postSuccess')
    } catch (err) {
      if (err.response && err.response.status === 400) {
        emit('tokenLimit', "You have reached your maximum amount of tokens. Please open a new thread")
      }
      console.error(err)
    }
    text.value = ''
    file.value = null
    imageURL.value = ''
    error.value = ''
  }
  isSubmitting.value = false
}
</script>

<template>
  <div class="input-block">
    <form @submit.prevent="handleSubmit">
      <div v-if="upload" class="file-display">
        <div class="background-text" v-if="!imageURL">
          Drag and drop your pictures or click here to upload your images
        </div>
        <img :src="imageURL" @click="triggerFilePicker" @dragover.prevent @drop="handleFileDrop" />
        <label class="file-input">
          <input
            class="file"
            type="file"
            accept="image/*"
            @change="handleFileChange"
            ref="fileInput"
          />
        </label>
        <span class="close" @click="clearImageInput">&times;</span>
      </div>
      <div class="input-field">
        <MyIcon name="upload_file" class="upl" @click="upload_file" />
        <input class="text" type="text" v-model="text" placeholder="Type a message" rows="5" />
        <button type="submit" class="form-btn" :disabled="isSubmitting">
          <ButtonLoader v-if="isSubmitting" />
          <MyIcon name="publish" v-else />
        </button>
      </div>
    </form>
    <p class="error" v-if="error">{{ error }}</p>
    <p class="warn">Once in a while we cook up some trash. Please verify all info provided</p>
  </div>
</template>
<style scoped>
.input-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-background);
  justify-content: center;
  max-width: 700px;
  width: 100%;
  padding: 0 20px 20px;
  position: fixed;
  bottom: 0px;
  width: calc(100vw - 280px);
}

.warn {
  font-size: 12px;
  color: #e99e3d;
  margin-top: 5px;
  text-align: center;
  font-weight: 500;
}

form {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  width: 100%;
  background-color: transparent;
  border-radius: 12px;
  /* border: 1px solid red; */
  justify-content: flex-start;
}

.file-display {
  width: 250px;
  height: 300px;
  position: relative;
  border: 2px solid #e99e3d;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  background-color: var(--color-background);
  border-bottom: none;
  z-index: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
}

.background-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #999;
  margin-left: 10px;
  font-size: 16px;
  pointer-events: none;
}

.file-display .close {
  position: static;
}

.file-display img {
  width: calc(100% - 20px);
  height: calc(100% - 50px);
  /* border: 1px solid red; */
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #ccc;
  border-bottom: none;
  margin: 10px;
  margin-bottom: 0px;
  object-fit: contain;
}

.file-input {
  /* border: 1px solid red; */
  cursor: pointer;
}

.file-input input {
  display: none;
}

.input-field {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #e99e3d;
  border-radius: 12px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: var(--input);
  padding: 0 8px;
  align-items: center;
  margin-top: 0px;
}
.error {
  color: red;
  font-size: 12px;
}
.text {
  font-family: 'IBM Plex Sans';
  outline: none;
  border: none;
  /* border: 1px solid green; */
  font-size: 14px;
  padding: 5px 0;
  height: 50px;
  margin-right: 30px;
  flex-grow: 1;
  resize: vertical;
  background-color: var(--input);
  color: var(--color-text);
  overflow: auto;
}

input.text::placeholder {
  color: #ccc;
}

button {
  border-radius: 8px;
  width: 38px;
  height: 38px;
  text-align: center;
  background-color: #e99e3d;
  color: var(--color-text);
}

button[disabled] {
  color: #e99e3d;
  background-color: transparent;
}

button span {
  color: inherit;
}

.upl {
  font-size: 35px;
  color: #e99e3d;
}

@media screen and (max-width: 768px) {
  .input-block {
    width: 100%;
    z-index: 1;
  }
}
</style>
