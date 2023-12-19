<script setup>
import MyIcon from './MyIcon.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue';
const menu = ref(false)
const active = ref(10)
const emit = defineEmits(['openPopup', 'changeThread'])

const fabOpen = ref(false);

const closeFab = () => {
  fabOpen.value = false;
};

onMounted(() => {
  window.addEventListener('click', closeFab);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeFab);
});

const selectThread = (id) => {
    active.value = id
    emit('changeThread', id)
}
const logout = () => {
    emit('openPopup', 'logout')
}
const deleteA = () => {
    emit('openPopup', 'deleteAcc')
}
const toggleMenu = () => {
    menu.value = !menu.value
}
</script>
<template>
    <div :class="['side-menu', menu ? 'show' : '']">
        <div :class="['s-m-header', menu ? 'show' : '']">
            <img class="logo" src="/logo.png" alt="logo" />
            <MyIcon @click="toggleMenu" :name="menu ? 'menu_open' : 'list'" class='menu-icon' />
        </div>
        <!--Implement infinte scrolling, also the list will have it's own component for rendering
        the threads and deleting them-->
        <ul class="threads">
            <li v-for="i in 20" :key="i" :class="['thread', i == active ? 'active' : '']" @click="selectThread(i)">
                How to make extremely annoying egusi soup
            </li>
        </ul>
        <div class="settings">
            <div :class="['opener', fabOpen? 'active' : '']" @click.stop="fabOpen = !fabOpen">
            <MyIcon name="settings" />
            Settings
            </div>
            <ul v-show="fabOpen" @click.stop>
                <li @click="logout">
                    <MyIcon name="logout" />Log out
                </li>
                <li @click="deleteA">
                    <MyIcon name="delete" />Delete Account
                </li>
            </ul>
        </div>
    </div>
    <div :class="['close-menu', menu ? 'show' : '']" @click="toggleMenu"></div>
</template>

<style scoped>
.close-menu {
    position: fixed;
    top: 0;
    right: 100vw;
    width: calc(100vw - 280px);
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(3px);
    align-self: stretch;
    transition: right 0.4s ease-in-out;
}

.side-menu {
    position: fixed;
    height: 100%;
    top: 0px;
    width: 280px;
    left: -280px;
    background-color: #f5cf9d;
    padding: 0;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    z-index: 1000;
    align-content: flex-start;
    overflow-x: visible;
    transition: left 0.4s ease-in-out;
}

.s-m-header {
    height: 50px;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    position: fixed;
    left: -280px;
    padding-left: 10px;
    top: auto;
    width: 330px;
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    align-items: center;
    /* border: 1px solid red; */
    transition:
        left 0.4s ease-in-out,
        width 0.4s ease-in-out;
}

.add {
    position: absolute;
    right: 10px;
}

.side-menu.show,
.s-m-header.show {
    left: 0;
    z-index: 1000;
}

.close-menu.show {
    right: 0;
    left: auto;
    z-index: 999;
}

.s-m-header.show {
    z-index: 1001;
}

.threads {
    list-style-type: none;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    margin-top: 55px;
    width: 100%;
    height: calc(100% - 200px);
    /* border: 1px solid blue; */
    overflow: auto;
    padding: 0;


    -ms-overflow-style: none;
}

.threads::-webkit-scrollbar {
    display: none;
}

.threads li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    flex-shrink: 0;
    overflow: hidden;
    padding: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    cursor: pointer;
    font-weight: 300;
    text-overflow: ellipsis;
}

.threads li:hover, .opener:hover{
    background-color: #f3c486;
}

.threads li.active  {
    font-weight: 600;
    border-bottom: 3px solid rgba(0, 0, 0, 0.2);
    position: sticky;
    background-color: #f3c486;
    top: 0;
    bottom: 0;
}
.opener.active {
    background-color: #f3c486;
    border-bottom: 3px solid rgba(0, 0, 0, 0.2);
    font-weight: 600;
    border-radius: 8px;

}
.settings {
}
.opener {
    padding: 5px 10px;
    line-height: 1;
    display: flex;
    flex-flow: row;
    font-size: 14px;
    gap: 5px;
    align-items: center;
    vertical-align: center;
    cursor: pointer;
}
.settings ul {
    list-style-type: none;
    border: 1px solid #e99e3d;
    border-top: none;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 0;
    margin-left: 40px;
    margin-right: 7px;
}
.settings ul li {
    width: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    font-size: 14px;
    gap: 5px;
    margin: 0;
    padding: 7px 10px;
    cursor: pointer;
    font-weight: 300;
}
.settings ul li:hover {
 border-radius: 8px;
 background: #e99e3d;
}

@media screen and (min-width: 769px) {
    .s-m-header {
        height: 60px;
        background-color: #f5cf9d;
        justify-content: flex-start;
        left: 0;
        width: 280px;
        z-index: 1;
    }

    .side-menu {
        left: 0;
        position: relative;
        width: 280px;
        height: 100vh;
        z-index: 0;
    }

    .close-menu {
        display: none;
    }
}</style>
