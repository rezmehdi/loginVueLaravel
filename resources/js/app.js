
import {createApp} from 'vue'

require('./bootstrap')
import App from './App.vue'
import axios from 'axios'
import router from './router'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css';
import "../css/assets/css/todo.css"
import "../css/assets/css/font-awesome.min.css"

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router)
app.mount('#app')
