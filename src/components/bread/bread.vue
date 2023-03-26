<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in state.breadcrumb" :key="item.name">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
const Router = useRouter();

const state = reactive({
    breadcrumb:[]
})

watch(() => Router.currentRoute.value.path, (n, o) => {
    state.breadcrumb = Router.currentRoute.value.matched;
}, { immediate: true })
</script>

<style lang='scss' scoped></style>