const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  features: state => state.app.features,
  settings: state => state.settings.baseURL,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  routes: state => state.routing.routes,
  token: state => state.user.token,
  user: state => state.user.profile,
  roles: state => state.user.roles,
  // introduction: state => state.user.introduction,
  // permitted_routes: state => state.routing.routes,
  // feature_routes: state => state.feature.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
