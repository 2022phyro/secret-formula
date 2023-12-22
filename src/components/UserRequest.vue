<script setup>
import { lget } from '@/utils'
import { ref, watchEffect } from 'vue'
import { marked } from 'marked'
const props = defineProps({
  content: String,
  image: String
})
const parsedContent = ref('')

watchEffect(() => {
  if (props.content) {
    parsedContent.value = marked(props.content)
  }
})
const avatar = ref('/chef.png')
avatar.value = lget('user')?.avatar || '/chef.png'
</script>
<template>
  <div class="container">
    <div class="user">
      <img :src="avatar" alt="user" class="avatar" />
    </div>
    <div class="content">
      <div v-if="props.content" class="markdown" v-html="parsedContent"></div>
      <img v-if="props.image" img :src="props.image" alt="uploaded picture" />
    </div>
  </div>
</template>
<style scoped>
.container {
  /* width: 100%; */
  /* background-color: antiquewhite; */
  display: flex;
  flex-flow: column;
  margin-top: 30px;
  justify-content: flex-end;
  position: relative;
  align-items: flex-end;
  gap: 5px;
}
.content {
  width: 100%;
  border-top: 2px solid #e99e3d;
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
  /* border: 1px solid green; */
}
.user {
  position: absolute;
  top: -30px;
  right: -8px;
  background: transparent;
  backdrop-filter: blur(4px);
  display: flex;
  flex-flow: row;
  gap: 10px;
  align-items: center;
  border: 2px solid #e99e3d;
  border-radius: 20px;
  border-bottom: none;
  padding: 5px 5px 0;
}
.user h3 {
  font-family: 'Space Grotesk';
  font-weight: 500;
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
