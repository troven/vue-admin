import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
import routing from '@/utils/routing'
Vue.use(Router)

function createRouter() {
  return new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: []
  })
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export async function reset() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  router.routes = routing.defaults([]) // reset routes
}
export default router
