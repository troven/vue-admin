import path from 'path'
import getPageTitle from '@/utils/get-page-title'
import NProgress from 'nprogress' // progress bar

const DEBUG = false

const routing = {

  defaults(routes) {
    let _routes = [{
      path: '/401',
      component: () => import('@/views/error-page/401'),
      hidden: true
    }, {
      path: '/404',
      component: () => import('@/views/error-page/404'),
      hidden: true
    },
    {
      path: '/403',
      component: () => import('@/views/error-page/403'),
      hidden: true
    }]

    _routes = _routes.concat(routes)

    _routes.push({ path: '*', redirect: '/404', hidden: true })
    return _routes
  },

  /**
   * Use views to resolve named components for each route
   * @param {*} routes
   * @param {*} views
   */
  components(routes, views) {
    const allowed = []
    views = views || {}

    routes.forEach(route => {
      const _route = route
      _route.component = _route.component || ''
      if (typeof _route.component === 'string') {
        let view_name = _route.component
        if (view_name && view_name.indexOf('/') < 0) view_name = 'views/' + view_name
        // console.log('routing.comp: %o -> %o', _route.path, view_name)
        const _view = views[view_name] || function() { return import('/' + view_name) }
        if (_view) {
          // console.log('view.found: %o --> %o --> %o', typeof _route.component, _route.component, _view)
          _route.component = _view
        } else {
          // console.log('view.missing: %o', view_name)
          throw new Error('view.missing: ' + view_name)
        }
      }

      if (_route.children) {
        _route.children = this.components(_route.children, views)
      }
      allowed.push(_route)
    })

    return allowed
  },

  /**
 * Use meta.role to determine if the current user has feature
 * @param roles
 * @param route
 */
  has_feature(roles, route, meta_roles) {
    if (!roles) return true
    if (route.meta && route.meta[meta_roles]) {
      return roles.some(role => route.meta[meta_roles].includes(role))
    } else {
      return true
    }
  },

  /**
 * Filter permitted routes by recursion
 * @param routes Routes
 * @param roles
 */

  featured(features, roles) {
    const allowed = []

    features.forEach(feature => {
      const _feature = { ...feature }
      if (this.has_feature(roles, _feature, 'features')) {
        if (_feature.children) {
          _feature.children = this.featured(_feature.children, roles)
        }
        allowed.push(_feature)
      }
    })

    return allowed
  },

  // reference: src/view/layout/components/Sidebar/SidebarItem.vue
  _onlyOneShowingChild(children = [], parent) {
    let onlyOneChild = null
    const showingChildren = children.filter(item => !item.hidden)
    if (showingChildren.length > 1) return false

    // When there is only one child route, the child route is displayed by default
    if (showingChildren.length === 1) {
      onlyOneChild = showingChildren[0]
      // console.log('onlyOneChild: %o --> %o', parent.path, onlyOneChild.path)
      onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
      return onlyOneChild
    }

    // Show parent if there are no child route to display
    return { ... parent, path: '', noShowingChildren: true }
  },

  // Reshape the routes structure as navigation (see sidebar)
  navigation(routes, basePath = '/') {
    let menus = []

    for (let route of routes) {
      // skip some route
      const hidden_route = (route.hidden || route.path.indexOf(':') >= 0 || !route.meta || !route.meta.title)

      if (!hidden_route) {
        const onlyOneShowingChild = this._onlyOneShowingChild(route.children, route)
        const showOnlyChild = (route.children && onlyOneShowingChild && !route.alwaysShow)

        if (showOnlyChild) {
          route = onlyOneShowingChild
          DEBUG && console.log('routing.only: %o -> %o', onlyOneShowingChild, menu_item)
        }

        const menu_item = {
          path: path.resolve(basePath, route.path || ''),
          title: route.meta.title,
          icon: route.meta.icon
        }
        DEBUG && console.log('routing.item: %o -> %o ---> %o', basePath, onlyOneShowingChild, menu_item)

        // recursive child routes
        if (route.children) {
          menu_item.children = this.navigation(route.children, menu_item.path)
        }
        menus.push(menu_item)
      } else if (route.children) {
        DEBUG && console.log('routing.children: %o -> %o', basePath, route)
        menus = this.navigation(route.children, route.path)
      }
    }
    DEBUG && console.log('routing.navigation: %o -> %o ---> %o', basePath, routes, menus)
    return menus
  },

  transitions(store, router) {
    NProgress.configure({ showSpinner: true }) // NProgress Configuration

    router.beforeEach(async(to, from, next) => {
      // start progress bar
      NProgress.start()
      document.title = getPageTitle(store, to.meta.title)
      next()
    })
    router.afterEach(async(to, from, next) => {
      NProgress.done()
    })
  }
}
export default routing
