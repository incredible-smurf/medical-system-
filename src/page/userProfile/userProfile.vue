<template>
  <el-main>
      <!-- 用户详情界面的查看和修改 -->
      <!-- 详情展示 -->
      <el-form :model="submitpro" label-width="80px">
          <el-form-item label="姓名：">
              <el-input v-model="submitpro.name"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
              <el-radio v-model="submitpro.sex" label="male">男</el-radio>
              <el-radio v-model="submitpro.sex" label="female">女</el-radio>
          </el-form-item>
          <el-form-item label="办公室：">
              <el-input v-model="submitpro.office"></el-input>
          </el-form-item>
          <el-form-item label="职位：">
              <el-input v-model="submitpro.title"></el-input>
          </el-form-item>
          <el-form-item label="电话：">
              <el-input v-model="submitpro.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item>
              <!-- 修改提交 -->
              <el-button type="primary" @click="onSubmit">保存更改</el-button>
          </el-form-item>
      </el-form>
  </el-main>
</template>

<script>
export default {
    data(){
        return {
            profile:{},
            sex:'未定义',
            //数据具体内容
            submitpro:{
                name:'',
                office:'',
                phoneNumber:'',
                sex:'',
                title:''
            }
        }
    }
,created(){
    //获取用户信息
    let _this=this
    this.$axios.defaults.headers.Authorization='Token '+this.$store.state.Authorization
    this.$axios.get('/userInfoRU/')
    .then(res =>{
        _this.profile=res.data
        _this.sex=(_this.profile.sex=='male'?'男':'女')
        _this.submitpro.name=this.profile.name
        _this.submitpro.office=this.profile.office
        _this.submitpro.phoneNumber=this.profile.phoneNumber
        _this.submitpro.sex=this.profile.sex
        _this.submitpro.title=this.profile.title 
    }).catch(err=>{alert(err)})
},
methods:{
    //提交修改后的用户信息 无有效性检查
    onSubmit(){
        let tmp={}
        tmp.name=this.submitpro.name
        tmp.office=this.submitpro.office
        tmp.phoneNumber=this.submitpro.phoneNumber
        tmp.sex=this.submitpro.sex
        tmp.title=this.submitpro.title
        this.$axios.patch('/userInfoRU/',tmp)
        .then(res=>{
            alert("保存修改成功")
        })
        .catch(err=>{alert('修改失败')})
    }
}


}
</script>

<style scoped>
.fonttype{font-family: Helvetica;}
</style>