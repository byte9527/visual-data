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
        data-container-id="root"
        data-widget-id="root"
      ></RenderContainer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import RenderContainer from './RenderContainer.vue';
import WM from '../core/utils/widgetManager.js';
import CanvasEventHandler from '../core/utils/CanvasEventHandler';
import { Layout } from '../core/utils/layout/layout.ts';

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
  mounted() {
    this.eventHandler = new CanvasEventHandler({
      rootContainerId: 'root',
      widgetKey: 'data-widget-id',
      containerKey: 'data-container-id',
    });
  },
  methods: {
    onMousedown(e) {},
    onMouseMove(e) {},
    onMouseEnter(e) {},
    onMouseLeave(e) {},
    onDropHandle(e) {
      const data = JSON.parse(e.dataTransfer.getData('widget/drag'));
      const { type = 'default' } = data;
      let model = WM.createWidgetModel(type);
      const targetContainerId = this.eventHandler.getTargetContainerId(e);

      const initStyle = Layout.getInitStyle(type, {}, {});
      // model =
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
