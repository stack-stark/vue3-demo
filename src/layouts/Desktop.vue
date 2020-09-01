<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      v-model:collapsed="state.collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="state.selectedKeys">
        <a-menu-item key="1" @click="toPage('./table', '1')">
          <user-outlined />
          table
        </a-menu-item>
        <a-menu-item key="2"  @click="toPage('./table', '2')">
          <video-camera-outlined />
          dashboard
        </a-menu-item>
        <a-menu-item key="3"  @click="toPage('./table', '3')">
          <upload-outlined />
          keep
        </a-menu-item>
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
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '88vh',maxHeight: '88vh' ,'overflow-y': 'auto' }"
      >
        <div class="content">
          <!-- <router-view v-slot="{ Component }" >
            <keep-alive v-if="$route.meta.keepAlive">
              <component :is="Component" />
            </keep-alive>
            <component :is="Component" v-if="!$route.meta.keepAlive"/>
          </router-view>-->
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import routerTabs from "@/components/router-tabs/routerTabs.vue";
import Router from '../router'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    routerTabs,
  },
  data() {
    return {};
  },
  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ["1"],
      panes: [
        { title: "Tab 1", content: "Content of Tab 1", key: "1" },
        { title: "Tab 2", content: "Content of Tab 2", key: "2" },
        {
          title: "Tab 3",
          content: "Content of Tab 3",
          key: "3",
          closable: false,
        },
      ],
      activeKey: "1",
      newTabIndex: 0,
    });

    /**
     * 路由跳转
     */
    const toPage = (page: string, pageKey: string): void => {
          state.selectedKeys = [pageKey] //设置选中的key
          // todo路由缓存起来
          Router.push(page);
    }

    return {
      state,
      toPage
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