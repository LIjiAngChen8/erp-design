<template>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="visible = false">
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
      <a-form-item field="deptId" label="部门">
        <a-cascader
          v-model="formData.deptId"
          :options="data.deptList"
          :field-names="fieldNames"
          expand-trigger="hover"
          allow-clear
          check-strictly
          allow-search
        />
      </a-form-item>
      <a-form-item field="positionId" label="职位">
        <a-cascader
          v-model="formData.positionId"
          :options="options"
          :field-names="fieldNames"
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
  import { ref, toRefs, reactive } from 'vue';
  import { getdeptAll } from '@/api/dept';
  import { updateUser } from '@/api/personnel';
  import { getPositionList } from '@/api/position';
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
      createBy: null,
      createTime: null,
      updateBy: null,
      updateTime: null,
      delFlag: 0,
      id: 566632450,
      deptName: '管理1部',
      pid: null,
      seq: 1,
      children: [
        {
          createBy: '1',
          createTime: '2022-09-24 22:19:44',
          updateBy: '1',
          updateTime: '2022-09-24 22:19:44',
          delFlag: 0,
          id: 1883643906,
          deptName: '机床部',
          pid: 566632450,
          seq: 0,
          children: [
            {
              createBy: '1',
              createTime: '2022-09-25 23:02:31',
              updateBy: '1',
              updateTime: '2022-09-25 23:02:31',
              delFlag: 0,
              id: 1883643908,
              deptName: '小组1',
              pid: 1883643906,
              seq: 0,
              children: [],
            },
          ],
        },
        {
          createBy: '1',
          createTime: '2022-09-25 23:07:21',
          updateBy: '1',
          updateTime: '2022-09-25 23:07:21',
          delFlag: 0,
          id: 1883643910,
          deptName: '实施部',
          pid: 566632450,
          seq: 0,
          children: [],
        },
      ],
    },
    {
      createBy: null,
      createTime: null,
      updateBy: null,
      updateTime: null,
      delFlag: 0,
      id: 1883643905,
      deptName: '管理2部',
      pid: null,
      seq: 0,
      children: [
        {
          createBy: '1',
          createTime: '2022-09-25 23:03:08',
          updateBy: '1',
          updateTime: '2022-09-25 23:03:08',
          delFlag: 0,
          id: 1883643909,
          deptName: '设计组',
          pid: 1883643905,
          seq: 0,
          children: [],
        },
      ],
    },
    {
      createBy: '1',
      createTime: '2022-09-24 22:51:29',
      updateBy: '1',
      updateTime: '2022-09-24 22:51:29',
      delFlag: 0,
      id: 1883643907,
      deptName: '人事部门',
      pid: null,
      seq: 0,
      children: [],
    },
  ];
  const emit = defineEmits(['submit']);
  const fieldNames = { value: 'id', label: 'deptName' };
  const { userInfo: formData } = toRefs(props);
  const visible = ref(false);
  const data = reactive({
    deptList: [],
  });
  const formatter = (value: string) => {
    const values = value.split('.');
    values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return values.join('.');
  };

  const parser = (value: string) => {
    return value.replace(/,/g, '');
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
   * 获取全部职位
   */
  const getPosition = () => {
    getPositionList().then((res) => {
      console.log(res);
    });
  };
  /**
   * 显示弹窗
   */
  const showModal = () => {
    visible.value = true;
    getDept();
    getPosition();
  };
  const handleOk = () => {
    formData.value.password = '';
    const upDate = delEmptyObj(formData.value);
    updateUser(upDate).then(() => {
      visible.value = false;
      emit('submit');
    });
  };
  defineExpose({ showModal });
</script>
