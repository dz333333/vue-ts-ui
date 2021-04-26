import { App } from "vue";
import ButtonGroup from "../button/src/button-group.vue";
declare type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _ButtonGroup: IWithInstall<typeof ButtonGroup>;
export default _ButtonGroup;
