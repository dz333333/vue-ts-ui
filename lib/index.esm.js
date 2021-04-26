import { defineComponent, computed, openBlock, createBlock, createVNode, renderSlot } from 'vue';

var script$2 = defineComponent({
    props: {
        type: {
            type: String,
            default: "primary",
            vaildator: (val) => {
                return [
                    "primary",
                    "wraning",
                    "danger",
                    "default",
                    "info",
                    "sucess",
                ].includes(val);
            },
        },
        icon: {
            type: String,
            default: "",
        },
        disabled: Boolean,
        loading: Boolean,
        round: Boolean,
    },
    emits: ["click"],
    name: "HButton",
    setup(props, ctx) {
        const classs = computed(() => [
            "h-button",
            "h-button--" + props.type,
            {
                "is-disabled": props.disabled,
                "is-loading": props.loading,
                "is-round": props.round,
            },
        ]);
        console.log(classs);
        const handleClick = (e) => {
            ctx.emit("click", e);
        };
        return {
            classs,
            handleClick,
        };
    },
});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("button", {
    class: _ctx.classs,
    onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args)))
  }, [
    createVNode("i", { class: _ctx.icon }, null, 2 /* CLASS */),
    createVNode("span", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 2 /* CLASS */))
}

script$2.render = render$2;
script$2.__file = "packages/button/src/button.vue";

script$2.install = (app) => {
    app.component(script$2.name, script$2);
};
const _Button = script$2;

var script$1 = defineComponent({
    name: "HIcon",
    props: {
        name: {
            type: String,
            default: "",
        },
    },
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("i", {
    class: `h-icon-${_ctx.name}`
  }, null, 2 /* CLASS */))
}

script$1.render = render$1;
script$1.__file = "packages/icon/src/icon.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};
const _Icon = script$1;

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

const components = [_Button, _Icon, _ButtonGroup];
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
