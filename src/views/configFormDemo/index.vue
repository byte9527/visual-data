<template>
  <div>
    <ConfigForm 
      :config-data="config"
    />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import ConfigForm from '@/components/ConfigForm/index.vue'
import config from './config'

export default defineComponent({
  name: 'ConfigFormDemo',
  components: {
    ConfigForm
  },  
  props: {
  },
  data() {
    return {
      config: config.option
    }
  },
  setup(props) {
  },
})

</script>

<style lang='scss' scoped>
</style>
