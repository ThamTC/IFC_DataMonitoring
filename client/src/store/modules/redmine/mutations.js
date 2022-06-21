export default {
    setIssues(state, data) {
        state.issues = data
    },
    insertIssue(state, data) {
        if (state.issues.length < 10) {
            state.issues.push(data)
        }
    },
    setDescriptions(state, data) {
        state.descriptions = data
    },
    insertDescription(state, data) {
        state.descriptions.push(data)
    }
}