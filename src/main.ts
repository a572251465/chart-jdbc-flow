import { createApp } from 'vue'
import App from './App.vue'
import Route from '@/route'
import Store from '@/store'
import ElementPlus from '@/plugins/elements'

import '@/assets/css/common.less'
import '@/assets/css/element-plus.css'
import 'vu-design-plus/theme-chalk/css/index.css'

import '@/hook/useGlobal'

const root = createApp(App)
root.use(Route)
root.use(Store)
root.use(ElementPlus)
root.mount('#app')
