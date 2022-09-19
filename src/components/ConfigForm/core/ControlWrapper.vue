<template>
  <div>
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'ControlWrapper',
  props: {
    configData: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {},
    keyPath: {
      type: String,
      default: ''
    },
    valuePath: {
      type: String,
      default: ''
    }
  },
  inject: ['eventBus', 'searchInstance'],
  mounted() {
  },
  destroyed() {
  },
  methods: {
    initSearcher() {
      
    },
    responseSearch() {
     
    },
  }
})

</script>

<style lang='scss' scoped>
</style>

