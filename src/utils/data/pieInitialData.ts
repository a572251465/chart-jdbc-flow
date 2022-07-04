// 表示基本的渲染数据
// 初期数据 都必须经过JSON.stringify 序列化
const getBaseData = () => [
  '"某站点用户访问来源"',
  '["直接访问2","邮件营销","联盟广告","视频广告","搜索引擎"]',
  '[{"value":303,"name":"直接访问2"},{"value":310,"name":"邮件营销"},{"value":234,"name":"联盟广告"},{"value":135,"name":"视频广告"},{"value":158,"name":"搜索引擎"}]'
]

const getParamKeys = () => ['text', 'data', 'data1']

// 表示最基本的配置
const getBaseOptions = () => `return ({
  title: {
    text: text,
    x: 'center',
    textStyle: {
      color: '#ccc'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    textStyle: {
      color: 'auto'
    },
    data
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data: data1
    }
  ],
  color: [
    '#2b908f',
    '#90ee7e',
    '#f45b5b',
    '#7798BF',
    '#aaeeee',
    '#ff0066',
    '#eeaaee',
    '#55BF3B',
    '#DF5353',
    '#7798BF',
    '#aaeeee'
  ]
})`

// 表示饼状图的信息
export const pie = {
  getBaseData,
  getBaseOptions,
  getParamKeys
}
