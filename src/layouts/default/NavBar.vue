<template>
  <md-toolbar id="toolbar" md-elevation="0" class="md-transparent md-absolute" :class="extraNavClasses" :color-on-scroll="colorOnScroll">
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <img class="md-title" id="logo" src="/img/logo_white.png" />
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{toggled: toggledClass}" @click="toggleNavbarMobile()">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>

              <md-list-item href="/documentation" v-if="showDownload">
                <i class="material-icons">content_paste</i>
                <p>Documentation</p>
              </md-list-item>
              <!--
              <md-list-item href="javascript:void(0)" @click="scrollToElement()" v-if="showDownload">
                <i class="material-icons">cloud_download</i>
                <p>Download</p>
              </md-list-item>
              -->
              <li class="md-list-item" v-if="$oidc.isAuthenticated">
                <a href="javascript:void(0)" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button slot="title" class="md-button md-button-link md-white md-simple dropdown-toggle" data-toggle="dropdown">
                        <i class="far fa-user"></i>
                        <p>{{user.displayname}}</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="/dashboard">
                            <i class="fas fa-columns"></i>
                            <p>Dashboard</p>
                          </a>
                        </li>
                        <li>
                          <a>
                            <i class="fas fa-sign-out-alt"></i>
                            <p id="logout" @click="$oidc.signOut();">Logout</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>

              <li v-if="!$oidc.isAuthenticated" class="md-list-item">
                <a class="md-list-item-link md-list-item-container md-button-clean">
                  <div class="md-list-item-content md-ripple">
                    <i class="fas fa-sign-in-alt"></i>
                    <p id="login" @click="$oidc.signIn();" >Login</p>
                  </div>
                </a>
              </li>

              <li class="md-list-item" v-if="!showExample">
                <a href="javascript:void(0)" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button slot="title" class="md-button md-button-link md-white md-simple dropdown-toggle" data-toggle="dropdown">
                        <i class="material-icons">apps</i>
                        <p>Examples</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="/examples/">
                            <i class="material-icons">layers</i>
                            <p>Default : All Components</p>
                          </a>
                        </li>
                        <li>
                          <a href="/examples/landing">
                            <i class="material-icons">layers</i>
                            <p>Default : Landing</p>
                          </a>
                        </li>
                        <li>
                          <a href="/examples/login">
                            <i class="material-icons">layers</i>
                            <p>Default : Login</p>
                          </a>
                        </li>
                        <li>
                          <a href="/examples/profile">
                            <i class="material-icons">layers</i>
                            <p>Default : Profile</p>
                          </a>
                        </li>
                        <li>
                          <a href="/examples/dashboard">
                            <i class="material-icons">layers</i>
                            <p>Dashboard : Overview</p>
                          </a>
                        </li>
                        <li>
                          <a href="/examples/dashboard/user">
                            <i class="material-icons">layers</i>
                            <p>Dashboard : User Profile</p>
                          </a>
                        </li>
                        <li>
                          <a href="/examples/dashboard/table">
                            <i class="material-icons">layers</i>
                            <p>Dashboard : Table List</p>
                          </a>
                        </li>
                        <li>
                          <a href="/examples/dashboard/typography">
                            <i class="material-icons">layers</i>
                            <p>Dashboard : Typography</p>
                          </a>
                        </li>
                        <li>
                          <a href="/examples/dashboard/icons">
                            <i class="material-icons">layers</i>
                            <p>Dashboard : Icons</p>
                          </a>
                        </li>
                        <li>
                          <a href="/examples/dashboard/maps">
                            <i class="material-icons">layers</i>
                            <p>Dashboard : Maps</p>
                          </a>
                        </li>
                        <li>
                          <a href="/examples/dashboard/notifications">
                            <i class="material-icons">layers</i>
                            <p>Dashboard : Notifications</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>

              <md-list-item href="https://twitter.com/CreativeTim" target="_blank">
                <i class="fab fa-twitter"></i>
                <p class="hidden-lg">Twitter</p>
                <md-tooltip md-direction="bottom">Follow us on Twitter</md-tooltip>
              </md-list-item>
              <md-list-item href="https://www.facebook.com/CreativeTim" target="_blank">
                <i class="fab fa-facebook-square"></i>
                <p class="hidden-lg">Facebook</p>
                <md-tooltip md-direction="bottom">Like us on Facebook</md-tooltip>
              </md-list-item>
              <md-list-item href="https://www.instagram.com/CreativeTimOfficial" target="_blank">
                <i class="fab fa-instagram"></i>
                <p class="hidden-lg">Instagram</p>
                <md-tooltip md-direction="bottom">Follow us on Instagram</md-tooltip>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
var axios = require("axios");
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layouts/default/MobileMenu";
export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    },
    showExample: null
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
      user: {
        displayname: null
      }
    };
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile"];
      return excludedRoutes.every(r => r !== this.$route.name);
    }
  },
  methods: {
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      let navbarLogo = document.getElementById("logo");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
        navbarLogo.src = "/img/logo_black.png";
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
          navbarLogo.src = "/img/logo_white.png";
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    }
  },
  created() {
    var config = {
      headers: { Authorization: "Bearer " + this.$oidc.accessToken }
    };
    axios
      .get("http://localhost:5000/api/v1.0/person", config)
      .then(response => {
        this.user.displayname = response.data.DisplayName;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>
