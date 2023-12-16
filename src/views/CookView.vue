<script setup>
import SideMenu from '@/components/SideMenu.vue';
import ChatLayout from '@/components/ChatLayout.vue';

</script>
<template>
<div class="cook-view">
    <SideMenu />
    <ChatLayout/>
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
