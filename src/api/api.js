import axios from 'axios' // 引用axios
 
axios.defaults.baseURL = 'http://101.132.71.122:8080';
 
 
export const requestLogin = params => { return axios.post('/api/checkLogin', params).then(res => res.data) }
export const requestUserInfo = params => { return axios.post('/api/findAll', params).then(res => res.data) }
