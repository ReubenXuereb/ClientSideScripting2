import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/firebase'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/main.css'

const GStore = reactive({ flashMessage: '' })
const app = createApp(App)
app.use(store)
app.use(router)
  .provide('GStore', GStore)
app.mount('#app')
