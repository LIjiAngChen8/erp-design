<template>
  <div class="container">
    <a-card class="left-side card" title="部门架构">
      <a-input-search
        v-model="searchKey"
        class="search"
        placeholder="输入部门名称"
      />
      <a-tree
        :data="treeData"
        block-node
        :field-names="{ key: 'id', title: 'deptName' }"
      >
        <template #title="nodeData">
          <template v-if="getMatchIndex(nodeData?.deptName) < 0"
            >{{ nodeData?.deptName }}
          </template>
          <template v-else>
            <span>{{ nodeData?.deptName?.substr(0, keyIndex) }}</span>
            <span style="color: var(--color-primary-light-4)">
              {{ nodeData?.deptName?.substr(keyIndex, searchKey.length) }}
            </span>
            <span>{{
              nodeData?.deptName?.substr(keyIndex + searchKey.length)
            }}</span>
          </template>
        </template>
      </a-tree>
    </a-card>
    <div class="content">1</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { getdeptAll } from '@/api/dept';

  const searchKey = ref('');
  const keyIndex = ref(-1);
  const originTreeData = ref([]);
  function searchData(keyword: string) {
    const loop = (data: any) => {
      const result: any = [];
      data.forEach((item: any) => {
        if (item.deptName.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          result.push({ ...item });
        } else if (item.children) {
          const filterData = loop(item.children);
          if (filterData.length) {
            result.push({
              ...item,
              children: filterData,
            });
          }
        }
      });
      return result;
    };
    return loop(originTreeData.value);
  }
  const treeData = computed(() => {
    if (!searchKey.value) return originTreeData.value;
    return searchData(searchKey.value);
  });
  const getMatchIndex = (title: string) => {
    if (!searchKey.value) {
      keyIndex.value = -1;
      return -1;
    }
    const index = title.toLowerCase().indexOf(searchKey.value.toLowerCase());
    keyIndex.value = index;
    return index;
  };
  onMounted(() => {
    getdeptAll().then((res) => {
      originTreeData.value = res.data;
    });
  });
</script>

<style scoped lang="less">
  .container {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 16px;

    .left-side {
      width: 300px;
      background-color: var(--color-bg-1);
      border: none;
      border-radius: 4px;

      .search {
        margin-bottom: 10px;
      }
    }

    .content {
      flex: 1;
      margin-left: 16px;
      padding: 0 16px;
      background-color: var(--color-bg-1);
    }
  }
</style>

<style lang="less">
  .card {
    border: none;
    border-radius: 4px;

    & > .arco-card-header {
      height: auto;
      padding: 20px 20px 10px 20px;
      border: none;
    }

    & > .arco-card-body {
      padding: 0 20px 20px 20px;
    }
  }
</style>
