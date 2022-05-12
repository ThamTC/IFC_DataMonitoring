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
    countColors: {},
    sideNavContent: "",
    currentData: {},
    managerUser: {},
    managerUsers: [],
    usersLogin: [],
    dataRealtimeFilter: [],
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
    getCountColors(state) {
      return state.countColors
    },
    getSideNavContent(state) {
      return state.sideNavContent
    },
    getCurrentData(state) {
      return state.currentData
    },
    getManagerUserInfo(state) {
      return state.managerUser
    },
    getManagerRole(state) {
      return state.managerUser.role
    },
    getManagerUsername(state) {
      return state.managerUser.username
    },
    getManagerUsers(state) {
      return state.managerUsers
    },
    getUsersLogin(state) {
      return state.usersLogin
    },
    getDataRealtimeFilter(state) {
      return state.dataRealtimeFilter
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
    setCountColors(state, data) {
      state.countColors = data
    },
    setSideNavContent(state, content) {
      state.sideNavContent = content
    },
    setCurrentData(state, data) {
      state.currentData = data
    },
    setManagerUserInfo(state, user) {
      state.managerUser = user
    },
    setManagerRole(state, role) {
      state.managerUser.role = role
    },
    setManagerUsername(state, username) {
      state.managerUser.username = username
    },
    setManagerUsers(state, users) {
      state.managerUsers = users
    },
    setUsersLogin(state, users) {
      state.usersLogin = users
    },
    setDataRealtimeFilter(state, data) {
      state.dataRealtimeFilter = data
    }
  },
  actions: {
    handleSetLoadTable(context, tabelName) {
      context.commit("setLoadTable", tabelName);
    },
    updateManagerUsers({ commit, state }, user) {
      const managerUsers = state.managerUsers.map(ele => ele.email !== user.email ? ele : user)
      commit("setManagerUsers", managerUsers)
    },
    deleteUserFromManager({ commit, state }, user) {
      const managerUsers = state.managerUsers.filter(ele => ele.email !== user.email)
      commit("setManagerUsers", managerUsers)
      commit("setManagerUserInfo", {})
    }
  },
});

export default store;
