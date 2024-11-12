import { createRouter, createWebHistory } from "vue-router";
import FromPage from "../views/FromPage.vue";
import ToPage from "../views/ToPage.vue";
import IntegrationPage from "../views/IntegrationPage.vue";

const routes = [
  { path: "/", component: FromPage },
  { path: "/to", component: ToPage },
  { path: "/integration", component: IntegrationPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
