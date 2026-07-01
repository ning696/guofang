import { createRouter, createWebHistory } from 'vue-router'
import CategoryManagementPage from '../views/CategoryManagementPage.vue'
import ClassroomPatrolLivePage from '../views/ClassroomPatrolLivePage.vue'
import ClassroomPatrolPage from '../views/ClassroomPatrolPage.vue'
import HomePage from '../views/HomePage.vue'
import IndicatorManagementPage from '../views/IndicatorManagementPage.vue'
import EvaluationReportPage from '../views/EvaluationReportPage.vue'
import SupervisionPage from '../views/SupervisionPage.vue'
import TemplateManagementPage from '../views/TemplateManagementPage.vue'

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
    {
      path: '/classroom-patrol',
      name: 'classroom-patrol',
      component: ClassroomPatrolPage,
    },
    {
      path: '/template-management',
      name: 'template-management',
      component: TemplateManagementPage,
    },
    {
      path: '/category-management',
      name: 'category-management',
      component: CategoryManagementPage,
    },
    {
      path: '/indicator-management',
      name: 'indicator-management',
      component: IndicatorManagementPage,
    },
    {
      path: '/evaluation-report',
      name: 'evaluation-report',
      component: EvaluationReportPage,
    },
    {
      path: '/classroom-patrol/:room/live',
      name: 'classroom-patrol-live',
      component: ClassroomPatrolLivePage,
    },
  ],
})

export default router
