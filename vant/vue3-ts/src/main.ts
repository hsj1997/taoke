import { createApp } from 'vue'
import App from './App.vue'
import 'vant/es/toast/style'
import 'vant/es/notify/style'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
