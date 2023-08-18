<template>
  <div class="page-canvas">
    <RenderContainer></RenderContainer>
  </div>
</template>

<script>
import RenderContainer from './RenderContainer.vue';

export default {
  components: { RenderContainer },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
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
