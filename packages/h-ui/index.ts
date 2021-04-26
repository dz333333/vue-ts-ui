import Button from "@h-ui/button";
import Icon from "@h-ui/icon";
import { App } from "@vue/runtime-core";
import ButtonGroup from "../button-group";

const components = [Button, Icon, ButtonGroup];
const install = (app: App): void => {
  components.forEach((component) => {
    console.log(component.name);
    //注册组件
    app.component(component.name, component);
  });
};

export default {
  install,
};
