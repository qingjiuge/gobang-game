import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Routers'
import { createPinia } from 'pinia'
import directive from "./Directives/index";
const app = createApp(App);
app.use(router);
app.use(directive)
app.use(createPinia());
app.mount('#app');
