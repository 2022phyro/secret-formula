<script setup>
import MyIcon from './MyIcon.vue';
import ChatInput from './ChatInput.vue';
</script>
<template>
    <section class="chat-layer">
        <div class="layout-header">
            <h2>How to cook annoying egusi from scratch</h2>
            <MyIcon name="delete"/>
            <MyIcon name="edit_square"/>
        </div>
        <!--Implement infinte scrolling, also the list will have it's own component for rendering
        my messages and the ai's replies-->
        <ul>
            <li>chat items</li>
        </ul>
        <ChatInput/>
    </section>
</template>
<style scoped>
.chat-layer {
    height: calc(100vh - 70px);
    width: calc(100vw - 280px);
    border: 1px solid red;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 30px;
}
.layout-header {
}
@media screen and (max-width: 768px) {
    .chat-layer {
        width: 100%;
        padding: 0;
    }
}
</style>
