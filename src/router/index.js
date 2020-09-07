import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import home from './modules/home'

const router = new Router({
    // mode: 'history',
    routes: [
        ...home,
       
    ]
})
export default router;
