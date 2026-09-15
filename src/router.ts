import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import ProjectsView from "./views/ProjectsView.vue";
import CertificateView from "./views/CertificateView.vue";
import CredentialDocumentView from "./views/CredentialDocumentView.vue";
import AboutView from "./views/AboutView.vue";
import { credentials } from "./data/credentials";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/projects", name: "projects", component: ProjectsView },
    { path: "/about", name: "about", component: AboutView },
    {
      path: "/certificates",
      children: [
        { path: "", name: "certificates", component: CertificateView },
        {
          path: ":credentialId",
          name: "credential-document",
          component: CredentialDocumentView,
          props: true,
          meta: { headerVariant: "certificates" },
          beforeEnter: to => credentials.some(credential => credential.id === to.params.credentialId)
            ? true
            : { name: "certificates" },
        },
      ],
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
});
