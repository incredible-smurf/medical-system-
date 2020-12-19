<template>
  <div class="right-mid">
    <h1>欢迎来到医疗管理系统,{{this.name}}</h1>
    <span></span>
  </div>
</template>
<script>
export default {
  created(){
    this.name=this.$store.state.userprofile.name   
  },
  name: "rightBandMid",
  data(){
    return {
      name:''
    }
  }
};
</script>
<style scoped>
.right-mid {
  position: absolute;
  width: 80%;
  top: 15%;
  left: 5%;
  overflow: hidden;
  /* background-color: #fff; */
}
.right-mid h1 {
  font-weight: bolder;
  color: aliceblue;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin-bottom: 10px;
}
.right-mid span {
  color: azure;
}
</style>