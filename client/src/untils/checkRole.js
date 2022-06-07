export default (user, comparePermissions) => {
    let permissions = []
    permissions = user?.permissions ?? []
    let result = false
    if (permissions.length > 0) {
        comparePermissions.forEach(ele => {
            const found = permissions.find(pers => pers.name == ele && pers.value > 0)
            if (found) {
                result = true
                return false
            }
        });
    }
    return result
}