<template>
  <div id="app">
    <router-view />
    <div id="js-loading" class="globalSpin" v-if="loading">
      <div class="box">
        <div class="loader-01"></div>
        <div class="tip-text">加载中...</div>
      </div>
    </div>
  </div>
</template>

<script  lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const spinning = ref(true);

    const store = useStore();

    const loading = computed(() => {
      return store.state.appGlobal.loading;
    });

    return {
      loading,
      spinning,
    };
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.globalSpin {
  position: fixed;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.box {
  display: inline-block;
  width: 200px;
  height: 40px;
  border-radius: 3px;
  font-size: 30px;
  padding: 1em;
  margin-bottom: 0.25em;
  vertical-align: top;
  transition: 1s color, 1s border;
  position: fixed;
  top: 40%;
}
[class*="loader-"] {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}
.loader-01 {
  border: 0.2em dotted currentcolor;
  border-radius: 50%;
  -webkit-animation: 1.5s loader-01 linear infinite;
  animation: 1.5s loader-01 linear infinite;
}
@-webkit-keyframes loader-01 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loader-01 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.tip-text{
  color: #404040;
  font-size: 14px;
}
</style>
