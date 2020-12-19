import axios from 'axios'
import qs from 'qs'

const instance=axios.create({
  baseURL:'http://127.0.0.1:8000/', //这是基础url
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},//解决无法跨域请求的问题 
  transformRequest: [function (data) {
    //data 格式化
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
});
instance.all=axios.all
instance.spread=axios.spread
/* instance.interceptors.request.use(function (config) {
  if(config.method!='get'){
      config.data=qs.stringify(config.data);
      console.log(config.data,'???')
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return config;
},function (error) {
  return Promise.reject(error)
}) */

console.log(instance.defaults)
export default instance;

