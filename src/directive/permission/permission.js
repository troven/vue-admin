import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = (store.getters && store.getters.roles) || []

    if (value && value instanceof Array && value.length > 0) {
      const featureRoles = value

      console.log('features.roles: %o', roles)
      const hasPermission = roles.some(role => {
        return featureRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-feature="['admin','editor']"`)
    }
  }
}
