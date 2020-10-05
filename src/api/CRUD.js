import http_api from '@/utils/http_api'
import vars from '@/utils/vars'
import _ from 'lodash'

export default function(self, default_ctx) {
  const api = self.api
  if (!api) throw new Error('API not configured')
  const DEBUG = true

  const baseURL = self.$store.state.settings.baseURL
  DEBUG && console.log('crud.api.init: %o -> %o @ %s', api, default_ctx, baseURL)

  return {
    create(data, _ctx) {
      const url_ctx = _.extend({}, default_ctx, _ctx, data)
      const url = baseURL + vars.t(api.create.url, url_ctx)
      DEBUG && console.log('crud.api.create: %o -> %o', url, data)
      return http_api({
        url: url,
        method: api.create.method || 'post',
        data: data
      })
    },
    list(params, _ctx) {
      const ctx = _.extend({}, default_ctx, _ctx)
      const url = baseURL + vars.t(api.list.url, ctx)
      DEBUG && console.log('crud.api.list: %o -> %o', url, params)
      return http_api({
        url: url,
        method: api.list.method || 'get',
        params: params
      })
    },
    read(params, _ctx) {
      const url_ctx = _.extend({}, default_ctx, _ctx, params)
      const url = baseURL + vars.t(api.read.url, url_ctx)

      DEBUG && console.log('crud.api.read: %o -> %o', url, params)
      return http_api({
        url: url,
        method: api.read.method || 'get',
        params: params
      })
    },
    update(data, _ctx) {
      const url_ctx = _.extend({}, default_ctx, _ctx, data)
      const url = baseURL + vars.t(api.update.url, url_ctx)
      DEBUG && console.log('crud.api.update: %o -> %o', url, data)

      return http_api({
        url: url,
        method: api.update.method || 'put',
        data: data
      })
    },
    delete(params, _ctx) {
      const url_ctx = _.extend({}, default_ctx, _ctx, params)
      const url = baseURL + vars.t(api.delete.url, url_ctx)
      DEBUG && console.log('crud.api.delete: %o -> %o', url, params)

      return http_api({
        url: url,
        method: api.delete.method || 'delete',
        params: params
      })
    }
  }
}
