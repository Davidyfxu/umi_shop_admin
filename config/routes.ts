export default [
    {
        path: '/',
        component: '../layouts/BlankLayout',
        routes: [
            {
                path: '/user',
                component: '../layouts/UserLayout',
                routes: [
                    {
                        name: 'login',
                        path: '/user/login',
                        component: './User/login',
                    },
                ],
            },
            {
                path: '/',
                component: '../layouts/SecurityLayout',
                routes: [
                    {
                        path: '/',
                        component: '../layouts/BasicLayout',
                        authority: ['admin', 'user'],
                        routes: [
                            {
                                path: '/admin',
                                name: 'admin',
                                icon: 'crown',
                                component: './Admin',
                                authority: ['admin'],
                            },

                            {
                                component: './404',
                            },
                        ],
                    },
                    {
                        component: './404',
                    },
                ],
            },
        ],
    },
    {
        component: './404',
    },
];
