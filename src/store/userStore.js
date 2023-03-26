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
                    let menuList = res.privateRoutes
                    if (config.allRoutes && config.env !== "production") menuList = allRoutes

                    // 排序
                    this.menuList = menuSort(getMenuList(menuList, routeName))
                    resolve(this.menuList);
                }).catch(err => {
                    reject(err);
                });
            })

        }
    }
})

