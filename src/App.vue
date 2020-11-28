<template>
  <div>
    <!-- 入口模块 -->
    <headPart v-if="isLogging" />
    <!-- 展示子模块详情 一般为侧边栏-->
    <router-view />
  </div>
</template>

<script>
import headPart from "./components/headPart";
export default {
  components: { headPart },
  data() {
    return {
      isLogging: false,
    };
  },
  //路由改变调用displayHeadpart决定是否显示headPart
  watch: {
    $route: "displayHeadpart",
  },
  methods: {
    displayHeadpart() {
      //判断当前路由信息
      if (
        this.$route.path === "/login" ||
        this.$route.path === "/createaccount"
      )
        this.isLogging = false;
      else this.isLogging = true;
    },
  },
};
</script>

<style>
</style>
