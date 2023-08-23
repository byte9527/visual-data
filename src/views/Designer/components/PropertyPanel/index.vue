<template>
  <div class="prop-panel">
    <div class="prop-panel__title">{{ title }}</div>
    <PagePanel v-if="selectType === 'page'" />
    <WidgetPanel v-else />
  </div>
</template>

<script>
import PagePanel from './PagePanel.vue';
import WidgetPanel from './WidgetPanel.vue';

export default {
  mixins: [],
  components: { PagePanel, WidgetPanel },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    selectType() {
      return 'page';
    },
    title() {
      return this.selectType === 'page' ? '页面设置' : '组件设置';
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.prop-panel {
  &__title {
    border-bottom: 1px solid lightgrey;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
