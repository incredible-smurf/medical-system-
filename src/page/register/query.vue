<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="病人ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="病人姓名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="病人性别"
      prop="sex">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    beforeCreate(){
      this.$axios.defaults.headers.Authorization='Token '+this.$store.state.Authorization
      this.$axios.get('/patientList/')
      .then(res=>{
        for(let item in res.data.results)
        {
          res.data.results[item].sex= res.data.results[item].sex=='male'?"男":"女"
          this.tableData.push(res.data.results[item])
        }
        
      }).catch(err=>{console.log(err)})
    },
    data() {
      return {
        tableData: [],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
  }
</script>

<style>

</style>