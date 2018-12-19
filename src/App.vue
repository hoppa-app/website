<template>
    <component :is="layout">
      <router-view />
    </component>
</template>

<script>
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  created() {
    if (this.$oidc.user != null) {
      console.log("User is authenticated.");
      console.log(this.$oidc.user.profile);
      if(window.location.pathname != "/initialize")
      {
        var config = {
          headers: { Authorization: "Bearer " + this.$oidc.accessToken }
        };
        this.axios
        .get("/person", config)
        .then(response => {
          if(response.data.Guid == "00000000-0000-0000-0000-000000000000")
          {
            window.location = "/initialize";
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
      }
      } else {
        console.log("User is not authenticated.");
      }
  },
  computed: {
    layout() {
      if (
        this.$route.matched[0] &&
        this.$route.matched[0].components.default.layout
      ) {
        return this.$route.matched[0].components.default.layout + "-layout";
      }
      return (this.$route.meta.layout || "default") + "-layout";
    }
  }
};
</script>
