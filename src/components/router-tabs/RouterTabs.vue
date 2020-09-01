<template>
  <div class="tabs">
    <div class="tabs-item" @click="toPage('./table', 'table')" v-bind:class="{ 'tabs-item-active': state.activeKey == 'table' }">
      <span class="item-span">table</span>
      <CloseOutlined />
    </div>
    <div class="tabs-item" @click="toPage('./dashboard', 'dashboard')" v-bind:class="{ 'tabs-item-active': state.activeKey == 'dashboard' }">
      <span class="item-span">桌面</span>
      <CloseOutlined />
    </div>
    <div class="tabs-item" @click="toPage('./keep', 'keep')" v-bind:class="{ 'tabs-item-active': state.activeKey == 'keep' }">
      <span class="item-span">保持状态</span>
      <CloseOutlined />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import Router from "@/router";

export default defineComponent({
  name: "routerTabs",
  components: {
    CloseOutlined,
  },
  setup() {
    const state = reactive({
      activeKey: "table",
    });

    /**
     * 设置当前活跃页面key
     */
    const setActiveKey = (key: string): void => {
      state.activeKey = key;
    };

    /**
     * 路由跳转
     */
    const toPage = (page: string, key: string): void => {
      Router.push(page);
      setActiveKey(key);
    };

    return {
      toPage,
      state,
      setActiveKey
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
