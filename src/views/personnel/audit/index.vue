<template>
  <div class="container">
    <a-card class="general-card" :title="$t('audit.table.title')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="idCard" :label="$t('audit.form.idCard')">
                  <a-input
                    v-model="formModel.number"
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
                    v-model="formModel.name"
                    :placeholder="$t('audit.form.userName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" :label="$t('audit.form.status')">
                  <a-select
                    v-model="formModel.contentType"
                    :options="contentTypeOptions"
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
            <a-button type="primary">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('audit.form.search') }}
            </a-button>
            <a-button>
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
      <a-table style="width: 100%" :columns="columns" :data="data">
        <template #optional="{ record }">
          <a-button
            type="primary"
            size="mini"
            @click="$modal.info({ title: 'Name', content: record.name })"
            >同意注册</a-button
          >
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

  const generateFormModel = () => {
    return {
      number: '',
      name: '',
      contentType: '',
      filterType: '',
      createdTime: [],
      status: '',
    };
  };
  const { t } = useI18n();
  const formModel = ref(generateFormModel());
  const contentTypeOptions = computed<SelectOptionData[]>(() => [
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
      title: '头像',
      dataIndex: 'avatar',
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
      title: '操作',
      slotName: 'optional',
    },
  ]);
  const data = reactive([
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ]);
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
