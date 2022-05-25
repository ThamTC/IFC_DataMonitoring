const colors = ["dark", "red", "orange", "yellow", "green", "blue", "cyan", "violet", "white"]
const perName = ["null", "Read", "Write"]
const convert = {
    idToColor: (id) => {
        const foundId = colors.findIndex((key, idx) => idx == id)
        if (foundId >= 0) {
            return colors[id]
        }
        return "black"
    },
    colorToId: (color) => {
        const foundId = colors.findIndex((key) => key == color)
        return foundId
    },
    idToName: (id) => {
        const foundId = perName.findIndex((key, idx) => idx == id)
        return perName[foundId]
    }
}

export default convert