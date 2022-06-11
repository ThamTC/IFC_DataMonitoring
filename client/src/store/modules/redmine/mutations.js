export default {
    setIssues(state, data) {
        state.issues = data
    },
    insertIssue(state, data) {
        state.issues.push(data)
    }
}