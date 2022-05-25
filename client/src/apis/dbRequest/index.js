import axios from 'axios'
import permissionRequest from './permissionRequest';
import roleRequest from './roleRequest';
import userRequest from './userRequest';
axios.defaults.withCredentials = true;
const dbRequest = {
    getAllUsers: userRequest.getAllUsers,
    updateUserInfo: userRequest.updateUserInfo,
    deleteUser: userRequest.deleteUser,
    getAllRoles: roleRequest.getAllRoles,
    createRole: roleRequest.createRole,
    getAllPermissions: permissionRequest.getAllPermissions
}
export default dbRequest