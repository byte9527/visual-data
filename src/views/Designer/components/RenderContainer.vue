<template>
  <div class="render-container" style="">
    <Grid v-if="type === 'grid'" class="render-container__grid-bg" />
  </div>
</template>

<script>
import Grid from './Grid.vue';

export default {
  components: { Grid },
  props: {
    type: {
      type: String,
      default: 'grid'
    },
    layout: {},
  },
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
.render-container {
  position: relative;
  width: 100%;
  height: 100%;
  &__grid-bg {
    position: absolute;
    top: 0;
    left: 0
  }
}
</style>
