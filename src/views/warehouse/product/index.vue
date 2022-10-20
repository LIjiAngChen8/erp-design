<template>
  <div class="container">
    <a-card class="general-card" title="产品信息中心">
      <a-tabs type="line">
        <a-tab-pane key="1" title="卡片视图">
          <productCard
            :product-list="tableData"
            @delete="getTableData(tableConfig.pagination.current)"
          ></productCard>
        </a-tab-pane>
        <a-tab-pane key="2" title="表格视图">
          <a-space style="margin-bottom: 20px">
            <a-button type="primary" size="small" @click="showAdd">
              <template #icon><icon-plus /></template>新建
            </a-button>
            <a-button type="dashed" size="small" status="danger">
              <template #icon><icon-delete /></template>删除
            </a-button>
            <icon-sync
              style="font-size: 20px"
              :spin="tableConfig.tableLoading"
              @click="getTableData(tableConfig.pagination.current)"
            />
          </a-space>
          <a-table
            v-model:selectedKeys="selectedKeys"
            style="width: 100%"
            row-key="id"
            :columns="columns"
            :data="tableData"
            :bordered="false"
            :stripe="true"
            :filter-icon-align-left="true"
            :row-selection="{ type: 'checkbox', showCheckedAll: true }"
            :loading="tableConfig.tableLoading"
            :pagination="tableConfig.pagination"
            @page-change="getTableData"
          >
          </a-table>
        </a-tab-pane>
      </a-tabs>
      <addModalVue
        ref="addModal"
        @submit="getTableData(tableConfig.pagination.current)"
      ></addModalVue>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { getProductList } from '@/api/product';
  import productCard from './components/card.vue';
  import addModalVue from './components/addModal.vue';

  const columns = reactive([
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '产品名称',
      dataIndex: 'name',
    },
    {
      title: '型号',
      dataIndex: 'model',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
    },
    {
      title: '材质',
      dataIndex: 'texture',
    },
    {
      title: '颜色',
      dataIndex: 'color',
    },
    {
      title: '尺寸',
      dataIndex: 'productSize',
    },
    {
      title: '重量',
      dataIndex: 'weight',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ]);
  const selectedKeys = ref([]); // 表格选择人员数组
  const tableData = ref([] as any);
  const addModal = ref<InstanceType<typeof addModalVue>>();
  const tableConfig = reactive({
    tableLoading: false,
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
      showTotal: true,
    },
  });
  /**
   * 获取产品数据
   * @param current 当前页
   * @param size 页大小
   * @param search 搜索条件
   */
  const getTableData = (
    current: number,
    search?: object,
    size = tableConfig.pagination.pageSize
  ) => {
    tableConfig.tableLoading = true;
    getProductList({ current, size, ...search }).then((res) => {
      tableConfig.tableLoading = false;
      tableConfig.pagination.total = res.data.total;
      tableConfig.pagination.current = current;
      tableData.value = res.data.result;
    });
  };
  /**
   * 打开新增弹窗
   */
  const showAdd = () => {
    addModal.value?.showModal();
  };
  onMounted(() => {
    getTableData(tableConfig.pagination.current);
  });
</script>

<style scoped lang="less">
  .container {
    display: flex;
    height: 100%;
    margin: 20px;
    padding: 10px 20px;
    background-color: var(--color-bg-1);

    .general-card {
      width: 100%;

      .mr {
        margin-right: 10px;
      }
    }
  }
</style>
