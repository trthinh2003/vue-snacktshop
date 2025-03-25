const admin = [
  {
    path: "/admin-login",
    name: "admin-login",
    component: () => import("../layouts/backend/admin-login.vue"),
  },
  {
    path: "/admin",
    component: () => import("../layouts/backend/admin.vue"),
    meta: { requiresAuth: true, roles: ["admin", "manager", "employee"] },
    children: [
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("../pages/admin/dashboard/index.vue"),
        meta: { requiresAuth: true, roles: ["admin", "manager", "employee"], skipPermission: true},
      },
      {
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/users/index.vue"),
        meta: { requiresAuth: true, roles: ["admin"] }, 
      },
      {
        path: "roles",
        name: "admin-roles",
        component: () => import("../pages/admin/roles/index.vue"),
        meta: { requiresAuth: true, roles: ["admin"] }, 
      },
      {
        path: "settings",
        name: "admin-settings",
        component: () => import("../pages/admin/settings/index.vue"),
        meta: { requiresAuth: true, roles: ["admin"] }, 
      },
      {
        path: "categories",
        name: "admin-categories",
        component: () => import("../pages/admin/categories/index.vue"),
        meta: { requiresAuth: true, roles: ["admin", "manager", "employee"] },
      },
      {
        path: "products",
        name: "admin-products",
        component: () => import("../pages/admin/products/index.vue"),
        meta: { requiresAuth: true, roles: ["admin", "manager", "employee"] },
      },
    ],
  }
];

export default admin;
