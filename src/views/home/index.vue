<template>
  <div>
    <div v-for="item in routeList" :key="item.label">
      <router-link to="/">{{item.label}}</router-link>
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
          route: '' 
        }
      ]
    
    }
  }
};

</script>

<style type="scss" scoped>
</style>
