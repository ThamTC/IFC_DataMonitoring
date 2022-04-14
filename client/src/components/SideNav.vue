<template>
  <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
      <SideNavToogle />
    </div>
    <SideNavContent />
  </div>
</template>

<script>
import SideNavToogle from "./sidenav/SideNavToggle.vue";
import SideNavContent from "./sidenav/SideNavContent.vue";

export default {
  name: "SideNav",
  components: {
    SideNavToogle,
    SideNavContent,
  },
};
</script>

<style>
</style>