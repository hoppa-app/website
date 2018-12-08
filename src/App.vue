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
