<template>
  <div class="card-wrap">
    <a-row :gutter="[24, 12]">
      <a-col
        v-for="(item, index) in productList"
        :key="index"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
        class="list-col"
        style="min-height: 162px"
      >
        <a-card class="card-reset" hoverable>
          <template #title>
            <a-typography-paragraph bold copyable>{{
              item.name
            }}</a-typography-paragraph>
          </template>
          <template #actions>
            <a-popconfirm
              content="确定要删除?"
              type="warning"
              @ok="delProduct(item)"
            >
              <span class="icon-hover"> <icon-delete /></span>
            </a-popconfirm>
            <span class="icon-hover"> <IconMore /> </span>
          </template>
          <template #extra>
            <a-button type="text" size="mini" @click="handleClick(item)">
              配件<icon-right />
            </a-button>
          </template>
          <a-image
            class="cover"
            width="100%"
            height="100px"
            fit="scale-down"
            :src="item.productImgList[0]?.productUrl"
          ></a-image>
          <a-descriptions
            style="margin-bottom: 10px"
            :data="getInfo(item)"
            size="mini"
            title="产品信息"
            :column="2"
          />
          <a-space>
            <a-tag v-for="tag in item.texture?.split(',')" :key="tag">
              {{ tag }}
            </a-tag>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
    <a-drawer
      :width="550"
      :visible="visible"
      unmount-on-close
      :footer="false"
      @cancel="handleCancel"
    >
      <template #title> 配件表 </template>
      <a-card v-for="item in data.partsList" :key="item.id" :bordered="false">
        <div class="parts-item">
          <a-image
            width="130px"
            height="100px"
            fit="scale-down"
            src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-efbfcb02-017d-4e68-a2c7-f92e33192dbb/6d2f132c-effb-4d80-8aea-9f756374b04e.png"
          />
          <a-descriptions
            class="info"
            :data="getPartInfo(item)"
            :title="item.name"
            layout="inline-horizontal"
            :column="2"
          />
        </div>
      </a-card>
      <a-empty v-if="data.partsList?.length === 0" />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { toRefs, PropType, ref, reactive } from 'vue';
  import { getPartsList } from '@/api/parts';
  import { productDelete } from '@/api/product';

  type producItem = {
    id?: string;
    name?: string;
    texture?: string;
    color?: string;
    productSize?: string;
    quantity?: string;
    model?: string;
    weight?: string;
    price?: string;
    remark?: string;
    createBy?: string;
    createTime?: string;
    updateTime?: string;
    updateBy?: string;
    productImgList?: any;
  };

  const emit = defineEmits(['delete']);
  const props = defineProps({
    productList: Array as never as PropType<[producItem]>,
  });
  const getInfo = (item: any) => {
    return [
      {
        label: '型号',
        value: item.model,
      },
      {
        label: '颜色',
        value: item.color,
      },
      {
        label: '尺寸',
        value: item.productSize,
      },
      {
        label: '重量',
        value: item.weight,
      },
      {
        label: '数量',
        value: item.quantity,
      },
      {
        label: '价格',
        value: item.price,
      },
    ];
  };
  const getPartInfo = (item: any) => {
    return [
      {
        label: '颜色',
        value: item.color,
      },
      {
        label: '尺寸',
        value: item.model,
      },
      {
        label: '重量',
        value: item.weight,
      },
      {
        label: '材质',
        value: item.texture,
      },
      {
        label: '价格',
        value: item.price,
      },
      {
        label: '更新时间',
        value: item.updateTime,
      },
    ];
  };
  const { productList } = toRefs(props);
  const visible = ref(false);
  const data = reactive({
    partsList: [] as any,
  });
  /**
   * 获取产品的配件数据
   * @param productId 产品ID
   */
  const getParts = (productId: string) => {
    getPartsList({ productId }).then((res) => {
      data.partsList = res.data;
      console.log(res);
    });
  };
  /**
   * 删除单个产品
   */
  const delProduct = (item: any) => {
    productDelete({ id: item.id }).then(() => {
      emit('delete');
    });
  };
  const handleClick = (item: any) => {
    visible.value = true;
    getParts(item.id);
  };
  const handleCancel = () => {
    visible.value = false;
  };
</script>

<style scoped lang="less">
  .cover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
  }

  .arco-typography {
    margin-bottom: unset;
  }

  .remak {
    margin: 4px 0;
    background-color: var(--color-neutral-2);
    border-radius: 5px;
  }

  .parts-item {
    display: flex;
    align-items: center;
    border-radius: 10px;

    .info {
      margin-left: 16px;
    }

    .info.arco-descriptions-title {
      margin-bottom: 0 !important;
      color: var(--arcoblue-6);
    }
  }

  .icon-hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: all 0.1s;
  }

  .icon-hover:hover {
    background-color: rgb(var(--gray-2));
  }
</style>

<style lang="less">
  .card-reset {
    .arco-card-actions {
      margin-top: 0 !important;
    }
  }
</style>
