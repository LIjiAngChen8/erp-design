import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  idCard: string; // 身份证
  password: string; // 密码
  verify: string; // 验证码
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}
