import request from '@/utils/http_api'

export function getRoutes() {
  return request({
    url: '/api/:tenant/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/api/:tenant/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/api/:tenant/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/api/:tenant/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/api/:tenant/role/${id}`,
    method: 'delete'
  })
}
