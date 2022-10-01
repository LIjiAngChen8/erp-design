import axios from 'axios';

export interface LoginRes {
  token: string;
}

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
export interface Result {
  code: number;
  data?: string | boolean;
  msg?: string;
}
export interface DelData {
  id: string;
}
// 获取产品数据
export function getProductList(data: PagingData) {
  return axios.post<Res>('/api/product/list', data);
}
// 新增
export function productAdd(data: any) {
  return axios.post<Result[]>('/api/product/add', data);
}
// 删除
export function productDelete(data: DelData) {
  return axios.post<Result[]>('/api/product/delete', data);
}
