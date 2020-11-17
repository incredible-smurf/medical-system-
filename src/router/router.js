import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')

const dati = r => require.ensure([], () => r(require('../page/dati/dati')), 'dati')


//const register = r => require.ensure([], () => r(require('../page/register/register')), 'register')
//登记工作站
const registerAside = r => require.ensure([], () => r(require('../page/register/aside')), 'registerAside')
const newregister = r => require.ensure([], () => r(require('../page/register/newregister')), 'newregister')
const registerquery = r => require.ensure([], () => r(require('../page/register/query')), 'query')
const newregisterCreate= r => require.ensure([], () => r(require('../page/register/newregisterCreate')), 'newregisterCreate')
const showPatientDetail=r => require.ensure([], () => r(require('../page/register/showPatientDetail')), 'showPatientDetail')

//模板管理工作站
const templateAside = r => require.ensure([], () => r(require('../page/template/aside')), 'templateAside')
const templatemain = r => require.ensure([], () => r(require('../page/template/newtemplate_main')), 'newtemplate_main')
const templatequery =r => require.ensure([], () => r(require('../page/template/templatequery')), 'templatequery')
const showtemplatedetail=r => require.ensure([], () => r(require('../page/template/showtemplatedetail')), 'showtemplatedetail')
//登录和用户管理
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const countCreate=r => require.ensure([], () => r(require('../page/login/accountCreate')), 'accountCreate')
const usermain=r => require.ensure([], () => r(require('../page/userProfile/main')), 'Profile')
const userprofile=r => require.ensure([], () => r(require('../page/userProfile/userProfile')), 'userProfile')
const changepassword = r => require.ensure([], () => r(require('../page/userProfile/changepasswd')), 'changepasswd')
//大体
const createdati=r => require.ensure([], () => r(require('../page/dati/create')), 'createdati')



const routes=[ 
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
            path:'/createaccount',
            name:'accountCreate',
            component:countCreate
        },
        //登记工作站
        {
            path: '/register',
            component: registerAside,
            children:[
                {
                    path:'newregister',
                    component:newregister,
                    children:[
                        {
                            path:'create',
                            component:newregisterCreate
                        }
                    ]
                },
                {
                    path:'query',
                    component:registerquery
                },
                {
                    path:'showpatientdetail',
                    component:showPatientDetail
                }
                
            ]
            
        },
        {
            path:'/dati',
            component:dati,
            children:[{
                path:'create',
                component:createdati
            }]
        },
        {
            path:'/template',
            component:templateAside,
            children:[{
                path:'templatemain',
                component:templatemain
            },
        {
            path:'templatequery',
            component:templatequery
        },
    {
        path:"showtemplatedetail",
        component:showtemplatedetail
    }]
        },
        {
            path:'/userpro',
            component:usermain,
            children:[
                {
                    path:'userprofile',
                    component:userprofile
                },
                {
                    path:'changepassword',
                    component:changepassword
                }
            ]
        }
        
]
const router=new VueRouter({
	routes,
	mode: 'history',
})


//登录控制
import storeitem from "../store/store"
router.beforeEach((to, from, next) => {
    if (to.path === '/login'||to.path==='/createaccount') {
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

export default  router

