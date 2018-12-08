import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import globalDirectives from "./globalDirectives";
import globalComponents from "./globalComponents";

//Extra for Kit
import globalMixins from "./globalMixins";
import VueLazyload from "vue-lazyload";
import VueCarousel from "vue-carousel";

// Extra for Dashboard
import Notifications from "@/layouts/dashboard/components/NotificationPlugin";
import SideBar from "@/layouts/dashboard/components/SidebarPlugin";
import "es6-promise/auto";

export default {
  install(Vue) {
    Vue.use(VueMaterial);
    Vue.use(globalDirectives);
    Vue.use(globalMixins);
    Vue.use(globalComponents);
    Vue.use(Notifications);
    Vue.use(SideBar);
    Vue.use(VueCarousel);
    Vue.use(VueLazyload, {
      observer: true,
      // optional
      observerOptions: {
        rootMargin: "0px",
        threshold: 0.1
      }
    });
  }
};
