import store from '../store'
export default (user, comparePermissions) => {
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
            const found = persMap.find(pers => pers.name == ele && pers.value > 0)
            if (found) {
                result = true
                return false
            }
        });
    }
    return result
}