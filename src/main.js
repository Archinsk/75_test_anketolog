import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import "./test-anketolog.scss";
import "bootstrap";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
