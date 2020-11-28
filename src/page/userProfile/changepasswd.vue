<template>
  <el-main>
    <!-- 密码修改界面 -->
    <el-form
      :model="password"
      status-icon
      :rules="rules"
      ref="thisformcg"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="请输入旧密码" prop="old_password">
        <el-input
          type="password"
          v-model="password.old_password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码" prop="new_password">
        <el-input
          type="password"
          v-model="password.new_password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="请确认新密码" prop="cofirm_password">
        <el-input
          type="password"
          v-model="password.cofirm_password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('thisformcg')"
          >重设密码</el-button
        >
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
export default {
  data() {
    //查是否为空
    let checkOldPassword = (rule, value, callback) => {
      if (value === "") return callback(new Error("旧密码不能为空"));
      else callback();
    };
    //查是否为空 两密码是否相同
    let checkNew = (rule, value, callback) => {
      if (value === "") callback(new Error("密码不能为空"));
      else {
        if (this.password.cofirm_password != "") {
          this.$refs.thisformcg.validateField("cofirm_password");
        }
        callback();
      }
    };
    //查是否为空 两密码是否相同
    let checkCon = (rule, value, callback) => {
      if (value === "") callback(new Error("不能为空值"));
      else if (value !== this.password.new_password)
        callback(new Error("确认密码不相同"));
      else callback();
    };

    return {
      //提交表单内容
      password: {
        old_password: "",
        new_password: "",
        cofirm_password: "",
      },
      //有效性检查
      rules: {
        old_password: [{ validator: checkOldPassword, trigger: "blur" }],
        new_password: [{ validator: checkNew, trigger: "blur" }],
        cofirm_password: [{ validator: checkCon, trigger: "blur" }],
      },
    };
  },
  methods: {
    //提交更改
    submitForm(formName) {
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let tmp = {};
          tmp.old_password = this.password.old_password;
          tmp.new_password = this.password.new_password;
          console.log(tmp);
          this.$axios
            .patch("/changePassword/", tmp)
            .then((res) => {
              alert("修改密码成功");
            })
            .catch((err) => {
              alert("原密码错误 请重新输入");
            });
        }
      });
    },
  },
};
</script>

<style>
</style>