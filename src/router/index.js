import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin";
import error from "./error";
import Cookies from "js-cookie";
import { useUserStore } from "../stores/user";

const routes = [...admin, ...error];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const token = Cookies.get("access_token");
  const publicPages = ["/admin-login", "/admin-forgot-password"];

  if (!publicPages.includes(to.path) && !token) {
    return next({ name: "admin-login" });
  }

  if (to.meta.roles && !to.meta.skipPermission) {
    const userRoles = userStore.roles;
    const hasPermission = to.meta.roles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasPermission) {
      return next({ name: "403", query: { from: to.fullPath } });
    }
  }

  next();
});

export default router;
