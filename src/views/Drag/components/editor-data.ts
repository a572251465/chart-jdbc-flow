import { IBlockItem } from '@/types'
import { genKey } from '@/utils'

const blocks: IBlockItem[] = [
  {
    width: '200px',
    height: '200px',
    top: '0px',
    left: '0px',
    createDomId: genKey(),
    type: 'broken',
    zIndex: 10
  },
  {
    width: '200px',
    height: '200px',
    top: '200px',
    left: '200px',
    createDomId: genKey(),
    type: 'column',
    zIndex: 10
  }
]

export default blocks
