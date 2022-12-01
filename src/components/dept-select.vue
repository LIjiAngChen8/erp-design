<template>
  <a-cascader
    :model-value="value"
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
  import { getdeptAll } from '@/api/dept';
  import { findCurNode } from '@/utils/index';

  type Props = {
    value: any;
    label: any;
  };
  defineProps<Props>();
  const deptList = ref([]);
  const loading = ref(true);
  const emits = defineEmits(['update:value', 'update:label', 'now']);
  const selectChange = (val: any) => {
    emits('update:value', val);
    emits('update:label', findCurNode(deptList.value, val, 'id').deptName);
    // emits('now', findCurNode(deptList.value, val, 'id'));
  };
  onMounted(() => {
    loading.value = true;
    getdeptAll().then((res) => {
      deptList.value = res.data;
      loading.value = false;
    });
  });
</script>
