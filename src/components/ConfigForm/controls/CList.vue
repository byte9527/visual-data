<template>
  <div class="c-list"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CList",
  props: {
    valuePath: {
      type: [String, Boolean],
      default: "",
    },
  },
  setup(props) {},
});
</script>

<style lang="scss" scoped></style>
