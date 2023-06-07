<template>
  <div class="app">
    <div class="footer-text-container">
        <p class="footer-text">PENTAGRO - 2023</p>
    </div>
  </div>
</template>

<script>
import '../styles/defaultStyles.css'

export default {
  name: 'FooterComponent'
}
</script>

<style>
footer {
    background-color: var(--dark-color);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.footer-text-container {
    height: 100%;
}

.footer-text {
    color: var(--font-light-color);
    font-size: 20px;
}
</style>