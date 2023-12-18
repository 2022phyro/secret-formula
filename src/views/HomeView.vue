<script setup>
import { ref } from 'vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';

const current = ref('')
const login = () => {
  const popUp = document.querySelector('.pop-up');
  popUp.style.display = 'flex';
  current.value = 'login';
}
const signup = () => {
  const popUp = document.querySelector('.pop-up');
  popUp.style.display = 'flex';
  current.value = 'signup';
}
const close = () => {
  const popUp = document.querySelector('.pop-up');
  popUp.style.display = 'none';
  current.value = '';
}
</script>

<template>
  <main>
    <div class="auth">
      <button role="button" @click="login">Login</button>
      <button role="button" @click="signup">Sign Up</button>
    </div>
    <div class="content">
      <h1>
        Finally Plankton!
      </h1>
      <p>
        Are you tired of old Eugeeene Krabs rubbing his stupid secret formula in 
        your face? Do you want Big Chef to finally listen to you when you say you can
        make a panini with rice, cheese, and a little bit of love? Well, you're
        here with the Secret Formular, we'll decode whatever it is that you want
        from those nitty little veggies and bacon. Giving you your own assistant to 
        cook up stunning recipes that can't go wrong no matter whatever you do
      </p>
    </div>
    <div class="pop-up">
      <div class='pop-up-content'>
        <span class="close" @click="close">&times;</span>
        <component :is="current === 'login' ? Login : Signup" :current="current" 
        @update:current="current = $event"/>
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  display: flex;
  flex-flow: row-reverse;
  align-items: center;
  padding: 0 30px;
  flex-basis: 50%;
}
.auth {
  display: flex;
  justify-content: center;
  gap: 50px;
  width: 50%;
  flex-basis: 50%;
  align-items: center;
}
.auth button {
  width: 150px;
  height: 50px;
  border-radius: 15px;
  border: none;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: capitalize;
  background: white;
  color: #e99e3d;
  cursor: pointer;
  border: 2px solid #e99e3d;
  padding: 0.25em 0.75em;
  box-shadow: 1px 1px 0px 0px, 1px 1px 0px 0px, 1px 1px 0px 0px, 1px 1px 0px 0px, 4px 4px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  transition: top 0.5s ease, left 0.5s ease;
}

.auth button:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}
.content {
  width: 50%;
  height: calc(100vh -70px);
  display: flex;
  background-size: 100px;
  background-repeat: repeat;
  flex-flow: column wrap;
  gap: 20px;
}
.content p {
  font-size: 20px;
  line-height: 1.5;
}

@media (max-width: 768px) {
  main {
    display: flex;
    flex-flow: column wrap;
  }
 .auth {
  position: fixed;
  top: 0;
  right: 30px;
  gap: 20px;
  background: transparent;
  height: 70px;

  width: fit-content;
 }
  .auth button {
    padding: 0.25em 0.5em;
    width: auto;
    height: 40px;
    border-radius: 15px;
    border: none;
    font-size: 14px;
    letter-spacing: 2px;
    text-decoration: none;
    text-transform: capitalize;
    background: white;
    color: #e99e3d;
    cursor: pointer;
    border: 2px solid #e99e3d;
    padding: 0.25em 0.75em;
    box-shadow: 1px 1px 0px 0px, 1px 1px 0px 0px, 1px 1px 0px 0px, 1px 1px 0px 0px, 3px 3px 0px 0px;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    transition: top ease 0.5s, left ease 0.5s;
  }
  .content {
    width: auto;
    /*background-image: url(background.jpg);*/
    background-size: 100%;
  }
}
.pop-up {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(233,158,61, 0.5);
  backdrop-filter: blur(7px);
  display: none;
  justify-content: center;
  padding: 50px 30px;
  align-items: center;
  transition: width 0.5s ease-in-out;
  z-index: 1;
}
.pop-up-content {
  background: white;
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
  color:#e99e3d;

}
.close:hover, .close:active {
  color: red;
}
</style>
<!-- HTML !-->

/* CSS */
