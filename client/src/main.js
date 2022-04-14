import { createApp } from 'vue'
import store from './stores/store'
import App from './App.vue'
import router from './routes'
import VueAxios from 'vue-axios'; //gọi thư viện axios
import axios from 'axios';
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from "socket.io-client";
import VueCookies from 'vue-cookies'
const app = createApp(App)
app.use(VueCookies)
app.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://113.160.233.28:8000')
}))
app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.mount('#app')


