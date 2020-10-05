import request from '@/utils/http_api'

export function login(data) {
  return request({
    url: '/api/:tenant/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/:tenant/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/:tenant/user/logout',
    method: 'post'
  })
}
