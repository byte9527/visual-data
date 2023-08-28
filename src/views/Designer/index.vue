<template>
  <el-container class="page-designer">
    <el-header>
      <DesignerHeader />
    </el-header>
    <el-container>
      <el-aside :width="leftSiderWidth" class="left-sider">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="组件" name="components">
            <ComponentList />
          </el-tab-pane>
          <el-tab-pane label="图层" name="layer">图层</el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main><PageCanvas /></el-main>
      <el-aside class="right-sider" :width="rightSiderWidth">
        <PropertyPanel />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import WM from './core/utils/widgetManager.js';
import DesignerHeader from './components/DesignerHeader.vue';
import ComponentList from './components/ComponentList.vue';
import PageCanvas from './components/PageCanvas.vue';
import PropertyPanel from './components/PropertyPanel/index.vue';
import { db } from '@/utils/db';
import { mapState, mapMutations } from 'vuex';

export default {
  mixins: [],
  components: { DesignerHeader, ComponentList, PageCanvas, PropertyPanel },
  props: {},
  data() {
    return {
      leftSiderWidth: '240px',
      rightSiderWidth: '320px',
      activeName: 'components',
    };
  },
  watch: {},
  computed: {
    ...mapState('pageDesigner', ['pageId']),
  },
  mounted() {
    this.setPageId(Number(this.$route.query.id));
    this.initPage();
  },
  methods: {
    ...mapMutations('pageDesigner', ['setPageSetting', 'setPageId']),

    async initPage() {
      const page = await db.page.get(this.pageId);
      const pageSetting = JSON.parse(page.pageSetting);
      this.setPageSetting({ ...pageSetting, name: page.name });
    },
  },
};
</script>

<style lang="scss">
$dividerColor: lightgray;

.page-designer {
  width: 100vw;
  height: 100vh;

  .el-main {
    padding: 0;
  }

  .el-tabs--top {
    display: flex;
    flex-direction: column;

    .el-tabs__content {
      flex-grow: 1;
      .el-tab-pane {
        height: 100%;
      }
    }
  }

  .el-tabs {
    height: 100%;

    .el-tabs__header {
      margin-bottom: 0;
    }
    &--left .el-tabs__header.is-left {
      margin-right: 0;
    }

    .el-tabs__content {
      padding: 0;
    }
  }

  .el-header {
    padding: 0;
    height: 48px;
    border-bottom: 1px solid $dividerColor;
  }

  .left-sider {
    border-right: 1px solid $dividerColor;
  }
  .right-sider {
    border-left: 1px solid $dividerColor;
  }
}
</style>
