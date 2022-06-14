import axios from 'axios'
import permissionRequest from './permissionRequest';
import roleRequest from './roleRequest';
import userRequest from './userRequest';
import issueRequet from './issueRequest'
axios.defaults.withCredentials = true;
const dbRequest = {
    getAllUsers: userRequest.getAllUsers,
    updateUserInfo: userRequest.updateUserInfo,
    deleteUser: userRequest.deleteUser,
    getAllRoles: roleRequest.getAllRoles,
    createRole: roleRequest.createRole,
    deleteRole: roleRequest.deleteRole,
    updateRole: roleRequest.updateRole,
    getAllPermissions: permissionRequest.getAllPermissions,
    createPermission: permissionRequest.createPermission,
    updatePermission: permissionRequest.updatePermission,
    ...issueRequet
}
export default dbRequest