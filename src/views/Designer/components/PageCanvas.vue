<template>
  <div class="page-canvas">
    <div
      class="page-canvas__content"
      @mousedown="onMousedown"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @drop.prevent="onDropHandle"
      @dragover.prevent
      @dblclick="onDblclick"
      @keydown.delete.exact.stop="deleteHandler"
      @keyup="onkeyupHandler"
      @keydown.esc.stop.prevent="clearSelection"
      @keydown.ctrl.68.exact="copyPaste"
      @keydown.meta.68.exact="copyPaste"
      @keydown.ctrl.67.exact="copyHandler"
      @keydown.meta.67.exact="copyHandler"
      @keydown.ctrl.88.exact.stop.prevent="cutHandler"
      @keydown.meta.88.exact.stop.prevent="cutHandler"
      @keydown.ctrl.86.exact="pasteHandler"
      @keydown.meta.86.exact="pasteHandler"
    >
      <RenderContainer
        :layout="pageSetting.layout"
        :style="pageSetting.style"
      ></RenderContainer>
    </div>
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
  methods: {
    onMousedown(e) {},
    onMouseMove(e) {},
    onMouseEnter(e) {},
    onMouseLeave(e) {},
    onDropHandle(e) {
      const data = JSON.parse(e.dataTransfer.getData('widget/drag'))
      debugger
    },
    onDblclick(e) {},
    deleteHandler(e) {},
    onkeyupHandler(e) {},
    clearSelection(e) {},
    copyPaste(e) {},
    copyHandler(e) {},
    cutHandler(e) {},
    pasteHandler(e) {},
  },
};
</script>

<style lang="scss">
.page-canvas {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  &__content {
    width: 100%;
    height: 100%;
  }
}
</style>
