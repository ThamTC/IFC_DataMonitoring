import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: {},
        loadTable: "realtime",
        isLogin: false,
        isPlaySoundMessage: false
    },
    getters: {
        getLoadTable(state) {
            return state.loadTable
        },
        getLoginName(state) {
            return state.user?.username
        },
        getIsPlaySoundMess(state) {
            return state.isPlaySoundMessage
        }
    },
    mutations: {
        setUser(state, user){
            state.user = user
            state.isLogin = true
        },
        setLoadTable(state, tableName) {
            state.loadTable = tableName
        }
    },
    actions: {
        handleSetLoadTable(context, tabelName) {
            context.commit('setLoadTable', tabelName)
        }
    }
})

export default store