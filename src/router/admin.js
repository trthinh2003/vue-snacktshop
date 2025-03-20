const admin = [
    {
        path: '/admin-login',
        name: 'admin-login',
        component: () => import('../layouts/backend/admin-login.vue')
    },
    {
        path: '/admin',
        component: () => import('../layouts/backend/admin.vue'),
        children: [
            {
                path: 'users',
                name: 'admin-users',
                component: () => import('../pages/admin/users/index.vue')
            },
            {
                path: 'roles',
                name: 'admin-roles',
                component: () => import('../pages/admin/roles/index.vue')
            },
            {
                path: 'settings',
                name: 'admin-settings',
                component: () => import('../pages/admin/settings/index.vue')
            },
            {
                path: 'categories',
                name: 'admin-categories',
                component: () => import('../pages/admin/categories/index.vue')
            }
        ]
    },
];

export default admin;