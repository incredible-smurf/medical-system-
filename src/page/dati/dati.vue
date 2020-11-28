<template>
<!-- 大体报告侧边栏 -->
  <el-container>
    <el-aside width="250px">
      <el-menu default-active="1" @select="handleSelect">
        <el-menu-item index="1">
          <span slot="title">建立新大体报告</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">大体报告查看</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <router-view />
  </el-container>
</template>

<script>
export default {
  methods: {
    //路由管理
    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.$router.push("/dati/create");
          break;

        case "2":
          this.$router.push("/dati/query");
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>