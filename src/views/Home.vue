<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

    <div>
      <router-link :to="'/index/table'">跳转table页</router-link>
    </div>
    <div>
      <router-link :to="'/index/dashboard'">dashboard</router-link>
    </div>
    <div>
      <router-link :to="'/index/keep'">keep</router-link>
    </div>
    <div>
      <a-button type="primary" @click="test">测试代理</a-button>
    </div>
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import http from "../services/http/http";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    return {
    };
  },

  methods: {
    test() {
      http
        .get("/rest/portal/user/getUserByOpenId?openId=openId", {})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
});
</script>
