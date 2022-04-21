import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: {},
        loadTable: "realtime",
        isLoggin: false,
        isPlaySoundMessage: false,
        dataRealtime: [],
        dataStatistic: []
    },
    getters: {
        checkLoggin(state){
            return state.isLoggin
        },
        getUser(state) {
            return state.user
        },
        getLoadTable(state) {
            return state.loadTable
        },
        getLoginName(state) {
            return state.user?.username
        },
        getIsPlaySoundMess(state) {
            return state.isPlaySoundMessage
        },
        getDataRealtime(state) {
            return state.dataRealtime
        },
        getDataStatistic(state) {
            return state.dataStatistic
        }
    },
    mutations: {
        setIsLoggin(state, status){
            state.isLoggin = status
        },
        setUser(state, user){
            state.user = user
            state.isLoggin = true
        },
        setLoadTable(state, tableName) {
            state.loadTable = tableName
        },
        setDataRealtime(state, data) {
            state.dataRealtime = data
        },
        insertDataRealtime(state, item){
            state.dataRealtime.unshift(item)
        },
        setDataStatistic(state, data) {
            state.dataStatistic = data
        },
        insertDataStatistic(state, item){
            state.dataStatistic.unshift(item)
        }
    },
    actions: {
        handleSetLoadTable(context, tabelName) {
            context.commit('setLoadTable', tabelName)
        }
    }
})

export default store