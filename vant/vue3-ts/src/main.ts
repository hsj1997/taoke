import { createApp } from 'vue'
import App from './App.vue'
import 'vant/es/toast/style'
import 'vant/es/notify/style'
import router from './router'

import publicFunc from "./utils/public.ts";

const app = createApp(App)
app.use(router)
app.mount('#app')
app.config.globalProperties.$publicFunc = publicFunc;

export default app;