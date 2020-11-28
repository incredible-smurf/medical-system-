<template>
  <div>
    <!-- 模板管理系统步骤显示 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="建立新模板"></el-step>
      <el-step title="预览模板"></el-step>
      <el-step title="确认模板类型"></el-step>
    </el-steps>
    <!-- 创建模板内容 -->
    <div v-if="index2 == 0">
      <el-card
        class="box-card"
        style="
          width: 80%;
          margin-left: 10%;
          min-height: 150px;
          margin-top: 10px;
        "
      >
        <el-input
          class="radio1"
          placeholder="请输入模板主题"
          v-model="title"
          clearable
          style="width: 100%; font-size: 28px"
        >
        </el-input>
        <el-input
          class="textarea"
          type="textarea"
          :rows="2"
          placeholder="请输入模板描述"
          v-model="miaoshu"
          style="width: 100%; font-size: 16px; margin-top: 10px"
        >
        </el-input>
      </el-card>

      <el-card
        class="box-card"
        style="
          width: 80%;
          margin-left: 10%;
          min-height: 150px;
          margin-top: 10px;
        "
        v-for="i in num"
        :id="i"
      >
        <div>
          <el-tag>{{ i }}</el-tag>
          <el-input
            placeholder="请输入内容"
            v-model="inputBT[i]"
            clearable
            style="width: 75%"
          >
          </el-input>

          <el-select
            v-model="value[i]"
            placeholder="请选择"
            style="width: 18%; float: right"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div
          style="
            width: 100%;
            height: 0;
            margin-top: 5px;
            border: solid 0.5px lightgrey;
          "
        ></div>
        <div v-if="value[i] == 'input'" style="color: grey; margin-top: 20px">
          待填写者写入文本
        </div>

        <div
          v-if="value[i] == 'InputNumber'"
          style="color: grey; margin-top: 20px"
        >
          待填写者写入数字
        </div>
        <div
          class="radio"
          v-if="value[i] == 'radio'"
          style="color: grey; margin-top: 20px"
        >
          <div v-for="j in radionum[i]" :id="j">
            <el-input
              placeholder="请输入选项名"
              v-model="radioname[i][j]"
              clearable
              style="width: 80%"
            >
            </el-input>
          </div>
          <div>
            <el-button type="text" @click="addradio(i)"
              ><i
                class="el-icon-circle-plus-outline"
                style="font-size: 20px; margin-top: 10px"
              ></i
            ></el-button>
            <el-button type="text" @click="deleteradio(i)"
              ><i
                class="el-icon-remove-outline"
                style="font-size: 20px; margin-top: 10px"
              ></i
            ></el-button>
          </div>
        </div>

        <div
          class="radio"
          v-if="value[i] == 'checkbox'"
          style="color: grey; margin-top: 20px"
        >
          <div v-for="j in checkboxnum[i]" :id="j">
            □
            <el-input
              placeholder="请输入选项名"
              v-model="checkboxname[i][j]"
              clearable
              style="width: 80%"
            >
            </el-input>
          </div>
          <div>
            <el-button type="text" @click="addcheckbox(i)"
              ><i
                class="el-icon-circle-plus-outline"
                style="font-size: 20px; margin-top: 10px"
              ></i
            ></el-button>
            <el-button type="text" @click="deletecheckbox(i)"
              ><i
                class="el-icon-remove-outline"
                style="font-size: 20px; margin-top: 10px"
              ></i
            ></el-button>
          </div>
        </div>
        <div
          class="radio"
          v-if="value[i] == 'select'"
          style="color: grey; margin-top: 20px"
        >
          <div v-for="j in selectnum[i]" :id="j">
            {{ j }}、
            <el-input
              placeholder="请输入选项名"
              v-model="selectname[i][j]"
              clearable
              style="width: 80%"
            >
            </el-input>
          </div>
          <div>
            <el-button type="text" @click="addselect(i)"
              ><i
                class="el-icon-circle-plus-outline"
                style="font-size: 20px; margin-top: 10px"
              ></i
            ></el-button>
            <el-button type="text" @click="deleteselect(i)"
              ><i
                class="el-icon-remove-outline"
                style="font-size: 20px; margin-top: 10px"
              ></i
            ></el-button>
          </div>
        </div>
      </el-card>
      <div
        style="
          text-align: right;
          width: 80%;
          margin-left: 10%;
          margin-top: 10px;
        "
      >
        <el-tooltip
          class="item"
          effect="light"
          content="添加新组件"
          placement="top"
        >
          <el-button type="text" @click="adddiv" style="font-size: 30px"
            ><i class="el-icon-circle-plus"></i
          ></el-button>
        </el-tooltip>

        <el-tooltip
          class="item"
          effect="light"
          content="删除组件"
          placement="top"
        >
          <el-button type="text" @click="delectdiv" style="font-size: 30px"
            ><i class="el-icon-remove"></i
          ></el-button>
        </el-tooltip>
      </div>
      <div style="text-align: center">
        <el-button type="primary" @click="tijiao()">预览发布</el-button>
      </div>
    </div>
    <!-- 模板预览 -->
    <div v-if="index2 == 1">
      <div
        style="width: 80%; margin-left: 10%; margin-top: 10px; font-size: 28px"
        v-html="title"
      ></div>
      <div
        style="width: 80%; margin-left: 10%; margin-top: 10px; font-size: 16px"
        v-html="miaoshu"
      ></div>
      <!-- 生成模板 -->
      <form-create
        v-model="yulanform"
        :rule="formrule"
        :option="option"
        @on-submit="onSubmit1"
        style="width: 80%; margin-top: 20px"
      ></form-create>

      <div style="text-align: center">
        <el-button type="primary" @click="changeindex2(0)">返回修改</el-button>
        <el-button type="primary" @click="changeindex(10)">立即发布</el-button>
      </div>
    </div>
    <!-- 确认模板类别并提交 -->
    <div v-if="index2 === 2">
      <el-form :model="submit" :rules="submitrules" ref="Form">
        <el-form-item label="请输入模板名称" prop="name"
          ><el-input v-model="submit.name" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item label="请选择模板类型" prop="category">
          <el-radio-group v-model="submit.category">
            <el-radio label="Gross">大体</el-radio>
            <el-radio label="Diagnosis">诊断</el-radio>
            <el-radio label="Materials">取材</el-radio>
            <el-radio label="Biopsy">切片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('Form')">提交</el-button>
          <el-button @click="backto2()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "NewForm",
  data() {
    //是否有名字
    let checkname = (rule, value, callback) => {
      if (!value) callback(new Error("请输入模板名"));
      else callback();
    };
    return {
      active: 0,
      //管理当前在第几步
      index2: 0,
      title: "",
      miaoshu: "",
      //卡片的个数
      num: 1,
      //输入框
      inputBT: [],
      //下拉选择框
      options: [
        {
          value: "input",
          label: "文本",
        },
        {
          value: "InputNumber",
          label: "数字",
        },
        {
          value: "radio",
          label: "单选按钮",
        },
        {
          value: "checkbox",
          label: "多选按钮",
        },
        {
          value: "select",
          label: "下拉选择",
        },
        {
          value: "rate",
          label: "评分",
        },
      ],
      value: [],

      //下面待优化
      //单选按钮的选项个数
      //-100占位
      radionum: [-100, 2],
      //单选按钮名字
      radioname: [[], []],

      //多选按钮的选项个数
      checkboxnum: [-100, 2],
      //多选按钮名字
      checkboxname: [[], []],

      //下拉框的选项个数
      selectnum: [-100, 2],
      //下拉框名字
      selectname: [[], []],

      //生成的表单规则
      formrule: [],
      //表单实例对象
      yulanform: {},
      //不显示提交按钮
      option: {
        submitBtn: {
          show: false,
        },
      },
      //提交内容打包
      submit: {
        category: "",
        name: "",
        detail: "",
      },
      //模板提交前check检查
      submitrules: {
        name: [{ validator: checkname, trigger: "blur" }],
        category: [//必选
          { required: true, message: "请选择一个模板类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    //增加组件
    adddiv() {
      this.num += 1;
      this.inputBT.push();
      this.radionum.push(2);
      this.radioname.push([]);
      this.checkboxnum.push(2);
      this.checkboxname.push([]);
      this.selectnum.push(2);
      this.selectname.push([]);
    },
    //删除组件
    delectdiv() {
      if (this.num > 1) {
        this.num -= 1;
        this.inputBT.pop();
        this.radionum.pop();
        this.radioname.pop();
        this.checkboxnum.pop();
        this.checkboxname.pop();
        this.selectnum.pop();
        this.selectname.pop();
      }
    },
    //增加单选按钮选项，实时更新数组用$set
    addradio(i) {
      this.$set(this.radionum, i, this.radionum[i] + 1);
    },
    deleteradio(i) {
      this.$set(this.radionum, i, this.radionum[i] - 1);
    },

    //增加多选按钮选项
    addcheckbox(i) {
      this.$set(this.checkboxnum, i, this.checkboxnum[i] + 1);
      // this.radionum[i] +=1;
    },
    deletecheckbox(i) {
      this.$set(this.checkboxnum, i, this.checkboxnum[i] - 1);
    },

    //增加下拉框选项
    addselect(i) {
      this.$set(this.selectnum, i, this.selectnum[i] + 1);
      // this.radionum[i] +=1;
    },
    deleteselect(i) {
      this.$set(this.selectnum, i, this.selectnum[i] - 1);
    },
    //调试用函数
    tijiao() {
      this.active = 1;
      console.log(this.inputBT, "inputBT");
      console.log(this.value, "value");
      // console.log(this.radioname)
      // console.log(this.checkboxname)
      // console.log(this.selectname)
      this.formrule = [];
      for (let i = 1; i < this.inputBT.length; i++) {
        console.log(this.value[i]);

        if (this.value[i] == "radio") {
          let h = this.radioname[i].length; //3

          let options = [];
          for (let j = 1; j < h; j++) {
            options.push({
              value: this.radioname[i][j],
              label: this.radioname[i][j],
            });
          }

          this.formrule.push({
            type: this.value[i],
            field: this.inputBT[i],
            title: this.inputBT[i],
            options: options,
          });
        } else if (this.value[i] == "checkbox") {
          let h = this.checkboxname[i].length; //3

          let options = [];
          for (let j = 1; j < h; j++) {
            options.push({
              value: this.checkboxname[i][j],
              label: this.checkboxname[i][j],
            });
          }

          this.formrule.push({
            type: this.value[i],
            field: this.inputBT[i],
            title: this.inputBT[i],
            options: options,
          });
        } else if (this.value[i] == "select") {
          let h = this.selectname[i].length; //3

          let options = [];
          for (let j = 1; j < h; j++) {
            options.push({
              value: this.selectname[i][j],
              label: this.selectname[i][j],
            });
          }

          this.formrule.push({
            type: this.value[i],
            field: this.inputBT[i],
            title: this.inputBT[i],
            options: options,
          });
        } else {
          this.formrule.push({
            type: this.value[i],
            field: this.inputBT[i],
            title: this.inputBT[i],
          });
          console.log(this.formrule);
        }
      }
      this.index2 = 1;
      console.log(this.formrule);
    },
    onSubmit1(formData) {
      alert(JSON.stringify(formData));
    },
    //调整步骤，包含前进回退
    changeindex2(msg) {
      this.index2 = msg;
      this.active = 0;
    },
    changeindex(msg) {
      this.active = 2;
      //this.$emit("NewIndex",msg)
      this.index2 = 2;
    },
    backto2() {
      this.active = 1;
      this.index2 = 1;
    },
    //提交
    submitForm(msg) {
      //检查有效性之后才能提交
      this.$refs[msg].validate((valid) => {
        if (valid) {
          let tmp = {};
          tmp.name = this.submit.name;
          tmp.category = this.submit.category;
          let detail = { template: this.formrule };
          tmp.detail = JSON.stringify(detail);
          this.$axios.defaults.headers.Authorization =
            "Token " + this.$store.state.Authorization;
          //console.log(this.$axios.defaults)
          //console.log('Token '+this.$store.state.Authorization)
          this.$axios
            .post("/grossDiagnosisModelCreat/", tmp)
            .then((res) => {
              alert("创建成功");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
        }
      });
    },
  },
};
</script>

<style scoped>
.radio .el-input__inner {
  width: 220px;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
.radio1 .el-input__inner {
  width: 100%;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
.textarea .el-textarea__inner {
  width: 100%;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
</style>