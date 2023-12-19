<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ButtonLoader from './ButtonLoader.vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  current: String,
});
const emit = defineEmits(['update:current']);

const toSignup = () => {
  emit('update:current', 'signup');
};
const router = useRouter();
const isLoading = ref(false);
const email = ref('');
const password = ref('');
const errorEmail = ref('');
const errorPwd = ref('');
const errorSubmit = ref('An error occured. Please try again later');

const validateForm = async () => {
  let isValid = true;

  // Simple validation for email
  if (!email.value || email.value === '') {
    errorEmail.value = 'Email is required';
    isValid = false;

  } else if (!email.value.includes('@')) {
    errorEmail.value = 'Invalid email';
    isValid = false;
  } else {
    errorEmail.value = '';
  }

  // Simple validation for password
  if (password.value === '') {
    errorPwd.value = 'Password is required';
    isValid = false;
  } else if (password.value.length > 20 || password.value.length < 6) {
    errorPwd.value = 'Password must be between 6 and 20 characters';
    isValid = false;
  } else {
    errorPwd.value = '';
  }

  if (isValid) {
    isLoading.value = true;
    try {
      // Simulate a request
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log({ email: email.value, password: password.value });
      router.push('/cook/');
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<template>
  <section>
    <h2>Let's continue the meal from where we stopped shall we</h2>
    <form @submit.prevent="validateForm">
      <label for="email">Email
        <input type="email" id="email" placeholder="Enter your email" v-model="email" />
        <div class="error">{{ errorEmail }}</div>
      </label>
      <label for="password">Password
        <input type="password" id="password" placeholder="Enter your password" v-model="password" />
        <div class="error">{{ errorPwd }}</div>  
      </label>
      <!-- <button type="submit">Login</button> -->
      <button class="btn" type="submit" :disabled="isLoading">
        <ButtonLoader v-if="isLoading" />
        <span v-else>Login</span>
      </button>
      <div class="error">{{ errorSubmit }}</div>
      <p>Forgot password? <a>Click here</a></p>
      <p>Don't have an account? <span class="a" @click="toSignup">Click here</span></p>
    </form>
  </section>
</template>
<style scoped>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 30px 0;
    height: inherit ;
  }
  section h2 {
	  text-align: center;
	  font-size: 24px;
	  font-weight: 600;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    width: 100%;  
    height: auto;
    border: none;
    border-radius: 5px;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-family: 'Space Grotesk';
    font-size: 18px;  
    line-height: 1.5 ;
    width: 90%; 
    margin: 10px 0;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 3 px;
    border: 1px solid #ccc;
    font-size: 16px; 
    border-radius: 5px;
    font-family: 'IBM Plex Sans', 'sans-serif';
    outline: none;
  }

  input::placeholder {
	  color: #ccc;  
    font-style: italic;
  }
  input:focus  {
	  border: 1px solid rgba(233,158,61); 
  }
  button {
    width: 90%;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
  }
  
  .error {
    color: red;
    font-size: 13px;
  }
  section p:last-child {
    margin-bottom: 20px;
  }
</style>
