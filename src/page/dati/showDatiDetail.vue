<template>
  <el-main>
    <!-- 详情界面展示 -->
    <el-row>
      <el-col :span="10">
        <h2>大体报告ID:{{ this.id }}</h2>
      </el-col>
      <el-col :span="10">
        <h2>病人姓名:{{ this.patient_name }}</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <h2>创建医生:{{ this.doctor_name }}</h2>
      </el-col>
      <el-col :span="10">
        <h2>病理档案ID:{{ this.document_id }}</h2>
      </el-col>
    </el-row>

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
  //请求具体内容
  created() {
    this.$axios
      .get("grossReportRetrieve/" + this.$route.query.id)
      .then((res) => {
        this.id = res.data.id;
        this.doctor_name = res.data.doctorName;
        this.document_id = res.data.medicalFile;
        this.patient_name = res.data.patient;
        this.formrule = res.data.detail;
      })
      .catch((err) => {
        alert(err);
      });
  },
  data() {
    return {
      form:{},
      id: "",
      doctor_name: "",
      document_id: "",
      patient_name: "",
      detail: "",
      option: {
        submitBtn: {
          show: false,
        },
      },
      formrule: [],
    };
  },
};
</script>

<style>
</style>