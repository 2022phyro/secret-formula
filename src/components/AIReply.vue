<script setup>
import { ref, watchEffect, computed } from 'vue'
import { marked } from 'marked'
const props = defineProps({
  content: String,
  media: Array
})
const parsedContent = ref('')
const images = computed(() => {
  if (!props.media || props.media.length == 0) {
    return []
  }
  return props.media.filter((item) => item.type === 'IMAGE')
})
watchEffect(() => {
  if (props.content) {
    parsedContent.value = marked(props.content)
  }
})
</script>
<template>
  <div class="container">
    <div class="user">
      <img src="/logo.png" alt="user" class="avatar" />
    </div>
    <div class="content">
      <div v-if="props.content" class="markdown" v-html="parsedContent"></div>
      <ul>
        <li v-for="({ type, url }, index) in images" :key="index">
          <img :src="url" :alt="`uploaded picture ${index}`" />
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.container {
  /* width: 100%; */
  /* background-color: antiquewhite; */
  margin-top: 20px;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  position: relative;
  align-items: flex-end;
  gap: 5px;
}
.content {
  width: 100%;
  border-top: 2px solid #ccc;
  padding: 20px;
  min-height: 50px;
  display: flex;
  font-size: 14px;
  flex-flow: column;
  gap: 10px;
}
.content img {
  max-width: 200px;
  width: 90%;
  max-height: 200px;
  object-fit: cover;
  align-self: flex-end;
  /* border: 1px solid green; */
}
.user {
  position: absolute;
  top: -35px;
  left: -8px;
  background: transparent;
  backdrop-filter: blur(4px);
  display: flex;
  flex-flow: row;
  gap: 10px;
  align-items: center;
  border: 2px solid #ccc;
  border-radius: 25px;
  border-bottom: none;
  padding: 5px 5px;
}
ul {
  list-style-type: none;
}
@media screen and (max-width: 768px) {
  .content {
    width: 100%;
  }
}
</style>
