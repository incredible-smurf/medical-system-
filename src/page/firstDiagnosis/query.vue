<template>
  <el-main>
    <!-- 初诊报告查看 -->
    <el-table :data="templatelist" style="width: 100%">
      <el-table-column label="初诊报告ID" prop="id"> </el-table-column>
      <el-table-column label="病理报告ID" prop="medicalFileId">
      </el-table-column>
      <el-table-column label="医生姓名" prop="doc"> </el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页符 -->
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
      //数据总量
      totalsize: 0,
      //第几页
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
    };
  },
  //请求第一页数据
  beforeCreate() {
    this.$axios.defaults.headers.Authorization =
      "Token " + this.$store.state.Authorization;
    this.$axios
      .get("/diagnosisReportLC/", { params: { category: 0 } })
      .then((res) => {
        //console.log(res);
        this.totalsize = res.data.count;
        for (let i in res.data.results) {
          let tmp = {};
          tmp.id = res.data.results[i].id;
          tmp.doc = res.data.results[i].doctorName;
          tmp.medicalFileId = res.data.results[i].medicalFile;
          this.templatelist.push(tmp);
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    //单页显示数量控制
    handleSizeChange(val) {
      //计算位移
      this.currentPage=1
      this.pageSize = val;
      let parmas_send = {
        offset: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
        //search: this.$store.state.userprofile.name,
      };
      parmas_send.category = 0;
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$axios
        .get("/diagnosisReportLC/", { params: parmas_send })
        .then((res) => {
          this.templatelist = [];
          this.totalsize = res.data.count;
          for (let i in res.data.results) {
            let tmp = {};
            tmp.id = res.data.results[i].id;
            tmp.medicalFileId = res.data.results[i].medicalFile;
            tmp.doc = res.data.results[i].doctorName;
            this.templatelist.push(tmp);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    //翻页控制
    handleCurrentChange(val) {
      //计算位移
      this.currentPage = val;
      let parmas_send = {
        offset: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
        //search: this.$store.state.userprofile.name,
      };
      parmas_send.category = 0;
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$axios
        .get("/diagnosisReportLC/", { params: parmas_send })
        .then((res) => {
          this.templatelist = [];
          for (let i in res.data.results) {
            let tmp = {};
            tmp.id = res.data.results[i].id;
            tmp.medicalFileId = res.data.results[i].medicalFile;
            tmp.doc = res.data.results[i].doctorName;
            this.templatelist.push(tmp);
          }
          this.totalsize = res.data.count;
        })
        .catch((err) => {
          alert(err);
        });
    },
    //跳转详情界面
    handleEdit(index, row) {
      this.$router.push({
        path: "/first-diagnosis/show-first-diagnosis-detail",
        query: { id: row.id },
      });
    },
  },
};
</script>

<style>
</style>