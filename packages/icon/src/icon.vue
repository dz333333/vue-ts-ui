<template>
  <i :class="`h-icon-${name}`"></i>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HIcon",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
});
</script>
