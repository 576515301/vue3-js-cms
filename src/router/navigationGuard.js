import storage from "@utils/storage";
import { useUser } from "@store/userStore"
import { getRedirectPath } from "../utils/utils";
import { ElLoading } from "element-plus";
import { otherRoutes } from "./routes";
export default function routerBeforEach(Router) {
    return async function guard(to, from, next) {
        const token = storage.getItem("token");
        const userStore = useUser();
        const isToLogin = to.path === "/login"
        if (token) {
            if (!userStore.hasUserInfo) {
                try {
                    const loadingInstance = ElLoading.service({ fullscreen: true });
                    const ownRoutes = await userStore.getUserInfo();
                    loadingInstance.close();

                    const redirect = getRedirectPath(ownRoutes)
                    const layout = {
                        path: "/",
                        redirect,
                        name: "layout",
                        component: () => import('@views/layout/layout.vue'),
                        meta: {
                            title: "首页",
                            icon: "",
                            index: 1
                        },
                        children: ownRoutes,
                    }
                    Router.addRoute(layout);
                    otherRoutes.map(item => {
                        Router.addRoute(item);
                    })
                    Router.replace(to.fullPath)
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }
            if (isToLogin) {
                next("/")
            } else {
                next();
            }
        } else {
            if (isToLogin) {
                next()
            } else {
                next("/login");
            }
        }
    }
}