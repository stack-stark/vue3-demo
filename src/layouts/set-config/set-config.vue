<template>
  <div>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">异步加载</a>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item>
            <a>个人中心</a>
          </a-menu-item>
          <a-menu-item>
            <a @click="showSetDrawer">设置</a>
          </a-menu-item>
          <a-menu-item>
            <a>退出登录</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-drawer
      :title="$t('sysConfig.set')"
      placement="right"
      :closable="false"
      v-model:visible="visible"
      @close="drawerClose(e)"
    >
      <a-row>
        <a-col :span="24">
          <a-col :span="24">
            <p> {{ $t("sysConfig.setLanguage") }} </p>
          </a-col>
          <a-col :span="24" style="margin-bottom: 10px">
            <a-radio-group v-model:value="systemLanguages" @change="onChangeI18n">
              <a-radio :style="radioStyle" :value="'zhCN'">{{ $t("sysConfig.languages.zhCN") }}</a-radio>
              <a-radio :style="radioStyle" :value="'zhTW'">{{ $t("sysConfig.languages.zhTW") }}</a-radio>
              <a-radio :style="radioStyle" :value="'enUS'">{{ $t("sysConfig.languages.enUS") }}</a-radio>
            </a-radio-group>
          </a-col>
          <a-divider />
        </a-col>

        <a-col :span="24">
          <a-col :span="24">
            <p>{{ $t("sysConfig.ThemeSettings") }}</p>
          </a-col>
          <a-col :span="24" style="margin-bottom: 10px">
            颜色
            <!-- <a-radio-group v-model:value="value" @change="onChange">
              <a-radio :style="radioStyle" :value="1">简体中文</a-radio>
              <a-radio :style="radioStyle" :value="2">繁体中文</a-radio>
              <a-radio :style="radioStyle" :value="3">英文</a-radio>
            </a-radio-group>-->
          </a-col>
          <a-divider />
        </a-col>
      </a-row>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: "setConfig",
  setup() {
    const i18n = useI18n();
    const visible = ref(false);
    const systemLanguages = ref(i18n.locale.value);

    /**
     * 抽屉关闭回调
     */
    const drawerClose = (e: Event) => {
      console.log(e);
    };
    
    /**
     * 设置多语言
     */
    const setI18n = (value: string) => {
       i18n.locale.value = value;
       localStorage.setItem('locale', value)
    };

    /**
     * 多语言单选框改变回调
     */
    const onChangeI18n = () => {
      setI18n(systemLanguages.value);
    };

    /**
     * 显示抽屉
     */
    const showSetDrawer = () => {
      visible.value = true;
    };

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
  
    return {
      visible,
      drawerClose,
      showSetDrawer,
      radioStyle,
      onChangeI18n,
      systemLanguages
    };
  },
});
</script>

<style scoped>
</style>