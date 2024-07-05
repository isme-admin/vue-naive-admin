/**********************************
 * @FilePath: interceptors.js
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/04 22:46:40
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { resolveResError } from './helpers'
import { useAuthStore } from '@/store'

export function setupInterceptors(axiosInstance) {
  function reqResolve(config) {
    // 处理不需要token的请求
    if (config.noNeedToken) {
      return config
    }

    const { accessToken } = useAuthStore()
    if (accessToken) {
      // token: Bearer + xxx
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  }

  function reqReject(error) {
    return Promise.reject(error)
  }

  const SUCCESS_CODES = [0, 200]
  function resResolve(response) {
    const { data, status, config, statusText, headers } = response
    if (headers['content-type']?.includes('json')) {
      if (SUCCESS_CODES.includes(data?.code)) {
        return Promise.resolve(data)
      }
      const code = data?.code ?? status

      // 根据code处理对应的操作，并返回处理后的message
      const message = resolveResError(code, data?.message ?? statusText, config)

      // 需要错误提醒
      !config?.noNeedTip && message && window.$message?.error(message)
      return Promise.reject({ code, message, error: data ?? response })
    }
    return Promise.resolve(data ?? response)
  }

  async function resReject(error) {
    if (!error || !error.response) {
      const code = error?.code
      /** 根据code处理对应的操作，并返回处理后的message */
      const message = resolveResError(code, error.message)
      window.$message?.error(message)
      return Promise.reject({ code, message, error })
    }

    const { data, status, config } = error.response
    const code = data?.code ?? status

    const message = resolveResError(code, data?.message ?? error.message, config)
    /** 需要错误提醒 */
    !config?.noNeedTip && message && window.$message?.error(message)
    return Promise.reject({ code, message, error: error.response?.data || error.response })
  }

  axiosInstance.interceptors.request.use(reqResolve, reqReject)
  axiosInstance.interceptors.response.use(resResolve, resReject)
}
