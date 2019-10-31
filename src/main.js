import Vue from 'vue'
import {store} from './store/index'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css';
import 'viewerjs/dist/viewer.css'
import Router from 'vue-router'
import {router} from './router'
import MyUpload from 'vue-image-crop-upload';
import VueViewer from 'v-viewer'
import {auth} from './api'
import store2 from 'store2'


VueViewer.setDefaults({
    toolbar: {
        zoomIn: 1,
        zoomOut: 1,
        oneToOne: 0,
        reset: 4,
        prev: {size: 'large'},
        play: {
            show: true,
            size: 'large',
        },
        next: {size: 'large'},
        rotateLeft: 4,      // 左右翻转
        rotateRight: 4,
        flipHorizontal: 4,  // 上下翻转
        flipVertical: 4,
    },
    zoomOnWheel: false, // 支持鼠标缩放
})

Vue.use(ViewUI);
Vue.use(Router);
Vue.use(VueViewer);
Vue.use(MyUpload, {
    en: {
        hint: 'Click or drag the file here to upload',
        loading: '上传中…',
        noSupported: 'Browser is not supported, please use IE10+ or other browsers',
        success: '',
        fail: 'Upload failed',
        preview: 'Preview',
        btn: {
            off: 'Cancel',
            close: 'Close',
            back: 'Back',
            save: 'Save'
        },
        error: {
            onlyImg: 'Image only',
            outOfSize: 'Image exceeds size limit: ',
            lowestPx: 'Image\'s size is too low. Expected at least: '
        }
    }
});
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
        return
    }
    let token = store2.get('jwt');
    auth(
        {token:token},
        () => next(),
        () => {
            next('/login')
        }
    )
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
