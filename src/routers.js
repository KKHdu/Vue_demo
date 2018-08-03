import Login from './components/LoginInfo'
import List from './components/TodoList_element'
import UserInfo from './components/UserInfo'
import Uinformation from './components/Uinformation'

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
  },
  {
    path: '/Uinformation',
    name: '/Uinformation',
    component: Uinformation
  }
]
export default routers
