import axios from 'axios'



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
/* instance.interceptors.request.use(
  config => {
      if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = `token ${store.state.token}`;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  }); */
console.log(instance.defaults)
export default instance;

