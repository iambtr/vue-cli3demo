import layout from '@/views/layout'

export default [
    {
        path: '/',
        component: layout,
        children:[
            {
                name:'storeNoPicked',
                path:'/storeNoPicked',
                component: () => import('@/views/storeNoPicked/index')
            }
        ]
    },
]
