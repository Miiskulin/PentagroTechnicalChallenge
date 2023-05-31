<template>
    <div id="app">
        <body>
            <header> 
                <HeaderComponent/>
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
                <footer>
                    <FooterComponent/>
                </footer>
        </body>
    </div>
</template>

<script>
import '../styles/defaultStyles.css'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import api from '../services/api.js'
import { Base64 } from 'js-base64'
import md5 from 'js-md5'
import axios from 'axios'

export default {
    components: {
        HeaderComponent,
        FooterComponent
    },
    data() {
        return{ 
        username: "",
        password: ""
        }
    },

    methods: {  
       async login() {
            const param = {  
            "Username": Base64.encode(this.username),
            "UserPassword": Base64.encode(md5(this.password))
            }

            axios
            .post(api + '/login', param)
            .then((response) => { 
            const token = response.data
            localStorage.setItem('Token', token);
            window.location.href ='http://localhost:8080/usermanagement'
            alert("Login realizado com sucesso!")
            })
            .catch(() => {
                alert("Falha no login! Verifique as credenciais ou sua conexão com o servidor.")})
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