import 'uno.css'
import '@unocss/reset/tailwind.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

console.log(import.meta.env)

app.use(createPinia())
app.use(router)

app.mount('#app')
