<template>
  <div class="container">
    <a-card class="general-card" :title="$t('audit.table.title')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="searchForm"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="idCard" :label="$t('audit.form.idCard')">
                  <a-input
                    v-model="searchForm.idCard"
                    :placeholder="$t('audit.form.idCard.placeholder')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="userName"
                  :label="$t('audit.form.userName')"
                >
                  <a-input
                    v-model="searchForm.userName"
                    :placeholder="$t('audit.form.userName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" :label="$t('audit.form.status')">
                  <a-select
                    v-model="searchForm.status"
                    :options="statusOptions"
                    :placeholder="$t('audit.form.status.selectDefault')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'100px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="toSearch">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('audit.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('audit.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col>
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('audit.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table
        style="width: 100%"
        :columns="columns"
        :data="tableData"
        :loading="tableConfig.tableLoading"
        :pagination="tableConfig.pagination"
        @page-change="getTableData"
      >
        <template #status="{ record }">
          <a-tag :color="['arcoblue', 'gray', 'orange'][record.status]">{{
            ['通过', '停用', '待审核'][record.status]
          }}</a-tag>
        </template>
        <template #avatar="{}">
          <a-avatar :style="{ backgroundColor: '#3370ff' }">
            <IconUser />
          </a-avatar>
        </template>
        <template #sex="{ record }">
          <span>{{ record.sex == '1' ? '男' : '女' }}</span>
        </template>
        <template #pass="{ record }">
          <a-button
            v-if="record.status === '2'"
            type="primary"
            size="mini"
            @click="updateUserStatus(record.id)"
            >同意注册</a-button
          >
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import { getUserList, updateUser } from '@/api/personnel';
  import { delEmptyObj, isEmpty } from '@/utils';
  import { Message } from '@arco-design/web-vue';

  const generateSearchForm = () => {
    return {
      userName: '',
      idCard: '',
      status: '',
    };
  };
  const { t } = useI18n();
  const searchForm = ref(generateSearchForm());
  const tableData = ref([]);
  const tableConfig = reactive({
    tableLoading: false,
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
      showTotal: true,
    },
  });
  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('audit.form.status.all'),
      value: '',
    },
    {
      label: t('audit.form.status.pass'),
      value: '0',
    },
    {
      label: t('audit.form.status.disable'),
      value: '1',
    },
    {
      label: t('audit.form.status.deactivate'),
      value: '2',
    },
  ]);
  const columns = reactive([
    {
      dataIndex: 'avatar',
      slotName: 'avatar',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      slotName: 'sex',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '身份证号码',
      dataIndex: 'idCard',
    },
    {
      title: '状态',
      slotName: 'status',
    },
    {
      title: '操作',
      slotName: 'pass',
    },
  ]);
  /**
   * 获取新注册员工表格数据
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
    getUserList({ current, size, ...search }).then((res) => {
      tableConfig.tableLoading = false;
      tableConfig.pagination.total = res.data.total;
      tableConfig.pagination.current = current;
      tableData.value = res.data.result;
    });
  };
  /**
   * 重置搜索条件
   */
  const reset = () => {
    searchForm.value = generateSearchForm();
    getTableData(tableConfig.pagination.current);
  };
  /**
   * 搜索
   */
  const toSearch = () => {
    const searchData = delEmptyObj(searchForm.value);
    if (isEmpty(searchData)) {
      Message.warning('搜索条件不能为空');
    } else {
      getTableData(tableConfig.pagination.current, searchData);
    }
  };
  const updateUserStatus = (id: string) => {
    updateUser({ id, status: '2' }).then(() => {
      getTableData(tableConfig.pagination.current);
    });
  };
  onMounted(() => {
    getTableData(tableConfig.pagination.current);
  });
</script>

<style scoped lang="less">
  .container {
    display: flex;
    margin: 20px;
    padding: 10px 20px;
    background-color: var(--color-bg-1);

    .general-card {
      width: 100%;
    }
  }
</style>
