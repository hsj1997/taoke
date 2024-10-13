import { createApp } from 'vue'
import App from './App.vue'
import 'vant/es/toast/style'
import 'vant/es/notify/style'
//桌面适配
import '@vant/touch-emulator';
import router from './router'

import publicFunc from "@/utils/public";

const app = createApp(App)
app.use(router)
app.mount('#app')
app.config.globalProperties.$publicFunc = publicFunc;

export default app;