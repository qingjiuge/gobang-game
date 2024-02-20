
import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'
import HomeVue  from '../pages/Home.vue';
const routes:Array<RouteRecordRaw>=[
    {
        path:'/',
        component:HomeVue
    }
]
const router=createRouter({
    history:createWebHistory('/gobang-game/'),
    routes:routes //在后面添加
})
export default router