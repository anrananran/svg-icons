import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/some/icons')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error/Error')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default new Router({
  routes: constantRoutes
})
