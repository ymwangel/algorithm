const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
console.log(__dirname)
module.exports = {
    entry: path.join(_dirname, 'index'),
    output: {
        path: 'dist/',
        filename: 'app.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "/webpack/build"),//本地服务器所加载的页面所在的目录(终于实现了热加载)
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
        ]
    }
};