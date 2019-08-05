import layout from '@/views/layout'

export default [
    {
        path: '/',
        component: layout,
        children:[
            {
                name:'performance',
                path:'/performance',
                component: () => import('@/views/performance/index')
            }
        ]
    },
]
