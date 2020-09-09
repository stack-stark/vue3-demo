<template>
  <div class="tabs">
    <div
      class="tabs-item"
      @click="toPage('/', 'index')"
      v-bind:class="{ 'tabs-item-active': state.activeKey == 'index' }"
    >
      <span class="item-span">主页</span>
      <CloseOutlined />
    </div>

    <div
      class="tabs-item"
      v-for="(item, index) in routerCacheArray"
      :key="index"
      @click="toPage(item.path, item.key)"
      v-bind:class="{ 'tabs-item-active': state.activeKey == item.key }"
    >
      <span class="item-span">{{item.name}}</span>
      <span @click.stop="closeTab(index, item.path)">
        <CloseOutlined />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import {
  RouteLocationNormalizedLoaded,
  Router,
  useRoute,
  useRouter,
} from "vue-router";

export default defineComponent({
  name: "routerTabs",
  components: {
    CloseOutlined,
  },
  setup() {
    const store = useStore();
    const router: Router = useRouter();
    const route: RouteLocationNormalizedLoaded = useRoute();

    const state = reactive({
      activeKey: "index",
      routerCacheArray: [],
    });

    onMounted(() => {
      state.routerCacheArray = store.state.routerCache.routerCacheArray;
    });

    /**
     * 设置当前活跃页面key
     */
    const setActiveKey = (key: string): void => {
      store.commit("routerCache/SET_ACTIVE_TAB_KEY", key);
    };

    const routerCacheArray = computed(() => {
      return store.state.routerCache.routerCacheArray;
    });

    /**
     * 路由跳转
     */
    const toPage = (page: string, key: string): void => {
      router.push(page);
      setActiveKey(key);
    };

    /**
     * 判断当前tab是否是当前路由,是的话就关闭
     */
    const whetherRouterBack = (fullPath: string): void => {
      if (route.fullPath == fullPath) {
        router.back();
      }
    };

    /**
     * 关闭tab路由缓存
     */
    const closeTab = (index: number, fullPath: string): void => {
      console.log(index);
      store.commit("routerCache/CLEAR_ROUTER_CACHE", index);
      console.log(store.state.routerCache.routerCacheKeyArray);
      whetherRouterBack(fullPath);
    };

    return {
      toPage,
      state,
      setActiveKey,
      closeTab,
      routerCacheArray,
    };
  },
});
</script>

<style lang="less">
.tabs {
  width: calc(100vw - 200px);
  height: 40px;
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  background-color: white;
  border-top: 1px solid #e1e1e1;
  .tabs-item {
    height: 40px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #e1e1e1;
    cursor: pointer;
    background: #fafafa;
    .item-span {
      margin-right: 10px;
    }
  }
  .tabs-item-active {
    border-top: 2px solid seagreen;
    background: #ffffff;
  }
  .tabs-item:last-child {
    border-right: 1px solid #e1e1e1;
  }
}

.tabs::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.tabs::-webkit-scrollbar-track {
  border-radius: 6px;
}

/* 滚动条滑块 */
.tabs::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: #d2d2d2;
}
</style>
