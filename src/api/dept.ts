import axios from 'axios';

export interface LoginRes {
  token: string;
}
export function getdeptList(data: { pid: string }) {
  return axios.post<LoginRes>('/api/dept/list', data);
}

export function getdeptAll() {
  return axios.post<LoginRes>('/api/dept/all');
}
