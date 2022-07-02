import { VuMessage } from 'vu-design-plus'
import { INormalFn } from '@/types'
import { getType } from '@/hook/useTypes'

type IBody = Record<string, any> | string | string[]

interface IOptions {
  method: 'get' | 'post' | 'delete' | 'put'
  url: string
  body?: IBody
  header?: Headers
  extendFields?: any
}

// 表示直接返回共同函数
const commonFn = <T>(x: T) => x

/**
 * @author lihh
 * @description 请求方法
 * @param params 参数
 * @returns
 */
const request = <T>(params: IOptions): Promise<T> =>
  new Promise((resolve) => {
    // -------------------------- 变量定义区域 --------------------------
    const {
      method,
      url,
      body = {},
      header = new Headers({
        'Content-Type': 'application/json'
      }),
      extendFields = {}
    } = params

    // 拼接共同url 如果是以htt开头不进行拼接
    // TODO
    const path = `http://localhost:9998/${url}`

    // -------------------------- 逻辑执行区域 --------------------------

    // 策略模式
    const typeJudge: Record<string, INormalFn> = {
      string: commonFn,
      array: (x: object) => JSON.stringify(x),
      object: (x: object) => JSON.stringify(x),
      formdata: (x) => x
    }
    const editBody = method === 'get' ? null : typeJudge[getType(body)](body)
    try {
      fetch(path, {
        method,
        headers: header,
        mode: 'cors',
        body: editBody,
        ...extendFields
      })
        .then(async (result) => {
          if (result.ok) {
            const res = await result.json()
            resolve(res)
          }
        })
        .catch(() => {
          VuMessage.danger('网络错误, 请重试')
        })
    } catch (e) {
      console.error(e)
      VuMessage.danger('网络错误')
    }
  })

/**
 * @author lihh
 * @description get请求
 * @param url 请求url
 * @returns
 */
const Get = <T>(url: string, header?: Headers): Promise<T> =>
  request<T>({ method: 'get', url, header })

/**
 * @author lihh
 * @description post请求 一般用来添加数据
 * @param url 请求url
 * @param body 发送主体
 * @returns
 */
const Post = <T>(url: string, body?: IBody, header?: Headers): Promise<T> =>
  request<T>({ method: 'post', url, body, header })

/**
 * @author lihh
 * @description put请求 一般用来更新
 * @param url 请求url
 * @param body 发送主体
 * @returns
 */
const Put = <T>(url: string, body?: IBody): Promise<T> =>
  request<T>({ method: 'put', url, body })

/**
 * @author lihh
 * @description delete请求 一般用来删除
 * @param url 请求url
 * @param body 发送主体
 * @returns
 */
const Del = <T>(url: string): Promise<T> =>
  request<T>({ method: 'delete', url })

export default { Get, Post, Put, Del }
