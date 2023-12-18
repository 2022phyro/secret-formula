<script setup>
const props = defineProps({
    name: String,
    class: String,
})
const dClass = 'material-symbols-outlined';
</script>
<template>
    <span :class="[dClass, props.class ? props.class : '']">{{ props.name }}</span>
</template>
<style scoped>
span {
    cursor: pointer;
}
</style>
