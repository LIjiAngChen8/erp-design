<template>
  <div class="login-form-wrapper">
    <!-- <div class="login-form-title">ss</div> -->
    <div class="login-form-sub-title">
      {{ $t('login.form.title') }}
      <div class="login-form-sub-title highlight">
        创造价值
        <svg class="svg" width="186" height="24" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M159.053 8.627c-7.302 2.24-15.056 4.62-27.597 5.83-10.947 1.056-20.69-.942-29.007-2.93-.988-.235-1.952-.47-2.894-.7-3.052-.744-5.87-1.43-8.508-1.913-3.446-.63-6.43-.878-9.022-.472-2.348.367-4.311.831-5.94 1.364.891.406 1.7.902 2.397 1.505 2.047 1.773 2.302 4.193 1.741 6.223-.542 1.964-1.886 3.777-3.43 4.739-1.603 1-4.03 1.304-6.136.724-2.214-.61-4.283-2.273-4.647-5.32-.277-2.33.31-4.572 1.996-6.498a40.09 40.09 0 00-3.207-.012c-5.231.18-11.052 1.266-15.798 2.713l-.015.004-.015.004c-9.307 2.63-16.525 3.482-23.949 2.43-7.041-1-14.16-3.7-23.313-8.019A1.496 1.496 0 011 6.302a1.508 1.508 0 012.005-.709c9.074 4.28 15.855 6.82 22.44 7.754 6.867.974 13.638.217 22.697-2.342C53.1 9.495 59.175 8.36 64.696 8.17c2.377-.082 4.686.01 6.776.336 2.461-1.335 5.788-2.355 10.09-3.027 3.086-.483 6.46-.166 10.025.485 2.732.5 5.668 1.215 8.74 1.964.928.226 1.868.456 2.819.683 8.26 1.974 17.597 3.866 28.021 2.86 12.24-1.18 19.76-3.488 27.017-5.714l.394-.122c7.111-2.18 14.053-4.265 24.835-5.035A1.487 1.487 0 01185 2a1.519 1.519 0 01-1.413 1.596c-10.415.746-17.094 2.75-24.129 4.908l-.405.124zm-87.016 3.028a9.887 9.887 0 00-.903.66c-1.827 1.507-2.36 3.195-2.145 5.007.19 1.59 1.167 2.426 2.464 2.783 1.404.386 2.95.123 3.754-.378.862-.538 1.769-1.704 2.125-2.992.338-1.224.139-2.331-.814-3.156-.984-.853-2.492-1.508-4.481-1.924z"
            fill="url(#banner-slogan_svg__paint0_linear_715:16784)"
          ></path>
          <defs>
            <linearGradient
              id="banner-slogan_svg__paint0_linear_715:16784"
              x1="-31.823"
              y1="-6.618"
              x2="175.078"
              y2="53.674"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#33C2FF"></stop>
              <stop offset="0.522" stop-color="#257CFF"></stop>
              <stop offset="1" stop-color="#165DFF"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
    <div class="login-form-introduce">{{ $t('login.form.sub.title') }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="idCard"
        :rules="[{ required: true, message: $t('login.form.idCard.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.idCard"
          :placeholder="$t('login.form.idCard.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="verify"
        :rules="[{ required: true, message: $t('login.form.verify.errMsg') }]"
        hide-label
      >
        <a-input
          v-model="userInfo.verify"
          :placeholder="$t('login.form.verify.placeholder')"
          allow-clear
        ></a-input>
        <div class="login-form-verify">
          <img :src="verifyUrl" @click="changeVerify" />
        </div>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.remember"
            @change="(setRemember as any)"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
          <a-link>{{ $t('login.form.forgetPassword') }}</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
        <a-button type="text" long class="login-form-register-btn">
          {{ $t('login.form.register') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { encode, decode } from 'js-base64';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData } from '@/api/user';

  const router = useRouter();
  const { t } = useI18n();
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();
  const verifyUrl = ref('http://124.221.96.103:8088/api/verify');
  const loginConfig = useStorage('login-config', {
    remember: false,
    idCard: 'MTIzNDU2',
    password: '',
  });
  const userInfo = reactive({
    idCard: loginConfig.value.idCard ? decode(loginConfig.value.idCard) : '',
    password: loginConfig.value.remember
      ? decode(loginConfig.value.password)
      : '',
    verify: '',
  });
  /**
   * 设置本地存储-加密
   */
  const setLoginConfig = () => {
    loginConfig.value.idCard = encode(userInfo.idCard);
    loginConfig.value.password = encode(userInfo.password);
  };
  /**
   * 刷新验证码
   */
  const changeVerify = () => {
    userInfo.verify = '';
    verifyUrl.value = `http://124.221.96.103:8088/api/verify?${new Date().getTime()}`;
  };
  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (!errors) {
      setLoading(true);
      try {
        await userStore.login(values as LoginData);
        setLoginConfig();
        router.push({ name: 'Workplace' });
        Message.success(t('login.form.login.success'));
      } finally {
        changeVerify();
        setLoading(false);
      }
    }
  };
  /**
   * 设置记住密码
   * @param value 是否记住
   */
  const setRemember = (value: boolean) => {
    loginConfig.value.remember = value;
  };
</script>

<style lang="less" scoped>
  .login-form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .highlight {
      position: relative;
      display: inline-block;
      flex-direction: column;
      background: linear-gradient(
        92.06deg,
        #33c2ff -17.9%,
        #257cff 43.39%,
        #165dff 99.4%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;

      .svg {
        position: absolute;
        bottom: -23px;
        left: 0;
        width: 100%;
      }
    }
  }

  .login-form {
    width: 320px;

    &-verify {
      width: 100%;
      padding-left: 20px;

      img {
        height: 35px;
      }
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 30px;
      line-height: 80px;
    }

    &-sub-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 30px;
      line-height: 35px;
      text-align: center;
    }

    &-introduce {
      margin: 35px;
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
