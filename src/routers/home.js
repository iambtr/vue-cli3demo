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
            }
        ]
    },
]
