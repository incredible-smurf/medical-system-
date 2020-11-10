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


//模板管理工作站
const templateAside = r => require.ensure([], () => r(require('../page/template/aside')), 'templateAside')
const templatemain = r => require.ensure([], () => r(require('../page/template/newtemplate_main')), 'newtemplate_main')

//登录
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const countCreate=r => require.ensure([], () => r(require('../page/login/accountCreate')), 'accountCreate')
/*const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const orderDetail = r => require.ensure([], () => r(require('../page/order/children/orderDetail')), 'orderDetail')
const vipcard = r => require.ensure([], () => r(require('../page/vipcard/vipcard')), 'vipcard')
const invoiceRecord = r => require.ensure([], () => r(require('../page/vipcard/children/invoiceRecord')), 'invoiceRecord')
const useCart = r => require.ensure([], () => r(require('../page/vipcard/children/useCart')), 'useCart')
const vipDescription = r => require.ensure([], () => r(require('../page/vipcard/children/vipDescription')), 'vipDescription')
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark')
const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')
const userValidation = r => require.ensure([], () => r(require('../page/confirmOrder/children/userValidation')), 'userValidation')
const invoice = r => require.ensure([], () => r(require('../page/confirmOrder/children/invoice')), 'invoice')
const chooseAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/chooseAddress')), 'chooseAddress')
const addAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/addAddress')), 'addAddress')
const searchAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/children/searchAddress')), 'searchAddress')
const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')
const shopSafe = r => require.ensure([], () => r(require('../page/shop/children/children/shopSafe')), 'shopSafe')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const setusername = r => require.ensure([], () => r(require('../page/profile/children/children/setusername')), 'setusername')
const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')
const addDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/children/addDetail')), 'addDetail')
const balance = r => require.ensure([], () => r(require('../page/balance/balance')), 'balance')
const balanceDetail = r => require.ensure([], () => r(require('../page/balance/children/detail')), 'balanceDetail')
const benefit = r => require.ensure([], () => r(require('../page/benefit/benefit')), 'benefit')
const coupon = r => require.ensure([], () => r(require('../page/benefit/children/coupon')), 'coupon')
const hbDescription = r => require.ensure([], () => r(require('../page/benefit/children/hbDescription')), 'hbDescription')
const hbHistory = r => require.ensure([], () => r(require('../page/benefit/children/hbHistory')), 'hbHistory')
const exchange = r => require.ensure([], () => r(require('../page/benefit/children/exchange')), 'exchange')
const commend = r => require.ensure([], () => r(require('../page/benefit/children/commend')), 'commend')
const points = r => require.ensure([], () => r(require('../page/points/points')), 'points')
const pointsDetail = r => require.ensure([], () => r(require('../page/points/children/detail')), 'pointsDetail')
const service = r => require.ensure([], () => r(require('../page/service/service')), 'service')
const questionDetail = r => require.ensure([], () => r(require('../page/service/children/questionDetail')), 'questionDetail')
const find = r => require.ensure([], () => r(require('../page/find/find')), 'find')
const download = r => require.ensure([], () => r(require('../page/download/download')), 'download')*/




const routes=[ 
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/login'
        },
        //首页城市列表页
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
                }
                
            ]
            
        },
        {
            path:'/dati',
            component:dati
        },
        {
            path:'/template',
            component:templateAside,
            children:[{
                path:'templatemain',
                component:templatemain
            }]
        }
        
]
const router=new VueRouter({
	routes,
	mode: 'history',
})

/* router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
    } else {
      let token = localStorage.getItem('Authorization');
   
      if (token === 'null' || token === '') {
        next('/login');
      } else {
        next();
      }
    }
  }); */
export default  router

