import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || "/api",
  timeout: 50000,
});

// 请求拦截
instance.interceptors.request.use((config) => {
  let Token;
  if (sessionStorage.getItem('Token')) {
    Token = sessionStorage.getItem('Token');
    let headers = config.headers;
    headers.Token = Token;
  }
  return config;
});

// 响应拦截
instance.interceptors.response.use((config) => {
  return config.data;
});

// 返回的是一个 axios 即是一个 promise
function request(options) {
  options.method = options.method || "get";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }
  return instance(options); 
}
export default request;
