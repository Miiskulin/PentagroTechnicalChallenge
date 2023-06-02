<template>
  <div id="app">
    <body>
      <header>
        <HeaderComponent/>
      </header>
      <menu>
        <p class="menu-title">GESTÃO DE USUÁRIOS</p>
        <button class="exit-button" id="exit-button" @click.prevent="exit">SAIR</button>
      </menu>
      <main>
        <form class="user-management-form">
          <div class="form-container" id="user-management-form-container">
            <fieldset class="fieldset" id="user-manager-fieldset">
              <div class="row">
                <div class="field"> 
                  <input type="text" class="text-input" id="new-user-input" v-model="selectedUser.userName" placeholder="USUÁRIO">
                </div>
                <div class="field">
                  <select class="unit-select" v-model="selectedUser.unitId" >
                    <option value="null" disabled selected hidden>SELECIONE A UNIDADE</option>
                    <option v-for="unit in productionUnitList" :key="unit.name" :value="unit.id">{{ unit.name }}</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="field">
                  <input type="password" class="password-input" id="new-password-input" v-model="selectedUser.userPassword" placeholder="SENHA">
                </div>
                <div class="field">
                  <input type="text" class="text-input" id="name-input" v-model="selectedUser.name" placeholder="NOME COMPLETO">
                </div>
              </div>
              <div class="row">
                <div class="field">
                  <input type="password" class="password-input" id="confirm-password-input" v-model="selectedUser.confirmUserPassword" placeholder="CONFIRME SUA SENHA">
                </div>
                <div class="field">
                  <input type="text" class="text-input" id="email-input" v-model="selectedUser.email" placeholder="E-MAIL">
                </div>
              </div>
              <div class="row">
                <div class="field">
                  <button class="decrease-token-time" @click.prevent="decreaseTokenTime">-</button>
                  <input type="number" class="token-time-input" id="token-time-input" v-model="selectedUser.loginExpiration" placeholder="TEMPO DE TOKEN"/>
                  <button class="increase-token-time" @click.prevent="increaseTokenTime">+</button>
                </div>
              </div>
              <div class="row">
                <div class="field">
                  <label class="toggle-input-container" id="receive-alerts-input">
                    RECEBER ALERTAS
                    <input type="checkbox" class="toggle-input-button" v-model="selectedUser.receiveAutonomousWarning">
                    <div class="slider-area">
                      <button class="slider-button"></button>
                    </div>
                  </label>
                </div>
                <div class="field" id="treat-occurrences-input">
                  <label class="toggle-input-container">
                    TRATAR OCORRENCIAS
                    <input type="checkbox" class="toggle-input-button" v-model="selectedUser.improveTeamMember">
                    <div class="slider-area">
                      <button class="slider-button"></button>
                    </div>
                  </label>
                </div>
                <div class="field" id="disable-user-input">
                  <label class="toggle-input-container">
                    DESABILITAR USUÁRIO
                    <input type="checkbox" class="toggle-input-button" v-model="selectedUser.disabled">
                    <div class="slider-area">
                      <button class="slider-button"></button>
                    </div>
                  </label>
              </div>
              </div>
              <div class="row">
                <div class="field">
                  <button type="submit" class="form-submit-button" id="user-management-form-submit-button" @click="saveUser">SALVAR</button>
                </div>
                <div class="field">
                  <button type="reset" class="form-cancel-button" id="user-management-form-cancel-button">CANCELAR</button>
                </div>
              </div>
            </fieldset> 
          </div>
        </form>
        <div class="users-table-container"> 
          <table class="users-table" id="users-table"> 
            <thead class="user-table-head">
              <tr>
                <th>CÓDIGO</th>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>ATIVO?</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody class="user-table-body">
              <tr class="user-table-item">
                <td class="cell">01</td>
                <td class="cell">Pentagro</td>
                <td class="cell">penta@penta.com.br</td>
                <td class="cell">Ativo</td>
                <td class="cell"> <div class="edit-button-container"> <button class="edit-user">EDITAR</button> </div> </td>
              </tr>
              <tr class="user-table-item" v-for="user in usersList" :key="user.id">
                <td class="cell">{{ user.id }}</td>
                <td class="cell">{{ user.userName }}</td>
                <td class="cell">{{ user.email }}</td>
                <td class="cell">{{ user.disabled }}</td>
                <td class="cell"> <div class="edit-button-container"> <button class="edit-user">EDITAR</button> </div> </td>
              </tr>
            </tbody> 
          </table>
        </div>
      </main>
      <footer>
        <FooterComponent/>
      </footer>
    </body>
  </div>
</template>

<script>
import  '../styles/defaultStyles.css'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { api, getToken } from '../utilities/global.js'
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
      productionUnitList: [],
      usersList:[],
      selectedUser: {
        userName: null,
        name: null,
        userPassword: null,
        confirmUserPassword: null,
        email: null,
        supervisor: false,
        receiveAutonomousWarning: false,
        loginExpiration: null,
        disabled: false,
        unitId: null
      }
    }
  },

  mounted() {
    this.getProductionUnitList()
    this.getUsers()
  },

  methods:{ 
    exit(){
      localStorage.removeItem('Token') 
      window.location.href = 'http://localhost:8080'
    },

    getProductionUnitList(){
      axios
      .get(api + '/getproductionunitlist', {
        headers: {"Authorization": `Bearer ${getToken}`}})
      .then((response) => {  
      this.productionUnitList = response.data.productionUnitList
      })
    },

    getUsers(){ 
      axios
      .get(api + '/getusers', {
        headers: {"Authorization": `Bearer ${getToken}`}})
      .then((response) => {  
      this.usersList = response.data
      })
    },

    saveUser(){
      const param = {
        "id": 0,
        "userName": this.selectedUser.userName,
        "name": this.selectedUser.name,
        "UserPassword": Base64.encode(md5(this.selectedUser.userPassword)),
        "email": this.selectedUser.email,
        "improveTeamMember": false,
        "supervisor": this.selectedUser.supervisor,
        "receiveAutonomousWarning": this.selectedUser.receiveAutonomousWarning,
        "loginExpiration": this.selectedUser.loginExpiration,
        "disabled": this.selectedUser.disabled,
        "system": "G",
        "unitId": this.selectedUser.unitId
      }

      axios
      .post(api + '/saveuser', param, {
        headers: {"Authorization": `Bearer ${getToken}`}})
      .then(() => {  
      console.log(param)
      })
    },

    increaseTokenTime(){
      if(this.selectedUser.loginExpiration < 24){ 
      this.selectedUser.loginExpiration++
      }
    },

    decreaseTokenTime() {
      if(this.selectedUser.loginExpiration > 0) {
        this.selectedUser.loginExpiration--
      }
    }
  }
}

</script>

<style scoped>
body {
  grid-template-rows: 75px 55px 1fr 45px;
  grid-template-areas: 'header' 'menu' 'content' 'footer';
}

menu {
  grid-area: menu;
  background-color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-title {
  margin-left: 15px;
  font-size: 25px;
  color: var(--font-light-color);
}

.exit-button {
  color: var(--dark-color);
  font-size: 25px;
  background: #d6d6d6;
  margin-right: 15px;
  width: 90px;
  padding: 4px;
}

.exit-button:hover {
  background-color: #f5f5f5f5;
}

.form-container {
  max-width: 1000px;
  padding: 20px;
  margin: 30px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 5px;

}

.field {
  flex-basis: 100%; /* Estudar mais sobre */
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.password-input, 
.text-input {
    width: 370px;
}

.unit-select {
  width: 400px;
}

.decrease-token-time,
.increase-token-time{
  color: var(--dark-color);
  background-color: #d6d6d6;
  font-size: 22px;
  width: 20px;
  height: 54px;
}

.token-time-input {
  width: 115px;
  text-align: center;
}

.token-time-input::-webkit-outer-spin-button,
.token-time-input::-webkit-inner-spin-button{
  -webkit-appearance: none;
}

.toggle-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.slider-area {
  background-color: #d6d6d6;
  width: 40px;
  height: 20px;
  border: 2px solid #999999;
  margin-left: 10px;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  transition: all 300ms ease-in-out;
}

.slider-button {
  background-color: #ee7527;
  border: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  pointer-events: none;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: all 300ms ease-in-out;
}

.toggle-input-button {
  display: none;
}

.toggle-input-button:checked ~ .slider-area {
  background-color: #ee7527;
}

.toggle-input-button:checked ~ .slider-area > .slider-button {
  background-color: #ccc;
  left: 23px;
}

.buttons-row {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.form-cancel-button,
.form-submit-button {
    color: var(--font-light-color);
}

.form-cancel-button {
  background-color: #ef2917;
}

.form-cancel-button:hover {
  background-color: #f24f40;
}

.form-submit-button {
  background-color: #008148;
}

.form-submit-button:hover {
    background-color: #00a35a;
}
.users-table-container {
    max-width: 900px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #eef0f2;
    display: flex;
    border-radius: 3px;
    box-shadow: 0px 0px 20px rgba(0.8, 0.8, 0.8, 0.8);
    color: var(--dark-color);
    margin-top: 30px;
    margin-bottom: 30px;
}

.users-table {
  width: 800px;
  font-size: 20px;
  padding: 20px;
  border-collapse: collapse;
  border-spacing: 0;
  border: 2px solid #b8b8b8;
  /* border-bottom: 3px solid #ee7527; */
}

.user-table-head {
  background-color: #b8b8b8;
  height: 40px;
}

.user-table-item {
  height: 40px;
}

td {
  border: 2px solid #b8b8b8;
  padding-left: 3px;
}

.edit-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-user {
  color: var(--font-light-color);
  padding: 5px;
  width: 60px;
  background-color: #ee7527;
}

.edit-user:hover {
  background-color: #F08945;
}
</style>