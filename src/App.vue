<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="js">
let aa;
export default {
  data() {
    return {
      menuList: [
        {
          key: "/cnofigForm",
          label: "配置面板",
          children: [],
        },
        {
          key: "/visualPage",
          label: "可视化页面",
          children: []
        },
        {
          key: "/storyboard",
          label: "故事板",
          children: [],
        },
      ],
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
