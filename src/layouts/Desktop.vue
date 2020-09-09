<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      v-model:collapsed="state.collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" @click="clear" />
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="state.selectedKeys">
        <a-menu-item key="1" @click="toPage('/index/table', 'TableOne','表格')">
          <user-outlined />表格
        </a-menu-item>
        <a-menu-item key="2" @click="toPage('/index/dashboard','dashboard','工作桌面')">
          <video-camera-outlined />工作桌面
        </a-menu-item>
        <a-menu-item key="3" @click="toPage('/index/keep', 'keep','保持状态')">
          <upload-outlined />保持状态
        </a-menu-item>
        <a-menu-item v-for="(item, to) in routerCacheKeyArray" :key="to">{{item}}</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: state.collapsed ?'80px':'200px' }">
      <a-layout-header style="background: #fff; padding: 0">
        <a-row>
          <a-col :span="1">
            <menu-unfold-outlined
              v-if="state.collapsed"
              class="trigger"
              @click="() => (state.collapsed = !state.collapsed)"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="() => (state.collapsed = !state.collapsed)"
            />
          </a-col>
        </a-row>
      </a-layout-header>

      <!-- 路由缓存选项卡 -->
      <routerTabs />
      <!-- 路由缓存选项卡 -->

      <a-layout-content
        :style="{ margin: '24px 16px', 
                padding: '24px', 
                background: '#fff', 
                minHeight: '88vh',
                maxHeight: '88vh' ,
                'overflow-y': 'auto' }"
      >
        <div class="content">
          <router-view v-slot="{ Component }">
            <keep-alive :include="routerCacheKeyArray">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";
import routerTabs from "@/components/router-tabs/routerTabs.vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";

interface StateObjectType {
  collapsed: boolean;
  selectedKeys: Array<string>;
  activeKey: string;
  // routerCacheKeyArray: Array<string>;
}

import _ from "lodash";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    routerTabs,
  },

  setup() {
    const state: StateObjectType = reactive({
      collapsed: false,
      selectedKeys: ["1"],
      activeKey: "1",
    });

    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      console.log(store);
    });

    const routerCacheKeyArray = computed(() => {
      return store.state.routerCache.routerCacheKeyArray;
    });

    /**
     * 设置路由缓存
     */
    const setCache = (page: string, pageKey: string, name: string): void => {
      store.commit("routerCache/SET_ACTIVE_TAB_KEY", pageKey);
      if (_.indexOf(store.state.routerCache.routerCacheKeyArray, pageKey) === -1) {
        store.commit("routerCache/ADD_ROUTER_CACHE", {
          key: pageKey,
          name: name,
          path: page,
        });
      } 
      console.log(store.state.routerCache.activeTabKey);
    };

    /**
     * 路由跳转
     */
    const toPage = (page: string, pageKey: string, name: string): void => {
      state.selectedKeys = [pageKey];
      setCache(page, pageKey, name);
      router.push(page);
    };

    return {
      state,
      toPage,
      routerCacheKeyArray,
    };
  },
});
</script>

<style  scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>