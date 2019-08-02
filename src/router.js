import Vue from 'vue'
import Router from 'vue-router'
import index from './views/Home.vue'
import home from './routers/home'
import client from './routers/client'
import performance from './routers/performance'
import my from './routers/my'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: index
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
        },
        ...home,
        ...client,
        ...performance,
        ...my,
    ]
})
