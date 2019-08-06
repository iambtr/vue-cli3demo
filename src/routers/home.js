import layout from '@/views/layout'
export default [
    {
        path: '/',
        component: layout,
        redirect:'/home',
        children:[
            {
                name:'home',
                path:'/home',
                component: () => import('@/views/home/index')
            },

        ]
    },
    {
        name:'newUserReview',
        path:'/newUserReview',
        component: () => import('@/views/home/newUser')
    },
    {
        name:'visitList',
        path:'/visitList',
        component: () => import('@/views/home/visitList')
    },
    {
        name:'location',
        path:'/location',
        component: () => import('@/views/home/location')
    }
]
