import axios from 'axios'
import qs from 'qs'





const instance=axios.create({
  baseURL:'http://127.0.0.1:8000/', //这是基础url
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
});
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

