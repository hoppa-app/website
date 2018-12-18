<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-40 md-small-size-66 md-xsmall-size-100 md-medium-size-50 mx-auto">  
            <md-card>
              <md-tabs id="wizard" class="md-primary" md-alignment="left" :md-active-tab="currenttab" @md-changed="tabChanged">
                <md-tab id="tab-profile" md-label="Profile">
                  Profile
                </md-tab>
                <md-tab id="tab-connections" md-label="Connections">
                  Connections
                </md-tab>
                <md-tab id="tab-overview" md-label="Overview">
                  Overview
                </md-tab>
                
              </md-tabs>
              <md-button v-if="currenttab != 'tab-profile'" @click="activateTab(previoustab);">Previous</md-button>
              <md-button v-if="currenttab != 'tab-overview'" @click="activateTab(nexttab);">Next</md-button>
              <md-button v-else @click="submit();">Confirm</md-button>
            </md-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  methods: {
      tabChanged: function(id) {
        switch(id)
        {
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
        switch(id)
        {
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
      }
  }
}
</script>
