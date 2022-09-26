import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import {
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken,
} from '@/utils/auth';
import { useUserStore } from '@/store';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}
let isRefreshing = false; // 判断是否刷新Token中
let retryRequests: ((token: any) => void)[] = []; // 保存需要重新发起请求的队列
const getNewToken = () => {
  const freshToke = getRefreshToken();
  return axios.post(`/api/user/refreshToken?refreshToken=${freshToke}`);
};

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.token = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 401) {
        if (!isRefreshing) {
          isRefreshing = true; // 上锁
          return getNewToken()
            .then((results) => {
              const { token } = results.data.token;
              setToken(results.data.token);
              setRefreshToken(results.data.refreshToken);
              response.headers.token = `${token}`;
              retryRequests.forEach((cb) => cb(token));
              retryRequests = []; // 重新请求完清空
              return axios(response.config);
            })
            .catch((error) => {
              Message.warning({
                content: '抱歉，您的登录状态已失效，请重新登录！',
                duration: 5 * 1000,
              });
              useUserStore().logout();
              window.location.reload();
              return Promise.reject(error);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
        return new Promise((resolve) => {
          retryRequests.push((token: any) => {
            response.headers.token = `${token}`;
            resolve(axios(response.config));
          });
        });
      }
      Message.error({
        content: res.msg || 'Error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.msg || '获取数据失败',
      duration: 1 * 1000,
    });
    return Promise.reject(error);
  }
);
