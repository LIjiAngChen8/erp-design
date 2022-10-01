<template>
  <a-modal
    v-model:visible="visible"
    title="新建产品"
    mask-closable
    unmount-on-close
    @before-ok="handleBeforeOk"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" :model="formData">
      <a-form-item
        field="productId"
        label="编号"
        validate-trigger="blur"
        :rules="[{ required: true, message: '编号不能为空' }]"
      >
        <a-input v-model="formData.productId" />
      </a-form-item>
      <a-form-item
        field="name"
        label="产品名"
        validate-trigger="blur"
        :rules="[{ required: true, message: '产品名不能为空' }]"
      >
        <a-input v-model="formData.name" />
      </a-form-item>
      <a-form-item
        field="model"
        label="型号"
        validate-trigger="blur"
        :rules="[{ required: true, message: '型号为必填' }]"
      >
        <a-input v-model="formData.model" />
      </a-form-item>
      <a-form-item
        field="texture"
        label="材质"
        validate-trigger="blur"
        :rules="[{ required: true, message: '材质不能为空' }]"
      >
        <a-input-tag
          v-model="formData.texture"
          placeholder="可输入多种材质"
          allow-clear
        />
      </a-form-item>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label-col-flex="85px"
            field="color"
            label="颜色"
            :rules="[{ required: true, message: '颜色为必填' }]"
          >
            <a-input v-model="formData.color" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label-col-flex="60px"
            field="productSize"
            label="尺寸"
            validate-trigger="blur"
            :rules="[{ required: true, message: '型号为必填' }]"
          >
            <a-input v-model="formData.productSize" />
          </a-form-item>
        </a-col>
        <a-form-item
          field="weight"
          label="重量"
          validate-trigger="blur"
          :rules="[{ required: true, message: '型号为必填' }]"
        >
          <a-input v-model="formData.weight" />
        </a-form-item>
        <a-col :span="12">
          <a-form-item label-col-flex="85px" field="quantity" label="数量">
            <a-input-number v-model="formData.quantity" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label-col-flex="40px" field="price" label="价格">
            <a-input-number v-model="formData.price" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item field="remark" label="备注">
        <a-textarea
          v-model="formData.remark"
          placeholder="补充说明"
          :max-length="30"
          allow-clear
          show-word-limit
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { productAdd } from '@/api/product';

  const emit = defineEmits(['submit']);
  const formRef = ref();
  const visible = ref(false);
  const formData = reactive<any>({});
  /**
   * 显示弹窗
   */
  const showModal = () => {
    visible.value = true;
  };
  /**
   * 点击完成
   */
  const handleBeforeOk = (done: (arg0: boolean) => void) => {
    formRef.value.validate().then((pass: any) => {
      if (pass) {
        done(false);
      } else {
        formData.texture = formData.texture.join(',');
        productAdd(formData).then(() => {
          Message.success('添加产品成功');
          formRef.value.resetFields();
          done(true);
          emit('submit');
        });
      }
    });
  };
  const handleCancel = () => {
    formRef.value.resetFields();
    visible.value = false;
  };
  defineExpose({ showModal });
</script>
