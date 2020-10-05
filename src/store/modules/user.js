// import { getToken, setToken, removeToken } from '@/utils/auth'
import { reset } from '@/router'
const DEBUG = false
const state = {
  token: '',
  profile: {
    name: '',
    avatar: ''
  },
  roles: []
}

const mutations = {
  LOGIN: (state, user) => {
    DEBUG && console.log('user.login: %o', user)
    user = user || {}
    state.token = user.token || false
    state.profile = user.jwt || {}
    state.profile.avatar = state.profile.avatar || '/logo.png'
    state.roles = []
    if (state.profile.realm_access) state.roles = state.roles.concat(state.profile.realm_access.roles)
    if (state.profile.resource_access && state.profile.resource_access.access) state.roles = state.roles.concat(state.profile.resource_access.access.roles)
    // resetRouter()
  },
  LOGOUT: (state) => {
    state.token = false
    state.profile = { name: 'Anonymous' }
    console.log('user.logout')
    reset()
  }
}

const actions = {
  // user login
  login({ commit }, user) {
    commit('LOGIN', user)
  },

  refreshToken({ commit }, user) {
    commit('LOGIN', user)
  },

  // get user info
  getModel({ commit, state }) {
    return new Promise((resolve, reject) => {
      return state.profile
    })
  },

  getToken({ commit }) {
    return new Promise((resolve, reject) => {
      state.token ? resolve(state.token) : reject(403)
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    commit('LOGOUT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
