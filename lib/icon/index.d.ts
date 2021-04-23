import { App } from "@vue/runtime-core";
import Icon from "./src/icon.vue";
declare type WithInstall<T> = T & {
    install(app: App): void;
};
declare const _Icon: WithInstall<typeof Icon>;
export default _Icon;
