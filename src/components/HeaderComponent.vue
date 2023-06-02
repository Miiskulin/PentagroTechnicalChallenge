<template>
    <div class="app">
        <header> 
            <div class="logo-container">
                <img class="logo" alt="Logo" src="../assets/logo-pentagro.png">
            </div>
        </header>
    </div>
</template>

<script>
import '../styles/defaultStyles.css'

export default {
    name: 'HeaderComponent' 
}
</script>

<style>
header {
    background-color: var(--dark-color);
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-container {
    height: 100%;
}

.logo {
    max-width:90px;
    max-height:70px;
    width: auto;
    height: auto;
}
</style>