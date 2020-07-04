const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path')
const merge = require('webpack-merge')

const config = require('./config')
const devConfig = require('./webpack.config.js');

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const options = {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'), // since we use CopyWebpackPlugin.
    host: 'localhost',
    open: true,
};

const webpackConfig = merge(devConfig, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
})

webpackDevServer.addDevServerEntrypoints(webpackConfig, options);
const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, options);

server.listen(PORT || config.dev.port, 'localhost', () => {
    console.log('dev server listening on port 5000');
});