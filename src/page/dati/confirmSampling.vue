<template>
  <el-main>
    <div v-if="numOfSampleBefore != 0">
      <h1>当前取材详情</h1>
      <li v-for="(vlaue, index) in contentBefore" :key="index">
        <h1>{{ index }}</h1>
      </li>
    </div>
    <h1>新建取材</h1>
    <el-row>
      <div v-for="i in numOfNewSample" :key="i">
        <el-tag>{{ i }}</el-tag>
        <el-row>
          <h3>取材区域</h3>
          <el-input v-model="currentContent[i].area"></el-input>
          <h3>取材要求</h3>
          <el-input v-model="currentContent[i].request"></el-input>
          <h3>取材编号</h3>
          <el-input v-model="currentContent[i].id"></el-input>
        </el-row>
      </div>
      <el-tooltip
        class="item"
        effect="light"
        content="添加取材位置"
        placement="top"
      >
        <el-button
          type="text"
          @click="adddiv"
          style="font-size: 30px; float: right"
          ><i class="el-icon-circle-plus"></i
        ></el-button>
      </el-tooltip>

      <el-tooltip
        class="item"
        effect="light"
        content="删除取材位置"
        placement="top"
      >
        <el-button
          type="text"
          @click="delectdiv"
          style="font-size: 30px; float: right"
          ><i class="el-icon-remove"></i
        ></el-button>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-button
        type="text"
        @click="submitSample"
        style="font-size: 30px; margin: auto 0"
        ><i class="el-icon-check">提交</i></el-button
      >
    </el-row>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      contentBefore: [],
      currentContent: [{ area: "", request: "", id: "" }],
      numOfNewSample: 0,
      numOfSampleBefore: 0,
    };
  },
  created() {
    this.$axios.defaults.headers.Authorization =
      "Token " + this.$store.state.Authorization;
    this.$axios
      .get("/materialsLC/", { params: { grossReport: this.$route.query.id } })
      .then((res) => {
        for (i in res.data.results) {
          this.contentBefore.push(i);
          numOfSampleBefore += 1;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(this.contentBefore);
  },
  methods: {
    adddiv() {
      this.numOfNewSample += 1;
      this.currentContent.push({ area: "", request: "", id: "" });
      console.log(this.currentContent);
    },
    delectdiv() {
      this.numOfNewSample -= 1;
      this.currentContent.pop();
    },
    submitSample() {
      for (let i = 0; i < this.numOfNewSample; i++) {
        let summitContent = {};
        summitContent.area = this.currentContent[i].area;
        summitContent.request = this.currentContent[i].request;
        let detail = {
          id: this.currentContent[i].id,
        };
        summitContent.detail = JSON.stringify(detail);
        summitContent.operator = this.$store.state.userprofile
        console.log(this.$store.state)
        //summitContent.grossReport = this.$route.id;
        /* this.$axios.defaults.headers.Authorization =
          "Token " + this.$store.state.Authorization;
        this.$axios
          .post("/materialsLC/", summitContent)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          }); */
      }
    },
  },
};
</script>

<style>
</style>