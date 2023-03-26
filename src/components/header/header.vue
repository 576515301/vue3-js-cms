<template>
    <div class="header wh100">
        <Bread></Bread>
        <div class="user">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    Dropdown List
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="a">Action 1</el-dropdown-item>
                        <el-dropdown-item command="b">Action 2</el-dropdown-item>
                        <el-dropdown-item command="c">Action 3</el-dropdown-item>
                        <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import Bread from '@components/bread/bread.vue'

const handleCommand = type => {
    ElMessage.success(type)
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