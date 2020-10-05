import feature from './feature'

const install = function(Vue) {
  Vue.directive('feature', feature)
}

if (window.Vue) {
  window['feature'] = feature
  Vue.use(install); // eslint-disable-line
}

feature.install = install
export default feature
