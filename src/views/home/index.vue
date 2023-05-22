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
          label: '页面编辑器',
          to: '/visualScreen' 
        },
        {
          label: '3D编辑器',
          to: '/onlineExcel' 
        },
      ]
    
    }
  }
};

</script>

<style type="scss" scoped>
</style>
