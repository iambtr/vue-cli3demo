import layout from '@/views/layout'

export default [
    {
        path: '/',
        component: layout,
        children:[
            {
                name:'storePicked',
                path:'/storePicked',
                component: () => import('@/views/storePicked/index')
            }
        ]
    },
]
