import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./routes";
import VueAxios from "vue-axios"; //gọi thư viện axios
import axios from "axios";
import VueSocketIO from "vue-3-socket.io";
import { io } from "socket.io-client";
import VueCookies from "vue-cookies";
import CKEditor from '@ckeditor/ckeditor5-vue'

const app = createApp(App);
app.use(
  new VueSocketIO({
    debug: true,
    connection: io(process.env.VUE_APP_ROOT_API || "http://localhost:3000"),
  })
);
app.use(VueCookies);
app.use(VueAxios, axios);
app.use(router);
app.use(store);
app.use(CKEditor)
app.mount("#app");
