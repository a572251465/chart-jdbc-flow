export { default as bindDom } from './dom'

// 表示生成随机key 用作主键
export const genKey = () => `${(Math.random() * 1000000) | 0}${+new Date()}`
