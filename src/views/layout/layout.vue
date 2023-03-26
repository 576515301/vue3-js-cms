<template>
    <div class="common-layout">
        <el-container class="common-layout-container">
            <el-aside class="common-layout-aside" width="200px">
                <div class="sysName">XXXX后台管理系统</div>
                <div class="menu">
                    <Menu :menuList="userStore.menuList"></Menu>
                </div>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  

<script setup>
import Menu from "@components/menu/menu.vue";
import Header from "@components/header/header.vue";
import { useUser } from "@store/userStore";
const userStore = useUser();


</script>

<style lang='scss' scoped>
.common-layout,
.common-layout-container {
    width: 100%;
    height: 100%;

    .common-layout-aside {
        position: relative;
        background: #545c64;

        .sysName {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: #fff;
        }

        .menu {
            height: 100%;
            padding-top: 60px;
        }
    }

    .el-header {
        border-bottom: 1px solid #dedede;

    }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>