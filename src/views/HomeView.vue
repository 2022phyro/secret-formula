<script setup>
import { ref } from 'vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const current = ref('')
const login = () => {
  const popUp = document.querySelector('.pop-up')
  popUp.style.display = 'flex'
  current.value = 'login'
}
const signup = () => {
  const popUp = document.querySelector('.pop-up')
  popUp.style.display = 'flex'
  current.value = 'signup'
}
const close = () => {
  const popUp = document.querySelector('.pop-up')
  popUp.style.display = 'none'
  current.value = ''
}
</script>

<template>
  <header class="header">
    <img src="/logo.png" alt="logo" class="logo" />
    <h1>Secret Formula</h1>
  </header>
  <main>
    <div class="auth">
      <h1>Finally Plankton!</h1>
      <p>
        Are you tired of old Eugeeene Krabs rubbing his stupid secret formula in your face? Do you
        want Big Chef to finally listen to you when you say you can make a panini with rice, cheese,
        and a little bit of love? Well, you're here with the Secret Formular, we'll decode whatever
        it is that you want from those nitty little veggies and bacon. Giving you your own assistant
        to cook up stunning recipes that can't go wrong no matter whatever you do
      </p>
      <button class="btn" role="button" @click="signup">Get Started</button>
      <button class="btn about" role="button" @click="() => router.push('/about')">About Secret Formula</button>
      <!-- <button class="btn" role="button" @click="signup">Sign Up</button> -->
    </div>
    <div class="content">
      <img src="/background.png" alt="background" />
    </div>
    <div class="pop-up">
      <div class="pop-up-content">
        <span class="close" @click="close">&times;</span>
        <component
          :is="current === 'login' ? Login : SignUp"
          :current="current"
          @update:current="current = $event"
        />
      </div>
    </div>
  </main>
</template>
<style scoped>
.about {
  margin-top: 20px;
}
header.header {
  background: transparent;
}
header h1 {
  font-size: 28px;
  font-weight: 600;
  font-family: 'Space Grotesk';
  color: #e99e3d;
  margin: auto;
}
main {
  display: flex;
  height: 100vh;
  flex-flow: row-reverse;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
}

.auth {
  display: flex;
  justify-content: center;
  background: transparent;
  flex-flow: column;
  gap: 20px;
  font-weight: 600;
  width: 50%;
  padding: 50px 15px 0 30px;
  align-items: flex-start;
}

.auth p {
  font-weight: 600;
}

.auth h1 {
  font-weight: 600;
}

.auth button {
  width: 200px;
  height: 60px;
  font-weight: 600;
  align-self: center;
  font-family: 'Space Grotesk';
}

.content {
  max-width: 50%;
  height: inherit;
  width: 40%;
  color: white;
  display: flex;
  background-color: #e99e3d;
  align-items: center;
  justify-content: center;
  background-size: 100px;
  padding: 0 30px 0 15px;
  background-repeat: repeat;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  flex-flow: column wrap;
  gap: 20px;
}

.content img {
  border: 2px solid #e99e3d80;
  width: 110%;
  margin-left: 100px;
  border-radius: 50%;
}

@media screen and (min-height: 315px) and (max-height: 450px) and (min-width: 769px) {
  .auth {
    width: 90%;
    padding: 50px 0;
    margin: auto;
    gap: 10px;
  }

  .auth h1 {
    font-size: 24px;
  }

  .auth p {
    font-size: 13px;
  }

  .auth button {
    width: 150px;
    height: 40px;
    font-size: 13px;
  }

  .content {
    width: 90%;
    padding: 50px 0;
    margin: auto;
  }
}

@media screen and (max-width: 768px) {
  main {
    display: block;
    padding: 50px 0;
    background: #e99e3d80;
    flex-flow: column;
    overflow: auto;
    scroll-behavior: smooth;
  }

  .auth {
    width: 90%;
    padding: 50px 0;
    margin: auto;
  }

  .content {
    display: none;
  }
}

.pop-up {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(233, 158, 61, 0.5);
  backdrop-filter: blur(7px);
  display: none;
  justify-content: center;
  padding: 50px 30px;
  align-items: center;
  transition: width 0.5s ease-in-out;
  z-index: 1;
}

.pop-up-content {
  background: var(--color-background);
  color: var(--color-text);
  max-width: 400px;
  width: calc(100% - 10px);
  height: calc(100% - 30px);
  max-height: 600px;
  border-radius: 15px;
  padding: 20px;
  position: relative;
  overflow: auto;
}

.close {
  font-size: 30px;
  position: absolute;
  right: 20px;
  top: 0;
  font-weight: 800;
  cursor: pointer;
  color: #e99e3d;
}

.close:hover,
.close:active {
  color: red;
}
</style>
