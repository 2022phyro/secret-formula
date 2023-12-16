<script setup>
import SideMenu from '../components/SideMenu.vue';

</script>
<template>
<div class="cook-view">
    <SideMenu />
    <section>
        <span class="material-symbols-outlined menu-icon">
            list
            </span>
    </section>
</div>
</template>
<style scoped>
.cook-view {
    display: flex;
    flex-flow: row;
    align-items: center;
}
</style>
