<template>
  <button :class="classs" @click="handleClick">
    <i :class="icon"></i>
    <span><slot></slot></span>
  </button>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

type ButtonType =
  | "primary"
  | "wraning"
  | "danger"
  | "default"
  | "info"
  | "sucess";
export default defineComponent({
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: "primary",
      vaildator: (val: string) => {
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
</script>
