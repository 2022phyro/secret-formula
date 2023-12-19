<script setup></script>
<template>
  <header>
    <!-- <img src="/logo.png" alt="The secret Formular" class="logo" /> -->
    <h1>Secret Formula 1.0</h1>
  </header>
</template>
<style scoped>
header {
  height: 60px;
  width: 100%;
  background-color: #f5cf9d;
  backdrop-filter: blur(3px);
  position: fixed;
  top: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
}
h1 {
  /* font-family: "Space Grotesk"; */
  font-weight: 600;
  font-size: 20px;
  margin: auto;
}
@media screen and (max-width: 768px) {
  header {
    height: 50px;
    justify-content: flex-start;
  }
  h1 {
    font-size: 18px;
    margin: 0;
    margin-left: 20px;
  }
}
</style>
