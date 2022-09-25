import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const PERSONNEL: AppRouteRecordRaw = {
  path: '/personnel',
  name: 'personnel',
  component: DEFAULT_LAYOUT,
  redirect: 'audit',
  meta: {
    locale: 'menu.personnel',
    requiresAuth: true,
    icon: 'icon-user-group',
  },
  children: [
    {
      path: 'audit',
      name: 'audit',
      component: () => import('@/views/personnel/audit/index.vue'),
      meta: {
        locale: 'menu.personnel.audit',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'manage',
      name: 'manage',
      component: () => import('@/views/personnel/manage/index.vue'),
      meta: {
        locale: 'menu.personnel.marage',
        requiresAuth: true,
        order: 0,
        roles: ['*'],
      },
    },
  ],
};

export default PERSONNEL;
