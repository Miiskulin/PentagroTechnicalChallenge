import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView'
import UserManagement from '../views/UserManagement'

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        component: LoginView,
        meta: {
            title: 'Login'
        },
        beforeEnter: function (to, from, next) {
            document.title = to.meta.title
            next()
        }
    },
    { 
        path: '/usermanagement', 
        component: UserManagement,
        meta: {
            title: 'Gestão de usuários'
        },
        beforeEnter: function (to, from, next) {
            if (localStorage.getItem('Token')) {
                document.title = to.meta.title
                next()
            } else {
                document.title = to.meta.title
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