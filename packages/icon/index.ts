import { App } from "@vue/runtime-core";
import { createApp } from "@vue/runtime-dom";
import Icon from "./src/icon.vue";

Icon.install = (app: App): void => {
  app.component(Icon.name, Icon);
};

type WithInstall<T> = T & { install(app: App): void };
const _Icon: WithInstall<typeof Icon> = Icon;
export default _Icon;
