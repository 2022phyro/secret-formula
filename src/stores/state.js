import { defineStore } from "pinia";
import { ref, computed } from "vue";

const useThreadStateStore = defineStore("threadState", () => {
    const editThread = ref('')
    const newThread = ref({})
    const deleteThread = ref(false)

    function setEditThread(thread) {
        editThread.value = thread;
    }
    function setNewThread(thread) {
        newThread.value = thread;
    }
    function setDeleteThread(thread) {
        deleteThread.value = thread;
    }
    return { deleteThread, editThread, newThread, setEditThread, setNewThread, setDeleteThread};
});

const useChatStateStore = defineStore("chatState", () => {
    const newChat = ref({})

    function setNewChat(chat) {
        newChat.value = chat;
    }
    return { newChat, setNewChat};
});

export {
    useThreadStateStore,
    useChatStateStore
}