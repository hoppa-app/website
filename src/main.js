import Vue from "vue";
import App from "./App.vue";
import mainAuth from "./auth";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Chartist from "chartist";

import MaterialUI from "./plugins/material-ui";
Vue.use(MaterialUI);

Vue.config.productionTip = false;

import Default from "./layouts/Default.vue";
import Dashboard from "./layouts/Dashboard.vue";
import Redirect from "./layouts/Redirect.vue";
import Wizzard from "./layouts/Wizzard.vue";

Vue.component("default-layout", Default);
Vue.component("dashboard-layout", Dashboard);
Vue.component("redirect-layout", Redirect);
Vue.component("wizzard-layout", Wizzard);

// Navbar Fix
const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

// Charlist
Vue.prototype.$Chartist = Chartist;

mainAuth.startup().then(ok => {
  if (ok) {
    new Vue({
      router,
      store,
      data: {
        Chartist: Chartist
      },
      render: h => h(App)
    }).$mount("#app");
  }
});
