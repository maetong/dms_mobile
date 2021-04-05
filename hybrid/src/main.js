import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import AppConfig from "@/config/index.js";
import Util from "@/common/utils";
import moment from "moment";
import { Toast } from "vant";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Vant);
app.config.globalProperties.$appConfig = AppConfig;
app.config.globalProperties.$util = Util;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$sleep = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
app.config.globalProperties.$toast = Toast;
app.mount("#app");
