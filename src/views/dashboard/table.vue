<template>
  <div>
    <a-row>
      <a-row type="flex" align="middle">
        <a-col :span="22" :offset="1">
          <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-col :span="6">
              <a-form-item label="姓名">
                <a-input v-model:value="form.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="年龄">
                <a-input v-model:value="form.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="身高">
                <a-input v-model:value="form.name" />
              </a-form-item>
            </a-col>
            <a-col :span="4" style="margin-top: 4px;" :offset="1">
              <a-col :span="7">
                <a-button type="primary">查询</a-button>
              </a-col>
              <a-col :span="7">
                <a-button>重置</a-button>
              </a-col>
              <a-col :span="5" style="margin-top: 5px;">展开</a-col>
            </a-col>
          </a-form>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="20" :offset="2">
          <a-table
            :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
            :columns="columns"
            :data-source="data"
            @change="onChange"
            :bordered="true"
          />
        </a-col>
      </a-row>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

const columns: Array<object> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    filterMultiple: false,
    onFilter: (value: any, record: any) => record.address.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"],
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

function onChange(pagination: any, filters: any, sorter: any) {
  console.log("params", pagination, filters, sorter);
}

export default defineComponent({
  name: "TableOne",
  setup() {
    const state = reactive({
      selectedRowKeys: [] as Array<string>,
    });

    function onSelectChange(selectedRowKeys: Array<string>) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    }

    return {
      columns,
      data,
      onChange,
      onSelectChange,
      state,
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
});
</script>

<style lang="less" scoped>
</style>