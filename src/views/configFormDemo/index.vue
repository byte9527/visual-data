<template>
  <div class="config-form-box">
    <ConfigForm 
      :config-data="config.dataConfig"
      :hooks="config.hooks"
    />
  </div>
</template>

<script lang="ts">
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
      config: config
    }
  },
  setup(props) {
  },
})

</script>

<style lang='scss' scoped>
  .config-form-box {
    height: 500px;

    ::v-deep {
      .el-input-number {
        width: 100%;
      }
    }
  }
</style>
