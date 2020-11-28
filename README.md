# **医疗信息管理系统--前端界面**



## **一、实现框架**
vue 2.6.11
vue脚手架版本 4.5

## **getting started**
**(1)首先下载node.js,要求版本在8.9以上<br/>***
下载完可检查在windows任务命令行里输入
```
node -v
```
，若出现版本号则安装成功<br/>

**(2)安装cnpm<br/>**
在命令行中输入  
```
npm install -g cnpm --registry=http://registry.npm.taobao.org
```
然后等待，没报错表示安装成功<br/>

**(3)安装脚手架**
```
npm install -g vue-cli
```

**(4)运行程序**

在项目根目录下输入
```
npm run serve
```
结果如下图
![avatar](/readme_pic/1.png)<br/>

**(5)打开<http://localhost:8080/><br/>**
出现如下界面则运行成功
![avatar](/readme_pic/2.png)<br/>


## **二、基础知识**
### **(1)js、html、css**
js：主要负责页面执行逻辑处理<br/>
html：前端需要展示的元素
如标题\<h1\>、块\<div\>等，这一部分不需要特别了解特别细致，主要了解element-ui中的元素即可<br/>
css:元素样式，主要需要了解定位等
### **(2)Vue 的一些基础文件**

#### **package.json**
描述项目及项目所依赖的模块信息，依赖在代码概述中会详细说明
#### **package-lock.json**
描述 node_modules 文件中所有模块的版本信息，模块来源及依赖的小版本信息等
#### **vue.config.js**
可选的配置文件，一些基本的设置，如indexPath(指定生成的 index.html 的输出路径)、assetsDir(放置生成的静态资源 (js、css、img、fonts) 的目录)等。该文件可选，当前项目中并无该文件，如果后续需要可以手动配置

#### **文件夹 node_modules**
存放依赖库内容

#### **文件夹 src**
前端代码部分
#### **src/App.vue**
入口界面
#### **src/main.js**
负责各个包的管理和调度
### **(3)其他文件**
#### **.gitignore**
使用Git进行版本控制时所忽略的文件和文件夹，该项目由于主要代码逻辑在src中，依赖库可以调用命令直接下载，所以主要忽略了node_modules中的文件。如果不想忽略，删除该文件即可
## **三、代码概述**
### **依赖库**
#### (1) **vue-router 3.4.7**
负责网站的页面跳转，根据不同的url选择展示不同的元素，vue-router是前端路由的一种实现方式，由前端负责路由的跳转。根据url展示绑定的元素<br/>
路由的设置与管理在src/router/router.js中,下面举例说明如何使用：<br/>
第一步：请求页面元素
```js
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
```
该语句从目标路径../page/home/home请求元素<br/>
第二步：设置路由路径
```js
const routes = [
    //首页
    {
        path: '/home',
        component: home
    },
    ]
```
现在界面url已经申请完毕，创建router对象并导出即可
```js
const router = new VueRouter({
    routes,
    mode: 'history',
})
```
在main.js中调用即可并绑定到APP即可使用
```js
import router from './router/router'
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
```
进入url目标后，在父页面中调用\<router-view/>即可将绑定的模块展示到页面的相应位置

#### (2) **vue-axios 3.1.3**
该依赖库用于向后端请求数据，基于Promise语法格式。样例如下：
```js
this.$axios.get('/grossDiagnosisModelRU/'+this.$route.query.id+'/')
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{alert(err)})
```
如果没有错误，Promise格式中的then函数中的res即为get操作后的返回值内容，若果出现异常则调用catch函数中的内容<br/>

vue-axios的配置存储在 src/axios/index.js中
其中保存了全局的后端地址Baseurl和全局http头，详情见文件内注释

#### **(3) vuex 3.5.1**
vuex是专门用来管理vue.js应用程序中状态的一个插件。他的作用是将应用中的所有状态都放在一起，集中式来管理。即管理全局变量，本实现中全局保存了Authorization（登录后服务器返回的token），userprofile（当前登陆的用户信息）

具体配置在 src/store/store.js中，详见文件注释

#### **(4) element-ui 2.4.5**

该依赖库打包了多种常见的网站元素，包含多种常见模块,示例如下
![avatar](/readme_pic/3.png)<br/>
，以下是官方文档<http://element-cn.eleme.io/#/zh-CN/component/quickstart><br/>
配置如下 src/plugins/element.js

#### **(5) form-create/element-ui 1.0.20**
表单快速管理工具，官方文档如下
<http://www.form-create.com/v2/guide/>

其在main.js中配置，主要用于生成模板表单
```js
import formCreate from "@form-create/element-ui"
Vue.use(formCreate)
```


### **Vue文件简介**
Vue文件由三部分组成，分别为template、script、style<br/>
```vue
<template>

</template>

<script>
export default {

};
</script>

<style scoped>

</style>
```
template即该模块呈现什么元素，对应html<br/>
script即该界面运行的逻辑，即javascript脚本<br/>
style即界面样式，即css<br/>
Vue官方文档见<https://cn.vuejs.org/v2/guide/>
我说明一下常用的内容<br/>
#### **script**
```js
//模块名称
name:"demo_name"
//用于返回当前界面的数据（变量）内容，为一个函数，务必用return返回数据对象
data(){
    return {
        data1:{},
        data2:[1,2],
        data3:'',
        data4:'1'
    }
}
//保存当前页面的方法，为一个对象，可以设置多个方法
methods:{
  methods1(){
      console.log('methods1')
  },
  methods2(){
      console.log('methods1')
  }
}
//声明该模块的子组件,使之可以在该模块的template的直接使用 例如<component1/>
components: {component1,component2}
//不断监听数据变化，执行相应方法，此处监听data中创建的data3，比较适合的场景是一个数据影响多个数据
watch:{
    data3: {
      handler() {
        if (this.data3 === "") console.log('something');
      },
    }, 
}

//需要主动调用，具有缓存能力，只有数据再次改变才会重新渲染，增强性能
computed:{
    Info1:{
        //Info1调用时触发
        get(){

        },
        //设置值时触发
        set(){

        }
    }
}

//生命周期函数
//组件刚刚创建，组件属性计算前调用，如data()一般用于初始化请求数据
beforeCreate(){

}
//组件刚刚创建完成，属性计算完成后调用
created(){

}
//销毁前
beforeDestory(){

}
//销毁后
destoryed(){

}
```

#### **template**
v-if:若值为真展示该模块<br/>
v-for:展示多个组件<br/>
