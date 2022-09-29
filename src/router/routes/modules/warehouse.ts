import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const WAREHOUSE: AppRouteRecordRaw = {
  path: '/warehouse',
  name: 'warehouse',
  component: DEFAULT_LAYOUT,
  redirect: 'audit',
  meta: {
    locale: 'menu.warehouse',
    requiresAuth: true,
    icon: 'icon-common',
  },
  children: [
    {
      path: 'product',
      name: 'product',
      component: () => import('@/views/warehouse/product/index.vue'),
      meta: {
        locale: 'menu.warehouse.product',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'order-center',
      name: 'OrderCtenter',
      component: () => import('@/views/warehouse/order-center/index.vue'),
      meta: {
        locale: 'menu.warehouse.orderCtenter',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'create-order',
      name: 'CreatOrder',
      component: () => import('@/views/warehouse/create-order/index.vue'),
      meta: {
        locale: 'menu.warehouse.creatOrder',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default WAREHOUSE;
