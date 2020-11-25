import Vue from 'vue'
import VueRouter from 'vue-router'
// import auth from '../plugins/auth'
import { firebase } from '@firebase/app'
import '@firebase/auth'
/**
 * Vistas
 */
import Home from '../views/Home.vue'
import Conocenos from '../views/Conocenos.vue'
import Apoyanos from '../views/Apoyanos.vue'
import Blog from '../views/Blog.vue'
import Calendario from '../views/Calendario.vue'
import NuestroImpacto from '../views/NuestroImpacto.vue'
import NuestrosAliados from '../views/NuestrosAliados.vue'
import Tutoriales from '../views/Tutoriales.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/admin/Dashboard'
import Tutorials from '../views/admin/Tutorials'

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/conocenos',
    name: 'Conocenos',
    component: Conocenos
  },
  {
    path: '/apoyanos',
    name: 'Apoyanos',
    component: Apoyanos
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/calendario',
    name: 'Calendario',
    component: Calendario
  },
  {
    path: '/nuestro-impacto',
    name: 'Nuestro Impacto',
    component: NuestroImpacto
  },
  {
    path: '/nuestros-aliados',
    name: 'Nuestros Aliados',
    component: NuestrosAliados
  },
  {
    path: '/tutoriales',
    name: 'Tutoriales',
    component: Tutoriales
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/tutorials',
    name: 'Tutorials',
    component: Tutorials,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

/**
 * Método ejecutado antes de entrar a cualquier ruta de la página
 * Nota: Falta validacion del token con backend cada que se invoca
 */
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requiresAuth && !isAuthenticated){
    next('/login');
  }
  else {
    next();
  }
});




// router.beforeEach((to, from, next) => {
//   let userToken = auth.getToken(); // TODO cambiar por funcion que obtenga autenticacion
//   let authRequired = to.matched.some(record => record.meta.auth);

//   if(authRequired && !userToken){
//     next('login');
//   }
//   else if(userToken && to.name == 'Login'){
//     next('/');
//   }
//   else {
//     next();
//   }
// })

export default router
