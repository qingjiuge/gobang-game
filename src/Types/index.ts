export interface IMenuItem {
  // 菜单项
  // 属性：
  // label: 菜单项显示的文字
  label: string,
  // value: 菜单项的值，用于区分
  value: string,
  // id: 菜单项的唯一标识
  id: number
}
export enum Options {
  //取消
  cancel,
  //确定
  ok
}
