<template>
  <div>
    <HButton icon="h-icon-loading" round type="success" @click="buttonClick"
      >按钮</HButton
    >
    <HButton icon="h-icon-loading" round type="wraning">按钮</HButton>
    <HButton icon="h-icon-loading" round type="danger">按钮</HButton>
    <HButton icon="h-icon-loading" round type="info">按钮</HButton>
    <HIcon name="loading"></HIcon>

    <h-button-group>
      <h-button type="primary" icon="h-icon-arrow-left-bold">上一页</h-button>
      <h-button type="primary">
        下一页
        <i class="h-icon-arrow-right-bold"></i
      ></h-button>
    </h-button-group>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useButton } from "./hook/useButton";
export default defineComponent({
  setup() {
    return {
      ...useButton(),
    };
  },
});
</script>
