<template>
  <!-- 详情查询界面 -->
  <el-main>
    <el-row :gutter="5">
      <!--  搜索框 按姓名搜索 -->
      <el-col :span="15"
        ><el-input v-model="search" placeholder="请输入搜索姓名"></el-input
      ></el-col>
      <el-col :span="9"
        ><el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        ></el-col
      >
    </el-row>
    <!-- 表格主体 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="病人ID" prop="id"> </el-table-column>
      <el-table-column label="病人姓名" prop="name"> </el-table-column>
      <el-table-column label="病人性别" prop="sex"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 控制翻页 -->
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
  //请求第一页
  beforeCreate() {
    this.$axios.defaults.headers.Authorization =
      "Token " + this.$store.state.Authorization;
    this.$axios
      .get("/patientList/")
      .then((res) => {
        for (let item in res.data.results) {
          res.data.results[item].sex =
            res.data.results[item].sex == "male" ? "男" : "女";
          this.tableData.push(res.data.results[item]);
        }
        this.totalsize = res.data.count;
      })
      .catch((err) => {
        alert(err);
      });
  },
  data() {
    return {
      tableData: [],
      search: "",
      handleList: [],
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
      //共多少条
      totalsize: 0,
      //
      searchOn: false,
    };
  },
  methods: {
    //搜过管理
    handleSearch() {
      //开启搜索模式
      this.searchOn = true;
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$axios
        .get("/patientList/", {
          params: {
            offset: (this.currentPage - 1) * this.pageSize,
            limit: this.pageSize,
            search: this.search,//搜索变量
          },
        })
        //按搜索模式请求内容
        .then((res) => {
          this.tableData = [];
          for (let item in res.data.results) {
            res.data.results[item].sex =
              res.data.results[item].sex == "male" ? "男" : "女";
            this.tableData.push(res.data.results[item]);
          }
          this.totalsize = res.data.count;
        })
        .catch((err) => {
          alert(err);
        });
    },
    //显示内容数量改变处理
    handleSizeChange(val) {
      this.pageSize = val;
      //偏移计算
      let parmas_send = {
        offset: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
      };
      if (this.searchOn) parmas_send.search = this.search;
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      //请求！
      this.$axios
        .get("/patientList/", {
          params: parmas_send,
        })
      //请求到了！
        .then((res) => {
          this.tableData = [];
          for (let item in res.data.results) {
            res.data.results[item].sex =
              res.data.results[item].sex == "male" ? "男" : "女";
            this.tableData.push(res.data.results[item]);
          }
          this.totalsize = res.data.count;
        })
      //出错了！
        .catch((err) => {
          alert(err);
        });
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      //计算偏移 同上
      let parmas_send = {
        offset: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
      };
      if (this.searchOn) parmas_send.search = this.search;
      this.$axios.defaults.headers.Authorization =
        "Token " + this.$store.state.Authorization;
      this.$axios
        .get("/patientList/", {
          params: parmas_send,
        })
        .then((res) => {
          this.tableData = [];
          for (let item in res.data.results) {
            res.data.results[item].sex =
              res.data.results[item].sex == "male" ? "男" : "女";
            this.tableData.push(res.data.results[item]);
          }
          this.totalsize = res.data.count;
        })
        .catch((err) => {
          alert(err);
        });
    },
    //详情界面查看
    handleEdit(index, row) {
      this.$router.push({
        path: "/register/showpatientdetail",
        query: { id: row.id },
      });
    },
  },
  watch: {
    search: {
      handler() {
        //若搜索内容为空 关闭搜索模式 按正常模式显示
        if (this.search === "") this.searchOn = false;
      },
    },
  },
};
</script>

<style>
</style>