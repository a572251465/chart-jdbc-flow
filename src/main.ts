import { createApp } from 'vue'
import App from './App.vue'
import Route from '@/route'
import ElementPlus from '@/plugins/elements'

import '@/assets/css/common.less'
import '@/assets/css/element-plus.css'

import '@/hook/useGlobal'

const root = createApp(App)
root.use(Route)
root.use(ElementPlus)
root.mount('#app')
