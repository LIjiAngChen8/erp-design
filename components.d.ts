import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AAffix: typeof import('@arco-design/web-vue')['Affix'];
    AAvatar: typeof import('@arco-design/web-vue')['Avatar'];
    ABreadcrumb: typeof import('@arco-design/web-vue')['Breadcrumb'];
    ABreadcrumbItem: typeof import('@arco-design/web-vue')['BreadcrumbItem'];
    AButton: typeof import('@arco-design/web-vue')['Button'];
    ACard: typeof import('@arco-design/web-vue')['Card'];
    ACarousel: typeof import('@arco-design/web-vue')['Carousel'];
    ACarouselItem: typeof import('@arco-design/web-vue')['CarouselItem'];
    ACheckbox: typeof import('@arco-design/web-vue')['Checkbox'];
    ACol: typeof import('@arco-design/web-vue')['Col'];
    AConfigProvider: typeof import('@arco-design/web-vue')['ConfigProvider'];
    ADivider: typeof import('@arco-design/web-vue')['Divider'];
    ADoption: typeof import('@arco-design/web-vue')['Doption'];
    ADrawer: typeof import('@arco-design/web-vue')['Drawer'];
    ADropdown: typeof import('@arco-design/web-vue')['Dropdown'];
    AForm: typeof import('@arco-design/web-vue')['Form'];
    AFormItem: typeof import('@arco-design/web-vue')['FormItem'];
    AGrid: typeof import('@arco-design/web-vue')['Grid'];
    AGridItem: typeof import('@arco-design/web-vue')['GridItem'];
    AInput: typeof import('@arco-design/web-vue')['Input'];
    AInputNumber: typeof import('@arco-design/web-vue')['InputNumber'];
    AInputPassword: typeof import('@arco-design/web-vue')['InputPassword'];
    ALayout: typeof import('@arco-design/web-vue')['Layout'];
    ALayoutContent: typeof import('@arco-design/web-vue')['LayoutContent'];
    ALayoutSider: typeof import('@arco-design/web-vue')['LayoutSider'];
    ALink: typeof import('@arco-design/web-vue')['Link'];
    AMenu: typeof import('@arco-design/web-vue')['Menu'];
    AMenuItem: typeof import('@arco-design/web-vue')['MenuItem'];
    ARadio: typeof import('@arco-design/web-vue')['Radio'];
    ARadioGroup: typeof import('@arco-design/web-vue')['RadioGroup'];
    AResult: typeof import('@arco-design/web-vue')['Result'];
    ARow: typeof import('@arco-design/web-vue')['Row'];
    ASelect: typeof import('@arco-design/web-vue')['Select'];
    ASpace: typeof import('@arco-design/web-vue')['Space'];
    ASpin: typeof import('@arco-design/web-vue')['Spin'];
    AStatistic: typeof import('@arco-design/web-vue')['Statistic'];
    ASubMenu: typeof import('@arco-design/web-vue')['SubMenu'];
    ASwitch: typeof import('@arco-design/web-vue')['Switch'];
    ATable: typeof import('@arco-design/web-vue')['Table'];
    ATableColumn: typeof import('@arco-design/web-vue')['TableColumn'];
    ATag: typeof import('@arco-design/web-vue')['Tag'];
    ATooltip: typeof import('@arco-design/web-vue')['Tooltip'];
    ATypographyParagraph: typeof import('@arco-design/web-vue')['TypographyParagraph'];
    ATypographyTitle: typeof import('@arco-design/web-vue')['TypographyTitle'];
    RouterLink: typeof import('vue-router')['RouterLink'];
    RouterView: typeof import('vue-router')['RouterView'];
  }
}

export {};
