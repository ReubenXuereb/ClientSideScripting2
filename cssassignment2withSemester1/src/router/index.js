import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue')
  },
  {
    path: '/home/:uID',
    name: 'Home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/addCar/:uID',
    name: 'AddCar',
    component: () => import('../components/AddCar.vue')
  },
  {
    path: '/viewMembers/:uID',
    name: 'VieMembers',
    component: () => import('../components/ViewMembers.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
