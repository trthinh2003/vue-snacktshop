const error = [
    {
        path: "/403",
        name: "403",
        component: () => import("../pages/errors/403.vue"),
    },
    {
        path: "/404",
        name: "404",
        component: () => import("../pages/errors/404.vue"),
    },
    {
        path: "/500",
        name: "500",
        component: () => import("../pages/errors/500.vue"),
    },
];

export default error;