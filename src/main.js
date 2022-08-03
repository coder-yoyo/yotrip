import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
// 屏蔽默认事件警告
import 'default-passive-events'

import 'normalize.css'
import './assets/css/index.css'

createApp(App).use(router).use(pinia).mount('#app')
