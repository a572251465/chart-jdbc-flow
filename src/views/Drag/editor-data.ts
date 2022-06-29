import { IBlockItem } from '@/types'
import { genKey } from '@/utils'

// 表示默认的block
export const defaultBlockItem: IBlockItem = {
  width: 200,
  height: 200,
  top: 0,
  left: 0,
  createDomId: genKey(),
  type: 'broken',
  zIndex: 10
}

const blocks: IBlockItem[] = [
  {
    width: 200,
    height: 200,
    top: 0,
    left: 0,
    createDomId: genKey(),
    type: 'broken',
    zIndex: 10
  },
  {
    width: 200,
    height: 200,
    top: 200,
    left: 200,
    createDomId: genKey(),
    type: 'column',
    zIndex: 10
  }
]

export default blocks
