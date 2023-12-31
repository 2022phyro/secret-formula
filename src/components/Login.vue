<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ButtonLoader from './ButtonLoader.vue'
import { inst, baseUrl, lset } from '@/utils.js'
import MyIcon from './MyIcon.vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  current: String
})
const emit = defineEmits(['update:current'])
const toSignup = () => {
  emit('update:current', 'signup')
}
const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const email = ref('')
const password = ref('')
const errorEmail = ref('')
const isVisible = ref(false)
const errorPwd = ref('')
const errorSubmit = ref('') // To hold the error value from the request

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

  // Simple validation for password
  if (password.value === '') {
    errorPwd.value = 'Password is required'
    isValid = false
  } else if (password.value.length > 20 || password.value.length < 6) {
    errorPwd.value = 'Password must be between 6 and 20 characters'
    isValid = false
  } else {
    errorPwd.value = ''
  }

  if (isValid) {
    const redirect = route.query.redirect || '/cook/'
    isLoading.value = true
    try {
      // Simulate a request
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const res = await inst().post(`${baseUrl}/auth/login`, {
        login: email.value,
        password: password.value
      })
      lset('token', res.data.auth_info.atoken)
      lset('token_expiry', res.data.auth_info.atoken_expiry)
      router.push(redirect)
    } catch (err) {
      const message = err.response?.data?.message
      errorSubmit.value = message?.includes('authenticate')
        ? 'Invalid email or password'
        : 'An error occurred. Please try again later'
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <section>
    <h2>Let's continue the meal from where we stopped shall we</h2>
    <form @submit.prevent="validateForm">
      <label for="email"
        >Email
        <input type="email" id="email" placeholder="Enter your email" v-model="email" />
        <div class="error">{{ errorEmail }}</div>
      </label>
      <label for="password"
        >Password
        <input
          :type="isVisible ? 'text' : 'password'"
          id="password"
          placeholder="Enter your password"
          v-model="password"
        />
        <MyIcon
          :name="isVisible ? 'visibility_off' : 'visibility'"
          class="see-pwd"
          @click="
            () => {
              isVisible = !isVisible
            }
          "
        />
        <div class="error">{{ errorPwd }}</div>
      </label>
      <!-- <button type="submit">Login</button> -->
      <button class="btn" type="submit" :disabled="isLoading">
        <ButtonLoader v-if="isLoading" />
        <span v-else>Login</span>
      </button>
      <div class="error">{{ errorSubmit }}</div>
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
.see-pwd {
  align-self: flex-end;
  margin-top: -30px;
  margin-right: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  color: grey;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 3 px;
  border: 1px solid #ccc;
  background-color: var(--input);
  color: var(--color-text);
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
  margin-top: 10px;
}

section p:last-child {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
