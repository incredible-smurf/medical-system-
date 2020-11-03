<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="6" :offset="2">
        <div class="smalls">病人姓名</div>
        <el-input
          v-model="name"
          placeholder="请输入病人姓名"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="6" :offset="3">
        <div class="smalls">病人ID</div>
        <el-input
          v-model="patientid"
          placeholder="请输入病人ID"
          clearable
        ></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="buttonquery"  :gutter="10">
      <el-col :span="15" :offset="2">
        <div class="smalls">病历</div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入病历内容"
          v-model="textarea2"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="buttonquery" justify="center" :gutter="10">
      <el-col :span="6">
        <el-button @click="queryforcreate">建立病理档案</el-button>
      </el-col>
    </el-row>
    
    <el-row type="flex" class="buttonquery">
      <el-col :offset="2" :span="15">
      <el-table stripe>
        <el-table-column label="病人姓名"></el-table-column>
        <el-table-column label="ID"></el-table-column>
      </el-table>
      </el-col>
    </el-row>

    <router-view />
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      patientid: "",
      textarea2:""
    };
  },
  methods: {
    queryforcreate() {
      /*
      查询需求
      */
      this.$router.replace("/register/newregister/create");
    },
  },
};
</script>

<style scoped>
.buttonquery {
  margin-top: 30px;
}
</style>