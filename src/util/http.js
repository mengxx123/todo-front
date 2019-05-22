import axios from 'axios'
import {apiDomain} from '@/config'
// import storage from '@/util/storage'
import cookie from './cookie'

// axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL: apiDomain
})

instance.interceptors.request.use(
        config => {
            console.log('请求')
            let token = cookie.get('accessToken')
            if (token) {
                console.log('有' + token)
                config.headers.Authorization = token
            }
            return config
        },
        err => {
            console.log('错误')
            return Promise.reject(err)
        })

instance.interceptors.response.use(
        response => {
            console.log('响应')
            console.log(response.data)
            return response
        },
        error => {
            console.log('错误', error)
            if (error.response) {
                switch (error.response.status) {
                    case 401: // 旌旗  灵医 , 只用[授权] 旌旗的医生 才是 灵医
                        // store.commit(types.LOGOUT)
                        // router.replace({
                        //     path: 'login',
                        //     query: {redirect: router.currentRoute.fullPath}
                        // })
                    // case 403:
                }
            }
            return Promise.reject(error.response.data)   // 返回接口返回的错误信息
        })

export default instance
