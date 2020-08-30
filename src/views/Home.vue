<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

    <div>
      <router-link :to="'/index/table'">table</router-link>
    </div>
    <div>
      <router-link :to="'/index/dashboard'">dashboard</router-link>
    </div>
    <div>
      <router-link :to="'/index/keep'">keep</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
});
</script>
