import { defineComponent, openBlock, createBlock } from 'vue';

var script$1 = defineComponent({
    name: "HButton",
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("button", null, "按钮"))
}

script$1.render = render$1;
script$1.__file = "packages/button/src/button.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};
const _Button = script$1;

var script = defineComponent({
    name: "HIcon",
    props: {
        name: {
            type: String,
            default: "",
        },
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("i", {
    class: `h-icon-${_ctx.name}`
  }, null, 2 /* CLASS */))
}

script.render = render;
script.__file = "packages/icon/src/icon.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Icon = script;

const components = [_Button, _Icon];
const install = (app) => {
    components.forEach((component) => {
        console.log(component.name);
        //注册组件
        app.component(component.name, component);
    });
};
var index = {
    install,
};

export default index;
