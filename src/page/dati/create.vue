<template>
  <el-main>
    <el-form
      ref="daticreate"
      :model="form"
      label-width="80px"
      :label-position="labelPosition"
      :rules="rules"
    >
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item prop="medicalFile" label="病理档案ID">
            <el-input
              placeholder="请输入病理档案ID"
              v-model="form.medicalFile"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="buttonquery" justify="center" :gutter="10">
        <el-col :span="6">
          <el-button @click="daticreate('daticreate')">新建大体报告</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
import qs from "qs";
export default {
  data() {
    let idisok = (rule, value, callback) => {
      if (value == "") callback(new Error("请输入病理档案ID"));
      for (let i = 0; i < value.length; i++) {
        if (value[i] < "0" || value[i] > "9")
          callback(new Error("病理档案ID只能是数字"));
      }
      callback();
    };
    return {
      labelPosition: "left",
      form: {
        detail: {},
        medicalFile: "",
      },
      rules: {
        medicalFile: [{ validator: idisok, trigger: "blur" }],
      },
    };
  },
  methods: {
    daticreate(table) {
      let _this = this;
      let tmp = {};
      tmp.medicalFile = 1;
      tmp.detail = { a: 1 };
      console.log(qs.stringify(tmp));
      this.$refs[table].validate((valid) => {
        if (valid) {
          this.$axios.defaults.headers.Authorization =
            "Token " + this.$store.state.Authorization;
          this.$axios
            .post("/grossReportLC/", qs.stringify(tmp))
            .then((res) => {
              alert("大体报告创建成功");
            })
            .catch((err) => {
              alert(err);
            });
        }
      });
    },
  },
};
</script>

<style>
</style>