<template>
  <div
    ref="panelTabs"
    :style="{
      width: realWidth + 'px',
    }"
    class="panel-tabs"
  >
    <el-collapse v-model="activeNames" accordion class="panel-tabs-collapse">
      <el-collapse-item name="containerName">
        <template slot="title">
          <label for="">{{ configData.name }}</label>
        </template>
        <div v-if="list.length">
          <el-tabs
            v-model="activeTabName"
            type="card"
            :closable="deleteAllow"
            :addable="addAllow"
            class="panel-tabs-collapse--content"
            @tab-click="handleClick"
            @tab-remove="deleteTab"
            @tab-add="addTab"
          >
            <el-tab-pane
              v-for="(child, index) in convertList()"
              :key="child.name"
              :label="child.name"
              :name="child.name"
              class="panel-group"
            >
            </el-tab-pane>
          </el-tabs>
        </div>
        <h4 v-else>列表为空</h4>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

export default {
  components: {},
  mixins: [],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      activeNames: "containerName",
      activeTabName: "",
      activeTabIndex: "0",
      template: () => {},
      list: [],
      realWidth: false,
      clientWidth: "",
      defaultValue: () => {},
    };
  },
  computed: {
    maxTabs() {
      return this.configData?.max || 999;
    },
    minTabs() {
      return this.configData?.min || 1;
    },

    addAllow: function () {
      return true;
    },
    deleteAllow() {
      if (this.configData?.props?.disableDelete) {
        return !this.configData.props.disableDelete;
      }
      let result = false;
      if (this.list.length > this.minTabs && this.template !== false) {
        result = true;
      }
      return result;
    },
    containerExpand() {
      let result = false;
      if (this.activeNames !== "" && this.template) result = true;
      return result;
    },
  },
  watch: {
    clientWidth: function (val, oldVal) {
      if (oldVal !== this.realWidth) this.realWidth = val;
    },
  },
  mounted() {
    if (this.$refs.panelTabs?.clientWidth !== 0) {
      this.clientWidth =
        this.$refs.panelTabs?.clientWidth ||
        this.$refs.panelTabs?.parentNode.clientWidth;
    }
    this.initial();
    this.listenEventBusMsg();
  },
  beforeUpdate() {
    if (!this.realWidth && this.$refs.panelTabs?.clientWidth !== 0) {
      this.clientWidth =
        this.$refs.panelTabs?.clientWidth ||
        this.$refs.panelTabs?.parentNode.clientWidth;
    }
  },
  methods: {
    checkMatchDeps(str) {
      // this.mergeUpdateDeps.includes()
      return this.deps.some((item) => {
        const reg = new RegExp(item);
        return reg.test(str);
      });
    },
    getValuePath(parentValuePath, key, index) {
      return `${parentValuePath}[${index}].${key}`;
    },
    convertList() {
      return [];
    },
    initial() {
      // 获取模板
      this.template = this.configData?.template || false;
      // 根据模板初始化
      if (this.template !== false) {
        this.list = this.createList(this.value);
      } else {
        this.list = this.configData?.children;
      }
      // 获取默认值产生方式
      this.defaultValue = this.configData?.defaultValue || false;
      if (this.list.length > 0) this.activeTabName = this.list[0].name;
    },
    createList(data) {
      const result = [];
      data.forEach((val, index) => {
        result.push(this.createByTemplate(this.value[index], Number(index)));
      });
      return result;
    },
    addTab() {
      if (this.addAllow) {
        // 产生默认值（还未确认具体方式）
        let temp;
        if (this.defaultValue) {
          temp = this.defaultValue([...this.componentValue], this.list.length);
        } else if (this.componentValue.length > 0) {
          temp = this.deepClone(
            this.componentValue[this.componentValue.length - 1]
          );
        }
        const newValue = [...this.componentValue, temp];
        this.componentValue = newValue;

        this.list.push(this.createByTemplate(temp, this.list.length));
        // 绑定操作

        this.activeTabName = this.list[this.list.length - 1].name;
        this.activeTabIndex = String(this.list.length - 1);
      }
    },
    deleteTab(targetName) {
      let index;
      for (const i in this.list) {
        if (this.list[i].name === targetName) {
          index = i;
          break;
        }
      }
      if (this.deleteAllow) {
        const activeTabIndex = Number(this.activeTabIndex);
        if (index <= activeTabIndex) {
          this.activeTabIndex =
            activeTabIndex - 1 < 0 ? "0" : String(activeTabIndex - 1);
        }
        // 移除list对应项
        this.list.splice(index, 1);
        const newValue = [...this.componentValue];
        newValue.splice(index, 1);
        // 根据新value加载tabs
        this.list = this.createList(newValue);
        newValue._deleteIndex = index;
        this.componentValue = newValue;

        this.activeTabName = this.list[this.activeTabIndex].name;
      }
    },
    handleClick(tab) {
      this.activeTabIndex = tab.index;
    },
    createByTemplate(data, i) {
      // 调用这个函数时，必定有模板
      const item = this.template(data, i);
      return item;
    },
    // // 强制更新视图
    // refreshList() {
    //   this.$nextTick(() => {
    //     this.list = this.createList(this.componentValue)
    //     const activeTabIndex = Number(this.activeTabIndex)
    //     if (activeTabIndex >= this.list.length) {
    //       this.activeTabIndex = String(this.list.length - 1)
    //     }
    //     this.activeTabName = this.list[this.activeTabIndex].name
    //   })
    // },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    /**
     * @description: 搜索响应
     * @param {*} key
     * @return {*}
     */
    setActiveKey(key) {
      this.activeNames = "containerName";
      this.activeTabIndex = key || "0";
    },
  },
};
</script>
<style lang="scss" scoped>
.outside {
  border: 1px solid red;
  width: 100%;
}
::v-deep .panel-tabs {
  &-collapse {
    border: none;
    &--content {
      .control-item__control-wrap {
        display: flex;
      }
      > .el-tabs__header {
        background: #1a202d;
        > .el-tabs__new-tab {
          margin: 9px 0 9px 0;
          border: none;
        }
        > .el-tabs__nav-wrap.is-scrollable {
          padding: 0 10px;
        }
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          line-height: 36px;
          &:hover {
            color: #0046ff;
          }
        }
        .el-tabs__nav {
          border-radius: 0;
        }
        .el-tabs__item {
          width: 70px;
          font-size: 12px;
          text-align: center;
          background: #1a202d;
          color: #8796b0;
          border: none !important;
          border-bottom: 2px solid transparent !important;
          margin: 2px 1px;
          border-radius: 2px;
          &:hover {
            background-color: rgba(34, 44, 58, 0.6);
            .el-icon-close {
              visibility: visible;
            }
          }
          &.is-active {
            background-color: #222c3a;
            color: #ffffff;
            border-bottom: 2px solid #0046ff !important;
            .el-icon-close {
              visibility: visible;
            }
            &:hover {
              background-color: #2c394b;
            }
          }
          .el-icon-close {
            visibility: hidden;
            font-size: 12px;
            line-height: 14px;
            &:hover {
              background-color: #0046ff;
            }
          }
        }
        .el-tabs__nav-wrap::after {
          display: none;
        }
      }
    }
  }
}
</style>
