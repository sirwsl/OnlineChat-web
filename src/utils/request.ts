/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import {extend} from 'umi-request';
import {message} from 'antd';
import {getDvaApp} from "@@/plugin-dva/exports";
/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // Does the default request bring cookies
});

// @ts-ignore
request.interceptors.response.use(async (response, options) => {
  let result;
  const data = await response.clone().json();

  if (data.status!==200){
    if (data.status ===500){
      message.error("服务器内部错误，请反馈给wx:sirwsl")
    }else{
      if(data.message){message.error(data.message,5);}
    }

    if (data.status ===401){
      getDvaApp()._store.dispatch({
        type: 'login/logout',
      });
    }

  }

  if (data.code !== 0) {
    if (data.userMsg) {
      message.error(data.userMsg);
    } else if (data.data) {
      message.error(data.data);
    }
  } else {
    result = response;
  }
  return result;
})

request.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    'Access-Control-Allow-Origin': '*',
    'Authorization': `${localStorage.getItem('token')}`,
    'Accept': 'application/json',
    'x-auth-token': `${localStorage.getItem('token')}`,
  }
  return (
    {
      options: {
        ...options,
        interceptors: true,
      },
    }
  );
});


// response拦截器, 处理response
request.interceptors.response.use((response, options) => {
  let token = response.headers.get("Authorization");
  if (token) {
    localStorage.setItem("token", token);
  }
  return response;
});
export default request;
