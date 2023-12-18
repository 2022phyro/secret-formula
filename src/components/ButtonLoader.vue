<template>
    <span class="loader"></span>
</template>
<style scoped>
.loader {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-block;
    border-top: 4px solid green;
    margin-top: -3px;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after {
    content: '';  
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border-left: 4px solid #ee9e3d;
    border-bottom: 4px solid transparent;
    animation: rotation 0.5s linear infinite reverse;
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } </style>
