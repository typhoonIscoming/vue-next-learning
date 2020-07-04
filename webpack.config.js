const rm = require('rimraf')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config')

module.exports = {
    mode: 'none', // production | development
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].[hash:4].js',
        path: config.build.assetsRoot,
        publicPath: './',
        library: '[name]'

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './public/index.html'),
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false
                // more options: https://github.com/kangax/html-minifier#options-quick-reference
            },
        }),
    ],
    module: {
        rules: [
        ],
    },
    optimization: {
        // splitChunks: {
        //     // include all types of chunks
        //     chunks: 'all'
        // },
        usedExports: true,
        // concatenateModules: true,
        sideEffects: true,
    },
}