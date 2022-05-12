const colors = ["dark", "red", "orange", "yellow", "green", "blue", "cyan", "violet", "white"]
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
    }
}

export default convert