<template>
  <div>
    <div v-for="item in routeList" :key="item.label">
      <router-link :to="item.to">{{item.label}}</router-link>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'home',
  data() {
    return {
      routeList: [
        {
          label: '配置表单',
          to: '/configForm' 
        },
        {
          label: '大屏编辑器',
          to: '/visualScreen' 
        },
        {
          label: '页面编辑器',
          to: '/visualPage' 
        },
        {
          label: '在线excel',
          to: '/onlineExcel' 
        },
      ]
    
    }
  }
};

</script>

<style type="scss" scoped>
</style>
