<template>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      {{ title }}
    </template>
    <a-form :model="formData">
      <a-form-item field="userName" label="昵称">
        <a-input v-model="formData.userName" />
      </a-form-item>
      <a-form-item field="idCard" label="身份证ID">
        <a-input v-model="formData.idCard" />
      </a-form-item>
      <a-form-item field="nickName" label="真实姓名">
        <a-input v-model="formData.nickName" />
      </a-form-item>
      <a-form-item field="phone" label="联系电话">
        <a-input v-model="formData.phone" />
      </a-form-item>
      <a-form-item field="position" label="部门">
        <a-cascader
          v-model="formData.position"
          :options="options"
          default-value="datunli"
          expand-trigger="hover"
          allow-clear
          check-strictly
          allow-search
        />
      </a-form-item>
      <a-form-item field="department" label="职位">
        <a-cascader
          v-model="formData.department"
          :options="options"
          default-value="datunli"
          expand-trigger="hover"
          allow-clear
          check-strictly
          allow-search
        />
      </a-form-item>
      <a-form-item field="salary" label="工资">
        <a-input-number
          v-model="formData.salary"
          :min="0"
          :formatter="formatter"
          :parser="parser"
          :style="{ width: '200px' }"
        />&emsp;元
      </a-form-item>
      <a-form-item field="userType" label="账号状态">
        <a-radio-group v-model="formData.userType" type="button">
          <a-radio value="0">正常</a-radio>
          <a-radio value="1">封禁</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, toRefs } from 'vue';
  import { getdeptAll } from '@/api/dept';
  import { updateUser } from '@/api/personnel';
  import { delEmptyObj } from '@/utils';

  const props = defineProps({
    title: {
      type: String,
      default: '用户信息',
    },
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  });
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'chaoyang',
          label: 'ChaoYang',
          children: [
            {
              value: 'datunli',
              label: 'Datunli',
            },
          ],
        },
        {
          value: 'haidian',
          label: 'Haidian',
        },
        {
          value: 'dongcheng',
          label: 'Dongcheng',
        },
        {
          value: 'xicheng',
          label: 'Xicheng',
          children: [
            {
              value: 'jinrongjie',
              label: 'Jinrongjie',
            },
            {
              value: 'tianqiao',
              label: 'Tianqiao',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'huangpu',
          label: 'Huangpu',
        },
      ],
    },
  ];
  const { userInfo: formData } = toRefs(props);
  const visible = ref(false);

  const formatter = (value: string) => {
    const values = value.split('.');
    values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return values.join('.');
  };

  const parser = (value: string) => {
    return value.replace(/,/g, '');
  };
  const getDept = () => {
    getdeptAll().then((res) => {
      console.log(res);
    });
  };
  const showModal = () => {
    visible.value = true;
    getDept();
  };
  const handleOk = () => {
    const upDate = delEmptyObj(formData.value);
    updateUser(upDate).then(() => {
      visible.value = false;
    });
  };
  const handleCancel = () => {
    visible.value = false;
  };
  defineExpose({ showModal });
</script>
