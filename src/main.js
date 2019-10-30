import Vue from 'vue'
import {store} from './store'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css';
import 'viewerjs/dist/viewer.css'
import Router from 'vue-router'
import {router} from './router/index'
import VueViewer from 'v-viewer'

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
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
