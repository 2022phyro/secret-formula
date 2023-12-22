<script setup>
import MyIcon from './MyIcon.vue'
import ButtonLoader from './ButtonLoader.vue'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { inst, baseUrl, lget } from '@/utils.js'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useThreadStateStore } from '@/stores/state'

const threadState = useThreadStateStore()
const { deleteThread, newThread, editThread } = storeToRefs(threadState)
const { setDeleteThread, setEditThread, setNewThread } = threadState

const router = useRouter()
const route = useRoute()
const menu = ref(false)
const active = ref(10)
const allThread = ref([])
const emit = defineEmits(['openPopup', 'changeThread'])
const settings = ref('Settings')
const fabOpen = ref(false)
const isLoaded = ref(false)
const errorLoading = ref('')
settings.value = lget('user')?.firstName || 'Settings'
const closeFab = () => {
  fabOpen.value = false
}

onMounted(() => {
  window.addEventListener('click', closeFab)
})

onMounted(() => {
  isLoaded.value = true
  const id = route.params.id
  if (id) {
    active.value = id
  }
  inst(true)
    .get(`${baseUrl}/chat/threads`)
    .then((res) => {
      allThread.value = res.data.threads
      errorLoading.value = ''
    })
    .catch((err) => {
      if (err) {
        console.log(err.response)
        errorLoading.value = 'Something went wrong. Reload your screen to try again'
      }
    })
    .finally(() => {
      isLoaded.value = false
    })
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeFab)
})
watch(editThread, () => {
  if (editThread.value) {
    const id = route.params.id
    const thread = allThread.value.find((thread) => thread.id === id)
    if (thread) {
      thread.title = editThread.value
    }
    setEditThread('')
  }
})
watch(deleteThread, () => {
  if (deleteThread.value) {
    const id = route.params.id
    const thread = allThread.value.find((thread) => thread.id === id)
    if (thread) {
      allThread.value.splice(allThread.value.indexOf(thread), 1)
      setDeleteThread(false)
      router.push('/cook')
    }
  }
})
watch(newThread, () => {
  if (newThread.value && Object.keys(newThread.value).length > 0) {
    allThread.value.unshift(newThread.value)
    router.push(`/cook/${newThread.value.id}`)
    active.value = newThread.value.id
    router.push(`/cook/${newThread.value.id}`)
    setNewThread({})
  }
})

const selectThread = (id) => {
  active.value = id
  emit('changeThread', id)
  router.push(`/cook/${id}`)
  menu.value = !menu.value
}

const logout = () => {
  menu.value = !menu.value
  emit('openPopup', 'logout')
}
// Disabled for the meantime
// const deleteA = () => {
//   emit('openPopup', 'deleteAcc')
// }
const toggleMenu = () => {
  menu.value = !menu.value
}
</script>
<template>
  <div :class="['side-menu', menu ? 'show' : '']">
    <div :class="['s-m-header', menu ? 'show' : '']">
      <img class="logo" src="/logo.png" alt="logo" />
      <MyIcon @click="toggleMenu" :name="menu ? 'menu_open' : 'list'" class="menu-icon" />
    </div>
    <!--Implement infinte scrolling, also the list will have it's own component for rendering
        the threads and deleting them-->
    <ul class="threads" @delThread="deleteThread">
      <ButtonLoader class="loading" v-if="isLoaded" />
      <p class="error" v-else-if="errorLoading" v-html="errorLoading"></p>
      <li
        v-else
        v-for="thread in allThread"
        :key="thread.id"
        :class="['thread', thread.id == active ? 'active' : '']"
        @click="selectThread(thread.id)"
      >
        {{ thread.title }}
      </li>
    </ul>
    <div class="settings">
      <div :class="['opener', fabOpen ? 'active' : '']" @click.stop="fabOpen = !fabOpen">
        <MyIcon name="settings" />
        {{ settings }}
      </div>
      <ul v-show="fabOpen" @click.stop>
        <li @click="logout"><MyIcon name="logout" />Log out</li>
        <!-- <li @click="deleteA">
          <MyIcon name="delete" />Delete Account
        </li> -->
      </ul>
    </div>
  </div>
  <div :class="['close-menu', menu ? 'show' : '']" @click="toggleMenu"></div>
</template>

<style scoped>
.loading {
  align-self: center;
}
.error {
  color: grey;
  text-align: center;
  padding: 20px;
}
.close-menu {
  position: fixed;
  top: 0;
  right: 100vw;
  width: calc(100vw - 280px);
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3px);
  align-self: stretch;
  transition: right 0.4s ease-in-out;
}

.side-menu {
  position: fixed;
  height: 100%;
  top: 0px;
  width: 280px;
  left: -280px;
  background-color: #f5cf9d;
  padding: 0;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  z-index: 1000;
  align-content: flex-start;
  overflow-x: visible;
  transition: left 0.4s ease-in-out;
}

.s-m-header {
  height: 50px;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  position: fixed;
  left: -280px;
  padding-left: 10px;
  top: auto;
  width: 330px;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  align-items: center;
  /* border: 1px solid red; */
  transition:
    left 0.4s ease-in-out,
    width 0.4s ease-in-out;
}

.add {
  position: absolute;
  right: 10px;
}

.side-menu.show,
.s-m-header.show {
  left: 0;
  z-index: 1000;
}

.close-menu.show {
  right: 0;
  left: auto;
  z-index: 999;
}

.s-m-header.show {
  z-index: 1001;
}

.threads {
  list-style-type: none;
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin-top: 55px;
  width: 100%;
  height: calc(100% - 200px);
  /* border: 1px solid blue; */
  overflow: auto;
  padding: 0;

  -ms-overflow-style: none;
}

.threads::-webkit-scrollbar {
  display: none;
}

.threads li {
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  flex-shrink: 0;
  overflow: hidden;
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
  font-weight: 300;
  text-overflow: ellipsis;
}

.threads li:hover,
.opener:hover {
  background-color: #f3c486;
}

.threads li.active {
  font-weight: 600;
  border-bottom: 3px solid rgba(0, 0, 0, 0.2);
  position: sticky;
  background-color: #f3c486;
  top: 0;
  bottom: 0;
}

.opener.active {
  background-color: #f3c486;
  border-bottom: 3px solid rgba(0, 0, 0, 0.2);
  font-weight: 600;
  border-radius: 8px;
}

.opener {
  padding: 5px 10px;
  line-height: 1;
  display: flex;
  flex-flow: row;
  font-size: 14px;
  gap: 5px;
  align-items: center;
  vertical-align: center;
  cursor: pointer;
}

.settings ul {
  list-style-type: none;
  border: 1px solid #e99e3d;
  border-top: none;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 0;
  margin-left: 40px;
  margin-right: 7px;
}

.settings ul li {
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  font-size: 14px;
  gap: 5px;
  margin: 0;
  padding: 7px 10px;
  cursor: pointer;
  font-weight: 300;
}

.settings ul li:hover {
  border-radius: 8px;
  background: #e99e3d;
}

@media screen and (min-width: 769px) {
  .s-m-header {
    height: 60px;
    background-color: #f5cf9d;
    justify-content: flex-start;
    left: 0;
    width: 280px;
    z-index: 1;
  }

  .side-menu {
    left: 0;
    position: relative;
    width: 280px;
    height: 100vh;
    z-index: 0;
  }

  .close-menu {
    display: none;
  }
}
</style>
