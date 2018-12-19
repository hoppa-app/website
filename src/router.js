import Vue from "vue";
import Router from "vue-router";
import mainAuth from "./auth";

//DefaultLayout
import DefaultNavbar from "@/layouts/default/NavBar.vue";
import DefaultFooter from "@/layouts/default/Footer.vue";

//DashboardLayout
import DashboardLayout from "@/layouts/dashboard/Layout.vue";

//Documentation Support
import SwaggerOAuth2 from "@/assets/swagger/OAuth2.vue";

//Pages
import Blank from "@/views/Blank.vue";

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "nav-item active",
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/examples/"
    },
    {
      path: "/login",
      name: "login",
      component: Blank,
      meta: {
        layout: "redirect",
        location: "/",
        authName: mainAuth.authName
      }
    },
    {
      path: "/documentation",
      name: "documentation",
      meta: {
        layout: "default"
      },
      props: {
        header: { colorOnScroll: 10 }
      },
      components: {
        default: () =>
          import(/* webpackChunkName: "default" */ "./views/Documentation.vue"),
        header: DefaultNavbar,
        footer: DefaultFooter
      }
    },
    {
      path: "/initialize",
      name: "default",
      meta: {
        layout: "initialize",
        authName: mainAuth.authName
      },
      props: {
        header: { colorOnScroll: 10 }
      },
      components: {
        default: () =>
          import(/* webpackChunkName: "default" */ "./views/Initialize.vue"),
        header: DefaultNavbar,
        footer: DefaultFooter
      }
    },
    {
      path: "/swagger/oauth2",
      name: "swagger-oauth2",
      meta: {
        layout: "default"
      },
      props: {
        header: { colorOnScroll: 10 }
      },
      components: {
        default: SwaggerOAuth2,
        header: DefaultNavbar,
        footer: DefaultFooter
      }
    },
    {
      path: "/examples/",
      name: "example-components",
      meta: {
        layout: "default"
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      },
      components: {
        default: () =>
          import(/* webpackChunkName: "default" */ "./views/examples/Components.vue"),
        header: DefaultNavbar,
        footer: DefaultFooter
      }
    },
    {
      path: "/examples/landing",
      name: "example-landing",
      meta: {
        layout: "default"
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      },
      components: {
        default: () =>
          import(/* webpackChunkName: "default" */ "./views/examples/Landing.vue"),
        header: DefaultNavbar,
        footer: DefaultFooter
      }
    },
    {
      path: "/examples/profile",
      name: "example-profile",
      meta: {
        layout: "default"
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      },
      components: {
        default: () =>
          import(/* webpackChunkName: "default" */ "./views/examples/Profile.vue"),
        header: DefaultNavbar,
        footer: DefaultFooter
      }
    },
    {
      path: "/examples/login",
      name: "example-login",
      meta: {
        layout: "default"
      },
      props: {
        header: { colorOnScroll: 400 }
      },
      components: {
        default: () =>
          import(/* webpackChunkName: "default" */ "./views/examples/Login.vue"),
        header: DefaultNavbar,
        footer: DefaultFooter
      }
    },
    {
      path: "/examples/dashboard",
      component: DashboardLayout,
      children: [
        {
          path: "/",
          name: "Dashboard",
          meta: {
            layout: "dashboard"
          },
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/examples/Dashboard.vue")
        },
        {
          path: "user",
          name: "User Profile",
          meta: {
            layout: "dashboard"
          },
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/examples/UserProfile.vue")
        },
        {
          path: "table",
          name: "Table List",
          meta: {
            layout: "dashboard"
          },
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/examples/TableList.vue")
        },
        {
          path: "typography",
          name: "Typography",
          meta: {
            layout: "dashboard"
          },
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/examples/Typography.vue")
        },
        {
          path: "icons",
          name: "Icons",
          meta: {
            layout: "dashboard"
          },
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/examples/Icons.vue")
        },
        {
          path: "maps",
          name: "Maps",
          meta: {
            layout: "dashboard",
            hideFooter: true
          },
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/examples/Maps.vue")
        },
        {
          path: "notifications",
          name: "Notifications",
          meta: {
            layout: "dashboard"
          },
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/examples/Notifications.vue")
        },
        {
          path: "upgrade",
          name: "Upgrade to PRO",
          meta: {
            layout: "dashboard"
          },
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/examples/UpgradeToPRO.vue")
        }
      ]
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

mainAuth.useRouter(router);

export default router;
