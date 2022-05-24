import Vuex from "vuex";
import auth from './modules/auth'
import realtime from './modules/realtime'
import statistics from './modules/statistics'
import loadtables from './modules/loadtables'
import sideNavMenu from './modules/sideNavMenu'
const store = new Vuex.Store({
    modules: {
        auth,
        realtime,
        statistics,
        loadtables,
        sideNavMenu
    },
    state: {},
    mutations: {},
    getters: {},
    actions: {}
})
export default store