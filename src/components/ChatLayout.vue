<script setup>
// import MyIcon from './MyIcon.vue';
import ChatInput from './ChatInput.vue'
import AIReply from './AIReply.vue'
import UserRequest from './UserRequest.vue'
</script>
<template>
  <section class="chat-layer">
    <!--Implement infinte scrolling, also the list will have it's own component for rendering
        my messages and the ai's replies-->
    <ul class="chat-body">
      start
      <UserRequest />
      <AIReply/>
      <li v-for="i in 100" :key="i">chat items</li>
    </ul>
    <ChatInput />
  </section>
</template>
<style scoped>
.chat-layer {
  height: calc(100vh - 60px);
  position: absolute;
  bottom: 0;
  right: 0;
  top: 60px;
  width: calc(100vw - 280px);
  border: 1px solid red;
  display: flex;
  align-self: stretch;
  flex-flow: column;
  align-items: center;
  padding: 0 30px;
  overflow: auto;
}
.chat-body {
  max-width: 700px;
  padding: 0;
  width: 100%;
  /* background: greenyellow; */
  margin-bottom: 120px;
}
@media screen and (max-width: 768px) {
  .chat-layer {
    height: calc(100vh - 50px);
    width: 100%;
    padding: 0;
    top: 50px;
  }
}
</style>
