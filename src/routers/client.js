import layout from '@/views/layout'
export default [
    {
        path: '/',
        component: layout,
        children:[
            {
                name:'client',
                path:'/client',
                component: () => import('@/views/client/index')
            }
        ]
    },
]
