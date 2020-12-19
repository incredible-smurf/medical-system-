<template>
  <!--主诊报告创建 -->
  <el-main>
    <!-- 主诊报告表单域 -->
    <el-form
      ref="createDiagnosis"
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
        <el-col :span="10">
          <el-form-item label="请选择主诊模板" prop="template">
            <el-cascader
              v-model="form.template"
              :options="templatelist"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 根据选取的模板生成表单 -->
      <form-create
        v-if="pageindex == 1"
        v-model="formContent"
        :rule="formrule"
        :option="option"
        style="width: 80%; margin-top: 20px"
      ></form-create>
      <el-row
        type="flex"
        class="buttonquery"
        justify="center"
        :gutter="10"
        v-if="pageindex == 1"
      >
        <!-- 提交 -->
        <el-col :span="6">
          <el-button @click="createDiagnosis('createDiagnosis')"
            >新建主诊报告</el-button
          >
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
import qs from "qs";
export default {
  //请求模板列表处理数据
  beforeCreate() {
    this.$axios.defaults.headers.Authorization =
      "Token " + this.$store.state.Authorization;
    this.$axios
      .get("/grossDiagnosisModelList/", {
        params: {
          category: "Diagnosis1",
          search: this.$store.state.userprofile.name,
          limit: 500,
        },
      })
      .then((res) => {
        let num_of_template = 0;
        for (let i in res.data.results) {
          let tmp = {};
          tmp.value = res.data.results[i].id;
          tmp.label = res.data.results[i].name;
          this.templatelist.push(tmp);
          num_of_template++;
        }

        let currentPage = 1;
      })
      .catch((err) => {
        alert(err);
      });
  },
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
      /* 表单内容 */
      form: {
        detail: {},
        medicalFile: "",
        template: "",
      },
      //检查表单合法性
      rules: {
        medicalFile: [{ required: true, validator: idisok, trigger: "blur" }],
        template: [
          { required: true, message: "请选择一个模板", trigger: "change" },
        ],
      },
      //模板列表
      templatelist: [],

      formrule: [],
      formContent: {},
      pageindex: 0,
      option: {
        submitBtn: {
          show: false,
        },
      },
    };
  },
  methods: {
    //post主诊报告
    createDiagnosis(table) {
      let _this = this;
      let tmp = {};
      tmp.medicalFile = this.form.medicalFile;
      this.$refs[table].validate((valid) => {
        if (valid) {
          tmp.detail = JSON.stringify(this.formrule);
          tmp.category = 1;
          this.$axios.defaults.headers.Authorization =
            "Token " + this.$store.state.Authorization;
          this.$axios
            .post("/diagnosisReportLC/", tmp)
            .then((res) => {
              alert("创建成功");
            })
            .catch((err) => {
              alert(err);
            });
        }
      });
    },
    //根据下拉框内容请求模板
    handleChange(value) {
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.pageindex = 1;
      this.$axios
        .get("/grossDiagnosisModelRU/" + value + "/")
        .then((res) => {
          this.formrule = res.data.detail.template;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  watch: {},
};
</script>

<style>
</style>