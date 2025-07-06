import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import { httpClient } from '@/core/http/HttpClient'
import { useLoadingStore } from '@/stores/loadingStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)
httpClient.setupInterceptors(()=>useLoadingStore)
app.mount('#app')
