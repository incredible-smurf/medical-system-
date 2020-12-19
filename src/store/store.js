import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({////暴露Store对象
    state: {
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        //存储当前登录的用户信息
        userprofile:localStorage.getItem('userprofile') ? localStorage.getItem('userprofile') : ''
        
      },
     
      mutations: {
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
          state.Authorization = user.Authorization;
          localStorage.setItem('Authorization', user.Authorization);
        },
        changeUser(state,user){

          state.userprofile={}
          state.userprofile.name=user.name
          state.userprofile.office=user.office
          state.userprofile.phoneNumber=user.phoneNumber
          state.userprofile.sex=user.sex
          state.userprofile.title=user.title
          localStorage.setItem('userprofile',state.userprofile)
          
        }
      }
})