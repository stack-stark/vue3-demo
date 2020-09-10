<template>
  <div
    class="tabs"
    id="tabs"
    :style="{width: collapsed?'calc(100vw - 80px)':'calc(100vw - 200px)'}"
    @mousewheel="tabMousewheel"
  >
    <div
      class="tabs-item"
      @click="toPage('/index/dashboard', 'dashboard')"
      v-bind:class="{ 'tabs-item-active': activeKey == 'dashboard' }"
    >
      <span class="item-span">工作桌面</span>
    </div>
    <div
      class="tabs-item"
      v-for="(item, index) in routerCacheArray"
      :key="index"
      @click="toPage(item.path, item.key)"
      v-bind:class="{ 'tabs-item-active': activeKey == item.key }"
    >
      <span class="item-span">{{item.name}}</span>
      <span @click.stop="closeTab(index, item.path)">
        <CloseOutlined />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import {
  RouteLocationNormalizedLoaded,
  Router,
  useRoute,
  useRouter,
} from "vue-router";

interface WheelDelta {
  wheelDelta: number;
  screenX: number;
  screenY: number;
  offsetX: number;
  offsetY: number;
  type: string;
}

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
      activeKey: "",
    });

    /**
     * 设置当前活跃页面key
     */
    const setActiveKey = (key: string): void => {
      store.commit("routerCache/SET_ACTIVE_TAB_KEY", key);
    };

    /**
     * 当前已经缓存的路由数组
     */
    const routerCacheArray = computed(() => {
      return store.state.routerCache.routerCacheArray;
    });

    /**
     * 当前活跃key
     */
    const activeKey = computed(() => {
      return store.state.routerCache.activeTabKey;
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
     * 处理关闭时需要设置的key
     */
    const getActiveKey = (): string => {
      const length = store.state.routerCache.routerCacheArray.length;
      if (length > 0) {
        return store.state.routerCache.routerCacheArray[length - 1]["key"];
      } else {
        return "dashboard";
      }
    };

    /**
     * 关闭tab路由缓存
     */
    const closeTab = (index: number, fullPath: string): void => {
      store.commit("routerCache/CLEAR_ROUTER_CACHE", index);
      whetherRouterBack(fullPath);
      const key = getActiveKey();
      setActiveKey(key);
    };

    /**
     * 左侧菜单是否收缩
     */
    const collapsed = computed(() => {
      return store.state.desktop.collapsed;
    });

    /**
     * 监听滚轮
     */
    const tabMousewheel = (e: WheelDelta) => {
      const dom = document.getElementById("tabs");
      if (!dom) {
        return false;
      }
      if (e.wheelDelta > 0) {
        dom.scrollLeft -= 20;
      } else {
        dom.scrollLeft += 20;
      }
    };

    return {
      toPage,
      state,
      closeTab,
      routerCacheArray,
      activeKey,
      collapsed,
      tabMousewheel,
    };
  },
});
</script>

<style lang="less">
.tabs {
  width: calc(100vw - 200px);
  height: 41px;
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  background-color: white;
  border-top: 1px solid #e1e1e1;
  overflow-y: hidden;
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
    border-top: 2px solid #40a9ff;
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
