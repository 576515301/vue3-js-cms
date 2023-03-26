import { defineStore } from "pinia";
import { getUserInfo } from "@api/user/user"
import routeName from "@router/routeName"
import { getMenuList, menuSort } from "../utils/utils";
import config from "@config/config";
import { allRoutes } from "@router/routes";

export const useUser = defineStore("user", {
    state() {
        return {
            userInfo: {},
            menuList: [],
        }
    },
    getters: {
        hasUserInfo(state) {
            return state.userInfo && Object.keys(state.userInfo).length > 0;
        }
    },
    actions: {
        getUserInfo() {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    this.userInfo = res;
                    // 是否使用本地路由(开始)
                    let menuList = [];
                    if (config.allRoutes) menuList = allRoutes
                    else menuList = res.privateRoutes
                    if (config.env === "production") menuList = menuList
                    // 是否使用本地路由(结束)
                    this.menuList = menuSort(getMenuList(menuList, routeName))
                    resolve(this.menuList);
                }).catch(err => {
                    reject(err);
                });
            })

        }
    }
})

