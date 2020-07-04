const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    dev: {
        assetsPublicPath: './',
        errorOverlay: true,
        autoOpenBrowser: true,
        host: 'localhost',
        port: '8088',
        proxyTable: {},
        poll: false,
    },
    build: {
        assetsRoot: resolve('dist'),
        assetsPublicPath: './',
        assetsSubDirectory: 'static',
    },
}