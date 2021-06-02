import Vue from 'vue'
import App from './App.vue'
//引入vuex
import Vuex from 'vuex'
//引入store
import store from './store/store.js'
//引入elementUI
import elementUi from 'element-ui'
//引入iviewUI
import iviewUi from 'view-design'
//引入国际化
import i18n from './lang/index.js'
//引入 css
import 'element-ui/lib/theme-chalk/index.css'
import 'view-design/dist/styles/iview.css'
//引入路由
import router from './router'
//注册全局 grid
import { Grid,GridItem } from './components/Grid/index.js'
import axios from 'axios'

//vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant);
Vue.prototype.$http = axios
Vue.use(elementUi)
Vue.use(iviewUi)
//使用vuex
Vue.use(Vuex)
Vue.use(Grid)
Vue.use(GridItem)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  i18n,
  store: new Vuex.Store(store),
  router
}).$mount('#app')
