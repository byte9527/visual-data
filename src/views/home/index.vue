<template>
  <div class="home">
    <el-container class="home__container" style="">
      <el-aside class="home-side-left"
        ><el-menu default-active="cnofigForm" @select="menuSelect">
          <template v-for="item in menuList" :key="item.key">
            <el-menu-item v-if="!item.children.length" :index="item.key">{{
              item.label
            }}</el-menu-item>
            <el-sub-menu v-if="item.children.length" :index="item.key">
              <template #title>
                <span>{{ item.label }}</span>
              </template>
            </el-sub-menu>
          </template>
        </el-menu></el-aside
      >
      <el-main><router-view /></el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      menuList: [
        {
          key: "/home/configForm",
          label: "配置面板",
          children: [],
        },
        {
          key: "/home/visualPage",
          label: "可视化页面",
          children: [],
        },
        {
          key: "/home/storyboard",
          label: "故事板",
          children: [],
        },
      ],
    };
  },
  methods: {
    menuSelect(path) {
      this.$router.push(path) 
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;

  &__container {
    width: 100%;
    height: 100%;

    .el-main {
      --el-main-padding: 16px;
    }
  }
}
</style>
