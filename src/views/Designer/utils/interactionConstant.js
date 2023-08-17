/*
 * @Author: zhangm
 * @Date: 2021-12-06 10:11:31
 * @LastEditTime: 2023-08-17 19:44:52
 * @LastEditors: zhangm
 * @Description:
 * @FilePath: \visual-data\src\views\Designer\utils\interactionConstant.js
 */
export const CLICK_DATA_ITEM = 'click_data_item';
export const HOVER_DATA_ITEM = 'hover_data_item';
export const LEAVE_DATA_ITEM = 'leave_data_item';
export const CLICK_TEXT_ITEM = 'click_text_item';
export const HOVER_TEXT_ITEM = 'hover_text_item';
export const LEAVE_TEXT_ITEM = 'leave_text_item';

export const CLICK_ROW = 'click_row';
export const HOVER_ROW = 'hover_row';
export const CLICK_CELL = 'click_cell';
export const HOVER_CELL = 'hover_cell';

export const SWITCH_SELECTED_ITEM = 'switch_selected_item';
export const SWITCH_STATE = 'switch_state';

export const COMPONENT_DID_MOUNT = 'component_did_mount';
export const COMPONENT_DATA_LOADED = 'component_data_loaded';

export const RUNTIME_DATA_UPDATE = 'runtimeDataUpdate';

export const eventTypeEnum = {
  operate: 'operate', // 通用操作
  lifeCircleHook: 'lifeCircleHook', // 组件生命周期
  dataCircleHook: 'dataCircleHook', // 组件数据周期
  widgetInternalOperate: 'widgetInternalOperate', // 内部事件,
  globalEvent: 'globalEvent',
};

// 通用鼠标事件
export const commonMouseEvents = autoFillKey(
  {
    click: {
      name: '鼠标单击',
    },
    mouseenter: {
      name: '鼠标移入',
    },
    mouseleave: {
      name: '鼠标移出',
    },
  },
  { eventType: eventTypeEnum.operate },
);

// 动作分类
export const actionCategoryMap = autoFillKey({
  commonUIAction: {
    name: '组件通用动作',
  },
  componentSelfAction: {
    name: '组件特定动作',
  },
  globalAction: {
    name: '全局动作',
  },
});

// 通用组件周期事件
export const componentHookEvents = autoFillKey(
  {
    [COMPONENT_DID_MOUNT]: {
      name: '组件初始化完成',
    },
  },
  { eventType: eventTypeEnum.lifeCircleHook },
);
// 通用组件数据周期事件
export const componentDataHookEvents = autoFillKey(
  {
    [COMPONENT_DATA_LOADED]: {
      name: '数据请求完成',
      disabled: false,
    },
  },
  { eventType: eventTypeEnum.dataCircleHook },
);

// 图表组件事件
export const chartEvents = autoFillKey(
  {
    [CLICK_DATA_ITEM]: {
      name: '点击数据项',
      hasParamOptions: true,
    },
    [HOVER_DATA_ITEM]: {
      name: '悬浮数据项',
      hasParamOptions: true,
    },
    [LEAVE_DATA_ITEM]: {
      name: '离开数据项',
      hasParamOptions: true,
    },
  },
  { eventType: eventTypeEnum.widgetInternalOperate },
);

export const textEvents = autoFillKey(
  {
    [CLICK_TEXT_ITEM]: {
      name: '点击内容',
      hasParamOptions: true,
      paramOptions: [{ label: '内容', value: '${param.content}' }],
    },
    [HOVER_TEXT_ITEM]: {
      name: '悬浮内容',
      hasParamOptions: [{ label: '内容', value: '${param.content}' }],
    },
    [LEAVE_TEXT_ITEM]: {
      name: '离开内容',
      hasParamOptions: [{ label: '内容', value: '${param.content}' }],
    },
  },
  { eventType: eventTypeEnum.widgetInternalOperate },
);

// 表格组事件
export const tableEvents = autoFillKey(
  {
    [CLICK_ROW]: {
      name: '点击行',
      hasParamOptions: true,
    },
    [HOVER_ROW]: {
      name: '悬浮行',
      hasParamOptions: true,
    },
  },
  { eventType: eventTypeEnum.widgetInternalOperate },
);

// 交互组件通用事件    //  radio / select / tab
export const interactionComponentEvents = autoFillKey(
  {
    selectValueChange: {
      name: '选择项改变',
      hasParamOptions: true,
    },
  },
  { eventType: eventTypeEnum.widgetInternalOperate },
);

export const datePickerEvents = autoFillKey(
  {
    dateValueChange: {
      name: '日期改变',
      hasParamOptions: true,
      paramOptions: [
        { label: '日期', value: '${param.formatDate}' },
        { label: '时间戳', value: '${param.timestamp}' },
      ],
    },
  },
  { eventType: eventTypeEnum.widgetInternalOperate },
);

export const dateRangePickerEvents = autoFillKey(
  {
    dateValueChange: {
      name: '日期范围改变',
      hasParamOptions: true,
      paramOptions: [
        { label: '日期范围', value: '${param.formatDate}' },
        // { label: '时间戳', value: '${param.timestamp}' }
      ],
    },
  },
  { eventType: eventTypeEnum.widgetInternalOperate },
);

export const dateRangeStartPickerEvents = autoFillKey(
  {
    dateValueChangeRangeStart: {
      name: '日期范围改变之开始日期',
      hasParamOptions: true,
      paramOptions: [{ label: '开始日期', value: '${param.formatDate}' }],
    },
  },
  { eventType: eventTypeEnum.widgetInternalOperate },
);

export const dateRangeEndPickerEvents = autoFillKey(
  {
    dateValueChangeRangeEnd: {
      name: '日期范围改变之结束日期',
      hasParamOptions: true,
      paramOptions: [{ label: '结束日期', value: '${param.formatDate}' }],
    },
  },
  { eventType: eventTypeEnum.widgetInternalOperate },
);

export const mapMarkerClickOnSymbolThemeLayerEvents = autoFillKey(
  {
    mapMarkerClickOnSymbolThemeLayer: {
      name: '图片散点图点击标记',
      hasParamOptions: true,
      paramOptions: [{ label: '标记点详情', value: '${param}' }],
    },
  },
  { eventType: eventTypeEnum.widgetInternalOperate },
);

// 交互组件通用动作
export const interactionComponentActions = autoFillKey({
  [SWITCH_SELECTED_ITEM]: {
    name: '切换选项',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, param, props }) {
      instance.setSelectValue(props);
    },
    propsConfig: {
      options: {
        param: {
          type: 'select',
          name: '状态参数',
          props: {
            filterable: true,
            'allow-create': true,
            'default-first-option': true,
            clearable: true,
            options: '${util.getParamOptions()}',
          },
        },
        field: {
          type: 'select',
          name: '字段选择',
          props: {
            options: [
              { label: '标题', value: 'label' },
              { label: '选项', value: 'value' },
            ],
          },
        },
      },
      // updateDeps: ['form.animation.show']
    },
    propsValue: {},
    targetFilter: specialActionTargetFilter,
  },
});
export const dynamicPanelActions = autoFillKey({
  [SWITCH_STATE]: {
    name: '切换动态面板状态',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, param, props }) {
      instance.setSelectValue(props);
    },
    propsConfig: {
      options: {
        param: {
          type: 'select',
          name: '状态参数',
          props: {
            filterable: true,
            'allow-create': true,
            'default-first-option': true,
            clearable: true,
            options: '${util.getParamOptions()}',
          },
        },
      },
    },
    propsValue: {},
    targetFilter: specialActionTargetFilter,
  },
  start_loop: {
    name: '轮播动态面板',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, param, props }) {
      instance.startLoop(props);
    },
    targetFilter: specialActionTargetFilter,
  },
  stop_loop: {
    name: '停止轮播动态面板',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, param, props }) {
      instance.stopLoop(props);
    },
    targetFilter: specialActionTargetFilter,
  },
});

export function defaultTargetFilter() {
  return true;
}

// 特殊动作目标筛选器
export function specialActionTargetFilter(key, config) {
  const { actions = {} } = config.interactionConfig || {};
  return Object.keys(actions).includes(key);
}

export function defaultTargetConfig() {
  return {
    type: 'select',
    options: [],
    props: {},
  };
}

function autoFillKey(obj, extendObj = {}) {
  Object.keys(obj).forEach((key) => {
    const item = obj[key];
    item.key = key;
    Object.assign(item, extendObj);
  });
  return obj;
}

const defaultAnimationConfig = {
  animation: {
    type: 'group',
    name: '动画设置',
    // enableHide: true,
    props: {
      hideHeader: true,
    },
    children: {
      show: {
        type: 'switch',
        name: '动画设置',
      },
      duration: {
        type: 'number',
        name: '动画时长',
        min: 0,
        showInPanel: '${form.animation.show}',
      },
      timingFunction: {
        type: 'select',
        name: '过度效果',
        props: {
          options: [
            { label: '匀速', value: 'linear' },
            { label: '慢-快-慢', value: 'ease' },
            { label: '慢-快', value: 'ease-in' },
            { label: '快-慢', value: 'ease-out' },
            { label: '慢-匀速-慢', value: 'ease-in-out' },
          ],
        },
        showInPanel: '${form.animation.show}',
      },
      delay: {
        type: 'number',
        name: '延时',
        min: 0,
        showInPanel: '${form.animation.show}',
      },
    },
  },
};

const defaultAnimationValue = {
  animation: {
    show: false,
    timingFunction: 'linear',
    duration: 1000,
    delay: 0,
  },
};

// 通用UI动作
export const commonUIActions = autoFillKey(
  {
    show: {
      // 名称
      name: '显示',
      // 类型分类
      category: actionCategoryMap.commonUIAction.key,
      // 动作实现调度
      implementation({ wrapper, event, props, instance }) {
        wrapper.updateDisplay({ display: 'block' }, props);
      },
      // 动作相关设置
      propsConfig: {
        options: {
          ...defaultAnimationConfig,
        },
        // updateDeps: ['form.animation.show']
      },
      propsValue: {
        ...defaultAnimationValue,
      },
    },
    hide: {
      name: '隐藏',
      category: actionCategoryMap.commonUIAction.key,
      implementation({ wrapper, props }) {
        wrapper.updateDisplay({ display: 'none' }, props);
      },
      propsConfig: {
        options: {
          ...defaultAnimationConfig,
        },
        // updateDeps: ['form.animation.show']
      },
      propsValue: {
        ...defaultAnimationValue,
      },
    },
    changeVisible: {
      name: '显隐切换',
      category: actionCategoryMap.commonUIAction.key,
      implementation({ wrapper, props }) {
        wrapper.updateDisplay(
          {
            display: wrapper.runtimeStyle.display === 'none' ? 'block' : 'none',
          },
          props,
        );
      },
      propsConfig: {
        options: {
          ...defaultAnimationConfig,
        },

        // updateDeps: ['form.animation.show']
      },
      propsValue: {
        ...defaultAnimationValue,
      },
    },
    move: {
      name: '移动',
      category: actionCategoryMap.commonUIAction.key,
      implementation({ wrapper, props }) {
        wrapper.move(props);
      },
      propsConfig: {
        options: {
          moveInfo: {
            type: 'group',
            props: {
              hideHeader: true,
            },
            children: {
              moveType: {
                type: 'select',
                name: '定位方式',
                props: {
                  options: [
                    { label: '相对定位', value: 'relative' },
                    { label: '绝对定位', value: 'absolute' },
                  ],
                },
              },
              moveX: {
                type: 'number',
                name: '${form.moveInfo.moveType === "relative" ? "位移-X" : "坐标-X"}',
              },
              moveY: {
                type: 'number',
                name: '${form.moveInfo.moveType === "relative" ? "位移-Y" : "坐标-Y"}',
              },
            },
          },
          ...defaultAnimationConfig,
        },
        // updateDeps: ['form.animation.show', 'form.moveInfo.moveType']
      },
      propsValue: {
        moveInfo: {
          moveType: 'relative',
          moveX: 0,
          moveY: 0,
        },
        ...defaultAnimationValue,
      },
    },
    rotate: {
      name: '旋转',
      category: actionCategoryMap.commonUIAction.key,
      implementation({ wrapper, param, props }) {
        wrapper.rotate(props);
      },
      propsConfig: {
        options: {
          deg: {
            type: 'number',
            name: '旋转角度',
          },
          ...defaultAnimationConfig,
        },
        // updateDeps: ['form.animation.show']
      },
      propsValue: {
        ...defaultAnimationValue,
      },
    },
  },
  {
    // 哪些组件可被选
    targetFilter(key, config) {
      const filter = config?.interactionConfig?.targetFilter;
      if (filter) {
        filter(key);
      } else {
        return true;
      }
    },
  },
);

// 通用数据动作
export const commonDataActions = autoFillKey({
  refreshData: {
    name: '更新数据',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ wrapper }) {
      wrapper.autoGetData();
    },
  },
});

// 聚合地图-子图层隐藏动作
export const OneMapWidgetActions = autoFillKey({
  hideOneMapSublayer: {
    name: '聚合地图子图层隐藏',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, props }) {
      instance.setMapLayerState(props, false);
    },
    propsConfig: {
      options: {
        param: {
          type: 'select',
          name: '子图层',
          props: {
            clearable: true,
            multiple: true,
            options: '${util.getOneMapChildLayer(context.targets)}',
          },
        },
      },
    },
    propsValue: {},
    targetFilter: specialActionTargetFilter,
  },
  showOneMapSublayer: {
    name: '聚合地图子图层显示',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, props }) {
      instance.setMapLayerState(props, true);
    },
    propsConfig: {
      options: {
        param: {
          type: 'select',
          name: '子图层',
          props: {
            clearable: true,
            multiple: true,
            options: '${util.getOneMapChildLayer(context.targets)}',
          },
        },
      },
    },
    propsValue: {},
    targetFilter: specialActionTargetFilter,
  },
});

export const SymbolThemeLayerWidgetActions = autoFillKey({
  setDraw: {
    name: '聚合地图激活点选',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, props }) {
      instance.apiAddDraw(props);
    },
    propsConfig: {
      options: {
        longitude: {
          type: 'select',
          name: '经度',
          props: {
            filterable: true,
            'allow-create': true,
            'default-first-option': true,
            options: '${util.getParamOptions()}',
          },
        },
        latitude: {
          type: 'select',
          name: '纬度',
          props: {
            filterable: true,
            'allow-create': true,
            'default-first-option': true,
            options: '${util.getParamOptions()}',
          },
        },
        radius: {
          type: 'select',
          name: '半径(km)',
          props: {
            filterable: true,
            'allow-create': true,
            'default-first-option': true,
            options: '${util.getParamOptions()}',
          },
        },
      },
    },
    targetFilter: specialActionTargetFilter,
  },

  removeDraw: {
    name: '聚合地图取消点选',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, props }) {
      instance.removeDraw();
    },
    propsConfig: {
      options: {},
    },
    targetFilter: specialActionTargetFilter,
  },
});

// 素材组件动作
export const mediaWidgetActions = autoFillKey({
  updateSrc: {
    name: '更新链接',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, props }) {
      instance.setSrc(props);
    },
    propsConfig: {
      options: {
        param: {
          type: 'select',
          name: '链接参数',
          props: {
            filterable: true,
            'allow-create': true,
            'default-first-option': true,
            options: '${util.getParamOptions()}',
          },
        },
      },
    },
    targetFilter: specialActionTargetFilter,
  },
});

// 实时路况刷新动作
export const trafficRealtimeWidgetActions = autoFillKey({
  trafficRealtime: {
    name: '实时路况刷新',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, props }) {
      instance.refreahClick();
    },
    propsConfig: {
      options: {
        param: {
          type: 'select',
          name: '实时路况',
          props: {
            filterable: true,
            'allow-create': true,
            'default-first-option': true,
            options: '${util.getParamOptions()}',
          },
        },
      },
    },
    targetFilter: specialActionTargetFilter,
  },
});

// 直播流组件动作
export const liveVideoWidgetActions = autoFillKey({
  setLiveVideoWidget: {
    name: '通过设备ID播放视频',
    category: actionCategoryMap.componentSelfAction.key,
    implementation({ instance, props }) {
      instance.playVideoByDeviceID(props);
    },
    propsConfig: {
      options: {
        param: {
          type: 'select',
          name: '设备id',
          props: {
            filterable: true,
            'allow-create': true,
            'default-first-option': true,
            options: '${util.getParamOptions()}',
          },
        },
      },
    },
    targetFilter: specialActionTargetFilter,
  },
});

// 全局动作
export const globalActions = autoFillKey({
  openNewPage: {
    name: '打开新页面',
    category: actionCategoryMap.globalAction.key,
    implementation({ wrapper, event, param, props }) {
      wrapper.openNewPage({ event, param, props });
    },
    propsConfig: {
      options: {
        linkType: {
          type: 'select',
          name: '页面类型',
          props: {
            options: [
              { label: '大屏', value: 'screen' },
              { label: '链接地址', value: 'url' },
            ],
          },
        },
        src: {
          type: 'textarea',
          name: '链接地址',
          showInPanel: '${form.linkType === "url"}',
        },
        screenId: {
          type: 'select',
          name: '大屏',
          showInPanel: '${form.linkType === "screen"}',
          props: {
            options: '${util.getScreenOptions()}',
          },
        },
        isOpenNewWindow: {
          type: 'switch',
          name: '是否新开窗口',
        },
        isPreload: {
          type: 'switch',
          name: '是否预加载',
          showInPanel: '${form.linkType === "screen"}',
        },
      },
      // updateDeps: ['form.linkType']
    },
    propsValue: {
      linkType: 'url',
    },
  },
  setGlobalParams: {
    name: '赋值全局参数',
    category: actionCategoryMap.globalAction.key,
    implementation({ wrapper, props }) {
      wrapper.setGlobalParams(props);
    },
  },
  postMsgToScreenWrapper: {
    name: '发送消息到其容器',
    category: actionCategoryMap.globalAction.key,
    implementation({ wrapper, event, param, props }) {
      wrapper.postMsgToScreenWrapper({ event, param, props });
    },
    propsConfig: {
      options: {
        msg: {
          type: 'text',
          name: '消息名称',
        },
        data: {
          type: 'codeEdit',
          name: '消息内容',
          props: {
            height: '100px',
            width: '189px',
          },
        },
      },
    },
    propsValue: {
      msg: '',
      data: '{}',
    },
  },
});

export const chartInteractionConfig = {
  events: {
    ...componentHookEvents,
    // ...componentDataHookEvents,
    ...chartEvents,
  },
  actions: {
    ...commonUIActions,
    ...commonDataActions,
  },
};

export const pageConfig = {
  events: {
    listenMsg: {
      name: '接收消息',
      eventType: eventTypeEnum.widgetInternalOperate,
      hasParamOptions: true,
      paramOptions: [
        { label: '消息', value: '${param.msg}' },
        { label: '数据', value: '${param.data}' },
      ],
      key: 'listenMsg',
    },
  },
  actions: {
    // ...commonUIActions,
  },
};
