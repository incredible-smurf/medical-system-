<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color='#00CCFF' @select="handleSelect">
  <el-menu-item index="1">首页</el-menu-item>
  <el-menu-item index="2">登记工作站</el-menu-item>
  <el-menu-item index="3"><router-link to="/dati">大体工作站</router-link></el-menu-item>
  <el-menu-item index="4"><router-link to="/register">包埋工作站</router-link></el-menu-item>
  <el-menu-item index="5"><router-link to="/register">制片工作站</router-link></el-menu-item>
  <el-menu-item index="6"><router-link to="/register">主诊工作站</router-link></el-menu-item>
  <el-menu-item index="7"><router-link to="/register">登记工作站</router-link></el-menu-item>
  <el-menu-item index="8"><router-link to="/register">登记工作站</router-link></el-menu-item>

  <!-- <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4">xx</el-menu-item> -->
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
    handleSelect(key, keyPath) {
        switch(key)
        {
          case '1':
            this.$router.push('/home')
            break
          case '2':
            this.$router.push('/register')
            break
        }
          
        
        console.log(keyPath)
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