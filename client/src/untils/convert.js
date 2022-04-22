const convert = {
    idToColor: (id) => {
        const colors = ["dark", "red", "orange", "yellow", "green", "blue", "cyan", "violet", "white"]
        const foundId = colors.findIndex((key, idx) => idx == id)
        if (foundId >= 0) {
            return colors[id]
        }
        return "black"
    }
}

export default convert