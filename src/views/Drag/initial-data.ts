import pieImg from '@/assets/images/pie.png'
import barImg from '@/assets/images/bar.png'
import { IComponentBlockType, IInitialBlockItem } from '@/types'
import { pieInitialInfo as pie, barInitialInfo as bar } from '@/utils/data'

// 表示初始数据
const initialData: IInitialBlockItem[] = [
  {
    type: IComponentBlockType.PIE,
    icon: pieImg,
    data: pie.getBaseData(),
    options: pie.getBaseOptions(),
    paramKey: pie.getParamKeys()
  },
  {
    type: IComponentBlockType.BAR,
    icon: barImg,
    data: bar.getBaseData(),
    options: bar.getBaseOptions(),
    paramKey: bar.getParamKeys()
  }
]

export default initialData
