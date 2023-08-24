<template>
  <div class="designer-header">
    <div class="left-area">
      <el-button type="primary" size="small" @click="undo">撤回</el-button>
      <el-button type="primary" size="small" @click="redo">重做</el-button>
      <el-button type="primary" size="small" @click="clear">清除</el-button>
    </div>
    <div class="right-area">
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button type="primary"  size="small" @click="preview">预览</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    undo() {
      // 撤回操作的逻辑
      console.log('执行撤回操作');
    },
    redo() {
      // 重做操作的逻辑
      console.log('执行重做操作');
    },
    save() {
      // 保存操作的逻辑
      console.log('执行保存操作');
    },
    preview() {
      // 预览操作的逻辑
      console.log('执行预览操作');
    }
  }
};
</script>

<style scoped>
.designer-header {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  
  padding: 0 16px;
}

.left-area {
  margin-right: 10px;
}

.right-area {
  margin-left: 10px;
}
</style>
