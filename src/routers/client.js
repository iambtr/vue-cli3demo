import layout from '@/views/layout'

export default [
    {
        path: '/',
        component: layout,
        children: [
            {
                name: 'client',
                path: '/client',
                component: () => import('@/views/client/index')
            }
        ],
    },
    {
        path: '/clientInfo',
        name: 'clientInfo',
        component: () => import('@/views/client/info/index')
    },
    {
        path: '/skuList',
        name: 'skuList',
        component: () => import('@/views/client/info/skuList')
    },
    {
        path: '/orderList',
        name: 'orderList',
        component: () => import('@/views/client/info/orderList')
    }
]
