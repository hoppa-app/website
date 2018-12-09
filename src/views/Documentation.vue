<template>
<div class="wrapper">
  <parallax class="section page-header header-filter" :style="headerStyle"></parallax>
  <div class="main main-raised">
    <div class="section">
      <div class="container">
        <div class="title">
          <h2>Documentation</h2>
          <h4>The <b>hoppa</b> functionalities are also accessable via our api. This documentation describes the endpoints for developers, to enabled them building new awesomeness.</h4>
        </div>
      </div>
      <div class="container" id="swagger-ui"></div>
    </div>
  </div>
</div>
</template>

<script>
import SwaggerUIBundle from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";

//Style
import "@/assets/scss/material-kit.scss";

export default {
  bodyClass: "documentation-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  mounted() {
    const loco = window.location;
    // Begin Swagger UI call region
    const ui = SwaggerUIBundle({
      url: "https://service.dev.tada.red/openapi.json",
      dom_id: "#swagger-ui",
      layout: "HoppaLayout",
      deepLinking: true,
      presets: [SwaggerUIBundle.presets.apis],
      oauth2RedirectUrl: loco.protocol + "//" + loco.host + "/swagger/oauth2"
    });

    ui.initOAuth({
      clientId: "0241abf4-45be-43a1-a2c1-34ec257dbaba",
      additionalQueryStringParams: {
        resource: "ac39737d-53a9-42d2-a71a-7a46e7978d46"
      }
    });
    // End Swagger UI call region

    window.ui = ui;
  }
};
</script>
