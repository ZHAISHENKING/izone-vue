import Vue from 'vue'
import {store} from './store'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css';
import Router from 'vue-router'
import {router} from './router/index'


Vue.use(ViewUI);
Vue.use(Router);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
