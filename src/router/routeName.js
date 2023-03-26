export default {
    dashboard: () => import('@views/dashboard/dashboard.vue'),
    staffList: () => import('@views/staffList/staffList.vue'),
    leaveManage: () => import('@views/leaveManage/leaveManage.vue'),
    auth: () => import('@views/auth/auth.vue'),
    setting: () => import('@views/setting/setting.vue'),
    addMenuList: () => import('@views/addMenuList/addMenuList.vue'),
    menuList: () => import('@views/menuList/menuList.vue'),
    resume: () => import('@views/resume/resume.vue'),
    docs: () => import('@views/docs/docs.vue'),
}

