<template>
  <!-- 模板管理系统侧边栏 -->
  <el-container>
    <el-aside width="250px">
      <el-menu default-active="1" @select="handleSelect">
        <el-menu-item index="1">
          <span slot="title">建立新模板</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">模板查看</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <router-view />
  </el-container>
</template>

<script>
export default {
  methods: {
    //路由控制
    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.$router.push("/template/templatemain");
          break;
        case "2":
          this.$router.push("/template/templatequery");
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>