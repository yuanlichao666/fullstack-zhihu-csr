import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

import App from './App.vue'
import router from './router'
import { createHead } from '@unhead/vue/client'
import { initPx2Vw } from './utils/px2vw'

const app = createApp(App)
const head = createHead()
app.use(createPinia())
app.use(router)
app.use(head)
initPx2Vw()

app.mount('#app')
