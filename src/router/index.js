import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView'
import UserManagement from '../views/UserManagement'

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        component: LoginView 
    },
    { 
        path: '/usermanagement', 
        component: UserManagement
    },
]


const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router