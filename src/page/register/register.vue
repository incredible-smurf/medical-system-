<template>
  <el-container >
    <el-aside width="250px"> 
      <el-menu default-active="1">
        <el-menu-item index="1">
          <span slot="title">建立新档案</span>
        </el-menu-item> 
        <el-menu-item index="2">
          <span slot="title">档案查询</span>
        </el-menu-item> 
      </el-menu>

    </el-aside>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6" :offset="2">
          <div class="smalls">病人姓名</div>
          <el-input v-model="name" placeholder="请输入病人姓名" clearable></el-input>
        </el-col>
        <el-col :span="6" :offset="3">
          <div class="smalls">病人ID</div>
          <el-input v-model="patientid" placeholder="请输入病人ID" clearable></el-input>
        </el-col>
      </el-row>
      <el-row type='flex' class="buttonquery" justify="center" :gutter='10'>
        <el-col :span="6">
          <el-button @click="queryforpat">查询</el-button>
        </el-col>
      </el-row>
      
      
      <router-view/>
      <router-link target="_blank" :to="{ path: '/register/newregister' }"
        >新页面打开home页</router-link
      >
      
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      patientid:"",
    };
  },
  methods:{
    queryforpat (){
      /*
      查询需求
      */
     this.$router.push('/register/newregister')

    }
  }
};
</script>

<style scoped>

.smalls{
  margin:0 auto;
}
.buttonquery{
  margin-top:30px
}
</style>