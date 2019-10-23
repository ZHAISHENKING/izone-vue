import Router from 'vue-router'
import Picture from '../containers/Picture'
import Video from '../containers/Video'
import Center from '../containers/Center'
import Setting from '../containers/Setting'
import Home from '../containers/HomePage'
import Login from '../components/Login'
import PicCategory from '../containers/picManage/PicCategory'

const routers = [
    {path: '/', name:'home', component: Home},
    {path: '/pic', component: Picture, name:'pic'},
    {path: '/video', name: 'video', component: Video},
    {path: '/center', name: 'center', component: Center},
    {path: '/setting', name: 'setting', component: Setting},
    {path: '/login', name: 'login', component: Login},
    {path: '/pic/cate/:id', component: PicCategory, name:'pic_cate'}
];

export const router = new Router({
    mode: 'history',
    routes: routers
});
