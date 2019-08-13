import layout from '@/views/layout'

export default [
    {
        path: '/',
        component: layout,
        children: [
            {
                name: 'my',
                path: '/my',
                component: () => import('@/views/my/index')
            },
        ]
    },
    {
        name: 'storeNoPicked',
        path: '/my/storeNoPicked',
        component: () => import('@/views/my/storeNoPicked/index')
    },
    {
        name: 'storePicked',
        path: '/my/storePicked',
        component: () => import('@/views/my/storePicked/index')
    },
    {
        name: 'storePickedPedding',
        path: '/my/storePickedPedding',
        component: () => import('@/views/my/storePickedPedding/index')
    },
]
