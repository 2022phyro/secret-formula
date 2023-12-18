<script setup>
import { ref } from 'vue';
const menu = ref(false);
const active=ref(3);
const emit = defineEmits(['openPopup', 'changeThread'])

const selectThread = (id) => {
    active.value = id;
    emit('changeThread', id);
}
const logout = () => {
    emit('openPopup', 'logout');
}
const deleteA = () => {
    emit('openPopup', 'deleteAcc');
}
const newThread = () => {
    emit('openPopup', 'newThread')
}
const toggleMenu = () => {
    menu.value = !menu.value;
}
</script>
<template>
    <div :class="['s-m-header', menu? 'show' : '']">
        <div class="new-thread"
        @click="newThread">
            <span class="material-symbols-outlined">
                shadow_add
            </span>
            New Pot!😏
        </div>
        <span class="material-symbols-outlined menu-icon" @click="toggleMenu">
            {{ menu? 'menu_open': 'list'}}
        </span>
    </div>
    <div :class="['side-menu', menu? 'show' : '']">
            <!--Implement infinte scrolling, also the list will have it's own component for rendering
            the threads and deleting them-->
        <ul class="threads">
            <li v-for="i in 20" :key='i' :class="['thread', i == active? 'active' : '']"
            @click="selectThread(i)">
                How to make extremely annoying egusi soup</li>
        </ul>
        <button class="s-m-footer"
        @click="logout">
            <span class="material-symbols-outlined">
                logout
            </span>
            Log out
        </button>
        <button class="s-m-footer da"
        @click="deleteA">
            <span class="material-symbols-outlined">
                delete
            </span>
            Delete Account
        </button>
    </div>
</template>

<style scoped>
.side-menu {
    height: calc(100vh - 70px);
    width: 280px;
    position: fixed;
    background-color: #e99e3d80;
    backdrop-filter: blur(5px);
    display: flex;
    left: -280px;
    flex-flow: column;
    align-items: center;
    padding: 0 10px;
    overflow: auto;
    z-index: 1000;
    /*border: 1px solid red;*/
    transition: left 0.4s ease-in-out;
}
.s-m-header {
    position: fixed;
    height: 45px;
    border-bottom-right-radius: 8px;
    top: 60px;
    left: -275px;
    width: 320px;
    padding: 0 10px;
    background-color: #f5cf9d;
    margin-top: 10px;
    font-size: 20px;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    transition: left 0.4s ease-in-out, width 0.4s ease-in-out;
}
.side-menu.show, .s-m-header.show {
    left: 0;
    z-index: 1000;
}
.s-m-header.show  {
    z-index: 1001;
}
.s-m-header .new-thread {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid #e99e3d;
    cursor: pointer;

}
.threads {
    list-style-type: none;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    margin-top: 45px;
    width: 100%;
    height: calc(100% - 170px);
    /*border: 1px solid blue;*/
    overflow: auto;
    padding: 0;
}
.threads li {
    list-style: none;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    white-space: nowrap;
    height: 30px;
    flex-basis: 30px;
    flex-shrink: 0;
    overflow: hidden;
    padding: 4px 0;
    cursor: pointer;
    font-weight: 300;
    text-overflow: ellipsis;
}
.threads li:hover {
    background-color: #f3c486;
}
.threads li.active {
    font-weight: 600;
    border-bottom: 3px solid rgba(0,0,0,0.2);
    position: sticky;
    background-color: #f3c486;

    top: 0;
    bottom: 0;

}
.s-m-footer {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    position: absolute;
    bottom: 30px;
    gap: 5px;
    background-color: white;
    margin-bottom: 30px;
    border-radius: 10px;
    line-height: 2;
    font-size: 18px;
    font-weight: 700;
    color: #e99e3d;
}
.da {
    bottom: 0;
    margin-bottom: 10px;
}

button.s-m-footer:active {
    box-shadow: 0px 0px 0px 0px;
    bottom: 26px;
    margin-bottom: 26px;
    top: auto;
    left: 16px;
}
button.da:active {
    box-shadow: 0px 0px 0px 0px;
    bottom: 6px;
    margin-bottom: 6px;
    top: auto;
    left: 16px;
}
@media screen and (min-width: 769px) {
    .s-m-header {
        justify-content: flex-start;
        left: 0;
        width: 280px;
        z-index: 1;
    }
    .side-menu {
        left: 0;
        position: relative;
        width: 280px;
        z-index: 0;

    }
}
</style>
