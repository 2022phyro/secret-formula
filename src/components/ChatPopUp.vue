<script setup>
import { ref, computed } from 'vue';
const emit = defineEmits(['closePopUp'])

const props = defineProps({
    visible: Boolean,
    type: String,
    decison: Boolean,
    callback: Function
})
const visile = computed(() => props.visible);
const dsn = computed(() => props.decison);
const close = () => {
    emit('closePopUp');
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
            <span class="close" @click="close">&times</span>
            <p>{{ allMessages[props.type] }}</p>
            <div class="buttons" v-if="dsn == false">
                <button @click="close" >Cancel</button>
                <button @click="close">Logout</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.parent {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    z-index: 100;
    background: rgb(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
}
.content {
    position: relative;
    background: white;
    width: 270px;
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
</style>
