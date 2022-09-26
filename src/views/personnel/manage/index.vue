<template>
  <div class="container">
    <a-card class="general-card" :title="$t('userManage.table.title')">
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
                <a-form-item
                  field="position"
                  :label="$t('userManage.position')"
                >
                  <a-cascader
                    :options="data.deptList"
                    :field-names="fieldNames"
                    :style="{ width: '320px' }"
                    placeholder="选择部门"
                    check-strictly
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="userName"
                  :label="$t('userManage.userName')"
                >
                  <a-input
                    v-model="searchForm.userName"
                    :placeholder="$t('userManage.userName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="idCard" :label="$t('userManage.idCard')">
                  <a-input
                    v-model="searchForm.idCard"
                    :placeholder="$t('userManage.idCard.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="phone" :label="$t('userManage.phone')">
                  <a-input v-model="searchForm.phone" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createTime"
                  :label="$t('userManage.createTime')"
                >
                  <a-range-picker
                    v-model:picker-value="searchForm.createTime"
                    format="YYYY-MM-DD"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" :label="$t('userManage.status')">
                  <a-select
                    v-model="searchForm.status"
                    :options="statusOptions"
                    :placeholder="$t('userManage.status.selectDefault')"
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
      <a-row style="margin-bottom: 12px" justify="end">
        <a-button class="mr" status="danger">
          <template #icon>
            <icon-delete />
          </template>
          {{ $t('userManage.delete') }}
        </a-button>
        <a-button class="mr">
          <template #icon>
            <icon-sync />
          </template>
          {{ $t('userManage.passwordReset') }}
        </a-button>
        <a-button class="mr">
          <template #icon>
            <icon-download />
          </template>
          {{ $t('userManage.download') }}
        </a-button>
      </a-row>
      <a-table
        v-model:selectedKeys="selectedKeys"
        style="width: 100%"
        row-key="id"
        :columns="columns"
        :data="tableData"
        :filter-icon-align-left="true"
        :row-selection="{ type: 'checkbox', showCheckedAll: true }"
        :loading="tableConfig.tableLoading"
        :pagination="tableConfig.pagination"
        @page-change="getTableData"
        @row-click="selectRow"
      >
        <template #userName="{ record }">
          <a-badge
            :color="['#165DFF', 'gray', 'orange'][record.status]"
            :style="{ marginRight: '10px' }"
          />
          <span>{{ record.userName }}</span>
        </template>
        <template #avatar="{ record }">
          <a-avatar v-if="record.avatar">
            <img :src="record.avatar" alt="avatar" />
          </a-avatar>
          <a-avatar v-else :style="{ backgroundColor: '#3370ff' }">
            <IconUser />
          </a-avatar>
        </template>
        <template #sex="{ record }">
          <span>{{ record.sex == '1' ? '男' : '女' }}</span>
        </template>
        <template #phone="{ record }">
          <a-typography-paragraph copyable>{{
            record.phone
          }}</a-typography-paragraph>
        </template>
        <template #idCard="{ record }">
          <a-typography-paragraph copyable>{{
            record.idCard
          }}</a-typography-paragraph>
        </template>
        <template #time="{ record }">
          <span>{{
            dayjs(record.createTime || '').format('YYYY-MM-DD HH:mm')
          }}</span>
        </template>
      </a-table>
      <user-edit-modal
        ref="editModal"
        :user-info="userInfo"
        @submit="getTableData(tableConfig.pagination.current)"
      ></user-edit-modal>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed, onMounted, toRaw } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import { getUserList } from '@/api/personnel';
  import { getdeptAll } from '@/api/dept';
  import { delEmptyObj, isEmpty, deepClone } from '@/utils';
  import { Message } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  import userEditModal from './editModal.vue';

  const generateSearchForm = () => {
    return {
      userName: '',
      idCard: '',
      status: '',
      createTime: [],
      position: '',
      phone: '',
    };
  };
  const selectedKeys = ref([]); // 表格选择人员数组
  const { t } = useI18n();
  const searchForm = ref(generateSearchForm());
  const tableData = ref([]);
  const userInfo = ref({});
  const tableConfig = reactive({
    tableLoading: false,
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
      showTotal: true,
    },
  });
  const fieldNames = { value: 'id', label: 'deptName' };
  const data = reactive({
    deptList: [],
  }); // 部门数据
  const editModal: any = ref(null);
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
  ]);
  const columns = reactive([
    {
      dataIndex: 'avatar',
      slotName: 'avatar',
    },
    {
      title: '部门',
      dataIndex: 'department',
    },
    {
      title: '职位',
      dataIndex: 'position',
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      slotName: 'sex',
      width: 60,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 150,
      slotName: 'phone',
    },
    {
      title: '身份证号码',
      dataIndex: 'idCard',
      width: 210,
      slotName: 'idCard',
      sortable: {
        sortDirections: ['ascend' as const, 'descend' as const],
      },
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      slotName: 'userName',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      slotName: 'time',
      width: 190,
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
  /**
   * 清除数组中空children
   */
  const delNullChildren = (arr: any) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].children) {
        if (arr[i].children.length > 0) {
          delNullChildren(arr[i].children);
        } else {
          delete arr[i].children;
        }
      }
    }
    return arr;
  };
  /**
   * 获取部门树
   */
  const getDept = () => {
    getdeptAll().then((res) => {
      data.deptList = delNullChildren(res.data);
    });
  };
  /**
   * 单击表格行打开编辑框
   */
  const selectRow = (e: any) => {
    userInfo.value = deepClone(toRaw(e));
    editModal.value.showModal();
  };
  onMounted(() => {
    getTableData(tableConfig.pagination.current);
    getDept();
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

      .mr {
        margin-right: 10px;
      }
    }
  }
</style>
