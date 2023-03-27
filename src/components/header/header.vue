<template>
    <div class="header wh100">
        <Bread></Bread>
        <div class="user">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    sslc
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="exit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import storage from "@utils/storage";
import Router from "@router/router";
import Bread from '@components/bread/bread.vue'

const commandFunc = {
    exit: (type) => {
        storage.clear();
        Router.replace("/login");
    }
}

const handleCommand = type => {
    commandFunc[type](type);
}

</script>

<style lang='scss' scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }
}
</style>