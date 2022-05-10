import { createApp } from "vue";
import store from "./stores/store";
import App from "./App.vue";
import router from "./routes";
import VueAxios from "vue-axios"; //gọi thư viện axios
import axios from "axios";
import VueSocketIO from "vue-3-socket.io";
import { io } from "socket.io-client";
import VueCookies from "vue-cookies";
// import Vuex from 'vuex'

// const store = new Vuex.Store({
//   modules: {
//     managerStore: managerStore,
//     globalStore: globalStore
//   }
// })
const app = createApp(App);
app.use(
  new VueSocketIO({
    debug: true,
    connection: io("http://113.160.233.28:8000"),
  })
);
app.use(VueCookies);
app.use(VueAxios, axios);
app.use(router);
app.use(store);
app.mount("#app");
