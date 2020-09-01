<template>
  <a-result status="500" title="500" sub-title="抱歉,服务器出错了">
    <template #extra>
      <a-button type="primary">
        <router-link to="/">返回首页</router-link>
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'serverWrong',
    setup () {
        return {}
    }
})
</script>