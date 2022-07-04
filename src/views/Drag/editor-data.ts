import { IBlockItem } from '@/types'
import { genKey } from '@/utils'

// 表示默认的block
export const defaultBlockItem: IBlockItem = {
  width: 300,
  height: 300,
  top: 0,
  left: 0,
  createDomId: genKey(),
  type: 'broken',
  zIndex: 10,
  alignCenter: true,
  isFocus: false,
  isScreenFrame: true,
  dbAbout: {}
}

const blocks: IBlockItem[] = [
  // {
  //   width: 200,
  //   height: 200,
  //   top: 0,
  //   left: 0,
  //   createDomId: genKey(),
  //   type: 'broken',
  //   zIndex: 10,
  //   alignCenter: false
  // },
  // {
  //   width: 200,
  //   height: 200,
  //   top: 200,
  //   left: 200,
  //   createDomId: genKey(),
  //   type: 'column',
  //   zIndex: 10,
  //   alignCenter: false
  // }
]

export default blocks
