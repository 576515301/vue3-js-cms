<template>
    <el-scrollbar class="menu-scroll">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="menu" :default-active="menuItemActive" text-color="#fff">
            <MenuItem :menuList="menuList">
            </MenuItem>
        </el-menu>
    </el-scrollbar>
</template>

<script setup>
import MenuItem from './menuItem.vue'
import { ref, watch } from 'vue'
import Router from "@router/router"

// import { menuSort } from '../../utils/utils';
// const state = reactive({
//     menuList: []
// })
// const arr = [
//     {
//         path: "/dashboard",
//         name: "dashboard",
//         meta: {
//             title: "仪表盘",
//             icon: "Stopwatch",
//             index: 4
//         }
//     },
//     {
//         path: "/staff",
//         name: "staff",
//         meta: {
//             title: "成员管理",
//             icon: "User",
//             index: 2
//         },
//         children: [
//             {
//                 path: "/addUser",
//                 name: "addUser",
//                 meta: {
//                     title: "添加成员",
//                     index: 3
//                 }
//             },
//             {
//                 path: "/leaveManage",
//                 name: "leaveManage",
//                 meta: {
//                     title: "请假管理",
//                     index: 2
//                 }
//             },
//             {
//                 path: "/auth",
//                 name: "auth",
//                 meta: {
//                     title: "权限管理",
//                     index: 1
//                 }
//             }
//         ]
//     },
//     {
//         path: "/setting",
//         name: "setting",
//         meta: {
//             title: "系统设置",
//             icon: "setting",
//             index: 3
//         }
//     },
//     {
//         path: "/menu",
//         name: "menu",
//         meta: {
//             title: "菜单管理",
//             icon: "List",
//             index: 1
//         },
//         children: [
//             {
//                 path: "/addList",
//                 name: "addList",
//                 meta: {
//                     title: "添加菜单",
//                     index: 1
//                 }
//             },
//             {
//                 path: "/menuList",
//                 name: "addUser",
//                 meta: {
//                     title: "菜单列表",
//                     index: 2
//                 }
//             }
//         ]
//     },
// ]

// onMounted(() => {
//     state.menuList = menuSort(arr)
// })

const { menuList } = defineProps({
    menuList: {
        type: Array,
        default: []
    }
})
const menuItemActive = ref("");

watch(() => Router.currentRoute.value.path, (n, o) => {
    menuItemActive.value = n;
}, { immediate: true })


</script>

<style lang='scss' scoped>
.menu-scroll,
.menu {
    width: 100%;
    height: 100%;
    border: 0;
}
</style>