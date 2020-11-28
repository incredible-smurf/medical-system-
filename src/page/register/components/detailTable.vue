<template>
  <div>
    <!--  病人信息详情页表格 -->
    <h1>病理档案</h1>
    <el-button @click="addNew">新建病理档案</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="病理档案ID" prop="id"> </el-table-column>
      <el-table-column label="病人ID" prop="patient"> </el-table-column>
      <el-table-column label="创建时间" prop="created"> </el-table-column>
      <el-table-column label="更新时间" prop="updated"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["queryid"],
  data() {
    return { aaa: "", tableData: [] };
  },
  beforeCreate() {},
  //请求数据
  created() {
    this.$axios.defaults.headers.Authorization =
      "Token " + this.$store.state.Authorization;
    this.$axios
      .get("/medicalFileLC/", { params: { patient: this.queryid } })
      .then((res) => {
        for (let item in res.data.results) {
          this.tableData.push(res.data.results[item]);
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    //新建病历档案
    addNew() {
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$axios
        .post("/medicalFileLC/", { patient: this.queryid })
        .then((res) => {
          alert("创建成功");
        })
        .catch((err) => {
          alert(err);
        });
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$axios
        .get("/medicalFileLC/", { params: { patient: this.queryid } })
        .then((res) => {
          this.tableData = [];
          for (let item in res.data.results) {
            this.tableData.push(res.data.results[item]);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style>
</style>