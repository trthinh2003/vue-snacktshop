const admin = [
  {
    path: "/admin-login",
    name: "admin-login",
    component: () => import("../layouts/backend/admin-login.vue"),
  },
  {
    path: "/admin",
    component: () => import("../layouts/backend/admin.vue"),
    meta: { requiresAuth: true, roles: ["admin", "manager", "saler", "warehouse"] },
    children: [
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("../pages/admin/dashboard/index.vue"),
        meta: { requiresAuth: true, roles: ["admin", "manager", "saler", "warehouse"], skipPermission: true},
      },
      {
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/users/index.vue"),
        meta: { requiresAuth: true, roles: ["admin", "manager"] },
        children: [
          {
            path: "create",
            name: "admin-users-create",
            component: () => import("../pages/admin/users/create.vue"),
            meta: { requiresAuth: true, roles: ["admin", "manager"] },
          },
          {
            path: ":id/edit",
            name: "admin-users-edit",
            component: () => import("../pages/admin/users/edit.vue"),
            meta: { requiresAuth: true, roles: ["admin", "manager"] },
          },
        ]
      },
      {
        path: "categories",
        name: "admin-categories",
        component: () => import("../pages/admin/categories/index.vue"),
        meta: { requiresAuth: true, roles: ["admin", "manager", "saler"] },
      },
      {
        path: "products",
        name: "admin-products",
        component: () => import("../pages/admin/products/index.vue"),
        meta: { requiresAuth: true, roles: ["admin", "manager", "saler"] },
      },
      {
        path: "imports",
        name: "admin-imports",
        component: () => import("../pages/admin/imports/index.vue"),
        meta: { requiresAuth: true, roles: ["admin", "manager", "warehouse"] },
      },
      {
        path: "suppliers",
        name: "admin-suppliers",
        component: () => import("../pages/admin/suppliers/index.vue"),
        meta: { requiresAuth: true, roles: ["admin", "manager", "warehouse"] },
      },
    ],
  }
];

export default admin;
