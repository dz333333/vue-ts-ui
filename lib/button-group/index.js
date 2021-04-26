import { defineComponent, openBlock, createBlock, renderSlot } from 'vue';

var script = defineComponent({
  name: "HButtonGroup",
});

const _hoisted_1 = { class: "h-button-group" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ]))
}

script.render = render;
script.__file = "packages/button/src/button-group.vue";

script.install = (app) => {
    app.component(script.name, script); // 注册全局组件
};
const _ButtonGroup = script;

export default _ButtonGroup;
