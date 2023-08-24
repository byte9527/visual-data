<template>
  <el-input v-model="currentValue" ></el-input>
</template>

<script lang="ts">
export default {
  props: {
    value: {
      type: [String, Number, Array, Boolean, Object]
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      currentValue: 'safd'
    }
  },
  watch: {
    value(newVal, val) {
      this.currentValue = newVal
    }
  },
  methods: {
    change(val) {
      this.currentValue = val
      // this.$emit("change", val)
    }
  }
};
</script>

<style lang="scss" scoped></style>
