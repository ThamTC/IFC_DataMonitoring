export default {
    setIsLoggin(state, status) {
        state.isLoggin = status;
    },
    setUser(state, user) {
        state.user = user;
        state.isLoggin = true;
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
}