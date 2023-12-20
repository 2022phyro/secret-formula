import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useThreadStateStore = defineStore("threadState", () => {
    const editThread = ref('')
    const newThread = ref({})
    

    function setEditThread(thread) {
        editThread.value = thread;
    }
    function setNewThread(thread) {
        newThread.value = thread;
    }
    return { editThread, newThread, setEditThread, setNewThread};
});