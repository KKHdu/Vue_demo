import Login from './components/LoginInfo'
import List from './components/TodoList_element'
import UserInfo from './components/UserInfo'

const routers = [
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: UserInfo
  }
]
export default routers
