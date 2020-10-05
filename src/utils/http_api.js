import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const DEBUG = true

// create an axios instance
const http_api = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
http_api.interceptors.request.use(
  config => {
    // before request is sent ...
    const token = store.getters.token
    // DEBUG &&
    console.log('http_api.token: %o', token)
    if (token) {
      // inject JWT Bearer token into header
      config.headers['authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
http_api.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    DEBUG && console.log('http_api.resp: %o', res)
    return Promise.resolve(res)
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default http_api
