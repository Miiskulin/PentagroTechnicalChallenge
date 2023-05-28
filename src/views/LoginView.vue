<template>
    <div id="app">
        <body>
            <header> 
                <div class="logo-container">
                <img class="logo" alt="Logo" src="../assets/logo-pentagro.png">
                </div>
            </header>
            <main>
                <div class="form-container" id="login-form-container">
                    <h2 class="form-title" id="login-form-title">LOGIN</h2>
                    <form @submit.prevent="login"  class="login-form">   
                        <fieldset class="fieldset" id="login-fieldset">
                            <input type="text" class="text-input" id="user-input" v-model="username" placeholder="USUÁRIO" required autofocus>                                             
                            <input type="password" class="password-input" id="password-input" v-model="password" placeholder="SENHA" required>                                            
                            <button type="submit" class="form-submit-button" id="login-form-submit-button">ENTRAR</button> 
                        </fieldset>                                                                                      
                    </form>
                </div>
            </main>
            <footer></footer>
        </body>
    </div>
</template>

<script>
import  '../styles/global.css'
// import api from '..services/api.js'
import { Base64 } from 'js-base64'
import md5 from 'js-md5'

export default {
    data() {
        return{ 
        username: "",
        password: ""
        }
    },

    methods: {  
        login() {
            const param = {  
            "Username": Base64.encode(this.username),
            "UserPasssword": Base64.encode(md5(this.password))
            }

            console.log("login")
        }
    }
}
</script>

<style scoped>
body {
    grid-template-rows: 75px 1fr 45px;
    grid-template-areas: 'header' 'content' 'footer';
}

.form-container {
    height: 440px;
    width: 430px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.form-title {
    font-size: 65px;
    position: absolute;
    top: calc(50% - 150px);
    color: var(--dark-color);
}

.fieldset {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.password-input, 
.text-input {
    width: 230px;
    margin-bottom: 25px;
}


.form-submit-button {
    color: var(--font-light-color);
    background-color: var(--dark-color);
}

.form-submit-button:hover {
    background-color: #525252;
    
}
</style>