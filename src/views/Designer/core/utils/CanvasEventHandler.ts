import camelCase from 'lodash/camelCase'

type canvasEventHandlerProps = {
  rootContainerId: string;
  widgetKey: string;
  containerKey: string;
};

/**
 * @description: 处理画布事件相关
 * @return {*}
 */
export default class CanvasEventHandler {
  rooContainerId: canvasEventHandlerProps['rootContainerId'];
  containerKey: canvasEventHandlerProps['containerKey'];
  widgetKey: canvasEventHandlerProps['widgetKey'];

  constructor(props: canvasEventHandlerProps) {
    this.rooContainerId = props.rootContainerId || 'root';

    let widgetKey = (props.widgetKey || 'data-widget-id').replace('data-', '');
    widgetKey = camelCase(widgetKey)
    this.widgetKey = widgetKey

    let containerKey = (props.containerKey || 'data-container-id').replace('data-', '');
    containerKey = camelCase(containerKey)
    this.containerKey = containerKey
  }

  getWidgetIds(ev: MouseEvent) {
    const paths: Array<HTMLDivElement> = Array.from(ev.composedPath());
    const containers = [];
    let start = 0;
    let target: HTMLDivElement = paths[start];
    while (target) {
      if (target.dataset[this.widgetKey]) {
        containers.push(target.dataset[this.widgetKey]);
      }
      if (target.dataset[this.widgetKey] === this.rooContainerId) {
        return containers;
      }
      start++;
      target = paths[start];
    }
  }

  getTargetContainerId(ev: MouseEvent) {
    const paths: Array<HTMLDivElement> = Array.from(ev.composedPath());
    let start = 0;
    let target: HTMLDivElement = paths[start];
    while (target) {
      if (target.dataset[this.containerKey]) {
        return target.dataset[this.containerKey]
      }
      start++;
      target = paths[start];
    }
  }
}
