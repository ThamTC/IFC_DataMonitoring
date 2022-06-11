import Vuex from "vuex";
import auth from './modules/auth'
import realtime from './modules/realtime'
import statistics from './modules/statistics'
import sideNavMenu from './modules/sideNavMenu'
import redmine from './modules/redmine'
const store = new Vuex.Store({
    modules: {
        auth,
        realtime,
        statistics,
        sideNavMenu,
        redmine
    },
    state: {},
    mutations: {},
    getters: {},
    actions: {}
})
export default store