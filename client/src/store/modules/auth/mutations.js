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
    setPermissions(state, permissions) {
        state.permissions = permissions
    },
    setRoles(state, roles) {
        state.roles = roles
    },
    insertRole(state, role) {
        state.roles.push(role)
    },
    setPermissionDetails(state, permissionDetails) {
        state.permissionDetails = permissionDetails
    },
    insertPermission(state, permission) {
        state.permissions.push(permission)
    }
}