<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonLoader from './ButtonLoader.vue'
import { inst, baseUrl, lset } from '@/utils.js'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  current: String
})
const emit = defineEmits(['update:current'])

const toLogin = () => {
  emit('update:current', 'login')
}

const router = useRouter()
const email = ref('')
const name = ref('')
const password = ref('')
const errorEmail = ref('')
const errorName = ref('')
const errorPwd = ref('')
const errorSubmit = ref('') // To hold the error value from the request
const isLoading = ref(false)
const validateForm = async () => {
  let isValid = true

  // Simple validation for email
  if (!email.value || email.value === '') {
    errorEmail.value = 'Email is required'
    isValid = false
  } else if (!email.value.includes('@')) {
    errorEmail.value = 'Invalid email'
    isValid = false
  } else {
    errorEmail.value = ''
  }
  if (!name.value || name.value === '') {
    errorName.value = 'Your name is required'
    isValid = false
  } else if (!/^[a-zA-Z]+$/.test(name.value)) {
    errorName.value = 'Name can only contain letters and spaces'
    isValid = false
  } else if (name.value.length > 20) {
    errorName.value = 'Name too long'
    isValid = false
  } else {
    errorName.value = ''
  }
  if (password.value === '') {
    errorPwd.value = 'Password is required'
    isValid = false
  } else if (password.value.length > 20 || password.value.length < 8) {
    errorPwd.value = 'Password must be between 8 and 20 characters'
    isValid = false
  } else {
    errorPwd.value = ''
  }

  if (isValid) {
    isLoading.value = true
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const res = await inst().post(`${baseUrl}/auth/signup`, {
        email: email.value,
        password: password.value,
        first_name: name.value
      })
      if (res.status == 201) {
        const login = await inst().post(`${baseUrl}/auth/login`, {
          login: email.value,
          password: password.value
        })
        lset('token', login.data.auth_info.atoken)
        router.push('/cook/')
      }
    } catch (err) {
      const message = err.response?.data?.message
      errorSubmit.value = message?.includes('authenticate') ? 'Invalid email or password' : message
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <section>
    <h2>Take the leap of faith into the bliss of a good food</h2>
    <form @submit.prevent="validateForm">
      <label for="name"
        >Name
        <input type="text" id="name" placeholder="Enter your name" v-model="name" />
        <div class="error">{{ errorName }}</div>
      </label>
      <label for="email"
        >Email
        <input type="email" id="email" placeholder="Enter your email" v-model="email" />
        <div class="error">{{ errorEmail }}</div>
      </label>
      <label for="password"
        >Password
        <input type="password" id="password" placeholder="Enter your password" v-model="password" />
        <div class="error">{{ errorPwd }}</div>
      </label>
      <button class="btn" type="submit" :disabled="isLoading">
        <ButtonLoader v-if="isLoading" />
        <span v-else>Sign Up</span>
      </button>
      <div class="error">{{ errorSubmit }}</div>
      <p>Already have an account <span class="a" @click="toLogin">Click here!</span></p>
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
  height: inherit;
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
  line-height: 1.5;
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
input:focus {
  border: 1px solid rgba(233, 158, 61);
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
section p {
  margin-bottom: 30px;
  margin-top: 10px;
}
</style>
