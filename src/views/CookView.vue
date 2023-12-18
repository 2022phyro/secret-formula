<script setup>
import SideMenu from '@/components/SideMenu.vue';
import ChatLayout from '@/components/ChatLayout.vue';
import ChatPopUp from '@/components/ChatPopUp.vue';
import { ref } from 'vue';
const visible = ref(false);
const pType = ref('');
const pDecision = ref(false);
const popUp = (name ) => {
    if (name == 'logout') {
        pDecision.value = true;
        visible.value = true;
        pType.value = 'logout';
    }
}
const cPopUp = () => {
    visible.value = false;
    pType.value = '';
}
</script>
<template>
<div class="cook-view">
    <SideMenu @openPopup="popUp"/>
    <ChatLayout/>
    <ChatPopUp  :visible="visible" :type="pType" :decision="pDecision"
    @closePopUp="cPopUp"/>

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
