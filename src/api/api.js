import axios from 'axios' // 引用axios
 
axios.defaults.baseURL = 'http://###:8080';
 
export const requestLogin = params => { return axios.post('/api/checkLogin', params).then(res => res.data) }
export const requestUserInfo = params => { return axios.post('/api/findAll', params).then(res => res.data) }
export const requestUserFind = params => { return axios.post('/api/findoneS', params).then(res => res.data) }
export const requestUserDel = params => { return axios.post('/api/deleteone', params).then(res => res.data) }
export const requestUinfoDet = params => { return axios.post('/api/findoneE', params).then(res => res.data) }