import App from "./App.vue";
import { createApp } from "@vue/runtime-dom";
import HUI from "h-ui";
// import HUI from "../lib/index.esm.js";
// import Icon from "../lib/icon/index";
import "theme-chalk/src/index.scss";

//创建应用，并使用组件库
createApp(App).use(HUI).mount("#app");
