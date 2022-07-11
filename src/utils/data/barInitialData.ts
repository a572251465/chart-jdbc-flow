// 表示基本的渲染数据
// 初期数据 都必须经过JSON.stringify 序列化
const getBaseData = () => [
  '["直接访问"]',
  '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]',
  '[1200,200,150,80,70,110,130]'
]

const getParamKeys = () => ['name', 'data', 'data1']

// 表示最基本的配置
const getBaseOptions = () => `return (
{
    "legend": {
        "textStyle": {
            "color": "auto"
        },
        "data": name
    },
    "grid": {
        "left": "3%",
        "right": "4%",
        "bottom": "3%",
        "containLabel": true
    },
    "xAxis": [
        {
            "axisLabel": {
                "textStyle": {
                    "color": "#fff"
                }
            },
            "type": "category",
            "data": data,
            "axisTick": {
                "alignWithLabel": true
            }
        }
    ],
    "yAxis": [
        {
            "axisLabel": {
                "textStyle": {
                    "color": "#fff"
                }
            },
            "splitLine": {
                "lineStyle": {
                    "type": "dotted"
                },
                "show": true
            },
            "type": "value"
        }
    ],
    "series": [
        {
            "name": "直接访问",
            "type": "bar",
            "barWidth": "60%",
            "data": data1
        }
    ],
    "color": [
        "#2b908f",
        "#90ee7e",
        "#f45b5b",
        "#7798BF",
        "#aaeeee",
        "#ff0066",
        "#eeaaee",
        "#55BF3B",
        "#DF5353",
        "#7798BF",
        "#aaeeee"
    ]
})`

// 表示饼状图的信息
export const bar = {
  getBaseData,
  getBaseOptions,
  getParamKeys
}
