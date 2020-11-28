<template>
<el-container>
  <!-- 用户控制界面侧边栏 -->
  <el-aside width="250px" > 
      <el-menu default-active="1" @select="handleSelect">
        <el-menu-item index="1">
          <span slot="title">查看用户信息</span>
        </el-menu-item> 
        <el-menu-item index="2">
          <span slot="title">更改密码</span>
        </el-menu-item> 
      </el-menu>
    </el-aside>
    <router-view/>
</el-container>
</template>

<script>
export default {
    data(){
        return {}
    },
    methods:{
        handleSelect(key, keyPath){
            keyPath=0
            console.log(key,keyPath)
            switch(key){
                case '1':
                    this.$router.replace('/userpro/userprofile')
                    break
                case '2':
                    this.$router.replace('/userpro/changepassword')
                    break
            }

        }
    }

}
</script>

<style scoped>
.smalls{
  margin:0 auto;
}
.buttonquery{
  margin-top:30px
}
</style>