import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin";
import error from "./error";
import Cookies from "js-cookie";
import axiosInstance from "@/configs/axios";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

const routes = [...admin, ...error];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = Cookies.get("access_token");
  const publicPages = ["/admin-login", "/admin-forgot-password", "/"];

  if (publicPages.includes(to.path)) {
    return next();
  }

  if (!token) {
    await Swal.fire({
      title: "Phiên đăng nhập đã hết hạn!",
      text: "Vui lòng đăng nhập lại.",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return next({ name: "admin-login" });
  }

  if (token && (!userStore.roles || userStore.roles.length === 0)) {
    try {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      const response = await axiosInstance.post("/auth/me");
      userStore.setRoles(response.data.roles || []);
    } catch (err) {
      console.log("Token hết hạn hoặc lỗi => về login", err);
      Cookies.remove("access_token");

      await Swal.fire({
        title: "Phiên đăng nhập đã hết hạn!",
        text: "Vui lòng đăng nhập lại.",
        icon: "warning",
        confirmButtonText: "OK",
      });

      return next({ name: "admin-login" });
    }
  }

  if (to.meta.roles && !to.meta.skipPermission) {
    const hasPermission = to.meta.roles.some((role) =>
      userStore.roles.includes(role)
    );
    if (!hasPermission) {
      return next({ name: "403", query: { from: to.fullPath } });
    }
  }

  next();
});

export default router;
