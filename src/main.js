import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import './assets/style/normalize.css'
import './assets/style/base.css'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key === "Menu" ? "ownMenu" : key, component)
}

app
    .use(Router)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app')
