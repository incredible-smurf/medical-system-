<template>
  <el-main>
    <!-- 模板展示表格 -->
    <el-table :data="templatelist" style="width: 100%">
      <el-table-column label="模板ID" prop="value"> </el-table-column>
      <el-table-column label="模板名" prop="label"> </el-table-column>
      <el-table-column label="模板类型" prop="cat"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控制 -->
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
  //请求第一页
  beforeCreate() {
    this.$axios.defaults.headers.Authorization =
      "Token " + this.$store.state.Authorization;
    this.$axios
      .get("/grossDiagnosisModelList/", {
        search: this.$store.state.userprofile.name,
      })
      .then((res) => {
        this.totalsize = res.data.count;
        for (let i in res.data.results) {
          let tmp = {};
          tmp.value = res.data.results[i].id;
          tmp.label = res.data.results[i].name;

          if (res.data.results[i].category === "Gross") tmp.cat = "大体模板";
          else if (res.data.results[i].category === "Diagnosis")
            tmp.cat = "诊断报告模板";
          else if (res.data.results[i].category === "Materials")
            tmp.cat = "取材模板";
          else if (res.data.results[i].category === "Biopsy")
            tmp.cat = "切片模板";
          this.templatelist.push(tmp);
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    //控制每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      //位移

      let parmas_send = {
        offset: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
        search: this.$store.state.userprofile.name,
      };
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$axios
        .get("/grossDiagnosisModelList/", { params: parmas_send })
        .then((res) => {
          this.templatelist = [];
          console.log(res);
          for (let i in res.data.results) {
            let tmp = {};
            tmp.value = res.data.results[i].id;
            tmp.label = res.data.results[i].name;
            if (res.data.results[i].category === "Gross") tmp.cat = "大体模板";
            else if (res.data.results[i].category === "Diagnosis")
              tmp.cat = "诊断报告模板";
            else if (res.data.results[i].category === "Materials")
              tmp.cat = "取材模板";
            else if (res.data.results[i].category === "Biopsy")
              tmp.cat = "切片模板";
            this.templatelist.push(tmp);
          }
          this.totalsize = res.data.count;
        })
        .catch((err) => {
          alert(err);
        });
    },
    //控制页码
    handleCurrentChange(val) {
      this.currentPage = val;
      let parmas_send = {
        offset: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
        search: this.$store.state.userprofile.name,
      };

      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$axios
        .get("/grossDiagnosisModelList/", { params: parmas_send })
        .then((res) => {
          this.templatelist = [];
          for (let i in res.data.results) {
            let tmp = {};
            tmp.value = res.data.results[i].id;
            tmp.label = res.data.results[i].name;
            if (res.data.results[i].category === "Gross") tmp.cat = "大体模板";
            else if (res.data.results[i].category === "Diagnosis")
              tmp.cat = "诊断报告模板";
            else if (res.data.results[i].category === "Materials")
              tmp.cat = "取材模板";
            else if (res.data.results[i].category === "Biopsy")
              tmp.cat = "切片模板";
            this.templatelist.push(tmp);
          }
          this.totalsize = res.data.count;
        })
        .catch((err) => {
          alert(err);
        });
    },
    //跳转详情页
    handleEdit(index, row) {
      this.$router.push({
        path: "/template/showtemplatedetail",
        query: { id: row.value },
      });
    },
  },

};
</script>

<style>
</style>