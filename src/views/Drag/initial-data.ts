import pieImg from '@/assets/images/pie.png'
import { IInitialBlockItem } from '@/types'
import { pieInitialInfo as pie } from '@/utils/data'

// 表示初始数据
const initialData: IInitialBlockItem[] = [
  {
    type: 'pie',
    icon: pieImg,
    data: pie.getBaseData(),
    options: pie.getBaseOptions()
  }
]

export default initialData
