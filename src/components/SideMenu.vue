<script setup>
import { ref } from 'vue';
const menu = ref(false);
const toggleMenu = () => {
    menu.value = !menu.value;
}
</script>
<template>
    <div :class="['s-m-header', menu? 'show' : '']">
        <div class="new-thread">
            <span class="material-symbols-outlined">
                stylus_note
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
            <li> How to make extremely annoying egusi soup</li>
            <li> How to make extremely annoying egusi soup</li>
            <li> How to make extremely annoying egusi soup</li>
            <li> How to make extremely annoying egusi soup</li>
            <li> How to make extremely annoying egusi soup</li>
            <li> How to make extremely annoying egusi soup</li>
            <li> How to make extremely annoying egusi soup</li>
        </ul>
        <button class="s-m-footer">
            <span class="material-symbols-outlined">
                logout
            </span>
            Log out
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
    border-radius: 8px;
    top: 55px;
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
    gap: 8px;
}
.threads li {
    list-style: none;
    border-bottom: 1px solid rgba(0,0,0,0.2);
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
    background-color: transparent;
    margin-bottom: 30px;
    border-radius: 10px;
    line-height: 2;
    font-size: 18px;
    color: black;
}
button.s-m-footer:hover {
    background: #e99e3d;
    color: white;
    box-shadow: 1px 1px 0px 0px, #e99e3d 1px 1px 0px 0px, #e99e3d 1px 1px 0px 0px, #e99e3d 1px 1px 0px 0px,  #e99e3d 3px 3px 0px 0px #e99e3d;
}
button.s-m-footer:active {
    box-shadow: 0px 0px 0px 0px;
    bottom: 26px;
    margin-bottom: 26px;
    top: auto;
    background: #e99e3d;
    color: white;
    left: 16px;
}
@media screen and (min-width: 769px) {
    .s-m-header {
        justify-content: center;
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
