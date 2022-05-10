import { createStore } from "vuex";

const managerStore = createStore({
    state: {
        user: {
        },
        users: []
    },
    getters: {
        getUserInfo(state) {
            return state.user
        },
        getRole(state) {
            return state.user.role
        },
        getUsername(state) {
            return state.user.username
        },
        getUsers(state) {
            return state.users
        }
    },
    mutations: {
        setUserInfo(state, user) {
            state.user = user
        },
        setRole(state, role) {
            state.user.role = role
        },
        setUsername(state, username) {
            state.user.username = username
        },
        setUsers(state, users) {
            state.users = users
        }
    },
    actions: {
        updateUsers({commit, state}, user) {
            const users = state.users.map(ele => ele.email !== user.email ? ele : user)
            commit("setUsers", users)
        }
    }
})

export default managerStore