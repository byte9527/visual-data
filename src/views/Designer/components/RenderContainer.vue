<template>
  <div class="render-container" style="">
    <Grid
      v-if="layout.type === 'grid'"
      v-show="layout.gridSetting.showInEdit"
      class="render-container__grid-bg"
      :layout="layout.gridSetting"
    />
    <WidgetRender v-for="widget in widgetList" />
  </div>
</template>

<script>
import Grid from './Grid.vue';
import WidgetRender from './WidgetRender.vue';
export default {
  components: { Grid },
  props: {
    layout: {
      type: Object,
      default() {
        return {
          type: 'grid',
          gridSetting: {},
        };
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    widgetList() {
      const a = {};
      return [];
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.render-container {
  position: relative;
  width: 100%;
  height: 100%;
  &__grid-bg {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
