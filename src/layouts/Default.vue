<template>
  <div id="material-kit">
    <div :class="{'nav-open': NavbarStore.showNavbar}">
    <router-view name="header"/>
      <div>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
      <router-view name="footer"/>
    </div>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */

 {
  opacity: 0;
}
</style>
