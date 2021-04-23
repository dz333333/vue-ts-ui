declare module "*.vue" {
  import { defineComponent } from "@vue/runtime-core";
  const component: ReturnType<typeof defineComponent> & {
    install(app: APP): void;
  };
  export default component;
}
