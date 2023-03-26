import routeName from './routeName'
export default [
    {
        path: "/login",
        name: "login",
        component: () => import('../views/login/login.vue'),
        meta: {
            title: '登录'
        }
    }
];


export const otherRoutes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/notFound/notFound.vue'),
        meta: {
            title: "404"
        }
    },
]


export const allRoutes = [
    {
        path: "/staff",
        name: "staff",
        meta: {
            title: "成员管理",
            icon: "User",
            index: 2
        },
        children: [{
            path: "/staffList",
            name: "staffList",
            component: routeName.staffList,
            meta: {
                title: "成员列表",
                index: 1
            }
        }, {
            path: "/leaveManage",
            name: "leaveManage",
            component: routeName.leaveManage,
            meta: {
                title: "请假管理",
                index: 3
            }
        },
        {
            path: "/auth",
            name: "auth",
            component: routeName.auth,
            meta: {
                title: "权限管理",
                index: 2
            }
        }
        ]
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: routeName.dashboard,
        meta: {
            title: "仪表盘",
            icon: "Stopwatch",
            index: 1
        }
    },
    {
        path: "/setting",
        name: "setting",
        component: routeName.setting,
        meta: {
            title: "系统设置",
            icon: "setting",
            index: 4
        }
    },
    {
        path: "/menu",
        name: "menu",
        meta: {
            title: "菜单管理",
            icon: "List",
            index: 3
        },
        children: [{
            path: "/addMenuList",
            name: "addMenuList",
            component: routeName.addMenuList,
            meta: {
                title: "添加菜单",
                index: 2
            }
        },
        {
            path: "/menuList",
            name: "menuList",
            component: routeName.menuList,
            meta: {
                title: "菜单列表",
                index: 1
            }
        }]
    },
    {
        path: "/resume",
        name: "resume",
        component: routeName.resume,
        meta: {
            title: "个人简历",
            index: 5,
            icon: "Tickets",
        }
    },
    {
        path: "/docs",
        name: "docs",
        component: routeName.docs,
        meta: {
            title: "开发文档",
            index: 5,
            icon: "Tickets",
        }
    }
]

