const path = require("path")

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/api': {
                target: process.env.VUE_APP_ROOT_API || 'http://localhost:3000'
            }
        }
    },
    lintOnSave: false,
    configureWebpack: {
        performance: {
            maxEntrypointSize: 2048000,
            maxAssetSize: 2048000
        }
    }
}