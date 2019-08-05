import layout from '@/views/layout'

export default [
    {
        path: '/',
        component: layout,
        children:[
            {
                name:'my',
                path:'/my',
                component: () => import('@/views/my/index')
            }
        ]
    },
]
