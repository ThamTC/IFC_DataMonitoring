import Vuex from "vuex";
import auth from './modules/auth'
import realtime from './modules/realtime'
import statistics from './modules/statistics'
import loadtables from './modules/loadtables'
import redirectSideNav from './modules/redirectSideNav'
const store = new Vuex.Store({
    modules: {
        auth,
        realtime,
        statistics,
        loadtables,
        redirectSideNav
    },
    state: {},
    mutations: {},
    getters: {},
    actions: {}
})
export default store