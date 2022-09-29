import axios from 'axios';

export interface LoginRes {
  token: string;
}

export function getPositionList() {
  return axios.post<LoginRes>('/api/position/list');
}

export function getPositionAll() {
  return axios.post('/api/position/all');
}
