import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css

import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'

import store from '@/store'
import router from '@/router'
import routing from '@/utils/routing'
import vars from '@/utils/vars'
import { oauth, guard } from '@/utils/oauth'
import { getConfig as bootstrap } from '@/api/bootstrap'
import i18n from '@/lang' // internationalization
import views from '@/views' // view component lookups

import './icons' // icon
import * as filters from '@/filters' // global filters
import VModal from 'vue-js-modal'
import catch_logs from '@/utils/pretty-logs' // error log

import AppComponent from './App'

const boot = function(appComponent) {
  appComponent = appComponent || AppComponent

  // locale: { el: i18n.messages.en.el },
  Vue.use(Element, { locale: i18n.messages.en, size: Cookies.get('size') || 'medium' })
  Vue.use(VModal)

  // register global utility filters
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })

  Vue.config.productionTip = false

  const config_url = process.env.VUE_APP_BOOT_API
  if (!config_url) throw new Error('ENV missing "VUE_APP_BOOT_API"')

  const DEBUG = false
  // initialize keycloak
  DEBUG && console.log('oauth.init')

  oauth({}).then((kc) => {
    DEBUG && console.log('oauth.ok: %o', kc)

    // load app config
    DEBUG && console.log('config.from: %o', config_url)
    bootstrap(config_url).then(async config => {
      await vars.deref(config) // resolve all $ref pointers
      console.log('config.loaded: %o', config)

      await store.dispatch('settings/changeSettings', config.settings || {})
      catch_logs(config.settings)

      // features used to conditionally show/hide menu items
      await store.dispatch('app/setFeatures', config.features)

      // setup the router
      await store.dispatch('routing/changeRoutes', config.routes) // attach routes - also resolves view components
      routing.transitions(store, router) // progress & page title
      router.beforeEach(guard(router)) // protect our routes based on meta.roles

      DEBUG && console.log('vue.router: %o', router)

      // render our app
      new Vue({
        el: '#app',
        router,
        store,
        i18n,
        render: v => v(appComponent)
      })
    }).catch(err => {
      console.log('config.error: %o', err)
    })
  }).catch(error => {
    console.log('oauth.error: %o', error)
  })
}

export { boot, views }
