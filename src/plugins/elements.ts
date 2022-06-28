import { ElNotification } from 'element-plus'
import 'element-plus/dist/index.css'
import type { App } from 'vue'

type IComponentType = typeof ElNotification

const components = [ElNotification] as IComponentType[]

export default (app: App) => {
  components.forEach((comp) => {
    app.component(comp.name, comp)
  })
}
