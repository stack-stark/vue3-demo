<template>
  <div>
    工作桌面
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "dashboard",
  setup() {
    const state = reactive({
      show: true,
    });
    return {
      state,
    };
  },
});
</script>

<style scoped>
</style>