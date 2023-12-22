import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const useThreadStateStore = defineStore('threadState', () => {
  const editThread = ref('')
  const newThread = ref({})
  const deleteThread = ref(false)
  const currentThread = ref('')

  function setEditThread(thread) {
    editThread.value = thread
  }
  function setNewThread(thread) {
    newThread.value = thread
  }
  function setDeleteThread(thread) {
    deleteThread.value = thread
  }
  function setCurrentThread(thread) {
    currentThread.value = thread
  }
  return {
    currentThread,
    deleteThread,
    editThread,
    newThread,
    setEditThread,
    setNewThread,
    setDeleteThread,
    setCurrentThread
  }
})

const useChatStateStore = defineStore('chatState', () => {
  const newChat = ref({})

  function setNewChat(chat) {
    newChat.value = chat
  }
  return { newChat, setNewChat }
})

const useAuthStateStore = defineStore('authState', () => {
  const auth = ref(false)
  const token = ref('')
  const redirect = ref('')

  function setAuth(auth) {
    auth.value = auth
  }
  function setToken(token) {
    token.value = token
  }
  function setRedirect(redirect) {
    redirect.value = redirect
  }
  return { auth, token, redirect, setAuth, setToken, setRedirect }
})
export { useThreadStateStore, useChatStateStore, useAuthStateStore }
