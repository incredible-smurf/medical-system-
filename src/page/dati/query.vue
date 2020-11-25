<template>
  <el-main>
    <el-table :data="templatelist" style="width: 100%">
      <el-table-column label="大体报告ID" prop="id"> </el-table-column>
      <el-table-column label="病人姓名" prop="label"> </el-table-column>
      <el-table-column label="医生姓名" prop="doc"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalsize"
    >
    </el-pagination>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      templatelist: [],
      totalsize: 0,
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
    };
  },
  beforeCreate() {
    this.$axios.defaults.headers.Authorization =
      "Token " + this.$store.state.Authorization;
    this.$axios
      .get("/grossReportLC/")
      .then((res) => {
        //console.log(res);
        this.totalsize = res.data.count;
        for (let i in res.data.results) {
          let tmp = {};
          tmp.id = res.data.results[i].id;
          tmp.label = res.data.results[i].patient;
          tmp.doc = res.data.results[i].doctor_name;
          this.templatelist.push(tmp);
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;

      let parmas_send = {
        offset: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
        //search: this.$store.state.userprofile.name,
      };
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$axios
        .get("/grossReportLC/", { params: parmas_send })
        .then((res) => {
          this.templatelist = [];
          this.totalsize = res.data.count;
          for (let i in res.data.results) {
            let tmp = {};
            tmp.id = res.data.results[i].id;
            tmp.label = res.data.results[i].patient;
            tmp.doc = res.data.results[i].doctor_name;
            this.templatelist.push(tmp);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let parmas_send = {
        offset: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
        //search: this.$store.state.userprofile.name,
      };

      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$axios
        .get("/grossReportLC/", { params: parmas_send })
        .then((res) => {
          this.templatelist = [];
          for (let i in res.data.results) {
            let tmp = {};
            tmp.id = res.data.results[i].id;
            tmp.label = res.data.results[i].patient;
            tmp.doc = res.data.results[i].doctor_name;
            this.templatelist.push(tmp);
          }
          this.totalsize = res.data.count;
        })
        .catch((err) => {
          alert(err);
        });
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/dati/showdatidetail",
        query: { id: row.id },
      });
    },
  },
};
</script>

<style>
</style>