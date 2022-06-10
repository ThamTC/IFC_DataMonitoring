<template>
  <real-time-table :realtimeData="realtimeData" />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import RealTimeTable from "./RealTimeTable.vue";
export default {
  name: "BMBRealTimeTable",
  components: {
    RealTimeTable,
  },
  data() {
    return {
      realtimeData: {
        isError: false,
        error: null,
        isLoading: true,
        routeName: "",
        countColors: [],
        dataItems: [],
        currentData: {},
      },
    };
  },
  computed: {
    ...mapGetters(["getBmbRealtime", "getCountColorBmbs", "getCurrentBmb"]),
    countColors() {
      return (this.realtimeData.countColors = this.getCountColorBmbs);
    },
    dataItems() {
      return (this.realtimeData.dataItems = this.getBmbRealtime);
    },
    currentData() {
      return (this.realtimeData.currentData = this.getCurrentBmb);
    },
  },
  watch: {
    countColors() { },
    dataItems() { },
    currentData() { },
  },
  async created() {
    document.title = "BMB_Realtime";
    this.realtimeData.routeName = this.$route.name;
    this.getRealtimeStore(this.realtimeData.routeName)
      .then((data) => {
        if (data == "") {
          data = [];
        }
        this.setDataRealtime({
          key: "bmb_realtime",
          data: data,
        });
        this.counterColorStore(this.realtimeData.routeName);
        this.realtimeData.currentData = this.getCurrentBmb;
        this.realtimeData.isLoading = false;
      })
      .catch((err) => {
        this.realtimeData.isLoading = false;
        this.realtimeData.isError = true;
        this.realtimeData.error = err.message;
      });
  },
  methods: {
    ...mapActions(["getRealtimeStore", "counterColorStore"]),
    ...mapMutations(["setDataRealtime"]),
  },
};
</script>

<style>
</style>
>
