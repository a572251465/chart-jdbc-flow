import { IBlockItem } from '@/types'

/**
 * @author lihh
 * @description 解析pie data数据
 * @param item 要变化的block
 * @param data 传递的数据
 */
const pieDataResolve = (
  item: IBlockItem,
  data: { value: string; name: string }[]
) => {
  const names = data.map((item) => item.name)
  const { data: targetData } = item

  item.data = [targetData[0], JSON.stringify(names), JSON.stringify(data)]
}

/**
 * @author lihh
 * @description 设置block data
 * @param allBlockItem 所有的元素
 * @param id 设置的元素id
 * @param content 内容
 */
export const useBlockData = (
  allBlockItem: IBlockItem[],
  id: string,
  content: string
) => {
  // 找到需要编辑的block
  const curItem = allBlockItem.find((item) => item.createDomId === id)
  if (!curItem) return

  const { type } = curItem
  switch (type) {
    case 'pie':
      pieDataResolve(curItem, JSON.parse(content))
      break
    default:
      return
  }
}
