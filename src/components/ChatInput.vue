 <script setup>
  import { ref } from 'vue';
  import MyIcon from './MyIcon.vue';
  
  const text = ref('');
  const file = ref(null);
  const imageURL = ref('');
  const error = ref('');
  const textarea = ref('');
  
  const handleFileChange = (e) => {
    file.value = e.target.files[0];
    if (file.value && file.value.type.startsWith('image/')) {
      imageURL.value = URL.createObjectURL(file.value);
    } else {
      file.value = null;
      imageURL.value = '';
    }
  };
  const adjustHeight = () => {
  textarea.value.style.height = 'auto';
  textarea.value.style.height = textarea.value.scrollHeight + 'px';
};
  const handleSubmit = () => {
    if (!text.value && !file.value) {
      error.value = 'Please enter a message or select an image.';
    } else {
      const formData = new FormData();
      if (text.value) formData.append('text', text.value);
      if (file.value) formData.append('image', file.value);
      console.log('FormData:', [...formData.entries()]);
      text.value = '';
      file.value = null;
      imageURL.value = '';
      error.value = '';
    }
  };
</script>
<template>
    <div class="input-block">
      <img v-if="imageURL" :src="imageURL">
      <form @submit.prevent="handleSubmit">
        <label class="file-input">
            <MyIcon name='upload_file' class="upl"/>
            <input class='file' type="file" accept="image/*" @change="handleFileChange"/>
          </label>
        <textarea class='text' type="text" v-model="text" placeholder="Type a message"
        rows="5" :ref="textarea">
            <MyIcon name="send_money" />
        </textarea>
        <button type="submit" class="form-btn"><MyIcon name="publish" /></button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
<style scoped>
.input-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
    position: fixed;
    bottom: 0px;
    width: calc(100vw - 280px);
}
img {
    width: 250px;
    height: 300px;
    border: 2px solid #e99e3d;
    border-bottom: none;
    background-color: white;
    padding: 10px;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    background-size: 350px;
    object-fit: contain;
}
form {
    display: flex;
    flex-flow: row;
    align-items: center;
    width: 100%;
    border: 1px solid #ee9e3d;
    background-color: white; 
    border-radius: 12px;
    padding: 5px 13px;
    gap: 10px;

}
.text {
    width: 100%;
    font-family: "IBM Plex Sans";
    outline: none;
    border: none;
    font-size: 18px;
    max-height: 100;
    height: 50px;
    resize: none;
}
button {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;

}
.file-input {
    cursor: pointer;
  }
  
  .file-input input {
    display: none;
  }
  .upl {
    font-size: 35px;
    color: #e99e3d;
  }

  @media screen and (max-width: 768px) {
    .input-block {
      width: 100%;
      z-index: 1;
    }
    
  }
  
</style>
