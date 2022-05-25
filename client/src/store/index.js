import Vuex from "vuex";
import auth from './modules/auth'
import realtime from './modules/realtime'
import statistics from './modules/statistics'
import sideNavMenu from './modules/sideNavMenu'
const store = new Vuex.Store({
    modules: {
        auth,
        realtime,
        statistics,
        sideNavMenu
    },
    state: {},
    mutations: {},
    getters: {},
    actions: {}
})
export default store