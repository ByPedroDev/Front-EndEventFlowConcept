import './assets/main.css'
import './assets/eventflow.css'

import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'

const queryClient = new QueryClient()
const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')