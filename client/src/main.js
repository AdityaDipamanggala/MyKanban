import Vue from "vue"
import App from "./App.vue"
import GAuth from 'vue-google-oauth2';

const gauthOption = {
    clientId: '515418615198-ejmukl2tu3fn2fem6uuh7mmnkgguj84s.apps.googleusercontent.com',
  }
Vue.use(GAuth, gauthOption)
new Vue({
    render: h => h(App)
}).$mount("#app")

