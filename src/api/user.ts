import axios from 'axios';
import { UserState } from '@/store/modules/user/types';
import { getRefreshToken } from '@/utils/auth';

export interface LoginData {
  idCard: string; // 身份证
  password: string; // 密码
  verify: string; // 验证码
}

export interface LoginRes {
  token: string;
  refreshToken: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}

export function logout() {
  const freshToke = getRefreshToken();
  return axios.post<LoginRes>(`/api/user/logout?refreshToken=${freshToke}`);
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}
