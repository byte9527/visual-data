<template>
  <div class="component-list">
    <el-tabs tab-position="left" type="border-card" class="demo-tabs">
      <el-tab-pane
        v-for="category in categoryList"
        :key="category.key"
        :label="category.name"
      >
        <el-collapse v-model="category.active" @change="handleChange">
          <el-collapse-item
            v-for="item in category.children"
            :key="item.key"
            :title="item.name"
            :name="item.key"
          >
            <div v-for="el in item.children" :key="el.key" class="widget-item">
              {{ el.name }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import WM from '../core/utils/widgetManager.js';

export default {
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      categoryList: [
        {
          name: '基础',
          key: 'base',
          active: 'base',
          children: [
            { name: '基础', key: 'base', children: [] },
            { name: '媒体', key: 'media', children: [] },
          ],
        },
        {
          name: '图表',
          key: 'chart',
          active: 'bar',
          children: [
            { name: '柱状图', key: 'bar', children: [] },
            { name: '线状图', key: 'line', children: [] },
            { name: '饼环图', key: 'pie', children: [] },
            { name: '其他', key: 'others', children: [] },
          ],
        },
        {
          name: '表单',
          key: 'form',
          children: [
            { name: '选择', key: 'select', children: [] },
            { name: '文本输入', key: 'text', children: [] },
          ],
        },
        {
          name: '展示',
          key: 'data',
          children: [
            { name: '表格', key: 'table', children: [] },
            { name: '文本', key: 'text', children: [] },
          ],
        },
        {
          name: '容器',
          key: 'container',
          children: [
            { name: '布局', key: 'layout', children: [] },
            { name: '功能', key: 'layout', children: [] },
          ],
        },
      ],
    };
  },
  watch: {},
  computed: {},
  mounted() {
    this.initComponents();
  },
  methods: {
    initComponents() {
      const categoryMap = this.reflectComponentList();
      this.categoryList;

      for (const type in WM.map) {
        const metadata = WM.map[type];
        const { category } = metadata;
        const target = categoryMap[category];
        const { config, showInPanel = true, ...rest } = metadata;

        showInPanel && target.children.push(rest);
      }
    },
    reflectComponentList() {
      let map = {};
      for (const category of this.categoryList) {
        const { key, group = true, children } = category;
        if (!group) {
          map[key] = category;
        } else {
          for (const index in children) {
            const child = children[index];
            map[`${category.key}/${child.key}`] = child;
          }
        }
      }
      return map;
    },
  },
};
</script>

<style lang="scss">
.component-list {
  height: 100%;
  user-select: none; 

  .el-tabs {
    .el-tabs__nav {
      width: 40px;
    }

    .el-tabs__item {
      padding: 0 8px !important;
    }

    .el-tabs__item.is-left.is-active {
      padding: 0 8px;
    }

    .el-tabs__item.is-left {
      justify-content: center;
    }
  }

  .el-collapse-item__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 8px;

    .widget-item {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      border-radius: 4px;
      border: 1px solid lightgray;
      cursor: pointer;

      &:nth-of-type(2n + 1) {
        margin-left: 5%;
        margin-right: 10%;
      }
    }
  }
}
</style>
