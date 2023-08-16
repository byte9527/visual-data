import config from "./config"
import RenderContainer from "./RenderContainer.vue"
export default {
  // 名称
  name: "基础容器",
  // 显示的icon
  icon: "",
  // 组件类型，唯一表示
  type: "renderContainer",
  // 组件定义，用于渲染
  define: RenderContainer,
  // 组件版本，暂留
  version: "1.0"
  // 配置，用于设计时的属性设置
  config: config,
  // 是否展示在组件面板中
  showInPanel: true,
  // 类型分类
  category: "base/base"
}