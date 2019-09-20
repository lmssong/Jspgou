import axios from 'axios'
import qs from 'qs'
import store from '../store/index'
import router from '../router/index'
import {getRand} from '@/untils/random'
import {signParams} from '@/untils/sign'
import {Message} from 'element-ui'
const fetch = axios.create({
  baseURL: process.env.Base_URL,
  timeout: 30000
});
fetch.interceptors.request.use(config => { //拦截器配置,统一配置参数处理，页面上只需传递业务参数
  let sessionKeyValidate = false; //接口是否需要jsessionkey参数
  let signValidate = false; //接口是否需要签名
  let nonceStr=false;
  let appId = store.state.sys.appId; //appid
  let sessionKey = localStorage.getItem('sessionKey'); //sessionkey
  let appKey = store.state.sys.appKey; //appkey
  let params = {};
  debugger;
  if (config.hasOwnProperty('sessionKeyValidate')) {
    sessionKeyValidate = config.sessionKeyValidate;
  } else {
    sessionKeyValidate = true;
  }
  if (config.hasOwnProperty('signValidate')) {
    signValidate = config.signValidate;
  } else {
    signValidate = false;
  }
  if (config.hasOwnProperty('nonceStr')) {
    nonceStr = config.nonceStr;
  } else {
    nonceStr = false;
  }


  for (let key in config.data) {
    params[key] = config.data[key]; //添加进参数列表
  }
  params.appId = appId;
  if (sessionKeyValidate) {
    params.sessionKey = sessionKey;
  }
  if(nonceStr){
    params.nonceStr=getRand();
  }

  if (signValidate) {
    params = signParams(params, appKey);
  }
  config.data = qs.stringify(params);
  return config;
}, error => {
  //console.log(error); // for debug
  Promise.reject(error);
});

function showMessage(value) {
  return Message({
    showClose: true,
    message: value,
    type: 'error',
    duration:4500
  });
}
fetch.interceptors.response.use(response => {
  let res = response.data;
   console.log(res);
  switch (res.code) {
    case 100:
      showMessage('系统异常')
      break;
      case 200:
      break;
      case 201:
      showMessage('缺少参数')
      break;
      case 202:
      showMessage('参数错误')
      break;
      case 203:
      showMessage('APPID错误或禁用')
      break;
      case 204:
      showMessage('签名错误')
      break;
      case 205:
      showMessage(res.fail)
      break;
      case 206:
      showMessage('不存该对象')
      break;
      case 207:
      showMessage('暂未使用值')
      break;
      case 208:
      showMessage('重复请求API')
      break;
      case 209:
      showMessage('用户无权限')
      break;
      case 300:
      showMessage('会话超时')
      localStorage.clear();
      router.push('/login');
      break;
      case 301:
        showMessage('邮箱已经被使用'); 
        break;
      case 302:
      showMessage('用户未登录');
      localStorage.clear();
      router.push('/login');
      break;
      case 304:
      showMessage('用户已存在');
      break;
      case 400:
      showMessage('上传错误')
      break;
      case 401:
      showMessage('上传类型文件暂不支持')
      break;
      case 402:
      showMessage('文件名含非法字符，如 \ /等等')
      break;
      case 403:
      showMessage('图片文件后缀不支持')
      break;
      default:
      console.log(res);
        break;
  }
  return response.data;
},
  error => {
    console.log(error.request.statusText);
    Message({
      showClose: true,
      message: error.request.statusText,
      type: 'error'
    });
    return Promise.reject(error)
  }
);

export default fetch;
