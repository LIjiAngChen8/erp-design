import axios from 'axios';

export interface LoginRes {
  token: string;
}

export interface PagingData {
  productId?: string;
  current?: number; // 当前页
  size?: number; // 页大小
}
export interface Res {
  current: number;
  result: any; // 结果
  size: number;
  total: number;
}

export function getPartsList(data: PagingData) {
  return axios.post('/api/parts/list', data);
}
