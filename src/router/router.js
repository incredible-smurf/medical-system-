import Vue from 'vue'
import VueRouter from 'vue-router'

//路由管理和组件抽取
//该部分需要随着新界面增加不断修改
Vue.use(VueRouter)

//home界面组件
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')


//const register = r => require.ensure([], () => r(require('../page/register/register')), 'register')
//登记工作站
const registerAside = r => require.ensure([], () => r(require('../page/register/aside')), 'registerAside')
const newregister = r => require.ensure([], () => r(require('../page/register/newregister')), 'newregister')
const registerquery = r => require.ensure([], () => r(require('../page/register/query')), 'query')
const newregisterCreate = r => require.ensure([], () => r(require('../page/register/newregisterCreate')), 'newregisterCreate')
const showPatientDetail = r => require.ensure([], () => r(require('../page/register/showPatientDetail')), 'showPatientDetail')
const showAllReports = r => require.ensure([], () => r(require('../page/register/showAllReports')), 'showAllReports')

//模板管理工作站
const templateAside = r => require.ensure([], () => r(require('../page/template/aside')), 'templateAside')
const templatemain = r => require.ensure([], () => r(require('../page/template/newtemplate_main')), 'newtemplate_main')
const templatequery = r => require.ensure([], () => r(require('../page/template/templatequery')), 'templatequery')
const showtemplatedetail = r => require.ensure([], () => r(require('../page/template/showtemplatedetail')), 'showtemplatedetail')


//登录和用户管理
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const countCreate = r => require.ensure([], () => r(require('../page/login/accountCreate')), 'accountCreate')
const usermain = r => require.ensure([], () => r(require('../page/userProfile/main')), 'Profile')
const userprofile = r => require.ensure([], () => r(require('../page/userProfile/userProfile')), 'userProfile')
const changepassword = r => require.ensure([], () => r(require('../page/userProfile/changepasswd')), 'changepasswd')


//大体
const createdati = r => require.ensure([], () => r(require('../page/dati/create')), 'createdati')
const datiquery = r => require.ensure([], () => r(require('../page/dati/query')), 'query')
const showDatiDetail = r => require.ensure([], () => r(require('../page/dati/showDatiDetail')), 'showDatiDetail')
const confirmSampling = r => require.ensure([], () => r(require('../page/dati/confirmSampling')), 'confirmSampling')
//大体工作站侧边栏
const dati = r => require.ensure([], () => r(require('../page/dati/dati')), 'dati')


//初诊工作站
const firstDiagnosisAside = r => require.ensure([], () => r(require('../page/firstDiagnosis/aside')), 'firstDiagnosisAside')
const firstDiagnosisCreate = r => require.ensure([], () => r(require('../page/firstDiagnosis/create')), 'firstDiagnosisCreate')
const firstDiagnosisQuery = r => require.ensure([], () => r(require('../page/firstDiagnosis/query')), 'firstDiagnosisCreate')
const firstDiagnosisDetail = r => require.ensure([], () => r(require('../page/firstDiagnosis/showFirstDiagnosisDetail')), 'showFirstDiagnosisDetail')


//主诊工作站
const mainDiagnosisAside = r => require.ensure([], () => r(require('../page/mainDiagnosis/aside')), 'mainDiagnosisAside')
const mainDiagnosisCreate = r => require.ensure([], () => r(require('../page/mainDiagnosis/create')), 'mainDiagnosisCreate')
const mainDiagnosisQuery = r => require.ensure([], () => r(require('../page/mainDiagnosis/query')), 'mainDiagnosisQuery')
const mainDiagnosisDetail = r => require.ensure([], () => r(require('../page/mainDiagnosis/showDetail')), 'mainDiagnosisDetail')

const routes = [
    //地址为空时跳转home页面
    {
        path: '',
        redirect: '/login'
    },
    //首页
    {
        path: '/home',
        component: home
    },
    //登录
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    //注册
    {
        path: '/createaccount',
        name: 'accountCreate',
        component: countCreate
    },
    //登记工作站
    {
        path: '/register',
        component: registerAside,
        children: [
            {
                //新建
                path: 'newregister',
                component: newregister,
                children: [
                    {
                        path: 'create',
                        component: newregisterCreate
                    }
                ]
            },
            {
                //查询
                path: 'query',
                component: registerquery
            },
            {
                //详情
                path: 'showpatientdetail',
                component: showPatientDetail,
                children: [

                ]
            },
            {
                path: "show-all-reports",
                component: showAllReports
            }

        ]

    },
    {
        //大体工作站
        path: '/dati',
        component: dati,
        children: [{
            //创建
            path: 'create',
            component: createdati
        },
        {
            //查询
            path: 'query', component: datiquery
        },
        {
            path: 'showdatidetail', component: showDatiDetail
        },
        {
            path: 'confirmsampling', component: confirmSampling
        }
        ]
    },
    {
        //模板管理工作站
        path: '/template',
        component: templateAside,
        children: [{
            //创建
            path: 'templatemain',
            component: templatemain
        },
        {
            //查询
            path: 'templatequery',
            component: templatequery
        },
        {
            //详情页
            path: "showtemplatedetail",
            component: showtemplatedetail
        }]
    },
    {
        //用户界面
        path: '/userpro',
        component: usermain,

        children: [
            {
                //用户信息
                path: 'userprofile',
                component: userprofile
            },
            {
                //更改密码
                path: 'changepassword',
                component: changepassword
            }
        ]
    },
    {
        //初诊工作站
        path: '/first-diagnosis',
        component: firstDiagnosisAside,
        children: [
            {
                path: 'create',
                component: firstDiagnosisCreate
            },
            {
                path: 'query',
                component: firstDiagnosisQuery
            },
            {
                path: 'show-first-diagnosis-detail',
                component: firstDiagnosisDetail
            }
        ]
    },
    {
        //主诊工作站
        path: '/main-diagnosis',
        component: mainDiagnosisAside,
        children: [
            {
                path: 'create',
                component: mainDiagnosisCreate
            },
            {
                path: 'query',
                component: mainDiagnosisQuery
            },
            {
                path: 'show-main-diagnosis-detail',
                component: mainDiagnosisDetail
            }
        ]
    }

]


const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
const router = new VueRouter({
    routes,
    mode: 'hash',//浏览器可以记录历史记录
})


//登录控制
/* 如果没有登录token则自动跳转到login界面 
这是一个全局的钩子函数 */
import storeitem from "../store/store"
router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/createaccount') {
        next();
    } else {
        let token = storeitem.state.Authorization;
        if (token === 'null' || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});

export default router

