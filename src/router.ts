import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import ProjectsView from "./views/ProjectsView.vue";
import GoalsView from "./views/GoalsView.vue";
import AboutView from "./views/AboutView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/projects", name: "projects", component: ProjectsView },
    { path: "/goals", name: "goals", component: GoalsView },
    { path: "/about", name: "about", component: AboutView },
  ],
  scrollBehavior: () => ({ top: 0 }),
});
