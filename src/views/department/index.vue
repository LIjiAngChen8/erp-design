<template>
  <div class="container">
    <a-card class="left-side card" title="部门架构">
      <a-input-search class="search" placeholder="输入部门名称" />
      <a-tree
        :data="treeData"
        :default-expanded-keys="['0-0-0']"
        :default-selected-keys="['0-0-0', '0-0-1']"
      />
    </a-card>
    <div class="content">1</div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const treeData = reactive([
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'Leaf',
              key: '0-0-0-0',
            },
            {
              title: 'Leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf',
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ]);
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
