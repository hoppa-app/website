<template>
  <div id="material-kit">
    <div :class="{'nav-open': NavbarStore.showNavbar}">
      <router-view name="header"/>
      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2">
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
          </div>
        </div>
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
