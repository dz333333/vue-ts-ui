import { App } from "@vue/runtime-core";
import Button from "./src/button.vue";

Button.install = (app: App): void => {
  app.component(Button.name, Button);
};

type WithInstall<T> = T & { install(app: App): void };
const _Button: WithInstall<typeof Button> = Button;
export default _Button;
