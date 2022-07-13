import Pie from './Pie/index.vue'
import Bar from './Bar/index.vue'
import { IComponentBlockType } from '@/types'

type IComponentType = typeof Pie

export const componentStrategy: Record<IComponentBlockType, IComponentType> = {
  [IComponentBlockType.PIE]: Pie,
  [IComponentBlockType.BAR]: Bar
}
