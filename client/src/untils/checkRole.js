import store from '../store'
import ConstString from './constString'
export default (user, comparePermissions, status=ConstString.NONE) => {
    const permissionAll = store.getters.getPermissionDetails
    let permissions = []
    permissions = user?.permissions ?? []
    let persMap = permissions.map(ele => {
            const found = permissionAll.find(item => item.id == ele.name)
            if (found) {
                return {
                    name: found.name,
                    value: ele.value
                }
            }
    })
    let result = false
    persMap = persMap.filter(ele => ele != undefined)
    if (persMap.length > 0) {
        comparePermissions.forEach(ele => {
            const found = persMap.find(pers => pers.name == ele && pers.value >= status)
            if (found) {
                result = true
                return false
            }
        });
    }
    return result
}