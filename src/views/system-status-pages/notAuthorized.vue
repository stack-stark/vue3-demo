<template>
  <a-result status="403" title="403" sub-title="对不起，您没有权限访问此页。">
    <template #extra>
     <a-button type="primary"><router-link to="/">返回首页</router-link></a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'notAuthorized',
    setup () {
        return {}
    }
})
</script>

<style scoped>

</style>