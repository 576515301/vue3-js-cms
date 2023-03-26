import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import routerBeforEach from "./navigationGuard"

const Router = createRouter({
    history: createWebHashHistory(),
    routes
});

Router.beforeEach(routerBeforEach(Router))


export default Router