export interface AppState {
  theme: string;
  colorWeak: boolean;
  navbar: boolean;
  menu: boolean;
  hideMenu: boolean; // 隐藏菜单栏
  menuCollapse: boolean;
  themeColor: string;
  menuWidth: number;
  globalSettings: boolean;
  device: string; // 设备
  tabBar: boolean;
  // menuFromServer: boolean;
  [key: string]: unknown;
}
