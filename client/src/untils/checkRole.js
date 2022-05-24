export default (user, compareRoles) => {
    const role = user.role ?? "user"
    const condition = compareRoles.includes(role)
    return condition
}