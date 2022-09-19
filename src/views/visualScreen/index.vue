<template>
  <div>
    <ConfigForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ConfigForm from '@/components/ConfigForm/index.vue'

export default defineComponent({
  name: 'ConfigFormDemo',
  components: {
    ConfigForm
  },  
  props: {
  },
  setup(props) {
  },
})

</script>

<style lang='scss' scoped>
</style>
