<template>
  <div class="login-container">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">医疗管理系统</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <el-button type="primary" @click="switchToNewAc">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
    <script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["changeLogin", "changeUser"]),
    submitForm(formName) {
      let _now = this;
      let tmpsummit = {
        username: this.form.username,
        password: this.form.password,
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api-token-auth/", tmpsummit)
            .then((res) => {
              _now.changeLogin({ Authorization: res.data.token });
              _now.$router.push("/home");
              _now.$axios.defaults.headers.Authorization =
                "Token " + res.data.token;
              let usertmp={}
              this.$axios
                .get("/userInfoRU/")
                .then((res) => {
                  let sex = res.data.sex == "male" ? "男" : "女";
                  usertmp.name = res.data.name;
                  usertmp.office = res.data.office;
                  usertmp.phoneNumber = res.data.phoneNumber;
                  usertmp.sex = sex;
                  usertmp.title = res.data.title;
                  _now.changeUser(usertmp)
                })
                .catch((err) => {
                  alert(err);
                });
            })
            .catch((error) => {
              alert("用户名或密码错误");
            });
        } else {
          console.log("验证失败");
          return false;
        }
      });
    },
    switchToNewAc() {
      this.$router.push("/createaccount");
    },
  },
};
</script>

  <style acoped>
.login-form {
  width: 350px;
  margin: 100px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
</style> 