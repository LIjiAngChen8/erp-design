import axios from 'axios';

export interface PagingData {
  current: number; // 当前页
  size: number; // 页大小
  idCard?: string; // 身份证ID（可选）
  userName?: string; // 身份证ID（可选）
  status?: string; // 身份证ID（可选）
}

export interface Res {
  current: number;
  result: any; // 结果
  size: number;
  total: number;
}

export interface updateData {
  id: string;
  status: string;
}
// 获取注册人员
export function getNewRegister(data: PagingData) {
  return axios.post<Res>('/api/user/newRegister', data);
}
// 获取全部用户
export function getUserList(data: PagingData) {
  return axios.post<Res>('/api/user/userList', data);
}
// 更新用户状态
export function updateUser(data: updateData) {
  return axios.post<Res>('/api/user/updateUser', data);
}
