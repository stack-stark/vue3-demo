<template>
  <div>
    <a-result status="404" title="404" sub-title="对不起，你访问的资源不存在!">
      <template #extra>
        <a-button type="primary"><router-link to="/">返回首页</router-link></a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>