import VueKeyCloak from '@/utils/keycloak'
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

export { tokenInterceptor, guard, oauth, authorize_path, authorize_claims }
const DEBUG = false

/**
 * setup Keycloak authentication
 *
 * @param {*} options
 */
const oauth = function(options) {
  return new Promise((resolve, reject) => {
    const settings = {
      config: {
        realm: process.env.VUE_APP_REALM,
        url: process.env.VUE_APP_AUTH_URL,
        clientId: process.env.VUE_APP_CLIENT_ID,
        logoutRedirectUri: '/logout' // process.env.VUE_APP_LOGOUT_URL ||
      },
      init: {
        onLoad: 'check-sso', // 'login-required' ||
        checkLoginIframe: true,
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
      },
      logout: {
        redirectUri: '/'
      },
      onAuthSuccess: kc => {
        DEBUG && console.log('onAuthSuccess: %o', kc)
        store.dispatch('user/login', { token: kc.token, jwt: kc.tokenParsed })
      },
      onAuthRefreshSuccess: kc => {
        DEBUG && console.log('onAuthRefreshSuccess: %o', kc)
      },
      onReady: kc => {
        DEBUG && console.log('onReady: %o', kc)
        store.dispatch('user/login', { token: kc.token, jwt: kc.tokenParsed })
        resolve(kc)
      },
      onInitError: err => {
        DEBUG && console.log('onInitError: %o', err)
        reject(err)
      }
    }

    Vue.use(VueKeyCloak, settings)
  })
}

const tokenInterceptor = function() {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
    return config
  }, error => {
    return Promise.reject(error)
  })
}

const authorize_path = function(roles, path) {
  let allowed = false
  // roles that with leading `/` are inferred to authorize paths
  roles.forEach(role => {
    if (role.startsWith('/')) {
      const _role = role.replace('/', '\/')
      const re = new RegExp(_role)
      if (re.test(path)) allowed = true
    }
  })
  return allowed
}

const authorize_claims = function(jwt_claims, guard_claims) {
  if (!guard_claims) return true
  let allowed = false
  // allowed, if ANY guard claim is present
  guard_claims.forEach(claim => {
    allowed = allowed || jwt_claims.indexOf(claim) >= 0
  })
  // DEBUG && console.log('oauth.allowed: %o -> %o -> %o', allowed, guard_claims, jwt_claims)
  return allowed
}

const guard = function(router) {
  // return our oauth router guard
  return (to, from, next) => {
    // does route have a meta.guard
    const route_protected = to.matched.some(record => {
      DEBUG && console.log('oauth.route: %o', record)
      return record.meta.guard
    })

    if (!route_protected) {
      DEBUG && console.log('oauth.public: %o', to)
      next()
      return
    }

    DEBUG && console.log('oauth.protected: %o --> %o', to, route_protected)
    const authenticated = router.app.$keycloak.authenticated
    let authorized = !route_protected // deny access until authorized

    if (route_protected && authenticated) {
      const jwt = router.app.$keycloak.tokenParsed
      const realm_roles = jwt.realm_access.roles
      if (typeof route_protected === 'string') {
        authorized = authorize_path(realm_roles, to.path)
        DEBUG && console.log('guard.path: %o -> %o == %o', authorized, to.meta.guard, realm_roles)
      } else {
        authorized = authorize_claims(realm_roles, to.meta.guard)
        DEBUG && console.log('guard.claim: %o -> %o == %o', authorized, to.meta.guard, realm_roles)
      }
    }

    if (!authenticated) {
      const loginUrl = router.app.$keycloak.createLoginUrl()
      DEBUG && console.log('guard.login: %o', loginUrl)
      window.location.replace(loginUrl)
    } else if (authorized) {
      next()
    } else {
      DEBUG && console.log('guard.denied: %o', to.path)
      next(`/403`)
    }
  }
}
