import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SupervisionPage from '../views/SupervisionPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/supervision',
      name: 'supervision',
      component: SupervisionPage,
    },
  ],
})

export default router
