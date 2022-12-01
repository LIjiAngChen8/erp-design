<template>
  <a-cascader
    :model-value="deptId"
    :options="deptList"
    :field-names="{ value: 'id', label: 'deptName' }"
    :loading="loading"
    expand-trigger="hover"
    allow-clear
    check-strictly
    allow-search
    placeholder="请选择部门"
    @change="selectChange"
  />
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getPositionAll } from '@/api/position';
  import { findCurNode } from '@/utils/index';

  const deptList = ref([]);
  const loading = ref(true);
  const deptId = ref('');
  const emits = defineEmits(['update:modelValue', 'now']);
  const selectChange = (val: any) => {
    emits('update:modelValue', val);
    emits('now', findCurNode(deptList.value, val, 'id'));
  };
  onMounted(() => {
    loading.value = true;
    getPositionAll().then((res) => {
      deptList.value = res.data;
      loading.value = false;
    });
  });
</script>
