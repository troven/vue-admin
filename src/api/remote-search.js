import request from '@/utils/http_api'

export function searchUser(name) {
  return request({
    url: '/api/:tenant/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/api/:tenant/transaction/list',
    method: 'get',
    params: query
  })
}
