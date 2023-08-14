<template>
  <div class="component-list">
    <el-tabs
      tab-position="left"
      type="border-card"
      class="demo-tabs"
    >
      <el-tab-pane v-for="category in categoryList" :key="category.key" :label="category.name">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="Controllability" name="4">
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      categoryList: [
        { name: "基础", key: "base", children: [] },
        { name: "表单", key: "form", children: [] },
        { name: "图表", key: "chart", children: [] },
        { name: "数据", key: "data", children: [] },
        { name: "容器", key: "container", children: [] },
      ],
    };
  },
  watch: {},
  computed: {},
  mounted() {
    this.initComponents()
  },
  methods: {
    initComponents() {
    
    }
  },
};
</script>

<style lang="scss">
.component-list {
  height: 100%;

  .el-tabs {
    .el-tabs__nav {
    width: 40px;
  }

  .el-tabs__item {
    padding: 0 8px!important;
  }

  .el-tabs__item.is-left.is-active {
    padding: 0 8px;
  }

  .el-tabs__item.is-left {
    justify-content: center;
  }
  }
  
}
</style>
