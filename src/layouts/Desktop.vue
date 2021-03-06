<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="state.activeKey">
        <a-menu-item key="TableOne" @click="toPage('/index/table', 'TableOne','表格')">
          <user-outlined />
          <span v-if="!collapsed">表格</span>
        </a-menu-item>
        <a-menu-item key="keep" @click="toPage('/index/keep', 'keep','保持状态')">
          <upload-outlined />
          <span v-if="!collapsed">保持状态</span>
        </a-menu-item>
        <a-menu-item key="role" @click="toPage('/index/role', 'role','角色管理')">
          <upload-outlined />
          <span v-if="!collapsed">角色管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ?'80px':'200px' }">
      <a-layout-header style="background: #fff; padding: 0">
        <a-row>
          <a-col :span="1">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="setCollapsed(false)" />
            <menu-fold-outlined v-else class="trigger" @click="setCollapsed(true)" />
          </a-col>
          <a-col :span="4" :offset="19">
            <setConfig />
          </a-col>
        </a-row>

        <!-- 设置抽屉 -->
        
        <!-- 设置抽屉 -->
      </a-layout-header>

      <!-- 路由缓存选项卡 -->
      <routerTabs />
      <!-- 路由缓存选项卡 -->

      <a-layout-content :class="'layout-content'">
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
import { computed, defineComponent, reactive } from "vue";
import routerTabs from "./router-tabs/router-tabs.vue";
import openRouter from "@/services/open-router/open-router";
import setConfig from "./set-config/set-config.vue";

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
  showConfigDrawer: boolean;
  activeKey: Array<string>;
}

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    routerTabs,
    setConfig,
  },

  setup() {
    const state: StateObjectType = reactive({
      collapsed: false,
      activeKey: [],
      showConfigDrawer: false,
    });

    const store = useStore();

    /**
     * 已缓存路由数组
     */
    const routerCacheKeyArray = computed(() => {
      return store.state.routerCache.routerCacheKeyArray;
    });

    /**
     * 菜单栏状态
     */
    const collapsed = computed(() => {
      return store.state.desktop.collapsed;
    });

    /**
     * 路由跳转
     */
    const toPage = (
      pagePath: string,
      pageKey: string,
      tabTitle: string
    ): void => {
      openRouter(pagePath, pageKey, tabTitle, true, 1);
    };

    /**
     * 收缩菜单栏
     */
    const setCollapsed = (status: boolean): void => {
      store.commit("desktop/SET_COLLAPSED_STATUS", status);
    };

    return {
      state,
      toPage,
      routerCacheKeyArray,
      setCollapsed,
      collapsed,
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
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  border-radius: 6px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: #d2d2d2;
}
.layout-content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  height: 82vh;
  overflow-y: auto;
}
</style>