const Home = () => import ('@/views/home/Index')
const Detail = () => import ('@/views/home/CardInfo')
const Message = () => import ('@/views/home/Message')
const Recharge = () => import ('@/views/home/Recharge')
// const Cycle = () => import('@/views/renew/Index')
const Login = () => import('@/views/home/Login')
const Loading = () => import('@/views/home/Loading')

export default [
    // {  path: '/',  name:'Loading',       component: Loading},
    {  path: '/home',  name:'Home',       component: Home},
    {  path: '/detail',name:'Detail',component: Detail},
    {  path: '/message',name:'Message',component: Message},
    {  path: '/recharge', component: Recharge},
    // {  path: '/cycle',    component: Cycle},
    {  path: '/login',  name:'Login',  component: Login}
]
