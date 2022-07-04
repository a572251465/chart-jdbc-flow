import { IBlockItem } from '@/types'
import { genKey } from '@/utils'

// 表示默认的block
export const defaultBlockItem: IBlockItem = {
  width: 400,
  height: 400,
  top: 0,
  left: 0,
  createDomId: genKey(),
  type: '',
  zIndex: 10,
  alignCenter: true,
  isFocus: false,
  isScreenFrame: true,
  data: [],
  options: '',
  paramKey: []
}

const blocks: IBlockItem[] = []

export default blocks
