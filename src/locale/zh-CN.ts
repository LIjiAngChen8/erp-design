import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
import localeAudit from '@/views/personnel/audit/locale/zh-CN';
import localeUserManage from '@/views/personnel/manage/locale/zh-CN';
import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '总控台',
  'menu.personnel': '用户中心',
  'menu.warehouse': '仓库管理',
  'menu.department': '部门',
  'menu.warehouse.creatOrder': '新建订单',
  'menu.warehouse.orderCtenter': '订单中心',
  'menu.warehouse.product': '产品库',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  'messageBox.switchRoles': '切换角色',
  'messageBox.userCenter': '用户中心',
  'messageBox.userSettings': '用户设置',
  'messageBox.logout': '登出登录',
  ...localeSettings,
  ...localeLogin,
  ...localeWorkplace,
  ...localeAudit,
  ...localeUserManage,
};
