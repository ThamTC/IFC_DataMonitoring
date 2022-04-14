const path = require("path")

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://113.160.233.28:8001'
            }
        }
    },
    lintOnSave: false
}