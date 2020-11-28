<template>
  <div class="login-form">
    <el-form
      :model="Form"
      status-icon
      :rules="rules"
      label-width="100px"
      ref="Form"
    >
      <h2 class="login-title">注册新用户</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="Form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="Form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpass">
        <el-input
          type="password"
          v-model="Form.checkpass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('Form')">提交</el-button>
        <el-button @click="resetForm('Form')">重置</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* 引入mapMutations储存登录状态 */
import { mapMutations } from "vuex";
export default {
  data() {
    //检查是否用户名占用或用户名为空
    var checkusername = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入用户名"));
      this.$axios
        .get("/userList")
        .then((response) => {
          //console.log(response);
          for (let i = 0; i < response.data.results.length; i++)
          if (value === response.data.results[i].account_number) {
            callback(new Error("该名称已占用"));
          }
          callback();
        })
        .catch((error) => {
          callback(new Error(error));
        });
    };
    //检查密码是否为空
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.Form.checkpass !== "") {
          this.$refs.Form.validateField("checkpass");
        }
        callback();
      }
    };
    //检查密码一致性
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.Form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      Form: {
        username: "",
        password: "",
        checkpass: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkusername, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["changeLogin", "changeUser"]),
    //提交给搓成
    submitForm(formName) {
      let _self = this;
      let tmpsummit = {
        username: _self.Form.username,
        password: _self.Form.password,
      };
      //console.log(tmpsummit);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //创建用户
          this.$axios.post("/userCreate/", tmpsummit).then((res) => {
            //使用该用户登录 获取其token和用户信息并保存
            this.$axios.post("/api-token-auth/", tmpsummit).then((res) => {
              _self.changeLogin({ Authorization: res.data.token });
              _self.$axios.defaults.headers.Authorization =
                "Token " + res.data.token;
              let usertmp = {};
              this.$axios
                .get("/userInfoRU/")
                .then((res) => {
                  let sex = res.data.sex == "male" ? "男" : "女";
                  usertmp.name = res.data.name;
                  usertmp.office = res.data.office;
                  usertmp.phoneNumber = res.data.phoneNumber;
                  usertmp.sex = sex;
                  usertmp.title = res.data.title;
                  this.changeUser(usertmp);
                })
                .catch((err) => {
                  alert(err);
                });
              _self.$router.push("/home");
            });
          });
        } else {
          alert("存在错误，请重新填写");
          console.log("as");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 100px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}
.login-title {
  color: #303133;
  text-align: center;
}
</style>