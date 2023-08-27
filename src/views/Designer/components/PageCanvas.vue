<template>
  <div class="page-canvas">
    <RenderContainer :layout="pageSetting.layout"></RenderContainer>
  </div>
</template>

<script>
import RenderContainer from './RenderContainer.vue';
import { mapState } from 'vuex';

export default {
  components: { RenderContainer },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState('pageDesigner', ['pageSetting']),
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.page-canvas {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
