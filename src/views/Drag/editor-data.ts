import { IBlockItem, IComponentBlockType } from '@/types'
import { genKey } from '@/utils'

// 表示默认的block
export const defaultBlockItem: IBlockItem = {
  width: 400,
  height: 400,
  top: 0,
  left: 0,
  createDomId: genKey(),
  type: IComponentBlockType.PIE,
  zIndex: 10,
  alignCenter: true,
  isFocus: false,
  isLock: false,
  data: [],
  options: '',
  paramKey: []
}

const blocks: IBlockItem[] = []

export default blocks
