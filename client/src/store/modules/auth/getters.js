export default {
    checkLoggin(state) {
        return state.isLoggin;
    },
    getUser(state) {
        return state.user;
    },
    getLoginName(state) {
        return state.user?.username;
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
    getPermissions(state) {
        return state.permissions
    },
    getPermissionDetails(state) {
        return state.permissionDetails
    },
    getRoles(state) {
        return state.roles
    },
}