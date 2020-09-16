<template>
  <div>
    <a-form :model="searchForm" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
       <a-col :span="5" class="search-group">
          <a-form-item label="角色名称">
            <a-input v-model:value="searchForm.roleName" />
          </a-form-item>
        </a-col>
        <a-col :span="5" class="search-group">
          <a-form-item label="权限字符">
            <a-input v-model:value="searchForm.roleKey" />
          </a-form-item>
        </a-col>
        <a-col :span="5" class="search-group">
          <a-form-item label="状态">
            <a-select v-model:value="searchForm.status" placeholder="please select your zone">
              <a-select-option value="shanghai">正常</a-select-option>
              <a-select-option value="beijing">停用</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="5" class="search-group">
          <a-form-item label="创建时间">
            <a-date-picker
              v-model:value="searchForm.createTime"
              show-time
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </a-form-item>
        </a-col>
        <a-col :span="4" class="search-group">
          <a-button type="primary" @click="testEmit">搜索</a-button>
            <a-button style="margin-left: 10px;">重置</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "superTableSearch",
  props: ["controlArray"],
  setup(props, context) {
    const searchForm = ref({
      roleName: "",
      roleKey: "",
      status: "",
      createTime: "",
    });
    const labelCol = ref({ span: 6 });
    const wrapperCol = ref({ span: 17 });

    const testEmit = () =>{
        console.log('tablesearch');
        context.emit("tablesearch", searchForm);
    }

    watch(props,(newValue, oldValue) =>{
      console.log(newValue);
      console.log(oldValue);
    })

    return {
      searchForm,
      labelCol,
      wrapperCol,
      testEmit
    };
  },
});
</script>

<style scoped>
</style>