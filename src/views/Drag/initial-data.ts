import pieImg from '@/assets/images/pie.png'
import { IComponentBlockType, IInitialBlockItem } from '@/types'
import { pieInitialInfo as pie } from '@/utils/data'

// 表示初始数据
const initialData: IInitialBlockItem[] = [
  {
    type: IComponentBlockType.PIE,
    icon: pieImg,
    data: pie.getBaseData(),
    options: pie.getBaseOptions(),
    paramKey: pie.getParamKeys()
  }
]

export default initialData
