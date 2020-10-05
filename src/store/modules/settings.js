import variables from '@/styles/element-variables.scss'
// import defaultSettings from '@/settings'

// const { showSettings, tagsView, fixedHeader, logo } = defaultSettings

const state = {
  title: 'Untitled',
  logo: '/logo.png',
  theme: variables.theme,
  showSettings: true,
  tagsView: true,
  baseURL: '/',
  fixedHeader: true,
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_SETTINGS: (state, data) => {
    console.log('change.settings: %o', data)
    for (const k in data) {
      state[k] = data[k]
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeSettings({ commit }, data) {
    commit('CHANGE_SETTINGS', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

