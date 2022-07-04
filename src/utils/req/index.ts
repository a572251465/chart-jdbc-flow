import { lineBaseInfoReq } from './line'
import { INormalFn } from '@/types'

export const strategyFieldReq: Record<string, INormalFn> = {
  line: lineBaseInfoReq
}
