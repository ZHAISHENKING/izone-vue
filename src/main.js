import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css';
import Router from 'vue-router'
import {router} from './router/index'


// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// };

Vue.use(ViewUI);
Vue.use(Router);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
