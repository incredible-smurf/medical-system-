<template>
  <el-main>
    <!-- 模板详情界面 -->
    <el-row>
      <!-- 显示模板详情 -->
      <el-col :span="10">
        <h2>模板名:{{ this.name }}</h2>
      </el-col>
      <el-col :span="10">
        <h2>类别:{{ this.catgory }}</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <h2>创建医生:{{ this.doc_name }}</h2>
      </el-col>
      <el-col :span="10">
        <h2>医生ID:{{ this.doc_id }}</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <h2>模板详情:</h2>
      </el-col>
    </el-row>
    <!-- 创建样例表单 -->
    <form-create
      v-model="form"
      :rule="formrule"
      :option="option"
      style="width: 80%; margin-top: 20px"
    ></form-create
  ></el-main>
</template>

<script>
export default {
  created() {
    //向后端模板详情
    console.log(this.$route.query);
    this.$axios
      .get("/grossDiagnosisModelRU/" + this.$route.query.id + "/")
      .then((res) => {
        this.formrule = res.data.detail.template;
        this.catgory = res.data.category;
        if (this.catgory === "Gross") this.catgory = "大体模板";
        else if (this.catgory === "Diagnosis") this.catgory = "诊断报告模板";
        else if (this.catgory === "Materials") this.catgory = "取材模板";
        else if (this.catgory === "Biopsy") this.catgory = "切片模板";

        this.doc_name = res.data.doctorName;
        this.doc_id = res.data.doctor;
        this.name = res.data.name;
      })
      .catch((err) => {
        alert(err);
      });
  },

  data() {
    return {
      //详情信息
      form: {},
      formrule: [],
      catgory: "",
      createtime: "",
      name: "",
      doc_name: "",
      doc_id: "",
      //关闭提交按钮
      option: {
        submitBtn: {
          show: false,
        },
      },
    };
  },
};
</script>

<style>
</style>