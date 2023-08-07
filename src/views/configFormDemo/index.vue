<template>
  <div class="config-form-demo">
    <div class="form-box">
      <ConfigForm
        :config-data="config1.dataConfig"
        :value="config1.initValue"
        :hooks="config1.hooks"
      />
    </div>
    <div class="form-box">
      <ConfigForm
        :config-data="config2.dataConfig"
        :value="config2.initValue"
        :hooks="config2.hooks"
      />
    </div>
    <div class="form-box">
      <ConfigForm
        :config-data="config3.dataConfig"
        :value="config3.initValue"
        :hooks="config3.hooks"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import ConfigForm from "@/components/ConfigForm/index.vue";
import { config1, config2, config3 } from "./config";

export default defineComponent({
  name: "ConfigFormDemo",
  components: {
    ConfigForm,
  },
  props: {},
  data() {
    return {
      config1: config1,
      config2: config2,
      config3: config3
    };
  },
  setup(props) {},
});
</script>

<style lang="scss" scoped>
.config-form-demo {
  display: flex;
  flex-wrap: wrap;
  .form-box {
    // padding: 8px;
    background-color: #f6f6f6;
    margin-bottom: 32px;
    margin-right: 32px;
    height: fit-content;
  }

  ::v-deep {
    .el-input-number {
      width: 100%;
    }
  }
  
}
</style>
