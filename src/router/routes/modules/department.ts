import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/department',
  name: 'department',
  component: DEFAULT_LAYOUT,
  redirect: '/department/index',
  meta: {
    locale: 'menu.department',
    requiresAuth: true,
    icon: 'icon-mind-mapping',
    hideChildrenInMenu: true,
    order: 1,
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/department/index.vue'),
      meta: {
        locale: 'menu.department',
        requiresAuth: true,
        activeMenu: 'department',
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
