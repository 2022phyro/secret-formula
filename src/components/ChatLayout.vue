<script setup>
// import MyIcon from './MyIcon.vue';
import ChatInput from './ChatInput.vue'
import ChatControl from './ChatControl.vue'
</script>
<template>
  <section class="chat-layer">
    <!--Implement infinte scrolling, also the list will have it's own component for rendering
        my messages and the ai's replies-->
    <ul class="chat-body">
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
      <li>chat items</li>
    </ul>
    <ChatInput />
  </section>
</template>
<style scoped>
.chat-layer {
  position: relative;
  height: calc(100vh - 60px);
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(100vw - 280px);
  border: 1px solid red;
  display: flex;
  align-self: stretch;
  flex-flow: column;
  align-items: center;
  padding: 0 30px 30px 30px;
  overflow: auto;
}
.chat-body {
  height: 100%;
  padding-bottom: 90px;
  max-width: 700px;
  width: 100%;
    border: 1px solid green;
}
@media screen and (max-width: 768px) {
  .chat-layer {
    height: calc(100vh - 50px);
    width: 100%;
    padding: 0;
  }
}
</style>
