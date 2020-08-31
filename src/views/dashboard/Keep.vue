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
  activated() {
    const role = this.$route;
    console.log("activated进来了", role);
  },

  deactivated() {
    console.log("deactivated,,,清除");
  },
  created() {
    console.log(this.$route);
  },
};
</script>

<style scoped>
</style>