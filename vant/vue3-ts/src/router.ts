import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'ddk'
    }
  },
  {
    name: '',
    path: '/',
    redirect: {
      name: 'ddk'
    }
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/view/user/index.vue'),
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('@/view/cart/index.vue'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods',
    path: '/goods',
    component: () => import('@/view/goods/index.vue'),
    meta: {
      title: '商品详情'
    }
  },
  {
    name: 'ddk',
    path: '/ddk',
    component: () => import('@/view/ddk/index.vue'),
    meta: {
      title: 'ddk商品转链'
    }
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/view/home/index.vue'),
    meta: {
      title: '首页'
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()//createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title
  if (title) {
    document.title = title as string
  }
  next()
})

export default router
