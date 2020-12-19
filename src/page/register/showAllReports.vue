<template>
  <el-main>
    <div v-if="componentIndex == 1">
      <h1>病理报告ID:{{ this.$route.query.id }}</h1>
      <el-table :data="templateListForShow" style="width: 100%">
        <el-table-column label="报告ID" prop="medicalFileId"> </el-table-column>
        <el-table-column label="报告类型  " prop="type"> </el-table-column>
        <el-table-column label="医生姓名" prop="doc"> </el-table-column>

        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="switchToMoreDetail(scope.$index, scope.row)"
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
    </div>
    <div v-if="componentIndex == 2">
      <el-button type="primary" icon="el-icon-arrow-left" @click="backToMain"
        >返回病历档案详情
      </el-button>
      <el-row>
        <el-col :span="10">
          <h2>大体报告ID:{{ this.queryDetail.id }}</h2>
        </el-col>
        <el-col :span="10">
          <h2>病人姓名:{{ this.queryDetail.patient_name }}</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <h2>创建医生:{{ this.queryDetail.doctor_name }}</h2>
        </el-col>
        <el-col :span="10">
          <h2>病理档案ID:{{ this.queryDetail.document_id }}</h2>
        </el-col>
      </el-row>

      <form-create
        v-model="form"
        :rule="queryDetail.formrule"
        :option="option"
        style="width: 80%; margin-top: 20px"
      ></form-create>
    </div>
    <div v-if="componentIndex == 3">
      <el-button type="primary" icon="el-icon-arrow-left" @click="backToMain"
        >返回病历档案详情
      </el-button>
      <el-row>
        <el-col :span="10">
          <h2>报告ID:{{ this.queryDetail.id }}</h2>
        </el-col>
        <el-col :span="10">
          <h2>报告类型:{{ this.queryDetail.type }}</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <h2>创建医生:{{ this.queryDetail.doctor_name }}</h2>
        </el-col>
        <el-col :span="10">
          <h2>病理档案ID:{{ this.queryDetail.document_id }}</h2>
        </el-col>
      </el-row>

      <form-create
        v-model="form"
        :rule="queryDetail.formrule"
        :option="option"
        style="width: 80%; margin-top: 20px"
      ></form-create>
    </div>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      templatelist: [],
      templateListForShow: [],
      //数据总量
      totalsize: 0,
      //第几页
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
      //控制展示的元素 1主页面和表格 2 大体 3 诊断
      componentIndex: 1,
      //查询的ID号 可以是三种的任意一种
      queryID: 0,
      queryDetail: {},
      option: {
        submitBtn: {
          show: false,
        },
      },
    };
  },
  beforeCreate() {
    let self = this;
    function getDataFromGross() {
      return self.$axios.get("/grossReportLC/", {
        params: {
          medicalFile: self.$route.query.id,
          limit: 500,
        },
      });
    }
    function getDataFromMainDiagnosis() {
      return self.$axios.get("/diagnosisReportLC/", {
        params: {
          medicalFile: self.$route.query.id,
          limit: 500,
          category: 1,
        },
      });
    }
    function getDataFromFirstDiagnosis() {
      return self.$axios.get("/diagnosisReportLC/", {
        params: {
          medicalFile: self.$route.query.id,
          limit: 500,
          category: 0,
        },
      });
    }
    self.$axios
      .all([
        getDataFromGross(),
        getDataFromMainDiagnosis(),
        getDataFromFirstDiagnosis(),
      ])
      .then(
        this.$axios.spread((res1, res2, res3) => {
          for (let i = 0; i < res1.data.results.length; i++) {
            this.totalsize++;
            let tmp = {};
            tmp.doc = res1.data.results[i].doctorName;
            tmp.medicalFileId = res1.data.results[i].id;
            tmp.type = "大体报告";
            this.templatelist.push(tmp);
          }
          for (let i = 0; i < res3.data.results.length; i++) {
            this.totalsize++;
            let tmp = {};
            tmp.doc = res3.data.results[i].doctorName;
            tmp.medicalFileId = res3.data.results[i].id;
            tmp.type = "初诊报告";
            this.templatelist.push(tmp);
          }
          for (let i = 0; i < res2.data.results.length; i++) {
            this.totalsize++;
            let tmp = {};
            tmp.doc = res2.data.results[i].doctorName;
            tmp.medicalFileId = res2.data.results[i].id;
            tmp.type = "主诊报告";
            this.templatelist.push(tmp);
          }
          this.templateListForShow = this.templatelist.slice(0, 10);
        })
      )
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    backToMain() {
      this.componentIndex = 1;
    },
    handleCurrentChange(val) {
      //计算位移
      this.currentPage = val;
      this.templateListForShow = this.templatelist.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      );
    },
    handleSizeChange(val) {
      //计算位移
      this.pageSize = val;
      this.currentPage = 1;
      this.templateListForShow = this.templatelist.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      );
    },
    switchToMoreDetail(index, row) {
      console.log(row);
      if (row.type == "大体报告") {
        this.$axios
          .get("grossReportRetrieve/" + row.medicalFileId)
          .then((res) => {
            this.componentIndex = 2;
            this.queryDetail = {};
            this.queryDetail.id = res.data.id;
            this.queryDetail.doctor_name = res.data.doctorName;
            this.queryDetail.document_id = res.data.medicalFile;
            this.queryDetail.patient_name = res.data.patient;
            this.queryDetail.formrule = res.data.detail;
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        this.$axios
          .get("/diagnosisReportRetrieve/" + row.medicalFileId)
          .then((res) => {
            this.componentIndex = 3;
            this.queryDetail = {};
            this.queryDetail.id = res.data.id;
            this.queryDetail.doctor_name = res.data.doctorName;
            this.queryDetail.document_id = res.data.medicalFile;
            this.queryDetail.patient_name = res.data.patient;
            this.queryDetail.type = row.type;
            this.queryDetail.formrule = res.data.detail;
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
  },
};
</script>

<style>
</style>