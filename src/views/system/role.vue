<template>
  <div>
    <!-- <a-table :columns="columns" :data-source="reloData">
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
          <a class="ant-dropdown-link">删除</a>
        </span>
      </template>
    </a-table> -->
    <superTable :columnsData="columns" :tableDatas="reloData"/>
  </div>

</template>

<script lang="ts">
import { createVNode, defineComponent, onMounted, ref, watch } from "vue";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import http from "@/services/http/http";
import superTable from '@/components/super-table/super-table.vue';


export default defineComponent({
  name: "role",
  components: {
      superTable
  },
  setup() {
    const reloData = ref([]);
    const columns = ref([
      {
        title: "角色编号",
        dataIndex: "dataScope",
        key: "dataScope",
      },
      {
        title: "角色名称",
        dataIndex: "roleName",
        key: "roleName",
      },
      {
        title: "权限字符",
        dataIndex: "roleKey",
        key: "roleKey",
      },
      {
        title: "显示顺序",
        dataIndex: "dataScope",
        key: "dataScope",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        slots: { customRender: "status" },
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        slots: { customRender: "action" },
      },
    ]);

    const reloDataReqMap = ref({
      pageNum: 1,
      pageSize: 10,
      beginTime: "",
      endTime: "",
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
          reloData.value = res.rows;
        })
        .catch((err) => {
          console.error(err);
        });
    };

    onMounted(() => {
    //   getReloData();
    });

     watch(reloData, (newVal, oldVal) =>{
         console.log(oldVal);
         console.log(newVal);
         reloData.value = newVal;
     })

    const onChangeStatus = (e: any) => {
      console.log(e);
    };

    return {
      reloData,
      columns,
      onChangeStatus,
      getReloData
    };
  },
});
</script>

<style scoped>
</style>