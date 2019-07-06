const merge = require("webpack-merge");
const webpack = require('webpack');
const http = require('./config/http');

function getConfig(){
    const baseConfig = require("./webpack.base");
    const config = merge(baseConfig, {
        // Provides process.env.NODE_ENV with value development. Enables NamedChunksPlugin and NamedModulesPlugin.
        mode: 'development',
        plugins: [
            new webpack.DefinePlugin({
                PATH: http.dev.PATH,
                MOCK: http.dev.MOCK,
                PROXY: http.dev.PROXY
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ]
    });
    return config;
}
module.exports = getConfig;