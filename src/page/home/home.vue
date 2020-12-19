<template>
  <div>
    <!-- HOME界面  -->
    <el-container>
      <homepage/>
    </el-container>
  </div>
</template>

<script>
import homepage from "./component/rightBand"
export default {
  name: "home",
  components: {homepage},
};
</script>

<style scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    text-align: center;
    line-height: 60px;
  }
</style>