<template>
    <div id="app">
        <body>
            <header> 
                <HeaderComponent/>
            </header>
                <main>
                    <div class="message-component-container"> 
                        <MessageComponent ref="messageComponent"/>
                    </div>
                    <div class="form-container" id="login-form-container">
                        <h2 class="form-title" id="login-form-title">LOGIN</h2>
                        <form @submit.prevent="login"  class="login-form">   
                            <fieldset class="fieldset" id="login-fieldset">
                                <input type="text" class="text-input" id="user-input" v-model="username" placeholder="USUÁRIO" required autofocus>                                             
                                <input type="password" class="password-input" id="password-input" v-model="password" placeholder="SENHA" required>                                            
                                <button type="submit" class="form-submit-button" id="login-form-submit-button" @onclick="login">ENTRAR</button> 
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
import MessageComponent from '../components/MessageComponent.vue'
import api from '../services/api.js'
import { Base64 } from 'js-base64'
import md5 from 'js-md5'
import axios from 'axios'

export default {
    components: {
        HeaderComponent,
        FooterComponent,
        MessageComponent
    },

    data() {
        return{ 
        username: "",
        password: ""
        }
    },

    methods: {  
       async login() {
            let param = {  
            "Username": Base64.encode(this.username),
            "UserPassword": Base64.encode(md5(this.password))
            }

            axios
            .post(api + '/login', param)
            .then((response) => {
            let token = response.data
            localStorage.setItem('Token', token)
            this.$refs.messageComponent.showAlert('LOGIN REALIZADO COM SUCESSO!', 'success')
            setTimeout(() => this.$router.push('/usermanagement'), 300)
            })
            .catch(() => {
                this.$refs.messageComponent.showAlert('FALHA AO REALIZAR O LOGIN. VERIFIQUE AS CREDENCIAIS OU A CONXÃO COM O SERVIDOR.', 'error')
            })
        }
    }
}
</script>

<style scoped>
body {
    grid-template-rows: 75px 1fr 35px;
    grid-template-areas: 'header' 'content' 'footer';
}

main{
    justify-content: center;
}

.message-component-container {
    position: absolute;
    bottom: 45px;
    right: 10px;
    z-index: 9999;
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
    opacity: 80%;
    
}
</style>