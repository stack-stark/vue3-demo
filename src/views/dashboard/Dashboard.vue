<template>
  <div>
    <div v-if="state.show">
      <!-- <keep-alive>
          
      </keep-alive> -->
       <a-input v-model:value="state.value" placeholder="Basic usage" />
    </div>
    <a-button type="primary" @click="state.show = !state.show">Primary</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "dashboard",
  setup() {
    const state = reactive({
      show: true,
      value: "",
    });
    return {
      state,
    };
  },
});
</script>

<style scoped>
</style>