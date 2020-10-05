import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const autoRequired = require.context('./modules', true, /\.js$/)

// auto-require all vuex modules from './modules/'`
const modules = autoRequired.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const required = autoRequired(modulePath)
  modules[moduleName] = required.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
