import { createRouter, createWebHistory } from 'vue-router';
import FromPage from '../views/FromPage.vue';
import ToPage from '../views/ToPage.vue';
import IntegrationPage from '../views/IntegrationPage.vue';

const routes = [
  {
    path: '/',
    name: 'From',
    component: FromPage
  },
  {
    path: '/to',
    name: 'To',
    component: ToPage
  },
  { path: '/integration',
    name: 'Integration',
    component: IntegrationPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
