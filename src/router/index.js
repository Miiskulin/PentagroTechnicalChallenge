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
        beforeEnter: function (to, from, next) {
            if (localStorage.getItem('Token')) {
                next();
            } else {
                alert('Você precisa estar logado para acessar essa página.');
                next('/');
            }
        }
    }
]


const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router