import { nanoid } from 'nanoid';
import configConstant from '../../utils/configConstant';

/**
 * @description: 处理组件数据
 * @return {*}
 */
class WidgetManager {
  constructor() {
    this.map = {};
    this.init();
  }

  get widgetContext() {
    return {
      util: {
        getConstant(key) {
          return configConstant[key];
        },
      },
    };
  }

  init() {
    /* eslint-disable */
    const modules = import.meta.glob('../../widgets/*/index.js', {
      eager: true,
    });
    /* eslint-enable */
    for (const k in modules) {
      const m = modules[k];
      this.registerWidget(m.type, m.default);
    }
  }

  getWidgetMetadata(type) {
    return this.map[type];
  }

  getWidgetConfig(type) {
    return this.map[type].config;
  }

  getWidgetDefine(type) {
    return this.map[type].define;
  }

  registerWidget(type, config) {
    this.map[config.type] = config;
  }

  /**
   * @description: 生成组件模型
   * @param {*} type
   * @return {*}
   */
  createWidgetModel(type) {
    const configFunc = this.getWidgetConfig(type);
    const defaultValue = configFunc(this.widgetContext).defaultValue;
    return {
      id: nanoid(),
      ...defaultValue,
    };
  }

  getContainerLayout(id) {
  }
}

const widgetManger = new WidgetManager();

export default widgetManger;
