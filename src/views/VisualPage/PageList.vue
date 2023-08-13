<template>
  <el-container class="page-list">
    <el-aside width="200px">
      <el-button @click="creatPage">新增页面</el-button>
      <el-menu mode="vertical" @select="select">
        <el-menu-item
          v-for="(item, subIndex) in pageList"
          :key="item.id"
          :index="item.id.toString()"
        >
          {{ item.name }}
          <div class="icon">
            <el-icon @click="editPage(item)"><Edit /></el-icon>
            <el-icon @click="designePage"><Setting /></el-icon>
            <el-icon><Delete /></el-icon>
          </div>
        </el-menu-item>
      </el-menu>
      <el-dialog
        :model-value="!!pageModalType"
        :title="`${pageModalType === 'add' ? '新增' : '编辑'}页面`"
        width="30%"
        @close="dialogClose"
      >
        <el-form :model="form" label-width="120px">
          <el-form-item label="名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" show-word-limit type="textarea" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogClose">取消</el-button>
            <el-button type="primary" @click="confirmPageInfo">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
import { toRaw } from "vue";
import { db } from "@/utils/db";

export default {
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      pageList: [],
      showPageModal: false,
      pageModalType: "",
      form: { name: "", remark: "" },
    };
  },
  watch: {},
  computed: {},
  mounted() {
    this.getList();
  },
  methods: {
    creatPage() {
      this.showPageModal = true;
      this.pageModalType = "add";
    },
    editPage(param) {
      this.showPageModal = true
      this.pageModalType = "edit"
      this.form = param
    },
    designePage() {
      this.$router.push("/pageDesigner")
    },
    dialogClose() {
      this.showPageModal = false;
      this.pageModalType = "";
    },
    async confirmPageInfo() {
      if (this.pageModalType === "add") {
        await db.page.add(toRaw(this.form));
      } else {
        const {id, ...rest} = this.form
        await db.page.update(this.form.id, rest)
      }
      this.dialogClose();
      this.form = {};
      this.getList();
    },
    async getList() {
      const list = await db.page.toArray();
      this.pageList = list;
    },
    select(key) {},
  },
};
</script>

<style lang="scss">
.page-list {
  .el-menu-item {
    display: flex;
    justify-content: space-between;
    .icon {
      display: none;
    }

    &:hover {
      .icon {
        display: block;
      }
    }
  }
}
</style>
