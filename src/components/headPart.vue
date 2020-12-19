<template>
<!-- 头部导航栏 -->
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color='#00CCFF' @select="handleSelect">
  <el-menu-item index="1">首页</el-menu-item>
  <el-menu-item index="2">登记工作站</el-menu-item>
  <el-menu-item index="3">大体工作站</el-menu-item>
  <el-menu-item index="4">包埋工作站</el-menu-item>
  <el-menu-item index="5">制片工作站</el-menu-item>
  <el-menu-item index="6">初诊工作站</el-menu-item>
  <el-menu-item index="7">主诊工作站</el-menu-item>
  <el-menu-item index="8">模板管理系统</el-menu-item>
  <el-menu-item index="9" style="float:right">用户界面</el-menu-item>

</el-menu>
</template>

<script>
export default {
  name: 'headPart',
  data(){
    return {activeIndex: '1'}
  },
  methods:{
    switchtore () {
      this.$router.push('/home')
    },
    //路由跳转管理
    handleSelect(key, keyPath) {
        switch(key)
        {
          case '1':
            this.$router.push('/home')
            break
          case '2':
            this.$router.push('/register/newregister')
            break
          case '3':
            this.$router.push('/dati/create')
            break
          case '6':
            this.$router.push('/first-diagnosis/create')
            break
          case '7':
            this.$router.push('/main-diagnosis/create')
            break
          case '8':
            this.$router.push('/template/templatemain')
            break
          case '9':
            this.$router.push('/userpro/userprofile')
            break
        }
          
      
    }
  }

}
</script>

<style scoped>

.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}
</style>