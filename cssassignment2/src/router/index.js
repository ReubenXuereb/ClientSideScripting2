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
    path: '/viewMember/:uID',
    name: 'VieMember',
    component: () => import('../components/ViewMember.vue')
  },
  {
    path: '/viewAll',
    name: 'ViewAll',
    component: () => import('../components/ViewAll.vue')
  },
  {
    path: '/updateMember/:uID',
    name: 'UpdateMember',
    component: () => import('../components/UpdateMember.vue')
  },
  {
    path: '/deleteMember/:uID',
    name: 'DeleteMember',
    component: () => import('../components/DeleteMember.vue')
  },
  {
    path: '/deleteCar/:uID',
    name: 'DeleteCar',
    component: () => import('../components/DeleteCar.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
