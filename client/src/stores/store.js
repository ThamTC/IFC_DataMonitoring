import { createStore } from "vuex";
import convert from '../untils/convert'

const store = createStore({
  state: {
    user: {},
    loadTable: "realtime",
    isLoggin: false,
    isPlaySoundMessage: false,
    dataRealtime: [],
    dataStatistic: [],
    dataTest: [],
    dataTestStatistic: [],
    countColors: {},
  },
  getters: {
    checkLoggin(state) {
      return state.isLoggin;
    },
    getUser(state) {
      return state.user;
    },
    getLoadTable(state) {
      return state.loadTable;
    },
    getLoginName(state) {
      return state.user?.username;
    },
    getIsPlaySoundMess(state) {
      return state.isPlaySoundMessage;
    },
    getDataRealtime(state) {
      return state.dataRealtime;
    },
    getDataStatistic(state) {
      return state.dataStatistic;
    },
    getDataTest(state) {
      return state.dataTest;
    },
    getCountColors(state) {
      return state.countColors
    },
    getDataTestStatistic(state) {
      return state.dataTestStatistic;
    }
  },
  mutations: {
    setIsLoggin(state, status) {
      state.isLoggin = status;
    },
    setUser(state, user) {
      state.user = user;
      state.isLoggin = true;
    },
    setLoadTable(state, tableName) {
      state.loadTable = tableName;
    },
    setDataRealtime(state, data) {
      state.dataRealtime = data;
    },
    insertDataRealtime(state, item) {
      state.dataRealtime.unshift(item);
    },
    setDataStatistic(state, data) {
      state.dataStatistic = data;
    },
    insertDataStatistic(state, item) {
      state.dataStatistic.unshift(item);
    },
    setDataTest(state, data) {
      state.dataTest = data;
    },
    insertDataTest(state, item) {
      state.dataTest.unshift(item);
    },
    setCountColors(state, data) {
      var showCountSorted = {};
      data.forEach((ele) => {
        const colorName = convert.idToColor(ele.priority);
        showCountSorted[colorName] = (showCountSorted[colorName] || 0) + 1;
      });
      state.countColors = Object.entries(showCountSorted);
    },
    setDataTestStatistic(state, data) {
      state.dataTestStatistic = data;
    },
  },
  actions: {
    handleSetLoadTable(context, tabelName) {
      context.commit("setLoadTable", tabelName);
    },
  },
});

export default store;
