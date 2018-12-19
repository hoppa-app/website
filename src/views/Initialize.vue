<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-60 md-small-size-66 md-xsmall-size-100 md-medium-size-60 mx-auto">  
            <md-card>
              <md-tabs id="wizard" class="md-primary" md-alignment="left" :md-active-tab="currenttab" @md-changed="tabChanged">
                <md-tab id="tab-profile" md-label="Profile">
                  <div class="container">
                    <div class="md-layout">
                      <div class="md-layout-item md-size-100" style="text-align: left;">
                        <h3>Hi, there!</h3>
                        <p>We see that you are a new user! To complete your sign-in, we would like to have your profile details confirmed.</p>
                      </div>
                    </div>
                  </div>
                  <form>
                    <div class="container">
                      <div class="md-layout">
                        <div class="md-layout-item md-small-size-50 md-size-50">
                          <md-field>
                            <label>First Name</label>
                            <md-input v-model="firstname" type="text"></md-input>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                          <md-field>
                            <label>Last Name</label>
                            <md-input v-model="lastname" type="text"></md-input>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-70">
                          <md-field>
                            <label>Email Address</label>
                            <md-input v-model="emailadress" type="email"></md-input>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-size-100 text-right">
                          <md-button class="md-raised md-success" @click="submitProfile();wizardCompleted();">Update Profile</md-button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <br/>
                </md-tab>
                <md-tab id="tab-connections" md-label="Connections" md-disabled>
                  <div class="container">
                    <div class="md-layout">
                      <div class="md-layout-item md-size-100" style="text-align: left;">
                        <h3>Would you like to connect?</h3>
                        <p>Since you are new to <strong>hoppa</strong>, you will need to setup connections with your services.</p>
                        <p>At this moment, you can connect with the following services:</p>
                        <div class="md-list">
                          <div class="md-list-item">
                            <md-button class="md-raised md-default">bunq</md-button>
                          </div>
                          <div class="md-list-item">
                            <md-button class="md-raised md-default">splitwise</md-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="md-layout-item md-size-100 text-right">
                    <md-button class="md-raised md-success" @click="activateTab(nexttab);">Update Profile</md-button>
                  </div>
                </md-tab>
              </md-tabs>
            </md-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var axios = require("axios");
//Style
import "@/assets/scss/material-kit.scss";
export default {
  props: {
    currenttab: {
      type: String,
      default: "tab-profile"
    },
    nexttab: {
      type: String,
      default: "tab-connections"
    },
    previoustab: {
      type: String,
      default: null
    },
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  data() {
    return {
      emailadress: this.$oidc.user.profile.upn || this.$oidc.user.profile.email,
      lastname: this.$oidc.user.profile.family_name,
      firstname: this.$oidc.user.profile.given_name
    };
  },
  mounted() {},
  methods: {
    tabChanged: function(id) {
      switch (id) {
        case "tab-profile":
          this.nexttab = "tab-connections";
          this.previoustab = null;
          break;
        case "tab-connections":
          this.nexttab = "tab-overview";
          this.previoustab = "tab-profile";
          break;
        case "tab-overview":
          this.nexttab = null;
          this.previoustab = "tab-connections";
          break;
      }
      this.currenttab = id;
      console.log(id);
    },
    activateTab: function(id) {
      switch (id) {
        case "tab-profile":
          this.nexttab = "tab-connections";
          this.previoustab = null;
          break;
        case "tab-connections":
          this.nexttab = "tab-overview";
          this.previoustab = "tab-profile";
          break;
        case "tab-overview":
          this.nexttab = null;
          this.previoustab = "tab-connections";
          break;
      }
      console.log(id);
      this.currenttab = id;
    },
    submitProfile: function() {
      var config = {
        headers: { Authorization: "Bearer " + this.$oidc.accessToken }
      };
      console.log("Hallo");
      axios.post(
        "http://localhost:5000/api/v1.0/people",
        {
          "@odata.type": "hoppa.Service.Model.Person",
          DisplayName: this.firstname + " " + this.lastname,
          EmailAddress: this.emailadress
        },
        config
      );
    },
    wizardCompleted: function() {
      window.location = "/";
    }
  }
};
</script>
