<template>
  <div>
    <a-input v-model:value="value" placeholder="Basic usage" />
  </div>
</template>

<script>
export default {
  name: "keep",
  data() {
    return {
      value: 123,
    };
  },
  created() {
    console.log(this.$route);
  },
};
</script>

<style scoped>
</style>