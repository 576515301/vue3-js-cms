<template>
    <template v-for="item in menuList">
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
            <template #title>
                <el-icon>
                    <component :is="item.meta && item.meta.icon" />
                </el-icon>
                <span>{{ item.meta && item.meta.title }}</span>
            </template>
            <menuItem :menuList="item.children">
            </menuItem>
        </el-sub-menu>
        <el-menu-item :index="item.path" @click="handleGoToPage(item.path)" v-else>
            <el-icon>
                <component :is="item.meta && item.meta.icon" />
            </el-icon>
            <span>{{ item.meta && item.meta.title }}</span>
        </el-menu-item>
    </template>
</template>

<script setup>
import { useRouter } from "vue-router";
const Router = useRouter();
const { menuList } = defineProps({
    menuList: Array,
    default: []
})
const handleGoToPage = (path) => {
    Router.push(path)
}



</script>

<style lang='scss' scoped></style>