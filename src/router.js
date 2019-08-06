import Vue from 'vue'
import Router from 'vue-router'
import home from './routers/home'
import client from './routers/client'
import performance from './routers/performance'
import my from './routers/my'
import storeNoPicked from './routers/storeNoPicked'
import storePicked from './routers/storePicked'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/login',
            name:'login',
            component:()=>import('./views/login')
        },
        ...home,
        ...client,
        ...performance,
        ...my,
        ...storeNoPicked,
        ...storePicked,
    ]
})
