import Router from 'vue-router'
import Picture from '../containers/Picture'
import Video from '../containers/Video'
import Center from '../containers/Center'
import Setting from '../containers/Setting'
import HomePage from '../containers/HomePage'
import Login from '../components/Login'
import PicCategory from '../containers/picManage/PicCategory'


const routers = [
    {path: '/', name:'home', component: HomePage, redirect: '/login',
        children:[
            {path: 'pic', component: Picture, name:'pic'},
            {path: 'video', name: 'video', component: Video},
            {path: 'center', name: 'center', component: Center},
            {path: 'setting', name: 'setting', component: Setting},
            {path: 'pic/cate/:id', component: PicCategory, name:'pic_cate'}
        ]
    },
    {path: '/login', name: 'login', component: Login},

];

export const router = new Router({
    mode: 'history',
    routes: routers
});
