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
    <div>
       <a-button type="primary" @click="test">测试</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import axios from "axios";
export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    test() {
      // const url = '';
      // 为给定 ID 的 user 创建请求
      axios
        .get("/rest/portal/user/getUserByOpenId?openId=openId")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});
</script>
