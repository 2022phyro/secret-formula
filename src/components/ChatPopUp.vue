<script setup>
import { ref, computed } from 'vue';
import ButtonLoader from './ButtonLoader.vue';
const isLoading = ref(false);
const emit = defineEmits(['closePopUp'])

const props = defineProps({
    visible: Boolean,
    type: String,
    decision: Boolean,
    callback: Function,
    args: Array
})
const visile = computed(() => props.visible);
const dsn = computed(() =>{
    console.log("ds", props.decision)
    return props.decision;
});
const close = () => {
    emit('closePopUp');
}
const closeAndCallback = () => {
    isLoading.value = true;
    if (props.callback) {
        props.callback(...props.args);
    }
    setTimeout(() => {
        emit('closePopUp');
    }, 2000);
    isLoading.value = false;
}
const allMessages = {
    logout: "Are you sure you want to logout",
    deleteAcc: "Are you sure you want to delete your account? Note this action is irreversible",
    newThr: "Enter the name of the new thread let's get cooking",
    editThr: "Change thread name",
    deleteThr: "Are you sure you want to delete this thread? Note this action is irreversible",
}
</script>
<template>
    <div class="parent" v-if="visile">
        <div class="content">
            <span class="close" @click="close">&times;</span>
            <p>{{ allMessages[props.type] }}</p>
            <div class="buttons" v-if="dsn">
                <button @click="close">
                    Cancel</button>
                <button @click="closeAndCallback">
                    <ButtonLoader v-if="isLoading"/>
                    <span v-else>Logout</span>
                </button>
            </div>
            <input v-else>
        </div>
    </div>
</template>
<style scoped>
.parent {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    z-index: 10000;
    background: rgb(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
}
.content {
    position: relative;
    background: white;
    min-width: 270px;
    max-width: 340px;
    margin: 0 10px;
    padding: 20px;
    padding-top: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.buttons {
    margin-top: 20px;
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
}
.close {
    font-size: 30px;
    position: absolute;
    right: 20px;
    top: 0;
    font-weight: 800;
    cursor: pointer;
    color:#e99e3d;
  
  }
  .close:hover, .close:active {
  color: red;
  }
  input {
    width: 100%;
    height: 35px;
    font-family: 'Space Grotesk';
    border-radius: 12px;
    padding: 0 5px;
    outline: none;
    border: 1px solid #ccc;
  }
  input:focus {

    border: 1px solid #e99e3d;
  }
</style>
