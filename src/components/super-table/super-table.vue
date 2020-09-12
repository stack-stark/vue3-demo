<template>
  <div>
    <a-row>
      <a-col :span="24" class="search-group">
        <superTableSearch :controlArray="controlArray" @tablesearch="tablesearch" />
      </a-col>

      <a-col :span="24" class="table">
        <a-table :columns="columns" :data-source="tableData">
          <template #name="{text}">
            <a>{{ text }}</a>
          </template>

          <template v-slot:status="{ statusValue }">
            <a-switch :checked="statusValue" @change="onChangeStatus" />
          </template>

          <template v-slot:action>
            <span>
              <a>修改</a>
              <a-divider type="vertical" />
              <a>数据权限</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link" @click="testone">删除</a>
            </span>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import superTableSearch from "@/components/super-table-search/super-table-search.vue";

interface SpuerTablePropsFace {
  col: Array<object>;
  tableDatas: Array<object>;
}
import http from "@/services/http/http";
export default defineComponent({
  name: "superTable",
  components: {
    superTableSearch,
  },
  props: ["columnsData", "tableDatas"],
  setup(props: any) {
    const columns = ref(props.columnsData);
    const tableData: any = ref([]);
    const ivalue = ref("");
    const controlArray = ref([]);

    const tablesearch = (val: any) => {
      console.log(val);
      return true;
    };

    const onChangeStatus = (e: any) => {
      console.log(e);
    };

    const reloDataReqMap = ref({
      pageNum: 1,
      pageSize: 10,
      beginTime: "",
      endTime: "",
    });

    watch(tableData, (newVal, val) => {
      console.log(val);
      console.log(newVal);
      tableData.value = newVal;
    });

    /**
     * 获取数据
     */
    const getReloData = () => {
      http
        .get(
          `/dev-api/system/role/list?pageNum=${reloDataReqMap.value.pageNum}&pageSize=${reloDataReqMap.value.pageSize}&beginTime=${reloDataReqMap.value.beginTime}&endTime=${reloDataReqMap.value.endTime}`
        )
        .then((res: any) => {
          tableData.value = res.rows;
        })
        .catch((err) => {
          console.error(err);
        });
    };

    onMounted(() => {
      getReloData();
    });

    const testone = () => {
      const tenp = {
        admin: false,
        createBy: null,
        createTime: "2018-03-16 11:33:00",
        dataScope: "2",
        delFlag: "0",
        deptIds: null,
        flag: false,
        menuIds: null,
        params: {},
        remark: "普通角色",
        roleId: 2,
        roleKey: "common",
        roleName: "普通角色",
        roleSort: "2",
        searchValue: null,
        status: "0",
        updateBy: null,
        updateTime: null,
      };
      tableData.value.push(tenp);
    };

    return {
      columns,
      tableData,
      onChangeStatus,
      testone,
      ivalue,
      controlArray,
      tablesearch,
    };
  },
});
</script>

<style scoped>
.search-group {
}
.table {
  margin-top: 10px;
}
</style>