import { App } from "@vue/runtime-core";
import Button from "./src/button.vue";
declare type WithInstall<T> = T & {
    install(app: App): void;
};
declare const _Button: WithInstall<typeof Button>;
export default _Button;
