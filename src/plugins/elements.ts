import {
  ElTooltip,
  ElDrawer,
  ElInput,
  ElForm,
  ElFormItem,
  ElButton,
  ElTabs,
  ElTabPane,
  ElResult,
  ElProgress,
  ElAlert,
  ElSelect,
  ElOption,
  ElCheckbox,
  ElCheckboxGroup, ElScrollbar
} from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import type { App } from 'vue'

type IComponentType = typeof ElTooltip

const components = [
  ElTooltip,
  ElDrawer,
  ElInput,
  ElForm,
  ElFormItem,
  ElButton,
  ElTabs,
  ElTabPane,
  ElResult,
  ElProgress,
  ElAlert,
  ElSelect,
  ElOption,
  ElCheckbox,
  ElCheckboxGroup,
  ElScrollbar
] as IComponentType[]

export default (app: App) => {
  components.forEach((comp) => {
    app.component(comp.name, comp)
  })
}
