import request from '@/utils/http_api'

export function getConfig(url) {
  return request({ url: url, method: 'get' })
}

