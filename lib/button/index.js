import { defineComponent, computed, openBlock, createBlock, createVNode, renderSlot } from 'vue';

var script = defineComponent({
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

function render(_ctx, _cache, $props, $setup, $data, $options) {
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

script.render = render;
script.__file = "packages/button/src/button.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Button = script;

export default _Button;
