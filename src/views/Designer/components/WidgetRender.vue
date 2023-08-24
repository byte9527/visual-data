<template>
  <div
    class="widget-render"
    :style="containerStyle"
    :data-mark-able="markAble"
    :data-mr-container="mrContainer"
    data-move-able="true"
    :data-id="id"
  >
    <div
      v-if="!showComponent"
      class="error-container"
      :style="errContainerStyle"
    >
      <div class="error-notice">
        <div class="error-icon">
          <svg v-show="!isLoading" class="icon svg-icon" aria-hidden="true">
            <use xlink:href="#cuowutishi" />
          </svg>
        </div>
        <div class="notice-content">无数据</div>
      </div>
    </div>
    <component
      :is="widgetDefine"
      ref="instance"
      v-bind="widgetProps"
      @changeConfigValue="changeConfigValueFromWidget"
      @editOperate="editOperate"
    />
  </div>
</template>

<script>
export default {
  mixins: [],
  components: {},
  props: {
    // 节点概要
    nodeSummary: {
      type: Object
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    id() {
      return this.nodeSummary.id;
    },
    widgetDefine() {
      return '';
    },
    widgetData() { 
      return {}
    },
    widgetProps() {
      return {}
    },

    containerStyle() {
      return {};
    },
    markAble() {
      return '';
    },
    showComponent() {
      return true
    },
    errContainerStyle() {
      return {}
    }
  },
  mounted() {},
  methods: {
    /**
     * @description: 从内部改变了组件的配置
     * @return {*}
     */    
    changeConfigValueFromWidget() {
    },
    /**
     * @description: 编辑时的操作，比如文本的编辑、聚焦
     * @return {*}
     */    
    editOperate() {
    
    }
  }
};
</script>

<style lang="scss">
.widget-render {
  position: absolute;
  user-select: none;

  .error-container {
    position: absolute;
    left: 16px;
    top: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    pointer-events: none;
  }
  .error-notice {
    width: 242px;
    height: 56px;
    border-radius: 4px;
    background: #292929;
    display: flex;
    align-items: center;
    justify-content: center;
    .error-icon {
      margin-right: 16px;
    }
    .error-icon .svg-icon {
      font-size: 30px;
    }
    .notice-content {
      font-size: 18px;
      color: #ffffff;
    }
  }
}
</style>
