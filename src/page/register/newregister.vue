<template>
  <!-- 新建病人信息 -->
  <el-main>
    <el-form ref="patientcreate" :model="form" label-width="80px" :label-position="labelPosition" :rules="rules" >
      <el-row :gutter="20">
        <el-col :span="8" :offset="2">
          <el-form-item label="病人姓名"
            prop="name"><el-input
              v-model="form.name"
              placeholder="请输入病人姓名"
              clearable
            ></el-input
          ></el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="病人性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择病人性别">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="buttonquery" :gutter="20">
        <el-col :span="8" :offset="2">
          <el-form-item label="电话" prop="phoneNumber"
            ><el-input
              placeholder="请输入病人电话"
              v-model="form.phoneNumber"
              clearable
            ></el-input
          ></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址" prop="address">
            <el-input placeholder="请输入病人地址" v-model="form.address" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="buttonquery" justify="center" :gutter="10">
        <el-col :span="6">
          <el-button @click="queryforcreate('patientcreate')">新建病人信息</el-button>
        </el-col>
      </el-row>

      
    </el-form>
  </el-main>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    let checkname=(rule,value,callback)=>{
      if(value=='')
      callback(new Error("姓名不能为空"))
      else
      callback()
    }
    let checkPhone=(rule,value,callback)=>
    {
      for(let i =0;i<value.length;i++)
      {
        if(value[i]>'9'||value[i]<'0')
        callback(new Error("电话号码只能为数字"))
      }
      callback()
    }
    

    return {
      labelPosition: 'right',
      form: { name: "", sex: "", phoneNumber: "", address: "" },
      rules:{
        name:[{validator:checkname, trigger: 'blur'}],
        sex:[{required:true,message: '请选择病人性别', trigger: 'change'}],
        phoneNumber:[{validator:checkPhone, trigger: 'blur'}]
      }
    };
  },
  methods: {
    queryforcreate(table) {
      let _this=this
      this.$refs[table].validate((valid)=>{
        if(valid)
        {
          this.$axios.defaults.headers.Authorization='Token '+this.$store.state.Authorization
          this.$axios.post('/patientCreate/',_this.form)
          .then(res=>{
            alert("病人信息创建成功")
          }).catch(err=>{alert(err)})
        }
      })
      /*
      查询需求
      */
    },
  },
};
</script>

<style scoped>
.buttonquery {
  margin-top: 30px;
}
</style>