import lineImg from '@/assets/images/line.png'
import barImg from '@/assets/images/bar.png'
import pieImg from '@/assets/images/pie.png'
import { IInitialBlockItem } from '@/types'

// 表示初始数据
const initialData: IInitialBlockItem[] = [
  {
    type: 'pie',
    icon: pieImg
  },
  {
    type: 'line',
    icon: lineImg
  },
  {
    type: 'bar',
    icon: barImg
  }
]

export default initialData
