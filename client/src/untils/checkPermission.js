export default (user, comparePermissions) => {
    const permissions = user.permissions ?? []
    const condition = permissions.some((permission) => {return comparePermissions.includes(permission)})
    return condition
}