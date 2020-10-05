import routing from '@/utils/routing'
import store from '@/store'
import router from '@/router'
// import { resetRouter } from '../../router'
import views from '@/views'

const state = {
  // roles: [],
  routes: [],
  previous: []
}

const mutations = {
  SET_ROUTES: (state, raw_routes) => {
    const features = store.state.app.features
    const app_routes = routing.defaults(raw_routes)
    const allowed_routes = routing.featured(app_routes, features)
    const routes = routing.components(allowed_routes, views)

    console.log('routes.changed: %o -> %o', routes, features)
    // router.resetRouter()
    router.addRoutes(routes)

    state.previous = state.routes
    state.routes = routes
  }
}

const actions = {
  changeRoutes({ commit }, routes) {
    commit('SET_ROUTES', routes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
