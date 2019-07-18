// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FileUpload from 'vue-upload-component'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.use(FileUpload)
Vue.use(ElementUI)

// 定义一个全局过滤器实现日期格式化
Vue.filter('converDate', function (value) {
  return moment(value).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App, FileUpload},
  template: '<App/>'
})
