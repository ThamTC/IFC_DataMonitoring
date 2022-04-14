<template>
  <div class="sb-sidenav-menu">
    <div class="nav">
      <a ref="realtime" class="nav-link" @click="setLoadTable('realtime')">
        <div class="sb-nav-link-icon">
          <i class="fas fa-chart-area"></i>
        </div>
        Trực tuyến
      </a>
      <a ref="statistic" class="nav-link" @click="setLoadTable('statistic')">
        <div class="sb-nav-link-icon">
          <i class="fas fa-table"></i>
        </div>
        Thống kê
      </a>
    </div>
  </div>
</template>

<script>
import store from '../../stores/store'
export default {
  name: "SideNavMenu",
  components: {},
  computed: {

  },
  methods: {
    setLoadTable(name){
      store.dispatch("handleSetLoadTable", name);
      Object.keys(this.$refs).forEach(el => {
          if (name !== el) {
              this.$refs[el].classList.remove("highlight")
              this.$refs[name].classList.add("highlight")
          }
      })
    },
  },
  mounted() {
      let tableName = store.getters.getLoadTable
      this.$refs[tableName].classList.add("highlight")
  },
};
</script>

<style>
.highlight{
    color: white !important;
}
</style>